import './App.css';
import { Container, Button, Card } from 'react-bootstrap';
import AlertaStatus from './components/AlertaStatus';
import ResultadoConversao from './components/ResultadoConversao';
import { useCambio } from './contexts/CambioContext';

function App() {
  const { converterMoeda, cotacoes } = useCambio();

  return (
    <Container className="py-4" style={{ maxWidth: '800px' }}>
      <header className="pb-3 mb-4 border-bottom text-center">
        <h1 className="display-5 fw-bold text-primary">Conversor de Moedas</h1>
        <p className="lead text-muted">
          Projeto 1 - Programação Web Fullstack (SPA em React)
        </p>
      </header>

      <main>
        <AlertaStatus />
        <ResultadoConversao />

        {/* Botões de teste */}
        <Card className="p-4 mb-4 shadow-sm text-center border-0 bg-light">
          <Card.Title className="mb-3">Teste Rápido de Conversão (APILayer)</Card.Title>
          <div className="d-flex justify-content-center gap-2">
            <Button 
              variant="primary" 
              onClick={() => converterMoeda('USD', 'BRL', 100)}
            >
              Testar 100 USD → BRL
            </Button>
            <Button 
              variant="outline-secondary" 
              onClick={() => converterMoeda('EUR', 'BRL', 50)}
            >
              Testar 50 EUR → BRL
            </Button>
          </div>
        </Card>

        {/* Visualização temporária das taxas */}
        <Card className="p-3 shadow-sm border-0">
          <h6 className="text-muted mb-2">Cotações Recentes Carregadas (Base BRL):</h6>
          <pre className="bg-white p-2 rounded border mb-0" style={{ fontSize: '0.85rem' }}>
            {Object.keys(cotacoes).length > 0 
              ? JSON.stringify(cotacoes, null, 2) 
              : "Carregando cotações da API..."}
          </pre>
        </Card>
      </main>
    </Container>
  );
} 

export default App;