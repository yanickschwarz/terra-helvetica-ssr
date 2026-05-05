"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<LinkProps, "href"> {
  to: string;
  end?: boolean;
  className?: string;
  activeClassName?: string;
  children?: ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, end, className, activeClassName, children, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = end ? pathname === to : pathname?.startsWith(to);

    return (
      <Link
        ref={ref}
        href={to}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
