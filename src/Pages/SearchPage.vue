<script setup lang="ts">
import {ref} from 'vue';
import {showToast} from 'vant';
import {useRouter} from "vue-router";


const value = ref('');

const router = useRouter();

const activeIds = ref([1, 2]);
const activeIndex = ref(0);
const originTags = [
  {
    text: '浙江',
    children: [
      {text: '杭州', id: 'java'},
      {text: '温州', id: 'python'},
      {text: '宁波', id: '宁波', disabled: true},
    ],
  },
  {
    text: '江苏',
    children: [
      {text: '南京', id: 'c++'},
      {text: '无锡', id: '无锡'},
      {text: '徐州', id: '徐州'},
    ],
  },
];

const showTags = ref(originTags);

const show = ref(true);
const close = (tag) => {
  activeIds.value = activeIds.value.filter((id) => {
    return id !== tag;
  })
};


// TODO 搜素标签根据后端传来的数据结果要做修改
const onSearch = (val) => {
  showTags.value = originTags.map(parentTag => {
    const tempParentTag = {...parentTag};
    const tempChildren = [...parentTag.children];
    tempParentTag.children = tempChildren.filter(item => item.text.includes(val));
    return tempParentTag;
  })
}
const onCancel = () => {
  value.value = ''
  showTags.value = originTags;
};

const doSearch = () =>{
  router.push({
    path:"/user/list",
    query:{
      tags: activeIds.value
    }
  })
}
</script>

<template>
  <form action="/">
    <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>
  <van-row :gutter="[14, 20]">
    <template v-for="tag in activeIds">
      <van-col span="5">
        <van-tag round type="primary" :show="show" closeable size="medium" @close="close(tag)">{{tag}}</van-tag>
      </van-col>
    </template>

  </van-row>


  <van-divider content-position="left">选择标签</van-divider>

  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="showTags"
  />

<div style="margin: 15px">
  <van-button size="large" type="primary" @click="doSearch">主要按钮</van-button>
</div>


</template>

<style scoped>

</style>