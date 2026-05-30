const db = wx.cloud.database()

Page({
  data: {
    videos: [
      {
        id: 'v1',
        title: '合肥城市学院学校宣传片',
        src: '请在云数据库中添加视频地址',
        poster: '',
        duration: '5分钟'
      },
      {
        id: 'v2',
        title: '合肥城市学院校园风光展示',
        src: '请在云数据库中添加视频地址',
        poster: '',
        duration: '3分钟'
      }
    ],
    currentVideo: null
  },

  onLoad() {
    this.loadVideos()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  },

  loadVideos() {
    db.collection('videos').orderBy('sort', 'asc').get()
      .then(res => {
        if (res.data && res.data.length > 0) {
          this.setData({
            videos: res.data,
            currentVideo: res.data[0]
          })
        } else {
          this.setData({ currentVideo: this.data.videos[0] })
        }
      })
      .catch(() => {
        this.setData({ currentVideo: this.data.videos[0] })
      })
  },

  playVideo(e) {
    const idx = e.currentTarget.dataset.index
    const video = this.data.videos[idx]
    this.setData({ currentVideo: video })
    const videoCtx = wx.createVideoContext('mainVideo')
    videoCtx.play()
  },

  onVideoPlay() {},
  onVideoEnd() {}
})
