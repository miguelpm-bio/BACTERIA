
export interface MicroorganismInput {
  morphology: string;
  arrangement: string;
  gramStain: string;
  colonyMorphology: string;
  sampleContext: string;
  otherObservations: string;
  images?: string[]; // Array of Base64 strings
  autoClassification?: string; // Classification from Teachable Machine
}

export interface DifferentialDiagnosis {
  name: string;
  exclusionReason: string;
}

export interface IdentificationResult {
  scientificName: string;
  commonNameOrGroup?: string;
  probability: 'Alta' | 'Media' | 'Baja';
  visualMorphology: string; // New field for detailed visual analysis
  justification: string;
  differentials: DifferentialDiagnosis[];
  suggestedTests: string[];
  uses?: string[];
  trivia?: string[];
  isReferenceMatch?: boolean;
  referenceImages?: string[]; // Comparison images
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: MicroorganismInput;
  result: IdentificationResult;
}
