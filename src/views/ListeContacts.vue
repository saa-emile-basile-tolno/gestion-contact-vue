<script setup>
import { RouterLink } from 'vue-router'
import ContactCard from '../components/ContactCard.vue'
import { useContacts } from '../composables/useContacts'

const { contacts } = useContacts()
</script>

<template>
  <section>
    <div class="page-heading">
      <div>
        <p class="eyebrow">Carnet d’adresses</p>
        <h1>Mes contacts</h1>
      </div>
      <RouterLink class="button button-add" to="/contacts/nouveau">Ajouter</RouterLink>
    </div>
    <div class="contacts-list">
      <ContactCard v-for="contact in contacts" :key="contact.id" :contact="contact" />
    </div>
  </section>
</template>
