<template>
  <div id="list-template">
    <el-card class="box-card content-card">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-table
            :data="tableData[0]"
            stripe
            border
            v-loading="loading[0]"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="序号"
              width="50"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="70" align="center">
            </el-table-column>
            <el-table-column prop="addr" label="地址" align="center">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table
            ref="multipleTable"
            :data="tableData[1]"
            tooltip-effect="dark"
            border
            style="width: 100%"
            v-loading="loading[1]"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="70" align="center">
            </el-table-column>
            <el-table-column prop="addr" label="地址" align="center">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-table
            :data="tableData[2]"
            v-loading="loading[2]"
            border
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="序号"
              width="50"
              align="center"
            ></el-table-column>
            <el-table-column label="姓名" align="center" width="100">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.name }}</p>
                  <p>住址: {{ scope.row.addr }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="注册日期" align="center" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.joinDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table
            :data="tableData[3]"
            v-loading="loading[3]"
            border
            style="width: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column prop="name" label="姓名" sortable width="100">
            </el-table-column>
            <el-table-column
              prop="joinDate"
              label="注册日期"
              sortable
              width="180"
            >
            </el-table-column>
            <el-table-column prop="addr" label="地址"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { getUserList } from "@/api";

export default {
  name: "listTemplate",
  data() {
    return {
      tableData: [[], [], [], []],
      multipleSelection: [],
      loading: [true, true, true, true]
    };
  },
  methods: {
    getUserList() {
      return new Promise((resolve, reject) => {
        getUserList({ pageSize: 5 })
          .then(e => {
            resolve(e);
          })
          .catch(err => reject(err));
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  created() {
    this.tableData.forEach((item, i) => {
      this.getUserList()
        .then(e => {
          this.$set(this.tableData, i, e.data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => this.$set(this.loading, i, false));
    });
  }
};
</script>
<style lang="scss">
@import "./list.scss";
</style>
