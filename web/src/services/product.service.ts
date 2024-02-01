import { Product } from "@/models";

export async function getProducts(): Promise<Product[]> {
  const products = await fetch(`${process.env.CATALOG_API_URL}/product`, {
    next: {
      revalidate: 1,
    },
  });
  return products.json();
}

export async function getProduct(productId: string): Promise<Product> {
  const products = await fetch(
    `${process.env.CATALOG_API_URL}/product/${productId}`,
    {
      next: {
        revalidate: 1,
      },
    },
  );
  return products.json();
}
