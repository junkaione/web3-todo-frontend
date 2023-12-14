import { defineStore } from "pinia";
import { ethers } from "ethers";
import { showDialog } from "vant";
import { abi } from "@/abi/TodoList.json";

declare var window: any;

const { TODO_CONTRACT_ADDRESS } = import.meta.env;

export default defineStore("ethers", {
  state() {
    return {
      ethers: null as any,
      contract: null as any,
      account: null as any,
      balance: null as any,
    };
  },
  actions: {
    async connectWallet() {
      if (!window.ethereum) {
        showDialog({
          title: "提示",
          message: "请安装MetaMask",
        });
        return;
      }

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          TODO_CONTRACT_ADDRESS,
          abi,
          signer
        );
        const balance = await provider.getBalance(signer.getAddress());

        this.ethers = ethers;
        this.contract = contract;
        this.account = accounts[0];
        this.balance = ethers.utils.formatEther(balance);
      } catch (error) {
        console.log("error", error);
        showDialog({
          title: "提示",
          message: "连接钱包失败",
        });
      }
    },
  },
});
