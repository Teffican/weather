<template>
  <div class="forecast">
    <div class="forecast__title">Прогноз на неделю</div>
    <Splide class="forecast__list" :options="options">
      <SplideSlide class="forecast__item" v-for="item in 7" :key="item">
        <div class="forecast__day-week">Понедельник</div>
        <div class="forecast__day-num">11 апреля</div>
        <img
        class="forecast__icon"
          src="https://openweathermap.org/img/wn/02d@2x.png"
          alt="Clouds"
        />
        <div class="forecast__temp-day">Днём +6°</div>
        <div class="forecast__temp-night">Ночью -1°</div>
        <div class="forecast__desc">Пасмурно</div>
      </SplideSlide>
    </Splide>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

export default {
  components: {
    Splide,
    SplideSlide,
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
  }
  &__day-num,
  &__temp-night,
  &__desc {
    color: #939cb0;
    font-size: 14px;
  }
}
</style>