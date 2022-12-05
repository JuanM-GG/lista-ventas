// Importar modulos
import styled from 'styled-components';

// Importar componentes
import VentaRenglon from './VentaRenglon';

// Estilos /////////////////////////////////////////////////////
const NombreColumnasEstilo = styled.p`
	width: 100%;
	display: flex;
	justify-content: space-around;

	span {
		font-weight: bold;
		font-size: 10px;
	}
`;

const IdEstilo = styled.span`
	margin-left: 40px;
	margin-right: 10px;
`;

const FechaEstilo = styled.span`
	margin-left: 30px;
	margin-right: 10px;
`;

const StatusEstilo = styled.span`
	margin-right: 20px;
`;

// Componente ////////////////////////////////////////////////////
const ListaVentasRenglones = ({ ventas, mostrarDetallesVenta }) => {
	// Parte 2. HTML que se renderiza
	// Si no hay usuarios, regresa el parrafo no hay usuarios
	if (!ventas.length) return <p>No hay usuarios</p>;
	// Si hay usuarios regresa los componentes VentanaRenglon por cada venta
	// No usamos return en map si todo se escribe en una linea
	return (
		<>
			{/* Nombre de las columnas en la tabla */}
			<NombreColumnasEstilo>
				<IdEstilo>ID</IdEstilo>
				<span>CLIENTE</span>
				<FechaEstilo>FECHA</FechaEstilo>
				<span>HORA</span>
				<span>TIPO DE VENTA</span>
				<span>REPARTIDOR</span>
				<span>ATIENDE</span>
				<span>TIPO DE PAGO</span>
				<StatusEstilo>STATUS</StatusEstilo>
			</NombreColumnasEstilo>

			{ventas.map(user => (
				<VentaRenglon
					key={user.ID}
					user={user}
					mostrarDetallesVenta={mostrarDetallesVenta}
				/>
			))}
		</>
	);
};

export default ListaVentasRenglones;
