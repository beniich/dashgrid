import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-background p-6 md:p-12">
            <Helmet>
                <title>Conditions Générales d'Utilisation - GymFlow Pro</title>
            </Helmet>

            <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-lg p-8 md:p-12">
                <Link to="/">
                    <Button variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à l'accueil
                    </Button>
                </Link>

                <h1 className="text-4xl font-bold mb-8 gradient-text">Conditions Générales d'Utilisation</h1>

                <div className="space-y-6 text-foreground/80 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">1. Acceptation</h2>
                        <p>En utilisant GymFlow Pro, vous acceptez ces conditions sans réserve.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">2. Services</h2>
                        <p>GymFlow Pro fournit un logiciel de gestion pour salles de sport (SaaS). Nous garantissons une disponibilité de 99.9%.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">3. Paiement</h2>
                        <p>Les abonnements sont facturés mensuellement ou annuellement. Tout mois commencé est dû.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
