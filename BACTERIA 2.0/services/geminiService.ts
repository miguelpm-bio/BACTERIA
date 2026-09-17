
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MicroorganismInput, IdentificationResult } from "../types";
import { REFERENCE_DATABASE } from "./referenceDatabase";

const apiKey = process.env.API_KEY;

// Define the response schema strictly to match the requested output format
const identificationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    scientificName: {
      type: Type.STRING,
      description: "El género y especie más probable (ej. Staphylococcus aureus). Si es dudoso, solo Género o Familia.",
    },
    commonNameOrGroup: {
      type: Type.STRING,
      description: "Nombre común o grupo general.",
    },
    probability: {
      type: Type.STRING,
      enum: ["Alta", "Media", "Baja"],
      description: "Nivel de probabilidad de la identificación.",
    },
    visualMorphology: {
      type: Type.STRING,
      description: "Descripción DETALLADA y ESPECÍFICA de las características morfológicas observadas ÚNICAMENTE en la imagen proporcionada (ej. 'Célula ovalada con banda de cilios ecuatorial', 'Cocos gram+ en tétradas'). Si no hay imagen, indicar 'No visible'.",
    },
    justification: {
      type: Type.STRING,
      description: "Explicación taxonómica que integra la visualMorphology y los datos de texto para llegar a la conclusión.",
    },
    differentials: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Nombre del microorganismo alternativo." },
          exclusionReason: { type: Type.STRING, description: "Cómo descartarlo o por qué es menos probable basado en la morfología observada." },
        },
        required: ["name", "exclusionReason"],
      },
      description: "Otros 2-3 microorganismos posibles.",
    },
    suggestedTests: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de pruebas bioquímicas o confirmatorias sugeridas.",
    },
    uses: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de usos importantes (industriales, médicos, biotecnológicos, alimentarios) o 'No aplica' si es puramente patógeno sin usos.",
    },
    trivia: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "2-3 datos curiosos, hechos históricos o características únicas del microorganismo.",
    },
    isReferenceMatch: {
      type: Type.BOOLEAN,
      description: "Establecer en TRUE si la identificación final coincide con uno de los microorganismos listados en la 'Base de Datos de Referencia Extendida' proporcionada en el prompt.",
    }
  },
  required: ["scientificName", "probability", "visualMorphology", "justification", "differentials", "suggestedTests", "uses", "trivia"],
};

