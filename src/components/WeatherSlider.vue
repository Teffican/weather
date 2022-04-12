<template>
  <Splide class="weather__carousel" :options="options">
    <SplideSlide
      class="weather__carousel-item"
      v-for="slide in 24"
      :key="slide"
    >
      <div class="weather__carousel-time">{{ slide }}:00</div>
      <img
        class="weather__carousel-icon"
        src="https://openweathermap.org/img/wn/03d@2x.png"
        alt="Clouds"
      />
      <div class="weather__carousel-temp">+7°</div>
    </SplideSlide>
  </Splide>
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