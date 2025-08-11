
'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSportById, sportsData, type Sport } from '@/lib/sports-data';
import { SportSelector } from '@/components/sport-selector';
import { SportInfo } from '@/components/sport-info';
import { PhotoGallery } from '@/components/photo-gallery';
import { ChatCoach } from '@/components/chat-coach';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { ImageGenerator } from '@/components/image-generator';

function HomePageContent() {
  const searchParams = useSearchParams();
  const sportId = searchParams.get('sport') || sportsData[0].id;
  
  // Use state to manage sport data to allow for updates
  const [currentSport, setCurrentSport] = useState<Sport | null>(() => getSportById(sportId));

  useEffect(() => {
    setCurrentSport(getSportById(sportId));
  }, [sportId]);

  const handleNewImage = (newImage: { imageUrl: string; caption: string; hint: string }) => {
    if (currentSport) {
      const updatedSport = {
        ...currentSport,
        photoGallery: [newImage, ...currentSport.photoGallery],
      };
      setCurrentSport(updatedSport);
    }
  };

  return (
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

      {currentSport ? (
        <div className="space-y-12">
          <h2 className="font-headline text-4xl font-bold text-center">{currentSport.name}</h2>
          <SportInfo sport={currentSport} />
          
          <ImageGenerator sportName={currentSport.name} onNewImage={handleNewImage} />

          {currentSport.photoGallery && currentSport.photoGallery.length > 0 && (
            <PhotoGallery sport={currentSport} />
          )}
          
          <ChatCoach sportName={currentSport.name} />
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
  );
}


export default function Home() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
