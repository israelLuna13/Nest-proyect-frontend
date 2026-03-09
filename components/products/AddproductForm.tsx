"use client";
import { addProduct } from "@/actions/add-product-action";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddproductForm({children,}: {children: React.ReactNode;}) {
  const router = useRouter();
  const [state, dispatch] = useActionState(addProduct, {
    errors: [],
    success: "",
  });
  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => toast.error(error));
    }
    if (state.success) {
      toast.success(state.success);
      router.push("/admin/products?page=1");
    }
  }, [state,router]);
  return (
    <form action={dispatch} className="space-y-5">
      {children}
      <input
        type="submit"
        className="bg-green-400 font-bold py-2 w-full cursor-pointer"
        value="Add product"
      />
    </form>
  );
}
