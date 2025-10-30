import { Router } from "express";
import { z } from "zod";
import { storage } from "../../storage";
import { asyncHandler } from "../../lib/async-handler";
import { validate } from "../../http/middlewares/validate";
import { sendAccepted, sendSuccess } from "../../http/responses";
import { NotFoundError } from "../../lib/errors";
import { resolveCurrentUser } from "../shared/current-user";
import { randomUUID } from "node:crypto";

const createChatSchema = z.object({
  sceneId: z.string().uuid(),
  characterId: z.string().uuid().optional(),
  mode: z.enum(["story", "practice"]).default("story"),
});

const postMessageSchema = z.object({
  body: z.string().min(1),
});

const feedbackSchema = z.object({
  likeState: z.enum(["like", "dislike", "none"]),
});

const scopeQuerySchema = z.object({
  scope: z.enum(["recent", "pinned"]).default("recent"),
});

const pinnedChats = new Map<string, Set<string>>();

function getPinnedSet(userId: string) {
  if (!pinnedChats.has(userId)) {
    pinnedChats.set(userId, new Set());
  }
  return pinnedChats.get(userId)!;
}

const router = Router();

router.post(
  "/",
  validate({ body: createChatSchema }),
  asyncHandler(async (req, res) => {
    const user = await resolveCurrentUser();
    const payload = createChatSchema.parse(req.body);

    const scene = await storage.scenes.getById(payload.sceneId);
    if (!scene) {
      throw new NotFoundError("Scene not found");
    }

    const chatId = randomUUID();
    const chat = await storage.chats.insert({
      id: chatId,
      userId: user.id,
      sceneId: payload.sceneId,
      characterId: payload.characterId ?? scene.linkedCharacterId,
      title: scene.name,
      status: "active",
      startedAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
      settings: {
        preferredVoice: payload.characterId ?? scene.linkedCharacterId,
        aiFeedbackOn: true,
        autoSaveOn: true,
      },
    });

    await storage.messages.insert({
      id: randomUUID(),
      chatId,
      sender: "ai",
      body: scene.introText,
      metadata: {
        sentiment: "supportive",
        tone: "mentor",
        actions: ["introduce-scenario"],
      },
      createdAt: new Date().toISOString(),
      likeState: "none",
    });

    res.status(201);
    sendSuccess(res, { chat });
  }),
);

router.get(
  "/:chatId",
  asyncHandler(async (req, res) => {
    const chat = await storage.chats.getById(req.params.chatId);
    if (!chat) {
      throw new NotFoundError("Chat not found");
    }

    const scene = await storage.scenes.getById(chat.sceneId);
    const character = chat.characterId
      ? await storage.characters.getById(chat.characterId)
      : null;

    sendSuccess(res, {
      chat,
      scene,
      character,
    });
  }),
);

router.get(
  "/:chatId/messages",
  asyncHandler(async (req, res) => {
    const chat = await storage.chats.getById(req.params.chatId);
    if (!chat) {
      throw new NotFoundError("Chat not found");
    }

    const messages = await storage.messages.listByChatId(chat.id);
    sendSuccess(res, { items: messages });
  }),
);

router.get(
  "/:chatId/messages/latest",
  asyncHandler(async (req, res) => {
    const messages = await storage.messages.listByChatId(req.params.chatId);
    const latest = messages[messages.length - 1] ?? null;
    sendSuccess(res, { message: latest });
  }),
);

router.post(
  "/:chatId/messages",
  validate({ body: postMessageSchema }),
  asyncHandler(async (req, res) => {
    const { body } = postMessageSchema.parse(req.body);
    const chat = await storage.chats.getById(req.params.chatId);
    if (!chat) {
      throw new NotFoundError("Chat not found");
    }

    const message = await storage.messages.insert({
      id: randomUUID(),
      chatId: chat.id,
      sender: "user",
      body,
      metadata: {
        sentiment: null,
        tone: null,
        actions: [],
      },
      createdAt: new Date().toISOString(),
      likeState: "none",
    });

    await storage.chats.update(chat.id, {
      lastActivityAt: new Date().toISOString(),
    });

    res.status(201);
    sendSuccess(res, { message });
  }),
);

router.post(
  "/:chatId/messages/:messageId/feedback",
  validate({ body: feedbackSchema }),
  asyncHandler(async (req, res) => {
    const { likeState } = feedbackSchema.parse(req.body);
    const message = await storage.messages.update(req.params.messageId, {
      likeState,
    });

    sendSuccess(res, { message });
  }),
);

router.post(
  "/:chatId/pin",
  asyncHandler(async (req, res) => {
    const user = await resolveCurrentUser();
    const pinned = getPinnedSet(user.id);
    pinned.add(req.params.chatId);
    sendSuccess(res, { pinned: true });
  }),
);

router.delete(
  "/:chatId/pin",
  asyncHandler(async (req, res) => {
    const user = await resolveCurrentUser();
    const pinned = getPinnedSet(user.id);
    pinned.delete(req.params.chatId);
    sendSuccess(res, { pinned: false });
  }),
);

router.get(
  "/me",
  validate({ query: scopeQuerySchema }),
  asyncHandler(async (req, res) => {
    const user = await resolveCurrentUser();
    const { scope } = scopeQuerySchema.parse(req.query);

    if (scope === "pinned") {
      const pinnedIds = Array.from(getPinnedSet(user.id));
      const pinnedChatsDetails = await Promise.all(
        pinnedIds.map((id) => storage.chats.getById(id)),
      );
      sendSuccess(res, {
        items: pinnedChatsDetails.filter((chat): chat is NonNullable<typeof chat> => Boolean(chat)),
      });
      return;
    }

    const recents = await storage.chats.listRecentByUser(user.id);
    sendSuccess(res, { items: recents });
  }),
);

router.post(
  "/:chatId/analysis",
  asyncHandler(async (req, res) => {
    const messages = await storage.messages.listByChatId(req.params.chatId);
    const lastUserMessage = [...messages]
      .reverse()
      .find((message) => message.sender === "user");

    sendSuccess(res, {
      insights: {
        tone: "confident",
        coachingTip:
          lastUserMessage?.body
            ? "Acknowledge the team's emotional state before shifting to tactical requests."
            : "Consider setting expectations for the simulation run.",
        skillScores: [
          { skill: "Empathy", score: 7 },
          { skill: "Leadership", score: 8 },
          { skill: "Clarity", score: 6 },
        ],
      },
    });
  }),
);

router.post(
  "/:chatId/voice",
  asyncHandler(async (_req, res) => {
    sendAccepted(res, {
      audioUrl: "https://files.careersim.app/audio/demo-response.mp3",
    });
  }),
);

export const chatsRouter = router;
