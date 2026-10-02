import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useCambio } from '../contexts/CambioContext';

export default function ConversorForm() {
  const { cotacoes, converterMoeda, carregando } = useCambio();

  const [origem, setOrigem] = useState('USD');
  const [destino, setDestino] = useState('BRL');
  const [valor, setValor] = useState('');
  const [erros, setErros] = useState({});

  const moedas = ['BRL', ...Object.keys(cotacoes)].sort();

  // Validação síncrona "antes do envio": evita requisição desnecessária à API
  const validar = () => {
    const novosErros = {};

    if (valor === '' || Number(valor) <= 0) {
      novosErros.valor = 'Informe um valor numérico maior que zero.';
    }

    if (origem === destino) {
      novosErros.destino = 'A moeda de destino deve ser diferente da moeda de origem.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const aoEnviar = (evento) => {
    evento.preventDefault();

    if (!validar()) {
      return;
    }

    converterMoeda(origem, destino, Number(valor));
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body className="p-4">
        <Card.Title className="mb-3">Converter Moedas</Card.Title>

        <Form noValidate onSubmit={aoEnviar}>
          <Row className="g-3">
            <Col xs={12} md={4}>
              <Form.Group controlId="campoValor">
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  step="any"
                  placeholder="Ex: 100"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  isInvalid={!!erros.valor}
                />
                <Form.Control.Feedback type="invalid">
                  {erros.valor}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Form.Group controlId="campoOrigem">
                <Form.Label>Moeda de Origem</Form.Label>
                <Form.Select
                  value={origem}
                  onChange={(e) => setOrigem(e.target.value)}
                >
                  {moedas.map((codigo) => (
                    <option key={codigo} value={codigo}>
                      {codigo}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Form.Group controlId="campoDestino">
                <Form.Label>Moeda de Destino</Form.Label>
                <Form.Select
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  isInvalid={!!erros.destino}
                >
                  {moedas.map((codigo) => (
                    <option key={codigo} value={codigo}>
                      {codigo}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {erros.destino}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid mt-4">
            <Button type="submit" variant="primary" size="lg" disabled={carregando}>
              {carregando ? 'Convertendo...' : 'Converter'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
