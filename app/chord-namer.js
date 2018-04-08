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
  this.getName = function(asFlat=false) {
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
  
  /**
   * Returns the interval from this note to that note, as an integer from 0-11. Assumes this note is the root.
   * Another way of saying it: this is the number of half steps to get from this note to the next-highest that-note.
   */
  this.interval = function(that) {
    return that.id - this.id + (this.id > that.id ? 12 : 0);
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
  this.getName = function(asFlat=false) {
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
  this.compareTo = function(that) {
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
  });
  this.notes = notes;
  if(this.notes.length === 0)
    throw new Error("Chord cannot be empty");
  
  
  this.toString = function() { return this.notes.toString() };
  
  /**
   * Returns all possible names of this chord, by returning determining the name of the chord with each note as root note.
   */
  this.getNames = function(asFlat=false) {
    var self = this;
    var names = this.notes.map((note) => self.getName(note, asFlat));
    names.sort((a,b)=>b.score-a.score);
    return names;
  }
  
  
  /**
   * Returns whether this chord contains the given note.
   */
  this.hasNote = function(note) {
    return (this.notes.findIndex(n => n.equals(note)) >= 0);
  }
  
  /** THIS IS WHERE THE MAGIC HAPPENS.
   *  returns struct like:
   *  {
   *    name: 'C',
   *    notes: [
   *      {interval: 'R', note: C},
   *      {interval: '3', note: E},
   *      {interval: '5', note: G}
   *    ]
   *    verbose: [ 'assuming root is C', 'found a maj3 - this is a major chord', 'found 5th' ]
   *  }
   *  
   *  another example:
   *  {
   *    name: 'Cm7',
   *    notes: [
   *      {interval: 'R', note: C},
   *      {interval: 'm3', note: Eb},
   *      {interval: '5', note: G}
   *      {interval: 'm7', note: Bb}
   *    ]
   *    verbose: [ 'assuming root is C', 'found a min3 - this is a minor chord', 'found 5th', 'found minor 7th' ]
   *  }
   */
  this.getName = function(rootNote, asFlat=false) {
    
    var rootName = rootNote.getName(asFlat);
    var quality = '';
    var intervalName = '';
    var altFifth = '';
    var added = '';
    var omissions = '';
    var bass = '';
    
    var verbose = [];
    var noteDetails = [];
    var score = 0;
    
    //determine which intervals are present
    var intervals = new Array(12).fill(false);
    this.notes.forEach(note => intervals[rootNote.interval(note)] = true);
    
    //keep track of which notes have been "consumed"
    var consumed = new Array(12).fill(false);
    
    //interval ids
    const ROOT = 0;
    const FLAT_SECOND = 1;
    const SECOND = 2;
    const MIN_THIRD = 3;
    const MAJ_THIRD = 4;
    const FOURTH = 5;
    const FLAT_FIFTH = 6;
    const FIFTH = 7;
    const SHARP_FIFTH = 8;
    const SIXTH = 9;
    const DOM_SEVENTH = 10;
    const MAJ_SEVENTH = 11;
    
    //convenient aliases
    const NINTH = SECOND;
    const ELEVENTH = FOURTH;
    const THIRTEENTH = SIXTH;
    const DOUBLE_FLAT_SEVENTH = SIXTH;
    
    if(!intervals[ROOT]) {
      verbose.push('root is not present. pretending like it is.')
      intervals[ROOT] = true;
      consumed[ROOT] = true;
      score -= 20;
    }
    noteDetails.push({interval: 'R', note: rootNote});
    
    var noteCount = intervals.reduce((acc,val) => acc + (val ? 1 : 0));
    
    if(noteCount == 1) {
      verbose.push('one-note "chord". name is just the root');
    }
    else if(noteCount == 2 && intervals[FIFTH]) {
      verbose.push('only root and fifth. this is a power chord.');
      intervalName = '5';
      noteDetails.push({interval: '5', note: rootNote.transpose(FIFTH)});
      consumed[FIFTH] = true;
      score += 10;
    }
    else if(intervals[MAJ_THIRD]) {
      verbose.push('found major third. this is a major chord');
      noteDetails.push({interval: '3', note: rootNote.transpose(MAJ_THIRD)});
      consumed[MAJ_THIRD] = true;
      score += 30;
      
      if(intervals[FIFTH]) {
        verbose.push('found fifth');
        noteDetails.push({interval: '5', note: rootNote.transpose(FIFTH)});
        consumed[FIFTH] = true;
        score += 10;
      }
      else {
        if(intervals[FLAT_FIFTH]) {
          verbose.push('found flat fifth.');
          noteDetails.push({interval: 'b5', note: rootNote.transpose(FLAT_FIFTH)});
          consumed[FLAT_FIFTH] = true;
          score -= 3;
          altFifth = '(b5)';
        }
        else if(intervals[SHARP_FIFTH]) {
          verbose.push('found sharp fifth. this is augmented chord');
          noteDetails.push({interval: '#5', note: rootNote.transpose(SHARP_FIFTH)});
          consumed[SHARP_FIFTH] = true;
          score -= 3;
          quality += 'aug';
        }
        else {
          verbose.push('missing fifth');
          omissions += '(no5)';
          score -= 10;
        }
      }
      
      if(intervals[DOM_SEVENTH]) {
        verbose.push('found dominant seventh');
        noteDetails.push({interval: '7', note: rootNote.transpose(DOM_SEVENTH)});
        consumed[DOM_SEVENTH] = true;
        intervalName = '7';
        score -= 5;
      }
      else if(intervals[MAJ_SEVENTH]) {
        verbose.push('found major seventh');
        noteDetails.push({interval: 'maj7', note: rootNote.transpose(MAJ_SEVENTH)});
        consumed[MAJ_SEVENTH] = true;
        intervalName = (quality === '' ? 'maj7' : '(maj7)');
        score -= 5;
      }
      
      if(intervals[NINTH]) {
        verbose.push('found ninth (second)');
        noteDetails.push({interval: '9', note: rootNote.transpose(NINTH)});
        consumed[NINTH] = true;
        score -= 6;
        if(intervals[DOM_SEVENTH]) {
          verbose.push('9 chord - 7 chord plus ninth');
          intervalName = '9';
        }
        else if(intervals[MAJ_SEVENTH]) {
          verbose.push('maj9 chord - maj7 chord plus ninth');
          intervalName = 'maj9';
        }
        else if (intervals[SIXTH]) {
          verbose.push('6/9 chord - found sixth and ninth, but no seventh');
          consumed[SIXTH] = true;
          intervalName = '6/9';
        }
        else {
          verbose.push('add9 chord - ninth chord with missing seventh')
          added += 'add9';
        }
      }
      
      if(intervals[ELEVENTH]) {
        verbose.push('found eleventh (fourth)');
        noteDetails.push({interval: '11', note: rootNote.transpose(ELEVENTH)});
        consumed[ELEVENTH] = true;
        score -= 7;
        if(intervals[DOM_SEVENTH]) {
          verbose.push('11 chord - 7 chord plus eleventh');
          intervalName = '11';
        }
        else if(intervals[MAJ_SEVENTH]) {
          verbose.push('maj11 chord - maj7 chord plus eleventh');
          intervalName = 'maj11';
        }
        else {
          verbose.push('add11 chord - eleventh chord with missing seventh')
          added += 'add11';
        }
      }
      
      if(intervals[THIRTEENTH] && (intervals[DOM_SEVENTH] || intervals[MAJ_SEVENTH])) {
        verbose.push('found thirteenth (sixth)');
        noteDetails.push({interval: '13', note: rootNote.transpose(THIRTEENTH)});
        consumed[THIRTEENTH] = true;
        score -= 8;
        if(intervals[DOM_SEVENTH]) {
          verbose.push('13 chord - 7 chord plus thirteenth');
          intervalName = '13';
        }
        else if(intervals[MAJ_SEVENTH]) {
          verbose.push('maj13 chord - maj7 chord plus thirteenth');
          intervalName = 'maj13';
        }
        //note: no "add13" chord. if seventh is missing, this is just a "6" chord that will be handled later.
      }
      
      if(intervals[SIXTH] && !consumed[SIXTH]) {
        //we have a sixth that wasn't already identified as a thirteenth
        verbose.push('found sixth');
        noteDetails.push({interval: '6', note: rootNote.transpose(SIXTH)});
        consumed[SIXTH] = true;
        intervalName = '6';
        score -= 9;
      }
    }
    else if(intervals[MIN_THIRD]) {
      verbose.push('found minor third. this is a minor chord');
      noteDetails.push({interval: 'm3', note: rootNote.transpose(MIN_THIRD)});
      quality = 'm';
      consumed[MIN_THIRD] = true;
      score += 28;
      
      if(intervals[FIFTH]) {
        verbose.push('found fifth');
        noteDetails.push({interval: '5', note: rootNote.transpose(FIFTH)});
        consumed[FIFTH] = true;
        score += 10;
      }
      else {
        if(intervals[FLAT_FIFTH]) {
          verbose.push('found flat fifth. this is diminshed chord');
          noteDetails.push({interval: 'b5', note: rootNote.transpose(FLAT_FIFTH)});
          consumed[FLAT_FIFTH] = true;
          score -= 3;
          quality = 'dim';
        }
        else if(intervals[SHARP_FIFTH]) {
          verbose.push('found sharp fifth.');
          noteDetails.push({interval: '#5', note: rootNote.transpose(SHARP_FIFTH)});
          consumed[SHARP_FIFTH] = true;
          score -= 3;
          altFifth += '(#5)';
        }
        else {
          verbose.push('missing fifth');
          omissions += '(no5)';
          score -= 10;
        }
      }
      
      if(intervals[DOM_SEVENTH]) {
        verbose.push('found dominant seventh');
        noteDetails.push({interval: '7', note: rootNote.transpose(DOM_SEVENTH)});
        consumed[DOM_SEVENTH] = true;
        intervalName = '7';
        score -= 5;
        if(intervals[FLAT_FIFTH]) {
          verbose.push('flat fifth and dominant seventh - this is called m7b5, not dim7');
          quality = 'm';
          altFifth = '(b5)';
        }
      }
      else if(intervals[MAJ_SEVENTH]) {
        verbose.push('found major seventh');
        noteDetails.push({interval: 'maj7', note: rootNote.transpose(MAJ_SEVENTH)});
        consumed[MAJ_SEVENTH] = true;
        intervalName = '(maj7)';
        score -= 5;
      }
      else if(intervals[DOUBLE_FLAT_SEVENTH] && intervals[FLAT_FIFTH]) {
        verbose.push('flat fifth and double-flat seventh - dim7 chord');
        noteDetails.push({interval: 'bb7', note: rootNote.transpose(SIXTH)});
        consumed[SIXTH] = true;
        intervalName = '7';
        score -= 5;
      }
      
      if(intervals[NINTH]) {
        verbose.push('found ninth (second)');
        noteDetails.push({interval: '9', note: rootNote.transpose(NINTH)});
        consumed[NINTH] = true;
        score -= 6;
        if(intervals[DOM_SEVENTH]) {
          verbose.push('m9 chord - m7 chord plus ninth');
          intervalName = '9';
        }
        else if(intervals[MAJ_SEVENTH]) {
          verbose.push('m(maj9) chord - m(maj7) chord plus ninth');
          intervalName = '(maj9)';
        }
        else if (intervals[SIXTH]) {
          verbose.push('6/9 chord - found sixth and ninth, but no seventh');
          consumed[SIXTH] = true;
          intervalName = '6/9';
        }
        else {
          verbose.push('m(add9) chord - ninth chord with missing seventh')
          added += '(add9)';
        }
      }
      
      if(intervals[ELEVENTH]) {
        verbose.push('found eleventh (fourth)');
        noteDetails.push({interval: '11', note: rootNote.transpose(ELEVENTH)});
        consumed[ELEVENTH] = true;
        score -= 7;
        if(intervals[DOM_SEVENTH]) {
          verbose.push('m11 chord - m7 chord plus eleventh');
          intervalName = '11';
        }
        else if(intervals[MAJ_SEVENTH]) {
          verbose.push('m(maj11) chord - m(maj7) chord plus eleventh');
          intervalName = '(maj11)';
        }
        else {
          verbose.push('m(add11) chord - eleventh chord with missing seventh')
          added += '(add11)';
        }
      }
      
      if(intervals[THIRTEENTH] && (intervals[DOM_SEVENTH] || intervals[MAJ_SEVENTH])) {
        verbose.push('found thirteenth (sixth)');
        noteDetails.push({interval: '13', note: rootNote.transpose(THIRTEENTH)});
        consumed[THIRTEENTH] = true;
        score -= 8;
        if(intervals[DOM_SEVENTH]) {
          verbose.push('m13 chord - 7 chord plus thirteenth');
          intervalName = '13';
        }
        else if(intervals[MAJ_SEVENTH]) {
          verbose.push('m(maj13) chord - maj7 chord plus thirteenth');
          intervalName = '(maj13)';
        }
        //note: no "add13" chord. if seventh is missing, this is just a "6" chord that will be handled later.
      }
      
      if(intervals[SIXTH] && !consumed[SIXTH]) {
        //we have a sixth that wasn't already identified as a thirteenth
        verbose.push('found sixth');
        noteDetails.push({interval: '6', note: rootNote.transpose(SIXTH)});
        consumed[SIXTH] = true;
        intervalName = '6';
        score -= 9;
      }
    }
    else {
      verbose.push('found no third. this is a suspended chord');
      quality = 'sus';
      
      if(intervals[FIFTH]) {
        verbose.push('found fifth');
        noteDetails.push({interval: '5', note: rootNote.transpose(FIFTH)});
        consumed[FIFTH] = true;
        score += 10;
      }
      else {
        verbose.push('missing fifth');
        omissions += '(no5)';
        score -= 10;
      }
      
      if(intervals[SIXTH]) {
        verbose.push('found sixth - this is a 6sus chord');
        noteDetails.push({interval: '6', note: rootNote.transpose(SIXTH)});
        consumed[SIXTH] = true;
        intervalName = '6';
        score += 5;
        
        if(intervals[NINTH] && !consumed[NINTH]) {
          verbose.push('found ninth - this is a 6/9sus chord');
          noteDetails.push({interval: '9', note: rootNote.transpose(NINTH)});
          consumed[NINTH] = true;
          intervalName = '6/9';
          score -= 3;
        }
        else if(intervals[ELEVENTH] && !consumed[ELEVENTH]) {
          verbose.push('found eleventh - this is a 6/11sus chord');
          noteDetails.push({interval: '11', note: rootNote.transpose(ELEVENTH)});
          consumed[ELEVENTH] = true;
          intervalName = '6/11';
          score -= 4;
        }
      }
      
      
      if(intervals[SECOND] && intervals[FOURTH] && !consumed[SECOND] && !consumed[FOURTH]) {
        verbose.push('found second and fourth. this is a sus2/4');
        noteDetails.push({interval: '2', note: rootNote.transpose(SECOND)});
        noteDetails.push({interval: '4', note: rootNote.transpose(FOURTH)});
        consumed[SECOND] = true;
        consumed[FOURTH] = true;
        quality += '2/4';
        score += 5;
      }
      else if(intervals[SECOND] && !consumed[SECOND]) {
        verbose.push('found second. this is a sus2');
        noteDetails.push({interval: '2', note: rootNote.transpose(SECOND)});
        consumed[SECOND] = true;
        quality += '2';
        score += 10;
      }
      else if(intervals[FOURTH] && !consumed[FOURTH]) {
        verbose.push('found fourth. this is a sus4');
        noteDetails.push({interval: '4', note: rootNote.transpose(FOURTH)});
        consumed[FOURTH] = true;
        quality += '4';
        score += 10;
      }
    }
    
    //if there are any notes in the chord that we still have not used, handle them here as add(whatever)
    if(intervals[FLAT_SECOND] && !consumed[FLAT_SECOND]) {
      verbose.push('found a flat second we have not used');
      noteDetails.push({interval: 'b2', note: rootNote.transpose(FLAT_SECOND)});
      added += 'add(b2)';
      score -= 10;
    }
    if(intervals[SECOND] && !consumed[SECOND]) {
      verbose.push('found a second we have not used');
      noteDetails.push({interval: '2', note: rootNote.transpose(SECOND)});
      added += 'add2';
      score -= 10;
    }
    if(intervals[MIN_THIRD] && !consumed[MIN_THIRD]) {
      verbose.push('found a minor third we have not used');
      noteDetails.push({interval: 'm3', note: rootNote.transpose(MIN_THIRD)});
      added += 'add(m3)';
      score -= 10;
    }
    if(intervals[FOURTH] && !consumed[FOURTH]) {
      verbose.push('found a fourth we have not used');
      noteDetails.push({interval: '4', note: rootNote.transpose(FOURTH)});
      added += 'add4';
      score -= 10;
    }
    if(intervals[FLAT_FIFTH] && !consumed[FLAT_FIFTH]) {
      verbose.push('found a flat fifth we have not used');
      noteDetails.push({interval: 'b5', note: rootNote.transpose(FLAT_FIFTH)});
      added += 'add(b5)';
      score -= 10;
    }
    if(intervals[FIFTH] && !consumed[FIFTH]) {
      //probably shouldn't be able to get here i think?
      verbose.push('found a fifth we have not used');
      noteDetails.push({interval: '5', note: rootNote.transpose(FIFTH)});
      added += 'add5';
      score -= 10;
    }
    if(intervals[SHARP_FIFTH] && !consumed[SHARP_FIFTH]) {
      verbose.push('found a sharp fifth we have not used');
      noteDetails.push({interval: '#5', note: rootNote.transpose(SHARP_FIFTH)});
      added += 'add(#5)';
      score -= 10;
    }
    if(intervals[SIXTH] && !consumed[SIXTH]) {
      verbose.push('found a sixth we have not used');
      noteDetails.push({interval: '6', note: rootNote.transpose(SIXTH)});
      added += 'add6';
      score -= 10;
    }
    if(intervals[DOM_SEVENTH] && !consumed[DOM_SEVENTH]) {
      //probably shouldn't be able to get here i think?
      verbose.push('found a dominant seventh we have not used');
      noteDetails.push({interval: '7', note: rootNote.transpose(DOM_SEVENTH)});
      added += 'add(dom7)';
      score -= 10;
    }
    if(intervals[MAJ_SEVENTH] && !consumed[MAJ_SEVENTH]) {
      //probably shouldn't be able to get here i think?
      verbose.push('found a major seventh we have not used');
      noteDetails.push({interval: 'maj7', note: rootNote.transpose(MAJ_SEVENTH)});
      added += 'add(maj7)';
      score -= 10;
    }
    
    //with sus chord, the interval name comes first (C6sus), otherwise quality comes first (Cm7)
    var qualityInterval = (quality.match(/^sus/) ? intervalName + quality : quality + intervalName);
    return {
      name: rootName + qualityInterval + altFifth + added + omissions + bass,
      notes: noteDetails,
      score: score,
      verbose: verbose
    };
  }
  
}
