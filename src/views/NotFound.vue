<template>
  <section class="empty-state">
    <h1>Page introuvable</h1>
    <p>L’adresse demandée ne correspond à aucune page.</p>
    <RouterLink class="button button-primary" to="/contacts">Retour aux contacts</RouterLink>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
