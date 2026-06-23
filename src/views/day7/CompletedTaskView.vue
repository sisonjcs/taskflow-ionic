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

const taskStore = useTaskStore()

const { tasks } = taskStore

const completedTasks = computed(() => tasks.filter(t => t.done))

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
            <ion-list>
                <ion-item v-for="task in completedTasks" :key="task.id">
                    {{ task.name }}
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<styles>
</styles>