const hamburguerBtn = document.getElementById("hamburguer-btn");
const navbar = document.querySelector(".nav");

hamburguerBtn.addEventListener("click", () => {
    hamburguerBtn.classList.toggle("active");
    navbar.classList.toggle("active");
});