const actualdate = document.getElementById('date');
const dateArrey= ['SUN', 'MON' , 'TUE','WED','FRI','SAT']
const Month = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','OCT','NOV','DEC']
setInterval(() => {
    let currentDate1= new Date()
    document.getElementById('date').innerHTML= dateArrey[currentDate1.getDay()] +'|'+ Month[currentDate1.getMonth()] +' '+currentDate1.getDate()+'|'+currentDate1.toLocaleTimeString();
}, 1000);
