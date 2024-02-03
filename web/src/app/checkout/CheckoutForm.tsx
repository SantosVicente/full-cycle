"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkoutAction } from "@/server-actions/checkout.action";
import { CircleDollarSign } from "lucide-react";

export function CheckoutForm() {
  return (
    <form
      action={async (formData: FormData) => {
        //logica para gerar o card hash
        formData.set("cart_hash", "123456");
        await checkoutAction(formData);
      }}
    >
      <h5 className="mb-2 text-lg font-bold">Dados de pagamento</h5>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Nome no cartão</Label>
          <Input
            name="cc-name"
            id="name"
            required
            width={"full"}
            autoComplete="cc-name"
            defaultValue={"João da Silva"}
          />
        </div>
        <div>
          <Label htmlFor="cardNumber">Número do cartão</Label>
          <Input
            name="cc-number"
            id="cardNumber"
            required
            width={"full"}
            autoComplete="cc-number"
            defaultValue={"4111111111111111"}
          />
        </div>
        <div>
          <Label htmlFor="exp">Data de expiração MM/YYYY</Label>
          <Input
            name="cc-exp"
            id="exp"
            required
            width={"full"}
            autoComplete="cc-exp"
            defaultValue={"12/2022"}
          />
        </div>
        <div>
          <Label htmlFor="cvv">{"CVV (Código de segurança)"}</Label>
          <Input
            name="cc-csc"
            id="cvv"
            required
            width={"full"}
            autoComplete="cc-csc"
            defaultValue={"123"}
          />
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button
          type="submit"
          className="mt-3 flex items-center gap-2 uppercase"
        >
          <CircleDollarSign size={20} />
          Pagar
        </Button>
      </div>
    </form>
  );
}
