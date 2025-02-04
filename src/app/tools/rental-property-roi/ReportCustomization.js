'use client';

import React, { useState } from 'react';

const ReportCustomization = ({ printOptions, setPrintOptions }) => {
  const [selectedTheme, setSelectedTheme] = useState('modern');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [customizations, setCustomizations] = useState({
    includeLogo: false,
    includeFooter: true,
    includePageNumbers: true,
    includeTimestamp: true,
    companyName: '',
    companyContact: '',
    reportTitle: 'Real Estate Portfolio Analysis',
    customNotes: ''
  });

  const themes = [
    { id: 'modern', name: 'Modern & Clean', preview: '◻️' },
    { id: 'classic', name: 'Classic Professional', preview: '◼️' },
    { id: 'minimal', name: 'Minimal', preview: '▢' },
    { id: 'bold', name: 'Bold & Impactful', preview: '▣' }
  ];

  const colors = [
    { id: 'blue', name: 'Professional Blue', hex: '#2563eb' },
    { id: 'green', name: 'Success Green', hex: '#059669' },
    { id: 'purple', name: 'Luxury Purple', hex: '#7c3aed' },
    { id: 'gray', name: 'Corporate Gray', hex: '#4b5563' }
  ];

  const handleCustomizationChange = (field, value) => {
    setCustomizations(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Update parent's printOptions
    setPrintOptions(prev => ({
      ...prev,
      theme: selectedTheme,
      color: selectedColor,
      customizations: {
        ...prev.customizations,
        [field]: value
      }
    }));
  };

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    setPrintOptions(prev => ({
      ...prev,
      theme
    }));
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setPrintOptions(prev => ({
      ...prev,
      color
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Report Theme</h3>
        <div className="grid grid-cols-2 gap-4">
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTheme === theme.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <span className="text-2xl mb-2">{theme.preview}</span>
              <p className="font-medium">{theme.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Color Scheme</h3>
        <div className="flex gap-4">
          {colors.map(color => (
            <button
              key={color.id}
              onClick={() => handleColorChange(color.id)}
              className={`relative p-4 rounded-xl border-2 transition-all flex-1 ${
                selectedColor === color.id 
                  ? 'border-blue-500' 
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <div 
                className="w-full h-2 rounded mb-2"
                style={{ backgroundColor: color.hex }}
              />
              <p className="font-medium text-sm">{color.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Report Type</h3>
        <div className="space-y-3">
          <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={printOptions.individualReports}
              onChange={(e) => setPrintOptions(prev => ({ ...prev, individualReports: e.target.checked }))}
              className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <div className="ml-3">
              <span className="font-medium">Include Individual Property Reports</span>
              <p className="text-sm text-gray-500">Generate detailed reports for each property in addition to the portfolio summary</p>
            </div>
          </label>

          <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={printOptions.includeUtilities}
              onChange={(e) => setPrintOptions(prev => ({ ...prev, includeUtilities: e.target.checked }))}
              className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <div className="ml-3">
              <span className="font-medium">Include Utility Details</span>
              <p className="text-sm text-gray-500">Show utility payment configurations and costs for each property</p>
            </div>
          </label>

          <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={printOptions.includeProjections}
              onChange={(e) => setPrintOptions(prev => ({ ...prev, includeProjections: e.target.checked }))}
              className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <div className="ml-3">
              <span className="font-medium">Include 5-Year Projections</span>
              <p className="text-sm text-gray-500">Show projected income and profit over the next 5 years</p>
            </div>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Report Content</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Report Title</label>
            <input
              type="text"
              value={customizations.reportTitle}
              onChange={(e) => handleCustomizationChange('reportTitle', e.target.value)}
              placeholder="Enter report title"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Company Name</label>
            <input
              type="text"
              value={customizations.companyName}
              onChange={(e) => handleCustomizationChange('companyName', e.target.value)}
              placeholder="Enter your company name"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Contact Information</label>
            <input
              type="text"
              value={customizations.companyContact}
              onChange={(e) => handleCustomizationChange('companyContact', e.target.value)}
              placeholder="Enter contact information"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Custom Notes</label>
            <textarea
              value={customizations.customNotes}
              onChange={(e) => handleCustomizationChange('customNotes', e.target.value)}
              placeholder="Add any additional notes or comments"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Additional Options</h3>
        <div className="space-y-3">
          <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={customizations.includeLogo}
              onChange={(e) => handleCustomizationChange('includeLogo', e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="ml-3 font-medium">Include Company Logo</span>
          </label>

          <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={customizations.includeFooter}
              onChange={(e) => handleCustomizationChange('includeFooter', e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="ml-3 font-medium">Include Footer</span>
          </label>

          <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={customizations.includePageNumbers}
              onChange={(e) => handleCustomizationChange('includePageNumbers', e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="ml-3 font-medium">Include Page Numbers</span>
          </label>

          <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={customizations.includeTimestamp}
              onChange={(e) => handleCustomizationChange('includeTimestamp', e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="ml-3 font-medium">Include Generation Timestamp</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ReportCustomization; 