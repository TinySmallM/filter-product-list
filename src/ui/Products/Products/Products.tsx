'use client'

import { Product } from '@/app/api/api-types/product'
import { Section } from '../Section/Section'
import classNames from './products.module.css'
import { useEffect, useState } from 'react'
import { revalidate } from '@/actions/revalidate'
import { REVALIDATE } from '@/consts'

type Props = {
  productList: Product[]
}

type FilterList = {
    name: string
    values: string[]
}

export const Products = ({productList}: Props) => {
  const [filterProductList, setFilterProductList] = useState(productList)
  const [filterList, setFilterList] = useState<FilterList[]>([])
  const [filterOptions, setFilterOptions] = useState<string[]>([])
  const [minimumPrice, setMinimumPrice] = useState(0)

  const notEmptyArray = filterOptions.length > 0
 
  //Собираем лист фильтров на фронте (не использую всю пачку данных а беру по лимиту - это мешает)
  useEffect(() => {
    const filterListTable = new Map<string, Set<string>>();

    for (const item of filterProductList) {
      item.product_features.forEach(feature => {
        const filterName = feature.nameru
        const filterValue = feature.value
    
        if (!filterListTable.has(filterName)) {
          filterListTable.set(filterName, new Set());
        }
  
        filterListTable.get(filterName)!.add(filterValue);
      })
    }

    setFilterList(
      [...filterListTable].map(([name, values]) => ({
        name,
        values: [...values]
      }))
    )
  }, [])

  useEffect(() => {
    setFilterProductList(
      productList.filter((item) => {
        const hasOption = item.product_features.some((feature) => filterOptions.includes(feature.value))

        if (hasOption && item.price >= minimumPrice) {
          return item
        }
        
        if (!notEmptyArray && item.price >= minimumPrice) {
          return item
        }
      })
    )
  }, [filterOptions, minimumPrice])

  const createFilterType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setFilterOptions((prev) => checked ? [...prev, value] : prev.filter((item) => item !== value));

    //Данные могли обновится из админки, делаем ревалидацию.
    revalidate(REVALIDATE.productsAPI)
  };
  
  return (
    <div className={classNames.products_container}>
      <div className={classNames.products}>
        <form className={classNames.products__form}>
          {filterList.map((item) => (
            <div key={item.name} className={classNames.products__filters}>
              <h3>{item.name}</h3>
              {item.values.map((value) => (
                <label key={value} className={classNames.products__input}>
                  <input type="checkbox" value={value} onChange={createFilterType} />
                  <span>{value}</span>
                </label>
              ))}
            </div>
          ))}
          <input 
            type='range' 
            step='0.1'
            min={740}
            max={257330}
            defaultValue={740}
            onChange={(event) => setMinimumPrice(+event.target.value)}
          />
        </form>
        <Section goods={filterProductList} />
      </div>
    </div>
  )
}
