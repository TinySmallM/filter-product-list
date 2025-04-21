import { VERSIONAPI } from "@/consts"
import { Product } from "./api-types/product"

type Params = {
  limit: number
}

const root = 'https://r24api.photonhost.net/api'
const fullPath = `${root}/v${VERSIONAPI}`

export async function getFetchProductList(resource: string, limit: number)  {
  try {
    const result = await fetch(`${fullPath}/${resource}?limit=${limit}`, {method: 'GET'})
    
    if (!result.ok) {
      Promise.reject(`thow Error, ${result.status}`)
    }

    const json: Product[] = await result.json()
    return json
  }
  catch (err) {
    if (err instanceof Error) {
      Promise.reject(`thow Error, ${err.message}`)
    }
  }
}