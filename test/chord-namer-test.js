"use strict";

Test.add('create note from string', function() {
  Test.assert('C', new Note('C').getName());
  Test.assert('C', new Note('c').getName());
  Test.assert('A#', new Note('A#').getName());
  Test.assert('A#', new Note('a#').getName());
  
  Test.assert('A#', new Note('BB').getName());
  Test.assert('A#', new Note('Bb').getName());
  Test.assert('A#', new Note('bB').getName());
  Test.assert('A#', new Note('bb').getName());
  
  Test.assert('G#', new Note('AB').getName());
  Test.assert('G#', new Note('Ab').getName());
  Test.assert('G#', new Note('aB').getName());
  Test.assert('G#', new Note('ab').getName());
  
  Test.assert('C#', new Note('db').getName());
  Test.assert('D',  new Note('d' ).getName());
  Test.assert('D#', new Note('eb').getName());
  Test.assert('E',  new Note('e' ).getName());
  Test.assert('F',  new Note('f' ).getName());
  Test.assert('F#', new Note('gb').getName());
  Test.assert('G',  new Note('g' ).getName());
  Test.assert('G#', new Note('ab').getName());
  Test.assert('A',  new Note('a' ).getName());
  Test.assert('A#', new Note('bb').getName());
  Test.assert('B',  new Note('b' ).getName());
  Test.assert('C#', new Note('c#').getName());
  Test.assert('D',  new Note('d' ).getName());
  Test.assert('D#', new Note('d#').getName());
  Test.assert('E',  new Note('e' ).getName());
  Test.assert('F',  new Note('f' ).getName());
  Test.assert('F#', new Note('f#').getName());
  Test.assert('G',  new Note('g' ).getName());
  Test.assert('G#', new Note('g#').getName());
  Test.assert('A',  new Note('a' ).getName());
  Test.assert('A#', new Note('a#').getName());
  Test.assert('B',  new Note('b' ).getName());
});


Test.add('get note names as flats', function() {
  Test.assert('Bb', new Note('A#').getName(true));
  Test.assert('A#', new Note('A#').getName(false));
  Test.assert('Bb', new Note('A#').getName(1));
  Test.assert('A#', new Note('A#').getName(0));
  
  Test.assert('Bb', new Note('BB').getName(true));
  Test.assert('Bb', new Note('Bb').getName(true));
  Test.assert('Bb', new Note('bB').getName(true));
  Test.assert('Bb', new Note('bb').getName(true));
  
  Test.assert('Ab', new Note('AB').getName(true));
  Test.assert('Ab', new Note('Ab').getName(true));
  Test.assert('Ab', new Note('aB').getName(true));
  Test.assert('Ab', new Note('ab').getName(true));
  
  Test.assert('Db', new Note('db').getName(true));
  Test.assert('D',  new Note('d' ).getName(true));
  Test.assert('Eb', new Note('eb').getName(true));
  Test.assert('E',  new Note('e' ).getName(true));
  Test.assert('F',  new Note('f' ).getName(true));
  Test.assert('Gb', new Note('gb').getName(true));
  Test.assert('G',  new Note('g' ).getName(true));
  Test.assert('Ab', new Note('ab').getName(true));
  Test.assert('A',  new Note('a' ).getName(true));
  Test.assert('Bb', new Note('bb').getName(true));
  Test.assert('B',  new Note('b' ).getName(true));
  Test.assert('Db', new Note('c#').getName(true));
  Test.assert('D',  new Note('d' ).getName(true));
  Test.assert('Eb', new Note('d#').getName(true));
  Test.assert('E',  new Note('e' ).getName(true));
  Test.assert('F',  new Note('f' ).getName(true));
  Test.assert('Gb', new Note('f#').getName(true));
  Test.assert('G',  new Note('g' ).getName(true));
  Test.assert('Ab', new Note('g#').getName(true));
  Test.assert('A',  new Note('a' ).getName(true));
  Test.assert('Bb', new Note('a#').getName(true));
  Test.assert('B',  new Note('b' ).getName(true));
});

