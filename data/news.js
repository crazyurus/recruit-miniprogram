const college = [
  {
    label: '材料学院'
  },
  {
    label: '材料示范学院'
  },
  {
    label: '交通物流学院'
  },
  {
    label: '船海能动学院'
  },
  {
    label: '汽车学院'
  },
  {
    label: '机电学院'
  },
  {
    label: '土建学院'
  },
  {
    label: '资环学院'
  },
  {
    label: '信息学院'
  },
  {
    label: '计算机智能学院'
  },
  {
    label: '自动化学院'
  },
  {
    label: '航运学院'
  },
  {
    label: '理学院'
  },
  {
    label: '化生学院'
  },
  {
    label: '管理学院'
  },
  {
    label: '经济学院'
  },
  {
    label: '艺设学院'
  },
  {
    label: '外语学院'
  },
  {
    label: '法学社会学院'
  },
  {
    label: '安全应急学院'
  },
  {
    label: '马克思主义学院'
  },
  {
    label: '国教学院'
  },
  {
    label: '创业学院'
  },
  {
    label: '现代产业学院'
  },
  {
    label: '体育学院'
  }
];
const department = [
  {
    label: '党政办'
  },
  {
    label: '组织部'
  },
  {
    label: '宣传部'
  },
  {
    label: '统战部'
  },
  {
    label: '纪委监察处'
  },
  {
    label: '学工部'
  },
  {
    label: '武装部'
  },
  {
    label: '离退休处'
  },
  {
    label: '工会'
  },
  {
    label: '团委'
  },
  {
    label: '规划与学科办'
  },
  {
    label: '余区管委会'
  },
  {
    label: '本科生院'
  },
  {
    label: '文化素质基地'
  },
  {
    label: '艺术教育中心'
  },
  {
    label: '数字资源中心'
  },
  {
    label: '电工电子实验中心'
  },
  {
    label: '研究生院'
  },
  {
    label: '科发院'
  },
  {
    label: '人事处'
  },
  {
    label: '劳动用工办'
  },
  {
    label: '国际处'
  },
  {
    label: '信息化办'
  },
  {
    label: '财务处'
  },
  {
    label: '国资处'
  },
  {
    label: '保卫处'
  },
  {
    label: '评估处'
  },
  {
    label: '审计处'
  },
  {
    label: '基建处'
  },
  {
    label: '后保处'
  },
  {
    label: '社会合作处'
  },
  {
    label: '招投标办'
  },
  {
    label: '科技转化中心'
  },
  {
    label: '医管办'
  },
  {
    label: '体育学院'
  },
  {
    label: '督导办'
  }
];

module.exports = [
  {
    label: '学校通知公告',
    children: department,
  },
  {
    label: '部门新闻',
    children: [
      {
        label: '职能部门',
      },
      {
        label: '科研院所',
      },
      {
        label: '直属单位',
      },
      {
        label: '附属单位',
      }
    ],
  },
  {
    label: '学院·所·中心通知公告',
    children: [
      {
        label: '学院',
      },
      {
        label: '科研机构',
      },
      {
        label: '直属单位',
      },
      {
        label: '附属单位',
      }
    ],
  },
  {
    label: '学院新闻',
    children: college,
  },
  {
    label: '学术讲座·报告·论坛',
    children: [
      {
        label: '学院',
      },
      {
        label: '科研基地',
      },
      {
        label: '职能部门',
      },
      {
        label: '直属单位',
      }
    ],
  }
];
