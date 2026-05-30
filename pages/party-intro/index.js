const db = wx.cloud.database()

Page({
  data: {
    intro: {},
    defaultBackground: '<p>在新时代党的建设伟大工程深入推进的背景下，加强校企党建联建、互助共建是贯彻落实习近平新时代中国特色社会主义思想的重要举措，是推动产学研深度融合、实现校企合作共赢的有效路径。</p>',
    sixNeeds: [
      '组织建设规范化需求',
      '理论学习系统化需求',
      '党建活动多元化需求',
      '人才培育专业化需求',
      '党务实操精准化需求',
      '发展资源共享化需求'
    ],
    projects: [
      { num: '01', title: '组织互助联建', desc: '推动校企党组织结对共建，实现党建工作优势互补' },
      { num: '02', title: '理论互助联学', desc: '共建学习平台，开展联合理论学习和政治教育活动' },
      { num: '03', title: '活动互助联办', desc: '联合开展主题党日、志愿服务等各类党建活动' },
      { num: '04', title: '人才互助联育', desc: '校企共同参与人才培养，推动产教深度融合' },
      { num: '05', title: '发展互助联动', desc: '资源共享、协同发展，实现校企共同进步' }
    ]
  },

  onLoad() {
    this.loadIntro()
  },

  loadIntro() {
    db.collection('party_intro').limit(1).get()
      .then(res => {
        if (res.data && res.data.length > 0) {
          const d = res.data[0]
          this.setData({
            intro: d,
            sixNeeds: d.sixNeeds || this.data.sixNeeds,
            projects: d.projects || this.data.projects
          })
        }
      })
      .catch(() => {})
  }
})
