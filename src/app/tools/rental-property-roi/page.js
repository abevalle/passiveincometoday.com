'use client';

import { useState, useEffect, useRef, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import dynamic from 'next/dynamic';
import { createRoot } from 'react-dom/client';
import ReportCustomization from './ReportCustomization';
import ReportPreview from './ReportPreview';

// Create a dynamic import for html2pdf to avoid SSR issues
const html2pdf = dynamic(() => import('html2pdf.js'), { ssr: false });

// Create a dynamic import for the PortfolioReport component
const PortfolioReport = dynamic(() => import('./PortfolioReport'), { ssr: false });

const SaveLoadForm = ({ onSave, savedProperties, onLoad, onDelete }) => {
  const [saveName, setSaveName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (saveName.trim()) {
      if (isUpdating && selectedProperty) {
        onSave(saveName.trim(), selectedProperty.name);
      } else {
        onSave(saveName.trim());
      }
      setSaveName('');
      setIsUpdating(false);
      setSelectedProperty(null);
    }
  };

  const handleLoadAndEdit = (prop) => {
    onLoad(prop);
    setSaveName(prop.name);
    setIsUpdating(true);
    setSelectedProperty(prop);
  };

  const cancelUpdate = () => {
    setSaveName('');
    setIsUpdating(false);
    setSelectedProperty(null);
  };

  const handleNew = () => {
    // Reset form state
    setSaveName('');
    setIsUpdating(false);
    setSelectedProperty(null);
    // Reset property data with empty values
    onLoad({
      data: {
        propertySettings: {
          mortgagePayment: 0,
          propertyInsurance: 0,
          singleWaterMeter: false,
          totalWaterBill: 0,
          landlordPaysTrash: false,
          trashCost: 0,
        },
        customExpenses: [],
        units: [{
          rent: 0,
          waterBill: 0,
          gasBill: 0,
          electricBill: 0,
          tenantPaysWater: false,
          tenantPaysGas: false,
          tenantPaysElectric: false,
        }]
      }
    });
  };

  const handleGenerateReport = async (selectedProperties, printOptions) => {
    try {
      // Create a container for the report
      const reportContainer = document.createElement('div');
      reportContainer.style.position = 'fixed';
      reportContainer.style.top = '0';
      reportContainer.style.left = '0';
      reportContainer.style.width = '100%';
      reportContainer.style.height = '100%';
      reportContainer.style.backgroundColor = 'white';
      reportContainer.style.zIndex = '-1000';
      document.body.appendChild(reportContainer);
      
      // Create root and render with print options
      const root = createRoot(reportContainer);
      root.render(<PortfolioReport properties={selectedProperties} printOptions={printOptions} />);

      // Wait for render and generate PDF
      await new Promise(resolve => setTimeout(resolve, 2000));

      try {
        // Dynamically import html2pdf
        const html2pdf = (await import('html2pdf.js')).default;

        const reportContent = reportContainer.querySelector('.print-container');
        if (reportContent) {
          const opt = {
            margin: [10, 10],
            filename: 'portfolio-report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
              scale: 2,
              useCORS: true,
              logging: true,
              windowWidth: 1200
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
          };

          // Generate PDF
          await html2pdf().from(reportContent).set(opt).save();
        } else {
          console.error('Report content not found');
        }
      } catch (error) {
        console.error('Error generating PDF:', error);
      } finally {
        // Cleanup
        setTimeout(() => {
          root.unmount();
          document.body.removeChild(reportContainer);
        }, 1000);
      }
    } catch (error) {
      console.error('Error in report generation:', error);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-sm border border-gray-100 mb-6 print:hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">Save/Load Properties</h2>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          New Property
        </button>
      </div>
      
      <form onSubmit={handleSave} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder={isUpdating ? "Update Property Name" : "Property Name"}
          value={saveName}
          onChange={(e) => setSaveName(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <div className="flex gap-2">
          <button 
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
          >
            {isUpdating ? 'Update' : 'Save'}
          </button>
          {isUpdating && (
            <button 
              type="button"
              onClick={cancelUpdate}
              className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {savedProperties.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium mb-4">Saved Properties</h3>
          {savedProperties.map((prop, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl group">
              <span className="font-medium">{prop.name}</span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleLoadAndEdit(prop)}
                  className="text-blue-500 hover:text-blue-700 font-medium transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Load & Edit
                </button>
                <button
                  onClick={() => onDelete(prop.name)}
                  className="text-red-500 hover:text-red-700 font-medium transition-colors opacity-0 group-hover:opacity-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-6 border-t">
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Generate Portfolio Report
        </button>
      </div>

      <SelectPropertiesModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        savedProperties={savedProperties}
        onGenerateReport={handleGenerateReport}
      />
    </div>
  );
};

const PropertySettings = ({ settings, onChange }) => {
  const inputWithDollarSign = "pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-right";
  const dollarSignStyle = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none select-none font-medium";

  return (
    <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <h2 className="text-2xl font-medium mb-6">Property Settings</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Monthly Mortgage Payment</label>
            <div className="relative">
              <span className={dollarSignStyle}>$</span>
              <input
                type="number"
                value={settings.mortgagePayment}
                onChange={(e) => onChange('mortgagePayment', Number(e.target.value))}
                className={`w-full ${inputWithDollarSign}`}
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Property Insurance</label>
            <div className="relative">
              <span className={dollarSignStyle}>$</span>
              <input
                type="number"
                value={settings.propertyInsurance}
                onChange={(e) => onChange('propertyInsurance', Number(e.target.value))}
                className={`w-full ${inputWithDollarSign}`}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">Utility Configuration</h3>
            <label className="flex items-center p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl cursor-pointer group transition-colors hover:bg-gray-100/80">
              <input
                type="checkbox"
                checked={settings.singleWaterMeter}
                onChange={(e) => onChange('singleWaterMeter', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 transition-colors"
              />
              <span className="ml-3 font-medium">Single Water Meter for Property</span>
            </label>
            {settings.singleWaterMeter && (
              <div className="mt-4">
                <div className="relative">
                  <span className={dollarSignStyle}>$</span>
                  <input
                    type="number"
                    placeholder="Total Water Bill"
                    value={settings.totalWaterBill}
                    onChange={(e) => onChange('totalWaterBill', Number(e.target.value))}
                    className={`w-full ${inputWithDollarSign}`}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-medium mb-4">Landlord Paid Items</h3>
            <label className="flex items-center p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl cursor-pointer group transition-colors hover:bg-gray-100/80">
              <input
                type="checkbox"
                checked={settings.landlordPaysTrash}
                onChange={(e) => onChange('landlordPaysTrash', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 transition-colors"
              />
              <span className="ml-3 font-medium">Trash Service</span>
            </label>
            {settings.landlordPaysTrash && (
              <div className="mt-4">
                <div className="relative">
                  <span className={dollarSignStyle}>$</span>
                  <input
                    type="number"
                    placeholder="Monthly Trash Cost"
                    value={settings.trashCost}
                    onChange={(e) => onChange('trashCost', Number(e.target.value))}
                    className={`w-full ${inputWithDollarSign}`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomExpenseForm = ({ expenses, onAdd, onRemove }) => {
  const [newExpense, setNewExpense] = useState({
    name: '',
    amount: 0,
    frequency: 'monthly'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newExpense.name && newExpense.amount) {
      onAdd(newExpense);
      setNewExpense({ name: '', amount: 0, frequency: 'monthly' });
    }
  };

  const inputWithDollarSign = "pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-right";
  const dollarSignStyle = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none select-none font-medium";

  return (
    <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <h2 className="text-2xl font-medium mb-6">Custom Expenses</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Expense Name"
          value={newExpense.name}
          onChange={(e) => setNewExpense({...newExpense, name: e.target.value})}
          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <div className="flex gap-3">
          <div className="relative">
            <span className={dollarSignStyle}>$</span>
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({...newExpense, amount: Number(e.target.value)})}
              className={`w-32 ${inputWithDollarSign}`}
            />
          </div>
          <select
            value={newExpense.frequency}
            onChange={(e) => setNewExpense({...newExpense, frequency: e.target.value})}
            className="w-32 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none bg-right bg-no-repeat"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundPosition: "right 1rem center", backgroundSize: "1.5em 1.5em" }}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button 
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {expenses.map((expense, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl group">
            <span className="font-medium">{expense.name}</span>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">${expense.amount} ({expense.frequency})</span>
              <button
                onClick={() => onRemove(index)}
                className="text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UnitForm = ({ unit, index, onChange, onRemove }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const inputWithDollarSign = "pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-right";
  const dollarSignStyle = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none select-none font-medium";

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 mb-6">
      <div 
        className="p-6 cursor-pointer hover:bg-gray-50/80 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-medium">Unit {index + 1}</h3>
            <span className="text-gray-500 text-lg">
              ${unit.rent}/month
            </span>
          </div>
          <div className="flex items-center gap-4">
            {index > 0 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="text-red-500 hover:text-red-700 transition-colors p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
            <svg 
              className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
        <div className="p-6 border-t space-y-8">
          <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl">
            <label className="block mb-3 font-medium">Monthly Rent</label>
            <div className="relative">
              <span className={dollarSignStyle}>$</span>
              <input
                type="number"
                value={unit.rent}
                onChange={(e) => onChange(index, 'rent', e.target.value)}
                className={`w-full ${inputWithDollarSign}`}
                min="0"
                step="50"
              />
            </div>
          </div>

          <div className="grid gap-6">
            {['water', 'gas', 'electric'].map((utility) => (
              <div key={utility} className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <label className="font-medium capitalize">{utility} Usage</label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={unit[`tenantPays${utility.charAt(0).toUpperCase() + utility.slice(1)}`]}
                      onChange={(e) => onChange(index, `tenantPays${utility.charAt(0).toUpperCase() + utility.slice(1)}`, e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 transition-colors"
                    />
                    <span className="ml-3">Tenant Pays</span>
                  </label>
                </div>
                <div className="relative">
                  <span className={dollarSignStyle}>$</span>
                  <input
                    type="number"
                    value={unit[`${utility}Bill`]}
                    onChange={(e) => onChange(index, `${utility}Bill`, e.target.value)}
                    disabled={unit[`tenantPays${utility.charAt(0).toUpperCase() + utility.slice(1)}`]}
                    className={`w-full ${inputWithDollarSign} disabled:opacity-50 disabled:bg-gray-100`}
                    min="0"
                    placeholder="Monthly Amount"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FutureProjections = ({ monthlyProfit, totalIncome, propertySettings }) => {
  const years = 5;
  const annualRentIncrease = 0.03; // 3% yearly increase

  const projections = Array.from({ length: years }, (_, year) => {
    const yearNumber = year + 1;
    const rentMultiplier = Math.pow(1 + annualRentIncrease, yearNumber);
    const projectedIncome = totalIncome * rentMultiplier;
    const projectedProfit = (monthlyProfit * rentMultiplier) * 12;
    
    return {
      year: yearNumber,
      annualIncome: projectedIncome * 12,
      annualProfit: projectedProfit
    };
  });

  return (
    <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-medium mb-6">Future Projections</h2>
      <div className="space-y-6">
        <div className="text-sm text-gray-600 mb-4">
          Assuming 3% annual rent increase
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Year</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Annual Income</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Annual Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projections.map(({ year, annualIncome, annualProfit }) => (
                <tr key={year} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4 text-sm">Year {year}</td>
                  <td className="py-3 px-4 text-sm">${annualIncome.toFixed(2)}</td>
                  <td className="py-3 px-4 text-sm text-green-600">${annualProfit.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-6 bg-gray-50/80 backdrop-blur-sm rounded-xl space-y-4">
          <h3 className="text-lg font-medium mb-4">ROI Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg">
              <span className="font-medium">5-Year Total Profit</span>
              <span className="text-green-600">${projections.reduce((sum, p) => sum + p.annualProfit, 0).toFixed(2)}</span>
            </div>
            {propertySettings.mortgagePayment > 0 && (
              <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg">
                <span className="font-medium">Monthly Mortgage Coverage</span>
                <span className="text-blue-600">{((totalIncome / propertySettings.mortgagePayment) * 100).toFixed(1)}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MultiPropertyProjections = ({ savedProperties, currentProperty }) => {
  const years = 5;
  const annualRentIncrease = 0.03; // 3% yearly increase

  // Calculate monthly profit for a property
  const calculatePropertyProfit = (property) => {
    const settings = property.data.propertySettings;
    const expenses = property.data.customExpenses;
    const units = property.data.units;

    // Calculate total income
    const totalIncome = units.reduce((sum, unit) => sum + unit.rent, 0);

    // Calculate expenses
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

    const totalExpenses = globalExpenses + customExpensesTotal + utilityExpenses;
    return totalIncome - totalExpenses;
  };

  // Combine current property with saved properties
  const allProperties = currentProperty ? 
    [{ name: 'Current Property (Unsaved)', data: currentProperty }, ...savedProperties] : 
    savedProperties;

  // Calculate projections for all properties
  const projections = Array.from({ length: years }, (_, year) => {
    const yearNumber = year + 1;
    const rentMultiplier = Math.pow(1 + annualRentIncrease, yearNumber);
    
    const propertyProfits = allProperties.map(property => {
      const monthlyProfit = calculatePropertyProfit(property);
      const yearlyProfit = monthlyProfit * 12 * rentMultiplier;
      return {
        name: property.name,
        profit: yearlyProfit
      };
    });

    return {
      year: yearNumber,
      properties: propertyProfits,
      totalProfit: propertyProfits.reduce((sum, p) => sum + p.profit, 0)
    };
  });

  return (
    <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-medium mb-6">Multi-Property Projections</h2>
      <div className="space-y-6">
        <div className="text-sm text-gray-600 mb-4">
          Combined profit projections for all properties (3% annual increase)
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Year</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Property Breakdown</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-600">Total Annual Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projections.map(({ year, properties, totalProfit }) => (
                <tr key={year} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4 text-sm">Year {year}</td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      {properties.map((property, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">{property.name}</span>
                          <span className="text-green-600">${property.profit.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-lg font-medium text-green-600">
                    ${totalProfit.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-6 bg-gray-50/80 backdrop-blur-sm rounded-xl space-y-4">
          <h3 className="text-lg font-medium mb-4">Portfolio Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg">
              <span className="font-medium">Total Properties</span>
              <span className="text-blue-600">{allProperties.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg">
              <span className="font-medium">5-Year Total Portfolio Profit</span>
              <span className="text-green-600">
                ${projections.reduce((sum, p) => sum + p.totalProfit, 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg">
              <span className="font-medium">Average Annual Portfolio Profit</span>
              <span className="text-green-600">
                ${(projections.reduce((sum, p) => sum + p.totalProfit, 0) / years).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrintUnitSummary = ({ units, propertySettings }) => {
  const getTotalUtilityCosts = (unit) => {
    const costs = [];
    if (!unit.tenantPaysWater) {
      costs.push(`Water: $${
        propertySettings.singleWaterMeter 
          ? (propertySettings.totalWaterBill / units.length).toFixed(2) 
          : unit.waterBill
      }`);
    }
    if (!unit.tenantPaysGas) {
      costs.push(`Gas: $${unit.gasBill}`);
    }
    if (!unit.tenantPaysElectric) {
      costs.push(`Electric: $${unit.electricBill}`);
    }
    return costs.length ? costs.join(', ') : 'All tenant-paid';
  };

  return (
    <div className="hidden print:block print:text-sm">
      <h2 className="text-base font-bold mb-2">Unit Summary</h2>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left py-1 px-2">Unit</th>
            <th className="text-left py-1 px-2">Monthly Rent</th>
            <th className="text-left py-1 px-2">Utilities</th>
            <th className="text-left py-1 px-2">Net Income</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit, index) => {
            const utilityCosts = !unit.tenantPaysWater ? unit.waterBill : 0
              + !unit.tenantPaysGas ? unit.gasBill : 0
              + !unit.tenantPaysElectric ? unit.electricBill : 0;
            const netIncome = unit.rent - utilityCosts;
            
            return (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-1 px-2">Unit {index + 1}</td>
                <td className="py-1 px-2">${unit.rent}</td>
                <td className="py-1 px-2 text-xs">{getTotalUtilityCosts(unit)}</td>
                <td className="py-1 px-2">${netIncome}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="font-bold border-t border-gray-300">
            <td className="py-1 px-2">Total</td>
            <td className="py-1 px-2">
              ${units.reduce((sum, unit) => sum + unit.rent, 0)}
            </td>
            <td className="py-1 px-2">
              ${units.reduce((sum, unit) => sum + (
                (!unit.tenantPaysWater ? unit.waterBill : 0) +
                (!unit.tenantPaysGas ? unit.gasBill : 0) +
                (!unit.tenantPaysElectric ? unit.electricBill : 0)
              ), 0)}
            </td>
            <td className="py-1 px-2">
              ${units.reduce((sum, unit) => sum + (
                unit.rent - (
                  (!unit.tenantPaysWater ? unit.waterBill : 0) +
                  (!unit.tenantPaysGas ? unit.gasBill : 0) +
                  (!unit.tenantPaysElectric ? unit.electricBill : 0)
                )
              ), 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

const ItemizedSummary = ({ units, propertySettings, customExpenses }) => {
  // Calculate monthly income by unit
  const incomeBreakdown = units.map((unit, index) => ({
    name: `Unit ${index + 1} Rent`,
    amount: unit.rent
  }));

  // Calculate utility expenses
  const utilityExpenses = units.reduce((acc, unit, index) => {
    if (propertySettings.singleWaterMeter) {
      // Only add water bill to first unit's display
      if (index === 0) {
        acc.push({
          name: 'Total Water Bill',
          amount: propertySettings.totalWaterBill,
          note: `(${units.length} units @ $${(propertySettings.totalWaterBill / units.length).toFixed(2)} each)`
        });
      }
    } else if (!unit.tenantPaysWater) {
      acc.push({ name: `Unit ${index + 1} Water`, amount: unit.waterBill });
    }
    
    if (!unit.tenantPaysGas) {
      acc.push({ name: `Unit ${index + 1} Gas`, amount: unit.gasBill });
    }
    if (!unit.tenantPaysElectric) {
      acc.push({ name: `Unit ${index + 1} Electric`, amount: unit.electricBill });
    }
    return acc;
  }, []);

  // Fixed expenses
  const fixedExpenses = [
    { name: 'Mortgage Payment', amount: propertySettings.mortgagePayment },
    { name: 'Property Insurance', amount: propertySettings.propertyInsurance },
    ...(propertySettings.landlordPaysTrash ? [{ name: 'Trash Service', amount: propertySettings.trashCost }] : [])
  ];

  // Format custom expenses
  const formattedCustomExpenses = customExpenses.map(expense => ({
    name: expense.name,
    amount: expense.frequency === 'yearly' ? expense.amount / 12 : expense.amount,
    frequency: expense.frequency
  }));

  const totalIncome = incomeBreakdown.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = [...utilityExpenses, ...fixedExpenses, ...formattedCustomExpenses]
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-4 print:space-y-2 print:text-sm">
      {/* Income Breakdown */}
      <div>
        <h3 className="text-lg font-medium mb-2 print:text-base print:mb-1">Monthly Income</h3>
        <div className="space-y-1">
          {incomeBreakdown.map((item, index) => (
            <div key={index} className="flex justify-between text-sm p-2 print:p-1 bg-gray-50/80 backdrop-blur-sm rounded-lg print:bg-transparent print:text-xs">
              <span className="font-medium">{item.name}</span>
              <span>${item.amount.toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-medium text-base print:text-sm p-2 print:p-1 bg-blue-50/80 backdrop-blur-sm rounded-lg print:bg-transparent mt-2 print:mt-1">
            <span>Total Income</span>
            <span>${totalIncome.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Expenses Breakdown */}
      <div>
        <h3 className="text-lg font-medium mb-2 print:text-base print:mb-1">Monthly Expenses</h3>
        <div className="space-y-3 print:space-y-2">
          {/* Fixed Expenses */}
          {fixedExpenses.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-sm text-gray-600 mb-1 print:text-xs">Fixed Expenses</h4>
              {fixedExpenses.map((item, index) => (
                <div key={index} className="flex justify-between text-sm p-2 print:p-1 bg-gray-50/80 backdrop-blur-sm rounded-lg print:bg-transparent print:text-xs">
                  <span className="font-medium">{item.name}</span>
                  <span>${item.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Utility Expenses */}
          {utilityExpenses.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-sm text-gray-600 mb-1 print:text-xs">Utilities</h4>
              {utilityExpenses.map((item, index) => (
                <div key={index} className="flex justify-between text-sm p-2 print:p-1 bg-gray-50/80 backdrop-blur-sm rounded-lg print:bg-transparent print:text-xs">
                  <span className="flex items-center gap-2 font-medium">
                    {item.name}
                    {item.note && (
                      <span className="text-gray-500 text-xs print:text-[10px] font-normal">{item.note}</span>
                    )}
                  </span>
                  <span>${item.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Custom Expenses */}
          {formattedCustomExpenses.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-sm text-gray-600 mb-1 print:text-xs">Additional Expenses</h4>
              {formattedCustomExpenses.map((item, index) => (
                <div key={index} className="flex justify-between text-sm p-2 print:p-1 bg-gray-50/80 backdrop-blur-sm rounded-lg print:bg-transparent print:text-xs">
                  <span className="font-medium">{item.name} <span className="text-gray-500">({item.frequency})</span></span>
                  <span>${item.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between font-medium text-base print:text-sm p-2 print:p-1 bg-red-50/80 backdrop-blur-sm rounded-lg print:bg-transparent">
            <span>Total Expenses</span>
            <span>${totalExpenses.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Net Profit */}
      <div className="border-t pt-2 print:pt-1">
        <div className="space-y-2 print:space-y-1">
          <div className="flex justify-between items-center p-2 print:p-1 bg-gray-900/5 backdrop-blur-lg rounded-lg print:bg-transparent">
            <span className="text-base print:text-sm font-medium">Monthly Net Profit</span>
            <span className={`text-base print:text-sm font-medium ${totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${(totalIncome - totalExpenses).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center p-2 print:p-1 bg-gray-900/5 backdrop-blur-lg rounded-lg print:bg-transparent">
            <span className="text-base print:text-sm font-medium">Annual Net Profit</span>
            <span className={`text-base print:text-sm font-medium ${totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${((totalIncome - totalExpenses) * 12).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectPropertiesModal = ({ isOpen, onClose, savedProperties, onGenerateReport }) => {
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [step, setStep] = useState('select'); // select, customize, preview, loading, payment, download
  const [loadingMessage, setLoadingMessage] = useState('');
  const [printOptions, setPrintOptions] = useState({
    individualReports: false,
    includeUtilities: true,
    includeProjections: true,
    theme: 'modern',
    color: 'blue',
    customizations: {
      includeLogo: false,
      includeFooter: true,
      includePageNumbers: true,
      includeTimestamp: true,
      companyName: '',
      companyContact: '',
      reportTitle: 'Real Estate Portfolio Analysis',
      customNotes: ''
    }
  });

  const handlePropertyToggle = (property) => {
    if (selectedProperties.includes(property)) {
      setSelectedProperties(prev => prev.filter(p => p !== property));
    } else {
      setSelectedProperties(prev => [...prev, property]);
    }
  };

  const handleNext = () => {
    if (selectedProperties.length === 0) return;
    setStep('customize');
  };

  const handleCustomizationNext = () => {
    setStep('preview');
  };

  const handlePreviewNext = () => {
    setStep('loading');
    
    // Simulate loading with different messages
    const messages = [
      'Analyzing property data...',
      'Calculating portfolio metrics...',
      'Applying custom styling...',
      'Generating detailed reports...',
      'Preparing portfolio summary...'
    ];

    let messageIndex = 0;
    const interval = setInterval(() => {
      setLoadingMessage(messages[messageIndex]);
      messageIndex++;
      if (messageIndex === messages.length) {
        clearInterval(interval);
        setStep('payment');
      }
    }, Math.random() * 500 + 300);
  };

  const handlePayment = () => {
    setStep('download');
    onGenerateReport(selectedProperties, printOptions);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                {/* Progress Steps */}
                <div className="mb-8">
                  <div className="flex justify-between">
                    {['Properties', 'Customize', 'Preview', 'Generate', 'Download'].map((stepName, index) => (
                      <div key={stepName} className="flex items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          ['select', 'customize', 'preview', 'loading', 'payment', 'download'].indexOf(step) >= index
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="ml-2 font-medium text-sm">{stepName}</span>
                        {index < 4 && (
                          <div className="mx-4 h-0.5 w-12 bg-gray-200" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {step === 'select' && (
                  <>
                    <Dialog.Title as="h3" className="text-2xl font-medium mb-4">
                      Select Properties for Portfolio Report
                    </Dialog.Title>
                    <p className="text-gray-600 mb-6">
                      Choose the properties you want to include in your portfolio analysis report.
                      This report will provide detailed insights into your combined property investments.
                    </p>
                    <div className="space-y-3 mb-6">
                      {savedProperties.map((property, index) => (
                        <label
                          key={index}
                          className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedProperties.includes(property)}
                            onChange={() => handlePropertyToggle(property)}
                            className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                          />
                          <div className="ml-3">
                            <h4 className="font-medium">{property.name}</h4>
                            <p className="text-sm text-gray-500">
                              {property.data.units.length} units
                              {property.data.propertySettings.mortgagePayment > 0 && 
                                ` • ${(property.data.units.reduce((sum, unit) => sum + unit.rent, 0) / 
                                property.data.propertySettings.mortgagePayment * 100).toFixed(1)}% mortgage coverage`
                              }
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={selectedProperties.length === 0}
                        className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}

                {step === 'customize' && (
                  <>
                    <Dialog.Title as="h3" className="text-2xl font-medium mb-4">
                      Customize Report
                    </Dialog.Title>
                    <p className="text-gray-600 mb-6">
                      Personalize your report with custom branding and choose which details to include.
                    </p>
                    <div className="max-h-[60vh] overflow-y-auto mb-6">
                      <ReportCustomization
                        printOptions={printOptions}
                        setPrintOptions={setPrintOptions}
                      />
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setStep('select')}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleCustomizationNext}
                        className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                      >
                        Preview Report
                      </button>
                    </div>
                  </>
                )}

                {step === 'preview' && (
                  <>
                    <Dialog.Title as="h3" className="text-2xl font-medium mb-4">
                      Preview Report
                    </Dialog.Title>
                    <p className="text-gray-600 mb-6">
                      Preview how your report will look with the selected customizations.
                    </p>
                    <div className="max-h-[60vh] overflow-y-auto mb-6">
                      <ReportPreview
                        printOptions={printOptions}
                        properties={selectedProperties}
                      />
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setStep('customize')}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePreviewNext}
                        className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                      >
                        Generate Report
                      </button>
                    </div>
                  </>
                )}

                {step === 'loading' && (
                  <div className="py-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">{loadingMessage}</p>
                  </div>
                )}

                {step === 'payment' && (
                  <>
                    <Dialog.Title as="h3" className="text-2xl font-medium mb-4">
                      Generate Portfolio Report
                    </Dialog.Title>
                    <div className="bg-blue-50 p-6 rounded-xl mb-6">
                      <p className="text-blue-800 mb-2">Premium Feature</p>
                      <p className="text-gray-600">
                        Generate detailed portfolio reports with custom branding and styling.
                        You can generate up to 3 reports per day.
                      </p>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handlePayment}
                        className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                      >
                        Generate Report
                      </button>
                    </div>
                  </>
                )}

                {step === 'download' && (
                  <>
                    <Dialog.Title as="h3" className="text-2xl font-medium mb-4">
                      Download Your Report
                    </Dialog.Title>
                    <div className="text-center py-12">
                      <div className="mb-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-medium mb-2">Your report is ready!</h4>
                        <p className="text-gray-600">
                          Your portfolio analysis report has been generated and is ready for download.
                        </p>
                      </div>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={onClose}
                          className="px-4 py-2 text-gray-600 hover:text-gray-900"
                        >
                          Close
                        </button>
                        <button
                          onClick={() => onGenerateReport(selectedProperties, printOptions)}
                          className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                        >
                          Download PDF
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default function RentalPropertyROI() {
  const [propertySettings, setPropertySettings] = useState({
    mortgagePayment: 0,
    propertyInsurance: 0,
    singleWaterMeter: false,
    totalWaterBill: 0,
    landlordPaysTrash: false,
    trashCost: 0,
  });

  const [customExpenses, setCustomExpenses] = useState([]);

  const emptyUnit = {
    rent: 0,
    waterBill: 0,
    gasBill: 0,
    electricBill: 0,
    tenantPaysWater: false,
    tenantPaysGas: false,
    tenantPaysElectric: false,
  };

  const [units, setUnits] = useState([{ ...emptyUnit }]);

  const handleSettingsChange = (field, value) => {
    setPropertySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddUnit = () => {
    setUnits([...units, { ...emptyUnit }]);
  };

  const handleRemoveUnit = (index) => {
    setUnits(units.filter((_, i) => i !== index));
  };

  const handleUnitChange = (index, field, value) => {
    const newUnits = [...units];
    newUnits[index] = {
      ...newUnits[index],
      [field]: field.startsWith('tenantPays') ? value : Number(value),
    };
    setUnits(newUnits);
  };

  const handleAddCustomExpense = (expense) => {
    setCustomExpenses([...customExpenses, expense]);
  };

  const handleRemoveCustomExpense = (index) => {
    setCustomExpenses(customExpenses.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    const globalExpenses = propertySettings.mortgagePayment + 
                         propertySettings.propertyInsurance +
                         (propertySettings.landlordPaysTrash ? propertySettings.trashCost : 0);

    const customExpensesTotal = customExpenses.reduce((total, expense) => {
      const monthlyAmount = expense.frequency === 'yearly' 
        ? expense.amount / 12 
        : expense.amount;
      return total + monthlyAmount;
    }, 0);

    return units.reduce((acc, unit) => {
      const waterCost = propertySettings.singleWaterMeter 
        ? propertySettings.totalWaterBill / units.length 
        : (!unit.tenantPaysWater ? unit.waterBill : 0);

      const expenses = [
        waterCost,
        !unit.tenantPaysGas ? unit.gasBill : 0,
        !unit.tenantPaysElectric ? unit.electricBill : 0,
      ].reduce((sum, cost) => sum + cost, 0);

      return {
        totalIncome: acc.totalIncome + unit.rent,
        totalExpenses: acc.totalExpenses + expenses,
      };
    }, { 
      totalIncome: 0, 
      totalExpenses: globalExpenses + customExpensesTotal
    });
  };

  const { totalIncome, totalExpenses } = calculateTotals();
  const monthlyProfit = totalIncome - totalExpenses;    
  const annualProfit = monthlyProfit * 12;

  const [showStickySummary, setShowStickySummary] = useState(true);
  const summaryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide sticky summary when main summary is visible
        setShowStickySummary(!entry.isIntersecting);
      },
      {
        threshold: 0.1, // Show/hide when 10% of the summary is visible
        rootMargin: '0px'
      }
    );

    if (summaryRef.current) {
      observer.observe(summaryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const [savedProperties, setSavedProperties] = useState([]);

  // Load saved properties from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedProperties');
    if (saved) {
      setSavedProperties(JSON.parse(saved));
    }
  }, []);

  const handleSaveProperty = (name, oldName = null) => {
    const propertyData = {
      name,
      timestamp: Date.now(),
      data: {
        propertySettings,
        customExpenses,
        units
      }
    };

    let updatedProperties;
    if (oldName) {
      // Update existing property
      updatedProperties = savedProperties.map(prop => 
        prop.name === oldName ? propertyData : prop
      );
    } else {
      // Add new property
      updatedProperties = [...savedProperties, propertyData];
    }
    
    setSavedProperties(updatedProperties);
    localStorage.setItem('savedProperties', JSON.stringify(updatedProperties));
  };

  const handleLoadProperty = (property) => {
    setPropertySettings(property.data.propertySettings);
    setCustomExpenses(property.data.customExpenses);
    setUnits(property.data.units);
  };

  const handleDeleteProperty = (name) => {
    const updatedProperties = savedProperties.filter(prop => prop.name !== name);
    setSavedProperties(updatedProperties);
    localStorage.setItem('savedProperties', JSON.stringify(updatedProperties));
  };

  // Add current property data
  const getCurrentPropertyData = () => {
    return {
      propertySettings,
      customExpenses,
      units
    };
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-20 pb-24 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Print Header - Only visible when printing */}
      <div className="hidden print:block print-header">
        <h1 className="text-3xl font-medium mb-2">Rental Property ROI Analysis</h1>
        <p className="text-sm text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
        <hr className="my-4" />
      </div>

      {/* Screen-only title */}
      <h1 className="text-3xl sm:text-4xl font-medium mb-8 sm:mb-10 print:hidden">
        Rental Property ROI Calculator
      </h1>

      {/* Quick Instructions */}
      <div className="bg-blue-50/80 backdrop-blur-lg p-6 rounded-2xl mb-8 print:hidden">
        <h2 className="text-lg font-medium mb-3">Quick Start Guide</h2>
        <div className="flex gap-8">
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-medium text-sm">1</span>
            <p className="text-gray-600">Enter your property settings and mortgage details</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-medium text-sm">2</span>
            <p className="text-gray-600">Add any recurring expenses specific to your property</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-medium text-sm">3</span>
            <p className="text-gray-600">Input rental unit details and utility configurations</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 sm:gap-8 print:block">
        <div className="md:col-span-2 space-y-4 print:space-y-2">
          {/* Property Summary for Print */}
          <div className="hidden print:block print-border">
            <h2 className="text-xl font-bold mb-4">Property Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Total Units:</strong> {units.length}</p>
                <p><strong>Monthly Income:</strong> ${totalIncome.toFixed(2)}</p>
                <p><strong>Monthly Expenses:</strong> ${totalExpenses.toFixed(2)}</p>
              </div>
              <div>
                <p><strong>Monthly Profit:</strong> ${monthlyProfit.toFixed(2)}</p>
                <p><strong>Annual Profit:</strong> ${annualProfit.toFixed(2)}</p>
                {propertySettings.mortgagePayment > 0 && (
                  <p><strong>Mortgage Coverage:</strong> {((totalIncome / propertySettings.mortgagePayment) * 100).toFixed(1)}%</p>
                )}
              </div>
            </div>
          </div>

          {/* Condensed Unit Summary for Print */}
          <PrintUnitSummary units={units} propertySettings={propertySettings} />

          {/* Screen-only components */}
          <div className="print:hidden">
            <PropertySettings 
              settings={propertySettings}
              onChange={handleSettingsChange}
            />
            
            <CustomExpenseForm
              expenses={customExpenses}
              onAdd={handleAddCustomExpense}
              onRemove={handleRemoveCustomExpense}
            />

            {units.map((unit, index) => (
              <UnitForm
                key={index}
                unit={unit}
                index={index}
                onChange={handleUnitChange}
                onRemove={() => handleRemoveUnit(index)}
              />
            ))}
            
            <button onClick={handleAddUnit} className="w-full p-3 sm:p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              + Add Another Unit
            </button>
          </div>
        </div>

        {/* Right column components */}
        <div className="space-y-4 print:space-y-2 page-break">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 sm:mb-6">Summary</h2>
            <div className="space-y-3 sm:space-y-4">
              <ItemizedSummary
                units={units}
                propertySettings={propertySettings}
                customExpenses={customExpenses}
              />
            </div>
          </div>

          <FutureProjections
            monthlyProfit={monthlyProfit}
            totalIncome={totalIncome}
            propertySettings={propertySettings}
          />

          {/* Save/Load form - hidden in print */}
          <div className="print:hidden">
            <SaveLoadForm
              onSave={handleSaveProperty}
              savedProperties={savedProperties}
              onLoad={handleLoadProperty}
              onDelete={handleDeleteProperty}
            />
          </div>

          {savedProperties.length > 0 && (
            <MultiPropertyProjections 
              savedProperties={savedProperties}
              currentProperty={getCurrentPropertyData()}
            />
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-12 prose max-w-none print:hidden">
        <h1 className="text-3xl font-bold mb-6">Maximize Your Rental Investment with Our Rental ROI Calculator</h1>
        
        <p className="mb-4">
          Investing in rental properties can be a lucrative way to generate passive income, but success hinges on one critical factor: the numbers. 
          If the numbers don't make sense, the deal doesn't make dollars. Our <strong>Rental ROI Calculator</strong> is designed to help landlords 
          and real estate investors make informed decisions by providing a comprehensive analysis of their potential investments.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">What is the Rental ROI Calculator?</h2>
        <p className="mb-4">
          Our <strong>Rental ROI Calculator</strong> is a powerful tool that helps property investors calculate their profits and revenue with precision. 
          It takes into account key financial factors such as:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Mortgage Payments</strong> – Includes principal and interest calculations.</li>
          <li><strong>Property Taxes</strong> – Ensures accurate assessment of long-term costs.</li>
          <li><strong>Rental Income</strong> – Projects potential earnings from tenants.</li>
          <li><strong>Utilities</strong> – Covers essential costs like water, gas, and electricity.</li>
          <li><strong>Custom Expenses</strong> – Allows landlords to input additional expenses such as maintenance, property management fees, and insurance.</li>
        </ul>
        <p className="mb-6">
          This tool offers a <strong>granular view of your Profit and Loss (P&L) statement</strong>, enabling you to pinpoint where your money is going 
          and optimize your investment strategy.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Key Features and Benefits</h2>
        <ol className="list-decimal pl-6 mb-6">
          <li className="mb-2">
            <strong>Accurate ROI Calculation:</strong>
            <ul className="list-disc pl-6 mt-1">
              <li>Easily determine your return on investment by factoring in all relevant costs and income sources.</li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Customizable Expense Tracking:</strong>
            <ul className="list-disc pl-6 mt-1">
              <li>Add custom charges such as HOA fees, repairs, marketing costs, and more to get a complete financial overview.</li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Scenario Analysis:</strong>
            <ul className="list-disc pl-6 mt-1">
              <li>Compare different investment properties and scenarios to see which offers the best return.</li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Passive Income Potential Assessment:</strong>
            <ul className="list-disc pl-6 mt-1">
              <li>Understand whether a property aligns with your goal of generating sustainable passive income.</li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>User-Friendly Interface:</strong>
            <ul className="list-disc pl-6 mt-1">
              <li>Simple and intuitive design makes it easy for both seasoned investors and beginners to analyze rental properties effectively.</li>
            </ul>
          </li>
        </ol>

        <h2 className="text-2xl font-bold mt-8 mb-4">Why Use Our Rental ROI Calculator?</h2>
        <p className="mb-4">
          This tool has been instrumental in helping me review over <strong>100 properties</strong>, assessing their potential as investments 
          that generate passive income. It saves time, reduces guesswork, and ensures that you only pursue deals that truly make financial sense.
        </p>
        <p className="mb-6">
          By leveraging this calculator, you can <strong>avoid costly mistakes</strong>, gain confidence in your investment decisions, and build 
          a profitable rental portfolio.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">How to Get Started</h2>
        <p className="mb-4">Using our Rental ROI Calculator is easy:</p>
        <ol className="list-decimal pl-6 mb-6">
          <li>Input property details such as purchase price, rental income, and expected expenses.</li>
          <li>Add any custom expenses to get a complete financial breakdown.</li>
          <li>Review the detailed P&L report to assess the investment's potential.</li>
          <li>Make informed decisions and take control of your rental property investments.</li>
        </ol>

        <h2 className="text-2xl font-bold mt-8 mb-4">Final Thoughts</h2>
        <p className="mb-4">
          Smart investing starts with <strong>working the numbers.</strong> Our <strong>Rental ROI Calculator</strong> ensures that you have all 
          the data you need to make confident, profitable decisions. Whether you're a seasoned investor or just starting, this tool provides 
          the insights needed to achieve your passive income goals.
        </p>
        <p className="mb-6">
          Start calculating your rental ROI today and take the guesswork out of property investment!
        </p>
      </div>

      {/* Sticky Footer Summary */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t shadow-lg transform transition-transform duration-300 ease-in-out z-50 print:hidden ${showStickySummary ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left Section - Key Metrics */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Monthly Income</span>
                <span className="text-lg font-medium text-gray-900">
                  ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Monthly Expenses</span>
                <span className="text-lg font-medium text-gray-900">
                  ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Monthly Profit</span>
                  <div className="relative group">
                    <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      Total income minus all expenses
                    </div>
                  </div>
                </div>
                <span className={`text-lg font-medium ${monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(monthlyProfit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Annual ROI</span>
                  <div className="relative group">
                    <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      Yearly profit projection
                    </div>
                  </div>
                </div>
                <span className={`text-lg font-medium ${annualProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(annualProfit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Right Section - Action Buttons */}
            <div className="flex items-center gap-4 ml-6 pl-6 border-l">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100/80 hover:bg-gray-200/80 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
