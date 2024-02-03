import { CheckIcon } from "lucide-react";
import { Order, OrderStatus } from "../../../../models";
import { Total } from "@/components/ui/total";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderServiceFactory } from "@/services/order.service";

async function CheckoutSuccessPage({
  params,
}: {
  params: { orderId: string };
}) {
  const orderService = OrderServiceFactory.create();
  const order = await orderService.getOrder(params.orderId);

  return (
    <div className="mx-14 mt-10">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center">
              <CheckIcon size={120} className="mr-6 text-xl text-green-400" />
            </div>
            <h4 className="text-center text-3xl font-bold">
              Pedido realizado com sucesso!
            </h4>
          </div>
        </div>
        <div>
          <h4 className="text-3xl font-bold">Resumo do pedido</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Qtd.</TableHead>
                <TableHead>Preço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.price * item.quantity)}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={3}>
                  <div className="flex justify-end">
                    <Total total={order.total} />
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

export default CheckoutSuccessPage;
