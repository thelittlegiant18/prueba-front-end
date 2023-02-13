/** Se procede ocn la creación del apartado que contendrá las alertas y mensajes emergentes que se mostraran dependiendo de la función ejecutada */

import Swal from 'sweetalert2';

export function show_alert(icono, title) {
    let timerInterval;
    Swal.fire({
        icon: icono,
        title: title,
        html: 'La notificación se cerrara in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        },
        customClass: { confirmButton: 'btn btn-primary', popup: 'animated zoomIn' },
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            // console.log('I was closed by the timer')
        }
    })
}

export function descipcionMedallas(alertaMedalla) {
    Swal.fire({
        title: alertaMedalla,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}