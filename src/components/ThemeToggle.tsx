import { Moon, Sun } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useAppContext();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
};

export default ThemeToggle;
