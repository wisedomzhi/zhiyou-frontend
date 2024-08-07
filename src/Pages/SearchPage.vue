<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {showFailToast, showSuccessToast, showToast} from 'vant';
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";


const value = ref('');

const router = useRouter();
const route = useRoute();

const edit = ref(route.query?.edit);
const tags = route.query?.tags;
const userId = route.query?.id;
const activeIds = ref([]);
const activeIndex = ref(0);

onMounted(() => {
  if(tags){
    activeIds.value = JSON.parse(tags)
  }
})

const originTags = [
  {
    text: "语言",
    children: [
      {text: "Java", id: "java"},
      {text: "Python", id: "python"},
      {text: "C++", id: "cpp"},
      {text: "JavaScript", id: "javascript"},
      {text: "Go", id: "go"},
      {text: "Ruby", id: "ruby"}
    ]
  },
  {
    text: "技术栈",
    children: [
      {text: "前端", id: "frontend"},
      {text: "后端", id: "backend"},
      {text: "全栈", id: "fullstack"},
      {text: "DevOps", id: "devops"},
      {text: "数据科学", id: "datascience"},
      {text: "人工智能", id: "ai"}
    ]
  },
  {
    text: "开发工具",
    children: [
      {text: "VS Code", id: "vscode"},
      {text: "IntelliJ IDEA", id: "intellij"},
      {text: "PyCharm", id: "pycharm"},
      {text: "Eclipse", id: "eclipse"},
      {text: "Git", id: "git"},
      {text: "Docker", id: "docker"}
    ]
  },
  {
    text: "爱好",
    children: [
      {text: "开源贡献", id: "opensource"},
      {text: "黑客马拉松", id: "hackathon"},
      {text: "技术博客", id: "techblog"},
      {text: "编程挑战", id: "codingchallenge"}
    ]
  },
  {
    text: "特长",
    children: [
      {text: "算法设计", id: "algorithms"},
      {text: "系统架构", id: "architecture"},
      {text: "数据库优化", id: "database_optimization"},
      {text: "代码审查", id: "code_review"}
    ]
  },
  {
    text: "性格特点",
    children: [
      {text: "逻辑性强", id: "logical"},
      {text: "好奇心重", id: "curious"},
      {text: "问题解决者", id: "problem_solver"},
      {text: "团队协作", id: "team_player"}
    ]
  }
];

const showTags = ref(originTags);

const show = ref(true);
const close = (tag) => {
  activeIds.value = activeIds.value.filter((id) => {
    return id !== tag;
  })
};



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

const doUpdate = async () => {
  const updateTags = JSON.stringify(activeIds.value);
  const res = await myAxios.post("/user/update",{
    id:userId,
    tags:updateTags
  })
  if(res.data.code === 0){
    showSuccessToast("修改成功");
    router.push({
      path:"/user/update"
    })
  }else{
    showFailToast("修改失败")
  }
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
  <van-row>
    <template v-for="tag in activeIds">
      <van-col span="4" style="margin-top: 5px; margin-right: 25px">
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
  <van-button v-if="edit" size="large" type="primary" @click="doUpdate">修改</van-button>
  <van-button v-else size="large" type="primary" @click="doSearch">搜索</van-button>
</div>


</template>

<style scoped>

</style>