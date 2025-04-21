"use client"

import { useEffect, useState } from "react";
import { Product } from "@/app/api/api-types/product"
import classNames from "./products.module.css";
import { REVALIDATE } from "@/consts";
import { revalidate } from "@/actions/revalidate";
import { useWinesFilter } from "@/hooks/useWinesFilter";

type Props = {
  productList: Product[]
}

export const Products = ({productList}: Props) => {
  const [typeWines, setTypeWines] = useState<string[]>([])
  const {wines} = useWinesFilter(productList)

  const notEmptyArray = wines.length > 0

  useEffect(() => {
    revalidate(REVALIDATE.productsAPI)
  }, [wines])

  return (
    <div className={classNames.products_container}>
      <form>
        <input type="checkbox" onClick={() => setTypeWines((prev) => [...prev, 'x'])} />
        <input type="checkbox" />
        <input type="checkbox" />
      </form>
      <div className={classNames.products}>
        {!notEmptyArray 
        ? (<h1 className={classNames.products__title}>Данных нет!</h1>)
        : (
          wines.map((wine) => (
            <div className={classNames.products__card} key={wine.id}>
              <h2 className={classNames.products__productTitle}>{wine.name}</h2>
              <p>{wine.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}