Test.add('negative tests for creating notes', function() {
  Test.assertException(()=>new Note(''), 'make a note named ""');
  Test.assertException(()=>new Note(null), 'make a note named null');
  Test.assertException(()=>new Note('H'), 'make a note named "H"');
  Test.assertException(()=>new Note(0.5), 'make a note with id 0.5');
  
  //these are technically valid but I haven't implemented... maybe someday...
  Test.assertException(()=>new Note('Cb'), 'make a note named "Cb"');
  Test.assertException(()=>new Note('Bbb'), 'make a note named "Bbb"');
  Test.assertException(()=>new Note('B#'), 'make a note named "B#"');
  Test.assertException(()=>new Note('A##'), 'make a note named "A##"');
});

Test.add('create note by id', function() {
  Test.assert('C',  new Note(0).getName());
  Test.assert('C#', new Note(1).getName());
  Test.assert('D',  new Note(2).getName());
  Test.assert('D#', new Note(3).getName());
  Test.assert('E',  new Note(4).getName());
  Test.assert('F',  new Note(5).getName());
  Test.assert('F#', new Note(6).getName());
  Test.assert('G',  new Note(7).getName());
  Test.assert('G#', new Note(8).getName());
  Test.assert('A',  new Note(9).getName());
  Test.assert('A#', new Note(10).getName());
  Test.assert('B',  new Note(11).getName());
  
  //starts repeating above 11
  Test.assert('C', new Note(12).getName());
  Test.assert('C#', new Note(13).getName());
  Test.assert('B', new Note(23).getName());
  Test.assert('C', new Note(24).getName());
  
  //repeats in negatives too
  Test.assert('B', new Note(-1).getName());
  Test.assert('A#', new Note(-2).getName());
  Test.assert('C#', new Note(-11).getName());
  Test.assert('C', new Note(-12).getName());
  Test.assert('C#', new Note(-23).getName());
  Test.assert('B', new Note(-25).getName());
});

Test.add('get note id', function() {
  Test.assert(0, new Note(0).id);
  Test.assert(1, new Note(1).id);
  Test.assert(11,  new Note(11).id);
  
  //starts repeating above 11
  Test.assert(0, new Note(12).id);
  Test.assert(1, new Note(13).id);
  Test.assert(11, new Note(23).id);
  Test.assert(0, new Note(24).id);
  Test.assert(7, new Note(67).id);
  
  //repeats in negatives too
  Test.assert(11, new Note(-1).id);
  Test.assert(10, new Note(-2).id);
  Test.assert(1, new Note(-11).id);
  Test.assert(0, new Note(-12).id);
  Test.assert(11, new Note(-13).id);
  Test.assert(1, new Note(-23).id);
  Test.assert(11, new Note(-25).id);
  Test.assert(9, new Note(-63).id);
});

Test.add('transpose note', function() {
  Test.assert('E', new Note('C').transpose(4).getName());
  Test.assert('C', new Note('E').transpose(-4).getName());
  Test.assert('G', new Note('G').transpose(12).getName());
  Test.assert('G', new Note('G').transpose(-12).getName());
  Test.assert('C#', new Note('F#').transpose(7).getName());
  Test.assert('F#', new Note('C#').transpose(-7).getName());
});

Test.add('equals note', function() {
  Test.assertTrue(new Note('A').equals(new Note(9)));
  Test.assertTrue(new Note('G#').equals(new Note(20)));
  Test.assertTrue(new Note('Eb').equals(new Note(-21)));
  Test.assertTrue(new Note('Eb').equals(new Note('D#')));
  Test.assertFalse(new Note('Eb').equals(new Note('E')));
  Test.assertFalse(new Note('Db').equals(new Note('D#')));
});

Test.add('note interval', function() {
  Test.assert(0, new Note('C').interval(new Note('C')));
  Test.assert(1, new Note('C').interval(new Note('Db')));
  Test.assert(2, new Note('C').interval(new Note('D')));
  Test.assert(10, new Note('C').interval(new Note('Bb')));
  Test.assert(11, new Note('C').interval(new Note('B')));
  
  Test.assert(0, new Note('Ab').interval(new Note('Ab')));
  Test.assert(1, new Note('Ab').interval(new Note('A')));
  Test.assert(3, new Note('Ab').interval(new Note('B')));
  Test.assert(4, new Note('Ab').interval(new Note('C')));
  Test.assert(5, new Note('Ab').interval(new Note('Db')));
  Test.assert(10, new Note('Ab').interval(new Note('F#')));
  Test.assert(11, new Note('Ab').interval(new Note('G')));
});

