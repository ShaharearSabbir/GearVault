"use server";

import {
  RegisterPayload,
  registerPayloadSchema,
} from "@/schema/register.schema";
import { authService } from "@/services/auth.service";

export const createUser = async (payload: RegisterPayload) => {
  const validation = registerPayloadSchema.safeParse(payload);

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0].message,
    };
  }

  try {
    const result = await authService.register(validation.data);

    return result;
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again",
    };
  }
};
