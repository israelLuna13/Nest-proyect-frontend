"use server"
import { CategoriesResponseSchema } from "@/src/schemas";
import Logo from "./Logo";
import Link from "next/link";
import MenuSort from "./MenuSort"
async function getCategorys(){
    const url =`${process.env.API_URL}/categories`
    const req = await fetch(url)
    const json = await req.json()

    const categorys = CategoriesResponseSchema.parse(json)
    return categorys
    
}
export default async function MainNav() {
    const categorys=await getCategorys()
    
  return (
    <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between ">
      <div className="flex justify-center">
        <Logo />
      </div>

      <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0 py-2">
        {categorys.map((category) => (
          <Link
            key={category.id}
            href={`/${category.id}`}
            className="text-white hover:text-green-400 font-bold p-2"
          >
            {category.name}
          </Link>
        ))}
        <MenuSort/>
      </nav>
      <Link
        href={"/admin/sales/"}
        className=" bg-green-500 font-bold my-3 px-10 py-2"
      >
        Panel Administrator
      </Link>
    </header>
  );
}