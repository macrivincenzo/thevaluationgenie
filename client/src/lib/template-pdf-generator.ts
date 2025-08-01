// Perfect template-matching PDF generator
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

export function generateTemplatePDF(data: ComprehensiveValuationData) {
  const pdfWindow = window.open('', '_blank');
  if (!pdfWindow) {
    throw new Error('Unable to open PDF window. Please allow popups.');
  }

  const revenue = typeof data.annualRevenue === 'number' ? data.annualRevenue : (data.annualRevenue?.[0] || 0);
  const sde = data.sde || 0;
  const sdeMargin = data.sdeMargin || (revenue > 0 ? (sde / revenue) * 100 : 0);
  const enterpriseValue = (data.valuationLow + data.valuationHigh) / 2;
  const revenueMultiple = revenue > 0 ? enterpriseValue / revenue : 0;
  const sdeMultiple = sde > 0 ? enterpriseValue / sde : 0;
  
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
            margin: 1in;
        }
        
        body {
            font-family: 'Times New Roman', serif;
            font-size: 12px;
            line-height: 1.6;
            color: #000;
            margin: 0;
            padding: 0;
            max-width: 100%;
        }
        
        .header {
            text-align: center;
            margin-bottom: 80px;
            page-break-inside: avoid;
        }
        
        .main-title {
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 8px;
            text-transform: uppercase;
            margin-bottom: 40px;
            line-height: 1.2;
        }
        
        .company-name {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .valuation-date {
            font-size: 12px;
            margin-bottom: 0;
        }
        
        h2 {
            font-size: 13px;
            font-weight: bold;
            margin: 50px 0 25px 0;
            color: #000;
            page-break-after: avoid;
        }
        
        .overview-section {
            margin-bottom: 50px;
        }
        
        .overview-grid {
            display: table;
            width: 100%;
            margin-top: 25px;
        }
        
        .overview-row {
            display: table-row;
        }
        
        .overview-cell {
            display: table-cell;
            padding: 10px 40px 10px 0;
            vertical-align: top;
            width: 50%;
        }
        
        .overview-label {
            font-weight: bold;
            display: inline-block;
            width: 120px;
            margin-right: 20px;
        }
        
        .executive-summary {
            margin: 50px 0;
            text-align: justify;
            line-height: 1.8;
        }
        
        .valuation-highlight {
            text-align: center;
            margin: 80px 0;
            page-break-inside: avoid;
        }
        
        .valuation-section-title {
            font-size: 13px;
            font-weight: bold;
            letter-spacing: 3px;
            margin-bottom: 30px;
        }
        
        .valuation-amount {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #000;
        }
        
        .valuation-range {
            font-size: 11px;
            color: #000;
        }
        
        .performance-table {
            width: 100%;
            border-collapse: collapse;
            margin: 40px 0;
            page-break-inside: avoid;
        }
        
        .performance-table th {
            background: none;
            border: none;
            border-bottom: 1px solid #000;
            padding: 12px 20px 12px 0;
            text-align: left;
            font-weight: bold;
            font-size: 11px;
        }
        
        .performance-table td {
            border: none;
            border-bottom: 1px solid #ccc;
            padding: 12px 20px 12px 0;
            text-align: left;
            font-size: 11px;
        }
        
        .col1 { width: 35%; }
        .col2 { width: 25%; text-align: center; }
        .col3 { width: 25%; text-align: center; }
        .col4 { width: 15%; text-align: right; }
        
        .methodology-title {
            font-size: 13px;
            font-weight: bold;
            margin: 60px 0 30px 0;
            text-align: center;
        }
        
        .method-section {
            margin: 40px 0;
            page-break-inside: avoid;
        }
        
        .method-number {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .method-description {
            font-style: italic;
            margin-bottom: 20px;
            color: #333;
        }
        
        .assumptions-title {
            font-weight: bold;
            margin: 20px 0 10px 20px;
        }
        
        .assumptions-list {
            margin-left: 40px;
            margin-bottom: 25px;
        }
        
        .assumption-item {
            margin-bottom: 5px;
            line-height: 1.5;
        }
        
        .calculation-box {
            text-align: center;
            margin: 25px 0;
            padding: 15px;
            background: #f9f9f9;
        }
        
        .calc-label {
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .calc-formula {
            font-size: 11px;
            margin-bottom: 10px;
        }
        
        .calc-result {
            font-size: 13px;
            font-weight: bold;
            color: #000;
        }
        
        .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin: 40px 0;
            page-break-inside: avoid;
        }
        
        .summary-table th {
            background: none;
            border: none;
            border-bottom: 1px solid #000;
            padding: 12px 20px 12px 0;
            text-align: left;
            font-weight: bold;
            font-size: 11px;
        }
        
        .summary-table td {
            border: none;
            border-bottom: 1px solid #ccc;
            padding: 12px 20px 12px 0;
            text-align: left;
            font-size: 11px;
        }
        
        .summary-final {
            border-bottom: 2px solid #000 !important;
            font-weight: bold;
        }
        
        .risk-assessment {
            margin: 60px 0;
            page-break-inside: avoid;
        }
        
        .risk-grid {
            display: table;
            width: 100%;
            margin-top: 30px;
        }
        
        .risk-column {
            display: table-cell;
            width: 50%;
            vertical-align: top;
            padding-right: 40px;
        }
        
        .risk-title {
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
            font-size: 12px;
        }
        
        .risk-item {
            margin-bottom: 10px;
            padding-left: 20px;
            position: relative;
            line-height: 1.5;
        }
        
        .risk-item:before {
            content: "•";
            position: absolute;
            left: 0;
        }
        
        .recommendations {
            margin: 60px 0;
        }
        
        .recommendations p {
            margin-bottom: 30px;
            text-align: justify;
            line-height: 1.7;
        }
        
        .growth-title {
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .growth-item {
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
            line-height: 1.5;
        }
        
        .growth-item:before {
            content: "•";
            position: absolute;
            left: 0;
        }
        
        .disclaimer {
            margin-top: 80px;
            font-size: 10px;
            line-height: 1.6;
            text-align: justify;
        }
        
        .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 10px;
            font-weight: bold;
            border-top: 1px solid #ccc;
            padding-top: 20px;
        }
        
        @media print {
            body { print-color-adjust: exact; }
            .page-break { page-break-before: always; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="main-title">BUSINESS VALUATION REPORT</div>
        <div class="company-name">${data.businessName}</div>
        <div class="valuation-date">Valuation Date: ${currentDate}</div>
    </div>

    <div class="overview-section">
        <h2>Company Overview</h2>
        <div class="overview-grid">
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
    </div>

    <div class="executive-summary">
        <h2>Executive Summary</h2>
        <p>${data.businessName} is ${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 'a rapidly growing' : 'an established'} ${data.industry} business ${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 'demonstrating strong financial performance' : 'with solid operational fundamentals'}. The company shows ${sdeMargin > 25 ? 'exceptional' : sdeMargin > 15 ? 'strong' : 'stable'} profitability with ${data.customerRetentionRate ? `a ${data.customerRetentionRate}% customer retention rate` : 'established customer relationships'} and ${data.ownerInvolvement === 'semi-absentee' ? 'efficient semi-absentee operations' : 'hands-on management oversight'}.</p>
    </div>

    <div class="valuation-highlight">
        <div class="valuation-section-title">Enterprise Valuation</div>
        <div class="valuation-amount">$${enterpriseValue.toLocaleString()}</div>
        <div class="valuation-range">Range: $${data.valuationLow.toLocaleString()} - $${data.valuationHigh.toLocaleString()}</div>
    </div>

    <h2>Financial Performance Analysis</h2>
    <table class="performance-table">
        <thead>
            <tr>
                <th class="col1">Key Metric</th>
                <th class="col2">Current Year</th>
                <th class="col3">Industry Benchmark</th>
                <th class="col4">Performance Rating</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col1">Annual Revenue</td>
                <td class="col2">$${revenue.toLocaleString()}</td>
                <td class="col3">-</td>
                <td class="col4">${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 'Strong Growth' : 'Stable Performance'}</td>
            </tr>
            ${data.recurringRevenuePct ? `
            <tr>
                <td class="col1">Annual Recurring Revenue</td>
                <td class="col2">$${Math.round(revenue * (data.recurringRevenuePct / 100)).toLocaleString()}</td>
                <td class="col3">-</td>
                <td class="col4">${data.recurringRevenuePct}% of Total Revenue</td>
            </tr>
            ` : ''}
            <tr>
                <td class="col1">SDE</td>
                <td class="col2">$${sde.toLocaleString()}</td>
                <td class="col3">$${Math.round(revenue * 0.15).toLocaleString()} - $${Math.round(revenue * 0.25).toLocaleString()}</td>
                <td class="col4">${sdeMargin > 25 ? 'Excellent' : sdeMargin > 15 ? 'Above Average' : 'Average'}</td>
            </tr>
            <tr>
                <td class="col1">SDE Margin</td>
                <td class="col2">${sdeMargin.toFixed(1)}%</td>
                <td class="col3">15% - 25%</td>
                <td class="col4">${sdeMargin > 25 ? 'Excellent' : sdeMargin > 15 ? 'Above Average' : 'Average'}</td>
            </tr>
            ${data.customerRetentionRate ? `
            <tr>
                <td class="col1">Customer Retention</td>
                <td class="col2">${data.customerRetentionRate}%</td>
                <td class="col3">85% - 90%</td>
                <td class="col4">${data.customerRetentionRate > 90 ? 'Best-in-Class' : 'Above Average'}</td>
            </tr>
            ` : ''}
        </tbody>
    </table>

    <div class="methodology-title">Valuation Methodologies</div>

    <div class="method-section">
        <div class="method-number">1. Revenue Multiple Approach</div>
        <div class="method-description">Comparable company analysis using revenue multiples from similar businesses.</div>
        
        <div class="assumptions-title">Key Assumptions:</div>
        <div class="assumptions-list">
            <div class="assumption-item">Industry revenue multiples: ${revenueMultiple.toFixed(1)}x - ${(revenueMultiple * 1.2).toFixed(1)}x</div>
            <div class="assumption-item">Applied multiple: ${revenueMultiple.toFixed(1)}x (based on performance metrics)</div>
            <div class="assumption-item">Justification: ${sdeMargin > 20 ? 'Superior' : 'Standard'} profitability and operational efficiency</div>
        </div>

        <div class="calculation-box">
            <div class="calc-label">Annual Revenue: $${revenue.toLocaleString()}</div>
            <div class="calc-label">Revenue Multiple: ${revenueMultiple.toFixed(1)}x</div>
            <div class="calc-result">Enterprise Value = $${(revenue * revenueMultiple).toLocaleString()}</div>
        </div>
    </div>

    <div class="method-section">
        <div class="method-number">2. SDE Multiple Approach</div>
        <div class="method-description">Valuation based on Seller's Discretionary Earnings multiples for similar businesses.</div>
        
        <div class="assumptions-title">Key Assumptions:</div>
        <div class="assumptions-list">
            <div class="assumption-item">SDE multiples: ${sdeMultiple.toFixed(1)}x - ${(sdeMultiple * 1.2).toFixed(1)}x</div>
            <div class="assumption-item">Applied multiple: ${sdeMultiple.toFixed(1)}x (industry standard)</div>
            <div class="assumption-item">Reflects strong cash flow generation and owner benefits</div>
        </div>

        <div class="calculation-box">
            <div class="calc-label">SDE: $${sde.toLocaleString()}</div>
            <div class="calc-label">SDE Multiple: ${sdeMultiple.toFixed(1)}x</div>
            <div class="calc-result">Enterprise Value = $${(sde * sdeMultiple).toLocaleString()}</div>
        </div>
    </div>

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
                <td style="text-align: center;">$${(revenue * revenueMultiple).toLocaleString()}</td>
                <td style="text-align: center;">50%</td>
                <td style="text-align: right;">$${((revenue * revenueMultiple) * 0.5).toLocaleString()}</td>
            </tr>
            <tr>
                <td>SDE Multiple</td>
                <td style="text-align: center;">$${(sde * sdeMultiple).toLocaleString()}</td>
                <td style="text-align: center;">50%</td>
                <td style="text-align: right;">$${((sde * sdeMultiple) * 0.5).toLocaleString()}</td>
            </tr>
            <tr class="summary-final">
                <td><strong>FINAL ENTERPRISE VALUE</strong></td>
                <td style="text-align: center;"><strong>$${enterpriseValue.toLocaleString()}</strong></td>
                <td style="text-align: center;"><strong>100%</strong></td>
                <td style="text-align: right;"><strong>$${enterpriseValue.toLocaleString()}</strong></td>
            </tr>
        </tbody>
    </table>

    <div class="risk-assessment">
        <h2>Risk Assessment & Value Drivers</h2>
        <div class="risk-grid">
            <div class="risk-column">
                <div class="risk-title">Positive Value Drivers</div>
                ${(data.competitiveAdvantages || []).concat([
                  data.customerRetentionRate && data.customerRetentionRate > 90 ? `Industry-leading retention rate (${data.customerRetentionRate}%)` : null,
                  sdeMargin > 20 ? `Strong SDE margins (${sdeMargin.toFixed(1)}%)` : null,
                  data.recurringRevenuePct && data.recurringRevenuePct > 50 ? 'Predictable recurring revenue model' : null,
                  data.ownerInvolvement === 'semi-absentee' ? 'Semi-absentee operation capability' : null,
                  'Established market presence'
                ].filter((item): item is string => item !== null)).slice(0, 6).map((item: string) => `<div class="risk-item">${item}</div>`).join('')}
            </div>
            
            <div class="risk-column">
                <div class="risk-title">Key Risk Factors</div>
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
    </div>

    <div class="recommendations">
        <h2>Strategic Recommendations</h2>
        <p>${data.businessName} is positioned for ${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 'continued success with strong fundamentals and market opportunity' : 'stable operations with solid market positioning'}:</p>
        
        <div class="growth-title">Growth Strategy</div>
        ${[
          'Product Innovation: Invest in service improvements and technology',
          'Market Expansion: Target new customer segments and geographies',
          'Customer Success: Maintain industry-leading retention',
          'Operational Excellence: Scale efficiently while preserving margins',
          'Strategic Partnerships: Accelerate market penetration'
        ].slice(0, 5).map((item: string) => `<div class="growth-item">${item}</div>`).join('')}
    </div>

    <div class="disclaimer">
        <strong>Important Disclaimer:</strong> This business valuation report is prepared for educational and illustrative purposes only. It should not be considered as investment advice, and actual valuations may vary significantly based on market conditions, transaction specifics, and due diligence findings.
    </div>

    <div class="footer">
        ${data.businessName} | Business Valuation Report | ${currentDate}
    </div>

    <script>
        window.onload = function() {
            window.print();
        };
    </script>
</body>
</html>
  `;

  pdfWindow.document.write(html);
  pdfWindow.document.close();
  
  return Promise.resolve();
}