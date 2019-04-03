const { sendBindData } = require('../../api/index')

Page({
   formSubmit(e) {
      var data = e.detail.value

      if (this.isComplete(data)) {
         this.sendData(data)
      } else {
         qq.showToast({
            title: '请将信息输入完整!',
            icon: 'none',
            duration: 2000
         })
      }
   },
   isComplete(data) {
      return Object.values(data).every(item => item)
   },
   sendData(data) {
      sendBindData(data)
      .then(({ data }) => {
         if (data) {
            var { exp, sub } = JSON.parse(atob(data.split('.')[1]))
            qq.setStorageSync('jwt', { exp, sub, token: data })
            qq.redirectTo({ url: '/pages/circle/index/index' })
         } else {
            console.log('绑定信息有误！')
         }
      })
   }
})