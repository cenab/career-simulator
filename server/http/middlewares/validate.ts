import type { RequestHandler } from "express";
import type { AnyZodObject, ZodEffects } from "zod";
import { ValidationError } from "../../lib/errors";

type Schema = AnyZodObject | ZodEffects<AnyZodObject>;

interface ValidationOptions {
  body?: Schema;
  query?: Schema;
  params?: Schema;
}

export const validate = (options: ValidationOptions): RequestHandler => {
  return (req, _res, next) => {
    try {
      if (options.body) {
        req.body = options.body.parse(req.body);
      }
      if (options.query) {
        req.query = options.query.parse(req.query);
      }
      if (options.params) {
        req.params = options.params.parse(req.params);
      }
    } catch (error) {
      return next(
        error instanceof Error
          ? error
          : new ValidationError("Invalid request payload", error),
      );
    }

    next();
  };
};
