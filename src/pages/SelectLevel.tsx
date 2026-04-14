import { useNavigate } from "react-router-dom";
import { useAppContext, SupportLevel } from "@/contexts/AppContext";
import TopBar from "@/components/TopBar";

const levels: { id: SupportLevel; label: string; description: string; intensity: string }[] = [
  { id: 1, label: "Nível 1", description: "Suporte leve — pequenas adaptações visuais e de organização.", intensity: "bg-primary/20" },
  { id: 2, label: "Nível 2", description: "Suporte moderado — simplificação de conteúdo e guias adicionais.", intensity: "bg-primary/40" },
  { id: 3, label: "Nível 3", description: "Suporte severo — máxima simplificação e leitura assistida.", intensity: "bg-primary/60" },
];

const SelectLevel = () => {
  const navigate = useNavigate();
  const { condition, setSupportLevel } = useAppContext();

  const handleSelect = (l: SupportLevel) => {
    setSupportLevel(l);
    navigate("/study");
  };

  if (!condition) {
    navigate("/select-condition");
    return null;
  }

  const conditionLabel = condition === "tea" ? "TEA" : "TDAH";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-2">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              condition === "tea" ? "bg-tea-surface text-tea" : "bg-tdah-surface text-tdah"
            }`}>
              {conditionLabel}
            </span>
            <h1 className="font-heading text-xl font-semibold">Nível de suporte</h1>
            <p className="text-muted-foreground text-sm">
              Defina a intensidade das adaptações no ambiente de estudo.
            </p>
          </div>

          <div className="grid gap-4">
            {levels.map((l) => (
              <button
                key={l.id}
                onClick={() => handleSelect(l.id)}
                className="flex items-center gap-4 p-5 rounded-xl border-2 border-border bg-card text-left transition-all hover:border-primary/50"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-heading font-bold text-primary ${l.intensity}`}>
                  {l.id}
                </div>
                <div>
                  <h2 className="font-heading font-semibold">{l.label}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">{l.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectLevel;
