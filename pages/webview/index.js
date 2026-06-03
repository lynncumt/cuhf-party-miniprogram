Page({
  data: { url: '' },
  onLoad(options) {
    const url = decodeURIComponent(options.url || '')
    const title = decodeURIComponent(options.title || '网页浏览')
    this.setData({ url })
    wx.setNavigationBarTitle({ title })
  }
})
