"use client";
import { UseStore } from "@/src/store";
import ShoppingCartItem from "./SchoppingCartItem";
import Amount from "./Amount";
import CouponForm from "./CouponForm";
export default function SchoppingCard() {
  const contents = UseStore((state) => state.contents);
  const total = UseStore((state) => state.total);
  const discount = UseStore((state) => state.discount);

  return (
    <>
      {contents.length ? (
        <>
          <h2 className="text-4xl font-bold text-gray-900">Sel Summarys</h2>
          <ul
            role="list"
            className="mt-6 divide-y divide-gray-200 border-t border-gray-200"
          >
            {contents.map((item) => (
              <ShoppingCartItem key={item.productId} item={item} />
            ))}
          </ul>
          <dl className="space-y-6 border-t border-gray-300 py-6 text-sm font-medium text-gray-500">
            {discount ? (
              <Amount label="Discount" amount={discount} discount={true} />
            ): null}
            <Amount label="Total" amount={total} />
          </dl>
          <CouponForm/>
        </>
      ) : (
        <p className="text-2xl  text-center text-gray-900">Empty Cart</p>
      )}
    </>
  );
}
