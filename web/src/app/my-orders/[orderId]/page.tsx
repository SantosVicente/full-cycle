import { CheckIcon, HourglassIcon, XIcon } from "lucide-react";
import { Order, OrderStatus } from "../../../models";
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
import { AuthService, AuthServiceFactory } from "@/services/auth.service";
import { redirect } from "next/navigation";

async function MyOrderDetail({ params }: { params: { orderId: string } }) {
  const order = await OrderServiceFactory.create().getOrder(params.orderId);
  const isTokenExpired = AuthServiceFactory.create().isTokenExpired();

  if (isTokenExpired) {
    return redirect(`/login?redirect_to=/my-orders/${params.orderId}`);
  }

  return (
    <div className="mx-14 mt-10">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="flex justify-center">
            {order.status === OrderStatus.PENDING ? (
              <div className="text-yellow-400">
                <HourglassIcon size={90} />
              </div>
            ) : order.status === OrderStatus.PAID ? (
              <div className="text-green-500">
                <CheckIcon size={90} />
              </div>
            ) : (
              <div className="text-red-500">
                <XIcon size={90} />
              </div>
            )}
          </div>
          <h4 className="text-center text-4xl font-bold">
            {order.status === OrderStatus.PENDING
              ? "Pedido pendente"
              : order.status === OrderStatus.PAID
                ? "Pedido pago"
                : "Pedido cancelado"}
          </h4>
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
                      }).format(item.product.price)}
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

export default MyOrderDetail;
