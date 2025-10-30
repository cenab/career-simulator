import type { Response } from "express";

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiSuccessEnvelope<TData> {
  data: TData;
  meta?: Record<string, unknown>;
}

export const sendSuccess = <T>(
  res: Response,
  payload: ApiSuccessEnvelope<T>["data"],
  meta?: ApiSuccessEnvelope<T>["meta"],
) => {
  return res.json({ data: payload, meta });
};

export const sendAccepted = <T>(
  res: Response,
  payload: ApiSuccessEnvelope<T>["data"],
  meta?: ApiSuccessEnvelope<T>["meta"],
) => {
  return res.status(202).json({ data: payload, meta });
};
