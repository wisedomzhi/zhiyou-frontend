TeamPage.vue<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCard from "../components/TeamCard.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";

const router = useRouter();

const teamList = ref([]);

const listTeams = async (val = '') => {
  const res = await myAxios.get('/team/list/join', {
    params : {
      page:1,
      pageSize:10,
      searchText:val
    }
  });
  if(res.data.code === 0){
    teamList.value = res.data.data;
  }
}

const searchText = ref("");
onMounted( () => {
  listTeams();
})

const onSearch = () => {
  listTeams(searchText.value);
}
</script>

<template>
  <van-search v-model="searchText" placeholder="请输入搜索关键词"  @search="onSearch" />
  <TeamCard :team-list="teamList"/>
</template>

<style scoped>

</style>