const db = wx.cloud.database()
const { getTempUrls, resolveImageFields } = require('../../utils/cloudImage')

Page({
  data: {
    bannerImage: '',
    newsList: [
      { title: '合肥城市学院与多家企业签署校企党建互助协议', _id: '' },
      { title: '校企联建活动——"青年党员共学党史"顺利举行', _id: '' },
      { title: '党建思政专家赴企业开展专题讲座活动', _id: '' },
      { title: '校企党建互助项目年度总结大会圆满召开', _id: '' },
    ]
  },

  onLoad() {
    this.loadBanner()
    this.loadNews()
  },

  loadBanner() {
    db.collection('school_overview').limit(1).get()
      .then(res => {
        if (res.data && res.data.length > 0) {
          const src = res.data[0].bannerImage || ''
          if (src.startsWith('cloud://')) {
            getTempUrls(src).then(url => this.setData({ bannerImage: url }))
          } else if (src) {
            this.setData({ bannerImage: src })
          }
        }
      })
      .catch(() => {})
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  loadNews() {
    db.collection('cases')
      .orderBy('createTime', 'desc')
      .limit(10)
      .get()
      .then(res => {
        if (res.data && res.data.length > 0) {
          resolveImageFields(res.data, ['coverImage']).then(newsList => {
            this.setData({ newsList })
          })
        }
      })
      .catch(() => {})
  },

  goToPage(e) {
    const path = e.currentTarget.dataset.path
    wx.navigateTo({ url: path })
  },

  goToCase(e) {
    const id = e.currentTarget.dataset.id
    if (id) {
      wx.navigateTo({ url: `/pages/case-detail/index?id=${id}` })
    } else {
      wx.navigateTo({ url: '/pages/cases/index' })
    }
  }
})
