import Image from "next/image";
import { Button } from "./button";
import { Home, ShoppingCart } from "lucide-react";
import Link from "next/link";
import SelectCategory from "./select-category";
import SearchBar from "./search-bar";
import UserMenu from "./user-menu";

const Navbar = () => {
  return (
    <div className="w-full bg-primary px-14">
      <div className="flex items-center gap-2 ">
        <Image
          src={"/logo.png"}
          width={147.66}
          height={63.66}
          alt="logo"
          priority
          className="mb-3"
        />
        <div className="flex flex-grow justify-center">
          <SearchBar />
        </div>
        <Button size={"icon"}>
          <Link href="/my-cart">
            <ShoppingCart size={24} />
          </Link>
        </Button>
        <UserMenu user={{}} />
      </div>
      <div className="flex content-center py-1">
        <SelectCategory categories={[]} />

        <Link
          className="ml-3 flex items-center justify-center gap-1"
          href={"/products"}
        >
          <Image src={"/house-solid.svg"} width={24} height={24} alt={"home"} />
          <p className="flex font-bold">Home</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
