<script setup lang="ts">

import {TeamType} from "../model/team";
import myAxios from "../plugins/myAxios.ts";
import {showConfirmDialog, showToast} from "vant";
import {UserType} from "../model/user";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";

interface teamCardProps {
  teamList: TeamType[]
}

const props = withDefaults(defineProps<teamCardProps>(), {
  teamList: []
})

const router = useRouter();

const emit = defineEmits(['updateData'])

const isSecrect = ref(false);
const teamId = ref(0);
const teamPassword = ref("");

const initTeamPassword = () => {
  teamId.value = 0;
  teamPassword.value = "";
}
const preJoin = (team) => {
  teamId.value = team.id;
  if(team.teamStatus === 2){
    isSecrect.value = true;
  }else {
    doJoinTeam()
  }
}
const doJoinTeam = async () => {
  const res = await myAxios.post("/team/join",{
    teamId:teamId.value,
    teamPassword:teamPassword.value
  })
  if(res.data.code === 0){
    emit('updateData');
    showToast("加入成功");
  }else{
    showToast("加入失败" + (res.data.description ? `,${res.data.description}` : ''));
  }
  initTeamPassword();
}

const doUpdateTeam =  (teamId) => {
  router.push({
    path:"/team/update",
    query:{
      id:teamId
    }
  })
}

const doQuitTeam =  async (teamId) => {
  const res = await myAxios.post("/team/quit",{
    teamId:teamId
  })
  if(res.data.code === 0){
    emit('updateData');
    showToast("操作成功")
  }else{
    showToast("操作失败" + (res.data.description ? `,${res.data.description}` : ''));
  }
}

const doDeleteTeam =  async (teamId) => {
  const res = await myAxios.post("/team/join",{
    id:teamId
  })
  if(res.data.code === 0){
    emit('updateData');
    showToast("操作成功")
  }else{
    showToast("操作失败" + (res.data.description ? `,${res.data.description}` : ''));
  }
}

const user:UserType = ref([])

onMounted(async () => {
  user.value =  await getCurrentUser()
})
</script>

<template>
  <van-card
      v-for="team in teamList"
      :desc="team.teamDescription"
      :title="team.teamName"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
  >

    <template #bottom>
      <div v-if="team.expireTime">
        {{ team.expireTime.split(" ")[0] }}
      </div>
    </template>
    <template #footer>
<!--      todo 根据加入队伍的状态修改-->
      <van-button v-if="!team.hasJoin"  type="primary" size="mini" @click="preJoin(team)">加入队伍</van-button>
      <van-button v-if="user.id === team.userId" type="primary" size="mini" @click="doUpdateTeam(team.id)">更新队伍</van-button>
      <van-button v-if="team.hasJoin" type="primary" size="mini" @click="doQuitTeam(team.id)">退出队伍</van-button>
      <van-button v-if="user.id === team.userId" type="primary" size="mini" @click="doDeleteTeam(team.id)">解散队伍</van-button>
    </template>
  </van-card>
  <van-dialog v-model:show="isSecrect" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="initTeamPassword">
    <van-field v-model="teamPassword" type="password" />
  </van-dialog>

  <van-empty v-if="!teamList||teamList.length==0" description="无数据"/>
</template>

<style scoped>

</style>