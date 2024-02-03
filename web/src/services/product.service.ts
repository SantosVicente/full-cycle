import { Product } from "@/models";

export async function getProducts({
  search,
  category_id,
}: {
  search: string | undefined;
  category_id: string | undefined;
}): Promise<Product[]> {
  let url = `${process.env.CATALOG_API_URL}/product`;

  if (category_id) {
    url += `/category/${category_id}`;
  }

  const products = await fetch(url, {
    next: {
      revalidate: 1,
    },
  });
  const data = await products.json();
  if (search) {
    return data?.filter((product: Product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }
  return data;
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

export async function getProductsByIds(
  productIds: string[],
): Promise<Product[]> {
  const responses = await Promise.all(
    productIds.map((productId) =>
      fetch(`${process.env.CATALOG_API_URL}/product/${productId}`, {
        next: {
          revalidate: 1,
        },
      }),
    ),
  );

  return Promise.all(responses.map((response) => response.json()));
}
