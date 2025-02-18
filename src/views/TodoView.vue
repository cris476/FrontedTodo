<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card outlined class="pa-5">
                    <v-row justify="space-between" align="center">
                        <v-col cols="6">
                            <span>{{ phrase }}</span>
                        </v-col>
                        <v-col cols="6" class="text-right">
                            <v-btn color="primary" @click="getPhraseTodo">Frases</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6" class="mt-4">
                <TodoForm @newNota="addTask" />
            </v-col>

            <v-col v-if="tasks.length != 0" cols="12" md="6" class="mt-4">
                <v-sheet class="scrollable-container">
                    <v-row>
                        <v-col v-for="(task) in tasks" :key="task.id" cols="12">
                            <Task :title="task.title" :id="task.id" :description="task.description"
                                @updateTask="updateTask" @deleteTask="deleteTask">
                            </Task>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>
        <v-snackbar v-model="showError" color="red" top timeout="3000">
            {{ errorMessage }}
        </v-snackbar>
        <v-snackbar v-model="updateTaskLocal" color="green" top timeout="3000">
            Tarea actualizada
        </v-snackbar>
    </v-container>

</template>

<style scoped>
.frases {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

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
import { getPhrase } from "../Service/quotableService";
import { createTask, deleteTask, getAllTasks, updateTask } from "../Service/taskService";

export default {
    components: {
        Task,
        TodoForm
    },
    // Define las propiedades que recibe el componente
    data() {
        return {
            showError: false,
            errorMessage: "",
            tasks: [],
            phrase: "",
            updateTaskLocal: false
        };
    },
    //metodo para obtener todas las tareas
    async mounted() {

        try {
            const response = await getAllTasks();
            this.tasks = response.data.tasks;
        } catch (error) {
            this.handleError(error);
        }

    },
    methods: {

        //metodo para agregar una tarea nueva a la lista de tareas  
        async addTask(notaNew) {

            try {
                if (notaNew && notaNew.title && notaNew.description) {
                    const response = await createTask(notaNew);
                    if (response.data[0].validation) {
                        this.tasks = response.data[0].tasks
                    }

                }
            } catch (error) {
                this.handleError(error);
            }

        },
        // metodo para obtener una frase de la api quotable
        async getPhraseTodo() {
            try {
                const response = await getPhrase();
                if (response.data) {
                    this.phrase = response.data.content
                }
            } catch (error) {
                this.handleError(error);
            }
        },
        //metodo para actualizar una tarea
        async updateTask(taskUpdate) {
            try {
                const response = await updateTask(taskUpdate.id, {
                    title: taskUpdate.title,
                    description: taskUpdate.description
                });

                if (response.data.validation) {
                    this.updateTaskLocal = true;
                }

            } catch (error) {
                this.handleError(error);
            }
        },
     // metodo para eliminar una tarea
        async deleteTask(taskDelete) {
            try {
                await deleteTask(taskDelete.id);
                const responsedata = await getAllTasks();
                this.tasks = responsedata.data.tasks;
            } catch (error) {
                this.handleError(error);
            }
        },

        // metodo para mostrar mensaje de error
        handleError(error) {
            this.isLoading = false;
            if (error.response.data) {
                this.showErrorMessage(error.response.data.message);
            } else {
                this.showErrorMessage("Error desconocido. Inténtalo más tarde.");
            }
        },
        // metodo para mostrar mensaje de error
        showErrorMessage(message) {
            this.errorMessage = message;
            this.showError = true;
        }
    }
};
</script>
