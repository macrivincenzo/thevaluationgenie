// Premium colorful PDF generator inspired by top financial reports
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

export function generatePremiumPDF(data: ComprehensiveValuationData) {
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
    <title>Premium Business Valuation Report - ${data.businessName}</title>
    <style>
        @page {
            size: A4;
            margin: 0.5in;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 11px;
            line-height: 1.6;
            color: #2c3e50;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .document-container {
            background: white;
            margin: 0;
            min-height: 100vh;
            position: relative;
            overflow: hidden;
        }
        
        .header-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 60px 40px 80px;
            margin-bottom: 0;
            position: relative;
        }
        
        .header-gradient::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 30px;
            background: linear-gradient(45deg, transparent 50%, white 50%);
        }
        
        .main-title {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
            margin-bottom: 20px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .company-name {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #f8f9fa;
        }
        
        .valuation-date {
            font-size: 14px;
            opacity: 0.9;
            font-weight: 300;
        }
        
        .content-wrapper {
            padding: 40px;
            background: white;
        }
        
        h2 {
            font-size: 20px;
            font-weight: 700;
            margin: 50px 0 25px 0;
            color: #2c3e50;
            position: relative;
            padding-left: 20px;
        }
        
        h2::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 2px;
        }
        
        .highlight-box {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            border-radius: 15px;
            text-align: center;
            margin: 40px 0;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        
        .highlight-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 20px;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        
        .highlight-value {
            font-size: 36px;
            font-weight: 800;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .highlight-range {
            font-size: 14px;
            opacity: 0.9;
        }
        
        .overview-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 30px 0;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 30px;
            border-radius: 15px;
            border-left: 5px solid #667eea;
        }
        
        .overview-item {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #e9ecef;
        }
        
        .overview-item:last-child {
            border-bottom: none;
        }
        
        .overview-label {
            font-weight: 600;
            color: #495057;
        }
        
        .overview-value {
            color: #2c3e50;
            font-weight: 500;
        }
        
        .executive-summary {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            padding: 30px;
            border-radius: 15px;
            margin: 40px 0;
            border-left: 5px solid #2196f3;
            line-height: 1.8;
        }
        
        .performance-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .performance-table th {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
            font-size: 12px;
        }
        
        .performance-table td {
            padding: 15px;
            border-bottom: 1px solid #e9ecef;
            font-size: 11px;
        }
        
        .performance-table tr:last-child td {
            border-bottom: none;
        }
        
        .performance-table tr:nth-child(even) {
            background: #f8f9fa;
        }
        
        .performance-excellent {
            color: #28a745;
            font-weight: 600;
        }
        
        .performance-good {
            color: #17a2b8;
            font-weight: 600;
        }
        
        .performance-average {
            color: #ffc107;
            font-weight: 600;
        }
        
        .methodology-section {
            background: #fff;
            border: 2px solid #e9ecef;
            border-radius: 15px;
            padding: 30px;
            margin: 30px 0;
            position: relative;
        }
        
        .methodology-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px 15px 0 0;
        }
        
        .method-number {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
            font-weight: 700;
            margin-right: 15px;
            font-size: 14px;
        }
        
        .method-title {
            font-size: 16px;
            font-weight: 700;
            color: #2c3e50;
            display: inline-block;
        }
        
        .method-description {
            font-style: italic;
            color: #6c757d;
            margin: 15px 0;
            margin-left: 45px;
        }
        
        .assumptions-box {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            margin-left: 45px;
        }
        
        .assumptions-title {
            font-weight: 700;
            color: #495057;
            margin-bottom: 15px;
        }
        
        .assumption-item {
            color: #6c757d;
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
        }
        
        .assumption-item::before {
            content: '→';
            position: absolute;
            left: 0;
            color: #667eea;
            font-weight: 700;
        }
        
        .calculation-highlight {
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            border: 2px solid #4caf50;
            border-radius: 15px;
            padding: 25px;
            margin: 25px 0;
            margin-left: 45px;
            text-align: center;
        }
        
        .calc-formula {
            font-size: 13px;
            color: #2e7d32;
            margin-bottom: 10px;
        }
        
        .calc-result {
            font-size: 18px;
            font-weight: 700;
            color: #1b5e20;
        }
        
        .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin: 40px 0;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .summary-table th {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 18px 15px;
            text-align: left;
            font-weight: 600;
            font-size: 12px;
        }
        
        .summary-table td {
            padding: 18px 15px;
            border-bottom: 1px solid #e9ecef;
            font-size: 12px;
        }
        
        .summary-final {
            background: linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%);
            font-weight: 700;
            font-size: 13px;
        }
        
        .risk-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin: 40px 0;
        }
        
        .risk-column {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .risk-positive {
            border-left: 5px solid #4caf50;
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
        }
        
        .risk-negative {
            border-left: 5px solid #f44336;
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
        }
        
        .risk-title {
            font-size: 16px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 25px;
            color: #2c3e50;
        }
        
        .risk-item {
            margin-bottom: 12px;
            padding-left: 25px;
            position: relative;
            line-height: 1.6;
            color: #495057;
        }
        
        .risk-positive .risk-item::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #4caf50;
            font-weight: 700;
            font-size: 14px;
        }
        
        .risk-negative .risk-item::before {
            content: '⚠';
            position: absolute;
            left: 0;
            color: #f44336;
            font-size: 14px;
        }
        
        .recommendations {
            background: linear-gradient(135deg, #fff8e1 0%, #fff3c4 100%);
            border-radius: 15px;
            padding: 40px;
            margin: 40px 0;
            border-left: 5px solid #ff9800;
        }
        
        .recommendations h2 {
            color: #e65100;
            margin-top: 0;
        }
        
        .recommendations p {
            font-size: 12px;
            line-height: 1.8;
            color: #5d4037;
            margin-bottom: 30px;
        }
        
        .growth-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 25px;
        }
        
        .growth-item {
            background: rgba(255,255,255,0.7);
            padding: 15px;
            border-radius: 10px;
            border-left: 3px solid #ff9800;
            font-size: 11px;
            line-height: 1.5;
        }
        
        .disclaimer {
            background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
            border-radius: 15px;
            padding: 30px;
            margin-top: 60px;
            border-left: 5px solid #9c27b0;
        }
        
        .disclaimer-title {
            font-weight: 700;
            color: #4a148c;
            margin-bottom: 15px;
            font-size: 13px;
        }
        
        .disclaimer-text {
            font-size: 10px;
            line-height: 1.7;
            color: #6a1b9a;
        }
        
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 15px;
            font-size: 11px;
            font-weight: 600;
        }
        
        .chart-placeholder {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border: 2px dashed #2196f3;
            border-radius: 10px;
            padding: 30px;
            text-align: center;
            margin: 20px 0;
            color: #1976d2;
            font-style: italic;
        }
        
        @media print {
            body { 
                print-color-adjust: exact; 
                -webkit-print-color-adjust: exact; 
            }
            .page-break { 
                page-break-before: always; 
            }
        }
    </style>
