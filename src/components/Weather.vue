<template>
  <div class="weather weather__clouds">
    <div class="weather__inner">
      <div class="weather__city">
        Россия, Челябинск
      </div>

      <div class="weather__info">
        <div class="weather__temp">
          +4°
        </div>
        <img 
          class="weather__icon" 
          src="https://openweathermap.org/img/wn/03d@2x.png" 
          alt="Clouds"
        >
        <div class="weather__desc">
          <div class="weather__desc-title">
            Облачно с прояснениями
          </div>
          <div class="weather__desc-feels">
            Ощущается как <span>-2°</span>
          </div>
        </div>
      </div>

      <div class="weather__wind">
        5.4 м/с
      </div>

      <WeatherSlider />
    </div>
    </div>
</template>

<script>
import WeatherSlider from "@/components/WeatherSlider.vue"

export default {
    components: {
        WeatherSlider
    }
}
</script>

<style lang="scss">
  $smokeStyles: 'mist', 'smoke', 'haze', 'dust', 'fog', 'sand', 'ash', 'squall', 'tornado'; 
  $weatherStyles: 'thundershtorm', 'drizzle', 'rain', 'snow', 'smoke', 'clouds', 'clear';
  
  @each $smoke in $smokeStyles{
    .weather__#{$smoke}{
      background-image: url('@/images/smoke.jpg');
    }
  }  
  @each $weather in $weatherStyles{
    .weather__#{$weather}{
      @if $weather == 'drizzle'{
        background-image: url('@/images/rain.jpg');
      }@else{
        background-image: url('@/images/#{$weather}.jpg');
      }
    }
  }   

    .weather{
    margin: 15px 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    color: #fff;
    border-radius: 15px;
    padding: 20px;
    background-color: rgb(79, 177, 243);
    &__inner{
      position: relative;
      z-index: 3;
    }
    &::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,.4);
      border-radius: 15px;
      z-index: 2;
    }
    &__city{
      font-weight: 600;
    }
    &__info{
      display: flex;
      align-items: center;
    }
    &__temp{
      font-size: 48px;
      font-weight: 600;
    }
    &__desc{
      word-break: break-all;
      font-size: 14px;
      &-feels{
        color: rgba(#fff, .7)
      }
      &-feels span{
        color: #fff;
      }
    }
    &__wind{
      padding-bottom: 20px;
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 30px;
      min-height: 44px;
      border-bottom: 1px solid rgba(#fff, .4);
      &::before{
        position: absolute;
        content: url(@/images/wind.svg);
        width: 24px;
        height: 24px;
        top: 0;
        left: 0;
      }
    }
  }
</style>