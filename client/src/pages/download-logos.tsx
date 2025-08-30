import { Download, Image, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DownloadLogos() {
  const downloadSvg = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const mainLogo = `<svg width="300" height="100" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4F46E5"/>
      <stop offset="50%" style="stop-color:#7C3AED"/>
      <stop offset="100%" style="stop-color:#1D4ED8"/>
    </linearGradient>
    
    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0F172A"/>
      <stop offset="100%" style="stop-color:#334155"/>
    </linearGradient>
    
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <g transform="translate(35, 35)">
    <rect x="0" y="0" width="30" height="30" rx="4" 
          fill="url(#mainGradient)" 
          filter="url(#shadow)"
          transform="rotate(45 15 15)"/>
    
    <g transform="translate(15, 15) rotate(-45) translate(-7, -7)">
      <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" 
                stroke="white" 
                stroke-width="2" 
                fill="none" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
      <polyline points="17,8.5 23,8.5 23,14.5" 
                stroke="white" 
                stroke-width="2" 
                fill="none" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
    </g>
  </g>
  
  <g transform="translate(55, 25)">
    <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6Z" 
          fill="#EAB308" 
          opacity="0.9">
      <animateTransform attributeName="transform" 
                        type="scale" 
                        values="1;1.2;1" 
                        dur="2s" 
                        repeatCount="indefinite"/>
    </path>
  </g>
  
  <text x="85" y="45" 
        font-family="Arial, sans-serif" 
        font-size="28" 
        font-weight="bold" 
        fill="url(#textGradient)">ValuationGenie</text>
  
  <text x="85" y="65" 
        font-family="Arial, sans-serif" 
        font-size="12" 
        font-weight="500" 
        fill="#64748B">Instant Business Valuation</text>
</svg>`;

  const horizontalLogo = `<svg width="400" height="80" viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4F46E5"/>
      <stop offset="50%" style="stop-color:#7C3AED"/>
      <stop offset="100%" style="stop-color:#1D4ED8"/>
    </linearGradient>
    
    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0F172A"/>
      <stop offset="100%" style="stop-color:#334155"/>
    </linearGradient>
    
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <g transform="translate(25, 25)">
    <rect x="0" y="0" width="30" height="30" rx="4" 
          fill="url(#mainGradient)" 
          filter="url(#shadow)"
          transform="rotate(45 15 15)"/>
    
    <g transform="translate(15, 15) rotate(-45) translate(-7, -7)">
      <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" 
                stroke="white" 
                stroke-width="2" 
                fill="none" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
      <polyline points="17,8.5 23,8.5 23,14.5" 
                stroke="white" 
                stroke-width="2" 
                fill="none" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
    </g>
  </g>
  
  <g transform="translate(45, 15)">
    <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6Z" 
          fill="#EAB308" 
          opacity="0.9">
      <animateTransform attributeName="transform" 
                        type="scale" 
                        values="1;1.2;1" 
                        dur="2s" 
                        repeatCount="indefinite"/>
    </path>
  </g>
  
  <text x="75" y="35" 
        font-family="Arial, sans-serif" 
        font-size="24" 
        font-weight="bold" 
        fill="url(#textGradient)">ValuationGenie</text>
  
  <text x="75" y="50" 
        font-family="Arial, sans-serif" 
        font-size="10" 
        font-weight="500" 
        fill="#64748B">Instant Business Valuation</text>
</svg>`;

  const iconLogo = `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4F46E5"/>
      <stop offset="50%" style="stop-color:#7C3AED"/>
      <stop offset="100%" style="stop-color:#1D4ED8"/>
    </linearGradient>
    
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <g transform="translate(17, 17)">
    <rect x="0" y="0" width="30" height="30" rx="4" 
          fill="url(#mainGradient)" 
          filter="url(#shadow)"
          transform="rotate(45 15 15)"/>
    
    <g transform="translate(15, 15) rotate(-45) translate(-7, -7)">
      <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" 
                stroke="white" 
                stroke-width="2" 
                fill="none" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
      <polyline points="17,8.5 23,8.5 23,14.5" 
                stroke="white" 
                stroke-width="2" 
                fill="none" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
    </g>
  </g>
  
  <g transform="translate(42, 12)">
    <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6Z" 
          fill="#EAB308" 
          opacity="0.9">
      <animateTransform attributeName="transform" 
                        type="scale" 
                        values="1;1.2;1" 
                        dur="2s" 
                        repeatCount="indefinite"/>
    </path>
  </g>
</svg>`;

  const whiteLogo = `<svg width="300" height="100" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFFFFF"/>
      <stop offset="50%" style="stop-color:#F8FAFC"/>
      <stop offset="100%" style="stop-color:#E2E8F0"/>
    </linearGradient>
    
    <filter id="whiteShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.1"/>
    </filter>
  </defs>
  
  <g transform="translate(35, 35)">
    <rect x="0" y="0" width="30" height="30" rx="4" 
          fill="url(#whiteGradient)" 
          filter="url(#whiteShadow)"
          transform="rotate(45 15 15)"/>
    
    <g transform="translate(15, 15) rotate(-45) translate(-7, -7)">
      <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" 
                stroke="#4F46E5" 
                stroke-width="2" 
                fill="none" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
      <polyline points="17,8.5 23,8.5 23,14.5" 
                stroke="#4F46E5" 
                stroke-width="2" 
                fill="none" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
    </g>
  </g>
  
  <g transform="translate(55, 25)">
    <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6Z" 
          fill="#EAB308" 
          opacity="0.9">
      <animateTransform attributeName="transform" 
                        type="scale" 
                        values="1;1.2;1" 
                        dur="2s" 
                        repeatCount="indefinite"/>
    </path>
  </g>
  
  <text x="85" y="45" 
        font-family="Arial, sans-serif" 
        font-size="28" 
        font-weight="bold" 
        fill="#FFFFFF">ValuationGenie</text>
  
  <text x="85" y="65" 
        font-family="Arial, sans-serif" 
        font-size="12" 
        font-weight="500" 
        fill="#CBD5E1">Instant Business Valuation</text>
</svg>`;

  const logos = [
    {
      name: "Main Logo",
      description: "Standard logo with text and tagline (300x100px)",
      filename: "valuation-genie-logo.svg",
      content: mainLogo
    },
    {
      name: "Horizontal Logo", 
      description: "Compact horizontal layout (400x80px)",
      filename: "valuation-genie-logo-horizontal.svg",
      content: horizontalLogo
    },
    {
      name: "Icon Only",
      description: "Diamond icon with sparkle (64x64px)",
      filename: "valuation-genie-icon.svg", 
      content: iconLogo
    },
    {
      name: "White Version",
      description: "White logo for dark backgrounds (300x100px)",
      filename: "valuation-genie-logo-white.svg",
      content: whiteLogo
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-lg rotate-45 flex items-center justify-center shadow-lg">
                <Image className="w-6 h-6 text-white -rotate-45" />
              </div>
              <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">ValuationGenie Logo Download</h2>
          <p className="text-slate-600">Download professional logo variations for your promotional activities</p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {logos.map((logo, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  {logo.name}
                </CardTitle>
                <CardDescription>{logo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Logo Preview */}
                <div className="bg-white border rounded-lg p-4 mb-4 flex items-center justify-center min-h-[100px]">
                  <div 
                    dangerouslySetInnerHTML={{ __html: logo.content }}
                    className="max-w-full"
                  />
                </div>
                
                {/* Download Button */}
                <Button 
                  onClick={() => downloadSvg(logo.content, logo.filename)}
                  className="w-full"
                  data-testid={`download-${logo.filename}`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download {logo.filename}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Usage Guidelines */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Usage Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">File Formats</h4>
              <p className="text-slate-600 text-sm">All logos are provided in SVG format for maximum scalability and quality at any size.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Recommended Uses</h4>
              <ul className="text-slate-600 text-sm space-y-1">
                <li>• <strong>Main Logo:</strong> Websites, business cards, letterheads</li>
                <li>• <strong>Horizontal Logo:</strong> Email signatures, headers, banners</li>
                <li>• <strong>Icon Only:</strong> Social media profiles, app icons, favicons</li>
                <li>• <strong>White Version:</strong> Dark backgrounds, presentations, merchandise</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Brand Elements</h4>
              <p className="text-slate-600 text-sm">Each logo features the signature geometric diamond (representing precision), trending arrow (growth), animated sparkle (instant magic), and premium gradient effects that reflect your $39 professional valuation service quality.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}