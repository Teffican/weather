<template>
  <div class="search">
    <input 
      v-model="search" 
      class="search__input" 
      type="text" 
      placeholder="Укажите город" 
      @keydown.enter="fetchGeoCode" 
    >
    <button
      class="search__button"
      :disabled="isLoading"
      @click="fetchGeoCode"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: 'moscow'
    }
  },
  methods: {
    fetchGeoCode(){
      if(!this.isLoading){
        this.$store.dispatch('fetchGeoCode', this.search)
      }
    }
  },
  computed: {
    isLoading(){
      return this.$store.state.isLoading
    }
  }
};
</script>

<style lang="scss">
.search {
  position: relative;
  margin-top: 50px;
  &__button {
    position: absolute;
    cursor: pointer;
    transition: all 0.3s;
    max-width: 100px;
    width: 100%;
    height: 48px;
    bottom: 0;
    right: 0;
  }
  &__input {
    border-radius: 5px;
    min-height: 40px;
    font-size: 24px;
    outline: none;
    width: 100%;
    padding: 10px 110px 10px 20px;
    background-color: rgb(42, 42, 42);
    border: none;
    color: #fff;
  }
}
</style>