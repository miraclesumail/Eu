import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/pages/home'
// import Deposit from '@/pages/saving'
// import Withdraw from '@/pages/withdraw'
// import Game from '@/pages/game'
// import Account from '@/pages/account'
// import Register from '@/pages/register'
// import Login from '@/pages/login'
// import Message from '@/pages/message'
// import AddTodesk from '@/pages/addTodesk'
// import PhoneCustomer from '@/pages/phoneCustomer'
// import Download from '@/pages/downLoad'
// import Information from '@/pages/account/information'
// import Search from '@/pages/account/search'
// import ChangePassword from '@/pages/account/changePassword'
// import SmsSettings from '@/pages/account/smsSettings'
// import Code from '@/pages/account/code'
// import ChangePhoneNum from '@/pages/account/changePhoneNum'
// import ChangeBankInfo from '@/pages/account/changeBankInfo'
// import BindBankInfo from '@/pages/account/bindBankInfo'
// import UpdateLevel from '@/pages/account/updateLevel'
// import SignIn from '@/pages/signIn'
// import Promobox from '@/pages/promobox'
// import Promobag from '@/pages/promobag'
// import GameTransfer from '@/pages/gameTransfer'
// import Resurrection from '@/pages/resurrection'
// import LoadingPage from '@/pages/loadingPage'

const Home = () => import(/* webpackChunkName: "home" */ '@/pages/home');
const Deposit = () => import(/* webpackChunkName: "saving" */ '@/pages/saving');
const Register = () => import(/* webpackChunkName: "register" */ '@/pages/register');
const Login = () => import(/* webpackChunkName: "login" */ '@/pages/login');
const Message = () => import(/* webpackChunkName: "message" */ '@/pages/message');
const AddTodesk = () => import(/* webpackChunkName: "addTodesk" */ '@/pages/addTodesk');
const PhoneCustomer = () => import(/* webpackChunkName: "phoneCustomer" */ '@/pages/phoneCustomer');
const Download = () => import(/* webpackChunkName: "downLoad" */ '@/pages/downLoad');
const DownloadAPP = () => import(/* webpackChunkName: "downloadAPP" */ '@/pages/downloadAPP');

const Account = () => import(/* webpackChunkName: "account" */ '@/pages/account');
const Information = () => import(/* webpackChunkName: "account" */ '@/pages/account/information');
const Search = () => import(/* webpackChunkName: "account" */ '@/pages/account/search');
const ChangePassword = () => import(/* webpackChunkName: "account" */ '@/pages/account/changePassword');
const SmsSettings = () => import(/* webpackChunkName: "account" */ '@/pages/account/smsSettings');
const Code = () => import(/* webpackChunkName: "account" */ '@/pages/account/code');
const ChangePhoneNum = () => import(/* webpackChunkName: "account" */ '@/pages/account/changePhoneNum');
const ChangeBankInfo = () => import(/* webpackChunkName: "account" */ '@/pages/account/changeBankInfo');
const BindBankInfo = () => import(/* webpackChunkName: "account" */ '@/pages/account/bindBankInfo');
const UpdateLevel = () => import(/* webpackChunkName: "account" */ '@/pages/account/updateLevel');
const Withdraw = () => import(/* webpackChunkName: "withdraw" */ '@/pages/withdraw');
const Game = () => import(/* webpackChunkName: "game" */ '@/pages/game');
const GameLobbyKY = () => import(/* webpackChunkName: "gameLobbyKY" */ '@/pages/gameLobbyKY');

const SignIn = () => import(/* webpackChunkName: "signIn" */ '@/pages/signIn');
const RenrenIn = () => import(/* webpackChunkName: "signIn" */ '@/pages/renrenIn');
const Promobox = () => import(/* webpackChunkName: "promobox" */ '@/pages/promobox');
const Promobag = () => import(/* webpackChunkName: "promobag" */ '@/pages/promobag');
const Promohitegg = () => import(/* webpackChunkName: "promobag" */ '@/pages/promohitegg');
const GameTransfer = () => import(/* webpackChunkName: "gameTransfer" */ '@/pages/gameTransfer');
const Resurrection = () => import(/* webpackChunkName: "resurrection" */ '@/pages/resurrection');
const LoadingPage = () => import(/* webpackChunkName: "loadingPage" */ '@/pages/loadingPage');
const Task = () => import(/* webpackChunkName: "task" */ '@/pages/task');
const Tree = () => import(/* webpackChunkName: "loadingPage" */ '@/pages/tree');
const DiscountCenter = () => import(/* webpackChunkName: "discountCenter" */ '@/pages/discountCenter');

const Alipay = () => import(/* webpackChunkName: "orderInfo" */ '@/components/Pay/Alipay')



Vue.use(Router);

export default new Router({
  // mode:'history',
  routes: [
    {path:'/',component:Home,name:'home'},
    {path:'/deposit',component:Deposit,name:'deposit'},
    {path:'/withdraw',component:Withdraw},
    {path:'/game',component:Game},
    {path:'/gameLobbyKY',component:GameLobbyKY},
    {
      path:'/account',
      component:Account,
      redirect: '/account/information',
      children: [
        {
          name: 'information',
          path: 'information',
          component: Information
        },
        {
          name: 'search',
          path: 'search',
          component: Search
        },
        {
          name: 'changePassword',
          path: 'changePassword',
          component: ChangePassword
        },
        {
          name: 'smsSettings',
          path: 'smsSettings',
          component: SmsSettings
        },
        {
          name: 'code',
          path: 'code',
          component: Code
        }
      ]
    },
    {path:'/register',component:Register,name:'register'},
    {path:'/login',component:Login},
    {path:'/message',component:Message},
    {path:'/addTodesk',component:AddTodesk},
    {path:'/phonecustomer',component:PhoneCustomer},
    {path:'/changePhoneNum',component:ChangePhoneNum},
    {path:'/changeBankInfo', component: ChangeBankInfo},
    {path:'/bindBankInfo', component: BindBankInfo},
    {path:'/updateLevel', component: UpdateLevel},
    {path:'/downLoad', component: Download},
    {path:'/downloadAPP', component: DownloadAPP},
    {path:'/signIn', component: SignIn},
    {path:'/renrenIn', component: RenrenIn},
    {path:'/promobox', component: Promobox},
    {path:'/promobag', component: Promobag},
    {path:'/promohitegg', component: Promohitegg},
    {path:'/gameTransfer', component: GameTransfer},
    {path:'/resurrection', component: Resurrection},
    {path:'/loadingPage', component: LoadingPage},
    {path:'/task', component: Task},
    {path:'/tree', component: Tree},
    {path:'/discountCenter', component: DiscountCenter},
    {path:'/alipay', component: Alipay},
    {
      path: '*',
      component: Home
    }
  ]
})
