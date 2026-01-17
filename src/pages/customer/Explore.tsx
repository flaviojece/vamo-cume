import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Explore() {
  return (
    <div className="min-h-screen bg-background p-4">
      <Link to="/"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-2" />Voltar</Button></Link>
      <h1 className="text-2xl font-bold mt-4">Explorar Restaurantes</h1>
      <p className="text-muted-foreground">Em desenvolvimento...</p>
    </div>
  );
}
