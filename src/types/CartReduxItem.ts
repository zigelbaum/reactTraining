import Product from "./Product";

export default interface CartReduxItem {
    product: Product,
    quantity: number
  }