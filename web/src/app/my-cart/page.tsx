import Link from "next/link";
import { Total } from "@/components/ui/total";
import React from "react";
import { DeleteIcon, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartServiceFactory } from "@/services/cart.service";
import { getProductsByIds } from "@/services/product.service";
import { removeItemFromCartAction } from "@/server-actions/cart.action";

async function MyCartPage() {
  const cart = CartServiceFactory.create().getCart();
  const products = await getProductsByIds(
    cart.items.map((item) => item.product_id),
  );

  return (
    <div className="mx-14 mt-8">
      <div className="flex items-center gap-3 ">
        <ShoppingCart size={40} />{" "}
        <span className="text-4xl font-bold">Meu carrinho</span>
      </div>
      <div className="flex">
        <div className="w-full sm:w-[58%] md:w-1/3">
          <div>
            {cart.items.map((item, index) => {
              const product = products.find(
                (product) => product.id == item.product_id, //usar ===
              )!;

              return (
                <div key={index}>
                  <div className="mt-8 flex items-center gap-2">
                    <div>
                      <Avatar>
                        <AvatarImage src={product.image_url} />
                        <AvatarFallback>US</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className="text-lg font-semibold uppercase">
                        {product.name} - Qtd. {item.quantity}
                      </p>
                      <p>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item.total)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end p-0">
                    <form action={removeItemFromCartAction}>
                      <Input type="hidden" name="index" value={index} />
                      <Button
                        variant="destructive"
                        type="submit"
                        className="my-6 flex gap-2 text-base"
                      >
                        <DeleteIcon size={20} />
                        Excluir
                      </Button>
                    </form>
                  </div>
                  <Separator orientation="horizontal" />
                </div>
              );
            })}
            {!cart.items.length && (
              <div className="ml-2 mt-4 text-lg">
                <p>Nenhum item no carrinho</p>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            <Total total={cart.total} />
          </div>
          <div className="mt-6 flex justify-end">
            {cart.items.length ? (
              <Link href="/checkout">
                <Button>Finalizar compra</Button>
              </Link>
            ) : (
              <Link href="/products">
                <Button>Continuar comprando</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCartPage;
