import { useState } from 'react';
import { Header } from '@/components/Header';
import { AuthModal } from '@/components/AuthModal';
import { GrundsteuerInputsSection } from '@/components/grundsteuer/GrundsteuerInputs';
import {
  GrundsteuerResultsCards,
  GrundsteuerBreakdown,
  GrundsteuerDetails,
} from '@/components/grundsteuer/GrundsteuerResults';
import { GrundsteuerCrossSell } from '@/components/grundsteuer/GrundsteuerCrossSell';
import { Button } from '@/components/ui/button';
import { RotateCcw, FileText, Euro } from 'lucide-react';
import { useGrundsteuer, getDefaultGrundsteuerInputs } from '@/hooks/useGrundsteuer';
import type { GrundsteuerInputs } from '@/types/grundsteuer';

const Grundsteuer = () => {
  const [inputs, setInputs] = useState<GrundsteuerInputs>(getDefaultGrundsteuerInputs());
  const [showAuthModal, setShowAuthModal] = useState(false);
  const results = useGrundsteuer(inputs);

  const handleReset = () => {
    setInputs(getDefaultGrundsteuerInputs());
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onLoginClick={() => setShowAuthModal(true)} />

      {/* Hero Section */}
      <div className="gradient-hero text-primary-foreground py-8 px-4">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Grundsteuer-Rechner</h1>
          </div>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Berechnen Sie Ihre neue Grundsteuer nach der Reform 2025 – basierend auf dem Bundesmodell
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-6">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
          {/* Left Column - Inputs */}
          <div className="space-y-4">
            <GrundsteuerInputsSection inputs={inputs} onChange={setInputs} />

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset} className="flex-1">
                <RotateCcw className="h-4 w-4 mr-2" />
                Zurücksetzen
              </Button>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Euro className="h-5 w-5 text-primary" />
                Ergebnisse
              </h2>
              <GrundsteuerResultsCards results={results} />
            </div>

            <GrundsteuerBreakdown results={results} />

            <GrundsteuerDetails results={results} />

            {/* Cross-Sell */}
            <GrundsteuerCrossSell />
          </div>
        </div>
      </main>

      {/* Mobile Sticky Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Grundsteuer pro Jahr</div>
            <div className="font-mono text-xl font-bold text-primary">
              {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(results.grundsteuer_jahr)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Pro Monat</div>
            <div className="font-mono font-semibold">
              {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(results.grundsteuer_monat)}
            </div>
          </div>
        </div>
      </div>

      {/* Add padding for mobile sticky footer */}
      <div className="lg:hidden h-20" />

      {/* Modals */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Grundsteuer;
