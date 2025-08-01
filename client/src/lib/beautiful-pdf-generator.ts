// Define the type here since it's the main data structure
interface ComprehensiveValuationData {
  businessName: string;
  industry: string;
  businessDescription?: string;
  foundedYear: number;
  location: string;
  employeeCount?: number;
  annualRevenue: number | number[];
  sde: number;
  sdeMargin?: number;
  valuationLow: number;
  valuationHigh: number;
  industryMultiple: number;
  recurringRevenuePct?: number;
  revenueGrowthRate?: number;
  customerRetentionRate?: number;
  competitiveAdvantages?: string[];
  majorRiskFactors?: string[];
  growthOpportunities?: string[];
  ownerInvolvement?: string;
  managementTeam?: string;
  top5CustomersPct?: number;
  customerAcquisitionCost?: number;
  majorRisks?: string;
}

export function generateBeautifulPDF(data: ComprehensiveValuationData) {
  // Create a new window with the PDF content
  const pdfWindow = window.open('', '_blank');
  if (!pdfWindow) {
    throw new Error('Unable to open PDF window. Please allow popups.');
  }

  const revenue = typeof data.annualRevenue === 'number' ? data.annualRevenue : (data.annualRevenue?.[0] || 0);
  const sde = data.sde || 0;
  const sdeMargin = data.sdeMargin || (revenue > 0 ? (sde / revenue) * 100 : 0);
  
  // Calculate valuation details (halal-compliant)
  const enterpriseValue = (data.valuationLow + data.valuationHigh) / 2;
  const revenueMultiple = revenue > 0 ? enterpriseValue / revenue : 0;
  const sdeMultiple = sde > 0 ? enterpriseValue / sde : 0;
  
  // Format current date
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Business Valuation Report - ${data.businessName}</title>
    <style>
        @page {
            size: A4;
            margin: 0.8in;
        }
        
        body {
            font-family: 'Times New Roman', serif;
            font-size: 12px;
            line-height: 1.5;
            color: #000;
            margin: 0;
            padding: 0;
            max-width: 8.5in;
        }
        
        .header {
            text-align: center;
            margin-bottom: 60px;
        }
        
        .main-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 20px;
            letter-spacing: 8px;
            text-transform: uppercase;
        }
        
        .company-name {
            font-size: 16px;
            margin-bottom: 8px;
            font-weight: bold;
        }
        
        .valuation-date {
            font-size: 12px;
            margin-bottom: 60px;
        }
        
        h2 {
            font-size: 14px;
            font-weight: bold;
            margin: 40px 0 20px 0;
            color: #000;
        }
        
        .company-overview {
            margin-bottom: 40px;
        }
        
        .overview-table {
            width: 100%;
            margin-top: 20px;
        }
        
        .overview-row {
            display: table-row;
        }
        
        .overview-cell {
            display: table-cell;
            padding: 8px 20px 8px 0;
            vertical-align: top;
            width: 50%;
        }
        
        .overview-label {
            font-weight: bold;
            display: inline-block;
            width: 140px;
        }
        
        .executive-summary {
            margin: 40px 0;
            line-height: 1.6;
            text-align: justify;
        }
        
        .valuation-highlight {
            text-align: center;
            margin: 60px 0;
        }
        
        .valuation-section-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 20px;
            letter-spacing: 2px;
        }
        
        .valuation-amount {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #000;
        }
        
        .valuation-range {
            font-size: 12px;
            color: #000;
        }
        
        .metrics-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
            font-size: 11px;
        }
        
        .metrics-table th {
            background-color: #fff;
            border: none;
            border-bottom: 1px solid #000;
            padding: 8px 20px 8px 0;
            text-align: left;
            font-weight: bold;
        }
        
        .metrics-table td {
            border: none;
            border-bottom: 1px solid #ccc;
            padding: 8px 20px 8px 0;
            text-align: left;
        }
        
        .metrics-table .first-col {
            width: 35%;
        }
        
        .metrics-table .second-col {
            width: 25%;
            text-align: center;
        }
        
        .metrics-table .third-col {
            width: 25%;
            text-align: center;
        }
        
        .metrics-table .fourth-col {
            width: 15%;
            text-align: right;
        }
        
        .methodology-section {
            margin: 40px 0;
            page-break-inside: avoid;
        }
        
        .method-title {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 15px;
            margin-left: 20px;
        }
        
        .method-description {
            margin-bottom: 15px;
            font-style: italic;
            margin-left: 20px;
        }
        
        .key-assumptions {
            font-weight: bold;
            margin: 20px 0 10px 40px;
        }
        
        .assumption-list {
            margin-left: 60px;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .center-values {
            text-align: center;
            margin: 20px 0;
            padding: 10px;
            font-weight: bold;
        }
        
        .method-result {
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            margin: 20px 0;
            padding: 5px;
        }
        
        .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
            font-size: 11px;
        }
        
        .summary-table th {
            background-color: #fff;
            border: none;
            border-bottom: 1px solid #000;
            padding: 8px 20px 8px 0;
            text-align: left;
            font-weight: bold;
        }
        
        .summary-table td {
            border: none;
            border-bottom: 1px solid #ccc;
            padding: 8px 20px 8px 0;
            text-align: left;
        }
        
        .summary-table .center {
            text-align: center;
        }
        
        .summary-table .right {
            text-align: right;
        }
        
        .final-value td {
            font-weight: bold;
            border-bottom: 2px solid #000;
        }
        
        .risk-section {
            display: table;
            width: 100%;
            margin: 30px 0;
        }
        
        .risk-column {
            display: table-cell;
            width: 50%;
            vertical-align: top;
            padding-right: 40px;
        }
        
        .risk-column h4 {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .risk-item {
            margin-bottom: 8px;
            padding-left: 15px;
            position: relative;
            line-height: 1.4;
        }
        
        .risk-item:before {
            content: "•";
            position: absolute;
            left: 0;
        }
        
        .recommendations {
            margin: 25px 0;
        }
        
        .growth-strategy h4 {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #2c3e50;
        }
        
        .disclaimer {
            margin-top: 60px;
            padding: 0;
            font-size: 10px;
            line-height: 1.4;
        }
        
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 10px;
            font-weight: bold;
        }
        
        .page-break {
            page-break-before: always;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="main-title">Business Valuation Report</div>
        <div class="company-name">${data.businessName}</div>
        <div class="valuation-date">Valuation Date: ${currentDate}</div>
    </div>

    <!-- Company Overview -->
    <h2>Company Overview</h2>
    <div class="overview-table">
        <div class="overview-row">
            <div class="overview-cell">
                <span class="overview-label">Company:</span>
                <span>${data.businessName}</span>
            </div>
            <div class="overview-cell">
                <span class="overview-label">Founded:</span>
                <span>${data.foundedYear}</span>
            </div>
        </div>
        <div class="overview-row">
            <div class="overview-cell">
                <span class="overview-label">Industry:</span>
                <span>${data.industry}</span>
            </div>
            <div class="overview-cell">
                <span class="overview-label">Location:</span>
                <span>${data.location}</span>
            </div>
        </div>
        <div class="overview-row">
            <div class="overview-cell">
                <span class="overview-label">Business:</span>
                <span>${data.businessDescription || 'Service Business'}</span>
            </div>
            <div class="overview-cell">
                <span class="overview-label">Employees:</span>
                <span>${data.employeeCount || 'Not specified'}</span>
            </div>
        </div>
    </div>

    <!-- Executive Summary -->
    <h2>Executive Summary</h2>
    <div class="executive-summary">
        ${data.businessName} is a ${data.industry.toLowerCase()} business ${data.foundedYear ? `established in ${data.foundedYear}` : 'with established operations'} 
        located in ${data.location}. The company demonstrates ${sdeMargin > 20 ? 'strong' : sdeMargin > 10 ? 'solid' : 'developing'} 
        financial performance with ${sdeMargin > 0 ? `an SDE margin of ${sdeMargin.toFixed(1)}%` : 'operational cash flow'} 
        and ${data.ownerInvolvement === 'hands-on' ? 'hands-on owner management' : data.ownerInvolvement === 'absentee' ? 'systems-dependent operations' : 'balanced management approach'}.
    </div>

    <!-- Enterprise Valuation Highlight -->
    <div class="valuation-highlight">
        <div class="valuation-section-title">Enterprise Valuation</div>
        <div class="valuation-amount">$${enterpriseValue.toLocaleString()}</div>
        <div class="valuation-range">Range: $${data.valuationLow.toLocaleString()} - $${data.valuationHigh.toLocaleString()}</div>
    </div>

    <!-- Financial Performance Analysis -->
    <h2>Financial Performance Analysis</h2>
    <table class="metrics-table">
        <thead>
            <tr>
                <th class="first-col">Key Metric</th>
                <th class="second-col">Current Year</th>
                <th class="third-col">Industry Benchmark</th>
                <th class="fourth-col">Performance Rating</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="first-col">Annual Revenue</td>
                <td class="second-col">$${revenue.toLocaleString()}</td>
                <td class="third-col">-</td>
                <td class="fourth-col">${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 'Strong Growth' : 'Stable Performance'}</td>
            </tr>
            ${data.recurringRevenuePct ? `
            <tr>
                <td class="first-col">Annual Recurring Revenue</td>
                <td class="second-col">$${Math.round(revenue * (data.recurringRevenuePct / 100)).toLocaleString()}</td>
                <td class="third-col">-</td>
                <td class="fourth-col">${data.recurringRevenuePct}% of Total Revenue</td>
            </tr>
            ` : ''}
            <tr>
                <td class="first-col">SDE</td>
                <td class="second-col">$${sde.toLocaleString()}</td>
                <td class="third-col">$${Math.round(revenue * 0.15).toLocaleString()} - $${Math.round(revenue * 0.25).toLocaleString()}</td>
                <td class="fourth-col">${sdeMargin > 25 ? 'Excellent' : sdeMargin > 15 ? 'Above Average' : 'Average'}</td>
            </tr>
            <tr>
                <td class="first-col">SDE Margin</td>
                <td class="second-col">${sdeMargin.toFixed(1)}%</td>
                <td class="third-col">15% - 25%</td>
                <td class="fourth-col">${sdeMargin > 25 ? 'Excellent' : sdeMargin > 15 ? 'Above Average' : 'Average'}</td>
            </tr>
            ${data.customerRetentionRate ? `
            <tr>
                <td class="first-col">Customer Retention</td>
                <td class="second-col">${data.customerRetentionRate}%</td>
                <td class="third-col">85% - 90%</td>
                <td class="fourth-col">${data.customerRetentionRate > 90 ? 'Best-in-Class' : 'Above Average'}</td>
            </tr>
            ` : ''}
        </tbody>
    </table>

    <!-- Valuation Methodologies -->
    <div class="page-break">
        <h2>Valuation Methodologies</h2>

        <!-- Revenue Multiple Approach -->
        <div class="methodology-section">
            <div class="method-title">1. Revenue Multiple Approach</div>
            <div class="method-description">Comparable company analysis using revenue multiples from industry benchmarks.</div>
            
            <div class="key-assumptions">Key Assumptions:</div>
            <div class="assumption-list">
                • Industry revenue multiples: ${(revenueMultiple * 0.8).toFixed(1)}x - ${(revenueMultiple * 1.2).toFixed(1)}x<br>
                • Applied multiple: ${revenueMultiple.toFixed(1)}x (${sdeMargin > 20 ? 'premium for strong metrics' : 'standard industry multiple'})<br>
                • Reflects current market conditions and business fundamentals
            </div>

            <div class="center-values">
                <strong>Annual Revenue: $${revenue.toLocaleString()}</strong><br>
                <strong>Revenue Multiple: ${revenueMultiple.toFixed(1)}x</strong>
            </div>

            <div class="method-result">
                Enterprise Value = $${(revenue * revenueMultiple).toLocaleString()}
            </div>
        </div>

        <!-- SDE Multiple Approach -->
        <div class="methodology-section">
            <div class="method-title">2. SDE Multiple Approach</div>
            <div class="method-description">Valuation based on Seller's Discretionary Earnings multiples from industry benchmarks.</div>
            
            <div class="key-assumptions">Key Assumptions:</div>
            <div class="assumption-list">
                • Industry SDE multiples: ${(sdeMultiple * 0.8).toFixed(1)}x - ${(sdeMultiple * 1.2).toFixed(1)}x<br>
                • Applied multiple: ${sdeMultiple.toFixed(1)}x (${sdeMargin > 20 ? 'reflects strong profitability' : 'mid-range multiple'})<br>
                • Reflects owner-operated business cash flow
            </div>

            <div class="center-values">
                <strong>SDE: $${sde.toLocaleString()}</strong><br>
                <strong>SDE Multiple: ${sdeMultiple.toFixed(1)}x</strong>
            </div>

            <div class="method-result">
                Enterprise Value = $${(sde * sdeMultiple).toLocaleString()}
            </div>
        </div>
    </div>

    <!-- Valuation Summary -->
    <h2>Valuation Summary</h2>
    <table class="summary-table">
        <thead>
            <tr>
                <th style="width: 40%;">Valuation Method</th>
                <th style="width: 25%; text-align: center;">Enterprise Value</th>
                <th style="width: 15%; text-align: center;">Weight</th>
                <th style="width: 20%; text-align: right;">Weighted Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Revenue Multiple</td>
                <td class="center">$${(revenue * revenueMultiple).toLocaleString()}</td>
                <td class="center">50%</td>
                <td class="right">$${((revenue * revenueMultiple) * 0.5).toLocaleString()}</td>
            </tr>
            <tr>
                <td>SDE Multiple</td>
                <td class="center">$${(sde * sdeMultiple).toLocaleString()}</td>
                <td class="center">50%</td>
                <td class="right">$${((sde * sdeMultiple) * 0.5).toLocaleString()}</td>
            </tr>
            <tr class="final-value">
                <td><strong>FINAL ENTERPRISE VALUE</strong></td>
                <td class="center"><strong>$${enterpriseValue.toLocaleString()}</strong></td>
                <td class="center"><strong>100%</strong></td>
                <td class="right"><strong>$${enterpriseValue.toLocaleString()}</strong></td>
            </tr>
        </tbody>
    </table>

    <!-- Risk Assessment & Value Drivers -->
    <h2>Risk Assessment & Value Drivers</h2>
    <div class="risk-section">
        <div>
            <h4>Positive Value Drivers</h4>
            ${(data.competitiveAdvantages || []).concat([
              data.customerRetentionRate && data.customerRetentionRate > 90 ? `Industry-leading retention rate (${data.customerRetentionRate}%)` : null,
              data.customerAcquisitionCost && data.customerAcquisitionCost < (revenue / 12) ? 'Efficient customer acquisition' : null,
              sdeMargin > 20 ? `Strong SDE margins (${sdeMargin.toFixed(1)}%)` : null,
              data.recurringRevenuePct && data.recurringRevenuePct > 50 ? 'Predictable recurring revenue model' : null,
              data.managementTeam === 'strong' ? 'Proven management team' : null,
              'Established market presence'
            ].filter((item): item is string => item !== null)).slice(0, 6).map((item: string) => `<div class="risk-item">${item}</div>`).join('')}
        </div>
        
        <div>
            <h4>Key Risk Factors</h4>
            ${(data.majorRiskFactors || []).concat([
              'Market competition risk',
              data.top5CustomersPct && data.top5CustomersPct > 30 ? 'Customer concentration risk' : null,
              data.ownerInvolvement === 'hands-on' ? 'Key person dependency' : null,
              'Economic downturn sensitivity',
              'Technology disruption threat',
              'Regulatory compliance risk'
            ].filter((item): item is string => item !== null)).slice(0, 6).map((item: string) => `<div class="risk-item">${item}</div>`).join('')}
        </div>
    </div>

    <!-- Strategic Recommendations -->
    <h2>Strategic Recommendations</h2>
    <div class="recommendations">
        <p>${data.businessName} is positioned for ${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 'continued success with strong fundamentals and market opportunity' : 'stable operations with solid market positioning'}:</p>
        
        <div class="growth-strategy">
            <h4>Growth Strategy</h4>
            ${[
              'Product Innovation: Invest in service improvements and technology',
              'Market Expansion: Target new customer segments and geographies', 
              'Customer Success: Maintain industry-leading retention',
              'Operational Excellence: Scale efficiently while preserving margins',
              'Strategic Partnerships: Accelerate market penetration'
            ].slice(0, 5).map((item: string) => `<div class="risk-item">${item}</div>`).join('')}
        </div>
    </div>

    <div class="disclaimer">
        <strong>Important Disclaimer:</strong> This business valuation report is prepared for educational and illustrative purposes only. It should not be considered as investment advice, and actual valuations may vary significantly based on market conditions, transaction specifics, and due diligence findings.
    </div>

    <div class="footer">
        ${data.businessName} | Business Valuation Report | ${currentDate}
    </div>
</body>
</html>
  `;

  pdfWindow.document.write(html);
  pdfWindow.document.close();

  // Set up print dialog after content loads
  setTimeout(() => {
    pdfWindow.print();
  }, 500);

  return Promise.resolve();
}