"use server";

import { REVALIDATE } from "@/consts";
import { revalidateTag } from "next/cache";

export async function revalidate(type: string) {
  if (type === REVALIDATE.productsAPI) {
    revalidateTag(REVALIDATE.productsAPI);
  }
}
