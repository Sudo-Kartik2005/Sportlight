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
import { Video } from "lucide-react";

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
          <Video className="h-8 w-8 text-primary" />
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
            {sport.videoTutorials.map((video, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Link
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="overflow-hidden rounded-lg border aspect-video relative">
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        data-ai-hint="sports video"
                      />
                       <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                        <Video className="h-12 w-12 text-white/80" />
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
