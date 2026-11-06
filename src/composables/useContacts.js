import { ref } from 'vue'

const STORAGE_KEY = 'gestion-contacts-exercice-v3'

function avatarDataUrl(nom, prenom, color) {
  const initials = `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase()
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="${color}"/><text x="150" y="175" text-anchor="middle" font-family="Arial,sans-serif" font-size="100" font-weight="bold" fill="white">${initials}</text></svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const defaults = [
  ['BAH', 'Aboubacar', '621298958', 'aboubacar.bah@gmail.com', '#2563eb'],
  ['DIALLO', 'Rougayatou', '629336389', 'rougayatou.diallo@gmail.com', '#7c3aed'],
  ['DIALLO', 'Mamadou Aliou', '611078151', 'mamadou.aliou.diallo@gmail.com', '#059669'],
  ['TOLNO', 'Basile', '56904763', 'basile.tolno@gmail.com', '#ea580c'],
  ['SALL', 'Mamadou Sily', '26 567 890', 'mamadou.sily.sall@gmail.com', '#db2777']
]

function createDefaults() {
  return defaults.map(([nom, prenom, telephone, email, color], index) => ({
    id: String(index + 1),
    nom,
    prenom,
    telephone,
    email,
    photo: avatarDataUrl(nom, prenom, color)
  }))
}

function loadContacts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : createDefaults()
  } catch (error) {
    console.warn('Impossible de charger les contacts sauvegardés.', error)
    return createDefaults()
  }
}

const contacts = ref(loadContacts())

function saveContacts() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts.value))
  } catch (error) {
    console.warn('La sauvegarde locale est indisponible ou pleine.', error)
  }
}

function getContact(id) {
  return contacts.value.find((contact) => String(contact.id) === String(id))
}

function addContact(contact) {
  const newContact = { ...contact, id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString() }
  contacts.value.push(newContact)
  saveContacts()
  return newContact
}

function updateContact(contact) {
  const index = contacts.value.findIndex((item) => String(item.id) === String(contact.id))
  if (index === -1) return false
  contacts.value[index] = { ...contact }
  saveContacts()
  return true
}

function deleteContact(id) {
  contacts.value = contacts.value.filter((contact) => String(contact.id) !== String(id))
  saveContacts()
}

function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Lecture de la photo impossible.'))
    reader.onload = () => {
      const image = new Image()
      image.onerror = () => reject(new Error('Le fichier sélectionné n’est pas une image valide.'))
      image.onload = () => {
        const scale = Math.min(1, 300 / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(image.width * scale))
        canvas.height = Math.max(1, Math.round(image.height * scale))
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.8))
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export function useContacts() {
  return { contacts, getContact, addContact, updateContact, deleteContact, resizeImage }
}
