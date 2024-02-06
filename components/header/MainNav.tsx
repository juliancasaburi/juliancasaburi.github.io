import Link from "next/link";

import type { NavItem } from "@/types/nav";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex items-center gap-7">
      <Link href="/">
        <p className="text-4xl font-bold">J <span className="text-blue-800">.</span></p>
      </Link>

      {items?.length && (
        <nav className="hidden gap-6 xs:flex">
          {items.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "link-hover flex items-center text-sm font-medium text-muted-foreground hover:text-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      )}
    </div>
  );
}
