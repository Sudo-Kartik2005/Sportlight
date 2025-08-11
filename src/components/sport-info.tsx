import { type Sport } from "@/lib/sports-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, Gavel, ScrollText } from "lucide-react";

interface SportInfoProps {
  sport: Sport;
}

export function SportInfo({ sport }: SportInfoProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 font-headline text-2xl">
            <ScrollText className="h-6 w-6 text-primary" />
            History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{sport.history}</p>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-headline text-2xl">
              <Gavel className="h-6 w-6 text-primary" />
              Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {sport.rules.map((rule, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{rule.title}</AccordionTrigger>
                  <AccordionContent>{rule.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-headline text-2xl">
              <BookOpen className="h-6 w-6 text-primary" />
              Key Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {sport.keyTerms.map((term, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{term.term}</AccordionTrigger>
                  <AccordionContent>{term.definition}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
