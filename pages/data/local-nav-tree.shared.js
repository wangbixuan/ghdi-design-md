(function (global) {
  const navTree = [
    {
      id: 'enterprise_culture',
      label: '企业文化',
      expanded: true,
      children: [
        { id: 'enterprise_culture_all', label: '全部' },
        { id: 'enterprise_culture_video', label: '宣传视频' },
        { id: 'enterprise_culture_album', label: '宣传画册' },
        { id: 'enterprise_culture_handbook', label: '员工文化手册' },
        { id: 'enterprise_culture_poster', label: '展板海报' },
        { id: 'enterprise_culture_association', label: '兴趣协会风采' },
        { id: 'enterprise_culture_social_responsibility', label: '社会责任' }
      ]
    },
    {
      id: 'laws_regulations',
      label: '法律法规',
      expanded: true,
      children: [
        { id: 'laws_regulations_all', label: '全部' }
      ]
    },
    {
      id: 'daily_management',
      label: '日常管理',
      expanded: true,
      selected: true,
      children: [
        { id: 'daily_management_all', label: '全部' },
        { id: 'daily_management_production', label: '生产经营类' },
        { id: 'daily_management_technical_quality', label: '技术质量类' },
        { id: 'daily_management_hr', label: '人力资源类', selected: true },
        { id: 'daily_management_administration', label: '行政管理类' },
        { id: 'daily_management_finance', label: '财务管理类' },
        { id: 'daily_management_information', label: '信息管理类' },
        { id: 'daily_management_rd', label: '研发管理类' },
        { id: 'daily_management_logistics', label: '后勤管理类' },
        { id: 'daily_management_other', label: '其他' }
      ]
    }
  ];

  const thirdLevelByTypeId = {
    enterprise_culture_all: ['文化总览', '年度主题', '视觉规范', '品牌故事', '下载专区'],
    enterprise_culture_video: ['宣传片', '活动视频', '培训视频', '采访纪实', '发布记录'],
    enterprise_culture_album: ['画册总览', '专题画册', '电子画册', '印刷版本', '设计源文件'],
    enterprise_culture_handbook: ['手册目录', '制度篇', '行为篇', '价值观篇', '更新记录'],
    enterprise_culture_poster: ['党建海报', '安全海报', '质量海报', '节日海报', '宣传栏模板'],
    enterprise_culture_association: ['协会介绍', '活动计划', '活动风采', '报名入口', '荣誉展示'],
    enterprise_culture_social_responsibility: ['公益活动', '志愿服务', 'ESG实践', '社会反馈', '年度报告'],
    laws_regulations_all: ['国家法规', '行业规范', '公司制度', '合规清单', '常见问答'],
    daily_management_all: ['制度总览', '流程导航', '模板中心', '案例库', 'FAQ'],
    daily_management_production: ['生产制度', '经营指标', '运营报表', '检查清单', '复盘案例'],
    daily_management_technical_quality: ['技术标准', '质量体系', '抽检记录', '问题闭环', '改进案例'],
    daily_management_hr: ['招聘配置', '培训发展', '绩效考核', '员工关系', '人事制度', '表单模板'],
    daily_management_administration: ['行政制度', '公文管理', '会议管理', '资产管理', '后勤服务'],
    daily_management_finance: ['财务制度', '预算管理', '报销规范', '税务管理', '审计要点'],
    daily_management_information: ['信息制度', '系统运维', '权限管理', '数据安全', '应急预案'],
    daily_management_rd: ['研发流程', '项目立项', '技术评审', '成果归档', '知识沉淀'],
    daily_management_logistics: ['后勤制度', '物资保障', '车辆管理', '食堂宿舍', '服务工单'],
    daily_management_other: ['综合事项', '跨部门协同', '临时通知', '经验分享', '资料归档']
  };

  function shouldAttachThirdLevel(typeId) {
    if (!typeId) return false;
    let hash = 0;
    const text = String(typeId);
    for (let i = 0; i < text.length; i++) {
      hash = (hash * 31 + text.charCodeAt(i)) % 9973;
    }
    return hash % 2 === 0;
  }

  function getThirdLevelNodes(typeNode) {
    const stableTypeId = (typeNode && (typeNode.localTypeId || typeNode.id)) || '';
    if (!shouldAttachThirdLevel(stableTypeId)) return [];
    const base = thirdLevelByTypeId[stableTypeId] || ['总览', '操作指引', '模板下载', '案例参考', '常见问题'];
    return base.map((title, idx) => ({
      id: `${stableTypeId}_lv3_${idx + 1}`,
      title
    }));
  }

  global.GHDILeftNavSource = {
    navTree,
    getThirdLevelNodes
  };
})(window);
