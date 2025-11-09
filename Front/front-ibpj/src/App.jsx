import { Routes, Route } from 'react-router-dom'; // Novo
import Layout from './Layout.jsx'; // Importe o seu Layout principal

// Importe todas as suas páginas
import Home from './pages/Home.jsx';
import Eventos from './pages/Eventos.jsx';
import Aniversarios from './pages/Aniversarios.jsx';
import Programacao from './pages/Programacao.jsx';
import Generosidade from './pages/Generosidade.jsx';
import Principios from './pages/Principios.jsx';
import Contato from './pages/Contato.jsx';
import QuemSomos from './pages/QuemSomos.jsx';

// Importe a função de utilidade
import { createPageUrl } from './utils'; // Ajuste o caminho conforme onde você criou

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Rotas com os URLs mapeados */}
        <Route index element={<Home />} />
        <Route path={createPageUrl("Eventos")} element={<Eventos />} />
        <Route path={createPageUrl("Aniversariantes")} element={<Aniversarios />} />
        <Route path={createPageUrl("Programacao")} element={<Programacao />} />
        <Route path={createPageUrl("Generosidade")} element={<Generosidade />} />
        <Route path={createPageUrl("Principios")} element={<Principios />} />
        <Route path={createPageUrl("Contato")} element={<Contato />} />
        <Route path={createPageUrl("QuemSomos")} element={<QuemSomos />} />
        
        {/* Rota 404/Not Found (Opcional, mas recomendado) */}
        <Route path="*" element={<Home />} /> 
      </Route>
    </Routes>
  );
}

export default App;