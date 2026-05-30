const db = wx.cloud.database()

Page({
  data: {
    overview: {},
    defaultContent: '<p>合肥城市学院是一所经教育部批准设立的全日制普通本科高校，坐落于安徽省合肥市，拥有完善的教学设施和优质的师资力量，致力于培养德智体美劳全面发展的社会主义建设者和接班人。</p>',
    colleges: [
      { id: 'college_jian', name: '智能建造与能源学院', icon: '🏗️', desc: '智能建造、能源工程等专业' },
      { id: 'college_kong', name: '空间设计与规划学院', icon: '🎨', desc: '建筑设计、城乡规划等专业' },
      { id: 'college_shu', name: '数字经济与管理学院', icon: '💻', desc: '数字经济、工商管理等专业' },
      { id: 'college_ji', name: '现代机电工程学院', icon: '⚙️', desc: '机械工程、电气工程等专业' },
    ]
  },

  onLoad() {
    this.loadOverview()
    this.loadColleges()
  },

  loadOverview() {
    db.collection('school_overview').limit(1).get()
      .then(res => {
        if (res.data && res.data.length > 0) {
          this.setData({ overview: res.data[0] })
        }
      })
      .catch(() => {})
  },

  loadColleges() {
    db.collection('colleges').orderBy('sort', 'asc').get()
      .then(res => {
        if (res.data && res.data.length > 0) {
          this.setData({ colleges: res.data })
        }
      })
      .catch(() => {})
  },

  goToCollegeDetail(e) {
    const { id, name } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/college-detail/index?id=${id}&name=${encodeURIComponent(name)}` })
  }
})
