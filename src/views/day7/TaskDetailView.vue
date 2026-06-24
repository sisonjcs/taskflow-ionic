<script setup>
import { useRoute } from 'vue-router';
import {
    IonPage,
    IonHeader,
    IonBackButton,
    IonToolbar,
    IonTitle,
    IonContent
} from '@ionic/vue'
import { computed, ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { storeToRefs } from 'pinia';

const route = useRoute()
const taskStore = useTaskStore()

const { tasks } = storeToRefs(taskStore)
const taskId = ref(Number(route.params.id))

const foundTask = computed(() => tasks.value.find(t => t.id === taskId.value))
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-back-button slot="start" default-href="/tabs/tasks"/>
                <ion-title> Task Detail View: {{ foundTask.name }} </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="task-detail-view">
                <h1>📌 Task Details</h1>
                <div v-if="foundTask" class="task-card">
                    <p><span class="label">ID:</span> {{ foundTask.id }}</p>
                    <p><span class="label">Name:</span> {{ foundTask.name }}</p>
                    <p>
                        <span class="label">Status:</span>
                        <strong :class="{ done: foundTask.done, pending: !foundTask.done }">
                            {{ foundTask.done ? "Done" : "Pending" }}
                        </strong>
                    </p>
                </div>
                <p v-else class="not-found">Task not found.</p>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped>
.task-detail-view {
  max-width: 480px;
  padding: 24px;
  font-family: Arial, sans-serif;
  margin: 40px auto;
}
h1 {
  color: #1b2a4a;
  text-align: center;
  margin-bottom: 20px;
}
.task-card {
  background: white;
  padding: 40px auto;
}
h1 {
  color: #1b2a4a;
  text-align: center;
  margin-bottom: 20px;
}
.task-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #d8d8d8;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.task-card p {
  margin: 0;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
}
.label {
  font-weight: bold;
  color: #555;
}
.done {
  color: #42b883;
}
.pending {
    color: #b8b442;
}
.not-found {
  text-align: center;
  color: #666;
  font-style: italic;
  margin-top: 20px;
}
</style>