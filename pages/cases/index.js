const db = wx.cloud.database()
const PAGE_SIZE = 10
const { resolveImageFields } = require('../../utils/cloudImage')

Page({
  data: {
    loading: true,
    cases: [],
    hasMore: false,
    page: 0,
    defaultCases: [
      { _id: 'demo1', title: '合肥城市学院与XX科技公司开展校企党建联建活动', summary: '双方党支部结对共建，共同开展主题党日活动，取得良好效果...', date: '2025-05-01', tags: ['组织联建', '主题党日'], coverImage: '' },
      { _id: 'demo2', title: '校企"青年党员共学党史"活动顺利举行', summary: '来自学校和企业的青年党员代表共聚一堂，共同学习党的百年奋斗历程...', date: '2025-04-15', tags: ['理论联学', '党史教育'], coverImage: '' }
    ]
  },

  onLoad() {
    this.loadCases()
  },

  loadCases() {
    this.setData({ loading: true })
    db.collection('cases')
      .orderBy('createTime', 'desc')
      .skip(this.data.page * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .get()
      .then(res => {
        const raw = this.data.page === 0
          ? (res.data.length > 0 ? res.data : this.data.defaultCases)
          : [...this.data.cases, ...res.data]
        return resolveImageFields(raw, ['coverImage']).then(cases => {
          this.setData({ loading: false, cases, hasMore: res.data.length === PAGE_SIZE })
        })
      })
      .catch(() => {
        this.setData({ loading: false, cases: this.data.defaultCases })
      })
  },

  loadMore() {
    this.setData({ page: this.data.page + 1 }, () => this.loadCases())
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/case-detail/index?id=${id}` })
  }
})
