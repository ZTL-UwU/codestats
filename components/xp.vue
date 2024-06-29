<template>
  <div class="flex">
    <span class="text-2xl font-semibold">
      {{ (totalXp ?? 0).toLocaleString() }}
    </span>
    <span class="text-muted-foreground ml-1 self-center text-sm">
      + {{ (newXp ?? 0).toLocaleString() }}
    </span>
    <Badge class="ml-auto self-center">
      Lv {{ getLevel(totalXp) }}
    </Badge>
  </div>
  <Progress :model-value="getLevelProgress(totalXp)" class="mt-3" />
</template>

<script setup lang="ts">
defineProps<{
  totalXp?: number;
  newXp?: number;
}>();
</script>
