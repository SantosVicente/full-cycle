import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/models";
import { FrownIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getProducts({
  search,
  category_id,
}: {
  search?: string;
  category_id?: string;
}): Promise<Product[]> {
  const urlSearchParams = new URLSearchParams();

  if (search) {
    urlSearchParams.append("search", search);
  }

  if (category_id) {
    urlSearchParams.append("category_id", category_id);
  }

  let url = `${process.env.NEXT_API_URL}/products`;

  if (urlSearchParams.toString()) {
    url += `?${urlSearchParams.toString()}`;
  }

  const response = await fetch(url, {
    next: {
      revalidate: 1,
    },
  });

  return response.json();
}

const Products = async ({
  searchParams,
}: {
  searchParams: { search?: string; category_id?: string };
}) => {
  const search = searchParams.search;
  const category_id = searchParams.category_id;
  const products = await getProducts({ search, category_id });

  return (
    <div className="mx-10 mb-6 mt-8 ">
      {products?.length === 0 ||
        (!products && (
          <div className="flex w-full flex-col items-center justify-center gap-1">
            <h5 className="text-2xl font-bold uppercase">
              Nenhum produto encontrado
            </h5>
            <FrownIcon size={30} />
          </div>
        ))}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          //ordene os produtos por nome
          products &&
            products
              .sort((a, b) => {
                const numA = parseInt(a.name.replace("Product ", ""));
                const numB = parseInt(b.name.replace("Product ", ""));
                return numA - numB;
              })
              .map((product, key) => (
                <div key={key} className="w-full">
                  <Card className="flex h-full flex-col border border-zinc-700">
                    <div className="relative h-0 w-full pt-[56.25%]">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        layout="fill"
                        className="rounded-t-md"
                        objectFit="cover"
                        priority
                      />
                    </div>

                    <CardContent className="mt-5 flex-grow">
                      <h5 className="text-xl font-bold">{product.name}</h5>
                      <p>
                        {product.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </CardContent>
                    <CardFooter className="mt-2 flex justify-end">
                      <Link href={`/products/${product.id}`}>
                        <Button size={"sm"} className="flex gap-1">
                          <ShoppingCart size={24} />
                          Comprar
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              ))
        }
      </div>
    </div>
  );
};

export default Products;
