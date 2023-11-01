<template>
  <div class="header">
    <van-button color="#fff">连接钱包</van-button>
    <p>余额: 123ETH</p>
    <p>3 Task</p>
  </div>
</template>

<style lang="less" scoped>
.header {
  width: 100vw;
  height: 50vh;
  background: #3599f9;
  position: fixed;
  top: 0;
  padding: 60px;
  color: #fff;

  ::v-deep(.van-button__text) {
    color: #3599f9;
  }
}
</style>
