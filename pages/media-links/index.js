const db = wx.cloud.database()

Page({
  data: {
    mediaLinks: [
      {
        id: 'website',
        type: 'web',
        name: '校园官网',
        handle: '请在云数据库中配置官网链接',
        url: 'https://www.cuhf.edu.cn',
        icon: '🌐',
        bgColor: '#E3F2FD'
      },
      {
        id: 'wechat',
        type: 'wechat',
        name: '微信官号',
        handle: '合肥城市学院',
        url: '',
        appid: '',
        path: '',
        icon: '💬',
        bgColor: '#E8F5E9'
      },
      {
        id: 'douyin',
        type: 'web',
        name: '抖音官号',
        handle: '请在云数据库中配置抖音主页链接',
        url: '',
        icon: '🎵',
        bgColor: '#FCE4EC'
      },
      {
        id: 'xiaohongshu',
        type: 'web',
        name: '小红书官号',
        handle: '请在云数据库中配置小红书主页链接',
        url: '',
        icon: '📕',
        bgColor: '#FFF3E0'
      }
    ],
    qrcodes: [
      { id: 'qr_wechat', name: '微信公众号', icon: '💬' },
      { id: 'qr_mini', name: '微信小程序', icon: '📱' }
    ]
  },

  onLoad() {
    this.loadLinks()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
  },

  loadLinks() {
    db.collection('media_links').limit(1).get()
      .then(res => {
        if (res.data && res.data.length > 0) {
          const d = res.data[0]
          if (d.mediaLinks) this.setData({ mediaLinks: d.mediaLinks })
          if (d.qrcodes) this.setData({ qrcodes: d.qrcodes })
        }
      })
      .catch(() => {})
  },

  openLink(e) {
    const { type, url, appid, path, name } = e.currentTarget.dataset

    if (type === 'web' && url && !url.startsWith('请')) {
      wx.setClipboardData({
        data: url,
        success: () => {
          wx.showModal({
            title: '链接已复制',
            content: '请在手机浏览器中粘贴打开：\n' + url,
            showCancel: false,
            confirmText: '知道了'
          })
        }
      })
    } else if (type === 'wechat' && appid) {
      wx.navigateToMiniProgram({ appId: appid, path: path })
    } else {
      wx.showToast({ title: '链接待配置，请联系管理员', icon: 'none', duration: 2000 })
    }
  }
})
