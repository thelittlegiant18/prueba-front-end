<!-- Se procede con la creación del HomeView que se encargara de mostrar el formulario del login -->

<template>
  <main class="form-signin w-100 m-auto cuerpo">
    <form v-on:submit.prevent="login">
      <img class="mb-4 logo" src="../assets/logo.png" alt="Prueba Front-End">
      <h1 class="h3 mb-3 fw-normal">Ingrese su usuario y contraseña</h1>
      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="correo" required>
        <label for="floatingInput">Ingrese su correo</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="contrasena" required>
        <label for="floatingPassword">Ingrese su contraseña</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Iniciar Sesión</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2023–2023</p>
    </form>
  </main>
</template>

<script>
import datos from "@/static/user.json";
import { show_alert } from '@/alerts.js';

export default {
  name: 'HomeView',
  data() {
    // console.log(window.location.href);
    return {
      correo: "",
      contrasena: "",
    }
  },
  mounted() {
    if (localStorage.getItem('correo')) {
      this.$router.push('/dashboard')
    } else {
      this.$router.push('/')
    }
  },
  methods: {

    login() {
      // const urlActual = window.location.href;
      let json = {
        "correo": this.correo,
        "contrasena": this.contrasena
      };

      let valid = -1;
      const mydata = JSON.parse(JSON.stringify(datos));
      // console.log(mydata)

      for (var i = 0; i < mydata.length; i++) {
        if ((json['correo'] == mydata[i].email) && (json['contrasena'] == mydata[i].password)) {
          valid = i;
          break;
        }
      }

      if (valid != -1) {
        show_alert('success', 'Excelente! <br>Se ha logueado correctamente')
        localStorage.setItem('nombre', mydata[i].nombre);
        localStorage.setItem('correo', mydata[i].email);
        localStorage.setItem('rol', mydata[i].rol);
        this.$router.push('/dashboard');
      } else {
        show_alert('error', 'Oops... <br>Usuario o contraseña incorrecto')
      }
    },
  },

}
</script>
