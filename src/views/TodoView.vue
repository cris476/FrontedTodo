<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6" class="mt-4">
                <TodoForm @newNota="addTask" />
            </v-col>

            <v-col v-if="tasks.length != 0" cols="12" md="6" class="mt-4">
                <v-sheet class="scrollable-container" v-scroll="onScroll">
                    <v-row>
                        <v-col v-for="(task, index) in tasks" :key="index" cols="12">
                            <Task :title="task.title" :description="task.description"></Task>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.scrollable-container {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #ddd;
    padding: 10px;
}
</style>

<script>
import Task from "../components/Task.vue";
import TodoForm from "../components/TodoForm.vue";

export default {
    components: {
        Task,
        TodoForm
    },

    data() {
        return {
            tasks: []
        };
    },

    methods: {
        addTask(notaNew) {
            if (notaNew && notaNew.title && notaNew.description) {
                this.tasks.push({
                    title: notaNew.title.trim(),
                    description: notaNew.description.trim()
                });
            } else {
                console.error("Error: La tarea debe tener título y descripción.");
            }
        },
        onScroll(event) {
            console.log("Scrolling...", event);
        }
    }
};
</script>
