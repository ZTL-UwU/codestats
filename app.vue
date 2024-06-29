<template>
  <NuxtLoadingIndicator :color="false" class="z-100 bg-primary80" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHeadSafe({ title: 'Code::Stats Dashboard' });

useSeoMeta({
  description: 'An unofficial Code::Stats dashboard made with Nuxt',
  ogDescription: 'An unofficial Code::Stats dashboard made with Nuxt',
});
</script>
