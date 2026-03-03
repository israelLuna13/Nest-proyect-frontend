import {z} from 'zod'
export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    inventory: z.number(),
    categoryId: z.number()
})

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string()
})
export const CategoriesResponseSchema = z.array(CategorySchema)
export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    products: z.array(ProductSchema)
});
//Schopping cart
const ShoppingCartContentSchema = ProductSchema.pick({
    name: true,
    image: true,
    price: true,
    inventory: true,
}).extend({
    productId:z.number(),
    quantity:z.number()
})
export const ShoppingCartSchema=z.array(ShoppingCartContentSchema)
export const CouponResponseSchema = z.object({
    name: z.string().default(''),
    message:z.string(),
    porcentage:z.coerce.number().min(0).max(100).default(0)
})
const OrderContentSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  price: z.number()
})
export const OrderSchema = z.object({
  total: z.number(),
  coupon: z.string(),
  contents: z.array(OrderContentSchema).min(1, {message: 'The cart cannot be empty'})
})

/** Success / Error Response */
export const SuccessResponseSchema = z.object({
  message: z.string()
})
export const ErrorResponseSchema = z.object({
  message: z.array(z.string()),
  error: z.string(),
  statusCode: z.number()
})
//tytpes
export type CartItem = z.infer<typeof ShoppingCartContentSchema>
export type SchoppingCart=z.infer<typeof ShoppingCartSchema>
export type Product = z.infer<typeof ProductSchema>
export type Coupon = z.infer<typeof CouponResponseSchema>