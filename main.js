const container = document.getElementById("main-container");
const spinner = document.querySelector(".spinner_container");

const baseUrl = "https://66147fdf2fc47b4cf27c6f23.mockapi.io/api/personajes";

const renderSpinner = () => {
	container.innerHTML = "";
	spinner.classList.remove("hidden");
};

const hideSpinner = () => {
	spinner.classList.add("hidden");
};

const renderPersonajes = (personajes) => {
	renderSpinner();

	setTimeout(() => {
		hideSpinner();
		container.innerHTML = "";
		if (personajes && personajes.length > 0) {
			personajes.forEach((personaje) => {
				const { imagen, id, nombre, especialidad } = personaje; // Corregido: cambiado "alumna" por "personaje"

				container.innerHTML += `
                <div class="card">
							<img
								class="card-img"
								src="${imagen}"
								alt="doctor"
							/>
							<div class="card-body">
								<h1 class="card-title">${nombre}</h1>
								<p class="card-sub-title">${especialidad}</p>

								<button class="card-btn" data-cardid="${id}">Ver detalles</button>
							</div>
						</div> `;
			});
		} else {
			container.innerHTML = "No se encontraron personajes";
		}
	}, 2000);
};

const getPersonajes = (fetchUrl) => {
	fetch(fetchUrl)
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				container.innerHTML = "No se encontraron personajes";
			}
		})
		.then((data) => {
			renderPersonajes(data);
		})
		.catch((err) => console.log(err));
};

getPersonajes(baseUrl); // Pasar la URL correcta a getPersonajes
