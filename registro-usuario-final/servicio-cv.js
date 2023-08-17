'use strict';

const boton_cv = document.querySelector('#subir_cv');
const nombre_cv = document.querySelector("#nombre_cv");

let widget_cloudinary_cv = cloudinary.createUploadWidget({
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
        document.getElementById("cv_url").value = result.info.secure_url;
        nombre_cv.textContent = result.info.original_filename; // Mostramos el nombre del archivo
    }
});

boton_cv.addEventListener('click', () => {
    widget_cloudinary_cv.open();
}, false);