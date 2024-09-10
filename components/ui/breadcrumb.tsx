import Link from "next/link";

interface BreadcrumbProps {
  routes: {
    name: string;
    href?: string;
  }[];
}

const Breadcrumb = ({ routes }: BreadcrumbProps) => {
  return (
    <nav className="text-sm font-medium">
      <ol className="list-reset flex">
        {routes.map((route, index) => {
          const isLast = index === routes.length - 1;
          return (
            <li key={route.name} className="flex items-center">
              {isLast ? (
                <span className="text-primary text-[12px] xl:text-[16px]">{route.name}</span>
              ) : (
                <Link href={route.href || "#"} className="text-[#4D4D4D] hover:underline text-[12px] xl:text-[16px]">
                  {route.name}
                </Link>
              )}
              {!isLast && <span className="mx-2 text-[#4D4D4D]">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
