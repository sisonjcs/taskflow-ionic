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
import { computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { storeToRefs } from 'pinia';

const route = useRoute()
const taskStore = useTaskStore()

const { tasks } = storeToRefs(taskStore)

const foundTask = computed(() => tasks.value.find(t => t.id === Number(route.params.id)))
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-back-button slot="start" default-href="/tabs/tasks"/>
                <ion-title>
                    Task Detail View
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <p>
                ID: {{ foundTask.id }}
            </p>
            <p>
                Name: {{ foundTask.name }}
            </p>
            <p>
                Status: {{ foundTask.done ? "Done" : "Pending" }}
            </p>
        </ion-content>
    </ion-page>
</template>

<style scoped>
</style>