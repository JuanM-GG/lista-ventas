import styled from 'styled-components';
// import {ventanae}
// import UserRole from './UserRole';
// import UserStatus from './UserStatus';
// import UserEnableButton from './UserEnableButton';
// import { useContext } from 'react';
// import { UsersContext } from '../lib/context/UsersContext';

// Estilos del componente ///////////////////////////////////

// Estilos para el componente completo
const VentaRenglonEstilo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	border: 1px solid gray;
	padding: 1rem;
	border-radius: 1rem;
	margin-top: 1rem;

	&:hover {
		background-color: lightblue;
		cursor: pointer;
	}
`;

// Estilo para el nombre
const DivEstilo = styled.div`
	width: 40%;
	text-align: center;
	span {
		font-weight: bold;
		font-size: 10px;
	}
`;

// Componente ////////////////////////////////////////////////////
const VentaRenglon = props => {
	// console.log(user);
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
	} = props.user;

	const mostrarDetallesVenta = venta => {
		const {
			PRODUCTOS: productos,
			'MONTO TOTAL': total,
			OBSERVACION: observacion
		} = venta;

		// console.log(productos);
		// console.log(total);
		// console.log(observacion);
		props.mostrarDetallesVenta({ productos, total, observacion });
	};

	// Parte 1. Usar el hook para obtener la funcion toggleUserActive en el UserSContext

	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. HTML que se renderiza en UserListRows
	return (
		<VentaRenglonEstilo onDoubleClick={() => mostrarDetallesVenta(props.user)}>
			{' '}
			{/* Estilo del componente */}
			{/* Hijo 1. Texto HTML para mostrar el nombre */}
			<DivEstilo>
				<span>{Math.floor(ID / 1e31)}</span>
			</DivEstilo>
			{/* Hijo 2. Componente para mostrar el status */}
			<DivEstilo>
				<span>{CLIENTE}</span>
			</DivEstilo>
			{/* Hijo 3. Componente para mostrar el rol */}
			<DivEstilo>
				<span>{FECHA}</span>
			</DivEstilo>
			{/* Hijo 4. Componente para  cambiar el estado active */}
			<DivEstilo>
				<span>{HORA}</span>
			</DivEstilo>
			<DivEstilo>
				<span>{TIPO_VENTA}</span>
			</DivEstilo>
			<DivEstilo>
				<span>{REPARTIDOR}</span>
			</DivEstilo>
			<DivEstilo>
				<span>{ATIENDE}</span>
			</DivEstilo>
			<DivEstilo>
				<span>{TIPO_PAGO}</span>
			</DivEstilo>
			<DivEstilo>
				<span>{STATUS}</span>
			</DivEstilo>
		</VentaRenglonEstilo>
	);
};

export default VentaRenglon;
