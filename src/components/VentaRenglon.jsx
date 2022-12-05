// Importar modulos
import styled from 'styled-components';

// Estilos del componente ///////////////////////////////////

// Estilos para el componente completo
const VentaRenglonEstilo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 4px solid red;
	border-radius: 10px;

	&:hover {
		background-color: lightblue;
		cursor: pointer;
	}

	> div {
		width: 100%;
		text-align: center;
		padding: 10px 0 10px 0;
	}

	span {
		font-weight: bold;
		font-size: 10px;
	}
`;

// Componente ////////////////////////////////////////////////////
const VentaRenglon = ({ venta, mostrarDetallesVenta }) => {
	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Obtener valores en ventas y modificar nombre si es necesario
	const {
		ID,
		CLIENTE,
		FECHA,
		HORA,
		'TIPO DE VENTA': TIPO_VENTA,
		REPARTIDOR,
		ATIENDE,
		'TIPO DE PAGO': TIPO_PAGO,
		STATUS
	} = venta;

	// Guardar valores en array para usar map
	const ValoresRenglon = [
		Math.floor(ID / 1e31),
		CLIENTE,
		FECHA,
		HORA,
		TIPO_VENTA,
		REPARTIDOR,
		ATIENDE,
		TIPO_PAGO,
		STATUS
	];

	// Funcion para mostrar los detalles de la venta seleccionada
	const llamarMostrarDetallesVenta = venta => {
		// Obtener valores de venta para informacion detallada
		const {
			PRODUCTOS: productos,
			'MONTO TOTAL': total,
			OBSERVACION: observacion
		} = venta;

		// Llamar a la funcion para mostrar los detalles de la venta
		mostrarDetallesVenta({ productos, total, observacion });
	};

	// Parte 2. HTML que se renderiza
	return (
		<VentaRenglonEstilo onClick={() => llamarMostrarDetallesVenta(venta)}>
			{ValoresRenglon.map((ValorRenglon, index) => (
				<div key={index}>
					<span>{ValorRenglon}</span>
				</div>
			))}
		</VentaRenglonEstilo>
	);
};

export default VentaRenglon;
