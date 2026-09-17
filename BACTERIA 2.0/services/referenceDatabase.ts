
export interface ReferenceMicroorganism {
  id: string;
  name: string;
  category: string; // 'Bacteria', 'Fungi', 'Protista - Protozoa', 'Protista - Algae', 'Archaea', etc.
  description: string;
  morphology: string;
  colonyFeatures: string;
  imageUrls?: string[]; 
}

export const REFERENCE_DATABASE: ReferenceMicroorganism[] = [
  // --- BACTERIAS ---
  {
    id: "s_aureus",
    name: "Staphylococcus aureus",
    category: "Bacteria",
    description: "Coco Gram positivo patógeno, conocido por su pigmentación dorada.",
    morphology: "Cocos Gram positivos dispuestos en racimos irregulares (uvas).",
    colonyFeatures: "Colonias doradas/amarillas, beta-hemolíticas. Fermenta manitol en MSA.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Staphylococcus_aureus_VISA_2.jpg/640px-Staphylococcus_aureus_VISA_2.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Staphylococcus_aureus_Gram.jpg/640px-Staphylococcus_aureus_Gram.jpg"
    ]
  },
  {
    id: "s_epidermidis",
    name: "Staphylococcus epidermidis",
    category: "Bacteria",
    description: "Coco Gram positivo, microbiota habitual de piel.",
    morphology: "Cocos Gram positivos en racimos.",
    colonyFeatures: "Colonias blancas/grisáceas, no hemolíticas. No fermenta manitol (rosa en MSA)."
  },
  {
    id: "s_pyogenes",
    name: "Streptococcus pyogenes (Grupo A)",
    category: "Bacteria",
    description: "Coco Gram positivo, causante de faringitis.",
    morphology: "Cocos Gram positivos en cadenas.",
    colonyFeatures: "Colonias puntiformes con gran zona de beta-hemólisis clara. Sensible a Bacitracina.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Streptococcus_pyogenes.jpg/640px-Streptococcus_pyogenes.jpg"
    ]
  },
  {
    id: "s_agalactiae",
    name: "Streptococcus agalactiae (Grupo B)",
    category: "Bacteria",
    description: "Coco Gram positivo, patógeno neonatal.",
    morphology: "Cocos Gram positivos en cadenas o pares.",
    colonyFeatures: "Beta-hemólisis difusa/estrecha. Prueba CAMP positiva (punta de flecha)."
  },
  {
    id: "s_pneumoniae",
    name: "Streptococcus pneumoniae",
    category: "Bacteria",
    description: "Diplococo causante de neumonía.",
    morphology: "Diplococos Gram positivos lanceolados (forma de llama).",
    colonyFeatures: "Alfa-hemólisis (verdosa). Colonias mucoides o umbilicadas (centro deprimido).",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Streptococcus_pneumoniae.jpg/640px-Streptococcus_pneumoniae.jpg"
    ]
  },
  {
    id: "e_faecalis",
    name: "Enterococcus faecalis",
    category: "Bacteria",
    description: "Coco Gram positivo entérico.",
    morphology: "Cocos Gram positivos en pares o cadenas cortas.",
    colonyFeatures: "Colonias grises, gamma-hemolíticas. Ennegrece el medio Bilis Esculina."
  },
  {
    id: "n_meningitidis",
    name: "Neisseria meningitidis",
    category: "Bacteria",
    description: "Diplococo Gram negativo, agente de meningitis.",
    morphology: "Diplococos Gram negativos arriñonados (forma de grano de café), a menudo intracelulares.",
    colonyFeatures: "Colonias grises, húmedas, convexas y brillantes en agar Chocolate. No crece bien en MacConkey.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Neisseria_meningitidis_Gram.jpg/640px-Neisseria_meningitidis_Gram.jpg"
    ]
  },
  {
    id: "n_gonorrhoeae",
    name: "Neisseria gonorrhoeae",
    category: "Bacteria",
    description: "Diplococo Gram negativo, agente de gonorrea.",
    morphology: "Diplococos Gram negativos arriñonados (grano de café), típicamente intracelulares dentro de neutrófilos.",
    colonyFeatures: "Requiere medios enriquecidos (Thayer-Martin). Colonias pequeñas, grisáceas o translúcidas.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Neisseria_gonorrhoeae_Gram.jpg/640px-Neisseria_gonorrhoeae_Gram.jpg"
    ]
  },
  {
    id: "m_catarrhalis",
    name: "Moraxella catarrhalis",
    category: "Bacteria",
    description: "Diplococo Gram negativo respiratorio, confundido con Neisseria.",
    morphology: "Diplococos Gram negativos con lados adyacentes aplanados (grano de café). Indistinguible de Neisseria al Gram.",
    colonyFeatures: "Fenómeno de 'Hockey Puck': la colonia es dura y se desliza intacta sobre el agar al empujarla. Oxidasa positiva.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Moraxella_catarrhalis_01.jpg/640px-Moraxella_catarrhalis_01.jpg"
    ]
  },
  {
    id: "a_baumannii",
    name: "Acinetobacter baumannii",
    category: "Bacteria",
    description: "Cocobacilo oportunista multirresistente.",
    morphology: "Cocobacilos Gram negativos pleomórficos (cortos y gruesos), a menudo en pares. Retienen el violeta y pueden parecer Gram positivos (error común).",
    colonyFeatures: "Colonias cremosas, opacas, no fermentadoras en MacConkey (pueden tener tono lavanda en agar sangre). Inmóvil.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Acinetobacter_baumannii_Gram.jpg/640px-Acinetobacter_baumannii_Gram.jpg"
    ]
  },
  {
    id: "p_aeruginosa",
    name: "Pseudomonas aeruginosa",
    category: "Bacteria",
    description: "Bacilo Gram negativo no fermentador.",
    morphology: "Bacilos Gram negativos finos y móviles.",
    colonyFeatures: "Brillo metálico, pigmentos verdes/azules (piocianina). Olor a frutas/uvas.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Pseudomonas_aeruginosa_Gram.jpg/640px-Pseudomonas_aeruginosa_Gram.jpg"
    ]
  },
  {
    id: "h_influenzae",
    name: "Haemophilus influenzae",
    category: "Bacteria",
    description: "Cocobacilo fastidioso respiratorio.",
    morphology: "Cocobacilos Gram negativos muy pequeños (pleomórficos).",
    colonyFeatures: "Requiere factores X y V (Agar Chocolate). Muestra 'satelitismo' (crece alrededor de S. aureus en agar sangre). Olor a ratón.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Haemophilus_influenzae_Gram.jpg/640px-Haemophilus_influenzae_Gram.jpg"
    ]
  },
  {
    id: "e_coli",
    name: "Escherichia coli",
    category: "Bacteria",
    description: "Bacilo Gram negativo, indicador fecal.",
    morphology: "Bacilos Gram negativos.",
    colonyFeatures: "Rosa fuerte en MacConkey (fermenta lactosa). Brillo verde metálico en EMB.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/EscherichiaColi_NIAID.jpg/640px-EscherichiaColi_NIAID.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/E_coli_on_EMB_agar.jpg/640px-E_coli_on_EMB_agar.jpg"
    ]
  },
  {
    id: "k_pneumoniae",
    name: "Klebsiella pneumoniae",
    category: "Bacteria",
    description: "Bacilo Gram negativo encapsulado.",
    morphology: "Bacilos Gram negativos gruesos.",
    colonyFeatures: "Colonias grandes, muy mucoides (viscosas), rosadas en MacConkey."
  },
  {
    id: "e_aerogenes",
    name: "Enterobacter aerogenes",
    category: "Bacteria",
    description: "Coliforme oportunista.",
    morphology: "Bacilos Gram negativos, móviles (a diferencia de Klebsiella que es inmóvil).",
    colonyFeatures: "Colonias mucoides rosadas en MacConkey, a menudo indistinguibles de Klebsiella visualmente en placa, requiere pruebas bioquímicas (móvil, ornitina +)."
  },
  {
    id: "c_freundii",
    name: "Citrobacter freundii",
    category: "Bacteria",
    description: "Bacilo Gram negativo, confundido con Salmonella.",
    morphology: "Bacilos Gram negativos.",
    colonyFeatures: "Fermentador de lactosa variable (rosa o incoloro). A menudo produce H2S (centro negro), mimetizando a Salmonella.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Citrobacter_freundii_on_XLD_agar.jpg/640px-Citrobacter_freundii_on_XLD_agar.jpg"
    ]
  },
  {
    id: "s_marcescens",
    name: "Serratia marcescens",
    category: "Bacteria",
    description: "Bacilo Gram negativo oportunista, famoso por su pigmento rojo.",
    morphology: "Bacilos Gram negativos móviles.",
    colonyFeatures: "Produce pigmento rojo intenso (prodigiosina), especialmente a temperatura ambiente (25°C). Colonias convexas y lisas.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Serratia_marcescens_on_nutrient_agar.jpg/640px-Serratia_marcescens_on_nutrient_agar.jpg"
    ]
  },
  {
    id: "p_mirabilis",
    name: "Proteus mirabilis",
    category: "Bacteria",
    description: "Bacilo Gram negativo muy móvil.",
    morphology: "Bacilos Gram negativos.",
    colonyFeatures: "Swarming (crecimiento en oleadas concéntricas). Olor fétido. Indol negativo."
  },
  {
    id: "p_vulgaris",
    name: "Proteus vulgaris",
    category: "Bacteria",
    description: "Bacilo Gram negativo, similar a P. mirabilis pero indol positivo.",
    morphology: "Bacilos Gram negativos.",
    colonyFeatures: "Swarming intenso (oleadas). Indol positivo (diferencia clave con P. mirabilis).",
    imageUrls: [
       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Proteus_vulgaris_Gram_stain.jpg/640px-Proteus_vulgaris_Gram_stain.jpg"
    ]
  },
  {
    id: "s_enterica",
    name: "Salmonella enterica",
    category: "Bacteria",
    description: "Patógeno intestinal.",
    morphology: "Bacilos Gram negativos.",
    colonyFeatures: "Colonias transparentes con centro negro (H2S) en agar SS, XLD o HE.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/SalmonellaNIAID.jpg/640px-SalmonellaNIAID.jpg"
    ]
  },
  {
    id: "shigella",
    name: "Shigella sp.",
    category: "Bacteria",
    description: "Patógeno causante de disentería.",
    morphology: "Bacilos Gram negativos inmóviles.",
    colonyFeatures: "Transparentes/incoloras en MacConkey/XLD (no fermenta lactosa, no produce H2S).",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Shigella_boydii_01.jpg/640px-Shigella_boydii_01.jpg"
    ]
  },
  {
    id: "h_pylori",
    name: "Helicobacter pylori",
    category: "Bacteria",
    description: "Patógeno gástrico curvado.",
    morphology: "Bacilos Gram negativos curvados, en espiral o forma de gaviota. Microaerófilo.",
    colonyFeatures: "Difícil cultivo. Colonias pequeñas, translúcidas. Prueba de Ureasa rápida intensamente positiva.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Helicobacter_pylori_diagram.png/640px-Helicobacter_pylori_diagram.png"
    ]
  },
  {
    id: "b_subtilis",
    name: "Bacillus subtilis",
    category: "Bacteria",
    description: "Bacilo esporulado ambiental.",
    morphology: "Bacilos Gram positivos grandes, rectos, con endosporas.",
    colonyFeatures: "Colonias secas, rugosas, bordes irregulares, aspecto de 'vidrio esmerilado'.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Bacillus_subtilis_Gram.jpg/640px-Bacillus_subtilis_Gram.jpg"
    ]
  },
  {
    id: "b_anthracis",
    name: "Bacillus anthracis",
    category: "Bacteria",
    description: "Agente del ántrax.",
    morphology: "Bacilos grandes, extremos cuadrados (caña de bambú), cadenas largas.",
    colonyFeatures: "No hemolítico. Bordes filamentosos ('cabeza de medusa'). Consistencia tenaz.",
    imageUrls: [
       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bacillus_anthracis_Gram.jpg/640px-Bacillus_anthracis_Gram.jpg"
    ]
  },
  {
    id: "c_tetani",
    name: "Clostridium tetani",
    category: "Bacteria",
    description: "Anaerobio estricto, agente del tétanos.",
    morphology: "Bacilo Gram positivo delgado con espora terminal redonda que deforma la célula (aspecto de 'palillo de tambor' o 'raqueta de tenis').",
    colonyFeatures: "Crecimiento en velo (swarming) fino sobre agar sangre (anaerobiosis).",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Clostridium_tetani_01.jpg/640px-Clostridium_tetani_01.jpg"
    ]
  },
  {
    id: "c_perfringens",
    name: "Clostridium perfringens",
    category: "Bacteria",
    description: "Anaerobio, agente de gangrena gaseosa.",
    morphology: "Bacilos Gram positivos grandes, rectangulares ('vagones de tren' o 'boxcar'), rara vez se ven esporas in vitro.",
    colonyFeatures: "Doble zona de beta-hemólisis característica en agar sangre (anaerobiosis).",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Clostridium_perfringens_Gram.jpg/640px-Clostridium_perfringens_Gram.jpg"
    ]
  },
  {
    id: "c_diphtheriae",
    name: "Corynebacterium diphtheriae",
    category: "Bacteria",
    description: "Bacilo pleomórfico.",
    morphology: "Forma de maza o letras chinas. Gránulos metacromáticos.",
    colonyFeatures: "Colonias negras/grises en agar Telurito (Tinsdale)."
  },
  {
    id: "l_monocytogenes",
    name: "Listeria monocytogenes",
    category: "Bacteria",
    description: "Patógeno psicrotolerante.",
    morphology: "Cocobacilos Gram positivos cortos. Móvil a 25°C (paraguas).",
    colonyFeatures: "Beta-hemólisis débil. Prueba CAMP positiva (bloque rectangular)."
  },
  {
    id: "a_israelii",
    name: "Actinomyces israelii",
    category: "Bacteria",
    description: "Bacteria filamentosa anaerobia.",
    morphology: "Bacilos Gram positivos ramificados filamentosos (parecen hongos pero son bacterias). No ácido-alcohol resistentes.",
    colonyFeatures: "Colonias blancas, duras y rugosas con aspecto de 'muela' (molar tooth) en anaerobiosis.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Actinomyces_israelii.jpg/640px-Actinomyces_israelii.jpg"
    ]
  },
  {
    id: "nocardia",
    name: "Nocardia sp.",
    category: "Bacteria",
    description: "Bacteria filamentosa aerobia, patógeno pulmonar/cutáneo.",
    morphology: "Bacilos Gram positivos ramificados y arrosariados. Ácido-alcohol resistente parcial (Kinyoun positivo débil), lo que la diferencia de Actinomyces.",
    colonyFeatures: "Crecimiento lento (3-5 días). Colonias rugosas, secas, con pigmentos tiza, naranja o salmón. Olor característico a tierra húmeda.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Nocardia_asteroides_Gram.jpg/640px-Nocardia_asteroides_Gram.jpg"
    ]
  },
  {
    id: "y_enterocolitica",
    name: "Yersinia enterocolitica",
    category: "Bacteria",
    description: "Enteropatógeno psicrotrófo.",
    morphology: "Cocobacilos Gram negativos, tinción bipolar.",
    colonyFeatures: "Colonias en 'ojo de buey' (centro rojo, borde transparente) en agar CIN."
  },
  {
    id: "v_cholerae",
    name: "Vibrio cholerae",
    category: "Bacteria",
    description: "Bacilo curvado halófilo.",
    morphology: "Bacilos Gram negativos curvados (coma).",
    colonyFeatures: "Colonias amarillas (fermenta sacarosa) en agar TCBS.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Vibrio_cholerae_Gram.jpg/640px-Vibrio_cholerae_Gram.jpg"
    ]
  },
  {
    id: "c_jejuni",
    name: "Campylobacter jejuni",
    category: "Bacteria",
    description: "Bacilo curvado microaerófilo.",
    morphology: "Forma de espiral, 'S' o alas de gaviota.",
    colonyFeatures: "Colonias grisáceas húmedas que se extienden en agar Campy-BAP (42°C)."
  },
  {
    id: "l_pneumophila",
    name: "Legionella pneumophila",
    category: "Bacteria",
    description: "Patógeno respiratorio atípico.",
    morphology: "Bacilos Gram negativos débiles (se tiñen mal).",
    colonyFeatures: "Requiere Agar BCYE (Carbón-Levadura-Cisteína). Aspecto de 'vidrio esmerilado' o 'vidrio cortado'.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Legionella_pneumophila_colony.jpg/640px-Legionella_pneumophila_colony.jpg"
    ]
  },
  {
    id: "m_tuberculosis",
    name: "Mycobacterium tuberculosis",
    category: "Bacteria",
    description: "Bacilo ácido-alcohol resistente.",
    morphology: "Bacilos rojos delgados en Ziehl-Neelsen.",
    colonyFeatures: "Crecimiento lento. Colonias rugosas, secas, color crema ('migas de pan') en Löwenstein-Jensen.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Mycobacterium_tuberculosis_Ziehl-Neelsen_stain_02.jpg/640px-Mycobacterium_tuberculosis_Ziehl-Neelsen_stain_02.jpg"
    ]
  },
  {
    id: "t_pallidum",
    name: "Treponema pallidum",
    category: "Bacteria",
    description: "Espiroqueta agente de sífilis.",
    morphology: "Espiroqueta muy delgada con espirales apretadas. No visible al Gram. Requiere microscopía de Campo Oscuro o impregnación argéntica.",
    colonyFeatures: "No cultivable en medios artificiales.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Treponema_pallidum_01.png/640px-Treponema_pallidum_01.png"
    ]
  },
  
  // --- FUNGI ---
  {
    id: "c_albicans",
    name: "Candida albicans",
    category: "Fungi",
    description: "Levadura oportunista.",
    morphology: "Células ovoides grandes (levaduras) con pseudohifas.",
    colonyFeatures: "Colonias blancas, cremosas, olor a levadura. Desarrolla filamentos al envejecer.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Candida_albicans_PHIL_3109_lores.jpg/640px-Candida_albicans_PHIL_3109_lores.jpg"
    ]
  },
  {
    id: "c_neoformans",
    name: "Cryptococcus neoformans",
    category: "Fungi",
    description: "Levadura encapsulada patógena.",
    morphology: "Levadura redonda. Tinción negativa con Tinta China revela una cápsula prominente (halo claro alrededor de la célula).",
    colonyFeatures: "Colonias mucoides, color crema/marrón. Ureasa positiva.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Cryptococcus_neoformans_using_a_light_India_ink_staining_preparation_PHIL_3771_lores.jpg/640px-Cryptococcus_neoformans_using_a_light_India_ink_staining_preparation_PHIL_3771_lores.jpg"
    ]
  },
  {
    id: "a_fumigatus",
    name: "Aspergillus fumigatus",
    category: "Fungi",
    description: "Moho oportunista filamentoso.",
    morphology: "Hifas tabicadas hialinas con ramificación dicotómica (45°). Conidióforo termina en una vesícula con fialidas en la parte superior (forma de aspersor).",
    colonyFeatures: "Colonias polvorientas, azul-verdosas con borde blanco.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Aspergillus_fumigatus_01.jpg/640px-Aspergillus_fumigatus_01.jpg"
    ]
  },
  {
    id: "penicillium",
    name: "Penicillium sp.",
    category: "Fungi",
    description: "Moho ambiental común, fuente de penicilina, a veces confundido con Aspergillus.",
    morphology: "Hifas tabicadas. Estructura reproductiva (conidióforo) ramificada que asemeja un 'pincel' o 'escoba' (penicillus), con cadenas de conidios.",
    colonyFeatures: "Colonias planas, aterciopeladas o polvorientas, típicamente verde o verde-azuladas con borde blanco radial.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Penicillium_digitatum_conidia.jpg/640px-Penicillium_digitatum_conidia.jpg"
    ]
  },
  {
    id: "fusarium",
    name: "Fusarium sp.",
    category: "Fungi",
    description: "Moho patógeno de plantas y humanos (queratitis).",
    morphology: "Macroconidios multicelulares característicos en forma de plátano, canoa o media luna. Hifas tabicadas.",
    colonyFeatures: "Crecimiento rápido, algodonoso. Frecuentemente produce pigmentos rosados, lilas o naranjas en el anverso y reverso.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Fusarium_verticillioides.jpg/640px-Fusarium_verticillioides.jpg"
    ]
  },
  {
    id: "rhizopus",
    name: "Rhizopus sp.",
    category: "Fungi",
    description: "Moho del pan común, zigomiceto de crecimiento rápido.",
    morphology: "Hifas anchas y aseptadas (cenocíticas). Esporangióforos largos terminados en un esporangio esférico negro. Presencia característica de rizoides (raíces) en la base.",
    colonyFeatures: "Crecimiento extremadamente rápido ('levantador de tapas'), textura algodonosa laxa, inicialmente blanca y luego gris con puntos negros.",
    imageUrls: [
       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Rhizopus_stolonifer_a_1.jpg/640px-Rhizopus_stolonifer_a_1.jpg"
    ]
  },
  {
    id: "mucor",
    name: "Mucor sp.",
    category: "Fungi",
    description: "Zigomiceto ambiental, similar a Rhizopus pero sin rizoides.",
    morphology: "Hifas anchas, aseptadas (cenocíticas) y ramificadas irregularmente. Esporangios esféricos terminales. A diferencia de Rhizopus, NO tiene rizoides ni estolones.",
    colonyFeatures: "Crecimiento rápido, velloso/algodonoso (aspecto de 'algodón de azúcar'), blanco que se torna grisáceo.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Mucor_mucedo.jpg/640px-Mucor_mucedo.jpg"
    ]
  },

  // --- PROTISTAS: AMEBAS ---
  {
    id: "amoeba_proteus",
    name: "Amoeba proteus",
    category: "Protista - Protozoa",
    description: "Ameba desnuda de gran tamaño, común en detritos.",
    morphology: "Célula grande (hasta 600µm), polipodial (múltiples pseudópodos). Pseudópodos cilíndricos (lobopodios) y anchos. Uninucleada.",
    colonyFeatures: "Movimiento lento por flujo citoplasmático (reptación). Se encuentra en sedimentos o sobre vegetación en descomposición.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amoeba_proteus_movement_2.jpg/640px-Amoeba_proteus_movement_2.jpg"
    ]
  },
  {
    id: "entamoeba_histolytica",
    name: "Entamoeba histolytica",
    category: "Protista - Protozoa",
    description: "Ameba patógena intestinal, agente de disentería amebiana.",
    morphology: "Trofozoíto: núcleo con cariosoma central puntiforme y cromatina periférica fina (rueda de carro). Puede contener eritrocitos fagocitados (diagnóstico). Quiste: esférico con hasta 4 núcleos y cuerpos cromatoidales en forma de puro.",
    colonyFeatures: "No forma colonias. Se identifica en muestras fecales o biopsias.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Entamoeba_histolytica_01.jpg/640px-Entamoeba_histolytica_01.jpg"
    ]
  },
  {
    id: "chaos",
    name: "Chaos sp. (Ameba gigante)",
    category: "Protista - Protozoa",
    description: "Ameba desnuda gigante, visible a simple vista.",
    morphology: "Enorme (1-5 mm). Multinucleada (cientos de núcleos). Lobopodios anchos. Similar a Amoeba proteus pero mucho más grande.",
    colonyFeatures: "Se desplaza lentamente en el fondo de charcas ricas en materia orgánica. Puede ingerir animales pequeños como rotíferos."
  },
  {
    id: "naegleria",
    name: "Naegleria sp.",
    category: "Protista - Protozoa",
    description: "Ameba limax (forma de babosa) capaz de transformarse.",
    morphology: "Ameba pequeña (10-30µm), monopodial (un solo pseudópodo ancho de avance rápido/eruptivo). Puede transformarse temporalmente en una forma flagelada con 2 flagelos.",
    colonyFeatures: "Movimiento rápido y direccional (limax). Común en aguas templadas/cálidas y suelos. N. fowleri es patógena (45°C).",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Naegleria_fowleri.jpg/640px-Naegleria_fowleri.jpg"
    ]
  },
  {
    id: "arcella",
    name: "Arcella sp.",
    category: "Protista - Protozoa",
    description: "Ameba testácea (con caparazón) común.",
    morphology: "Testa circular/domo (forma de boina) color marrón o transparente, de material orgánico (quitinoso). Apertura central invaginada.",
    colonyFeatures: "Frecuente en fondos de estanques y turberas (Sphagnum). Pseudópodos digitiformes emergen de la apertura central.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Arcella_sp.jpg/640px-Arcella_sp.jpg"
    ]
  },
  {
    id: "difflugia",
    name: "Difflugia sp.",
    category: "Protista - Protozoa",
    description: "Ameba testácea con caparazón de partículas aglutinadas.",
    morphology: "Testa opaca de forma variable (globosa, alargada, con cuernos), compuesta por granos de arena y diatomeas pegadas. Apertura terminal.",
    colonyFeatures: "Habitante del bentos (sedimentos). Difícil de ver si no se mueve, parece un grano de arena con pseudópodos.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Difflugia_urceolata.jpg/640px-Difflugia_urceolata.jpg"
    ]
  },
  {
    id: "actinophrys",
    name: "Actinophrys sol (Heliozoo)",
    category: "Protista - Protozoa",
    description: "Ameba esférica 'animalito sol'.",
    morphology: "Cuerpo esférico con numerosos axopodios (pseudópodos rígidos con eje interno) radiantes. Aspecto espinoso o de sol. Núcleo central único.",
    colonyFeatures: "Flota en la columna de agua o rueda sobre el sustrato. Depredador pasivo que atrapa presas con sus axopodios.",
    imageUrls: [
       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Actinophrys_sol.jpg/640px-Actinophrys_sol.jpg"
    ]
  },

  // --- PROTISTAS: FLAGELADOS ---
  {
    id: "euglena",
    name: "Euglena sp.",
    category: "Protista - Algae",
    description: "Flagelado verde mixótrofo clásico.",
    morphology: "Célula fusiforme/cilíndrica verde (cloroplastos). Un flagelo largo visible anterior. Mancha ocular (estigma) roja. Metabolia (cambio de forma flexible).",
    colonyFeatures: "Nado giratorio característico. Fototrófico positivo (nada hacia la luz). Indicador de materia orgánica.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Euglena_sp.jpg/640px-Euglena_sp.jpg"
    ]
  },
  {
    id: "phacus",
    name: "Phacus sp.",
    category: "Protista - Algae",
    description: "Euglenoideo plano con forma de hoja.",
    morphology: "Célula aplanada, rígida (no metabólica), con forma de hoja, corazón o paleta. Verde brillante (cloroplastos). Espina caudal prominente.",
    colonyFeatures: "Nado rotatorio rápido y vibrante. Común en aguas ricas en materia orgánica junto a Euglena.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Phacus_longicauda.jpg/640px-Phacus_longicauda.jpg"
    ]
  },
  {
    id: "chlamydomonas",
    name: "Chlamydomonas sp.",
    category: "Protista - Algae",
    description: "Alga verde unicelular biflagelada.",
    morphology: "Célula ovoide o esférica verde. Dos flagelos anteriores de igual longitud. Un gran cloroplasto en forma de copa. Mancha ocular roja.",
    colonyFeatures: "Nado rápido y errático, atraída por la luz (fototaxis). Puede formar natas verdes en aguas estancadas.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Chlamydomonas_reinhardtii.jpg/640px-Chlamydomonas_reinhardtii.jpg"
    ]
  },
  {
    id: "pandorina",
    name: "Pandorina sp.",
    category: "Protista - Algae",
    description: "Pequeña colonia esférica de flagelados verdes.",
    morphology: "Colonia compacta esférica u ovoide formada por 8, 16 o 32 células verdes biflageladas apretadas entre sí (aspecto de mora).",
    colonyFeatures: "La colonia rueda sobre sí misma al nadar en el agua.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pandorina_morum.jpg/640px-Pandorina_morum.jpg"
    ]
  },
  {
    id: "peranema",
    name: "Peranema sp.",
    category: "Protista - Protozoa",
    description: "Flagelado euglénido heterótrofo (incoloro).",
    morphology: "Cuerpo plástico (metabolia), base ancha que se estrecha hacia el ápice. Un flagelo anterior grueso dirigido hacia adelante, solo vibra en la punta.",
    colonyFeatures: "Deslizamiento suave ('gliding') sobre superficies, no suele nadar libremente en la columna. Voraz depredador.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Peranema_sp.jpg/640px-Peranema_sp.jpg"
    ]
  },
  {
    id: "giardia",
    name: "Giardia lamblia",
    category: "Protista - Protozoa",
    description: "Flagelado parásito intestinal con forma de pera.",
    morphology: "Trofozoíto piriforme (lágrima) con 2 núcleos grandes que parecen 'ojos' y 4 pares de flagelos. Aspecto de 'cara sonriente' o payaso.",
    colonyFeatures: "No forma colonias. Se observa en heces (quistes o trofozoítos móviles 'hoja cayendo').",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Giardia_lamblia_SEM_8698_lores.jpg/640px-Giardia_lamblia_SEM_8698_lores.jpg"
    ]
  },
  {
    id: "trichomonas",
    name: "Trichomonas vaginalis",
    category: "Protista - Protozoa",
    description: "Flagelado patógeno urogenital.",
    morphology: "Forma de pera u ovoide. 4 flagelos anteriores libres y 1 recurrente que forma una membrana ondulante corta. Axostilo prominente que atraviesa el cuerpo.",
    colonyFeatures: "Movimiento característico vibratorio o de 'sacudida' en preparaciones en fresco. No forma quistes.",
    imageUrls: [
       "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Trichomonas_vaginalis_01.jpg/640px-Trichomonas_vaginalis_01.jpg"
    ]
  },
  {
    id: "trypanosoma",
    name: "Trypanosoma cruzi",
    category: "Protista - Protozoa",
    description: "Hemoflagelado causante de la enfermedad de Chagas.",
    morphology: "Tripomastigote en frotis sanguíneo: forma de 'C', 'S' o 'U'. Núcleo central grande, kinetoplasto posterior prominente, membrana ondulante y flagelo libre anterior.",
    colonyFeatures: "No cultivable en medios estándar. Se observa en sangre periférica.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Trypanosoma_cruzi_crithidia.jpg/640px-Trypanosoma_cruzi_crithidia.jpg"
    ]
  },
  {
    id: "plasmodium",
    name: "Plasmodium falciparum",
    category: "Protista - Protozoa",
    description: "Parásito intracelular causante de malaria severa.",
    morphology: "En eritrocitos (frotis sanguíneo): Trofozoítos jóvenes en forma de anillo delicado ('auriculares'). Gametocitos en forma de banana o media luna.",
    colonyFeatures: "No cultivable. Diagnóstico por microscopía de gota gruesa/frotis.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Plasmodium_falciparum_01.png/640px-Plasmodium_falciparum_01.png"
    ]
  },
  {
    id: "ceratium",
    name: "Ceratium sp.",
    category: "Protista - Algae",
    description: "Dinoflagelado con armadura (teca).",
    morphology: "Grandes, con placas de celulosa formando cuernos característicos: uno apical largo y 2-3 antapicales. Surco transversal (cíngulo).",
    colonyFeatures: "Planctónico. Movimiento giratorio lento. Color pardo/dorado. Inconfundible por sus cuernos (forma de ancla).",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Ceratium_hirundinella.jpg/640px-Ceratium_hirundinella.jpg"
    ]
  },
  {
    id: "volvox",
    name: "Volvox sp.",
    category: "Protista - Algae",
    description: "Colonia esférica de flagelados verdes.",
    morphology: "Gran esfera hueca gelatinosa formada por cientos de células biflageladas conectadas. Contiene colonias hijas internas.",
    colonyFeatures: "Visible a simple vista como puntos verdes rodantes. Nado coordinado de la colonia.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Volvox_aureus.jpg/640px-Volvox_aureus.jpg"
    ]
  },

  // --- PROTISTAS: CILIADOS ---
  {
    id: "paramecium",
    name: "Paramecium sp.",
    category: "Protista - Protozoa",
    description: "El 'zapatilla', ciliado modelo.",
    morphology: "Forma de cigarro o suela de zapato (100-300µm). Ciliatura uniforme y densa. Surco oral visible lateralmente. Vacuolas contráctiles en extremos.",
    colonyFeatures: "Nado rápido, espiralado y directo. Frecuente en aguas estancadas ricas. Se acumula alrededor de burbujas o detritos.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Paramecium_caudatum.jpg/640px-Paramecium_caudatum.jpg"
    ]
  },
  {
    id: "blepharisma",
    name: "Blepharisma sp.",
    category: "Protista - Protozoa",
    description: "Ciliado pigmentado de color rosado o rojo.",
    morphology: "Cuerpo alargado y piriforme. Coloración rosada o rojiza natural distintiva (pigmento blefarismina). Gran campo peristomial (oral).",
    colonyFeatures: "Nado lento y majestuoso. Es fotofóbico (tiende a huir de la luz intensa).",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Blepharisma_japonicum.jpg/640px-Blepharisma_japonicum.jpg"
    ]
  },
  {
    id: "stentor",
    name: "Stentor sp.",
    category: "Protista - Protozoa",
    description: "Ciliado gigante con forma de trompeta.",
    morphology: "Enorme (hasta 2mm), forma cónica/trompeta cuando está extendido. Zona adoral de membranelas muy prominente en espiral. A menudo azul-verdoso (S. coeruleus).",
    colonyFeatures: "Puede nadar (forma oval) o fijarse por la base (forma trompeta). Altamente contráctil. Visible a simple vista.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Stentor_coeruleus.jpg/640px-Stentor_coeruleus.jpg"
    ]
  },
  {
    id: "spirostomum",
    name: "Spirostomum sp.",
    category: "Protista - Protozoa",
    description: "Ciliado muy alargado y contráctil.",
    morphology: "Cuerpo vermiforme (forma de gusano), muy largo (1-3mm) y delgado. Ciliatura uniforme. Vacuola contráctil terminal grande.",
    colonyFeatures: "Nado serpenteante flexible. Capaz de contraerse rapidísimamente a una fracción de su tamaño al ser tocado.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Spirostomum_ambiguum.jpg/640px-Spirostomum_ambiguum.jpg"
    ]
  },
  {
    id: "bursaria",
    name: "Bursaria truncatella",
    category: "Protista - Protozoa",
    description: "Uno de los ciliados más grandes, depredador gigante.",
    morphology: "Cuerpo masivo (hasta 1mm) en forma de saco o bolsa ancha. Una gran invaginación oral (peristoma) divide la parte anterior de la célula.",
    colonyFeatures: "Nado lento y pesado. Carnívoro voraz capaz de tragar Paramecium enteros.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bursaria_truncatella.jpg/640px-Bursaria_truncatella.jpg"
    ]
  },
  {
    id: "vorticella",
    name: "Vorticella sp.",
    category: "Protista - Protozoa",
    description: "Ciliado peritrico sésil con forma de campana.",
    morphology: "Cuerpo en forma de copa o campana invertida. Corona ciliar oral. Tallo largo y contráctil (contiene un mionema que se espiraliza).",
    colonyFeatures: "Sésil, adherido a plantas, detritos o crustáceos. Al ser molestado, el tallo se contrae instantáneamente como un resorte.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Vorticella_sp.jpg/640px-Vorticella_sp.jpg"
    ]
  },
  {
    id: "coleps",
    name: "Coleps sp.",
    category: "Protista - Protozoa",
    description: "Ciliado carroñero con placas (forma de barril).",
    morphology: "Forma de barril, color pardo/oscuro. Cubierto de placas calcáreas (armadura) dispuestas regularmente en filas. Extremo anterior truncado con dientes.",
    colonyFeatures: "Nado rápido rotatorio sobre su eje. Carroñero voraz, a menudo visto atacando otros protistas dañados.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Coleps_sp.jpg/640px-Coleps_sp.jpg"
    ]
  },
  {
    id: "didinium",
    name: "Didinium sp.",
    category: "Protista - Protozoa",
    description: "Ciliado depredador en forma de barril.",
    morphology: "Forma de barril corto. Dos cinturones de cilios (pectinelas): uno anterior y otro medial. Probóscide (cono oral) prominente en el ápice.",
    colonyFeatures: "Nado muy rápido y errático. Depredador especialista de Paramecium (se le ve a menudo ingiriéndolos o adherido a ellos).",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Didinium_nasutum.jpg/640px-Didinium_nasutum.jpg"
    ]
  },
  {
    id: "lacrymaria",
    name: "Lacrymaria olor",
    category: "Protista - Protozoa",
    description: "Ciliado 'cuello de cisne'.",
    morphology: "Cuerpo alargado con un cuello extremadamente largo, flexible y extensible que busca alimento en todas direcciones. Boca en la punta del cuello.",
    colonyFeatures: "Inconfundible por el cuello extensible que se estira hasta 7 veces la longitud del cuerpo buscando presas entre los detritos.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Lacrymaria_olor.jpg/640px-Lacrymaria_olor.jpg"
    ]
  },
  {
    id: "dileptus",
    name: "Dileptus sp.",
    category: "Protista - Protozoa",
    description: "Ciliado depredador con larga trompa.",
    morphology: "Cuerpo alargado y delgado. Posee una 'trompa' (probóscide) anterior larga y flexible, llena de extrusomas tóxicos, que usa para cazar.",
    colonyFeatures: "Se mueve agitando su trompa para explorar y aturdir presas microscópicas.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Dileptus_anser.jpg/640px-Dileptus_anser.jpg"
    ]
  },
  {
    id: "euplotes",
    name: "Euplotes sp.",
    category: "Protista - Protozoa",
    description: "Ciliado hipotrico que 'camina'.",
    morphology: "Cuerpo rígido y aplanado dorso-ventralmente. Grandes cirros (agrupaciones de cilios) en la cara ventral que funcionan como patas.",
    colonyFeatures: "Movimiento espasmódico característico. Usa sus cirros para 'caminar' sobre superficies y detritos.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Euplotes_sp.jpg/640px-Euplotes_sp.jpg"
    ]
  },
  {
    id: "stylonychia",
    name: "Stylonychia sp.",
    category: "Protista - Protozoa",
    description: "Ciliado 'caminante' con cola (cerdas).",
    morphology: "Similar a Euplotes pero más flexible. Cirros ventrales fuertes. Posee tres cerdas caudales largas y rígidas ('colas') en el extremo posterior.",
    colonyFeatures: "Movimientos muy bruscos y saltos hacia atrás. Camina activamente sobre el sustrato.",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Stylonychia_mytilus.jpg/640px-Stylonychia_mytilus.jpg"
    ]
  },
  {
    id: "tetrahymena",
    name: "Tetrahymena sp.",
    category: "Protista - Protozoa",
    description: "Pequeño ciliado piriforme modelo.",
    morphology: "Forma de pera (piriforme), pequeño (50µm). Ciliatura uniforme en todo el cuerpo. Boca pequeña cerca del extremo anterior.",
    colonyFeatures: "Nado rápido y errático. Común en aguas con materia orgánica en descomposición (saprófito).",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Tetrahymena_thermophila.jpg/640px-Tetrahymena_thermophila.jpg"
    ]
  },
  {
    id: "colpidium",
    name: "Colpidium sp.",
    category: "Protista - Protozoa",
    description: "Ciliado con forma de riñón.",
    morphology: "Cuerpo ovoide alargado, ligeramente curvado en forma de riñón o frijol. Ciliatura densa. Boca lateral pequeña.",
    colonyFeatures: "Nado deslizante rápido. Indicador de aguas con alta carga bacteriana (polisaprobia).",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Colpidium_sp.jpg/640px-Colpidium_sp.jpg"
    ]
  }
];
