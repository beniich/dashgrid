import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CreditCard, Bell, Shield, User } from "lucide-react";

import { useApp } from "@/contexts/AppContext";
import { useState } from "react";

export default function SettingsPage() {
    const { settings, updateSettings } = useApp();
    const [gymName, setGymName] = useState(settings.gymName);

    const handleSave = () => {
        updateSettings({ gymName });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary">Paramètres</h1>

            <div className="grid gap-6">
                {/* Personnalisation */}
                <Card>
                    <CardHeader>
                        <CardTitle>Personnalisation</CardTitle>
                        <CardDescription>Configurez l'apparence de votre espace</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Nom de la salle</Label>
                            <Input value={gymName} onChange={(e) => setGymName(e.target.value)} />
                        </div>
                        <Button onClick={handleSave}>Enregistrer</Button>
                    </CardContent>
                </Card>

                {/* Profil */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><User size={20} /> Profil Admin</CardTitle>
                        <CardDescription>Gérez vos informations personnelles</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Nom complet</Label>
                                <Input defaultValue="Jean Dupont" />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input defaultValue="jean@gymflow.pro" />
                            </div>
                        </div>
                        <Button>Sauvegarder Profil</Button>
                    </CardContent>
                </Card>

                {/* Intégrations Paiements */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><CreditCard size={20} /> Paiements & Intégrations</CardTitle>
                        <CardDescription>Connectez vos comptes Stripe et PayPal</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#635BFF]/10 p-2 rounded">
                                    <span className="font-bold text-[#635BFF]">Stripe</span>
                                </div>
                                <div>
                                    <p className="font-medium">Stripe Payments</p>
                                    <p className="text-sm text-muted-foreground">Connecté (Live)</p>
                                </div>
                            </div>
                            <Button variant="outline">Configurer</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bell size={20} /> Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Alerte nouveaux membres</Label>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>Rapport hebdomadaire IA</Label>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
