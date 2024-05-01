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
						</div> 
                        
                     
                        
                        
                        `;
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
                    <a href="javascript:void(o)" class="go_back">Regresar</a>
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
						<input type="submit" name="" id="Editar" />
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
			</div>
		</div>`;
		document
			.querySelector(".go_back")
			.addEventListener("click", () => getPersonajes(baseUrl));
		//
	}, 2000);
};

//confirmar editar personaje
const confirmarEditarPersonaje = () => {};
//asignar funcion editar a botones
