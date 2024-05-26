const container = document.getElementById("main-container");
const spinner = document.querySelector(".spinner_container");
const btnnuevoPersonaje = document.getElementById("btn-nuevo-personaje");
const filtrosForm = document.getElementById("filtros");

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
						</div>`;
			});

			asignarEventosVerDetalle(document.querySelectorAll(".card-detalle-btn"));
			if (filtrosForm) {
				filtrosForm.style.display = "flex";
			}
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

		// Ocultar el formulario de filtros si existe
		if (filtrosForm) {
			filtrosForm.style.display = "none";
		}

		const {
			nombre,
			descripcion,
			imagen,
			temporadas,
			especialidad,
			estado,
			id,
		} = personaje;

		container.innerHTML = `

            <div class="container-modal">

            <div class="card-modal">
                <img class="movie-img" src="${imagen}" alt="Imagen de personajes" />
                <div class="text-movie-cont">
                <h1>${nombre}</h1>
                <ul class="movie-gen">
                    <li>${especialidad}</li>
                    <li>${temporadas}</li>
                    <li>${estado}</li>
                </ul>
                <p class="movie-description">${descripcion}</p>
                <div class="card-buttons">
                <button class="edit-button" data-cardId="${id}">Editar</button>
                <button class="delete-button" >Eliminar</button>
                </div>
                                         <a href="javascript:void(0);" class="go_back">Regresar</a>

                </div>

            </div>  <div class="container-form-editar">
			<div class="custom-container-editar">
				<!-- Aquí se agrega el botón "X" -->

				<form id="custom-form-editar" class="hidden">
					<button class="close-btn" type="button">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-x"
						>
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
					<h3>Edita tu personaje</h3>
					<h4>Recuerda...</h4>
					<fieldset>
						<label for="nombre">Nombre de personaje</label>
						<input
							type="text"
							placeholder="Ej. Meredith Grey"
							tabindex="1"
							required
							autofocus
							id="personaje-input"
						/>
						<label for="especialidad">Especialidad</label>
						<input
							type="text"
							placeholder="Ej. Cirugía general"
							tabindex="2"
							required
							id="especialidad-input"
						/>

						<label for="temporadas">Temporadas en las que aparece</label>
						<input
							type="number"
							placeholder="Ej. 20"
							tabindex="3"
							required
							id="temporadas-input"
						/>

						<label for="estado">Estado</label>
						<input
							type="text"
							placeholder="Ej. Vivo"
							tabindex="4"
							required
							id="estado-input"
						/>

						<label for="imagen">Imagen</label>
						<input
							type="url"
							placeholder="Ej. https://ejemplo.jpg"
							tabindex="5"
							required
							id="imagen-input"
						/>
					</fieldset>
					<fieldset>
						<label for="descripcion">Descripción</label>
						<textarea
							placeholder="Ej. Meredith es la protagonista principal de la serie..."
							tabindex="6"
							required
							id="descripcion-input"
						></textarea>
						<button
							type="submit"
							name="submit"
							data-submit="...Sending"
							class="btn-editar-modal"
						>
							Editar personaje
						</button>
					</fieldset>
				</form>
			</div>			</div>

		</div>
        
   	<div id="modal-eliminar" class="hidden">
			<div class="content-modal">
				<h2 class="pregunta-modal">Eliminar personaje</h2>
				<p>¿Estás seguro que deseas borrar este personaje?</p>
				<div class="btn-cerrar">
					<button id="confirmar-eliminar" data-cardId="${id}">
						Eliminar Personaje
					</button>
					<button id="cancelar-eliminar">Cancelar</button>
				</div>
			</div>
		</div>`;

		// funcion regresar
		document
			.querySelector(".go_back")
			.addEventListener("click", () => getPersonajes(baseUrl));

		const editarPersonajeForm = document.getElementById("custom-form-editar");
		//mostrar form editar personaje
		document
			.querySelector(".edit-button")
			.addEventListener("click", () => mostrarFormEditarPersonaje(personaje));
		const personajeInput = document.getElementById("personaje-input");
		const especialidadInput = document.getElementById("especialidad-input");
		const temporadasInput = document.getElementById("temporadas-input");
		const estadoInput = document.getElementById("estado-input");
		const imagenInput = document.getElementById("imagen-input");
		const descripcionInput = document.getElementById("descripcion-input");

		const mostrarFormEditarPersonaje = (personaje) => {
			personajeInput.value = personaje.nombre;
			especialidadInput.value = personaje.especialidad;
			temporadasInput.value = personaje.temporadas;
			estadoInput.value = personaje.estado;
			imagenInput.value = personaje.imagen;
			descripcionInput.value = personaje.descripcion;

			editarPersonajeForm.classList.remove("hidden");
		};
		//confirmar editar personaje

		const confirmarEditarPersonaje = (personaje) => {
			const personajeEdit = {
				...personaje,
				nombre: personajeInput.value,
				especialidad: especialidadInput.value,
				temporadas: temporadasInput.value,
				estado: estadoInput.value,
				imagen: imagenInput.value,
				descripcion: descripcionInput.value,
			};
			//console.log(personajeEdit);
			fetch(`${baseUrl}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(personajeEdit),
			})
				.then((res) => {
					if (res.ok) {
						getDetallePersonaje(id);
					}
				})
				.catch((err) => console.log(err));
		};
		//asignar funcion editar a botones

		editarPersonajeForm.addEventListener("submit", (e) => {
			e.preventDefault();
			confirmarEditarPersonaje(personaje);
		});

		//mostrar modal eliminar alumna

		const btnEliminarAlumna = document.querySelector(".delete-button");
		const modalEliminarAlumna = document.getElementById("modal-eliminar");
		btnEliminarAlumna.addEventListener("click", () => {
			modalEliminarAlumna.classList.remove("hidden");
		});

		//cancelar eliminar alumna
		document
			.getElementById("cancelar-eliminar")
			.addEventListener("click", () =>
				modalEliminarAlumna.classList.add("hidden")
			);

		//continuar eliminar
		document
			.getElementById("confirmar-eliminar")
			.addEventListener("click", (e) => {
				fetch(`${baseUrl}/${e.currentTarget.dataset.cardid}`, {
					method: "DELETE",
				}).then((res) =>
					res
						.json()
						.then((data) => {
							getPersonajes(baseUrl);
							// console.log(data);
						})
						.catch((err) => console.log(err))
				);
			});
	}, 2000);
};

