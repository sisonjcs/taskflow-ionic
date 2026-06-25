<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, onIonViewWillEnter } from '@ionic/vue';
import { onMounted } from 'vue';
import { useTaskStore } from './stores/taskStore';

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.loadTasks()
  // console.log("Loaded tasks")
})

onIonViewWillEnter(() => {
  taskStore.loadTasks()
})
</script>
