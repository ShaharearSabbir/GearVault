import { env } from "@/env";
import prisma from "@/lib/prisma";
import { RegisterPayload } from "@/schema/register.schema";
import { Jwt } from "@/utils/jwt";
import { sendEmail } from "@/utils/sendEmail";
import bcrypt from "bcryptjs";

export const authService = {
  register: async (payload: RegisterPayload) => {
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

    const token = Jwt.sign({ id: result.id });

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
};
