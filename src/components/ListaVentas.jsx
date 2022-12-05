// Importar modulos
import styled from 'styled-components';
import { useState } from 'react';

// Importar componentes
import FiltroListaVentas from './FiltroListaVentas';
import ListaVentasRenglones from './ListaVentasRenglones';
import Encabezado from './Encabezado';
import BarraNavegacion from './BarraNavegacion';
import VentanaEmergente from './VentanaEmergente';

// Estilos ///////////////////////////////////////////////////////////////////////
// Estilo para el componente completo
const ListaVentasEstilo = styled.div`
	width: 90%;
	height: 900px;
	margin: auto;
	padding: 1rem;
	background-color: yellow;
	border: 4px solid red;
	/* Estilo del layout */
	display: grid;
	grid-template-columns: 1fr 5fr;
	grid-template-rows: 100px 100px 700px;
	grid-template-areas:
		'Encabezado Encabezado'
		'Nav Nav'
		'Form Lista';
`;

// Estilos para el encabezado
const EncabezadoEstilo = styled.header`
	grid-area: Encabezado;
	background-color: lightblue;
	border: 4px solid red;
	text-align: center;
`;

// Estilos para la barra de navegacion
const BarraNavegacionEstilo = styled.nav`
	grid-area: Nav;
	background-color: lightgreen;
	border: 4px solid red;

	> ul {
		display: flex;
		justify-content: center;
		/* Elimina los puntos */
		list-style: none;
	}

	li {
		padding: 10px;
		border: 4px solid red;
		margin: 0 40px 0 40px;
	}
`;

// Estilos para el formulario de filtrado
const FiltroListaVentasEstilo = styled.div`
	grid-area: Form;
	display: flex;
	border: 4px solid red;
	background-color: lightgray;
`;

// Estilos para los renglones de productos
const ListaVentasRenglonesEstilo = styled.section`
	grid-area: Lista;
	min-width: 800px;
	background-color: lightpink;
	border: 4px solid red;
	overflow: scroll;
`;

// Componente ///////////////////////////////////////////////////////////////////////
const ListaVentas = ({ ventasIniciales }) => {
	// Parte 1. Declarar todos los hooks a usar en el componente

	// Custom Hook para crear el estado filters y destructurar sus componentes y su handleFilters
	const {
		buscar,
		filtrarPor,
		ordenarPor,
		fechaInicio,
		fechaFinal,
		horaInicio,
		horaFinal,
		manejarFiltros
	} = useFiltros();

	// Hook para renderizar la ventana emergente
	const [ventaDetalles, setVentaDetalles] = useState([]);

	const {
		estadoVentanaEmergente,
		setEstadoVentanaEmergente,
		mostrarDetallesVenta
	} = useVentanaEmergente(setVentaDetalles);

	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. Crear las funciones que van a ser llamadas en cada renderizado

	// 1. Filtrar usuarios por nombre
	let ventasFiltradas = filtrarVentasPorCampo(
		ventasIniciales,
		filtrarPor,
		buscar
	);

	// 2. Filtrar usuarios por fecha
	ventasFiltradas = filtrarVentasPorFecha(
		ventasFiltradas,
		fechaInicio,
		fechaFinal
	);

	// 3. Filtrar ventas por hora
	ventasFiltradas = filtrarVentasPorHora(
		ventasFiltradas,
		horaInicio,
		horaFinal
	);

	// 3. Ordenar usuarios
	ventasFiltradas = ordenarVentas(ventasFiltradas, ordenarPor);

	// Parte 3. Crear el HTML que se va a renderizar en App
	return (
		// Un estilo para todo el componente
		<ListaVentasEstilo>
			{/* ENCABEZADO */}
			<EncabezadoEstilo>
				<Encabezado />
			</EncabezadoEstilo>
			{/* PANEL DE NEVAGACION */}
			<BarraNavegacionEstilo>
				<BarraNavegacion />
			</BarraNavegacionEstilo>
			{/* CONTENIDO PRINCIPAL */}
			{/* FILTRO DE USUARIOS */}
			<FiltroListaVentasEstilo>
				<FiltroListaVentas manejarFiltros={manejarFiltros} />
			</FiltroListaVentasEstilo>

			{/* LISTA DE USUARIOS */}
			<ListaVentasRenglonesEstilo>
				<ListaVentasRenglones
					ventas={ventasFiltradas}
					mostrarDetallesVenta={mostrarDetallesVenta}
				/>
			</ListaVentasRenglonesEstilo>
			<VentanaEmergente
				estado={estadoVentanaEmergente}
				cambiarEstado={setEstadoVentanaEmergente}
				ventaDetalles={ventaDetalles}
			/>
		</ListaVentasEstilo>
	);
};

// Parte 4. Crear las funciones que generan los custom hooks
// Función para crear estado filter y su setState
const useFiltros = () => {
	const [filtros, setFiltros] = useState({
		buscar: '',
		filtrarPor: 0,
		ordenarPor: 0,
		fechaInicio: '',
		fechaFinal: '',
		horaInicio: '',
		horaFinal: ''
	});
	const manejarFiltros = (
		buscar,
		filtrarPor,
		ordenarPor,
		fechaInicio,
		fechaFinal,
		horaInicio,
		horaFinal
	) => {
		setFiltros({
			buscar,
			filtrarPor,
			ordenarPor,
			fechaInicio,
			fechaFinal,
			horaInicio,
			horaFinal
		});
	};

	return {
		...filtros,
		manejarFiltros
	};
};

