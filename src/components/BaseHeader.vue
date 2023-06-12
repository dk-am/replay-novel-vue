<template>
  <header>
    <h1>TRPGオンラインセッションログを<br>ノベルゲーム風に表示する</h1>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100cqh;
  text-align: center;

  & > h1 {
    color: var(--text-color);
    line-height: 1.3333;
    font-size: 1.8rem;
    font-family: serif;
  }
  
  @media (orientation: portrait) {
    @media (max-width: 767px) {
      padding-left: 9dvh;
    }
    @media not (max-width: 767px) {
    }
  }
  @media (orientation: landscape) {
    @media (max-height: 767px) {
    }
    @media not (max-height: 767px) {
    }
  }
}
</style>