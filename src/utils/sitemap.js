import { client } from '../services/shopify.js'
import { PRODUCT_PATH } from '../config/url.js'

export async function getProductPages() {
  let products = await client.product.fetchAll()
  return products.map(product => ({
    loc: `/${PRODUCT_PATH}${product.handle}`,
    lastmod: product.updatedAt,
    changefreq: 'daily',
    priority: 0.9,
  }))
}
