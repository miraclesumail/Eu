export const ws={
  // url:'ws://192.168.10.199:9280',//开发测试站
  // url:'ws://119.81.239.90:3000',//开发测试站
  // url:'ws://cstest-eu.neweb.me/websocket',//客服测试站
  //  url:'ws://euweb.neweb.me/websocket',//开发测试站
  // url:'wss://www.eu99999.com/websocket',// 正式站
  // platformId: 13,
  platformId: 4
};
export const apiList=[
  {
    service:'connection',//连接服务API组
    functionName:[
      'setLang'  //设置语言
    ]
  },
  {
    service:'player',//玩家服务API组
    functionName:[
      'create',    //玩家开户
      'captcha',    //从服务端获取验证码
      'getSMSCode',    //获取手机验证码
      'login',    //玩家登录
      'logout',   //玩家注销登录
      'isLogin',    //查询玩家是否登录
      'get',    //获取玩家基本信息
      'updatePaymentInfo',    //修改玩家的支付信息
      'updatePassword',    //修改玩家登录密码
      'setSmsStatus',    //设置玩家短信状态
      'getSmsStatus',    //获取玩家短信状态
      'isValidUsername',    //注册时检测玩家的用户名是否有效
      'authenticate',    //验证玩家webSocket链接是否有效
      'getMailList',    //获取玩家站内信列表
      'readMail',       //读取单条站内信内容
      'notifyNewMail',    //通知玩家有新的站内信
      'eadMailr',    //查看信件
      'getUnreadMail',    //获取未读取站内信,
      'deleteAllMail',    //删除所有邮件
      'deleteMail',    //删除邮件
      'getCredit',    //获取玩家额度信息
      'getCreditBalance',    //获取玩家全额消费
      'updatePhotoUrl',    //修改玩家头像
      'getPlayerDayStatus',    //获取玩家当天状态
      'getPlayerWeekStatus',    //获取玩家本周状态
      'getPlayerMonthStatus',    //获取玩家本月状态
      'addClientSourceLog',    //添加客户端访问记录
      'getCreditInfo',    //获取玩家最新额度
      'updatePhoneNumberWithSMS',    //修改玩家电话
      'sendSMSCodeToPlayer',    //登入后获取手机验证码
      'verifyPhoneNumberBySMSCode',    //通过验证码验证手机
      'manualPlayerLevelUp',    //已登录玩家自助升级
      'getCreditDetail',    //获取已登录玩家额度
      'getWithdrawalInfo',    //登入后获取提款信息
      'updatePlayerQQ',    //编辑玩家QQ
      'updatePlayerWeChat',    //编辑玩家wechat
      'updatePlayerEmail',    //编辑玩家email
      'isValidRealName',    //用户真名是否有效
      'sendPlayerMailFromPlayerToPlayer',    //发送站内信给另一玩家
      'sendPlayerMailFromPlayerToAdmin',    //发送站内信给管理员
      'createDemoPlayer',    //创建试玩玩家
      'getPlayerAnyDayStatus', //获取玩家输值信息
      'callBackToUser',  //请求回电
    ]
  },
  {
    service:'registrationIntention',//注册意向服务API组
    functionName:[
      'add',    //添加注册意向记录
      'update',    //修改注册意向记录
    ]
  },
  {
    service:'payment',//支付信息服务API组
    functionName:[
      'applyBonus',    //兑换奖品申请
      'getBonusRequestList',    //获取兑奖申请列表
      'cancelBonusRequest',    //取消兑奖申请
      'getBonusList',    //获取奖品列表
      'getOnlineTopupType',    //获取有效在线充值方式
      'createOnlineTopupProposal',    //创建在线充值提案
      'requestManualTopup',    //申请手工存款充值
      'cancelManualTopupRequest',    //取消手工存款申请单
      'delayManualTopupRequest',    //延长手工存款申请单有效时间
      'modifyManualTopupRequest',    //修改手工存款申请单信息
      'getManualTopupRequestList',    //获取手工存款申请单列表
      'getAlipayTopupRequestList',    //获取支付宝存款申请单列表
      'getWechatTopupRequestList',    //获取微信存款申请单列表
      'requestAlipayTopup',    //申请支付宝转账充值
      'requestWechatTopup',    //申请微信转账充值
      'requestQuickpayTopup',    //申请秒付宝充值
      'cancelAlipayTopup',    //取消支付宝转账充值
      'cancelWechatTopup',    //取消微信转账充值
      'manualTopupStatusNotify',    //手工存款充值状态通知
      'onlineTopupStatusNotify',    //在线充值状态通知
      'getTopupList',    //获取充值记录
      'getProvinceList',    //获取省份列表
      'getCityList',    //获取市列表
      'getDistrictList',    //获取区县列表
      'getBankTypeList',    //获取银行卡类型列表
      'requestBankTypeByUserName',  //获取银行卡类型
      'checkExpiredManualTopup',    //手工订单超时后的再次确认请求
      'getValidFirstTopUpRecordList',    //获取符合首冲条件的充值记录
      'getValidTopUpReturnRecordList',    //获取符合充值返点的充值记录
      'getValidTopUpRewardRecordList',    //获取符合充值奖励的充值记录
      'getTopupHistory',    //获取充值申请记录
      'getAlipaySingleLimit',    //获取支付宝单笔限额
      'getMerchantSingleLimits',    //获取在线支付单笔限额（微信扫码和支付宝扫码）
      'getCashRechargeStatus',    //获取手工充值状态
      'getPlayerAliPayStatus',    //支付宝充值状态
      'getPlayerWechatPayStatus',    //微信充值状态
      'isFirstTopUp',    //是否首冲
    ]
  },
  {
    service:'topupIntentionadd',//充值意向服务API组
    functionName:[
      'add',    //添加充值意向
      'update',    //修改充值意向
    ]
  },
  {
    service:'consumption',//玩家消费记录服务API组
    functionName:[
      'getLastConsumptions',    //获取最近消费记录
      'search',    //查询消费记录
      'newConsumption',    //新消费通知(以后再做)
    ]
  },
  {
    service:'playerLevel',//玩家等级服务API组
    functionName:[
      'getLevel',    //获取玩家等级
      'getLevelReward',    //获取等级优惠信息
      'getAllLevel',    //获取玩家全部等级
      'upgrade',    //玩家升级
    ]
  },
  {
    service:'reward',//奖励信息服务API组
    functionName:[
      'getRewardList',    //获取奖励活动列表
      'getRewardTask',    //获取玩家奖励任务
      'getPlayerRewardList',    //获取玩家申请奖励
      'requestConsumeRebate',    //申请结算消费返点
      'isValidForFirstTopUpReward',    //是否符合首冲奖励条件
      'createFirstTopUpRewardProposal',    //创建首冲奖励提案
      'applyProviderReward',    //申请游戏提供商奖励
      'applyRewardEvent',    //申请奖励活动
      'getConsumeRebateAmount',    //获取消费返点额度
      'getPlayerReferralList',    //获取推荐玩家列表
      'getConsecutiveLoginRewardDay',    //获取玩家累计签到信息
      'getPromoCode',    //获取优惠代码
      'applyPromoCode',    //申请优惠代码
      'getLimitedOffers',    //秒杀礼包列表
      'applyLimitedOffers',    //申请秒杀礼包（意向）
      'getLimitedOfferBonus',    //获取时间内产生秒杀礼包的优惠
      'setLimitedOfferShowInfo',    //设置秒杀礼包对玩家的显示
      'getTopUpPromoList',    //获取目前正在进行中的充值优惠
      'setBonusShowInfo',    //设置优惠代码显示
      'getSignInfo',    //获取签到信息
      'getSignBonus',    //获取签到奖励
      'markPromoCodeAsViewed',    //标记优惠代码已读
      'getSlotInfo',    //获取存送金信息
    ]
  },
  {
    service:'game',//游戏信息服务API组
    functionName:[
      'getGameTypeList',    //获取游戏类型列表
      'getGameList',    //获取游戏列表
      'getProviderList',    //获取内容提供商(CP)列表
      'transferToProvider',    //将本地额度转出到CP账号的游戏额度
      'transferFromProvider',    //将游戏额度从CP账号转入到本地额度
      'getLoginURL',    //获取登录游戏的URL
      'getTestLoginURL',    //获取试玩游戏的URL需要玩家登陆
      'getTestLoginURLWithOutUser',    //获取试玩游戏的URL不需要玩家登陆
      'getGameUserInfo',    //获取玩家游戏中的账户信息
      'modifyGamePassword',    //修改玩家游戏账号的密码
      'grabPlayerTransferRecords',    //请求立即收录玩家的消费记录
      'addFavoriteGame',    //收藏游戏
      'removeFavoriteGame',    //删除收藏游戏
      'getFavoriteGames',    //获取收藏游戏
      'getGameGroupList',    //获取游戏分组列表
      'getGameGroupInfo',    //获取游戏分组详细信息
      'getGameGroupTreeInfo',    //获取游戏分组树信息
      'searchGame',    //搜索游戏
      'getGameProviderCredit',    //查询游戏提供商额度
      'searchGameByGroup',    //根据游戏组查询游戏
      'getGamePassword',    //获取游戏账号密码
      'modifyGamePassword',    //修改游戏密码
    ]
  },
  {
    service:'partner',//推广渠道服务API组
    functionName:[
      'register',    //推广账户注册
      'isValidUsername',    //推广账户注册用户名有效性验证
      'captcha',    //推广账户注册验证码
      'authenticate',    //用于验证玩家webSocket链接是否有效
      'get',    //获取推广账户用户信息
      'login',    //推广账户登录
      'logout',    //推广账户登出
      'updatePassword',    //修改推广账号密码
      'fillBankInformation',    //设置推广渠道银行资料
      'getStatistics',    //按周期查询推广渠道统计信息
      'getPlayerSimpleList',    //获取推广渠道下线玩家列表
      'getPlayerDetailList',    //获取推广渠道下线玩家详情列表
      'getDomainList',    //获取推广渠道推广域名
      'getPartnerChildrenReport',    //获取推广渠道下线报表
      'bindPartnerPlayer',    //绑定推广渠道玩家
      'applyBonus',    //申请兑奖
      'getBonusRequestList',    //获取兑奖列表
      'cancelBonusRequest',    //取消兑奖申请
      'getPartnerPlayerPaymentReport',    //推广渠道其下玩家充值兑奖情况记录
      'getPartnerPlayerRegistrationReport',    //查询推广渠道下线玩家开户来源报表
      'getPartnerPlayerRegistrationStats',    //查询推广渠道下线玩家开户统计
      'getPartnerCommission',    //查询推广渠道佣金信息
      'getPartnerCommissionValue',    //查询推广渠道佣金详情
      'getSMSCode',    //通过短信验证码修改代理手机号码
      'updatePhoneNumberWithSMS',    //通过短信验证码修改代理手机号码
    ]
  },
  {
    service:'platform',//平台信息服务API组
    functionName:[
      'getPlatformAnnouncements',   //获取平台公告
      'getPlatformDetails',         //获取平台信息
      'getConfig',                  //获取平台设置
      'playerPhoneChat',            //请求客服会电
      'searchConsumptionRecord',    //搜索平台投注记录
      'clickCount',                 //埋点
      'addIpDomainLog',             //log domian
    ]
  },
  {
    service:'rewardPoints',//积分服务API组
    functionName:[
      'getRewardPointsRanking',      // 获取积分排名列表
      'getLoginRewardPoints',        // 获取登入积分信息
      'getGameRewardPoints',         // 获取游戏积分信息
      'getTopUpRewardPointsEven',    // 获取存款积分信息
      'applyRewardPoint',            // 手动申请积分活动奖励
      'getPointRule',                // 获取积分规则
      'getMissonList',               // 获取任务信息
      'applyPointToCredit'           // 积分兑换真钱
    ]
  }
];

