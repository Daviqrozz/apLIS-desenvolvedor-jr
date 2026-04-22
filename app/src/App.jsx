import { Navigate, Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { MedicosPage } from './pages/MedicosPage';
import { PacientesPage } from './pages/PacientesPage';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 md:grid md:grid-cols-[240px_1fr]">
      <Sidebar />
      <main className="p-5 md:p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/medicos" replace />} />
          <Route path="/medicos" element={<MedicosPage />} />
          <Route path="/pacientes" element={<PacientesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
