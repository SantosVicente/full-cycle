import { Category } from "@/models";

export async function getCategories(): Promise<Category[]> {
  const category = await fetch(`${process.env.CATALOG_API_URL}/category`, {
    next: {
      revalidate: 1,
    },
  });
  return category.json();
}

export async function getCategory(categoryId: string): Promise<Category> {
  const category = await fetch(
    `${process.env.CATALOG_API_URL}/category/${categoryId}`,
    {
      next: {
        revalidate: 1,
      },
    },
  );
  return category.json();
}
