import { categories } from "@/config/nav";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface SidebarProps {
  className?: ClassValue;
}

function Sidebar({ className }: SidebarProps): JSX.Element {
  const isPathSelected = (path: string, currentPath: string) => {
    if (path === "/") return path === currentPath;
    return currentPath.includes(path);
  };

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        {categories.map((category) => (
          <div className="px-3 py-2" key={category.title}>
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {category.title}
            </h2>
            <div className="space-y-1">
              {category.actions.map((action) => (
                <Link key={action.title} href={action.href} className="w-full">
                  {/* <Button
                    key={action.title}
                    href={action.href}
                    variant={
                      isPathSelected(action.href, page.url.pathname)
                        ? "secondary"
                        : "ghost"
                    }
                    className="w-full justify-start"
                  >
                    <action.icon className="mr-2 h-4 w-4" />
                    {action.title}
                  </Button> */}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
