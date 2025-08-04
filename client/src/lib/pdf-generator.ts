// Dynamic import for Node.js compatibility
let jsPDFConstructor: any;
try {
  // Browser environment
  const jsPDFModule = require('jspdf');
  jsPDFConstructor = jsPDFModule.default || jsPDFModule;
} catch {
  // Node.js environment - use dynamic import
  jsPDFConstructor = null;
}

interface ValuationData {
  valuation: any;
  industryData: any;
}

export async function generateValuationPDF({ valuation, industryData }: ValuationData) {
  // Handle dynamic import for Node.js
  if (!jsPDFConstructor) {
    const jsPDFModule = await import('jspdf');
    jsPDFConstructor = jsPDFModule.default;
  }
  
  const doc = new jsPDFConstructor();
  let yPosition = 20;
  
  // Modern brand colors - sophisticated palette
  const primaryBlue = [15, 23, 42]; // Deep slate
  const accentBlue = [99, 102, 241]; // Modern indigo
  const premiumGold = [245, 158, 11]; // Premium gold accent
  const modernTeal = [20, 184, 166]; // Contemporary teal
  const lightGray = [248, 250, 252]; // Background gray
  const darkGray = [30, 41, 59]; // Text gray
  const ultraLight = [250, 251, 252]; // Ultra light background
  
  // Enhanced helper functions
  const addText = (text: string, x: number, y: number, fontSize: number = 12, maxWidth: number = 170, color: number[] = darkGray) => {
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * fontSize * 0.4);
  };
  
  // Add a colored rectangle background
  const addBackground = (x: number, y: number, width: number, height: number, color: number[] = lightGray) => {
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(x, y, width, height, 'F');
  };
  
  // Add a modern gradient-style section header
  const addSectionHeader = (title: string, y: number) => {
    // Modern gradient effect with multiple layers
    addBackground(15, y - 5, 180, 16, primaryBlue);
    addBackground(16, y - 4, 178, 14, accentBlue);
    
    // Add subtle accent line
    doc.setDrawColor(premiumGold[0], premiumGold[1], premiumGold[2]);
    doc.setLineWidth(2);
    doc.line(20, y + 12, 190, y + 12);
    
    // White text with better positioning
    doc.setFont('helvetica', 'bold');
    addText(title, 22, y + 4, 13, 170, [255, 255, 255]);
    return y + 20;
  };
  
  // Add a modern data box with sophisticated styling
  const addDataBox = (label: string, value: string, x: number, y: number, width: number = 80, accent: boolean = false) => {
    // Modern card design with shadow effect
    const bgColor = accent ? [237, 233, 254] : ultraLight;
    const borderColor = accent ? accentBlue : [226, 232, 240];
    
    addBackground(x, y - 3, width, 18, bgColor);
    
    // Modern border with rounded corner effect
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
    doc.setLineWidth(1);
    doc.rect(x, y - 3, width, 18);
    
    // Accent strip for premium look
    if (accent) {
      addBackground(x, y - 3, 4, 18, premiumGold);
    }
    
    // Label with modern typography
    doc.setFont('helvetica', 'bold');
    addText(label, x + (accent ? 8 : 4), y + 1, 8, width - 8, [100, 116, 139]);
    
    // Value with emphasis
    doc.setFont('helvetica', 'bold');
    const valueColor = accent ? accentBlue : primaryBlue;
    return addText(value, x + (accent ? 8 : 4), y + 9, 12, width - 8, valueColor);
  };
  
  // Helper function for new page with header
  const checkNewPage = (neededSpace: number = 20) => {
    if (yPosition + neededSpace > 270) {
      doc.addPage();
      yPosition = 20;
      // Add header on new page
      addPageHeader();
    }
  };
  
  // Add page header
  const addPageHeader = () => {
    doc.setFont('helvetica', 'normal');
    addText('ValuationGenie Professional Report', 20, 15, 10, 170, [150, 150, 150]);
    addText(`${valuation.businessName} | Page ${doc.getCurrentPageInfo().pageNumber}`, 140, 15, 10, 170, [150, 150, 150]);
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 18, 190, 18);
    yPosition = 25;
  };
  
  // Ultra-Modern Cover Page Design - Premium & Sophisticated
  
  // Modern geometric background pattern
  for (let i = 0; i < 8; i++) {
    const opacity = 0.05 + (i * 0.01);
    const shade = Math.floor(240 + (i * 2));
    addBackground(15 + i, 20 + i, 180 - (i * 2), 260 - (i * 2), [shade, shade + 5, shade + 10]);
  }
  
  // Premium header with gradient effect
  addBackground(15, 25, 180, 60, primaryBlue);
  addBackground(16, 26, 178, 58, [25, 35, 65]);
  
  // Logo area with geometric accent
  addBackground(20, 30, 8, 50, premiumGold);
  addBackground(32, 30, 2, 50, modernTeal);
  
  // Modern title design
  doc.setFont('helvetica', 'bold');
  addText('VALUATION', 40, 45, 36, 150, [255, 255, 255]);
  addText('GENIE', 40, 65, 36, 150, premiumGold);
  
  // Sophisticated subtitle
  doc.setFont('helvetica', 'normal');
  addText('PROFESSIONAL BUSINESS VALUATION REPORT', 40, 75, 12, 150, [200, 200, 220]);
  
  // Business name with modern styling
  yPosition = 110;
  addBackground(15, yPosition, 180, 35, ultraLight);
  addBackground(15, yPosition, 6, 35, modernTeal);
  
  doc.setFont('helvetica', 'bold');
  addText(valuation.businessName || 'Business Name', 25, yPosition + 12, 24, 165, primaryBlue);
  addText('CONFIDENTIAL VALUATION ANALYSIS', 25, yPosition + 28, 10, 165, [100, 116, 139]);
  
  // Modern metrics display
  yPosition += 50;
  const valuationRange = `$${parseInt(valuation.valuationLow || 0).toLocaleString()} - $${parseInt(valuation.valuationHigh || 0).toLocaleString()}`;
  
  // Featured valuation with premium styling
  addBackground(15, yPosition, 180, 45, [15, 23, 42]);
  addBackground(16, yPosition + 1, 178, 43, [25, 35, 65]);
  
  // Gold accent line
  addBackground(20, yPosition + 5, 160, 3, premiumGold);
  
  doc.setFont('helvetica', 'bold');
  addText('ESTIMATED BUSINESS VALUE', 25, yPosition + 18, 12, 155, [200, 200, 220]);
  addText(valuationRange, 25, yPosition + 35, 20, 155, [255, 255, 255]);
  
  // Professional details in modern card format
  yPosition += 60;
  const detailsData = [
    ['Industry Sector', valuation.industry || 'N/A'],
    ['Report Date', new Date().toLocaleDateString()],
    ['Analysis Type', valuation.buyerOrSeller === 'buying' ? 'Acquisition Due Diligence' : 'Market Valuation Analysis'],
    ['Report ID', `VG-${Date.now().toString().slice(-6)}`]
  ];
  
  detailsData.forEach(([label, value], index) => {
    const x = 20 + (index % 2) * 85;
    const y = yPosition + Math.floor(index / 2) * 25;
    addDataBox(label, value, x, y, 80, index === 0);
  });
  
  // Premium confidentiality notice
  yPosition += 70;
  addBackground(15, yPosition, 180, 30, [239, 68, 68]);
  addBackground(16, yPosition + 1, 178, 28, [220, 38, 38]);
  
  // Warning icon effect
  addBackground(25, yPosition + 8, 12, 12, [255, 255, 255]);
  doc.setFont('helvetica', 'bold');
  addText('!', 30, yPosition + 16, 14, 10, [220, 38, 38]);
  
  addText('CONFIDENTIAL & PROPRIETARY', 45, yPosition + 12, 12, 135, [255, 255, 255]);
  addText('This report contains confidential business information and is intended solely for authorized recipients.', 45, yPosition + 22, 9, 135, [255, 200, 200]);
  
  // Start new page for content
  doc.addPage();
  yPosition = 20;
  addPageHeader();
  
  // 1. Executive Summary with ultra-modern design
  yPosition = addSectionHeader('📊 EXECUTIVE SUMMARY', yPosition);
  yPosition += 5;
  
  // Key metrics in data boxes
  const valuationLow = parseInt(valuation.valuationLow || 0);
  const valuationHigh = parseInt(valuation.valuationHigh || 0);
  const sdeValue = parseInt(valuation.sde || 0);
  
  // Hero valuation showcase with premium styling
  addBackground(15, yPosition, 180, 35, primaryBlue);
  addBackground(16, yPosition + 1, 178, 33, [25, 35, 65]);
  
  // Gold accent strip
  addBackground(20, yPosition + 5, 170, 2, premiumGold);
  
  doc.setFont('helvetica', 'bold');
  addText('ESTIMATED BUSINESS VALUE', 25, yPosition + 15, 12, 150, [200, 200, 220]);
  addText(`$${valuationLow.toLocaleString()} - $${valuationHigh.toLocaleString()}`, 25, yPosition + 28, 18, 150, [255, 255, 255]);
  yPosition += 45;
  
  // Modern metrics grid
  addDataBox('Annual SDE', `$${sdeValue.toLocaleString()}`, 20, yPosition, 85, true);
  addDataBox('ROI Multiple', `${valuation.industryMultiplier}x`, 110, yPosition, 75, true);
  yPosition += 25;
  
  addDataBox('Industry Sector', valuation.industry || 'N/A', 20, yPosition, 85);
  addDataBox('Years Operating', `${valuation.yearsInBusiness || 'N/A'} years`, 110, yPosition, 75);
  yPosition += 25;
  
  // Investment highlights with sophisticated modern design
  addBackground(15, yPosition, 180, 50, ultraLight);
  addBackground(15, yPosition, 6, 50, modernTeal);
  
  // Modern accent elements
  addBackground(25, yPosition + 5, 160, 1, premiumGold);
  
  doc.setFont('helvetica', 'bold');
  addText('💎 INVESTMENT HIGHLIGHTS', 25, yPosition + 12, 12, 155, primaryBlue);
  
  doc.setFont('helvetica', 'normal');
  const highlights = `This ${valuation.industry || 'service-based'} business represents a compelling investment opportunity with proven cash flow generation. With ${valuation.yearsInBusiness || 'several'} years of market presence, the company has established strong operational foundations and customer relationships in ${valuation.location || 'its target market'}.`;
  yPosition = addText(highlights, 25, yPosition + 22, 10, 155, darkGray);
  
  const valuationSummary = `Our comprehensive analysis using industry-standard SDE methodology indicates a fair market valuation between $${valuationLow.toLocaleString()} and $${valuationHigh.toLocaleString()}, reflecting current market dynamics and intrinsic business value.`;
  addText(valuationSummary, 25, yPosition + 3, 10, 155, darkGray);
  
  yPosition += 35;
  
  checkNewPage(60);
  
  // 2. Business Overview with ultra-modern layout
  yPosition = addSectionHeader('🏢 BUSINESS OVERVIEW', yPosition);
  yPosition += 5;
  
  // Modern business description card
  addBackground(15, yPosition, 180, 35, [237, 233, 254]);
  addBackground(15, yPosition, 8, 35, accentBlue);
  
  // Premium accent line
  addBackground(27, yPosition + 8, 160, 2, premiumGold);
  
  doc.setFont('helvetica', 'bold');
  addText('COMPANY PROFILE', 27, yPosition + 15, 11, 160, primaryBlue);
  
  doc.setFont('helvetica', 'normal');
  const businessDesc = `${valuation.businessName || 'The Company'} is a distinguished ${valuation.industry || 'service-based'} enterprise with ${valuation.yearsInBusiness || 'proven'} years of market expertise. Operating primarily in ${valuation.location || 'strategic markets'}, the organization has cultivated strong customer relationships and established sustainable competitive advantages through consistent service excellence and operational efficiency.`;
  addText(businessDesc, 27, yPosition + 22, 9, 160, darkGray);
  yPosition += 45;
  
  // Key business attributes in two-column layout
  const leftColData = [
    ['Ownership Structure', valuation.ownershipStructure || 'Private Company'],
    ['Geographic Market', valuation.customerGeography || 'Local/Regional'],
    ['Customer Base', valuation.customerBase || 'Diversified']
  ];
  
  const rightColData = [
    ['Employee Count', valuation.employeeCount || 'Small Team'],
    ['Market Position', 'Established'],
    ['Growth Potential', valuation.growthPotential || 'Stable']
  ];
  
  // Left column
  leftColData.forEach(([label, value], index) => {
    addDataBox(label, value, 20, yPosition + (index * 22), 80);
  });
  
  // Right column
  rightColData.forEach(([label, value], index) => {
    addDataBox(label, value, 110, yPosition + (index * 22), 80);
  });
  
  yPosition += 75;
  
  checkNewPage(80);
  
  // 3. Financial Highlights with ultra-modern dashboard design
  yPosition = addSectionHeader('💰 FINANCIAL ANALYSIS', yPosition);
  yPosition += 5;
  
  // Modern financial dashboard header
  addBackground(15, yPosition, 180, 30, modernTeal);
  addBackground(16, yPosition + 1, 178, 28, [14, 165, 147]);
  
  // Performance indicator accent
  addBackground(25, yPosition + 8, 160, 2, [255, 255, 255]);
  
  doc.setFont('helvetica', 'bold');
  addText('FINANCIAL PERFORMANCE DASHBOARD', 25, yPosition + 15, 12, 155, [255, 255, 255]);
  addText('Strong fundamentals with sustainable cash flow generation', 25, yPosition + 24, 9, 155, [200, 250, 240]);
  yPosition += 40;
  
  // Key financial metrics with modern KPI cards
  const currentRevenue = parseInt(valuation.annualRevenue || valuation.revenue || 0);
  const currentSDE = parseInt(valuation.sde || 0);
  const margin = currentRevenue > 0 ? ((currentSDE / currentRevenue) * 100).toFixed(1) : '0';
  
  // Premium KPI metrics with accent styling
  addDataBox('Annual Revenue', `$${currentRevenue.toLocaleString()}`, 20, yPosition, 55, true);
  addDataBox('Annual SDE', `$${currentSDE.toLocaleString()}`, 80, yPosition, 55, true);
  addDataBox('SDE Margin', `${margin}%`, 140, yPosition, 50, true);
  yPosition += 30;
  
  // Financial table with enhanced styling
  doc.setFont('helvetica', 'bold');
  addText('Historical Financial Data', 20, yPosition, 12, 170, primaryBlue);
  yPosition += 15;
  
  // Table header with background
  addBackground(20, yPosition - 3, 170, 12, primaryBlue);
  doc.setFont('helvetica', 'bold');
  addText('Metric', 25, yPosition + 3, 10, 40, [255, 255, 255]);
  addText('Current Year', 70, yPosition + 3, 10, 40, [255, 255, 255]);
  addText('Growth Rate', 120, yPosition + 3, 10, 40, [255, 255, 255]);
  addText('Industry Avg', 165, yPosition + 3, 10, 25, [255, 255, 255]);
  yPosition += 15;
  
  // Financial data table rows with alternating background
  doc.setFont('helvetica', 'normal');
  const financialRows = [
    ['Revenue', `$${currentRevenue.toLocaleString()}`, 'Stable', 'Industry Avg'],
    ['SDE', `$${currentSDE.toLocaleString()}`, `${margin}%`, 'Above Avg'],
    ['Gross Margin', `${margin}%`, 'Stable', '25-35%']
  ];
  
  financialRows.forEach(([metric, current, growth, industry], index) => {
    // Alternating row backgrounds
    if (index % 2 === 0) {
      addBackground(20, yPosition - 3, 170, 12, [249, 250, 251]);
    }
    
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text(metric, 25, yPosition + 3);
    doc.text(current, 70, yPosition + 3);
    doc.text(growth, 120, yPosition + 3); 
    doc.text(industry, 165, yPosition + 3);
    yPosition += 12;
  });
  yPosition += 15;
  
  checkNewPage(100);
  
  // 4. Valuation Methodology with premium design
  yPosition = addSectionHeader('🎯 VALUATION METHODOLOGY', yPosition);
  yPosition += 5;
  
  // Ultra-modern methodology showcase
  addBackground(15, yPosition, 180, 40, [254, 243, 199]);
  addBackground(15, yPosition, 8, 40, premiumGold);
  
  // Professional accent elements
  addBackground(27, yPosition + 8, 160, 1, primaryBlue);
  addBackground(27, yPosition + 28, 160, 1, primaryBlue);
  
  doc.setFont('helvetica', 'bold');
  addText('SDE MULTIPLE METHODOLOGY', 27, yPosition + 15, 12, 160, primaryBlue);
  
  doc.setFont('helvetica', 'normal');
  const methodologyText = `Our valuation employs the industry-leading Seller's Discretionary Earnings (SDE) multiple approach - the gold standard for service-based business valuations. This methodology captures the total economic benefit available to a single owner-operator, ensuring comprehensive value assessment.`;
  addText(methodologyText, 27, yPosition + 22, 9, 160, darkGray);
  yPosition += 50;
  
  // Calculation breakdown with styled boxes
  const multiple = parseFloat(valuation.industryMultiple || '2.5');
  const baseSDE = currentSDE;
  const baseValue = baseSDE * multiple;
  
  // Modern calculation showcase with step-by-step premium design
  addDataBox('Annual SDE', `$${baseSDE.toLocaleString()}`, 20, yPosition, 80, true);
  addDataBox('Industry Multiple', `${multiple}x`, 110, yPosition, 75, true);
  yPosition += 25;
  
  // Mathematical operator styling
  doc.setFont('helvetica', 'bold');
  addText('×', 95, yPosition - 10, 16, 10, premiumGold);
  
  addDataBox('Base Valuation', `$${parseInt(baseValue.toString()).toLocaleString()}`, 20, yPosition, 80);  
  addDataBox('Market Adjustment', '±10-15%', 110, yPosition, 75);
  yPosition += 25;
  
  // Ultra-premium final valuation showcase
  addBackground(15, yPosition, 180, 40, primaryBlue);
  addBackground(16, yPosition + 1, 178, 38, [25, 35, 65]);
  
  // Sophisticated accent design
  addBackground(20, yPosition + 8, 170, 3, premiumGold);
  addBackground(25, yPosition + 15, 160, 1, modernTeal);
  
  doc.setFont('helvetica', 'bold');
  addText('FINAL VALUATION RANGE', 25, yPosition + 20, 14, 165, [255, 255, 255]);
  addText(`$${valuationLow.toLocaleString()} - $${valuationHigh.toLocaleString()}`, 25, yPosition + 32, 18, 165, premiumGold);
  yPosition += 50;
  
  checkNewPage(80);
  
  // 5. Risk Assessment & Value Drivers with sophisticated design
  yPosition = addSectionHeader('⚖️ INVESTMENT ANALYSIS', yPosition);
  yPosition += 5;
  
  // Modern value drivers showcase
  addBackground(15, yPosition, 180, 55, [236, 253, 245]);
  addBackground(15, yPosition, 8, 55, [34, 197, 94]);
  
  // Premium accent elements
  addBackground(27, yPosition + 8, 160, 2, [34, 197, 94]);
  
  doc.setFont('helvetica', 'bold');
  addText('💎 KEY VALUE DRIVERS', 27, yPosition + 15, 12, 155, [22, 163, 74]);
  
  doc.setFont('helvetica', 'normal');
  const drivers = [
    '✓ Proven customer retention & recurring revenue streams',
    '✓ Robust cash flow generation with healthy margins',
    '✓ Established market position & competitive moats',
    '✓ Scalable operations with documented processes'
  ];
  
  let tempY = yPosition + 25;
  drivers.forEach(driver => {
    addText(driver, 30, tempY, 9, 155, darkGray);
    tempY += 8;
  });
  yPosition += 65;
  
  // Modern risk assessment with professional styling
  addBackground(15, yPosition, 180, 55, [254, 242, 242]);
  addBackground(15, yPosition, 8, 55, [239, 68, 68]);
  
  // Warning accent design
  addBackground(27, yPosition + 8, 160, 2, [239, 68, 68]);
  
  doc.setFont('helvetica', 'bold');
  addText('⚠️ RISK CONSIDERATIONS', 27, yPosition + 15, 12, 155, [220, 38, 38]);
  
  doc.setFont('helvetica', 'normal');
  const risks = [
    '⚠ Key person dependency in operations & client relations',
    '⚠ Market competition & pricing pressures',
    '⚠ Economic sensitivity & industry cyclicality',
    '⚠ Economic sensitivity and market conditions'
  ];
  
  tempY = yPosition + 18;
  risks.forEach(risk => {
    addText(risk, 25, tempY, 10, 165, darkGray);
    tempY += 8;
  });
  yPosition += 60;
  
  // Risk metrics in data boxes
  addDataBox('Customer Concentration', valuation.customerConcentration || 'Moderate', 20, yPosition, 85);
  addDataBox('Owner Involvement', valuation.ownerInvolvement || '40+ hrs/week', 110, yPosition, 75);
  yPosition += 30;
  
  checkNewPage(60);
  
  // 6. Market & Industry Analysis  
  yPosition = addSectionHeader('6. MARKET & INDUSTRY ANALYSIS', yPosition);
  yPosition += 5;
  
  // Industry overview box
  addBackground(15, yPosition, 180, 30, [240, 249, 255]);
  doc.setDrawColor(59, 130, 246);
  doc.rect(15, yPosition, 180, 30);
  
  doc.setFont('helvetica', 'bold');
  addText(`${valuation.industry} Industry Overview`, 20, yPosition + 8, 12, 170, accentBlue);
  
  doc.setFont('helvetica', 'normal');
  const industryDesc = `The ${valuation.industry} sector demonstrates consistent performance with typical SDE multiples ranging from ${multiple}x to ${(multiple + 1).toFixed(1)}x. Market conditions support stable valuations for established businesses.`;
  addText(industryDesc, 20, yPosition + 18, 10, 170, darkGray);
  yPosition += 40;
  
  // Market metrics
  addDataBox('Industry Multiple', `${multiple}x`, 20, yPosition, 85);
  addDataBox('Market Outlook', 'Stable', 110, yPosition, 75);
  yPosition += 30;
  
  // Market trends with professional styling
  doc.setFont('helvetica', 'bold');
  addText('Key Market Trends', 20, yPosition, 12, 170, primaryBlue);
  yPosition += 10;
  
  const trends = [
    'Digital transformation driving service demand',
    'Increased focus on operational efficiency', 
    'Growing importance of customer experience',
    'Market consolidation opportunities'
  ];
  
  doc.setFont('helvetica', 'normal');
  trends.forEach(trend => {
    addText(`• ${trend}`, 25, yPosition, 10, 170, darkGray);
    yPosition += 8;
  });
  yPosition += 15;
  
  checkNewPage(60);
  
  // 7. Strategic Recommendations with enhanced styling
  yPosition = addSectionHeader('7. STRATEGIC RECOMMENDATIONS', yPosition);
  yPosition += 5;
  
  if (valuation.buyerOrSeller === 'selling') {
    // For Sellers - styled recommendations
    addBackground(15, yPosition, 180, 55, [255, 251, 235]);
    doc.setDrawColor(251, 191, 36);
    doc.rect(15, yPosition, 180, 55);
    
    doc.setFont('helvetica', 'bold');
    addText('Recommendations for Sellers', 20, yPosition + 8, 12, 170, [146, 64, 14]);
    
    doc.setFont('helvetica', 'normal');
    const sellerRecs = [
      '→ Document all operational processes and procedures',
      '→ Reduce owner dependency through staff training',
      '→ Diversify customer base to minimize concentration risk',
      '→ Strengthen financial recordkeeping and reporting'
    ];
    
    let recY = yPosition + 18;
    sellerRecs.forEach(rec => {
      addText(rec, 25, recY, 10, 165, darkGray);
      recY += 8;
    });
    yPosition += 65;
  } else {
    // For Buyers - styled recommendations
    addBackground(15, yPosition, 180, 55, [240, 249, 255]);
    doc.setDrawColor(59, 130, 246);
    doc.rect(15, yPosition, 180, 55);
    
    doc.setFont('helvetica', 'bold');
    addText('Recommendations for Buyers', 20, yPosition + 8, 12, 170, accentBlue);
    
    doc.setFont('helvetica', 'normal');
    const buyerRecs = [
      '→ Conduct thorough due diligence on financials',
      '→ Verify customer relationships and contracts',
      '→ Assess transition risks and owner involvement',
      '→ Evaluate growth potential and scalability'
    ];
    
    let recY = yPosition + 18;
    buyerRecs.forEach(rec => {
      addText(rec, 25, recY, 10, 165, darkGray);
      recY += 8;
    });
    yPosition += 65;
  }
  
  checkNewPage(40);
  
  // 8. Supporting Data with professional styling
  yPosition = addSectionHeader('8. SUPPORTING DATA & METHODOLOGY', yPosition);
  yPosition += 5;
  
  // Data sources section
  addBackground(15, yPosition, 180, 40, [248, 250, 252]);
  doc.setDrawColor(148, 163, 184);
  doc.rect(15, yPosition, 180, 40);
  
  doc.setFont('helvetica', 'bold');
  addText('Data Sources & Validation', 20, yPosition + 8, 12, 170, [71, 85, 105]);
  
  doc.setFont('helvetica', 'normal');
  const dataSources = [
    '✓ Comprehensive business questionnaire responses',
    '✓ Industry-standard SDE multiples and benchmarks',
    '✓ Market research and industry analysis',
    '✓ Financial performance indicators and ratios'
  ];
  
  let sourceY = yPosition + 18;
  dataSources.forEach(source => {
    addText(source, 25, sourceY, 10, 165, darkGray);
    sourceY += 6;
  });
  yPosition += 50;
  
  checkNewPage(50);
  
  // Professional conclusion
  yPosition = addSectionHeader('CONCLUSION', yPosition);
  yPosition += 5;
  
  addBackground(15, yPosition, 180, 40, [240, 253, 244]);
  doc.setDrawColor(34, 197, 94);
  doc.rect(15, yPosition, 180, 40);
  
  doc.setFont('helvetica', 'bold');
  addText('Valuation Summary', 20, yPosition + 8, 12, 170, [22, 163, 74]);
  
  doc.setFont('helvetica', 'normal');
  const conclusionText = `Based on comprehensive analysis, ${valuation.businessName} is valued between $${valuationLow.toLocaleString()} and $${valuationHigh.toLocaleString()}. This valuation reflects current market conditions, industry standards, and business-specific factors.`;
  addText(conclusionText, 20, yPosition + 18, 10, 165, darkGray);
  yPosition += 50;
  
  // Professional disclaimer
  addBackground(15, yPosition, 180, 50, [254, 242, 242]);
  doc.setDrawColor(239, 68, 68);
  doc.rect(15, yPosition, 180, 50);
  
  doc.setFont('helvetica', 'bold');
  addText('Important Disclaimer', 20, yPosition + 8, 12, 170, [220, 38, 38]);
  
  doc.setFont('helvetica', 'normal');
  const disclaimerText = 'This valuation is for informational purposes only and does not constitute a formal business appraisal. Results are based on user-provided data and industry benchmarks. ValuationGenie recommends consulting with qualified professionals before making business decisions.';
  addText(disclaimerText, 20, yPosition + 18, 9, 165, darkGray);
  
  // Footer with contact information
  yPosition += 60;
  doc.setFont('helvetica', 'italic');
  addText('Generated by ValuationGenie - Professional Business Valuation Platform', 20, yPosition, 9, 170, [100, 116, 139]);
  addText(`Report ID: ${valuation.id?.substring(0, 8) || 'VG' + Date.now()}`, 20, yPosition + 8, 8, 170, [100, 116, 139]);
  
  return doc;
}