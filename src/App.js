import AppRouter from './components/AppRouter';
import InvContext from './context/InvContext';

function App() {
  return (
    <InvContext>
      <AppRouter />
    </InvContext>
  );
}

export default App;
