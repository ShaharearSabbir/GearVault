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

export async function getPaginatedGears(
  page: number = 0,
  search?: string,
  categoryId?: string,
  sortBy?: string,
) {
  const limit = 9;

  // Build dynamic where clause
  const where: any = { status: "AVAILABLE" };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { brand: { contains: search, mode: "insensitive" } },
    ];
  }

  if (categoryId && categoryId !== "all") {
    where.categoryId = categoryId;
  }

  // Build dynamic orderBy
  let orderBy: any = { createdAt: "desc" };
  if (sortBy === "price-low") orderBy = { dailyRate: "asc" };
  if (sortBy === "price-high") orderBy = { dailyRate: "desc" };

  const gears = await prisma.gear.findMany({
    where,
    include: { category: true },
    orderBy,
    skip: page * limit,
    take: limit,
  });

  return gears.map((gear) => ({
    ...gear,
    dailyRate: gear.dailyRate.toNumber(),
    createdAt: gear.createdAt.toISOString(),
  }));
}