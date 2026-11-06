<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <div class="container header-content">
      <RouterLink class="brand" to="/contacts">Mes contacts</RouterLink>
      <RouterLink class="header-link" to="/contacts">Liste des contacts</RouterLink>
    </div>
  </header>

  <main class="container page-content">
    <RouterView />
  </main>
</template>
