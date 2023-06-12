<script setup lang="ts">
import { ref, computed, inject, watch } from 'vue'
import type { ComputedRef } from 'vue'
import type { Log } from '@/interfaces'

const props = defineProps<{
  sceneIndex: number
  chapterIndex: number
  lineIndex: number
}>()

const logData = inject<Log[]>("logData")!
const isDisplayLog = ref(false)
const logContainerRef = ref()
const logContentRef = ref()

const onOpenLog = (): void => {
  isDisplayLog.value = true
}
const onCloseLog = (): void => {
  isDisplayLog.value = false
}
watch(logContentRef, () => {
  if (logContainerRef != undefined) {
    logContainerRef.value.scroll(0, logContentRef.value.offsetHeight)
  }
})

const outputLog: ComputedRef<Log[]> = computed(() => {
  const clonedLogData: Log[] = structuredClone(logData)

  // 現在のシーン
  const tmp = clonedLogData.filter((_, i) => i <= props.sceneIndex - 1)

  // 現在の章
  tmp[props.sceneIndex - 1].lines = tmp[props.sceneIndex - 1].lines.filter((_, i) => i <= props.chapterIndex)

  // 現在の行
  tmp[props.sceneIndex - 1].lines[props.chapterIndex] = tmp[props.sceneIndex - 1].lines[props.chapterIndex].filter((_, i) => i <= props.lineIndex)

  return tmp
})
</script>

<template>
  <div class="SceneLog__buttonOpen" v-on:click="onOpenLog">LOG</div>

  <template v-if="isDisplayLog === true">
    <div class="SceneLog">
      <div class="SceneLog__buttonClose">
        <p v-on:click="onCloseLog">閉じる</p>
      </div>
      <div class="SceneLog__body" ref="logContainerRef">
        <div class="SceneLog__mainText" ref="logContentRef">
          <template v-for="scene in outputLog">
            <dl v-for="chapter in scene.lines">
              <div v-for="line in chapter">
                <dt v-bind:class='{ "narration": line[0] === "ナレーション" }'>{{ line[0] }}：</dt>
                <dd v-html="line[2]"></dd>
              </div>
            </dl>
          </template>
        </div>
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.SceneLog {
  position: fixed;
  top: 0;
  z-index: 9999;
  height: 100cqh;
  background: rgba(0, 0, 0, .9);
  box-shadow: .5rem .5rem .3rem rgba(0, 0, 0, .5);
  font-size: 1.4rem;
  overflow: hidden;

  @media (orientation: portrait) {
    @media (max-width: 767px) {
      left: -2dvw;
      width: calc(100cqw + 4dvw);
    }
    @media not (max-width: 767px) {
      left: 0;
      width: 100cqw;
    }
  }
  @media (orientation: landscape) {
    left: 0;
    width: 100cqw;
  }

  &__buttonOpen {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 1.8em;
    padding: 0 .3em;
    background: rgba(0, 0, 0, .3);
    border: 1px solid var(--text-color);
    line-height: 1;
    font-family: Arial, sans-serif;
    cursor: pointer;

    @media (orientation: portrait) {
      @media (max-width: 767px) {
        top: calc(1rem + .5rem);
        right: calc(1rem + .5rem);
        font-size: 1.2rem;
      }
      @media not (max-width: 767px) {
        top: calc(-10dvh + 1dvw);
        right: 1dvw;
      }
    }
    @media (orientation: landscape) {
      @media (max-height: 767px) {
        top: calc(-15dvh + 1dvw);
        right: 1dvw;
        font-size: 1.4rem;
      }
      @media not (max-height: 767px) {
        top: calc(-10dvh + 1dvw);
        right: 1dvw;
        font-size: 2rem;
      }
    }
  }

  &__buttonClose {
    padding: 2rem;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.5em;
      border: 2px solid var(--text-color);
      line-height: 1;
      font-weight: bold;
      cursor: pointer;
    }
  }

  &__body {
    padding: 0 2rem;
    height: calc(100cqh - 2.5em - 2rem * 2 - 2rem);
    overflow-y: auto;

    dl {
      & + dl {
        margin-top: 1.2cqh;
        padding-top: 1.2cqh;
        border-top: 1px solid rgba(255, 255, 255, .3);
      }

      &:not(:last-child)::after {
        content: "◆　◆　◆";
        display: block;
        color: #999;
        text-align: center;
      }

      & > div {
        margin-bottom: 1.2cqh;
        padding-bottom: 1.2cqh;
        border-bottom: 1px solid rgba(255, 255, 255, .3);
        line-height: 1.5;

        dt {
          display: inline;
          
          &.narration {
            display: none;
          }
          &.narration + dd {
            color: #bbb;
          }
        }
        dd {
          display: inline;
        }
      }
    }
  }
}
</style>
