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
                <span className="text-primary body1">{route.name}</span>
              ) : (
                <Link href={route.href || "#"} className="text-text-secondary hover:underline body1">
                  {route.name}
                </Link>
              )}
              {!isLast && <span className="mx-2 text-text-secondary">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
