const clear = document.getElementById("clear");

clear.addEventListener("click", () => {
	console.log("Se hizo clic en el botón de limpiar.");
	getPersonajes(baseUrl);
});
