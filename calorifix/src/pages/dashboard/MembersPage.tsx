import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useApp } from "@/contexts/AppContext";

export default function MembersPage() {
  const { members, addMember } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "", plan: "Basic" });

  const handleAddMember = () => {
    addMember({ ...newMember, phone: "+33 6 XX XX XX XX" });
    setIsDialogOpen(false);
    setNewMember({ name: "", email: "", plan: "Basic" });
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Membres - GymFlow Pro</title>
      </Helmet>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">
              Membres
            </h1>
            <p className="text-muted-foreground">
              Gérez les membres de votre salle de sport
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus size={18} />
                Ajouter un membre
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nouveau Membre</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Nom complet</Label>
                  <Input value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} placeholder="Jean Dupont" />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input value={newMember.email} onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} type="email" placeholder="jean@email.com" />
                </div>
                <div className="grid gap-2">
                  <Label>Plan</Label>
                  <Select onValueChange={(v) => setNewMember({ ...newMember, plan: v })} defaultValue="Basic">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="VIP">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddMember}>Ajouter</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card variant="default">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Rechercher un membre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter size={18} />
                Filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Members Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <Card key={member.id} variant="interactive">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${member.plan === "Premium"
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                          }`}
                      >
                        {member.plan}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal size={18} />
                  </Button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail size={14} />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={14} />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar size={14} />
                    <span>Inscrit le {member.joinDate}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span
                    className={`flex items-center gap-1.5 text-sm ${member.status === "active"
                      ? "text-success"
                      : "text-destructive"
                      }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${member.status === "active"
                        ? "bg-success"
                        : "bg-destructive"
                        }`}
                    />
                    {member.status === "active" ? "Actif" : "Expiré"}
                  </span>
                  <Button variant="ghost" size="sm">
                    Voir le profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
