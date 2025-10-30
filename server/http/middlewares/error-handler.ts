import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError, ValidationError } from "../../lib/errors";
import { logError } from "../../lib/logger";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  let normalizedError: AppError;

  if (err instanceof AppError) {
    normalizedError = err;
  } else if (err instanceof ZodError) {
    normalizedError = new ValidationError("Validation failed", err.flatten());
  } else {
    normalizedError = new AppError({
      message: err?.message ?? "Internal Server Error",
      status: err?.status ?? 500,
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  logError(
    {
      ...normalizedError,
      stack: req.app.get("env") === "development" ? normalizedError.stack : undefined,
    },
    "server",
  );

  res.status(normalizedError.status).json({
    error: {
      code: normalizedError.code,
      message: normalizedError.message,
      details: normalizedError.details,
    },
  });
};
