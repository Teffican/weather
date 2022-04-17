import { createStore } from "vuex";
import useMessage from '@/hooks/useMessage.js'
import dictionary from '@/dictionary.json'

const API_KEY = process.env.VUE_APP_API_KEY;
const URL = "http://api.openweathermap.org";
const message = useMessage()
const dict = dictionary

export default createStore({
  state: {
    lang: "RU",
    temp: "°C",
    city: "",
    isLoading: false,
    coordinates: {
      lat: 0,
      lon: 0,
    },
    currentWeather: {
      temp: 0,
      tempFeels: 0,
      icon: '',
      description: '',
      wind: 0,
      main: ''
    },
    hourlyWeather: [],
    dailyWeather: []
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setCity(state, cityNames) {
      state.city = state.lang === "RU" ? cityNames.ru : cityNames.en;
    },
    setCoordinates(state, coordinates) {
      state.coordinates = coordinates;
    },
    setCurrentWeather(state, weather){
      state.currentWeather = weather
    },
    setHourlyWeather(state, payload){
      state.hourlyWeather = payload
    },
    setDailyWeather(state, payload){
      state.dailyWeather = payload
    },
    setLang(state, lang){
      state.lang = lang
    },
    setTemp(state, temp){
      state.temp = temp
    },
  },
  actions: {
    fetchGeoCode(context, search) {
      context.commit("setIsLoading", true);
      fetch(`${URL}/geo/1.0/direct?q=${search}&appid=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          if(!data.length){
            const lang = context.state.lang.toLocaleLowerCase()
            message('error', dict.message.cityError[lang])
            return;
          }

          context.commit("setCity", data[0].local_names);

          context.commit("setCoordinates", {
            lat: data[0].lat,
            lon: data[0].lon,
          });

          context.dispatch("fetchWeather");
        })
        .finally(() => context.commit("setIsLoading", false));
    },
    fetchWeather(context) {
      context.commit("setIsLoading", true);

      const lat = context.state.coordinates.lat;
      const lon = context.state.coordinates.lon;
      const units = context.state.temp === "°C" ? "metric" : "imperial";

      fetch(
        `${URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=${units}&lang=${context.state.lang}&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          const currentWeather = {
            temp: Math.floor(data.current.temp),
            tempFeels: Math.floor(data.current.feels_like),
            main: data.current.weather[0].main.toLowerCase(),
            description: data.current.weather[0].description,
            icon: data.current.weather[0].icon,
            wind: data.current.wind_speed
          }

          context.commit('setCurrentWeather', currentWeather)
          context.commit('setHourlyWeather', data.hourly.slice(0, 24))
          context.commit('setDailyWeather', data.daily.slice(1))
        })
        .finally(() => context.commit("setIsLoading", false));
    },
  },
});
