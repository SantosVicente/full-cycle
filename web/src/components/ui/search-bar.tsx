"use client";

//import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./input";
import { Search } from "lucide-react";

const SearchBar = () => {
  //const searchParams = useSearchParams();

  return (
    <div className="relative flex w-1/3 items-center">
      <div className="relative w-full">
        <Search
          className="absolute left-2 top-[20%] cursor-pointer"
          size={24}
        />
        <Input placeholder="Pesquisar . . ." className="w-full pl-10 pr-3" />
      </div>
    </div>
  );
};

export default SearchBar;
