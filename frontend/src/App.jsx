import './index.css';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './Routes';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#f4f6fb] font-poppins">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
