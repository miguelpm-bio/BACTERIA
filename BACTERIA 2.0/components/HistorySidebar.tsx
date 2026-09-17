import React from 'react';
import { HistoryEntry } from '../types';
import { X, Trash2, ChevronRight, Calendar, ImageIcon, Microscope, Layers } from 'lucide-react';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ 
  isOpen, 
  onClose, 
  history, 
  onSelect, 
  onDelete 
}) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-600" />
            Historial
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 text-center px-6">
              <Microscope className="w-12 h-12 mb-3 opacity-20" />
              <p>No hay identificaciones recientes.</p>
            </div>
          ) : (
            history.map((entry) => (
              <div 
                key={entry.id}
                onClick={() => {
                  onSelect(entry);
                  onClose();
                }}
                className="group relative bg-white border border-slate-200 rounded-lg p-4 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif italic font-bold text-slate-800 pr-6">
                    {entry.result.scientificName}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${
                    entry.result.probability === 'Alta' ? 'bg-green-50 text-green-700 border-green-100' :
                    entry.result.probability === 'Media' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                    'bg-red-50 text-red-700 border-red-100'
                  }`}>
                    {entry.result.probability}
                  </span>
                </div>

                {/* Input Summary */}
                <div className="text-xs text-slate-500 space-y-1 mb-3">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-slate-600">Gram:</span> {entry.input.gramStain}
                  </div>
                  <div className="truncate">
                    <span className="font-medium text-slate-600">Morf:</span> {entry.input.morphology}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 mt-2">
                  <div className="flex items-center gap-2">
                    <span>{new Date(entry.timestamp).toLocaleDateString()}</span>
                    <span>{new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  {/* Handle legacy 'image' field and new 'images' array */}
                  {((entry.input.images && entry.input.images.length > 0) || (entry.input as any).image) && (
                    <div className="flex items-center gap-1 text-teal-600" title="Contiene imagen">
                      {entry.input.images && entry.input.images.length > 1 ? (
                        <>
                          <Layers className="w-3 h-3" />
                          <span className="font-medium">{entry.input.images.length} Imgs</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-3 h-3" />
                          <span className="font-medium">Img</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={(e) => onDelete(entry.id, e)}
                  className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="absolute bottom-4 right-4 text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default HistorySidebar;