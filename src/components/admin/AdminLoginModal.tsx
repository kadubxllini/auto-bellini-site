import React, { useState } from 'react';
import { useCars } from '../../context/CarContext';
import { authService } from '../../services/authService';
import { X, LogIn, AlertCircle } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, setIsAdmin, showToast } = useCars();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authService.login(password)) {
      setIsAdmin(true);
      setIsLoginModalOpen(false);
      setPassword('');
      setError(false);
      showToast('Bem-vindo! Modo Administrador ativado.', 'success');
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-red-600">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Auto Bellini Logo" className="h-8 w-auto bg-white p-1 rounded-md" />
            <h3 className="font-extrabold text-base">Acesso do Administrador</h3>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-center pb-2">
            <img src="/logo.png" alt="Auto Bellini" className="h-20 w-auto object-contain mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-600">
              Painel de Gestão de Anúncios — Auto Bellini Veículos
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Senha ADM
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Digite a senha de administrador"
              autoFocus
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Senha incorreta! Tente novamente.</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Entrar no ADM</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
