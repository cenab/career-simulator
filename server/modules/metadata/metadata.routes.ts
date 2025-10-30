import { Router } from "express";
import { z } from "zod";
import { storage } from "../../storage";
import { asyncHandler } from "../../lib/async-handler";
import { validate } from "../../http/middlewares/validate";
import { sendSuccess } from "../../http/responses";
import { NotImplementedError } from "../../lib/errors";

const tagsQuerySchema = z.object({
  type: z.enum(["scene", "character"]).optional(),
});

const router = Router();

router.get(
  "/tags",
  validate({ query: tagsQuerySchema }),
  asyncHandler(async (req, res) => {
    const { type } = tagsQuerySchema.parse(req.query);
    const [characters, scenes] = await Promise.all([
      storage.characters.listPublic(),
      storage.scenes.listPublic(),
    ]);

    const tagSet = new Set<string>();
    if (!type || type === "character") {
      characters.forEach((c) => c.tags.forEach((tag) => tagSet.add(tag)));
    }
    if (!type || type === "scene") {
      scenes.forEach((s) => s.tags.forEach((tag) => tagSet.add(tag)));
    }

    sendSuccess(res, { tags: Array.from(tagSet).sort() });
  }),
);

router.get(
  "/collections",
  asyncHandler(async (_req, res) => {
    const [featured, popular] = await Promise.all([
      storage.collections.listFeatured(),
      storage.collections.listPopular(),
    ]);

    sendSuccess(res, {
      featured,
      popular,
    });
  }),
);

router.post(
  "/collections/:id/items",
  asyncHandler(async () => {
    throw new NotImplementedError(
      "Collection mutation endpoints require authentication",
    );
  }),
);

router.get(
  "/chat/options",
  asyncHandler(async (_req, res) => {
    sendSuccess(res, {
      voices: [
        { id: "price", label: "Captain Price", previewUrl: null },
        { id: "ghost", label: "Simon 'Ghost' Riley", previewUrl: null },
        { id: "soap", label: "Johnny 'Soap' MacTavish", previewUrl: null },
      ],
      styles: ["supportive", "direct", "challenging"],
      safetyLevels: ["standard", "professional", "roleplay"],
    });
  }),
);

router.get(
  "/trending",
  asyncHandler(async (_req, res) => {
    const scenes = await storage.scenes.listPublic();
    const characters = await storage.characters.listPublic();

    sendSuccess(res, {
      terms: ["crisis management", "tone control", "leadership lab"],
      entities: [...scenes.slice(0, 3), ...characters.slice(0, 3)],
    });
  }),
);

export const metadataRouter = router;
