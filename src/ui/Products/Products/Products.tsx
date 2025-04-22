'use client'

import { Product } from '@/app/api/api-types/product'
import { Section } from '../Section/Section'
import classNames from './products.module.css'
import { useEffect, useMemo, useState } from 'react'
import { revalidate } from '@/actions/revalidate'
import { REVALIDATE } from '@/consts'

type Props = {
  productList: Product[]
}

type Point = {
    name: string
    values: string[]
}

export const Products = ({productList}: Props) => {
  const [filterProductList, setFilterProductList] = useState(productList)
  const [filterType, setFilterType] = useState<string[]>([])
  const [points, setPoints] = useState<Point[]>([])

  const keyFilters = useMemo(() => {
    const keyFiltersHasTable = new Map<string, Set<string>>();

    for (const item of filterProductList) {
      item.product_features.forEach(feature => {
        const filterName = feature.nameru
        const filterValue = feature.value
    
        if (!keyFiltersHasTable.has(filterName)) {
          keyFiltersHasTable.set(filterName, new Set());
        }
  
        keyFiltersHasTable.get(filterName)!.add(filterValue);
      })
    }

    return Array.from(keyFiltersHasTable.entries()).map(([name, valuesSet]) => ({
      name,
      values: Array.from(valuesSet)
    }))
  }, [filterProductList])

  useEffect(() => {
    setFilterProductList(() => productList.filter((item) => {
      if (filterType.length === 0) {
        return true
      }

      const countryFeature = item.product_features.find((feature) => (
        filterType.includes(feature.value)
      ))

      return countryFeature && filterType.includes(countryFeature.value);
    }))
  }, [filterType])

  useEffect(() => {
    setPoints(keyFilters)
  }, [filterProductList])

  const createFilterType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    revalidate(REVALIDATE.productsAPI)
  
    if (checked) {
      setFilterType(prev => [...prev, value])
    }

    if (!checked) {
      setFilterType(prev => prev.filter((item) => item !== value));
    }
  };
  
  return (
    <div className={classNames.products_container}>
      <div className={classNames.products}>
        <form className={classNames.products__form}>
          {points.map((point) => (
            <div key={point.name} className={classNames.products__filters}>
              <h3>{point.name}</h3>
              {point.values.map((value) => (
                <label key={value} className={classNames.products__input}>
                  <input type="checkbox" value={value} onChange={createFilterType} />
                  <span>{value}</span>
                </label>
              ))}
            </div>
          ))}
        </form>
        <Section goods={filterProductList} />
      </div>
    </div>
  )
}
