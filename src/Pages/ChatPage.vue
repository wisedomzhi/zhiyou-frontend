<script setup lang="ts">
//聊天数据
import {getCurrentInstance, nextTick, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {showFailToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import myAxios from "../plugins/myAxios.ts";

const defaultPicture = "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg";

const route = useRoute();


const stats = ref({
  user: {
    id: 0,
    username: "",
    avatarUrl: ''
  },
  users: [],
  team: {
    teamId: 0,
    teamName: ''
  },
  text: "",
  messages: [],
  content: ''
})
//用户名
const userName = ref("张三");
//输入内容
const inputValue = ref("");

let socket = null;
const heartbeatInterval = 30 * 1000; // 30秒
let heartbeatTimer = null;



const startHeartbeat = () => {
  heartbeatTimer = setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send("PING");
    }
  }, heartbeatInterval);
}

const stopHeartbeat = () => {
  clearInterval(heartbeatTimer);
  heartbeatTimer = null;
}

const chatRoom = ref(null)

const sendOut = () => {

}

const init = () => {
  if (typeof (WebSocket) == "undefined") {
    showFailToast("您的浏览器不支持WebSocket")
  } else {
    // 区分线上和开发环境
    console.log(stats.value)
    let socketUrl = import.meta.env.PROD ? `ws://116.198.227.31:8080/ws/${stats.value.user.id}/${stats.value.team.teamId}`
        : `ws://localhost:8080/ws/${stats.value.user.id}/${stats.value.team.teamId}`
    if (socket != null) {
      socket.close();
      socket = null;
    }
    // 开启一个websocket服务
    socket = new WebSocket(socketUrl);
    //打开事件
    socket.onopen = function () {
      startHeartbeat();
      console.log("websocket已打开");
    };

    //  浏览器端收消息，获得从服务端发送过来的文本消息
    socket.onmessage = function (msg) {
      if (msg.data === "PONG") {
        return;
      }
      // 对收到的json数据进行解析，
      let data = JSON.parse(msg.data)
      console.log(data)
      if (data.error) {
        showFailToast(data.error)
        return
      }
      // 获取在线人员信息
      if (data.users) {
        stats.value.users = data.users.filter(user => {
          return user.id !== stats.value.user.id
        })
        // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
      }else {
        // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
        let flag;
        // 队伍
        if (data.teamId && stats.value.team.teamId === data.teamId) {
          flag = (data.fromUser?.id !== stats.value.user.id)
        }
        console.log(`flag:${flag}`)
        if (flag) {
          stats.value.messages.push(data)
          // 构建消息内容
          createContent(data.fromUser, null, data.text, data.createTime)
          nextTick(() => {
            const lastElement = chatRoom.value.lastElementChild
            lastElement.scrollIntoView()
          })
        }
        flag = null;
      }
    };
    //关闭事件
    socket.onclose = function () {
      console.log("websocket已关闭");
      stopHeartbeat();
      setTimeout(init, 5000); // 5秒后重连
    };
    //发生了错误事件
    socket.onerror = function () {
      console.log("websocket发生了错误");
    }
  }

}

