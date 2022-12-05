// Importar modulos
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import styled from 'styled-components';

// Estilos para el componente ////////////////////////////////////////////////////////////////

// Estilo para el componente completo
const FiltroListaProductosEstilo = styled.form`
	width: 100%;
	padding: 1rem;
	align-items: center;
	display: grid;
	grid-gap: 10px;
	grid-template-rows: 0.2fr 1fr 1fr 1fr 0.2fr 0.2fr;
	grid-template-areas:
		'Nombre'
		'Orden'
		'Fecha'
		'Hora'
		'Buscar'
		'Resumen';
`;

// Estilo para la entrada de texto
const TextoNombreEstilo = styled.div`
	grid-area: Nombre;
	border: 4px solid red;

	display: grid;
	grid-gap: 5px;
`;

const SeleccionarOrdenEstilo = styled.select`
	grid-area: Orden;
	border: 4px solid red;
`;

const RangoFechaEstilo = styled.div`
	grid-area: Fecha;
	display: grid;
	grid-gap: 2px;
`;

const RangoHoraEstilo = styled.div`
	grid-area: Hora;
	border: 4px solid red;
	display: grid;
`;

const BuscarEstilo = styled.div`
	grid-area: Buscar;
	border: 4px solid red;
	display: grid;
	height: 50px;
`;

const ResumenEstilo = styled.div`
	grid-area: Resumen;
	border: 4px solid red;
	display: grid;
	height: 50px;
`;

// Componente /////////////////////////////////////////////////////////////////////////
const FiltroListaVentas = ({ manejarFiltros }) => {
	// Parte 1. Crear los hooks a usar en el componente
	// Crear datos del formulario
	const { register, watch, handleSubmit } = useForm({
		defaultValues: {
			buscar: '',
			filtrarPor: 1,
			ordenarPor: 0,
			fechaInicio: '',
			fechaFinal: '',
			horaInicio: '',
			horaFinal: ''
		}
	});

	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. Funciones que se llaman con cada renderizado
	// Observar el valor de las entradas
	const {
		buscar,
		filtrarPor,
		ordenarPor,
		fechaInicio,
		fechaFinal,
		horaInicio,
		horaFinal
	} = watch();

	// console.log(filtrarPor);

	// Solo para verificar que la data en el formulario es correcta
	const onSubmit = data => {
		console.log(data);
		// console.log(typeof data.fecha_inicio)
	};
	// Usamos la data en el formulario para cambiar el estado de filters en UserList
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

	// Parte 3. HTML que va a ser renderizado en UserList
	return (
		<FiltroListaProductosEstilo onSubmit={handleSubmit(onSubmit)}>
			<TextoNombreEstilo>
				<select
					{...register('filtrarPor', {
						valueAsNumber: true
					})}
				>
					<option value={0}>Por nombre cliente</option>
					<option value={1}>Por tipo de venta</option>
					<option value={2}>Por tipo de pago</option>
					<option value={3}>Por status</option>
					<option value={4}>Por nombre repartidor</option>
					<option value={5}>Por nombre atiende</option>
				</select>
				<input type='text' {...register('buscar')}></input>
			</TextoNombreEstilo>

			<SeleccionarOrdenEstilo
				{...register('ordenarPor', {
					valueAsNumber: true
				})}
			>
				<option value={0}>Por defecto</option>
				<option value={1}>Por nombre cliente</option>
				<option value={2}>Por fecha</option>
				<option value={3}>Por hora</option>
				<option value={4}>Por nombre repartidor</option>
				<option value={5}>Por nombre atiende</option>
			</SeleccionarOrdenEstilo>

			<RangoFechaEstilo>
				<label htmlFor='fechaInicio'>Del:</label>

				<input
					type='date'
					id='fechaInicio'
					{...register('fechaInicio')}
					min='2022-01-01'
					max='2023-01-01'
				></input>

				<label htmlFor='fechaFinal'>Al:</label>
				<input
					type='date'
					id='fechaFinal'
					{...register('fechaFinal')}
					min='2022-01-01'
					max='2023-01-01'
				></input>
			</RangoFechaEstilo>

			<RangoHoraEstilo>
				<label htmlFor='horaInicio'>De:</label>
				<input
					type='time'
					id='horaInicio'
					{...register('horaInicio')}
					min='09:00'
					max='18:00'
				/>
				<br />
				<label htmlFor='horaFinal'>A:</label>
				<input
					type='time'
					id='horaFinal'
					{...register('horaFinal')}
					min='09:00'
					max='18:00'
				/>
			</RangoHoraEstilo>

			<BuscarEstilo>
				<button type='submit'>Descargar Lista de Ventas</button>
			</BuscarEstilo>

			<ResumenEstilo>
				<button type='submit'>Mostrar Resumen de Ventas</button>
			</ResumenEstilo>
		</FiltroListaProductosEstilo>
	);
};

export default FiltroListaVentas;
