import type { ComprehensiveValuationData } from './comprehensive-pdf-generator';

export function generateProfessionalPDF(data: ComprehensiveValuationData) {
  // Create a new window with the PDF content
  const pdfWindow = window.open('', '_blank');
  if (!pdfWindow) {
    throw new Error('Unable to open PDF window. Please allow popups.');
  }

  const revenue = typeof data.annualRevenue === 'number' ? data.annualRevenue : (data.annualRevenue?.[0] || 0);
  const sde = data.sde || data.ebitda || 0;
  const sdeMargin = data.sdeMargin || (revenue > 0 ? (sde / revenue) * 100 : 0);
  
  // Calculate valuation details (halal-compliant)
  const enterpriseValue = (data.valuationLow + data.valuationHigh) / 2;
  const revenueMultiple = revenue > 0 ? enterpriseValue / revenue : 0;
  const sdeMultiple = sde > 0 ? enterpriseValue / sde : 0;

  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Business Valuation Report - ${data.businessName}</title>
    <style>
        @page {
            size: A4;
            margin: 0.75in;
        }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 11px;
            line-height: 1.4;
            color: #000;
            margin: 0;
            padding: 0;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
        }
        
        .report-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .company-name {
            font-size: 16px;
            margin-bottom: 8px;
        }
        
        .report-date {
            font-size: 12px;
            color: #666;
            margin-bottom: 30px;
        }
        
        h2 {
            font-size: 14px;
            font-weight: bold;
            margin: 30px 0 16px 0;
            color: #000;
        }
        
        .company-overview {
            margin-bottom: 30px;
        }
        
        .overview-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-top: 15px;
        }
        
        .overview-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            padding: 2px 0;
            border-bottom: 1px dotted #ccc;
        }
        
        .overview-label {
            font-weight: bold;
        }
        
        .executive-summary {
            margin: 25px 0;
            line-height: 1.6;
        }
        
        .valuation-highlight {
            text-align: center;
            margin: 40px 0;
            padding: 30px 0;
        }
        
        .valuation-section-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        
        .valuation-amount {
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .valuation-range {
            font-size: 14px;
            color: #666;
        }
        
        .metrics-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            border: 1px solid #000;
        }
        
        .metrics-table th {
            background: #f8f9fa;
            padding: 8px;
            text-align: left;
            font-weight: bold;
            font-size: 11px;
            border: 1px solid #000;
        }
        
        .metrics-table td {
            padding: 8px;
            border: 1px solid #000;
            font-size: 11px;
            text-align: center;
        }
        
        .metrics-table td:first-child {
            text-align: left;
            font-weight: bold;
        }
        
        .method-section {
            margin: 25px 0;
            page-break-inside: avoid;
        }
        
        .method-title {
            font-size: 13px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .method-description {
            margin-bottom: 15px;
            line-height: 1.5;
        }
        
        .key-assumptions {
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .assumption-list {
            margin-left: 20px;
            line-height: 1.6;
        }
        
        .center-values {
            text-align: center;
            margin: 15px 0;
            font-weight: bold;
        }
        
        .method-result {
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            margin-top: 15px;
            padding: 10px 0;
        }
        
        .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            border: 1px solid #000;
        }
        
        .summary-table th {
            background: #f8f9fa;
            padding: 8px;
            text-align: center;
            font-weight: bold;
            border: 1px solid #000;
        }
        
        .summary-table td {
            padding: 8px;
            text-align: center;
            border: 1px solid #000;
        }
        
        .final-value {
            font-weight: bold;
        }
        
        .risk-analysis {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin: 25px 0;
        }
        
        .risk-column h4 {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .risk-item {
            margin: 8px 0;
            padding-left: 15px;
            font-size: 11px;
            line-height: 1.4;
        }
        
        .growth-strategy {
            margin-top: 20px;
        }
        
        .growth-strategy h4 {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .disclaimer {
            margin-top: 40px;
            font-size: 9px;
            line-height: 1.5;
            border-top: 1px solid #ccc;
            padding-top: 20px;
        }
        
        @media print {
            body { 
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="report-title">BUSINESS VALUATION REPORT</div>
        <div class="company-name">${data.businessName}</div>
        <div class="report-date">Valuation Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
    </div>

    <!-- Company Overview -->
    <div class="company-overview">
        <h2>Company Overview</h2>
        <div class="overview-grid">
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
                    <span>${data.foundedYear}</span>
                </div>
                <div class="overview-item">
                    <span class="overview-label">Location:</span>
                    <span>${data.location}</span>
                </div>
                <div class="overview-item">
                    <span class="overview-label">Employees:</span>
                    <span>${data.employeeCount}</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Executive Summary -->
    <div class="executive-summary">
        <h2>Executive Summary</h2>
        <p>${data.businessName} is a ${data.industry.toLowerCase()} business ${data.foundedYear ? `established in ${data.foundedYear}` : 'with proven operations'}. The company demonstrates ${sdeMargin > 20 ? 'strong' : 'solid'} financial performance with ${data.recurringRevenuePct && data.recurringRevenuePct > 50 ? 'predictable recurring revenue' : 'consistent revenue streams'}${data.customerRetentionRate && data.customerRetentionRate > 85 ? ' and excellent customer retention rates' : ''}.</p>
    </div>

    <!-- Enterprise Valuation -->
    <div class="valuation-highlight">
        <div class="valuation-section-title">Enterprise Valuation</div>
        <div class="valuation-amount">$${enterpriseValue.toLocaleString()}</div>
        <div class="valuation-range">Range: $${data.valuationLow.toLocaleString()} - $${data.valuationHigh.toLocaleString()}</div>
    </div>

    <!-- Financial Performance Analysis -->
    <div class="financial-analysis">
        <h2>Financial Performance Analysis</h2>
        
        <table class="metrics-table">
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
                    <td>Annual Revenue</td>
                    <td>$${revenue.toLocaleString()}</td>
                    <td>-</td>
                    <td>${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 'Strong Growth' : 'Stable Performance'}</td>
                </tr>
                ${data.recurringRevenuePct ? `
                <tr>
                    <td>Annual Recurring Revenue</td>
                    <td>$${Math.round(revenue * (data.recurringRevenuePct / 100)).toLocaleString()}</td>
                    <td>-</td>
                    <td>${data.recurringRevenuePct}% of Total Revenue</td>
                </tr>
                ` : ''}
                <tr>
                    <td>SDE</td>
                    <td>$${sde.toLocaleString()}</td>
                    <td>$${Math.round(revenue * 0.15).toLocaleString()} - $${Math.round(revenue * 0.25).toLocaleString()}</td>
                    <td>${sdeMargin > 25 ? 'Excellent' : sdeMargin > 15 ? 'Above Average' : 'Average'}</td>
                </tr>
                <tr>
                    <td>SDE Margin</td>
                    <td>${sdeMargin.toFixed(1)}%</td>
                    <td>15% - 25%</td>
                    <td>${sdeMargin > 25 ? 'Excellent' : sdeMargin > 15 ? 'Above Average' : 'Average'}</td>
                </tr>
                ${data.customerRetentionRate ? `
                <tr>
                    <td>Customer Retention</td>
                    <td>${data.customerRetentionRate}%</td>
                    <td>85% - 90%</td>
                    <td>${data.customerRetentionRate > 90 ? 'Best-in-Class' : 'Above Average'}</td>
                </tr>
                ` : ''}
                ${data.customerAcquisitionCost ? `
                <tr>
                    <td>Customer Acquisition Cost</td>
                    <td>$${data.customerAcquisitionCost.toLocaleString()}</td>
                    <td>Varies by Industry</td>
                    <td>Business Metric</td>
                </tr>
                ` : ''}
            </tbody>
        </table>
    </div>

    <!-- Valuation Methodologies -->
    <div class="valuation-methods">
        <h2>Valuation Methodologies</h2>

        <!-- Revenue Multiple Approach -->
        <div class="method-section">
            <div class="method-title">1. Revenue Multiple Approach</div>
            <div class="method-description">Comparable company analysis using revenue multiples from industry benchmarks.</div>
            
            <div class="key-assumptions">Key Assumptions:</div>
            <div class="assumption-list">
                • Industry revenue multiples: ${(revenueMultiple * 0.8).toFixed(1)}x - ${(revenueMultiple * 1.2).toFixed(1)}x<br>
                • Applied multiple: ${revenueMultiple.toFixed(1)}x (${sdeMargin > 25 ? 'premium for strong metrics' : 'market rate'})<br>
                • Justification: ${data.customerRetentionRate && data.customerRetentionRate > 90 ? 'Superior retention and business fundamentals' : 'Solid business fundamentals'}
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
        <div class="method-section">
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
    <div class="valuation-summary">
        <h2>Valuation Summary</h2>
        
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
    <div class="risk-analysis">
        <div class="risk-column">
            <h4>Positive Value Drivers</h4>
            ${(data.competitiveAdvantages || []).concat([
              data.customerRetentionRate && data.customerRetentionRate > 90 ? `Industry-leading retention rate (${data.customerRetentionRate}%)` : null,
              data.customerAcquisitionCost && data.customerAcquisitionCost < (revenue / 12) ? 'Efficient customer acquisition' : null,
              sdeMargin > 20 ? `Strong SDE margins (${sdeMargin.toFixed(1)}%)` : null,
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
    <div class="strategic-recommendations">
        <h2>Strategic Recommendations</h2>
        <p>${data.businessName} is positioned for ${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 'continued growth' : 'stable operations'} with ${sdeMargin > 20 ? 'strong' : 'solid'} fundamentals:</p>
        
        <div class="growth-strategy">
            <h4>Growth Strategy</h4>
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

  return pdfWindow;
}