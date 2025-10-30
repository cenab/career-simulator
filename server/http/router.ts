import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes";
import { meRouter, usersRouter } from "../modules/users/users.routes";
import { charactersRouter } from "../modules/characters/characters.routes";
import { scenesRouter } from "../modules/scenes/scenes.routes";
import { discoverRouter } from "../modules/discover/discover.routes";
import { searchRouter } from "../modules/search/search.routes";
import { metadataRouter } from "../modules/metadata/metadata.routes";
import { chatsRouter } from "../modules/chats/chats.routes";
import { uploadsRouter } from "../modules/uploads/uploads.routes";

export function createApiRouter() {
  const router = Router();

  router.use("/auth", authRouter);
  router.use("/me", meRouter);
  router.use("/users", usersRouter);
  router.use("/characters", charactersRouter);
  router.use("/scenes", scenesRouter);
  router.use("/chats", chatsRouter);
  router.use("/discover", discoverRouter);
  router.use(searchRouter);
  router.use(metadataRouter);
  router.use("/uploads", uploadsRouter);

  return router;
}
