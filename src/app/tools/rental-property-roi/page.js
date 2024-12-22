'use client';

import { useState, useEffect, useRef } from 'react';

const SaveLoadForm = ({ onSave, savedProperties, onLoad, onDelete }) => {
  const [saveName, setSaveName] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    if (saveName.trim()) {
      onSave(saveName.trim());
      setSaveName('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 print:hidden">
      <h2 className="text-xl font-semibold mb-4">Save/Load Properties</h2>
      
      <form onSubmit={handleSave} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Property Name"
          value={saveName}
          onChange={(e) => setSaveName(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </form>

      {savedProperties.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium mb-2">Saved Properties</h3>
          {savedProperties.map((prop, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span>{prop.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onLoad(prop)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Load
                </button>
                <button
                  onClick={() => onDelete(prop.name)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PropertySettings = ({ settings, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Property Settings</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Monthly Mortgage Payment ($)</label>
            <input
              type="number"
              value={settings.mortgagePayment}
              onChange={(e) => onChange('mortgagePayment', Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block mb-2">Property Insurance ($)</label>
            <input
              type="number"
              value={settings.propertyInsurance}
              onChange={(e) => onChange('propertyInsurance', Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Utility Configuration</h3>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={settings.singleWaterMeter}
                onChange={(e) => onChange('singleWaterMeter', e.target.checked)}
                className="mr-2"
              />
              Single Water Meter for Property
            </label>
            {settings.singleWaterMeter && (
              <input
                type="number"
                placeholder="Total Water Bill"
                value={settings.totalWaterBill}
                onChange={(e) => onChange('totalWaterBill', Number(e.target.value))}
                className="w-full p-2 border rounded mt-2"
              />
            )}
          </div>

          <div>
            <h3 className="font-medium mb-2">Landlord Paid Items</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.landlordPaysTrash}
                  onChange={(e) => onChange('landlordPaysTrash', e.target.checked)}
                  className="mr-2"
                />
                Trash Service
              </label>
              {settings.landlordPaysTrash && (
                <input
                  type="number"
                  placeholder="Monthly Trash Cost"
                  value={settings.trashCost}
                  onChange={(e) => onChange('trashCost', Number(e.target.value))}
                  className="w-full p-2 border rounded mt-2"
                />
              )}
            </div>
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
    frequency: 'monthly' // or 'yearly'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newExpense.name && newExpense.amount) {
      onAdd(newExpense);
      setNewExpense({ name: '', amount: 0, frequency: 'monthly' });
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
      <h2 className="text-xl font-semibold mb-4">Custom Expenses</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
        <input
          type="text"
          placeholder="Expense Name"
          value={newExpense.name}
          onChange={(e) => setNewExpense({...newExpense, name: e.target.value})}
          className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({...newExpense, amount: Number(e.target.value)})}
            className="w-24 sm:w-32 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newExpense.frequency}
            onChange={(e) => setNewExpense({...newExpense, frequency: e.target.value})}
            className="w-24 sm:w-32 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {expenses.map((expense, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span>{expense.name}</span>
            <div className="flex items-center gap-4">
              <span>${expense.amount} ({expense.frequency})</span>
              <button
                onClick={() => onRemove(index)}
                className="text-red-500 hover:text-red-700"
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
      <div 
        className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-white cursor-pointer hover:bg-blue-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold">Unit {index + 1}</h3>
            <span className="text-gray-500">
              ${unit.rent}/month
            </span>
          </div>
          <div className="flex items-center gap-3">
            {index > 0 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="text-red-500 hover:text-red-700 p-2"
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
        <div className="p-4 sm:p-6 border-t space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block mb-2 font-medium">Monthly Rent</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={unit.rent}
                onChange={(e) => onChange(index, 'rent', e.target.value)}
                className="w-full pl-8 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                step="50"
              />
            </div>
          </div>

          <div className="grid gap-6">
            {['water', 'gas', 'electric'].map((utility) => (
              <div key={utility} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium capitalize">{utility} Usage</label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={unit[`tenantPays${utility.charAt(0).toUpperCase() + utility.slice(1)}`]}
                      onChange={(e) => onChange(index, `tenantPays${utility.charAt(0).toUpperCase() + utility.slice(1)}`, e.target.checked)}
                      className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">Tenant Pays</span>
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={unit[`${utility}Bill`]}
                    onChange={(e) => onChange(index, `${utility}Bill`, e.target.value)}
                    disabled={unit[`tenantPays${utility.charAt(0).toUpperCase() + utility.slice(1)}`]}
                    className="w-full pl-8 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Future Projections</h2>
      <div className="space-y-4">
        <div className="text-sm text-gray-600 mb-2">
          Assuming 3% annual rent increase
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-2">Year</th>
              <th className="py-2">Annual Income</th>
              <th className="py-2">Annual Profit</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {projections.map(({ year, annualIncome, annualProfit }) => (
              <tr key={year}>
                <td className="py-2">Year {year}</td>
                <td className="py-2">${annualIncome.toFixed(2)}</td>
                <td className="py-2 text-green-600">${annualProfit.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">ROI Metrics</h3>
          <div className="text-sm space-y-2">
            <p>5-Year Total Profit: ${projections.reduce((sum, p) => sum + p.annualProfit, 0).toFixed(2)}</p>
            {propertySettings.mortgagePayment > 0 && (
              <p>Monthly Mortgage Coverage: {((totalIncome / propertySettings.mortgagePayment) * 100).toFixed(1)}%</p>
            )}
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
    <div className="hidden print:block print-border">
      <h2 className="text-xl font-bold mb-4">Unit Summary</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Unit</th>
            <th className="text-left py-2">Monthly Rent</th>
            <th className="text-left py-2">Utilities</th>
            <th className="text-left py-2">Net Income</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit, index) => {
            const utilityCosts = !unit.tenantPaysWater ? unit.waterBill : 0
              + !unit.tenantPaysGas ? unit.gasBill : 0
              + !unit.tenantPaysElectric ? unit.electricBill : 0;
            const netIncome = unit.rent - utilityCosts;
            
            return (
              <tr key={index} className="border-b">
                <td className="py-2">Unit {index + 1}</td>
                <td className="py-2">${unit.rent}</td>
                <td className="py-2 text-sm">{getTotalUtilityCosts(unit)}</td>
                <td className="py-2">${netIncome}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="font-bold">
            <td className="py-2">Total</td>
            <td className="py-2">
              ${units.reduce((sum, unit) => sum + unit.rent, 0)}
            </td>
            <td className="py-2">
              ${units.reduce((sum, unit) => sum + (
                (!unit.tenantPaysWater ? unit.waterBill : 0) +
                (!unit.tenantPaysGas ? unit.gasBill : 0) +
                (!unit.tenantPaysElectric ? unit.electricBill : 0)
              ), 0)}
            </td>
            <td className="py-2">
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
    <div className="space-y-6">
      {/* Income Breakdown */}
      <div>
        <h3 className="font-semibold mb-2">Monthly Income</h3>
        <div className="space-y-1">
          {incomeBreakdown.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span>${item.amount.toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold border-t pt-1 mt-2">
            <span>Total Income</span>
            <span>${totalIncome.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Expenses Breakdown */}
      <div>
        <h3 className="font-semibold mb-2">Monthly Expenses</h3>
        <div className="space-y-4">
          {/* Fixed Expenses */}
          {fixedExpenses.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-sm text-gray-600">Fixed Expenses</h4>
              {fixedExpenses.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>${item.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Utility Expenses */}
          {utilityExpenses.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-sm text-gray-600">Utilities</h4>
              {utilityExpenses.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    {item.name}
                    {item.note && (
                      <span className="text-gray-500 text-xs">{item.note}</span>
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
              <h4 className="text-sm text-gray-600">Additional Expenses</h4>
              {formattedCustomExpenses.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name} ({item.frequency})</span>
                  <span>${item.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between font-semibold border-t pt-1">
            <span>Total Expenses</span>
            <span>${totalExpenses.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Net Profit */}
      <div className="border-t-2 pt-2">
        <div className="flex justify-between font-bold text-lg">
          <span>Monthly Net Profit</span>
          <span className={totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}>
            ${(totalIncome - totalExpenses).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Annual Net Profit</span>
          <span className={totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}>
            ${((totalIncome - totalExpenses) * 12).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
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

  const handleSaveProperty = (name) => {
    const propertyData = {
      name,
      timestamp: Date.now(),
      data: {
        propertySettings,
        customExpenses,
        units
      }
    };

    const updatedProperties = [...savedProperties, propertyData];
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

  return (
    <div className="container mx-auto px-4 py-8 pt-20 pb-24"> {/* Updated padding bottom */}
      {/* Print Header - Only visible when printing */}
      <div className="hidden print:block print-header">
        <h1 className="text-3xl font-bold mb-2">Rental Property ROI Analysis</h1>
        <p className="text-sm">Generated on {new Date().toLocaleDateString()}</p>
        <hr className="my-4" />
      </div>

      {/* Screen-only title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 print:hidden">
        Rental Property ROI Calculator
      </h1>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-8 print:block">
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
        </div>
      </div>

      {/* Sticky Footer Summary */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg transform transition-transform duration-300 ease-in-out z-50 print:hidden ${showStickySummary ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left Section - Key Metrics */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-gray-500">Monthly Income</span>
                <span className="text-lg font-semibold text-gray-900">
                  ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-gray-500">Monthly Expenses</span>
                <span className="text-lg font-semibold text-gray-900">
                  ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-gray-500">Monthly Profit</span>
                  <div className="relative group">
                    <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      Total income minus all expenses
                    </div>
                  </div>
                </div>
                <span className={`text-lg font-semibold ${monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(monthlyProfit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-gray-500">Annual ROI</span>
                  <div className="relative group">
                    <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      Yearly profit projection
                    </div>
                  </div>
                </div>
                <span className={`text-lg font-semibold ${annualProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(annualProfit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Right Section - Action Buttons */}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
