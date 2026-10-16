import type { ServicesCollectionItem, IndustriesCollectionItem } from '@nuxt/content'

export type ServiceArea = ServicesCollectionItem
export type Service = ServiceArea['services'][number]
export type Industry = IndustriesCollectionItem

export function useServiceAreas() {
  return useAsyncData('service-areas', () => queryCollection('services').order('order', 'ASC').all(), {
    default: () => [] as ServiceArea[],
  })
}

export function useIndustries() {
  return useAsyncData('industries', () => queryCollection('industries').order('order', 'ASC').all(), {
    default: () => [] as Industry[],
  })
}

/** Index every service by catalog ID (SV01…SV55) along with its area. */
export function indexServices(areas: ServiceArea[]) {
  const index = new Map<string, { service: Service, area: ServiceArea }>()
  for (const area of areas) {
    for (const service of area.services) index.set(service.id, { service, area })
  }
  return index
}

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export function formatPrice(value: number) {
  return currency.format(value)
}

export function formatRange(service: Pick<Service, 'from' | 'to'>) {
  return `${formatPrice(service.from)}–${formatPrice(service.to)}`
}

export function billingUnit(billing: Service['billing']) {
  return { Fixed: 'per project', Monthly: 'per month', Hourly: 'per hour' }[billing]
}
