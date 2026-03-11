"use server"
import { Product } from "@/src/schemas";
import { formatCurrency, getImagePath, isAvailable } from "@/src/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

export default async function ProductCard({product}:{product:Product}) {
    return (
      <div className="rounded bg-white shadow relative p-5">
        <div>
          <div className={`${!isAvailable(product.inventory) && 'opacity-40'}`}>
            <Image src={getImagePath(product.image)} alt={`Product Image ${product.image}`} width={400} height={600} unoptimized priority/>
          </div>

          <div className="p-3 space-y-2">
            <h3 className="text-xl font-bold text-gray-600">{product.name}</h3>
            <p className="text-gray-500">Available:{product.inventory}</p>
            <p className="text-2xl font-extrabold  text-gray-900">
              {formatCurrency(product.price)}
            </p>
          </div>
        </div>
        {
          isAvailable(product.inventory) ? (
                    <AddProductButton product={product}/>
          )
          :(
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2
             -translate-y-1/2 bg-white opacity-60 w-full text-center text-2xl uppercase font-black">Sold out</p>
          )
        }
      </div>
    );
}