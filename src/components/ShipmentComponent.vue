<script setup>
// import { useCartStore } from '@/stores/cart'
// import dayjs from 'dayjs'
// import 'dayjs/locale/fr'
// dayjs.locale('fr')

// let shipmentDate = dayjs().add(4, 'day').format('DD MMMM YYYY')

// // Store
// const cartStore = useCartStore()
</script>

<template>
  <div class="shipment">
    <!-- <span class="shipment__date"
      >Livraison estimée le <strong>{{ shipmentDate }}</strong></span
    > -->
    <div class="shipment__location">
      <span
        >Nos délais de livraison sont en moyenne de 4 à 10 jours ouvrés. Plus de détails sur les modalités de livraison
        à l'étape suivante.</span
      >
      <!-- <img class="shipment__location__icon icon" src="@/assets/icons/map-marker-outline.svg" />Livré en France avec
      <a class="shipment__location__link" href="https://www.chronopost.fr/fr/particulier#/step-home">Chronopost</a> -->
    </div>
    <!-- <div class="shipment__details">
      <span>Livraison gratuite</span>
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
.shipment {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  font-weight: 100;
  padding: 1rem 0;

  &__location {
    display: flex;
    gap: 0.25rem;
    align-items: center;

    &__link {
      text-decoration: underline !important;
    }
  }

  &__details {
    gap: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
}
</style>
