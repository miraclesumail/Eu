import Vue from 'vue'
import App from './App'
import router from '@/assets/js/router'
import store from '@/assets/js/store';
import Socket from '@/assets/js/config/socket';
import { ws, apiList, routerGuard, isHeaderShowList, isFooterShowList, regularList } from '@/assets/js/config/config';
import { Tool } from '@/assets/js/config/tool'
import $ from 'jquery'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import touch from 'vue-directive-touch'
import '@/assets/css/variable.less'
import '@/assets/css/base.less'
// import 'swiper/dist/css/swiper.css';
// import '@/assets/css/myFont/iconfont.css'
import '@/assets/css/myFont/iconfont.css'
import 'swiper/dist/css/swiper.css'
import VueClipboard from 'vue-clipboard2'
import alert from './assets/js/lib/alert';

//设置全局变量
window.all = {};
//链接websocket服务器
let url;
const protocolStr = document.location.protocol;
const host = window.location.host;
const w = protocolStr.length <= 5 ? 'ws' : 'wss';
if (process.env.NODE_ENV == 'production') {
    url = w + '://' + host + '/websocket'
} else {
    url = 'ws://192.168.10.199:9280'   // 开发站
    // url = 'ws://cstest-eu.neweb.me/websocket'   // 测试站
    // url = 'wss://www.eu99999.com/websocket'   // 正式站
}

ws.url = url;

all.net = new Socket(ws.platformId, ws.url, store);
all.store = store;
all.alert = alert;
all.router = router;
all.$ = $;
all.tool = Tool;
all.apiList = apiList;
all.isHeaderShowList = isHeaderShowList;
all.isFooterShowList = isFooterShowList;
all.regularList = regularList;
all.routerGuard = routerGuard;
Vue.config.productionTip = false;


new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
Vue.use(touch);
Vue.use(VueClipboard);
Vue.use(VueAwesomeSwiper);
all.tool.autoShowHeaderFeader(window.location.pathname);
router.beforeEach((to, from, next) => {
    all.tool.enterPath(from.path);
    routerGuard.map(item => to.path === item.path && !store.state.isLogin ? router.push(item.toGoPath ? item.toGoPath : '/login') : next());
});
router.afterEach((to, from) => {
    all.tool.autoShowHeaderFeader(to.path);
    all.net.callbackCount = 0; all.net.sendCount = 0; all.tool.setLoading(false);
});
all.$(document).on('blur', 'input', (e) => {
  let val = $(e.target).val();
  let color = $(e.target).css('color');
  if ($(e.target).data('type') == 'myInput') return;
  regularList.map(item => {
    if (item.id === $(e.target)[0].id && all.$(e.target).val() && !item.regular.test(all.$(e.target).val())) {
      $(e.target).parent().css('borderColor', 'red');
      if ($(e.target)[0].id === 'password' || $(e.target)[0].id === 'repassword') $(e.target).attr('type', 'text');
      if ($(e.target)[0].id !== 'remark') $(e.target).val(item.error);
      $(e.target).css('color', 'red')
    }
  });
  all.$(e.target).on('focus', (e) => {
    if ($(e.target).data('type') == 'myInput') return;
    $(e.target).parent().css('borderColor', '#079ae0');
    if ($(e.target)[0].id === 'password' || $(e.target)[0].id === 'repassword') $(e.target).attr('type', 'password');
    if ($(e.target)[0].id !== 'remark') $(e.target).val(val);
    $(e.target).css('color', color);
  });
});
all.$(document).on('keyup', 'input', (e) => {
  if ($(e.target).data('type') == 'myInput') return;
  if ($(e.target)[0].id === 'username' || $(e.target)[0].id === 'password' || $(e.target)[0].id === 'usernameL') {
    let val = $(e.target).val().toLowerCase();
    $(e.target).val(val.match(/[a-z0-9]*/i)[0])
  }
  if ($(e.target)[0].id === 'phoneNumber' || $(e.target)[0].id === 'smsCode' || $(e.target)[0].id === 'smsCode1' || $(e.target)[0].id === 'amount' || $(e.target)[0].id === 'bonusCode') {
    let val = $(e.target).val();
    $(e.target).val(val.match(/[0-9]*/i)[0])
  }
  if ($(e.target)[0].id === 'realName') {
    let val = $(e.target).val();
    $(e.target).val(val.match(/[\u4E00-\u9FA5]*/i)[0])
  }
});
all.tool.setStore('downApp', true);
all.tool.setStore('once', true);
all.tool.setStore('registerPromo', true);
//监听屏幕旋转
// Tool.clientIos()?window.onorientationchange=Tool.rotationScreenIos:window.screen.orientation.onchange=Tool.rotationScreenAndroid;

let search = {};
let tempArr = location.search.split('?');
if (tempArr.length > 1) {
  tempArr = tempArr[1].split('&')
  tempArr.map(v => {
    let temp = v.split('=');
    search[temp[0]] = temp[1];
  })
}
if (search.playerId && search.token) {
  all.tool.send('authenticate', {
    playerId: search.playerId,
    token: search.token
  }, 'player').then( respData => {
      all.tool.setLoginStatus(true);
      all.tool.send('get', {
          playerId: search.playerId
      }, 'player').then( result => all.tool.setLoginInfo(result)).catch( err => {console.log(err)});
  }).catch(err=>{console.log(err);
      all.tool.setLogoutInfo();
  });
}


// 代理开户链接处理
try  {
  let url = window.location.href;
  let origin = window.location.origin;
  let hash = window.location.hash;
  let beforeStr = url.replace(origin, '');
  let afterStr = beforeStr && beforeStr.replace(hash, '');
  const path = afterStr;
  const tempPathArr = path.split('/');
  if (tempPathArr.length === 2 && tempPathArr[1] !== '' && !isNaN(Number(tempPathArr[1]))) {
      all.tool.setStore('partnerId', tempPathArr[1]);
      location.href = window.origin;
  }
} catch (e) {
  console.error('[main-js:]' + e);
}
