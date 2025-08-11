import { type Sport } from "@/lib/sports-data";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Image as ImageIcon } from "lucide-react";

interface PhotoGalleryProps {
  sport: Sport;
}

export function PhotoGallery({ sport }: PhotoGalleryProps) {
  if (!sport.photoGallery || sport.photoGallery.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-3xl">
          <ImageIcon className="h-8 w-8 text-primary" />
          Photo Gallery
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
            {sport.photoGallery.map((photo, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg border aspect-video relative">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.caption}
                      fill
                      className="object-cover"
                      data-ai-hint={photo.hint}
                    />
                  </div>
                  <CardDescription className="mt-2 text-center text-sm text-muted-foreground italic">
                    {photo.caption}
                  </CardDescription>
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
