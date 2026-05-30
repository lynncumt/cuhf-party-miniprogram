const db = wx.cloud.database()

const NEED_CATEGORIES = [
  {
    id: 'ideological', roman: '一', title: '思想引领类',
    items: [
      { id: 'i1', label: '习近平新时代中国特色社会主义思想学习', checked: false },
      { id: 'i2', label: '党的二十大精神宣讲', checked: false },
      { id: 'i3', label: '党史学习教育', checked: false },
      { id: 'i4', label: '社会主义核心价值观培训', checked: false }
    ]
  },
  {
    id: 'policy', roman: '二', title: '政策阐释类',
    items: [
      { id: 'p1', label: '国家重大战略政策解读', checked: false },
      { id: 'p2', label: '全面从严治党政策培训', checked: false },
      { id: 'p3', label: '廉洁文化与合规经营', checked: false },
      { id: 'p4', label: '法律法规专题讲座', checked: false }
    ]
  },
  {
    id: 'responsibility', roman: '三', title: '责任担当类',
    items: [
      { id: 'r1', label: '党员先锋模范作用培训', checked: false },
      { id: 'r2', label: '企业社会责任与绿色发展', checked: false },
      { id: 'r3', label: '危机管理与应急处置', checked: false },
      { id: 'r4', label: '青年党员成长成才引导', checked: false }
    ]
  },
  {
    id: 'practice', roman: '四', title: '党务实操类',
    items: [
      { id: 'pr1', label: '党支部标准化规范化建设', checked: false },
      { id: 'pr2', label: '党员发展与组织生活规范', checked: false },
      { id: 'pr3', label: '主题党日活动策划组织', checked: false },
      { id: 'pr4', label: '党建工作台账档案管理', checked: false }
    ]
  },
  {
    id: 'cooperation', roman: '五', title: '产教研合作类',
    items: [
      { id: 'c1', label: '校企联合人才培养', checked: false },
      { id: 'c2', label: '产学研协同创新', checked: false },
      { id: 'c3', label: '实习实训基地共建', checked: false },
      { id: 'c4', label: '科技成果转化合作', checked: false }
    ]
  }
]

Page({
  data: {
    needCategories: JSON.parse(JSON.stringify(NEED_CATEGORIES)),
    form: {
      companyName: '',
      contactName: '',
      phone: '',
      position: '',
      scale: '',
      remark: ''
    },
    scaleOptions: ['50人以下', '50-200人', '200-500人', '500-1000人', '1000人以上'],
    scaleIndex: 0,
    submitting: false
  },

  toggleNeed(e) {
    const { catId, itemId } = e.currentTarget.dataset
    const cats = this.data.needCategories
    const catIdx = cats.findIndex(c => c.id === catId)
    if (catIdx < 0) return
    const itemIdx = cats[catIdx].items.findIndex(it => it.id === itemId)
    if (itemIdx < 0) return
    const key = `needCategories[${catIdx}].items[${itemIdx}].checked`
    this.setData({ [key]: !cats[catIdx].items[itemIdx].checked })
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field
    this.setData({ [`form.${field}`]: e.detail.value })
  },

  onPickerChange(e) {
    const idx = parseInt(e.detail.value)
    this.setData({
      scaleIndex: idx,
      'form.scale': this.data.scaleOptions[idx]
    })
  },

  getSelectedNeeds() {
    const selected = []
    for (const cat of this.data.needCategories) {
      for (const item of cat.items) {
        if (item.checked) {
          selected.push({ catId: cat.id, catTitle: cat.title, itemId: item.id, itemLabel: item.label })
        }
      }
    }
    return selected
  },

  validate() {
    const { companyName, contactName, phone } = this.data.form
    if (!companyName.trim()) {
      wx.showToast({ title: '请填写企业名称', icon: 'none' })
      return false
    }
    if (!contactName.trim()) {
      wx.showToast({ title: '请填写联系人姓名', icon: 'none' })
      return false
    }
    if (!phone.trim() || !/^1[3-9]\d{9}$/.test(phone.trim())) {
      wx.showToast({ title: '请填写正确的联系电话', icon: 'none' })
      return false
    }
    const needs = this.getSelectedNeeds()
    if (needs.length === 0) {
      wx.showToast({ title: '请至少勾选一项需求', icon: 'none' })
      return false
    }
    return true
  },

  submitForm() {
    if (!this.validate()) return
    this.setData({ submitting: true })

    const selectedNeeds = this.getSelectedNeeds()
    const submitData = {
      ...this.data.form,
      selectedNeeds,
      status: 'pending',
      createTime: db.serverDate(),
      isRead: false
    }

    wx.cloud.callFunction({
      name: 'submitContact',
      data: submitData
    })
      .then(res => {
        this.setData({ submitting: false })
        if (res.result && res.result.success) {
          wx.showModal({
            title: '提交成功',
            content: '感谢您的需求提交！合肥城市学院党建工作团队将尽快与您联系。',
            showCancel: false,
            confirmText: '确定',
            success: () => {
              this.resetForm()
            }
          })
        } else {
          wx.showToast({ title: '提交失败，请重试', icon: 'error' })
        }
      })
      .catch(() => {
        this.setData({ submitting: false })
        wx.showToast({ title: '网络异常，请重试', icon: 'error' })
      })
  },

  resetForm() {
    this.setData({
      needCategories: JSON.parse(JSON.stringify(NEED_CATEGORIES)),
      form: { companyName: '', contactName: '', phone: '', position: '', scale: '', remark: '' }
    })
  }
})
