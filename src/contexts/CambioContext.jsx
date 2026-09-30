import React, { createContext, useContext, useState, useEffect } from 'react';

export const CambioContext = createContext();

export function CambioProvider({ children }) {
  const [cotacoes, setCotacoes] = useState({});
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erroApi, setErroApi] = useState(null);

  const CHAVE_API = import.meta.env.VITE_APILAYER_KEY;

  // Busca inicial das taxas de câmbio recentes
  useEffect(() => {
    async function carregarTaxasIniciais() {
      try {
        const resposta = await fetch(
          'https://api.apilayer.com/exchangerates_data/latest?symbols=USD,EUR,GBP,ARS,CAD,JPY&base=BRL',
          {
            headers: { apikey: CHAVE_API }
          }
        );

        if (!resposta.ok) {
          throw new Error(`Falha HTTP na API: código ${resposta.status}`);
        }

        const dados = await resposta.json();
        setCotacoes(dados.rates || {});
      } catch (err) {
        setErroApi("Não foi possível carregar as taxas de câmbio recentes da API.");
      }
    }

    if (CHAVE_API) {
      carregarTaxasIniciais();
    } else {
      setErroApi("Chave da API (VITE_APILAYER_KEY) não encontrada no .env.local.");
    }
  }, [CHAVE_API]);

  // Função disparada para converter moedas
  const converterMoeda = async (origem, destino, valor) => {
    setCarregando(true);
    setErroApi(null);
    setResultado(null);

    try {
      const resposta = await fetch(
        `https://api.apilayer.com/exchangerates_data/convert?from=${origem}&to=${destino}&amount=${valor}`,
        {
          headers: { apikey: CHAVE_API }
        }
      );

      // Tratamento de erros depois do envio
      if (!resposta.ok) {
        if (resposta.status === 401) {
          throw new Error("Chave de API inválida ou não autorizada (HTTP 401).");
        }
        if (resposta.status === 429) {
          throw new Error("Limite de requisições gratuitas excedido na APILayer (HTTP 429).");
        }
        throw new Error(`Erro na resposta do servidor: código ${resposta.status}`);
      }

      const dados = await resposta.json();

      if (!dados.success && dados.error) {
        throw new Error(dados.error.info || "Erro retornado pela API de câmbio.");
      }

      setResultado(dados);
    } catch (err) {
      setErroApi(err.message || "Erro de conexão com o serviço de câmbio.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <CambioContext.Provider
      value={{
        cotacoes,
        resultado,
        carregando,
        erroApi,
        converterMoeda
      }}
    >
      {children}
    </CambioContext.Provider>
  );
}

export const useCambio = () => useContext(CambioContext);