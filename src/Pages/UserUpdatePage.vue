<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {UserType} from "../model/user";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {defaultUser} from "../common/constant.ts";



const router = useRouter();
const currentDate = new Date();
const formatLocalDate = (date) => {
  return (
      date.getFullYear() + '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
      date.getDate().toString().padStart(2, '0')
  );
}

function renderTime(date) {
  var formatedDate = new Date(date).toJSON();
  return new Date(+new Date(formatedDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}


const user:UserType = ref('')

const editTag = () => {
  router.push({
    path:"/search",
    query:{
      id:user.value.id,
      tags:user.value.tags,
      edit:true
    }
  })
}



onMounted(async () => {
  user.value =  await getCurrentUser()
  console.log(user.value)
})
const toEdit = (editKey:string, editValue, editTitle:string) => {
  router.push({
    path:'/user/edit',
    query:{
      editKey:editKey,
      editValue:editValue,
      editTitle:editTitle
    }
  })
}

const show = ref(false);
const showPopup = () => {
  show.value = true;
};

const fileList = ref();

const afterRead = async (file) => {
  file.status = 'uploading';
  file.message = '上传中...';
  //创建FormData对象。上传图片需要转换二进制，这里要用到FormData
  let forms = new FormData();
  //"file"表示给后台传的属性名字
  forms.append("file", file.file); //获取上传图片信息
  const res = await myAxios.post("/upload", forms);
  if(res.data.code === 0){
    file.status = 'done';
    file.message = '上传成功';
    user.value.avatarUrl = res.data.data;
    const upRes = await myAxios.post("/user/update", {
      id:user.value.id,
      avatarUrl:res.data.data
    })
    if(upRes.data.code === 0){
      showSuccessToast("修改头像成功");
      show.value = false;
    }else {
      showFailToast("修改头像失败");
    }
  }else{
    file.status = 'failed';
    file.message = '上传失败';
  }
};
</script>

<template>

  <van-cell-group>
    <van-cell center  title="头像">
      <van-image
          round
          width="5rem"
          height="5rem"
          fit="cover"
          position="center"
          :src="user.avatarUrl ?? defaultUser"
          @click="showPopup"
      />
    </van-cell>
    <van-popup v-model:show="show" round :style="{ padding: '40px' }" >
      <div style="display: flex;justify-content: center;margin-bottom: 10px">上传头像</div>
      <van-uploader multiple   v-model="fileList" :after-read="afterRead" max-count="1"  />
    </van-popup>
    <van-cell center title="用户名" is-link @click="toEdit('username', user.username, '用户名')" :value="user.username" />
    <van-cell center title="账号" is-link @click="toEdit('userAccount', user.userAccount, '账号')" :value="user.userAccount" />
    <van-cell center title="我的标签" is-link @click="editTag" />
    <van-cell center title="性别" :value="user.gender === null ? '暂未设置' : (user.gender === 0 ? '男' : '女')" @click="toEdit('gender', user.gender, '性别')" />
    <van-cell center title="电话" is-link @click="toEdit('phone', user.phone, '电话')" :value="user.phone" />
    <van-cell center title="邮箱" is-link @click="toEdit('email', user.email, '邮箱')" :value="user.email" />
    <van-cell center title="创建时间"  :value="renderTime(user.createTime)" />
  </van-cell-group>

</template>

<style scoped>

</style>