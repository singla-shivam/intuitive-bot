<template>
  <div class="bot">
    <iframe
      class="iframe"
      allow="microphone;"
      src="https://console.dialogflow.com/api-client/demo/embedded/intuitiveBot">
    </iframe>
  </div>
</template>

<script>
  export default {
    name: "Bot",
    mounted() {
      const iframe = document.querySelector(".iframe")
      iframe.onload = function () {
        console.log(iframe.style.height)
        if(window.innerHeight <= 600) iframe.style.height = window.innerHeight + 'px'
        console.log(iframe.style.height)
      }
    }
  }
</script>

<style scoped>
  .bot {
    position: absolute;
    top: 80px;
    right: 60px;
    display: inline-block;
  }

  .iframe {
    width: 400px;
    max-height: 500px;
    height: 500px;
    border: solid 2px white;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
  }

  @media only screen and (max-width: 600px) {
    .bot {
      left: 0;
      right: 0;
      bottom: 0;
      position: relative;
      width: 100%;
    }

    .iframe {
      width: 100%;
      border: none;
      border-top: solid 2px white;
    }
  }
</style>