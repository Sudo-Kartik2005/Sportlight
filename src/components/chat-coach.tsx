"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Bot, User, CornerDownLeft, Loader2, Dumbbell } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getAiCoachResponse } from "@/app/actions";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface ChatCoachProps {
  sportName: string;
}

const ChatSchema = z.object({
  question: z.string().min(5, { message: "Question must be at least 5 characters." }),
});

type ChatInput = z.infer<typeof ChatSchema>;

interface Message {
  role: "user" | "assistant";
  content: string;
  drills?: { name: string; description: string }[];
}

export function ChatCoach({ sportName }: ChatCoachProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<ChatInput>({
    resolver: zodResolver(ChatSchema),
    defaultValues: { question: "" },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const onSubmit: SubmitHandler<ChatInput> = async (data) => {
    setIsLoading(true);
    const userMessage: Message = { role: "user", content: data.question };
    setMessages((prev) => [...prev, userMessage]);

    const response = await getAiCoachResponse({
      sport: sportName,
      question: data.question,
    });

    if (response.success && response.data) {
      const assistantMessage: Message = { 
        role: "assistant", 
        content: response.data.answer,
        drills: response.data.drills
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } else {
      const errorMessage: Message = { role: "assistant", content: response.error || "Sorry, something went wrong." };
      setMessages((prev) => [...prev, errorMessage]);
    }

    form.reset();
    setIsLoading(false);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-3xl">
          <Bot className="h-8 w-8 text-primary" />
          AI Chat Coach
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg p-4 h-[450px] flex flex-col">
          <ScrollArea className="flex-grow pr-4 -mr-4 mb-4" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground pt-16">
                  <p>Ask me anything about {sportName}!</p>
                  <p className="text-sm">e.g., "How can I improve my serve?"</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={cn("flex items-start gap-4", message.role === "user" ? "justify-end" : "justify-start")}>
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8">
                         <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                      </Avatar>
                    )}
                    <div className={cn("max-w-[75%] rounded-lg p-3 text-sm shadow-md", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                       {message.drills && message.drills.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-bold mb-2 flex items-center gap-2">
                            <Dumbbell className="h-5 w-5" />
                            Suggested Drills
                          </h4>
                          <Accordion type="single" collapsible className="w-full bg-background/50 rounded-md px-3">
                            {message.drills.map((drill, drillIndex) => (
                              <AccordionItem value={`item-${drillIndex}`} key={drillIndex} className={drillIndex === message.drills!.length - 1 ? "border-b-0" : ""}>
                                <AccordionTrigger className="text-sm">{drill.name}</AccordionTrigger>
                                <AccordionContent className="whitespace-pre-wrap text-xs">
                                  {drill.description}
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                      )}
                    </div>
                     {message.role === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))
              )}
               {isLoading && (
                <div className="flex items-start gap-4 justify-start">
                   <Avatar className="h-8 w-8">
                      <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                   </Avatar>
                   <div className="max-w-[75%] rounded-lg p-3 text-sm bg-muted flex items-center">
                     <Loader2 className="h-5 w-5 animate-spin"/>
                   </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative mt-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={`Ask about ${sportName}...`}
                        className="pr-16"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if (!isLoading && form.formState.isValid) {
                                form.handleSubmit(onSubmit)();
                            }
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage className="absolute -bottom-6 left-2" />
                  </FormItem>
                )}
              />
              <Button type="submit" size="icon" className="absolute top-3 right-3" disabled={isLoading || !form.formState.isValid} variant="ghost">
                <CornerDownLeft className="h-4 w-4" />
                <span className="sr-only">Submit</span>
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
