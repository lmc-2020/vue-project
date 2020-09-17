<template>
  <div id="list">
    <el-card class="box-card content-card">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          type="index"
          width="50"
          label="序号"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="姓名" width="150" align="center">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="joinDate"
          label="注册时间"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="qq" label="QQ" width="150" align="center">
        </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paging.page"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="paging.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="200"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { getUserList } from "@/api";

export default {
  name: "userList",
  data() {
    return {
      tableData: [],
      loading: true,
      paging: {
        page: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    getUserList() {
      this.loading = true;
      getUserList(this.paging)
        .then(e => {
          this.tableData = e.data;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 4 === 1) {
        return "warning-row";
      } else if (rowIndex % 4 === 3) {
        return "success-row";
      }
      return "";
    },
    handleSizeChange(val) {
      this.paging.pageSize = val;
    },
    handleCurrentChange(val) {
      this.paging.page = val;
    }
  },
  watch: {
    paging: {
      handler() {
        this.getUserList();
      },
      deep: true
    }
  },
  created() {
    this.getUserList();
  }
};
</script>
<style lang="scss">
@import "./list.scss";

.el-table {
  .warning-row {
    background: oldlace;
  }

  .success-row {
    background: #f0f9eb;
  }
}
</style>
