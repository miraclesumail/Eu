<template>
    <div class="saving">
        <div v-if="!needName && !wechatList" class="deposit">
            <PageTop
                :title="title"
                :useDefaultCloseFn="false"
                @closeCallBackFn="goToHome"
            >
            </PageTop>
            <main class="main">
                <div class="topbar">
                    <div class="userbox">
                        <img class="levelImg" :src="levelImg[this.$store.state.level]"/>
                        <ul class="name_balance">
                            <li class="userName" v-text="this.$store.state.userName"></li>
                            <li class="score_amount">
                                <p class="score"><span><img src="../assets/image/pages/home/iconScore.png" height="100%" width="100%"/></span><i v-text="this.$store.state.score"></i></p>
                                <p class="balance">
                                    <span><img class="coin" src="../assets/image/pages/home/iconCoin.png" height="100%"/></span>
                                    <i v-text="this.$store.state.balance"></i>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="itembox">
                        <span @click="OnlineA" :style="{background:onlineActive?'linear-gradient(#083250,#08496b,#077098)':'#083250'}"><img src="../assets/image/pages/saving/onlineCharge.png"/></span>
                        <span @click="bankChargeA" :style="{background:bankChargeActive?'linear-gradient(#083250,#08496b,#077098)':'#083250'}"><img src="../assets/image/pages/saving/bankCharge.png"/></span>
                    </div>
                </div>
                <div class="onlinebar" v-if="onlineActive">
                    <p class="payType">
                        <span id="fastPay" v-if="fastPay" @click="chooseType"><img src="../assets/image/pages/saving/onlineDJ.png"/><i></i><b v-text="fastMin+'-'+fastMax"></b></span>
                        <span id="aliPay" v-if="aliValid" @click="chooseType"><img src="../assets/image/pages/saving/onlineZFB.png"/><i></i><b v-text="aliMin+'-'+aliMax"></b></span>
                        <span id="wechatPay" v-if="wechatValid" @click="chooseType"><img src="../assets/image/pages/saving/onlineWX.png"/><i></i><b v-text="wechatMin+'-'+wechatMax"></b></span>
                        <span id="qqPay" v-if="qqPay" @click="chooseType"><img src="../assets/image/pages/saving/onlineQQ.png"/><i></i><b v-text="qqMin+'-'+qqMax"></b></span>
                        <span id="ylPay" v-if="ylPay" @click="chooseType"><img src="../assets/image/pages/saving/onlineYL.png"/><i></i><b v-text="ylMin+'-'+ylMax"></b></span>
                        <span id="jdPay" v-if="jdPay" @click="chooseType"><img src="../assets/image/pages/saving/onlineJD.png"/><i></i><b v-text="jdMin+'-'+jdMax"></b></span>
                    </p>
                    <p class="fastChoose">
                        <span v-for="item in fastAmount" @click="fastChoose" v-text="item+'元'"></span>
                    </p>
                    <div class="box_input">
                        <div class="box_input_in">
                            <label for="amount" >充值金额</label>
                            <input id="amount" type="text" @keyup="limitAmount" @focus="enterAmount" v-model="amount" placeholder="可输入其它充值金额">
                        </div>
                    </div>
                    <div class="box_input">
                        <div class="box_input_in">
                            <label for="" >优惠类型</label>
                            <select name="promoType"  v-model="promoTypeVal">
                                <option value="">请选择</option>
                                <option value="code">金蛋编号</option>
                                <option v-if="promoTypeList.length>0" v-for="item in promoTypeList" :value="item.code" v-text="item.name"></option>
                            </select>
                        </div>
                    </div>
                    <div class="box_input bonusCode" v-if="promoTypeVal==='code'">
                        <div class="box_input_in">
                            <label for="bonusCode" >金蛋编号</label>
                            <input id="bonusCode" type="text" @keyup="limitCode" v-model="bonusCode" :placeholder="'( '+noUseCode+' )个可用'" maxlength="4">
                        </div>
                    </div>
                    <div class="commitBox">
                        <p class="commitBtn" @click="toCharge(item.type,item.maxDepositAmount,(item.type===170 || item.type===171 || item.type===180)?100:(item.minDepositAmount < minDepositAmountConfig ? minDepositAmountConfig : item.minDepositAmount),(item.bankTypeId || null))" v-for="item in onlinePayDate[commit]" :value="item.type"><img :src="item.type===180?onlinePayIcon['flashPay']:onlinePayIcon[commit]"/><span class="payName" v-text="onlinePayName[item.type]"></span><b v-text="(item.type===170 || item.type===171 || item.type===180)?'100-'+item.maxDepositAmount:(item.minDepositAmount < minDepositAmountConfig ? minDepositAmountConfig : item.minDepositAmount)+'-'+item.maxDepositAmount" class="limitText"></b><i class="newType" v-if="false">新</i></p>
                    </div>
                </div>
                <div class="bankChargebar" v-if="bankChargeActive && !CashRechargeStatus">
                    <p class="step"><span class="active">1提交订单</span><span>2支付订单</span><span>3充值成功</span></p>
                    <p class="title">充值方式</p>
                    <p class="bankpayType"><span @click="addActive" v-for="(item,index) in bankType" :class="{'1':index===0,'3':index===2,'2':index===1,'active':index===0}"  v-if="index===0?netShow:index===1?atmShow:tableShow"><img :src="item"/><i></i></span></p>
                    <p class="title">收款银行</p>
                    <div class="bankList">
                        <span @click="addActiveBank" v-for="(item,index) in availBank[MethodNum]" :class="{'active':index===0,'174':item===174}"><img :src="bankListImg[item]"/></span>
                        <p class="tip" v-if="this.depositMethod===1 && elseBank">暂不支持您的网银同行转帐，稍后请务必使用跨行加急汇款。</p>
                    </div>
                    <div v-if="Atm" class="box_input">
                        <div class="box_input_in">
                            <label>ATM省份</label>
                            <select @change="getCity" v-model="provinceId" id="province">
                                <option value="choose">请选择</option>
                                <option v-for="item in provinceList" :value="item.id" v-text="item.name"></option>
                            </select>
                        </div>
                    </div>
                    <div v-if="Atm" class="box_input">
                        <div class="box_input_in">
                            <label>ATM城市</label>
                            <select @change="setCityId" v-model="cityId" id="city">
                                <option v-if="cityList.length===0" value="choose">请选择</option>
                                <option v-for="item in cityList" :value="item.id" v-text="item.name"></option>
                            </select>
                        </div>
                    </div>
                    <div v-if="netBank" class="box_input">
                        <div class="box_input_in">
                            <label for="realName" >网银姓名</label>
                            <input id="realName" type="text" @keyup="limitName" v-model="realName" placeholder="请输入您的网银姓名" maxlength="4">
                        </div>
                    </div>
                    <div v-if="tableBank" class="box_input">
                        <div class="box_input_in">
                            <label for="" >转账方式</label>
                            <select name="changeType" id="changeType" v-model="changeTypeVal">
                                <option value="1">银行卡</option>
                                <option value="2">现金</option>
                            </select>
                        </div>
                    </div>
                    <div v-if="tableBank && changeTypeVal==='1'" class="box_input">
                        <div class="box_input_in">
                            <label for="realName" >银行卡姓名</label>
                            <input id="realName" @keyup="limitName" type="text" v-model="realName" placeholder="请输入您的银行卡姓名" maxlength="4">
                        </div>
                    </div>
                    <div v-if="tableBank && changeTypeVal==='2'" class="box_input">
                        <div class="box_input_in">
                            <label for="remark" >转账编号</label>
                            <input id="remark" type="text" style="color:#f39700" v-model="remark" readonly>
                        </div>
                    </div>
                    <p v-if="tableBank && changeTypeVal==='2'" class="aliTip">*请将上述6码告诉银行柜员，并请他填写备注。</p>
                    <div class="box_input">
                        <div class="box_input_in">
                            <label for="amount" >充值金额</label>
                            <input id="amount" type="text" @keyup="limitAmount" @focus="enterAmount" v-model="amount" placeholder="请输入充值金额">
                        </div>
                    </div>
                    <div class="box_input">
                        <div class="box_input_in">
                            <label for="" >优惠类型</label>
                            <select name="promoType" class="promoType"  v-model="promoTypeVal">
                                <option value="">请选择</option>
                                <option value="code">金蛋编号</option>
                                <option v-if="promoTypeList.length>0" v-for="item in promoTypeList" :value="item.code" v-text="item.name"></option>
                            </select>
                        </div>
                    </div>
                    <div class="box_input bonusCode" v-if="promoTypeVal==='code'">
                        <div class="box_input_in">
                            <label for="bonusCode" >金蛋编号</label>
                            <input id="bonusCode" type="text" @keyup="limitCode" v-model="bonusCode" :placeholder="'( '+noUseCode+' )个可用'" minlength="4" maxlength="4">
                        </div>
                    </div>
                    <p class="commitBtn" @click="toDoBankCharge"><img class="tocommit" src="../assets/image/pages/saving/commitBtn.png"/></p>
                </div>
                <div class="CashRechargeStatus"  v-if="bankChargeActive && CashRechargeStatus">
                    <span v-if="CashRechargeStatus.inputData.depositMethod!==4 && CashRechargeStatus.inputData.depositMethod!==5 && CashRechargeStatus.inputData.depositMethod!==6" class="step"><img src="../assets/image/pages/saving/step2.png"/></span>
                    <p v-if="CashRechargeStatus.inputData.depositMethod!==4 && CashRechargeStatus.inputData.depositMethod!==5 && CashRechargeStatus.inputData.depositMethod!==6" class="title">订单详情</p>
                    <p v-if="CashRechargeStatus.inputData.depositMethod===4 || CashRechargeStatus.inputData.depositMethod===5 || CashRechargeStatus.inputData.depositMethod===6" class="title">存款信息</p>
                    <div class="detail">
                        <ul>
                            <li><span>申请单号</span><span v-text="CashRechargeStatus.proposalId"></span></li>
                            <li><span>存款金额</span><span v-if="CashRechargeStatus.inputData.depositMethod!==4 && CashRechargeStatus.inputData.depositMethod!==5 && CashRechargeStatus.inputData.depositMethod!==6" v-text="CashRechargeStatus.inputData.amount"></span><span class="change" v-if="CashRechargeStatus.inputData.depositMethod===4 || CashRechargeStatus.inputData.depositMethod===5 || CashRechargeStatus.inputData.depositMethod===6" v-text="CashRechargeStatus.result.changeAmount"></span>元</li>
                            <li v-if="CashRechargeStatus.inputData.depositMethod!==4 && CashRechargeStatus.inputData.depositMethod!==5 && CashRechargeStatus.inputData.depositMethod!==6"><span>转账方式</span><span v-text="CashRechargeStatus.inputData.depositMethod===1?'银行转账':CashRechargeStatus.inputData.depositMethod===2?'ATM':'银行柜台'"></span></li>
                            <li v-if="CashRechargeStatus.inputData.depositMethod===4"><span>转账方式</span><span><img src="../assets/image/pages/saving/aliToBankIcon.png"/>支付宝转银行卡</span></li>
                            <li v-if="CashRechargeStatus.inputData.depositMethod===5"><span>转账方式</span><span><img src="../assets/image/pages/saving/wechatToBankIcon.png"/>微信转银行卡</span></li>
                            <li v-if="CashRechargeStatus.inputData.depositMethod===6"><span>转账方式</span><span><img src="../assets/image/pages/saving/flashPayIcon.png"/>云闪付扫码</span></li>
                            <li v-if="CashRechargeStatus.inputData.depositMethod!==4 && CashRechargeStatus.inputData.depositMethod!==5 && CashRechargeStatus.inputData.depositMethod!==6"><span>申请时间</span><span v-text="CashRechargeStatus.result.createTime"></span></li>
                        </ul>
                        <div class="runTime">
                            <img src="../assets/image/pages/saving/runTime.png"/>
                            <p v-text="runTime"></p>
                            <span>等待中</span>
                        </div>
                    </div>
                    <p class="Tip" v-if="CashRechargeStatus.inputData.depositMethod!==4 && CashRechargeStatus.inputData.depositMethod!==5 && CashRechargeStatus.inputData.depositMethod!==6">*请指定时间内，依照上述方式，转账至以下银行卡。</p>
                    <p class="elseTip" v-if="CashRechargeStatus.inputData.depositMethod===4 || CashRechargeStatus.inputData.depositMethod===5">*以下银行卡号仅限本次有效，下次存款请重新获取！</p>
                    <p class="elseTip" v-if="CashRechargeStatus.inputData.depositMethod===6">*仅本次有效，下次存款请重新获取！</p>
                    <div class="resultBankCard" v-if="CashRechargeStatus.inputData.depositMethod!==6">
                        <img v-if="CashRechargeStatus.inputData.depositMethod!==4 && CashRechargeStatus.inputData.depositMethod!==5" class="cardBg" src="../assets/image/pages/saving/bankCardBg.png"/>
                        <img v-if="CashRechargeStatus.inputData.depositMethod===4" class="cardBg" src="../assets/image/pages/saving/bankCardBgforNew.png"/>
                        <img v-if="CashRechargeStatus.inputData.depositMethod===5" class="cardBg" src="../assets/image/pages/saving/bankCardBgforAli.png"/>
                        <img class="resultBand" :src="resultBankList[CashRechargeStatus.result.bankTypeId]"/>
                        <span class="name" v-text="CashRechargeStatus.result.cardOwner"></span>
                        <span class="provinceName" v-text="CashRechargeStatus.result.provinceName"></span>
                        <span class="point" v-text="CashRechargeStatus.result.openingPoint"></span>
                        <span class="cardNum" v-text="CashRechargeStatus.result.bankCardNo.slice(0,4)+' '+CashRechargeStatus.result.bankCardNo.slice(4,8)+' '+CashRechargeStatus.result.bankCardNo.slice(8,12)+' '+CashRechargeStatus.result.bankCardNo.slice(12,16)+' '+CashRechargeStatus.result.bankCardNo.slice(16,20)"></span>
                    </div>
                    <p v-if="CashRechargeStatus.inputData.depositMethod===6" class="QRCode"><img :src="CashRechargeStatus.result.codeAddress"></p>
                    <p v-if="CashRechargeStatus.inputData.depositMethod!==4 && CashRechargeStatus.inputData.depositMethod!==5 && CashRechargeStatus.inputData.depositMethod!==6" class="cancelBtn" @click="cancelOrder"><img src="../assets/image/pages/saving/cancelBtn.png"/></p>
                    <p v-if="CashRechargeStatus.inputData.depositMethod!==4 && CashRechargeStatus.inputData.depositMethod!==5 && CashRechargeStatus.inputData.depositMethod!==6" class="lastTip">*完成支付之后，请您不要点击取消，感谢配合！</p>
                    <p v-if="CashRechargeStatus.inputData.depositMethod===4 || CashRechargeStatus.inputData.depositMethod===5" class="copy"><button type="button" v-clipboard:copy="CashRechargeStatus.result.bankCardNo" v-clipboard:success="onCopy" v-clipboard:error="onCopyError">复制卡号</button><button type="button"v-clipboard:copy="CashRechargeStatus.result.cardOwner" v-clipboard:success="onCopy" v-clipboard:error="onCopyError">复制姓名</button></p>
                    <p class="changeTeach" v-if="CashRechargeStatus.inputData.depositMethod===4 || CashRechargeStatus.inputData.depositMethod===5 || CashRechargeStatus.inputData.depositMethod===6"><span @click="showTeach">不懂请点?</span> 或 <span  @click="customerService">联系客服</span></p>
                    <p v-if="CashRechargeStatus.inputData.depositMethod===4 || CashRechargeStatus.inputData.depositMethod===5 || CashRechargeStatus.inputData.depositMethod===6" class="btnBox">
                        <img @click="areadyfinsh" src="../assets/image/pages/saving/alreadyChange.png"/>
                        <img @click="cancelOrder" src="../assets/image/pages/saving/cancelOrder.png"/>
                    </p>
                </div>
            </main>
        </div>
        <div v-if="needName && !wechatList" class="fitNameWin">
            <p class="title">支付宝信息</p>
            <img @click="closeAliMessage" class="closeBtn" src="../assets/image/components/tipWindow/tipWinCloseBtn.png"/>
            <div class="box_input">
                <div class="box_input_in">
                    <label>支付宝姓名</label>
                    <input type="text" v-model="alipayName" placeholder="输入支付宝真实姓名/昵称">
                </div>
            </div>
            <p class="aliTipi">若使用他人支付宝请填写支付宝真实姓名</p>
            <p class="commitBtn" @click="commitAli"><img class="tocommit" src="../assets/image/pages/saving/commitBtn.png"/></p>
        </div>
        <div v-if="wechatList" class="wetchatList">
            <p class="title">微信转账详情</p>
            <img @click="closeWechatList" class="closeBtn" src="../assets/image/components/tipWindow/tipWinCloseBtn.png"/>
            <div class="content">
                <p class="wetchatTip">向个人用户<b v-text="(wechatData.nickname || '')+'(**'+wechatData.name.slice(wechatData.name.length-1,wechatData.name.length)+')'"></b>转账</p>
                <p class="QRCode"><img :src="wechatData.weChatQRCode"></p>
                <p class="cancelBtn" @click="cancelWechat(proposalId)"><img src="../assets/image/pages/saving/cancelBtn.png"/></p>
                <p class="text">转账金额：<span v-text="wechatData.amount"></span></p>
                <p class="text">微信转账请输入：<span v-text="this.$store.state.userName"></span></p>
                <div class="textArea">
                    <p class="textTitle">充值流程</p>
                    <p>1.请在<b v-text="this.runTime"></b>内打开微信（扫一扫）扫描上方二维码 <b>(注意：不支持重复扫描转账，再次存款请重复提交）</b></p>
                    <p>2.付款金额请填写：<b v-text="wechatData.amount+'元。'"></b></p>
                    <p>3.请在<i>（添加备注）</i>填写：<b v-text="this.$store.state.userName"></b>（游戏账号是核实存款唯一凭证，请务必填写）</p>
                    <p>4.<b>完成支付之后，请您不要点击取消，感谢配合！</b></p>
                    <p>5.付款后金额将在<b>5-10分钟</b>内自动添加至会员账号。</p>
                </div>
                <p v-if="changeTeach==='android'" class="teach">
                    <img src="../assets/image/pages/saving/androidTeach.png"/>
                    <span class="amount" v-text="wechatData.amount"></span>
                    <span class="username" v-text="this.$store.state.userName"></span>
                </p>
                <p v-if="changeTeach!=='android'" class="teach">
                    <img src="../assets/image/pages/saving/iosTeach.png"/>
                    <span class="amount" v-text="wechatData.amount"></span>
                    <span class="username" v-text="this.$store.state.userName"></span>
                </p>
                <p class="changeTeach">
                    <span @click="changeT" class="android active">安卓版</span>
                    <span @click="changeT" class="ios">苹果版</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import PageTop from '../components/PageTop';
export default {
  data() {
    return {
      title: '存款',
      levelImg:[
        require("../assets/image/pages/home/headImageLv1.png"),
        require("../assets/image/pages/home/headImageLv2.png"),
        require("../assets/image/pages/home/headImageLv3.png"),
        require("../assets/image/pages/home/headImageLv4.png"),
        require("../assets/image/pages/home/headImageLv5.png")
      ],
      fastAmount:[100,500,1000,2000,5000],
      onlineActive:true,
      bankChargeActive:false,
      amount:null,
      onlinePayName:{
        1: '网银支付',
        2: '微信扫码',
        3: '支付宝扫码',
        4: '微信App',
        5: '支付宝App',
        6: '快捷支付',
        7: 'QQ扫码',
        8: '银联扫码',
        9: '京东扫码',
        10: '微信App',
        11: '支付宝Wap',
        12: 'QQApp',
        13: '点卡',
        14: '京东App',
        98: '转微信',
        99: '转支付宝',
        170: '转银行卡',
        171: '转银行卡',
        180: '云闪付扫码',
      },
      onlinePayIcon:{
        'fastPay':require("../assets/image/pages/saving/btnFastPayN.png"),
        'aliPay':require("../assets/image/pages/saving/btnAliPayN.png"),
        'wechatPay':require("../assets/image/pages/saving/btnWechatPayN.png"),
        'qqPay':require("../assets/image/pages/saving/btnqqPayN.png"),
        'ylPay':require("../assets/image/pages/saving/btnYLPayN.png"),
        'jdPay':require("../assets/image/pages/saving/btnjdPayN.png"),
        'flashPay':require("../assets/image/pages/saving/btnFlashPayN.png"),
      },
      onlinePayDate:{
        'fastPay':[],
        'aliPay':[],
        'wechatPay':[],
        'qqPay':[],
        'ylPay':[],
        'jdPay':[],
      },
      typeImg:{
        'fastPay':[{icon:require("../assets/image/pages/saving/btnFastPay.png"),show:false,type:'6'}],
        'aliValid':[{icon:require("../assets/image/pages/saving/btnAliPayAtA.png"),show:false,type:'AliToAli'},{icon:require("../assets/image/pages/saving/btnAliPayAtB.png"),show:true,type:'AliToBank'}],
        'wechatValid':[{icon:require("../assets/image/pages/saving/btnWechatPay.png"),show:false,type:'wechat'},{icon:require("../assets/image/pages/saving/btnWechatPayBank.png"),show:true,type:'wechatBank'}],
        'qqPay':[{icon:require("../assets/image/pages/saving/btnqqPay.png"),show:false,type:'7'},{icon:require("../assets/image/pages/saving/btnqqPayQtA.png"),show:false,type:'12'}],
        'ylPay':[{icon:require("../assets/image/pages/saving/btnYLPay.png"),show:false,type:'8'}],
        'jdPay':[{icon:require("../assets/image/pages/saving/btnjdPayScan.png"),show:false,type:'9'},{icon:require("../assets/image/pages/saving/btnjdPay.png"),show:false,type:'14'}]
    },
      bankType:[
        require("../assets/image/pages/saving/banknet.png"),
        require("../assets/image/pages/saving/atm.png"),
        require("../assets/image/pages/saving/bankTable.png"),
      ],
      bankListImg: {
        '1':require("../assets/image/pages/saving/banktypeId1.png"),
        '2':require("../assets/image/pages/saving/banktypeId2.png"),
        '3':require("../assets/image/pages/saving/banktypeId3.png"),
        '4':require("../assets/image/pages/saving/banktypeId4.png"),
        '5':require("../assets/image/pages/saving/banktypeId5.png"),
        '6':require("../assets/image/pages/saving/banktypeId6.png"),
        '7':require("../assets/image/pages/saving/banktypeId7.png"),
        '9':require("../assets/image/pages/saving/banktypeId9.png"),
        '10':require("../assets/image/pages/saving/banktypeId10.png"),
        '11':require("../assets/image/pages/saving/banktypeId11.png"),
        '12':require("../assets/image/pages/saving/banktypeId12.png"),
        '13':require("../assets/image/pages/saving/banktypeId13.png"),
        '161':require("../assets/image/pages/saving/banktypeId161.png"),
        '169':require("../assets/image/pages/saving/banktypeId169.png"),
        '174':require("../assets/image/pages/saving/elseBank.png"),
    },
      resultBankList:{
        '1':require("../assets/image/components/public/bank1.png"),
        '2':require("../assets/image/components/public/bank2.png"),
        '3':require("../assets/image/components/public/bank3.png"),
        '4':require("../assets/image/components/public/bank4.png"),
        '5':require("../assets/image/components/public/bank5.png"),
        '6':require("../assets/image/components/public/bank6.png"),
        '7':require("../assets/image/components/public/bank7.png"),
        '9':require("../assets/image/components/public/bank9.png"),
        '10':require("../assets/image/components/public/bank10.png"),
        '11':require("../assets/image/components/public/bank11.png"),
        '12':require("../assets/image/components/public/bank12.png"),
        '13':require("../assets/image/components/public/bank13.png"),
        '161':require("../assets/image/components/public/bank161.png"),
        '169':require("../assets/image/components/public/bank169.png"),
      },
      availBank:[],
      bonusCode:(!this.$route.params.promoSend && this.$route.params.code)?this.$route.params.code: '',
      noUseCode:0,
      aliValid:false,
      aliMax:0,
      aliMin:0,
      wechatValid:false,
      wechatMax:0,
      wechatMin:0,
      fastPay:false,
      fastMax:0,
      fastMin:0,
      qqPay:false,
      qqMax:0,
      qqMin:0,
      jdPay:false,
      jdMax:0,
      jdMin:0,
      ylPay:false,
      ylMax:0,
      ylMin:0,
      commit:0,
      aliEnter:false,
      alipayName:'',
      aliRealName:'',
      realName:'',
      limit:null,
      Atm:false,
      netBank:true,
      tableBank:false,
      provinceList:null,
      provinceId:'choose',
      cityList:[],
      cityId:'choose',
      remark:all.tool.getStore('playerId'),
      changeTypeVal:'1',
      depositMethod:2,
      bankTypeId:null,
      bankChargeData:{},
      CashRechargeStatus:null,
      runTime:null,
      Interval:null,
      elseBank:false,
      needName:false,
      wechatList:false,
      wechatData:null,
      changeTeach:'android',
      proposalId:null,
      promoTypeVal:(!this.$route.params.promoSend && this.$route.params.code)?'code':this.$route.params.promoSend?this.$route.params.code:'',
      promoTypeList:[],
      MethodNum:1,
      ToCommit:true,
      onlineAonc:true,
      lastBankName1:'',
      lastBankName3:'',
      netShow:true,
      atmShow:true,
      tableShow:true
    }
  },
  components: {
    PageTop,
  },
  methods: {
    goToHome () {this.$router.push('/')},
    onCopy(e){
        all.tool.TipWinShow('成功复制：'+e.text,[{name:'确定'}]);
    },
    showTeach(){
        if(this.CashRechargeStatus.inputData.depositMethod===4){
            all.tool.TipWinShow(null,{type:'teachTip',depositMethod:this.CashRechargeStatus.inputData.depositMethod},'支付宝转银行卡教学');
        }
        if(this.CashRechargeStatus.inputData.depositMethod===5){
            all.tool.TipWinShow(null,{type:'teachTip',depositMethod:this.CashRechargeStatus.inputData.depositMethod},'微信转银行卡教学');
        }
      if(this.CashRechargeStatus.inputData.depositMethod===6){
        all.tool.TipWinShow(null,{type:'teachTip',depositMethod:this.CashRechargeStatus.inputData.depositMethod},'云闪付扫码教学');
      }
    },
    customerService(){
      all.tool.openOnlineCustomer(all.store.state.live800,false);
      all.tool.clickCount({page:'存款页面',btn:'在线客服'})
    },
    limitAmount(){
      this.amount=this.amount.match(/[0-9]*/i)[0]
    },
    limitName(){
      this.realName=this.realName.match(/[\u4E00-\u9FA5]*/i)[0]
    },
    limitCode(){
      this.bonusCode=this.bonusCode.match(/[0-9]*/i)[0]
    },
    areadyfinsh(){
      all.tool.send('getCashRechargeStatus').then(result=>{
        if(result.data){
          all.tool.TipWinShow('您的存款暂未到账，请稍等！',[{name:'确定'}]);
        }else{
          all.tool.TipWinShow('您的存款已成功到账，请查收！',[{name:'前往游戏',callback:()=>{
            all.router.push({path:'/game',query:{page:47}});
            all.tool.setBalance();
          }}]);
        }
      }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
    },
    onCopyError(e){
        all.tool.TipWinShow('复制失败',[{name:'确定'}]);
    },
    changeT(e){
          all.$(e.target).addClass('active').siblings().removeClass('active');
      if(this.changeTeach==='android'){
          this.changeTeach='ios'
      }else {
          this.changeTeach='android'
      }
    },
    OnlineA(){
        this.onlineActive=true;
        this.bankChargeActive=false;
        if(this.onlineAonce)this.getDate();
        this.onlineAonce=false;
        all.$('.fastChoose span').removeClass('active');
    },
    bankChargeA(){
        this.onlineActive=false;
        this.bankChargeActive=true;
        this.getBankDate();
        all.$('.fastChoose span').removeClass('active');
    },
    addActiveBank(e){
        let elem;
        if(all.$(e.target)[0].nodeName==='IMG')elem=all.$(e.target).parent();
        if(all.$(e.target)[0].nodeName==='SPAN')elem=all.$(e.target);
        elem.addClass('active').siblings().removeClass('active');
        if (elem[0].classList[0]==='174') {
          this.bankTypeId='174';
          this.elseBank=true
        } else {
          this.bankTypeId=this.availBank[this.MethodNum][elem.index()];
          this.elseBank=false
        }
    },
    closeAliMessage(){
      this.needName=false;
      this.alipayName='';
      this.aliRealName='';
    },
    closeWechatList(){
      this.wechatList=false
    },
    cancelWechat(proposalId){
      all.tool.TipWinShow('您确定要取消申请吗？',[{name:'取消'},{name:'确定',callback:()=>{
        all.tool.send('cancelWechatTopup',{proposalId:proposalId}).then(result=>{
          all.tool.TipWinShow('取消成功',[{name:'确定',callback:()=>{
            this.wechatList=false;
            this.OnlineA();
          }}]);
        }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
      }}]);
    },

    /* 提交支付宝支付 */ 
    commitAli(){
        if(this.alipayName.length<1){
            all.tool.TipWinShow('请填写支付宝昵称',[{name:'确定'}]);
            return
        }
        if(this.ToCommit){
            this.ToCommit=false;
            all.tool.send('requestAlipayTopup',
              {
                amount:Number(this.amount),
                bonusCode:this.promoTypeVal==='code'?this.bonusCode:'',
                topUpReturnCode:this.promoTypeVal==='code'?'':this.promoTypeVal,
                clientType:2,
                merchantUseType:1,
                realName:this.aliRealName,
                alipayName:this.alipayName,
                // bPMSGroup: true
              }).then(result=>{
                this.ToCommit = true;
                this.$store.commit('setAlipayOrder', result);
                this.$router.push('/alipay');
                // if (all.tool.clientIos()){
                //   all.tool.TipWinShow('支付金额'+result.data.result.amount+'元',[{name:"取消",callback:()=>{
                //     all.tool.send('cancelAlipayTopup',{proposalId:result.data.proposalId}).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
                //   }},{name:'确定',callback:()=>{
                //     window.open(result.data.result.qrcodeAddress);
                //   }}]);
                // } else {
                //   all.tool.TipWinShow('支付金额'+result.data.result.amount+'元',[{name:"取消",callback:()=>{
                //     all.tool.send('cancelAlipayTopup',{proposalId:result.data.proposalId}).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
                //   }},{name:'确定',callback:()=>{
                //     window.open(result.data.result.qrcodeAddress);
                //   }}])
                // }
                this.needName=false;
            }).catch(err => {
                all.tool.TipWinShow(err.errorMessage,[{name:'确定', callback:() => {
                      this.needName = false;
                      this.OnlineA();
                    }
                }]);
              this.ToCommit=true
            });
        }
    },

    /* 提交订单 */ 
    toCharge(type,max,min,banktypeid){
      if(all.tool.isCommitForm() && this.ToCommit){
          let amount=Number(this.amount);
          let topupType=type;
          if(amount<min){
              all.tool.TipWinShow('存款金额不能小于'+min+'元',[{name:'确定'}]);
              return
          }
          if(amount>max){
              all.tool.TipWinShow('存款金额不能大于'+max+'元',[{name:'确定'}]);
              return
          }
        all.tool.clickCount({page:'存款页面',btn:all.$('select').find('option:selected').text()});
          if(topupType===99){
              all.tool.send('getAlipayTopupRequestList').then(result=>{
                  if(result.data){
                      all.tool.TipWinShow('一次只能提交一笔订单！您上一笔存款'+result.data.data.amount+'元尚未添加是否中断上一笔交易并重新申请？',[{name:'返回',callback:()=>{
                          this.$router.push('/');
                      }},{name:'前往查看',callback:()=>{
                          // if (all.tool.clientIos()){
                          //   window.open(result.data.data.qrcodeAddress);
                          // } else {
                          //     window.open(result.data.data.qrcodeAddress);
                          // }
                          this.$router.push('/alipay');
                      }}]);
                  }else {
                      this.needName=true;
                  }
              }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
              return
          }
          if(topupType===170){
            this.ToCommit=false;
              all.tool.send('getCashRechargeStatus').then(result=>{
                  if(result.data){
                    this.ToCommit=true;
                      all.tool.TipWinShow('一次只能提交一笔订单！您上一笔存款'+(result.data.result.changeAmount || result.data.inputData.amount)+'元尚未添加是否中断上一笔交易并重新申请？',[{name:'返回', callback:()=>{
                        // this.cancelOrder()
                        this.$router.push('/');
                      }},{name:'前往查看',callback:()=>{
                          this.bankChargeA();
                      }}]);
                  }else{
                      all.tool.send('requestManualTopup',{amount:amount,bonusCode:this.promoTypeVal==='code'?this.bonusCode:'',topUpReturnCode:this.promoTypeVal==='code'?'':this.promoTypeVal,bPMSGroup:true,depositMethod:4}).then(result=>{
                          this.ToCommit=true;
                          this.CashRechargeStatus=result.data;
                          // all.tool.TipWinShow(null,{type:'ChangeTip',data:{amount:result.data.result.changeAmount,id:result.data.proposalId}},'温馨提示',[{name:'取消',callback:()=>{
                          //   this.cancelOrder()
                          // }},{name:'支付',callback:()=>{
                          //     this.bankChargeA()
                          // }}],this.cancelOrder);
                          all.tool.TipWinShow(null,{type:'ChangeTip',data:{amount:result.data.result.changeAmount,id:result.data.proposalId}},'温馨提示',[{name:'支付',callback:()=>{
                              this.bankChargeA()
                          }}]);
                      }).catch(err => {
                          all.tool.TipWinShow(err.errorMessage, [{name: '确定', callback: () => {
                              this.OnlineA();
                          }}]);
                          this.ToCommit = true;
                      });
                  }
              }).catch(err=>{all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]);this.ToCommit=true});
              return
          }
          if(topupType===98){
            this.ToCommit=false;
              all.tool.send('getWechatTopupRequestList').then(result=>{
                  if(result.data){
                    this.ToCommit=true;
                      all.tool.TipWinShow('一次只能提交一笔订单！您上一笔存款'+result.data.data.amount+'元尚未添加是否中断上一笔交易并重新申请？',[{name:'重新申请',callback:()=>{
                          all.tool.send('cancelWechatTopup',{proposalId:result.data.data.proposalId}).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
                      }},{name:'前往查看',callback:()=>{
                          this.wechatData=result.data.data;
                          this.wechatList=true;
                          this.proposalId=result.data.proposalId;
                          this.ToCount(result.data.restTime,true)
                      }}]);
                  } else {
                      all.tool.send('requestWechatTopup', {
                                amount:amount,
                                bonusCode:this.promoTypeVal==='code'?this.bonusCode:'',
                                topUpReturnCode:this.promoTypeVal==='code'?'':this.promoTypeVal,
                                clientType:2,
                                merchantUseType:1,
                                notUseQR:true,
                                // bPMSGroup: true
                            }).then(result=>{
                                this.ToCommit=true;
                                this.wechatData=result.data.result;
                                this.wechatList=true;
                                this.proposalId=result.data.proposalId;
                                this.ToCount(result.data.restTime,true);
                          }).catch(err => {
                                all.tool.TipWinShow(err.errorMessage, [{name:'确定', callback:() => {
                                    this.OnlineA();
                                }}]);
                                this.ToCommit = true
                          });
                  }
              }).catch(err=>{all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]);this.ToCommit=true});
              return
          }
          if(topupType===171){
            this.ToCommit=false;
              all.tool.send('getCashRechargeStatus').then(result=>{
                  if(result.data){
                    this.ToCommit=true;
                      all.tool.TipWinShow('一次只能提交一笔订单！您上一笔存款'+(result.data.result.changeAmount || result.data.inputData.amount)+'元尚未添加是否中断上一笔交易并重新申请？',[{name:'重新申请',callback:()=>{
                        this.cancelOrder()
                      }},{name:'前往查看',callback:()=>{
                          this.bankChargeA();
                      }}]);
                  }else{
                      all.tool.send('requestManualTopup',{amount:amount,bonusCode:this.promoTypeVal==='code'?this.bonusCode:'',topUpReturnCode:this.promoTypeVal==='code'?'':this.promoTypeVal,depositMethod:5,bPMSGroup:true}).then(result=>{
                          this.ToCommit=true;
                          this.CashRechargeStatus=result.data;
                          // all.tool.TipWinShow(null,{type:'ChangeTip',data:{amount:result.data.result.changeAmount,id:result.data.proposalId}},'温馨提示',[{name:'取消',callback:()=>{
                          //   this.cancelOrder()
                          // }},{name:'支付',callback:()=>{
                          //     this.bankChargeA()
                          // }}],this.cancelOrder);
                          all.tool.TipWinShow(null,{type:'ChangeTip',data:{amount:result.data.result.changeAmount,id:result.data.proposalId}},'温馨提示',[{name:'支付',callback:()=>{
                              this.bankChargeA();
                          }}]);
                      }).catch(err => {
                          all.tool.TipWinShow(err.errorMessage, [{name: '确定', callback: () => {
                              this.OnlineA();
                          }}]);
                          this.ToCommit = true;
                      });
                  }
              }).catch(err=>{all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]);this.ToCommit=true});
              return
          }
        if(topupType===180){
          this.ToCommit=false;
          all.tool.send('getCashRechargeStatus').then(result=>{
            if(result.data){
              this.ToCommit=true;
              all.tool.TipWinShow('一次只能提交一笔订单！您上一笔存款'+(result.data.result.changeAmount || result.data.inputData.amount)+'元尚未添加是否中断上一笔交易并重新申请？',[{name:'重新申请',callback:()=>{this.cancelOrder()}},{name:'前往查看',callback:()=>{this.bankChargeA()}}]);
            }else{
              all.tool.send('requestManualTopup',{amount:amount,bonusCode:this.promoTypeVal==='code'?this.bonusCode:'',topUpReturnCode:this.promoTypeVal==='code'?'':this.promoTypeVal,depositMethod:6,bPMSGroup:true,bankTypeId:banktypeid}).then(result=>{
                this.ToCommit=true;
                this.CashRechargeStatus=result.data;
                // all.tool.TipWinShow(null,{type:'ChangeTip',data:{amount:result.data.result.changeAmount,id:result.data.proposalId}},'温馨提示',[{name:'取消',callback:()=>{
                //   this.cancelOrder()
                // }},{name:'支付',callback:()=>{
                //   this.bankChargeA()
                // }}],this.cancelOrder);
                all.tool.TipWinShow(null,{type:'ChangeTip',data:{amount:result.data.result.changeAmount,id:result.data.proposalId}},'温馨提示',[{name:'支付',callback:()=>{
                    this.bankChargeA();
                }}]);
              }).catch(err => {
                  all.tool.TipWinShow(err.errorMessage, [{name: '确定', callback: () => {
                      this.OnlineA();
                  }}]);
                  this.ToCommit=true
              });
            }
          }).catch(err=>{all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]);this.ToCommit=true});
          return
        }
          this.ToCommit=false;
          all.tool.send('createOnlineTopupProposal',
            {
              amount:amount,
              bonusCode:this.promoTypeVal==='code'?this.bonusCode:'',
              topUpReturnCode:this.promoTypeVal==='code'?'':this.promoTypeVal,
              clientType:all.tool.isApp()?4:2,
              // clientType: 4,
              merchantUseType:1,
              topupType:topupType,
              // bPMSGroup: true
            }).then(result=>{
              this.ToCommit=true;
              all.tool.TipWinShow('支付金额'+amount+'元',[{name:"取消"},{name:'确定',callback:()=>{
                // if(result.data.topupType===4){
                  // window.open('weixin://?appid='+result.data.topupDetail.appId+'&mchid='+result.data.topupDetail.mchId+'&prepayid='+result.data.topupDetail.prepayId+'&apikey='+result.data.topupDetail.apiKey);
                // }else {
                  window.open(result.data.topupDetail.paymentURL);
                // }
              }}]);
          }).catch(err => {
              all.tool.TipWinShow(err.errorMessage, [{name: '确定', callback: () => {
                  this.OnlineA();
              }}]); 
              this.ToCommit = true;
          });
      }
    },
    ToCount(time,hasHours){
      let countTime=time;
      if(this.Interval){
        clearInterval(this.Interval);
        this.Interval=null;
      }
      this.Interval=setInterval(()=>{
        let h=Math.floor(countTime/3600)<10?'0'+Math.floor(countTime/3600):Math.floor(countTime/3600);
        let m=Math.floor(countTime/60)<10?'0'+Math.floor(countTime/60):Math.floor(countTime/60);
        let s=countTime%60<10?'0'+countTime%60:countTime%60;
        let showTime;
        if(!hasHours)showTime=h+':'+m+':'+s;
        if(hasHours)showTime=m+':'+s;
        this.runTime=showTime;
        countTime--;
        if(countTime===0){
          this.runTime='已超时';
          clearInterval(this.Interval);
          this.Interval=null;
          if(this.CashRechargeStatus.inputData.depositMethod===4 || this.CashRechargeStatus.inputData.depositMethod===5 || this.CashRechargeStatus.inputData.depositMethod===6){
              this.OnlineA()
          }else {
              this.bankChargeA()
          }
          this.CashRechargeStatus=null
        }
      },1000);
    },
    addActive(e){
      all.$(e.target).parent().addClass('active').siblings().removeClass('active');
      if(all.$(e.target).parent()[0].classList[0]==='1'){
        all.tool.clickCount({page:'银行卡充值',btn:'网银转账'});
        this.netBank=true;this.Atm=false;this.tableBank=false;
        this.depositMethod=1;
        this.realName=this.lastBankName1;
        all.$('.bankList span:first-child').addClass('active').siblings().removeClass('active');
        this.MethodNum=0;
        this.bankTypeId=this.availBank[this.MethodNum][0];
      }
      if(all.$(e.target).parent()[0].classList[0]==='2'){
        all.tool.clickCount({page:'银行卡充值',btn:'ATM'});
        this.netBank=false;this.Atm=true;this.tableBank=false;
        this.depositMethod=2;
        this.elseBank=false;
        all.$('.bankList span:first-child').addClass('active').siblings().removeClass('active');
        this.MethodNum=1;
        this.bankTypeId=this.availBank[this.MethodNum][0];
      }
      if(all.$(e.target).parent()[0].classList[0]==='3'){
        all.tool.clickCount({page:'银行卡充值',btn:'银行柜台'});
        this.netBank=false;this.Atm=false;this.tableBank=true;
        this.depositMethod=3;
        this.realName=this.lastBankName3;
        this.elseBank=false;
        all.$('.bankList span:first-child').addClass('active').siblings().removeClass('active');
        this.MethodNum=2;
        this.bankTypeId=this.availBank[this.MethodNum][0];
      }
    },
    getCity(){
      if(this.provinceId!=='choose'){
        all.tool.send('getCityList',{provinceId:this.provinceId}).then(result=>{this.cityList=result.data;this.cityId=result.data[0].id}).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
      }
    },
    setCityId(e){
      if(this.cityId!=='choose'){
        this.cityId=all.$(e.target)[0].value
      }
    },
    /* 获取手工信息 */
    getBankDate(){
      all.tool.send('getCashRechargeStatus').then(result=>{
        if(result.data){
          this.CashRechargeStatus=result.data;
          this.ToCount(result.data.restTime)
        }else {
          this.CashRechargeStatus=null;
          all.tool.send('getProvinceList').then(result=>this.provinceList=result.data).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
          all.tool.send('requestBankTypeByUserName',{clientType:2,merchantUse:2}).then(result=>{
            // 当禁用手工存款时，data为空数组  以及没有可用卡的时候
            if (!result.data || result.data.length === 0 || result.data.data.length === 0) {
              all.tool.TipWinShow('无可用银行卡，请联系客服或尝试其它充值方式',[{name:'确定',callback:()=>{
                this.OnlineA();
              }}]);
              return;
            };
            this.availBank=[[],[],[],[],[]];
            result.data.data.map(item=>{
              // 网银
              if(item.depositMethod == 1){
                this.lastBankName1=item.lastOnlineBankingName;
                item.data.map(type=>{
                  if(type.status == 1){
                    this.availBank[0].push(type.id)
                  }
                })
              }
              // ATM
              if(item.depositMethod == 2){
                if(item.lastDepositProviceId !== '' && item.lastDepositProviceId !== 'choose'){
                  this.provinceId=item.lastDepositProviceId;
                  all.tool.send('getCityList',{provinceId:this.provinceId}).then(result=>{this.cityList=result.data;this.cityId=result.data[0].id}).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
                }
                this.cityId=item.lastDepositCityId;
                item.data.map(type=>{
                  if(type.status == 1){
                    this.availBank[1].push(type.id)
                  }
                })
              }
              // 柜台
              if(item.depositMethod == 3){
                this.lastBankName3=item.lastDepositorName;
                item.data.map(type=>{
                  if(type.status == 1){
                    this.availBank[2].push(type.id)
                  }
                })
              }
              // 支付宝
              if(item.depositMethod == 4){
                item.data.map(type=>{
                  if(type.status == 1){
                    this.availBank[3].push(type.id)
                  }
                })
              }
              // 云闪付
              if(item.depositMethod == 5){
                item.data.map(type=>{
                  if(type.status == 1){
                    this.availBank[4].push(type.id)
                  }
                })
              }
            });
              this.bankTypeId=this.availBank[0][0];
              this.depositMethod=1;
              this.realName=this.lastBankName1;
              all.$('.bankList span:first-child').addClass('active').siblings().removeClass('active');
              this.MethodNum=0;
              if(this.availBank[0].length===0)this.netShow=false;
              if(this.availBank[1].length===0)this.atmShow=false;
              if(this.availBank[2].length===0)this.tableShow=false;
              if (!this.netShow && !this.atmShow && !this.tableShow) {
                all.tool.TipWinShow('无可用银行卡，请联系客服或尝试其它充值方式',[{name:'确定',callback:()=>{
                  this.OnlineA();
                }}]);
                return;
              }
          }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
        }
      }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
    },
    getDate(){
      this.onlinePayDate={'fastPay':[],'aliPay':[],'wechatPay':[],'qqPay':[],'ylPay':[],'jdPay':[]};
      this.amount=null;
      this.fastPay=false;
      this.aliValid=false;
      this.wechatValid=false;
      this.qqPay=false;
      this.jdPay=false;
      this.ylPay=false;
      all.tool.send('getPromoCode',{playerId:all.tool.getStore('playerId')}).then(result=>this.noUseCode=result.data.noUseList.length).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));

      /* 个人支付宝状态 */ 
      all.tool.send('getPlayerAliPayStatus').then(result=>{
          if(result.data.valid){
            result.data.type=99;
            this.onlinePayDate['aliPay'].push(result.data);
            if(result.data.maxDepositAmount>this.aliMax)this.aliMax=result.data.maxDepositAmount;
            // if(this.aliMin===0) this.aliMin=10;
            // if(10<this.aliMin) this.aliMin=10;
          }
          this.setConfig();
      }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));

      /* 个人微信状态 */ 
      all.tool.send('getPlayerWechatPayStatus').then(result=>{
        if(result.data.valid){
          result.data.type=98;
          this.onlinePayDate['wechatPay'].push(result.data);
          if(result.data.maxDepositAmount>this.wechatMax)this.wechatMax=result.data.maxDepositAmount;
          // if(this.wechatMin===0)this.wechatMin=10;
          // if(10<this.wechatMin)this.wechatMin=10;
        }
        this.setConfig();
      }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));

      /* 手工充值状态 */ 
      all.tool.send('requestBankTypeByUserName',{clientType:2,merchantUse:2}).then(result => {
        if (!result.data || result.data.length === 0 || result.data.data.length === 0) return;
        result.data.data.map(autoitem=>{
          if(autoitem.depositMethod==='5' && autoitem.data.length>0){
            this.onlinePayDate['wechatPay'].push({minDepositAmount:100,maxDepositAmount:10000,status:1,type:171});
            if(10000>this.wechatMax)this.wechatMax=10000;
            // if(this.wechatMin===0)this.wechatMin=100;
            // if(100<this.wechatMin)this.wechatMin=100;
          }
          if(autoitem.depositMethod==='4' && autoitem.data.length>0){
            this.onlinePayDate['aliPay'].push({minDepositAmount:100,maxDepositAmount:10000,status:1,type:170});
            if(10000>this.aliMax)this.aliMax=10000;
            // if(this.aliMin===0)this.aliMin=100;
            // if(100<this.aliMin)this.aliMin=100;
          }
          if(autoitem.depositMethod==='6' && autoitem.data.length>0){
            let status=false;
            autoitem.data.map(showItem=>{
              if(showItem.status==='1' && !status){
                this.onlinePayDate['ylPay'].push({minDepositAmount:100,maxDepositAmount:10000,status:1,type:180,bankTypeId:showItem.bankTypeId});
                if(10000>this.ylMax)this.ylMax=10000;
                // if(this.ylMin===0)this.ylMin=100;
                // if(100<this.ylMin)this.ylMin=100;
                status=true
              }
            });
          }
        });
        this.setConfig();
      }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));

      /* 在线充值状态  */ 
      all.tool.send('getOnlineTopupType',{
        clientType: all.tool.isApp()?4:2,
        // clientType: 4,
        merchantUse: 1,
        // bPMSGroup: true
      }).then(result=>{
        result.data.map(item=>{
            if(item.status===1){
                if(item.type===1 || item.type===6){
                  this.onlinePayDate['fastPay'].push(item);
                  if (item.maxDepositAmount > this.fastMax) this.fastMax = item.maxDepositAmount;
                  // if(this.fastMin===0) this.fastMin = item.minDepositAmount;
                  // if(item.minDepositAmount < this.fastMin) this.fastMin = item.minDepositAmount;
                }
                if(item.type===3 || item.type===5 || item.type===11){
                  this.onlinePayDate['aliPay'].push(item);
                  if (item.maxDepositAmount > this.aliMax) this.aliMax = item.maxDepositAmount;
                  // if (this.aliMin === 0) this.aliMin = item.minDepositAmount;
                  // if (item.minDepositAmount<this.aliMin)this.aliMin=item.minDepositAmount;
                }
                if(item.type===2 || item.type===4 || item.type===10){
                  this.onlinePayDate['wechatPay'].push(item);
                  if (item.maxDepositAmount > this.wechatMax) this.wechatMax = item.maxDepositAmount;
                  // if (this.wechatMin===0)this.wechatMin=item.minDepositAmount;
                  // if (item.minDepositAmount<this.wechatMin)this.wechatMin=item.minDepositAmount;
                }
                if(item.type===7 || item.type===12){
                  this.onlinePayDate['qqPay'].push(item);
                  if (item.maxDepositAmount>this.qqMax)this.qqMax=item.maxDepositAmount;
                  // if (this.qqMin===0)this.qqMin=item.minDepositAmount;
                  // if (item.maxDepositAmount<this.qqMin)this.qqMin=item.minDepositAmount;
                }
                if(item.type===9 || item.type===14){
                  this.onlinePayDate['jdPay'].push(item);
                  if (item.maxDepositAmount>this.jdMax)this.jdMax=item.maxDepositAmount;
                  // if (this.jdMin===0)this.jdMin=item.minDepositAmount;
                  // if (item.minDepositAmount<this.jdMin)this.jdMin=item.minDepositAmount;
                }
                if(item.type===8){
                  this.onlinePayDate['ylPay'].push(item);
                  if (item.maxDepositAmount>this.ylMax)this.ylMax=item.maxDepositAmount;
                  // if (this.ylMin===0)this.ylMin=item.minDepositAmount;
                  // if (item.minDepositAmount<this.ylMin)this.ylMin=item.minDepositAmount;
                }
            }
        });
        
        // setTimeout(()=>{
        //   if(this.onlinePayDate['fastPay'].length>0){this.fastPay=true}
        //   if(this.onlinePayDate['aliPay'].length>0){this.aliValid=true}
        //   if(this.onlinePayDate['wechatPay'].length>0){this.wechatValid=true}
        //   if(this.onlinePayDate['qqPay'].length>0){this.qqPay=true}
        //   if(this.onlinePayDate['jdPay'].length>0){this.jdPay=true}
        //   if(this.onlinePayDate['ylPay'].length>0){this.ylPay=true}
        // },150);
        this.setConfig();
        setTimeout(()=>{all.$('.payType span:first-child i').trigger('click');this.onlineAonce=true},200)
      }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
    },

    setConfig() {

        if (this.onlinePayDate['fastPay'].length > 0) this.fastPay = true;
        if (this.onlinePayDate['aliPay'].length > 0) this.aliValid = true;
        if (this.onlinePayDate['wechatPay'].length>0) this.wechatValid = true;
        if (this.onlinePayDate['qqPay'].length > 0) this.qqPay = true;
        if (this.onlinePayDate['jdPay'].length > 0) this.jdPay = true;
        if (this.onlinePayDate['ylPay'].length > 0) this.ylPay = true;

        for (let key in this.onlinePayDate) {
            let str = key.replace(/Pay/g, 'Min');
            this.onlinePayDate[key].map((item, index) => {
                if (item.minDepositAmount === undefined) item.minDepositAmount = this.minDepositAmountConfig;
                if (index === 0) this[str] = item.minDepositAmount;
                this[str] = this[str] > item.minDepositAmount ? item.minDepositAmount : this[str];
            });
            this[str] = this[str] < this.minDepositAmountConfig ? this.minDepositAmountConfig : this[str];
        }

    },

    chooseType(e){
      this.commit=all.$(e.target).parent()[0].id;
      if(this.commit==='fastPay')all.tool.clickCount({page:'在线充值',btn:'快捷支付'});
      if(this.commit==='aliPay')all.tool.clickCount({page:'在线充值',btn:'支付宝支付'});
      if(this.commit==='wechatPay')all.tool.clickCount({page:'在线充值',btn:'微信支付'});
      if(this.commit==='qqPay')all.tool.clickCount({page:'在线充值',btn:'QQ支付'});
      if(this.commit==='ylPay')all.tool.clickCount({page:'在线充值',btn:'银联支付'});
      if(this.commit==='jdPay')all.tool.clickCount({page:'在线充值',btn:'京东支付'});
      this.aliEnter=false;
      if(all.$(e.target).parent()[0].id==='aliValid')this.aliEnter=true;
      this.limit=all.$(e.target).next().text();
      all.$('#'+all.$(e.target).parent()[0].id).addClass('active').siblings().removeClass('active')
    },
    fastChoose(e){
      all.$(e.target).addClass('active').siblings().removeClass('active');
      this.amount=all.$(e.target).text().slice(0,all.$(e.target).text().length-1)
    },
    enterAmount(){
      this.amount=null;
      all.$('.fastChoose span').removeClass('active')
    },
    /* 提交手工存款信息 */ 
    toDoBankCharge(){
      let depositMethodList = ['netShow', 'atmShow', 'tableShow'];
      if(this.amount < 10){
        all.tool.TipWinShow('存款金额不能小于10元',[{name:'确定'}]);
        return false
      }

      if (!this[depositMethodList[this.depositMethod - 1]]) {
        all.tool.TipWinShow('该支付方式暂时不可用，请选用其他存款方式',[{name:'确定'}]);
        return;
      }

      if (this.bankTypeId === undefined || this.bankTypeId === null) {
        all.tool.TipWinShow('该支付方式暂时不可用，请选用其他存款方式',[{name:'确定'}]);
        return;
      }

      all.tool.clickCount({page:'存款页面',btn:all.$('select.promoType').find('option:selected').text()});
      if(all.tool.isCommitForm() && this.ToCommit){
        this.bankChargeData={};
        this.bankChargeData.depositMethod=this.depositMethod;
        this.bankChargeData.bankTypeId=this.bankTypeId;
        this.bankChargeData.bPMSGroup=true;
        this.bankChargeData.amount=Number(this.amount);
        this.bankChargeData.bonusCode=this.promoTypeVal==='code'?this.bonusCode:'';
        this.bankChargeData.topUpReturnCode=this.promoTypeVal==='code'?'':this.promoTypeVal;
        if(this.depositMethod===1){
          this.bankChargeData.realName=this.realName;
        }
        if(this.depositMethod===2){
          this.bankChargeData.provinceId=this.provinceId;
          this.bankChargeData.cityId=this.cityId;
        }
        if(this.depositMethod===3){
          if(this.changeTypeVal==='1'){
            this.bankChargeData.isBankCard=1;
            this.bankChargeData.realName=this.realName;
          }
          if(this.changeTypeVal==='2'){
            this.bankChargeData.playerId=this.remark;
          }
        }
        this.ToCommit=false;
        all.tool.send('requestManualTopup',this.bankChargeData).then(result=>{
          this.ToCommit=true;
          all.tool.TipWinShow('提交成功',[{name:'确定',callback:()=>{
            this.CashRechargeStatus=result.data;
            this.ToCount(result.data.restTime)
          }}]);
        }).catch(err => {
            all.tool.TipWinShow(err.errorMessage, [{name: '确定', callback: () => {
                this.bankChargeA();
            }}]);
            this.ToCommit = true
        });
      }
    },

    /* 取消手工充值 */ 
    cancelOrder(){
      // all.tool.TipWinShow('您确定要取消申请吗？',[{name:'取消'},{name:'确定',callback:()=>{
      //   let depositMethod=this.CashRechargeStatus.inputData.depositMethod;
      //   all.tool.send('cancelManualTopupRequest',{proposalId:this.CashRechargeStatus.proposalId}).then(result=>{
      //     all.tool.TipWinShow('取消成功',[{name:'确定',callback:()=>{
      //       clearInterval(this.Interval);
      //       this.Interval=null;
      //       this.CashRechargeStatus=null;
      //       this.amount=null;
      //       if(depositMethod===4 || depositMethod===5 || depositMethod===6){
      //         this.OnlineA();
      //       }else{
      //         this.getBankDate()
      //       }
      //     }}]);
      //   }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
      // }}]);
      all.alert.confirm('您确定要取消申请吗?', [{name: '返回'}, {name: '联系客服取消', callback: () => {
          all.tool.openOnlineCustomer(all.store.state.live800, all.store.state.level === 4);
          all.tool.clickCount({page:'支付宝订单页面', btn:'联系客服取消'});
      }}]);
    }
  },
  watch: {
      alipayName(newVal, oldVal) {
        if (newVal) {
            if (newVal.indexOf(' ') !== -1) {
                this.alipayName = oldVal;
            } 
        }
      }
  },
  computed: {
      minDepositAmountConfig() {
        return this.$store.state.minDepositAmount;
      }
  },
  created(){
      this.getDate();
      all.tool.send('getRewardList').then(result=>{
        result.data.map(item=>{
          if(item.type.name === 'PlayerTopUpReturnGroup'){
            if (!all.tool.isTestServer()) {
              item.showInRealServer == 1 && this.promoTypeList.push(item); 
            } else {
              this.promoTypeList.push(item);
            }
          }
        })
      }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
      all.tool.send('getCashRechargeStatus').then(result=>{if(result.data)this.CashRechargeStatus=result.data}).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
  }
}
</script>

