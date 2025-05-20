import Image from "next/image";

interface LoyaltyBenefit {
  beneficio: string;
  compras: number;
  descripcion: string;
}

interface LoyaltyCardProps {
  className?: string;
  clientLastName: string;
  clientName: string;
  compras: number;
  config: {
    benefits: LoyaltyBenefit[];
    color: string;
    logo: string;
    subtitle: string;
    textColor: string;
    title: string;
    totalSlots: number;
  };
}

export function LoyaltyCard({
  className = "",
  clientLastName,
  clientName,
  compras,
  config,
}: LoyaltyCardProps) {
  // Función para obtener el beneficio actual según las compras
  const getCurrentBenefit = (compras: number): LoyaltyBenefit | null => {
    // Ordenamos los beneficios por número de compras (descendente)
    const sortedBenefits = [...config.benefits].sort((a, b) => b.compras - a.compras);

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
    const sortedBenefits = [...config.benefits].sort((a, b) => a.compras - b.compras);

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
      className={`flex aspect-[1.6/1] w-full max-w-md flex-col justify-between rounded-xl p-6 shadow-lg ${className}`}
      style={{
        backgroundColor: config.color,
        color: config.textColor,
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold">{config.title}</h3>
          <p className="text-sm opacity-90">{config.subtitle}</p>
        </div>
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/20">
          <Image
            src={config.logo || "/placeholder.svg"}
            alt="Logo"
            fill
            className="object-contain p-1"
          />
        </div>
      </div>

      <div className="mt-auto">
        <div className="mb-1 text-sm opacity-80">Cliente</div>
        <div className="text-lg font-bold">
          {clientName} {clientLastName}
        </div>

        {/* Slots de compras */}
        <div className="mb-1 mt-3 flex items-center justify-between">
          <span className="text-sm opacity-80">Compras acumuladas: {compras}</span>
          {getCurrentBenefit(compras) && (
            <span className="rounded-full bg-white/20 px-2 py-1 text-sm font-bold">
              {getCurrentBenefit(compras)?.beneficio}
            </span>
          )}
        </div>
        <div className="mt-1 grid grid-cols-10 gap-1">
          {Array.from({ length: config.totalSlots }).map((_, i) => (
            <div
              key={i}
              className={`h-8 rounded-full ${i < compras ? "bg-white" : "bg-white/20"}`}
            ></div>
          ))}
        </div>

        {/* Próximo beneficio */}
        {getNextBenefit(compras) && (
          <div className="mt-2 text-xs opacity-80">
            Próximo beneficio: {getNextBenefit(compras)?.beneficio} (
            {getNextBenefit(compras)?.compras - compras} compras más)
          </div>
        )}
      </div>
    </div>
  );
}
