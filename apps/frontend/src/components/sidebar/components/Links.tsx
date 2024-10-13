import { FC, useCallback } from "react";
import { usePathname } from "next/navigation";
import NavLink from "components/link/NavLink";
import DashIcon from "components/icons/DashIcon";
import { RouteType } from "routes";

// SidebarLinks Props 인터페이스 정의
interface SidebarLinksProps {
  routes: RouteType[];
}

const SidebarLinks: FC<SidebarLinksProps> = ({ routes }) => {
  const pathname = usePathname();

  // 현재 경로가 활성화된 라우트인지 확인하는 함수
  const isActiveRoute = useCallback(
    (routePath: string): boolean => {
      return pathname?.includes(routePath) || false;
    },
    [pathname],
  );

  // 라우트 링크 생성 함수
  const createLinks = (routes: RouteType[]): Element[] => {
    return routes.map((route, index) => {
      // 특정 레이아웃에 해당하는 라우트만 렌더링
      const active = isActiveRoute(route.path);
      return (
        <NavLink key={index} href={`${route.layout}/${route.path}`}>
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li className="my-[3px] flex cursor-pointer items-center px-8">
              <span
                className={`${
                  active
                    ? "font-bold text-brand-500 dark:text-white"
                    : "font-medium text-gray-600"
                }`}
              >
                {route.icon ? route.icon : <DashIcon />}
              </span>
              <p
                className={`leading-1 ml-4 flex ${
                  active
                    ? "font-bold text-navy-700 dark:text-white"
                    : "font-medium text-gray-600"
                }`}
              >
                {route.name}
              </p>
            </li>
            {active && (
              <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
            )}
          </div>
        </NavLink>
      );
    });
  };

  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
