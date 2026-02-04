import { Card, CardContent } from '@/components/ui/card';
import { Euro, Calendar, CalendarDays, Home, TrendingUp } from 'lucide-react';
import type { GrundsteuerResults } from '@/types/grundsteuer';

interface Props {
  results: GrundsteuerResults;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
};

export function GrundsteuerResultsCards({ results }: Props) {
  return (
    <div className="space-y-4">
      {/* Primary Result */}
      <Card className="gradient-hero border-0 text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/80 text-sm font-medium mb-1">
                Grundsteuer pro Jahr
              </p>
              <p className="text-4xl font-bold font-mono">
                {formatCurrency(results.grundsteuer_jahr)}
              </p>
            </div>
            <div className="h-14 w-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Euro className="h-7 w-7" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Results Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="result-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <CalendarDays className="h-4 w-4" />
              <span className="text-xs font-medium">Pro Quartal</span>
            </div>
            <p className="text-xl font-bold font-mono text-foreground">
              {formatCurrency(results.grundsteuer_quartal)}
            </p>
          </CardContent>
        </Card>

        <Card className="result-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-xs font-medium">Pro Monat</span>
            </div>
            <p className="text-xl font-bold font-mono text-foreground">
              {formatCurrency(results.grundsteuer_monat)}
            </p>
          </CardContent>
        </Card>

        <Card className="result-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Home className="h-4 w-4" />
              <span className="text-xs font-medium">Grundsteuerwert</span>
            </div>
            <p className="text-xl font-bold font-mono text-foreground">
              {formatCurrency(results.grundsteuerwert)}
            </p>
          </CardContent>
        </Card>

        <Card className="result-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">Hebesatz</span>
            </div>
            <p className="text-xl font-bold font-mono text-foreground">
              {results.hebesatz}%
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function GrundsteuerBreakdown({ results }: Props) {
  const steps = [
    { label: 'Bodenwert', value: formatCurrency(results.bodenwert), prefix: '' },
    { label: 'Gebäudewert', value: formatCurrency(results.gebaeudewert), prefix: '+' },
    { label: 'Grundsteuerwert', value: formatCurrency(results.grundsteuerwert), prefix: '=' },
    { label: 'Steuermesszahl', value: `${results.messzahl}‰`, prefix: '×' },
    { label: 'Steuermessbetrag', value: formatCurrency(results.steuermessbetrag), prefix: '=' },
    { label: 'Hebesatz', value: `${results.hebesatz}%`, prefix: '×' },
    { label: 'Grundsteuer', value: formatCurrency(results.grundsteuer_jahr), prefix: '=', highlight: true },
  ];

  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Berechnungsschritte
        </h3>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center justify-between py-2 ${
                step.highlight
                  ? 'border-t-2 border-primary pt-3 mt-3'
                  : index > 0
                  ? 'border-t border-border'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-center text-muted-foreground font-mono text-sm">
                  {step.prefix}
                </span>
                <span className={`text-sm ${step.highlight ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                  {step.label}
                </span>
              </div>
              <span className={`font-mono ${step.highlight ? 'text-lg font-bold text-primary' : 'font-medium text-foreground'}`}>
                {step.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function GrundsteuerDetails({ results }: Props) {
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Weitere Details
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rohmiete pro m²:</span>
            <span className="font-mono">{formatCurrency(results.rohmiete_qm)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Jahresrohmiete:</span>
            <span className="font-mono">{formatCurrency(results.jahresrohmiete)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Alterswertminderung:</span>
            <span className="font-mono">{results.alterswertminderung_prozent}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Berechnungsmodell:</span>
            <span className="font-medium capitalize">{results.modell}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
