"use strict";

/**
 * A Note represents a musical note, with no octave specified. For example, "C", "Eb", F#".
 * @param note Either a string representing a note, or a finite integer representing how many half-steps above or below C the note is.
 */
function Note(note) {
  
  const NAMES_SHARP = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];
  const NAMES_FLAT  = [ 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B' ];
  
  if(typeof note === 'string' && 1 <= note.length && note.length <= 2) {
    if(note.length === 1)
      note = note.toUpperCase();
    else if(note.length === 2)
      note = note.charAt(0).toUpperCase() + note.charAt(1).toLowerCase();
    
    var idx = NAMES_SHARP.indexOf(note);
    if(idx < 0)
      idx = NAMES_FLAT.indexOf(note);
    
    if(idx >= 0)
      this.id = idx;
  }
  else if(typeof note === 'number' && Number.isInteger(note)) {
    this.id = note % 12;
    if(this.id < 0)
      this.id += 12;
  }
  if(typeof this.id === 'undefined')
    throw new Error(`Invalid note: ${note}`);
  
  
  /**
   * Returns the name of this note.
   * @param asFlat if passed as boolean true, the name will prefer a flat (i.e. 'Bb' instead of 'A#'). Otherwise prefers sharps.
   */
  this.getName = function(asFlat) {
    if(asFlat)
      return NAMES_FLAT[this.id];
    return NAMES_SHARP[this.id];
  }
  
  this.toString = function() { return this.getName() };
  
  /**
   * Transposes this note by the given number of half-steps.
   */
  this.transpose = function(n) {
    if(n === 0)
      return this;
    return new Note(this.id+n);
  }
  
  /**
   * Returns if this is equal to that.
   */
  this.equals = function(that) {
    return (that instanceof Note && this.id == that.id);
  }
}

/**
 * A Pitch is a combination of a Note and an octave, i.e. "C2", "Eb4", "F#0"
 */
function Pitch(note, octave) {
  if(!(note instanceof Note))
    throw new Error(`Parameter 'note' is invalid: ${note}`);
  if(!Number.isInteger(octave) || octave < 0 || octave > 8)
    throw new Error(`Parameter 'octave' is invalid: ${octave}`);
  
  this.note = note;
  this.octave = octave;
  
  /**
   * Returns the name of this pitch.
   * @param asFlat if passed as boolean true, the name will prefer a flat (i.e. 'Bb3' instead of 'A#3'). Otherwise prefers sharps.
   */
  this.getName = function(asFlat) {
    return this.note.getName(asFlat) + octave;
  }
  
  this.toString = function() { return this.getName() };
  
  /**
   * Transposes this pitch by the given number of half-steps.
   */
  this.transpose = function(n) {
    if(n === 0)
      return this;
    return new Pitch(this.note.transpose(n), this.octave + Math.floor((this.note.id + n)/12));
  }
  
  /**
   * Returns if this is equal to that.
   */
  this.equals = function(that) {
    return (that instanceof Pitch && this.note.equals(that.note) && this.octave == that.octave);
  }
  
  /**
   * Compares this pitch to that. Returns: Negative value if this < that, 0 if this == that, positive value if this > that.
   */
  this.compare = function(that) {
    if(this.octave !== that.octave)
      return this.octave - that.octave;
    
    return this.note.id - that.note.id;
  }
}

function Chord(notes) {
  this.notes = [];
  notes.forEach(function(note) {
    if(!(note instanceof Note))
      throw new Error(`Invalid note: ${note}`);
    //check for duplicate note?  will indexof work?
    this.notes.push(note);
  });
  if(this.notes.length === 0)
    throw new Error("Chord cannot be empty");
  
  
  this.getNames = function(asFlat, verbose) {
    var names = [];
    this.notes.forEach(function(note) { names.push(this.getName(note, asFlat, verbose)); });
    return names;
  }
  
  this.toString = function() { return this.notes.toString() };
  
  this.getName = function(rootNote, asFlat, verbose) {
    //THIS IS WHERE THE MAGIC HAPPENS.
    //return struct like:
    //{
    //  name: 'C',
    //  notes: [
    //    {interval: 'R', note: C},
    //    {interval: '3', note: E},
    //    {interval: '5', note: G}
    //  ]
    //  verbose: [ 'assuming root is C', 'found a maj3 - this is a major chord', 'found 5th' ]
    //}
    //
    //another example:
    //{
    //  name: 'Cm7',
    //  notes: [
    //    {interval: 'R', note: C},
    //    {interval: 'm3', note: Eb},
    //    {interval: '5', note: G}
    //    {interval: 'm7', note: Bb}
    //  ]
    //  verbose: [ 'assuming root is C', 'found a min3 - this is a minor chord', 'found 5th', 'found minor 7th' ]
    //}
    
  }
  
}
