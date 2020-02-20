<template>
  <span class="developer">
    <img :src="developer.photo" alt="" class="profilePhoto">
    <a :href="developer.link" class="name" target="_blank">{{developer.name}}</a>

  </span>
</template>

<script>
  export default {
    name: "Developer",
    props: ["developer"]
  }
</script>

<style scoped>
  .developer {
    display: inline-block;
    padding-right: 32px;
  }

  .profilePhoto {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .name {
    color: #fff;
    text-decoration: none;
    margin-left: 8px;
    top: -11px;
    position: relative;
    font-size: 18px;
  }
</style>