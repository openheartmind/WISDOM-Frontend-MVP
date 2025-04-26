"use client";

import { Button } from "@/components/ui/button";
import { CustomDialog } from "@/components/ui/customdialog";
import { Info } from "lucide-react";

// Contribution Card Component
interface ContributionCardProps {
  id: string;
  title: string;
  contributor: string;
  description: string;
  onVote: (id: string) => void;
}

export const ContributionCard = ({
  id,
  title,
  contributor,
  description,
  onVote,
}: ContributionCardProps) => {
  return (
    <div className="w-full border rounded-md mb-4 p-4 relative">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-lg mb-4">{contributor}</p>

        <div className="w-full flex justify-center mb-2">
          <Button
            className="bg-[#2196F3] hover:bg-[#2196F3]/90 text-white px-8"
            onClick={() => onVote(id)}
          >
            Vote
          </Button>
        </div>

        <div className="absolute top-4 right-4">
          <CustomDialog title={title} content={description}>
            <div
              className="inline-flex items-center justify-center rounded-full h-9 w-9 hover:bg-accent hover:text-accent-foreground cursor-pointer"
              aria-label={`View details about ${title}`}
            >
              <Info className="h-6 w-6" aria-hidden="true" />
            </div>
          </CustomDialog>
        </div>
      </div>
    </div>
  );
};
