import { formatKeyName } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname()
  const title = pathname === "/" || !pathname
    ? "Exemplo 1"
    : pathname.replace("/", "");
    
  return (
    <div className="flex justify-between w-full bg-gradient-to-r from-purple-950 to-blue-950 p-4 text-white rounded-md shadow-md">
      {formatKeyName(title)}
      <div className="flex gap-2 items-center">
        Sair
        <LogOut size={16}/>
      </div>
    </div>
  );
}
  