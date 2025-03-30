import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  CardData,
  getCardById,
  getShareUrl,
  copyToClipboard,
  formatDate,
} from "../utils/cardUtils";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Check, Send, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const ViewCard = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const fetchCard = async () => {
        setLoading(true);
        const cardData = await getCardById(id);
        setCard(cardData);
        setLoading(false);
      };

      fetchCard();
    }
  }, [id]);


  const handleCopyLink = async () => {
    if (!card) return;

    const shareUrl = getShareUrl(card.id);
    const success = await copyToClipboard(shareUrl);

    if (success) {
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The card link has been copied to your clipboard.",
      });

      setTimeout(() => setCopied(false), 3000);
    } else {
      toast({
        title: "Failed to copy",
        description: "Could not copy the link. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-eid-green rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading card...</p>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-12 h-12 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Card Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The card you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button className="bg-eid-green hover:bg-opacity-90 text-white w-full">
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 mt-4">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Create your own card
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <Card cardData={card} />
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Eid Greeting from {card.senderName}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Created on {formatDate(card.createdAt)}
            </p>

            <div className="space-y-6">

              <div className="space-y-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-700 text-sm font-medium text-center">
                  Share this card with others:
                </p>

                <div className="flex flex-col gap-4 items-center">
                  <Button
                    variant="outline"
                    className="w-full sm:w-60 border-gray-300 hover:bg-gray-100 transition-all"
                    onClick={handleCopyLink}
                  >
                    {copied ? (
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4 text-gray-500" />
                    )}
                    {copied ? "Copied!" : "Copy Link"}
                  </Button>

                  <div className="flex gap-4">
                    <WhatsappShareButton
                      url={getShareUrl(card.id)}
                      className="hover:scale-110 transition-transform"
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <FacebookShareButton
                      url={getShareUrl(card.id)}
                      className="hover:scale-110 transition-transform"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <EmailShareButton
                      url={getShareUrl(card.id)}
                      className="hover:scale-110 transition-transform"
                    >
                      <EmailIcon size={32} round />
                    </EmailShareButton>
                    <TwitterShareButton
                      url={getShareUrl(card.id)}
                      className="hover:scale-110 transition-transform"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <Link to="/create">
                  <Button className="w-full bg-eid-gold hover:bg-opacity-90 text-white">
                    <Heart className="mr-2 h-4 w-4" />
                    Create Your Own Card
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
