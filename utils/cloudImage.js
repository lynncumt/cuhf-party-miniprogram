/**
 * 将 cloud:// 路径批量转换为可显示的临时 HTTPS URL
 * @param {string|string[]} fileIDs - 单个或多个 cloud:// 路径
 * @returns {Promise<string|string[]>}
 */
function getTempUrls(fileIDs) {
  if (!fileIDs) return Promise.resolve('')

  const isArray = Array.isArray(fileIDs)
  const ids = isArray ? fileIDs : [fileIDs]

  // 过滤掉空值和非 cloud:// 路径（已是 https:// 的直接返回）
  const cloudIds = ids.filter(id => id && id.startsWith('cloud://'))
  const httpsMap = {}
  ids.forEach(id => {
    if (id && !id.startsWith('cloud://')) httpsMap[id] = id
  })

  if (cloudIds.length === 0) {
    const result = ids.map(id => httpsMap[id] || id || '')
    return Promise.resolve(isArray ? result : result[0])
  }

  return wx.cloud.getTempFileURL({ fileList: cloudIds })
    .then(res => {
      const urlMap = {}
      res.fileList.forEach(item => {
        urlMap[item.fileID] = item.tempFileURL
      })
      const result = ids.map(id => urlMap[id] || httpsMap[id] || id || '')
      return isArray ? result : result[0]
    })
}

/**
 * 处理包含 bannerImage/avatar/coverImage 等字段的对象数组
 * @param {object[]} items - 数据数组
 * @param {string[]} imageFields - 需要转换的图片字段名
 * @returns {Promise<object[]>}
 */
function resolveImageFields(items, imageFields) {
  if (!items || items.length === 0) return Promise.resolve(items)

  const allIds = []
  items.forEach(item => {
    imageFields.forEach(field => {
      if (item[field] && item[field].startsWith('cloud://')) {
        allIds.push(item[field])
      }
    })
  })

  if (allIds.length === 0) return Promise.resolve(items)

  return wx.cloud.getTempFileURL({ fileList: [...new Set(allIds)] })
    .then(res => {
      const urlMap = {}
      res.fileList.forEach(f => { urlMap[f.fileID] = f.tempFileURL })
      return items.map(item => {
        const newItem = Object.assign({}, item)
        imageFields.forEach(field => {
          if (newItem[field] && urlMap[newItem[field]]) {
            newItem[field] = urlMap[newItem[field]]
          }
        })
        return newItem
      })
    })
}

module.exports = { getTempUrls, resolveImageFields }
