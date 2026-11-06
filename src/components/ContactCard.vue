<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  contact: { type: Object, required: true }
})

function fallback(event) {
  event.target.src = '/avatar-fallback.svg'
}
</script>

<template>
  <article class="contact-card">
    <img class="contact-photo" :src="contact.photo || '/avatar-fallback.svg'" :alt="`Photo de ${contact.prenom} ${contact.nom}`" @error="fallback" />
    <div class="contact-card-info">
      <h2>{{ contact.prenom }} {{ contact.nom }}</h2>
      <p>{{ contact.telephone }}</p>
    </div>
    <RouterLink class="button button-secondary" :to="`/contacts/${contact.id}`">Modifier</RouterLink>
  </article>
</template>
