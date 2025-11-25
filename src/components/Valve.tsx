import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ValveProps {
  isOpen: boolean;
  label: string;
  position: "left" | "right";
}

export const Valve = ({ isOpen, label, position }: ValveProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      
      <motion.div
        className="relative w-24 h-32 flex items-center justify-center"
        initial={false}
        animate={{ scale: isOpen ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Cuerpo de la válvula */}
        <div className={cn(
          "absolute inset-0 rounded-lg backdrop-blur-sm border-2 transition-all duration-500",
          isOpen 
            ? "bg-accent/20 border-accent shadow-[0_0_30px_hsl(var(--accent)/0.5)]" 
            : "bg-destructive/20 border-destructive shadow-[0_0_20px_hsl(var(--destructive)/0.3)]"
        )} />

        {/* Indicador rotatorio */}
        <motion.div
          className="relative z-10 w-16 h-2 bg-gradient-to-r from-foreground/80 to-foreground rounded-full"
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Centro de la válvula */}
        <div className={cn(
          "absolute w-6 h-6 rounded-full border-4 transition-colors duration-500 z-20",
          isOpen ? "border-accent bg-accent/30" : "border-destructive bg-destructive/30"
        )} />

        {/* Estado */}
        <motion.div
          className={cn(
            "absolute -bottom-8 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide transition-colors duration-500",
            isOpen 
              ? "bg-accent/30 text-accent border border-accent/50" 
              : "bg-destructive/30 text-destructive border border-destructive/50"
          )}
          initial={false}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isOpen ? "Abierta" : "Cerrada"}
        </motion.div>
      </motion.div>
    </div>
  );
};
