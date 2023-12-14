<template>
  <div class="header">
    <van-button color="#fff" @click="connectWallet" v-if="!ethers.account">
      连接钱包
    </van-button>
    <p class="address" v-else>{{ formatAddress(ethers.account) }}</p>
    <p class="balance">余额: {{ ethers.balance }}ETH</p>
    <p>{{ userTasksTotal }} Task</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import useEthers from "@/store/ethers";

const ethers = useEthers();
const userTasksTotal = ref(0);

const getUserTasks = async () => {
  const res = await ethers.contract.getTask();
  userTasksTotal.value = res.length;
};

const formatAddress = (address: any) => {
  return `${address.slice(0, 12)}.....${address.slice(-12)}`;
};

const connectWallet = async () => {
  await ethers.connectWallet();
  localStorage.setItem("isConnectWallet", "true");
  await getUserTasks();
};

onMounted(() => {
  if (localStorage.getItem("isConnectWallet")) {
    connectWallet();
  }
});
</script>

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

  .address {
    font-size: 20px;
  }
  .balance {
    font-size: 18px;
  }
}
</style>
