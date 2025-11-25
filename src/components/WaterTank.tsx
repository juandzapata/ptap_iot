import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Droplets } from "lucide-react";

interface WaterTankProps {
  level: number; // 0-100
  turbidity?: number; // 0-900 (solo para tanque 3)
  label: string;
}

// Calcular color del agua según turbidez
const getWaterColor = (turbidity: number) => {
  // 0-300: limpia (azul)
  // 300-600: media (amarillo-verdoso)
  // 600-900: sucia (marrón-naranja)
  
  if (turbidity <= 300) {
    const intensity = turbidity / 300;
    return `hsl(199, 89%, ${48 - intensity * 10}%)`;
  } else if (turbidity <= 600) {
    const progress = (turbidity - 300) / 300;
    return `hsl(${199 - progress * 161}, ${89 - progress * 20}%, 48%)`;
  } else {
    const progress = (turbidity - 600) / 300;
    return `hsl(38, ${69 + progress * 23}%, ${50 - progress * 10}%)`;
  }
};

export const WaterTank = ({ level, turbidity, label }: WaterTankProps) => {
  const hasTurbiditySensor = turbidity !== undefined;
  const waterColor = hasTurbiditySensor ? getWaterColor(turbidity) : "hsl(var(--water-clean))";
  
  const isLowLevel = level < 35;
  
  return (
    <div className="flex flex-col items-center gap-4 min-w-[140px]">
      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>

      <div className="relative w-32 h-64 rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-border shadow-xl overflow-hidden">
        {/* LED de advertencia - nivel bajo */}
        <motion.div
          className="absolute top-3 right-3 w-4 h-4 rounded-full z-10"
          style={{
            backgroundColor: isLowLevel ? '#ef4444' : '#22c55e',
            boxShadow: isLowLevel 
              ? '0 0 10px #ef4444, 0 0 20px #ef444480' 
              : '0 0 8px #22c55e80',
          }}
          animate={{
            opacity: isLowLevel ? [1, 0.4, 1] : 1,
            scale: isLowLevel ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: isLowLevel ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
        {/* Grid de fondo para efecto técnico */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Agua animada */}
        <motion.div
          className="absolute bottom-0 w-full rounded-b-2xl"
          initial={false}
          animate={{ height: `${level}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ 
            backgroundColor: waterColor,
            boxShadow: `0 0 30px ${waterColor}`,
          }}
        >
          {/* Efecto de ondas */}
          <motion.div
            className="absolute top-0 w-full h-3 opacity-30"
            style={{ 
              background: `linear-gradient(90deg, transparent, ${waterColor}, transparent)` 
            }}
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Indicador de nivel */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
          <div className="text-center bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30">
            <div className="text-3xl font-bold text-primary">
              {Math.round(level)}%
            </div>
          </div>
        </div>

        {/* Marcas de nivel */}
        {[25, 50, 75].map((mark) => (
          <div
            key={mark}
            className="absolute left-0 w-full border-t border-dashed border-muted-foreground/30"
            style={{ bottom: `${mark}%` }}
          >
            <span className="absolute -left-8 -top-2 text-xs text-muted-foreground">
              {mark}%
            </span>
          </div>
        ))}
      </div>

      {/* Datos adicionales */}
      <div className="flex flex-col gap-2 w-full px-2">
        <div className="flex items-center justify-between bg-card/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
          <Droplets className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium">Nivel</span>
          <span className="text-xs font-bold text-primary">{Math.round(level)}%</span>
        </div>

        {hasTurbiditySensor && (
          <div className="flex items-center justify-between bg-card/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
            <div 
              className="w-4 h-4 rounded-full border-2 border-foreground/30"
              style={{ backgroundColor: waterColor }}
            />
            <span className="text-xs font-medium">Turbidez</span>
            <span className="text-xs font-bold" style={{ color: waterColor }}>
              {Math.round(turbidity)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
