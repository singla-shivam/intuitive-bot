<template>
  <div class="lores">
    Here are a few things that you can say to the bot -
    <ul>
      <li>What do you sell</li>
      <li>I am looking for a tv</li>
      <li>What is screen resolution of second tv from samsung</li>
      <li>How much warranty do I get on this 55 inch LG tv</li>
      <li>I would like it buy it</li>
      <li>Show my cart</li>
      <li>Remove tv from cart</li>
      <li>Change quantity of fridge to 2</li>
      <li>When will my order be delivered?</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "LoresIspum"
  }
</script>

<style scoped>
  .lores {
    max-width: 90%;
    min-height: 250px;
    text-align: justify;
    margin-top: 16px;
  }

  @media only screen and (max-width: 600px) {
    .lores {
      max-width: 100%;
    }
  }
</style>