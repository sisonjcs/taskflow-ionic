<!-- <template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Tab 1 page" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
</script>
 -->
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

// TODO 1: Import your store
import { useTaskStore } from '@/stores/taskStore'

// TODO 2: Get the store instance
const taskStore = useTaskStore()

// TODO 3: Destructure REACTIVE STATE using storeToRefs()
const { tasks, doneCount, pendingCount, totalCount } = storeToRefs(taskStore)

// TODO 4: Destructure ACTIONS directly (no storeToRefs needed for functions)
const { addTask, toggleTask, removeTask } = taskStore

// This local ref is fine — it's UI state, not task state
const newTaskName = ref('')
const username = ref('')

function handleAdd() {
  // TODO 5: Call addTask() from the store, then clear the input
  addTask(newTaskName.value)
  newTaskName.value = ''
}

function handleLogIn() {
    logIn(username.value)
    console.log(username.value)
    username.value = ''
}

function handleLogOut() {
    logOut(currentUser.value.name)
}
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <header>
    <div v-if="!currentUser" class="auth-row">
        <input 
            type="text"
            placeholder="Username"
            v-model="username"
            @keyup.enter="handleLogIn"
        />
        <button
            @click="handleLogIn"
            :disabled="!username.trim()"
        >
            Log In
        </button>
    </div>
    <div v-if="currentUser" class="user-row">
        <h2>
            Current user: {{ currentUser.name }}
        </h2>
        <button
            @click="handleLogOut"
        >
            Log Out
        </button>
    </div>
  </header>
  <main>
      <div class="task-view">
        <h1>📝 Tasks</h1>
    
        <!-- TODO 6: Display totalCount, doneCount, pendingCount from the store -->
        <div class="stats">
          <!-- your stats here -->
          <div><span>Total</span>
            <strong>{{ totalCount || 0}}</strong>
          </div>
    
          <div>
            <span>Done</span>
            <strong>{{ doneCount || 0}}</strong>
          </div>
    
          <div>
            <span>Pending</span>
            <strong>{{ pendingCount || 0}}</strong>
          </div>
        </div>
    
        <div class="input-row">
          <input v-model="newTaskName" placeholder="New task..." @keyup.enter="handleAdd" />
          <button @click="handleAdd" :disabled="!newTaskName.trim() || !currentUser">Add</button>
        </div>
    
        <!-- TODO 7: Render the task list using tasks from the store -->
        <ul class="task-list">
          <!-- v-for task in tasks -->
          <!--   checkbox v-model="task.done" @change="toggleTask(task.id)" -->
          <!--   span :class done -->
          <!--   remove button @click="removeTask(task.id)" -->
          <li v-for="task in tasks">
            <input
                type="checkbox"
                v-model="task.done"
                @change="toggleTask(task.id)"
            />
            <span :class="{done: task.done}">
                {{ task.name }}
            </span>
            <button @click="removeTask(task.id)">
              <i class="fa fa-trash fa-lg"></i>
            </button>
          </li>
        </ul>
        <p v-show="!tasks || tasks.length === 0 || !currentUser">
          {{ currentUser ? "No tasks yet. Add one above!" : "Log in to start adding tasks!"}}
        </p>
      </div>
  </main>
</template>

<style scoped>
header {
  max-width: 480px;
  margin: 24px auto 0;
  padding: 16px 20px;

  background: #42B883;
  color: white;

  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.25);

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.auth-row,
.user-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

header input {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  outline: none;
}

header button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;

  background: white;
  color: #42B883;

  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

header button:hover {
  background: #f3f4f6;
}

header button:disabled {
  background: #619d829c;
  cursor: not-allowed;
}

.logout-btn {
  background: white;
  color: #dc2626;
}

.logout-btn:hover {
  background: #fee2e2;
}

.task-view { max-width: 480px; margin: 40px auto; padding: 24px; font-family: Arial, sans-serif; }

.task-view p {
    text-align: center;
    font-style: italic;
    color: #666;
}
h1 { color: #1B2A4A; }
/* .stats { font-size: 13px; color: #555; padding: 8px 12px; background: #e9f7f0; border-radius: 6px; margin-bottom: 16px; } */
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
  color: #42B883;
}

.task-list li button {
  padding: 8px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.task-list li button:hover {
  background: #FDC9C9;
}

.input-row { display: flex; gap: 8px; margin-bottom: 16px; }
.input-row input { flex: 1; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
.input-row button { padding: 8px 16px; background: #42B883; color: white; border: none; border-radius: 6px; cursor: pointer; }
.input-row button:hover {
  background: #399D70; 
}

.input-row button:disabled {
  background: #619d829c;
  cursor: not-allowed;
}
.task-list { list-style: none; padding: 0; margin: 0; }
.task-list li { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: white; border-radius: 6px; margin-bottom: 8px; border: 1px solid #eee; }
.task-list li span { flex: 1; font-size: 14px; }
.done { text-decoration: line-through; color: #9ca3af; }
.task-list li .remove { padding: 4px 10px; background: #fee2e2; color: #dc2626; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; }
</style>