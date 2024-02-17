import React from "react";
import { MainNav } from "./MainNav";
import { Button } from "./ui/button";
import { Mic } from "lucide-react";
import { UserNav } from "./UserNav";
import Logo from "./assets/Logo";
import { User } from "lucia";
import VoiceActions from "./VoiceActions";

interface HeaderProps {
  user: User;
}

function Header({ user }: HeaderProps): JSX.Element {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center md:px-8 px-4">
        <div className="flex center  md:text-sm">
          <Logo className="w-5 h-5 mr-2 font-serif" />
          Neurodog
        </div>

        <MainNav className="mx-6 hidden md:block" />
        <div className="ml-auto flex items-center space-x-4">
          <VoiceActions />
          <UserNav user={user} />
        </div>
      </div>
    </div>
  );
}

export default Header;