const useVentanaEmergente = setVentaDetalles => {
	const [estadoVentanaEmergente, setEstadoVentanaEmergente] = useState(false);

	const mostrarDetallesVenta = detallesVenta => {
		setVentaDetalles(detallesVenta);
		setEstadoVentanaEmergente(true);
	};

	return {
		estadoVentanaEmergente,
		setEstadoVentanaEmergente,
		mostrarDetallesVenta
	};
};

// Funcion para crear estado users y su toggleActiveUsers

// Parte 5. Crear las funciones que manipulan los estados
// Funcion para filtrar usuarios por nombre
const filtrarVentasPorCampo = (ventas, campo, buscar) => {
	// Si no hay nombre para buscar, regresa todos los usuarios
	// Regresamos una copia para tener una funcion pura
	if (!buscar) return [...ventas];
	// Pasa el nombre a buscar a minusculas
	const minusculaBusqueda = buscar.toLowerCase();
	// Filtra los usuarios con el nombre de busqueda

	switch (campo) {
		case 0:
			return ventas.filter(venta =>
				venta.CLIENTE.toLowerCase().startsWith(minusculaBusqueda)
			);
		case 1:
			return ventas.filter(venta =>
				venta['TIPO DE VENTA'].toLowerCase().startsWith(minusculaBusqueda)
			);
		case 2:
			return ventas.filter(venta =>
				venta['TIPO DE PAGO'].toLowerCase().startsWith(minusculaBusqueda)
			);
		case 3:
			return ventas.filter(venta =>
				venta.STATUS.toLowerCase().startsWith(minusculaBusqueda)
			);
		case 4:
			return ventas.filter(venta =>
				venta.REPARTIDOR.toLowerCase().startsWith(minusculaBusqueda)
			);
		case 5:
			return ventas.filter(venta =>
				venta.ATIENDE.toLowerCase().startsWith(minusculaBusqueda)
			);
	}
};

// Funcion para filtrar ventas por fecha
const filtrarVentasPorFecha = (ventas, fechaInicio, fechaFinal) => {
	if (!fechaInicio || !fechaFinal) return [...ventas];

	return ventas.filter(venta =>
		estaEntreFechas(venta.FECHA, fechaInicio, fechaFinal)
	);
};

const estaEntreFechas = (fechaStr, fechaInicioStr, fechaFinalStr) => {
	// Convertir el str fecha a un objeto Date
	const [dia, mes, anio] = fechaStr.split('/');
	const fecha = new Date(+anio, +mes - 1, +dia);
	const fechaInicio = new Date(fechaInicioStr);
	const fechaFinal = new Date(fechaFinalStr);

	return fechaFinal > fecha && fecha > fechaInicio;
};

// Funcion para filtrar ventas por hora
const filtrarVentasPorHora = (ventas, horaInicio, horaFinal) => {
	if (!horaInicio || !horaFinal) return [...ventas];

	return ventas.filter(
		venta => horaInicio < venta.HORA && venta.HORA < horaFinal
	);
};

// Función para ordenar los usuarios
const ordenarVentas = (ventas, ordenarPor) => {
	const ventasOrdenadas = [...ventas];
	switch (ordenarPor) {
		// Ordenar tabla de ventas por nombre de cliente
		case 1:
			return ventasOrdenadas.sort((a, b) => {
				if (a.CLIENTE > b.CLIENTE) return 1;
				if (a.CLIENTE < b.CLIENTE) return -1;
				return 0;
			});
		// Ordenar tabla de ventas por fecha
		case 2:
			return ventasOrdenadas.sort((a, b) => {
				const [diaA, mesA, anioA] = a.FECHA.split('/');
				const fechaA = new Date(+anioA, +mesA - 1, +diaA);
				const [diaB, mesB, anioB] = b.FECHA.split('/');
				const fechaB = new Date(+anioB, +mesB - 1, +diaB);
				if (fechaA > fechaB) return 1;
				if (fechaA < fechaB) return -1;
				return 0;
			});
		// Ordenar tabla de ventas por hora
		case 3:
			return ventasOrdenadas.sort((a, b) => {
				if (a.HORA > b.HORA) return 1;
				if (a.HORA < b.HORA) return -1;
				return 0;
			});
		// Ordenar tabla de ventas por nombre de repartidor
		case 4:
			return ventasOrdenadas.sort((a, b) => {
				if (a.REPARTIDOR > b.REPARTIDOR) return 1;
				if (a.REPARTIDOR < b.REPARTIDOR) return -1;
				return 0;
			});
		// Ordenar tabla de ventas por nombre del que atiende
		case 5:
			return ventasOrdenadas.sort((a, b) => {
				if (a.ATIENDE > b.ATIENDE) return 1;
				if (a.ATIENDE < b.ATIENDE) return -1;
				return 0;
			});
		default:
			return ventasOrdenadas;
	}
};

export default ListaVentas;
