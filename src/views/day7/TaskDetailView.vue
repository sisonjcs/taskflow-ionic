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
            <ion-back-button default-href="/tabs/tasks"/>
            <ion-toolbar>
                <ion-title>
                    Task Detail View
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-header>
                <ion-toolbar>
                    <ion-title>
                        Task {{ route.params.id }}
                    </ion-title>
                </ion-toolbar>
            </ion-header>
            <p>
                ID: {{ route.params.id }}
            </p>
        </ion-content>
    </ion-page>
</template>

<styles>
</styles>