<template>
  <main class="contact">
    <ContactFormComponent />
    <ContactCalendlyComponent />
    <iframe
      class="map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2766.052794322215!2d5.975977115453415!3d46.10985497911395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c80986db68cb9%3A0x105ec46440dff85c!2s730%20Rte%20de%20Saint-Julien%2C%2074520%20Valleiry!5e0!3m2!1sfr!2sfr!4v1678899735904!5m2!1sfr!2sfr"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
    <FooterComponent />
  </main>
</template>

<style lang="scss" scoped>
.contact {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;

  .map {
    width: 100%;
    height: 300px;
    border: 0;
    border-radius: $radius;
  }
}
</style>
