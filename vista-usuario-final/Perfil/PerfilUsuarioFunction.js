document.addEventListener("DOMContentLoaded", function () {
  const editAvatarBtn = document.querySelector(".edit-avatar-btn");
  const editProfileBtn = document.querySelector(".edit-profile-btn");
  const addExperienceBtn = document.querySelector(".add-experience-btn");
  const addEducationBtn = document.querySelector(".add-education-btn");

  editAvatarBtn.addEventListener("click", function () {
    // Lógica para editar el avatar del usuario
    console.log("Editar avatar");
  });

  editProfileBtn.addEventListener("click", function () {
    // Lógica para editar el perfil del usuario
    console.log("Editar perfil");
  });

  addExperienceBtn.addEventListener("click", function () {
    // Lógica para agregar una experiencia de trabajo
    console.log("Agregar experiencia de trabajo");
  });

  addEducationBtn.addEventListener("click", function () {
    // Lógica para agregar educación
    console.log("Agregar educación");
  });
});
