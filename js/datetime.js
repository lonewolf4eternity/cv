// JavaScript Document
$(document).ready(function() {
    // Create two variables with names of months and days of the week in the array
    var monthNames = [ "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember" ]; 
    var dayNames= ["Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"]
    
    // Create an object newDate()
    var newDate = new Date();
    // Retrieve the current date from the Date object
    newDate.setDate(newDate.getDate());
    // At the output of the day, date, month and year    
    //$('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());//
    $ ('#Date1').html(dayNames[newDate.getDay()] + " ");
    $ ('#Date2').html([newDate.getDate()] + " ");
    $ ('#months').html(monthNames[newDate.getMonth()] + " ");
    $ ('#years').html([newDate.getFullYear()] + " ");
    
    setInterval( function() {
        // Create an object newDate () and extract the second of the current time
        var seconds = new Date().getSeconds();
        // Add a leading zero to the value of seconds
        $("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
        },1000);
        
    setInterval( function() {
        // Create an object newDate () and extract the minutes of the current time
        var minutes = new Date().getMinutes();
        // Add a leading zero to the minutes
        $("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
        },1000);
        
    setInterval( function() {
        // Create an object newDate () and extract the clock from the current time
        var hours = new Date().getHours();
        // Add a leading zero to the value of hours
        $("#hours").html(( hours < 10 ? "0" : "" ) + hours);
        }, 1000);
        
    }); 