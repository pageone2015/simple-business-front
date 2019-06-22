<template>
  <Table stripe border :columns="columns" :data="fruits">
  </Table>
</template>

<script>
  export default {
    data() {
      return {
        columns:[
          {
            title: '水果名称',
            key: 'fruitName'
          },
          {
            title: '水果描述',
            key: 'fruitDesc'
          },
          {
            title: '图片地址',
            key: 'savePath'
          }
        ],
        fruits: []
      }
    },
    created: function () {
      this.search();
    },
    methods:{
      search: function () {
        this.$http.get("/api/fruit/queryAllFruits").then(function (data) {
          console.log(data);
          this.fruits = data.body.data;
        })
      }
    }
  }
</script>
