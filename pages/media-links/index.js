const db = wx.cloud.database()
const { resolveImageFields } = require('../../utils/cloudImage')

Page({
  data: {
    qrLinks: [
      { id: 'website', name: '校园官网', qrImage: '' },
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
          if (d.qrLinks) {
            resolveImageFields(d.qrLinks, ['qrImage']).then(qrLinks => {
              this.setData({ qrLinks })
            })
          }
        }
      })
      .catch(() => {})
  },

  previewQr(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.previewImage({ urls: [url], current: url })
    }
  }
})
