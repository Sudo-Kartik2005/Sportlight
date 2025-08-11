"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sportsData } from "@/lib/sports-data";
import { type Sport } from "@/lib/sports-data";

export function SportSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSportId = searchParams.get("sport") || "";

  const handleValueChange = (sportId: string) => {
    router.push(`/?sport=${sportId}`);
  };

  return (
    <div className="w-full max-w-sm">
      <Select onValueChange={handleValueChange} defaultValue={selectedSportId}>
        <SelectTrigger className="w-full h-12 text-lg">
          <SelectValue placeholder="Select a sport..." />
        </SelectTrigger>
        <SelectContent>
          {sportsData.map((sport: Sport) => (
            <SelectItem key={sport.id} value={sport.id} className="text-lg">
              {sport.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
