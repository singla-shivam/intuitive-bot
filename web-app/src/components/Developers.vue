<template>
  <div class="developers">
    <div class="titles">Developers</div>
    <Developer v-for="d in developers" v-bind:developer="d"/>
  </div>
</template>

<script>
  import Developer from "./Developer";

  export default {
    name: "Developers",
    components: {
      Developer
    },
    data() {
      return {
        developers: [{
          name: "Satyam Kumar",
          link: "https://www.linkedin.com/in/satyamcse/",
          photo: "https://media-exp1.licdn.com/dms/image/C5103AQFue6fbO99fJQ/profile-displayphoto-shrink_200_200/0?e=1587600000&v=beta&t=pcft6f1tyV5gSktHyxYZTNWgPPvkyJLcTseXBFykqQQ"
        }, {
          name: "Shivam Singla",
          link: "https://www.linkedin.com/in/singla-shivam/",
          photo: "https://media-exp1.licdn.com/dms/image/C5103AQGYA1jXu4eeEQ/profile-displayphoto-shrink_200_200/0?e=1587600000&v=beta&t=2H31sIRN6UKZ9fjdkeRxa9bN4clqUUTXjYKsoiO-TZg"
        }]

      }
    }
  }
</script>

<style scoped>
  .developers {
    margin-top: 32px;
  }

  .titles {
    font-size: 2rem;
    font-weight: 700;
    padding-bottom: 16px;
  }
</style>