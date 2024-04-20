document.getElementById("botonMostrar").addEventListener("click", () => {
	const sidebar = document.querySelector(".barra-lateral");
	sidebar.style.display = "flex";
});

document.getElementById("botonOcultar").addEventListener("click", () => {
	const sidebar = document.querySelector(".barra-lateral");
	sidebar.style.display = "none";
});
