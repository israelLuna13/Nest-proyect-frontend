import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Coupon, CouponResponseSchema, Product, SchoppingCart } from "./schemas";
//ZUstand to manage global store

interface Store {
  total: number;
  discount:number
  contents: SchoppingCart;
  coupon: Coupon
  addToCard: (product: Product) => void;
  updateQuantity: (id: Product["id"], quantity: number) => void;
  removeFromCart:(id:Product['id']) => void
  calculateTotal:()=> void
  applyCoupon:(couponName:string)=> Promise<void>
  applyDiscount:()=>void,
  clearOrder:()=>void
}
const initialState={
   total: 0,
    contents: [],
    coupon:{
      porcentage:0,
      name:'',
      message:''
    },
    discount:0,
}
//Enables redux devtools for debugging global state in the browser
//get() is used to acces to current state
//set() is used to update the state inmutably
export const UseStore = create<Store>()(
  devtools((set, get) => ({
    ...initialState,

    addToCard: (product) => {
      //renaming id and removing categoryId 'cause we do not use that, also take all remaining properties that were not already extracted and group them into a new object called data
      const { id: productId, categoryId, ...data } = product;
      let contents: SchoppingCart = [];

      const duplicated = get().contents.findIndex(
        (item) => item.productId === productId,
      );
      if (duplicated >= 0) {
        //duplicated product
        if (
          get().contents[duplicated].quantity >=
          get().contents[duplicated].inventory
        ) {
          return;
        }
        contents = get().contents.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      } else {
        //new product
        contents = [
          ...get().contents,
          {
            ...data,
            quantity: 1,
            productId,
          },
        ];
      }

      set(() => ({
        contents,
      }));
      get().calculateTotal();
    },
    updateQuantity: (id, quantity) => {
      const contents = get().contents.map((item) =>
        item.productId === id ? { ...item, quantity } : item,
      );
      set(() => ({
        contents,
      }));
      get().calculateTotal();
    },
    removeFromCart: (id) => {
      const contents = get().contents.filter((item) => item.productId !== id);
      set(() => ({
        contents,
      }));
      if (!get().contents.length) {
        get().clearOrder();
      }
      get().calculateTotal();
    },
    calculateTotal: () => {
      const total = get().contents.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
      );

      set(() => ({
        total,
      }));
      if (get().coupon.porcentage) {
        get().applyDiscount();
      }
    },
    // Sends the coupon to the Next.js Route Handler instead of calling the external API directly.
    // The route handler handles the secure request to the backend.
    // After receiving the response, it updates the global store
    // and applies the discount if the coupon is valid.
    applyCoupon: async (coupoName) => {
      const req = await fetch("/coupons/api", {
        method: "POST",
        body: JSON.stringify({
          coupon_name: coupoName,
        }),
      });
      const json = await req.json();
      const coupon = CouponResponseSchema.parse(json);
      set(() => ({
        coupon,
      }));
      if (coupon.porcentage) {
        get().applyDiscount();
      }
    },

    applyDiscount: () => {
      const subtotalAmount = get().contents.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
      );

      const discount = (get().coupon.porcentage / 100) * subtotalAmount;
      const total = subtotalAmount - discount;
      set(() => ({
        discount,
        total,
      }));
    },

    clearOrder: () => {
      set(() => ({
        ...initialState,
      }));
    },
  })),
);
