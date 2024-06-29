<template>
  <div class="aa h-[calc(100svh-12rem)] -mt-9 flex flex-row">
    <div class="mx-auto text-center w-[500px] self-center flex flex-col gap-4">
      <div class="justify-center flex gap-4">
        <Icon name="lucide:bar-chart-3" size="60" />
        <h1 class="self-center scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          Code::Stats
        </h1>
      </div>

      <p class="text-xl text-muted-foreground">
        An unofficial
        <NuxtLink to="https://codestats.net/" class="decoration-dotted hover:underline underline-offset-4">
          <span>Code::Stats</span>
        </NuxtLink>
        dashboard made with Nuxt.
      </p>

      <div class="flex gap-2 mt-2">
        <Input
          v-model="username"
          placeholder="Enter a username to start"
          class="bg-background"
          @keydown.enter="navigateTo(`/${username}`)"
        />
        <Button @click="navigateTo(`/${username}`)">
          Visit
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const username = ref('');
</script>
