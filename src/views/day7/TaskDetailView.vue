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
                <ion-title>
                    Task Detail View: {{ foundTask.name }}
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="task-details">
                <p>
                    ID: {{ foundTask.id }}
                </p>
                <p>
                    Name: {{ foundTask.name }}
                </p>
                <p>
                    Status: {{ foundTask.done ? "Done" : "Pending" }}
                </p>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped>
.task-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 50px auto;
}
</style>