
let weight=0;
let spatulaselect='';
let powderselect=1;
let checkstart=0;


 function startSimulation(){
  checkstart=1;
 weight=document.getElementById('weight').value;
 if(weight==0){
   alert("please enter weight");
    return;
 }
 else{
   if(checkonbtn==0){
   document.getElementById('instruction').innerHTML='"Now click on weight machine ON button "'
   }
  else{
    document.getElementById('instruction').innerHTML='"Now click on box Cap "'
  }
 }

  powderselect=document.getElementById('powder').value;
   switch(powderselect){
    case "1":
      // document.getElementById('Nacl').classList.toggle('opencap');
      spatulaselect='spatulamove_1';
      break;
    case "2":
      // document.getElementById('Nacltalc').classList.toggle('opencap');
      spatulaselect='spatulamove_2';
      break;
   }
  }

   let checkonbtn=0;
  function ONBUTTON(){
     checkonbtn=1;
     document.getElementById('weightcounter').innerHTML="<span style='color:red'>0.00 gm <span/>";
     if(checkstart>0  && checkonbtn>0){
     document.getElementById('instruction').innerHTML='"Now click on box Cap "'
     }
     else if(checkonbtn>0){
         document.getElementById('instruction').innerHTML='" Please Enter weight and select powder and click on start"'
     }
     else{
       document.getElementById('instruction').innerHTML='" please click on weight machine ON button"'
     }
  }

  function TAREBUTTON(){
    checkonbtn=0;
    document.getElementById('weightcounter').innerHTML="<span>0.00 gm <span/>";
     document.getElementById('instruction').innerHTML='" Now click on weight machine ON button"'
  }


   let opencapcheck=0;

   function handleonclick(el,id){
    if(checkstart==0){
      alert('please start the simulater');
    }
    else{
     if(id==powderselect){
        el.classList.toggle('opencap');
        setTimeout(function() {
             document.getElementById('instruction').innerHTML='"Now click on spatula"'          
              opencapcheck++;
        },2000);
     
     }
     else{
      alert('please click on selected powder ')
     }
    }
  }

   document.getElementById('powderid1').classList.toggle('box')
   let checkspatula=0;


  function spatulaonclick(el){
    if(opencapcheck==0){
      alert('please open cap');
    }
    else
      {
    // animateWeight(100);
    // document.getElementById('spatu').classList.toggle('spatulamove');
    // document.getElementById('powd').classList.toggle('powderspatula');
     el.classList.toggle(`${spatulaselect}`)
    if(weight==0){
      document.getElementById('weightcounter').innerHTML="<span style='color:red'>0.00 gm <span/>";
    }
    setTimeout(function() {
       document.getElementById('powderid1').classList.toggle('powder');
       document.getElementById('powderid1').classList.remove('box');
       animateWeight(weight);
         checkspatula++;
         document.getElementById('instruction').innerHTML='"Now click on petridish"';
    },6000);

     setTimeout(function() {
       document.getElementById('powd').style.opacity=1;
    },4300);

    setTimeout(function() {
      document.getElementById('powd').style.opacity=0;
   },5600);
    
   }}

   function petridishmove() {
    if(checkspatula==0){
      alert('please put the powder');
    }
    else{
    document.getElementById('petridishmove1').classList.toggle('petridishmove');
    document.getElementById('powderid1').classList.toggle('petridishpowdermove'); 
    setTimeout(() => {
      document.getElementById("overlay").style.display = "flex";
      calculateRepose(weight);
    }, 8000);
  }}
  

  function animateWeight(target) {
    const display = document.getElementById("weightcounter");
    let current = 0;
    const step = target / 20;
    let count = 0;
    const interval = setInterval(() => {
      current += step;
      display.textContent = current.toFixed(2) + "g";
      display.style.color = "red"; 
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

