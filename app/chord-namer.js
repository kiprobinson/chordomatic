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
    
    //convert unicode sharp/flat back to ascii
    note = note.replace(/\u266F/, '#').replace(/\u266D/, 'b');
    
    let idx = NAMES_SHARP.indexOf(note);
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
   * @param options See standardizeOptions() for details on values for this parameter.
   */
  this.getName = function(options={}) {
    Chord.standardizeOptions(options);
    
    let name = (options.useFlats ? NAMES_FLAT[this.id] : NAMES_SHARP[this.id]);
    if(name.length > 1 && options.unicodeAccidentals)
      name = name.charAt(0) + (options.useFlats ? options.flatSymbol : options.sharpSymbol);
    
    return name;
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
  if(('string' === typeof note) && ('undefined' === typeof octave) && note.match(/^[a-g][b#]?\d/i)) {
    //string constructor
    octave = Number(note.substr(note.length - 1));
    note = new Note(note.substr(0, note.length - 1));
  }
  if(!(note instanceof Note))
    throw new Error(`Parameter 'note' is invalid: ${note}`);
  if(!Number.isInteger(octave) || octave < 0 || octave > 8)
    throw new Error(`Parameter 'octave' is invalid: ${octave}`);
  
  this.note = note;
  this.octave = octave;
  
  /**
   * Returns the name of this pitch.
   * @param options See standardizeOptions() for details on values for this parameter.
   */
  this.getName = function(options={}) {
    return this.note.getName(options) + octave;
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
  
  /**
   * Returns the interval from this pitch to that pitch, i.e. the number of half-steps to get from this pitch to that pitch.
   */
  this.interval = function(that) {
    return (that.octave * 12 + that.note.id) - (this.octave * 12 + this.note.id);
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
  this.getNames = function(options={}, rootNote, bassNote) {
    if(rootNote)
      return [this.getName(rootNote, options, bassNote)];
    
    var self = this;
    var names = this.notes.map((note) => self.getName(note, options, bassNote));
    names.sort((a,b)=>b.score-a.score);
    return names;
  }
  
  /**
   * Returns whether this chord contains the given note.
   */
  this.hasNote = function(note) {
    return (this.notes.findIndex(n => n.equals(note)) >= 0);
  }
  
  /** 
   * THIS IS WHERE THE MAGIC HAPPENS.
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
   *  
   *  See standardizeOptions() for details on values for options parameter.
   */
  this.getName = function(rootNote, options={}, bassNote) {
    Chord.standardizeOptions(options);
    
    let rootName = rootNote.getName(options);
    let quality = '';
    let intervalName = '';
    let altFifth = '';
    let added = '';
    let omissions = '';
    let bass = '';
    
    let verbose = [];
    let noteDetails = [];
    let score = 0;
    
    //if no bass note specified, assume the root note is bass note
    bassNote = bassNote || rootNote;
    
    //determine which intervals are present
    let intervals = new Array(12).fill(false);
    this.notes.forEach(note => intervals[rootNote.interval(note)] = true);
    
    //keep track of which notes have been "consumed"
    let consumed = new Array(12).fill(false);
    
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
    const SHARP_NINTH = MIN_THIRD;
    
    const BASS = rootNote.interval(bassNote);
    
    //names for intervals (although some could have different names, like 2 could also be 9 in some contexts)
    const INTERVAL_NAMES = [ 'R', `${options.flatSymbol}2`, '2', 'm3', '3', '4', `${options.flatSymbol}5`, '5', `${options.sharpSymbol}5`, '6', 'dom7', 'maj7' ];
    
    if(!intervals[ROOT]) {
      verbose.push('root is not present. pretending like it is.')
      intervals[ROOT] = true;
      score -= 20;
    }
    consumed[ROOT] = true;
    noteDetails.push({interval: 'R', note: rootNote});
    
    if(!intervals[BASS]) {
      verbose.push('bass note is not present. pretending like it is.');
      intervals[BASS] = true;
      //note: not consuming the bass note yet
      score -= 20;
    }
    
    if(!bassNote.equals(rootNote)) {
      verbose.push('bass note is *NOT* the root note.');
      bass = `/${bassNote.getName(options)}`;
      score -= 10;
    }
    
    let noteCount = intervals.reduce((acc,val) => acc + (val ? 1 : 0));
    
    if(noteCount == 1) {
      verbose.push('one-note "chord". name is just the root');
    }
    else if(noteCount == 2) {
      if(intervals[MIN_THIRD]) {
        verbose.push('two-note "chord": minor chord with missing fifth');
        quality = options.minorSymbol;
        consumed[MIN_THIRD] = true;
        noteDetails.push({interval: 'm3', note: rootNote.transpose(MIN_THIRD)});
        omissions += '(no5)';
        score += 18;
      }
      else if(intervals[MAJ_THIRD]) {
        verbose.push('two-note "chord": major chord with missing fifth');
        consumed[MAJ_THIRD] = true;
        noteDetails.push({interval: '3', note: rootNote.transpose(MAJ_THIRD)});
        omissions += '(no5)';
        score += 20;
      }
      else if(intervals[FLAT_FIFTH]) {
        verbose.push(`two-note "chord": ${options.dimSymbol}5`);
        consumed[FLAT_FIFTH] = true;
        noteDetails.push({interval: `${options.flatSymbol}5`, note: rootNote.transpose(FLAT_FIFTH)});
        quality = options.dimSymbol;
        intervalName = '5';
        score += 10;
      }
      else if(intervals[FIFTH]) {
        verbose.push('power chord: root and fifth');
        consumed[FIFTH] = true;
        noteDetails.push({interval: '5', note: rootNote.transpose(FIFTH)});
        intervalName = '5';
        score += 30;
      }
      else if(intervals[SHARP_FIFTH]) {
        verbose.push('two-note "chord": aug5');
        consumed[SHARP_FIFTH] = true;
        noteDetails.push({interval: `${options.sharpSymbol}5`, note: rootNote.transpose(SHARP_FIFTH)});
        quality = 'aug';
        intervalName = '5';
        score += 10;
      }
      else {
        //if it's not one of of the two-note chords with a special name, just use a name like "C~F".
        //This is non-standard, but tilde was the only symbol I could think of that didn't already have some other meaning.
        for(let i = 0; i < INTERVAL_NAMES.length; i++) {
          if(intervals[i] && !consumed[i]) {
            let otherNote = rootNote.transpose(i);
            verbose.push('found two-note "chord" with no recognized name. Using non-standard nomenclature "root~other"');
            noteDetails.push({interval: INTERVAL_NAMES[i], note: otherNote});
            consumed[i] = true;
            quality = `~${otherNote.getName(options)}`;
          }
        }
      }
    }
    else if(intervals[MAJ_THIRD]) {
      verbose.push('found major third. this is a major chord');
      noteDetails.push({interval: '3', note: rootNote.transpose(MAJ_THIRD)});
      consumed[MAJ_THIRD] = true;
      score += 30;
      let isAug = false;
      
      if(intervals[FIFTH]) {
        verbose.push('found fifth');
        noteDetails.push({interval: '5', note: rootNote.transpose(FIFTH)});
        consumed[FIFTH] = true;
        score += 10;
      }
      else {
        if(intervals[FLAT_FIFTH]) {
          verbose.push('found flat fifth.');
          noteDetails.push({interval: `${options.flatSymbol}5`, note: rootNote.transpose(FLAT_FIFTH)});
          consumed[FLAT_FIFTH] = true;
          score -= 3;
          altFifth = `(${options.flatSymbol}5)`;
        }
        else if(intervals[SHARP_FIFTH]) {
          verbose.push('found sharp fifth. this is augmented chord');
          noteDetails.push({interval: `${options.sharpSymbol}5`, note: rootNote.transpose(SHARP_FIFTH)});
          consumed[SHARP_FIFTH] = true;
          score -= 3;
          quality += 'aug';
          isAug = true;
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
          intervalName = (isAug ? '(maj9)' : 'maj9');
        }
        else if (intervals[SIXTH]) {
          verbose.push('6/9 chord - found sixth and ninth, but no seventh');
          noteDetails.push({interval: '6', note: rootNote.transpose(SIXTH)});
          consumed[SIXTH] = true;
          intervalName = '6/9';
        }
        else {
          verbose.push('add9 chord - ninth chord with missing seventh')
          added += (isAug ? '(add9)' : 'add9');
        }
      }
      else if(intervals[SHARP_NINTH] && !consumed[SHARP_NINTH]) {
        if(intervals[DOM_SEVENTH]) {
          verbose.push(`7(${options.sharpSymbol}9) chord - 7 chord plus sharp ninth`);
          noteDetails.push({interval: `${options.sharpSymbol}9`, note: rootNote.transpose(SHARP_NINTH)});
          intervalName = `7(${options.sharpSymbol}9)`;
          consumed[SHARP_NINTH] = true;
          score -= 9;
          intervalName = `7(${options.sharpSymbol}9)`;
        }
        else if(intervals[MAJ_SEVENTH]) {
          verbose.push(`maj7(${options.sharpSymbol}9) chord - maj7 chord plus sharp ninth`);
          noteDetails.push({interval: `${options.sharpSymbol}9`, note: rootNote.transpose(SHARP_NINTH)});
          intervalName = `maj7(${options.sharpSymbol}9)`;
          consumed[SHARP_NINTH] = true;
          score -= 9;
          intervalName = `maj7(${options.sharpSymbol}9)`;
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
          intervalName = (isAug ? '(maj11)' : 'maj11');
        }
        else {
          verbose.push('add11 chord - eleventh chord with missing seventh')
          added = (isAug ? '(add11)' : 'add11');
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
          intervalName = (isAug ? '(maj13)' : 'maj13');
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
      quality = options.minorSymbol;
      consumed[MIN_THIRD] = true;
      score += 28;
      let isDim = false;
      
      if(intervals[FIFTH]) {
        verbose.push('found fifth');
        noteDetails.push({interval: '5', note: rootNote.transpose(FIFTH)});
        consumed[FIFTH] = true;
        score += 10;
      }
      else {
        if(intervals[FLAT_FIFTH]) {
          verbose.push('found flat fifth. this is diminshed chord');
          noteDetails.push({interval: `${options.flatSymbol}5`, note: rootNote.transpose(FLAT_FIFTH)});
          consumed[FLAT_FIFTH] = true;
          score -= 3;
          quality = options.dimSymbol;
          isDim = true;
        }
        else if(intervals[SHARP_FIFTH]) {
          verbose.push('found sharp fifth.');
          noteDetails.push({interval: `${options.sharpSymbol}5`, note: rootNote.transpose(SHARP_FIFTH)});
          consumed[SHARP_FIFTH] = true;
          score -= 3;
          altFifth += `(${options.sharpSymbol}5)`;
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
        if(isDim) {
          if(options.halfDimSymbol) {
            verbose.push(`flat fifth and dominant seventh - using option to call it ${options.halfDimSymbol}`);
            quality = options.halfDimSymbol;
            intervalName = '';
          }
          else {
            verbose.push(`flat fifth and dominant seventh - this is called ${options.minorSymbol}7${options.flatSymbol}5, not ${options.dimSymbol}7`);
            quality = options.minorSymbol;
            altFifth = `(${options.flatSymbol}5)`;
          }
          
          isDim = false;
        }
      }
      else if(intervals[MAJ_SEVENTH]) {
        verbose.push('found major seventh');
        noteDetails.push({interval: 'maj7', note: rootNote.transpose(MAJ_SEVENTH)});
        consumed[MAJ_SEVENTH] = true;
        intervalName = '(maj7)';
        score -= 5;
      }
      else if(isDim && intervals[DOUBLE_FLAT_SEVENTH]) {
        verbose.push(`diminished chord with double-flat seventh - ${options.dimSymbol}7 chord`);
        noteDetails.push({interval: `${options.flatSymbol}${options.flatSymbol}7`, note: rootNote.transpose(SIXTH)});
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
          verbose.push(`${options.minorSymbol}9 chord - ${options.minorSymbol}7 chord plus ninth`);
          intervalName = '9';
        }
        else if(intervals[MAJ_SEVENTH]) {
          verbose.push(`${options.minorSymbol}(maj9) chord - ${options.minorSymbol}(maj7) chord plus ninth`);
          intervalName = '(maj9)';
        }
        else if(isDim && intervals[DOUBLE_FLAT_SEVENTH]) {
          verbose.push(`${options.dimSymbol}9 chord - ${options.dimSymbol}7 chord plus ninth`);
          intervalName = '9';
        }
        else if (intervals[SIXTH] && !isDim) {
          verbose.push(`${options.minorSymbol}6/9 chord - found sixth and ninth, but no seventh`);
          noteDetails.push({interval: '6', note: rootNote.transpose(SIXTH)});
          consumed[SIXTH] = true;
          intervalName = '6/9';
        }
        else {
          verbose.push(`${options.minorSymbol}(add9) chord - ninth chord with missing seventh`)
          added += '(add9)';
        }
      }
      
      if(intervals[ELEVENTH]) {
        verbose.push('found eleventh (fourth)');
        noteDetails.push({interval: '11', note: rootNote.transpose(ELEVENTH)});
        consumed[ELEVENTH] = true;
        score -= 7;
        if(intervals[DOM_SEVENTH]) {
          verbose.push(`${options.minorSymbol}11 chord - ${options.minorSymbol}7 chord plus eleventh`);
          intervalName = '11';
        }
        else if(intervals[MAJ_SEVENTH]) {
          verbose.push(`${options.minorSymbol}(maj11) chord - ${options.minorSymbol}(maj7) chord plus eleventh`);
          intervalName = '(maj11)';
        }
        else if(isDim && intervals[DOUBLE_FLAT_SEVENTH]) {
          verbose.push(`${options.dimSymbol}11 chord - ${options.dimSymbol}7 chord plus eleventh`);
          intervalName = '11';
        }
        else {
          verbose.push(`${options.minorSymbol}(add11) chord - eleventh chord with missing seventh`)
          added += '(add11)';
        }
      }
      
      if(intervals[THIRTEENTH] && (intervals[DOM_SEVENTH] || intervals[MAJ_SEVENTH])) {
        verbose.push('found thirteenth (sixth)');
        noteDetails.push({interval: '13', note: rootNote.transpose(THIRTEENTH)});
        consumed[THIRTEENTH] = true;
        score -= 8;
        if(intervals[DOM_SEVENTH]) {
          verbose.push(`${options.minorSymbol}13 chord - 7 chord plus thirteenth`);
          intervalName = '13';
        }
        else if(intervals[MAJ_SEVENTH]) {
          verbose.push(`${options.minorSymbol}(maj13) chord - maj7 chord plus thirteenth`);
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
        if(intervals[FLAT_FIFTH]) {
          verbose.push('found flat fifth');
          noteDetails.push({interval: `${options.flatSymbol}5`, note: rootNote.transpose(FLAT_FIFTH)});
          consumed[FLAT_FIFTH] = true;
          score -= 3;
          altFifth += `(${options.flatSymbol}5)`;
        }
        else if(intervals[SHARP_FIFTH]) {
          verbose.push('found sharp fifth');
          noteDetails.push({interval: `${options.sharpSymbol}5`, note: rootNote.transpose(SHARP_FIFTH)});
          consumed[SHARP_FIFTH] = true;
          score -= 3;
          altFifth += `(${options.sharpSymbol}5)`;
        }
        else {
          verbose.push('missing fifth');
          omissions += '(no5)';
          score -= 10;
        }
      }
      
      let isSus7 = false;
      if(intervals[DOM_SEVENTH] && !consumed[DOM_SEVENTH]) {
        verbose.push('7sus chord - found dominant seventh');
        noteDetails.push({interval: '7', note: rootNote.transpose(DOM_SEVENTH)});
        consumed[DOM_SEVENTH] = true;
        intervalName = '7';
        score -= 5;
        isSus7 = true;
      }
      else if(intervals[MAJ_SEVENTH] && !consumed[MAJ_SEVENTH]) {
        verbose.push('maj7sus chord - found major seventh');
        noteDetails.push({interval: 'maj7', note: rootNote.transpose(MAJ_SEVENTH)});
        consumed[MAJ_SEVENTH] = true;
        intervalName = 'maj7';
        score -= 5;
        isSus7 = true;
      }
      
      if(isSus7 && intervals[NINTH] && !consumed[NINTH]) {
        verbose.push('found ninth (second)');
        noteDetails.push({interval: '9', note: rootNote.transpose(NINTH)});
        consumed[NINTH] = true;
        score -= 6;
        if(intervals[DOM_SEVENTH]) {
          verbose.push('9sus chord - 7sus chord plus ninth');
          intervalName = '9';
        }
        else if(intervals[MAJ_SEVENTH]) {
          verbose.push('maj9sus chord - maj7sus chord plus ninth');
          intervalName = 'maj9';
        }
      }
      
      if(isSus7 && intervals[ELEVENTH] && !consumed[ELEVENTH]) {
        verbose.push('found eleventh (fourth)');
        noteDetails.push({interval: '11', note: rootNote.transpose(ELEVENTH)});
        consumed[ELEVENTH] = true;
        score -= 7;
        if(intervals[DOM_SEVENTH]) {
          verbose.push('11sus chord - 7sus chord plus eleventh');
          intervalName = '11';
        }
        else if(intervals[MAJ_SEVENTH]) {
          verbose.push('maj11sus chord - maj7sus chord plus eleventh');
          intervalName = 'maj11';
        }
      }
      
      if(isSus7 && intervals[THIRTEENTH] && !consumed[THIRTEENTH]) {
        verbose.push('found thirteenth (sixth)');
        noteDetails.push({interval: '13', note: rootNote.transpose(THIRTEENTH)});
        consumed[THIRTEENTH] = true;
        score -= 8;
        if(intervals[DOM_SEVENTH]) {
          verbose.push('13sus chord - 7sus chord plus thirteenth');
          intervalName = '13';
        }
        else if(intervals[MAJ_SEVENTH]) {
          verbose.push('maj13sus chord - maj7sus chord plus thirteenth');
          intervalName = 'maj13';
        }
      }
      
      if(intervals[SIXTH] && !consumed[SIXTH]) {
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
    for(let i = 1; i < INTERVAL_NAMES.length; i++) {
      if(intervals[i] && !consumed[i]) {
        let intervalName = INTERVAL_NAMES[i];
        verbose.push(`found ${intervalName} we have not used`);
        noteDetails.push({interval: intervalName, note: rootNote.transpose(i)});
        if(intervalName.match(/^[a-z]/))
          intervalName = `(${intervalName})`;
        added += `add${intervalName}`;
        score -= 10;
      }
    }
    
    if(intervalName === options.minorSymbol && options.omitMinor) {
      intervalName = '';
      rootName = rootName.toLowerCase();
    }
    
    //with sus chord, the interval name comes first (C6sus), otherwise quality comes first (Cm7)
    let qualityInterval = (quality.match(/^sus/) ? intervalName + quality : quality + intervalName);
    return {
      name: rootName + qualityInterval + altFifth + added + omissions + bass,
      notes: noteDetails,
      score: score,
      verbose: verbose
    };
  }
  
  
}

/**
 * Cleans up the options object, ensuring that it has a valid value for all options.
 * 
 * Valid options:
 *  useFlats:
 *    Boolean value. If true, notes with accidentals will be named using flat symbol instead of sharp.
 *    Default: false
 *  
 *  majorSymbol:
 *    Symbol to denote major chords. Also used in names like "maj7".
 *    Valid values: "maj", "M"
 *    Default: "maj"
 *  
 *  omitMajor:
 *    Boolean value. If true, major symbol is omitted where possible (i.e. "C" instead of "Cmaj"). It is
 *      still used in cass like "maj7" which is distinct from "7" chord.
 *    Default: true
 *  
 *  minorSymbol:
 *    Symbol to denote minor chords. Also used in names like "m7".
 *    Valid values: "min", "m", "-"
 *    Default: "m"
 *  
 *  omitMinor:
 *    Boolean value. If true, minor symbol is omitted where possible, using lower-case root note name instead
 *      (i.e. "c" instead of "Cm").
 *    Default: false
 *  
 *  augSymbol:
 *    Symbol to denote augmented chords.
 *    Valid values: "aug", "+"
 *    Default: "aug"
 *  
 *  dimSymbol:
 *    Symbol to denote diminished chords.
 *    Valid values: "dim", "o"
 *    Default: "dim"
 *  
 *  unicodeAccidentals:
 *    Boolean value. If true, accidentals will use true unicode values. If false, ascii "b" and "#" will
 *      be used instead. Properties "sharpSymbol" and "flatSymbol" will be set in the options struct.
 *    Default: false
 *  
 *  unicodeHalfDiminished:
 *    Boolean value. If true, unicode symbol for half-diminshed chord (\u00F8 - lower-case o with slash)
 *      will be used. Otherwise, a half-dimished chord is just called m7(b5). Property "halfDimSymbol"
 *      will be set in the options struct.
 *    Default: false
 *  
 */
Chord.standardizeOptions = function(options) {
  if('object' !== typeof options || options === null || options === undefined)
    options = {};
  
  if(options.useFlats !== true)
    options.useFlats = false;
  if(!(options.majorSymbol === 'maj' || options.majorSymbol === 'M'))
    options.majorSymbol = 'maj';
  if(options.omitMajor !== false)
    options.omitMajor = true;
  if(!(options.minorSymbol === 'min' || options.minorSymbol === 'm' || options.minorSymbol === '-'))
    options.minorSymbol = 'm';
  if(options.omitMinor !== true)
    options.omitMinor = false;
  if(!(options.augSymbol === 'aug' || options.augSymbol === '+'))
    options.augSymbol = 'aug';
  if(!(options.dimSymbol === 'dim' || options.dimSymbol === 'o' || options.dimSymbol === '\u1D52'))
    options.dimSymbol = 'dim';
  if(options.dimSymbol === 'o')
    options.dimSymbol = '\u1D52';
  if(options.unicodeAccidentals !== true)
    options.unicodeAccidentals = false;
  if(options.unicodeHalfDiminished !== true)
    options.unicodeHalfDiminished = false;
  
  options.sharpSymbol = options.unicodeAccidentals ? '\u266F' : '#';
  options.flatSymbol  = options.unicodeAccidentals ? '\u266D' : 'b';
  
  options.halfDimSymbol = options.unicodeHalfDiminished ? '\u00F8' : '';
}
