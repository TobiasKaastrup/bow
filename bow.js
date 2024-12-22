let topic = "mooseShoot";
let threshold = 0;
let thresholdMotion = 10;
let active = false
let alpha = 0.0;
let beta = 0.0;
let shoot = false
let firstTouch = true

let x = 0;
let y = 0;
let z = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('yellow');
  setupMQTT(topic);
  
}

function onMessage(message) {
  
}


function draw() {
  if(orientationSensor.hasNewValue) {
    let gyro = orientationSensor.get();
    alpha = gyro.alpha;
    beta = gyro.beta;
  }

  if(motionSensor.hasNewValue){
    let motion = motionSensor.get();
    x = motion.x;
    y = motion.y;
    z = motion.z;
  }
}

function touchStarted() {
  if(firstTouch){
  setupOrientation(threshold);
  setupMotion(thresholdMotion);

  //send beskeder hver 50 ms når skærmen er blevet trykket på
  //Kunne alternativt også gøres ved at definere et relevant treshold

  setInterval(startAiming,10)
  firstTouch = false
  }  
  else{
    shoot = true;
  }
}



function startAiming(){
  sendMessage({
    "from": config.myID,
    "alpha": alpha,
    "beta": beta,
    "x":x,
    "y":y,
    "z":z,
    "shoot":shoot
  });
}

