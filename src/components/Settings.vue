<template>
  <div class="settings">
    <div
      ref="dropdown"
      class="settings__inner"
    >
      <button
        ref="settingsBtn"
        class="settings__button"
        @click="toggle"
      >
        {{ dict.settings.title[lang.toLowerCase()] }}
      </button>
      <div
        class="settings__dropdown"
        :class="{ active: isOpened }"
        :style="{width: $refs.settingsBtn?.clientWidth + 'px'}"
      >
        <div class="settings__item">
          <button
            class="settings__item-btn"
            :class="{ active: lang === 'RU' }"
            @click="changeLang"
          >
            RU
          </button>
          <button
            class="settings__item-btn"
            :class="{ active: lang === 'EN' }"
            @click="changeLang"
          >
            EN
          </button>
        </div>
        <div class="settings__item">
          <button
            class="settings__item-btn"
            :class="{ active: temp === '°C' }"
            @click="changeTemp"
          >
            °C
          </button>
          <button
            class="settings__item-btn"
            :class="{ active: temp === '°F' }"
            @click="changeTemp"
          >
            °F
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import dictionary from '@/dictionary.json'

export default {
  setup(){
    const dict = dictionary

    return {dict}
  },
  data() {
    return {
      isOpened: false,
    };
  },
  computed: mapState({
    lang: state => state.lang,
    temp: state => state.temp,
    city: state => state.city,
  }),
  mounted() {
    const dropdown = this.$refs.dropdown;

    document.body.addEventListener("click", (e) => {
      const path = e.path || (e.composedPath && e.composedPath());
      
      if (!path.includes(dropdown)) {
        this.isOpened = false;
      }
    });
  },
  methods: {
    toggle() {
      this.isOpened = !this.isOpened;
    },
    changeLang(e) {
      this.$store.commit('setLang', e.target.innerText)
      if(this.city){
        this.$store.dispatch('fetchGeoCode', this.city)
      }
    },
    changeTemp(e) {
      this.$store.commit('setTemp', e.target.innerText)
      if(this.city){
        this.$store.dispatch('fetchGeoCode', this.city)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.settings {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  &__button {
    z-index: 11;
    position: relative;
    background-color: rgb(42, 42, 42);
    font-size: 16px;
    min-height: 40px;
    min-width: 135px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 15px;
    padding-left: 40px;
    border-radius: 5px;
    transition: all 0.3s;
    &:hover {
      background-color: rgba(42, 42, 42, 0.6);
    }
    &::before {
      position: absolute;
      content: url(@/images/settings.svg);
      left: 10px;
      top: 12px;
      width: 24px;
      height: 24px;
    }
  }
  &__dropdown {
    z-index: 10;
    position: absolute;
    background-color: rgb(42, 42, 42);
    top: 0;
    right: 0;
    opacity: 0;
    min-width: 135px;
    padding: 10px;
    transition: all 0.3s;
    &.active {
      top: 46px;
      opacity: 1;
    }
  }
  &__item {
    &:not(:nth-child(1)){
      margin-top: 10px;
    }
    position: relative;
    &-btn {
      width: 50%;
      min-height: 40px;
      border: none;
      padding: 5px;
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s;
      &.active {
        background-color: #1890ff;
        color: #fff;
        &:hover {
          background-color: #1890ff;
        }
      }
      &:hover {
        background-color: #fff;
      }
      &:nth-child(1) {
        border-radius: 5px 0 0 5px;
      }
      &:nth-child(2) {
        border-radius: 0 5px 5px 0;
      }
    }
  }
}
</style>
