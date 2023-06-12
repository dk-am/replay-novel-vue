<script setup lang="ts">
import { provide } from "vue"
import { useRoute, useRouter } from "vue-router"
import type { Log } from "@/interfaces"
import BaseHeader from "@/components/BaseHeader.vue"
import SceneMenu from "@/components/SceneMenu.vue"

const route = useRoute()
const router = useRouter()

const logData: Log[] = await import(`./../session/session-${route.params.session}.ts`)
  .then(data => data.default)
  .catch(err => router.push("/"))
provide("logData", logData)

const sessionTotal = logData.length
</script>

<template>
  <div class="BaseContainer">
    <div class="BaseHeader">
      <BaseHeader />
    </div>

    <div class="SceneMenu">
      <SceneMenu v-bind:sessionTotal="sessionTotal" />
    </div>

    <article class="SessionView">
      <RouterView v-bind:key="$route.fullPath" />
    </article>
  </div>
</template>

<style lang="scss" scoped>
.BaseContainer {
  display: grid;
  align-items: stretch;

  @media (orientation: portrait) {
    @media (max-width: 767px) {
      grid-template-rows: 10dvh 1fr;
      grid-template-areas:
        "BaseHeader"
        "SessionView";
      width: 96dvw;
      height: 100dvh;
      margin: 0 auto;
    }
    @media not (max-width: 767px) {
      grid-template-rows: 10dvh 1fr;
      grid-template-columns: 27dvw 1fr;
      grid-template-areas:
        "SceneMenu BaseHeader"
        "SceneMenu SessionView";
      width: 100dvw;
      height: 100dvh;

      .SceneMenu {
        grid-area: SceneMenu;
        container-type: inline-size;
      }
    }
  }
  @media (orientation: landscape) {
    width: 100cqw;
    height: 100dvh;

    @media (max-height: 767px) {
      grid-template-rows: 15dvh 1fr;
      grid-template-areas:
        "BaseHeader"
        "SessionView";
    }
    @media not (max-height: 767px) {
      grid-template-rows: 10dvh 1fr;
      grid-template-columns: 18dvw 1fr;
      grid-template-areas:
        "SceneMenu BaseHeader"
        "SceneMenu SessionView";

      .SceneMenu {
        grid-area: SceneMenu;
        container-type: inline-size;
      }
    }
  }
  
  .BaseHeader {
    grid-area: BaseHeader;
    container-type: size;
  }

  .SessionView {
    grid-area: SessionView;
    container-type: size;
  }
}
</style>
