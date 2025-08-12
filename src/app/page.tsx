
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Mountain, Flame, Dumbbell } from 'lucide-react';
import { ThemeToggleButton } from '@/components/theme-toggle';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 lg:px-6 h-16 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Flame className="h-6 w-6 text-primary" />
          <span className="sr-only">Sportlight</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            href="/sports"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
           <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
          <ThemeToggleButton />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Unlock Your Athletic Potential
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Sportlight is your personal hub for sports knowledge, offering everything from history and rules to personalized training roadmaps.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/sports"
                    prefetch={false}
                  >
                    <Button size="lg">
                        Get Started
                    </Button>
                  </Link>
                </div>
              </div>
               <Image
                src="https://images.unsplash.com/photo-1587280501635-397de3b713e2?q=80&w=2070&auto=format&fit=crop"
                width="600"
                height="400"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                data-ai-hint="athlete celebrating victory"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Our Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Everything You Need to Succeed</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We provide the tools and knowledge to help you master any sport. From rules and history to AI-powered coaching and personalized roadmaps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1 text-center">
                <Mountain className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-xl font-bold">Personalized Roadmaps</h3>
                <p className="text-muted-foreground">
                  Customized training plans from beginner to pro based on your age, fitness, and budget.
                </p>
              </div>
               <div className="grid gap-1 text-center">
                <Dumbbell className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-xl font-bold">AI Chat Coach</h3>
                <p className="text-muted-foreground">
                  Get instant answers to your questions and receive expert advice on improving your skills.
                </p>
              </div>
               <div className="grid gap-1 text-center">
                 <Flame className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-xl font-bold">In-Depth Knowledge</h3>
                <p className="text-muted-foreground">
                  Learn the history, rules, and key terminology for a wide variety of sports.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Sportlight. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
