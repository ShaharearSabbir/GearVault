import { Role } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const adminData = {
  email: "admin@gearvault.com",
  password: "yhbnju",
};

const seedAdmin = async () => {
  try {
    console.log("🚀 Starting admin seed...");

    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    const result = await prisma.user.upsert({
      where: { email: adminData.email },
      update: {
        password: hashedPassword,
        role: Role.ADMIN,
      },
      create: {
        email: adminData.email,
        password: hashedPassword,
        role: Role.ADMIN,
        emailVerified: true,
        name: "Super Admin",
      },
    });

    console.log(`✅ Admin ready: ${result.email}`);
    console.log("Credentials:", adminData);
  } catch (err) {
    console.error("❌ User creation failed:");
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

seedAdmin();
