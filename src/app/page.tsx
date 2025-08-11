import { Suspense } from 'react';
import { getSportById, sportsData } from '@/lib/sports-data';
import { SportSelector } from '@/components/sport-selector';
import { SportInfo } from '@/components/sport-info';
import { VideoTutorials } from '@/components/video-tutorials';
import { ChatCoach } from '@/components/chat-coach';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface HomePageProps {
  searchParams: {
    sport?: string;
  };
}

export default function Home({ searchParams }: HomePageProps) {
  const selectedSport = getSportById(searchParams.sport || sportsData[0].id);

  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Sportlight
          </h1>
          <p className="mt-2 text-lg md:text-xl text-muted-foreground">
            Your Personal Sports Knowledge Hub
          </p>
        </header>

        <div className="flex justify-center mb-8">
          <SportSelector />
        </div>

        {selectedSport ? (
          <div className="space-y-12">
            <h2 className="font-headline text-4xl font-bold text-center">{selectedSport.name}</h2>
            <SportInfo sport={selectedSport} />
            <VideoTutorials sport={selectedSport} />
            <ChatCoach sportName={selectedSport.name} />
          </div>
        ) : (
          <Card className="text-center py-20 shadow-lg">
            <CardContent>
              <Trophy className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <h2 className="mt-6 font-headline text-2xl font-semibold">Select a Sport to Begin</h2>
              <p className="mt-2 text-muted-foreground">
                Choose a sport from the list above to get started.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </Suspense>
  );
}
