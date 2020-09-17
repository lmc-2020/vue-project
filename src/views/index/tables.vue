<template>
  <div>
    <el-tabs v-model="activeType" @tab-click="handleClick">
      <el-tab-pane label="超级会员" name="first"></el-tab-pane>
      <el-tab-pane label="会员用户" name="second"></el-tab-pane>
      <el-tab-pane label="普通用户" name="third"></el-tab-pane>
    </el-tabs>
    <el-table
      :data="tableData"
      height="250"
      border
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100" align="center">
      </el-table-column>
      <el-table-column
        prop="joinDate"
        label="注册日期"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.joinDate | setTime }}
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="100" align="center">
      </el-table-column>
      <el-table-column prop="addr" label="地址" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getUserList } from "@/api";
import { formaDate } from "@/utils/common";

export default {
  name: "tables",
  data() {
    return {
      tableData: [],
      loading: true,
      activeType: "first"
    };
  },
  methods: {
    getList() {
      this.loading = true;
      getUserList({ pageSize: 10 })
        .then(e => {
          this.tableData = e.data;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    handleClick() {
      this.getList();
    }
  },
  filters: {
    setTime: e => formaDate(e, "yyyy-MM-dd")
  },
  mounted() {
    this.getList();
  }
};
</script>
