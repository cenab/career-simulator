import { Router } from "express";
import { z } from "zod";
import { storage } from "../../storage";
import { asyncHandler } from "../../lib/async-handler";
import { validate } from "../../http/middlewares/validate";
import { sendSuccess } from "../../http/responses";

const searchQuerySchema = z.object({
  q: z.string().min(1),
  type: z.enum(["character", "scene", "user"]).optional(),
});

const suggestionsQuerySchema = z.object({
  q: z.string().optional(),
});

const router = Router();

router.get(
  "/search",
  validate({ query: searchQuerySchema }),
  asyncHandler(async (req, res) => {
    const { q, type } = searchQuerySchema.parse(req.query);
    const term = q.toLowerCase();

    const [characters, scenes, users] = await Promise.all([
      storage.characters.listPublic(),
      storage.scenes.listPublic(),
      storage.users.all(),
    ]);

    const filterByTerm = <T extends { name?: string; username?: string }>(
      items: T[],
    ) =>
      items.filter((item) => {
        const value = (item as { name?: string; username?: string }).name ??
          (item as { name?: string; username?: string }).username ??
          "";
        return value.toLowerCase().includes(term);
      });

    const payload = {
      characters: type && type !== "character" ? [] : filterByTerm(characters),
      scenes: type && type !== "scene" ? [] : filterByTerm(scenes),
      users: type && type !== "user"
        ? []
        : filterByTerm(users).map(({ passwordHash, ...publicUser }) => publicUser),
    };

    sendSuccess(res, payload);
  }),
);

router.get(
  "/search/suggestions",
  validate({ query: suggestionsQuerySchema }),
  asyncHandler(async (req, res) => {
    const { q } = suggestionsQuerySchema.parse(req.query);
    const term = q?.toLowerCase() ?? "";

    const [characters, scenes] = await Promise.all([
      storage.characters.listPublic(),
      storage.scenes.listPublic(),
    ]);

    const suggestions = [...characters, ...scenes]
      .map((item) => item.name)
      .filter((name) => name.toLowerCase().includes(term))
      .slice(0, 8);

    sendSuccess(res, { suggestions });
  }),
);

export const searchRouter = router;
