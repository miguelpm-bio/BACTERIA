import React from 'react';
import { X, ShieldAlert, Check, BrainCircuit, Zap } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  threshold: string;
  setThreshold: (value: string) => void;
  analysisMode: 'expert' | 'fast';
  setAnalysisMode: (value: 'expert' | 'fast') => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  threshold, 
  setThreshold,
  analysisMode,
  setAnalysisMode
}) => {
  if (!isOpen) return null;

  const thresholdOptions = [
    { 
      value: 'Baja', 
      label: 'Baja (Permisivo)', 
      desc: 'Acepta cualquier resultado. Solo para orientación general.' 
    },
    { 
      value: 'Media', 
      label: 'Media (Estándar)', 
      desc: 'Alerta si la probabilidad es Baja. Buen equilibrio.' 
    },
    { 
      value: 'Alta', 
      label: 'Alta (Estricto)', 
      desc: 'Alerta si la probabilidad no es Alta. Para casos críticos.' 
    }
  ];

  const modeOptions = [
    {
      value: 'expert',
      label: 'Modo Experto',
      desc: 'Gemini 3 Pro con Thinking. Razonamiento profundo y preciso.',
      icon: <BrainCircuit className="w-5 h-5 text-indigo-600" />
    },
    {
      value: 'fast',
      label: 'Modo Rápido',
      desc: 'Gemini Flash Lite. Respuesta veloz.',
      icon: <Zap className="w-5 h-5 text-amber-500" />
    }
  ] as const;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-teal-600" />
            Configuración
          </h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {/* Analysis Mode Section */}
          <div className="mb-6">
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Modelo de Análisis</h3>
             <div className="space-y-3">
                {modeOptions.map((option) => (
                  <label 
                    key={option.value}
                    className={`
                      relative flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
                      ${analysisMode === option.value 
                        ? 'border-indigo-500 bg-indigo-50/50' 
                        : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'}
                    `}
                  >
                     <div className={`mt-0.5 p-1.5 rounded-full ${analysisMode === option.value ? 'bg-white shadow-sm' : 'bg-slate-100'}`}>
                       {option.icon}
                     </div>
                     <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className={`font-semibold text-sm ${analysisMode === option.value ? 'text-indigo-900' : 'text-slate-700'}`}>
                            {option.label}
                          </span>
                          {analysisMode === option.value && (
                            <Check className="w-4 h-4 text-indigo-600" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 leading-snug">
                          {option.desc}
                        </p>
                     </div>
                    <input
                      type="radio"
                      name="analysisMode"
                      value={option.value}
                      checked={analysisMode === option.value}
                      onChange={(e) => setAnalysisMode(e.target.value as 'expert' | 'fast')}
                      className="hidden"
                    />
                  </label>
                ))}
             </div>
          </div>

          <hr className="border-slate-100 mb-6" />

          {/* Threshold Section */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Umbral de Confianza</h3>
            <p className="text-sm text-slate-600 mb-4">
              Nivel mínimo de confianza para mostrar el resultado sin advertencias.
            </p>

            <div className="space-y-3">
              {thresholdOptions.map((option) => (
                <label 
                  key={option.value}
                  className={`
                    relative flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${threshold === option.value 
                      ? 'border-teal-500 bg-teal-50' 
                      : 'border-slate-200 hover:border-teal-200 hover:bg-slate-50'}
                  `}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-semibold text-sm ${threshold === option.value ? 'text-teal-800' : 'text-slate-700'}`}>
                      {option.label}
                    </span>
                    {threshold === option.value && (
                      <Check className="w-5 h-5 text-teal-600" />
                    )}
                  </div>
                  <span className="text-xs text-slate-500">
                    {option.desc}
                  </span>
                  <input
                    type="radio"
                    name="threshold"
                    value={option.value}
                    checked={threshold === option.value}
                    onChange={(e) => setThreshold(e.target.value)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 transition-colors"
          >
            Guardar y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;