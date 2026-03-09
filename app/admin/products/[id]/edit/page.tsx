import EditproductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/UI/Heading";
import { ProductSchema } from "@/src/schemas";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
  const url = `${process.env.API_URL}/products/${id}`;
  const req = await fetch(url);
  const json = await req.json();
  if (!req.ok) {
    notFound();
  }
  const product = ProductSchema.parse(json);
  return product;
}
type Params = Promise<{ id: string }>;
export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <>
      <Link
        href={"/admin/products?page=1"}
        className="rounded bg-green-400 font-bold py-2 px-10"
      >
        Go back
      </Link>
      <Heading>Edit Product: {product.name}</Heading>
      {/* The structure is separated because ProductForm needs to fetch categories
      using a server action. The parent component (EditProductForm) is a client
      component and cannot run server code. Therefore the form and its fields
      are separated into different components. */}
      {/* client component */}
      <EditproductForm>
        <ProductForm product={product} />
      </EditproductForm>
    </>
  );
}
