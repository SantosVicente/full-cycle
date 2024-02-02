"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./input";
import { Search } from "lucide-react";
import { searchProducts } from "@/helpers/searchProducts";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="relative flex w-1/3 items-center">
      <div className="relative w-full">
        <Search
          className="absolute left-2 top-[20%] cursor-pointer"
          size={24}
        />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            const search = formData.get("search") as string;
            const category_id = searchParams.get("category_id");
            searchProducts(router, search, category_id);
          }}
        >
          <Input
            placeholder="Pesquisar. . ."
            className="w-full pl-10 pr-3"
            name="search"
            id="search"
            defaultValue={searchParams.get("search") ?? ""}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
