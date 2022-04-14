<template>
  <Splide
    class="weather__carousel"
    :options="options"
  >
    <SplideSlide
      v-for="item in list"
      :key="item.dt"
      class="weather__carousel-item"
    >
      <div class="weather__carousel-time">
        {{ getHours(item.dt) }}:00
      </div>
      <img
        class="weather__carousel-icon"
        :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
        alt="Clouds"
      >
      <div class="weather__carousel-temp">
        {{ getTemp(item.temp) }}
      </div>
    </SplideSlide>
  </Splide>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
import useTemp from '@/hooks/useTemp.js'

export default {
  components: {
    Splide,
    SplideSlide,
  },
  setup(){
    const getTemp = useTemp()

    return {getTemp}
  },
  data() {
    return {
      options: {
        perPage: 15,
        pagination: false,
        breakpoints: {
          840: {
            perPage: 10,
          },
          640: {
            perPage: 5,
          },
          390: {
            perPage: 3,
          },
        },
      },
    };
  },
  computed: {
    list(){
      return this.$store.state.hourlyWeather
    }
  },
  methods: {
    getHours(timestamp){
      const date = new Date(timestamp * 1000)
      const hours = date.getHours()

      return hours.toString().length > 1 ? hours : `0${hours}`
    }
  }
};
</script>

<style lang="scss">
.weather__carousel {
  margin-top: 20px;
  padding: 0 40px;
  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 71px;
  }
  &-icon {
    max-width: inherit;
  }
}
</style>