export const identifyMicroorganism = async (
  data: MicroorganismInput, 
  mode: 'expert' | 'fast' = 'expert'
): Promise<IdentificationResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Construct the Knowledge Base Context
  const referenceContext = REFERENCE_DATABASE.map(micro => 
    `MICROORGANISMO DE REFERENCIA (PRIORITARIO) [ID: ${micro.id}]:
     - Nombre: ${micro.name}
     - Categoría: ${micro.category}
     - Morfología: ${micro.morphology}
     - Colonia/Comportamiento: ${micro.colonyFeatures}
     - Descripción: ${micro.description}`
  ).join('\n\n');

  let promptExtraInfo = "";
  if (data.autoClassification) {
    promptExtraInfo = `
    PISTA DE MODELO DE CLASIFICACIÓN PRELIMINAR:
    Un modelo de visión artificial (Teachable Machine) ha detectado patrones compatibles con: "${data.autoClassification}".
    Usa esto como guía, pero NO confíes ciegamente. Tu análisis visual directo (Multimodal) es superior.
    `;
  }

  const textPrompt = `
    Actúa como un microbiólogo experto y taxonomista con acceso a una base de datos ampliada. 
    Tu tarea principal es realizar un ANÁLISIS VISUAL RIGUROSO de las imágenes proporcionadas para extraer características morfológicas clave antes de concluir una identificación.
    
    INSTRUCCIONES DE ANÁLISIS DE IMAGEN (CRÍTICO):
    1. Examina la imagen píxel a píxel buscando estructuras diagnósticas:
       - Presencia, posición y número de flagelos o cilios.
       - Forma exacta de la célula (piriforme, fusiforme, esférica, ameboide).
       - Estructuras internas visibles (núcleo, vacuolas, cloroplastos).
       - Patrones de agrupación.
    2. Genera una descripción detallada en el campo 'visualMorphology'.
    3. Compara estas observaciones con la Base de Datos de Referencia Extendida.

    INSTRUCCIÓN DE SEGURIDAD TAXONÓMICA:
    Si la evidencia visual o descriptiva no es suficiente para asegurar la Especie (ej. distinguir entre Paramecium caudatum vs aurelia), detente en la clasificación taxonómica más segura y profunda posible (ej. Género "Paramecium sp." o Familia).
    Es preferible una identificación de Género correcta ("Alta" probabilidad) a una identificación de Especie incorrecta. Solo proporciona la Especie si hay rasgos distintivos claros.

    BASE DE DATOS DE REFERENCIA EXTENDIDA:
    La siguiente lista contiene microorganismos que han sido añadidos recientemente a tu base de datos prioritaria. Si las características observadas (especialmente en las imágenes) coinciden fuertemente con alguno de estos, prioriza esta identificación, marca 'isReferenceMatch' como true y asegúrate de usar el nombre científico exacto.

    ${referenceContext}
    
    ---------------------------------------------------
    
    DATOS DE LA MUESTRA A ANALIZAR:
    - Morfología celular (Reportada por usuario): ${data.morphology}
    - Agrupación (Reportada por usuario): ${data.arrangement}
    - Tinción de Gram (Reportada por usuario): ${data.gramStain}
    - Morfología colonial: ${data.colonyMorphology}
    - Contexto de la muestra: ${data.sampleContext}
    - Otras observaciones: ${data.otherObservations}
    ${promptExtraInfo}

    Proporciona tu respuesta estrictamente en formato JSON según el esquema especificado.
  `;

  // Construct parts array for multimodal input
  const parts: any[] = [{ text: textPrompt }];

  if (data.images && data.images.length > 0) {
    data.images.forEach(imageStr => {
      // Extract base64 data and mime type
      // Expected format: "data:image/png;base64,iVBORw0KGgo..."
      const matches = imageStr.match(/^data:(.+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        const base64Data = matches[2];
        
        parts.push({
          inlineData: {
            mimeType: mimeType,
            data: base64Data
          }
        });
      }
    });
  }

  try {
    const isExpert = mode === 'expert';
    
    // Select model based on mode
    const modelName = isExpert ? "gemini-3-pro-preview" : "gemini-flash-lite-latest";
    
    // Configure thinking parameters ONLY for expert mode (Gemini 3 Pro)
    const thinkingConfig = isExpert ? { thinkingBudget: 32768 } : undefined;

    // Add googleSearch tool
    const tools = [{ googleSearch: {} }];

    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: parts
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: identificationSchema,
        // Add thinking config if in expert mode
        ...(thinkingConfig ? { thinkingConfig } : {}),
        tools: tools,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response generated from AI.");

    const result = JSON.parse(text) as IdentificationResult;

    // Post-processing: If it's a reference match, try to find the image URLs in our local DB
    // This ensures we serve high-quality static assets for known organisms alongside AI reasoning
    if (result.isReferenceMatch && result.scientificName) {
      // Fuzzy matching to find the ID in the reference database
      const matchedRef = REFERENCE_DATABASE.find(ref => 
        result.scientificName.toLowerCase().includes(ref.name.toLowerCase()) ||
        ref.name.toLowerCase().includes(result.scientificName.toLowerCase())
      );
      
      if (matchedRef && matchedRef.imageUrls) {
        result.referenceImages = matchedRef.imageUrls;
      }
    }

    return result;
  } catch (error) {
    console.error("Error identifying microorganism:", error);
    throw error;
  }
};
