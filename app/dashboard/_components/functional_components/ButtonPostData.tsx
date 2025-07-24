"use client";
import { Button, Spinner, Callout } from "@radix-ui/themes";
import { CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  buttonText?: string;
  slug: string;
  fieldData: object;
  onSuccess?: (data: object) => void;
  onError?: (error: string) => void;
  variant?: "solid" | "soft" | "outline" | "ghost";
  color?: "blue" | "green" | "red" | "orange" | "gray";
  size?: "1" | "2" | "3" | "4";
  disabled?: boolean;
  showToast?: boolean;
  showStatus?: boolean;
}

type StatusType = "idle" | "loading" | "success" | "error";

const ButtonPostData = ({
  buttonText = "Submit",
  slug,
  fieldData,
  onSuccess,
  onError,
  variant = "solid",
  color = "blue",
  size = "2",
  disabled = false,
  showToast = true,
  showStatus = true,
}: Props) => {
  const [status, setStatus] = useState<StatusType>("idle");
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    if (status === "loading") return; // Prevent double clicks

    setStatus("loading");
    setMessage("");

    try {
      const response = await axios.post(slug, fieldData);

      console.log("ButtonPostData response:", response);
      setStatus("success");

      let successMessage = "";
      if (response.status === 201) {
        successMessage = "Data created successfully";
      } else if (response.status === 200) {
        successMessage = "Data updated successfully";
      } else if (response.status === 204) {
        successMessage = "Operation completed successfully";
      } else {
        successMessage = "Operation completed";
      }

      setMessage(successMessage);

      if (showToast) {
        toast.success(successMessage);
      }

      // Call onSuccess callback with response data
      onSuccess?.(response.data);

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    } catch (error) {
      setStatus("error");

      let errorMessage = "An unexpected error occurred";

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<AxiosError>;

        if (axiosError.response) {
          // Server responded with error status
          const statusCode = axiosError.response.status;
          const responseData = axiosError.response.data;

          switch (statusCode) {
            case 400:
              errorMessage = responseData?.message || "Invalid data provided";
              break;
            case 401:
              errorMessage = "Unauthorized access";
              break;
            case 403:
              errorMessage = "Access forbidden";
              break;
            case 404:
              errorMessage = "Resource not found";
              break;
            case 409:
              errorMessage = JSON.stringify(responseData) || "Data conflict";
              break;
            case 422:
              errorMessage = responseData?.message || "Validation error";
              break;
            case 500:
              errorMessage = "Server error. Please try again later.";
              break;
            default:
              errorMessage = responseData?.message || `Error: ${statusCode}`;
          }
        } else if (axiosError.request) {
          // Network error
          errorMessage = "Network error. Please check your connection.";
        } else {
          // Request setup error
          errorMessage = axiosError.message || "Request failed";
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setMessage(errorMessage);

      if (showToast) {
        toast.error(errorMessage);
      }

      // Call onError callback
      onError?.(errorMessage);

      // Reset error status after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);

      console.error("ButtonPostData error:", error);
    }
  };

  const getButtonColor = () => {
    if (status === "success") return "green";
    if (status === "error") return "red";
    return color;
  };

  const getButtonText = () => {
    switch (status) {
      case "loading":
        return "Processing...";
      case "success":
        return "Success!";
      case "error":
        return "Try Again";
      default:
        return buttonText;
    }
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleClick}
        disabled={disabled || status === "loading"}
        variant={variant}
        color={getButtonColor()}
        size={size}
        className="min-w-[120px]"
      >
        {status === "loading" && <Spinner size="1" />}
        {status === "success" && <CheckIcon />}
        {status === "error" && <ExclamationTriangleIcon />}
        {getButtonText()}
      </Button>

      {/* Status Message */}
      {showStatus && message && (
        <Callout.Root
          color={
            status === "success" ? "green" : status === "error" ? "red" : "blue"
          }
          size="1"
        >
          <Callout.Icon>
            {status === "success" && <CheckIcon />}
            {status === "error" && <ExclamationTriangleIcon />}
          </Callout.Icon>
          <Callout.Text>{message}</Callout.Text>
        </Callout.Root>
      )}
    </div>
  );
};

export default ButtonPostData;
