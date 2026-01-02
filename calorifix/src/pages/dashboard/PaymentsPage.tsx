import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Download,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";

const transactions = [
  {
    id: "TXN-001",
    member: "Marie Martin",
    amount: "49.00",
    status: "completed",
    date: "10 Dec 2024",
    plan: "Premium mensuel",
  },
  {
    id: "TXN-002",
    member: "Pierre Durand",
    amount: "29.00",
    status: "completed",
    date: "10 Dec 2024",
    plan: "Basic mensuel",
  },
  {
    id: "TXN-003",
    member: "Sophie Bernard",
    amount: "147.00",
    status: "pending",
    date: "09 Dec 2024",
    plan: "Premium trimestriel",
  },
  {
    id: "TXN-004",
    member: "Lucas Petit",
    amount: "29.00",
    status: "failed",
    date: "08 Dec 2024",
    plan: "Basic mensuel",
  },
  {
    id: "TXN-005",
    member: "Emma Leroy",
    amount: "49.00",
    status: "completed",
    date: "08 Dec 2024",
    plan: "Premium mensuel",
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle,
    label: "Complété",
    color: "text-success",
    bg: "bg-success/10",
  },
  pending: {
    icon: Clock,
    label: "En attente",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  failed: {
    icon: XCircle,
    label: "Échoué",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
};

import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useApp } from "@/contexts/AppContext";
import { FileText } from "lucide-react";

export default function PaymentsPage() {
  const { transactions, addTransaction, generateInvoice } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({ member: "", amount: "", plan: "Premium mensuel" });

  const handleCreatePayment = () => {
    addTransaction({
      member: newPayment.member,
      amount: newPayment.amount,
      plan: newPayment.plan
    });
    setIsDialogOpen(false);
    setNewPayment({ member: "", amount: "", plan: "Premium mensuel" });
  };

  return (
    <>
      <Helmet>
        <title>Paiements - GymFlow Pro</title>
      </Helmet>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">
              Paiements
            </h1>
            <p className="text-muted-foreground">
              Suivez les transactions et gérez les abonnements
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="hero">
                  <CreditCard className="mr-2" size={18} />
                  Effectuer un paiement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nouveau Paiement</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Membre</Label>
                    <Input value={newPayment.member} onChange={(e) => setNewPayment({ ...newPayment, member: e.target.value })} placeholder="Nom du membre" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Montant (€)</Label>
                    <Input type="number" value={newPayment.amount} onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Type</Label>
                    <Select onValueChange={(v) => setNewPayment({ ...newPayment, plan: v })} defaultValue="Premium mensuel">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Premium mensuel">Abonnement Premium</SelectItem>
                        <SelectItem value="Basic mensuel">Abonnement Basic</SelectItem>
                        <SelectItem value="Produit">Produit Boutique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCreatePayment}>Valider le paiement</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline">
              <Download size={18} />
              Exporter CSV
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Card variant="default">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenus du mois</p>
                  <p className="text-2xl font-bold font-display">€12,847</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-success">
                  +12.5%
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="default">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Paiements en attente</p>
                  <p className="text-2xl font-bold font-display">€2,340</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-warning">
                  8 transactions
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="default">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Échecs de paiement</p>
                  <p className="text-2xl font-bold font-display">€580</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-destructive">
                  3 transactions
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card variant="default">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input placeholder="Rechercher une transaction..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter size={18} />
                Filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Transactions récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">ID</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Membre</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Plan</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Montant</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Statut</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => {
                    const status = statusConfig[tx.status as keyof typeof statusConfig];
                    return (
                      <tr key={tx.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="p-3">
                          <span className="font-mono text-sm">{tx.id}</span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                              {tx.member.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <span className="font-medium">{tx.member}</span>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{tx.plan}</td>
                        <td className="p-3 font-semibold">€{tx.amount}</td>
                        <td className="p-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                            <status.icon size={12} />
                            {status.label}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{tx.date}</td>
                        <td className="p-3">
                          <Button variant="ghost" size="icon" onClick={() => generateInvoice(tx.id)} title="Générer Facture">
                            <FileText size={16} />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
