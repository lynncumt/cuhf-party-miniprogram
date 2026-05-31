const db = wx.cloud.database()
const { resolveImageFields } = require('../../utils/cloudImage')

Page({
  data: {
    videos: [
      { id: 'v1', title: '合肥城市学院学校宣传片', src: '', poster: '', duration: '5分钟' },
      { id: 'v2', title: '合肥城市学院校园风光展示', src: '', poster: '', duration: '3分钟' }
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
        const raw = res.data && res.data.length > 0 ? res.data : this.data.videos
        // 同时转换封面图和视频文件（src 也可能是 cloud://）
        return resolveImageFields(raw, ['poster', 'src']).then(videos => {
          this.setData({ videos, currentVideo: videos[0] })
        })
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
