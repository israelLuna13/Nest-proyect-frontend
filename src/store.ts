import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Product, SchoppingCart } from "./schemas";
//ZUstand to manage global store

interface Store {
  total: number;
  contents: SchoppingCart;
  addToCard: (product: Product) => void;
  updateQuantity: (id: Product["id"], quantity: number) => void;
  removeFromCart:(id:Product['id']) => void
  calculateTotal:()=> void
}
//Enables redux devtools for debugging global state in the browser
//get() is used to acces to current state
//set() is used to update the state inmutably
export const UseStore = create<Store>()(
  devtools((set, get) => ({
    total: 0,
    contents: [],

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
      get().calculateTotal()
    },
    updateQuantity: (id, quantity) => {
      const contents = get().contents.map((item) =>
        item.productId === id ? { ...item, quantity } : item,
      );
      set(() => ({
        contents,
      }));
      get().calculateTotal()
    },
    removeFromCart:(id)=>{
      const contents = get().contents.filter(item => item.productId !== id)
      set(()=>({
        contents
      }))
      get().calculateTotal()
    },
    calculateTotal:()=>{
      const total = get().contents.reduce((total,item)=> total + (item.quantity * item.price),0)

      set(()=>({
        total
      }))
    }
  })),
);
