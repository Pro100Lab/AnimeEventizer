<template>
    <v-sheet class="rounded">
        <v-tabs v-model="tab">
            <v-tab href="#tab-0">Вход</v-tab>
            <v-tab href="#tab-1">Регистрация</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item value="tab-0">
                <login></login>
            </v-tab-item>
            <v-tab-item value="tab-1">
                <register></register>
            </v-tab-item>
        </v-tabs-items>
    </v-sheet>
</template>

<script>
    import Login from "./Login";
    import Register from "./Register";
    export default {
        name: "Authorization",
        components: {Register, Login},
        data: () => {
            return {
                tab: 0
            }
        },
    }
</script>

<style scoped>

</style>
