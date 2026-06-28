const db = wx.cloud.database()
const { resolveImageFields } = require('../../utils/cloudImage')

Page({
  data: {
    website: {
      url: 'https://www.cuhf.edu.cn'
    },
    qrLinks: [
      { id: 'wechat', name: '微信公众号', qrImage: '' },
      { id: 'douyin', name: '抖音官号', qrImage: '' }
    ]
  },

  onLoad() {
    this.loadLinks()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
  },

  loadLinks() {
    db.collection('media_links').limit(1).get()
      .then(res => {
        if (res.data && res.data.length > 0) {
          const d = res.data[0]
          if (d.website) this.setData({ website: d.website })
          if (d.qrLinks) {
            resolveImageFields(d.qrLinks, ['qrImage']).then(qrLinks => {
              this.setData({ qrLinks })
            })
          }
        }
      })
      .catch(() => {})
  },

  copyLink(e) {
    const url = e.currentTarget.dataset.url
    if (!url) return
    wx.setClipboardData({
      data: url,
      success: () => {
        wx.showModal({
          title: '链接已复制',
          content: '请在手机浏览器中粘贴打开：\n' + url,
          showCancel: false,
          confirmText: '知道了'
        })
      }
    })
  },

  previewQr(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.previewImage({ urls: [url], current: url })
    }
  }
})
