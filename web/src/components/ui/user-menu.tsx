"use client";

import { LayoutList, LogOutIcon, ShoppingCart, UserCircle } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export type UserMenuProps = {
  user: any | null;
};

const UserMenu = ({ user }: UserMenuProps) => {
  const router = useRouter();

  const redirectToCart = () => {
    router.push("/my-cart");
  };

  const redirectToMyOrders = () => {
    router.push("/my-orders");
  };

  return user ? (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={redirectToCart}>
            <ShoppingCart size={24} />
            <span>Meu Carrinho</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={redirectToMyOrders}>
            <LayoutList size={24} />
            <span>Meus Pedidos</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOutIcon />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  ) : (
    <Link href="/login">
      <p className="ml-3 font-bold">Entrar</p>
    </Link>
  );
};

export default UserMenu;
