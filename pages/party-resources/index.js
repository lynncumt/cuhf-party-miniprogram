const db = wx.cloud.database()

Page({
  data: {
    intro: '',
    defaultIntro: '<p>合肥城市学院拥有丰富的党建思政教育资源，包括组织资源、理论资源和人才资源，致力于为校企党建互助提供有力支撑。</p>',
    resources: [
      {
        id: 'org', icon: '🏛️', title: '组织资源',
        content: '<p>学校现有党委1个，二级学院党总支4个，党支部若干，党员队伍庞大，组织体系健全，党建工作制度完备。</p>',
        tags: ['党委', '党总支', '党支部', '党员队伍']
      },
      {
        id: 'theory', icon: '📖', title: '理论资源',
        content: '<p>学校建有完善的党建思政理论研究平台，拥有丰富的思想政治教育课程体系和党建研究成果，为校企联建提供有力的理论支撑。</p>',
        tags: ['思政课程', '党建研究', '理论培训']
      },
      {
        id: 'talent', icon: '👥', title: '人才资源',
        content: '<p>学校拥有一支结构合理、经验丰富的党建思政工作队伍，包括专职党务工作者、思政课教师和党建研究专家，可为企业党建工作提供智力支持。</p>',
        tags: ['专职党务', '思政教师', '党建专家']
      }
    ]
  },

  onLoad() {
    this.loadResources()
  },

  loadResources() {
    db.collection('party_resources').limit(1).get()
      .then(res => {
        if (res.data && res.data.length > 0) {
          const d = res.data[0]
          this.setData({
            intro: d.intro || '',
            resources: d.resources || this.data.resources
          })
        }
      })
      .catch(() => {})
  }
})
