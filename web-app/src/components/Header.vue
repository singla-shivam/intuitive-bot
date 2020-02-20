<template>
  <div>
    <img src="./../assets/wallpaper.jpg" alt="" class="bg">
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>
  .bg {
    width: 100%;
    filter: brightness(0.5);
    position: fixed;
    bottom: -10%;
  }

  @media only screen and (max-width: 600px) {
    .bg {
      height: 100%;
      width: unset;
      bottom: 0;
      top: 0;
    }
  }
</style>