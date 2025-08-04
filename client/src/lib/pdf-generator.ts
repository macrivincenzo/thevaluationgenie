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
  
  // Brand colors
  const primaryBlue = [30, 58, 138]; // Navy blue
  const accentBlue = [59, 130, 246]; // Light blue
  const lightGray = [248, 250, 252]; // Background gray
  const darkGray = [30, 41, 59]; // Text gray
  
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
  
  // Add a professional section header with background
  const addSectionHeader = (title: string, y: number) => {
    // Background rectangle
    addBackground(15, y - 5, 180, 12, primaryBlue);
    // White text on blue background
    doc.setFont('helvetica', 'bold');
    addText(title, 20, y + 3, 14, 170, [255, 255, 255]);
    return y + 15;
  };
  
  // Add a data box with label and value
  const addDataBox = (label: string, value: string, x: number, y: number, width: number = 80) => {
    // Light background
    addBackground(x, y - 3, width, 16, lightGray);
    // Border
    doc.setDrawColor(200, 200, 200);
    doc.rect(x, y - 3, width, 16);
    
    // Label (bold, smaller)
    doc.setFont('helvetica', 'bold');
    addText(label, x + 3, y + 2, 9, width - 6, darkGray);
    
    // Value (normal, larger)
    doc.setFont('helvetica', 'normal');
    return addText(value, x + 3, y + 8, 11, width - 6, primaryBlue);
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
  
  // Professional Cover Page with gradient effect
  // Main title with large font
  doc.setFont('helvetica', 'bold');
  yPosition = addText('ValuationGenie', 20, 35, 32, 170, primaryBlue);
  
  // Subtitle with accent color
  doc.setFont('helvetica', 'normal');
  yPosition = addText('Professional Business Valuation Report', 20, yPosition + 5, 18, 170, accentBlue);
  
  // Business name in large, prominent text
  addBackground(15, yPosition + 5, 180, 20, lightGray);
  doc.setFont('helvetica', 'bold');
  yPosition = addText(valuation.businessName || 'Business Name', 20, yPosition + 15, 20, 170, primaryBlue);
  
  // Professional details section
  yPosition += 25;
  addBackground(15, yPosition, 180, 35, [245, 247, 250]);
  doc.setDrawColor(200, 200, 200);
  doc.rect(15, yPosition, 180, 35);
  
  doc.setFont('helvetica', 'bold');
  addText('Report Details', 20, yPosition + 8, 12, 170, darkGray);
  
  doc.setFont('helvetica', 'normal');
  addText(`Industry: ${valuation.industry || 'N/A'}`, 20, yPosition + 18, 11, 80, darkGray);
  addText(`Report Date: ${new Date().toLocaleDateString()}`, 110, yPosition + 18, 11, 80, darkGray);
  addText(`Valuation Purpose: ${valuation.buyerOrSeller === 'buying' ? 'Acquisition Analysis' : 'Sale Preparation'}`, 20, yPosition + 28, 11, 170, darkGray);
  
  // Confidentiality notice with red accent
  yPosition += 50;
  addBackground(15, yPosition, 180, 25, [254, 242, 242]);
  doc.setDrawColor(239, 68, 68);
  doc.rect(15, yPosition, 180, 25);
  
  doc.setFont('helvetica', 'bold');
  addText('CONFIDENTIAL DOCUMENT', 20, yPosition + 8, 12, 170, [220, 38, 38]);
  doc.setFont('helvetica', 'normal');
  addText('This valuation report is confidential and intended solely for the recipient.', 20, yPosition + 18, 10, 170, [127, 29, 29]);
  
  // Start new page for content
  doc.addPage();
  yPosition = 20;
  addPageHeader();
  
  // 1. Executive Summary with professional styling
  yPosition = addSectionHeader('1. EXECUTIVE SUMMARY', yPosition);
  yPosition += 5;
  
  // Key metrics in data boxes
  const valuationLow = parseInt(valuation.valuationLow || 0);
  const valuationHigh = parseInt(valuation.valuationHigh || 0);
  const sdeValue = parseInt(valuation.sde || 0);
  
  // Top row of key metrics
  addDataBox('Business Value Range', `$${valuationLow.toLocaleString()} - $${valuationHigh.toLocaleString()}`, 20, yPosition, 85);
  addDataBox('Annual SDE', `$${sdeValue.toLocaleString()}`, 110, yPosition, 75);
  yPosition += 25;
  
  // Second row
  addDataBox('Industry', valuation.industry || 'N/A', 20, yPosition, 85);
  addDataBox('Years Operating', `${valuation.yearsInBusiness || 'N/A'} years`, 110, yPosition, 75);
  yPosition += 25;
  
  // Executive summary text with background
  addBackground(15, yPosition, 180, 45, [249, 250, 251]);
  doc.setDrawColor(200, 200, 200);
  doc.rect(15, yPosition, 180, 45);
  
  doc.setFont('helvetica', 'bold');
  addText('Investment Highlights', 20, yPosition + 8, 12, 170, primaryBlue);
  
  doc.setFont('helvetica', 'normal');
  const highlights = `This ${valuation.industry} business presents a compelling investment opportunity with consistent cash flow generation. The business demonstrates ${valuation.yearsInBusiness || 'several'} years of operational experience and has established a solid market position in ${valuation.location || 'its local market'}.`;
  yPosition = addText(highlights, 20, yPosition + 18, 11, 170, darkGray);
  
  const valuationSummary = `Based on industry-standard SDE multiples, the business valuation ranges from $${valuationLow.toLocaleString()} to $${valuationHigh.toLocaleString()}, reflecting current market conditions and business fundamentals.`;
  addText(valuationSummary, 20, yPosition + 3, 11, 170, darkGray);
  
  yPosition += 35;
  
  checkNewPage(60);
  
  // 2. Business Overview with structured layout
  yPosition = addSectionHeader('2. BUSINESS OVERVIEW', yPosition);
  yPosition += 5;
  
  // Business description in styled box
  addBackground(15, yPosition, 180, 30, [240, 249, 255]);
  doc.setDrawColor(147, 197, 253);
  doc.rect(15, yPosition, 180, 30);
  
  doc.setFont('helvetica', 'bold');
  addText('Business Description', 20, yPosition + 8, 11, 170, accentBlue);
  
  doc.setFont('helvetica', 'normal');
  const businessDesc = `${valuation.businessName} is a ${valuation.industry} business that has been serving customers for ${valuation.yearsInBusiness || 'several'} years. The company operates in ${valuation.location || 'the local market'} and has built a reputation for quality service and reliability.`;
  addText(businessDesc, 20, yPosition + 18, 10, 170, darkGray);
  yPosition += 40;
  
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
  
  // 3. Financial Highlights with professional table design
  yPosition = addSectionHeader('3. FINANCIAL HIGHLIGHTS', yPosition);
  yPosition += 5;
  
  // Financial performance overview
  addBackground(15, yPosition, 180, 25, [240, 253, 244]);
  doc.setDrawColor(34, 197, 94);
  doc.rect(15, yPosition, 180, 25);
  
  doc.setFont('helvetica', 'bold');
  addText('Financial Performance Summary', 20, yPosition + 8, 12, 170, [22, 163, 74]);
  
  doc.setFont('helvetica', 'normal');
  const financialSummary = `Strong financial fundamentals with consistent cash flow generation and healthy profit margins.`;
  addText(financialSummary, 20, yPosition + 18, 10, 170, darkGray);
  yPosition += 35;
  
  // Key financial metrics in styled boxes
  const currentRevenue = parseInt(valuation.annualRevenue || valuation.revenue || 0);
  const currentSDE = parseInt(valuation.sde || 0);
  const margin = currentRevenue > 0 ? ((currentSDE / currentRevenue) * 100).toFixed(1) : '0';
  
  // Financial metrics row
  addDataBox('Annual Revenue', `$${currentRevenue.toLocaleString()}`, 20, yPosition, 55);
  addDataBox('Annual SDE', `$${currentSDE.toLocaleString()}`, 80, yPosition, 55);
  addDataBox('SDE Margin', `${margin}%`, 140, yPosition, 50);
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
  
  // 4. Valuation Methodology with enhanced styling
  yPosition = addSectionHeader('4. VALUATION METHODOLOGY', yPosition);
  yPosition += 5;
  
  // Methodology explanation
  addBackground(15, yPosition, 180, 35, [255, 247, 237]);
  doc.setDrawColor(251, 146, 60);
  doc.rect(15, yPosition, 180, 35);
  
  doc.setFont('helvetica', 'bold');
  addText('SDE Multiple Approach', 20, yPosition + 8, 12, 170, [194, 65, 12]);
  
  doc.setFont('helvetica', 'normal');
  const methodologyText = `This valuation uses the Seller's Discretionary Earnings (SDE) multiple method, the industry standard for small business valuations. SDE represents the total financial benefit derived by one full-time owner-operator.`;
  addText(methodologyText, 20, yPosition + 18, 10, 170, darkGray);
  yPosition += 45;
  
  // Calculation breakdown with styled boxes
  const multiple = parseFloat(valuation.industryMultiple || '2.5');
  const baseSDE = currentSDE;
  const baseValue = baseSDE * multiple;
  
  // Calculation steps
  addDataBox('Annual SDE', `$${baseSDE.toLocaleString()}`, 20, yPosition, 80);
  addDataBox('Industry Multiple', `${multiple}x`, 110, yPosition, 75);
  yPosition += 25;
  
  addDataBox('Base Valuation', `$${parseInt(baseValue.toString()).toLocaleString()}`, 20, yPosition, 80);  
  addDataBox('Adjustment Range', '±10-15%', 110, yPosition, 75);
  yPosition += 25;
  
  // Final valuation range with prominent styling
  addBackground(15, yPosition, 180, 25, [240, 253, 244]);
  doc.setDrawColor(34, 197, 94);
  doc.rect(15, yPosition, 180, 25);
  
  doc.setFont('helvetica', 'bold');
  addText('Final Valuation Range', 20, yPosition + 8, 14, 170, [22, 163, 74]);
  addText(`$${valuationLow.toLocaleString()} - $${valuationHigh.toLocaleString()}`, 20, yPosition + 18, 16, 170, primaryBlue);
  yPosition += 35;
  
  checkNewPage(80);
  
  // 5. Risk Assessment & Value Drivers
  yPosition = addSectionHeader('5. RISK ASSESSMENT & VALUE DRIVERS', yPosition);
  yPosition += 5;
  
  // Value Drivers section with green styling
  addBackground(15, yPosition, 180, 50, [240, 253, 244]);
  doc.setDrawColor(34, 197, 94);
  doc.rect(15, yPosition, 180, 50);
  
  doc.setFont('helvetica', 'bold');
  addText('Key Value Drivers', 20, yPosition + 8, 12, 170, [22, 163, 74]);
  
  doc.setFont('helvetica', 'normal');
  const drivers = [
    '✓ Established customer relationships and repeat business',
    '✓ Consistent cash flow generation and profitability',
    '✓ Strong market position with competitive advantages',
    '✓ Operational systems and processes in place'
  ];
  
  let tempY = yPosition + 18;
  drivers.forEach(driver => {
    addText(driver, 25, tempY, 10, 165, darkGray);
    tempY += 8;
  });
  yPosition += 60;
  
  // Risk Factors section with red styling
  addBackground(15, yPosition, 180, 50, [254, 242, 242]);
  doc.setDrawColor(239, 68, 68);
  doc.rect(15, yPosition, 180, 50);
  
  doc.setFont('helvetica', 'bold');
  addText('Risk Factors', 20, yPosition + 8, 12, 170, [220, 38, 38]);
  
  doc.setFont('helvetica', 'normal');
  const risks = [
    '⚠ Owner dependency for key operations and decisions',
    '⚠ Customer concentration and retention risks',
    '⚠ Market competition and pricing pressure',
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