import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (pathname === "/") {
    return null;
  }

  return (
    <nav className="text-sm font-medium">
      <ol className="list-reset flex items-center">
        <li className="flex items-center">
          <Link href={"/"} className="text-text-secondary hover:underline body1">
            Home
          </Link>
          {segments.length > 0 && <span className="mx-2 text-text-secondary">/</span>}
        </li>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;
          const name = segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          return (
            <li key={href} className="flex items-center">
              {isLast ? (
                <span className="text-primary body1">{name}</span>
              ) : (
                <Link href={href} className="text-text-secondary hover:underline body1">
                  {name}
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
