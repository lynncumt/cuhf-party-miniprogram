const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  try {
    // 保存到数据库
    const result = await db.collection('contact_submissions').add({
      data: {
        openid,
        companyName: event.companyName || '',
        contactName: event.contactName || '',
        phone: event.phone || '',
        position: event.position || '',
        scale: event.scale || '',
        remark: event.remark || '',
        selectedNeeds: event.selectedNeeds || [],
        status: 'pending',
        isRead: false,
        createTime: db.serverDate()
      }
    })

    // 发送订阅消息提醒（需在小程序后台配置订阅消息模板）
    // 此处留空，可后续根据实际模板ID配置
    // await cloud.openapi.subscribeMessage.send({ ... })

    return {
      success: true,
      id: result._id
    }
  } catch (err) {
    console.error('submitContact error:', err)
    return {
      success: false,
      error: err.message
    }
  }
}
