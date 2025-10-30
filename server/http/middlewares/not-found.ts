import type { RequestHandler } from "express";
import { NotFoundError } from "../../lib/errors";

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new NotFoundError("Route not found"));
};
