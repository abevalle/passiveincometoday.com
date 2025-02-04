// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = 'G-RSTZ9WJ5Z6'

// Log page views
export const pageview = (url) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Log specific events
export const event = ({ action, category, label, value }) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track user engagement
export const trackEngagement = (eventName, eventData = {}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      ...eventData,
      timestamp: new Date().toISOString(),
    })
  }
}

// Track form submissions
export const trackFormSubmission = (formName, success = true) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'form_submission', {
      form_name: formName,
      success: success,
    })
  }
}

// Track button clicks
export const trackButtonClick = (buttonName, buttonLocation) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'button_click', {
      button_name: buttonName,
      button_location: buttonLocation,
    })
  }
}

// Track tool usage
export const trackToolUsage = (toolName, actionType) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'tool_usage', {
      tool_name: toolName,
      action_type: actionType,
    })
  }
} 