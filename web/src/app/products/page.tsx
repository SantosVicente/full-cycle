import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/models";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const products: Product[] = [
  {
    id: "1",
    name: "Produto 1",
    description: "Descrição do produto 1",
    price: 100,
    image_url: "https://source.unsplash.com/random?product",
    category_id: "1",
  },
  {
    id: "1",
    name: "Produto 1",
    description: "Descrição do produto 1",
    price: 100,
    image_url: "https://source.unsplash.com/random?product",
    category_id: "1",
  },
  {
    id: "1",
    name: "Produto 1",
    description: "Descrição do produto 1",
    price: 100,
    image_url: "https://source.unsplash.com/random?product",
    category_id: "1",
  },
  {
    id: "1",
    name: "Produto 1",
    description: "Descrição do produto 1",
    price: 100,
    image_url: "https://source.unsplash.com/random?product",
    category_id: "1",
  },
];

const Products = () => {
  return (
    <div className="mx-10 mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.length === 0 && (
        <div className="flex justify-center">
          <h5>Nenhum produto encontrado</h5>
        </div>
      )}
      {products.map((product, key) => (
        <div key={key} className="w-full">
          <Card className="flex h-full flex-col">
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
      ))}
    </div>
  );
};

export default Products;
