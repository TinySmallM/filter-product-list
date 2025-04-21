type Feature = {
  value: string
  nameru: string
  feature: string
}

type Property = {
  value: string
  nameru: string
  property: string
}

export type Product = {
  id: number
  current_category_slug: string
  parent_category_slug: string
  sku: string
  category_id_external: string
  alcohol: boolean
  cooking: boolean
  visible: boolean
  name: string
  slug: string
  price: number
  old_price: number
  units: string
  average_unit_weight: string;
  attributes: unknown[]
  product_features: Feature[]
  extra_properties: Property[]
  seo_text: string | null
  description: string | null
  sort: number;
  meta_keywords: string | null
  meta_title: string | null;
  meta_description: string | null
  category: number
}
