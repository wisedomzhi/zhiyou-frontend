import Index from "../Pages/Index.vue";
import SearchPage from "../Pages/SearchPage.vue";
import TeamPage from "../Pages/TeamPage.vue";
import UserPage from "../Pages/UserPage.vue";
import UserEditPage from "../Pages/UserEditPage.vue";
import SearchResult from "../Pages/SearchResult.vue";
import UserLoginPage from "../Pages/UserLoginPage.vue";
import TeamAddPage from "../Pages/TeamAddPage.vue";
import TeamUpdatePage from "../Pages/TeamUpdatePage.vue";
import UserUpdatePage from "../Pages/UserUpdatePage.vue";
import UserTeamJoinedPage from "../Pages/UserTeamJoinedPage.vue";
import UserTeamCreatedPage from "../Pages/UserTeamCreatedPage.vue";
import UserRegisterPage from "../Pages/UserRegisterPage.vue";
import TeamShowPage from "../Pages/TeamShowPage.vue";
import TeamEditPage from "../Pages/TeamEditPage.vue";
import ChatPage from "../Pages/ChatPage.vue";


const routes = [
    {path: '/', component: Index, meta: {title: "智友伙伴匹配", requireAuth: true}},
    {path: '/search', component: SearchPage, meta: {title: "搜索用户", requireAuth: true}},
    {path: '/team', component: TeamPage, meta: {title: "队伍", requireAuth: true}},
    {path: '/team/add', component: TeamAddPage, meta: {title: "添加队伍", requireAuth: true}},
    {path: '/team/update', component: TeamUpdatePage, meta: {title: "修改队伍", requireAuth: true}},
    {path: '/team/show', component: TeamShowPage, meta: {title: "队伍详情", requireAuth: true}},
    {path: '/team/edit', component: TeamEditPage, meta: {title: "编辑队伍信息", requireAuth: true}},
    {path: '/user', component: UserPage, meta: {title: "个人", requireAuth: true}},
    {path: '/user/edit', component: UserEditPage, meta: {title: "编辑个人信息", requireAuth: true}},
    {path: '/user/list', component: SearchResult, meta: {title: "搜索结果", requireAuth: true}},
    {path: '/user/login', component: UserLoginPage, meta: {title: "登录", requireAuth: false}},
    {path: '/user/register', component: UserRegisterPage, meta: {title: "注册", requireAuth: false}},
    {path: '/user/update', component: UserUpdatePage, meta: {title: "个人", requireAuth: true}},
    {path: '/user/joined', component: UserTeamJoinedPage, meta: {title: "已加入队伍", requireAuth: true}},
    {path: '/user/created', component: UserTeamCreatedPage, meta: {title: "已创建队伍", requireAuth: true}},
    {path: '/team/chat', component: ChatPage, meta: {title: "队伍聊天", requireAuth: true}},
    {path: '/:pathMatch(.*)*', redirect: '/'}
]

export default routes;