import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star, Plus } from "lucide-react";

const products = [
    {
        id: 1,
        name: "GymFlow Pro Cap",
        description: "Casquette minimaliste pour vos entraînements.",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=60",
        rating: 4.8,
        category: "Accessoires"
    },
    {
        id: 2,
        name: "Performance Tee",
        description: "T-shirt respirant haute performance.",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60",
        rating: 4.9,
        category: "Vêtements"
    },
    {
        id: 3,
        name: "GymFlow Hoodie",
        description: "Confort ultime avant et après le sport.",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1556906781-9a412961d289?w=800&auto=format&fit=crop&q=60",
        rating: 4.7,
        category: "Vêtements"
    },
    {
        id: 4,
        name: "Protein Shaker",
        description: "Shaker étanche 700ml avec compartiment.",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1570737330588-444cb0998929?w=800&auto=format&fit=crop&q=60",
        rating: 4.5,
        category: "Accessoires"
    },
    {
        id: 5,
        name: "Bandes de Résistance",
        description: "Set de 5 bandes élastiques pour l'échauffement.",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&auto=format&fit=crop&q=60",
        rating: 4.6,
        category: "Équipement"
    },
    {
        id: 6,
        name: "Sac de Sport",
        description: "Tout votre équipement dans un seul sac.",
        price: 45.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60",
        rating: 4.9,
        category: "Accessoires"
    }
];

export default function ShopPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Boutique</h1>
                    <p className="text-muted-foreground mt-1">
                        Équipements et vêtements officiels GymFlow Pro.
                    </p>
                </div>
                <Button className="gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Panier (0)
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all group border-border/50">
                        <div className="aspect-square relative overflow-hidden bg-muted">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 right-3">
                                <Badge variant="secondary" className="backdrop-blur-md bg-background/80">
                                    {product.category}
                                </Badge>
                            </div>
                        </div>
                        <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{product.name}</CardTitle>
                                    <CardDescription className="line-clamp-1 mt-1">{product.description}</CardDescription>
                                </div>
                                <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
                                    <Star className="h-3 w-3 text-primary fill-primary" />
                                    <span className="text-xs font-bold text-primary">{product.rating}</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 mt-2 flex items-center justify-between">
                            <span className="text-xl font-bold">{product.price} €</span>
                            <Button size="sm" className="gap-2">
                                <Plus className="h-4 w-4" />
                                Ajouter
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
