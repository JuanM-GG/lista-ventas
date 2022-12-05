import styled from 'styled-components';

// Estilo para el componente completo ////////////////////////////////////
const ActiveDivStyle = styled.div`
	width: 20%;
	display: flex;
	justify-content: center;
	align-items: center;
	span {
		color: ${props => (props.active ? 'green' : 'red')};
	}
`;

// Componente /////////////////////////////////////////////////////////////
const UserStatus = ({ isActive }) => {

	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 1. HTML que se renderiza en UserRow
	return (
		// Los estiloas tambien pueden recibir props!
		<ActiveDivStyle active={isActive}> 
			<span>{isActive ? 'Activo' : 'Inactivo'}</span>
		</ActiveDivStyle>
	);
};

export default UserStatus;
