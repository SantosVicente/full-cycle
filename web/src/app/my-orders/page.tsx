import Link from "next/link";
import { Order, OrderStatus } from "../../models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckIcon, HourglassIcon, XIcon } from "lucide-react";
import { OrderServiceFactory } from "@/services/order.service";

export async function MyOrdersListPage() {
  const orders = await OrderServiceFactory.create().getOrders();

  return (
    <div className="mx-14 mt-8">
      <h4 className="mb-4 text-3xl font-bold">Meus pedidos</h4>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            return (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {new Date(order.created_at).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(order.total)}
                </TableCell>
                <TableCell>
                  {order.status === OrderStatus.PENDING ? (
                    <h5 className="flex items-center gap-1 font-semibold uppercase text-yellow-400">
                      <HourglassIcon size={16} /> - pendente
                    </h5>
                  ) : order.status === OrderStatus.PAID ? (
                    <h5 className="flex items-center gap-1 font-semibold uppercase text-green-500">
                      <CheckIcon size={18} /> - pagamento concluído
                    </h5>
                  ) : (
                    <h5 className="flex items-center gap-1 font-semibold uppercase text-red-500">
                      <XIcon size={18} /> - pagamento falhou
                    </h5>
                  )}
                </TableCell>
                <TableCell>
                  <Link href={`/my-orders/${order.id}`}>
                    <Button variant="default">Detalhes</Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default MyOrdersListPage;
