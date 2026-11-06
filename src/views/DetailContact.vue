<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import ContactForm from '../components/ContactForm.vue'
import { useContacts } from '../composables/useContacts'

const route = useRoute()
const router = useRouter()
const { getContact, addContact, updateContact } = useContacts()
const isNew = computed(() => route.path === '/contacts/nouveau')
const contact = computed(() => isNew.value ? null : getContact(route.params.id))

function save(draft) {
  if (isNew.value) addContact(draft)
  else updateContact(draft)
  router.push('/contacts')
}
</script>

<template>
  <section v-if="isNew || contact" class="detail-page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">{{ isNew ? 'Nouveau contact' : 'Fiche contact' }}</p>
        <h1>{{ isNew ? 'Ajouter un contact' : `Modifier ${contact.prenom} ${contact.nom}` }}</h1>
      </div>
      <div v-if="!isNew" class="quick-actions">
        <a class="button button-secondary" :href="`tel:${contact.telephone}`">Appeler</a>
        <a class="button button-secondary" :href="`mailto:${contact.email}`">E-mail</a>
      </div>
    </div>
    <ContactForm :contact="contact || { id: '', nom: '', prenom: '', telephone: '', email: '', photo: '' }" :is-new="isNew" @save="save" @cancel="router.push('/contacts')" />
  </section>

  <section v-else class="empty-state">
    <h1>Contact introuvable</h1>
    <p>Ce contact n’existe pas ou a été supprimé.</p>
    <RouterLink class="button button-primary" to="/contacts">Retour à la liste</RouterLink>
  </section>
</template>
