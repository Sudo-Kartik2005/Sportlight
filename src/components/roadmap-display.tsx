"use client";

import { type Roadmap } from "@/lib/sports-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, ExternalLink, Clock } from "lucide-react";

interface RoadmapDisplayProps {
  roadmap: Roadmap;
}

export function RoadmapDisplay({ roadmap }: RoadmapDisplayProps) {
  return (
    <div className="mt-6 border-t pt-6">
      <h3 className="text-2xl font-semibold font-headline text-center mb-4">Your Personalized Roadmap</h3>
      <div className="space-y-4">
        {roadmap.stages.map((stage, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-primary" />
                {stage.stageName}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 pt-1">
                <Clock className="h-4 w-4" />
                <strong>Duration:</strong> {stage.duration}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{stage.description}</p>
              {stage.resources && stage.resources.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Recommended Resources:</h4>
                  <ul className="space-y-2">
                    {stage.resources.map((resource, rIndex) => (
                      <li key={rIndex} className="text-sm">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {resource.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
