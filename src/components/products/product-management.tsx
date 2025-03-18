import React from 'react';
import { Card } from '../ui/card';
import { Table } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs } from '../ui/tabs';
import { Form, FormGroup, FormLabel, Input, Select, Textarea } from '../ui/form';
import { ProgressBar } from '../ui/progress-bar';

export function ProductManagement() {
  // Mock data for products
  const products = [
    { 
      id: 'product_1', 
      name: 'Premium Widget', 
      category: 'premium', 
      quality: 8.5,
      innovation: 7.2,
      sustainability: 6.8,
      price: 300,
      cost: 150,
      inventory: 1245,
      capacity: 2000,
      status: 'active'
    },
    { 
      id: 'product_2', 
      name: 'Standard Widget', 
      category: 'mid-range', 
      quality: 6.5,
      innovation: 5.8,
      sustainability: 6.0,
      price: 150,
      cost: 75,
      inventory: 830,
      capacity: 3000,
      status: 'active'
    },
    { 
      id: 'product_3', 
      name: 'Basic Widget', 
      category: 'budget', 
      quality: 4.5,
      innovation: 3.2,
      sustainability: 5.0,
      price: 80,
      cost: 40,
      inventory: 560,
      capacity: 4000,
      status: 'low_stock'
    },
    { 
      id: 'product_4', 
      name: 'Next-Gen Widget', 
      category: 'premium', 
      quality: 9.2,
      innovation: 9.5,
      sustainability: 8.7,
      price: 450,
      cost: 225,
      inventory: 0,
      capacity: 0,
      status: 'development'
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
      key: 'price', 
      header: 'Price',
      render: (value) => new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(value)
    },
    { 
      key: 'cost', 
      header: 'Cost',
      render: (value) => new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(value)
    },
    { 
      key: 'inventory', 
      header: 'Inventory',
      render: (value) => new Intl.NumberFormat('en-US').format(value)
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => {
        const variants = {
          'active': 'success',
          'low_stock': 'warning',
          'discontinued': 'danger',
          'development': 'primary'
        };
        return <Badge variant={variants[value] || 'default'}>{value.replace('_', ' ')}</Badge>;
      }
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm">Edit</Button>
          <Button variant="outline" size="sm">Details</Button>
        </div>
      )
    }
  ];

  // Selected product for detail view
  const [selectedProduct, setSelectedProduct] = React.useState(products[0]);

  // Product detail tabs
  const productDetailTabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Quality">
              <div className="text-center">
                <div className="text-5xl font-bold text-indigo-600 mb-2">{selectedProduct.quality}</div>
                <div className="text-sm text-gray-500">out of 10</div>
              </div>
              <ProgressBar 
                value={selectedProduct.quality * 10} 
                max={100} 
                color="primary" 
                size="lg" 
                className="mt-4" 
              />
            </Card>
            <Card title="Innovation">
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">{selectedProduct.innovation}</div>
                <div className="text-sm text-gray-500">out of 10</div>
              </div>
              <ProgressBar 
                value={selectedProduct.innovation * 10} 
                max={100} 
                color="success" 
                size="lg" 
                className="mt-4" 
              />
            </Card>
            <Card title="Sustainability">
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-600 mb-2">{selectedProduct.sustainability}</div>
                <div className="text-sm text-gray-500">out of 10</div>
              </div>
              <ProgressBar 
                value={selectedProduct.sustainability * 10} 
                max={100} 
                color="warning" 
                size="lg" 
                className="mt-4" 
              />
            </Card>
          </div>
          
          <Card title="Product Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{selectedProduct.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="mt-1">
                  <Badge variant={
                    selectedProduct.category === 'premium' ? 'primary' : 
                    selectedProduct.category === 'mid-range' ? 'success' : 
                    'warning'
                  }>
                    {selectedProduct.category}
                  </Badge>
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Price</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {new Intl.NumberFormat('en-US', { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 0
                  }).format(selectedProduct.price)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Production Cost</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {new Intl.NumberFormat('en-US', { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 0
                  }).format(selectedProduct.cost)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Inventory</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {new Intl.NumberFormat('en-US').format(selectedProduct.inventory)} units
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Production Capacity</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {new Intl.NumberFormat('en-US').format(selectedProduct.capacity)} units/period
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1">
                  <Badge variant={
                    selectedProduct.status === 'active' ? 'success' : 
                    selectedProduct.status === 'low_stock' ? 'warning' : 
                    selectedProduct.status === 'development' ? 'primary' : 
                    'danger'
                  }>
                    {selectedProduct.status.replace('_', ' ')}
                  </Badge>
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Profit Margin</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {Math.round((selectedProduct.price - selectedProduct.cost) / selectedProduct.price * 100)}%
                </p>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'production',
      label: 'Production',
      content: (
        <div className="space-y-6">
          <Card title="Production Settings">
            <Form onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <FormLabel htmlFor="production-volume">Production Volume</FormLabel>
                  <Input 
                    id="production-volume" 
                    type="number" 
                    defaultValue={selectedProduct.capacity} 
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="quality-level">Quality Level</FormLabel>
                  <Input 
                    id="quality-level" 
                    type="range" 
                    min="1" 
                    max="10" 
                    step="0.1" 
                    defaultValue={selectedProduct.quality} 
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="automation-level">Automation Level</FormLabel>
                  <Select 
                    id="automation-level" 
                    options={[
                      { value: 'low', label: 'Low (Labor Intensive)' },
                      { value: 'medium', label: 'Medium (Balanced)' },
                      { value: 'high', label: 'High (Automated)' }
                    ]}
                    defaultValue="medium"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="sustainability-focus">Sustainability Focus</FormLabel>
                  <Select 
                    id="sustainability-focus" 
                    options={[
                      { value: 'low', label: 'Low (Cost Focused)' },
                      { value: 'medium', label: 'Medium (Balanced)' },
                      { value: 'high', label: 'High (Eco-Friendly)' }
                    ]}
                    defaultValue="medium"
                  />
                </FormGroup>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </Form>
          </Card>
          
          <Card title="Production Capacity Expansion">
            <Form onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <FormLabel htmlFor="capacity-increase">Capacity Increase</FormLabel>
                  <Input 
                    id="capacity-increase" 
                    type="number" 
                    defaultValue={1000} 
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="investment-amount">Investment Amount</FormLabel>
                  <Input 
                    id="investment-amount" 
                    type="text" 
                    value="$500,000" 
                    readOnly 
                  />
                </FormGroup>
                <FormGroup className="md:col-span-2">
                  <FormLabel htmlFor="implementation-time">Implementation Time</FormLabel>
                  <Select 
                    id="implementation-time" 
                    options={[
                      { value: '1', label: '1 Period (Rush - Higher Cost)' },
                      { value: '2', label: '2 Periods (Standard)' },
                      { value: '3', label: '3 Periods (Extended - Lower Cost)' }
                    ]}
                    defaultValue="2"
                  />
                </FormGroup>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="submit">Invest in Capacity</Button>
              </div>
            </Form>
          </Card>
        </div>
      )
    },
    {
      id: 'pricing',
      label: 'Pricing',
      content: (
        <div className="space-y-6">
          <Card title="Pricing Strategy">
            <Form onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <FormLabel htmlFor="base-price">Base Price</FormLabel>
                  <Input 
                    id="base-price" 
                    type="number" 
                    defaultValue={selectedProduct.price} 
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="pricing-strategy">Pricing Strategy</FormLabel>
                  <Select 
                    id="pricing-strategy" 
                    options={[
                      { value: 'premium', label: 'Premium (High Price, High Margin)' },
                      { value: 'competitive', label: 'Competitive (Market Average)' },
                      { value: 'penetration', label: 'Penetration (Low Price, High Volume)' }
                    ]}
                    defaultValue={selectedProduct.category === 'premium' ? 'premium' : selectedProduct.category === 'mid-range' ? 'competitive' : 'penetration'}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="discount-policy">Discount Policy</FormLabel>
                  <Select 
                    id="discount-policy" 
                    options={[
                      { value: 'none', label: 'No Discounts' },
                      { value: 'volume', label: 'Volume Discounts' },
                      { value: 'seasonal', label: 'Seasonal Promotions' },
                      { value: 'loyalty', label: 'Loyalty Discounts' }
                    ]}
                    defaultValue="none"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="price-elasticity">Estimated Price Elasticity</FormLabel>
                  <Input 
                    id="price-elasticity" 
                    type="text" 
                    value={selectedProduct.category === 'premium' ? 'Low (-0.8)' : selectedProduct.category === 'mid-range' ? 'Medium (-1.2)' : 'High (-1.8)'} 
                    readOnly 
                  />
                </FormGroup>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="submit">Update Pricing</Button>
              </div>
            </Form>
          </Card>
          
          <Card title="Competitor Pricing Analysis">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competitor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value Ratio</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Alpha Corp</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Alpha Premium</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$320</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8.7/10</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2.72</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Your Company</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{selectedProduct.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${selectedProduct.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{selectedProduct.quality}/10</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(selectedProduct.quality / (selectedProduct.price / 100)).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Beta Inc</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Beta Elite</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$280</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8.2/10</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2.93</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'marketing',
      label: 'Marketing',
      content: (
        <div className="space-y-6">
          <Card title="Marketing Campaign">
            <Form onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <FormLabel htmlFor="campaign-name">Campaign Name</FormLabel>
                  <Input 
                    id="campaign-name" 
                    type="text" 
                    placeholder="Spring Promotion" 
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="campaign-budget">Budget</FormLabel>
                  <Input 
                    id="campaign-budget" 
                    type="number" 
                    placeholder="50000" 
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="target-segment">Target Segment</FormLabel>
                  <Select 
                    id="target-segment" 
                    options={[
                      { value: 'all', label: 'All Segments' },
                      { value: 'premium', label: 'Premium Segment' },
                      { value: 'mid-range', label: 'Mid-Range Segment' },
                      { value: 'budget', label: 'Budget Segment' }
                    ]}
                    defaultValue={selectedProduct.category}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="campaign-duration">Duration</FormLabel>
                  <Select 
                    id="campaign-duration" 
                    options={[
                      { value: '1', label: '1 Period' },
                      { value: '2', label: '2 Periods' },
                      { value: '3', label: '3 Periods' }
                    ]}
                    defaultValue="1"
                  />
                </FormGroup>
                <FormGroup className="md:col-span-2">
                  <FormLabel htmlFor="channel-allocation">Channel Allocation</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <FormLabel htmlFor="digital">Digital</FormLabel>
                      <Input 
                        id="digital" 
                        type="number" 
                        defaultValue="40" 
                      />
                    </div>
                    <div>
                      <FormLabel htmlFor="tv">TV</FormLabel>
                      <Input 
                        id="tv" 
                        type="number" 
                        defaultValue="30" 
                      />
                    </div>
                    <div>
                      <FormLabel htmlFor="print">Print</FormLabel>
                      <Input 
                        id="print" 
                        type="number" 
                        defaultValue="20" 
                      />
                    </div>
                    <div>
                      <FormLabel htmlFor="other">Other</FormLabel>
                      <Input 
                        id="other" 
                        type="number" 
                        defaultValue="10" 
                      />
                    </div>
                  </div>
                </FormGroup>
                <FormGroup className="md:col-span-2">
                  <FormLabel htmlFor="campaign-message">Campaign Message</FormLabel>
                  <Textarea 
                    id="campaign-message" 
                    rows={3} 
                    placeholder="Enter the main message of your campaign" 
                  />
                </FormGroup>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="submit">Launch Campaign</Button>
              </div>
            </Form>
          </Card>
          
          <Card title="Previous Campaigns">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Winter Launch</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Q4 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$75,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Premium</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2.4x</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Badge variant="success">Completed</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Holiday Special</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Q4 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$50,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">All</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.8x</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Badge variant="success">Completed</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Card title="Product Catalog">
        <Table
          columns={productColumns}
          data={products}
          onRowClick={(row) => setSelectedProduct(row)}
        />
        <div className="mt-4 flex justify-end">
          <Button>Add New Product</Button>
        </div>
      </Card>

      <Card title={`Product Details: ${selectedProduct.name}`}>
        <Tabs tabs={productDetailTabs} />
      </Card>
    </div>
  );
}
