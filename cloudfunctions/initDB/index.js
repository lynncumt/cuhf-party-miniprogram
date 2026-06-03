const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 所有初始数据
const DATA = {
  school_overview: [{
    bannerImage: '',
    content: '<p>合肥城市学院是经教育部批准设立的全日制普通本科高校，坐落于安徽省合肥市，现有<strong>滨湖校区</strong>和<strong>舒城校区</strong>两个校区，占地面积约1500亩。</p><p>学校坚持应用型办学定位，以立德树人为根本任务，深入推进产教融合、校企合作，致力于培养德智体美劳全面发展的高素质应用型人才。现设有4个二级学院、9个系，开设本科专业30余个，在校学生近万人。</p><p>学校党委高度重视党的建设工作，积极探索校企党建互助共建新路径，通过组织联建、理论联学、活动联办、人才联育、发展联动五大机制，与多家企业建立了稳固的党建共建关系。</p>',
    updateTime: '2025-05-01'
  }],

  colleges: [
    {
      id: 'college_jian', name: '智能建造与能源学院', icon: '🏗️',
      desc: '智能建造、能源工程等专业', sort: 1, bannerImage: '',
      content: '<p>智能建造与能源学院以服务建筑行业数字化转型和新能源产业发展为导向，培养具有扎实理论基础和较强实践能力的应用型工程技术人才。</p>',
      majors: ['土木工程', '智能建造', '建筑环境与能源应用工程', '新能源科学与工程', '工程造价'],
      departments: [
        { name: '土木工程系', desc: '承担土木工程、智能建造等专业的教学工作' },
        { name: '能源工程系', desc: '承担新能源、建筑环境等专业的教学工作' }
      ]
    },
    {
      id: 'college_kong', name: '空间设计与规划学院', icon: '🎨',
      desc: '建筑设计、城乡规划等专业', sort: 2, bannerImage: '',
      content: '<p>空间设计与规划学院致力于培养具有创新设计思维和实践能力的应用型设计人才，服务安徽省城镇化建设和文化创意产业发展。</p>',
      majors: ['建筑学', '城乡规划', '风景园林', '环境设计', '视觉传达设计'],
      departments: [
        { name: '建筑规划系', desc: '承担建筑学、城乡规划等专业的教学工作' },
        { name: '艺术设计系', desc: '承担环境设计、视觉传达等专业的教学工作' }
      ]
    },
    {
      id: 'college_shu', name: '数字经济与管理学院', icon: '💻',
      desc: '数字经济、工商管理等专业', sort: 3, bannerImage: '',
      content: '<p>数字经济与管理学院聚焦数字经济发展前沿，培养掌握现代管理理论与数字技术的复合型应用人才，服务区域经济社会发展。</p>',
      majors: ['工商管理', '数字经济', '电子商务', '会计学', '大数据管理与应用'],
      departments: [
        { name: '工商管理系', desc: '承担工商管理、会计学等专业的教学工作' },
        { name: '数字经济系', desc: '承担数字经济、电子商务等专业的教学工作' }
      ]
    },
    {
      id: 'college_ji', name: '现代机电工程学院', icon: '⚙️',
      desc: '机械工程、电气工程等专业', sort: 4, bannerImage: '',
      content: '<p>现代机电工程学院面向先进制造业和智能制造发展需求，培养具备机电一体化技术能力的高素质应用型工程人才。</p>',
      majors: ['机械设计制造及其自动化', '电气工程及其自动化', '机器人工程', '智能制造工程', '计算机科学与技术'],
      departments: [
        { name: '机械工程系', desc: '承担机械设计、智能制造等专业的教学工作' },
        { name: '电气工程系', desc: '承担电气工程、机器人工程等专业的教学工作' }
      ]
    }
  ],

  party_intro: [{
    bannerImage: '',
    background: '<p>党的二十大报告明确指出，要深化产教融合、科教融汇。在新时代党的建设伟大工程深入推进的背景下，加强校企党建联建、互助共建，既是贯彻落实习近平新时代中国特色社会主义思想的重要举措，也是推动产学研深度融合、实现校企合作共赢的有效路径。</p><p>合肥城市学院积极探索校企党建互助新模式，充分发挥高校党建资源优势，主动对接企业党建需求，构建起覆盖组织、理论、活动、人才、发展五大领域的校企党建互助共建体系。</p>',
    sixNeeds: ['组织建设规范化需求', '理论学习系统化需求', '党建活动多元化需求', '人才培育专业化需求', '党务实操精准化需求', '发展资源共享化需求'],
    projects: [
      { num: '01', title: '组织互助联建', desc: '推动校企党组织结对共建，签署共建协议，实现党建工作优势互补、资源共享' },
      { num: '02', title: '理论互助联学', desc: '共建学习平台，定期开展联合理论学习、政治培训和党史教育活动' },
      { num: '03', title: '活动互助联办', desc: '联合开展主题党日、志愿服务、文体活动等各类党建品牌活动' },
      { num: '04', title: '人才互助联育', desc: '校企共同参与人才培养方案制定，推动产教深度融合，实现人才共育' },
      { num: '05', title: '发展互助联动', desc: '整合校企双方资源，协同攻克发展难题，实现互利共赢、共同进步' }
    ]
  }],

  party_resources: [{
    intro: '<p>合肥城市学院拥有丰富的党建思政教育资源，涵盖组织、理论、人才三大维度，构建了较为完善的校企党建互助资源供给体系，可为合作企业提供全方位的党建智力支持。</p>',
    resources: [
      {
        id: 'org', icon: '🏛️', title: '组织资源',
        content: '<p>学校现有党委1个，二级学院党总支4个，教工党支部和学生党支部共计30余个，党员总数超过800人。组织体系健全，党建工作制度完备，能够为企业党支部建设提供组织示范和结对共建支持。</p>',
        tags: ['党委', '党总支', '基层党支部', '800+党员']
      },
      {
        id: 'theory', icon: '📖', title: '理论资源',
        content: '<p>学校建有马克思主义学院，拥有完善的思想政治理论课程体系，涵盖习近平新时代中国特色社会主义思想、党史、形势与政策等核心课程。同时拥有党建研究所，长期承担省市党建课题研究。</p>',
        tags: ['马克思主义学院', '思政课程', '党建研究所', '省市课题']
      },
      {
        id: 'talent', icon: '👥', title: '人才资源',
        content: '<p>学校拥有专职党务工作者30余名，思政课专任教师20余名，党建研究专家10余名，其中省级以上优秀党务工作者5名。可为企业提供党建讲座、党务培训、理论宣讲等专业智力服务。</p>',
        tags: ['30+党务工作者', '20+思政教师', '省级优秀党务工作者']
      }
    ]
  }],

  experts: [
    { name: '张XX', title: '党建思政方向首席专家 | 教授 | 马克思主义学院院长', expertise: ['习近平新时代中国特色社会主义思想', '党史教育', '思想引领'], intro: '长期从事党的建设和思想政治教育研究，主持国家社科基金项目1项、省部级项目4项，曾获安徽省优秀思政课教师称号。', avatar: '', sort: 1 },
    { name: '李XX', title: '党建研究专家 | 副教授 | 党委组织部部长', expertise: ['党务实操', '党支部建设', '政策阐释'], intro: '从事高校党建工作15年，主持省级党建研究课题3项，有丰富的基层党支部建设和党务培训实战经验。', avatar: '', sort: 2 },
    { name: '王XX', title: '思政课骨干教师 | 讲师 | 马克思主义学院', expertise: ['责任担当', '理论宣讲', '青年党员教育'], intro: '获评安徽省高校思政课大赛一等奖，擅长理论与实践相结合的互动式教学，深受企业党员好评。', avatar: '', sort: 3 }
  ],

  course_db: [{
    categories: [
      { id: 'cat1', roman: '一', title: '思想引领类', courses: [
        { name: '习近平新时代中国特色社会主义思想专题讲座', duration: '3课时' },
        { name: '党的二十大精神深度解读与贯彻落实', duration: '2课时' },
        { name: '中国共产党党史学习教育专题', duration: '4课时' },
        { name: '社会主义核心价值观与企业文化建设', duration: '2课时' }
      ]},
      { id: 'cat2', roman: '二', title: '政策阐释类', courses: [
        { name: '国家重大战略政策解读（长三角一体化等）', duration: '2课时' },
        { name: '全面从严治党政策专题培训', duration: '2课时' },
        { name: '企业廉洁文化建设与合规经营', duration: '2课时' },
        { name: '劳动法律法规与员工权益保障', duration: '2课时' }
      ]},
      { id: 'cat3', roman: '三', title: '责任担当类', courses: [
        { name: '党员先锋模范作用发挥专题', duration: '2课时' },
        { name: '企业社会责任与绿色低碳发展', duration: '2课时' },
        { name: '危机管理与应急处置能力提升', duration: '2课时' },
        { name: '青年党员成长成才专题引导', duration: '2课时' }
      ]},
      { id: 'cat4', roman: '四', title: '党务实操类', courses: [
        { name: '党支部标准化规范化建设实务', duration: '3课时' },
        { name: '党员发展程序与组织生活规范', duration: '2课时' },
        { name: '主题党日活动策划与组织实操', duration: '2课时' },
        { name: '党建工作台账与档案规范管理', duration: '2课时' }
      ]}
    ]
  }],

  cases: [
    {
      title: '合肥城市学院与XX科技有限公司签署校企党建互助共建协议',
      summary: '双方党支部正式结对共建，将在组织互建、理论联学、活动联办等五个维度深化合作，共同探索新时代校企党建工作新模式。',
      content: '<p>2025年5月，合肥城市学院党委与XX科技有限公司党支部正式签署《校企党建互助共建协议》，标志着双方党建合作进入新阶段。</p><p>签约仪式上，学校党委书记表示，此次合作是落实党中央关于加强党的建设、深化产教融合决策部署的具体举措，学校将充分发挥党建资源优势，为企业党建工作提供有力支撑。</p><p>根据协议，双方将在组织互助联建、理论互助联学、活动互助联办、人才互助联育、发展互助联动五个方面开展深度合作。</p>',
      coverImage: '', date: '2025-05-10', tags: ['协议签署', '组织联建'],
      createTime: new Date('2025-05-10')
    },
    {
      title: '校企联合开展「青年党员共学党史」主题党日活动',
      summary: '来自合肥城市学院和合作企业的青年党员代表共50余人齐聚一堂，重温百年党史，传承红色基因，凝聚奋进力量。',
      content: '<p>近日，合肥城市学院党委与合作企业党支部联合举办「青年党员共学党史」主题党日活动，吸引双方青年党员代表共50余人参加。</p><p>活动中，学校马克思主义学院教授作了题为《从党史中汲取奋进力量》的专题报告，深入浅出地讲述了中国共产党百年奋斗历程中的感人故事。</p><p>本次活动受到双方党员的热烈好评，后续双方将每季度联合开展一次主题党日活动。</p>',
      coverImage: '', date: '2025-04-25', tags: ['主题党日', '党史学习', '青年党员'],
      createTime: new Date('2025-04-25')
    }
  ],

  campus_address: [{
    campuses: [
      { id: 'binhu1', name: '滨湖校区（一）', address: '安徽省合肥市包河区方兴大道169号', postcode: '230601', phone: '0551-63600000', lat: 31.7389, lng: 117.3029 },
      { id: 'binhu2', name: '滨湖校区（二）', address: '安徽省合肥市包河区紫云路999号', postcode: '230601', phone: '0551-63600001', lat: 31.7350, lng: 117.3100 },
      { id: 'shucheng', name: '舒城校区', address: '安徽省六安市舒城县桃溪镇学府路1号', postcode: '231300', phone: '0564-8888888', lat: 31.4626, lng: 116.9485 }
    ],
    phones: [
      { dept: '学校总机', number: '0551-63600000' },
      { dept: '党委办公室', number: '0551-63600001' },
      { dept: '校企合作办公室', number: '0551-63600002' }
    ]
  }],

  videos: [
    { title: '合肥城市学院学校宣传片', src: '', poster: '', duration: '请上传视频后填写', sort: 1 },
    { title: '合肥城市学院校园风光展示', src: '', poster: '', duration: '请上传视频后填写', sort: 2 }
  ],

  media_links: [{
    mediaLinks: [
      { id: 'website', type: 'web', name: '校园官网', handle: 'www.cuhf.edu.cn', url: 'https://www.cuhf.edu.cn', icon: '🌐', bgColor: '#E3F2FD' },
      { id: 'wechat', type: 'wechat', name: '微信公众号', handle: '合肥城市学院', url: '', appid: '', path: '', icon: '💬', bgColor: '#E8F5E9' },
      { id: 'douyin', type: 'web', name: '抖音官号', handle: '@合肥城市学院', url: '', icon: '🎵', bgColor: '#FCE4EC' },
      { id: 'xiaohongshu', type: 'web', name: '小红书官号', handle: '@合肥城市学院', url: '', icon: '📕', bgColor: '#FFF3E0' }
    ],
    qrcodes: [
      { id: 'qr_wechat', name: '微信公众号', icon: '💬' },
      { id: 'qr_mini', name: '微信小程序', icon: '📱' }
    ]
  }]
}

exports.main = async (event, context) => {
  const results = {}
  const errors = {}

  for (const [collection, records] of Object.entries(DATA)) {
    try {
      // 清空已有数据（避免重复）
      const existing = await db.collection(collection).limit(100).get()
      for (const doc of existing.data) {
        await db.collection(collection).doc(doc._id).remove()
      }

      // 插入新数据
      const inserted = []
      for (const record of records) {
        const res = await db.collection(collection).add({ data: record })
        inserted.push(res._id)
      }
      results[collection] = `成功插入 ${inserted.length} 条`
    } catch (err) {
      errors[collection] = err.message
    }
  }

  return { success: true, results, errors }
}
