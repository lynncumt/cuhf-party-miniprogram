const db = wx.cloud.database()

const DEFAULT_CATEGORIES = [
  {
    id: 'cat1', roman: '一', title: '思想引领类',
    courses: [
      { name: '习近平新时代中国特色社会主义思想专题讲座', duration: '3课时' },
      { name: '党的二十大精神深度解读', duration: '2课时' },
      { name: '中国共产党党史学习教育', duration: '4课时' },
      { name: '社会主义核心价值观与企业文化建设', duration: '2课时' }
    ]
  },
  {
    id: 'cat2', roman: '二', title: '政策阐释类',
    courses: [
      { name: '国家重大战略政策解读', duration: '2课时' },
      { name: '全面从严治党政策专题培训', duration: '2课时' },
      { name: '企业廉洁文化建设与合规经营', duration: '2课时' },
      { name: '劳动法律法规与员工权益保障', duration: '2课时' }
    ]
  },
  {
    id: 'cat3', roman: '三', title: '责任担当类',
    courses: [
      { name: '党员先锋模范作用发挥专题', duration: '2课时' },
      { name: '企业社会责任与绿色发展', duration: '2课时' },
      { name: '危机管理与应急处置能力培训', duration: '2课时' },
      { name: '青年党员成长成才专题引导', duration: '2课时' }
    ]
  },
  {
    id: 'cat4', roman: '四', title: '党务实操类',
    courses: [
      { name: '党支部标准化规范化建设实务', duration: '3课时' },
      { name: '党员发展与组织生活规范', duration: '2课时' },
      { name: '主题党日活动策划与组织', duration: '2课时' },
      { name: '党建工作台账与档案管理', duration: '2课时' }
    ]
  }
]

Page({
  data: {
    categories: DEFAULT_CATEGORIES
  },

  onLoad() {
    this.loadCourses()
  },

  loadCourses() {
    db.collection('course_db').limit(1).get()
      .then(res => {
        if (res.data && res.data.length > 0 && res.data[0].categories) {
          this.setData({ categories: res.data[0].categories })
        }
      })
      .catch(() => {})
  }
})
