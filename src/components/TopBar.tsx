import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import FontSizeControl from "./FontSizeControl";
import { useAppContext } from "@/contexts/AppContext";

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { reset } = useAppContext();
  const showBack = location.pathname !== "/";

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack && (
          <Button variant="ghost" size="icon" onClick={() => { reset(); navigate("/"); }} aria-label="Voltar">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-heading font-semibold text-lg">IncluEduca</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <FontSizeControl />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default TopBar;
