import React from 'react';
import { Card } from '../ui/card';
import { StatCard } from '../ui/stat-card';
import { Tabs } from '../ui/tabs';
import { Table } from '../ui/table';
import { ChartContainer } from '../ui/chart-container';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export function Dashboard() {
  // Mock data for the dashboard
  const financialMetrics = [
    { title: 'Cash Balance', value: 1245000, change: 5.2, format: 'currency' },
    { title: 'Revenue', value: 876500, change: 12.4, format: 'currency' },
    { title: 'Profit', value: 356500, change: 22.9, format: 'currency' },
    { title: 'Market Share', value: 18.3, change: 2.1, format: 'percent' }
  ];

  const productData = [
    { 
      id: 'product_1', 
      name: 'Premium Widget', 
      category: 'premium', 
      sales: 1245, 
      revenue: 373500, 
      profit: 186750, 
      marketShare: 24.5,
      status: 'active'
    },
    { 
      id: 'product_2', 
      name: 'Standard Widget', 
      category: 'mid-range', 
      sales: 2830, 
      revenue: 424500, 
      profit: 169800, 
      marketShare: 15.2,
      status: 'active'
    },
    { 
      id: 'product_3', 
      name: 'Basic Widget', 
      category: 'budget', 
      sales: 1560, 
      revenue: 78000, 
      profit: 23400, 
      marketShare: 8.7,
      status: 'low_stock'
    }
  ];

  const competitorData = [
    { name: 'Alpha Corp', marketShare: 24.5, growth: 3.2 },
    { name: 'Beta Inc', marketShare: 19.8, growth: 4.5 },
    { name: 'Your Company', marketShare: 18.3, growth: 2.1 },
    { name: 'Gamma Ltd', marketShare: 15.2, growth: -0.8 },
    { name: 'Delta Group', marketShare: 12.7, growth: 1.2 },
    { name: 'Others', marketShare: 9.5, growth: -1.5 }
  ];

  const marketTrends = [
    { 
      name: 'Premium Segment Growth', 
      description: 'The premium segment is growing at 5.2%, faster than other segments.',
      impact: 'high',
      type: 'opportunity'
    },
    { 
      name: 'Sustainability Focus', 
      description: 'Consumers are increasingly valuing sustainable products and practices.',
      impact: 'medium',
      type: 'opportunity'
    },
    { 
      name: 'Digital Transformation', 
      description: 'Companies investing in digital technologies are seeing higher growth rates.',
      impact: 'high',
      type: 'opportunity'
    },
    { 
      name: 'Supply Chain Disruptions', 
      description: 'Ongoing global supply chain challenges are affecting production costs and delivery times.',
      impact: 'medium',
      type: 'threat'
    }
  ];

  const productColumns = [
    { key: 'name', header: 'Product' },
    { 
      key: 'category', 
      header: 'Category',
      render: (value) => {
        const variants = {
          'premium': 'primary',
          'mid-range': 'success',
          'budget': 'warning'
        };
        return <Badge variant={variants[value] || 'default'}>{value}</Badge>;
      }
    },
    { 
      key: 'sales', 
      header: 'Sales',
      render: (value) => new Intl.NumberFormat('en-US').format(value)
    },
    { 
      key: 'revenue', 
      header: 'Revenue',
      render: (value) => new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(value)
    },
    { 
      key: 'profit', 
      header: 'Profit',
      render: (value) => new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(value)
    },
    { 
      key: 'marketShare', 
      header: 'Market Share',
      render: (value) => `${value}%`
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => {
        const variants = {
          'active': 'success',
          'low_stock': 'warning',
          'discontinued': 'danger'
        };
        return <Badge variant={variants[value] || 'default'}>{value.replace('_', ' ')}</Badge>;
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
    }
  ];

  return (
    <div className="space-y-6">
      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialMetrics.map((metric, index) => (
          <StatCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            format={metric.format}
          />
        ))}
      </div>

      {/* Financial Performance Chart */}
      <Card title="Financial Performance">
        <ChartContainer>
          <div className="flex items-center justify-center h-full bg-gray-100 rounded-md">
            <p className="text-gray-500">Financial Performance Chart</p>
          </div>
        </ChartContainer>
      </Card>

      {/* Product Performance */}
      <Card 
        title="Product Performance" 
        actions={
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => console.log('View all products')}
          >
            View All
          </Button>
        }
      >
        <Table
          columns={productColumns}
          data={productData}
          onRowClick={(row) => console.log('Product clicked:', row)}
        />
      </Card>

      {/* Market Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Competitor Analysis */}
        <Card 
          title="Competitor Analysis" 
          className="lg:col-span-2"
        >
          <Table
            columns={competitorColumns}
            data={competitorData}
          />
        </Card>

        {/* Market Trends */}
        <Card title="Market Trends">
          <div className="space-y-4">
            {marketTrends.map((trend, index) => (
              <div 
                key={index} 
                className="p-4 bg-gray-50 rounded-md"
              >
                <h3 className="font-medium text-gray-900 flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2 text-indigo-500" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" 
                      clipRule="evenodd" 
                    />
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
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