<style scoped lang="less">
  @import (reference) '../assets/css/variable.less';
  .saving{
      height:100%;
  }
  .deposit {
    height: 100%;
  }
  .main{
    height:83.508246%;
    overflow-y:scroll;
    .pb(120)
  }
  .topbar{
    .height(140);
    background:url("../assets/image/pages/saving/savingTopBg.jpg") no-repeat;
    background-size:100% 100%;
  }
  .userbox{
    display:flex;
    justify-content:space-between;
    align-items: center;
    .height(60);
    padding:0 2.666667%
  }
  .levelImg{
    .height(60);
    .width(60);
    .mr(20)
  }
  .name_balance{
    flex:1;
    .height(60);
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .userName{
      color:#f39800
  }
  .name_balance li{
    text-align:left;
    .height(42);
    .line-height(42);
    .font-size(24);
    .mr(20)
  }
  .score_amount{
    display:flex;
    justify-content:space-between;
    .font-size(24);
  }
  .score_amount i{
    margin-left:9.095%
  }
  .score_amount span{
    height:100%;
    width:fit-content
  }
  .score{
    display:flex;
    align-items:center;
    .height(42);
    .width(180);
    .mr(10);
    background:#0b1d2b;
    border:1px solid #0f2d44;
    box-shadow:-1px 1px 5px rgba(11,28,41,0.5) inset;
  }
  .score span{
      display:flex;
      .width(37);
      height:100%;
  }
  .balance{
    display:flex;
    align-items:center;
    .height(42);
    .width(180);
    background:#0b1d2b;
    border:1px solid #0f2d44;
    box-shadow:-1px 1px 5px rgba(11,28,41,0.5) inset;
    position:relative;
  }
  .balance .coin{
      .width(37)
  }
  .itembox{
    display:flex;
    .height(80);
    background:#083250;
    .border-lt(20);
    .border-rt(20)
  }
  .itembox span{
    flex:1;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .itembox img{
    .height(40);
    width:auto;
  }
  .itembox span:first-child{
    .border-lt(20);
  }
  .itembox span:last-child{
    .border-rt(20);
  }
  .onlinebar{
    padding:0 2.666667%;
    .pt(40);
  }
  .onlinebar .payType{
    display: flex;
    flex-wrap: wrap;
    .mb(40);
    width:100%;
  }
  .onlinebar .payType span{
    display:inline-block;
    width:30.985915%;
    .min-height(120);
    .mb(20);
    position:relative;
  }
  .onlinebar .payType span:nth-child(2),.onlinebar .payType span:nth-child(5),.onlinebar .payType span:nth-child(8){
    margin-left:3.521127%;
    margin-right:3.521127%;
  }
  .onlinebar .payType img{
    width:100%;
    height:auto
  }
  .onlinebar .payType i{
    position:absolute;
    left:0;
    top:0;
    height:100%;
    width:100%;
    z-index:10;
  }
  .onlinebar .payType b{
    .font-size(24);
    position:absolute;
    left:40%;
    top:56.668%;
  }
  .onlinebar .payType span.active i{
    background:url("../assets/image/pages/saving/onlineChoose.png") no-repeat;
    background-size:100% 100%
  }
  .fastChoose{
    display:flex;
    justify-content:space-between;
    .mb(20)
  }
  .fastChoose span{
    flex:1;
    .height(60);
    background:#0e283c;
    border:1px solid #2b7ca3;
    display:flex;
    align-items:center;
    .font-size(24);
    font-weight:bold;
    justify-content: center;
    .ml(10);
    .mr(10)
  }
  .fastChoose span:first-child{
    margin-left:0
  }
  .fastChoose span:last-child{
    margin-right:0
  }
  .fastChoose span.active{
    border-color:#f39800;
    background:#f39800
  }
  .box_input {
    .mb(20);
    .height(80);
    width:100%;
    .box_input_in {
      position:relative;
      .pl(10);
      text-align: left;
      display: inline-block;
      width:100%;
      .height(78);
      background-color: #060a13;
      .font-size(30);
      .line-height(76);
      border: 0 solid #079ae0;
      .border-width(1);
      label {
        display: inline-block;
        color: #1489bf;
        .width(160);
          width:21.535211%;
        .height(74);
        .line-height(74);
        text-align:right;
      }

      input,select {
        .height(74);
        .line-height(74);
        .pl(10);
        .width(529);
          width:76.507042%;
        .font-size(24);
        background-color: rgba(0,0,0,0);
        color: #fff;
      }
      select{
        background:url("../assets/image/pages/saving/iconDrawdown.png") no-repeat right center rgba(0,0,0,0);
        background-size:contain;
        position:absolute;
        right:0;
          option{
              background:#060a13
          }
      }
    }
  }
  .bonusCode{
    .mb(60)
  }
  .commitBox{
      display:flex;
      flex-wrap: wrap;
  }
  .commitBtn{
    width:46.478873%;
    margin:0 auto;
    position:relative;
  }
  .commitBtn .newType{
      .font-size(24);
      position:absolute;
      left:3px;
      top:2px;
      display:inline-block;
      .width(30);
      .height(30);
      .line-height(30);
      background:red;
  }
  .commitBtn span{
      position:absolute;
      .font-size(24);
      left:36%;
      top:12%;
      font-weight:bold;
  }
  .commitBtn img{
    .mb(20);
    width:100%;
    height:auto
  }
  .commitBtn b{
      position:absolute;
      .font-size(24);
      left:36%;
      top:45%
  }
  .aliTip{
    text-align:left;
    .font-size(24);
    color:#f39700;
    .line-height(60)
  }
  .aliTip i{
    color:#e60012
  }
  .bankChargebar{
    padding:0 2.666667%;
    .pt(40);
  }
  .bankChargebar .title{
    text-align:left;
    .font-size(24);
    font-weight:bold;
    .line-height(60)
  }
  .bankChargebar .step{
    .height(100);
    background:#102f57;
    color:#138ec0;
    .font-size(30);
    display:flex;
    justify-content:center;
    align-items:center;
    .mb(20)
  }
  .bankChargebar .step span{
    flex:1;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:bold;
    font-style:italic;
  }
  .bankChargebar .step span.active{
    background:url("../assets/image/pages/saving/stepBg.png") no-repeat;
    background-size:100% 100%;
    color:#fff;
    height:100%
  }
  .bankpayType{
    text-align: left;
    .mb(20)
  }
  .bankpayType span{
    display:inline-flex;
    .width(162);
    .height(162);
    position:relative;
    .mr(25)
  }
  .bankpayType span.active i{
    display:inline-flex;
    background:url("../assets/image/pages/saving/bankChoose.png") no-repeat;
    background-size:100% 100%;
    width:100%;
    height:100%;
    position:absolute;
    left:0;
  };
  .bankpayType img{
    width:100%;
    height:100%;
    .mr(20)
  }
  .bankList{
    display:flex;
    flex-wrap:wrap;
    .mb(15)
  }
  .bankList .tip{
    .font-size(24);
    background:#f39800;
    width:100%;
    display:flex;
    .height(40);
    justify-content:flex-start;
    align-items:center;
    .mt(-25)
  }
  .bankList span{
    width:30.985915%;
    background:#fff;
    border:1px solid #f39700;
    display:flex;
    align-items:center;
    justify-content:center;
    .height(80);
    .mb(25);
    .mr(25)
  }
  .bankList span:nth-child(3),.bankList span:nth-child(6),.bankList span:nth-child(9),.bankList span:nth-child(12),.bankList span:nth-child(15){
    .mr(0)
  }
  .bankList span.active{
    background:url("../assets/image/pages/saving/bankpayChoose.png") no-repeat #fff;
    background-size:100% 100%;
  }
  .bankList img{
    width:80%;
    height:auto;
  }
  .bankChargebar .commitBtn{
    .mb(60)
  }
  .tocommit{
    width:70.422535%;
    height:auto;
  }
  .CashRechargeStatus{
    padding:0 2.666667%;
    .pt(40);
  }
  .CashRechargeStatus .QRCode{
      .mb(20)
  }
  .CashRechargeStatus .QRCode img{
      .width(350)
  }
  .CashRechargeStatus .step{
    display:flex;
    width:100%;
    .height(100);
    .mb(30)
  }
  .CashRechargeStatus .step img{
    width:100%;
    .height(100)
  }
  .CashRechargeStatus .title{
    text-align:left;
    .font-size(24);
    font-weight:bold;
    .line-height(60)
  }
  .CashRechargeStatus .detail{
    background:#0b1d2b;
    border:2px solid #2b7ca3;
    .font-size(24);
    display:flex;
    justify-content: space-between;
  }
  .CashRechargeStatus .detail ul{
    width:65.492958%;
    border-right:2px solid #2b7ca3;

  }
  .CashRechargeStatus .detail li{
    text-align:left;
    .line-height(80);
    .height(80);
    background:#0b2a42
  }
  .CashRechargeStatus .detail li:nth-child(odd){
    background:#102f57
  }
  .CashRechargeStatus .detail li span:first-child{
    display:inline-block;
    .width(150);
    text-align:center;
  }
  .CashRechargeStatus .detail li span:last-child{
    font-weight:bold;
      display:inline-flex;
      align-items: center;
  }
  .CashRechargeStatus .detail li span.change{
      color:#f9e506;
      .font-size(32);
      font-weight:bold;
  }
  .CashRechargeStatus .detail li span img{
      .mr(10);
      .height(50);
      width:auto;
  }
  .CashRechargeStatus .detail .runTime{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex:1
  }
  .CashRechargeStatus .detail .runTime img{
    .width(58);
    height:auto
  }
  .CashRechargeStatus .detail .runTime p{
    .font-size(30);
    color:#f39800;
    font-weight:bold;
    .line-height(30);
    .mt(10);
    .mb(10)
  }
  .CashRechargeStatus .changeTeach{
      .font-size(30);
      .mt(10)
  }
  .CashRechargeStatus .changeTeach span{
      font-weight:bold;
      text-decoration: underline;
      color:#1489bf
  }
  .CashRechargeStatus .Tip{
    .font-size(24);
    color:#f39700;
    font-weight: bold;
    .line-height(36);
    .height(30);
    .mt(30);
    text-align: left;
    .mb(20)
  }
  .CashRechargeStatus .elseTip{
      .font-size(24);
      color:#f39700;
      font-weight: bold;
      .line-height(36);
      .height(36);
      .mt(30);
      .mb(20)
  }
  .resultBankCard{
    position:relative;
    width:100%;
  }
  .resultBankCard .cardBg{
    width:100%;
    height:auto;
  }
  .resultBankCard .name{
    position:absolute;
    .font-size(28);
    font-weight: bold;
    .left(34);
    .bottom(40)
  }
  .resultBankCard .provinceName{
    position:absolute;
    .font-size(28);
    font-weight: bold;
    .right(34);
    .bottom(40)
  }
  .resultBankCard .point{
    position:absolute;
    .font-size(28);
    font-weight: bold;
    .right(34);
    .bottom(10)
  }
  .resultBankCard .cardNum{
    position:absolute;
    .font-size(42);
    font-weight: bold;
    left: 20%;
    top: 46%;
    text-align:left;
  }
  .resultBankCard .resultBand{
    position:absolute;
    .right(34);
    .top(30);
    .height(66);
    width:auto;
  }
  .CashRechargeStatus .cancelBtn,.wetchatList .cancelBtn{
    .width(500);
    margin:0 auto;
    .mt(30);
    .mb(10)
  }
  .wetchatList .cancelBtn{
      .mb(40)
  }
  .CashRechargeStatus .btnBox{
      display:flex;
      justify-content: space-between;
      .mt(30);
      .mb(100)
  }
  .CashRechargeStatus .btnBox img{
      .height(100);
      width:auto
  }
  .CashRechargeStatus .cancelBtn img,.wetchatList .cancelBtn img{
    width:100%;
    height:auto
  }
  .CashRechargeStatus .lastTip{
    .font-size(20);
    color:#f39700;
    .mb(50)
  }
  .CashRechargeStatus .copy button{
      .height(60);
      .width(160);
      background:url('../assets/image/components/tipWindow/tipWinDefaultBtn.png');
      background-size:100% 100%;
      .font-size(26);
      margin:10px 5px;
      color:#fff;
      text-align: center;
  }
  .fitNameWin,.wetchatList{
      background:#0b1d2b;
      height:100%;
      position:relative;
  }
  .wetchatList{
      height:91.004498%;
      overflow-y: scroll;
  }
  .wetchatList .wetchatTip{
      .font-size(30);
      font-weight:bold;
      .line-height(30);
      .mb(25)
  }
  .wetchatList .content{
      padding:0 2.666667%;
  }
  .wetchatList .content .textArea{
      text-align:left;
      .font-size(20);
      .line-height(50)
  }
  .wetchatList .content .teach{
      position:relative;
      .mt(40);
      .mb(40)
  }
  .wetchatList .content .changeTeach span{
      display:inline-flex;
      .height(54);
      .width(160);
      .border-radius(20);
      color:#434343;
      .font-size(20);
      justify-content: center;
      align-items: center;
  }
  .wetchatList .content .changeTeach span.android{
      background:url("../assets/image/pages/saving/androidIcon1.png") no-repeat 10px center #dcdcdc;
      background-size:20% 60%;
      .pl(30)
  }
  .wetchatList .content .changeTeach span.android.active{
      background:url("../assets/image/pages/saving/androidIcon.png") no-repeat 10px center #f39800;
      background-size:20% 60%;
      color:#fff
  }
  .wetchatList .content .changeTeach span.ios{
      background:url("../assets/image/pages/saving/iosIcon1.png") no-repeat 10px center #dcdcdc;
      background-size:20% 60%;
      .pl(30)
  }
  .wetchatList .content .changeTeach span.ios.active{
      background:url("../assets/image/pages/saving/iosIcon.png") no-repeat 10px center #f39800;
      background-size:20% 60%;
      color:#fff
  }
  .wetchatList .content .teach img{
      .height(485);
      width:auto;
  }
  .wetchatList .content .teach span.amount{
      position:absolute;
      .font-size(30);
      .top(265);
      left:50%;
      .translateX(-150);
      color:#434343;
      font-weight:bold;
  }
  .wetchatList .content .teach span.username{
      position:absolute;
      .font-size(24);
      .top(150);
      color:red;
      left:50%;
      .translateX(50);
      font-weight:bold;
  }
  .wetchatList .content .textArea b{
      color:#f39700;
      font-weight:bold;
      .line-height(50)
  }
  .wetchatList .content .textArea .textTitle{
      .font-size(30);
      .mb(10);
      font-weight:bold;
  }
  .wetchatList .content .text{
      background:#031019;
      .height(80);
      .line-height(80);
      .font-size(30);
      font-weight:bold;
      .mb(20);
      text-align:left;
      .pl(20)
  }

  .wetchatList .content .text span{
      color:#e60012;
      .ml(10);
      font-weight:bold;
      .font-size(36)
  }
  .wetchatList .QRCode{
      .width(500);
      .height(500);
      border:1px solid #f39800;
      margin:0 auto;
  }
  .wetchatList .QRCode img{
      height:100%;
      width:auto
  }
  .wetchatList .wetchatTip b{
      color:#f39700
  }
  .fitNameWin .title,.wetchatList .title{
      width: 100%;
      .height(100);
      background: url("../assets/image/components/pageTop/pageTopBg.jpg") no-repeat center center;
      background-size: 100% 100%;
      color: #fff;
      .line-height(100);
      .font-size(36);
      font-weight: 700;
      .mb(80);
  }
  .fitNameWin .aliTip{
      padding:0 2.666667%;
  }
  .fitNameWin .aliTipi{
      .font-size(24);
      text-align: left;
      padding:0 2.666667%;
  }
  .fitNameWin .closeBtn,.wetchatList .closeBtn{
      position:absolute;
      right:0;
      top:0;
      .height(103);
      width: auto;
  }
  .fitNameWin .box_input {
      .mb(20);
      .height(80);
      padding:0 2.666667%;
      width:100%;
      .box_input_in {
          position:relative;
          .pl(10);
          text-align: left;
          display: inline-block;
          width:100%;
          .height(78);
          background-color: #060a13;
          .font-size(30);
          .line-height(76);
          border: 0 solid #079ae0;
          .border-width(1);
          label {
              display: inline-block;
              color: #1489bf;
              .width(160);
              width:22.535211%;
              .height(74);
              .line-height(74);
              text-align:right;
          }

          input,select {
              .height(74);
              .line-height(74);
              .pl(10);
              .width(529);
              width:74.507042%;
              .font-size(24);
              background-color: #060a13;
              color: #fff;
          }
          select{
              background:url("../assets/image/pages/saving/iconDrawdown.png") no-repeat right center #060a13;
              background-size:contain;
              position:absolute;
              right:0
          }
      }
  }
  .fitNameWin .commitBtn{
      width:46.478873%;
      margin:0 auto;
      .mt(40)
  }
  .fitNameWin .commitBtn img{
      .mb(20);
      width:100%;
      height:auto
  }
</style>
