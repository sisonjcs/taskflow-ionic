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
                <ion-title>
                    Completed Tasks
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list v-if="completedTasks">
                <ion-item v-for="task in completedTasks" :key="task.id">
                    {{ task.name }}
                </ion-item>
            </ion-list>
            <p v-if="!completedTasks || completedTasks.length === 0">
                No completed tasks as of the moment.
            </p>
        </ion-content>
    </ion-page>
</template>

<style scoped>
    p {
        text-align: center;
        color: gray;
        font-style: italic;
    }
</style>