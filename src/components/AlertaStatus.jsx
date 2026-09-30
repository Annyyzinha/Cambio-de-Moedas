import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useCambio } from '../contexts/CambioContext';

export default function AlertaStatus() {
  const { carregando, erroApi } = useCambio();

  if (carregando) {
    return (
      <div className="d-flex justify-content-center align-items-center my-4">
        <Spinner animation="border" variant="primary" role="status" className="me-2" />
        <span className="text-muted fw-semibold">Consultando API de Câmbio...</span>
      </div>
    );
  }

  if (erroApi) {
    return (
      <Alert variant="danger" className="my-3 shadow-sm">
        <Alert.Heading className="fs-6 mb-1">Erro na Operação</Alert.Heading>
        {erroApi}
      </Alert>
    );
  }

  return null;
}