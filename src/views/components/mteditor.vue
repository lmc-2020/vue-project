<template>
  <div>
    <el-card class="box-card content-card">
      <MTEditor v-model="message"/>
    </el-card>
  </div>
</template>
<script>
import MTEditor from "MTEditor";

export default {
  name: "meditor",
  data() {
    return {
      message: ""
    };
  },
  components: { MTEditor }
};
</script>