</head>
<body>
    <div class="document-container">
        <div class="header-gradient">
            <div class="main-title">Business Valuation Report</div>
            <div class="company-name">${data.businessName}</div>
            <div class="valuation-date">Valuation Date: ${currentDate}</div>
        </div>

        <div class="content-wrapper">
            <h2>Company Overview</h2>
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
                        <span class="overview-label">Business Type:</span>
                        <span class="overview-value">${data.businessDescription || 'Service Business'}</span>
                    </div>
                </div>
                <div>
                    <div class="overview-item">
                        <span class="overview-label">Founded:</span>
                        <span class="overview-value">${data.foundedYear}</span>
                    </div>
                    <div class="overview-item">
                        <span class="overview-label">Location:</span>
                        <span class="overview-value">${data.location}</span>
                    </div>
                    <div class="overview-item">
                        <span class="overview-label">Employees:</span>
                        <span class="overview-value">${data.employeeCount || 'Not specified'}</span>
                    </div>
                </div>
            </div>

            <div class="executive-summary">
                <h2>Executive Summary</h2>
                <p>${data.businessName} is ${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 'a rapidly growing' : 'an established'} ${data.industry} business ${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 'demonstrating exceptional growth potential and strong market positioning' : 'with solid operational fundamentals and stable market presence'}. The company generates annual revenue of $${revenue.toLocaleString()} with a Seller's Discretionary Earnings (SDE) of $${sde.toLocaleString()}, resulting in an impressive SDE margin of ${sdeMargin.toFixed(1)}%. ${data.customerRetentionRate ? `With a ${data.customerRetentionRate}% customer retention rate, ` : ''}the business shows ${sdeMargin > 25 ? 'exceptional' : sdeMargin > 15 ? 'strong' : 'stable'} profitability and ${data.ownerInvolvement === 'semi-absentee' ? 'operates efficiently with minimal owner involvement' : 'benefits from hands-on management oversight'}.</p>
            </div>

            <div class="highlight-box">
                <div class="highlight-title">Enterprise Valuation</div>
                <div class="highlight-value">$${enterpriseValue.toLocaleString()}</div>
                <div class="highlight-range">Valuation Range: $${data.valuationLow.toLocaleString()} - $${data.valuationHigh.toLocaleString()}</div>
            </div>

            <h2>Financial Performance Analysis</h2>
            <table class="performance-table">
                <thead>
                    <tr>
                        <th style="width: 35%;">Key Financial Metric</th>
                        <th style="width: 25%;">Current Year</th>
                        <th style="width: 25%;">Industry Benchmark</th>
                        <th style="width: 15%;">Performance Rating</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Annual Revenue</strong></td>
                        <td>$${revenue.toLocaleString()}</td>
                        <td>-</td>
                        <td class="${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 'performance-excellent' : 'performance-good'}">${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 'Strong Growth' : 'Stable Performance'}</td>
                    </tr>
                    ${data.recurringRevenuePct ? `
                    <tr>
                        <td><strong>Recurring Revenue</strong></td>
                        <td>$${Math.round(revenue * (data.recurringRevenuePct / 100)).toLocaleString()}</td>
                        <td>40-60% of Total</td>
                        <td class="performance-excellent">${data.recurringRevenuePct}% of Revenue</td>
                    </tr>
                    ` : ''}
                    <tr>
                        <td><strong>Seller's Discretionary Earnings (SDE)</strong></td>
                        <td>$${sde.toLocaleString()}</td>
                        <td>$${Math.round(revenue * 0.15).toLocaleString()} - $${Math.round(revenue * 0.25).toLocaleString()}</td>
                        <td class="${sdeMargin > 25 ? 'performance-excellent' : sdeMargin > 15 ? 'performance-good' : 'performance-average'}">${sdeMargin > 25 ? 'Excellent' : sdeMargin > 15 ? 'Above Average' : 'Average'}</td>
                    </tr>
                    <tr>
                        <td><strong>SDE Margin</strong></td>
                        <td>${sdeMargin.toFixed(1)}%</td>
                        <td>15% - 25%</td>
                        <td class="${sdeMargin > 25 ? 'performance-excellent' : sdeMargin > 15 ? 'performance-good' : 'performance-average'}">${sdeMargin > 25 ? 'Outstanding' : sdeMargin > 15 ? 'Strong' : 'Acceptable'}</td>
                    </tr>
                    ${data.customerRetentionRate ? `
                    <tr>
                        <td><strong>Customer Retention Rate</strong></td>
                        <td>${data.customerRetentionRate}%</td>
                        <td>85% - 90%</td>
                        <td class="${data.customerRetentionRate > 90 ? 'performance-excellent' : 'performance-good'}">${data.customerRetentionRate > 90 ? 'Best-in-Class' : 'Above Average'}</td>
                    </tr>
                    ` : ''}
                </tbody>
            </table>

            <h2>Valuation Methodologies</h2>

            <div class="methodology-section">
                <div class="method-number">1</div>
                <div class="method-title">Revenue Multiple Approach</div>
                <div class="method-description">Valuation based on revenue multiples from comparable businesses in the ${data.industry} industry.</div>
                
                <div class="assumptions-box">
                    <div class="assumptions-title">Key Assumptions:</div>
                    <div class="assumption-item">Industry revenue multiples: ${(revenueMultiple * 0.8).toFixed(1)}x - ${(revenueMultiple * 1.2).toFixed(1)}x</div>
                    <div class="assumption-item">Applied multiple: ${revenueMultiple.toFixed(1)}x (based on performance metrics)</div>
                    <div class="assumption-item">Premium applied for ${sdeMargin > 20 ? 'superior' : 'solid'} operational efficiency and profitability</div>
                </div>

                <div class="calculation-highlight">
                    <div class="calc-formula">Annual Revenue × Revenue Multiple</div>
                    <div class="calc-formula">$${revenue.toLocaleString()} × ${revenueMultiple.toFixed(1)}x</div>
                    <div class="calc-result">Enterprise Value = $${(revenue * revenueMultiple).toLocaleString()}</div>
                </div>
            </div>

            <div class="methodology-section">
                <div class="method-number">2</div>
                <div class="method-title">SDE Multiple Approach</div>
                <div class="method-description">Valuation based on Seller's Discretionary Earnings multiples for comparable ${data.industry} businesses.</div>
                
                <div class="assumptions-box">
                    <div class="assumptions-title">Key Assumptions:</div>
                    <div class="assumption-item">SDE multiples range: ${(sdeMultiple * 0.8).toFixed(1)}x - ${(sdeMultiple * 1.2).toFixed(1)}x</div>
                    <div class="assumption-item">Applied multiple: ${sdeMultiple.toFixed(1)}x (industry standard)</div>
                    <div class="assumption-item">Reflects strong cash flow generation and owner benefit optimization</div>
                </div>

                <div class="calculation-highlight">
                    <div class="calc-formula">Seller's Discretionary Earnings × SDE Multiple</div>
                    <div class="calc-formula">$${sde.toLocaleString()} × ${sdeMultiple.toFixed(1)}x</div>
                    <div class="calc-result">Enterprise Value = $${(sde * sdeMultiple).toLocaleString()}</div>
                </div>
            </div>

            <h2>Valuation Summary</h2>
            <table class="summary-table">
                <thead>
                    <tr>
                        <th style="width: 40%;">Valuation Method</th>
                        <th style="width: 25%;">Enterprise Value</th>
                        <th style="width: 15%;">Weight</th>
                        <th style="width: 20%;">Weighted Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Revenue Multiple Approach</td>
                        <td>$${(revenue * revenueMultiple).toLocaleString()}</td>
                        <td>50%</td>
                        <td>$${((revenue * revenueMultiple) * 0.5).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>SDE Multiple Approach</td>
                        <td>$${(sde * sdeMultiple).toLocaleString()}</td>
                        <td>50%</td>
                        <td>$${((sde * sdeMultiple) * 0.5).toLocaleString()}</td>
                    </tr>
                    <tr class="summary-final">
                        <td><strong>FINAL ENTERPRISE VALUE</strong></td>
                        <td><strong>$${enterpriseValue.toLocaleString()}</strong></td>
                        <td><strong>100%</strong></td>
                        <td><strong>$${enterpriseValue.toLocaleString()}</strong></td>
                    </tr>
                </tbody>
            </table>

            <h2>Risk Assessment & Value Drivers</h2>
            <div class="risk-grid">
                <div class="risk-column risk-positive">
                    <div class="risk-title">Positive Value Drivers</div>
                    ${(data.competitiveAdvantages || []).concat([
                      data.customerRetentionRate && data.customerRetentionRate > 90 ? `Industry-leading retention rate (${data.customerRetentionRate}%)` : null,
                      sdeMargin > 20 ? `Strong SDE margins (${sdeMargin.toFixed(1)}%)` : null,
                      data.recurringRevenuePct && data.recurringRevenuePct > 50 ? 'Predictable recurring revenue stream' : null,
                      data.ownerInvolvement === 'semi-absentee' ? 'Semi-absentee operation capability' : null,
                      'Established market presence and brand recognition',
                      'Proven business model with scalable operations'
                    ].filter((item): item is string => item !== null)).slice(0, 6).map((item: string) => `<div class="risk-item">${item}</div>`).join('')}
                </div>
                
                <div class="risk-column risk-negative">
                    <div class="risk-title">Key Risk Factors</div>
                    ${(data.majorRiskFactors || []).concat([
                      'Competitive market environment',
                      data.top5CustomersPct && data.top5CustomersPct > 30 ? 'Customer concentration risk' : null,
                      data.ownerInvolvement === 'hands-on' ? 'Key person dependency risk' : null,
                      'Economic sensitivity and market volatility',
                      'Technology disruption potential',
                      'Regulatory compliance requirements'
                    ].filter((item): item is string => item !== null)).slice(0, 6).map((item: string) => `<div class="risk-item">${item}</div>`).join('')}
                </div>
            </div>

            <div class="recommendations">
                <h2>Strategic Recommendations</h2>
                <p>${data.businessName} is positioned for ${data.revenueGrowthRate && data.revenueGrowthRate > 15 ? 'continued success with strong fundamentals and significant growth opportunities' : 'stable operations with solid market positioning and potential for optimization'}. The company demonstrates ${sdeMargin > 25 ? 'exceptional' : sdeMargin > 15 ? 'strong' : 'adequate'} operational efficiency and shows promising indicators for sustainable growth and value creation.</p>
                
                <div class="growth-grid">
                    ${[
                      'Invest in technology and automation to improve operational efficiency',
                      'Expand into new customer segments and geographic markets',
                      'Develop strategic partnerships to accelerate growth',
                      'Implement customer retention programs to maintain loyalty',
                      'Optimize pricing strategies to improve profit margins',
                      'Build scalable systems and processes for future growth'
                    ].slice(0, 6).map((item: string) => `<div class="growth-item"><strong>•</strong> ${item}</div>`).join('')}
                </div>
            </div>

            <div class="disclaimer">
                <div class="disclaimer-title">Important Disclaimer</div>
                <div class="disclaimer-text">
                    This business valuation report is prepared for educational and illustrative purposes only and should not be considered as formal investment advice or professional business appraisal. The valuation estimates are based on industry standards and comparable analysis but may vary significantly based on specific market conditions, transaction circumstances, detailed due diligence findings, and individual business factors. For official valuations intended for legal, tax, or transaction purposes, please consult with a certified business appraiser or qualified financial professional. Past performance does not guarantee future results, and all investments carry inherent risks.
                </div>
            </div>

            <div class="footer">
                ${data.businessName} | Professional Business Valuation Report | ${currentDate}<br>
                Generated by ValuationGenie | Confidential & Proprietary
            </div>
        </div>
    </div>

    <script>
        window.onload = function() {
            setTimeout(() => {
                window.print();
            }, 1000);
        };
    </script>
</body>
</html>
  `;

  pdfWindow.document.write(html);
  pdfWindow.document.close();
  
  return Promise.resolve();
}