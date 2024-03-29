import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { Product } from "@/models";
import { getProduct } from "./product.service";

export type CartItem = {
  product_id: string;
  quantity: number;
  total: number;
};

export type Cart = {
  items: CartItem[];
  total: number;
};

export class CartService {
  cookieStore: ReadonlyRequestCookies;
  constructor(private getProduct: (productId: string) => Promise<Product>) {
    this.cookieStore = cookies();
  }

  async addToCart(input: { product_id: string; quantity: number }) {
    const cartString = this.cookieStore.get("cart")?.value;

    if (!cartString) {
      this.cookieStore.set("cart", JSON.stringify({ items: [], total: 0 }));
    }

    const cart: Cart = cartString
      ? JSON.parse(cartString)
      : { items: [], total: 0 };

    const { product_id, quantity } = input;

    const product = await this.getProduct(product_id);

    const productPrice = product.price * quantity;

    cart.items.push({
      product_id,
      quantity,
      total: productPrice,
    });
    cart.total += productPrice;

    this.cookieStore.set("cart", JSON.stringify(cart));
  }

  removeItemFromCart(index: number) {
    const cartRaw = this.cookieStore.get("cart")?.value;

    const cart: Cart = cartRaw ? JSON.parse(cartRaw) : { items: [] };

    cart.items.splice(index, 1);

    cart.total = cart.items.reduce((acc, item) => acc + item.total, 0);

    this.cookieStore.set("cart", JSON.stringify(cart));
  }

  getCart() {
    const cartRaw = this.cookieStore.get("cart")?.value;

    const cart: Cart = cartRaw ? JSON.parse(cartRaw) : { items: [], total: 0 };

    return cart;
  }

  clearCart() {
    this.cookieStore.delete("cart");
  }
}

export class CartServiceFactory {
  static create() {
    return new CartService(getProduct);
  }
}
