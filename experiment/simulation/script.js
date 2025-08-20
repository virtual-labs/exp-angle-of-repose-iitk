
let weight=0;
let spatulaselect='';
function startSimulation() {
 weight=document.getElementById('weight').value;
 if(weight==0){
   alert("please enter weight");
    return;
 }
 document.getElementById('instruction').innerHTML='"Now click on powder cap"'

 let powderselect=document.getElementById('powder').value;
  
   switch(powderselect){
    case "1":
      document.getElementById('Nacl').classList.toggle('opencap');
      spatulaselect='spatulamove_1';
      break;
    case "2":
      document.getElementById('Nacltalc').classList.toggle('opencap');
      spatulaselect='spatulamove_2';
      break;
   }
  }
  

  function handleonclick(el){
      document.getElementById('instruction').innerHTML='"Now click on spatula"'
      el.classList.toggle('opencap');
      
  }

   document.getElementById('powderid1').classList.toggle('box')

  function spatulaonclick(el){
    // animateWeight(100);
    document.getElementById('instruction').innerHTML='"Now click on petridish"';
    // document.getElementById('spatu').classList.toggle('spatulamove');
    // document.getElementById('powd').classList.toggle('powderspatula');
     el.classList.toggle(`${spatulaselect}`)
    if(weight==0){
      document.getElementById('weightcounter').innerHTML='0.00 gm';
    }
    setTimeout(function() {
       document.getElementById('powderid1').classList.toggle('powder');
       document.getElementById('powderid1').classList.remove('box');
       animateWeight(weight);
    },6000);

     setTimeout(function() {
       document.getElementById('powd').style.opacity=1;
    },4300);

    setTimeout(function() {
      document.getElementById('powd').style.opacity=0;
   },5600);
    
   }

   function petridishmove() {
    document.getElementById('petridishmove1').classList.toggle('petridishmove');
    document.getElementById('powderid1').classList.toggle('petridishpowdermove'); 
    setTimeout(() => {
      document.getElementById("overlay").style.display = "flex";
      calculateRepose(weight);
    }, 8000);
  }
  

  function animateWeight(target) {
    const display = document.getElementById("weightcounter");
    let current = 0;
    const step = target / 20;
    let count = 0;
    const interval = setInterval(() => {
      current += step;
      display.textContent = current.toFixed(2) + "g";
      count++;
      if (count >= 20) clearInterval(interval);
    },100);
  }



  function closePopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("result").innerHTML = "";
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  function calculateRepose(weight) {
    // const weight = parseFloat(document.getElementById("weightInput").value);
    if (isNaN(weight) || weight <= 0) {
      alert("Please enter a valid weight.");
      return;
    }
  
    const density = 0.5; // g/cm³
    const volume = weight / density; // cm³

    const height = Math.cbrt(volume).toFixed(2); // cube root of volume
    const radius = (height / Math.tan((35 * Math.PI) / 180)).toFixed(2); // angle ≈ 35°
    const angleRad = Math.atan(height / radius);
    const angleDeg = (angleRad * 180 / Math.PI).toFixed(2);

    document.getElementById("result").innerHTML = `
      <p><strong>Height:</strong> ${height} cm</p>
      <p><strong>Radius:</strong> ${radius} cm</p>
      <p><strong>Angle of Repose:</strong> ${angleDeg}°</p>
    `;
  }

