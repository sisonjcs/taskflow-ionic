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

const route = useRoute()
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
                ID: {{ route.params.id }}
            </p>
        </ion-content>
    </ion-page>
</template>

<styles>
</styles>