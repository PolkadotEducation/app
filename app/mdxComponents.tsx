import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ children }) => (
      <h1 className="unbound-font my-10 text-2xl font-bold text-[#1A1A1A]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="unbound-font my-5 text-xl text-[#1A1A1A]">{children}</h2>
    ),
    p: ({ children }) => (
      <p className="text-[16px] my-5 text-[#1A1A1A]">{children}</p>
    ),
    a: ({ children }) => (
      <a className="text-[16px] text-[#E6007A] border-b-[#E6007A] border-b-[1px]">
        {children}
      </a>
    ),
    li: ({ children }) => <li className="list-disc list-inside">{children}</li>,
  };
}
