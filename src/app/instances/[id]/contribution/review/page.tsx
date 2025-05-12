"use client";

import { NavBar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HandHeart } from "lucide-react";
import { ContributionCard } from "@/components/contribution/contribution-card";
import { useEffect, useState } from "react";

// Mock contributions data - in a real app this would come from an API
const mockContributionPairs = [
  // Pair 1
  [
    {
      id: "1a",
      title: "Workshop",
      contributor: "Coops",
      description: "Workshop contribution details would go here",
    },
    {
      id: "1b",
      title: "Website development",
      contributor: "Sam",
      description: "Website development contribution details would go here",
    },
  ],
  // Pair 2
  [
    {
      id: "2a",
      title: "Code Review",
      contributor: "Alex",
      description: "Code review contribution details would go here",
    },
    {
      id: "2b",
      title: "Documentation",
      contributor: "Taylor",
      description: "Documentation contribution details would go here",
    },
  ],
  // Pair 3
  [
    {
      id: "3a",
      title: "Bug Fixes",
      contributor: "Jordan",
      description: "Bug fixing contribution details would go here",
    },
    {
      id: "3b",
      title: "UI Design",
      contributor: "Casey",
      description: "UI design contribution details would go here",
    },
  ],
];

// Type for storing votes
interface Vote {
  pairIndex: number;
  selectedId: string;
}

// Main Page Component
export default function ReviewContributionPage() {
  // State for review count, current pair index, and votes
  const [reviewCount, setReviewCount] = useState(0);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Load stored data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCount = localStorage.getItem("reviewCount");
      const storedVotes = localStorage.getItem("contributionVotes");
      const storedPairIndex = localStorage.getItem("currentPairIndex");

      if (storedCount) {
        setReviewCount(Number.parseInt(storedCount, 10));
      }

      if (storedVotes) {
        try {
          setVotes(JSON.parse(storedVotes));
        } catch (error) {
          console.error("Failed to parse votes from localStorage", error);
        }
      }

      if (storedPairIndex) {
        const index = Number.parseInt(storedPairIndex, 10);
        setCurrentPairIndex(index);
        setIsComplete(index >= mockContributionPairs.length);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("reviewCount", reviewCount.toString());
      localStorage.setItem("contributionVotes", JSON.stringify(votes));
      localStorage.setItem("currentPairIndex", currentPairIndex.toString());
    }
  }, [reviewCount, currentPairIndex, votes]);

  // Handle voting on a contribution
  const handleVote = (id: string) => {
    // Store the vote
    const newVote: Vote = {
      pairIndex: currentPairIndex,
      selectedId: id,
    };

    setVotes((prev) => [...prev, newVote]);
    setReviewCount((prev) => prev + 1);

    // Move to the next pair
    if (currentPairIndex < mockContributionPairs.length - 1) {
      setCurrentPairIndex((prev) => prev + 1);
    } else {
      // All pairs have been reviewed
      setIsComplete(true);
    }
  };

  // Handle reset button click
  const handleReset = () => {
    setReviewCount(0);
    setCurrentPairIndex(0);
    setVotes([]);
    setIsComplete(false);

    // Clear localStorage
    localStorage.removeItem("reviewCount");
    localStorage.removeItem("contributionVotes");
    localStorage.removeItem("currentPairIndex");
  };

  // Current contribution pair to display
  const currentPair = !isComplete
    ? mockContributionPairs[currentPairIndex]
    : null;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 container max-w-md mx-auto mt-20 px-4">
        <div className="rounded-full bg-gray-200 px-6 py-2 text-center text-gray-800 w-fit ml-auto">
          {reviewCount}
        </div>

        <div className="mt-4 text-center">
          <div className="flex justify-center items-center gap-2">
            <h1 className="text-2xl font-semibold">Evaluate Gratitude</h1>
            <HandHeart className="h-6 w-6 text-slate-700" aria-hidden="true" />
          </div>
          <p className="text-lg mt-2 mb-6">
            Which contribution are you more grateful for?
          </p>
        </div>

        {isComplete ? (
          <div className="text-center my-8">
            <h2 className="text-xl mb-4">
              Thank you for reviewing all contributions!
            </h2>
            <p className="mb-6">You've reviewed {reviewCount} contributions.</p>
            <Button
              className="mx-auto bg-[#2196F3] hover:bg-[#2196F3]/90 text-white"
              onClick={handleReset}
            >
              Start Over
            </Button>
          </div>
        ) : (
          currentPair?.map((contribution) => (
            <ContributionCard
              key={contribution.id}
              id={contribution.id}
              title={contribution.title}
              contributor={contribution.contributor}
              description={contribution.description}
              onVote={handleVote}
            />
          ))
        )}

        <div className="mt-4 mb-8 flex justify-end">
          <Button variant="ghost" className="rounded-full" aria-label="Go back">
            <ArrowLeft className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
