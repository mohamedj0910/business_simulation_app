import React from 'react';
import { Card } from '../ui/card';
import { Table } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs } from '../ui/tabs';
import { ChartContainer } from '../ui/chart-container';
import { StatCard } from '../ui/stat-card';

export function MarketAnalysis() {
  // Mock data for market analysis
  const marketSegments = [
    { 
      id: 'premium', 
      name: 'Premium', 
      size: 1500000, 
      growth: 5.2, 
      priceRange: '$250-$500',
      qualitySensitivity: 'High',
      priceSensitivity: 'Low',
      innovationPreference: 'High',
      sustainabilityPreference: 'High',
      share: 30
    },
    { 
      id: 'mid-range', 
      name: 'Mid-Range', 
      size: 2000000, 
      growth: 3.8, 
      priceRange: '$100-$250',
      qualitySensitivity: 'Medium',
      priceSensitivity: 'Medium',
      innovationPreference: 'Medium',
      sustainabilityPreference: 'Medium',
      share: 40
    },
    { 
      id: 'budget', 
      name: 'Budget', 
      size: 1500000, 
      growth: 2.1, 
      priceRange: '$50-$100',
      qualitySensitivity: 'Low',
      priceSensitivity: 'High',
      innovationPreference: 'Low',
      sustainabilityPreference: 'Low',
      share: 30
    }
  ];

  const competitors = [
    {
      id: 'alpha',
      name: 'Alpha Corp',
      marketShare: 24.5,
      growth: 3.2,
      strengths: ['Brand Recognition', 'Product Quality', 'Innovation'],
      weaknesses: ['High Prices', 'Limited Product Range'],
      strategy: 'Differentiation',
      products: [
        { name: 'Alpha Premium', segment: 'premium', price: 320, quality: 8.7, share: 35 },
        { name: 'Alpha Standard', segment: 'mid-range', price: 180, quality: 7.2, share: 22 }
      ]
    },
    {
      id: 'beta',
      name: 'Beta Inc',
      marketShare: 19.8,
      growth: 4.5,
      strengths: ['Competitive Pricing', 'Wide Distribution', 'Marketing'],
      weaknesses: ['Average Quality', 'Customer Service'],
      strategy: 'Cost Leadership',
      products: [
        { name: 'Beta Elite', segment: 'premium', price: 280, quality: 8.2, share: 28 },
        { name: 'Beta Standard', segment: 'mid-range', price: 160, quality: 6.8, share: 18 },
        { name: 'Beta Basic', segment: 'budget', price: 70, quality: 5.1, share: 15 }
      ]
    },
    {
      id: 'gamma',
      name: 'Gamma Ltd',
      marketShare: 15.2,
      growth: -0.8,
      strengths: ['Low Prices', 'Efficiency', 'Market Coverage'],
      weaknesses: ['Product Quality', 'Innovation', 'Brand Perception'],
      strategy: 'Cost Focus',
      products: [
        { name: 'Gamma Standard', segment: 'mid-range', price: 140, quality: 6.2, share: 14 },
        { name: 'Gamma Basic', segment: 'budget', price: 60, quality: 4.8, share: 25 }
      ]
    },
    {
      id: 'delta',
      name: 'Delta Group',
      marketShare: 12.7,
      growth: 1.2,
      strengths: ['Sustainability', 'Niche Focus', 'Customer Loyalty'],
      weaknesses: ['Limited Scale', 'High Costs', 'Narrow Appeal'],
      strategy: 'Differentiation Focus',
      products: [
        { name: 'Delta Premium', segment: 'premium', price: 350, quality: 9.1, share: 22 },
        { name: 'Delta Eco', segment: 'mid-range', price: 200, quality: 7.8, share: 12 }
      ]
    },
    {
      id: 'your',
      name: 'Your Company',
      marketShare: 18.3,
      growth: 2.1,
      strengths: ['Balanced Portfolio', 'Innovation', 'Adaptability'],
      weaknesses: ['Market Position', 'Brand Recognition'],
      strategy: 'Hybrid',
      products: [
        { name: 'Premium Widget', segment: 'premium', price: 300, quality: 8.5, share: 15 },
        { name: 'Standard Widget', segment: 'mid-range', price: 150, quality: 6.5, share: 20 },
        { name: 'Basic Widget', segment: 'budget', price: 80, quality: 4.5, share: 18 }
      ]
    }
  ];

  const economicIndicators = [
    { name: 'GDP Growth', value: 2.8, change: 0.3, unit: '%' },
    { name: 'Inflation Rate', value: 2.1, change: -0.2, unit: '%' },
    { name: 'Interest Rate', value: 3.5, change: 0.5, unit: '%' },
    { name: 'Unemployment', value: 4.2, change: -0.3, unit: '%' },
    { name: 'Consumer Confidence', value: 102.8, change: 1.5, unit: 'index' },
    { name: 'Business Sentiment', value: 56.4, change: 2.2, unit: 'index' }
  ];

  const marketTrends = [
    { 
      name: 'Sustainability Focus', 
      description: 'Consumers are increasingly valuing sustainable products and practices.',
      impact: 'medium',
      type: 'opportunity',
      affectedSegments: ['premium', 'mid-range']
    },
    { 
      name: 'Digital Transformation', 
      description: 'Companies investing in digital technologies are seeing higher growth rates.',
      impact: 'high',
      type: 'opportunity',
      affectedSegments: ['premium', 'mid-range', 'budget']
    },
    { 
      name: 'Supply Chain Disruptions', 
      description: 'Ongoing global supply chain challenges are affecting production costs and delivery times.',
      impact: 'medium',
      type: 'threat',
      affectedSegments: ['premium', 'mid-range', 'budget']
    },
    { 
      name: 'Changing Consumer Preferences', 
      description: 'Shift towards more personalized and customizable products.',
      impact: 'medium',
      type: 'opportunity',
      affectedSegments: ['premium', 'mid-range']
    },
    { 
      name: 'Regulatory Changes', 
      description: 'New regulations on product safety and environmental impact are expected.',
      impact: 'high',
      type: 'threat',
      affectedSegments: ['budget', 'mid-range']
    }
  ];

  const segmentColumns = [
    { key: 'name', header: 'Segment' },
    { 
      key: 'size', 
      header: 'Market Size',
      render: (value) => new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(value)
    },
    { 
      key: 'share', 
      header: 'Share',
      render: (value) => `${value}%`
    },
    { 
      key: 'growth', 
      header: 'Growth',
      render: (value) => {
        const color = value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-gray-500';
        const prefix = value > 0 ? '+' : '';
        return <span className={color}>{prefix}{value}%</span>;
      }
    },
    { key: 'priceRange', header: 'Price Range' },
    { 
      key: 'qualitySensitivity', 
      header: 'Quality Sensitivity',
      render: (value) => {
        const variants = {
          'High': 'primary',
          'Medium': 'success',
          'Low': 'warning'
        };
        return <Badge variant={variants[value] || 'default'}>{value}</Badge>;
      }
    },
    { 
      key: 'priceSensitivity', 
      header: 'Price Sensitivity',
      render: (value) => {
        const variants = {
          'High': 'danger',
          'Medium': 'warning',
          'Low': 'success'
        };
        return <Badge variant={variants[value] || 'default'}>{value}</Badge>;
      }
    }
  ];

  const competitorColumns = [
    { key: 'name', header: 'Competitor' },
    { 
      key: 'marketShare', 
      header: 'Market Share',
      render: (value) => `${value}%`
    },
    { 
      key: 'growth', 
      header: 'Growth',
      render: (value) => {
        const color = value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-gray-500';
        const prefix = value > 0 ? '+' : '';
        return <span className={color}>{prefix}{value}%</span>;
      }
    },
    { key: 'strategy', header: 'Strategy' },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <Button variant="secondary" size="sm">Details</Button>
      )
    }
  ];

  const [selectedCompetitor, setSelectedCompetitor] = React.useState(competitors[0]);

  // Market analysis tabs
  const marketAnalysisTabs = [
    {
      id: 'segments',
      label: 'Market Segments',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marketSegments.map((segment) => (
              <Card key={segment.id} title={segment.name}>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Market Size:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Intl.NumberFormat('en-US', { 
                        style: 'currency', 
                        currency: 'USD',
                        maximumFractionDigits: 0
                      }).format(segment.size)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Growth Rate:</span>
                    <span className={`text-sm font-medium ${segment.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {segment.growth > 0 ? '+' : ''}{segment.growth}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Price Range:</span>
                    <span className="text-sm font-medium text-gray-900">{segment.priceRange}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Quality Sensitivity:</span>
                    <Badge variant={
                      segment.qualitySensitivity === 'High' ? 'primary' : 
                      segment.qualitySensitivity === 'Medium' ? 'success' : 
                      'warning'
                    }>
                      {segment.qualitySensitivity}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Price Sensitivity:</span>
                    <Badge variant={
                      segment.priceSensitivity === 'High' ? 'danger' : 
                      segment.priceSensitivity === 'Medium' ? 'warning' : 
                      'success'
                    }>
                      {segment.priceSensitivity}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Innovation Preference:</span>
                    <Badge variant={
                      segment.innovationPreference === 'High' ? 'primary' : 
                      segment.innovationPreference === 'Medium' ? 'success' : 
                      'warning'
                    }>
                      {segment.innovationPreference}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Sustainability Preference:</span>
                    <Badge variant={
                      segment.sustainabilityPreference === 'High' ? 'primary' : 
                      segment.sustainabilityPreference === 'Medium' ? 'success' : 
                      'warning'
                    }>
                      {segment.sustainabilityPreference}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <Card title="Market Segment Distribution">
            <ChartContainer>
              <div className="flex items-center justify-center h-full bg-gray-100 rounded-md">
                <p className="text-gray-500">Market Segment Distribution Chart</p>
              </div>
            </ChartContainer>
          </Card>
          
          <Card title="Segment Growth Trends">
            <ChartContainer>
              <div className="flex items-center justify-center h-full bg-gray-100 rounded-md">
                <p className="text-gray-500">Segment Growth Trends Chart</p>
              </div>
            </ChartContainer>
          </Card>
        </div>
      )
    },
    {
      id: 'competitors',
      label: 'Competitor Analysis',
      content: (
        <div className="space-y-6">
          <Card title="Competitor Overview">
            <Table
              columns={competitorColumns}
              data={competitors}
              onRowClick={(row) => setSelectedCompetitor(row)}
            />
          </Card>
          
          <Card title={`Competitor Details: ${selectedCompetitor.name}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Company Profile</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Market Share:</span>
                    <span className="text-sm font-medium text-gray-900">{selectedCompetitor.marketShare}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Growth Rate:</span>
                    <span className={`text-sm font-medium ${selectedCompetitor.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedCompetitor.growth > 0 ? '+' : ''}{selectedCompetitor.growth}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Strategy:</span>
                    <span className="text-sm font-medium text-gray-900">{selectedCompetitor.strategy}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-4">Strengths</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedCompetitor.strengths.map((strength, index) => (
                    <li key={index} className="text-sm text-gray-600">{strength}</li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-4">Weaknesses</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedCompetitor.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-sm text-gray-600">{weakness}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Portfolio</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedCompetitor.products.map((product, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Badge variant={
                              product.segment === 'premium' ? 'primary' : 
                              product.segment === 'mid-range' ? 'success' : 
                              'warning'
                            }>
                              {product.segment}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${product.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.quality}/10
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.share}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-4">Competitive Position</h3>
                <ChartContainer height="h-60">
                  <div className="flex items-center justify-center h-full bg-gray-100 rounded-md">
                    <p className="text-gray-500">Competitive Position Chart</p>
                  </div>
                </ChartContainer>
              </div>
            </div>
          </Card>
          
          <Card title="Market Share Analysis">
            <ChartContainer>
              <div className="flex items-center justify-center h-full bg-gray-100 rounded-md">
                <p className="text-gray-500">Market Share Analysis Chart</p>
              </div>
            </ChartContainer>
          </Card>
        </div>
      )
    },
    {
      id: 'trends',
      label: 'Market Trends',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Economic Indicators">
              <div className="space-y-4">
                {economicIndicators.map((indicator, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">{indicator.name}:</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">
                        {indicator.value}{indicator.unit}
                      </span>
                      <span className={`text-xs font-medium ${indicator.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {indicator.change > 0 ? '+' : ''}{indicator.change}{indicator.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card title="Consumer Trends">
              <ChartContainer>
                <div className="flex items-center justify-center h-full bg-gray-100 rounded-md">
                  <p className="text-gray-500">Consumer Trends Chart</p>
                </div>
              </ChartContainer>
            </Card>
          </div>
          
          <Card title="Market Trends and Opportunities">
            <div className="space-y-4">
              {marketTrends.map((trend, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-gray-50 rounded-md"
                >
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 mr-2 ${trend.type === 'opportunity' ? 'text-green-500' : 'text-red-500'}`}
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      {trend.type === 'opportunity' ? (
                        <path 
                          fillRule="evenodd" 
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" 
                          clipRule="evenodd" 
                        />
                      ) : (
                        <path 
                          fillRule="evenodd" 
                          d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" 
                          clipRule="evenodd" 
                        />
                      )}
                    </svg>
                    {trend.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {trend.description}
                  </p>
                  <div className="mt-2 flex items-center">
                    <Badge 
                      variant={trend.impact === 'high' ? 'danger' : trend.impact === 'medium' ? 'warning' : 'success'}
                      size="sm"
                    >
                      {trend.impact} impact
                    </Badge>
                    <span className="mx-2 text-gray-300">•</span>
                    <Badge 
                      variant={trend.type === 'opportunity' ? 'success' : 'danger'}
                      size="sm"
                    >
                      {trend.type}
                    </Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500">Affected segments:</span>
                    {trend.affectedSegments.map((segment, i) => (
                      <Badge 
                        key={i}
                        variant={
                          segment === 'premium' ? 'primary' : 
                          segment === 'mid-range' ? 'success' : 
                          'warning'
                        }
                        size="sm"
                      >
                        {segment}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card title="Technology Trends">
            <ChartContainer>
              <div className="flex items-center justify-center h-full bg-gray-100 rounded-md">
                <p className="text-gray-500">Technology Trends Chart</p>
              </div>
            </ChartContainer>
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Market Size"
          value={5000000}
          change={3.5}
          format="currency"
        />
        <StatCard
          title="Market Growth Rate"
          value={3.5}
          change={0.2}
          format="percent"
        />
        <StatCard
          title="Your Market Share"
          value={18.3}
          change={2.1}
          format="percent"
        />
      </div>

      <Card title="Market Analysis">
        <Tabs tabs={marketAnalysisTabs} />
      </Card>
    </div>
  );
}
