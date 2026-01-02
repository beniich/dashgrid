import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Types
interface Member {
    id: number;
    name: string;
    email: string;
    phone: string;
    plan: string;
    status: "active" | "expired";
    joinDate: string;
    avatar: string | null;
}

interface ClassItem {
    day: number;
    start: number;
    duration: number;
    name: string;
    color: string;
}

interface Transaction {
    id: string;
    member: string;
    amount: string;
    status: "completed" | "pending" | "failed";
    date: string;
    plan: string;
}

interface AppSettings {
    gymName: string;
    themeColor: string;
}

interface AppContextType {
    members: Member[];
    addMember: (member: Omit<Member, "id" | "joinDate" | "status" | "avatar">) => void;
    classes: ClassItem[];
    addClass: (cls: ClassItem) => void;
    transactions: Transaction[];
    addTransaction: (tx: Omit<Transaction, "id" | "date" | "status">) => void;
    settings: AppSettings;
    updateSettings: (settings: Partial<AppSettings>) => void;
    generateInvoice: (txId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initial Data (si localStorage vide)
    const initialMembers: Member[] = [
        { id: 1, name: "Marie Martin", email: "marie@example.com", phone: "+33 6 12 34 56 78", plan: "Premium", status: "active", joinDate: "15 Jan 2024", avatar: null },
        { id: 2, name: "Pierre Durand", email: "pierre@example.com", phone: "+33 6 98 76 54 32", plan: "Basic", status: "active", joinDate: "22 Feb 2024", avatar: null },
    ];

    const initialClasses: ClassItem[] = [
        { day: 0, start: 7, duration: 1, name: "Yoga Flow", color: "bg-primary/80" },
        { day: 0, start: 18, duration: 1, name: "CrossFit", color: "bg-accent/80" },
    ];

    const initialTransactions: Transaction[] = [
        { id: "TXN-001", member: "Marie Martin", amount: "49.00", status: "completed", date: "10 Dec 2024", plan: "Premium mensuel" },
    ];

    // State avec Lazy Initialization pour localStorage
    const [members, setMembers] = useState<Member[]>(() => {
        const saved = localStorage.getItem("gymflow_members");
        return saved ? JSON.parse(saved) : initialMembers;
    });

    const [classes, setClasses] = useState<ClassItem[]>(() => {
        const saved = localStorage.getItem("gymflow_classes");
        return saved ? JSON.parse(saved) : initialClasses;
    });

    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const saved = localStorage.getItem("gymflow_transactions");
        return saved ? JSON.parse(saved) : initialTransactions;
    });

    const [settings, setSettings] = useState<AppSettings>(() => {
        const saved = localStorage.getItem("gymflow_settings");
        return saved ? JSON.parse(saved) : { gymName: "GymFlow Pro", themeColor: "#540863" };
    });

    // Persistance Effects
    useEffect(() => localStorage.setItem("gymflow_members", JSON.stringify(members)), [members]);
    useEffect(() => localStorage.setItem("gymflow_classes", JSON.stringify(classes)), [classes]);
    useEffect(() => localStorage.setItem("gymflow_transactions", JSON.stringify(transactions)), [transactions]);
    useEffect(() => localStorage.setItem("gymflow_settings", JSON.stringify(settings)), [settings]);

    // Actions
    const addMember = (data: Omit<Member, "id" | "joinDate" | "status" | "avatar">) => {
        const newMember: Member = {
            ...data,
            id: Date.now(),
            status: "active",
            joinDate: new Date().toLocaleDateString(),
            avatar: null,
            phone: "+33 6 XX XX XX XX" // Default phone
        };
        setMembers([...members, newMember]);
        toast.success("Membre ajouté avec succès !");
    };

    const addClass = (cls: ClassItem) => {
        setClasses([...classes, cls]);
        toast.success("Cours ajouté au planning !");
    };

    const addTransaction = (data: Omit<Transaction, "id" | "date" | "status">) => {
        const newTx: Transaction = {
            ...data,
            id: `TXN-${Math.floor(Math.random() * 10000)}`,
            date: new Date().toLocaleDateString(),
            status: "completed"
        };
        setTransactions([newTx, ...transactions]);
        toast.success("Paiement enregistré !");
    };

    const updateSettings = (newSettings: Partial<AppSettings>) => {
        setSettings({ ...settings, ...newSettings });
        toast.success("Paramètres mis à jour !");
    };

    const generateInvoice = (txId: string) => {
        const tx = transactions.find(t => t.id === txId);
        if (!tx) return;

        // Simulation Génération PDF & Envoi Email
        toast.loading("Génération de la facture...");
        setTimeout(() => {
            toast.dismiss();
            toast.success(`Facture #${tx.id} envoyée à ${tx.member} (via Gmail)`);
            // Ici on pourrait ouvrir un vrai PDF généré dynamiquement
            const invoiceContent = `FACTURE #${tx.id}\nMontant: ${tx.amount}€\nMembre: ${tx.member}\nPlan: ${tx.plan}`;
            const blob = new Blob([invoiceContent], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `facture_${tx.id}.txt`;
            // a.click(); // Auto-download si voulu
            window.open(url, "_blank"); // Ouvre un onglet "Facture"
        }, 1500);
    };

    return (
        <AppContext.Provider value={{ members, addMember, classes, addClass, transactions, addTransaction, settings, updateSettings, generateInvoice }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};
