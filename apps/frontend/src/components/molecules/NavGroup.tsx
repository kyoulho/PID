import { useState } from "react";
import NavItem from "@/components/atoms/NavItem";
import clsx from "clsx";

type NavGroupProps = {
  label: string;
  icon: React.ReactNode;
  items: { label: string; href: string }[];
};

const NavGroup: React.FC<NavGroupProps> = ({ label, icon, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <div
        className="flex items-center justify-between cursor-pointer p-2 text-lg font-semibold hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-3">{label}</span>
        </div>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      <ul className={clsx("pl-6", { hidden: !isOpen })}>
        {items.map((item) => (
          <NavItem key={item.href} label={item.label} href={item.href} />
        ))}
      </ul>
    </div>
  );
};

export default NavGroup;
