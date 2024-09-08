import { FC } from "react";
import Link from "next/link";
import clsx from "clsx";

type NavItemProps = {
  label: string;
  href: string;
  active?: boolean;
  onClick: () => void;
};

const NavItem: FC<NavItemProps> = ({ label, href, active, onClick }) => {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={clsx(
          "flex items-center p-2 text-base font-medium rounded-lg",
          active ? "bg-primary text-white" : "hover:bg-gray-200",
        )}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
