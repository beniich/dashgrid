import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background p-6 md:p-12">
            <Helmet>
                <title>Politique de Confidentialité - GymFlow Pro</title>
            </Helmet>

            <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-lg p-8 md:p-12">
                <Link to="/">
                    <Button variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à l'accueil
                    </Button>
                </Link>

                <h1 className="text-4xl font-bold mb-8 gradient-text">Politique de Confidentialité</h1>

                <div className="space-y-6 text-foreground/80 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">1. Collecte des données</h2>
                        <p>Nous collectons les informations nécessaires au fonctionnement de votre salle de sport : noms, emails, données de paiement et historique de fréquentation.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">2. Utilisation des données</h2>
                        <p>Vos données servent uniquement à la gestion de votre abonnement, à l'accès aux salles et à l'amélioration de nos services via notre assistant IA.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">3. Sécurité</h2>
                        <p>Toutes les données sont cryptées et stockées sur des serveurs sécurisés. Les paiements sont traités par Stripe/PayPal et nous ne conservons aucune donnée bancaire complète.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
