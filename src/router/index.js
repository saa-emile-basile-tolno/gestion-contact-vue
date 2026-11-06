import { createRouter, createWebHistory } from 'vue-router'
import ListeContacts from '../views/ListeContacts.vue'
import DetailContact from '../views/DetailContact.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/contacts' },
    { path: '/contacts', name: 'contacts', component: ListeContacts },
    { path: '/contacts/nouveau', name: 'nouveau-contact', component: DetailContact },
    { path: '/contacts/:id', name: 'detail-contact', component: DetailContact, props: true },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
  ]
})

export default router
