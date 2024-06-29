<template>
  <div class="h-[calc(100svh-12rem)] -mt-9 flex flex-row">
    <Card class="mx-auto w-[500px] self-center">
      <CardHeader class="font-bold text-center">
        <div class="text-4xl mb-2">
          404
        </div>
        <div class="text-2xl">
          User Not Found
        </div>
      </CardHeader>
      <CardContent>
        <div class="flex gap-2">
          <Input v-model="username" placeholder="Enter another username" @keydown.enter="navigateTo(`/${username}`)" />
          <Button @click="navigateTo(`/${username}`)">
            Visit
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
const username = ref('');
</script>
