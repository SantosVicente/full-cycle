"use client";

import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Product } from "../../../models";
import { useEffect, useState } from "react";
import { Settings, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Total } from "@/components/ui/total";
import { addToCartAction } from "@/server-actions/cart.action";

const schema = yup
  .object({
    product_id: yup.string().uuid().required(),
    quantity: yup.number().required().integer().min(1),
  })
  .required();

const ProductQuantityForm = (props: { product: Product }) => {
  const { product } = props;

  const { control, register, getValues, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      product_id: product.id,
      quantity: 1,
    },
  });

  const [total, setTotal] = useState(product.price * getValues()["quantity"]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "quantity" || name?.includes("attributes")) {
        setTotal(product.price * getValues()["quantity"]);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, product, getValues]);

  return (
    <form
      className="px-1 py-5"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const quantityValue = getValues().quantity;
        const formData = new FormData(form);
        formData.set("quantity", quantityValue.toString());
        addToCartAction(formData);
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Settings size={20} />
          <h6>Configure sua compra</h6>
        </div>
        <div className="hidden md:block">
          <Total total={total} />
        </div>
      </div>
      <Input
        type="hidden"
        value={props.product.id}
        {...register("product_id")}
      />
      <Controller
        name="quantity"
        control={control}
        defaultValue={1}
        render={({ field, fieldState }) => (
          <div className="my-2">
            <span>Quantidade: {field.value}</span>
            <Slider
              className="mt-5"
              step={1}
              min={1}
              max={10}
              value={[field.value]}
              onValueChange={(newValue) => {
                field.onChange(newValue);
                setTotal(Number(product.price) * Number(newValue[0]));
              }}
            />
          </div>
        )}
      />
      <Separator className="mt-8" />
      <div className="mb-2 mt-8 flex justify-end">
        <Button type="submit" size={"lg"} className="mt-3 gap-2 text-base">
          <ShoppingCart size={23} />
          Colocar no carrinho
        </Button>
      </div>
    </form>
  );
};

export default ProductQuantityForm;
