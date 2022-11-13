/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

/* need a more elegant way of declaring const or rather define like in "C" */
const MAX_SIZE=255; 
const MULTI_PI_BASE=2;
const MID_POINT=MAX_SIZE / 2;
const TABLE_SIZE=256; 
  var chart; 
/* BOOT UP TIME ! */  

alert('only sine modulator available at the moment !');

// don't call things that don't exit ! 
/*
var compute_button = document.querySelector(".user_button");
    compute_button.addEventListener("click",calsine); 
*/
var     mult_slider  = document.querySelector("#mult_freq"); 
        mult_slider.addEventListener("input", refresh_slider_value);
        mult_slider.addEventListener("input", calsine);
    
 var    modulated_sel = document.querySelector("#sel_waveform"); 
        modulated_sel.addEventListener('change',calsine);
        
 /*
  * for next use ! at this point we only use sine modulator 
 var    modulator_sel = document.querySelector("#sel_modulator"); 
        modulator_sel.addEventListener('change',calsine);
*/
    
//for the function to be call after the page is fully loaded, we use this ! 
document.addEventListener('DOMContentLoaded', calsine); 
document.addEventListener('DOMContentLoaded', refresh_slider_value); 
    
var span_slider_mult = document.querySelector("#span_mult_freq"); 

refresh_slider_value(); 


function refresh_slider_value()
{
   span_slider_mult.span_slider_mult.innerText = span_slider_mult.textContent =  mult_slider.value.toString(); 
}

function calsine() 
{
  var user_modwave = new Array();
  var userwave = new Array();

//retrieve remaining datas for computation 
 var raw_text              = document.querySelector("#txt_raw_data");
 var modulator_waveform    = document.querySelector("#sel_modulator_waveform");
 
 var y_axis = new Array(); 
 
 //reset value to the block text
  raw_text.value =''; 
  
  //create the modulated waveform base ! 
     for (let i=0; i<TABLE_SIZE; i++)
     {
            //select which waveform we build first
            switch(modulated_sel.options[modulated_sel.selectedIndex].text)
            {
                case "SINE":
                userwave[i] = Math.floor( (Math.sin(i * MULTI_PI_BASE * Math.PI / TABLE_SIZE)+1) * MID_POINT);  
                break;
                
                case "TRIANGLE":
                if(i<127)   userwave[i] = i *2; 
                else        userwave[i] = (255 - i) * 2;
                
                break; 
            
                case "SQUARE": 
                if(i & 0x80)   userwave[i] = 255; 
                else           userwave[i] = 0; 
                break; 
            
                case "SAW": 
                userwave[i] = i;
                break; 
            
                case "NOISE": 
                userwave[i] = Math.floor((Math.random()*(255-0+1)));
                break; 
            }
            
        console.log(userwave[i]); 

        user_modwave[i] = Math.floor( (Math.sin(i * mult_slider.value * Math.PI / TABLE_SIZE)+1) * MID_POINT);  
          
       // we need to make a expection if the modulation freq is set 0, in this case we only show the modulated waveform
       if(mult_slider.value !== "0") userwave[i] = ((userwave[i] * user_modwave[i]) >> 8)+1;  

       // write the binary data for export 
        raw_text.value += userwave[i].toString() + ", "; 
        
         //as we need to send two arrays to the chart, we create one just for inumeration for the y axis
        y_axis[i] = i; 
     }
     
     //we ship the arrays to the charts
     build_chart(userwave,y_axis); 
}

function build_chart(x_axis_set, y_axis_ref)
{
    // we need to destroy the content of the chart before using it again. Apparently the variable declared in 
    // functions remains "static" in javascript, so we need to clean them up ! 
  
    if(chart) chart.destroy(); 
    
    var ctx = document.getElementById("myChart");
    
   chart = new Chart(ctx, {
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

