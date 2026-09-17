import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import HistorySidebar from './components/HistorySidebar';
import SettingsModal from './components/SettingsModal';
import { identifyMicroorganism } from './services/geminiService';
import { MicroorganismInput, IdentificationResult, HistoryEntry } from './types';
import { Microscope, History, Settings, Scan, Database, FileText, Search, Activity, Zap, BrainCircuit } from 'lucide-react';

const App: React.FC = () => {
  const [result, setResult] = useState<IdentificationResult | null>(null);
  const [currentInput, setCurrentInput] = useState<MicroorganismInput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Analysis Mode State
  const [analysisMode, setAnalysisMode] = useState<'expert' | 'fast'>('expert');
  
  // Loading Animation State
  const [loadingStep, setLoadingStep] = useState(0);
  
  // History State
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('microbio_history');
      try {
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error("Error parsing history", e);
        return [];
      }
    }
    return [];
  });

  // Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('microbio_threshold') || 'Media';
    }
    return 'Media';
  });

  // Loading steps configuration
  const loadingMessages = [
    { text: "Procesando características visuales...", icon: <Scan className="w-5 h-5" /> },
    { text: "Analizando morfología y tinción...", icon: <FileText className="w-5 h-5" /> },
    { text: "Consultando base de datos taxonómica...", icon: <Database className="w-5 h-5" /> },
    { text: "Evaluando diagnósticos diferenciales...", icon: <Search className="w-5 h-5" /> }
  ];

  // Persist history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('microbio_history', JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  }, [history]);

  // Persist settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('microbio_threshold', confidenceThreshold);
    } catch (e) {
      console.error("Failed to save settings", e);
    }
  }, [confidenceThreshold]);

  // Handle loading animation cycle
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const addToHistory = (input: MicroorganismInput, result: IdentificationResult) => {
    const newEntry: HistoryEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      input,
      result
    };
    setHistory(prev => [newEntry, ...prev]);
  };

  const handleDeleteHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleIdentification = async (data: MicroorganismInput) => {
    setIsLoading(true);
    setError(null);
    setCurrentInput(data); // Store input for display
    try {
      const identification = await identifyMicroorganism(data, analysisMode);
      setResult(identification);
      addToHistory(data, identification);
    } catch (err: any) {
      setError("Ocurrió un error al procesar la identificación. Por favor, verifica tu clave API y vuelve a intentarlo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCurrentInput(undefined);
    setError(null);
  };

  const handleSelectHistory = (entry: HistoryEntry) => {
    setResult(entry.result);
    // Restore the input data so images can be displayed
    setCurrentInput(entry.input);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <div className="bg-teal-600 p-2 rounded-lg">
              <Microscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none">BacterIA</h1>
              <p className="text-xs text-slate-500">Asistente de Taxonomía Digital</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-slate-600 hover:text-teal-600 hover:bg-slate-50 rounded-md transition-colors"
              title="Configuración"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors px-3 py-2 rounded-md hover:bg-slate-50"
            >
              <History className="w-5 h-5" />
              <span className="hidden sm:inline">Historial</span>
            </button>
            <div className="hidden md:block">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${
                analysisMode === 'expert' 
                  ? 'bg-indigo-50 text-indigo-700 ring-indigo-600/20' 
                  : 'bg-amber-50 text-amber-700 ring-amber-600/20'
              }`}>
                {analysisMode === 'expert' ? <BrainCircuit className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                {analysisMode === 'expert' ? 'Modo Experto (Thinking)' : 'Modo Rápido'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Intro */}
        {!result && (
          <div className="mb-8 text-center max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
              Identificación de Microorganismos
            </h2>
            <p className="text-lg text-slate-600">
              Describe las características morfológicas y fisiológicas observadas. 
              Nuestra IA analizará los datos para sugerir el género y especie más probable.
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4 border border-red-200 animate-fade-in">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col items-center justify-center transition-all duration-300">
            <div className="relative mb-8">
               <div className="absolute inset-0 bg-teal-100 rounded-full animate-ping opacity-50"></div>
               <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center relative border-4 border-teal-50">
                  <Microscope className="w-10 h-10 text-teal-600 animate-pulse" />
               </div>
               <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md border border-slate-100">
                 <Activity className="w-5 h-5 text-indigo-500 animate-spin" />
               </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-8">Analizando Muestra</h3>
            
            <div className="w-full max-w-sm px-6">
              <div className="space-y-4">
                {loadingMessages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center gap-3 transition-all duration-500 transform ${
                      idx === loadingStep 
                        ? 'opacity-100 translate-x-0 text-teal-700 font-semibold bg-teal-50/50 p-2 rounded-lg' 
                        : idx < loadingStep 
                          ? 'opacity-40 translate-x-0 text-slate-400 p-2' 
                          : 'opacity-30 translate-x-4 text-slate-300 p-2'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${idx === loadingStep ? 'bg-teal-100 text-teal-600 shadow-sm' : 'bg-slate-100'}`}>
                      {msg.icon}
                    </div>
                    <span className="text-sm">{msg.text}</span>
                    {idx === loadingStep && (
                      <div className="ml-auto flex gap-1">
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce delay-75"></span>
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce delay-100"></span>
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce delay-150"></span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <p className="absolute bottom-10 text-xs text-slate-400 uppercase tracking-wider font-semibold">
              BacterIA Intelligence Engine
            </p>
          </div>
        )}

        {/* Content */}
        {result ? (
          <ResultDisplay 
            result={result} 
            onReset={handleReset} 
            threshold={confidenceThreshold}
            // Pass the current input to display user images
            currentInput={currentInput}
          />
        ) : (
          <InputForm onSubmit={handleIdentification} isLoading={isLoading} />
        )}
      </main>

      <HistorySidebar 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelect={handleSelectHistory}
        onDelete={handleDeleteHistory}
      />
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        threshold={confidenceThreshold}
        setThreshold={setConfidenceThreshold}
        analysisMode={analysisMode}
        setAnalysisMode={setAnalysisMode}
      />
    </div>
  );
};

export default App;