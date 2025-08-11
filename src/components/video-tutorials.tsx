import { type Sport } from "@/lib/sports-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube } from "lucide-react";

interface VideoTutorialsProps {
  sport: Sport;
}

export function VideoTutorials({ sport }: VideoTutorialsProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-3xl">
          <Youtube className="h-8 w-8 text-red-600" />
          Video Tutorials
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sport.videoTutorials.map((video) => (
          <div key={video.videoId} className="space-y-2">
            <div className="aspect-video overflow-hidden rounded-lg border">
              <iframe
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <h3 className="font-semibold">{video.title}</h3>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
