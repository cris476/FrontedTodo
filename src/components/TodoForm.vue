<template>
    <v-card class="pa-5 mb-4">
        <v-card-title class="text-h5 text-center">Añadir Tarea</v-card-title>
        <v-form @submit.prevent="submitTask">
            <v-text-field v-model="title" label="Título" outlined required></v-text-field>
            <v-textarea v-model="description" label="Descripción" outlined required></v-textarea>
            <v-btn type="submit" color="primary" block class="mb-3">Añadir Tarea</v-btn>
        </v-form>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            title: "",
            description: ""
        };
    },
    methods: {
        submitTask() {
            if (this.title.trim() && this.description.trim()) {
                this.$emit("newNota", {
                    title: this.title,
                    description: this.description
                });

                this.title = "";
                this.description = "";
            }
        }
    }
};
</script>

