import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
    const [step, setStep] = useState<"processing" | "success" | "select">("select");

    const handlePayment = (method: "stripe" | "paypal") => {
        setStep("processing");
        // Simulation processing
        setTimeout(() => {
            setStep("success");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <Helmet>
                <title>Paiement Sécurisé - GymFlow Pro</title>
            </Helmet>

            <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-xl border border-border">
                {step === "select" && (
                    <>
                        <h1 className="text-2xl font-bold mb-6 text-center">Choisissez votre mode de paiement</h1>
                        <div className="space-y-4">
                            <Button
                                variant="hero"
                                className="w-full h-12 text-lg bg-[#635BFF] hover:bg-[#635BFF]/90"
                                onClick={() => handlePayment("stripe")}
                            >
                                <CreditCard className="mr-2" /> Payer avec Carte (Stripe)
                            </Button>
                            <Button
                                variant="default"
                                className="w-full h-12 text-lg bg-[#0070BA] hover:bg-[#0070BA]/90 text-white"
                                onClick={() => handlePayment("paypal")}
                            >
                                <span className="font-bold italic mr-1">Pay</span><span className="font-bold italic text-white">Pal</span>
                            </Button>
                        </div>
                        <p className="mt-6 text-sm text-center text-muted-foreground">Paiement 100% sécurisé et crypté SSL.</p>
                    </>
                )}

                {step === "processing" && (
                    <div className="text-center py-12">
                        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                        <h2 className="text-xl font-semibold">Traitement du paiement...</h2>
                        <p className="text-muted-foreground">Veuillez patienter, redirection sécurisée.</p>
                    </div>
                )}

                {step === "success" && (
                    <div className="text-center py-8">
                        <div className="h-16 w-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="h-8 w-8 text-success" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Paiement Réussi !</h2>
                        <p className="text-muted-foreground mb-8">Bienvenue chez GymFlow Pro. Votre abonnement est actif.</p>

                        <Link to="/dashboard">
                            <Button className="w-full" size="lg">Accéder au Dashboard</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
