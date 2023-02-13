<!-- Se procede con la creación del Dashboard el cuál contendra la información a mostrar dependiendo del tipo de usaurio logueado -->

<template>
    <MenuFront />
    <div class="container p-4">
        <div class="row">
            <div v-if="rol == 'Administrador'">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#atletas"
                            type="button" role="tab" aria-controls="home" aria-selected="false">Listado de
                            Atletas</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#medallas"
                            type="button" role="tab" aria-controls="profile" aria-selected="true">Categoría de
                            Medallas</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="atletas" role="tabpanel" aria-labelledby="home-tab">
                        <div class="table-responsive">
                            <DataTable :data="atletas" :columns="columns"
                                class="table table-striped table-bordered table-hover display" :options="{
                                    responsive: true, autoWidth: false, dom: 'Blfrtip', pageLength: 10, language: {
                                        sLengthMenu: 'Ver _MENU_ entradas', show: 'Ver', search: 'Buscar', zeroRecords: 'No hay registros para mostrar',
                                        sInfoEmpty: 'Mostrando _START_ de _END_ de _TOTAL_ registros',
                                        info: 'Mostrando registros _START_ a _END_ de _TOTAL_ registros', infoFiltered: '(Filtrados de _MAX_ registros.)',
                                        paginate: { first: 'Primero', previous: 'Anterior', next: 'Siguiente', last: 'Último' }
                                    }, buttons: botones
                                }">
                                <thead class="overflow-scroll">
                                    <tr>
                                        <th>#</th>
                                        <th>Atleta</th>
                                        <th>Edad</th>
                                        <th>País</th>
                                        <th>Año</th>
                                        <th>Fecha</th>
                                        <th>Deporte</th>
                                        <th>Oro</th>
                                        <th>Plata</th>
                                        <th>Bronce</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                            </DataTable>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="medallas" role="tabpanel" aria-labelledby="profile-tab">
                        <br>
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover align-middle display">
                                <thead class="overflow-scroll">
                                    <tr>
                                        <th>#</th>
                                        <th>Medalla</th>
                                        <th>Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td><a  class="btn" v-on:click="alertaMedallas(oro)"><img src="@/assets/medallas/oro.png" class="img-fluid medallas" alt="icono de oro"></a> Oro</td>
                                        <td>{{ sumaGold }}</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td><a  class="btn" v-on:click="alertaMedallas(plata)"><img src="@/assets/medallas/plata.png" class="img-fluid medallas" alt="icono de plata"></a> Plata</td>
                                        <td>{{ sumaSilver }}</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td><a  class="btn" v-on:click="alertaMedallas(bronce)"><img src="@/assets/medallas/bronce.png" class="img-fluid medallas" alt="icono de bronce"></a> Bronce</td>
                                        <td>{{ sumaBronze }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="rol == 'Coordinador'" class="text-center">
                <div class="card shadow">
                    <div class="card-body">
                        <img class="img-fluid" src="@/assets/mantenimiento.png" style="width: 80%;"
                            alt="Apartado en Mantenimiento">
                    </div>
                </div>
            </div>
            <div v-else class="">
                <div class="card shadow">
                    <div class="card-body">
                        <p>Error, no se ha encontrado información</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import axios from 'axios';
import { descipcionMedallas } from '@/alerts.js';
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5';
import print from 'datatables.net-buttons/js/buttons.print';
import pdfmake from 'pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";
import 'datatables.net-responsive-bs5';
import JsZip from 'jszip';
import MenuFront from '@/components/MenuFront.vue'

window.JSZip = JsZip;
pdfmake.vfs = pdfFonts.pdfMake.vfs;
DataTable.use(DataTablesLib);
DataTable.use(pdfmake);
DataTable.use(pdfFonts);
DataTable.use(print);
DataTable.use(Buttons);
DataTable.use(ButtonsHtml5);
export default {
    name: "Dashboard",
    components: { DataTable, MenuFront },
    data() {
        // console.log(window.location.href);
        return {
            atletas: null,
            rol: "",
            oro: "Esta es la ventana emergente de Oro",
            plata: "Esta es la ventana emergente de Plata",
            bronce: "Esta es la ventana emergente de Bronce",
            columns: [
                {
                    data: null, render: function (data, type, row, meta) { return `${meta.row + 1}` }
                },
                { data: 'athlete' },
                { data: 'age' },
                { data: 'country' },
                { data: 'year' },
                { data: 'date' },
                { data: 'sport' },
                { data: 'gold' },
                { data: 'silver' },
                { data: 'bronze' },
                { data: 'total' },
            ],
            sumaGold: '',
            sumaSilver: null,
            sumaBronze: null,
            botones: [
                {
                    title: 'Reporte de Prueba Desarrollador-Front-End',
                    extend: 'excelHtml5',
                    text: '<i class="fa-solid fa-file-excel"></i> Excel',
                    className: 'btn btn-success'
                },
                {
                    title: 'Reporte de Prueba Desarrollador-Front-End',
                    extend: 'pdfHtml5',
                    text: '<i class="fa-solid fa-file-pdf"></i> PDF',
                    className: 'btn btn-danger'
                },
                {
                    title: 'Reporte de Prueba Desarrollador-Front-End',
                    extend: 'print',
                    text: '<i class="fa-solid fa-print"></i> Imprimir',
                    className: 'btn btn-secondary'
                },
                {
                    title: 'Reporte de Prueba Desarrollador-Front-End',
                    extend: 'copy',
                    text: '<i class="fa-solid fa-copy"></i> Copiar Texto',
                    className: 'btn btn-dark'
                },
            ],
        };
    },
    mounted() {
        if (localStorage.getItem('correo') && localStorage.getItem('rol') == 'Administrador') {
            this.getAtletas();
            this.rol = localStorage.getItem('rol');
        } else if (localStorage.getItem('correo') && localStorage.getItem('rol') == 'Coordinador') {
            this.rol = localStorage.getItem('rol');
        } else {
            this.$router.push('/')
        }
    },
    methods: {
        // getAtletas() {
        //     const respuesta = axios.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json').then(
        //         response => (
        //             this.atletas = response.data
        //         ),
        //     );
        //     const datosObtenidos = JSON.parse(JSON.stringify(respuesta));
        //     // console.log(datosObtenidos)
        // },
        async getAtletas() {
            const respuesta = await fetch('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json')

            this.atletas = await respuesta.json();

            const datosObtenidos = this.atletas;

            class sumaMedallas extends Array {
                sum(key) {
                    return this.reduce((a, b) => a + (b[key] || 0), 0);
                }
            }
            const resultadoObtenido = new sumaMedallas(...datosObtenidos);

            this.sumaGold = resultadoObtenido.sum('gold');
            this.sumaSilver = resultadoObtenido.sum('silver');
            this.sumaBronze = resultadoObtenido.sum('bronze');

        },

        alertaMedallas(oro, plata, bronce){
            descipcionMedallas(oro, plata, bronce);
        }
    }
};
</script>
