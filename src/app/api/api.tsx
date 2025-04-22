import { REVALIDATE, VERSIONAPI } from "@/consts"
import { Product } from "./api-types/product"

const root = 'https://r24api.photonhost.net/api'
const fullPath = `${root}/v${VERSIONAPI}`

export async function getFetchProductList(resource: string, limit: number)  {
  try {
    const result = await fetch(`${fullPath}/${resource}?limit=${limit}`, {
      method: 'GET',
      next: { tags: [REVALIDATE.productsAPI] }
    })
    
    if (!result.ok) {
      Promise.reject(`thow Error, ${result.status}`)
    }

    const json: Product[] = await result.json()
    return json
  }
  catch (err) {
    if (err instanceof Error) {
      return Promise.reject(`thow Error, ${err.message}`)
    }

    throw err
  }
}
