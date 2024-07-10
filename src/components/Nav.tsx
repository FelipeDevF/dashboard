import { AlignJustify, BarChart3, BarChartBig } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Nav() {
	const router = useRouter();
	return (
		<div className="flex flex-col bg-gradient-to-b from-purple-950 to-blue-950 w-16 sm:min-w-60 h-screen text-white p-4 divide-y gap-4 shadow-right">
			<div className="flex sm:justify-between justify-center">
				<span className="sm:inline hidden">
					DASHBOARD
				</span>
				<AlignJustify />
			</div>
			<div className="pt-8 flex flex-col gap-3">
				<div
					className="flex gap-2 items-center sm:justify-start justify-center cursor-pointer"
					onClick={() => void router.push('/')}
				>
					<BarChart3 size={16} />
					<span className="sm:inline hidden">
						Exemplo 1
					</span>
				</div>
				<div 
					className="flex gap-2 items-center sm:justify-start justify-center cursor-pointer"
					onClick={() => void router.push('/exemplo-2')}
				>
					<BarChartBig size={16} />
					<span className="sm:inline hidden">
						Exemplo 2
					</span>
				</div>
			</div>
		</div>
	);
}
  