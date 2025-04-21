import { Product } from "@/app/api/api-types/product"
import { useState } from "react"

export const useWinesFilter = (productList: Product[]) => {
  const [wines, setWines] = useState(productList)

  return {
    wines,
  }
}