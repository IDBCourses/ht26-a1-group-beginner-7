/*
 * IDB Programming: A1 Modelling — a musical instrument
 *
 * All of the code for your instrument goes in this file. It's split into sections:
 *   settings — the "fixed" parts of your program
 *   state    — the parts of your program that change over time
 *   sound    — the Tone.js instruments and effects
 *   update   — updates the state every 100ms, if necessary
 *   use      — applies the state to make sound every 100ms, if necessary
 *   controls — what happens when a key goes down or comes up
 *   setup    — starts everything
 *
 * There is no loop in this assignment. Nothing happens until the player presses
 * a key, and every key event follows the same two steps:
 *   1. update: change the state, based on which key it was
 *   2. use:    make sound from the state
 *
 * Tone.js documentation: https://tonejs.github.io/docs/15.1.22/
 */

// ---------- Settings ----------
// Settings variables should contain all of the "fixed" parts of your programs
// For example: which key does what, which notes you can play, the tempo.
//const exampleKey = "a"; // the key that plays the example note
//const exampleNote = "C4"; // the note it plays


const strings = ["E2", "A2", "D3", "G3", "B3", "E4"]; // the notes of a guitar's strings
const wahFrequencies = ["2n", "4n", "8n", "16n"];// slow -> fast
const wahDepths = [0.3, 0.6, 0.8, 1];// subtle -> full

// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: which octave you're playing in, or whether a drone is on.
let autoFilterOn = false;// toggle for the wah
//let wahPreset =0;

//Bounds + step sizes for arrow keys



// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth); // can play several notes at once

const autoFilter = new Tone.AutoFilter("4n").start();
autoFilter.frequency.value = wahFrequencies[0];// sweep speed
autoFilter.baseFrequency = 200;// lowest cutoff
autoFilter.octaves = 2.6;// sweep height, vocal range
autoFilter.depth.value = wahDepths[0];// sweep intensity
autoFilter.wet.value = 0;//amount of effect

//Vibrato
const vibrato = new Tone.Vibrato(5, 0.8);// strat: 5 Hz, depth 0.8

//chain -> instrument -> vibrato ->autoFilter -> speakers
const guitar = new Tone.PluckSynth();//wires the guitar's output into the filter's input
   guitar.chain(vibrato, autoFilter, Tone.Destination);//guitar -> autoFilter -> speakers
   synth.chain(vibrato, autoFilter, Tone.Destination);


//autoFilter.toDestination().start();//wires the filter's output into the speakers

// ---------- Update ----------
// Update the state. This is called every 100ms.
function update() {
  // Example: replace this with your own instrument.

  setTimeout(update, 100); // call update() again in 100 milliseconds
}

// ---------- Use ----------
// Use the state to make sound. This is called every 100ms.
function use() {
  setTimeout(use, 100); // call use() again in 100 milliseconds
}


// ---------- Controls (Event Handlers) ----------
// Runs every time a key goes down.
function changeVibrato(event) {
  if (event.key === "ArrowUp") {
    vibrato.frequency.value += 1;
   if (vibrato.frequency.value > 20)
    vibrato.frequency.value = 1;
    console.log("Vibrato Hz:", vibrato.frequency.value);
  }
  if (event.key === "ArrowDown") {
    vibrato.frequency.value -= 1;
  if (vibrato.frequency.value < 1)
    vibrato.frequency.value = 1;
  console.log("Vibrato Hz:", vibrato.frequency.value);
  }
}

function keyDown(event) {
  Tone.start(); // browsers only allow sound after the player has pressed something

  // Holding a key down sends keydown again and again. Only react to the first one.
  if (event.repeat) return;
  console.log("Key down:", event.key);



    // Example: replace this with your own instrument.
    if (event.key === "a") {
      guitar.triggerAttack(strings[0], Tone.now()); // keeps sounding until triggerRelease
    }
    else if (event.key === "s") {
      guitar.triggerAttack(strings[1], Tone.now());
    }
    else if (event.key === "d") {
      guitar.triggerAttack(strings[2], Tone.now());
    }
    else if (event.key === "f") {
      guitar.triggerAttack(strings[3], Tone.now());
    }
    else if (event.key === "g") {
      guitar.triggerAttack(strings[4], Tone.now());
    }
    else if (event.key === "h") {
      guitar.triggerAttack(strings[5], Tone.now());
    }

    changeVibrato(event);

    if (event.key === " ") {
      event.preventDefault();
      autoFilterOn = !autoFilterOn;
      autoFilter.wet.value = autoFilterOn ? 1 : 0;
      console.log("Wah:", autoFilterOn ? "ON" : "OFF");
    }
   }

// Vibrato frequency up / down
/*function changeVibrato(event) {
  if (event.key === "ArrowUp") {
    vibrato.frequency.value += 1;
   if (vibrato.frequency.value > 20)
    vibrato.frequency.value = 1;
    console.log("Vibrato Hz:", vibrato.frequency.value);
  }
  if (event.key === "ArrowDown") {
    vibrato.frequency.value -= 1;
  if (vibrato.frequency.value < 1)
    vibrato.frequency.value = 1;
  console.log("Vibrato Hz:", vibrato.frequency.value);
  } if (event.key === " ") {
    event.preventDefault();
    autoFilterOn = !autoFilterOn;
    console.log("Wah:", autoFilterOn ? "ON" : "OFF");
  }
}*/



// Runs every time a key comes up.
function keyUp(event) {
  if (event.key === "z")
    synth.triggerRelease(Tone.now());

 }

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop
  use(); // start the use loop

  // Put your event listener code here

  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
  //window.addEventListener("ArrowUp", changeSettings);
}

setup(); // Always remember to call setup()!
