<template>
  <div class="-z-10 h-screen w-screen fixed top-0 left-0 grid-bg" />
  <header class="sticky z-40 top-0 bg-background/80 backdrop-blur-lg lg:border-b">
    <div class="container px-4 md:px-8 flex h-14 max-w-screen-2xl items-center border-b lg:border-none gap-2 justify-between">
      <NuxtLink to="/" class="flex gap-2 select-none">
        <Icon name="lucide:bar-chart-3" size="24" />
        <span class="font-semibold">
          Code::Stats
        </span>
      </NuxtLink>
      <ThemeToggle class="ml-auto" />
      <NuxtLink to="https://codestats.net/" target="_blank">
        <Button size="icon" variant="outline">
          <span class="text-xs">
            C::S
          </span>
        </Button>
      </NuxtLink>
      <NuxtLink to="https://github.com/ZTL-UwU/codestats" target="_blank">
        <Button size="icon" variant="outline">
          <Icon name="lucide:github" />
        </Button>
      </NuxtLink>
    </div>
  </header>
  <main class="container mt-6">
    <slot />
  </main>
  <footer class="text-sm border-t text-muted-foreground py-6 md:px-8 md:py-0 mt-10 bg-background">
    <div class="container flex flex-col items-center justify-between gap-2 md:h-24 md:flex-row">
      Copyright © 2024 Tony Zhang
      <NuxtLink to="https://github.com/ZTL-UwU/codestats" target="_blank">
        <Button size="icon" variant="outline">
          <Icon name="lucide:github" />
        </Button>
      </NuxtLink>
    </div>
  </footer>
</template>

<style scoped>
.grid-bg {
  background-size: 50px 50px;
  background-image: linear-gradient(
      to right,
      hsl(var(--muted)) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, hsl(var(--muted)) 1px, transparent 1px);
}
</style>
