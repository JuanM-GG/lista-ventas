import ListaVentas from './components/ListaVentas';
import { ventas } from './ventas';

const App = () => {
	return <ListaVentas ventasIniciales={ventas} />;
};

export default App;
