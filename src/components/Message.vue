<template>
  <div class="message" />
</template>

<script>
export default {
}
</script>

<style lang="scss">
    $variants: 'success' #28a745,
        'error' #dc3545,
        'info' #007bff;

    .message{
        font-size: 18px;
        position: fixed;
        min-height: 70px;
        padding: 20px 10px 20px 74px;
        width: 270px;
        right: -270px;
        bottom: 30px;
        background-color: rgb(42, 42, 42);
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
        display: flex;
        align-items: center;
        transition: all .3s;
        &_active{
            right: 30px;
        }
        &::before{
            position: absolute;
            left: 8px;
            top: 0;
            width: 45px;
            height: 100%;
            display: flex;
            align-items: center;
        }
        @each $variant, $color in $variants{
            &_#{$variant}{
                border-left: 4px solid $color;
                &::before{
                    content: url('@/images/#{$variant}.svg')
                }
            }
        }
    }
</style>