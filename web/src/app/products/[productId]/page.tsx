import { Card, CardContent } from "@/components/ui/card";
import { FileText, Tag } from "lucide-react";
import Image from "next/image";
import ProductQuantityForm from "./product-quantity-form";
import { getProduct } from "@/services/product.service";

const ProductDetailPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const product = await getProduct(params.productId);

  return (
    <div className="flex flex-col p-4 md:flex-row">
      <div className="relative h-[360px] w-full md:h-auto">
        <Image
          src={product.image_url}
          layout="fill"
          objectFit="cover"
          priority
          className="rounded-t-sm md:rounded-l-sm md:rounded-r-none"
          alt={product.name}
          sizes="100vw"
        />
      </div>
      <div className="w-full rounded-b-sm bg-accent px-3 pb-2 pt-6 md:w-[70%] md:rounded-r-sm">
        <h4 className="text-3xl">{product.name}</h4>
        <div className="mt-6 flex items-center gap-1 text-indigo-300">
          <FileText size={20} />
          <span>Descrição</span>
        </div>
        <p className="ml-3 mt-3">{product.description}</p>
        <div className="mt-6 flex items-center gap-1 text-indigo-300">
          <Tag size={20} />
          <span>Preço</span>
        </div>
        <p className="ml-3 mt-3">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <Card className="mt-10">
          <CardContent>
            <ProductQuantityForm product={product} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailPage;
