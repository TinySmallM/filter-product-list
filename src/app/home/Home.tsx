import { Products } from "@/ui/Products/Products";
import { getFetchProductList } from "../api/api";

export const Home = async () => {
  const productList = await getFetchProductList('products/8', 11)

  return (
    <Products productList={productList} />
  )
}