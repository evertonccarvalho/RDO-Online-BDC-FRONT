export const getStatusColorClass = (isActive: any): string => {
  const isActiveBool = Boolean(isActive); // Convertendo o valor para um booleano

  return isActiveBool
    ? "bg-green-900 px-2 py-1 text-green-500"
    : "bg-red-900 text-red-500";
};

export const getStringStatusColorClass = (status: string): string => {
  if (status === "Ativo") {
    return "bg-green-900 px-2 py-1 text-green-500";
  } else if (status === "Inativo") {
    return "bg-red-900 text-red-500";
  } else {
    return "text-gray-500";
  }
};
