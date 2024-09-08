import { FC } from "react";

export type HeaderProps = unknown;
export const Header: FC<HeaderProps> = () => {
  return (
    <header className="flex justify-between items-center bg-white p-4 shadow-lg">
      <div className="flex items-center">
        <button className="mr-4">🔔</button>
        <button>⚙️</button>
      </div>
      <div className="flex items-center">
        <span>김성우 - 2 Days</span>
        <button className="ml-4">⋮</button>
      </div>
    </header>
  );
};
