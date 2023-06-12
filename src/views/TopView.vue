<script setup lang="ts">
import BaseHeader from "@/components/BaseHeader.vue"

// 公開リプレイ数
const totalNumber: number = 1
</script>

<template>
  <div class="TopView">
    <div class="BaseHeader">
      <BaseHeader />
    </div>
    <p>チャットログをベースに加工した配列を、ノベルゲーム風の表示にするサイトのテンプレートです。クリック（もしくはタップ）で読み進めていく形式になります。</p>
    <nav>
      <h2>- INDEX -</h2>
      <ul>
        <li v-for="page in totalNumber">
          <a v-bind:href="'/replay-novel-vue/session' + page + '/1'">SESSION {{ page }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.TopView {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 3rem;

  p {
    margin-bottom: 4rem;
  }

  nav {
    h2 {
      margin-bottom: 2rem;
      font-family: 'Times New Roman', Times, serif;
      font-size: 3rem;
      text-align: center;
    }

    ul {
      text-align: center;

      li {
        list-style: none;
        color: var(--key-color-01);
        font-family: 'Times New Roman', Times, serif;
        font-weight: bold;
        font-size: 2rem;

        a:hover {
          text-decoration: none;
        }
      }
    }
  }
}

.BaseHeader {
  height: 18rem;
  container-type: size;

  @media (orientation: portrait) {
    @media (max-width: 767px) {
      height: 12rem;
    }
  }
  @media (orientation: landscape) {
    @media (max-height: 767px) {
      height: 14rem;
    }
    @media not (max-height: 767px) {
    }
  }

  :deep(header) {
    padding-left: 0;

    h1 {
      font-size: 3rem;

      @media (orientation: portrait) {
        @media (max-width: 767px) {
          font-size: 2rem;
        }
      }
    }
  }
}
</style>