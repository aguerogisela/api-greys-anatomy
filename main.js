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
				const { imagen, id, nombre, especialidad } = personaje;

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

                            <button class="card-detalle-btn" data-cardid="${id}">Ver detalles</button>
							</div>
						</div> `;
			});

			asignarEventosVerDetalle(document.querySelectorAll(".card-detalle-btn"));
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

getPersonajes(baseUrl);

const asignarEventosVerDetalle = (btns) => {
	btns.forEach((btn) =>
		btn.addEventListener("click", () => {
			getDetallePersonaje(btn.dataset.cardid);
			//getDetalleAlumna(btn.getAttribute("data-cardid"));
		})
	);
};

//Get detalle de una alumna

const getDetallePersonaje = (idPersonaje) => {
	console.log(idPersonaje);
	fetch(`${baseUrl}/${idPersonaje}`)
		.then((res) => res.json())
		.then((data) => mostrarDetalleAlummna(data))
		.catch((err) => console.log(err));
};

// const detalleContainer = document.getElementById("modal-info");

const mostrarDetalleAlummna = (personaje) => {
	renderSpinner();

	setTimeout(() => {
		hideSpinner();
		container.innerHTML = "";

		const { nombre, descripcion, imagen, temporadas, especialidad, vivo, id } =
			personaje;

		container.innerHTML = `


            <div class="card-modal">
                <img class="movie-img" src="${imagen}" alt="Imagen de personajes" />
                <div class="text-movie-cont">
                <h1>${nombre}r</h1>
                <ul class="movie-gen">
                    <li>${especialidad}</li>
                    <li>${temporadas}</li>
                    <li>${vivo}</li>
                </ul>
                <p class="movie-description">${descripcion}</p>
                <div class="card-buttons">
                <button class="edit-button" data-cardId="${id}">Editar</button>
                <button class="delete-button">Eliminar</button>
                </div>
                </div>
            </div>  `;
	});
};
