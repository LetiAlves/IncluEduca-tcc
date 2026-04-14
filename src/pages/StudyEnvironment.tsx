import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Focus, Volume2, VolumeX, CheckCircle2, Circle, ChevronRight,
  BarChart3, Trophy, BookOpen, ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAppContext } from "@/contexts/AppContext";
import TopBar from "@/components/TopBar";

const sampleBlocks = [
  { id: 1, title: "Introdução ao tema", content: "Este bloco apresenta os conceitos fundamentais do assunto que vamos estudar hoje. Leia com calma e no seu ritmo.", done: false },
  { id: 2, title: "Conceito principal", content: "O conceito principal é a ideia central que conecta todos os outros pontos. Preste atenção nas palavras destacadas.", done: false },
  { id: 3, title: "Exemplo prático", content: "Agora vamos ver como isso funciona na prática. Observe o exemplo abaixo e tente identificar os padrões.", done: false },
  { id: 4, title: "Atividade", content: "Hora de praticar! Responda à pergunta a seguir com base no que aprendeu.", done: false },
];

const StudyEnvironment = () => {
  const navigate = useNavigate();
  const { condition, supportLevel, fontSize, setFontSize, focusMode, toggleFocusMode } = useAppContext();
  const [blocks, setBlocks] = useState(sampleBlocks);
  const [activeBlock, setActiveBlock] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Nível 3: ativa foco automático ao montar
  useEffect(() => {
    if (supportLevel === 3 && !focusMode) {
      toggleFocusMode();
    }
    // Ajuste de fonte base por nível
    if (supportLevel === 2 && fontSize < 18) {
      setFontSize(18);
    } else if (supportLevel === 3 && fontSize < 20) {
      setFontSize(20);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!condition || !supportLevel) {
    navigate("/select-condition");
    return null;
  }

  const completedCount = blocks.filter((b) => b.done).length;
  const progressPercent = (completedCount / blocks.length) * 100;
  const isTea = condition === "tea";

  // Nível 3: exibe apenas o bloco ativo (passo a passo)
  const isStepByStep = supportLevel === 3;
  // Nível 2+: bordas mais grossas e espaçamento maior
  const extraPadding = supportLevel >= 2;

  const markDone = (idx: number) => {
    setBlocks((prev) => prev.map((b, i) => (i === idx ? { ...b, done: true } : b)));
    if (idx < blocks.length - 1) setActiveBlock(idx + 1);
  };

  const goToPrev = () => {
    if (activeBlock > 0) setActiveBlock(activeBlock - 1);
  };

  const goToNext = () => {
    if (activeBlock < blocks.length - 1) setActiveBlock(activeBlock + 1);
  };

  const renderBlock = (block: typeof sampleBlocks[0], idx: number) => {
    const isActive = idx === activeBlock;

    return (
      <div
        key={block.id}
        className={`rounded-xl transition-all ${
          extraPadding ? "p-6 border-[3px]" : "p-5 border-2"
        } ${
          block.done
            ? "border-success/30 bg-success/5 opacity-70"
            : isActive
            ? isTea
              ? "border-tea bg-card shadow-sm"
              : "border-tdah bg-card shadow-sm"
            : "border-border bg-card/50"
        } ${focusMode && !isActive ? "opacity-20 pointer-events-none" : ""}`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0">
            {block.done ? (
              <CheckCircle2 className={`${supportLevel === 3 ? "h-7 w-7" : "h-5 w-5"} text-success`} />
            ) : (
              <Circle className={`${supportLevel === 3 ? "h-7 w-7" : "h-5 w-5"} text-muted-foreground`} />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <h3 className={`font-heading font-semibold ${supportLevel === 3 ? "text-lg" : ""}`}>
              {/* Nível 2+: mostra numeração do bloco */}
              {supportLevel >= 2 && (
                <span className="text-muted-foreground mr-2">
                  {idx + 1}/{blocks.length}
                </span>
              )}
              {block.title}
            </h3>
            {(isActive || supportLevel === 1) && (
              <p className={`text-muted-foreground leading-relaxed ${supportLevel === 3 ? "text-base" : ""}`}>
                {block.content}
              </p>
            )}
            {isActive && !block.done && (
              <Button
                size={supportLevel === 3 ? "lg" : "sm"}
                onClick={() => markDone(idx)}
                className="mt-3 gap-1.5"
              >
                Concluir bloco
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col ${isTea ? "bg-tea-surface" : "bg-tdah-surface"}`}>
      <TopBar />

      {/* Focus overlay */}
      {focusMode && (
        <div className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm pointer-events-none" />
      )}

      <main
        className={`flex-1 relative z-40 p-4 md:p-8 max-w-3xl mx-auto w-full ${
          supportLevel === 3 ? "max-w-2xl" : ""
        }`}
        style={{ fontSize: `${fontSize}px` }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isTea ? "bg-tea/10 text-tea" : "bg-tdah/10 text-tdah"
            }`}>
              {isTea ? "TEA" : "TDAH"} · Nível {supportLevel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Nível 1: foco opcional / Nível 2-3: sempre visível */}
            <Button
              variant={focusMode ? "default" : "outline"}
              size="sm"
              onClick={toggleFocusMode}
              className="gap-1.5"
            >
              <Focus className="h-4 w-4" />
              {focusMode ? "Sair do foco" : "Modo concentração"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAudioPlaying(!audioPlaying)}
              className="gap-1.5"
            >
              {audioPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {audioPlaying ? "Parar áudio" : "Ouvir"}
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">{completedCount}/{blocks.length} blocos</span>
          </div>
          <Progress value={progressPercent} className={supportLevel === 3 ? "h-4" : "h-2"} />
          {progressPercent === 100 && (
            <div className="flex items-center gap-2 text-success text-sm font-medium mt-1">
              <Trophy className="h-4 w-4" /> Parabéns! Lição concluída!
            </div>
          )}
        </div>

        {/* Nível 3 step indicator */}
        {isStepByStep && (
          <div className="mb-4 text-center">
            <span className={`text-sm font-medium ${isTea ? "text-tea" : "text-tdah"}`}>
              Passo {activeBlock + 1} de {blocks.length}
            </span>
          </div>
        )}

        {/* Content blocks */}
        <div className={`space-y-4 ${supportLevel === 3 ? "space-y-6" : ""}`}>
          {isStepByStep
            ? renderBlock(blocks[activeBlock], activeBlock)
            : blocks.map((block, idx) => renderBlock(block, idx))
          }
        </div>

        {/* Nível 3: navegação passo a passo */}
        {isStepByStep && (
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              size="lg"
              onClick={goToPrev}
              disabled={activeBlock === 0}
              className="gap-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={goToNext}
              disabled={activeBlock === blocks.length - 1}
              className="gap-1.5"
            >
              Próximo
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* TDAH gamification extras */}
        {!isTea && (
          <div className="mt-8 p-5 rounded-xl border-2 border-tdah/20 bg-tdah-surface">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="h-5 w-5 text-tdah" />
              <h3 className="font-heading font-semibold">Seu desempenho</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-card">
                <div className="text-2xl font-bold text-tdah">{completedCount}</div>
                <div className="text-xs text-muted-foreground">Concluídos</div>
              </div>
              <div className="p-3 rounded-lg bg-card">
                <div className="text-2xl font-bold text-tdah-accent">{blocks.length - completedCount}</div>
                <div className="text-xs text-muted-foreground">Restantes</div>
              </div>
              <div className="p-3 rounded-lg bg-card">
                <div className="text-2xl font-bold text-success">{Math.round(progressPercent)}%</div>
                <div className="text-xs text-muted-foreground">Progresso</div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard link */}
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => navigate("/dashboard")} className="gap-2">
            <BookOpen className="h-4 w-4" />
            Dashboard do Educador
          </Button>
        </div>
      </main>
    </div>
  );
};

export default StudyEnvironment;
