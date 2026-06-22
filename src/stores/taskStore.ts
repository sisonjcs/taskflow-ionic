import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface Task {
    id: number
    name: string
    done: boolean
}

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref<Task[]>([])
    const nextId = ref(1)

    const totalCount = computed(() => tasks.value?.length)
    const doneCount = computed(() => tasks.value?.filter(t => t.done).length)
    const pendingCount = computed(() => tasks.value?.filter(t => !t.done).length)

    function addTask(name: string) {
        if (name) {
            const newTask = {
                id: nextId.value++,
                name: name,
                done: false
            }

            tasks.value.push(newTask)
        }
    }

    function toggleTask(id: number) {
        const foundTask = tasks.value.find(t => t.id === id)
        if (foundTask) {
            foundTask.done = !foundTask.done
        }
    }

    function removeTask(id: number) {
        const foundTask = tasks.value.find(t => t.id === id)
        if (foundTask) {
            tasks.value = tasks.value.filter(t => t.id !== id)
        }
    }
    
    return ({ tasks, doneCount, pendingCount, totalCount, addTask, toggleTask, removeTask })
}, {
    persist: true
})