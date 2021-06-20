<template>
    <div class="main">
        <img src="../assets/img/404/404.png" alt="" @click="goToHome">
    </div>
</template>

<script>
    export default {
        name: "Error404",
        methods: {
            goToHome() {
                this.$router.push('/home');
            }

        }
    }
</script>

<style scoped>
    .main {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>