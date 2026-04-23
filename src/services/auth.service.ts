import { env } from "@/env";
import prisma from "@/lib/prisma";
import { RegisterPayload } from "@/schema/register.schema";
import { Jwt } from "@/utils/jwt";
import { sendEmail } from "@/utils/sendEmail";
import bcrypt from "bcryptjs";
import { AccessTokenPayload, VerificationTokenPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export const authService = {
  register: async (payload: RegisterPayload) => {
    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (user) {
      return {
        success: false,
        message: "User already exists.",
      };
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const result = await prisma.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
      },
    });

    if (!result) {
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }

    const token = Jwt.sign(
      { id: result.id, email: result.email },
      { expiresIn: "10m" },
    );

    const verificationUrl = `${env.APP_URL}/verify-email?token=${token}`;

    const verifyEmail = await sendEmail(
      payload.email,
      "Verify your email on GearVault",
      "welcome",
      { verificationUrl },
    );

    if (!verifyEmail.success) {
      await prisma.user.delete({
        where: {
          email: payload.email,
        },
      });
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }

    return {
      success: true,
      message: `User created successfully, a verification link has been sent to ${payload.email}.`,
    };
  },

  verifyUserToken: async (token: string) => {
    const payload = Jwt.verify(token) as VerificationTokenPayload;

    if (!payload) {
      return {
        success: false,
        error: "Invalid or missing verification token.",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found.",
      };
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: true,
      },
    });

    return {
      success: true,
      message: "User verified successfully and can now log in.",
    };
  },

  login: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    if (!user.emailVerified) {
      return {
        success: false,
        message: "User is not verified.",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid password.",
      };
    }

    const accessToken = Jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
      {
        expiresIn: "1d",
      },
    );

    const refreshToken = Jwt.sign(
      {
        id: user.id,
      },
      {
        expiresIn: "30d",
      },
    );

    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      DOB: user.DOB,
      NID: user.NID,
      address: user.address,
      division: user.division,
      district: user.district,
      thana: user.thana,
      mobile: user.mobile,
      emailVerified: user.emailVerified,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return {
      success: true,
      message: "Login successful.",
      accessToken,
      refreshToken,
      user: userWithoutPassword,
    };
  },

  getUser: async (id: string) => {

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      DOB: user.DOB,
      NID: user.NID,
      address: user.address,
      division: user.division,
      district: user.district,
      thana: user.thana,
      mobile: user.mobile,
      emailVerified: user.emailVerified,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return {
      success: true,
      message: "User Data Fetched Successfully.",
      user: userWithoutPassword,
    };
  },
};
