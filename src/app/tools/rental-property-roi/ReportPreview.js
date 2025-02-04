'use client';

import React from 'react';

const ReportPreview = ({ printOptions, properties }) => {
  const { theme, color, customizations } = printOptions;

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
      blue: { primary: '#2563eb', secondary: '#dbeafe' },
      green: { primary: '#059669', secondary: '#d1fae5' },
      purple: { primary: '#7c3aed', secondary: '#ede9fe' },
      gray: { primary: '#4b5563', secondary: '#f3f4f6' }
    };
    return colors[color] || colors.blue;
  };

  const themeStyles = getThemeStyles();
  const colorStyles = getColorStyles();

  return (
    <div className="border rounded-xl overflow-hidden bg-white">
      <div className="p-8">
        {/* Preview Header */}
        <div className={`text-center mb-8 ${themeStyles}`}>
          {customizations.includeLogo && (
            <div className="mb-4 h-16 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-400">Company Logo</span>
            </div>
          )}
          <h1 
            className="text-3xl font-medium mb-2"
            style={{ color: colorStyles.primary }}
          >
            {customizations.reportTitle}
          </h1>
          {customizations.companyName && (
            <p className="text-lg mb-1">{customizations.companyName}</p>
          )}
          {customizations.includeTimestamp && (
            <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
          )}
        </div>

        {/* Preview Content */}
        <div className="space-y-6">
          {/* Portfolio Overview Preview */}
          <div className={`p-6 rounded-lg ${themeStyles}`} style={{ backgroundColor: colorStyles.secondary }}>
            <h2 className="text-xl font-medium mb-4" style={{ color: colorStyles.primary }}>
              Portfolio Overview
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Total Properties</p>
                <p className="text-2xl font-medium">{properties.length}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Units</p>
                <p className="text-2xl font-medium">
                  {properties.reduce((sum, prop) => sum + prop.data.units.length, 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Property Analysis Preview */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4" style={{ color: colorStyles.primary }}>
              Property Analysis
            </h2>
            <div className="space-y-4">
              {properties.slice(0, 2).map((property, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">{property.name}</h3>
                  <p className="text-gray-600">{property.data.units.length} Units</p>
                </div>
              ))}
              {properties.length > 2 && (
                <div className="text-center text-gray-500">
                  + {properties.length - 2} more properties
                </div>
              )}
            </div>
          </div>

          {/* Individual Property Reports Preview */}
          {printOptions.individualReports && (
            <div className="border rounded-lg p-6 mt-6">
              <h2 className="text-xl font-medium mb-4" style={{ color: colorStyles.primary }}>
                Individual Property Reports
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Detailed Property Analysis</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">• Property overview with key metrics</p>
                    <p className="text-gray-600">• Unit-by-unit breakdown</p>
                    <p className="text-gray-600">• Financial performance analysis</p>
                  </div>
                </div>
                <div className="text-center text-gray-500">
                  {properties.length} individual property reports will be generated
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Preview Footer */}
        {customizations.includeFooter && (
          <div className="mt-8 pt-4 border-t text-center text-gray-500 text-sm">
            {customizations.companyContact && (
              <p className="mb-1">{customizations.companyContact}</p>
            )}
            {customizations.includePageNumbers && (
              <p>Page 1 of {properties.length + 1}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPreview; 