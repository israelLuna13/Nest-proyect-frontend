"use client"
import { CartItem } from "@/src/schemas";
import { UseStore } from "@/src/store";
import { formatCurrency, getImagePath } from "@/src/utils";
import Image from "next/image";

export default function ShoppingCartItem({ item }: { item: CartItem }) {
  const updateQuantity = UseStore((store) => store.updateQuantity);
  const removeFromCart = UseStore((store) => store.removeFromCart);
  return (
    <li className="flex items-center space-x-6 py-6 relative">
      <div className="h-24 w-24">
        {/* I HAVE TO USE NEXT_API_URL 'CAUSE IT RUNS IN THE CLIENT, IN THE SERVER IS ONLY API_URL*/}
        <Image
          src={getImagePath(item.image)}
          alt={`Product image ${item.image}`}
          width={100}
          height={100}
          unoptimized
          priority
        />
      </div>
      <div className="flex-auto space-y-2">
        <h3 className="text-gray-900">{item.name}</h3>
        <p>{formatCurrency(item.price)}</p>
        <select
          className="w-32 text-center p-2 rounded-lg bg-gray-200"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.productId, +e.target.value)}
        >
          {/* create an array from 1 to the available inventory to render quantity options dinamically*/}
          {Array.from({ length: item.inventory }, (_, index) => index + 1).map(
            (num) => (
              <option key={num}>{num}</option>
            ),
          )}
        </select>
      </div>
      <div className="absolute top-10 right-0">
        <button type="button" onClick={() => removeFromCart(item.productId)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
