"use client"
import { submitOrder } from "@/actions/submit-order-action"
import { UseStore } from "@/src/store"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function SubmitOrderForm() {
    const total = UseStore(state => state.total)
    const coupon = UseStore(state => state.coupon.name)
    const contents = UseStore(state => state.contents)
    const clearOrder = UseStore(state => state.clearOrder)
    const order ={
        total,
        coupon,
        contents
    }
    //The bind method pre-injects required arguments while preserving the expected action signature
    //order -> serverAction(order) -> API 
    const submitOrderWithData=submitOrder.bind(null,order)
    const [state,dispatch]=useActionState(submitOrderWithData,{
        errors:[],
        success:''
    })
    useEffect(()=>{
        if(state.errors){
            state.errors.forEach(error=>toast.error(error))
        }
        if(state.success){
            toast.success(state.success)
            clearOrder()
        }
    },[state,clearOrder])
    
  return (
    <form action={dispatch}>
         <input type="submit" className='mt-5 w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white text-xl p-3 font-bold uppercase'  value="Confirm sel"/>
    </form>
  )
}
