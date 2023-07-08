const SecondMenu = document.querySelector(".secondMenu")
const blackScreen = document.querySelector(".blackScreen")
const buttonMenu = document.querySelector(".buttonMenu")
const CloseMenu = document.querySelector(".CloseMenu")
const menuItems = document.querySelectorAll(".menuSection")

menuItems.forEach(menuItem => {
  menuItem.addEventListener("click", toggleHamburger)
})

buttonMenu.addEventListener("click", toggleHamburger)
CloseMenu.addEventListener("click", toggleHamburger)
blackScreen.addEventListener("click", toggleHamburger)

function toggleHamburger() {
  blackScreen.classList.toggle("showblackScreen")
  SecondMenu.classList.toggle("showNav")
}
