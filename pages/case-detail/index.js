const db = wx.cloud.database()
const { getTempUrls } = require('../../utils/cloudImage')

Page({
  data: {
    loading: true,
    caseData: {}
  },

  onLoad(options) {
    const id = options.id
    if (!id || id.startsWith('demo')) {
      this.setData({
        loading: false,
        caseData: {
          title: '校企党建互助活动案例',
          date: '2025-05-01',
          tags: ['党建互助'],
          content: '<p>本次活动由合肥城市学院党委与合作企业党支部联合主办，旨在深入推进校企党建联建工作，实现资源共享、优势互补。</p>',
          summary: ''
        }
      })
      return
    }

    db.collection('cases').doc(id).get()
      .then(res => {
        const data = res.data
        wx.setNavigationBarTitle({ title: data.title || '案例详情' })
        if (data.coverImage && data.coverImage.startsWith('cloud://')) {
          getTempUrls(data.coverImage).then(url => {
            this.setData({ loading: false, caseData: Object.assign({}, data, { coverImage: url }) })
          })
        } else {
          this.setData({ loading: false, caseData: data })
        }
      })
      .catch(() => {
        this.setData({ loading: false })
        wx.showToast({ title: '加载失败', icon: 'error' })
      })
  }
})
