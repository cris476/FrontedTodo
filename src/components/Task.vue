<template>
    <v-card class="pa-5 mb-4">
        <v-container v-if="edit">
            <v-card-title class="text-h5 text-center">{{ localTitle }}</v-card-title>
            <v-card-text>
                {{ localDescription }}
            </v-card-text>
            <v-row>
                <v-col cols="6">
                    <v-btn type="button" color="red" block @click="deleteTask">
                        Eliminar
                    </v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn type="button" color="blue" block @click="editTask">
                        Editar
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>

        <v-container v-else>
            <div>{{ id }}</div>
            <v-text-field v-model="localTitle" outlined></v-text-field>
            <v-textarea v-model="localDescription" outlined></v-textarea>
            <v-row>
                <v-col cols="6">
                    <v-btn type="button" color="green" block @click="confirmEdit">
                        Confirmar
                    </v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn type="button" color="red" block @click="cancelEdit">
                        Cancelar
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>


export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            edit: true,
            localTitle: this.title,
            localDescription: this.description
        };
    },
    methods: {
        editTask() {
            this.edit = false;
        },
        confirmEdit() {
            this.$emit("updateTask", {
                id: this.id,
                title: this.localTitle,
                description: this.localDescription
            });
            this.edit = true;
        },
        cancelEdit() {
            this.localTitle = this.title;
            this.localDescription = this.description;
            this.edit = true;
        },
        deleteTask() {
            this.$emit("deleteTask", {
                id: this.id
            });
        }
    }
};
</script>
