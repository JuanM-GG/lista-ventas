import styled from 'styled-components';

// Estilos para el componente completo //////////////////////
const UserEnableButtonStyle = styled.div`
	width: 20%;
	display: flex;
	justify-content: center;
	align-items: center;
	button {
		border-radius: 25px;
		background-color: aquamarine;
	}
`;

// Componente //////////////////////////////////////////////
const UserEnableButton = ({ isActive, onClick }) => (

	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE 

	// Parte 1. HTML que se renderiza en UserRow
	<UserEnableButtonStyle onClick={onClick}>
		<button>{isActive ? 'Desactivar' : 'Activar'}</button>
	</UserEnableButtonStyle>
);

export default UserEnableButton;
