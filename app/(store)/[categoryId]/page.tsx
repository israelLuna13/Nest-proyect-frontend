"use server";
import { CategoryWithProductsResponseSchema } from "@/src/schemas";
import ProductCard from "@/components/products/ProductCard";
import { notFound, redirect } from "next/navigation";
// new mean to get params / params type
type SearchParams=Promise<{
  key:string,
  order:string
}>
type Params = Promise<{ categoryId: string}>;
const params = new URLSearchParams()
async function getProducts(categoryId: string, sort?:string, order?:string) {
  params.set('products','true')
  if(sort){
    params.set('key',sort)
  }
  if(order){
    params.set('order',order)

  } 
      const url = `${process.env.API_URL}/categories/${categoryId}?${params.toString()}`;

  // const req = await fetch(url,{
  //   next:{
  //     tags:['products-by-category']
  //   }
  // })  
  const req = await fetch(url);
  const json = await req.json();
 
  if(req.status === 404) notFound()
  
  if (!req.ok) {
    redirect("/1");
  }
  const products = CategoryWithProductsResponseSchema.parse(json);
  return products;
}

export default async function StorePage({ params, searchParams }: { params: Params ,searchParams:SearchParams}) {
  const { categoryId } = await params;
  const {key,order} =  await searchParams
  
  const category = await getProducts(categoryId,key,order);
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {category.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
