import { Router } from "express";
import { z } from "zod";
import { createSceneInputSchema } from "@shared/domain";
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

const partialSceneSchema = createSceneInputSchema.partial();

const router = Router();

router.get(
  "/me",
  asyncHandler(async (_req, res) => {
    const user = await resolveCurrentUser();
    const scenes = await storage.scenes.listByOwner(user.id);
    sendSuccess(res, { items: scenes });
  }),
);

router.get(
  "/",
  validate({ query: listQuerySchema }),
  asyncHandler(async (_req, res) => {
    const scenes = await storage.scenes.listPublic();
    sendSuccess(res, { items: scenes, meta: { count: scenes.length } });
  }),
);

router.post(
  "/",
  validate({ body: createSceneInputSchema }),
  asyncHandler(async (req, res) => {
    const user = await resolveCurrentUser();
    const payload = createSceneInputSchema.parse(req.body);

    let coverImageUrl: string | null = null;
    if (payload.coverUploadId) {
      const upload = await storage.uploads.getById(payload.coverUploadId);
      coverImageUrl = upload?.url ?? null;
    }

    const scene = await storage.scenes.insert({
      ownerId: user.id,
      type: payload.type,
      genres: payload.genres,
      timePeriods: payload.timePeriods,
      locations: payload.locations,
      tones: payload.tones,
      backstory: payload.backstory,
      playerGoal: payload.playerGoal,
      introText: payload.introText,
      characterGreeting: payload.characterGreeting,
      name: payload.name,
      coverImageUrl,
      chatThemeColor: payload.chatThemeColor,
      tags: payload.tags,
      visibility: payload.visibility,
      status: payload.status ?? "draft",
      linkedCharacterId: payload.linkedCharacterId ?? null,
    });

    res.status(201);
    sendSuccess(res, { scene });
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const scene = await storage.scenes.getById(req.params.id);
    if (!scene) {
      throw new NotFoundError("Scene not found");
    }

    const ownerCharacters = scene.ownerId
      ? await storage.characters.listByOwner(scene.ownerId)
      : [];

    sendSuccess(res, {
      scene,
      relatedCharacters: ownerCharacters,
    });
  }),
);

router.patch(
  "/:id",
  validate({ body: partialSceneSchema }),
  asyncHandler(async (req, res) => {
    const payload = partialSceneSchema.parse(req.body);
    const scene = await storage.scenes.getById(req.params.id);
    if (!scene) {
      throw new NotFoundError("Scene not found");
    }

    let coverImageUrl = scene.coverImageUrl;
    if (payload.coverUploadId) {
      const upload = await storage.uploads.getById(payload.coverUploadId);
      coverImageUrl = upload?.url ?? coverImageUrl;
    }

    const updated = await storage.scenes.update(req.params.id, {
      ...payload,
      coverImageUrl,
    });

    sendSuccess(res, { scene: updated });
  }),
);

router.post(
  "/:id/publish",
  asyncHandler(async (req, res) => {
    const scene = await storage.scenes.getById(req.params.id);
    if (!scene) {
      throw new NotFoundError("Scene not found");
    }

    const updated = await storage.scenes.update(req.params.id, {
      status: "published",
      visibility: "public",
    });

    sendSuccess(res, { scene: updated });
  }),
);

export const scenesRouter = router;
