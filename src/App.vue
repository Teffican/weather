<template>
  <div class="container">
    <Settings />
    <Search />
    <Weather />
    <Forecast />
  </div>
</template>

<script>
import Weather from './components/Weather.vue'
import Forecast from './components/Forecast.vue'
import Search from './components/Search.vue'
import Settings from './components/Settings.vue'

export default {
  name: 'App',
  components: {
    Weather,
    Forecast,
    Search,
    Settings
  }
}
</script>

<style lang="scss">
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 16px;
    background-color: rgb(20, 20, 20);
    color: #fff;
    padding-top: 100px;
  }
  
  .container{
    max-width: 1210px;
    width: 100%;
    padding: 0 15px;
    margin: 0 auto;
  }

  .splide{
    &__arrow{
        width: 40px;
        height: 40px;
        background: #fff;
        transition: all .3s;
        &--prev{
            left: 0;
        }
        &--next{
            right: 0;
        }
    }
    }
</style>
