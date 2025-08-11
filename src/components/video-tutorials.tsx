import { type Sport } from "@/lib/sports-data";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Youtube } from "lucide-react";

interface VideoTutorialsProps {
  sport: Sport;
}

export function VideoTutorials({ sport }: VideoTutorialsProps) {
  if (!sport.videoTutorials || sport.videoTutorials.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-3xl">
          <Youtube className="h-8 w-8 text-primary" />
          Video Tutorials
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {sport.videoTutorials.map((video) => (
              <CarouselItem key={video.videoId} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Link
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="overflow-hidden rounded-lg border aspect-video relative">
                      <Image
                        src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                       <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                        <Youtube className="h-12 w-12 text-white/80" />
                      </div>
                    </div>
                    <h3 className="font-semibold mt-2 group-hover:text-primary transition-colors">{video.title}</h3>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </CardContent>
    </Card>
  );
}
