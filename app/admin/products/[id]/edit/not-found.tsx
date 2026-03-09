import Heading from "@/components/UI/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <Heading>Product not found</Heading>
      <p>Maybe you want to go back to products {" "}
        <Link className="text-green-400" href={'/admin/products?page=1'}>
        Go back
        </Link>
      </p>
    </div>
  )
}
