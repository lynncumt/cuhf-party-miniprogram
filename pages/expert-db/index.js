const db = wx.cloud.database()
const PAGE_SIZE = 10
const { resolveImageFields } = require('../../utils/cloudImage')

Page({
  data: {
    loading: true,
    experts: [],
    hasMore: false,
    page: 0,
    defaultExperts: [
      { _id: '1', name: '张教授', title: '党建思政方向首席专家 | 教授', expertise: ['思想引领', '党史教育'], intro: '长期从事党的建设和思想政治教育研究，曾主持多项省部级科研项目。' },
      { _id: '2', name: '李副教授', title: '党建研究专家 | 副教授', expertise: ['党务实操', '政策阐释'], intro: '专注企业党建工作研究，有丰富的基层党建指导经验。' },
      { _id: '3', name: '王讲师', title: '思政课骨干教师 | 讲师', expertise: ['责任担当', '理论宣讲'], intro: '国家级优秀思政课教师，擅长理论与实践相结合的教学方式。' },
    ]
  },

  onLoad() {
    this.loadExperts()
  },

  loadExperts() {
    this.setData({ loading: true })
    db.collection('experts')
      .orderBy('sort', 'asc')
      .skip(this.data.page * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .get()
      .then(res => {
        const raw = this.data.page === 0
          ? (res.data.length > 0 ? res.data : this.data.defaultExperts)
          : [...this.data.experts, ...res.data]
        return resolveImageFields(raw, ['avatar']).then(experts => {
          this.setData({ loading: false, experts, hasMore: res.data.length === PAGE_SIZE })
        })
      })
      .catch(() => {
        this.setData({ loading: false, experts: this.data.defaultExperts })
      })
  },

  loadMore() {
    this.setData({ page: this.data.page + 1 }, () => this.loadExperts())
  }
})
