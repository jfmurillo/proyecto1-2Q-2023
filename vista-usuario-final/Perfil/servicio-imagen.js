'use strict';
let imageURL = "";

const boton_foto = document.querySelector('#fotoEdit');
const imagen = document.querySelector("#user-photo-edit");
const photoContainer = document.querySelector("#user-photo-container-edit");

let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'dzmmllv2u',
    uploadPreset: 'preset_val'
}, (err, result) => {
    if (!err && result && result.event === 'success') {
        console.log('Imagen subida con éxito', result.info);
        imagen.src = result.info.secure_url;
        imageURL = result.info.secure_url;
        imagen.style.display = 'block';  // Mostramos la imagen real
        photoContainer.style.backgroundImage = 'none';  // Removemos la imagen de fondo del contenedor
    }
});

boton_foto.addEventListener('click', () => {
    widget_cloudinary.open();
}, false);