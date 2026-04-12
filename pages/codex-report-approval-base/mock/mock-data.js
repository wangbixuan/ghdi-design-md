window.BENCHMARK_MOCK = {
  formData: {
    status: -1,
    statusLabel: "Pending Application",
    contractNo: "HT-2026-QL-031",
    projectType: "Bridge Design",
    projectName: "Expressway Bridge Expansion Design",
    responsibleDept: "Bridge Design Department",
    location: "Section K34-K52, Demo Expressway",
    ownerUnit: "Demo Highway Construction Co., Ltd.",
    projHaveOneYear: "Yes",
    produceStamp: "Yes",
    mgmtTeamType: 1,
    siteTeamType: 2,
    mgmtTeamMembers: [
      {
        id: "m-01",
        username: "chenzhiyong",
        usernameZh: "Chen Zhiyong",
        deptName: "Bridge Design Department",
        postQualification: "Registered Structural Engineer",
        title: "Senior Engineer",
        role: "Chief Coordinator",
        bz: "Overall coordination"
      }
    ],
    siteTeamMembers: [
      {
        id: "s-01",
        username: "huangjian",
        usernameZh: "Huang Jian",
        deptName: "Bridge Design Department",
        postQualification: "Registered Structural Engineer",
        title: "Senior Engineer",
        role: "On-Site Design Representative",
        major: "Bridge",
        bz: "On-site daily support",
        replacedBy: "",
        replacedByZh: ""
      },
      {
        id: "s-02",
        username: "zhouying",
        usernameZh: "Zhou Ying",
        deptName: "General Affairs Department",
        postQualification: "Project Coordination Specialist",
        title: "Engineer",
        role: "Liaison Officer",
        major: "Integrated Coordination",
        bz: "Document circulation",
        replacedBy: "",
        replacedByZh: ""
      }
    ]
  },
  options: {
    mgmtTeamTypeOptions: [
      { label: "New Assignment", value: 1 },
      { label: "Change Assignment", value: 2 }
    ],
    siteTeamTypeOptions: [
      { label: "New Assignment", value: 1 },
      { label: "Additional Assignment", value: 2 },
      { label: "Replacement", value: 3 },
      { label: "Cancellation", value: 4 }
    ],
    mgmtRoleOptions: [
      { label: "Chief Coordinator", value: "Chief Coordinator" },
      { label: "Working Group Member", value: "Working Group Member" }
    ],
    siteRoleOptions: [
      { label: "On-Site Design Representative", value: "On-Site Design Representative" },
      { label: "Liaison Officer", value: "Liaison Officer" }
    ],
    majorOptions: [
      { label: "Bridge", value: "Bridge" },
      { label: "Road", value: "Road" },
      { label: "Geotechnical", value: "Geotechnical" },
      { label: "Integrated Coordination", value: "Integrated Coordination" }
    ]
  },
  candidateUsers: [
    {
      id: "u-001",
      username: "chenzhiyong",
      usernameZh: "Chen Zhiyong",
      deptName: "Bridge Design Department",
      postQualification: "Registered Structural Engineer",
      title: "Senior Engineer",
      role: "Chief Coordinator",
      major: "Bridge"
    },
    {
      id: "u-002",
      username: "liuwanjing",
      usernameZh: "Liu Wanjing",
      deptName: "Road Design Department",
      postQualification: "Registered Civil Engineer",
      title: "Engineer",
      role: "Working Group Member",
      major: "Road"
    },
    {
      id: "u-003",
      username: "huangjian",
      usernameZh: "Huang Jian",
      deptName: "Bridge Design Department",
      postQualification: "Registered Structural Engineer",
      title: "Senior Engineer",
      role: "On-Site Design Representative",
      major: "Bridge"
    },
    {
      id: "u-004",
      username: "zhouying",
      usernameZh: "Zhou Ying",
      deptName: "General Affairs Department",
      postQualification: "Project Coordination Specialist",
      title: "Engineer",
      role: "Liaison Officer",
      major: "Integrated Coordination"
    },
    {
      id: "u-005",
      username: "zhanglin",
      usernameZh: "Zhang Lin",
      deptName: "Geotechnical Department",
      postQualification: "Registered Geotechnical Engineer",
      title: "Senior Engineer",
      role: "Working Group Member",
      major: "Geotechnical"
    },
    {
      id: "u-006",
      username: "heqing",
      usernameZh: "He Qing",
      deptName: "Road Design Department",
      postQualification: "Registered Civil Engineer",
      title: "Engineer",
      role: "On-Site Design Representative",
      major: "Road"
    },
    {
      id: "u-007",
      username: "wangrui",
      usernameZh: "Wang Rui",
      deptName: "Project Management Office",
      postQualification: "Project Manager",
      title: "Deputy Director",
      role: "Working Group Member",
      major: "Integrated Coordination"
    }
  ],
  workflowRecords: [
    {
      nodeName: "Initiator",
      assignee: "Chen Zhiyong",
      result: "Submitted",
      time: "2026-04-10 09:42",
      comment: "Draft submitted in system."
    },
    {
      nodeName: "Department Review",
      assignee: "Bridge Department Head",
      result: "Pending",
      time: "-",
      comment: "Waiting for review."
    },
    {
      nodeName: "Archive",
      assignee: "System",
      result: "Pending",
      time: "-",
      comment: "Will archive after all approvals."
    }
  ]
};
