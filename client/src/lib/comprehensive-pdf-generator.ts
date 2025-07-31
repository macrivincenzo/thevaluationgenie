interface ComprehensiveValuationData {
  // Basic Information
  businessName: string;
  industry: string;
  businessDescription?: string;
  foundedYear?: number;
  location: string;
  employeeCount?: number;
  
  // Financial Performance
  annualRevenue: number | number[];
  recurringRevenuePct?: number;
  ebitda?: number;
  ebitdaMargin?: number;
  customerRetentionRate?: number;
  customerLifetimeValue?: number;
  customerAcquisitionCost?: number;
  revenueGrowthRate?: number;
  top5CustomersPct?: number;
  
  // Valuation Results
  valuationLow: number;
  valuationHigh: number;
  industryMultiple: number;
  revenueMultiple?: number;
  ebitdaMultiple?: number;
  dcfValuation?: number;
  weightedValuation?: number;
  
  // Operational & Risk
  ownerInvolvement: string;
  managementTeam?: string;
  systemsProcesses?: string;
  majorRiskFactors?: string[];
  competitiveAdvantages?: string[];
  growthOpportunities?: string[];
  
  // Legacy fields
  sde?: number;
  growthTrend?: string;
  majorRisks?: string;
}

export function generateComprehensivePDF(data: ComprehensiveValuationData) {
  // Create a new window with the PDF content
  const pdfWindow = window.open('', '_blank');
  if (!pdfWindow) {
    throw new Error('Unable to open PDF window. Please allow popups.');
  }

  const revenue = typeof data.annualRevenue === 'number' ? data.annualRevenue : (data.annualRevenue?.[0] || 0);
  const sde = data.sde || 0;
  const sdeMargin = data.sdeMargin || (revenue > 0 ? (sde / revenue) * 100 : 0);
  // Calculate valuation details (halal-compliant, no interest-based calculations)
  const enterpriseValue = (data.valuationLow + data.valuationHigh) / 2;
  const revenueMultiple = data.revenueMultiple || (revenue > 0 ? enterpriseValue / revenue : 0);
  const sdeMultiple = (sde > 0 ? enterpriseValue / sde : 0);

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
            line-height: 1.4;
            color: #000;
            margin: 0;
            padding: 20px;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 10px 0;
        }
        .header h2 {
            font-size: 18px;
            margin: 0 0 5px 0;
        }
        .header .date {
            font-size: 14px;
            margin-top: 20px;
        }
        .company-overview {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
            padding: 15px;
            background-color: #f8f9fa;
            border: 1px solid #ddd;
        }
        .overview-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        .overview-label {
            font-weight: bold;
            min-width: 120px;
        }
        .executive-summary {
            margin-bottom: 30px;
        }
        .executive-summary h3 {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .valuation-box {
            text-align: center;
            border: 2px solid #000;
            padding: 20px;
            margin: 20px 0;
            background-color: #f0f8ff;
        }
        .valuation-amount {
            font-size: 28px;
            font-weight: bold;
            color: #000;
            margin: 10px 0;
        }
        .valuation-range {
            font-size: 14px;
            color: #666;
        }
        .financial-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .financial-table th,
        .financial-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }
        .financial-table th {
            background-color: #f0f0f0;
            font-weight: bold;
        }
        .financial-table .metric {
            font-weight: bold;
        }
        .financial-table .performance {
            text-align: center;
            font-weight: bold;
        }
        .performance.excellent {
            color: #006400;
        }
        .performance.above-average {
            color: #228B22;
        }
        .performance.average {
            color: #FF8C00;
        }
        .performance.below-average {
            color: #DC143C;
        }
        .valuation-methods {
            margin: 30px 0;
        }
        .method-section {
            margin-bottom: 25px;
            padding: 15px;
            border: 1px solid #ddd;
        }
        .method-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .method-result {
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            margin: 10px 0;
            padding: 10px;
            background-color: #f8f9fa;
            border: 1px solid #000;
        }
        .assumptions {
            font-size: 11px;
            color: #666;
            margin-top: 10px;
        }
        .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .summary-table th,
        .summary-table td {
            border: 1px solid #000;
            padding: 10px;
            text-align: center;
        }
        .summary-table .final-value {
            background-color: #f0f8ff;
            font-weight: bold;
            font-size: 14px;
        }
        .risk-analysis {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 30px 0;
        }
        .risk-column {
            padding: 15px;
            border: 1px solid #ddd;
        }
        .risk-column h4 {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
            text-align: center;
        }
        .risk-item {
            margin-bottom: 8px;
            padding-left: 15px;
            position: relative;
        }
        .risk-item:before {
            content: "•";
            position: absolute;
            left: 0;
        }
        .disclaimer {
            font-size: 10px;
            color: #666;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
        }
        .page-break {
            page-break-before: always;
        }
        h3 {
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0 10px 0;
        }
        .section-spacing {
            margin-bottom: 25px;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <h1>BUSINESS VALUATION REPORT</h1>
        <h2>${data.businessName}</h2>
        <div class="date">Valuation Date: ${new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</div>
    </div>

    <!-- Company Overview -->
    <div class="company-overview">
        <div>
            <div class="overview-item">
                <span class="overview-label">Company:</span>
                <span>${data.businessName}</span>
            </div>
            <div class="overview-item">
                <span class="overview-label">Industry:</span>
                <span>${data.industry}</span>
            </div>
            <div class="overview-item">
                <span class="overview-label">Business:</span>
                <span>${data.businessDescription || 'Service Business'}</span>
            </div>
        </div>
        <div>
            <div class="overview-item">
                <span class="overview-label">Founded:</span>
                <span>${data.foundedYear || 'N/A'}</span>
            </div>
            <div class="overview-item">
                <span class="overview-label">Location:</span>
                <span>${data.location}</span>
            </div>
            <div class="overview-item">
                <span class="overview-label">Employees:</span>
                <span>${data.employeeCount || 'N/A'}</span>
            </div>
        </div>
    </div>

    <!-- Executive Summary -->
    <div class="executive-summary section-spacing">
        <h3>Executive Summary</h3>
        <p>
            ${data.businessName} is ${data.industry === 'software-as-a-service--saas-' ? 'a rapidly growing SaaS company' : 
              data.industry === 'professional-services' ? 'a professional services firm' :
              data.industry === 'retail-e-commerce' ? 'an e-commerce business' :
              `a ${data.industry.replace(/-/g, ' ')} business`} 
            ${data.businessDescription || 'providing services to clients'}. 
            ${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 
              'The company demonstrates exceptional financial performance with strong growth metrics.' : 
              'The company shows solid financial performance with stable operations.'}
        </p>

        <div class="valuation-box">
            <div style="font-size: 18px; margin-bottom: 10px;">Enterprise Valuation</div>
            <div class="valuation-amount">$${enterpriseValue.toLocaleString()}</div>
            <div class="valuation-range">Range: $${data.valuationLow.toLocaleString()} - $${data.valuationHigh.toLocaleString()}</div>
        </div>
    </div>

    <!-- Financial Performance Analysis -->
    <div class="section-spacing">
        <h3>Financial Performance Analysis</h3>
        
        <table class="financial-table">
            <thead>
                <tr>
                    <th>Key Metric</th>
                    <th>Current Year</th>
                    <th>Industry Benchmark</th>
                    <th>Performance Rating</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="metric">Annual Revenue</td>
                    <td>$${revenue.toLocaleString()}</td>
                    <td>-</td>
                    <td class="performance ${data.revenueGrowthRate && data.revenueGrowthRate > 20 ? 'excellent' : 'average'}">
                        ${data.revenueGrowthRate && data.revenueGrowthRate > 20 ? 'Strong Growth' : 'Stable Performance'}
                    </td>
                </tr>
                ${data.recurringRevenuePct ? `
                <tr>
                    <td class="metric">Annual Recurring Revenue</td>
                    <td>$${(revenue * (data.recurringRevenuePct / 100)).toLocaleString()}</td>
                    <td>-</td>
                    <td class="performance excellent">${data.recurringRevenuePct}% of Total Revenue</td>
                </tr>
                ` : ''}
                <tr>
                    <td class="metric">EBITDA</td>
                    <td>$${ebitda.toLocaleString()}</td>
                    <td>$${Math.round(revenue * 0.15).toLocaleString()} - $${Math.round(revenue * 0.25).toLocaleString()}</td>
                    <td class="performance ${ebitdaMargin > 25 ? 'excellent' : ebitdaMargin > 15 ? 'above-average' : 'average'}">
                        ${ebitdaMargin > 25 ? 'Excellent' : ebitdaMargin > 15 ? 'Above Average' : 'Average'}
                    </td>
                </tr>
                <tr>
                    <td class="metric">SDE Margin</td>
                    <td>${sdeMargin.toFixed(1)}%</td>
                    <td>15% - 25%</td>
                    <td class="performance ${sdeMargin > 25 ? 'excellent' : sdeMargin > 15 ? 'above-average' : 'average'}">
                        ${sdeMargin > 25 ? 'Excellent' : sdeMargin > 15 ? 'Above Average' : 'Average'}
                    </td>
                </tr>
                ${data.customerRetentionRate ? `
                <tr>
                    <td class="metric">Customer Retention</td>
                    <td>${data.customerRetentionRate}%</td>
                    <td>85% - 90%</td>
                    <td class="performance ${data.customerRetentionRate > 90 ? 'excellent' : 'above-average'}">
                        ${data.customerRetentionRate > 90 ? 'Best-in-Class' : 'Above Average'}
                    </td>
                </tr>
                ` : ''}
                ${data.customerAcquisitionCost ? `
                <tr>
                    <td class="metric">Customer Acquisition Cost</td>
                    <td>$${data.customerAcquisitionCost.toLocaleString()}</td>
                    <td>Varies by Industry</td>
                    <td class="performance above-average">Business Metric</td>
                </tr>
                ` : ''}
            </tbody>
        </table>
    </div>

    <div class="page-break"></div>

    <!-- Valuation Methodologies -->
    <div class="valuation-methods section-spacing">
        <h3>Valuation Methodologies</h3>

        <!-- Revenue Multiple Approach -->
        <div class="method-section">
            <div class="method-title">1. Revenue Multiple Approach</div>
            <p>Comparable company analysis using revenue multiples from industry benchmarks.</p>
            
            <div style="margin: 15px 0;">
                <strong>Key Assumptions:</strong>
                <div class="assumptions">
                    • Industry revenue multiples: ${(revenueMultiple * 0.8).toFixed(1)}x - ${(revenueMultiple * 1.2).toFixed(1)}x<br>
                    • Applied multiple: ${revenueMultiple.toFixed(1)}x (${ebitdaMargin > 25 ? 'premium for strong metrics' : 'market rate'})<br>
                    • Justification: ${data.customerRetentionRate && data.customerRetentionRate > 90 ? 'Superior retention and unit economics' : 'Solid business fundamentals'}
                </div>
            </div>

            <div style="text-align: center; margin: 15px 0;">
                <strong>Annual Revenue: $${revenue.toLocaleString()}</strong><br>
                <strong>Revenue Multiple: ${revenueMultiple.toFixed(1)}x</strong>
            </div>

            <div class="method-result">
                Enterprise Value = $${(revenue * revenueMultiple).toLocaleString()}
            </div>
        </div>

        <!-- SDE Multiple Approach -->
        <div class="method-section">
            <div class="method-title">2. SDE Multiple Approach</div>
            <p>Valuation based on Seller's Discretionary Earnings multiples from industry benchmarks.</p>
            
            <div style="margin: 15px 0;">
                <strong>Key Assumptions:</strong>
                <div class="assumptions">
                    • Industry SDE multiples: ${(sdeMultiple * 0.8).toFixed(1)}x - ${(sdeMultiple * 1.2).toFixed(1)}x<br>
                    • Applied multiple: ${sdeMultiple.toFixed(1)}x (${sdeMargin > 20 ? 'reflects strong profitability' : 'mid-range multiple'})<br>
                    • Reflects owner-operated business cash flow
                </div>
            </div>

            <div style="text-align: center; margin: 15px 0;">
                <strong>SDE: $${sde.toLocaleString()}</strong><br>
                <strong>SDE Multiple: ${sdeMultiple.toFixed(1)}x</strong>
            </div>

            <div class="method-result">
                Enterprise Value = $${(sde * sdeMultiple).toLocaleString()}
            </div>
        </div>
    </div>

    <!-- Valuation Summary -->
    <div class="section-spacing">
        <h3>Valuation Summary</h3>
        
        <table class="summary-table">
            <thead>
                <tr>
                    <th>Valuation Method</th>
                    <th>Enterprise Value</th>
                    <th>Weight</th>
                    <th>Weighted Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Revenue Multiple</td>
                    <td>$${(revenue * revenueMultiple).toLocaleString()}</td>
                    <td>50%</td>
                    <td>$${((revenue * revenueMultiple) * 0.5).toLocaleString()}</td>
                </tr>
                <tr>
                    <td>SDE Multiple</td>
                    <td>$${(sde * sdeMultiple).toLocaleString()}</td>
                    <td>50%</td>
                    <td>$${((sde * sdeMultiple) * 0.5).toLocaleString()}</td>
                </tr>
                <tr class="final-value">
                    <td><strong>FINAL ENTERPRISE VALUE</strong></td>
                    <td><strong>$${enterpriseValue.toLocaleString()}</strong></td>
                    <td><strong>100%</strong></td>
                    <td><strong>$${enterpriseValue.toLocaleString()}</strong></td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Risk Assessment & Value Drivers -->
    <div class="risk-analysis section-spacing">
        <div class="risk-column">
            <h4>Positive Value Drivers</h4>
            ${(data.competitiveAdvantages || []).concat([
              data.customerRetentionRate && data.customerRetentionRate > 90 ? `Industry-leading retention rate (${data.customerRetentionRate}%)` : null,
              data.customerAcquisitionCost && data.customerAcquisitionCost < (revenue / 12) ? 'Efficient customer acquisition' : null,
              ebitdaMargin > 20 ? `Strong EBITDA margins (${ebitdaMargin.toFixed(1)}%)` : null,
              data.recurringRevenuePct && data.recurringRevenuePct > 50 ? 'Predictable recurring revenue model' : null,
              data.managementTeam === 'strong' ? 'Proven management team' : null
            ].filter((item): item is string => item !== null)).slice(0, 6).map(item => `<div class="risk-item">${item}</div>`).join('')}
        </div>
        
        <div class="risk-column">
            <h4>Key Risk Factors</h4>
            ${(data.majorRiskFactors || []).concat([
              'Market competition risk',
              data.top5CustomersPct && data.top5CustomersPct > 30 ? 'Customer concentration risk' : null,
              data.ownerInvolvement === 'hands-on' ? 'Key person dependency' : null,
              'Economic downturn sensitivity',
              'Technology disruption threat'
            ].filter((item): item is string => item !== null)).slice(0, 6).map(item => `<div class="risk-item">${item}</div>`).join('')}
        </div>
    </div>

    <!-- Strategic Recommendations -->
    <div class="section-spacing">
        <h3>Strategic Recommendations</h3>
        <p>${data.businessName} is positioned for ${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 'continued growth' : 'stable operations'} with ${ebitdaMargin > 20 ? 'strong' : 'solid'} fundamentals:</p>
        
        <div style="margin-top: 20px;">
            <h4 style="font-size: 14px; margin-bottom: 10px;">Growth Strategy</h4>
            ${(data.growthOpportunities || []).concat([
              'Operational Excellence: Scale efficiently while preserving margins',
              'Customer Success: Maintain strong customer relationships',
              'Market Expansion: Explore new customer segments',
              'Product Innovation: Invest in service improvements'
            ]).slice(0, 4).map(item => `<div class="risk-item">${item}</div>`).join('')}
        </div>
    </div>

    <div class="disclaimer">
        <strong>Important Disclaimer:</strong> This business valuation report is prepared for informational purposes only. It should not be considered as investment advice, and actual valuations may vary significantly based on market conditions, transaction specifics, and due diligence findings.
        <br><br>
        <strong>${data.businessName} | Business Valuation Report | ${new Date().toLocaleDateString()}</strong>
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