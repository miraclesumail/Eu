export default {
    // 获取银行卡资料
    getBankInfo ({commit}) {
        let data = {};
        let bankInfo = {};
        let time = '';
        let storeUserInfo = {};
        data.playerId = all.tool.getStore('playerId');

        all.tool.send('get', data, 'player').then(
            userInfo => {
                time = all.tool.formatTime(userInfo.data.registrationTime);
                commit('setRegistrationTime', time);
                storeUserInfo.registrationTime = time;
                storeUserInfo.level = userInfo.data.playerLevel.value;
                storeUserInfo.realName = userInfo.data.realName;
                all.tool.setStore('userInfo', storeUserInfo);
                commit('encryptionPhoneNumber', userInfo.data.phoneNumber);
                if (userInfo.data.bankName == undefined || userInfo.data.bankName == 'null') {
                    return;
                }
                bankInfo.bankAccount = userInfo.data.bankAccount;
                bankInfo.bankAccountCity = userInfo.data.bankAccountCity;
                bankInfo.bankAccountCityId = userInfo.data.bankAccountCityId;
                bankInfo.bankName = userInfo.data.bankName;
                bankInfo.bankAccountType = userInfo.data.bankAccountType;
                bankInfo.bankAddress = userInfo.data.bankAddress;
                let tempBankNameArray = userInfo.data.bankAccountName.split('');
                for (var i = 0; i < tempBankNameArray.length; i++) {
                    if ( i > 0) {
                        tempBankNameArray[i] = '*'
                    }
                }
                bankInfo.bankAccountName = tempBankNameArray.join('');
                storeUserInfo.bankAccountName = userInfo.data.bankAccountName;
                all.tool.setStore('userInfo', storeUserInfo);
                all.tool.setStore('bankInfo', bankInfo);
                commit('setBankInfo', bankInfo);
            }
        )
    },

    // 刷新积分
    setUserPoint ({commit}) {
        all.tool.send('getPointRule').then( result => {
            commit('setUserPoint', result.data.userCurrentPoint);
        })
    },

    // 刷新余额
    setUserBalance ({commit}) {
        all.tool.send('getCredit').then(result => {
            commit('setUserBalance', parseInt(result.data.validCredit));
        });
    }
    
}