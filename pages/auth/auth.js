const { setFreshJWT } = require('../../api/index')

Page({
   getUserInfo(e) {
      if (e.detail.userInfo) {
         setFreshJWT()
         .then(() => {
            var { sub } = qq.getStorageSync('jwt')

            if (sub === 'student') {
               qq.redirectTo({ url: '/pages/circle/index/index' })
            } else {
               qq.redirectTo({ url: '/pages/bind/bind' })
            }
         })
      } else {
         qq.showToast({
            title: '用户信息获取失败！',
            icon: 'none',
            duration: 2000
         })
      }
   }
})
