import { SubmitEvent } from "react"
import { UseStore } from "@/src/store"
export default function CouponForm() {
    const applyCoupon = UseStore(state => state.applyCoupon)
    const coupon = UseStore(state => state.coupon)
const handleSubmit= async(e: SubmitEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const coupoName=formData.get('coupon_name')?.toString()
    if( coupoName === undefined || !coupoName.length) return
    await applyCoupon(coupoName)
}
  return (
    <>
    <p className="py-5 font-bold border-t border-gray-300">Apply coupon</p>
          <form 
            className="flex" 
            onSubmit={handleSubmit}
          >
            <input 
                type="text"
                className="p-2 bg-gray-200 border-gray-300 w-full"
                placeholder="Ingresa un cupón"
                name="coupon_name"
            />
            <input 
                type="submit"
                className="p-3 bg-green-400 font-bold hover:cursor-pointer"
                value='Canjear'
            />
          </form>
          {coupon.message ? (
            <p className="py-4 text-center text-sm font-extrabold">{coupon.message}</p>
          ) :null}
    </>
  )
}