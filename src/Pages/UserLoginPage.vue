<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();
const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async (values) => {
  const res = await myAxios.post("user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  });
  if(res.data.code === 0){
    const redirectUrl = route.query?.redirect??'/';
    window.location.href = redirectUrl;
  }
};

const doRegister = () => {
  router.push('/user/register')
}
</script>

<template>
  <div class="logo">
    <van-image
        width="150"
        height="150"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        radius="10px"
        style="box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"
    />
  </div>
  <van-row justify="center">
    <h3>“智友-发现同好”</h3>
  </van-row>
  <div style="padding-top:20px"/>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 20px 80px;">
      <van-button round plain type="primary" native-type="submit" style="margin-right: 50px">
        <van-icon name="contact-o" style="padding-right: 5px"/>
        登录
      </van-button>
      <van-button round plain type="primary" @click="doRegister" >
        <van-icon name="friends-o"  style="padding-right: 5px"/>
        注册
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>
.logo{
  padding-top: 100px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}


</style>