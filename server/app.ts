import express, { type Express, type Request, type Response } from "express";
import { createApiRouter } from "./http/router";
import { requestLogger } from "./http/middlewares/request-logger";
import { errorHandler } from "./http/middlewares/error-handler";
import { notFoundHandler } from "./http/middlewares/not-found";

declare module "http" {
  interface IncomingMessage {
    rawBody?: Buffer;
  }
}

function captureRawBody(req: Request, _res: Response, buf: Buffer) {
  req.rawBody = buf;
}

export function createApp(): Express {
  const app = express();

  app.set("trust proxy", true);

  app.use(
    express.json({
      verify: captureRawBody,
      limit: "1mb",
    }),
  );
  app.use(express.urlencoded({ extended: false }));

  app.use(requestLogger);

  app.get("/healthz", (_req, res) => {
    res.json({ data: { status: "ok" } });
  });

  app.use("/api", createApiRouter());

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
