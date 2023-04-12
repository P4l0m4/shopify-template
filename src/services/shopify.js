import Client from 'shopify-buy'

export const client = Client.buildClient({
  domain: 'twf-sampleshop.myshopify.com/',
  storefrontAccessToken: 'e9c4d1ad5686df7086ba3926474407c7',
})
