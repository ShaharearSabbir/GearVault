import prisma from "@/lib/prisma";

const categoryService = {
  getAllCategories: async () => {
    const result = await prisma.category.findMany({ orderBy: { name: "asc" } });
    return result;
  },

  addCategory: async (name: string) => {
    const result = await prisma.category.create({
      data: {
        name,
      },
    });

    return result;
  },
};

export default categoryService;
