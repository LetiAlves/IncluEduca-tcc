import { useNavigate } from "react-router-dom";
import { Users, BookOpen, TrendingUp, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import TopBar from "@/components/TopBar";

const students = [
  { name: "Ana Silva", condition: "TEA", level: 2, progress: 75 },
  { name: "Pedro Santos", condition: "TDAH", level: 1, progress: 40 },
  { name: "Maria Oliveira", condition: "TEA", level: 3, progress: 90 },
  { name: "Lucas Costa", condition: "TDAH", level: 2, progress: 60 },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-8">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Dashboard do Educador</h1>
          <p className="text-muted-foreground text-sm mt-1">Acompanhe o progresso dos seus alunos</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Users className="h-5 w-5" />, label: "Alunos", value: "4" },
            { icon: <BookOpen className="h-5 w-5" />, label: "Atividades", value: "12" },
            { icon: <TrendingUp className="h-5 w-5" />, label: "Progresso médio", value: "66%" },
            { icon: <Settings className="h-5 w-5" />, label: "Perfis ativos", value: "4" },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-xl border bg-card space-y-2">
              <div className="text-primary">{stat.icon}</div>
              <div className="text-2xl font-bold font-heading">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Student list */}
        <div className="space-y-4">
          <h2 className="font-heading font-semibold text-lg">Alunos</h2>
          <div className="space-y-3">
            {students.map((s) => (
              <div key={s.name} className="flex items-center gap-4 p-4 rounded-xl border bg-card">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-heading font-semibold text-primary">
                  {s.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{s.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      s.condition === "TEA" ? "bg-tea-surface text-tea" : "bg-tdah-surface text-tdah"
                    }`}>
                      {s.condition} · Nível {s.level}
                    </span>
                  </div>
                </div>
                <div className="w-24 space-y-1">
                  <Progress value={s.progress} className="h-1.5" />
                  <div className="text-xs text-muted-foreground text-right">{s.progress}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={() => navigate("/select-condition")}>
            Iniciar nova sessão
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
