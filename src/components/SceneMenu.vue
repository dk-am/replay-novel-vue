<script setup lang="ts">
import { ref } from "vue"

defineProps<{
  sessionTotal: number
}>()

const isMenuOpened = ref(false)
const onMenuOpen = () => { isMenuOpened.value = true; }
const onMenuClose = () => { isMenuOpened.value = false; }
</script>

<template>
  <p class="SceneMenu__buttonOpen" v-on:click="onMenuOpen()"><img src="@/assets/img/menu-open.svg" alt="メニューを開く"></p>

  <nav class="SceneMenu__body" v-bind:class="{ 'isOpen': isMenuOpened === true }">
    <p class="SceneMenu__buttonClose" v-on:click="onMenuClose()">閉じる</p>
    <ul class="SceneMenu__list">
      <li>
        <RouterLink to="/">TOP</RouterLink>
      </li>
      <li v-for="(_, index) in sessionTotal">
        <RouterLink v-bind:to="{ name: 'Scene', params: { scene: index + 1 } }" v-on:click="onMenuClose()">
          シーン{{ index + 1 }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.SceneMenu {
  &__buttonOpen {
    position: fixed;
    z-index: 999;
    background: var(--key-color-01);
    border-radius: .8dvh;
    cursor: pointer;

    @media (orientation: portrait) {
      @media (max-width: 767px) {
        top: 1dvh;
        left: 1dvh;
        width: 8dvh;
        height: 8dvh;
        padding: 1.8dvh;
      }
      @media not (max-width: 767px) {
        display: none;
      }
    }
    @media (orientation: landscape) {
      @media (max-height: 767px) {
        top: 1dvw;
        left: 1dvw;
        width: calc(15dvh - 2dvw);
        height: calc(15dvh - 2dvw);
        padding: 1.2dvw;
      }
      @media not (max-height: 767px) {
        display: none;
      }
    }

    img {
      vertical-align: top;
    }
  }

  &__body {
    position: fixed;
    top: 0;
    z-index: 9999;
    height: 100dvh;
    padding: 3dvh 3rem;
    background: var(--key-color-01);
    overflow: auto;
    transition: left 300ms ease-in;

    @media (orientation: portrait) {
      @media (max-width: 767px) {
        left: -75dvw;
        width: 75dvw;
      }
      @media not (max-width: 767px) {
        left: 0;
        width: 100cqw;
      }
    }
    @media (orientation: landscape) {
      @media (max-height: 767px) {
        left: -30rem;
        width: 30rem;
      }
      @media not (max-height: 767px) {
        left: 0;
        width: 100cqw;
      }
    }

    &.isOpen {
      left: 0;
    }
  }

  &__buttonClose {
    margin: 0 0 1rem;
    padding: .8rem 0 1rem;
    border: 2px solid currentColor;
    line-height: 1;
    color: var(--key-color-02);
    font-weight: bold;
    font-size: 1.8rem;
    text-align: center;
    cursor: pointer;

    @media (orientation: portrait) {
      @media not (max-width: 767px) {
        display: none;
      }
    }
    @media (orientation: landscape) {
      @media not (max-height: 767px) {
        display: none;
      }
    }
  }

  &__list {
    & > li {
      list-style: none;
      padding: .6dvh 0;
      border-bottom: 1px solid currentColor;
      color: var(--key-color-02);
      text-align: center;

      a {
        color: currentColor;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
}
</style>