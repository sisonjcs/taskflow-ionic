import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Preferences } from '@capacitor/preferences'

interface Task {
    id: number
    name: string
    done: boolean
    photo?: string
}

export const useTaskStore = defineStore('tasks', () => {
    const STORAGE_KEY = 'taskflow_tasks'
    const ID_KEY = 'taskflow_id'

    const tasks = ref<Task[]>([])
    const nextId = ref(1)

    const totalCount = computed(() => tasks.value?.length)
    const doneCount = computed(() => tasks.value?.filter(t => t.done).length)
    const pendingCount = computed(() => tasks.value?.filter(t => !t.done).length)

    const saveTasks = async() => {
        await Preferences.set({
            key: STORAGE_KEY,
            value: JSON.stringify(tasks.value)
        })
        await Preferences.set({
            key: ID_KEY,
            value: JSON.stringify(nextId.value)
        })
    }

    const loadTasks = async() => {
        const { storageValue }: any = await Preferences.get({key: STORAGE_KEY})
        const { taskId }: any = await Preferences.get({key: ID_KEY})
        if (storageValue.value) {
           tasks.value = storageValue.value
        }
        if (taskId.value) {
            nextId.value = taskId.value
        }
    }

    function addTask(name: string) {
        if (name) {
            const newTask = {
                id: nextId.value++,
                name: name,
                done: false
            }

            tasks.value.push(newTask)
            saveTasks()
        }
    }

    function toggleTask(id: number) {
        const foundTask = tasks.value.find(t => t.id === id)
        if (foundTask) {
            foundTask.done = !foundTask.done
            saveTasks()
        }
    }

    function removeTask(id: number) {
        const foundTask = tasks.value.find(t => t.id === id)
        if (foundTask) {
            tasks.value = tasks.value.filter(t => t.id !== id)
            saveTasks()
        }
    }

    function addPhoto(id: number, photoPath: string) {
        const foundTask = tasks.value.find(t => t.id === id)

        if (foundTask && photoPath) {
            foundTask.photo = photoPath
            saveTasks()
        }
    }
    
    return ({ tasks, doneCount, pendingCount, totalCount, addTask, toggleTask, removeTask, addPhoto, loadTasks })
}, {
    persist: true
})