"use client";

import { editProduct } from "@/actions/edit-product-action";
import { useParams, useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditproductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  const {id} = useParams<{id:string}>()
  const updateProductWithId= editProduct.bind(null,+id)
  const [state, dispatch] = useActionState(updateProductWithId, {
    errors: [],
    success: "",
  });
  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => toast.error(error));
    }

    if (state.success) {
      toast.success(state.success);
      router.push('/admin/products?page=1')
    }
  }, [state,router]);
  return (
    <form action={dispatch} className="space-y-5">
      {children}
      <input
        type="submit"
        className="bg-green-400 font-bold py-2 w-full cursor-pointer"
        value="Edit product"
      />
    </form>
  );
}
