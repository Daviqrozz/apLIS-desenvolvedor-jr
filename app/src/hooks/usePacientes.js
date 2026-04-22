import { useCallback, useEffect, useState } from 'react';
import { API_URLS } from '../services/apiUrls';

export function usePacientes() {
  const [pacientes, setPacientes]   = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [success, setSuccess]       = useState('');

  const loadPacientes = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URLS.pacientes);
      if (!response.ok) throw new Error('Falha ao carregar pacientes');
      setPacientes(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPaciente = useCallback(async (payload) => {
    setError(''); setSuccess(''); setLoading(true);
    try {
      const response = await fetch(API_URLS.pacientes, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Falha ao cadastrar paciente');
      setSuccess(data.message || 'Paciente criado com sucesso');
      await loadPacientes();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loadPacientes]);

  const updatePaciente = useCallback(async (id, payload) => {
    setError(''); setSuccess(''); setLoading(true);
    try {
      const response = await fetch(`${API_URLS.pacientes}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Falha ao atualizar paciente');
      setSuccess(data.message || 'Paciente atualizado com sucesso');
      await loadPacientes();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loadPacientes]);

  const deletePaciente = useCallback(async (id) => {
    setError(''); setSuccess(''); setLoading(true);
    try {
      const response = await fetch(`${API_URLS.pacientes}/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Falha ao remover paciente');
      setSuccess(data.message || 'Paciente removido com sucesso');
      await loadPacientes();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loadPacientes]);

  useEffect(() => { loadPacientes(); }, [loadPacientes]);

  return {
    pacientes, loading, error, success,
    createPaciente, updatePaciente, deletePaciente,
    reload: loadPacientes,
  };
}