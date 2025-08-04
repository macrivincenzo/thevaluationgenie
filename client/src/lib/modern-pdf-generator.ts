import { jsPDF } from 'jspdf';

export interface ValuationData {
  id: string;
  businessName: string;
  industry: string;
  location: string;
  annualRevenue: string;
  sdeAmount: string;
  foundedYear: string;
  valuationLow: string;
  valuationHigh: string;
  multiple?: number;
}

export function generateModernPDF(valuation: ValuationData): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Colors
  const primaryBlue = '#1e40af';
  const lightBlue = '#3b82f6';
  const darkGray = '#1f2937';
  const lightGray = '#6b7280';
  const green = '#059669';
  const orange = '#ea580c';
  
  // Helper function to add centered text
  const addCenteredText = (text: string, y: number, fontSize: number, color: string = darkGray) => {
    doc.setFontSize(fontSize);
    doc.setTextColor(color);
    const textWidth = doc.getTextWidth(text);
    doc.text(text, (pageWidth - textWidth) / 2, y);
  };

  // Header with gradient effect (using rectangles)
  doc.setFillColor('#1e40af');
  doc.rect(0, 0, pageWidth, 50, 'F');
  doc.setFillColor('#3b82f6');
  doc.rect(0, 40, pageWidth, 10, 'F');
  
  // Company logo area (placeholder)
  doc.setFillColor('#ffffff');
  doc.rect(15, 10, 30, 30, 'F');
  doc.setFontSize(12);
  doc.setTextColor('#1e40af');
  doc.text('VALUATION', 17, 22);
  doc.text('GENIE', 17, 32);
  
  // Main title
  doc.setFontSize(24);
  doc.setTextColor('#ffffff');
  doc.text('BUSINESS VALUATION REPORT', 55, 25);
  
  // Subtitle
  doc.setFontSize(14);
  doc.text('Professional Enterprise Analysis', 55, 35);

  // Company name banner
  doc.setFillColor('#f8fafc');
  doc.rect(0, 60, pageWidth, 25, 'F');
  doc.setFillColor('#1e40af');
  doc.rect(0, 60, 5, 25, 'F');
  
  doc.setFontSize(20);
  doc.setTextColor('#1e40af');
  doc.text(valuation.businessName.toUpperCase(), 15, 75);
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor('#6b7280');
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  doc.text(`Valuation Date: ${currentDate}`, pageWidth - 80, 75);

  // Main valuation box
  const centerVal = (parseInt(valuation.valuationLow) + parseInt(valuation.valuationHigh)) / 2;
  const boxY = 100;
  
  // Valuation highlight box
  doc.setFillColor('#059669');
  doc.rect(20, boxY, pageWidth - 40, 45, 'F');
  
  // Inner white box
  doc.setFillColor('#ffffff');
  doc.rect(25, boxY + 5, pageWidth - 50, 35, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor('#059669');
  addCenteredText('ENTERPRISE VALUATION', boxY + 15, 12, '#059669');
  
  doc.setFontSize(28);
  doc.setTextColor('#1f2937');
  addCenteredText(`$${centerVal.toLocaleString()}`, boxY + 28, 28);
  
  doc.setFontSize(11);
  doc.setTextColor('#6b7280');
  addCenteredText(`Range: $${parseInt(valuation.valuationLow).toLocaleString()} - $${parseInt(valuation.valuationHigh).toLocaleString()}`, boxY + 35, 11);
  
  // Company overview section
  let currentY = 170;
  
  // Section header
  doc.setFillColor('#1e40af');
  doc.rect(20, currentY, pageWidth - 40, 15, 'F');
  doc.setFontSize(14);
  doc.setTextColor('#ffffff');
  doc.text('COMPANY OVERVIEW', 25, currentY + 10);
  
  currentY += 25;
  
  // Overview grid
  const leftCol = 25;
  const rightCol = pageWidth / 2 + 10;
  
  doc.setFontSize(11);
  doc.setTextColor('#1f2937');
  
  // Left column
  doc.setFont('helvetica', 'bold');
  doc.text('Company:', leftCol, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(valuation.businessName || 'N/A', leftCol + 25, currentY);
  
  currentY += 12;
  doc.setFont('helvetica', 'bold');
  doc.text('Industry:', leftCol, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(valuation.industry || 'N/A', leftCol + 25, currentY);
  
  currentY += 12;
  doc.setFont('helvetica', 'bold');
  doc.text('Location:', leftCol, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(valuation.location || 'N/A', leftCol + 25, currentY);
  
  // Right column
  currentY -= 24;
  doc.setFont('helvetica', 'bold');
  doc.text('Founded:', rightCol, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(valuation.foundedYear || 'N/A', rightCol + 25, currentY);
  
  currentY += 12;
  doc.setFont('helvetica', 'bold');
  doc.text('Revenue:', rightCol, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(`$${parseInt(valuation.annualRevenue || '0').toLocaleString()}`, rightCol + 25, currentY);
  
  currentY += 12;
  doc.setFont('helvetica', 'bold');
  doc.text('SDE:', rightCol, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(`$${parseInt(valuation.sdeAmount || '0').toLocaleString()}`, rightCol + 25, currentY);
  
  // Executive Summary
  currentY += 25;
  doc.setFillColor('#f1f5f9');
  doc.rect(20, currentY, pageWidth - 40, 45, 'F');
  doc.setFillColor('#3b82f6');
  doc.rect(20, currentY, 5, 45, 'F');
  
  doc.setFontSize(13);
  doc.setTextColor('#1e40af');
  doc.setFont('helvetica', 'bold');
  doc.text('EXECUTIVE SUMMARY', 30, currentY + 12);
  
  doc.setFontSize(10);
  doc.setTextColor('#374151');
  doc.setFont('helvetica', 'normal');
  
  const sdeMargin = ((parseInt(valuation.sdeAmount || '0') / parseInt(valuation.annualRevenue || '1')) * 100).toFixed(1);
  const summaryText = `${valuation.businessName || 'Business'} is an established ${valuation.industry || 'business'} generating $${parseInt(valuation.annualRevenue || '0').toLocaleString()} in annual revenue with SDE of $${parseInt(valuation.sdeAmount || '0').toLocaleString()} (${sdeMargin}% margin). The business demonstrates strong operational efficiency and presents attractive investment characteristics for potential buyers.`;
  
  const splitText = doc.splitTextToSize(summaryText, pageWidth - 60);
  doc.text(splitText, 30, currentY + 22);

  // Add new page for detailed analysis
  doc.addPage();
  
  // Second page header
  doc.setFillColor('#f8fafc');
  doc.rect(0, 0, pageWidth, 30, 'F');
  doc.setFillColor('#1e40af');
  doc.rect(0, 0, pageWidth, 5, 'F');
  
  doc.setFontSize(14);
  doc.setTextColor('#1e40af');
  doc.text(`${valuation.businessName || 'Business'} - Detailed Analysis`, 20, 20);
  
  // Financial metrics table
  currentY = 50;
  
  doc.setFillColor('#1e40af');
  doc.rect(20, currentY, pageWidth - 40, 15, 'F');
  doc.setFontSize(14);
  doc.setTextColor('#ffffff');
  doc.text('FINANCIAL PERFORMANCE', 25, currentY + 10);
  
  currentY += 20;
  
  // Table headers
  doc.setFillColor('#e2e8f0');
  doc.rect(20, currentY, pageWidth - 40, 12, 'F');
  
  doc.setFontSize(11);
  doc.setTextColor('#1f2937');
  doc.setFont('helvetica', 'bold');
  doc.text('Metric', 25, currentY + 8);
  doc.text('Amount', 80, currentY + 8);
  doc.text('Performance', 130, currentY + 8);
  
  currentY += 15;
  
  // Revenue row
  doc.setFont('helvetica', 'normal');
  doc.text('Annual Revenue', 25, currentY);
  doc.text(`$${parseInt(valuation.annualRevenue || '0').toLocaleString()}`, 80, currentY);
  doc.setTextColor('#059669');
  doc.text('Strong', 130, currentY);
  
  currentY += 12;
  doc.setTextColor('#1f2937');
  doc.text('SDE', 25, currentY);
  doc.text(`$${parseInt(valuation.sdeAmount || '0').toLocaleString()}`, 80, currentY);
  doc.setTextColor('#059669');
  doc.text('Excellent', 130, currentY);
  
  currentY += 12;
  doc.setTextColor('#1f2937');
  doc.text('SDE Margin', 25, currentY);
  doc.text(`${sdeMargin}%`, 80, currentY);
  doc.setTextColor('#059669');
  doc.text('Outstanding', 130, currentY);
  
  // Valuation methodology
  currentY += 30;
  
  doc.setFillColor('#1e40af');
  doc.rect(20, currentY, pageWidth - 40, 15, 'F');
  doc.setFontSize(14);
  doc.setTextColor('#ffffff');
  doc.text('VALUATION METHODOLOGY', 25, currentY + 10);
  
  currentY += 25;
  
  doc.setFontSize(11);
  doc.setTextColor('#1f2937');
  doc.setFont('helvetica', 'bold');
  doc.text('SDE Multiple Approach:', 25, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(`Industry-standard multiplier for ${valuation.industry || 'business'} businesses`, 25, currentY + 10);
  
  const multiple = valuation.multiple || (centerVal / parseInt(valuation.sdeAmount || '1'));
  doc.text(`Applied Multiple: ${multiple.toFixed(1)}x`, 25, currentY + 20);
  doc.text(`Calculation: SDE ($${parseInt(valuation.sdeAmount || '0').toLocaleString()}) × Multiple (${multiple.toFixed(1)}x) = $${centerVal.toLocaleString()}`, 25, currentY + 30);
  
  // Risk factors and drivers (side by side)
  currentY += 50;
  
  // Positive drivers
  doc.setFillColor('#dcfce7');
  doc.rect(20, currentY, (pageWidth - 50) / 2, 60, 'F');
  doc.setFillColor('#059669');
  doc.rect(20, currentY, (pageWidth - 50) / 2, 8, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor('#ffffff');
  doc.text('VALUE DRIVERS', 25, currentY + 6);
  
  doc.setFontSize(10);
  doc.setTextColor('#059669');
  doc.text(`✓ Strong SDE margin (${sdeMargin}%)`, 25, currentY + 18);
  doc.text('✓ Established market presence', 25, currentY + 28);
  doc.text('✓ Proven business model', 25, currentY + 38);
  doc.text('✓ Growth potential', 25, currentY + 48);
  
  // Risk factors
  const rightBoxX = pageWidth / 2 + 5;
  doc.setFillColor('#fef2f2');
  doc.rect(rightBoxX, currentY, (pageWidth - 50) / 2, 60, 'F');
  doc.setFillColor('#dc2626');
  doc.rect(rightBoxX, currentY, (pageWidth - 50) / 2, 8, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor('#ffffff');
  doc.text('RISK FACTORS', rightBoxX + 5, currentY + 6);
  
  doc.setFontSize(10);
  doc.setTextColor('#dc2626');
  doc.text('⚠ Market competition', rightBoxX + 5, currentY + 18);
  doc.text('⚠ Economic sensitivity', rightBoxX + 5, currentY + 28);
  doc.text('⚠ Technology changes', rightBoxX + 5, currentY + 38);
  doc.text('⚠ Key person dependency', rightBoxX + 5, currentY + 48);
  
  // Footer
  currentY = pageHeight - 40;
  doc.setFillColor('#f1f5f9');
  doc.rect(0, currentY, pageWidth, 40, 'F');
  
  doc.setFontSize(8);
  doc.setTextColor('#6b7280');
  doc.text('IMPORTANT DISCLAIMER: This valuation is for informational purposes only and should not replace professional appraisal services.', 20, currentY + 10);
  doc.text('For official valuations for legal, tax, or transaction purposes, consult with a certified business appraiser.', 20, currentY + 18);
  
  // Footer branding
  doc.setFontSize(10);
  doc.setTextColor('#1e40af');
  addCenteredText(`${valuation.businessName || 'Business'} | Professional Business Valuation Report | ${currentDate}`, currentY + 30, 10);
  doc.setFontSize(8);
  addCenteredText('Generated by ValuationGenie | Confidential & Proprietary', currentY + 37, 8, '#6b7280');
  
  return doc;
}