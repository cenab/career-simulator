import { Router } from "express";
import { z } from "zod";
import { storage } from "../../storage";
import { validate } from "../../http/middlewares/validate";
import { asyncHandler } from "../../lib/async-handler";
import { sendAccepted, sendSuccess } from "../../http/responses";
import { ConflictError, UnauthorizedError } from "../../lib/errors";
import { hashPassword, verifyPassword } from "../../lib/security";
import { toPublicUser } from "../users/utils";

const router = Router();

const signupSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8),
  marketingOptIn: z.boolean().optional(),
});

const loginSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(8),
});

const resetRequestSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  token: z.string().min(10),
  newPassword: z.string().min(8),
});

function buildSessionPayload(userId: string) {
  return Promise.all([
    storage.users.getById(userId),
    storage.profileMetrics.getByUserId(userId),
  ]).then(([user, metrics]) => ({
    user: user ? toPublicUser(user) : undefined,
    metrics: metrics ?? null,
    preferences: {
      aiFeedbackOn: true,
      autoSaveOn: true,
      emailNotifications: false,
    },
  }));
}

router.post(
  "/signup",
  validate({ body: signupSchema }),
  asyncHandler(async (req, res) => {
    const { email, username, password } = signupSchema.parse(req.body);

    const [existingEmail, existingUsername] = await Promise.all([
      storage.users.getByEmail(email),
      storage.users.getByUsername(username),
    ]);

    if (existingEmail) {
      throw new ConflictError("Email already in use");
    }
    if (existingUsername) {
      throw new ConflictError("Username already in use");
    }

    const user = await storage.users.insert({
      email,
      username,
      passwordHash: hashPassword(password),
    });

    const session = await buildSessionPayload(user.id);

    res.status(201);
    sendSuccess(res, {
      ...session,
      tokens: {
        accessToken: `demo-${user.id}`,
        refreshToken: `demo-refresh-${user.id}`,
      },
    });
  }),
);

router.post(
  "/login",
  validate({ body: loginSchema }),
  asyncHandler(async (req, res) => {
    const { identifier, password } = loginSchema.parse(req.body);

    const user = identifier.includes("@")
      ? await storage.users.getByEmail(identifier)
      : await storage.users.getByUsername(identifier);

    if (!user || !verifyPassword(password, user.passwordHash)) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const session = await buildSessionPayload(user.id);

    sendSuccess(res, {
      ...session,
      tokens: {
        accessToken: `demo-${user.id}`,
        refreshToken: `demo-refresh-${user.id}`,
      },
    });
  }),
);

router.post(
  "/logout",
  asyncHandler(async (_req, res) => {
    sendSuccess(res, { success: true });
  }),
);

router.get(
  "/session",
  asyncHandler(async (_req, res) => {
    const [user] = await storage.users.all();

    if (!user) {
      throw new UnauthorizedError("No active session");
    }

    const payload = await buildSessionPayload(user.id);
    sendSuccess(res, payload);
  }),
);

router.post(
  "/password/reset-request",
  validate({ body: resetRequestSchema }),
  asyncHandler(async (req, res) => {
    const { email } = resetRequestSchema.parse(req.body);

    const user = await storage.users.getByEmail(email);
    if (!user) {
      // Respond with same message to avoid leaking account existence
      return sendAccepted(res, { delivered: true });
    }

    sendAccepted(res, { delivered: true });
  }),
);

router.post(
  "/password/reset",
  validate({ body: resetPasswordSchema }),
  asyncHandler(async (_req, res) => {
    sendSuccess(res, { success: true });
  }),
);

export const authRouter = router;
