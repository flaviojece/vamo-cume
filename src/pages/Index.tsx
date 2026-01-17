import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { 
  Search, 
  MapPin, 
  ShoppingBag, 
  User, 
  Heart, 
  Clock, 
  Star,
  ChefHat,
  Truck,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "Pizza", emoji: "🍕" },
  { name: "Hambúrguer", emoji: "🍔" },
  { name: "Japonesa", emoji: "🍣" },
  { name: "Brasileira", emoji: "🍛" },
  { name: "Italiana", emoji: "🍝" },
  { name: "Árabe", emoji: "🥙" },
  { name: "Açaí", emoji: "🫐" },
  { name: "Doces", emoji: "🍰" },
];

export default function Index() {
  const { user, hasRole } = useAuth();
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🍔</span>
            <span className="text-xl font-bold text-primary">Vamo Cumê</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar restaurantes ou pratos..."
                className="w-full h-10 pl-10 pr-4 rounded-full border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <nav className="flex items-center gap-2">
            {user ? (
              <>
                <Link to="/favorites">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/orders">
                  <Button variant="ghost" size="icon">
                    <Clock className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="icon">
                    <ShoppingBag className="h-5 w-5" />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                {hasRole("restaurant_owner") && (
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm">
                      <ChefHat className="h-4 w-4 mr-2" />
                      Painel
                    </Button>
                  </Link>
                )}
                {hasRole("deliveryman") && (
                  <Link to="/delivery">
                    <Button variant="outline" size="sm">
                      <Truck className="h-4 w-4 mr-2" />
                      Entregas
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <Link to="/auth">
                <Button>Entrar</Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Sua comida favorita,{" "}
                <span className="text-primary">entregue rápido</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Descubra os melhores restaurantes da sua região e receba seu pedido
                em minutos. Bora cumê!
              </p>
              <div className="flex gap-4">
                <Link to="/explore">
                  <Button size="lg" className="gap-2">
                    Explorar restaurantes
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                {!user && (
                  <Link to="/auth">
                    <Button size="lg" variant="outline">
                      Criar conta
                    </Button>
                  </Link>
                )}
              </div>

              {/* Location bar */}
              <div className="flex items-center gap-2 p-3 rounded-lg bg-card border shadow-sm max-w-sm">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Adicione seu endereço para ver restaurantes próximos
                </span>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="relative w-full h-80 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center">
                <span className="text-9xl">🍽️</span>
                <div className="absolute top-4 right-4 p-3 bg-card rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">4.8</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 p-3 bg-card rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">20-30 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">Categorias</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/explore?category=${category.name.toLowerCase()}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border hover:border-primary hover:shadow-md transition-all group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {category.emoji}
                </span>
                <span className="text-sm font-medium text-center">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for Restaurant Owners */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary to-orange-600 text-white">
              <ChefHat className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Tem um restaurante?</h3>
              <p className="text-white/80 mb-4">
                Cadastre-se e comece a receber pedidos hoje mesmo!
              </p>
              <Link to="/auth?type=restaurant_owner">
                <Button variant="secondary" size="lg">
                  Cadastrar restaurante
                </Button>
              </Link>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 text-white">
              <Truck className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Quer fazer entregas?</h3>
              <p className="text-white/80 mb-4">
                Seja um entregador parceiro e ganhe dinheiro no seu tempo livre!
              </p>
              <Link to="/auth?type=deliveryman">
                <Button variant="secondary" size="lg">
                  Quero ser entregador
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍔</span>
              <span className="text-lg font-bold text-primary">Vamo Cumê</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Vamo Cumê. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
