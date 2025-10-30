export type ErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "VALIDATION_ERROR"
  | "NOT_IMPLEMENTED"
  | "INTERNAL_SERVER_ERROR";

export class AppError extends Error {
  public status: number;
  public code: ErrorCode;
  public details?: unknown;

  constructor(options: {
    message: string;
    status: number;
    code: ErrorCode;
    details?: unknown;
  }) {
    super(options.message);
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super({ message, status: 404, code: "NOT_FOUND" });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super({ message, status: 401, code: "UNAUTHORIZED" });
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super({ message, status: 403, code: "FORBIDDEN" });
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super({
      message,
      status: 400,
      code: "VALIDATION_ERROR",
      details,
    });
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super({ message, status: 409, code: "CONFLICT" });
  }
}

export class NotImplementedError extends AppError {
  constructor(message = "Not implemented") {
    super({
      message,
      status: 501,
      code: "NOT_IMPLEMENTED",
    });
  }
}
