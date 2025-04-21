"use client";

import { useState } from "react";
import * as React from "react";
import { cn } from "@/lib/utils";

// Type for trigger element
type ButtonLikeProps = {
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: unknown;
};

interface DialogProps {
  children?: React.ReactNode;
  trigger: React.ReactElement<ButtonLikeProps>;
  title: string;
  description: string;
  content: string;
}

const Dialog = ({
  children,
  trigger,
  title,
  description,
  content,
}: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {React.cloneElement(trigger, {
        onClick: (e: React.MouseEvent) => {
          handleOpen();
          // Call the original onClick if it exists
          if (trigger.props.onClick) {
            trigger.props.onClick(e);
          }
        },
      })}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/80"
            onClick={handleClose}
            onKeyDown={(e) => e.key === "Escape" && handleClose()}
            role="presentation"
          />
          <div className="relative bg-background p-6 rounded-lg shadow-lg max-w-md w-full z-50">
            <button
              className="absolute right-4 top-4 opacity-70 hover:opacity-100"
              onClick={handleClose}
              type="button"
              aria-label="Close dialog"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <h2 className="text-lg font-semibold leading-none tracking-tight">
                {title}
              </h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="py-4">
              <p>{content}</p>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export { Dialog };
