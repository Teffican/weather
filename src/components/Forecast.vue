<template>
  <div class="forecast__loading" v-if="isLoading">
    <Spinner />
  </div>
  <div
    v-else-if="city"
    class="forecast"
  >
    <div class="forecast__title">
      Прогноз на неделю
    </div>
    <Splide
      class="forecast__list"
      :options="options"
    >
      <SplideSlide
        v-for="item in list"
        :key="item"
        class="forecast__item"
      >
        <div class="forecast__day-week">
          {{ getDayName(item.dt) }}
        </div>
        <div class="forecast__day-num">
          {{ getMonth(item.dt) }}
        </div>
        <img
          class="forecast__icon"
          :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
          alt="Clouds"
        >
        <div class="forecast__temp-day">
          Днём {{ getTemp(item.temp.day) }}
        </div>
        <div class="forecast__temp-night">
          Ночью {{ getTemp(item.temp.night) }}
        </div>
        <div class="forecast__desc">
          {{ capitalizeFirstChar(item.weather[0].description) }}
        </div>
      </SplideSlide>
    </Splide>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
import useTemp from '@/hooks/useTemp.js'
import useCapitalizeFirstChar from '@/hooks/useCapitalizeFirstChar.js'
import dictionary from '@/dictionary.json'
import Spinner from "./Spinner.vue";

export default {
  components: {
    Splide,
    SplideSlide,
    Spinner
  },
  setup(){
    const getTemp = useTemp()
    const capitalizeFirstChar = useCapitalizeFirstChar()

    return { getTemp, capitalizeFirstChar }
  },
  data() {
    return {
      options: {
        perPage: 7,
        pagination: false,
        arrows: false,
        breakpoints: {
          950: {
            perPage: 4,
            arrows: true,
          },
          610: {
            perPage: 3,
          },
          500: {
            perPage: 2,
          },
          400: {
            perPage: 1,
          },
        },
      },
    };
  },
  computed: {
    city(){
      return this.$store.state.city
    },
    list(){
      return this.$store.state.dailyWeather
    },
    isLoading(){
      return this.$store.state.isLoading
    }
  },
  methods:{
    getDayName(timestamp){
      const dayNum = new Date(timestamp * 1000).getDay()
      const lang = this.$store.state.lang.toLowerCase()
      const days = dictionary.daysOfWeek

      return days[dayNum][lang]
    },
    getMonth(timestamp){
      const date = new Date(timestamp * 1000)
      const monthNum = date.getMonth()
      const dayNum = date.getDate()
      const lang = this.$store.state.lang.toLowerCase()
      const months = dictionary.months

      return `${dayNum} ${months[monthNum][lang]}`
    }
  }
};
</script>

<style lang='scss'>
.forecast {
  border-radius: 15px;
  padding: 20px;
  background-color: rgb(42, 42, 42);
  &__title {
    font-weight: 700;
    font-size: 24px;
  }
  &__list {
    margin-top: 10px;
    padding: 0 40px;
  }
  &__item {
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__temp-day {
    font-weight: 600;
  }
  &__desc {
    margin-top: 5px;
    text-align: center;
  }
  &__day-num,
  &__temp-night,
  &__desc {
    color: #939cb0;
    font-size: 14px;
  }
  &__loading{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 297px;
    background-color: rgb(42, 42, 42);
    border-radius: 15px;
    margin: 15px 0;
  }
}
</style>