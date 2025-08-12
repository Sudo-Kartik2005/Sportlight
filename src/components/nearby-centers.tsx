
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Search, Loader2, Building, LocateFixed } from "lucide-react";
import { type Sport } from "@/lib/sports-data";
import { getNearbyCenters } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";


interface NearbyCentersProps {
  sport: Sport;
}

const LocationSchema = z.object({
  location: z.string().min(3, { message: "Location must be at least 3 characters." }),
});

type LocationInput = z.infer<typeof LocationSchema>;

interface TrainingCenter {
  name: string;
  address: string;
  description: string;
}

export function NearbyCenters({ sport }: NearbyCentersProps) {
  const [centers, setCenters] = useState<TrainingCenter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<LocationInput>({
    resolver: zodResolver(LocationSchema),
    defaultValues: { location: "" },
  });

  const onSubmit: SubmitHandler<LocationInput> = async (data) => {
    setIsLoading(true);
    setError(null);
    setCenters([]);

    const response = await getNearbyCenters({
      sport: sport.name,
      location: data.location,
    });

    if (response.success) {
      setCenters(response.data.centers);
    } else {
      setError(response.error);
    }
    setIsLoading(false);
  };
  
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
       toast({
        variant: "destructive",
        title: "Geolocation Not Supported",
        description: "Your browser does not support geolocation.",
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setCenters([]);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // In a real app, you'd use a reverse geocoding service.
        // For this prototype, we'll just use coordinates as a string.
        const location = `Lat: ${position.coords.latitude.toFixed(2)}, Lon: ${position.coords.longitude.toFixed(2)}`;
        form.setValue("location", "Your Current Location");
        const response = await getNearbyCenters({
            sport: sport.name,
            location: location,
        });

        if (response.success) {
            setCenters(response.data.centers);
        } else {
            setError(response.error);
        }
        setIsLoading(false);
      },
      (error) => {
        toast({
            variant: "destructive",
            title: "Geolocation Error",
            description: "Could not retrieve your location. Please enter it manually.",
        });
        setIsLoading(false);
      }
    );
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-3xl">
          <MapPin className="h-8 w-8 text-primary" />
          Find Nearby Training Centers
        </CardTitle>
        <CardDescription>
          Enter your city or zip code to find {sport.name} training facilities near you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input placeholder="e.g., 'New York, NY' or '90210'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="outline" size="icon" onClick={handleGeolocation} disabled={isLoading}>
                <LocateFixed className="h-5 w-5" />
                <span className="sr-only">Use my location</span>
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {centers.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-headline text-xl">Showing Results For &quot;{form.getValues("location")}&quot;</h4>
              {centers.map((center, index) => (
                <Card key={index} className="shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Building className="h-6 w-6 text-primary" />
                            {center.name}
                        </CardTitle>
                        <CardDescription>{center.address}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{center.description}</p>
                    </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && !error && centers.length === 0 && form.formState.isSubmitted && (
             <div className="text-center mt-6 pt-6">
                <p className="text-muted-foreground">No training centers found for your search. The AI may not have information for that specific area.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
