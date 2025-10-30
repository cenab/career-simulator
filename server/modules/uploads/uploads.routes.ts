import { Router } from "express";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { asyncHandler } from "../../lib/async-handler";
import { validate } from "../../http/middlewares/validate";
import { storage } from "../../storage";
import { sendSuccess } from "../../http/responses";

const createUploadSchema = z.object({
  filename: z.string().min(1),
  mimeType: z.string().min(1),
});

const router = Router();

router.post(
  "/",
  validate({ body: createUploadSchema }),
  asyncHandler(async (req, res) => {
    const { filename, mimeType } = createUploadSchema.parse(req.body);

    const upload = await storage.uploads.createUpload({
      uploadId: randomUUID(),
      url: `https://files.careersim.app/uploads/${encodeURIComponent(filename)}`,
      expiresAt: new Date(Date.now() + 1000 * 60 * 10).toISOString(),
    });

    sendSuccess(res, {
      upload,
      fields: {
        key: filename,
        "Content-Type": mimeType,
      },
    });
  }),
);

export const uploadsRouter = router;
