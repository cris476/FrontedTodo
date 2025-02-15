<template>
    <v-card class="pa-5 mb-4">
        <v-card-title class="text-h5 text-center">{{ title }}</v-card-title>
        <v-card-text>
            {{ description }}
        </v-card-text>
        <v-row>
            <v-col cols="6">
                <v-btn type="submit" color="red" block>
                    Eliminar
                </v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn type="submit" color="blue" block>
                    Editar
                </v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: "Sin descripción"
        }
    }
};
</script>