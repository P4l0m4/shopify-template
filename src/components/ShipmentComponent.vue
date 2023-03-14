<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
dayjs.locale('fr')

let shipmentDate = dayjs().add(4, 'day').format('DD MMMM YYYY')
</script>

<template>
  <div class="shipment">
    <p>Livraison</p>
    <div class="shipment__location">
      <img class="shipment__location__icon" src="@/assets/icons/map-marker-outline.svg" />Livré en France avec
      <a class="shipment__location__link" href="https://www.chronopost.fr/fr/particulier#/step-home">Chronopost</a>
    </div>
    <div class="shipment__details">
      <span>Livraison gratuite</span>
      <span
        >Date de livraison estimée: <strong>{{ shipmentDate }}</strong></span
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
.shipment {
  display: flex;
  background-color: $primary-color;
  padding: 16px;
  flex-direction: column;
  gap: 32px;
  font-size: 20px;
  width: 100%;
  border-radius: 6px;

  &__location {
    display: flex;
    gap: 4px;
    align-items: center;
    font-size: 16px;

    &__icon {
      width: 24px;
    }

    &__link {
      text-decoration: underline !important;
    }
  }

  &__details {
    gap: 16px;
    font-size: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
}
</style>
