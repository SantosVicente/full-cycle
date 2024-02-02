"use client";

import { Category } from "@/models";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useRouter, useSearchParams } from "next/navigation";
import { searchProducts } from "@/helpers/searchProducts";

const SelectCategory = ({ categories }: { categories: Category[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <>
      <Select
        defaultValue={searchParams.get("category_id") ?? "0"}
        onValueChange={(currentValue) => {
          const search = searchParams.get("search");
          const category_id = currentValue;

          searchProducts(router, search, category_id);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Todas as Categorias" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Todas as Categorias</SelectItem>
          {categories
            .filter(
              (category, index, self) =>
                self.findIndex((c) => c.name === category.name) === index,
            )
            .map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectCategory;
