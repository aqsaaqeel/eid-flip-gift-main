import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardData, generateCardId, saveCard } from "../utils/cardUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import CardPreview from "./CardPreview";
import SparkleTrail from "./SparkleTrail";

const CardForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<CardData, "id" | "createdAt">>({
    senderName: "",
    receiverName: "",
    message: "",
    upiId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [showPreview, setShowPreview] = useState(false);
  const sparkleRef = useRef<HTMLDivElement>(null);
  const [sparkleTrigger, setSparkleTrigger] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.senderName.trim()) {
      errors.senderName = "Your name is required";
    }

    if (formData.message.length > 100) {
      errors.message = "Message must be less than 100 characters";
    }

    if (!formData.upiId.trim()) {
      errors.upiId = "UPI ID is required";
    } else if (!formData.upiId.includes("@")) {
      errors.upiId = "Please enter a valid UPI ID";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create new card
      const newCard: CardData = {
        ...formData,
        id: generateCardId(),
        createdAt: Date.now(),
      };

      // Save card to localStorage
      saveCard(newCard);

      toast({
        title: "Card created successfully!",
        description:
          "Your Eid greeting card has been created. Redirecting to view page...",
      });
      setSparkleTrigger(true); // Fire sparkles

      // Redirect to the card view page
      setTimeout(() => {
        navigate(`/card/${newCard.id}`);
      }, 1500);
    } catch (error) {
      console.error("Error creating card:", error);
      toast({
        title: "Failed to create card",
        description:
          "An error occurred while creating your card. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-eid-dark">Card Details</h2>
        <Button
          type="button"
          variant="outline"
          className="text-xs"
          onClick={togglePreview}
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </Button>
      </div>

      {showPreview && (
        <div className="mb-6">
          <CardPreview
            cardData={{
              ...formData,
              id: "preview",
              createdAt: Date.now(),
            }}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div ref={sparkleRef} className="space-y-2">
          <SparkleTrail trigger={sparkleTrigger} boundsRef={sparkleRef} />

          <Label htmlFor="senderName">Your Name</Label>
          <Input
            id="senderName"
            name="senderName"
            value={formData.senderName}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className={validationErrors.senderName ? "border-red-300" : ""}
          />
          {validationErrors.senderName && (
            <p className="text-sm text-red-500">
              {validationErrors.senderName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="receiverName">Recipient's Name</Label>
          <Input
            id="receiverName"
            name="receiverName"
            value={formData.receiverName}
            onChange={handleInputChange}
            placeholder="Enter recipient's name"
            className={validationErrors.receiverName ? "border-red-300" : ""}
          />
          <p className="text-sm text-red-500">
            {validationErrors.receiverName}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Your Message</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Enter your Eid greeting message"
            className={validationErrors.message ? "border-red-300" : ""}
            rows={3}
          />
          <p className="text-xs text-gray-500 flex justify-between">
            <span>Brief message for the recipient</span>
            <span>{formData.message.length}/100</span>
          </p>
          {validationErrors.message && (
            <p className="text-sm text-red-500">{validationErrors.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="upiId">Your UPI ID</Label>
          <Input
            id="upiId"
            name="upiId"
            value={formData.upiId}
            onChange={handleInputChange}
            placeholder="yourname@upi"
            className={validationErrors.upiId ? "border-red-300" : ""}
          />
          <p className="text-xs text-gray-500">
            This will be used to generate the payment QR code
          </p>
          {validationErrors.upiId && (
            <p className="text-sm text-red-500">{validationErrors.upiId}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-eid-green hover:bg-opacity-90 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Card..." : "Create Card"}
        </Button>
      </form>
    </div>
  );
};

export default CardForm;
