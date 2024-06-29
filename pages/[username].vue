<template>
  <UserNotFound v-if="status === 'error'" />
  <div v-else class="space-y-6">
    <div class="flex flex-col lg:flex-row gap-6">
      <Card class="flex basis-1/3">
        <CardHeader class="self-center w-full">
          <CardTitle>
            <div class="mx-auto flex justify-center">
              <NuxtImg
                :src="`https://codestats.net/users/${username}/avatar`"
                placeholder="/LucideCircleUser.svg"
                class="h-14 rounded-lg mr-6"
              />
              <NuxtLink :to="`https://codestats.net/users/${username}`" target="_blank" class="text-3xl self-center">
                {{ data?.user }}
              </NuxtLink>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card class="basis-2/3">
        <CardHeader>
          <xp :total-xp="data?.total_xp" :new-xp="data?.new_xp" />
        </CardHeader>
      </Card>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>
          <Icon name="lucide:clock" class="-mb-[2px] mr-1" />
          History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="mb-3 flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" @click="setDomain(7)">
            Last Week
          </Button>
          <Button variant="outline" size="sm" @click="setDomain(30)">
            Last Month
          </Button>
          <Button variant="outline" size="sm" @click="setDomain(365)">
            Last Year
          </Button>
          <Button variant="outline" size="sm" @click="setDomain(data?.dates.length ?? 0)">
            All Time
          </Button>
        </div>
        <BarChart
          :data="selectedData"
          index="date"
          :categories="['xp']"
          :rounded-corners="4"
          :show-legend="false"
        />
        <div class="ml-10">
          <Slider
            v-model="domain"
            :max="data?.dates.length"
            :step="1"
            class="mt-6"
          />
        </div>
      </CardContent>
    </Card>
    <div class="flex flex-col lg:flex-row gap-6">
      <Card class="basis-1/3">
        <CardHeader>
          <CardTitle>
            <Icon name="lucide:monitor" class="-mb-[2px] mr-1" />
            Machines
          </CardTitle>
        </CardHeader>
        <CardContent class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          <Card v-for="(machine, i) in data?.machines.toSorted((a, b) => b.xps - a.xps)" :key="machine.name">
            <CardHeader>
              <CardTitle class="flex">
                {{ machine.name }}
                <Badge variant="secondary" class="ml-auto">
                  {{ i + 1 }}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <xp :total-xp="machine.xps" :new-xp="machine.new_xps" />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card class="basis-2/3 bg-muted">
        <CardHeader>
          <CardTitle>
            <Icon name="lucide:code" class="-mb-[2px] mr-1" />
            Languages
          </CardTitle>
        </CardHeader>
        <CardContent class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card v-for="(lang, i) in data?.languages.toSorted((a, b) => b.xps - a.xps)" :key="lang.name">
            <CardHeader>
              <CardTitle class="flex gap-2">
                <span class="self-center">
                  {{ lang.name }}
                </span>
                <Badge variant="secondary" class="ml-auto self-center">
                  {{ i + 1 }}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <xp :total-xp="lang.xps" :new-xp="lang.new_xps" />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
const username = useRoute().params.username;
useHeadSafe({ title: `${username} - Code::Stats Dashboard` });

interface IUserInfo {
  user: string;
  total_xp: number;
  new_xp: number;
  machines: Record<string, {
    xps: number;
    new_xps: number;
  }>;
  languages: Record<string, {
    xps: number;
    new_xps: number;
  }>;
  dates: Record<string, number>;
};

const { data: rawData, status } = await useFetch<IUserInfo>(`https://codestats.net/api/users/${username}`);
const data = computed(() => {
  if (!rawData.value)
    return undefined;

  const { dates, machines, languages, ...rest } = rawData.value;
  const sortedDates = Object.entries(dates)
    .map(([date, xp]) => ({ date, xp }))
    .sort((a, b) => new Date(a.date) < new Date(b.date) ? -1 : 1);

  const res = [];
  if (sortedDates.length) {
    for (const d = new Date(sortedDates[0].date); d < new Date(); d.setDate(d.getDate() + 1)) {
      res.push({
        date: d.toISOString().slice(0, 10),
        xp: sortedDates.find(x => x.date === d.toISOString().slice(0, 10))?.xp ?? 0,
      });
    }
  }

  return {
    ...rest,
    dates: res.toSorted((a, b) => new Date(a.date) < new Date(b.date) ? -1 : 1),
    machines: Object.entries(machines).map(([name, { xps, new_xps }]) => ({ name, xps, new_xps })),
    languages: Object.entries(languages).map(([name, { xps, new_xps }]) => ({ name, xps, new_xps })),
  };
});

const domain = ref([Math.max(0, (data.value?.dates.length ?? 0) - 30), data.value?.dates.length ?? 0]);

const selectedData = ref((data.value?.dates ?? []).slice(domain.value[0], domain.value[1]));
watchThrottled(domain, () => {
  selectedData.value = (data.value?.dates ?? []).slice(domain.value[0], domain.value[1]);
}, {
  throttle: 30,
});

function setDomain(length: number) {
  domain.value = [
    Math.max(0, (data.value?.dates.length ?? 0) - length),
    data.value?.dates.length ?? 0,
  ];
}
</script>
