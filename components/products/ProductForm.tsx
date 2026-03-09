"use server"

import { CategoriesResponseSchema, Product } from "@/src/schemas"

async function getCategorys(){
  const url = `${process.env.API_URL}/categories`
  const req = await fetch(url)
  const json = await req.json()
  const categories = CategoriesResponseSchema.parse(json)
  return categories  
}
export default async function ProductForm({product}:{product?:Product}) {
  const categories = await getCategorys()

  return (
    <>
      <div className="space-y-2 ">
        <label
          htmlFor="name"
          className="block"
        >Product name</label>
        <input
          id="name"
          type="text"
          placeholder="Nombre Producto"
          className="border border-gray-300 w-full p-2"
          name="name"
          defaultValue={product?.name}
        />
      </div>

      <div className="space-y-2 ">
        <label
          htmlFor="price"
          className="block"
        >Price</label>
        <input
          id="price"
          type="number"
          placeholder="Precio Producto"
          className="border border-gray-300 w-full p-2"
          name="price"
          min={0}
          defaultValue={product?.price}
        />
      </div>

      <div className="space-y-2 ">
        <label
          htmlFor="inventory"
          className="block"
        >Inevntory</label>
        <input
          id="inventory"
          type="number"
          placeholder="Cantidad Disponible"
          className="border border-gray-300 w-full p-2"
          name="inventory"
          min={0}
          defaultValue={product?.inventory}
        />
      </div>

      <div className="space-y-2 ">
        <label
          htmlFor="categoryId"
          className="block"
        >Category</label>
        <select
          id="categoryId"
          className="border border-gray-300 w-full p-2 bg-white"
          name="categoryId" 
          defaultValue={product?.categoryId}
        >
          <option value="">Select category</option>
          {categories.map(category=>(
            <option value={category.id} key={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

    </>
  )
}