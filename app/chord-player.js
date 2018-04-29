"use strict";

//state-  string tunings, net pitch alter, selected frets
var ChordPlayer = {
  state: {
    strings: 'E2 A2 D3 G3 B3 E4'.split(/ /).map(s => new Pitch(s)),
    transpose: 0,
    capo: 0,
    frets: [ null, null, null, null, null, null ],
    useFlats: false
  },
  
  init() {
    var $guitar = $('#guitar');
    $guitar.on('click', '.note', function() {
      var $this = $(this);
      var stringId = $this.data('string');
      var setActive = !$this.hasClass('active');
      var filterd = $guitar.find('.note.active').filter(function() {return $(this).data('string') === stringId});
      $guitar.find('.note.active').filter(function() {return $(this).data('string') === stringId}).removeClass('active');
      if(setActive) {
        $this.addClass('active');
        ChordPlayer.state.frets[stringId] = $this.parent().data('fret');
      }
      else {
        ChordPlayer.state.frets[stringId] = null;
      }
    });
    
    ChordPlayer.draw();
  },
  
  draw() {
    var $guitar = $('#guitar');
    $guitar.find('#headstock, #fretboard .fret').each(function() {
      var $fret = $(this);
      var fretId = $fret.data('fret');
      var numStrings = ChordPlayer.state.strings.length;
      
      $fret.empty();
      for(var i = 0; i < ChordPlayer.state.strings.length; i++) {
        var pitch = ChordPlayer.state.strings[i].transpose(fretId);
        var pitchName = pitch.getName();
        var noteName = pitch.note.getName(ChordPlayer.state.useFlats);
        
        var $note = $('<div/>').addClass('note').css({width: `calc(100% / ${numStrings})`, left: `calc(${i} * (100% / ${numStrings}))`});
        $note.data({note: pitchName, string: i});
        //$note.attr({'data-note': pitchName, 'data-string': i});
        if(ChordPlayer.state.frets[i] === fretId)
          $note.addClass('active');
        $note.append($('<div/>').addClass('note-label').text(noteName));
        
        $fret.append($note);
      }
    });
  },
  
  play(string) {
    var el = $(`#string-${string}`)[0];
    if(el)
      el.play();
  },
  
  playChord(delay=20) {
    var self = this;
    for(var i = 0; i < this.strings.length; i++)
      setTimeout(()=>self.play(i), delay * i);
  }
}

$(function() {
  ChordPlayer.init();
})