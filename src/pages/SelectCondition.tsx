import { useNavigate } from "react-router-dom";
import { Puzzle, Zap } from "lucide-react";
import { useAppContext, ConditionType } from "@/contexts/AppContext";
import TopBar from "@/components/TopBar";

const conditions: { id: ConditionType; label: string; description: string; icon: React.ReactNode; colorClass: string }[] = [
  {
    id: "tea",
    label: "TEA",
    description: "Transtorno do Espectro Autista — Ambiente estruturado, previsível e com baixa estimulação visual.",
    icon: <Puzzle className="h-8 w-8" />,
    colorClass: "border-tea bg-tea-surface hover:border-tea/80",
  },
  {
    id: "tdah",
    label: "TDAH",
    description: "Transtorno de Déficit de Atenção e Hiperatividade — Ambiente dinâmico com gamificação e progresso visual.",
    icon: <Zap className="h-8 w-8" />,
    colorClass: "border-tdah bg-tdah-surface hover:border-tdah/80",
  },
];

const SelectCondition = () => {
  const navigate = useNavigate();
  const { setCondition } = useAppContext();

  const handleSelect = (id: ConditionType) => {
    setCondition(id);
    navigate("/select-level");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-2">
            <h1 className="font-heading text-xl font-semibold">Selecione o perfil do aluno</h1>
            <p className="text-muted-foreground text-sm">
              Escolha o tipo de necessidade para adaptar o ambiente de estudo.
            </p>
          </div>

          <div className="grid gap-4">
            {conditions.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelect(c.id)}
                className={`flex items-start gap-4 p-6 rounded-xl border-2 text-left transition-all ${c.colorClass}`}
              >
                <div className="mt-0.5 shrink-0">{c.icon}</div>
                <div>
                  <h2 className="font-heading font-semibold text-lg">{c.label}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectCondition;
