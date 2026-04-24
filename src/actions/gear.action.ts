/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/lib/prisma";
import { getUser } from "./auth.action";
import { revalidatePath } from "next/cache";

export async function getMyGears() {
  const userData = await getUser();
  return await prisma.gear.findMany({
    where: { ownerId: userData?.user?.id },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function createGear(formData: FormData) {
  const userData = await getUser();
  
  // Parse dynamic data
  const rawSpecs = JSON.parse(formData.get("specifications") as string);
  const images = JSON.parse(formData.get("images") as string);
  
  const specifications = rawSpecs.reduce((acc: any, item: any) => {
    if (item.key) acc[item.key] = item.value;
    return acc;
  }, {});

  await prisma.gear.create({
    data: {
      name: formData.get("name") as string,
      brand: formData.get("brand") as string,
      modelNumber: (formData.get("modelNumber") as string) || null,
      serialNumber: formData.get("serialNumber") as string,
      dailyRate: Number(formData.get("dailyRate")),
      categoryId: formData.get("categoryId") as string,
      status: (formData.get("status") as any) || "AVAILABLE",
      condition: (formData.get("condition") as any) || "EXCELLENT",
      description: (formData.get("description") as string) || null,
      images,
      specifications,
      ownerId: userData?.user?.id as string,
    },
  });

  revalidatePath("/dashboard/my-gear");

  return { success: true };
}

export async function deleteGear(id: string) {
  await prisma.gear.delete({ where: { id } });
  revalidatePath("/dashboard/my-gear");

  return { success: true };
}
