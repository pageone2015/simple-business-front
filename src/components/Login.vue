<template>
  <div class="login-container" style="background-color: #141a48;margin: 0px;overflow: hidden;">
    <div id="canvascontainer" ref='can'></div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" class="card-box login-form">
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="Username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            {required: true, message: 'Please fill in the user name', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please fill in the password.', trigger: 'blur'},
            {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      container = document.createElement('div');
      this.$refs.can.appendChild(container);

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.z = 1000;

      scene = new THREE.Scene();

      particles = new Array();

      var PI2 = Math.PI * 2;
      var material = new THREE.ParticleCanvasMaterial({

        color: 0x0078de,
        program: function (context) {

          context.beginPath();
          context.arc(0, 0, 1, 0, PI2, true);
          context.fill();

        }

      });

      var i = 0;

      for (var ix = 0; ix < AMOUNTX; ix++) {

        for (var iy = 0; iy < AMOUNTY; iy++) {

          particle = particles[i++] = new THREE.Particle(material);
          particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
          particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
          scene.add(particle);

        }

      }

      renderer = new THREE.CanvasRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      document.addEventListener('mousemove', onDocumentMouseMove, false);
      //

      window.addEventListener('resize', onWindowResize, false);

      animate();
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            console.log("begin to post form data");
            this.$http.post("/api/user/isUserValid", {
              userName: this.formInline.user,
              password: this.formInline.password
            }).then(function (data) {
              console.log(data);
              if (null != data && null != data.body && data.body.code === "0" && data.body.data.flag === true) {
                console.log("begin to set sessionStorage");
                sessionStorage.setItem("Flag", "isLogin");
                sessionStorage.setItem("UserName", data.body.data.username);
                this.$router.push({path: '/home'})
              }
            })
          } else {
            this.$Message.error('Fail!');
          }
        })
      }
    }
  }

  var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

  var container;
  var camera, scene, renderer;

  var particles, particle, count = 0;

  var mouseX = 0, mouseY = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

  }

  //

  function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

  }

  function animate() {

    requestAnimationFrame(animate);

    render();


  }

  function render() {

    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY - camera.position.y) * .05;
    camera.lookAt(scene.position);

    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {

      for (var iy = 0; iy < AMOUNTY; iy++) {

        particle = particles[i++];
        particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
        particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;

      }

    }

    renderer.render(scene, camera);

    count += 0.1;

  }
</script>

<style>
  .login-container a {
    color: #0078de;
  }

  #canvascontainer {
    position: absolute;
    top: 0px;
  }

  .wz-input-group-prepend {
    background-color: #141a48;
    border: 1px solid #2d8cf0;
    border-right: none;
    color: #2d8cf0;
  }

</style>
<style rel="stylesheet/scss" lang="scss">
  .tips{
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }
  .login-container {
    height: 100vh;
    background-color: #2d3a4b;

    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 1px solid #2d8cf0;
      -webkit-appearance: none;
      border-radius: 3px;
      padding: 12px 5px 12px 15px;
      color: #eeeeee;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #889aa4;
    }

    .title {
      font-size: 26px;
      font-weight: 400;
      color: #eeeeee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    .forget-pwd {
      color: #fff;
    }
  }

</style>
