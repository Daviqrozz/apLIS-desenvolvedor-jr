import { useCallback, useEffect, useState } from 'react';
import { API_URLS } from '../services/apiUrls';

export function useMedicos() {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadMedicos = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URLS.medicos);
      if (!response.ok) {
        throw new Error('Falha ao carregar médicos');
      }

      const data = await response.json();
      setMedicos(
        Array.isArray(data)
          ? data.map((item) => ({
              id: item.id,
              nome: item.nome,
              CRM: item.CRM ?? '',
              UFCRM: item.UFCRM ?? '',
            }))
          : [],
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createMedico = useCallback(async (payload) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(API_URLS.medicos, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: payload.nome,
          CRM: payload.CRM,
          UFCRM: payload.UFCRM,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha ao cadastrar médico');
      }

      setSuccess(data.message || 'Médico criado com sucesso');
      await loadMedicos();
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadMedicos]);

  const updateMedico = useCallback(async (id, payload) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URLS.medicos}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: payload.nome,
          CRM: payload.CRM,
          UFCRM: payload.UFCRM,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha ao atualizar médico');
      }

      setSuccess(data.message || 'Médico atualizado com sucesso');
      await loadMedicos();
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadMedicos]);

  const deleteMedico = useCallback(async (id) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URLS.medicos}/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha ao remover médico');
      }

      setSuccess(data.message || 'Médico removido com sucesso');
      await loadMedicos();
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadMedicos]);

  useEffect(() => {
    loadMedicos();
  }, [loadMedicos]);

  return {
    medicos,
    loading,
    error,
    success,
    createMedico,
    updateMedico,
    deleteMedico,
    reload: loadMedicos,
  };
}
