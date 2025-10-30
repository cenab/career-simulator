import { Router } from "express";
import { storage } from "../../storage";
import { asyncHandler } from "../../lib/async-handler";
import { sendSuccess } from "../../http/responses";
import { resolveCurrentUser } from "../shared/current-user";

const router = Router();

router.get(
  "/overview",
  asyncHandler(async (_req, res) => {
    const [characters, scenes] = await Promise.all([
      storage.characters.listPublic(),
      storage.scenes.listPublic(),
    ]);

    const user = await resolveCurrentUser().catch(() => undefined);
    const recentChats = user
      ? await storage.chats.listRecentByUser(user.id)
      : [];

    sendSuccess(res, {
      forYou: characters.slice(0, 6),
      featuredScenes: scenes.slice(0, 6),
      popularCollections: await storage.collections.listPopular(),
      recents: recentChats.slice(0, 3),
    });
  }),
);

export const discoverRouter = router;
