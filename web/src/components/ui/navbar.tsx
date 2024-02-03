import Image from "next/image";
import { Button } from "./button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import SelectCategory from "./select-category";
import SearchBar from "./search-bar";
import UserMenu from "./user-menu";
import { getCategories } from "@/services/category.service";
import { AuthService } from "@/services/auth.service";

const Navbar = async () => {
  const categories = await getCategories();
  const user = new AuthService().getUser();

  return (
    <div className="w-full bg-primary px-14">
      <div className="flex items-center gap-2 ">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            width={147.66}
            height={63.66}
            alt="logo"
            priority
            className="mb-3"
          />
        </Link>
        <div className="flex flex-grow justify-center">
          <SearchBar />
        </div>
        <Link href="/my-cart">
          <Button size={"icon"}>
            <ShoppingCart size={24} />
          </Button>
        </Link>
        <UserMenu user={user} />
      </div>
      <div className="flex content-center py-1">
        <SelectCategory categories={categories ?? []} />

        <Link
          className="ml-3 flex items-center justify-center gap-1"
          href={"/products"}
        >
          <Image
            src={"/house-solid.svg"}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "24px", height: "auto" }}
            alt={"home"}
          />
          <p className="flex font-bold">Home</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
