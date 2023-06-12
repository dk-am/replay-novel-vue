<script setup lang="ts">
import type { Member } from "@/interfaces"

defineProps<{
  isNowLoading: boolean
  isBackToTop: boolean
  chapterIndex: number
  lineIndex: number
  memberList: Member[][]
  outputLine: (string | number | string[])[]
  textPush: (e: MouseEvent) => void
  getImageCharacter: Function
}>()

const getAnimationDelay = (index: number) => {
  return index * 50 + 'ms'
}
</script>

<template>
  <div class="SceneMessage" v-on:click="textPush">
    <template v-if="isNowLoading === true">
      <p class="SceneMessage__loading">... LOADING ...</p>
    </template>
    <template v-else>
      <template v-if="isBackToTop === false">
        <dl v-bind:key="'chapter' + chapterIndex + '-line' + lineIndex">
          <dt v-bind:class="{
              'narration': outputLine[0] === 'ナレーション',
              'gm': outputLine[1] === 1,
            }">
            <p>{{ outputLine[0] }}</p>

            <!-- ### キャラクター画像 ### -->
            <template v-for="list in memberList">
              <template v-for="item in list">
                <figure v-if="item.speaking === true">
                  <img v-bind:src="getImageCharacter(item.name_id)" alt="">
                </figure>
              </template>
            </template>
          </dt>
          <dd>
            <p>
              <span class="letter" v-for="(letter, index) in outputLine[2]"
                v-bind:style="{ animationDelay: getAnimationDelay(Number(index)) }" v-html="letter" />
            </p>
          </dd>
        </dl>
      </template>
      <template v-else-if="isBackToTop === true">
        <div class="SceneMessage__backToTop">
          <RouterLink to="/">
            <p>TOPページへ戻る</p>
          </RouterLink>
        </div>
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.SceneMessage {
  grid-area: message;
  position: relative;
  background:rgba(30, 0, 0, .6);
  border: .5rem solid #750;
  box-shadow: .25rem .25rem .2rem rgba(0, 0, 0, .5);
  align-items: flex-start;
  container-type: inline-size;
  & > dl {
    dt {
      line-height: 1;
      font-weight: bold;

      $borderWidth: .5rem;
      $paddingY: .75rem;
      $fontSize: 2rem;

      p {
        position: absolute;
        z-index: 1;
        min-width: 25cqw;
        background: url("@/assets/img/bg.jpg") no-repeat 50% 50% / cover;
        border-radius: .5rem;
        box-shadow: .25rem .25rem .2rem rgba(0, 0, 0, .5);
        text-align: center;

        @media (orientation: portrait) {
          top: calc(#{-$borderWidth} * 2 - #{$paddingY} - #{$fontSize} + #{$paddingY});
          left: calc(#{-$borderWidth} - 1dvw);
          padding: $paddingY 6cqw;
          border: $borderWidth solid #ffc922;
          font-size: $fontSize;
        }
        @media (orientation: landscape) {
          @media (max-height: 767px) {
            top: calc(#{-$borderWidth} - .5rem);
            left: calc(#{-$borderWidth} - .25rem);
            padding: .3rem 2rem;
            border: .3rem solid #ffc922;
            font-size: 1.4rem;
          }
          @media not (max-height: 767px) {
            top: calc(#{-$borderWidth} * 2 - #{$paddingY} - #{$fontSize} + #{$paddingY});
            left: calc(#{-$borderWidth} - 1cqw);
            padding: $paddingY 6cqw;
            border: $borderWidth solid #ffc922;
            font-size: $fontSize;
          }
        }
      }

      &.gm p {
        color: var(--key-color-01);
        font-weight: bold;
      }

      &.narration {
        p {
          display: none;
        }

        & + dd p {
          color: #bbb;
        }
      }

      figure {
        position: absolute;
        top: calc(-25cqw - #{$borderWidth} - #{$paddingY} / 2 - #{$fontSize} / 2);

        @media (orientation: portrait) {
          left: calc(#{-$borderWidth} - 1dvw);
        }
        @media (orientation: landscape) {
          @media (max-height: 767px) {
            display: none;
          }
          @media not (max-height: 767px) {
            left: calc(#{-$borderWidth} - 1cqw);
          }
        }

        img {
          vertical-align: top;
          width: 25cqw;
          height: 25cqw;
          border-radius: 25cqw;
          border: 1cqw solid #fff;
          box-shadow: .2rem .2rem .3rem rgba(0, 0, 0, .5);

          @media (orientation: portrait) {
            @media (max-width: 767px) {
            }
            @media not (max-width: 767px) {
            }
          }
          @media (orientation: landscape) {
            @media not (max-height: 768px) {
            }
          }
        }
      }
    }

    dd {
      height: calc(var(--message-window-size));
      padding: 2rem;
      line-height: 2.7rem;
      white-space: pre-wrap;
      overflow: hidden;

      .letter {
        position: relative;
        animation: letter 0s ease 0s backwards;

        :deep(img.dice) {
          vertical-align: -.4rem;
          width: 2rem;
          height: 2rem;
        }
      }
      @keyframes letter {
        0%   { opacity: 0; }
        100% { opacity: 1; }
      }
    }
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(var(--message-window-size));
    font-family: Arial, sans-serif;
  }

  &__backToTop {
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100cqw;
      height: calc(var(--message-window-size));
      font-weight: bold;
      font-size: 2rem;
      text-decoration: none;
    }
  }
}
</style>
