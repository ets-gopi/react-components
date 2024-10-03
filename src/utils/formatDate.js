const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
function format(date) {
    if (!(date instanceof Date) || isNaN(date)) {
      return "Invalid Date";  // Return an error message if the date is invalid
    }
    return `${daysOfWeek[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  }
export const countdownFormat=(date)=>{
  if(!(date instanceof Date)){
    return "Invalid Date"
  }
  const newDate=new Date(date);
  return `${newDate.getFullYear()}-${String(newDate.getMonth()+1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`
}
  
  export default format;
  