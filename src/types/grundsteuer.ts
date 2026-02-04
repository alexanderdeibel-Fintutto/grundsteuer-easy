export interface GrundsteuerInputs {
  bundesland: string;
  grundstuecksflaeche: number;
  bodenrichtwert: number;
  art: string;
  wohnflaeche: number;
  baujahr: number;
  mietniveau_stufe: number;
  gemeinde: string;
  hebesatz: number;
}

export interface GrundsteuerResults {
  bundesland: string;
  modell: string;
  bodenwert: number;
  gebaeudewert: number;
  grundsteuerwert: number;
  messzahl: number;
  steuermessbetrag: number;
  hebesatz: number;
  grundsteuer_jahr: number;
  grundsteuer_quartal: number;
  grundsteuer_monat: number;
  rohmiete_qm: number;
  jahresrohmiete: number;
  alterswertminderung_prozent: number;
}

export const BUNDESLAENDER = [
  { value: 'bundesmodell', label: 'Baden-Württemberg (Bundesmodell-Variante)' },
  { value: 'bundesmodell', label: 'Berlin' },
  { value: 'bundesmodell', label: 'Brandenburg' },
  { value: 'bundesmodell', label: 'Bremen' },
  { value: 'bundesmodell', label: 'Mecklenburg-Vorpommern' },
  { value: 'bundesmodell', label: 'Nordrhein-Westfalen' },
  { value: 'bundesmodell', label: 'Rheinland-Pfalz' },
  { value: 'bundesmodell', label: 'Saarland' },
  { value: 'bundesmodell', label: 'Sachsen' },
  { value: 'bundesmodell', label: 'Sachsen-Anhalt' },
  { value: 'bundesmodell', label: 'Schleswig-Holstein' },
  { value: 'bundesmodell', label: 'Thüringen' },
  { value: 'sondermodell', label: 'Bayern (Flächenmodell)' },
  { value: 'sondermodell', label: 'Hamburg (Wohnlagenmodell)' },
  { value: 'sondermodell', label: 'Hessen (Flächen-Faktor-Verfahren)' },
  { value: 'sondermodell', label: 'Niedersachsen (Flächen-Lage-Modell)' },
];

export const GRUNDSTUECKSARTEN = [
  { value: 'einfamilienhaus', label: 'Einfamilienhaus', messzahl: 0.31 },
  { value: 'zweifamilienhaus', label: 'Zweifamilienhaus', messzahl: 0.31 },
  { value: 'mietwohngrundstuck', label: 'Mietwohngrundstück', messzahl: 0.31 },
  { value: 'wohnungseigentum', label: 'Wohnungseigentum', messzahl: 0.31 },
  { value: 'teileigentum', label: 'Teileigentum', messzahl: 0.34 },
  { value: 'geschaeftsgrundstuck', label: 'Geschäftsgrundstück', messzahl: 0.34 },
  { value: 'unbebautes_grundstuck', label: 'Unbebautes Grundstück', messzahl: 0.34 },
];

export const MIETNIVEAUSTUFEN: Record<number, number> = {
  1: 3.50,
  2: 4.46,
  3: 5.00,
  4: 5.52,
  5: 6.05,
  6: 6.90,
  7: 8.00,
};
