"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
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
    <div className="w-full border rounded-md mb-4 p-4">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-lg mb-4">{contributor}</p>
        <div className="flex space-x-4">
          <Dialog
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto rounded-full"
                aria-label={`View details about ${title}`}
              >
                <Info className="h-6 w-6" aria-hidden="true" />
              </Button>
            }
            title={title}
            description={contributor}
            content={description}
          />
          <Button
            className="flex-1 bg-[#2196F3] hover:bg-[#2196F3]/90 text-white"
            onClick={() => onVote(id)}
          >
            Vote
          </Button>
        </div>
      </div>
    </div>
  );
};
