const submitBtn= document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const cityName1 = document.getElementById("cityName1");
const city_name = document.getElementById("city_name");
const datahide = document.querySelector('.middle_layer');
const temp_real_val = document.getElementById("temp_real_val");
const temp1  = document.getElementById("temp1")       
const day  = document.getElementById("day") 
const today_date  = document.getElementById("today_date") 
      

const getInfo= async(event)=>{
     event.preventDefault();
     let cityVal= cityName.value;

     if(cityVal=== ""){
        city_name.innerHTML= "Plz give city name";
        datahide.classList.add("data_hide");
     }
     else{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=9b4d687b5f631f1741115a3c15e313e0`
            const response = await fetch(url);
            
            const data= await response.json();
            const arrdata= [data];
            /////////  temp and cityname
            city_name.innerText= `${arrdata[0].name}, ${arrdata[0].sys.country}`; 
            temp_real_val.innerText= `${arrdata[0].main.temp}`;
            
            ///////// cloud vgera pe
            const tempMood = arrdata[0].weather[0].main;
            console.log(tempMood);
            if (tempMood == "Clear") {
                    temp1.innerHTML =
                    "<i class='fas fa-sun' style='color: #eccc68;'></i>";
                } else if (tempMood == "Clouds") {
                    temp1.innerHTML =
                    "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
                } else if (tempMood == "Rain") {
                    temp1.innerHTML =
                    "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
                } else {
                   temp1.innerHTML =
                    "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
    
                }
                datahide.classList.remove("data_hide");
                cityVal= "";
        }

        catch{
            cityVal = " ";
            city_name.innerText =  `please enter the proper city name`;
            datahide.classList.add("data_hide");
            
        }  
    }
}


submitBtn.addEventListener('click',getInfo);

const getCurrentDay= ()=> {
    var weekday= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var s= new Date();
    var day= s.getDay();
    return weekday[day];
  }

const getdatemonth= ()=>{
    var month= ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var s= new Date();
    let date= s.getDate();
    let m= month[s.getMonth()];
    return `${date},${m}`;
}  

day.innerText= `${getCurrentDay()}`;
today_date.innerText= `${getdatemonth()}`;
