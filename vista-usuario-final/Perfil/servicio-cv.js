'use strict';

const boton_cv_edit = document.querySelector('#subir_cv_edit');
const nombre_cv_edit = document.querySelector("#nombre_cv_edit");
const cv_url_edit = document.querySelector("#cv_url_edit");

let widget_cloudinary_cv_edit = cloudinary.createUploadWidget({
    cloudName: 'dzmmllv2u',
    uploadPreset: 'preset_val',
    sources: ['local', 'url'],
    defaultSource: 'local',
    resourceType: 'raw',
    multiple: false,
    clientAllowedFormats: ['pdf'],
    maxFileSize: 5000000 // Por ejemplo, 5MB. Ajusta según tus necesidades
}, (err, result) => {
    if (!err && result && result.event === 'success') {
        console.log('CV subido con éxito', result.info);
        document.getElementById("cv_url_edit").value = result.info.secure_url;
        cv_url_edit.textContent = result.info.original_filename; // Mostramos el nombre del archivo en la sección de edición
    }
});

boton_cv_edit.addEventListener('click', () => {
    widget_cloudinary_cv_edit.open();
}, false);