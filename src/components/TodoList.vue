<template>
  <div class="todolist">
    <van-swipe-cell>
      <div class="todo">
        <h4>Task Name</h4>
        <p>Task Description</p>
      </div>
      <template #right>
        <van-button square text="完成" type="primary" @click="completeTask" />
        <van-button square text="删除" type="danger" @click="deleteTask" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script lang="ts" setup>
import { showConfirmDialog } from "vant";

const completeTask = async () => {
  await showConfirmDialog({
    title: "完成",
    message: "是否确认完成?",
  });
};

const deleteTask = async () => {
  await showConfirmDialog({
    title: "删除",
    message: "是否确认删除?",
  });
};
</script>

<style lang="less" scoped>
.todolist {
  width: 100vw;
  height: 70vh;
  background: #fff;
  border-radius: 30px;
  position: fixed;
  bottom: 0;
  padding: 0 50px;
  box-sizing: border-box;

  .todo {
    margin-top: 20px;
    h4,
    p {
      padding: 0;
      margin: 0;
      color: #333;
    }

    p {
      color: #666;
      font-size: 12px;
      margin-top: 5px;
    }
  }
}
</style>
