import Image from "next/image";

interface LoyaltyBenefit {
  compras: number;
  beneficio: string;
  descripcion: string;
}

interface LoyaltyCardProps {
  clientName: string;
  clientLastName: string;
  compras: number;
  config: {
    color: string;
    textColor: string;
    title: string;
    subtitle: string;
    totalSlots: number;
    logo: string;
    benefits: LoyaltyBenefit[];
  };
  className?: string;
}

export function LoyaltyCard({
  clientName,
  clientLastName,
  compras,
  config,
  className = "",
}: LoyaltyCardProps) {
  // Función para obtener el beneficio actual según las compras
  const getCurrentBenefit = (compras: number): LoyaltyBenefit | null => {
    // Ordenamos los beneficios por número de compras (descendente)
    const sortedBenefits = [...config.benefits].sort(
      (a, b) => b.compras - a.compras,
    );

    // Encontramos el primer beneficio que requiere menos o igual número de compras que las actuales
    for (const benefit of sortedBenefits) {
      if (compras >= benefit.compras) {
        return benefit;
      }
    }

    return null;
  };

  // Función para obtener el próximo beneficio según las compras
  const getNextBenefit = (compras: number): LoyaltyBenefit | null => {
    // Ordenamos los beneficios por número de compras (ascendente)
    const sortedBenefits = [...config.benefits].sort(
      (a, b) => a.compras - b.compras,
    );

    // Encontramos el primer beneficio que requiere más compras que las actuales
    for (const benefit of sortedBenefits) {
      if (compras < benefit.compras) {
        return benefit;
      }
    }

    return null;
  };

  return (
    <div
      className={`w-full max-w-md aspect-[1.6/1] rounded-xl shadow-lg p-6 flex flex-col justify-between ${className}`}
      style={{
        backgroundColor: config.color,
        color: config.textColor,
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{config.title}</h3>
          <p className="text-sm opacity-90">{config.subtitle}</p>
        </div>
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/20">
          <Image
            src={config.logo || "/placeholder.svg"}
            alt="Logo"
            fill
            className="object-contain p-1"
          />
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-sm opacity-80 mb-1">Cliente</div>
        <div className="font-bold text-lg">
          {clientName} {clientLastName}
        </div>

        {/* Slots de compras */}
        <div className="mt-3 mb-1 flex justify-between items-center">
          <span className="text-sm opacity-80">
            Compras acumuladas: {compras}
          </span>
          {getCurrentBenefit(compras) && (
            <span className="text-sm font-bold px-2 py-1 bg-white/20 rounded-full">
              {getCurrentBenefit(compras)?.beneficio}
            </span>
          )}
        </div>
        <div className="grid grid-cols-10 gap-1 mt-1">
          {Array.from({ length: config.totalSlots }).map((_, i) => (
            <div
              key={i}
              className={`h-8 rounded-full ${
                i < compras ? "bg-white" : "bg-white/20"
              }`}
            ></div>
          ))}
        </div>

        {/* Próximo beneficio */}
        {getNextBenefit(compras) && (
          <div className="text-xs opacity-80 mt-2">
            Próximo beneficio: {getNextBenefit(compras)?.beneficio} (
            {getNextBenefit(compras)?.compras - compras} compras más)
          </div>
        )}
      </div>
    </div>
  );
}
