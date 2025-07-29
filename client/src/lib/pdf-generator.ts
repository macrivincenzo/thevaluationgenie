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
  
  // Helper function to add text with automatic line breaks
  const addText = (text: string, x: number, y: number, fontSize: number = 12, maxWidth: number = 170) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * fontSize * 0.35);
  };
  
  // Helper function for new page if needed
  const checkNewPage = (neededSpace: number = 20) => {
    if (yPosition + neededSpace > 270) {
      doc.addPage();
      yPosition = 20;
    }
  };
  
  // Cover Page
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  yPosition = addText('ValuationGenie', 20, yPosition, 24);
  yPosition = addText('Business Valuation Report', 20, yPosition + 10, 20);
  
  // Date and confidentiality
  doc.setFont('helvetica', 'normal');
  yPosition = addText(`Report Date: ${new Date().toLocaleDateString()}`, 20, yPosition + 20, 12);
  yPosition = addText('CONFIDENTIAL', 20, yPosition + 10, 14);
  yPosition = addText('This report is confidential and intended solely for the recipient.', 20, yPosition + 5, 10);
  
  // Add some space before next section
  yPosition += 20;
  checkNewPage(60);
  
  // 1. Executive Summary
  doc.setFont('helvetica', 'bold');
  yPosition = addText('1. EXECUTIVE SUMMARY', 20, yPosition, 16);
  doc.setFont('helvetica', 'normal');
  yPosition += 5;
  
  const executiveData = [
    ['Business Name:', valuation.businessName || 'N/A'],
    ['Industry:', valuation.industry || 'N/A'],
    ['Location:', valuation.location || 'N/A'],
    ['Valuation Range:', `$${parseInt(valuation.valuationLow || 0).toLocaleString()} - $${parseInt(valuation.valuationHigh || 0).toLocaleString()}`],
    ['Valuation Date:', new Date().toLocaleDateString()],
    ['Purpose:', valuation.buyerOrSeller === 'buying' ? 'Acquisition Analysis' : 'Sale Preparation']
  ];
  
  executiveData.forEach(([label, value]) => {
    yPosition = addText(`${label} ${value}`, 25, yPosition, 11);
    yPosition += 5;
  });
  
  // Key takeaway
  const sdeValue = parseInt(valuation.sde || 0);
  const takeaway = `This ${valuation.industry} business demonstrates strong fundamentals with SDE of $${sdeValue.toLocaleString()}, resulting in a valuation range of $${parseInt(valuation.valuationLow || 0).toLocaleString()} to $${parseInt(valuation.valuationHigh || 0).toLocaleString()}.`;
  yPosition = addText(`Key Takeaway: ${takeaway}`, 25, yPosition + 5, 11);
  yPosition += 15;
  
  checkNewPage(60);
  
  // 2. Business Overview
  doc.setFont('helvetica', 'bold');
  yPosition = addText('2. BUSINESS OVERVIEW', 20, yPosition, 16);
  doc.setFont('helvetica', 'normal');
  yPosition += 5;
  
  const businessData = [
    ['Business Description:', `A ${valuation.industry} business operating in ${valuation.location || 'the local market'}.`],
    ['Years in Operation:', `${valuation.yearsInBusiness || 'N/A'} years`],
    ['Ownership Structure:', valuation.ownershipStructure || 'N/A'],
    ['Geographic Market:', valuation.customerGeography || 'Local/Regional'],
    ['Competitive Advantage:', valuation.competitiveAdvantage || 'Established customer base and operational expertise']
  ];
  
  businessData.forEach(([label, value]) => {
    yPosition = addText(`${label} ${value}`, 25, yPosition, 11);
    yPosition += 5;
  });
  yPosition += 10;
  
  checkNewPage(80);
  
  // 3. Financial Highlights
  doc.setFont('helvetica', 'bold');
  yPosition = addText('3. FINANCIAL HIGHLIGHTS', 20, yPosition, 16);
  doc.setFont('helvetica', 'normal');
  yPosition += 10;
  
  // Create financial table
  const revenue = Array.isArray(valuation.annualRevenue) ? 
    valuation.annualRevenue : 
    (typeof valuation.annualRevenue === 'string' ? JSON.parse(valuation.annualRevenue) : [valuation.annualRevenue || 0]);
  const sde = Array.isArray(valuation.sdeData) ? 
    valuation.sdeData : 
    (typeof valuation.sde === 'string' ? JSON.parse(valuation.sde) : [valuation.sde || 0]);
  
  // Financial table headers
  doc.setFont('helvetica', 'bold');
  yPosition = addText('Year', 25, yPosition, 11);
  doc.text('Revenue', 70, yPosition);
  doc.text('SDE', 120, yPosition);
  doc.text('Margin %', 160, yPosition);
  yPosition += 8;
  
  // Table data
  doc.setFont('helvetica', 'normal');
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < 3; i++) {
    const year = currentYear - i;
    const rev = revenue[i] || 0;
    const sdeVal = sde[i] || 0;
    const margin = rev > 0 ? ((sdeVal / rev) * 100).toFixed(1) : '0.0';
    
    doc.text(year.toString(), 25, yPosition);
    doc.text(`$${parseInt(rev).toLocaleString()}`, 70, yPosition);
    doc.text(`$${parseInt(sdeVal).toLocaleString()}`, 120, yPosition);
    doc.text(`${margin}%`, 160, yPosition);
    yPosition += 6;
  }
  yPosition += 10;
  
  checkNewPage(100);
  
  // 4. Valuation Calculation
  doc.setFont('helvetica', 'bold');
  yPosition = addText('4. VALUATION CALCULATION', 20, yPosition, 16);
  doc.setFont('helvetica', 'normal');
  yPosition += 10;
  
  const multiple = parseFloat(valuation.industryMultiple || '2.5');
  const baseSDE = sde[0] || sdeValue || 0;
  const baseValue = baseSDE * multiple;
  
  // Calculation table
  doc.setFont('helvetica', 'bold');
  yPosition = addText('Item', 25, yPosition, 11);
  doc.text('Value', 120, yPosition);
  yPosition += 8;
  
  doc.setFont('helvetica', 'normal');
  const calcData = [
    ['SDE (Current Year)', `$${parseInt(baseSDE).toLocaleString()}`],
    ['Industry Multiple', `${multiple}x`],
    ['Base Value', `$${parseInt(baseValue.toString()).toLocaleString()}`],
    ['Adjustments', '+/- 10%'],
    ['Final Value Range', `$${parseInt(valuation.valuationLow || 0).toLocaleString()} - $${parseInt(valuation.valuationHigh || 0).toLocaleString()}`]
  ];
  
  calcData.forEach(([item, value]) => {
    doc.text(item, 25, yPosition);
    doc.text(value, 120, yPosition);
    yPosition += 6;
  });
  yPosition += 15;
  
  checkNewPage(80);
  
  // 5. Key Value Drivers & Risks
  doc.setFont('helvetica', 'bold');
  yPosition = addText('5. KEY VALUE DRIVERS & RISKS', 20, yPosition, 16);
  doc.setFont('helvetica', 'normal');
  yPosition += 10;
  
  yPosition = addText('Top Value Drivers:', 25, yPosition, 12);
  yPosition += 5;
  const drivers = [
    'Established customer relationships',
    'Recurring revenue streams',
    'Strong market position'
  ];
  drivers.forEach(driver => {
    yPosition = addText(`• ${driver}`, 30, yPosition, 10);
    yPosition += 4;
  });
  
  yPosition += 5;
  yPosition = addText('Top Risks:', 25, yPosition, 12);
  yPosition += 5;
  const risks = [
    'Owner dependency for operations',
    'Customer concentration risk',
    'Market competition pressure'
  ];
  risks.forEach(risk => {
    yPosition = addText(`• ${risk}`, 30, yPosition, 10);
    yPosition += 4;
  });
  
  yPosition += 10;
  yPosition = addText(`Customer Concentration: ${valuation.customerConcentration || 'Moderate'}`, 25, yPosition, 11);
  yPosition += 5;
  yPosition = addText(`Owner Involvement: ${valuation.ownerInvolvement || '40+ hours/week'}`, 25, yPosition, 11);
  yPosition += 15;
  
  checkNewPage(60);
  
  // 6. Market & Industry Overview
  doc.setFont('helvetica', 'bold');
  yPosition = addText('6. MARKET & INDUSTRY OVERVIEW', 20, yPosition, 16);
  doc.setFont('helvetica', 'normal');
  yPosition += 10;
  
  yPosition = addText(`Industry: ${valuation.industry}`, 25, yPosition, 11);
  yPosition += 5;
  yPosition = addText(`Typical SDE Multiple Range: ${industryData?.multiple || multiple}x`, 25, yPosition, 11);
  yPosition += 5;
  yPosition = addText('Market Trends:', 25, yPosition, 11);
  yPosition += 5;
  
  const trends = [
    'Increasing demand for digital solutions',
    'Focus on operational efficiency',
    'Growing importance of customer retention'
  ];
  trends.forEach(trend => {
    yPosition = addText(`• ${trend}`, 30, yPosition, 10);
    yPosition += 4;
  });
  yPosition += 15;
  
  checkNewPage(60);
  
  // 7. Recommendations
  doc.setFont('helvetica', 'bold');
  yPosition = addText('7. RECOMMENDATIONS', 20, yPosition, 16);
  doc.setFont('helvetica', 'normal');
  yPosition += 10;
  
  if (valuation.buyerOrSeller === 'selling') {
    yPosition = addText('For Sellers:', 25, yPosition, 12);
    yPosition += 5;
    const sellerRecs = [
      'Document all operational processes',
      'Reduce owner dependency',
      'Diversify customer base'
    ];
    sellerRecs.forEach(rec => {
      yPosition = addText(`• ${rec}`, 30, yPosition, 10);
      yPosition += 4;
    });
  } else {
    yPosition = addText('For Buyers:', 25, yPosition, 12);
    yPosition += 5;
    const buyerRecs = [
      'Verify all financial statements',
      'Assess customer relationships',
      'Plan transition strategy'
    ];
    buyerRecs.forEach(rec => {
      yPosition = addText(`• ${rec}`, 30, yPosition, 10);
      yPosition += 4;
    });
  }
  yPosition += 15;
  
  checkNewPage(40);
  
  // 8. Supporting Data
  doc.setFont('helvetica', 'bold');
  yPosition = addText('8. SUPPORTING DATA', 20, yPosition, 16);
  doc.setFont('helvetica', 'normal');
  yPosition += 10;
  
  yPosition = addText('Data Sources:', 25, yPosition, 11);
  yPosition += 5;
  yPosition = addText('• User-provided questionnaire responses', 30, yPosition, 10);
  yPosition += 4;
  yPosition = addText('• Industry standard multiples', 30, yPosition, 10);
  yPosition += 4;
  if (valuation.uploadedFiles?.length > 0) {
    yPosition = addText('• Uploaded financial documents', 30, yPosition, 10);
    yPosition += 4;
  }
  yPosition += 15;
  
  checkNewPage(30);
  
  // 9. Disclaimer
  doc.setFont('helvetica', 'bold');
  yPosition = addText('9. DISCLAIMER', 20, yPosition, 16);
  doc.setFont('helvetica', 'normal');
  yPosition += 10;
  
  const disclaimerText = 'This valuation is for informational purposes only and is not a formal appraisal. The results are based on user-provided data and industry averages. ValuationGenie and its affiliates are not responsible for decisions made based on this report. Please consult with qualified professionals before making any business decisions.';
  yPosition = addText(disclaimerText, 25, yPosition, 10, 160);
  
  return doc;
}