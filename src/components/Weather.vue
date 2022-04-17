<template>
  <div class="weather__loading" v-if="isLoading">
    <Spinner />
  </div>
  <div
    v-else-if="city"
    :class="`weather weather__${weather.main}`"
  >
    <div class="weather__inner">
      <div class="weather__city">
        {{ city }}
      </div>

      <div class="weather__info">
        <div class="weather__temp">
          {{ getTemp(weather.temp) }}
        </div>
        <img
          class="weather__icon"
          :src="`https://openweathermap.org/img/wn/${weather.icon}@2x.png`"
          alt="Clouds"
        >
        <div class="weather__desc">
          <div class="weather__desc-title">
            {{ capitalizeFirstChar(weather.description) }}
          </div>
          <div class="weather__desc-feels">
            {{dict.weather.feelsLike[lang]}} 
            <span>{{ getTemp(weather.tempFeels) }}</span>
          </div>
        </div>
      </div>

      <div class="weather__wind">
        {{ weather.wind }}
        {{temp === '°C' 
          ? dict.weather.windUnits.metric[lang]
          : dict.weather.windUnits.imperial[lang]
          }}
      </div>

      <WeatherSlider />
    </div>
  </div>
</template>

<script>
import WeatherSlider from "@/components/WeatherSlider.vue";
import useTemp from '@/hooks/useTemp.js'
import useCapitalizeFirstChar from '@/hooks/useCapitalizeFirstChar.js'
import Spinner from "./Spinner.vue";
import { mapState } from 'vuex';
import dictionary from '@/dictionary.json'

export default {
  components: {
    WeatherSlider,
    Spinner
  },
  setup(){
    const getTemp = useTemp()
    const capitalizeFirstChar = useCapitalizeFirstChar()
    const dict = dictionary

    return {getTemp, capitalizeFirstChar, dict}
  },
  computed: mapState({
    weather: state => state.currentWeather,
    city: state => state.city,
    isLoading: state => state.isLoading,
    lang: state => state.lang.toLowerCase(),
    temp: state => state.temp
  })
};
</script>

<style lang="scss">
$smokeStyles: "mist", "smoke", "haze", "dust", "fog", "sand", "ash", "squall",
  "tornado";
$weatherStyles: "thundershtorm", "drizzle", "rain", "snow", "smoke", "clouds",
  "clear";

@each $smoke in $smokeStyles {
  .weather__#{$smoke} {
    background-image: url("@/images/smoke.jpg");
  }
}
@each $weather in $weatherStyles {
  .weather__#{$weather} {
    @if $weather == "drizzle" {
      background-image: url("@/images/rain.jpg");
    } @else {
      background-image: url("@/images/#{$weather}.jpg");
    }
  }
}

.weather {
  margin: 15px 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  color: #fff;
  border-radius: 15px;
  padding: 20px;
  background-color: rgb(79, 177, 243);
  min-height: 330px;
  &__inner {
    position: relative;
    z-index: 3;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 15px;
    z-index: 2;
  }
  &__city {
    font-weight: 600;
  }
  &__info {
    display: flex;
    align-items: center;
  }
  &__temp {
    font-size: 48px;
    font-weight: 600;
  }
  &__desc {
    word-break: break-all;
    font-size: 14px;
    &-feels {
      color: rgba(#fff, 0.7);
    }
    &-feels span {
      color: #fff;
    }
  }
  &__wind {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 30px;
    min-height: 44px;
    border-bottom: 1px solid rgba(#fff, 0.4);
    &::before {
      position: absolute;
      content: url(@/images/wind.svg);
      width: 24px;
      height: 24px;
      top: 0;
      left: 0;
    }
  }
  &__loading{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 330px;
    background-color: rgb(42, 42, 42);
    border-radius: 15px;
    margin: 15px 0;
  }
}
</style>