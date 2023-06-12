<script setup lang="ts">
defineProps<{
  isNowLoading: boolean
  imageScene: string
  textPush: (e: MouseEvent) => void
}>()
</script>

<template>
  <div class="SceneScreen" v-on:click="textPush">
    <div class="SceneScreen__body" v-bind:style="{ backgroundImage: 'url(' + imageScene  + ')' }">

      <template v-if="isNowLoading === true">
        <p class="SceneScreen__loading"></p>
      </template>
      <template v-else>
        <div class="SceneScreen__nextLine"><span></span></div>
      </template>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.SceneScreen {
  grid-area: screen;
  container-type: inline-size;

  &__body {
    position: relative;
    width: 100cqw;
    height: calc(100cqw * 3 / 4);
    border: 1rem solid;
    border-image: linear-gradient(170deg, var(--key-color-01), #fec, var(--key-color-01), #d80) 1 / 1rem;
    background: none no-repeat 50% 50% / cover;
    box-shadow:
      .25rem .25rem .3rem rgba(0, 0, 0, .5),
      .5rem .5rem .6rem rgba(0, 0, 0, .4) inset;
  }

  &__nextLine {
    position: absolute;
    right: .5rem;
    bottom: .5rem;
    z-index: 99;
    width: 5rem;
    height: 5rem;
    border-radius: 1rem;
    background: var(--key-color-01);
    cursor: pointer;
    box-shadow: .25rem .25rem .2rem rgba(0, 0, 0, .5);

    span {
      display: block;
      position: absolute;
      top: 1.25rem;
      left: 1.6rem;
      width: 0;
      height: 0;
      border-width: 1.25rem 2rem;
      border-style: solid;
      border-color: transparent;
      border-left-color: #f93;
    }
  }

  &__loading {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 8rem;
    height: 8rem;
    margin: auto;
    border: 1rem solid;
    border-color: #fff rgba(255, 255, 255, .5) rgba(255, 255, 255, .5);
    border-radius: 50%;
    animation: spin 1s infinite ease-out;

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  }
}
</style>
