import { Minus, Plus } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";

const FontSizeControl = () => {
  const { fontSize, setFontSize } = useAppContext();
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setFontSize(Math.max(12, fontSize - 2))}
        aria-label="Diminuir fonte"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="text-sm text-muted-foreground w-6 text-center">{fontSize}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setFontSize(Math.min(24, fontSize + 2))}
        aria-label="Aumentar fonte"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default FontSizeControl;
