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
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
    <div className="container mx-auto px-4 py-8 pt-20"> {/* Added mt-16 for navbar height */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Rental Property ROI Calculator</h1>

      {showStickySummary && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t md:hidden z-50">
          <div className="flex justify-between items-center">
            <div className="text-sm">Monthly Profit:</div>
            <div className="text-xl font-bold text-green-600">${monthlyProfit.toFixed(2)}</div>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>Income: ${totalIncome.toFixed(2)}</div>
            <div>Expenses: ${totalExpenses.toFixed(2)}</div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
        <div className="md:col-span-2 space-y-4">
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
          
          <button
            onClick={handleAddUnit}
            className="w-full p-3 sm:p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            + Add Another Unit
          </button>
        </div>

        <div className="space-y-4">
          <div ref={summaryRef} className="bg-white p-4 sm:p-6 rounded-lg shadow-md h-fit md:sticky md:top-4">
            <h2 className="text-xl font-semibold mb-4 sm:mb-6">Summary</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-base sm:text-lg mb-2">Total Units: {units.length}</p>
                <p className="text-base sm:text-lg mb-2">Monthly Income: ${totalIncome.toFixed(2)}</p>
                <p className="text-base sm:text-lg mb-2">Monthly Expenses: ${totalExpenses.toFixed(2)}</p>
                <div className="border-t pt-2 mt-2">
                  <p className="text-lg sm:text-xl font-semibold text-green-600">
                    Monthly Profit: ${monthlyProfit.toFixed(2)}
                  </p>
                  <p className="text-lg sm:text-xl font-semibold text-green-600">
                    Annual Profit: ${annualProfit.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <SaveLoadForm
            onSave={handleSaveProperty}
            savedProperties={savedProperties}
            onLoad={handleLoadProperty}
            onDelete={handleDeleteProperty}
          />
        </div>
      </div>
    </div>
  );
}
