import type { NextFunction, Request, Response } from "express";
import { log } from "../../lib/logger";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  let capturedJsonResponse: unknown;

  const originalJson = res.json;
  res.json = function jsonInterceptor(body, ...args) {
    capturedJsonResponse = body;
    return originalJson.apply(res, [body, ...args]);
  } as typeof res.json;

  res.on("finish", () => {
    if (!req.path.startsWith("/api")) {
      return;
    }

    const duration = Date.now() - start;
    let logLine = `${req.method} ${req.path} ${res.statusCode} in ${duration}ms`;

    if (capturedJsonResponse) {
      try {
        const serialized =
          typeof capturedJsonResponse === "string"
            ? capturedJsonResponse
            : JSON.stringify(capturedJsonResponse);
        logLine += ` :: ${serialized}`;
      } catch {
        logLine += " :: [unserializable response]";
      }
    }

    if (logLine.length > 80) {
      logLine = `${logLine.slice(0, 79)}…`;
    }

    log(logLine, "router");
  });

  next();
}
