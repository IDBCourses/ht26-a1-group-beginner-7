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

// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: which octave you're playing in, or whether a drone is on.

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
//const synth = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once

const reverb = new Tone.Reverb({
  decay: 6,
  wet: 0.4,
}).toDestination(); // reverb effect with decay value of 3 seconds.

const guitar = new Tone.PluckSynth().connect(reverb); //plays  notes and connects the reverb effect to them.

let reverbOn = true; //reverb is currently off

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

//controls Reverb
function reverbEffect(event, isPressed) { //aq8831
  //aq8831
  if (event.key === "Enter") {
    if (isPressed) {
      reverb.wet.rampTo(0.7, 0.3); //increases reverb to 70%
    } else {
      reverb.wet.rampTo(0.4, 0.3); //returns reverb to orginal/base value
    }
  }
}

// ---------- Controls (Event Handlers) ----------
// Runs every time a key goes down.
function keyDown(event) {
  Tone.start(); // browsers only allow sound after the player has pressed something

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
    }
  }
}

// Runs every time a key comes up.
function keyUp(event) {
  // Turn off reverb when shift is pressed

  console.log("Key up:", event.key);
  let time = Tone.now(); // the current time, in seconds

  // Example: replace this with your own instrument.
  if (event.key === "a") {
    guitar.triggerRelease(strings[0], time);
  } else if (event.key === "s") {
    guitar.triggerRelease(strings[1], time);
  } else if (event.key === "d") {
    guitar.triggerRelease(strings[2], time);
  } else if (event.key === "f") {
    guitar.triggerRelease(strings[3], time);
  } else if (event.key === "g") {
    guitar.triggerRelease(strings[4], time);
  } else if (event.key === "h") {
    guitar.triggerRelease(strings[5], time);
  }
}

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop
  use(); // start the use loop

  // Put your event listener code here
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);

  //---------- Reverb ---------- //aq8831

  //Increase reverb when Enter is pressed
  window.addEventListener("keydown", function (event) {
    reverbEffect(event, true);
  });

  //Return reverb to base value
  window.addEventListener("keyup", function (event) {
    reverbEffect(event, false);
  });
}

setup(); // Always remember to call setup()!