function renderTime(date) {
  var formatedDate = new Date(date).toJSON();
  return new Date(+new Date(formatedDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}
const createContent = (remoteUser, nowUser, text, createTime) => {
  const msgTime = renderTime(createTime);
  // 当前用户消息
  let html;
  if (nowUser) {
    // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
    html = `
      <div style="justify-content: center;margin-top: 5px;display: flex">${msgTime}</div>
      <div class="userbox" >
        <div class="nameInfo">
          <div style="font-size: 14px">
            ${ nowUser.username }
          </div>
          <div class="contentText">
            ${ text }
          </div>
        </div>
        <div>
          <img src=${nowUser.avatarUrl?? defaultPicture} style="height: 50px; width: 50px; margin-top: 5px; border-radius: 5px">
        </div>
      </div>`
  } else if (remoteUser) {
    // remoteUser表示远程用户聊天消息，灰色的气泡
    html = `
        <div style="justify-content: center;margin-top: 5px;display: flex">${msgTime}</div>
       <div class="userbox2">
       <div>
          <img src=${remoteUser.avatarUrl?? defaultPicture} style="height: 50px; width: 50px; margin-top: 5px; border-radius: 5px">
        </div>
        <div class="nameInfo2">
          <div style="font-size: 14px">
            ${remoteUser.username}
          </div>
          <div class="contentText2" >
            ${text}
          </div>
        </div>

      </div>`
  }
  stats.value.content += html;
}

const send = () => {
  if (!stats.value.text.trim()) {
    showFailToast("请输入内容")
  } else {
    if (typeof (WebSocket) == "undefined") {
      showFailToast("您的浏览器不支持WebSocket")
    } else {
      console.log("您的浏览器支持WebSocket");
      let message = {
        fromId: stats.value.user.id,
        text: stats.value.text,
        teamId: stats.value.team.teamId,
      }
      socket.send(JSON.stringify(message));
      stats.value.messages.push({user: stats.value.user.id, text: stats.value.text})
      createContent(null, stats.value.user, stats.value.text, new Date())
      stats.value.text = '';
      nextTick(() => {
        const lastElement = chatRoom.value.lastElementChild
        lastElement.scrollIntoView()
      })
    }
  }
}

onMounted(async () => {
  const user = await getCurrentUser();
  let {teamId, teamName} = route.query;
  stats.value.user.id = Number.parseInt(user.id);
  stats.value.user.username = user.username;
  stats.value.user.avatarUrl = user.avatarUrl;
  stats.value.team.teamId = Number.parseInt(teamId);
  stats.value.team.teamName = teamName;
  const res = await myAxios.get("/chat/team",
      {
        params:{
          teamId:stats.value.team.teamId
        }
      })
  if(res.data.code !== 0){
    return;
  }
  const teamMessage = res.data.data;
  teamMessage.forEach(chat => {
    if (chat.fromUser.id === stats.value.user.id) {
      createContent(null, chat.fromUser, chat.text, chat.createTime)
    } else {
      createContent(chat.fromUser, null, chat.text ,chat.createTime)
    }
  })


  init()
  // 内容始终显示最下方
  await nextTick()
  const lastElement = chatRoom.value.lastElementChild
  lastElement.scrollIntoView()
})


</script>

<template>
  <div class="wrap">
    <div class="title">
      {{ stats.team.teamName }}
    </div>
    <div class="content_box" id="box" ref="scrollBox">
      <div ref="chatRoom" v-html="stats.content"></div>
    </div>
    <div class="bottom">
      <van-field
          v-model="stats.text"
          center
          type="textarea"
          :autosize="{ maxHeight: 100, minHeight: 50 }"
          placeholder="请输入内容"
          rows="1"
      >
        <template #button>
          <van-button size="large" type="primary" @click="send" style="margin-right: 30px">发送</van-button>
        </template>
      </van-field>
    </div>
  </div>



</template>

<style>
* {


  padding: 0;
  margin: 0;
}

.wrap {


  height: 100%;
  width: 100%;
  position: relative;
}

.title {


  height: 40px;
  width: 100%;
  background-color: #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom {


  min-height: 50px;
  width: 100%;
  border-top: 1px solid #eaeaea;
  position: fixed;
  bottom: 0;
}

.content_box {


  /*
  中间栏计算高度，110是包含了上下固定的两个元素高度90
  这里padding：10px造成的上下够加了10，把盒子撑大了，所以一共是20要减掉
  然后不知道是边框还是组件的原因，导致多出了一些，这里再减去5px刚好。不然会出现滚动条到顶或者底部的时候再滚动的话就会报一个错，或者出现滚动条变长一下的bug
  */
  height: calc(100% - 115px);
  overflow: auto;
  padding: 10px;
}

.timer {


  text-align: center;
  color: #c2c2c2;
}

/* 发送的信息样式 */
/*
右边消息思路解释：首先大盒子userbox内放两个盒子，一个放头像，一个放用户名和发送的内容，我们先用flex让他横向排列。
然后把写文字的大盒子设置flex：1。这个属性的意思就是让这个元素撑满父盒子剩余位置。然后我们再把文字盒子设置flex，并把他对齐方式设置为尾部对齐就完成了基本的结构，然后微调一下就可以了
*/
.userbox {


  width: 100%;
  display: flex;
  margin-bottom: 10px;
}

.nameInfo {


  /* 用flex：1把盒子撑开 */
  flex: 1;
  margin-right: 10px;
  /* 用align-items把元素靠右对齐 */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.contentText {


  background-color: #9eea6a;
  /* 把内容部分改为行内块元素，因为盒子flex：1把盒子撑大了，所以用行内块元素让内容宽度不根据父盒子来 */
  display: inline-block;
  /* 这四句是圆角 */
  border-top-left-radius: 10px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  /* 最大宽度限定内容输入到百分61换行 */
  max-width: 61%;
  padding: 5px 10px;
  /* 忽略多余的空白，只保留一个空白 */
  white-space: normal;
  /* 换行显示全部字符 */
  word-break: break-all;
  margin-top: 3px;
  font-size: 14px;
}

/* 接收的信息样式 */
/*
左边消息思路解释：跟上面一样，就是换一下位置，首先通过把最外层大盒子的排列方式通过flex-direction: row-reverse;属性翻转，也就是头像和文字盒子换位置
然后删除掉尾部对齐方式，因为不写这个默认是左对齐的。我们写的左边就没必要再写了。
*/
.userbox2 {


  width: 100%;
  display: flex;
  margin-bottom: 10px;
}

.nameInfo2 {


  /* 用flex：1把盒子撑开 */

  margin-left: 10px;
}

.contentText2 {


  background-color: #F5F5F5;
  /* 把内容部分改为行内块元素，因为盒子flex：1把盒子撑大了，所以用行内块元素让内容宽度不根据父盒子来 */
  display: inline-block;
  /* 这四句是圆角 */
  border-top-left-radius: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  /* 最大宽度限定内容输入到百分61换行 */
  max-width: 61%;
  padding: 5px 10px;
  /* 忽略多余的空白，只保留一个空白 */
  white-space: normal;
  /* 换行显示全部字符 */
  word-break: break-all;
  margin-top: 3px;
  font-size: 14px;
}
</style>