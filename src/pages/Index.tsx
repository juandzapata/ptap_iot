import { useSensorData } from "@/data/sensorData";
import { Valve } from "@/components/Valve";
import { WaterTank } from "@/components/WaterTank";
import { motion } from "framer-motion";
import { Activity, Droplets } from "lucide-react";

const Index = () => {
  const data = useSensorData(2000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-8">
      {/* Header */}
      <motion.header
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Droplets className="w-10 h-10 text-primary" />
          <h1 className="text-5xl font-bold text-foreground">
            Sistema de Monitoreo de Agua
          </h1>
        </div>
        <p className="text-muted-foreground text-lg flex items-center justify-center gap-2">
          <Activity className="w-5 h-5 animate-pulse text-accent" />
          Monitoreo en tiempo real
        </p>
      </motion.header>

      {/* Sistema completo */}
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-card/30 backdrop-blur-xl rounded-3xl border-2 border-border p-8 shadow-2xl">
          <div className="flex items-center justify-center gap-8 flex-wrap lg:flex-nowrap">
            {/* Válvula 1 (Izquierda) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Valve 
                isOpen={data.valve1 === 1} 
                label="Válvula 1" 
                position="left"
              />
            </motion.div>

            {/* Tubería conectora 1 */}
            <motion.div 
              className="hidden lg:block w-16 h-1 bg-gradient-to-r from-primary/50 to-primary rounded-full relative"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {data.valve1 === 1 && (
                <motion.div
                  className="absolute inset-0 bg-primary rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Tanque 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <WaterTank 
                level={data.tank1Level} 
                label="Tanque 1"
              />
            </motion.div>

            {/* Tubería conectora 2 */}
            <motion.div 
              className="hidden lg:block w-16 h-1 bg-gradient-to-r from-primary/50 to-primary rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            />

            {/* Tanque 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <WaterTank 
                level={data.tank2Level} 
                label="Tanque 2"
              />
            </motion.div>

            {/* Tubería conectora 3 */}
            <motion.div 
              className="hidden lg:block w-16 h-1 bg-gradient-to-r from-primary/50 to-primary rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            />

            {/* Tanque 3 (con sensor de turbidez) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
            <WaterTank 
              level={data.tank3Level} 
              turbidity={data.tank3Turbidity}
              temperature={data.tank3Temperature}
              label="Tanque 3"
            />
            </motion.div>

            {/* Tubería conectora 4 */}
            <motion.div 
              className="hidden lg:block w-16 h-1 bg-gradient-to-r from-primary/50 to-primary rounded-full relative"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              {data.valve2 === 1 && (
                <motion.div
                  className="absolute inset-0 bg-primary rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Válvula 2 (Derecha) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Valve 
                isOpen={data.valve2 === 1} 
                label="Válvula 2" 
                position="right"
              />
            </motion.div>
          </div>
        </div>

        {/* Footer con información */}
        <motion.div
          className="mt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <p>Datos simulados actualizándose cada 2 segundos</p>
          <p className="mt-2 text-xs">
            Los valores cambian automáticamente para simular el comportamiento del sistema
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
