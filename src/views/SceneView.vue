<script setup lang="ts">
import { ref, computed, inject, watch, onUnmounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import type { ComputedRef } from "vue"
import type { Log, Member } from "@/interfaces"
import SceneScreen from "@/components/SceneScreen.vue"
import SceneMessage from "@/components/SceneMessage.vue" 
import SceneMember from "@/components/SceneMember.vue"
import SceneLog from "@/components/SceneLog.vue"

const route = useRoute()
const router = useRouter()
const logData = inject<Log[]>("logData")!

const sessionIndex = ref(Number(route.params.session))
const sceneIndex = ref(Number(route.params.scene))
const chapterIndex = ref(0)
const lineIndex = ref(0)
const isBackToTop = ref(false)

const memberViewRef = ref<InstanceType<typeof SceneMember>>()

// NOW LOADING 処理
let isNowLoading = ref(true)
onUnmounted(() => { isNowLoading.value = true })
const onLoading = (e: Event): void => { isNowLoading.value = false }

// 現ページに必要なデータを抽出
const currentLogData: Log = logData[sceneIndex.value - 1]
let sceneLength = logData.length
let chapterLength = currentLogData.lines.length - 1
let linesLength = currentLogData.lines[chapterIndex.value].length - 1
let memberList: Member[][] = [currentLogData.member]

// メンバーが9人以上のとき、8人ごとに分割する
if ( memberList[0].length >= 9 ) {
  let tmp = []
  for ( let i = 0; i < Math.ceil(memberList[0].length / 8); i++ ) {
    let j = i * 8
    let k = memberList[0].slice(j, j + 8)
    tmp.push(k)
  }
  memberList = tmp
}

// ☆次行の表示処理（変数処理のみ）
const textPush = (e: MouseEvent): void => {
  linesLength = currentLogData.lines[chapterIndex.value].length - 1 // 現在滞在中の章の行数を再取得

  // 次の章へ移動
  if (linesLength === lineIndex.value && chapterLength > chapterIndex.value) {
    chapterIndex.value += 1
    lineIndex.value = -1
  }
  // 次シーンへ移動
  if (linesLength === lineIndex.value && chapterLength === chapterIndex.value) {
    if (sceneLength > sceneIndex.value) {
      //nextFlag.value = true
      router.push("/session" + sessionIndex.value + "/" + Number(sceneIndex.value + 1))
    } else {
      isBackToTop.value = true
    }
  }
  // 次の行へ移動
  if (linesLength > lineIndex.value && chapterLength >= chapterIndex.value) {
    lineIndex.value += 1
  }
  //console.log('chapterLength:' + (chapterLength) + ', chapterIndex:' + chapterIndex.value + ', linesLength:' + (linesLength) + ', lineIndex:' + lineIndex.value);
}

// 表示に用いるリアクティブ変数
const outputLine: ComputedRef<(string | number | string[])[]> = computed(() => {
  // これから表示処理をおこなう行データをディープコピー
  const currentLine = structuredClone(currentLogData.lines[chapterIndex.value][lineIndex.value])

  // メンバー欄の表示処理
  memberViewRef.value?.updateMemberState(memberList, currentLine)

  // 行データ内の本文を一文字ずつ配列に変換し、一時変数に保存
  // 一時変数内の「@」をダイス画像に変換する
  let tmpArray = Array.from(String(currentLine[2]));
  for (let i = 0; i < tmpArray.length; i++) {
    if (tmpArray[i] === "@") {
      tmpArray.splice(i, 1, "<img class='dice' src='/replay-novel-vue/img/dice" + tmpArray[(i + 1)] + ".gif?" + new Date().getTime() + "' alt=''>")
      tmpArray.splice((i + 1), 1)
    }
  }
  currentLine[2] = tmpArray // 一時変数の内容を元の場所に戻す

  return currentLine
})

const getImageScene = (fileName: string): string => {
  return new URL(`../assets/img/scene/${fileName}`, import.meta.url).href
}
const getImageCharacter = (fileName: string): string => {
  return new URL(`../assets/img/character/${fileName}.jpg`, import.meta.url).href
}
</script>

<template>
  <h2>SESSION {{ route.params.session }}</h2>

  <img v-if="isNowLoading === true" style="display: none;" v-bind:src="getImageScene(currentLogData.scene)" v-on:load="onLoading">

  <div class="SceneBody">
    <SceneScreen v-bind="{ isNowLoading, imageScene: getImageScene(currentLogData.scene), textPush }" />
    <SceneMessage v-bind="{ isNowLoading, isBackToTop, chapterIndex, lineIndex, outputLine, memberList, textPush, getImageCharacter }" />
    <SceneMember ref="memberViewRef" v-bind="{ memberList, outputLine, getImageCharacter }" />
  </div>

  <SceneLog v-bind="{ sceneIndex, chapterIndex, lineIndex }" />

  <div class="SceneBody__preload">
    <img v-for="index in 6" v-bind:src="'/replay-novel-vue/img/dice' + index + '.gif?' + new Date().getTime()" alt="">
  </div>
</template>

<style lang="scss" scoped>
h2 {
  position: absolute;
  z-index: 1;
  color: var(--text-color);
  line-height: 1rem;
  font-family: "Times New Roman", sans-serif;
  font-size: 1rem;

  @media (orientation: portrait) {
    @media (max-width: 767px) {
      top: 1.5rem;
      left: 1.5rem;
    }
    @media not (max-width: 767px) {
      top: 1.8rem;
      left: calc(3cqw + 1.8rem);
    }
  }
  @media (orientation: landscape) {
    @media (max-height: 767px) {
      top: 1.5rem;
      left: calc(1.5rem + 2dvw);
    }
    @media not (max-height: 767px) {
      top: 2rem;
      left: calc(2rem + 2cqw);
      font-size: 2rem;
    }
  }
}

.SceneBody {
  display: grid;
  height: calc(100cqh - 2dvh);
  container-type: inline-size;

  @media (orientation: portrait) {
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
      "screen"
      "message"
      "member";
    align-items: stretch;
    grid-gap: .5rem;

    @media not (max-width: 767px) {
      padding: 0 3cqw;
    }
  }
  @media (orientation: landscape) {
    @media (max-height: 767px) {
      grid-template-columns: calc((85dvh - 2dvh) * 4 / 3) 1fr;
      grid-template-rows: 1fr calc(var(--message-window-size) + .5rem * 2);
      grid-template-areas:
        "screen member"
        "screen message";
      grid-gap: 1rem;
      width: 96cqw;
      height: calc(85dvh - 2dvh);
      margin: 0 auto;
    }
    @media not (max-height: 767px) {
      $gridGap: 1rem;
      $bodyHeight: 90dvh;
      $marginBottom: 2dvh;

      grid-template-columns: 1fr auto;
      grid-template-rows: min-content 1fr;
      grid-template-areas:
        "screen member"
        "message member";
      grid-gap: $gridGap;
      align-items: flex-start;
      width: 96cqw;
      height: calc($bodyHeight - $marginBottom);
      margin: 0 auto;
    }
  }

  &__preload {
    display: none;
  }
}
</style>
