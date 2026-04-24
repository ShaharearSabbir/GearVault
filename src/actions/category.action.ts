"use server";

import prisma from "@/lib/prisma";
import categoryService from "@/services/category.service";
import { revalidatePath } from "next/cache";

export const deleteCategory = async (id: string) => {
  const result = await prisma.category.delete({ where: { id } });
  return result;
};

export const getCategories = async () => {
  try {
    const result = await categoryService.getAllCategories();

    if (!result) {
      return {
        success: false,
        message: "Something went wrong. Please try again",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again",
    };
  }
};

export const addCategory = async (name: string) => {
  try {
    const result = await categoryService.addCategory(name);
    revalidatePath("/admin-dashboard/categories");
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Something went wrong. Please try again",
    };
  }
};
