'use server'

import { getFetchProductList } from "../api/api";
import classNames from "./home.module.css";

export const Home = async () => {
  const produtList = await getFetchProductList('products/8', 11)

  return (
    <div className={classNames.home_container}>
      <div className={classNames.home}>
        {produtList?.length !== 0} 
          <h1 className={classNames.home__title}></h1>
          {produtList?.map((item) => (
            <div key={item.id}>
              <p>{item.price}</p>
            </div>
          ))}
      </div>
    </div>
  )
}