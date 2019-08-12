"use strict";

//shortcuts to make tests less tedious to write...
var c = new Note('C');
var crd = (noteList) => new Chord(noteList.split(' ').map(s => new Note(s)));


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
  Test.assert('Bb', new Note('A#').getName({useFlats:true}));
  Test.assert('A#', new Note('A#').getName({useFlats:false}));
  
  Test.assert('Bb', new Note('BB').getName({useFlats:true}));
  Test.assert('Bb', new Note('Bb').getName({useFlats:true}));
  Test.assert('Bb', new Note('bB').getName({useFlats:true}));
  Test.assert('Bb', new Note('bb').getName({useFlats:true}));
  
  Test.assert('Ab', new Note('AB').getName({useFlats:true}));
  Test.assert('Ab', new Note('Ab').getName({useFlats:true}));
  Test.assert('Ab', new Note('aB').getName({useFlats:true}));
  Test.assert('Ab', new Note('ab').getName({useFlats:true}));
  
  Test.assert('Db', new Note('db').getName({useFlats:true}));
  Test.assert('D',  new Note('d' ).getName({useFlats:true}));
  Test.assert('Eb', new Note('eb').getName({useFlats:true}));
  Test.assert('E',  new Note('e' ).getName({useFlats:true}));
  Test.assert('F',  new Note('f' ).getName({useFlats:true}));
  Test.assert('Gb', new Note('gb').getName({useFlats:true}));
  Test.assert('G',  new Note('g' ).getName({useFlats:true}));
  Test.assert('Ab', new Note('ab').getName({useFlats:true}));
  Test.assert('A',  new Note('a' ).getName({useFlats:true}));
  Test.assert('Bb', new Note('bb').getName({useFlats:true}));
  Test.assert('B',  new Note('b' ).getName({useFlats:true}));
  Test.assert('Db', new Note('c#').getName({useFlats:true}));
  Test.assert('D',  new Note('d' ).getName({useFlats:true}));
  Test.assert('Eb', new Note('d#').getName({useFlats:true}));
  Test.assert('E',  new Note('e' ).getName({useFlats:true}));
  Test.assert('F',  new Note('f' ).getName({useFlats:true}));
  Test.assert('Gb', new Note('f#').getName({useFlats:true}));
  Test.assert('G',  new Note('g' ).getName({useFlats:true}));
  Test.assert('Ab', new Note('g#').getName({useFlats:true}));
  Test.assert('A',  new Note('a' ).getName({useFlats:true}));
  Test.assert('Bb', new Note('a#').getName({useFlats:true}));
  Test.assert('B',  new Note('b' ).getName({useFlats:true}));
});

