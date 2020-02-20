<template>
  <div>
    <Header/>
    <div class="content">
      <Info/>
      <Bot/>
    </div>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import Bot from "./components/Bot";
  import Info from "./components/Info";

  export default {
    name: 'App',
    components: {
      Header,
      Bot,
      Info
    }
  }
</script>

<style>
  body {
    margin: 0;
    overflow: hidden;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    background-color: #21a168;
  }

  html {
    scroll-behavior: smooth;
  }

  @media only screen and (max-width: 600px) {
    body {
      overflow: auto;
    }
  }
</style>
