import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { MapPin, Building2, Percent, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { GrundsteuerInputs } from '@/types/grundsteuer';
import { BUNDESLAENDER, GRUNDSTUECKSARTEN } from '@/types/grundsteuer';

interface Props {
  inputs: GrundsteuerInputs;
  onChange: (inputs: GrundsteuerInputs) => void;
}

const InfoTooltip = ({ text }: { text: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
    </TooltipTrigger>
    <TooltipContent className="max-w-xs">
      <p className="text-sm">{text}</p>
    </TooltipContent>
  </Tooltip>
);

export function GrundsteuerInputsSection({ inputs, onChange }: Props) {
  const handleChange = (field: keyof GrundsteuerInputs, value: string | number) => {
    onChange({ ...inputs, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Gruppe 1: Grundstück */}
      <div className="input-group">
        <div className="flex items-center gap-2 input-group-title">
          <MapPin className="h-4 w-4" />
          Grundstück
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="bundesland">Bundesland</Label>
              <InfoTooltip text="Bestimmt das anzuwendende Berechnungsmodell" />
            </div>
            <Select
              value={inputs.bundesland}
              onValueChange={(value) => handleChange('bundesland', value)}
            >
              <SelectTrigger id="bundesland">
                <SelectValue placeholder="Bundesland wählen" />
              </SelectTrigger>
              <SelectContent>
                {BUNDESLAENDER.map((land, idx) => (
                  <SelectItem key={idx} value={`${land.value}-${idx}`}>
                    {land.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="grundstuecksflaeche">Grundstücksfläche</Label>
                <InfoTooltip text="Laut Grundbuch oder Kaufvertrag" />
              </div>
              <div className="relative">
                <Input
                  id="grundstuecksflaeche"
                  type="number"
                  value={inputs.grundstuecksflaeche}
                  onChange={(e) => handleChange('grundstuecksflaeche', Number(e.target.value))}
                  className="pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  m²
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="bodenrichtwert">Bodenrichtwert</Label>
                <InfoTooltip text="Abrufbar im BORIS-Portal Ihres Bundeslandes" />
              </div>
              <div className="relative">
                <Input
                  id="bodenrichtwert"
                  type="number"
                  value={inputs.bodenrichtwert}
                  onChange={(e) => handleChange('bodenrichtwert', Number(e.target.value))}
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  €/m²
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="art">Grundstücksart</Label>
              <InfoTooltip text="Bestimmt die Steuermesszahl" />
            </div>
            <Select
              value={inputs.art}
              onValueChange={(value) => handleChange('art', value)}
            >
              <SelectTrigger id="art">
                <SelectValue placeholder="Grundstücksart wählen" />
              </SelectTrigger>
              <SelectContent>
                {GRUNDSTUECKSARTEN.map((art) => (
                  <SelectItem key={art.value} value={art.value}>
                    {art.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Gruppe 2: Gebäude */}
      {inputs.art !== 'unbebautes_grundstuck' && (
        <div className="input-group">
          <div className="flex items-center gap-2 input-group-title">
            <Building2 className="h-4 w-4" />
            Gebäude (Bundesmodell)
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="wohnflaeche">Wohnfläche</Label>
                  <InfoTooltip text="Gesamte Wohnfläche des Gebäudes" />
                </div>
                <div className="relative">
                  <Input
                    id="wohnflaeche"
                    type="number"
                    value={inputs.wohnflaeche}
                    onChange={(e) => handleChange('wohnflaeche', Number(e.target.value))}
                    className="pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    m²
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="baujahr">Baujahr</Label>
                  <InfoTooltip text="Für die Berechnung der Alterswertminderung" />
                </div>
                <Input
                  id="baujahr"
                  type="number"
                  value={inputs.baujahr}
                  onChange={(e) => handleChange('baujahr', Number(e.target.value))}
                  min={1900}
                  max={new Date().getFullYear()}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label>Mietniveaustufe</Label>
                  <InfoTooltip text="Die Mietniveaustufe Ihrer Gemeinde (1-7)" />
                </div>
                <span className="text-sm font-medium text-primary">
                  Stufe {inputs.mietniveau_stufe}
                </span>
              </div>
              <Slider
                value={[inputs.mietniveau_stufe]}
                onValueChange={([value]) => handleChange('mietniveau_stufe', value)}
                min={1}
                max={7}
                step={1}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 (günstig)</span>
                <span>7 (teuer)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gruppe 3: Hebesatz */}
      <div className="input-group">
        <div className="flex items-center gap-2 input-group-title">
          <Percent className="h-4 w-4" />
          Hebesatz
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="gemeinde">Gemeinde</Label>
              <InfoTooltip text="Der Hebesatz variiert je nach Gemeinde" />
            </div>
            <Input
              id="gemeinde"
              type="text"
              value={inputs.gemeinde}
              onChange={(e) => handleChange('gemeinde', e.target.value)}
              placeholder="z.B. München, Berlin..."
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label>Hebesatz</Label>
                <InfoTooltip text="Der Hebesatz Ihrer Gemeinde (in %)" />
              </div>
              <span className="text-sm font-medium text-primary">
                {inputs.hebesatz}%
              </span>
            </div>
            <Slider
              value={[inputs.hebesatz]}
              onValueChange={([value]) => handleChange('hebesatz', value)}
              min={200}
              max={900}
              step={10}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>200%</span>
              <span>900%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
