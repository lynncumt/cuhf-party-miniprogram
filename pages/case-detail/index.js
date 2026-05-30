const db = wx.cloud.database()

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
          content: '<p>本次活动由合肥城市学院党委与合作企业党支部联合主办，旨在深入推进校企党建联建工作，实现资源共享、优势互补。</p><p>活动期间，双方党员代表共同学习了习近平新时代中国特色社会主义思想，并就企业党建工作的难点热点问题进行了深入交流探讨。</p>',
          summary: ''
        }
      })
      return
    }

    db.collection('cases').doc(id).get()
      .then(res => {
        this.setData({ loading: false, caseData: res.data })
        wx.setNavigationBarTitle({ title: res.data.title || '案例详情' })
      })
      .catch(() => {
        this.setData({ loading: false })
        wx.showToast({ title: '加载失败', icon: 'error' })
      })
  }
})
