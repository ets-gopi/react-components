function format(date) {
    if (!(date instanceof Date) || isNaN(date)) {
      return "Invalid Date";  // Return an error message if the date is invalid
    }
  
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    return `${daysOfWeek[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  }
  
  export default format;
  