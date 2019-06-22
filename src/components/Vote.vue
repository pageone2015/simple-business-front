<template>
  <div>
    <Rate v-model="logisticRate"/>
    后勤工作满意度<br>
    <Rate v-model="hygieneRate"/>
    卫生状况满意度<br>
    <Rate v-model="foodRate"/>
    食堂菜品满意度<br>
    <Rate v-model="estateRate"/>
    物业服务满意度<br>
    <Input v-model="suggestion" placeholder="请填写您的建议" style="width: 300px"/>
    <Button v-if="showSubmit" type="primary" @click="submitVote">提交</Button>
    <div v-if="!showSubmit">感谢您的投票</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showSubmit: true,
        logisticRate: 0,
        hygieneRate: 0,
        foodRate: 0,
        estateRate: 0,
        suggestion: ''
      }
    },
    created: function () {
      var username = sessionStorage.getItem("UserName");
      this.$http.post("/api/vote/queryVote", {
        userName: username
      }).then(function (data) {
        console.log(data);
        if (data.body.code === '0' && null != data.body.data) {
          this.showSubmit = false;
          this.logisticRate = data.body.data.logisticRate
          this.hygieneRate = data.body.data.hygieneRate
          this.foodRate = data.body.data.foodRate
          this.estateRate = data.body.data.estateRate
          this.suggestion = data.body.data.suggestion
        }
      })
    },
    methods: {
      submitVote: function () {
        var username = sessionStorage.getItem("UserName");
        this.$http.post("/api/vote/satisfyRate", {
          userName: username,
          logisticRate: this.logisticRate,
          hygieneRate: this.hygieneRate,
          foodRate: this.foodRate,
          estateRate: this.estateRate,
          suggestion: this.suggestion
        }).then(function () {
          this.$http.post("/api/vote/queryVote", {
            userName: username
          }).then(function (data) {
            if (data.body.code === '0' && null != data.body.data) {
              this.showSubmit = false;
              this.logisticRate = data.body.data.logisticRate
              this.hygieneRate = data.body.data.hygieneRate
              this.foodRate = data.body.data.foodRate
              this.estateRate = data.body.data.estateRate
              this.suggestion = data.body.data.suggestion
            }
          })
        })

      },
      search: function () {
        var username = sessionStorage.getItem("UserName");
        this.$http.post("/api/vote/queryVote", {
          userName: username
        })
      }
    }
  }
</script>
