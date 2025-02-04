'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import html2pdf from 'html2pdf.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Dynamically import Chart components
const DynamicPie = dynamic(() => import('react-chartjs-2').then(mod => mod.Pie), { ssr: false });
const DynamicBar = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), { ssr: false });

const IndividualUnitReport = ({ unit, index, propertyName, theme, color, customizations }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case 'classic':
        return 'font-serif';
      case 'minimal':
        return 'font-light tracking-wide';
      case 'bold':
        return 'font-bold tracking-tight';
      default: // modern
        return 'font-sans';
    }
  };

  const getColorStyles = () => {
    const colors = {
      blue: { primary: '#2563eb', secondary: '#dbeafe', accent: '#bfdbfe' },
      green: { primary: '#059669', secondary: '#d1fae5', accent: '#a7f3d0' },
      purple: { primary: '#7c3aed', secondary: '#ede9fe', accent: '#ddd6fe' },
      gray: { primary: '#4b5563', secondary: '#f3f4f6', accent: '#e5e7eb' }
    };
    return colors[color] || colors.blue;
  };

  const themeStyles = getThemeStyles();
  const colorStyles = getColorStyles();

  const calculateMetrics = () => {
    const rentPerSqFt = unit.rent / unit.squareFootage;
    const annualRent = unit.rent * 12;
    const monthlyUtilities = (
      (!unit.tenantPaysWater ? unit.waterBill : 0) +
      (!unit.tenantPaysGas ? unit.gasBill : 0) +
      (!unit.tenantPaysElectric ? unit.electricBill : 0)
    );
    const annualUtilities = monthlyUtilities * 12;

    return {
      rentPerSqFt,
      annualRent,
      monthlyUtilities,
      annualUtilities
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className={`hidden print:block page-break-before ${themeStyles}`}>
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Unit Header */}
        <div className="mb-12">
          {customizations.includeLogo && (
            <div className="mb-8 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Company Logo</span>
            </div>
          )}
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 
                className="text-4xl font-bold mb-2"
                style={{ color: colorStyles.primary }}
              >
                Unit {index + 1} Analysis
              </h1>
              <h2 className="text-2xl text-gray-600">{propertyName}</h2>
            </div>
            {customizations.includeTimestamp && (
              <p className="text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
            )}
          </div>
        </div>

        {/* Unit Overview */}
        <div className="mb-12">
          <h2 
            className="text-2xl font-bold mb-6 pb-4 border-b"
            style={{ borderColor: colorStyles.accent }}
          >
            Unit Overview
          </h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 rounded-xl" style={{ backgroundColor: colorStyles.secondary }}>
                <h3 className="text-lg font-medium mb-4">Physical Characteristics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Square Footage</span>
                    <span className="font-medium">{unit.squareFootage} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bedrooms</span>
                    <span className="font-medium">{unit.bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bathrooms</span>
                    <span className="font-medium">{unit.bathrooms}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 rounded-xl" style={{ backgroundColor: colorStyles.secondary }}>
                <h3 className="text-lg font-medium mb-4">Financial Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Rent</span>
                    <span className="font-medium">${unit.rent.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Rent</span>
                    <span className="font-medium">${metrics.annualRent.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rent per Sq Ft</span>
                    <span className="font-medium">${metrics.rentPerSqFt.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Utility Configuration */}
        <div className="mb-12">
          <h2 
            className="text-2xl font-bold mb-6 pb-4 border-b"
            style={{ borderColor: colorStyles.accent }}
          >
            Utility Configuration
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { name: 'Water', isPaid: unit.tenantPaysWater, cost: unit.waterBill },
              { name: 'Gas', isPaid: unit.tenantPaysGas, cost: unit.gasBill },
              { name: 'Electric', isPaid: unit.tenantPaysElectric, cost: unit.electricBill }
            ].map((utility, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl"
                style={{ backgroundColor: colorStyles.secondary }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{utility.name}</h3>
                  <span 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      utility.isPaid
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {utility.isPaid ? 'Tenant Paid' : 'Landlord Paid'}
                  </span>
                </div>
                {!utility.isPaid && (
                  <div className="text-gray-600">
                    Monthly Cost: ${utility.cost.toFixed(2)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        {customizations.includeFooter && (
          <div className="border-t py-6">
            <div className="flex justify-between text-sm text-gray-500">
              {customizations.companyContact && (
                <span>{customizations.companyContact}</span>
              )}
              {customizations.includePageNumbers && (
                <span>Page {index + 2}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Utility function for calculating property expenses
const calculatePropertyExpenses = (data) => {
  const settings = data.propertySettings;
  const expenses = data.customExpenses;
  const units = data.units;

  const globalExpenses = settings.mortgagePayment + 
                       settings.propertyInsurance +
                       (settings.landlordPaysTrash ? settings.trashCost : 0);

  const customExpensesTotal = expenses.reduce((total, expense) => {
    return total + (expense.frequency === 'yearly' ? expense.amount / 12 : expense.amount);
  }, 0);

  const utilityExpenses = units.reduce((acc, unit) => {
    const waterCost = settings.singleWaterMeter 
      ? settings.totalWaterBill / units.length 
      : (!unit.tenantPaysWater ? unit.waterBill : 0);

    return acc + waterCost +
      (!unit.tenantPaysGas ? unit.gasBill : 0) +
      (!unit.tenantPaysElectric ? unit.electricBill : 0);
  }, 0);

  return globalExpenses + customExpensesTotal + utilityExpenses;
};

const IndividualPropertyReport = ({ property, theme, color, customizations }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case 'classic':
        return 'font-serif';
      case 'minimal':
        return 'font-light tracking-wide';
      case 'bold':
        return 'font-bold tracking-tight';
      default: // modern
        return 'font-sans';
    }
  };

  const getColorStyles = () => {
    const colors = {
      blue: { primary: '#2563eb', secondary: '#dbeafe', accent: '#bfdbfe' },
      green: { primary: '#059669', secondary: '#d1fae5', accent: '#a7f3d0' },
      purple: { primary: '#7c3aed', secondary: '#ede9fe', accent: '#ddd6fe' },
      gray: { primary: '#4b5563', secondary: '#f3f4f6', accent: '#e5e7eb' }
    };
    return colors[color] || colors.blue;
  };

  const themeStyles = getThemeStyles();
  const colorStyles = getColorStyles();

  const calculatePropertyMetrics = () => {
    try {
      const income = property.data.units.reduce((sum, unit) => sum + unit.rent, 0);
      const expenses = calculatePropertyExpenses(property.data);
      const profit = income - expenses;
      const totalUnits = property.data.units.length;
      const averageRent = income / totalUnits;
      const totalSquareFootage = property.data.units.reduce((sum, unit) => sum + (unit.squareFootage || 0), 0);
      const rentPerSqFt = totalSquareFootage > 0 ? income / totalSquareFootage : 0;

      return {
        income,
        expenses,
        profit,
        totalUnits,
        averageRent,
        totalSquareFootage,
        rentPerSqFt
      };
    } catch (error) {
      console.error('Error calculating property metrics:', error);
      return {
        income: 0,
        expenses: 0,
        profit: 0,
        totalUnits: 0,
        averageRent: 0,
        totalSquareFootage: 0,
        rentPerSqFt: 0
      };
    }
  };

  const metrics = calculatePropertyMetrics();

  return (
    <div className="print-page">
      <div className={`${themeStyles} max-w-4xl mx-auto px-8 py-12`}>
        {/* Property Header */}
        <div className="mb-12">
          {customizations.includeLogo && (
            <div className="mb-8 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Company Logo</span>
            </div>
          )}
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 
                className="text-4xl font-bold mb-2"
                style={{ color: colorStyles.primary }}
              >
                Property Analysis
              </h1>
              <h2 className="text-2xl text-gray-600">{property.name}</h2>
            </div>
            {customizations.includeTimestamp && (
              <p className="text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
            )}
          </div>
        </div>

        {/* Property Overview */}
        <div className="mb-12">
          <h2 
            className="text-2xl font-bold mb-6 pb-4 border-b"
            style={{ borderColor: colorStyles.accent }}
          >
            Property Overview
          </h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 rounded-xl" style={{ backgroundColor: colorStyles.secondary }}>
                <h3 className="text-lg font-bold mb-4">Physical Characteristics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Units</span>
                    <span className="font-medium">{metrics.totalUnits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Square Footage</span>
                    <span className="font-medium">{metrics.totalSquareFootage} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Rent per Sq Ft</span>
                    <span className="font-medium">${metrics.rentPerSqFt.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 rounded-xl" style={{ backgroundColor: colorStyles.secondary }}>
                <h3 className="text-lg font-medium mb-4">Financial Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Income</span>
                    <span className="font-medium">${metrics.income.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Expenses</span>
                    <span className="font-medium">${metrics.expenses.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Profit</span>
                    <span className="font-medium" style={{ color: colorStyles.primary }}>
                      ${metrics.profit.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unit Details */}
        <div className="mb-12">
          <h2 
            className="text-2xl font-bold mb-6 pb-4 border-b"
            style={{ borderColor: colorStyles.accent }}
          >
            Unit Details
          </h2>
          <div className="space-y-6">
            {property.data.units.map((unit, index) => (
              <div key={index} className="p-6 rounded-xl" style={{ backgroundColor: colorStyles.secondary }}>
                <h3 className="text-lg font-medium mb-4">Unit {index + 1}</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-600 mb-1">Square Footage</p>
                    <p className="font-medium">{unit.squareFootage} sq ft</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Monthly Rent</p>
                    <p className="font-medium">${unit.rent.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Rent per Sq Ft</p>
                    <p className="font-medium">${(unit.rent / unit.squareFootage).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        {customizations.includeFooter && (
          <div className="border-t py-6 print:break-inside-avoid">
            <div className="flex justify-between text-sm text-gray-500">
              {customizations.companyContact && (
                <span>{customizations.companyContact}</span>
              )}
              {customizations.includePageNumbers && (
                <span>Page {property.index + 2}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const printStyles = `
  @media print {
    @page {
      size: letter;
      margin: 0.75in;
    }
    
    .print-container {
      width: 100%;
      max-width: 100%;
      margin: 0;
      padding: 0;
    }

    .page {
      break-after: page;
      break-inside: avoid;
      padding-top: 1in;
      border-top: 3px solid #e5e7eb;
    }

    .portfolio-overview {
      break-after: page;
      break-inside: avoid;
      padding-bottom: 1in;
    }

    .property-section {
      display: block;
      break-before: page;
      break-inside: avoid;
      margin-top: 0;
      padding-top: 1in;
      border-top: 3px solid #e5e7eb;
    }

    .section-header {
      padding-bottom: 0.5in;
      margin-bottom: 0.5in;
      border-bottom: 2px solid #e5e7eb;
    }

    .chart-section {
      break-inside: avoid;
      margin-bottom: 1in;
      padding: 0.5in;
      background-color: #f9fafb;
      border-radius: 0.5rem;
    }

    .chart-container {
      break-inside: avoid;
      height: 250px !important;
      max-width: 3.5in !important;
      margin: 0 auto;
      padding: 0.25in;
      background-color: white;
      border-radius: 0.25rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .metrics-container {
      break-inside: avoid;
      margin-bottom: 1in;
      padding: 0.5in;
      background-color: #f9fafb;
      border-radius: 0.5rem;
    }

    .unit-details {
      break-inside: avoid;
      margin-bottom: 1in;
      padding: 0.5in;
      background-color: #f9fafb;
      border-radius: 0.5rem;
    }
  }
`;

// Process all properties for total metrics
const calculatePortfolioMetrics = (properties) => {
  const portfolioMetrics = {
      totalIncome: 0,
      totalExpenses: 0,
      totalProfit: 0,
    expenseCategories: {
      mortgage: 0,
      insurance: 0,
      utilities: 0,
      other: 0
    },
      totalUnits: 0,
    totalSquareFootage: 0,
    averageRentPerSqFt: 0,
    occupancyRate: 0,
    totalProperties: properties.length
  };

  properties.forEach(property => {
    const data = property.data;
    
    // Calculate total units and square footage
    portfolioMetrics.totalUnits += data.units.length;
    portfolioMetrics.totalSquareFootage += data.units.reduce((sum, unit) => 
      sum + (unit.squareFootage || 0), 0);

    // Calculate monthly income
    const monthlyIncome = data.units.reduce((sum, unit) => sum + unit.rent, 0);
    portfolioMetrics.totalIncome += monthlyIncome;

    // Calculate monthly expenses by category
    const mortgageExpense = data.propertySettings.mortgagePayment || 0;
    const insuranceExpense = data.propertySettings.propertyInsurance || 0;
    
    // Calculate utility expenses
    const utilityExpenses = data.units.reduce((sum, unit) => {
      return sum + 
        (!unit.tenantPaysWater ? unit.waterBill : 0) +
        (!unit.tenantPaysGas ? unit.gasBill : 0) +
        (!unit.tenantPaysElectric ? unit.electricBill : 0);
    }, 0);

    // Calculate other expenses (including maintenance and custom expenses)
    const maintenanceReserve = (data.propertySettings.maintenanceReserve || 0.05) * monthlyIncome;
    const customExpenses = data.customExpenses.reduce((sum, expense) => 
      sum + (expense.frequency === 'yearly' ? expense.amount / 12 : expense.amount), 0);
    const otherExpenses = maintenanceReserve + customExpenses;

    // Update expense categories
    portfolioMetrics.expenseCategories.mortgage += mortgageExpense;
    portfolioMetrics.expenseCategories.insurance += insuranceExpense;
    portfolioMetrics.expenseCategories.utilities += utilityExpenses;
    portfolioMetrics.expenseCategories.other += otherExpenses;

    // Calculate total expenses for this property
    const totalPropertyExpenses = mortgageExpense + insuranceExpense + utilityExpenses + otherExpenses;
    portfolioMetrics.totalExpenses += totalPropertyExpenses;
  });

  // Calculate total profit
  portfolioMetrics.totalProfit = portfolioMetrics.totalIncome - portfolioMetrics.totalExpenses;

  // Calculate average rent per square foot
  portfolioMetrics.averageRentPerSqFt = portfolioMetrics.totalSquareFootage > 0 
    ? portfolioMetrics.totalIncome / portfolioMetrics.totalSquareFootage 
    : 0;

  return portfolioMetrics;
};

const PortfolioReport = ({ properties, printOptions }) => {
  useEffect(() => {
    // Add print styles
    const styleSheet = document.createElement("style");
    styleSheet.innerText = printStyles;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  const generatePDF = () => {
    const element = document.getElementById('portfolio-report');
    const opt = {
      margin: [0.75, 0.75, 0.75, 0.75],
      filename: 'portfolio-report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: true
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait'
      }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  // Calculate portfolio metrics
  const portfolioMetrics = calculatePortfolioMetrics(properties);

  // Prepare data for property comparison chart
  const propertyComparisonData = {
    labels: properties.map(p => p.name),
    datasets: [
      {
        label: 'Monthly Income',
        data: properties.map(p => 
          p.data.units.reduce((sum, unit) => sum + unit.rent, 0)
        ),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
      {
        label: 'Monthly Expenses',
        data: properties.map(p => {
          const data = p.data;
          const monthlyIncome = data.units.reduce((sum, unit) => sum + unit.rent, 0);
          const maintenanceReserve = (data.propertySettings.maintenanceReserve || 0.05) * monthlyIncome;
          
          return data.propertySettings.mortgagePayment +
                 data.propertySettings.propertyInsurance +
                 data.units.reduce((sum, unit) => sum + 
                   (!unit.tenantPaysWater ? unit.waterBill : 0) +
                   (!unit.tenantPaysGas ? unit.gasBill : 0) +
                   (!unit.tenantPaysElectric ? unit.electricBill : 0), 0) +
                 maintenanceReserve +
                 data.customExpenses.reduce((sum, expense) => 
                   sum + (expense.frequency === 'yearly' ? expense.amount / 12 : expense.amount), 0);
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      }
    ]
  };

  // Prepare data for expense breakdown pie chart
  const expenseBreakdownData = {
    labels: ['Mortgage', 'Insurance', 'Utilities', 'Other'],
    datasets: [{
      data: [
        portfolioMetrics.expenseCategories.mortgage,
        portfolioMetrics.expenseCategories.insurance,
        portfolioMetrics.expenseCategories.utilities,
        portfolioMetrics.expenseCategories.other
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)'
      ]
    }]
  };

  return (
    <>
      <button 
        onClick={generatePDF}
        className="print:hidden mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Generate PDF
      </button>
      
      <div id="portfolio-report" className="print-container">
        {/* Portfolio Overview - First Page */}
        <div className="portfolio-overview">
          <div className="section-header">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {printOptions.customizations.reportTitle || 'Real Estate Portfolio Analysis'}
            </h1>
                <p className="text-sm text-gray-600 mt-1">Generated on {new Date().toLocaleDateString()}</p>
              </div>
              {printOptions.customizations.includeLogo && (
                <div className="w-32">
                  <img src="/logo.png" alt="Company Logo" className="w-full" />
                </div>
              )}
            </div>
            {printOptions.customizations.companyName && (
              <div className="mt-4 text-sm text-gray-600">
                <p>{printOptions.customizations.companyName}</p>
                <p>{printOptions.customizations.companyContact}</p>
              </div>
            )}
          </div>

          {/* Portfolio Overview */}
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4">Portfolio Overview</h2>
            
            {/* Portfolio Summary Blurb - More Compact */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-gray-600">Portfolio Size:</span>
                  <p className="font-medium">
                    {portfolioMetrics.totalProperties} properties • {portfolioMetrics.totalUnits} units • {portfolioMetrics.totalSquareFootage.toLocaleString()} sq ft
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Monthly Performance:</span>
                  <p className="font-medium">
                    ${portfolioMetrics.totalIncome.toFixed(0)} revenue • ${Math.abs(portfolioMetrics.totalProfit).toFixed(0)} {portfolioMetrics.totalProfit >= 0 ? 'profit' : 'loss'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-gray-600">Key Metrics:</span>
                  <p className="font-medium">
                    ${portfolioMetrics.averageRentPerSqFt.toFixed(2)}/sq ft • {((portfolioMetrics.totalProfit / portfolioMetrics.totalIncome) * 100).toFixed(1)}% margin
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Major Expenses:</span>
                  <p className="font-medium">
                    ${portfolioMetrics.expenseCategories.mortgage.toFixed(0)} mortgage • ${portfolioMetrics.expenseCategories.utilities.toFixed(0)} utilities
                  </p>
                </div>
              </div>

              <div className="text-gray-600 text-sm border-t pt-3 mt-3">
                <strong>Portfolio Analysis:</strong> {portfolioMetrics.totalProfit > 0 ? 'Positive cash flow' : 'Optimization needed'} with 
                {portfolioMetrics.averageRentPerSqFt > 1 ? ' competitive' : ' below-market'} rent rates. 
                {portfolioMetrics.expenseCategories.utilities > portfolioMetrics.expenseCategories.mortgage * 0.3 
                  ? 'Consider utility efficiency improvements.' 
                  : 'Efficient expense management in place.'}
            </div>
          </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Monthly Income</h3>
                <p className="text-xl font-bold text-blue-600">
                  ${portfolioMetrics.totalIncome.toFixed(0)}
                </p>
                <p className="text-xs text-gray-500">
                  {portfolioMetrics.totalUnits} Units • ${portfolioMetrics.averageRentPerSqFt.toFixed(2)}/sqft
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Monthly Expenses</h3>
                <p className="text-xl font-bold text-red-600">
                  ${portfolioMetrics.totalExpenses.toFixed(0)}
                </p>
                <p className="text-xs text-gray-500">
                  {portfolioMetrics.totalProperties} Properties
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Monthly Profit</h3>
                <p className="text-xl font-bold text-green-600">
                  ${portfolioMetrics.totalProfit.toFixed(0)}
                </p>
                <p className="text-xs text-gray-500">
                  {((portfolioMetrics.totalProfit / portfolioMetrics.totalIncome) * 100).toFixed(1)}% Margin
                </p>
              </div>
            </div>

            {/* Charts */}
            <div className="chart-section max-w-[8.5in] mx-auto">
              <div className="grid grid-cols-2 gap-4 print:gap-2">
                <div className="max-w-[4in]">
                  <h3 className="text-sm font-bold mb-2">Property Comparison</h3>
                  <div className="chart-container bg-white p-3 rounded-lg h-[250px] print:h-[200px] print:max-w-[3.5in] mx-auto">
                    <DynamicBar 
                      data={propertyComparisonData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              callback: value => '$' + value.toLocaleString(),
                              font: { size: 9 }
                            }
                          },
                          x: {
                            ticks: {
                              font: { size: 9 }
                            }
                          }
                        },
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              boxWidth: 8,
                              padding: 4,
                              font: { size: 9 }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="max-w-[4in]">
                  <h3 className="text-sm font-bold mb-2">Expense Breakdown</h3>
                  <div className="chart-container bg-white p-3 rounded-lg h-[250px] print:h-[200px] print:max-w-[3.5in] mx-auto">
                    <DynamicPie 
                      data={expenseBreakdownData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              boxWidth: 8,
                              padding: 4,
                              font: { size: 9 }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* New Summary Section Below Charts */}
              <div className="mt-8 grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-3">Top Performing Properties</h3>
                  <div className="space-y-2">
                    {properties
                      .sort((a, b) => {
                        const aProfit = a.data.units.reduce((sum, unit) => sum + unit.rent, 0) -
                                      calculatePropertyExpenses(a.data);
                        const bProfit = b.data.units.reduce((sum, unit) => sum + unit.rent, 0) -
                                      calculatePropertyExpenses(b.data);
                        return bProfit - aProfit;
                      })
                      .slice(0, 3)
                      .map((property, index) => {
              const income = property.data.units.reduce((sum, unit) => sum + unit.rent, 0);
              const expenses = calculatePropertyExpenses(property.data);
              const profit = income - expenses;
                        const margin = (profit / income) * 100;

              return (
                          <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded text-sm">
                            <div>
                              <span className="font-medium">{property.name}</span>
                              <span className="text-gray-500 text-xs ml-2">${income.toFixed(0)}/mo</span>
                    </div>
                            <div className="flex items-center gap-3">
                              <span className="text-green-600">${profit.toFixed(0)}/mo</span>
                              <span className="text-xs text-gray-500">{margin.toFixed(1)}% margin</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-3">Thank You</h3>
                      <div className="space-y-2">
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="text-gray-700 font-medium mb-2">
                        Thank you for picking us!
                      </p>
                      <p className="text-gray-600 text-sm mb-3">
                        We hope this report provides valuable insights into your {portfolioMetrics.totalProperties} properties 
                        and helps you make informed decisions about your real estate investments.
                      </p>
                          </div>
                          </div>
                      </div>
                    </div>
                </div>
          </div>
          <div className="html2pdf__page-break"></div>
          </div>

        {/* Individual Property Details - New Page for Each */}
        {properties.map((property, index) => {
          // Calculate key metrics for the description
          const numUnits = property.data.units.length;
          const monthlyRevenue = property.data.units.reduce((sum, unit) => sum + unit.rent, 0);
          const annualRevenue = monthlyRevenue * 12;
          const monthlyExpenses = property.data.propertySettings.mortgagePayment +
                                 property.data.propertySettings.propertyInsurance +
                                 property.data.units.reduce((sum, unit) => sum + 
                                   (!unit.tenantPaysWater ? unit.waterBill : 0) +
                                   (!unit.tenantPaysGas ? unit.gasBill : 0) +
                                   (!unit.tenantPaysElectric ? unit.electricBill : 0), 0);
          const annualExpenses = monthlyExpenses * 12;
          const annualProfit = annualRevenue - annualExpenses;
          const rentIncrease = (property.data.propertySettings.yearlyRentIncrease || 0.03) * 100;
          
                    return (
            <div key={property.name} className="property-section">
              <div className="property-content p-4">
                <div className="section-header pb-3 mb-4 border-b border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-bold text-gray-800">{property.name}</h2>
                    <span className="text-sm text-gray-600">
                      {rentIncrease.toFixed(1)}% annual increase
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-3 rounded">
                    <div>
                      <span className="text-gray-600">Monthly Performance:</span>
                      <p className="font-medium">
                        ${monthlyRevenue.toFixed(0)} revenue • ${monthlyExpenses.toFixed(0)} expenses
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Property Details:</span>
                      <p className="font-medium">
                        {numUnits} units • ${(monthlyRevenue/numUnits).toFixed(0)}/unit avg
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <PropertyMetrics property={property} />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Monthly Expense Distribution</h3>
                      <div className="chart-container h-[200px] w-[200px] mx-auto bg-white rounded-lg p-2">
                        <PropertyExpenseChart property={property} />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Unit Summary</h3>
                      <PropertyUnitTable property={property} />
                    </div>
                  </div>
                </div>
              </div>
              {index < properties.length - 1 && <div className="html2pdf__page-break"></div>}
            </div>
                    );
                  })}

        {/* Main Footer - Last Page */}
        {printOptions.customizations.includeFooter && (
          <div className="report-footer">
            <p>{printOptions.customizations.customNotes}</p>
            {printOptions.customizations.includeTimestamp && (
              <p className="mt-2">Report generated on {new Date().toLocaleString()}</p>
            )}
            </div>
          )}
      </div>
    </>
  );
};

const PropertyMetrics = ({ property }) => {
  // Monthly calculations
  const monthlyIncome = property.data.units.reduce((sum, unit) => sum + unit.rent, 0);
  const mortgagePayment = property.data.propertySettings.mortgagePayment || 0;
  const propertyInsurance = property.data.propertySettings.propertyInsurance || 0;
  
  // Calculate utilities per unit
  const unitUtilities = property.data.units.map(unit => ({
    waterBill: !unit.tenantPaysWater ? unit.waterBill : 0,
    gasBill: !unit.tenantPaysGas ? unit.gasBill : 0,
    electricBill: !unit.tenantPaysElectric ? unit.electricBill : 0,
    total: (!unit.tenantPaysWater ? unit.waterBill : 0) +
           (!unit.tenantPaysGas ? unit.gasBill : 0) +
           (!unit.tenantPaysElectric ? unit.electricBill : 0)
  }));

  const totalUtilities = unitUtilities.reduce((sum, unit) => sum + unit.total, 0);
  const monthlyExpenses = mortgagePayment + propertyInsurance + totalUtilities;
  const monthlyProfit = monthlyIncome - monthlyExpenses;
  const yearlyProfit = monthlyProfit * 12;

  // Calculate yearly projections with rent increase
  const rentIncrease = property.data.propertySettings.yearlyRentIncrease || 0.03;
  const yearlyProjections = Array.from({ length: 5 }, (_, i) => {
    const year = i + 1;
    const projectedIncome = monthlyIncome * Math.pow(1 + rentIncrease, year);
    const projectedProfit = projectedIncome - monthlyExpenses;
    return {
      year,
      income: projectedIncome,
      profit: projectedProfit
    };
  });

  return (
    <div className="space-y-6">
      {/* Financial Summary */}
      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-2">Financial Summary</h4>
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          {/* Monthly Income Breakdown */}
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Monthly Income</h5>
            <div className="space-y-1 ml-4">
              {property.data.units.map((unit, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">Unit {index + 1} Rent</span>
                  <span className="text-blue-600">${unit.rent.toFixed(2)}</span>
            </div>
              ))}
              <div className="flex justify-between text-sm font-medium pt-1 border-t">
                <span>Total Income</span>
                <span className="text-blue-600">${monthlyIncome.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Monthly Expenses Breakdown */}
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Monthly Expenses</h5>
            <div className="space-y-3 ml-4">
              {/* Fixed Expenses */}
              <div>
                <h6 className="text-sm text-gray-600 mb-1">Fixed Expenses</h6>
                <div className="space-y-1 ml-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Mortgage Payment</span>
                    <span className="text-red-600">${mortgagePayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Property Insurance</span>
                    <span className="text-red-600">${propertyInsurance.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Utilities */}
              <div>
                <h6 className="text-sm text-gray-600 mb-1">Utilities</h6>
                <div className="space-y-1 ml-2">
                  {property.data.units.map((unit, index) => (
                    <React.Fragment key={index}>
                      {!unit.tenantPaysWater && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Unit {index + 1} Water</span>
                          <span className="text-red-600">${unit.waterBill.toFixed(2)}</span>
                        </div>
                      )}
                      {!unit.tenantPaysGas && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Unit {index + 1} Gas</span>
                          <span className="text-red-600">${unit.gasBill.toFixed(2)}</span>
                        </div>
                      )}
                      {!unit.tenantPaysElectric && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Unit {index + 1} Electric</span>
                          <span className="text-red-600">${unit.electricBill.toFixed(2)}</span>
            </div>
          )}
                    </React.Fragment>
                  ))}
        </div>
      </div>

              {/* Total Expenses */}
              <div className="flex justify-between text-sm font-medium pt-1 border-t">
                <span>Total Expenses</span>
                <span className="text-red-600">${monthlyExpenses.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Net Profit */}
          <div className="pt-2 border-t">
            <div className="flex justify-between font-medium">
              <span>Monthly Net Profit</span>
              <span className={monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                ${Math.abs(monthlyProfit).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-medium mt-1">
              <span>Annual Net Profit</span>
              <span className={yearlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                ${Math.abs(yearlyProfit).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Future Projections */}
      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-2">5-Year Projections ({(rentIncrease * 100).toFixed(1)}% Annual Increase)</h4>
        <div className="grid grid-cols-2 gap-2">
          {yearlyProjections.map((projection) => (
            <div key={projection.year} className="p-2 bg-gray-50 rounded text-sm">
              <span className="text-gray-600">Year {projection.year}</span>
              <div className="flex justify-between mt-1">
                <span className="text-blue-600">${projection.income.toFixed(0)}</span>
                <span className={projection.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                  ${Math.abs(projection.profit).toFixed(0)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PropertyExpenseChart = ({ property }) => {
  // Calculate monthly expenses by category
  const monthlyIncome = property.data.units.reduce((sum, unit) => sum + unit.rent, 0);
  const maintenanceReserve = (property.data.propertySettings.maintenanceReserve || 0.05) * monthlyIncome;
  
  const mortgageExpense = property.data.propertySettings.mortgagePayment || 0;
  const insuranceExpense = property.data.propertySettings.propertyInsurance || 0;
  const utilityExpenses = property.data.units.reduce((sum, unit) => sum + 
    (!unit.tenantPaysWater ? unit.waterBill : 0) +
    (!unit.tenantPaysGas ? unit.gasBill : 0) +
    (!unit.tenantPaysElectric ? unit.electricBill : 0), 0);
  const customExpenses = property.data.customExpenses.reduce((sum, expense) => 
    sum + (expense.frequency === 'yearly' ? expense.amount / 12 : expense.amount), 0);
  const otherExpenses = maintenanceReserve + customExpenses;

  const data = {
    labels: ['Mortgage', 'Insurance', 'Utilities', 'Maintenance & Other'],
    datasets: [{
      data: [
        mortgageExpense,
        insuranceExpense,
        utilityExpenses,
        otherExpenses
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',   // Red for mortgage
        'rgba(54, 162, 235, 0.8)',    // Blue for insurance
        'rgba(255, 206, 86, 0.8)',    // Yellow for utilities
        'rgba(75, 192, 192, 0.8)'     // Teal for other
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
          padding: 4,
          font: { size: 9 }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `$${value.toFixed(0)} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <DynamicPie data={data} options={options} />
    </div>
  );
};

const PropertyUnitTable = ({ property }) => {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-50">
          <th className="text-left p-2">Unit</th>
          <th className="text-left p-2">Rent</th>
          <th className="text-left p-2">Utilities</th>
          <th className="text-right p-2">Net Income</th>
        </tr>
      </thead>
      <tbody>
        {property.data.units.map((unit, index) => {
          const utilities = [];
          if (!unit.tenantPaysWater) utilities.push('Water');
          if (!unit.tenantPaysGas) utilities.push('Gas');
          if (!unit.tenantPaysElectric) utilities.push('Electric');
          
          const utilityExpenses = 
            (!unit.tenantPaysWater ? unit.waterBill : 0) +
            (!unit.tenantPaysGas ? unit.gasBill : 0) +
            (!unit.tenantPaysElectric ? unit.electricBill : 0);
          
          return (
            <tr key={index} className="border-b">
              <td className="p-2">Unit {index + 1}</td>
              <td className="p-2">${unit.rent}</td>
              <td className="p-2">{utilities.length ? utilities.join(', ') : 'All tenant-paid'}</td>
              <td className="p-2 text-right">${(unit.rent - utilityExpenses).toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PortfolioReport; 