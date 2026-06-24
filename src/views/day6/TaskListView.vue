<script setup>
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonInput,
  IonList, 
  IonItem, 
  IonCheckbox, 
  IonButton,
  IonFab, 
  IonFabButton, 
  IonIcon,
  IonImg
} from "@ionic/vue"; 
import { add, trash } from "ionicons/icons";
import { useRouter } from "vue-router";

import { ref } from "vue";
import { storeToRefs } from "pinia";

// TODO 1: Import your store
import { useTaskStore } from "@/stores/taskStore";

// TODO 2: Get the store instance
const taskStore = useTaskStore();

// TODO 3: Destructure REACTIVE STATE using storeToRefs()
const { tasks, doneCount, pendingCount, totalCount } = storeToRefs(taskStore);

// TODO 4: Destructure ACTIONS directly (no storeToRefs needed for functions)
const { addTask, toggleTask, removeTask } = taskStore;

// This local ref is fine — it's UI state, not task state
const newTaskName = ref("");

const router = useRouter()

function handleAdd() {
  // TODO 5: Call addTask() from the store, then clear the input
  addTask(newTaskName.value)
  newTaskName.value = ""
}

function goToDetail(id) {
  router.push(`tasks/${id}`)
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> Task List View </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="task-view">
        <h1>📝 Tasks</h1>

        <!-- TODO 6: Display totalCount, doneCount, pendingCount from the store -->
        <div class="stats">
          <!-- your stats here -->
          <div>
            <span>Total</span>
            <strong>{{ totalCount || 0 }}</strong>
          </div>

          <div>
            <span>Done</span>
            <strong>{{ doneCount || 0 }}</strong>
          </div>

          <div>
            <span>Pending</span>
            <strong>{{ pendingCount || 0 }}</strong>
          </div>
        </div>

        <div class="input-row">
          <ion-input
            v-model="newTaskName"
            placeholder="New task..."
            @keyup.enter="handleAdd"
          />
        </div>

        <!-- TODO 7: Render the task list using tasks from the store -->
        <ion-list class="task-list">
          <!-- v-for task in tasks -->
          <!--   checkbox v-model="task.done" @change="toggleTask(task.id)" -->
          <!--   span :class done -->
          <!--   remove button @click="removeTask(task.id)" -->
          <ion-item v-for="task in tasks" :key="task.id" lines="none">
            <div>
              <ion-checkbox v-model="task.done" @change="toggleTask(task.id)" />
              <ion-img v-if="task.photo" :src="task.photo"/>
            </div>
            <span :class="{ done: task.done }" @click="goToDetail(task.id)">
              {{ task.name }}
            </span>
            <ion-button @click="removeTask(task.id)" color="danger">
              <ion-icon :icon="trash"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-list>
        <p v-if="!tasks || tasks.length === 0">No tasks yet. Add one above!</p>
      </div>
    </ion-content>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="handleAdd">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>

<style scoped>
.task-view {
  max-width: 480px;
  padding: 24px;
  font-family: Arial, sans-serif;
  margin: 40px auto;
}

.task-view p {
  text-align: center;
  font-style: italic;
  color: #666;
}
h1 {
  color: #1b2a4a;
}
.stats {
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #e9f7f0;
  border-radius: 6px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.stats div {
  display: flex;
  flex-direction: column;
}

.stats div span {
  font-weight: bold;
}

.stats strong {
  font-size: 18px;
  color: #42b883;
}

.task-list ion-list ion-button {
  padding: 8px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.task-list ion-list button:hover {
  background: #fdc9c9;
}

.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.task-list ion-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid #d8d8d8;
}
.task-list ion-item span {
  flex: 1;
  font-size: 14px;
}
.done {
  text-decoration: line-through;
  color: #9ca3af;
}
.task-list ion-item .remove {
  padding: 4px 10px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
ion-item div {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
}
ion-img {
  width: 100px;
  height: 100px;
}
</style>