Test.add('create/name notes with unicode', function() {
  Test.assert('A#', new Note('B♭').getName());
  Test.assert('A#', new Note('b♭').getName());
  Test.assert('G#', new Note('A♭').getName());
  Test.assert('G#', new Note('a♭').getName());
  Test.assert('A#', new Note('A♯').getName());
  Test.assert('A#', new Note('a♯').getName());
  
  Test.assert('A♯', new Note('B♭').getName({useFlats:false, unicodeAccidentals: true}));
  Test.assert('A♯', new Note('b♭').getName({useFlats:false, unicodeAccidentals: true}));
  Test.assert('G♯', new Note('A♭').getName({useFlats:false, unicodeAccidentals: true}));
  Test.assert('G♯', new Note('a♭').getName({useFlats:false, unicodeAccidentals: true}));
  Test.assert('A♯', new Note('A♯').getName({useFlats:false, unicodeAccidentals: true}));
  Test.assert('A♯', new Note('a♯').getName({useFlats:false, unicodeAccidentals: true}));
  
  Test.assert('Bb', new Note('B♭').getName({useFlats:true}));
  Test.assert('Bb', new Note('b♭').getName({useFlats:true}));
  Test.assert('Ab', new Note('A♭').getName({useFlats:true}));
  Test.assert('Ab', new Note('a♭').getName({useFlats:true}));
  Test.assert('Bb', new Note('A♯').getName({useFlats:true}));
  Test.assert('Bb', new Note('a♯').getName({useFlats:true}));
  
  Test.assert('B♭', new Note('B♭').getName({useFlats:true, unicodeAccidentals: true}));
  Test.assert('B♭', new Note('b♭').getName({useFlats:true, unicodeAccidentals: true}));
  Test.assert('A♭', new Note('A♭').getName({useFlats:true, unicodeAccidentals: true}));
  Test.assert('A♭', new Note('a♭').getName({useFlats:true, unicodeAccidentals: true}));
  Test.assert('B♭', new Note('A♯').getName({useFlats:true, unicodeAccidentals: true}));
  Test.assert('B♭', new Note('a♯').getName({useFlats:true, unicodeAccidentals: true}));
  
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

Test.add('create pitch from string', function() {
  Test.assert('C0', new Pitch('C0').getName());
  Test.assert('B8', new Pitch('B8').getName());
  Test.assert('G#5', new Pitch('G#5').getName());
  Test.assert('F#3', new Pitch('Gb3').getName());
  Test.assert('B2', new Pitch('b2').getName());
  Test.assert('A#4', new Pitch('bB4').getName());
});

Test.add('create pitch negative tests', function() {
  Test.assertException(()=>new Pitch(new Note('B'), -1), 'make a pitch with negative octave');
  Test.assertException(()=>new Pitch(new Note('C'), 9), 'make a pitch over octave 8');
  Test.assertException(()=>new Pitch(null, 4), 'make a pitch with null note');
  Test.assertException(()=>new Pitch(new Note('C'), null), 'make a pitch with null octave');
  Test.assertException(()=>new Pitch(new Note('C'), 2.5), 'make a pitch with non-integer octave');
});

Test.add('get pitch name as flats', function() {
  Test.assert('C0', new Pitch(new Note('C'), 0).getName({useFlats:true}));
  Test.assert('B8', new Pitch(new Note('B'), 8).getName({useFlats:true}));
  Test.assert('Ab3', new Pitch(new Note('G#'), 3).getName({useFlats:true}));
  Test.assert('Gb5', new Pitch(new Note('Gb'), 5).getName({useFlats:true}));
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

Test.add('pitch interval', function() {
  Test.assert(0, new Pitch(new Note('Db'), 4).interval(new Pitch(new Note('C#'), 4)));
  Test.assert(-1, new Pitch(new Note('Db'), 4).interval(new Pitch(new Note('C'), 4)));
  Test.assert(1, new Pitch(new Note('Db'), 4).interval(new Pitch(new Note('D'), 4)));
  
  //compare within octave, max range
  Test.assert(11, new Pitch(new Note('C'), 4).interval(new Pitch(new Note('B'), 4)));
  Test.assert(-11, new Pitch(new Note('B'), 4).interval(new Pitch(new Note('C'), 4)));
  
  //compare across octaves
  Test.assert(12, new Pitch(new Note('F#'), 2).interval(new Pitch(new Note('F#'), 3)));
  Test.assert(-12, new Pitch(new Note('F#'), 7).interval(new Pitch(new Note('F#'), 6)));
  
  Test.assert(-1, new Pitch(new Note('C'), 4).interval(new Pitch(new Note('B'), 3)));
  Test.assert(1, new Pitch(new Note('B'), 4).interval(new Pitch(new Note('C'), 5)));
});

//---------------------------------------------------------------

Test.add('get chord name - single note "chord"', function() {
  Test.assert('C', crd('C').getName(c).name);
});

Test.add('get chord name - two-note "chords"', function() {
  Test.assert('C~C#', crd('C Db').getName(c).name);
  Test.assert('C~D', crd('C D').getName(c).name);
  Test.assert('Cm(no5)', crd('C Eb').getName(c).name);
  Test.assert('C(no5)', crd('C E').getName(c).name);
  Test.assert('C~F', crd('C F').getName(c).name);
  Test.assert('Cdim5', crd('C Gb').getName(c).name);
  Test.assert('C5', crd('C G').getName(c).name);
  Test.assert('Caug5', crd('C Ab').getName(c).name);
  Test.assert('C~A', crd('C A').getName(c).name);
  Test.assert('C~A#', crd('C Bb').getName(c).name);
  Test.assert('C~B', crd('C B').getName(c).name);
});

Test.add('get chord name - major/minor/aug/dim', function() {
  Test.assert('C', crd('C E G').getName(c).name);
  Test.assert('Cm', crd('C Eb G').getName(c).name);
  Test.assert('Caug', crd('C E G#').getName(c).name);
  Test.assert('Cdim', crd('C Eb Gb').getName(c).name);
  Test.assert('C(b5)', crd('C E Gb').getName(c).name);
  Test.assert('Cm(#5)', crd('C Eb G#').getName(c).name);
});

Test.add('get chord name - sevenths', function() {
  Test.assert('C7', crd('C E G Bb').getName(c).name);
  Test.assert('Cm7', crd('C Eb G Bb').getName(c).name);
  Test.assert('Cmaj7', crd('C E G B').getName(c).name);
  Test.assert('Cm(maj7)', crd('C Eb G B').getName(c).name);
  Test.assert('Caug7', crd('C E G# Bb').getName(c).name);
  Test.assert('Caug(maj7)', crd('C E G# B').getName(c).name);
  
  Test.assert('Cdim7', crd('C Eb Gb A').getName(c).name);
  Test.assert('Cm7(b5)', crd('C Eb Gb Bb').getName(c).name);
  Test.assert('Cdim(maj7)', crd('C Eb Gb B').getName(c).name);
});

Test.add('get chord name - ninths', function() {
  Test.assert('C9', crd('C E G Bb D').getName(c).name);
  Test.assert('Cmaj9', crd('C E G B D').getName(c).name);
  Test.assert('Cadd9', crd('C E G D').getName(c).name);
  Test.assert('Cm9', crd('C Eb G Bb D').getName(c).name);
  Test.assert('Cm(maj9)', crd('C Eb G B D').getName(c).name);
  Test.assert('Cm(add9)', crd('C Eb G D').getName(c).name);
  
  Test.assert('C7(#9)', crd('C E G Bb D#').getName(c).name);
  Test.assert('Cmaj7(#9)', crd('C E G B D#').getName(c).name);
  
  Test.assert('Cdim9', crd('C Eb Gb A D').getName(c).name);
  Test.assert('Cdim(add9)', crd('C Eb Gb D').getName(c).name);
  
  Test.assert('Caug6/9', crd('C E G# A D').getName(c).name);
  Test.assert('Caug9', crd('C E G# Bb D').getName(c).name);
  Test.assert('Caug(maj9)', crd('C E G# B D').getName(c).name);
  Test.assert('Caug(add9)', crd('C E G# D').getName(c).name);
});

Test.add('get chord name - elevenths', function() {
  //note- I treat 9th as optional in 11th chord
  Test.assert('C11', crd('C E G Bb D F').getName(c).name);
  Test.assert('C11', crd('C E G Bb F').getName(c).name);
  Test.assert('Cadd11', crd('C E G F').getName(c).name);
  Test.assert('Cmaj11', crd('C E G B D F').getName(c).name);
  Test.assert('Cmaj11', crd('C E G B F').getName(c).name);
  
  Test.assert('Cm11', crd('C Eb G Bb D F').getName(c).name);
  Test.assert('Cm11', crd('C Eb G Bb F').getName(c).name);
  Test.assert('Cm(add11)', crd('C Eb G F').getName(c).name);
  Test.assert('Cm(maj11)', crd('C Eb G B D F').getName(c).name);
  Test.assert('Cm(maj11)', crd('C Eb G B F').getName(c).name);
  
  Test.assert('Cdim11', crd('C Eb Gb A D F').getName(c).name);
  Test.assert('Cdim11', crd('C Eb Gb A F').getName(c).name);
  Test.assert('Cdim(add11)', crd('C Eb Gb F').getName(c).name);
  
  Test.assert('Caug11', crd('C E G# Bb D F').getName(c).name);
  Test.assert('Caug11', crd('C E G# Bb F').getName(c).name);
  Test.assert('Caug(add11)', crd('C E G# F').getName(c).name);
  Test.assert('Caug(maj11)', crd('C E G# B D F').getName(c).name);
  Test.assert('Caug(maj11)', crd('C E G# B F').getName(c).name);
});

Test.add('get chord name - thirteenths', function() {
  Test.assert('C13', crd('C E G Bb D F A').getName(c).name);
  Test.assert('C13', crd('C E G Bb D A').getName(c).name);
  Test.assert('C13', crd('C E G Bb F A').getName(c).name);
  Test.assert('C13', crd('C E G Bb A').getName(c).name);
  Test.assert('Cmaj13', crd('C E G B D F A').getName(c).name);
  Test.assert('Cmaj13', crd('C E G B D A').getName(c).name);
  Test.assert('Cmaj13', crd('C E G B F A').getName(c).name);
  Test.assert('Cmaj13', crd('C E G B A').getName(c).name);
  
  Test.assert('Cm13', crd('C Eb G Bb D F A').getName(c).name);
  Test.assert('Cm13', crd('C Eb G Bb D A').getName(c).name);
  Test.assert('Cm13', crd('C Eb G Bb F A').getName(c).name);
  Test.assert('Cm13', crd('C Eb G Bb A').getName(c).name);
  Test.assert('Cm(maj13)', crd('C Eb G B D F A').getName(c).name);
  Test.assert('Cm(maj13)', crd('C Eb G B D A').getName(c).name);
  Test.assert('Cm(maj13)', crd('C Eb G B F A').getName(c).name);
  Test.assert('Cm(maj13)', crd('C Eb G B A').getName(c).name);
  
  //no dim13 - 13th is same as 6th same as double-flat 7th (that creates dim chord)
  Test.assert('Caug13', crd('C E G# Bb D F A').getName(c).name);
  Test.assert('Caug13', crd('C E G# Bb D A').getName(c).name);
  Test.assert('Caug13', crd('C E G# Bb F A').getName(c).name);
  Test.assert('Caug13', crd('C E G# Bb A').getName(c).name);
  Test.assert('Caug(maj13)', crd('C E G# B D F A').getName(c).name);
  Test.assert('Caug(maj13)', crd('C E G# B D A').getName(c).name);
  Test.assert('Caug(maj13)', crd('C E G# B F A').getName(c).name);
  Test.assert('Caug(maj13)', crd('C E G# B A').getName(c).name);
});

Test.add('get chord name - sixths', function() {
  Test.assert('C6', crd('C E G A').getName(c).name);
  Test.assert('C6(no5)', crd('C E A').getName(c).name);
  Test.assert('C6(b5)', crd('C E Gb A').getName(c).name);
  Test.assert('Caug6', crd('C E G# A').getName(c).name);
  Test.assert('Cm6', crd('C Eb G A').getName(c).name);
  Test.assert('Cm6(no5)', crd('C Eb A').getName(c).name);
  Test.assert('Cm6(#5)', crd('C Eb G# A').getName(c).name);
  
  Test.assert('C6/9', crd('C E G A D').getName(c).name);
  Test.assert('Cm6/9', crd('C Eb G A D').getName(c).name);
});

Test.add('get chord name - suspended', function() {
  Test.assert('Csus2', crd('C D G').getName(c).name);
  Test.assert('Csus4', crd('C F G').getName(c).name);
  Test.assert('Csus2/4', crd('C D F G').getName(c).name);
});

Test.add('get chord name - suspended sixths', function() {
  Test.assert('C6sus', crd('C A G').getName(c).name);
  Test.assert('C6/9sus', crd('C A G D').getName(c).name);
  Test.assert('C6/11sus', crd('C A G F').getName(c).name);
  Test.assert('C6/9sus4', crd('C A G D F').getName(c).name);
  
  Test.assert('C6/9sus(no5)', crd('C A D').getName(c).name);
  Test.assert('C6/11sus(no5)', crd('C A F').getName(c).name);
  Test.assert('C6/9sus4(no5)', crd('C A D F').getName(c).name);
});

Test.add('get chord name - suspended sevenths', function() {
  Test.assert('C7sus', crd('C G Bb').getName(c).name);
  Test.assert('Cmaj7sus', crd('C G B').getName(c).name);
});

Test.add('get chord name - suspended ninths', function() {
  Test.assert('C9sus', crd('C G Bb D').getName(c).name);
  Test.assert('Cmaj9sus', crd('C G B D').getName(c).name);
});

Test.add('get chord name - suspended elevenths', function() {
  Test.assert('C11sus', crd('C G Bb D F').getName(c).name);
  Test.assert('C11sus', crd('C G Bb F').getName(c).name);
  Test.assert('Cmaj11sus', crd('C G B D F').getName(c).name);
  Test.assert('Cmaj11sus', crd('C G B F').getName(c).name);
});

Test.add('get chord name - suspended thirteenths', function() {
  Test.assert('C13sus', crd('C G Bb D F A').getName(c).name);
  Test.assert('C13sus', crd('C G Bb D A').getName(c).name);
  Test.assert('C13sus', crd('C G Bb F A').getName(c).name);
  Test.assert('C13sus', crd('C G Bb A').getName(c).name);
  Test.assert('Cmaj13sus', crd('C G B D F A').getName(c).name);
  Test.assert('Cmaj13sus', crd('C G B D A').getName(c).name);
  Test.assert('Cmaj13sus', crd('C G B F A').getName(c).name);
  Test.assert('Cmaj13sus', crd('C G B A').getName(c).name);
});

Test.add('get chord name - others', function() {
  //not sure about below!
  Test.assert('Cadd(m3)', crd('C Eb E G').getName(c).name); //is this right??
  
  Test.assert('C7add(maj7)', crd('C E G Bb B').getName(c).name); //this is C13. Maybe I meant C E G Bb B ?? Would that be C7add7?
  
  //need more...
});

Test.add('chord options', function() {
  //these tests all use F# as the root note, because it is the only major chord where all notes have accidentals,
  //making the test for different symbols easier
  let r = new Note('F#');
  
  //below test assertions generated by spreadsheet ChordNamerOptionsTestMatrix.ods
  let testMatrix = {
    "F#":[{o:{}, x:"F#"},{o:{useFlats:true}, x:"Gb"},{o:{majorSymbol:"M"}, x:"F#"},{o:{omitMajor:false}, x:"F#"},{o:{omitMinor:true}, x:"F#"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#"},{o:{unicodeAccidentals:true}, x:"F♯"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭"}],
    "F# G":[{o:{}, x:"F#~G"},{o:{useFlats:true}, x:"Gb~G"},{o:{majorSymbol:"M"}, x:"F#~G"},{o:{omitMajor:false}, x:"F#~G"},{o:{omitMinor:true}, x:"F#~G"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#~G"},{o:{unicodeAccidentals:true}, x:"F♯~G"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭~G"}],
    "F# G#":[{o:{}, x:"F#~G#"},{o:{useFlats:true}, x:"Gb~Ab"},{o:{majorSymbol:"M"}, x:"F#~G#"},{o:{omitMajor:false}, x:"F#~G#"},{o:{omitMinor:true}, x:"F#~G#"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#~G#"},{o:{unicodeAccidentals:true}, x:"F♯~G♯"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭~A♭"}],
    "F# A":[{o:{}, x:"F#m(no5)"},{o:{useFlats:true}, x:"Gbm(no5)"},{o:{majorSymbol:"M"}, x:"F#m(no5)"},{o:{omitMajor:false}, x:"F#m(no5)"},{o:{omitMinor:true}, x:"f#(no5)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-(no5)"},{o:{unicodeAccidentals:true}, x:"F♯m(no5)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m(no5)"}],
    "F# A#":[{o:{}, x:"F#(no5)"},{o:{useFlats:true}, x:"Gb(no5)"},{o:{majorSymbol:"M"}, x:"F#(no5)"},{o:{omitMajor:false}, x:"F#maj(no5)"},{o:{omitMinor:true}, x:"F#(no5)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#(no5)"},{o:{unicodeAccidentals:true}, x:"F♯(no5)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭(no5)"}],
    "F# B":[{o:{}, x:"F#~B"},{o:{useFlats:true}, x:"Gb~B"},{o:{majorSymbol:"M"}, x:"F#~B"},{o:{omitMajor:false}, x:"F#~B"},{o:{omitMinor:true}, x:"F#~B"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#~B"},{o:{unicodeAccidentals:true}, x:"F♯~B"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭~B"}],
    "F# C":[{o:{}, x:"F#dim5"},{o:{useFlats:true}, x:"Gbdim5"},{o:{majorSymbol:"M"}, x:"F#dim5"},{o:{omitMajor:false}, x:"F#dim5"},{o:{omitMinor:true}, x:"F#dim5"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#ᵒ5"},{o:{unicodeAccidentals:true}, x:"F♯dim5"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭dim5"}],
    "F# C#":[{o:{}, x:"F#5"},{o:{useFlats:true}, x:"Gb5"},{o:{majorSymbol:"M"}, x:"F#5"},{o:{omitMajor:false}, x:"F#5"},{o:{omitMinor:true}, x:"F#5"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#5"},{o:{unicodeAccidentals:true}, x:"F♯5"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭5"}],
    "F# D":[{o:{}, x:"F#aug5"},{o:{useFlats:true}, x:"Gbaug5"},{o:{majorSymbol:"M"}, x:"F#aug5"},{o:{omitMajor:false}, x:"F#aug5"},{o:{omitMinor:true}, x:"F#aug5"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+5"},{o:{unicodeAccidentals:true}, x:"F♯aug5"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug5"}],
    "F# D#":[{o:{}, x:"F#~D#"},{o:{useFlats:true}, x:"Gb~Eb"},{o:{majorSymbol:"M"}, x:"F#~D#"},{o:{omitMajor:false}, x:"F#~D#"},{o:{omitMinor:true}, x:"F#~D#"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#~D#"},{o:{unicodeAccidentals:true}, x:"F♯~D♯"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭~E♭"}],
    "F# E":[{o:{}, x:"F#~E"},{o:{useFlats:true}, x:"Gb~E"},{o:{majorSymbol:"M"}, x:"F#~E"},{o:{omitMajor:false}, x:"F#~E"},{o:{omitMinor:true}, x:"F#~E"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#~E"},{o:{unicodeAccidentals:true}, x:"F♯~E"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭~E"}],
    "F# F":[{o:{}, x:"F#~F"},{o:{useFlats:true}, x:"Gb~F"},{o:{majorSymbol:"M"}, x:"F#~F"},{o:{omitMajor:false}, x:"F#~F"},{o:{omitMinor:true}, x:"F#~F"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#~F"},{o:{unicodeAccidentals:true}, x:"F♯~F"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭~F"}],
    "F# A# C#":[{o:{}, x:"F#"},{o:{useFlats:true}, x:"Gb"},{o:{majorSymbol:"M"}, x:"F#"},{o:{omitMajor:false}, x:"F#maj"},{o:{omitMinor:true}, x:"F#"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#"},{o:{unicodeAccidentals:true}, x:"F♯"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭"}],
    "F# A C#":[{o:{}, x:"F#m"},{o:{useFlats:true}, x:"Gbm"},{o:{majorSymbol:"M"}, x:"F#m"},{o:{omitMajor:false}, x:"F#m"},{o:{omitMinor:true}, x:"f#"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-"},{o:{unicodeAccidentals:true}, x:"F♯m"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m"}],
    "F# A# D":[{o:{}, x:"F#aug"},{o:{useFlats:true}, x:"Gbaug"},{o:{majorSymbol:"M"}, x:"F#aug"},{o:{omitMajor:false}, x:"F#aug"},{o:{omitMinor:true}, x:"F#aug"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+"},{o:{unicodeAccidentals:true}, x:"F♯aug"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug"}],
    "F# A C":[{o:{}, x:"F#dim"},{o:{useFlats:true}, x:"Gbdim"},{o:{majorSymbol:"M"}, x:"F#dim"},{o:{omitMajor:false}, x:"F#dim"},{o:{omitMinor:true}, x:"F#dim"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#ᵒ"},{o:{unicodeAccidentals:true}, x:"F♯dim"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭dim"}],
    "F# A# C":[{o:{}, x:"F#(b5)"},{o:{useFlats:true}, x:"Gb(b5)"},{o:{majorSymbol:"M"}, x:"F#(b5)"},{o:{omitMajor:false}, x:"F#maj(b5)"},{o:{omitMinor:true}, x:"F#(b5)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#(b5)"},{o:{unicodeAccidentals:true}, x:"F♯(♭5)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭(♭5)"}],
    "F# A D":[{o:{}, x:"F#m(#5)"},{o:{useFlats:true}, x:"Gbm(#5)"},{o:{majorSymbol:"M"}, x:"F#m(#5)"},{o:{omitMajor:false}, x:"F#m(#5)"},{o:{omitMinor:true}, x:"f#(#5)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-(#5)"},{o:{unicodeAccidentals:true}, x:"F♯m(♯5)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m(♯5)"}],
    "F# A# C# E":[{o:{}, x:"F#7"},{o:{useFlats:true}, x:"Gb7"},{o:{majorSymbol:"M"}, x:"F#7"},{o:{omitMajor:false}, x:"F#7"},{o:{omitMinor:true}, x:"F#7"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#7"},{o:{unicodeAccidentals:true}, x:"F♯7"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭7"}],
    "F# A C# E":[{o:{}, x:"F#m7"},{o:{useFlats:true}, x:"Gbm7"},{o:{majorSymbol:"M"}, x:"F#m7"},{o:{omitMajor:false}, x:"F#m7"},{o:{omitMinor:true}, x:"f#7"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-7"},{o:{unicodeAccidentals:true}, x:"F♯m7"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m7"}],
    "F# A# C# F":[{o:{}, x:"F#maj7"},{o:{useFlats:true}, x:"Gbmaj7"},{o:{majorSymbol:"M"}, x:"F#M7"},{o:{omitMajor:false}, x:"F#maj7"},{o:{omitMinor:true}, x:"F#maj7"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj7"},{o:{unicodeAccidentals:true}, x:"F♯maj7"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj7"}],
    "F# A C# F":[{o:{}, x:"F#m(maj7)"},{o:{useFlats:true}, x:"Gbm(maj7)"},{o:{majorSymbol:"M"}, x:"F#m(M7)"},{o:{omitMajor:false}, x:"F#m(maj7)"},{o:{omitMinor:true}, x:"f#maj7"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-maj7"},{o:{unicodeAccidentals:true}, x:"F♯m(maj7)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m(maj7)"}],
    "F# A# D E":[{o:{}, x:"F#aug7"},{o:{useFlats:true}, x:"Gbaug7"},{o:{majorSymbol:"M"}, x:"F#aug7"},{o:{omitMajor:false}, x:"F#aug7"},{o:{omitMinor:true}, x:"F#aug7"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+7"},{o:{unicodeAccidentals:true}, x:"F♯aug7"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug7"}],
    "F# A# D F":[{o:{}, x:"F#aug(maj7)"},{o:{useFlats:true}, x:"Gbaug(maj7)"},{o:{majorSymbol:"M"}, x:"F#aug(M7)"},{o:{omitMajor:false}, x:"F#aug(maj7)"},{o:{omitMinor:true}, x:"F#aug(maj7)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+maj7"},{o:{unicodeAccidentals:true}, x:"F♯aug(maj7)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug(maj7)"}],
    "F# A C D#":[{o:{}, x:"F#dim7"},{o:{useFlats:true}, x:"Gbdim7"},{o:{majorSymbol:"M"}, x:"F#dim7"},{o:{omitMajor:false}, x:"F#dim7"},{o:{omitMinor:true}, x:"F#dim7"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#ᵒ7"},{o:{unicodeAccidentals:true}, x:"F♯dim7"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭dim7"}],
    "F# A C E":[{o:{}, x:"F#m7(b5)"},{o:{useFlats:true}, x:"Gbm7(b5)"},{o:{majorSymbol:"M"}, x:"F#m7(b5)"},{o:{omitMajor:false}, x:"F#m7(b5)"},{o:{omitMinor:true}, x:"f#7(b5)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#ø"},{o:{unicodeAccidentals:true}, x:"F♯m7(♭5)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m7(♭5)"}],
    "F# A C F":[{o:{}, x:"F#dim(maj7)"},{o:{useFlats:true}, x:"Gbdim(maj7)"},{o:{majorSymbol:"M"}, x:"F#dim(M7)"},{o:{omitMajor:false}, x:"F#dim(maj7)"},{o:{omitMinor:true}, x:"F#dim(maj7)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#ᵒmaj7"},{o:{unicodeAccidentals:true}, x:"F♯dim(maj7)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭dim(maj7)"}],
    "F# A# C# E G#":[{o:{}, x:"F#9"},{o:{useFlats:true}, x:"Gb9"},{o:{majorSymbol:"M"}, x:"F#9"},{o:{omitMajor:false}, x:"F#9"},{o:{omitMinor:true}, x:"F#9"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#9"},{o:{unicodeAccidentals:true}, x:"F♯9"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭9"}],
    "F# A# C# F G#":[{o:{}, x:"F#maj9"},{o:{useFlats:true}, x:"Gbmaj9"},{o:{majorSymbol:"M"}, x:"F#M9"},{o:{omitMajor:false}, x:"F#maj9"},{o:{omitMinor:true}, x:"F#maj9"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj9"},{o:{unicodeAccidentals:true}, x:"F♯maj9"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj9"}],
    "F# A# C# G#":[{o:{}, x:"F#add9"},{o:{useFlats:true}, x:"Gbadd9"},{o:{majorSymbol:"M"}, x:"F#add9"},{o:{omitMajor:false}, x:"F#add9"},{o:{omitMinor:true}, x:"F#add9"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#add9"},{o:{unicodeAccidentals:true}, x:"F♯add9"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭add9"}],
    "F# A C# E G#":[{o:{}, x:"F#m9"},{o:{useFlats:true}, x:"Gbm9"},{o:{majorSymbol:"M"}, x:"F#m9"},{o:{omitMajor:false}, x:"F#m9"},{o:{omitMinor:true}, x:"f#9"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-9"},{o:{unicodeAccidentals:true}, x:"F♯m9"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m9"}],
    "F# A C# F G#":[{o:{}, x:"F#m(maj9)"},{o:{useFlats:true}, x:"Gbm(maj9)"},{o:{majorSymbol:"M"}, x:"F#m(M9)"},{o:{omitMajor:false}, x:"F#m(maj9)"},{o:{omitMinor:true}, x:"f#maj9"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-maj9"},{o:{unicodeAccidentals:true}, x:"F♯m(maj9)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m(maj9)"}],
    "F# A C# G#":[{o:{}, x:"F#m(add9)"},{o:{useFlats:true}, x:"Gbm(add9)"},{o:{majorSymbol:"M"}, x:"F#m(add9)"},{o:{omitMajor:false}, x:"F#m(add9)"},{o:{omitMinor:true}, x:"f#add9"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-add9"},{o:{unicodeAccidentals:true}, x:"F♯m(add9)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m(add9)"}],
    "F# A# C# E A":[{o:{}, x:"F#7(#9)"},{o:{useFlats:true}, x:"Gb7(#9)"},{o:{majorSymbol:"M"}, x:"F#7(#9)"},{o:{omitMajor:false}, x:"F#7(#9)"},{o:{omitMinor:true}, x:"F#7(#9)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#7(#9)"},{o:{unicodeAccidentals:true}, x:"F♯7(♯9)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭7(♯9)"}],
    "F# A# C# F A":[{o:{}, x:"F#maj7(#9)"},{o:{useFlats:true}, x:"Gbmaj7(#9)"},{o:{majorSymbol:"M"}, x:"F#M7(#9)"},{o:{omitMajor:false}, x:"F#maj7(#9)"},{o:{omitMinor:true}, x:"F#maj7(#9)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj7(#9)"},{o:{unicodeAccidentals:true}, x:"F♯maj7(♯9)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj7(♯9)"}],
    "F# A C D# G#":[{o:{}, x:"F#dim9"},{o:{useFlats:true}, x:"Gbdim9"},{o:{majorSymbol:"M"}, x:"F#dim9"},{o:{omitMajor:false}, x:"F#dim9"},{o:{omitMinor:true}, x:"F#dim9"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#ᵒ9"},{o:{unicodeAccidentals:true}, x:"F♯dim9"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭dim9"}],
    "F# A C G#":[{o:{}, x:"F#dim(add9)"},{o:{useFlats:true}, x:"Gbdim(add9)"},{o:{majorSymbol:"M"}, x:"F#dim(add9)"},{o:{omitMajor:false}, x:"F#dim(add9)"},{o:{omitMinor:true}, x:"F#dim(add9)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#ᵒadd9"},{o:{unicodeAccidentals:true}, x:"F♯dim(add9)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭dim(add9)"}],
    "F# A# D D# G#":[{o:{}, x:"F#aug6/9"},{o:{useFlats:true}, x:"Gbaug6/9"},{o:{majorSymbol:"M"}, x:"F#aug6/9"},{o:{omitMajor:false}, x:"F#aug6/9"},{o:{omitMinor:true}, x:"F#aug6/9"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+6/9"},{o:{unicodeAccidentals:true}, x:"F♯aug6/9"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug6/9"}],
    "F# A# D E G#":[{o:{}, x:"F#aug9"},{o:{useFlats:true}, x:"Gbaug9"},{o:{majorSymbol:"M"}, x:"F#aug9"},{o:{omitMajor:false}, x:"F#aug9"},{o:{omitMinor:true}, x:"F#aug9"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+9"},{o:{unicodeAccidentals:true}, x:"F♯aug9"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug9"}],
    "F# A# D F G#":[{o:{}, x:"F#aug(maj9)"},{o:{useFlats:true}, x:"Gbaug(maj9)"},{o:{majorSymbol:"M"}, x:"F#aug(M9)"},{o:{omitMajor:false}, x:"F#aug(maj9)"},{o:{omitMinor:true}, x:"F#aug(maj9)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+maj9"},{o:{unicodeAccidentals:true}, x:"F♯aug(maj9)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug(maj9)"}],
    "F# A# D G#":[{o:{}, x:"F#aug(add9)"},{o:{useFlats:true}, x:"Gbaug(add9)"},{o:{majorSymbol:"M"}, x:"F#aug(add9)"},{o:{omitMajor:false}, x:"F#aug(add9)"},{o:{omitMinor:true}, x:"F#aug(add9)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+add9"},{o:{unicodeAccidentals:true}, x:"F♯aug(add9)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug(add9)"}],
    "F# A# C# E G# B":[{o:{}, x:"F#11"},{o:{useFlats:true}, x:"Gb11"},{o:{majorSymbol:"M"}, x:"F#11"},{o:{omitMajor:false}, x:"F#11"},{o:{omitMinor:true}, x:"F#11"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#11"},{o:{unicodeAccidentals:true}, x:"F♯11"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭11"}],
    "F# A# C# E B":[{o:{}, x:"F#11"},{o:{useFlats:true}, x:"Gb11"},{o:{majorSymbol:"M"}, x:"F#11"},{o:{omitMajor:false}, x:"F#11"},{o:{omitMinor:true}, x:"F#11"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#11"},{o:{unicodeAccidentals:true}, x:"F♯11"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭11"}],
    "F# A# C# B":[{o:{}, x:"F#add11"},{o:{useFlats:true}, x:"Gbadd11"},{o:{majorSymbol:"M"}, x:"F#add11"},{o:{omitMajor:false}, x:"F#add11"},{o:{omitMinor:true}, x:"F#add11"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#add11"},{o:{unicodeAccidentals:true}, x:"F♯add11"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭add11"}],
    "F# A# C# F G# B":[{o:{}, x:"F#maj11"},{o:{useFlats:true}, x:"Gbmaj11"},{o:{majorSymbol:"M"}, x:"F#M11"},{o:{omitMajor:false}, x:"F#maj11"},{o:{omitMinor:true}, x:"F#maj11"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj11"},{o:{unicodeAccidentals:true}, x:"F♯maj11"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj11"}],
    "F# A# C# F B":[{o:{}, x:"F#maj11"},{o:{useFlats:true}, x:"Gbmaj11"},{o:{majorSymbol:"M"}, x:"F#M11"},{o:{omitMajor:false}, x:"F#maj11"},{o:{omitMinor:true}, x:"F#maj11"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj11"},{o:{unicodeAccidentals:true}, x:"F♯maj11"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj11"}],
    "F# A C# E G# B":[{o:{}, x:"F#m11"},{o:{useFlats:true}, x:"Gbm11"},{o:{majorSymbol:"M"}, x:"F#m11"},{o:{omitMajor:false}, x:"F#m11"},{o:{omitMinor:true}, x:"f#11"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-11"},{o:{unicodeAccidentals:true}, x:"F♯m11"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m11"}],
    "F# A C# E B":[{o:{}, x:"F#m11"},{o:{useFlats:true}, x:"Gbm11"},{o:{majorSymbol:"M"}, x:"F#m11"},{o:{omitMajor:false}, x:"F#m11"},{o:{omitMinor:true}, x:"f#11"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-11"},{o:{unicodeAccidentals:true}, x:"F♯m11"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m11"}],
    "F# A C# B":[{o:{}, x:"F#m(add11)"},{o:{useFlats:true}, x:"Gbm(add11)"},{o:{majorSymbol:"M"}, x:"F#m(add11)"},{o:{omitMajor:false}, x:"F#m(add11)"},{o:{omitMinor:true}, x:"f#add11"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-add11"},{o:{unicodeAccidentals:true}, x:"F♯m(add11)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m(add11)"}],
    "F# A C# F G# B":[{o:{}, x:"F#m(maj11)"},{o:{useFlats:true}, x:"Gbm(maj11)"},{o:{majorSymbol:"M"}, x:"F#m(M11)"},{o:{omitMajor:false}, x:"F#m(maj11)"},{o:{omitMinor:true}, x:"f#maj11"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-maj11"},{o:{unicodeAccidentals:true}, x:"F♯m(maj11)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m(maj11)"}],
    "F# A C# F B":[{o:{}, x:"F#m(maj11)"},{o:{useFlats:true}, x:"Gbm(maj11)"},{o:{majorSymbol:"M"}, x:"F#m(M11)"},{o:{omitMajor:false}, x:"F#m(maj11)"},{o:{omitMinor:true}, x:"f#maj11"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-maj11"},{o:{unicodeAccidentals:true}, x:"F♯m(maj11)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m(maj11)"}],
    "F# A C D# G# B":[{o:{}, x:"F#dim11"},{o:{useFlats:true}, x:"Gbdim11"},{o:{majorSymbol:"M"}, x:"F#dim11"},{o:{omitMajor:false}, x:"F#dim11"},{o:{omitMinor:true}, x:"F#dim11"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#ᵒ11"},{o:{unicodeAccidentals:true}, x:"F♯dim11"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭dim11"}],
    "F# A C D# B":[{o:{}, x:"F#dim11"},{o:{useFlats:true}, x:"Gbdim11"},{o:{majorSymbol:"M"}, x:"F#dim11"},{o:{omitMajor:false}, x:"F#dim11"},{o:{omitMinor:true}, x:"F#dim11"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#ᵒ11"},{o:{unicodeAccidentals:true}, x:"F♯dim11"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭dim11"}],
    "F# A C B":[{o:{}, x:"F#dim(add11)"},{o:{useFlats:true}, x:"Gbdim(add11)"},{o:{majorSymbol:"M"}, x:"F#dim(add11)"},{o:{omitMajor:false}, x:"F#dim(add11)"},{o:{omitMinor:true}, x:"F#dim(add11)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#ᵒadd11"},{o:{unicodeAccidentals:true}, x:"F♯dim(add11)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭dim(add11)"}],
    "F# A# D E G# B":[{o:{}, x:"F#aug11"},{o:{useFlats:true}, x:"Gbaug11"},{o:{majorSymbol:"M"}, x:"F#aug11"},{o:{omitMajor:false}, x:"F#aug11"},{o:{omitMinor:true}, x:"F#aug11"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+11"},{o:{unicodeAccidentals:true}, x:"F♯aug11"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug11"}],
    "F# A# D E B":[{o:{}, x:"F#aug11"},{o:{useFlats:true}, x:"Gbaug11"},{o:{majorSymbol:"M"}, x:"F#aug11"},{o:{omitMajor:false}, x:"F#aug11"},{o:{omitMinor:true}, x:"F#aug11"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+11"},{o:{unicodeAccidentals:true}, x:"F♯aug11"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug11"}],
    "F# A# D B":[{o:{}, x:"F#aug(add11)"},{o:{useFlats:true}, x:"Gbaug(add11)"},{o:{majorSymbol:"M"}, x:"F#aug(add11)"},{o:{omitMajor:false}, x:"F#aug(add11)"},{o:{omitMinor:true}, x:"F#aug(add11)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+add11"},{o:{unicodeAccidentals:true}, x:"F♯aug(add11)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug(add11)"}],
    "F# A# D F G# B":[{o:{}, x:"F#aug(maj11)"},{o:{useFlats:true}, x:"Gbaug(maj11)"},{o:{majorSymbol:"M"}, x:"F#aug(M11)"},{o:{omitMajor:false}, x:"F#aug(maj11)"},{o:{omitMinor:true}, x:"F#aug(maj11)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+maj11"},{o:{unicodeAccidentals:true}, x:"F♯aug(maj11)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug(maj11)"}],
    "F# A# D F B":[{o:{}, x:"F#aug(maj11)"},{o:{useFlats:true}, x:"Gbaug(maj11)"},{o:{majorSymbol:"M"}, x:"F#aug(M11)"},{o:{omitMajor:false}, x:"F#aug(maj11)"},{o:{omitMinor:true}, x:"F#aug(maj11)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+maj11"},{o:{unicodeAccidentals:true}, x:"F♯aug(maj11)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug(maj11)"}],
    "F# A# C# E G# B D#":[{o:{}, x:"F#13"},{o:{useFlats:true}, x:"Gb13"},{o:{majorSymbol:"M"}, x:"F#13"},{o:{omitMajor:false}, x:"F#13"},{o:{omitMinor:true}, x:"F#13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#13"},{o:{unicodeAccidentals:true}, x:"F♯13"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭13"}],
    "F# A# C# E G# D#":[{o:{}, x:"F#13"},{o:{useFlats:true}, x:"Gb13"},{o:{majorSymbol:"M"}, x:"F#13"},{o:{omitMajor:false}, x:"F#13"},{o:{omitMinor:true}, x:"F#13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#13"},{o:{unicodeAccidentals:true}, x:"F♯13"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭13"}],
    "F# A# C# E B D#":[{o:{}, x:"F#13"},{o:{useFlats:true}, x:"Gb13"},{o:{majorSymbol:"M"}, x:"F#13"},{o:{omitMajor:false}, x:"F#13"},{o:{omitMinor:true}, x:"F#13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#13"},{o:{unicodeAccidentals:true}, x:"F♯13"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭13"}],
    "F# A# C# E D#":[{o:{}, x:"F#13"},{o:{useFlats:true}, x:"Gb13"},{o:{majorSymbol:"M"}, x:"F#13"},{o:{omitMajor:false}, x:"F#13"},{o:{omitMinor:true}, x:"F#13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#13"},{o:{unicodeAccidentals:true}, x:"F♯13"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭13"}],
    "F# A# C# F G# B D#":[{o:{}, x:"F#maj13"},{o:{useFlats:true}, x:"Gbmaj13"},{o:{majorSymbol:"M"}, x:"F#M13"},{o:{omitMajor:false}, x:"F#maj13"},{o:{omitMinor:true}, x:"F#maj13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj13"},{o:{unicodeAccidentals:true}, x:"F♯maj13"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj13"}],
    "F# A# C# F G# D#":[{o:{}, x:"F#maj13"},{o:{useFlats:true}, x:"Gbmaj13"},{o:{majorSymbol:"M"}, x:"F#M13"},{o:{omitMajor:false}, x:"F#maj13"},{o:{omitMinor:true}, x:"F#maj13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj13"},{o:{unicodeAccidentals:true}, x:"F♯maj13"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj13"}],
    "F# A# C# F B D#":[{o:{}, x:"F#maj13"},{o:{useFlats:true}, x:"Gbmaj13"},{o:{majorSymbol:"M"}, x:"F#M13"},{o:{omitMajor:false}, x:"F#maj13"},{o:{omitMinor:true}, x:"F#maj13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj13"},{o:{unicodeAccidentals:true}, x:"F♯maj13"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj13"}],
    "F# A# C# F D#":[{o:{}, x:"F#maj13"},{o:{useFlats:true}, x:"Gbmaj13"},{o:{majorSymbol:"M"}, x:"F#M13"},{o:{omitMajor:false}, x:"F#maj13"},{o:{omitMinor:true}, x:"F#maj13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj13"},{o:{unicodeAccidentals:true}, x:"F♯maj13"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj13"}],
    "F# A C# E G# B D#":[{o:{}, x:"F#m13"},{o:{useFlats:true}, x:"Gbm13"},{o:{majorSymbol:"M"}, x:"F#m13"},{o:{omitMajor:false}, x:"F#m13"},{o:{omitMinor:true}, x:"f#13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-13"},{o:{unicodeAccidentals:true}, x:"F♯m13"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m13"}],
    "F# A C# E G# D#":[{o:{}, x:"F#m13"},{o:{useFlats:true}, x:"Gbm13"},{o:{majorSymbol:"M"}, x:"F#m13"},{o:{omitMajor:false}, x:"F#m13"},{o:{omitMinor:true}, x:"f#13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-13"},{o:{unicodeAccidentals:true}, x:"F♯m13"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m13"}],
    "F# A C# E B D#":[{o:{}, x:"F#m13"},{o:{useFlats:true}, x:"Gbm13"},{o:{majorSymbol:"M"}, x:"F#m13"},{o:{omitMajor:false}, x:"F#m13"},{o:{omitMinor:true}, x:"f#13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-13"},{o:{unicodeAccidentals:true}, x:"F♯m13"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m13"}],
    "F# A C# E D#":[{o:{}, x:"F#m13"},{o:{useFlats:true}, x:"Gbm13"},{o:{majorSymbol:"M"}, x:"F#m13"},{o:{omitMajor:false}, x:"F#m13"},{o:{omitMinor:true}, x:"f#13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-13"},{o:{unicodeAccidentals:true}, x:"F♯m13"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m13"}],
    "F# A C# F G# B D#":[{o:{}, x:"F#m(maj13)"},{o:{useFlats:true}, x:"Gbm(maj13)"},{o:{majorSymbol:"M"}, x:"F#m(M13)"},{o:{omitMajor:false}, x:"F#m(maj13)"},{o:{omitMinor:true}, x:"f#maj13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-maj13"},{o:{unicodeAccidentals:true}, x:"F♯m(maj13)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m(maj13)"}],
    "F# A C# F G# D#":[{o:{}, x:"F#m(maj13)"},{o:{useFlats:true}, x:"Gbm(maj13)"},{o:{majorSymbol:"M"}, x:"F#m(M13)"},{o:{omitMajor:false}, x:"F#m(maj13)"},{o:{omitMinor:true}, x:"f#maj13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-maj13"},{o:{unicodeAccidentals:true}, x:"F♯m(maj13)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m(maj13)"}],
    "F# A C# F B D#":[{o:{}, x:"F#m(maj13)"},{o:{useFlats:true}, x:"Gbm(maj13)"},{o:{majorSymbol:"M"}, x:"F#m(M13)"},{o:{omitMajor:false}, x:"F#m(maj13)"},{o:{omitMinor:true}, x:"f#maj13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-maj13"},{o:{unicodeAccidentals:true}, x:"F♯m(maj13)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m(maj13)"}],
    "F# A C# F D#":[{o:{}, x:"F#m(maj13)"},{o:{useFlats:true}, x:"Gbm(maj13)"},{o:{majorSymbol:"M"}, x:"F#m(M13)"},{o:{omitMajor:false}, x:"F#m(maj13)"},{o:{omitMinor:true}, x:"f#maj13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-maj13"},{o:{unicodeAccidentals:true}, x:"F♯m(maj13)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m(maj13)"}],
    "F# A# D E G# B D#":[{o:{}, x:"F#aug13"},{o:{useFlats:true}, x:"Gbaug13"},{o:{majorSymbol:"M"}, x:"F#aug13"},{o:{omitMajor:false}, x:"F#aug13"},{o:{omitMinor:true}, x:"F#aug13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+13"},{o:{unicodeAccidentals:true}, x:"F♯aug13"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug13"}],
    "F# A# D E G# D#":[{o:{}, x:"F#aug13"},{o:{useFlats:true}, x:"Gbaug13"},{o:{majorSymbol:"M"}, x:"F#aug13"},{o:{omitMajor:false}, x:"F#aug13"},{o:{omitMinor:true}, x:"F#aug13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+13"},{o:{unicodeAccidentals:true}, x:"F♯aug13"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug13"}],
    "F# A# D E B D#":[{o:{}, x:"F#aug13"},{o:{useFlats:true}, x:"Gbaug13"},{o:{majorSymbol:"M"}, x:"F#aug13"},{o:{omitMajor:false}, x:"F#aug13"},{o:{omitMinor:true}, x:"F#aug13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+13"},{o:{unicodeAccidentals:true}, x:"F♯aug13"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug13"}],
    "F# A# D E D#":[{o:{}, x:"F#aug13"},{o:{useFlats:true}, x:"Gbaug13"},{o:{majorSymbol:"M"}, x:"F#aug13"},{o:{omitMajor:false}, x:"F#aug13"},{o:{omitMinor:true}, x:"F#aug13"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+13"},{o:{unicodeAccidentals:true}, x:"F♯aug13"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug13"}],
    "F# A# D F G# B D#":[{o:{}, x:"F#aug(maj13)"},{o:{useFlats:true}, x:"Gbaug(maj13)"},{o:{majorSymbol:"M"}, x:"F#aug(M13)"},{o:{omitMajor:false}, x:"F#aug(maj13)"},{o:{omitMinor:true}, x:"F#aug(maj13)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+maj13"},{o:{unicodeAccidentals:true}, x:"F♯aug(maj13)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug(maj13)"}],
    "F# A# D F G# D#":[{o:{}, x:"F#aug(maj13)"},{o:{useFlats:true}, x:"Gbaug(maj13)"},{o:{majorSymbol:"M"}, x:"F#aug(M13)"},{o:{omitMajor:false}, x:"F#aug(maj13)"},{o:{omitMinor:true}, x:"F#aug(maj13)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+maj13"},{o:{unicodeAccidentals:true}, x:"F♯aug(maj13)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug(maj13)"}],
    "F# A# D F B D#":[{o:{}, x:"F#aug(maj13)"},{o:{useFlats:true}, x:"Gbaug(maj13)"},{o:{majorSymbol:"M"}, x:"F#aug(M13)"},{o:{omitMajor:false}, x:"F#aug(maj13)"},{o:{omitMinor:true}, x:"F#aug(maj13)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+maj13"},{o:{unicodeAccidentals:true}, x:"F♯aug(maj13)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug(maj13)"}],
    "F# A# D F D#":[{o:{}, x:"F#aug(maj13)"},{o:{useFlats:true}, x:"Gbaug(maj13)"},{o:{majorSymbol:"M"}, x:"F#aug(M13)"},{o:{omitMajor:false}, x:"F#aug(maj13)"},{o:{omitMinor:true}, x:"F#aug(maj13)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+maj13"},{o:{unicodeAccidentals:true}, x:"F♯aug(maj13)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug(maj13)"}],
    "F# A# C# D#":[{o:{}, x:"F#6"},{o:{useFlats:true}, x:"Gb6"},{o:{majorSymbol:"M"}, x:"F#6"},{o:{omitMajor:false}, x:"F#6"},{o:{omitMinor:true}, x:"F#6"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#6"},{o:{unicodeAccidentals:true}, x:"F♯6"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭6"}],
    "F# A# D#":[{o:{}, x:"F#6(no5)"},{o:{useFlats:true}, x:"Gb6(no5)"},{o:{majorSymbol:"M"}, x:"F#6(no5)"},{o:{omitMajor:false}, x:"F#6(no5)"},{o:{omitMinor:true}, x:"F#6(no5)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#6(no5)"},{o:{unicodeAccidentals:true}, x:"F♯6(no5)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭6(no5)"}],
    "F# A# C D#":[{o:{}, x:"F#6(b5)"},{o:{useFlats:true}, x:"Gb6(b5)"},{o:{majorSymbol:"M"}, x:"F#6(b5)"},{o:{omitMajor:false}, x:"F#6(b5)"},{o:{omitMinor:true}, x:"F#6(b5)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#6(b5)"},{o:{unicodeAccidentals:true}, x:"F♯6(♭5)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭6(♭5)"}],
    "F# A# D D#":[{o:{}, x:"F#aug6"},{o:{useFlats:true}, x:"Gbaug6"},{o:{majorSymbol:"M"}, x:"F#aug6"},{o:{omitMajor:false}, x:"F#aug6"},{o:{omitMinor:true}, x:"F#aug6"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#+6"},{o:{unicodeAccidentals:true}, x:"F♯aug6"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭aug6"}],
    "F# A C# D#":[{o:{}, x:"F#m6"},{o:{useFlats:true}, x:"Gbm6"},{o:{majorSymbol:"M"}, x:"F#m6"},{o:{omitMajor:false}, x:"F#m6"},{o:{omitMinor:true}, x:"f#6"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-6"},{o:{unicodeAccidentals:true}, x:"F♯m6"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m6"}],
    "F# A D#":[{o:{}, x:"F#m6(no5)"},{o:{useFlats:true}, x:"Gbm6(no5)"},{o:{majorSymbol:"M"}, x:"F#m6(no5)"},{o:{omitMajor:false}, x:"F#m6(no5)"},{o:{omitMinor:true}, x:"f#6(no5)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-6(no5)"},{o:{unicodeAccidentals:true}, x:"F♯m6(no5)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m6(no5)"}],
    "F# A D D#":[{o:{}, x:"F#m6(#5)"},{o:{useFlats:true}, x:"Gbm6(#5)"},{o:{majorSymbol:"M"}, x:"F#m6(#5)"},{o:{omitMajor:false}, x:"F#m6(#5)"},{o:{omitMinor:true}, x:"f#6(#5)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-6(#5)"},{o:{unicodeAccidentals:true}, x:"F♯m6(♯5)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m6(♯5)"}],
    "F# A# C# D# G#":[{o:{}, x:"F#6/9"},{o:{useFlats:true}, x:"Gb6/9"},{o:{majorSymbol:"M"}, x:"F#6/9"},{o:{omitMajor:false}, x:"F#6/9"},{o:{omitMinor:true}, x:"F#6/9"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#6/9"},{o:{unicodeAccidentals:true}, x:"F♯6/9"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭6/9"}],
    "F# A C# D# G#":[{o:{}, x:"F#m6/9"},{o:{useFlats:true}, x:"Gbm6/9"},{o:{majorSymbol:"M"}, x:"F#m6/9"},{o:{omitMajor:false}, x:"F#m6/9"},{o:{omitMinor:true}, x:"f#6/9"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#-6/9"},{o:{unicodeAccidentals:true}, x:"F♯m6/9"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭m6/9"}],
    "F# G# C#":[{o:{}, x:"F#sus2"},{o:{useFlats:true}, x:"Gbsus2"},{o:{majorSymbol:"M"}, x:"F#sus2"},{o:{omitMajor:false}, x:"F#sus2"},{o:{omitMinor:true}, x:"F#sus2"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#sus2"},{o:{unicodeAccidentals:true}, x:"F♯sus2"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭sus2"}],
    "F# B C#":[{o:{}, x:"F#sus4"},{o:{useFlats:true}, x:"Gbsus4"},{o:{majorSymbol:"M"}, x:"F#sus4"},{o:{omitMajor:false}, x:"F#sus4"},{o:{omitMinor:true}, x:"F#sus4"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#sus4"},{o:{unicodeAccidentals:true}, x:"F♯sus4"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭sus4"}],
    "F# G# B C#":[{o:{}, x:"F#sus2/4"},{o:{useFlats:true}, x:"Gbsus2/4"},{o:{majorSymbol:"M"}, x:"F#sus2/4"},{o:{omitMajor:false}, x:"F#sus2/4"},{o:{omitMinor:true}, x:"F#sus2/4"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#sus2/4"},{o:{unicodeAccidentals:true}, x:"F♯sus2/4"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭sus2/4"}],
    "F# D# C#":[{o:{}, x:"F#6sus"},{o:{useFlats:true}, x:"Gb6sus"},{o:{majorSymbol:"M"}, x:"F#6sus"},{o:{omitMajor:false}, x:"F#6sus"},{o:{omitMinor:true}, x:"F#6sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#6sus"},{o:{unicodeAccidentals:true}, x:"F♯6sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭6sus"}],
    "F# D# C# G#":[{o:{}, x:"F#6/9sus"},{o:{useFlats:true}, x:"Gb6/9sus"},{o:{majorSymbol:"M"}, x:"F#6/9sus"},{o:{omitMajor:false}, x:"F#6/9sus"},{o:{omitMinor:true}, x:"F#6/9sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#6/9sus"},{o:{unicodeAccidentals:true}, x:"F♯6/9sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭6/9sus"}],
    "F# D# C# B":[{o:{}, x:"F#6/11sus"},{o:{useFlats:true}, x:"Gb6/11sus"},{o:{majorSymbol:"M"}, x:"F#6/11sus"},{o:{omitMajor:false}, x:"F#6/11sus"},{o:{omitMinor:true}, x:"F#6/11sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#6/11sus"},{o:{unicodeAccidentals:true}, x:"F♯6/11sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭6/11sus"}],
    "F# D# C# G# B":[{o:{}, x:"F#6/9sus4"},{o:{useFlats:true}, x:"Gb6/9sus4"},{o:{majorSymbol:"M"}, x:"F#6/9sus4"},{o:{omitMajor:false}, x:"F#6/9sus4"},{o:{omitMinor:true}, x:"F#6/9sus4"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#6/9sus4"},{o:{unicodeAccidentals:true}, x:"F♯6/9sus4"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭6/9sus4"}],
    "F# D# G#":[{o:{}, x:"F#6/9sus(no5)"},{o:{useFlats:true}, x:"Gb6/9sus(no5)"},{o:{majorSymbol:"M"}, x:"F#6/9sus(no5)"},{o:{omitMajor:false}, x:"F#6/9sus(no5)"},{o:{omitMinor:true}, x:"F#6/9sus(no5)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#6/9sus(no5)"},{o:{unicodeAccidentals:true}, x:"F♯6/9sus(no5)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭6/9sus(no5)"}],
    "F# D# B":[{o:{}, x:"F#6/11sus(no5)"},{o:{useFlats:true}, x:"Gb6/11sus(no5)"},{o:{majorSymbol:"M"}, x:"F#6/11sus(no5)"},{o:{omitMajor:false}, x:"F#6/11sus(no5)"},{o:{omitMinor:true}, x:"F#6/11sus(no5)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#6/11sus(no5)"},{o:{unicodeAccidentals:true}, x:"F♯6/11sus(no5)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭6/11sus(no5)"}],
    "F# D# G# B":[{o:{}, x:"F#6/9sus4(no5)"},{o:{useFlats:true}, x:"Gb6/9sus4(no5)"},{o:{majorSymbol:"M"}, x:"F#6/9sus4(no5)"},{o:{omitMajor:false}, x:"F#6/9sus4(no5)"},{o:{omitMinor:true}, x:"F#6/9sus4(no5)"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#6/9sus4(no5)"},{o:{unicodeAccidentals:true}, x:"F♯6/9sus4(no5)"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭6/9sus4(no5)"}],
    "F# C# E":[{o:{}, x:"F#7sus"},{o:{useFlats:true}, x:"Gb7sus"},{o:{majorSymbol:"M"}, x:"F#7sus"},{o:{omitMajor:false}, x:"F#7sus"},{o:{omitMinor:true}, x:"F#7sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#7sus"},{o:{unicodeAccidentals:true}, x:"F♯7sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭7sus"}],
    "F# C# F":[{o:{}, x:"F#maj7sus"},{o:{useFlats:true}, x:"Gbmaj7sus"},{o:{majorSymbol:"M"}, x:"F#M7sus"},{o:{omitMajor:false}, x:"F#maj7sus"},{o:{omitMinor:true}, x:"F#maj7sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj7sus"},{o:{unicodeAccidentals:true}, x:"F♯maj7sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj7sus"}],
    "F# C# E G#":[{o:{}, x:"F#9sus"},{o:{useFlats:true}, x:"Gb9sus"},{o:{majorSymbol:"M"}, x:"F#9sus"},{o:{omitMajor:false}, x:"F#9sus"},{o:{omitMinor:true}, x:"F#9sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#9sus"},{o:{unicodeAccidentals:true}, x:"F♯9sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭9sus"}],
    "F# C# F G#":[{o:{}, x:"F#maj9sus"},{o:{useFlats:true}, x:"Gbmaj9sus"},{o:{majorSymbol:"M"}, x:"F#M9sus"},{o:{omitMajor:false}, x:"F#maj9sus"},{o:{omitMinor:true}, x:"F#maj9sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj9sus"},{o:{unicodeAccidentals:true}, x:"F♯maj9sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj9sus"}],
    "F# C# E G# B":[{o:{}, x:"F#11sus"},{o:{useFlats:true}, x:"Gb11sus"},{o:{majorSymbol:"M"}, x:"F#11sus"},{o:{omitMajor:false}, x:"F#11sus"},{o:{omitMinor:true}, x:"F#11sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#11sus"},{o:{unicodeAccidentals:true}, x:"F♯11sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭11sus"}],
    "F# C# E B":[{o:{}, x:"F#11sus"},{o:{useFlats:true}, x:"Gb11sus"},{o:{majorSymbol:"M"}, x:"F#11sus"},{o:{omitMajor:false}, x:"F#11sus"},{o:{omitMinor:true}, x:"F#11sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#11sus"},{o:{unicodeAccidentals:true}, x:"F♯11sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭11sus"}],
    "F# C# F G# B":[{o:{}, x:"F#maj11sus"},{o:{useFlats:true}, x:"Gbmaj11sus"},{o:{majorSymbol:"M"}, x:"F#M11sus"},{o:{omitMajor:false}, x:"F#maj11sus"},{o:{omitMinor:true}, x:"F#maj11sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj11sus"},{o:{unicodeAccidentals:true}, x:"F♯maj11sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj11sus"}],
    "F# C# F B":[{o:{}, x:"F#maj11sus"},{o:{useFlats:true}, x:"Gbmaj11sus"},{o:{majorSymbol:"M"}, x:"F#M11sus"},{o:{omitMajor:false}, x:"F#maj11sus"},{o:{omitMinor:true}, x:"F#maj11sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj11sus"},{o:{unicodeAccidentals:true}, x:"F♯maj11sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj11sus"}],
    "F# C# E G# B D#":[{o:{}, x:"F#13sus"},{o:{useFlats:true}, x:"Gb13sus"},{o:{majorSymbol:"M"}, x:"F#13sus"},{o:{omitMajor:false}, x:"F#13sus"},{o:{omitMinor:true}, x:"F#13sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#13sus"},{o:{unicodeAccidentals:true}, x:"F♯13sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭13sus"}],
    "F# C# E G# D#":[{o:{}, x:"F#13sus"},{o:{useFlats:true}, x:"Gb13sus"},{o:{majorSymbol:"M"}, x:"F#13sus"},{o:{omitMajor:false}, x:"F#13sus"},{o:{omitMinor:true}, x:"F#13sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#13sus"},{o:{unicodeAccidentals:true}, x:"F♯13sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭13sus"}],
    "F# C# E B D#":[{o:{}, x:"F#13sus"},{o:{useFlats:true}, x:"Gb13sus"},{o:{majorSymbol:"M"}, x:"F#13sus"},{o:{omitMajor:false}, x:"F#13sus"},{o:{omitMinor:true}, x:"F#13sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#13sus"},{o:{unicodeAccidentals:true}, x:"F♯13sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭13sus"}],
    "F# C# E D#":[{o:{}, x:"F#13sus"},{o:{useFlats:true}, x:"Gb13sus"},{o:{majorSymbol:"M"}, x:"F#13sus"},{o:{omitMajor:false}, x:"F#13sus"},{o:{omitMinor:true}, x:"F#13sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#13sus"},{o:{unicodeAccidentals:true}, x:"F♯13sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭13sus"}],
    "F# C# F G# B D#":[{o:{}, x:"F#maj13sus"},{o:{useFlats:true}, x:"Gbmaj13sus"},{o:{majorSymbol:"M"}, x:"F#M13sus"},{o:{omitMajor:false}, x:"F#maj13sus"},{o:{omitMinor:true}, x:"F#maj13sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj13sus"},{o:{unicodeAccidentals:true}, x:"F♯maj13sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj13sus"}],
    "F# C# F G# D#":[{o:{}, x:"F#maj13sus"},{o:{useFlats:true}, x:"Gbmaj13sus"},{o:{majorSymbol:"M"}, x:"F#M13sus"},{o:{omitMajor:false}, x:"F#maj13sus"},{o:{omitMinor:true}, x:"F#maj13sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj13sus"},{o:{unicodeAccidentals:true}, x:"F♯maj13sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj13sus"}],
    "F# C# F B D#":[{o:{}, x:"F#maj13sus"},{o:{useFlats:true}, x:"Gbmaj13sus"},{o:{majorSymbol:"M"}, x:"F#M13sus"},{o:{omitMajor:false}, x:"F#maj13sus"},{o:{omitMinor:true}, x:"F#maj13sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj13sus"},{o:{unicodeAccidentals:true}, x:"F♯maj13sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj13sus"}],
    "F# C# F D#":[{o:{}, x:"F#maj13sus"},{o:{useFlats:true}, x:"Gbmaj13sus"},{o:{majorSymbol:"M"}, x:"F#M13sus"},{o:{omitMajor:false}, x:"F#maj13sus"},{o:{omitMinor:true}, x:"F#maj13sus"},{o:{minorSymbol:"-",augSymbol:"+",dimSymbol:"o",unicodeHalfDiminished:true}, x:"F#maj13sus"},{o:{unicodeAccidentals:true}, x:"F♯maj13sus"},{o:{unicodeAccidentals:true,useFlats:true}, x:"G♭maj13sus"}],
  };
  
  //short example of what this test matrix looks like:
  /*
  let testMatrix = {
    'F# A# C#': [
      {o: {}, x: 'F#'},
      {o: {useFlats:true}, x: 'Gb'}
    ],
    'F# A C#': [
      {o: {}, x: 'F#m'},
      {o: {useFlats:true}, x: 'Gbm'}
    ]
  };
  */
  
  let chords = Object.keys(testMatrix).sort();
  for(let i = 0; i < chords.length; i++) {
    let chord = chords[i];
    let tests = testMatrix[chord];
    for(let j = 0; j < tests.length; j++) {
      let test = tests[j];
      let expected = test.x;
      let options = test.o;
      let optionsJson = JSON.stringify(options);
      Test.assert(expected, crd(chord).getName(r, options).name, `Chord("${chord}").getName(root=F#, options=${optionsJson})`);
    }
  }
  
});

