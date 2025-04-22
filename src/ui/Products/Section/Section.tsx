import { Product } from "@/app/api/api-types/product"
import classNames from './section.module.css'

type Props = {
  goods: Product[]
}

export const Section = ({goods}: Props) => {
  const notEmptyArray = goods.length > 0

  return (
    <div className={classNames.section_container}>
      <h1 className={classNames.section_title}>Вино</h1>
      <span className={classNames.section_counter}>кол-во товара {goods.length}</span>

      <div className={classNames.section_items}>
        {!notEmptyArray 
          ? (<h2>Не нашли товар</h2>)
          : goods.map((item) => (
            <div key={item.id} className={classNames.section__item}>
              <h2>{item.name}</h2>
              <p>Цена за штуку {item.price}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
