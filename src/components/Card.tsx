import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-800 text-gray-50 rounded-lg flex gap-3 flex-col p-4">
      {children}
    </div>
  );
};

export default Card;
