import { useMemo } from 'react';
import type { GrundsteuerInputs, GrundsteuerResults } from '@/types/grundsteuer';
import { GRUNDSTUECKSARTEN, MIETNIVEAUSTUFEN } from '@/types/grundsteuer';

const round = (value: number, decimals: number): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const getDefaultGrundsteuerInputs = (): GrundsteuerInputs => ({
  bundesland: 'bundesmodell',
  grundstuecksflaeche: 500,
  bodenrichtwert: 150,
  art: 'einfamilienhaus',
  wohnflaeche: 120,
  baujahr: 1990,
  mietniveau_stufe: 4,
  gemeinde: '',
  hebesatz: 400,
});

export function useGrundsteuer(inputs: GrundsteuerInputs): GrundsteuerResults {
  return useMemo(() => {
    const {
      bundesland,
      grundstuecksflaeche,
      bodenrichtwert,
      art,
      wohnflaeche = 0,
      baujahr = 2000,
      mietniveau_stufe = 4,
      hebesatz = 400,
    } = inputs;

    // Bodenwert berechnen
    const bodenwert = grundstuecksflaeche * bodenrichtwert;

    // Rohmiete pro m² aus Mietniveaustufe
    const rohmiete_qm = MIETNIVEAUSTUFEN[mietniveau_stufe] || 5.52;

    // Jahresrohmiete
    const jahresrohmiete = wohnflaeche * rohmiete_qm * 12;

    // Alter des Gebäudes
    const alter = new Date().getFullYear() - baujahr;

    // Alterswertminderung (max. 30%)
    const alterswertminderung = Math.min(alter * 0.5, 30) / 100;

    // Vervielfältiger (vereinfacht)
    const vervielfaeltiger = 12.5;

    // Gebäudewert
    const gebaeudewert = art === 'unbebautes_grundstuck' 
      ? 0 
      : jahresrohmiete * vervielfaeltiger * (1 - alterswertminderung);

    // Grundsteuerwert (auf volle 100€ abgerundet)
    const grundsteuerwert_roh = bodenwert + gebaeudewert;
    const grundsteuerwert = Math.floor(grundsteuerwert_roh / 100) * 100;

    // Steuermesszahl ermitteln
    const messzahl = GRUNDSTUECKSARTEN.find(a => a.value === art)?.messzahl || 0.31;

    // Steuermessbetrag
    const steuermessbetrag = grundsteuerwert * (messzahl / 1000);

    // Grundsteuer
    const grundsteuer_jahr = steuermessbetrag * (hebesatz / 100);
    const grundsteuer_quartal = grundsteuer_jahr / 4;
    const grundsteuer_monat = grundsteuer_jahr / 12;

    return {
      bundesland,
      modell: 'bundesmodell',
      bodenwert: round(bodenwert, 2),
      gebaeudewert: round(gebaeudewert, 2),
      grundsteuerwert,
      messzahl,
      steuermessbetrag: round(steuermessbetrag, 2),
      hebesatz,
      grundsteuer_jahr: round(grundsteuer_jahr, 2),
      grundsteuer_quartal: round(grundsteuer_quartal, 2),
      grundsteuer_monat: round(grundsteuer_monat, 2),
      rohmiete_qm,
      jahresrohmiete: round(jahresrohmiete, 2),
      alterswertminderung_prozent: round(alterswertminderung * 100, 1),
    };
  }, [inputs]);
}
