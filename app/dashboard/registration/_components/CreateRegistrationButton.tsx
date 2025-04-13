"use client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react"; // Import useState

const CreateRegistrationButton = () => {
  // State to track if navigation has been initiated
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = () => {
    // Set navigating state to true when the link is clicked
    setIsNavigating(true);
    // Navigation will proceed via the Link component
  };

  return (
    <Flex justify="end">
      <Link
        href="/dashboard/registration/new"
        prefetch // Keep prefetch for performance
        onClick={handleClick} // Add onClick handler here
        passHref // Recommended when wrapping custom components like Button
        legacyBehavior={false} // Use new behavior if possible, otherwise remove/set true if needed
        aria-disabled={isNavigating} // Indicate disabled state for accessibility
        style={{ pointerEvents: isNavigating ? "none" : "auto" }} // Prevent multiple clicks
      >
        <Button
          size="2"
          color="gray"
          variant="soft"
          disabled={isNavigating} // Disable button based on state
        >
          {isNavigating ? "Loading..." : "Create New Registration"}{" "}
          {/* Optional: Change text */}
        </Button>
      </Link>
    </Flex>
  );
};

export default CreateRegistrationButton;
