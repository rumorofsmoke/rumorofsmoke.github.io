/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */




const MAX_SIZE=255; 
const MULTI_PI_BASE=2;
const MID_POINT=MAX_SIZE / 2;
const TABLE_SIZE=256; 

/* BOOT UP TIME ! */  

//alert('not all function are implemented, at the moment only sine works !');

var compute_button = document.querySelector(".user_button");
compute_button.addEventListener("click",calsine); 


// just to have something to show at boot up ! 
var x = new Array();  
 
for (let i=0; i<MAX_SIZE; i++)
{
    x[i]=i; 
}
 build_chart(x,x); 
 
 
 
 
 
 /* FUNCTIONS */ 

function calsine () 
{
  var user_sine = new Array();
  var sinewave = new Array();
  var mult_sinewave =new Array(); 
  
  var user_multiplier; 

//retrieve data for computation 
 var raw_text              = document.querySelector("#txt_raw_data");
 //var modulated_waveform     = document.querySelector("#sel_waveform"); 
 //var modulator_waveform     = document.querySelector("#sel_modulator_freq");
 var modulator_multiplier   = document.querySelector("#sel_modulator_freq");

//what a mouthfull this one ...convert string to int
user_multiplier = parseInt(modulator_multiplier.options[modulator_multiplier.selectedIndex].value);


 

//console.log(user_multiplier); 
 

  raw_text.value =''; 
  
  
     for (let i=0; i<TABLE_SIZE; i++)
     {
         //base sine
       sinewave[i] = Math.floor( (Math.sin(i * MULTI_PI_BASE * Math.PI / TABLE_SIZE)+1) * MID_POINT);   
       
       // use temp sine for the modulator sine 
       user_sine[i] = Math.floor( (Math.sin(i * user_multiplier * Math.PI / TABLE_SIZE)+1) * MID_POINT);   
       
       // modulate baby ! 
       mult_sinewave[i] = ((sinewave[i] * user_sine[i]) >> 8)+1; 
      
     //   console.log(mult_sinewave[i]);
       
       // write the binary data for export 
         raw_text.value += " " + mult_sinewave[i].toString() + ","; 
 
     }
     var y_axis = new Array(); 
     for (let i=0; i<TABLE_SIZE; i++) y_axis[i] = i; 
     
         build_chart(mult_sinewave,y_axis); 
}



function build_chart(x_axis_set, y_axis_ref)
{
    var ctx = document.getElementById("myChart");
    
    new Chart(ctx, {
  type: "line",
  data: {
    labels: y_axis_ref,
    datasets: [{
      fill: false,
     pointStyle:"none",
      lineTension: 1,
      borderColor: "rgb(37, 150, 190)",     
      data: x_axis_set//yValues
    }]
  },
  options: {
    legend: {display: false}
   /* scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }*/
  }
});
    
}

/*
new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)", 
      borderColor: "rgba(255,0,255,0.5)",     
      data: yValues//yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
});
 */