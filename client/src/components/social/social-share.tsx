import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Copy,
  MessageCircle,
  Mail,
  ChevronDown
} from "lucide-react";
import { Valuation } from "@shared/schema";

interface SocialShareProps {
  valuation: Valuation;
  variant?: "button" | "icon";
  size?: "sm" | "md" | "lg";
}

export default function SocialShare({ valuation, variant = "button", size = "sm" }: SocialShareProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  // Create shareable content
  const businessName = valuation.businessName;
  const valuationRange = `$${parseInt(valuation.valuationLow).toLocaleString()} - $${parseInt(valuation.valuationHigh).toLocaleString()}`;
  const industry = valuation.industry;
  
  const shareText = `Just got my ${businessName} business valuation: ${valuationRange}! 📊 Professional ${industry} business analysis from ValuationGenie. Get yours instantly at`;
  const shareUrl = window.location.hostname === 'localhost' ? "https://thevaluationgenie.com" : window.location.origin;
  const hashtags = "BusinessValuation,SME,Entrepreneurship,BusinessValue,ValuationGenie";

  // Social media share URLs
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(hashtags)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(`${businessName} Business Valuation`)}&summary=${encodeURIComponent(shareText)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    email: `mailto:?subject=${encodeURIComponent(`${businessName} Business Valuation Results`)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
  };

  const handleShare = (platform: string) => {
    const url = shareUrls[platform as keyof typeof shareUrls];
    if (url) {
      window.open(url, '_blank', 'width=600,height=500,scrollbars=yes,resizable=yes');
      toast({
        title: "Share Window Opened",
        description: `${platform.charAt(0).toUpperCase() + platform.slice(1)} share window opened.`,
      });
      
      // Close dialog after sharing (optional - keeps it open so user can share to multiple platforms)
      // setIsOpen(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      const fullText = `${shareText} ${shareUrl}`;
      await navigator.clipboard.writeText(fullText);
      toast({
        title: "Copied!",
        description: "Share text copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const shareOptions = [
    { 
      key: 'twitter', 
      label: 'Twitter/X', 
      icon: Twitter, 
      color: 'text-blue-500',
      bgColor: 'hover:bg-blue-50'
    },
    { 
      key: 'linkedin', 
      label: 'LinkedIn', 
      icon: Linkedin, 
      color: 'text-blue-700',
      bgColor: 'hover:bg-blue-50'
    },
    { 
      key: 'facebook', 
      label: 'Facebook', 
      icon: Facebook, 
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50'
    },
    { 
      key: 'whatsapp', 
      label: 'WhatsApp', 
      icon: MessageCircle, 
      color: 'text-green-600',
      bgColor: 'hover:bg-green-50'
    },
    { 
      key: 'email', 
      label: 'Email', 
      icon: Mail, 
      color: 'text-gray-600',
      bgColor: 'hover:bg-gray-50'
    }
  ];

  if (variant === "icon") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={size}
            className="text-slate-600 hover:text-slate-900"
          >
            <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {shareOptions.map((option) => (
            <DropdownMenuItem
              key={option.key}
              onClick={() => handleShare(option.key)}
              className={`${option.bgColor} cursor-pointer`}
            >
              <option.icon className={`w-4 h-4 mr-2 ${option.color}`} />
              Share on {option.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onClick={copyToClipboard} className="hover:bg-gray-50 cursor-pointer">
            <Copy className="w-4 h-4 mr-2 text-gray-600" />
            Copy Share Text
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={size}
          className="w-full sm:w-auto text-xs sm:text-sm"
        >
          <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span className="hidden sm:inline">Share Results</span>
          <span className="sm:hidden">Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Valuation Results</DialogTitle>
          <DialogDescription>
            Share your {businessName} business valuation with your network
          </DialogDescription>
        </DialogHeader>
        
        {/* Preview Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">{businessName}</h4>
                <Badge variant="secondary" className="mb-2">{industry}</Badge>
                <p className="text-2xl font-bold text-blue-600">{valuationRange}</p>
                <p className="text-sm text-slate-600 mt-1">Professional business valuation</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">ValuationGenie</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Share Options */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {shareOptions.map((option) => (
            <Button
              key={option.key}
              variant="outline"
              onClick={() => handleShare(option.key)}
              className={`${option.bgColor} h-12 justify-start`}
            >
              <option.icon className={`w-5 h-5 mr-2 ${option.color}`} />
              {option.label}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={copyToClipboard}
            className="h-12 justify-start hover:bg-gray-50"
          >
            <Copy className="w-5 h-5 mr-2 text-gray-600" />
            Copy Text
          </Button>
        </div>

        {/* Share Preview Text */}
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-700 font-medium mb-1">Share Message Preview:</p>
          <p className="text-sm text-gray-600 italic">"{shareText} {shareUrl}"</p>
          <p className="text-xs text-gray-500 mt-2">
            This message will be pre-filled when you share to social media.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}