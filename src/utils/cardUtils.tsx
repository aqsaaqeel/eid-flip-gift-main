import { QRCodeSVG } from "qrcode.react";
import { ReactNode } from "react";
import { db, collection, doc, setDoc, getDoc } from "./firebaseConfig";

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

// Generate UPI payment link
export const generateUpiLink = (
  upiId: string,
  amount?: number,
  note?: string
): string => {
  let upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}`;

  if (amount) {
    upiLink += `&am=${amount}`;
  }

  if (note) {
    upiLink += `&tn=${encodeURIComponent(note)}`;
  }

  return upiLink;
};

// Generate QR code component
export const  generateQRCode = (
  upiId: string,
  size: number = 150
): ReactNode => {
  const upiLink = generateUpiLink(upiId);

  return (
    <div className="flex flex-col items-center gap-4">
      <p>Scan QR to send Eidi OR</p>
      <QRCodeSVG
        value={upiLink}
        size={size}
        bgColor={"#FFFFFF"}
        fgColor={"#000000"}
        level={"H"}
      />

      <a
        href={upiLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 text-xs font-small text-white bg-eid-gold rounded-lg shadow hover:bg-opacity-90 transition duration-200"
      >
        💸 tap here and send via UPI
      </a>
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
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);
    return false;
  }
};
