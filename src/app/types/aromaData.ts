export interface AromaItem {
  family: string;
  subcategory: string;
  aroma: string;
}

export interface AromaCategory {
  family: string;
  familyLabel: string;
  subcategories: {
    name: string;
    label: string;
    aromas: { value: string; label: string }[];
  }[];
}

export const AROMA_DATA: AromaCategory[] = [
  {
    family: 'citricos',
    familyLabel: 'Cítricos',
    subcategories: [
      {
        name: 'citricos_frescos',
        label: 'Frescos',
        aromas: [
          { value: 'limao', label: 'Limão' },
          { value: 'lima', label: 'Lima' },
          { value: 'toranja', label: 'Toranja' },
          { value: 'laranja', label: 'Laranja' },
          { value: 'tangerina', label: 'Tangerina' },
        ],
      },
      {
        name: 'citricos_confitados',
        label: 'Confitados',
        aromas: [
          { value: 'casca_limao', label: 'Casca de limão' },
          { value: 'laranja_cristalizada', label: 'Laranja cristalizada' },
          { value: 'marmelada_citrica', label: 'Marmelada cítrica' },
        ],
      },
    ],
  },
  {
    family: 'frutas_brancas',
    familyLabel: 'Frutas Brancas',
    subcategories: [
      {
        name: 'pomoideas',
        label: 'Pomóideas',
        aromas: [
          { value: 'maca_verde', label: 'Maçã verde' },
          { value: 'maca_madura', label: 'Maçã madura' },
          { value: 'pera', label: 'Pêra' },
          { value: 'marmelo', label: 'Marmelo' },
        ],
      },
      {
        name: 'caroço',
        label: 'Caroço',
        aromas: [
          { value: 'pessego', label: 'Pêssego' },
          { value: 'damasco', label: 'Damasco' },
          { value: 'nectarina', label: 'Nectarina' },
        ],
      },
    ],
  },
  {
    family: 'frutas_tropicais',
    familyLabel: 'Frutas Tropicais',
    subcategories: [
      {
        name: 'tropicais',
        label: 'Tropicais',
        aromas: [
          { value: 'abacaxi', label: 'Abacaxi' },
          { value: 'manga', label: 'Manga' },
          { value: 'maracuja', label: 'Maracujá' },
          { value: 'lichia', label: 'Lichia' },
          { value: 'goiaba', label: 'Goiaba' },
          { value: 'banana', label: 'Banana' },
        ],
      },
    ],
  },
  {
    family: 'frutas_vermelhas',
    familyLabel: 'Frutas Vermelhas',
    subcategories: [
      {
        name: 'vermelhas_frescas',
        label: 'Frescas',
        aromas: [
          { value: 'morango', label: 'Morango' },
          { value: 'framboesa', label: 'Framboesa' },
          { value: 'cereja', label: 'Cereja' },
          { value: 'groselha_vermelha', label: 'Groselha vermelha' },
          { value: 'cranberry', label: 'Cranberry' },
        ],
      },
      {
        name: 'vermelhas_maduras',
        label: 'Maduras / Cozidas',
        aromas: [
          { value: 'compota_morango', label: 'Compota de morango' },
          { value: 'cereja_madura', label: 'Cereja madura' },
          { value: 'geleia_frutas_vermelhas', label: 'Geleia de frutas vermelhas' },
        ],
      },
    ],
  },
  {
    family: 'frutas_negras',
    familyLabel: 'Frutas Negras',
    subcategories: [
      {
        name: 'negras_frescas',
        label: 'Frescas',
        aromas: [
          { value: 'amora', label: 'Amora' },
          { value: 'mirtilo', label: 'Mirtilo' },
          { value: 'cassis', label: 'Cassis' },
          { value: 'ameixa', label: 'Ameixa' },
        ],
      },
      {
        name: 'negras_secas',
        label: 'Secas',
        aromas: [
          { value: 'ameixa_seca', label: 'Ameixa seca' },
          { value: 'figo', label: 'Figo' },
          { value: 'uva_passa', label: 'Uva-passa' },
        ],
      },
    ],
  },
  {
    family: 'florais',
    familyLabel: 'Florais',
    subcategories: [
      {
        name: 'flores',
        label: 'Flores',
        aromas: [
          { value: 'rosa', label: 'Rosa' },
          { value: 'violeta', label: 'Violeta' },
          { value: 'jasmim', label: 'Jasmim' },
          { value: 'flor_laranjeira', label: 'Flor de laranjeira' },
          { value: 'acacia', label: 'Acácia' },
          { value: 'lavanda', label: 'Lavanda' },
        ],
      },
    ],
  },
  {
    family: 'herbaceos',
    familyLabel: 'Herbáceos',
    subcategories: [
      {
        name: 'ervas_frescas',
        label: 'Ervas Frescas',
        aromas: [
          { value: 'hortela', label: 'Hortelã' },
          { value: 'manjericao', label: 'Manjericão' },
          { value: 'tomilho', label: 'Tomilho' },
          { value: 'alecrim', label: 'Alecrim' },
          { value: 'eucalipto', label: 'Eucalipto' },
        ],
      },
      {
        name: 'vegetal',
        label: 'Vegetal',
        aromas: [
          { value: 'pimentao_verde', label: 'Pimentão verde' },
          { value: 'grama_cortada', label: 'Grama cortada' },
          { value: 'folha_tomate', label: 'Folha de tomate' },
        ],
      },
    ],
  },
  {
    family: 'especiarias',
    familyLabel: 'Especiarias',
    subcategories: [
      {
        name: 'doces',
        label: 'Doces',
        aromas: [
          { value: 'baunilha', label: 'Baunilha' },
          { value: 'canela', label: 'Canela' },
          { value: 'noz_moscada', label: 'Noz-moscada' },
          { value: 'cravo', label: 'Cravo' },
          { value: 'anis', label: 'Anis' },
        ],
      },
      {
        name: 'picantes',
        label: 'Picantes',
        aromas: [
          { value: 'pimenta_preta', label: 'Pimenta preta' },
          { value: 'pimenta_branca', label: 'Pimenta branca' },
          { value: 'gengibre', label: 'Gengibre' },
          { value: 'alcacuz', label: 'Alcaçuz' },
        ],
      },
    ],
  },
  {
    family: 'minerais',
    familyLabel: 'Minerais',
    subcategories: [
      {
        name: 'minerais',
        label: 'Minerais',
        aromas: [
          { value: 'pedra_molhada', label: 'Pedra molhada' },
          { value: 'silex', label: 'Sílex' },
          { value: 'giz', label: 'Giz' },
          { value: 'sal', label: 'Sal' },
          { value: 'petroleo', label: 'Petróleo' },
        ],
      },
    ],
  },
  {
    family: 'sub_bosque',
    familyLabel: 'Sub-bosque',
    subcategories: [
      {
        name: 'terrosos',
        label: 'Terrosos',
        aromas: [
          { value: 'cogumelo', label: 'Cogumelo' },
          { value: 'trufa', label: 'Trufa' },
          { value: 'terra_molhada', label: 'Terra molhada' },
          { value: 'folhas_secas', label: 'Folhas secas' },
          { value: 'musgo', label: 'Musgo' },
        ],
      },
    ],
  },
  {
    family: 'animais',
    familyLabel: 'Animais',
    subcategories: [
      {
        name: 'animais',
        label: 'Animais',
        aromas: [
          { value: 'couro', label: 'Couro' },
          { value: 'carne', label: 'Carne' },
          { value: 'caça', label: 'Caça' },
          { value: 'almiscar', label: 'Almíscar' },
        ],
      },
    ],
  },
  {
    family: 'madeira',
    familyLabel: 'Madeira',
    subcategories: [
      {
        name: 'madeira_carvalho',
        label: 'Carvalho',
        aromas: [
          { value: 'carvalho', label: 'Carvalho' },
          { value: 'cedro', label: 'Cedro' },
          { value: 'santal', label: 'Sândalo' },
          { value: 'tosta', label: 'Tosta' },
          { value: 'defumado', label: 'Defumado' },
        ],
      },
    ],
  },
  {
    family: 'lacteos',
    familyLabel: 'Lácteos',
    subcategories: [
      {
        name: 'lacteos',
        label: 'Lácteos',
        aromas: [
          { value: 'manteiga', label: 'Manteiga' },
          { value: 'creme', label: 'Creme' },
          { value: 'iogurte', label: 'Iogurte' },
          { value: 'queijo', label: 'Queijo' },
        ],
      },
    ],
  },
  {
    family: 'balsamicos',
    familyLabel: 'Balsâmicos',
    subcategories: [
      {
        name: 'balsamicos',
        label: 'Balsâmicos',
        aromas: [
          { value: 'resina', label: 'Resina' },
          { value: 'incenso', label: 'Incenso' },
          { value: 'mentol', label: 'Mentol' },
          { value: 'cera_abelha', label: 'Cera de abelha' },
        ],
      },
    ],
  },
];
