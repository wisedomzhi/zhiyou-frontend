<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {UserType} from "../model/user";
import {TeamType} from "../model/team";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
import UserCard from "../components/UserCard.vue";

const router = useRouter();
const route = useRoute();

function renderTime(date) {
  var formatedDate = new Date(date).toJSON();
  return new Date(+new Date(formatedDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}


const team: TeamType = ref<TeamType>([])


onMounted(async () => {
  const res = await myAxios.get('team/list', {
    params: {
      id: route.query?.id,
      page: 1,
      pageSize: 1
    }
  })
  if (res.data.code === 0) {
    team.value = res.data?.data[0];
    team.value.joinedUser.forEach((member) => {
      member.tags = JSON.parse(member.tags);
    });
  } else {
    showFailToast('查询队伍失败')
  }

})
const toEdit = (teamId: number, editKey: string, editValue: string, editTitle: string) => {
  router.push({
    path: '/team/edit',
    query: {
      teamId: teamId,
      editKey: editKey,
      editValue: editValue,
      editTitle: editTitle
    }
  })
}


const toChat = () => {
  router.push({
    path: '/team/chat',
    query: {
      teamId: team.value.id,
      teamName: team.value.teamName
    }
  })
}

</script>

<template>
  <div class="center">
    <van-image
        width="150"
        height="150"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        radius="10px"
        style="box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"
    />
  </div>


  <van-cell-group>
    <van-cell center title="队伍名称" is-link @click="toEdit(team.id, 'teamName', team.teamName, '队伍名')"
              :value="team.teamName"/>
    <van-cell center title="队伍人数" :value="team.joinedUser?.length"/>
    <van-cell center title="队长" :value="team.createUser?.username"/>
    <van-cell center title="队伍描述" is-link
              @click="toEdit(team.id, 'teamDescription', team.teamDescription, '队伍描述')"
              :value="team.teamDescription"/>
    <van-cell center title="创建时间" :value="renderTime(team.createTime)"/>
    <van-cell center title="聊天室" @click="toChat" is-link/>
  </van-cell-group>
  <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    队伍成员
  </van-divider>
  <user-card :user-list="team.joinedUser"/>

</template>

<style scoped>
.center {
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
</style>