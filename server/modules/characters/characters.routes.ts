import { Router } from "express";
import { z } from "zod";
import { createCharacterInputSchema } from "@shared/domain";
import { storage } from "../../storage";
import { asyncHandler } from "../../lib/async-handler";
import { validate } from "../../http/middlewares/validate";
import { sendSuccess } from "../../http/responses";
import { NotFoundError } from "../../lib/errors";
import { resolveCurrentUser } from "../shared/current-user";

const listQuerySchema = z.object({
  section: z.enum(["for-you", "featured", "popular"]).optional(),
  tag: z.string().optional(),
  creator: z.string().optional(),
});

const partialUpdateSchema = createCharacterInputSchema.partial();

const router = Router();

router.get(
  "/me",
  asyncHandler(async (_req, res) => {
    const user = await resolveCurrentUser();
    const characters = await storage.characters.listByOwner(user.id);
    sendSuccess(res, { items: characters });
  }),
);

router.get(
  "/",
  validate({ query: listQuerySchema }),
  asyncHandler(async (_req, res) => {
    const characters = await storage.characters.listPublic();
    sendSuccess(res, {
      items: characters,
      meta: { count: characters.length },
    });
  }),
);

router.post(
  "/",
  validate({ body: createCharacterInputSchema }),
  asyncHandler(async (req, res) => {
    const user = await resolveCurrentUser();
    const payload = createCharacterInputSchema.parse(req.body);

    let avatarUrl: string | null = null;
    if (payload.avatarUploadId) {
      const upload = await storage.uploads.getById(payload.avatarUploadId);
      avatarUrl = upload?.url ?? null;
    }

    const character = await storage.characters.insert({
      ownerId: user.id,
      name: payload.name,
      tagline: payload.tagline,
      description: payload.description,
      greetings: payload.greetings,
      tags: payload.tags,
      visibility: payload.visibility,
      aiGreetingEnabled: payload.aiGreetingEnabled,
      avatarUrl,
    });

    res.status(201);
    sendSuccess(res, { character });
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const character = await storage.characters.getById(req.params.id);
    if (!character) {
      throw new NotFoundError("Character not found");
    }

    sendSuccess(res, { character });
  }),
);

router.patch(
  "/:id",
  validate({ body: partialUpdateSchema }),
  asyncHandler(async (req, res) => {
    const payload = partialUpdateSchema.parse(req.body);
    const character = await storage.characters.getById(req.params.id);
    if (!character) {
      throw new NotFoundError("Character not found");
    }

    let avatarUrl = character.avatarUrl;
    if (payload.avatarUploadId) {
      const upload = await storage.uploads.getById(payload.avatarUploadId);
      avatarUrl = upload?.url ?? avatarUrl;
    }

    const updated = await storage.characters.update(req.params.id, {
      ...payload,
      avatarUrl,
    });

    sendSuccess(res, { character: updated });
  }),
);

router.post(
  "/:id/publish",
  asyncHandler(async (req, res) => {
    const character = await storage.characters.getById(req.params.id);
    if (!character) {
      throw new NotFoundError("Character not found");
    }

    const updated = await storage.characters.update(req.params.id, {
      visibility: "public",
    });

    sendSuccess(res, { character: updated });
  }),
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const character = await storage.characters.getById(req.params.id);
    if (!character) {
      throw new NotFoundError("Character not found");
    }

    await storage.characters.delete(req.params.id);
    sendSuccess(res, { success: true });
  }),
);

export const charactersRouter = router;
