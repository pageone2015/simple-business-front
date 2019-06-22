import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue';
import Home from '../components/Home.vue';
import Vote from '../components/Vote.vue';
import Publish from '../components/Publish.vue';
import Subscribe from '../components/Subscribe.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login,
    meta: {
      isLogin: false
    }
  },
  {
    path: '/home',
    component: Home,
    children:[
      {
        path: '/publish',
        component: Publish,
        meta: {
          isLogin: true
        }
      },
      {
        path: '/subscribe',
        component: Subscribe,
        meta: {
          isLogin: true
        }
      },
      {
        path: '/vote',
        component: Vote,
        meta: {
          isLogin: true
        }
      }
    ],
    meta: {
      isLogin: true
    }
  }
];

let router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {

  //获取用户登录成功后储存的登录标志
  let getFlag = sessionStorage.getItem("Flag");

  //如果登录标志存在且为isLogin，即用户已登录
  if(getFlag === "isLogin"){
    console.log("the user has login");
    next();

    //如果已登录，还想想进入登录注册界面，则定向回首页
    if (!to.meta.isLogin) {
      next({
        path: '/'
      })
    }

    //如果登录标志不存在，即未登录
  }else{
    console.log("the user has not login");

    //用户想进入需要登录的页面，则定向回登录界面
    if(to.meta.isLogin){
      next({
        path: '/',
      })
      //用户进入无需登录的界面，则跳转继续
    }else{
      next()
    }

  }

});

export default router;
