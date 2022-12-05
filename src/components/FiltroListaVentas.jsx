// Importar modulos
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import styled from 'styled-components';

// Estilos para el componente ////////////////////////////////////////////////////////////////

// Estilo para el componente completo
const FiltroListaProductosEstilo = styled.form`
	padding: 1rem;

	/* Estilo del Layout */
	display: grid;
	grid-gap: 10px;
	grid-template-rows: 0.2fr 1fr 1fr 1fr 0.2fr 0.2fr;
	grid-template-areas:
		'Buscar'
		'Ordenar'
		'Fecha'
		'Hora'
		'Exportar'
		'Resumen';
`;

// Estilo para el campo de buscar
const BuscarEstilo = styled.div`
	grid-area: Buscar;
	border: 4px solid red;
	display: grid;
	grid-gap: 5px;
`;

// Estilo para el campo de ordenar
const SeleccionarOrdenEstilo = styled.div`
	grid-area: Ordenar;
	border: 4px solid red;
`;

// Estilo para el rango de fechas
const RangoFechaEstilo = styled.div`
	grid-area: Fecha;
	border: 4px solid red;
	display: grid;
`;

// Estilo para el rango de horas
const RangoHoraEstilo = styled.div`
	grid-area: Hora;
	border: 4px solid red;
	display: grid;
`;

// Estilo para el campo de exportar
const ExportarVentasEstilo = styled.div`
	grid-area: Exportar;
	border: 4px solid red;
	display: grid;
	height: 50px;
`;

// Estilo para el campo de resumen
const ResumenEstilo = styled.div`
	grid-area: Resumen;
	border: 4px solid red;
	display: grid;
	height: 50px;
`;

// Componente /////////////////////////////////////////////////////////////////////////
const FiltroListaVentas = ({ manejarFiltros, setMostrarResumen }) => {
	// Parte 1. Crear los hooks a usar en el componente
	// Crear datos del formulario

	// Obtener la fecha actual
	const hoy = obtenerFechaActual();

	// Establecer valore por defecto del formulario
	const { register, watch, handleSubmit } = useForm({
		defaultValues: {
			buscar: '',
			filtrarPor: 1,
			ordenarPor: 0,
			fechaInicio: '',
			fechaFinal: hoy,
			horaInicio: '',
			horaFinal: ''
		}
	});

	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. Funciones que se llaman con cada renderizado

	// Observar el valor de las entradas del formulario
	const {
		buscar,
		filtrarPor,
		ordenarPor,
		fechaInicio,
		fechaFinal,
		horaInicio,
		horaFinal
	} = watch();

	// Solo para verificar que la data en el formulario es correcta
	const onSubmit = data => {
		console.log(data);
	};

	// Usamos la data en el formulario para cambiar el estado de filtros cada vez que la data cambia
	useEffect(() => {
		manejarFiltros(
			buscar,
			filtrarPor,
			ordenarPor,
			fechaInicio,
			fechaFinal,
			horaInicio,
			horaFinal
		);
	}, [
		buscar,
		filtrarPor,
		ordenarPor,
		fechaInicio,
		fechaFinal,
		horaInicio,
		horaFinal
	]);

	// Parte 3. HTML que va a ser renderizado
	return (
		<FiltroListaProductosEstilo onSubmit={handleSubmit(onSubmit)}>
			{/* BUSCAR POR CAMPO SELECCIONADO */}
			<BuscarEstilo>
				<label htmlFor='filtrarPor'>BUSCAR COINCIDENCIA: </label>
				<select
					id='filtrarPor'
					{...register('filtrarPor', {
						valueAsNumber: true
					})}
				>
					<option value='0'>Por nombre cliente</option>
					<option value='1'>Por tipo de venta</option>
					<option value='2'>Por tipo de pago</option>
					<option value='3'>Por status</option>
					<option value='4'>Por nombre repartidor</option>
					<option value='5'>Por nombre atiende</option>
				</select>
				<input type='text' {...register('buscar')}></input>
			</BuscarEstilo>

			{/* ORDENAR POR CAMPO SELECCIONADO */}
			<SeleccionarOrdenEstilo>
				<label htmlFor='ordenarPor'>ORDENAR TABLA:</label>
				<select
					id='ordenarPor'
					{...register('ordenarPor', {
						valueAsNumber: true
					})}
				>
					<option value='0'>Por defecto</option>
					<option value='1'>Por nombre cliente</option>
					<option value='2'>Por fecha</option>
					<option value='3'>Por hora</option>
					<option value='4'>Por nombre repartidor</option>
					<option value='5'>Por nombre atiende</option>
				</select>
			</SeleccionarOrdenEstilo>

			{/* FILTRAR POR RANGO DE FECHAS */}
			<RangoFechaEstilo>
				<p>FILTRAR ENTRE RANGOS DE FECHAS</p>

				{/* Fecha de inicio */}
				<label htmlFor='fechaInicio'>Del:</label>
				<input
					type='date'
					id='fechaInicio'
					{...register('fechaInicio')}
					min='2022-01-01'
					max='2023-01-01'
				></input>

				{/* Fecha final */}
				<label htmlFor='fechaFinal'>Al:</label>
				<input
					type='date'
					id='fechaFinal'
					{...register('fechaFinal')}
					min='2022-01-01'
					max='2023-01-01'
					value={fechaFinal}
				></input>
			</RangoFechaEstilo>

			{/* FILTRAR POR RANGO DE HORAS */}
			<RangoHoraEstilo>
				<p>FILTRAR POR HORA</p>
				<label htmlFor='horaInicio'>De:</label>
				<input
					type='time'
					id='horaInicio'
					{...register('horaInicio')}
					min='09:00'
					max='18:00'
				/>
				<label htmlFor='horaFinal'>A:</label>
				<input
					type='time'
					id='horaFinal'
					{...register('horaFinal')}
					min='09:00'
					max='18:00'
				/>
			</RangoHoraEstilo>

			{/* EXPORTAR VENTAS */}
			<ExportarVentasEstilo>
				<button type='submit'>EXPORTAR TABLA DE VENTAS</button>
			</ExportarVentasEstilo>

			{/* MOSTRAR RESUMEN DE VENTAS */}
			<ResumenEstilo>
				<button onClick={setMostrarResumen} type='submit'>
					MOSTRAR RESUMEN DE VENTAS
				</button>
			</ResumenEstilo>
		</FiltroListaProductosEstilo>
	);
};

const obtenerFechaActual = () => {
	const date = new Date();
	let dia = date.getDate();
	dia = String(dia).padStart(2, '0');
	let mes = date.getMonth() + 1;
	mes = String(mes).padStart(2, '0');
	const anio = date.getFullYear();

	// This arrangement can be altered based on how we want the date's format to appear.
	return `${anio}-${mes}-${dia}`;
};

export default FiltroListaVentas;
