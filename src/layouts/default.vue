<template>
  <div class="container">
    <nav>
      <NuxtLink to="/">HOME (index)</NuxtLink> |
      <NuxtLink to="/other">OTHER PAGE</NuxtLink>
    </nav>
    <main><slot /></main>
  </div>
</template>

<script setup></script>
