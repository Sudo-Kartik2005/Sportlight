"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Map, Zap } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Sport, type Roadmap, type RoadmapKey } from "@/lib/sports-data";
import { RoadmapDisplay } from "./roadmap-display";

interface RoadmapGeneratorProps {
  sport: Sport;
}

const ageGroups = ["15-25", "26-40", "41+"] as const;
const fitnessLevels = ["Beginner", "Intermediate", "Advanced"] as const;
const budgets = ["Low", "Medium", "High"] as const;

const RoadmapSchema = z.object({
  ageGroup: z.enum(ageGroups, { required_error: "Please select an age group." }),
  fitnessLevel: z.enum(fitnessLevels, { required_error: "Please select a fitness level." }),
  budget: z.enum(budgets, { required_error: "Please select a budget." }),
});

type RoadmapInput = z.infer<typeof RoadmapSchema>;

export function RoadmapGenerator({ sport }: RoadmapGeneratorProps) {
  const [generatedRoadmap, setGeneratedRoadmap] = useState<Roadmap | null>(null);

  const form = useForm<RoadmapInput>({
    resolver: zodResolver(RoadmapSchema),
  });

  const onSubmit: SubmitHandler<RoadmapInput> = (data) => {
    const roadmapKey: RoadmapKey = `${data.ageGroup}_${data.fitnessLevel}_${data.budget}`;
    const roadmap = sport.roadmaps?.[roadmapKey] ?? null;
    setGeneratedRoadmap(roadmap);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-3xl">
          <Map className="h-8 w-8 text-primary" />
          Personalized Roadmap
        </CardTitle>
        <CardDescription>
          Tell us about yourself to generate a custom training roadmap from beginner to pro.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="ageGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age Group</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your age..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ageGroups.map(group => (
                          <SelectItem key={group} value={group}>{group} years</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fitnessLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitness Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your fitness..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fitnessLevels.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your budget..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {budgets.map(budget => (
                          <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit" size="lg">
                <Zap className="mr-2" />
                Generate My Roadmap
              </Button>
            </div>
          </form>
        </Form>
        {generatedRoadmap ? (
          <RoadmapDisplay roadmap={generatedRoadmap} />
        ) : form.formState.isSubmitSuccessful ? (
            <div className="text-center mt-6 border-t pt-6">
                <p className="text-muted-foreground">Sorry, we couldn't find a specific roadmap for this combination. Try another selection.</p>
            </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
