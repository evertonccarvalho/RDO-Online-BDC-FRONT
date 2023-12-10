import React from "react";

interface CardProps {
  icon: React.ElementType;
  amount: string;
  description: string;
  percentage: string;
}

const Card: React.FC<CardProps> = ({
  icon: IconComponent,
  amount,
  description,
  percentage,
}: CardProps) => {
  return (
    <div className="border-collapse rounded-md border border-primary bg-card px-7 py-6 shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-background">
        {IconComponent && <IconComponent />}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-foreground">{amount}</h4>
          <span className="text-sm font-medium">{description}</span>
        </div>

        <span className="text-meta-3 flex items-center gap-1 text-sm font-medium">
          {percentage}
        </span>
      </div>
    </div>
  );
};

export default Card;
