
import Link from 'next/link';
import { Flame } from 'lucide-react';
import { sportsData, type Sport } from '@/lib/sports-data';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
         <TooltipProvider>
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                 <Link
                    href="/"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                    <Flame className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Sportlight</span>
                </Link>
                {sportsData.map((sport: Sport) => (
                    <Tooltip key={sport.id}>
                        <TooltipTrigger asChild>
                             <Link
                                href={`/sports?sport=${sport.id}`}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                <sport.icon className="h-5 w-5" />
                                <span className="sr-only">{sport.name}</span>
                            </Link>
                        </TooltipTrigger>
                         <TooltipContent side="right">{sport.name}</TooltipContent>
                    </Tooltip>
                ))}
            </nav>
        </TooltipProvider>
      </aside>
      <main className="flex flex-1 flex-col sm:pl-14">
        {children}
      </main>
    </div>
  );
}
