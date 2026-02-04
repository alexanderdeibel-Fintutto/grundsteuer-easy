import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function GrundsteuerCrossSell() {
  return (
    <Card className="bg-secondary/5 border-secondary/20">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="h-5 w-5 text-secondary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-1">
              Rendite-Rechner
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Berechnen Sie die Rendite Ihrer Immobilien-Investition und optimieren Sie Ihre Kaufentscheidung.
            </p>
            <Button asChild variant="outline" size="sm" className="group">
              <Link to="/rendite-rechner">
                Zum Rendite-Rechner
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
