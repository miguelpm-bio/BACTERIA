
import React, { useState, useRef, useEffect } from 'react';
import { MicroorganismInput } from '../types';
import { Microscope, FlaskConical, Dna, FileText, Upload, X, Plus, Camera, AlertCircle, ScanEye } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: MicroorganismInput) => void;
  isLoading: boolean;
}

// Declare global window object for Teachable Machine
declare global {
  interface Window {
    tmImage: any;
  }
}

// Using local files for the model
const TM_MODEL_PATH = "/model.json";
const TM_METADATA_PATH = "/metadata-1.json";

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<MicroorganismInput>({
    morphology: '',
    arrangement: '',
    gramStain: '',
    colonyMorphology: '',
    sampleContext: '',
    otherObservations: '',
    images: [],
    autoClassification: ''
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  
  // Teachable Machine State
  const [tmModel, setTmModel] = useState<any>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [imageClassifications, setImageClassifications] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Load Teachable Machine Model on Mount
  useEffect(() => {
    const loadModel = async () => {
      if (window.tmImage) {
        try {
          // Attempt to load from local paths
          const model = await window.tmImage.load(TM_MODEL_PATH, TM_METADATA_PATH);
          setTmModel(model);
          setIsModelLoading(false);
          console.log("Teachable Machine Local Model Loaded");
        } catch (error) {
          console.error("Error loading TM model (local files):", error);
          // Fallback or retry logic could go here, but for now we assume files exist
          setIsModelLoading(false);
        }
      } else {
        // Retry if library not yet loaded (simple fallback)
        setTimeout(() => setIsModelLoading(false), 3000); 
      }
    };
    loadModel();
  }, []);

  const classifyImage = async (base64Image: string): Promise<string | null> => {
    if (!tmModel) return null;
    
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Image;
      img.onload = async () => {
        try {
          const prediction = await tmModel.predict(img);
          // prediction is array of { className: string, probability: number }
          // Sort by probability desc
          prediction.sort((a: any, b: any) => b.probability - a.probability);
          
          const topResult = prediction[0];
          if (topResult.probability > 0.6) { // 60% confidence threshold
             const probPercent = (topResult.probability * 100).toFixed(0);
             resolve(`${topResult.className} (${probPercent}%)`);
          } else {
             resolve(null);
          }
        } catch (e) {
          console.error("Prediction error", e);
          resolve(null);
        }
      };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError(null); // Clear validation error on interaction
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files) as File[];
      
      fileArray.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          if (reader.result) {
            const base64 = reader.result as string;
            
            // Run classification
            let classification = null;
            if (tmModel) {
               classification = await classifyImage(base64);
            }

            setFormData((prev) => ({ 
              ...prev, 
              images: [...(prev.images || []), base64] 
            }));
            
            setImageClassifications((prev) => [...prev, classification || '']);
          }
        };
        reader.readAsDataURL(file);
      });
    }
    // Reset inputs
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const removeImage = (indexToRemove: number) => {
    setFormData((prev) => ({ 
      ...prev, 
      images: prev.images?.filter((_, index) => index !== indexToRemove) || [] 
    }));
    setImageClassifications((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.images || formData.images.length === 0) {
      setValidationError("No se ha subido ninguna imagen para identificar. Por favor, sube una imagen o toma una foto.");
      return;
    }

    // Summarize classifications for the AI
    const validClassifications = imageClassifications.filter(c => c !== '' && c !== null);
    const summary = validClassifications.length > 0 
      ? `Detectado por visión artificial (Modelo Específico): ${validClassifications.join(', ')}`
      : '';

    onSubmit({
      ...formData,
      autoClassification: summary
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <Microscope className="w-5 h-5 text-teal-600" />
           <h2 className="font-semibold text-slate-800">Datos de Observación</h2>
        </div>
        {tmModel ? (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
             <ScanEye className="w-3 h-3" />
             <span>IA de Visión Activa (Local)</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-medium">
             <span>Cargando modelo visual...</span>
          </div>
        )}
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Image Upload Section */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Imágenes de Referencia (Obligatorio)
          </label>
          
          <div className="space-y-4">
            {(!formData.images || formData.images.length === 0) ? (
              <div className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors ${validationError ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-slate-50/50'}`}>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
                  
                  {/* Upload Button */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 bg-white border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-teal-500 hover:shadow-md transition-all group flex flex-col items-center gap-2"
                  >
                    <div className="bg-slate-100 p-3 rounded-full group-hover:bg-teal-50 transition-colors">
                       <Upload className="h-6 w-6 text-slate-400 group-hover:text-teal-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-teal-700">Subir Archivo</span>
                  </div>

                  {/* Camera Button (Mobile optimized) */}
                  <div 
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex-1 bg-white border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all group flex flex-col items-center gap-2"
                  >
                    <div className="bg-slate-100 p-3 rounded-full group-hover:bg-indigo-50 transition-colors">
                       <Camera className="h-6 w-6 text-slate-400 group-hover:text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700">Usar Cámara</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-4">Soporta múltiples archivos (PNG, JPG). Se analizarán automáticamente con IA.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50 group aspect-square shadow-sm">
                    <img 
                      src={img} 
                      alt={`Muestra ${index + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                    
                    {/* Auto Classification Badge */}
                    {imageClassifications[index] && (
                       <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-2 py-1">
                          <p className="text-[10px] font-bold text-white text-center truncate flex items-center justify-center gap-1">
                            <ScanEye className="w-3 h-3 text-teal-400" />
                            {imageClassifications[index]}
                          </p>
                       </div>
                    )}

                    <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="p-1 bg-white rounded-full text-red-600 hover:bg-red-50 shadow-sm"
                        title="Eliminar imagen"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Add more buttons (Small versions) */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors aspect-square bg-white"
                  title="Añadir desde galería"
                >
                  <Plus className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-xs text-slate-500 font-medium">Galería</span>
                </button>

                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors aspect-square bg-white"
                  title="Tomar foto"
                >
                  <Camera className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-xs text-slate-500 font-medium">Foto</span>
                </button>
              </div>
            )}
          </div>
          
          {/* Standard File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            multiple
            className="hidden" 
          />
          
          {/* Camera Input (Mobile Environment) */}
          <input 
            type="file" 
            ref={cameraInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            capture="environment"
            className="hidden" 
          />
        </div>

        {/* Gram Stain - Priority Field */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tinción de Gram
          </label>
          <div className="flex gap-4 flex-wrap">
            {['Gram Positivo', 'Gram Negativo', 'Variable', 'No aplica (ej. Micobacterias)'].map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="gramStain"
                  value={option}
                  checked={formData.gramStain === option}
                  onChange={handleChange}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <span className={`text-sm ${formData.gramStain === option ? 'text-teal-700 font-medium' : 'text-slate-600 group-hover:text-slate-800'}`}>
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="morphology" className="block text-sm font-medium text-slate-700 mb-1">
            Morfología Celular
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Dna className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              id="morphology"
              name="morphology"
              placeholder="Ej. Cocos, bacilos, espirilos"
              value={formData.morphology}
              onChange={handleChange}
              className="pl-10 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border py-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="arrangement" className="block text-sm font-medium text-slate-700 mb-1">
            Agrupación
          </label>
          <input
            type="text"
            id="arrangement"
            name="arrangement"
            placeholder="Ej. Racimos, cadenas, pares"
            value={formData.arrangement}
            onChange={handleChange}
            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border py-2 px-3"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="colonyMorphology" className="block text-sm font-medium text-slate-700 mb-1">
            Morfología Colonial
          </label>
          <textarea
            id="colonyMorphology"
            name="colonyMorphology"
            rows={2}
            placeholder="Ej. Colonias redondas, amarillas, bordes lisos, hemólisis beta en agar sangre"
            value={formData.colonyMorphology}
            onChange={handleChange}
            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border py-2 px-3"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="sampleContext" className="block text-sm font-medium text-slate-700 mb-1">
             Contexto de la Muestra
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <FlaskConical className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              id="sampleContext"
              name="sampleContext"
              placeholder="Ej. Exudado faríngeo, muestra de suelo, superficie de alimentos"
              value={formData.sampleContext}
              onChange={handleChange}
              className="pl-10 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border py-2"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="otherObservations" className="block text-sm font-medium text-slate-700 mb-1">
            Otras Observaciones (Opcional)
          </label>
          <div className="relative">
             <div className="absolute top-3 left-3 pointer-events-none">
               <FileText className="h-4 w-4 text-slate-400" />
             </div>
            <textarea
              id="otherObservations"
              name="otherObservations"
              rows={2}
              placeholder="Ej. Móvil, catalasa positivo, olor a uvas"
              value={formData.otherObservations}
              onChange={handleChange}
              className="pl-10 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border py-2"
            />
          </div>
        </div>

      </div>

      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        {validationError ? (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-md w-full md:w-auto text-sm border border-red-200 animate-pulse">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{validationError}</span>
          </div>
        ) : (
          <div className="hidden md:block"></div> 
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`
            w-full md:w-auto inline-flex justify-center rounded-md border border-transparent py-2 px-6 text-sm font-medium text-white shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
            ${isLoading ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'}
            transition-colors duration-200
          `}
        >
          {isLoading ? 'Analizando Muestra...' : 'Identificar Microorganismo'}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
