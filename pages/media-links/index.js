const db = wx.cloud.database()
const { resolveImageFields } = require('../../utils/cloudImage')

Page({
  data: {
    mediaLinks: [
      { id: 'wechat', name: '微信', qrImage: '' },
      { id: 'douyin', name: '抖音', qrImage: '' }
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
        if (res.data && res.data.length > 0 && res.data[0].mediaLinks) {
          resolveImageFields(res.data[0].mediaLinks, ['qrImage']).then(mediaLinks => {
            this.setData({ mediaLinks })
          })
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
