<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    outline: none;
    text-decoration: none;
  }
  .flex {
    display: flex;
  }
  .j-c {
    justify-content: center;
  }
  .j-s {
    justify-content: space-between;
  }
  .a-c {
    align-items: center;
  }
</style>
