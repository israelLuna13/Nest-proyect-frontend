import AddproductForm from "@/components/products/AddproductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/UI/Heading";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <>
      <Link
        href={"/admin/products?page=1"}
        className="rounded bg-green-400 font-bold py-2 px-10"
      >
        Go back
      </Link>
      <Heading>Administrar Products</Heading>
      {/* The structure is separated because ProductForm needs to fetch categories
      using a server action. The parent component (AddProductForm) is a client
      component and cannot run server code. Therefore the form and its fields
      are separated into different components. */}
      {/* client component */}
      <AddproductForm>
        {/* server component */}
        <ProductForm />
      </AddproductForm>
    </>
  );
}
