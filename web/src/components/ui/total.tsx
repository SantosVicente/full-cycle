import { Badge } from "@/components/ui/badge";
import { CircleDollarSign } from "lucide-react";

export function Total(props: { total: number }) {
  return (
    <>
      <Badge className="mt-1 gap-2 border-primary text-base font-bold">
        <CircleDollarSign size={20} />
        {`Total - ${new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(props.total)}`}
      </Badge>
    </>
  );
}
