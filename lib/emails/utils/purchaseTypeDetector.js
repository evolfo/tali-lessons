/**
 * Determines if a purchase contains lessons, sheet music, or both
 * @param {Array} items - Array of purchased items with name property
 * @returns {Object} - { type: 'lessons' | 'sheetMusic' | 'mixed', hasLessons: boolean, hasSheetMusic: boolean }
 */
export function detectPurchaseType(items) {
  let hasLessons = false;
  let hasSheetMusic = false;

  items.forEach(item => {
    const itemName = (item.name || '').toLowerCase();

    // Check if it's a lesson - look for "minute lesson" or "minute lessons"
    if (itemName.includes('minute lesson')) {
      hasLessons = true;
    }
    // Otherwise, if the name doesn't contain "minute lesson", assume it's sheet music
    // This covers items like "Hot Cross Buns & Variations" by Tali Rubinstein
    else if (!itemName.includes('minute lesson')) {
      hasSheetMusic = true;
    }
  });

  // Determine overall type
  let type = 'lessons'; // default
  if (hasLessons && hasSheetMusic) {
    type = 'mixed';
  } else if (hasSheetMusic && !hasLessons) {
    type = 'sheetMusic';
  } else if (hasLessons && !hasSheetMusic) {
    type = 'lessons';
  }

  return {
    type,
    hasLessons,
    hasSheetMusic
  };
}

/**
 * Gets the appropriate email subject line based on purchase type
 * @param {string} type - 'lessons' | 'sheetMusic' | 'mixed'
 * @returns {string} - Email subject line
 */
export function getEmailSubject(type) {
  switch (type) {
    case 'lessons':
      return 'Welcome to Tali Recorder Lessons!';
    case 'sheetMusic':
      return 'Thank you for your sheet music purchase!';
    case 'mixed':
      return 'Thank you for your purchase!';
    default:
      return 'Thank you for your purchase!';
  }
}

/**
 * Gets the appropriate admin email subject line
 * @param {string} type - 'lessons' | 'sheetMusic' | 'mixed'
 * @returns {string} - Admin email subject line
 */
export function getAdminEmailSubject(type) {
  switch (type) {
    case 'lessons':
      return '🎓 New Lesson Purchase - Action Required';
    case 'sheetMusic':
      return '🎼 New Sheet Music Purchase';
    case 'mixed':
      return '🛒 New Purchase - Lessons & Sheet Music';
    default:
      return 'New Purchase Notification';
  }
}