//---------------------------------------------------------------

Test.add('create pitch', function() {
  Test.assert('C0', new Pitch(new Note('C'), 0).getName());
  Test.assert('B8', new Pitch(new Note('B'), 8).getName());
  Test.assert('G#5', new Pitch(new Note('G#'), 5).getName());
  Test.assert('F#3', new Pitch(new Note('Gb'), 3).getName());
});

Test.add('create pitch negative tests', function() {
  Test.assertException(()=>new Pitch(new Note('B'), -1), 'make a pitch with negative octave');
  Test.assertException(()=>new Pitch(new Note('C'), 9), 'make a pitch over octave 8');
  Test.assertException(()=>new Pitch(null, 4), 'make a pitch with null note');
  Test.assertException(()=>new Pitch(new Note('C'), null), 'make a pitch with null octave');
  Test.assertException(()=>new Pitch(new Note('C'), 2.5), 'make a pitch with non-integer octave');
});

Test.add('get pitch name as flats', function() {
  Test.assert('C0', new Pitch(new Note('C'), 0).getName(true));
  Test.assert('B8', new Pitch(new Note('B'), 8).getName(true));
  Test.assert('Ab3', new Pitch(new Note('G#'), 3).getName(true));
  Test.assert('Gb5', new Pitch(new Note('Gb'), 5).getName(true));
});

Test.add('transpose pitch', function() {
  Test.assert('D#4', new Pitch(new Note('C'), 4).transpose(3).getName());
  Test.assert('E5', new Pitch(new Note('Bb'), 4).transpose(6).getName());
  Test.assert('C1', new Pitch(new Note('B'), 0).transpose(1).getName());
  Test.assert('B0', new Pitch(new Note('C'), 1).transpose(-1).getName());
  
  Test.assert('A#4', new Pitch(new Note('Ab'), 3).transpose(14).getName());
  Test.assert('C#2', new Pitch(new Note('Eb'), 3).transpose(-14).getName());
  
  Test.assert('C0', new Pitch(new Note('C'), 0).transpose(0).getName());
  Test.assert('B8', new Pitch(new Note('B'), 8).transpose(0).getName());
  
  Test.assert('B8', new Pitch(new Note('C'), 0).transpose(107).getName());
  Test.assert('C0', new Pitch(new Note('B'), 8).transpose(-107).getName());
});

Test.add('transpose pitch negative tests', function() {
  Test.assertException(()=>new Pitch(new Note('B'), 8).transpose(1), 'Transpose B8 +1 half-step');
  Test.assertException(()=>new Pitch(new Note('C'), 0).transpose(-1), 'Transpose C0 -1 half-step');
  Test.assertException(()=>new Pitch(new Note('C'), 0).transpose(108), 'Transpose C0 to C9');
  Test.assertException(()=>new Pitch(new Note('B'), 8).transpose(-108), 'Transpose B8 to B-1');
});

Test.add('equals pitch', function() {
  Test.assertTrue(new Pitch(new Note('Db'), 4).equals(new Pitch(new Note('C#'), 4)));
  Test.assertFalse(new Pitch(new Note('C'), 4).equals(new Pitch(new Note('C'), 3)));
});

Test.add('compare pitches', function() {
  Test.assert(0, new Pitch(new Note('Db'), 4).compareTo(new Pitch(new Note('C#'), 4)));
  Test.assertGTZero(new Pitch(new Note('Db'), 4).compareTo(new Pitch(new Note('C'), 4)));
  Test.assertLTZero(new Pitch(new Note('Db'), 4).compareTo(new Pitch(new Note('D'), 4)));
  
  //compare within octave, max range
  Test.assertLTZero(new Pitch(new Note('C'), 4).compareTo(new Pitch(new Note('B'), 4)));
  Test.assertGTZero(new Pitch(new Note('B'), 4).compareTo(new Pitch(new Note('C'), 4)));
  
  //compare across octaves
  Test.assertLTZero(new Pitch(new Note('F#'), 2).compareTo(new Pitch(new Note('F#'), 3)));
  Test.assertGTZero(new Pitch(new Note('F#'), 7).compareTo(new Pitch(new Note('F#'), 6)));
  
  Test.assertGTZero(new Pitch(new Note('C'), 4).compareTo(new Pitch(new Note('B'), 3)));
  Test.assertLTZero(new Pitch(new Note('B'), 4).compareTo(new Pitch(new Note('C'), 5)));
});

