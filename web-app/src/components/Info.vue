<template>
  <div class="info">
    <div class="name"><b>Intuitive Bot</b></div>
    <LoresIspum/>
    <Developers/>
    <div class="scrollDown">
      <div class="arrow" @click="scrollDown">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

  </div>
</template>

<script>
  import Developers from "./Developers";
  import LoresIspum from "./LoresIspum";

  export default {
    name: "Info",
    components: {
      Developers,
      LoresIspum
    },
    methods: {
      scrollDown() {
        window.scroll(0, 10000)
      }
    }
  }
</script>

<style scoped>
  .info {
    max-width: calc(100% - 450px);
    display: inline-block;
    position: relative;
    color: #fff;
    top: calc(100% - 40px);
    margin-top: 80px;
    margin-left: 40px;
    margin-right: 40px;
  }

  .name {
    font-size: 60px;
  }

  .scrollDown {
    display: none;
    width: 100%;
    text-align: center;
    padding-top: 32px;
    transform: scale(0.6);
  }

  .arrow {
    display: inline-block;
    cursor: pointer;
  }

  .arrow span {
    display: block;
    width: 30px;
    height: 30px;
    border-bottom: 5px solid #fff;
    border-right: 5px solid #fff;
    transform: rotate(45deg);
    margin: -10px;
    animation: animate 2s infinite;
  }

  .arrow span:nth-child(2) {
    animation-delay: -0.2s;
  }

  .arrow span:nth-child(3) {
    animation-delay: -0.4s;
  }

  @keyframes animate {
    0% {
      opacity: 0;
      transform: rotate(45deg) translate(-20px, -20px);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: rotate(45deg) translate(20px, 20px);
    }
  }

  @media only screen and (max-width: 600px) {
    .info {
      top: 0;
      margin-top: 0;
      max-width: 100%;
    }

    .scrollDown {
      display: block;
    }
  }
</style>