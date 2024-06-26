import Index from "../Pages/Index.vue";
import SearchPage from "../Pages/SearchPage.vue";
import TeamPage from "../Pages/TeamPage.vue";
import UserPage from "../Pages/UserPage.vue";
import UserEditPage from "../Pages/UserEditPage.vue";
import SearchResult from "../Pages/SearchResult.vue";


const routes = [
    { path: '/', component: Index },
    { path: '/search', component: SearchPage },
    { path: '/team', component: TeamPage },
    { path: '/user', component: UserPage },
    { path: '/user/edit', component: UserEditPage },
    { path: '/user/list', component: SearchResult },
]

export default routes;