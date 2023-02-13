<!-- Se procede con la creación del componente menú el cuál va a aparecer en las vistas disponibles
    y se procede con la creación de las variables nombre y rol las cuáles mostraran el rol y el usuario logueado-->

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
        integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand" href="./">
                <img src="@/assets/logo.png" class="logo" alt="Prueba Front-Entd"> Desarrollado Por Jesús Sarmiento
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav my-2 my-lg-0 navbar-nav-scroll ms-auto">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page">{{ nombre }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">{{ rol }}</a>
                    </li>
                    <li class="nav-item">
                        <router-link to="/" class="nav-link" href="./" @click="cerrarSesion()">Cerrar Sesión</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'MenuFront',
    props: {
        msg: String
    },
    data() {
        return {
            nombre: "",
            rol: "",
        }
    },
    mounted() {
        this.nombre = localStorage.getItem('nombre');
        this.rol = localStorage.getItem('rol');
    },
    methods: {
        cerrarSesion() {
            localStorage.clear();
            this.$router.push('/')
        }
    }
}
</script>