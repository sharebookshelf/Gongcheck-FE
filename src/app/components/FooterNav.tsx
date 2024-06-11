import {
  HomeIcon,
  MenuIcon,
  MinusIcon,
  PlusCircleIcon,
  UserIcon,
} from "lucide-react";

export default function FooterNav() {
  return (
    <footer className="p-5 bg-white shadow-md">
      <nav className="flex justify-between">
        <MenuIcon className="text-gray-600" />
        <HomeIcon className="text-gray-600" />
        <PlusCircleIcon className="text-gray-600" />
        <UserIcon className="text-gray-600" />
      </nav>
    </footer>
  );
}
