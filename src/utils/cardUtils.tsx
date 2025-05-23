import { QRCodeSVG } from "qrcode.react";
import { ReactNode } from "react";
import { db, collection, doc, setDoc, getDoc } from "./firebaseConfig";
import { Link } from "react-router-dom";

export interface CardData {
  id: string;
  senderName: string;
  receiverName: string;
  message: string;
  upiId: string;
  createdAt: number;
}

// Generate a unique ID for each card
export const generateCardId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// Save card data to localStorage
export const saveCard = async (cardData: CardData): Promise<void> => {
  try {
    await setDoc(doc(collection(db, "cards"), cardData.id), cardData);
    console.log("Card saved successfully!");
  } catch (error) {
    console.error("Error saving card:", error);
  }
};

// Get all cards from localStorage
export const getCards = (): CardData[] => {
  const cards = localStorage.getItem("eidCards");
  return cards ? JSON.parse(cards) : [];
};

// Get card by ID
export const getCardById = async (id: string): Promise<CardData | null> => {
  try {
    const docRef = doc(db, "cards", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as CardData;
    } else {
      console.log("No such card found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching card:", error);
    return null;
  }
};

export const generateUpiLink = (
  upiId: string,
  amount?: number,
  note?: string,
  app: "gpay" | "phonepe" | "upi" = "upi"
): string => {
  const encodedNote = note ? encodeURIComponent(note) : "";
  const encodedAmount = amount ? encodeURIComponent(amount.toString()) : "";
  const name = "GoGirl"; // Optional: can customize sender name

  const params = `pa=${upiId}&pn=${encodeURIComponent(name)}${
    encodedNote ? `&tn=${encodedNote}` : ""
  }${encodedAmount ? `&am=${encodedAmount}` : ""}&cu=INR`;

  switch (app) {
    case "gpay":
      return `tez://upi/pay?${params}`;
    case "phonepe":
      return `phonepe://pay?${params}`;
    default:
      return `upi://pay?${params}`;
  }
};

// Generate QR code component
export const generateQRCode = (
  upiId: string,
  size: number = 150,
  amount?: number,
  note?: string
): ReactNode => {
  const upiLink = generateUpiLink(upiId, amount, note);

  const handleUpiTap = () => {
    // Open UPI link via location change to trigger UPI app
    window.location.href = upiLink;
  };

  return (
    <div
      className="flex flex-col items-center gap-4 p-4 bg-white rounded-2xl shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-center text-sm font-medium text-gray-700">
        Scan to send Eidi or tap below
      </p>

      <QRCodeSVG
        value={upiLink}
        size={size}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        className="rounded-lg border p-2"
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleUpiTap();
        }}
        className="mt-2 inline-block px-4 py-2 text-sm font-semibold text-white bg-eid-gold rounded-full shadow-md hover:bg-opacity-90 transition cursor-pointer"
      >
        💸 Tap here & send via UPI
      </button>

      <p className="text-xs text-gray-500 text-center">
        If nothing happens, try scanning the QR.
      </p>
    </div>
  );
};

// Format timestamp to readable date
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Get share URL for card
export const getShareUrl = (cardId: string): string => {
  return `${window.location.origin}/card/${cardId}`;
};

// Copy text to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Failed to copy using Clipboard API: ", err);
      return fallbackCopy(text);
    }
  } else {
    console.warn("Clipboard API not supported, using fallback.");
    return fallbackCopy(text);
  }
};

// fallback using execCommand (for older browsers)
const fallbackCopy = (text: string): boolean => {
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // avoid scrolling to bottom
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  } catch (err) {
    console.error("Fallback copy failed: ", err);
    return false;
  }
};
