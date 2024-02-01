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

const order: Order = {
  id: "1",
  items: [
    {
      id: 1,
      quantity: 1,
      price: 100,
      product: {
        id: "1",
        name: "Produto 1",
        description: "Descrição do produto 1",
        price: 100,
        image_url: "https://source.unsplash.com/random?product",
        category_id: "1",
      },
    },
    {
      id: 2,
      quantity: 2,
      price: 200,
      product: {
        id: "2",
        name: "Produto 2",
        description: "Descrição do produto 2",
        price: 200,
        image_url: "https://source.unsplash.com/random?product",
        category_id: "1",
      },
    },
  ],
  total: 1000,
  status: OrderStatus.PENDING,
  created_at: new Date().toISOString(),
};

async function MyOrderDetail({ params }: { params: { orderId: string } }) {
  //  const order = await OrderServiceFactory.create().getOrder(params.orderId);

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
