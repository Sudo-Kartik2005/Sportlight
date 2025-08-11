
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Wand2, Loader2, CornerDownLeft } from "lucide-react";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAiImage } from "@/app/actions";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

interface ImageGeneratorProps {
  sportName: string;
  onNewImage: (image: { imageUrl: string; caption: string, hint: string }) => void;
}

const ImageSchema = z.object({
  prompt: z.string().min(10, { message: "Prompt must be at least 10 characters." }),
});

type ImageInput = z.infer<typeof ImageSchema>;

export function ImageGenerator({ sportName, onNewImage }: ImageGeneratorProps) {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ImageInput>({
    resolver: zodResolver(ImageSchema),
    defaultValues: { prompt: `A cinematic, photorealistic image of ${sportName}` },
  });

  const onSubmit: SubmitHandler<ImageInput> = async (data) => {
    setIsLoading(true);
    setGeneratedImage(null);

    const response = await getAiImage({ prompt: data.prompt });

    if (response.success && response.data.imageUrl) {
      const newImage = {
        imageUrl: response.data.imageUrl,
        caption: data.prompt,
        hint: sportName.toLowerCase(),
      };
      setGeneratedImage(newImage.imageUrl);
      onNewImage(newImage); // Pass the new image up to the parent
    } else {
      toast({
        variant: "destructive",
        title: "Image Generation Failed",
        description: response.error || "Could not generate the image. Please try again.",
      });
    }

    setIsLoading(false);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-3xl">
          <Wand2 className="h-8 w-8 text-primary" />
          AI Image Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="Enter a creative prompt..."
                        className="pr-12"
                      />
                      <Button type="submit" size="icon" className="absolute top-0 right-0 h-full w-10" disabled={isLoading} variant="ghost">
                        <CornerDownLeft className="h-4 w-4" />
                        <span className="sr-only">Generate</span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex items-center justify-center bg-muted/50 h-96">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p>Generating your image... this can take up to a minute.</p>
          </div>
        ) : generatedImage ? (
          <div className="relative w-full h-full rounded-md overflow-hidden border">
            <Image 
                src={generatedImage} 
                alt="AI generated image" 
                fill
                className="object-contain"
            />
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>Your generated image will appear here.</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
