const { sendBindData } = require('../../api/index')
const { Base64 } = require('../../utils/base64')
const { showModal } = require('../../utils/index')

Page({
  data: {
    mark: ''
  },
  onFocus(e) {
    this.setData({
      mark: e.currentTarget.dataset.mark
    })
  },
  formSubmit(e) {
    let data = e.detail.value

    if (this.isComplete(data)) {
      this.sendData(data)
    } else {
      showModal({ title: '请输入完整的信息' })
    }
  },
  isComplete(data) {
    return Object.values(data).every(item => item)
  },
  sendData(data) {
    qq.showLoading({ title: '等待中', mask: true })

    sendBindData(data).then(({ status, data }) => {
      qq.hideLoading()

      if (status === 10000) {
        let userInfo = JSON.parse(Base64.decode(data.split('.')[1]))

        qq.setStorageSync('userInfo', { ...userInfo, token: data })
        qq.redirectTo({ url: '/pages/avatar/avatar' })
      } else {
        showModal({ title: '输入的信息有误' })
      }
    })
  }
})
