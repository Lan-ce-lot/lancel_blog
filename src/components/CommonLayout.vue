<template>
  <div class="container">
    <base-header></base-header>
    <!-- 子路由 -->
    <transition name="slide-fade">
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
    </transition>
    <base-footer></base-footer>
  </div>
</template>

<script>
  import BaseHeader from "@/components/BaseHeader";
  import BaseFooter from "@/components/BaseFooter";
export default {

  data() {
    return {
      items: []
    };
  },
  components: {
    BaseHeader,
    BaseFooter,
  },
  mounted() {

  }
};
</script>

<style lang="css" scoped>
.container {
  width: 100%;
  margin: 0 auto;
}
.content {
  margin-bottom: 1.8rem;
}
.cont-ul {
  padding-top: 0.5rem;
  background-color: #ccc;
}
.cont-ul::after {
  content: "";
  display: block;
  clear: both;
  width: 0;
  height: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
