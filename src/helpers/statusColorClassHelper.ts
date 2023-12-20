export const getStatusColorClass = (isActive: any): string => {
  const isActiveBool = Boolean(isActive); // Convertendo o valor para um booleano

  return isActiveBool
    ? "bg-green-900 px-2 py-1 text-green-500"
    : "bg-red-900 text-red-500";
};