console.log(btnnuevoPersonaje);

btnnuevoPersonaje.addEventListener("click", () => {
	container.innerHTML = `
    <div class="container-form-agregar" class="hidden">
				<div class="custom-container">
					<form class="custom-form" id="nuevo-personaje-form" method="post">
						<h3>Agregar tu personaje</h3>
						<h4>Recuerda...</h4>
						<fieldset>
							<label for="nombre">Nombre de personaje</label>
							<input
								type="text"
								placeholder="Ej. Meredith Grey"
								tabindex="1"
								required
								autofocus
                                id="nuevo-nombre-input"
							/>
							<label for="especialidad">Especialidad</label>
							<input
								type="text"
								placeholder="Ej. Cirugía general"
								tabindex="2"
								required
                                id="nuevo-especialidad-input"
							/>

							<label for="temporadas">Temporadas en las que aparece</label>
							<input type="number" placeholder="Ej. 20" tabindex="3" required id="nuevo-temporadas-input"/>

							<label for="estado">Estado</label>
							<input type="text" placeholder="Ej. Vivo" tabindex="4" required id="nuevo-estado-input"/>

							<label for="imagen">Imagen</label>
							<input
								type="url"
								placeholder="Ej. https://ejemplo.jpg"
								tabindex="5"
								required
                                id="nuevo-imagen-input"
							/>
						</fieldset>
						<fieldset>
							<label for="descripcion">Descripción</label>
							<textarea
								placeholder="Ej. Meredith es la protagonista principal de la serie..."
								tabindex="6"
								required
                                id="nuevo-descripcion-input"
							></textarea>

							<button
								type="submit"
								name="submit"
								data-submit="...Sending"
								class="btn-agregar-modal"
                                id="crearNuevoPersonaje"
							>
								Agregar personaje
							</button> 
                             <a href="javascript:void(0);" class="go_backDos">Regresar</a>
						</fieldset>
					</form>
				</div>
			</div>`;
	if (filtrosForm) {
		filtrosForm.style.display = "none";
	}
	const formCrearNuevoPersonaje = document.getElementById(
		"nuevo-personaje-form"
	);
	const nuevoPersonajeInput = document.getElementById("nuevo-nombre-input");
	const nuevoEspecialidadInput = document.getElementById(
		"nuevo-especialidad-input"
	);
	const nuevoTemporadasInput = document.getElementById(
		"nuevo-temporadas-input"
	);
	const nuevoEstadoInput = document.getElementById("nuevo-estado-input");
	const nuevoImagenInput = document.getElementById("nuevo-imagen-input");
	const nuevoDescripcionInput = document.getElementById(
		"nuevo-descripcion-input"
	);
	console.log(
		nuevoDescripcionInput,
		nuevoEspecialidadInput,
		nuevoEstadoInput,
		nuevoImagenInput,
		nuevoPersonajeInput,
		nuevoTemporadasInput
	);

	document
		.querySelector(".go_backDos")
		.addEventListener("click", () => getPersonajes(baseUrl));

	formCrearNuevoPersonaje.addEventListener("submit", (e) => {
		e.preventDefault();
		const nuevoPersonaje = {
			nombre: nuevoPersonajeInput.value,
			especialidad: nuevoEspecialidadInput.value,
			temporadas: nuevoTemporadasInput.value,
			estado: nuevoEstadoInput.value,
			imagen: nuevoImagenInput.value,
			descripcion: nuevoDescripcionInput.value,
		};

		fetch(`${baseUrl}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(nuevoPersonaje),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => {
				if (data) {
					formCrearNuevoPersonaje.reset();
					getPersonajes(baseUrl);
					console.log(data);
				} else {
					aler("ocurrio el siguiente error:");
				}
			})

			.catch((err) => aler(err));
	});
});

const urlObject = new URLSearchParams(baseUrl.search);
document
	.getElementById("especialidad-select")
	.addEventListener("change", (e) => {
		const especialidad = e.target.value;
		urlObject.set("especialidad", especialidad);
		getPersonajes(`${baseUrl}/?${urlObject}`);
	});

document.getElementById("temporadas-select").addEventListener("change", (e) => {
	const temporadasFilter = e.target.value;
	const url = temporadasFilter
		? `${baseUrl}?temporadas=${temporadasFilter}`
		: baseUrl;
	getPersonajes(url);
});

document.getElementById("estado-select").addEventListener("change", (e) => {
	const estado = e.target.value;
	urlObject.set("estado", estado);
	getPersonajes(`${baseUrl}/?${urlObject}`);
});
