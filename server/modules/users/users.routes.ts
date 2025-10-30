import { Router } from "express";
import { z } from "zod";
import { storage } from "../../storage";
import { asyncHandler } from "../../lib/async-handler";
import { validate } from "../../http/middlewares/validate";
import { sendSuccess } from "../../http/responses";
import { NotFoundError } from "../../lib/errors";
import { resolveCurrentUser } from "../shared/current-user";
import { toPublicUser, type PublicUser } from "./utils";

const preferencesStore = new Map<
  string,
  { emailNotifications: boolean; aiFeedbackOn: boolean; autoSaveOn: boolean }
>();

const profileUpdateSchema = z.object({
  username: z.string().min(3).optional(),
  bio: z.string().max(280).nullable().optional(),
  avatarUrl: z.string().url().nullable().optional(),
});

const preferencesSchema = z.object({
  emailNotifications: z.boolean().optional(),
  aiFeedbackOn: z.boolean().optional(),
  autoSaveOn: z.boolean().optional(),
});

function getPreferences(userId: string) {
  if (!preferencesStore.has(userId)) {
    preferencesStore.set(userId, {
      emailNotifications: false,
      aiFeedbackOn: true,
      autoSaveOn: true,
    });
  }

  return preferencesStore.get(userId)!;
}

export const meRouter = Router();

meRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const user = await resolveCurrentUser();
    sendSuccess(res, { user: toPublicUser(user), preferences: getPreferences(user.id) });
  }),
);

meRouter.patch(
  "/",
  validate({ body: profileUpdateSchema }),
  asyncHandler(async (req, res) => {
    const user = await resolveCurrentUser();
    const updates = profileUpdateSchema.parse(req.body);

    const updated = await storage.users.update(user.id, updates);
    sendSuccess(res, { user: toPublicUser(updated) });
  }),
);

meRouter.get(
  "/activity",
  asyncHandler(async (_req, res) => {
    const user = await resolveCurrentUser();
    const metrics = await storage.profileMetrics.getByUserId(user.id);
    const recentChats = await storage.chats.listRecentByUser(user.id);

    sendSuccess(res, {
      metrics,
      lastSessions: recentChats.slice(0, 5).map((chat) => ({
        id: chat.id,
        title: chat.title,
        lastActivityAt: chat.lastActivityAt,
        status: chat.status,
      })),
    });
  }),
);

meRouter.patch(
  "/preferences",
  validate({ body: preferencesSchema }),
  asyncHandler(async (req, res) => {
    const user = await resolveCurrentUser();
    const current = getPreferences(user.id);
    const updates = preferencesSchema.parse(req.body);
    const next = { ...current, ...updates };
    preferencesStore.set(user.id, next);

    sendSuccess(res, { preferences: next });
  }),
);

export const usersRouter = Router();

usersRouter.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const user = await storage.users.getById(req.params.userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const metrics = await storage.profileMetrics.getByUserId(user.id);
    const publicUser: PublicUser = toPublicUser(user);
    sendSuccess(res, { user: publicUser, metrics: metrics ?? null });
  }),
);
