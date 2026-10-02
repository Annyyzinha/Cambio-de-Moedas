import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import AlertaStatus from './components/AlertaStatus';
import ConversorForm from './components/ConversorForm';
import ResultadoConversao from './components/ResultadoConversao';
import TabelaCotacoes from './components/TabelaCotacoes';

function App() {
  return (
    <>
      <Header />

      <Container className="pb-5">
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={8}>
            <AlertaStatus />
          </Col>
        </Row>

        <Row className="justify-content-center g-4">
          <Col xs={12} lg={6}>
            <ConversorForm />
            <ResultadoConversao />
          </Col>

          <Col xs={12} lg={4}>
            <TabelaCotacoes />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
