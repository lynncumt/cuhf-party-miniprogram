const db = wx.cloud.database()

Page({
  data: {
    campuses: [
      {
        id: 'binhu1',
        name: '滨湖校区（一）',
        address: '安徽省合肥市包河区方兴大道（请在云数据库中更新实际地址）',
        postcode: '230601',
        phone: '',
        lat: 31.7389,
        lng: 117.3029
      },
      {
        id: 'binhu2',
        name: '滨湖校区（二）',
        address: '安徽省合肥市包河区（请在云数据库中更新实际地址）',
        postcode: '230601',
        phone: '',
        lat: 31.7389,
        lng: 117.3029
      },
      {
        id: 'shucheng',
        name: '舒城校区',
        address: '安徽省六安市舒城县（请在云数据库中更新实际地址）',
        postcode: '231300',
        phone: '',
        lat: 31.4626,
        lng: 116.9485
      }
    ],
    phones: [
      { dept: '学校总机', number: '0551-XXXXXXXX' },
      { dept: '党委办公室', number: '0551-XXXXXXXX' },
      { dept: '校企合作办公室', number: '0551-XXXXXXXX' }
    ]
  },

  onLoad() {
    this.loadAddress()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },

  loadAddress() {
    db.collection('campus_address').limit(1).get()
      .then(res => {
        if (res.data && res.data.length > 0) {
          const d = res.data[0]
          this.setData({
            campuses: d.campuses || this.data.campuses,
            phones: d.phones || this.data.phones
          })
        }
      })
      .catch(() => {})
  },

  openMap(e) {
    const { name, address, lat, lng } = e.currentTarget.dataset
    wx.openLocation({
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      name: name,
      address: address,
      scale: 15
    })
  },

  callPhone(e) {
    const phone = e.currentTarget.dataset.phone
    if (phone && phone.indexOf('X') < 0) {
      wx.makePhoneCall({ phoneNumber: phone })
    } else {
      wx.showToast({ title: '电话号码待更新', icon: 'none' })
    }
  }
})
