// src/hooks/dateUtils.js
export const convertDateFormat = (dateString) => {
    const date = new Date(dateString);
    
    // Ensure that the date is valid
    if (isNaN(date.getTime())) {
      return null; // Return null or handle invalid date as needed
    }
  
    // Get the month, day, and year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${month}/${day}/${year}`; // Format as MM/DD/YYYY
};
  