//---------------------------------------------------------------

Test.add('get chord name - C', function() {
  //helper function to build a chord less tediously...
  var crd = function(noteList) {
    return new Chord(noteList.split(' ').map(s => new Note(s)));
  }
  var c = new Note('C');
  
  //single-note "chord"
  Test.assert('C', crd('C').getName(c).name);
  
  //two-note "chord"
  /*
  Test.assert('??', crd('C Db').getName(c).name);
  Test.assert('??', crd('C D').getName(c).name);
  */
  Test.assert('Cm(no5)', crd('C Eb').getName(c).name);
  Test.assert('C(no5)', crd('C E').getName(c).name);
  /*
  Test.assert('??', crd('C F').getName(c).name);
  Test.assert('??', crd('C Gb').getName(c).name);
  */
  Test.assert('C5', crd('C G').getName(c).name);
  /*
  Test.assert('??', crd('C Ab').getName(c).name);
  Test.assert('??', crd('C A').getName(c).name);
  Test.assert('??', crd('C Bb').getName(c).name);
  Test.assert('??', crd('C B').getName(c).name);
  */
  
  //major chord
  Test.assert('C', crd('C E G').getName(c).name);
  
  //minor chord
  Test.assert('Cm', crd('C Eb G').getName(c).name);
  
  Test.assert('Caug', crd('C E G#').getName(c).name);
  
  //sevenths
  Test.assert('C7', crd('C E G Bb').getName(c).name);
  Test.assert('Cm7', crd('C Eb G Bb').getName(c).name);
  Test.assert('Cmaj7', crd('C E G B').getName(c).name);
  Test.assert('Cm(maj7)', crd('C Eb G B').getName(c).name);
  Test.assert('Caug7', crd('C E G# Bb').getName(c).name);  //is this right?
  
  Test.assert('Cdim7', crd('C Eb Gb A').getName(c).name);
  Test.assert('Cm7(b5)', crd('C Eb Gb Bb').getName(c).name);
  Test.assert('Cdim(maj7)', crd('C Eb Gb B').getName(c).name);
  
  //suspended
  Test.assert('Csus2', crd('C D G').getName(c).name);
  Test.assert('Csus4', crd('C F G').getName(c).name);
  Test.assert('Csus2/4', crd('C D F G').getName(c).name);
  
  //ninths
  Test.assert('C9', crd('C E G Bb D').getName(c).name);
  Test.assert('Cmaj9', crd('C E G B D').getName(c).name);
  Test.assert('Cadd9', crd('C E G D').getName(c).name);
  Test.assert('Cm9', crd('C Eb G Bb D').getName(c).name);
  Test.assert('Cm(maj9)', crd('C Eb G B D').getName(c).name);
  Test.assert('Cm(add9)', crd('C Eb G D').getName(c).name);
  
  //is there a Cdim9? Caug9?
  
  //not sure about below!
  Test.assert('C11', crd('C E G Bb D F').getName(c).name);
  Test.assert('C13', crd('C E G Bb D F A').getName(c).name);
  
  Test.assert('C6', crd('C E G A').getName(c).name);
  Test.assert('Caug6', crd('C E G# A').getName(c).name);
  Test.assert('C6/9', crd('C E G A D').getName(c).name);
  Test.assert('C7/7', crd('C E G A Bb').getName(c).name);
  
  Test.assert('Cadd9', crd('C E G D').getName(c).name);
  Test.assert('Cadd11', crd('C E G F').getName(c).name);
  Test.assert('Cadd(m3)', crd('C Eb E G').getName(c).name);
  
  Test.assert('C7sus4', crd('C F G Bb').getName(c).name);
  Test.assert('C9sus4', crd('C F G Bb D').getName(c).name);
  
  //need more...
  
});

