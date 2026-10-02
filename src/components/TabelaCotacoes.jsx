import React, { useState, useMemo } from 'react';
import { Card, Table, Form } from 'react-bootstrap';
import { useCambio } from '../contexts/CambioContext';

export default function TabelaCotacoes() {
  const { cotacoes } = useCambio();
  const [busca, setBusca] = useState('');

  // useMemo: recalcula filtro/ordenação apenas quando a busca ou as cotações mudam,
  // evitando reprocessamento a cada re-renderização da SPA
  const cotacoesFiltradas = useMemo(() => {
    const termo = busca.trim().toUpperCase();

    return Object.entries(cotacoes)
      .filter(([codigo]) => codigo.includes(termo))
      .sort(([codigoA], [codigoB]) => codigoA.localeCompare(codigoB));
  }, [busca, cotacoes]);

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body className="p-4">
        <Card.Title className="mb-3">Cotações Recentes (Base: BRL)</Card.Title>

        <Form.Group controlId="campoBusca" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Filtrar por código da moeda (ex: USD)"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </Form.Group>

        <Table striped hover responsive className="mb-0 align-middle">
          <thead>
            <tr>
              <th>Moeda</th>
              <th className="text-end">Taxa (1 BRL =)</th>
            </tr>
          </thead>
          <tbody>
            {cotacoesFiltradas.length > 0 ? (
              cotacoesFiltradas.map(([codigo, taxa]) => (
                <tr key={codigo}>
                  <td className="fw-semibold">{codigo}</td>
                  <td className="text-end">{taxa.toFixed(4)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center text-muted">
                  {Object.keys(cotacoes).length === 0
                    ? 'Carregando cotações da API...'
                    : 'Nenhuma moeda encontrada para o filtro informado.'}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
