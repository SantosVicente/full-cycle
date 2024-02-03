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
import { logoutAction } from "@/server-actions/auth.action";

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

  const handleLogout = async () => {
    await logoutAction();
  };

  return user ? (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={undefined} />
            <AvatarFallback>
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="uppercase">
            Olá, <span className="font-bold">@{user.username}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={redirectToCart} className="gap-2">
            <ShoppingCart size={20} />
            <span>Meu Carrinho</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={redirectToMyOrders} className="gap-2">
            <LayoutList size={20} />
            <span>Meus Pedidos</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="gap-2">
            <LogOutIcon size={20} />
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
