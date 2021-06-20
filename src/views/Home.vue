<template>
    <div>
        <div>home</div>
<!--        <side-bar></side-bar>-->
    </div>
</template>

<script>
    // import
    // import '../assets/js/canvas/three/three-waves.min'
    // import '../assets/js/canvas/three/three.min'
    // import '../assets/js/canvas/three/index'
    import BaseHeader from "@/components/BaseHeader";
    import BaseFooter from "@/components/BaseFooter";
    import Error404 from "@/views/Error404";
    // import SideBar from "@/components/admin/SideBar";
    export default {
        name: "Home",
        components: {
            BaseHeader,
            BaseFooter,
            Error404,
            // SideBar
        },
    }

</script>

<style scoped>

</style>