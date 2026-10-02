import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { useCambio } from '../contexts/CambioContext';

export default function ResultadoConversao() {
  const { resultado } = useCambio();

  if (!resultado) {
    return null;
  }

  const { query, info, result, date } = resultado;

  return (
    <Card className="shadow-sm border-0 mb-4 bg-light text-center">
      <Card.Body className="p-4">
        <Badge bg="success" className="mb-3 px-3 py-2 fs-6">
          Conversão Realizada com Sucesso
        </Badge>
        
        <h3 className="fw-bold my-2 text-dark">
          {query?.amount} {query?.from} ={' '}
          <span className="text-primary">
            {result?.toFixed(2)} {query?.to}
          </span>
        </h3>

        <p className="text-muted mb-1">
          Taxa aplicada: 1 {query?.from} = {info?.rate?.toFixed(4)} {query?.to}
        </p>

        <small className="text-secondary d-block mt-2">
          Data/hora da cotação:{' '}
          {info?.timestamp
            ? new Date(info.timestamp * 1000).toLocaleString('pt-BR')
            : date}
        </small>
      </Card.Body>
    </Card>
  );
} 