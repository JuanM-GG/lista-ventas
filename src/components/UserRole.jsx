import styled from 'styled-components';

// Estilo para UserRole /////////////////////////////////////
const RoleDivStyle = styled.div`
	width: 20%;
	display: flex;
	justify-content: center;
	align-items: center;
	span {
		text-transform: uppercase;
		font-size: 0.75rem;
		background-color: ${props => props.backgroundColorRole};
		padding: 0.25rem 0.5rem;
		border-radius: 0.5rem;
	}
`;

// Componente //////////////////////////////////////////////////////
const UserRole = ({ role }) => {

	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 1.  Funciones que se llaman en cada renderizado
	const [roleName, backgroundColorRole] = getStyle(role);
	
	// Parte 2. HTML que se renderiza en UserRow
	return (
		// Los estilos tambien pueden recibir props!
		<RoleDivStyle backgroundColorRole={backgroundColorRole}>
			{/* Se usa span y no p porque span no ocupa TODO el renglon */}
			<span>{roleName}</span>
		</RoleDivStyle>
	);
};

// Parte 3. Declarar funciones 	que se usan en el componente
const getStyle = (role) => {
	// Crear un objeto que mapea el rol a rol en espanol y background
	const ROLE_STYLES = {
		teacher: ['Profesor', '#61dafb'],
		student: ['Alumno', 'lightgreen'],
		other: ['Otro', 'lightgray']
	};
	// Trata de recordar esta sintaxis
	return ROLE_STYLES[role] || ROLE_STYLES.other
}

export default UserRole;
