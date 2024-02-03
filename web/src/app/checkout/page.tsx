import { redirect } from "next/navigation";
import { Total } from "@/components/ui/total";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckoutForm } from "./CheckoutForm";
import { Separator } from "@/components/ui/separator";
import { CartServiceFactory } from "@/services/cart.service";
import { getProductsByIds } from "@/services/product.service";

async function CheckoutPage() {
  const cart = CartServiceFactory.create().getCart();
  const products = await getProductsByIds(
    cart.items.map((item) => item.product_id),
  );

  if (cart.items.length === 0) {
    return redirect("/my-cart");
  }

  return (
    <div className="mx-14 mt-8 flex flex-col gap-8">
      <h3 className="text-3xl font-bold">Checkout</h3>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <CheckoutForm />
        </div>

        <div className="hidden w-[17%] justify-center lg:flex">
          <Separator orientation="vertical" />
        </div>

        <div className="w-full lg:w-1/3">
          <h5 className="text-lg font-bold">Resumo do pedido</h5>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Qtd.</TableHead>
                <TableHead>Preço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.items.map((item, key) => {
                const product = products.find(
                  (product) => product.id == item.product_id,
                )!;
                return (
                  <TableRow key={key}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.total)}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={3}>
                  <div className="mb-2 flex justify-end">
                    <Total total={cart.total} />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
