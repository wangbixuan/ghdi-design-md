(function initBenchmarkPage() {
  const mock = window.BENCHMARK_MOCK || {};

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function createTeamMemberFromUser(user, team) {
    return {
      id: "",
      username: user.username,
      usernameZh: user.usernameZh,
      deptName: user.deptName,
      postQualification: user.postQualification,
      title: user.title || "-",
      role: team === "mgmt" ? "" : user.role || "",
      major: team === "site" ? user.major || "" : "",
      bz: "",
      replacedBy: "",
      replacedByZh: ""
    };
  }

  new Vue({
    el: "#app",
    data: function data() {
      return {
        activeAnchor: "basic",
        form: deepClone(mock.formData || {}),
        mgmtTeamTypeOptions: deepClone((mock.options && mock.options.mgmtTeamTypeOptions) || []),
        siteTeamTypeOptions: deepClone((mock.options && mock.options.siteTeamTypeOptions) || []),
        mgmtRoleOptions: deepClone((mock.options && mock.options.mgmtRoleOptions) || []),
        siteRoleOptions: deepClone((mock.options && mock.options.siteRoleOptions) || []),
        majorOptions: deepClone((mock.options && mock.options.majorOptions) || []),
        candidateUsers: deepClone(mock.candidateUsers || []),
        workflowRecords: deepClone(mock.workflowRecords || []),
        memberDialog: {
          visible: false,
          targetTeam: "site",
          mode: "add",
          targetIndex: null,
          keyword: "",
          pageNum: 1,
          pageSize: 5,
          selectedId: ""
        }
      };
    },
    computed: {
      submitButtonLabel: function submitButtonLabel() {
        return this.form.status === -1 ? "Submit" : "Resubmit";
      },
      statusTagType: function statusTagType() {
        if (this.form.status === 1) return "success";
        if (this.form.status === -2 || this.form.status === -3) return "warning";
        return "info";
      },
      filteredDialogUsers: function filteredDialogUsers() {
        const keyword = (this.memberDialog.keyword || "").toLowerCase();
        if (!keyword) return this.candidateUsers;
        return this.candidateUsers.filter(function filterUser(user) {
          const fields = [user.usernameZh, user.username, user.deptName, user.role, user.major]
            .filter(Boolean)
            .join("|")
            .toLowerCase();
          return fields.indexOf(keyword) >= 0;
        });
      },
      dialogUserTotal: function dialogUserTotal() {
        return this.filteredDialogUsers.length;
      },
      pagedDialogUsers: function pagedDialogUsers() {
        const start = (this.memberDialog.pageNum - 1) * this.memberDialog.pageSize;
        const end = start + this.memberDialog.pageSize;
        return this.filteredDialogUsers.slice(start, end);
      }
    },
    methods: {
      handleMgmtTeamTypeChange: function handleMgmtTeamTypeChange() {
        this.form.mgmtTeamMembers = [];
      },
      handleSiteTeamTypeChange: function handleSiteTeamTypeChange() {
        this.form.siteTeamMembers = [];
      },
      openMemberDialog: function openMemberDialog(team, mode, index) {
        this.memberDialog.visible = true;
        this.memberDialog.targetTeam = team;
        this.memberDialog.mode = mode || "add";
        this.memberDialog.targetIndex = typeof index === "number" ? index : null;
        this.memberDialog.selectedId = "";
        this.memberDialog.keyword = "";
        this.memberDialog.pageNum = 1;
      },
      resetMemberFilter: function resetMemberFilter() {
        this.memberDialog.keyword = "";
        this.memberDialog.pageNum = 1;
      },
      confirmMemberSelection: function confirmMemberSelection() {
        const targetId = this.memberDialog.selectedId;
        const selectedUser = this.candidateUsers.find(function findUser(user) {
          return user.id === targetId;
        });

        if (!selectedUser) {
          this.$message.warning("Please select one member.");
          return;
        }

        if (this.memberDialog.mode === "replace" && this.memberDialog.targetTeam === "site") {
          const row = this.form.siteTeamMembers[this.memberDialog.targetIndex];
          if (!row) {
            this.$message.warning("Target row was not found.");
            return;
          }
          row.replacedBy = selectedUser.username;
          row.replacedByZh = selectedUser.usernameZh;
          this.memberDialog.visible = false;
          return;
        }

        const targetList = this.memberDialog.targetTeam === "mgmt"
          ? this.form.mgmtTeamMembers
          : this.form.siteTeamMembers;

        const duplicate = targetList.some(function isDuplicate(item) {
          return item.username === selectedUser.username;
        });
        if (duplicate) {
          this.$message.warning("Selected member is already in the list.");
          return;
        }

        targetList.push(createTeamMemberFromUser(selectedUser, this.memberDialog.targetTeam));
        this.memberDialog.visible = false;
      },
      deleteMgmtMember: function deleteMgmtMember(index) {
        this.form.mgmtTeamMembers.splice(index, 1);
      },
      deleteSiteMember: function deleteSiteMember(index) {
        this.form.siteTeamMembers.splice(index, 1);
      },
      handleSave: function handleSave() {
        this.$message.success("Draft saved (mock).");
      },
      validateBeforeSubmit: function validateBeforeSubmit() {
        if (!this.form.siteTeamMembers.length && !this.form.mgmtTeamMembers.length) {
          this.$message.warning("At least one team member is required.");
          return false;
        }

        if (this.form.siteTeamMembers.length && !this.form.siteTeamType) {
          this.$message.warning("Please select site team type.");
          return false;
        }
        if (this.form.mgmtTeamMembers.length && !this.form.mgmtTeamType) {
          this.$message.warning("Please select company group type.");
          return false;
        }

        const invalidMgmt = this.form.mgmtTeamMembers.some(function hasInvalidMgmt(item) {
          return !item.usernameZh || !item.role;
        });
        if (invalidMgmt) {
          this.$message.warning("Company group rows require Name and Role.");
          return false;
        }

        const isCancelMode = this.form.siteTeamType === 4;
        const invalidSite = this.form.siteTeamMembers.some(function hasInvalidSite(item) {
          if (!item.usernameZh) return true;
          if (isCancelMode) return false;
          return !item.role || !item.major;
        });
        if (invalidSite) {
          this.$message.warning("Site team rows require Name, Major and Role.");
          return false;
        }
        return true;
      },
      handleSubmit: function handleSubmit() {
        if (!this.validateBeforeSubmit()) return;
        this.$confirm(
          "Submit this report approval application in mock mode?",
          "Confirm",
          { type: "warning" }
        ).then(() => {
          this.form.status = 0;
          this.form.statusLabel = "Submitted";
          this.$message.success("Submitted successfully (mock).");
        }).catch(function noop() {});
      }
    }
  });
})();
