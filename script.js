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
const strings2 = ["C2", "D2", "E2", "G2", "A2", "C2"]; // changed notes of a guiter strings
const Chord = ["C1", "E1", "G1", "B1", "D1"];
let order = 0;
 
// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: which octave you're playing in, or whether a drone is on.

let reverbOn = false; //reverb is currently off 
let isBuzzy = true;

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
//const synth = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once

const reverb = new Tone.Reverb({decay: 3, wet: 0,}).toDestination(); // reverb effect with decay value of 3 seconds.
const guitar = new Tone.PluckSynth().connect(reverb); //plays  notes and connects the reverb effect to them.
const synth = new Tone.PolySynth().toDestination();
const distortion = new Tone.Distortion(0.8).toDestination();
const buzzy = new Tone.PolySynth().connect(distortion);



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
function pluckStrings(event) {
  Tone.start(); // browsers only allow sound after the player has pressed something

  //Turns on reverb if shift key is pressed
  if (event.key === "Enter") {
    reverbOn = true;
    reverb.wet.value = 0.5; //how much of the reverb effect is heard.
    return;
  }
  // Holding a key down sends keydown again and again. Only react to the first one.
  if (event.repeat === false) {
    console.log("Key down:", event.key);
  

    // Example: replace this with your own instrument.
    if (event.key === "a") {
      guitar.triggerAttack(strings[0], Tone.now()); // keeps sounding until triggerRelease
    } else if (event.key === "s") {
      guitar.triggerAttack(strings[1], Tone.now());
    } else if (event.key === "d") {
      guitar.triggerAttack(strings[2], Tone.now());
    } else if (event.key === "f") {
      guitar.triggerAttack(strings[3], Tone.now());
    } else if (event.key === "g") {
      guitar.triggerAttack(strings[4], Tone.now());
    } else if (event.key === "h") {
      guitar.triggerAttack(strings[5], Tone.now());

    } if (event.key === "A") { // at1575
      guitar.triggerAttack(strings2[0], Tone.now()); // keeps sounding until triggerRelease
    } else if (event.key === "S") {
      guitar.triggerAttack(strings2[1], Tone.now());
    } else if (event.key === "D") {
      guitar.triggerAttack(strings2[2], Tone.now());
    } else if (event.key === "F") {
      guitar.triggerAttack(strings2[3], Tone.now());
    } else if (event.key === "G") {
      guitar.triggerAttack(strings2[4], Tone.now());
    } else if (event.key === "H") {
      guitar.triggerAttack(strings2[5], Tone.now());
    }
  }
}
function changeNotes(event) { //at1575
 let duration = "8n";
if (event.key === "z" && isBuzzy) {
  console.log(order);
  synth.triggerAttackRelease(Chord[order], duration);
  order += 1;
  if (order > (Chord.length - 1)) {
    order = 0;
  }
 }
}



// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop
  use(); // start the use loop

  // Put your event listener code here
  window.addEventListener("keydown", pluckStrings);
  window.addEventListener("keydown", changeNotes);

}


setup(); // Always remember to call setup()!
