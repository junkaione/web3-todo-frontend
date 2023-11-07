<template>
  <div class="todolist">
    <van-swipe-cell v-for="todo in userTasks.data" :key="todo.id">
      <div :class="{ todo: true, completed: todo.isCompleted }">
        <div>
          <h4>{{ todo.name }}</h4>
          <p>{{ todo.description }}</p>
        </div>
        <span>{{ formatDate(todo.date) }}</span>
      </div>
      <template #right>
        <van-button
          v-if="!todo.isCompleted"
          square
          text="完成"
          type="primary"
          @click="completeTask(todo.id)"
        />
        <van-button
          square
          text="删除"
          type="danger"
          @click="deleteTask(todo.id)"
        />
      </template>
    </van-swipe-cell>

    <van-floating-bubble icon="plus" @click="openAddTodoPopup" />

    <van-popup
      v-model:show="addTodoPopup.show"
      :style="{ padding: '30px 10px' }"
    >
      <van-form @submit="handleAddTodo">
        <van-cell-group inset>
          <van-field
            v-model="addTodoPopup.info.name"
            name="名称"
            label="名称"
            placeholder="请输入名称"
            :rules="[{ required: true, message: '请输入名称' }]"
          />
          <van-field
            v-model="addTodoPopup.info.description"
            name="描述"
            label="描述"
            placeholder="请输入描述"
            :rules="[{ required: true, message: '请输入描述' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { showConfirmDialog, showLoadingToast, showFailToast } from "vant";
import useEthers from "@/store/ethers";
import { formatDate } from "@/utils";

const ethers = useEthers();

const completeTask = async (id: number) => {
  await showConfirmDialog({
    title: "完成",
    message: "是否确认完成?",
  });
  handleCompleteTask(id);
};

const handleCompleteTask = async (id: number) => {
  try {
    await ethers.contract.markTaskCompleted(id);
    showLoadingToast({
      message: "完成待办事项成功，等待区块链确认...",
      forbidClick: true,
    });
  } catch (error) {
    showFailToast(error.reason || error.data?.message || error.message);
  }
};

const deleteTask = async (id: number) => {
  await showConfirmDialog({
    title: "删除",
    message: "是否确认删除?",
  });
  handleDeleteTask(id);
};

const handleDeleteTask = async (id: number) => {
  try {
    await ethers.contract.deleteTask(id);
    showLoadingToast({
      message: "删除待办事项成功，等待区块链确认...",
      forbidClick: true,
    });
  } catch (error) {
    showFailToast(error.reason || error.data?.message || error.message);
  }
};

const userTasks = ref({
  data: [],
  total: 0,
});

const getUserTasks = async () => {
  const res = await ethers.contract.getTask();
  userTasks.value = {
    data: res,
    total: res.length,
  };
};

const useAddTodo = () => {
  const addTodoPopup = ref({
    show: false,
    info: {
      name: "",
      description: "",
    },
  });

  const openAddTodoPopup = () => {
    addTodoPopup.value = {
      show: true,
      info: {
        name: "",
        description: "",
      },
    };
  };

  const closeAddTodoPopup = () => {
    addTodoPopup.value = {
      show: false,
      info: {
        name: "",
        description: "",
      },
    };
  };

  const handleAddTodo = async () => {
    try {
      await ethers.contract.createTask(
        addTodoPopup.value.info.name,
        addTodoPopup.value.info.description
      );
      showLoadingToast({
        message: "新增待办事项成功，等待区块链确认...",
        forbidClick: true,
      });
      closeAddTodoPopup();
    } catch (error) {
      showFailToast(error.reason || error.data?.message || error.message);
    }
  };

  return { addTodoPopup, openAddTodoPopup, handleAddTodo };
};

const { addTodoPopup, openAddTodoPopup, handleAddTodo } = useAddTodo();

watch(
  () => ethers.contract,
  () => {
    getUserTasks();
  }
);
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
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    &.completed {
      text-decoration: line-through;
    }

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

    span {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
