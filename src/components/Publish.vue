<template>
  <div>
    水果名称<Input v-model="fruitName" placeholder="Enter something..." style="width: 300px" /><br/>
    水果描述<Input v-model="description" placeholder="Enter something..." style="width: 300px" />
    <Upload ref="upload" :before-upload="handleUpload" action="/api/upload/">
      <Button icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
    <div v-if="file !== null">Upload file: {{ file.name }}
      <Button type="text" @click="upload">Click to upload</Button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        file: null,
        fruitName:"",
        description:""
      }
    },
    methods: {
      handleUpload(file) {
        this.file = file;
        return false;
      },
      upload () {
        //this.$refs.upload.post(this.file);
        console.log("The name is " + this.fruitName);
        let fileFormData = new FormData();
        fileFormData.append('file', this.file, this.file.name);
        fileFormData.append('fruitName', this.fruitName);
        fileFormData.append('description', this.description);
        let requestConfig = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
        this.$http.post("/api/fruit/upload/",fileFormData, requestConfig)
      }
    }
  }
</script>
