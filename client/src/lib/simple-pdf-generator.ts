// Simple and reliable PDF generator
interface ValuationData {
  businessName: string;
  industry: string;
  location: string;
  foundedYear: number;
  annualRevenue: number | number[];
  sde: number;
  sdeMargin?: number;
  valuationLow: number;
  valuationHigh: number;
  industryMultiple: number;
  recurringRevenuePct?: number;
  revenueGrowthRate?: number;
  customerRetentionRate?: number;
  ownerInvolvement?: string;
  competitiveAdvantages?: string[];
  majorRiskFactors?: string[];
  growthOpportunities?: string[];
  top5CustomersPct?: number;
}

export function generateSimplePDF(data: ValuationData) {
  try {
    console.log('Starting PDF generation with data:', data);
    
    // Safe data processing
    const revenue = typeof data.annualRevenue === 'number' ? data.annualRevenue : (data.annualRevenue?.[0] || 0);
    const sde = data.sde || 0;
    const sdeMargin = data.sdeMargin || (revenue > 0 ? (sde / revenue) * 100 : 0);
    const enterpriseValue = (data.valuationLow + data.valuationHigh) / 2;
    const industryMultiple = data.industryMultiple || 3.8;
    const sdeBasedValuation = sde * industryMultiple;
    
    console.log('Calculated values:', { revenue, sde, sdeMargin, enterpriseValue, sdeBasedValuation });

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
        @page { size: A4; margin: 0.5in; }
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background: #fff;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 40px 20px;
            margin: -20px -20px 30px -20px;
            border-radius: 0 0 15px 15px;
        }
        .header h1 {
            font-size: 28px;
            margin: 0 0 10px 0;
            letter-spacing: 2px;
        }
        .header h2 {
            font-size: 20px;
            margin: 0 0 10px 0;
            font-weight: normal;
        }
        .header p {
            margin: 0;
            opacity: 0.9;
        }
        .highlight-box {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            margin: 30px 0;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        .highlight-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .highlight-value {
            font-size: 32px;
            font-weight: 800;
            margin-bottom: 10px;
        }
        .highlight-range {
            font-size: 14px;
            opacity: 0.9;
        }
        .section {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 15px;
            margin: 30px 0;
            border-left: 5px solid #667eea;
        }
        .section h3 {
            color: #2c3e50;
            margin-top: 0;
            font-size: 18px;
        }
        .overview-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        .overview-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .overview-label {
            font-weight: 600;
            color: #495057;
        }
        .overview-value {
            color: #2c3e50;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .table th {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }
        .table td {
            padding: 15px;
            border-bottom: 1px solid #e9ecef;
        }
        .table tr:nth-child(even) {
            background: #f8f9fa;
        }
        .risk-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 30px 0;
        }
        .risk-column {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .risk-positive {
            border-left: 5px solid #28a745;
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
        }
        .risk-negative {
            border-left: 5px solid #dc3545;
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
        }
        .risk-title {
            font-size: 16px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 20px;
            color: #2c3e50;
        }
        .risk-item {
            margin-bottom: 10px;
            padding-left: 20px;
            position: relative;
            line-height: 1.5;
        }
        .risk-positive .risk-item::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #28a745;
            font-weight: 700;
        }
        .risk-negative .risk-item::before {
            content: '⚠';
            position: absolute;
            left: 0;
            color: #dc3545;
        }
        .disclaimer {
            background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
            border-radius: 15px;
            padding: 25px;
            margin-top: 40px;
            border-left: 5px solid #9c27b0;
        }
        .disclaimer h4 {
            font-weight: 700;
            color: #4a148c;
            margin-bottom: 15px;
        }
        .disclaimer p {
            font-size: 12px;
            line-height: 1.6;
            color: #6a1b9a;
            margin: 0;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 15px;
            font-size: 12px;
        }
        @media print {
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            .page-break { page-break-before: always; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>BUSINESS VALUATION REPORT</h1>
        <h2>${data.businessName}</h2>
        <p>Valuation Date: ${currentDate}</p>
    </div>

    <div class="highlight-box">
        <div class="highlight-title">Enterprise Valuation</div>
        <div class="highlight-value">$${enterpriseValue.toLocaleString()}</div>
        <div class="highlight-range">Valuation Range: $${data.valuationLow.toLocaleString()} - $${data.valuationHigh.toLocaleString()}</div>
    </div>

    <div class="section">
        <h3>Company Overview</h3>
        <div class="overview-grid">
            <div>
                <div class="overview-item">
                    <span class="overview-label">Company:</span>
                    <span class="overview-value">${data.businessName}</span>
                </div>
                <div class="overview-item">
                    <span class="overview-label">Industry:</span>
                    <span class="overview-value">${data.industry}</span>
                </div>
                <div class="overview-item">
                    <span class="overview-label">Location:</span>
                    <span class="overview-value">${data.location}</span>
                </div>
            </div>
            <div>
                <div class="overview-item">
                    <span class="overview-label">Founded:</span>
                    <span class="overview-value">${data.foundedYear}</span>
                </div>
                <div class="overview-item">
                    <span class="overview-label">Annual Revenue:</span>
                    <span class="overview-value">$${revenue.toLocaleString()}</span>
                </div>
                <div class="overview-item">
                    <span class="overview-label">SDE:</span>
                    <span class="overview-value">$${sde.toLocaleString()}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <h3>Executive Summary</h3>
        <p>${data.businessName} is ${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 'a rapidly growing' : 'an established'} ${data.industry} business. The company generates annual revenue of $${revenue.toLocaleString()} with Seller's Discretionary Earnings (SDE) of $${sde.toLocaleString()}, resulting in an SDE margin of ${sdeMargin.toFixed(1)}%. ${data.customerRetentionRate ? `With a ${data.customerRetentionRate}% customer retention rate, ` : ''}the business shows ${sdeMargin > 25 ? 'exceptional' : sdeMargin > 15 ? 'strong' : 'stable'} profitability and ${data.ownerInvolvement === 'semi-absentee' ? 'operates efficiently with minimal owner involvement' : 'benefits from hands-on management oversight'}.</p>
    </div>

    <div class="section">
        <h3>Financial Performance</h3>
        <table class="table">
            <thead>
                <tr>
                    <th>Metric</th>
                    <th>Current Year</th>
                    <th>Performance</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Annual Revenue</strong></td>
                    <td>$${revenue.toLocaleString()}</td>
                    <td>${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 'Strong Growth' : 'Stable'}</td>
                </tr>
                <tr>
                    <td><strong>SDE</strong></td>
                    <td>$${sde.toLocaleString()}</td>
                    <td>${sdeMargin > 25 ? 'Excellent' : sdeMargin > 15 ? 'Good' : 'Average'}</td>
                </tr>
                <tr>
                    <td><strong>SDE Margin</strong></td>
                    <td>${sdeMargin.toFixed(1)}%</td>
                    <td>${sdeMargin > 25 ? 'Outstanding' : sdeMargin > 15 ? 'Strong' : 'Acceptable'}</td>
                </tr>
                ${data.customerRetentionRate ? `
                <tr>
                    <td><strong>Customer Retention</strong></td>
                    <td>${data.customerRetentionRate}%</td>
                    <td>${data.customerRetentionRate > 90 ? 'Excellent' : 'Good'}</td>
                </tr>
                ` : ''}
            </tbody>
        </table>
    </div>

    <div class="section">
        <h3>Valuation Methodology</h3>
        <p><strong>SDE Multiple Approach:</strong> Using industry-standard SDE multiples for ${data.industry} businesses.</p>
        <p><strong>Applied Multiple:</strong> ${industryMultiple}x (industry standard)</p>
        <p><strong>Calculation:</strong> SDE ($${sde.toLocaleString()}) × Multiple (${industryMultiple}x) = $${sdeBasedValuation.toLocaleString()}</p>
        <p><strong>Final Valuation Range:</strong> $${data.valuationLow.toLocaleString()} - $${data.valuationHigh.toLocaleString()}</p>
    </div>

    <div class="risk-grid">
        <div class="risk-column risk-positive">
            <div class="risk-title">Positive Value Drivers</div>
            ${(data.competitiveAdvantages || []).concat([
              data.customerRetentionRate && data.customerRetentionRate > 90 ? `High retention rate (${data.customerRetentionRate}%)` : '',
              sdeMargin > 20 ? `Strong SDE margins (${sdeMargin.toFixed(1)}%)` : '',
              data.recurringRevenuePct && data.recurringRevenuePct > 50 ? 'Recurring revenue stream' : '',
              'Established market presence',
              'Proven business model'
            ].filter(item => item !== '')).slice(0, 5).map(item => `<div class="risk-item">${item}</div>`).join('')}
        </div>
        
        <div class="risk-column risk-negative">
            <div class="risk-title">Key Risk Factors</div>
            ${(data.majorRiskFactors || []).concat([
              'Market competition',
              data.top5CustomersPct && data.top5CustomersPct > 30 ? 'Customer concentration' : '',
              'Economic sensitivity',
              'Regulatory compliance',
              'Technology changes'
            ].filter(item => item !== '')).slice(0, 5).map(item => `<div class="risk-item">${item}</div>`).join('')}
        </div>
    </div>

    <div class="disclaimer">
        <h4>Important Disclaimer</h4>
        <p>This business valuation report is prepared for informational purposes only and should not be considered as formal investment advice or professional business appraisal. The valuation estimates are based on industry standards and comparable analysis but may vary significantly based on specific market conditions, transaction circumstances, detailed due diligence findings, and individual business factors. For official valuations intended for legal, tax, or transaction purposes, please consult with a certified business appraiser or qualified financial professional.</p>
    </div>

    <div class="footer">
        ${data.businessName} | Professional Business Valuation Report | ${currentDate}<br>
        Generated by ValuationGenie | Confidential & Proprietary
    </div>

    <script>
        window.onload = function() {
            setTimeout(() => {
                window.print();
            }, 1000);
        };
    </script>
</body>
</html>`;

    console.log('Creating blob and download link');
    
    // Create blob and download
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.businessName.replace(/[^a-zA-Z0-9]/g, '_')}_Valuation_Report.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    console.log('PDF generation completed successfully');
    return Promise.resolve();
    
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  }
}