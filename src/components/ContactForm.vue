<script setup>
import { computed, onMounted, ref } from 'vue'
import { useContacts } from '../composables/useContacts'

const props = defineProps({
  contact: { type: Object, required: true },
  isNew: { type: Boolean, default: false }
})
const emit = defineEmits(['save', 'cancel'])
const { resizeImage } = useContacts()
const draft = ref({ ...props.contact })
const errors = ref({})
const cameraAvailable = ref(false)
const photoError = ref('')
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

onMounted(() => {
  cameraAvailable.value = Boolean(navigator.mediaDevices?.getUserMedia)
})

function validate() {
  const nextErrors = {}
  if (!draft.value.nom.trim()) nextErrors.nom = 'Le nom est obligatoire.'
  if (!draft.value.prenom.trim()) nextErrors.prenom = 'Le prénom est obligatoire.'
  if (!draft.value.telephone.trim()) nextErrors.telephone = 'Le téléphone est obligatoire.'
  if (!draft.value.email.trim()) nextErrors.email = 'L’e-mail est obligatoire.'
  else if (!emailPattern.test(draft.value.email)) nextErrors.email = 'L’e-mail n’est pas valide.'
  errors.value = nextErrors
  return Object.keys(nextErrors).length === 0
}

async function selectPhoto(event) {
  const file = event.target.files?.[0]
  event.target.value = ''
  if (!file) return
  photoError.value = ''
  try {
    draft.value.photo = await resizeImage(file)
  } catch (error) {
    photoError.value = error.message
  }
}

function submit() {
  if (validate()) emit('save', { ...draft.value })
}
</script>

<template>
  <form class="contact-form" novalidate @submit.prevent="submit">
    <div class="photo-editor">
      <img class="large-photo" :src="draft.photo || '/avatar-fallback.svg'" alt="Prévisualisation de la photo" />
      <div>
        <p class="form-label">Photo</p>
        <label class="button button-secondary file-button">Galerie
          <input type="file" accept="image/*" @change="selectPhoto" />
        </label>
        <label class="button button-secondary file-button">Caméra
          <input type="file" accept="image/*" capture="environment" @change="selectPhoto" />
        </label>
        <p v-if="!cameraAvailable" class="help-text">Caméra indisponible dans ce navigateur ou sur cet appareil. Utilisez la galerie.</p>
        <p v-if="photoError" class="error-message">{{ photoError }}</p>
      </div>
    </div>

    <label>Nom
      <input v-model="draft.nom" type="text" autocomplete="family-name" />
      <span v-if="errors.nom" class="error-message">{{ errors.nom }}</span>
    </label>
    <label>Prénom
      <input v-model="draft.prenom" type="text" autocomplete="given-name" />
      <span v-if="errors.prenom" class="error-message">{{ errors.prenom }}</span>
    </label>
    <label>Téléphone
      <input v-model="draft.telephone" type="tel" autocomplete="tel" />
      <span v-if="errors.telephone" class="error-message">{{ errors.telephone }}</span>
    </label>
    <label>E-mail
      <input v-model="draft.email" type="email" autocomplete="email" />
      <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
    </label>

    <div class="form-actions">
      <button class="button button-primary" type="submit">Enregistrer</button>
      <button class="button button-light" type="button" @click="emit('cancel')">Retour</button>
    </div>
  </form>
</template>
