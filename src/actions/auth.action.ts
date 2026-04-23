"use server";

import {
  RegisterPayload,
  registerPayloadSchema,
} from "@/schema/register.schema";
import { authService } from "@/services/auth.service";
import { Cookie } from "@/utils/cookie";
import { Jwt } from "@/utils/jwt";
import { AccessTokenPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

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

export const verifyUserToken = async (token: string) => {
  try {
    const result = await authService.verifyUserToken(token);
    return result;
  } catch {
    return {
      success: false,
      message: "Verification failed or token expired.",
    };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const result = await authService.login(email, password);

    if (!result.success) {
      return result;
    }

    const { accessToken, refreshToken } = result;

    await Cookie.set("accessToken", accessToken as string, 7);
    await Cookie.set("refreshToken", refreshToken as string, 7);

    return result;
  } catch {
    return {
      success: false,
      message: "Login failed. Please try again.",
    };
  }
};

export const getUser = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  const payload = Jwt.verify(accessToken) as AccessTokenPayload;

  if (!payload) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  const id = payload.id;

  const user = await authService.getUser(id);

  if (!user) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  return user;

};


export const logout = async () => {
  await Cookie.clear("accessToken");
  await Cookie.clear("refreshToken");

  return {
    success: true,
    message: "Logout successful.",
  };
};