export const routerGuard=[ //路由进入拦截列表
  {path:'/deposit',toGoPath:'/login'},
  {path:'/withdraw'},
  {path:'/account'},
  {path:'/message'},
  {path: '/account/information'},
  {path: '/account/search'},
  {path: '/account/changePassword'},
  {path: '/account/smsSettings'},
  {path: '/account/code'},
  {path: '/account/changePhoneNum'},
  {path: '/account/changeBankInfo'},
  {path: '/account/bindBankInfo'},
  {path: '/updateLevel'},
  {path: '/promobag'},
  {path: '/promohitegg'},
  {path: '/gameTransfer'},
  {path: '/resurrection'},
  {path: '/signIn'},
  {path: '/task'},
  {path: '/tree'},
  {path: '/alipay'},
];
export const isHeaderShowList=[ //头部显示列表
  '/',
];
export const isFooterShowList=[ //尾部显示列表
  '/',
  '/deposit',
  '/withdraw',
  '/account',
  '/account/information',
  '/account/search',
  '/account/changePassword',
  '/account/smsSettings',
  '/account/code',
  '/updateLevel'
];
export const regularList=[  //输入框正则验证表
  {id:'username',regular:/^e[a-z0-9]{5,9}$/,error:'e开头6-10位字母和数字'},
  {id:'usernameL',regular:/^e[a-z0-9]{5,}$/,error:'e开头6-10位字母和数字'},
  {id:'password',regular:/^[a-z0-9]{6,16}$/,error:'6-16位字母和数字'},
  {id:'repassword',regular:/^[a-z0-9]{6,16}$/,error:'6-16位字母和数字'},
  {id:'phoneNumber',regular:/^1[3456879][0-9]{9}$/,error:'请输入正确的11位手机号码'},
  {id:'phoneNumberS',regular:/^1[3456879][0-9*]{9}$/,error:'请输入正确的11位手机号码'},
  {id:'smsCode',regular:/^[0-9]{4}$/,error:'短信验证码为4位数字'},
  {id:'smsCode1',regular:/^[0-9]{4}$/,error:'4位数字'},
  {id:'bonusCode',regular:/^[0-9]{4}$/,error:'请输入4位数字福袋号码'},
  {id: 'userBankAccount', regular: /^[0-9]{16,19}$/, error: '请输入16-19位银行卡号'},
  {id: 'bankName', regular: /^[0-9]{16,19}$/, error: '请输入16-19位银行卡号'},
  {id: 'amount', regular: /^[0-9]+$/, error: '请输入充值金额'},
  {id: 'province', regular: /^choose$/, error: '请选择ATM省份'},
  {id: 'city', regular: /^choose$/, error: '请选择ATM城市'},
  {id: 'realName', regular: /^[\u4E00-\u9FA5]{2,4}$/, error: '请输入2-4位中文网银姓名'},
];
