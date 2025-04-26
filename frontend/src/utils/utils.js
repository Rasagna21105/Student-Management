// Format date for display
export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Format date for form inputs (YYYY-MM-DD)
  export const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  
  // Validate email format
  export const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  
  // Generate random ID (for studentId if needed)
  export const generateId = (prefix = 'STU') => {
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}${timestamp}${random}`;
  };
  
  // Get current year
  export const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  
  // Get years for dropdown (from 2000 to current year)
  export const getYearOptions = () => {
    const currentYear = getCurrentYear();
    const years = [];
    for (let year = 2000; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };
  
  // Common departments for suggestions
  export const commonDepartments = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Business Administration',
    'Economics',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Psychology',
    'Sociology',
    'History',
    'English Literature',
    'Political Science'
  ];