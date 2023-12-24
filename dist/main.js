(()=>{const e="http://api.weatherapi.com/v1",t="bd78ac7fb3ea49ec91c111815232412";let n="auckland",o=`${e}/current.json?key=${t}&q=${n}&aqi=no`;function c(e){document.getElementById("temp").textContent=`${e.current.temp_c}°C`;const t=document.getElementById("cond"),n=document.getElementById("condimg");n.src=e.current.condition.icon,n.style.width="3rem",t.appendChild(n),document.getElementById("cond-text").textContent=e.current.condition.text,document.getElementById("city").textContent=`${e.location.name}, `,document.getElementById("country").textContent=e.location.country;const o=e.location.localtime,c=new Date(o),d=c.getFullYear(),r=c.toLocaleString("default",{month:"short"}),a=c.getDate(),l=c.toLocaleString("default",{weekday:"long"}),m=c.getHours(),i=c.getMinutes(),u=`${l}, ${a} ${r} ${d}`,s=`${m%12||12}:${i<10?"0":""}${i} ${m>=12?"PM":"AM"}`;document.getElementById("date").textContent=u,document.getElementById("time").textContent=s,document.getElementById("feelval").textContent=`${e.current.feelslike_c}°C`,document.getElementById("rainval").textContent=`${e.current.cloud}%`,document.getElementById("windval").textContent=`${e.current.wind_kph}kph`,document.getElementById("hval").textContent=`${e.current.humidity}%`}async function d(){try{const e=await fetch(o,{mode:"cors"});if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);const t=await e.json();c(t),console.log(t)}catch(e){console.error("Error fetching weather data:",e.message),function(e){const t=document.getElementById("info"),n=document.createElement("div");n.className="error-message",n.textContent="Error: Invalid city name",t.appendChild(n)}(e.message),setTimeout((()=>{!function(){const e=document.getElementById("info"),t=e.querySelector(".error-message");t&&e.removeChild(t)}()}),5e3)}}d(),document.getElementById("searchBtn").addEventListener("click",(()=>{const r=document.getElementById("searchField");n=r.value,o=`${e}/current.json?key=${t}&q=${n}&aqi=no`,d(),c(),r.value=""}))})();