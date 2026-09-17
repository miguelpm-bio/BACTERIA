
import React, { useState } from 'react';
import { IdentificationResult, MicroorganismInput } from '../types';
import { CheckCircle2, AlertTriangle, Activity, ArrowRight, ShieldAlert, FileText, Microscope, Scale, FlaskConical, Lightbulb, Sparkles, Image as ImageIcon, ExternalLink, ShieldCheck, Split, X, ZoomIn, ScanEye } from 'lucide-react';

interface ResultDisplayProps {
  result: IdentificationResult;
  onReset: () => void;
  threshold?: string;
  userImage?: string; // Legacy support
  currentInput?: MicroorganismInput;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset, threshold = 'Media', userImage, currentInput }) => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'differentials' | 'tests' | 'uses' | 'trivia' | 'images'>('analysis');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getProbabilityColor = (prob: string) => {
    switch (prob.toLowerCase()) {
      case 'alta': return 'bg-green-100 text-green-800 border-green-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baja': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const isBelowThreshold = () => {
    const levels: Record<string, number> = { 'baja': 1, 'media': 2, 'alta': 3 };
    const resultLevel = levels[result.probability.toLowerCase()] || 0;
    const thresholdLevel = levels[threshold.toLowerCase()] || 0;
    
    return resultLevel < thresholdLevel;
  };

  const showThresholdWarning = isBelowThreshold();

  // Determine images to show (handle array or legacy string)
  const displayImages = currentInput?.images || (userImage ? [userImage] : []);
  const hasUserImages = displayImages.length > 0;
  const hasReferenceImages = result.referenceImages && result.referenceImages.length > 0;

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Vista detallada" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      {/* Threshold Warning Banner */}
      {showThresholdWarning && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-red-800">Resultado por debajo del umbral de confianza</h4>
            <p className="text-sm text-red-700 mt-1">
              Este resultado tiene probabilidad <strong>{result.probability}</strong>, la cual es inferior a su configuración mínima requerida ({threshold}). Se recomienda precaución adicional.
            </p>
          </div>
        </div>
      )}

      {/* Main Card with Tabs */}
      <div className={`bg-white rounded-xl shadow-lg border overflow-hidden relative ${showThresholdWarning ? 'border-red-200 ring-1 ring-red-100' : 'border-teal-100'}`}>
        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${showThresholdWarning ? 'from-red-400 to-orange-400' : 'from-teal-500 to-emerald-500'}`}></div>
        
        {/* Header Content (Always Visible) */}
        <div className="p-6 md:p-8 pb-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-sm font-medium text-teal-600 uppercase tracking-wider mb-1 flex items-center gap-2">
                Identificación Principal
                {result.isReferenceMatch && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 normal-case tracking-normal">
                    <ShieldCheck className="w-3 h-3" />
                    Verificado en Base de Datos
                  </span>
                )}
              </h3>
              <h1 className="text-3xl font-serif italic font-bold text-slate-900">{result.scientificName}</h1>
              {result.commonNameOrGroup && (
                <p className="text-slate-500 mt-1 text-sm">{result.commonNameOrGroup}</p>
              )}
            </div>
            <div className={`px-4 py-1.5 rounded-full border text-sm font-bold shadow-sm ${getProbabilityColor(result.probability)}`}>
              Probabilidad: {result.probability}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-slate-200 mt-8 px-6 md:px-8 gap-1 no-scrollbar">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'analysis' 
                ? 'border-teal-600 text-teal-700' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            Análisis
          </button>
          <button
            onClick={() => setActiveTab('differentials')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'differentials' 
                ? 'border-teal-600 text-teal-700' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Scale className="w-4 h-4" />
            Diferencial
          </button>
           <button
            onClick={() => setActiveTab('tests')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'tests' 
                ? 'border-teal-600 text-teal-700' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Microscope className="w-4 h-4" />
            Pruebas
          </button>
          {result.uses && result.uses.length > 0 && (
            <button
              onClick={() => setActiveTab('uses')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'uses' 
                  ? 'border-teal-600 text-teal-700' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              Usos
            </button>
          )}
          {result.trivia && result.trivia.length > 0 && (
            <button
              onClick={() => setActiveTab('trivia')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'trivia' 
                  ? 'border-teal-600 text-teal-700' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              Curiosidades
            </button>
          )}
          <button
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'images' 
                ? 'border-teal-600 text-teal-700' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Galería Comparativa
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8 bg-slate-50/50 min-h-[300px]">
          
          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="animate-fade-in space-y-4">
              
              {/* Visual Analysis Block - Prominently Displayed */}
              {result.visualMorphology && (
                <div className="bg-teal-50 rounded-lg p-5 border border-teal-100 shadow-sm">
                  <h4 className="flex items-center gap-2 font-semibold text-teal-800 mb-3 text-sm uppercase tracking-wider">
                    <ScanEye className="w-4 h-4 text-teal-600" />
                    Análisis Morfológico Visual (IA)
                  </h4>
                  <p className="text-teal-900/80 leading-relaxed font-medium">
                    {result.visualMorphology}
                  </p>
                </div>
              )}

              <div className="bg-white rounded-lg p-6 border border-slate-100 shadow-sm">
                <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  Razonamiento de Identificación
                </h4>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {result.justification}
                </p>
                {result.isReferenceMatch && (
                  <div className="mt-4 p-3 bg-indigo-50 border border-indigo-100 rounded-md text-sm text-indigo-800 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Este resultado coincide con un microorganismo registrado en nuestra base de datos de referencia aumentada, lo que incrementa la fiabilidad del análisis morfológico.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Differentials Tab */}
          {activeTab === 'differentials' && (
            <div className="space-y-3 animate-fade-in">
              {result.differentials.map((diff, idx) => (
                <div key={idx} className="bg-white rounded-lg p-5 border border-slate-200 hover:border-teal-300 transition-colors shadow-sm">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="min-w-[200px]">
                      <span className="font-serif italic font-bold text-lg text-slate-800 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          {diff.name}
                      </span>
                    </div>
                    <div className="flex-1 border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 sm:pl-4">
                      <p className="text-slate-600 text-sm">
                        <span className="font-semibold text-slate-700 mr-1 block sm:inline">Motivo de exclusión:</span> 
                        {diff.exclusionReason}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tests Tab */}
          {activeTab === 'tests' && (
            <div className="animate-fade-in">
              <div className="bg-blue-50/50 rounded-lg p-6 border border-blue-100">
                <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Protocolo de Confirmación
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Para confirmar el diagnóstico preliminar de <em>{result.scientificName}</em>, se recomienda realizar las siguientes pruebas bioquímicas o moleculares:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.suggestedTests.map((test, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-md border border-slate-200 shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-slate-700 font-medium text-sm">{test}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Uses Tab */}
          {activeTab === 'uses' && result.uses && (
            <div className="animate-fade-in">
              <div className="bg-emerald-50/50 rounded-lg p-6 border border-emerald-100">
                <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
                  <FlaskConical className="w-5 h-5 text-emerald-600" />
                  Usos y Aplicaciones
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Aplicaciones conocidas en industria, medicina, biotecnología o medio ambiente:
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {result.uses.map((use, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white p-3 rounded-md border border-slate-200 shadow-sm">
                       <span className="w-2 h-2 mt-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
                       <span className="text-slate-700 text-sm">{use}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Trivia Tab */}
          {activeTab === 'trivia' && result.trivia && (
            <div className="animate-fade-in">
              <div className="bg-purple-50/50 rounded-lg p-6 border border-purple-100">
                <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Datos Curiosos
                </h4>
                <div className="space-y-4">
                  {result.trivia.map((fact, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-white rounded-lg border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                       <div className="p-2 bg-purple-100 rounded-full h-fit text-purple-600 flex-shrink-0">
                          <Lightbulb className="w-4 h-4" />
                       </div>
                       <p className="text-slate-700 text-sm leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Visual Comparison Tab */}
          {activeTab === 'images' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h4 className="flex items-center gap-2 font-semibold text-slate-800">
                  <Split className="w-5 h-5 text-teal-600" />
                  Comparativa Visual
                </h4>
                {hasReferenceImages && (
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full border border-indigo-100">
                    Imágenes verificadas disponibles
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Column: User Images */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">Tu Muestra</span>
                  </div>
                  
                  {hasUserImages ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                      {displayImages.map((img, idx) => (
                        <div 
                          key={idx} 
                          className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-zoom-in"
                          onClick={() => setSelectedImage(img)}
                        >
                           <div className="aspect-square bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center relative group">
                              <img src={img} alt={`Muestra ${idx + 1}`} className="w-full h-full object-contain" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                 <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all" />
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                Imagen subida #{idx + 1}
                              </div>
                           </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl text-center">
                      <Microscope className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">No se adjuntaron imágenes para este análisis.</p>
                    </div>
                  )}
                </div>

                {/* Right Column: Reference Images */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">Referencia Patrón</span>
                  </div>

                  {hasReferenceImages ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                      {result.referenceImages!.map((img, idx) => (
                        <div 
                          key={idx} 
                          className="bg-white p-2 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-all ring-1 ring-indigo-50 cursor-zoom-in"
                          onClick={() => setSelectedImage(img)}
                        >
                           <div className="aspect-square bg-white rounded-lg overflow-hidden flex items-center justify-center relative group">
                              <img src={img} alt={`Referencia ${idx + 1}`} className="w-full h-full object-contain" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                 <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all" />
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-indigo-900/80 text-white text-xs p-2">
                                <span className="font-semibold italic">{result.scientificName}</span>
                                <span className="opacity-75 block text-[10px]">Imagen de referencia verificada</span>
                              </div>
                           </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex-1 flex flex-col items-center justify-center text-center">
                         <ImageIcon className="w-10 h-10 text-slate-300 mb-3" />
                         <p className="text-sm text-slate-600 mb-4">
                           No hay imágenes de referencia directa en nuestra base de datos local para <em>{result.scientificName}</em>.
                         </p>
                         <a 
                            href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(result.scientificName + " bacteria microscopy")}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-800 hover:underline"
                          >
                            Buscar en Google Imágenes <ExternalLink className="w-3 h-3" />
                          </a>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      <div className="flex justify-center pt-2">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors font-medium px-6 py-2 rounded-full hover:bg-white hover:shadow-sm"
        >
          Analizar nueva muestra <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8 text-sm text-yellow-800 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Nota importante:</strong> Esta herramienta utiliza inteligencia artificial para propósitos educativos y de referencia. No debe utilizarse como sustituto del diagnóstico médico clínico ni para determinaciones críticas de seguridad biológica. Siempre confirme los resultados con protocolos de laboratorio estándar.
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;
