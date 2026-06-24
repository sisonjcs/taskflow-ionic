<script setup>
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem
} from '@ionic/vue'
import { computed } from 'vue';

import { useTaskStore } from '@/stores/taskStore';
import { storeToRefs } from 'pinia';

const taskStore = useTaskStore()

const { tasks } = storeToRefs(taskStore)

const completedTasks = computed(() => tasks.value.filter(t => t.done))

</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Completed Tasks</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="completed-view">
                <h1>✅ Completed Tasks</h1>
                <ion-list class="task-list" v-if="completedTasks.length > 0">
                    <ion-item 
                        v-for="task in completedTasks" 
                        :key="task.id" 
                        lines="none"
                    >
                        <span class="task-name">{{ task.name }}</span>
                    </ion-item>
                </ion-list>
                <p v-else>
                    No completed tasks as of the moment.
                </p>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped>
.completed-view {
  max-width: 480px;
  padding: 24px;
  font-family: Arial, sans-serif;
  margin: 40px auto;
}
h1 {
  text-align: center;
  color: #1b2a4a;
  margin-bottom: 20px;
}
.task-list {
  padding: 0;
  margin: 0;
}
.task-list ion-item {
  background: white;
  border-radius: 6px;
  border: 1px solid #d8d8d8;
  margin-bottom: 10px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
}
.task-name {
  font-size: 15px;
  color: #42b883;
  font-weight: bold;
}
p {
  text-align: center;
  font-style: italic;
  color: #666;
  margin-top: 20px;
}
</style>