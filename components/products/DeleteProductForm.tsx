import { revalidatePath } from "next/cache"
// Server actions can be defined inside a component or in a separate file.
//
// Simple actions (like delete) are often defined directly in the component
// because they don't require validation or state handling.
//
// More complex actions (create/update) are usually separated into their own
// files to handle validation, errors, and to keep components clean.
export default function DeleteProductForm({productId}:{productId:number}) {
    const handleDeleteProduct= async()=>{
        "use server"
        const url =`${process.env.API_URL}/products/${productId}`
        const req = await fetch(url,{
            method:'DELETE'
        })
        await req.json()
        revalidatePath('/admin/products')
    }
  return (
    <form action={handleDeleteProduct}>
      <input
        type="submit"
        className="text-red-600 hover:text-red-800 cursor-pointer"
        value="Delete"
      />
    </form>
  );
}
