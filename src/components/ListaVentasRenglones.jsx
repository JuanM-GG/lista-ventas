// Importar modulos
import styled from 'styled-components';

// Importar componentes
import VentaRenglon from './VentaRenglon';

// Estilos /////////////////////////////////////////////////////
// Estilo para el nombre de las columnas
const NombresColumnasEstilo = styled.div`
	display: flex;
	border: 4px solid red;
	/* position: relative; */
	align-items: center;
	/* justify-content: space-around; */
	height: 50px;
	background-color: lightgray;
	border: 4px solid red;

	> div {
		width: 100%;
		text-align: center;
	}
	span {
		font-weight: bold;
		font-size: 12px;
		border: 4px solid red;
	}
`;

// Constantes
const NombresColumnas = [
	'ID',
	'CLIENTE',
	'FECHA',
	'HORA',
	'TIPO DE VENTA',
	'REPARTIDOR',
	'ATIENDE',
	'TIPO DE PAGO',
	'STATUS'
];

// Componente ////////////////////////////////////////////////////
const ListaVentasRenglones = ({ ventas, mostrarDetallesVenta }) => {
	// Parte 2. HTML que se renderiza
	// Si no hay ventas, regresa el parrafo no hay ventas
	if (!ventas.length) return <p>No hay ventas</p>;
	// Si hay ventas regresar lista de ventas
	return (
		<>
			{/* Nombre de las columnas en la tabla */}
			<NombresColumnasEstilo>
				{NombresColumnas.map((nombreCampo, index) => (
					<div key={index}>
						<span>{nombreCampo}</span>
					</div>
				))}
			</NombresColumnasEstilo>

			{/* Renglones de la tabla de ventas */}
			{ventas.map(venta => (
				<VentaRenglon
					key={venta.ID}
					venta={venta}
					mostrarDetallesVenta={mostrarDetallesVenta}
				/>
			))}
		</>
	);
};

export default ListaVentasRenglones;
