import React from 'react';
import { useCars } from '../../context/CarContext';
import { ShieldCheck, Plus, LogOut, Key } from 'lucide-react';
import { authService } from '../../services/authService';

export const AdminHeaderBar: React.FC = () => {
  const { isAdmin, setIsAdmin, setIsCarModalOpen, setEditingCar, showToast } = useCars();

  if (!isAdmin) return null;

  const handleAddNew = () => {
    setEditingCar(null);
    setIsCarModalOpen(true);
  };

  const handleChangePassword = () => {
    const newPass = prompt('Digite a nova senha de Administrador:');
    if (newPass && newPass.trim().length > 0) {
      authService.setAdminPassword(newPass.trim());
      showToast('Senha de Administrador alterada com sucesso!', 'success');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAdmin(false);
    showToast('Você saiu do modo Administrador.');
  };

  return (
    <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-red-950 text-white py-2.5 px-4 shadow-inner border-t border-red-600/40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Modo Administrador Ativo</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddNew}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Novo Carro</span>
          </button>

          <button
            onClick={handleChangePassword}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
            title="Alterar Senha do Administrador"
          >
            <Key className="w-3.5 h-3.5" />
            <span>Alterar Senha</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair do ADM</span>
          </button>
        </div>
      </div>
    </div>
  );
};
