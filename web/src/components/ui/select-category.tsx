"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/models";

const SelectCategory = ({ categories }: { categories: Category[] }) => {
  return (
    <Select defaultValue="0">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Todas as Categorias" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">Todas as Categorias</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id.toString()}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;
