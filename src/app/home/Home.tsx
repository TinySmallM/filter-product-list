import { Products } from "@/ui/Products/Products/Products";
import { getFetchProductList } from "../api/api";

export const Home = async () => {
  const productList = await getFetchProductList('products/8', 99)

  return (
    <Products productList={productList} />
  )
}
