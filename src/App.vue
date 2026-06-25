<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';
import { useTaskStore } from './stores/taskStore';

const taskStore = useTaskStore()

onMounted(async() => {
  await taskStore.loadTasks()
  console.log("Loaded tasks")
})
</script>
