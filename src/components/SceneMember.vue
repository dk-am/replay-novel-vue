<script setup lang="ts">
import type { Member } from "@/interfaces"

defineProps<{
  memberList: Member[][]
  getImageCharacter: Function
  outputLine: (string | number | string[])[]
}>()

const updateMemberState = (memberList: Member[][], currentLine: (string | number | string[])[]) => {
  // メンバー欄の表示をリセット
  for (let list of memberList) {
    for (let item of list) {
      item.damage = false
      item.speaking = false
    }
  }
  // メンバー欄の表示処理
  for (let list of memberList) {
    for (let item of list) {
      // 発言者のキャラクター枠を光らせる
      if (currentLine[2] != undefined && currentLine[0] === item.name) {
        item.speaking = true
      }
      // HP減少処理
      if (currentLine[3] != undefined && currentLine[0] === item.name) {
        item.c_hp = item.c_hp + Number(currentLine[3])
        if (Number(currentLine[3]) < 0) {
          item.damage = true
        } else {
          item.heal = true
        }
      }
      // MP減少処理
      if (currentLine[4] != undefined && currentLine[0] === item.name) {
        item.c_mp = item.c_mp + Number(currentLine[4])
        item.damage = true
      }
    }
  }
}

defineExpose({
  updateMemberState
});
</script>

<template>
  <div class="SceneMember" v-bind:class="{ 'scroll': memberList.length >= 2 }">
    <div class="SceneMember__block">
      <ul class="SceneMember__list" v-for="list in memberList">
        <li
          class="SceneMember__item"
          v-for="item in list"
          v-bind:class="{
            'damage': item.damage === true,
            'heal' : item.heal === true,
            'speaking': item.speaking === true,
          }">
          <div class="SceneMember__itemInner">
            <figure class="SceneMember__pict">
              <img v-bind:src="getImageCharacter(item.name_id)" alt="">
            </figure>

            <div class="SceneMember__data">
              <h3>{{ item.name }}</h3>
              <dl>
                <div class="hp">
                  <dt>HP</dt>
                  <dd>
                    <span v-bind:style="{ width: (item.c_hp / item.hp * 100) + '%' }" />
                  </dd>
                </div>
                <div class="mp">
                  <dt>MP</dt>
                  <dd>
                    <span v-bind:style="{ width: (item.c_mp / item.mp * 100) + '%' }" />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.SceneMember {
  grid-area: member;
  container-type: size;

  @media (orientation: landscape) {
    @media not (max-height: 767px) {
      width: 26cqw;
      height: calc(90dvh - 2cqw);
    }
  }

  &.scroll {
    overflow: scroll;

    @media (orientation: portrait) {
      padding-bottom: 10px;
    }
    @media (orientation: landscape) {
      @media (max-height: 767px) {
        padding-bottom: 10px;
      }
      @media not (max-height: 767px) {
        width: 40cqw;
        overflow: hidden;
      }
    }

    .SceneMember__block {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: .5rem;
      width: 180%;

      @media (orientation: landscape) {
        @media not (max-height: 767px) {
          grid-gap: 1rem;
          width: 100%;
        }
      }
    }

    .SceneMember__pict {
      img {
        width: 75cqh;
      }
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: .5rem;
    height: 100cqh;

    @media (orientation: landscape) {
      @media not (max-height: 767px) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(8, 1fr);
        grid-gap: 1rem;
      }
    }
  }

  &__item {
    display: grid;
    padding: 1.5cqh;
    background: hsl(0, 30%, 23%);
    border: .3rem solid hsl(0, 30%, 48%);
    border-right-color: hsl(0, 30%, 33%);
    border-bottom-color: hsl(0, 30%, 28%);
    border-radius: .5rem;
    box-shadow: .25rem .25rem .2rem rgba(0, 0, 0, .5);
    transition: border-color 300ms, background-color 300ms;

    &.damage {
      animation: damage-animation-1 none 100ms 3;

      .hp dd,
      .mp dd {
        animation: damage-animation-2 none 300ms 1 ease-in;
      }
    }

    &.heal {
      .hp dd,
      .mp dd {
        animation: damage-animation-2 none 300ms 1 ease-in;
      }
    }

    @keyframes damage-animation-1 {
      0%   { transform: translate(0, 0); }
      25%  { transform: translate(0, 2px); }
      50%  { transform: translate(0, 0); }
      75%  { transform: translate(0, -2px); }
      100% { transform: translate(0, 0); }
    }
    @keyframes damage-animation-2 {
      0% { background: #fff; }
    }

    &.speaking {
      background: #983;
      border-color: #ffe922;
      border-style: solid;
    }
  }

  &__itemInner {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
    grid-gap: .5rem;
    container-type: size;
  }

  &__pict {
    img {
      vertical-align: top;
      width: 100cqh;
      height: 100cqh;
      border: 2px solid hsl(0, 30%, 18%);
      border-radius: 10cqh;
      object-fit: cover;
    }
  }

  &__data {
    display: grid;
    grid-template-rows: auto 1fr;

    h3 {
      width: 100%;
      height: 36cqh;
      padding-top: 4cqh;
      line-height: 1;
      font-weight: bold;
      font-size: 24cqh;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    dl {
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      grid-gap: 4cqh;
      container-type: size;

      & > div {
        display: flex;
        align-items: stretch;
        height: 48cqh;

        dt {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          margin-right: .3rem;
          line-height: 1;
          font-family: "Courier New";
          font-size: 40cqh;
        }

        dd {
          flex: 1 0 auto;
          position: relative;
          background: #f33;
          border: 2px solid hsl(0, 30%, 18%);
          border-radius: .5rem;
          overflow: hidden;

          span {
            display: block;
            position: absolute;
            margin: 0;
            top: 0;
            left: 0;
            bottom: 0;
            transition: width 300ms;
          }
        }

        &.hp dd > span {
          background: #3a3;
        }
        &.mp dd > span {
          background: #38e;
        }
      }
    }

    @container (max-height: 30px) {
      grid-template-rows: 1fr;

      h3 {
        display: none;
      }
    }
  }
}
</style>
