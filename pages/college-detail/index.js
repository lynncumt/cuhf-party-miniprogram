const db = wx.cloud.database()

Page({
  data: {
    collegeName: '',
    college: {},
    defaultContent: '<p>本学院依托合肥城市学院雄厚的办学资源，汇聚优质师资，面向行业需求，培养高素质应用型人才。</p>',
    defaultMajors: ['请在云数据库中添加专业信息']
  },

  onLoad(options) {
    const name = decodeURIComponent(options.name || '')
    this.setData({ collegeName: name })
    wx.setNavigationBarTitle({ title: name })
    this.loadCollege(options.id)
  },

  loadCollege(id) {
    if (!id) return
    db.collection('colleges').where({ id: id }).limit(1).get()
      .then(res => {
        if (res.data && res.data.length > 0) {
          this.setData({ college: res.data[0] })
        }
      })
      .catch(() => {})
  }
})
