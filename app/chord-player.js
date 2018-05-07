"use strict";

//audio map generated from spreadsheeet. for any given pitch, lists all potential audio files that play it.
const AUDIO_MAP = {"B0":[{"fret":0,"file":"B0/00"}],"C1":[{"fret":1,"file":"B0/01"}],"C#1":[{"fret":2,"file":"B0/02"}],"D1":[{"fret":3,"file":"B0/03"}],"D#1":[{"fret":4,"file":"B0/04"}],"E1":[{"fret":0,"file":"E1/00"}],"F1":[{"fret":1,"file":"E1/01"}],"F#1":[{"fret":2,"file":"E1/02"}],"G1":[{"fret":3,"file":"E1/03"}],"G#1":[{"fret":4,"file":"E1/04"}],"A1":[{"fret":5,"file":"E1/05"}],"A#1":[{"fret":6,"file":"E1/06"}],"B1":[{"fret":0,"file":"B1/00"}],"C2":[{"fret":1,"file":"B1/01"}],"C#2":[{"fret":2,"file":"B1/02"}],"D2":[{"fret":3,"file":"B1/03"}],"D#2":[{"fret":4,"file":"B1/04"}],"E2":[{"fret":5,"file":"B1/05"},{"fret":0,"file":"E2/00"}],"F2":[{"fret":6,"file":"B1/06"},{"fret":1,"file":"E2/01"}],"F#2":[{"fret":7,"file":"B1/07"},{"fret":2,"file":"E2/02"}],"G2":[{"fret":8,"file":"B1/08"},{"fret":3,"file":"E2/03"}],"G#2":[{"fret":9,"file":"B1/09"},{"fret":4,"file":"E2/04"}],"A2":[{"fret":10,"file":"B1/10"},{"fret":5,"file":"E2/05"},{"fret":0,"file":"A2/00"}],"A#2":[{"fret":11,"file":"B1/11"},{"fret":6,"file":"E2/06"},{"fret":1,"file":"A2/01"}],"B2":[{"fret":12,"file":"B1/12"},{"fret":7,"file":"E2/07"},{"fret":2,"file":"A2/02"}],"C3":[{"fret":13,"file":"B1/13"},{"fret":8,"file":"E2/08"},{"fret":3,"file":"A2/03"}],"C#3":[{"fret":14,"file":"B1/14"},{"fret":9,"file":"E2/09"},{"fret":4,"file":"A2/04"}],"D3":[{"fret":15,"file":"B1/15"},{"fret":10,"file":"E2/10"},{"fret":5,"file":"A2/05"},{"fret":0,"file":"D3/00"}],"D#3":[{"fret":16,"file":"B1/16"},{"fret":11,"file":"E2/11"},{"fret":6,"file":"A2/06"},{"fret":1,"file":"D3/01"}],"E3":[{"fret":17,"file":"B1/17"},{"fret":12,"file":"E2/12"},{"fret":7,"file":"A2/07"},{"fret":2,"file":"D3/02"}],"F3":[{"fret":13,"file":"E2/13"},{"fret":8,"file":"A2/08"},{"fret":3,"file":"D3/03"}],"F#3":[{"fret":14,"file":"E2/14"},{"fret":9,"file":"A2/09"},{"fret":4,"file":"D3/04"}],"G3":[{"fret":15,"file":"E2/15"},{"fret":10,"file":"A2/10"},{"fret":5,"file":"D3/05"},{"fret":0,"file":"G3/00"}],"G#3":[{"fret":16,"file":"E2/16"},{"fret":11,"file":"A2/11"},{"fret":6,"file":"D3/06"},{"fret":1,"file":"G3/01"}],"A3":[{"fret":17,"file":"E2/17"},{"fret":12,"file":"A2/12"},{"fret":7,"file":"D3/07"},{"fret":2,"file":"G3/02"}],"A#3":[{"fret":13,"file":"A2/13"},{"fret":8,"file":"D3/08"},{"fret":3,"file":"G3/03"}],"B3":[{"fret":14,"file":"A2/14"},{"fret":9,"file":"D3/09"},{"fret":4,"file":"G3/04"},{"fret":0,"file":"B3/00"}],"C4":[{"fret":15,"file":"A2/15"},{"fret":10,"file":"D3/10"},{"fret":5,"file":"G3/05"},{"fret":1,"file":"B3/01"}],"C#4":[{"fret":16,"file":"A2/16"},{"fret":11,"file":"D3/11"},{"fret":6,"file":"G3/06"},{"fret":2,"file":"B3/02"}],"D4":[{"fret":17,"file":"A2/17"},{"fret":12,"file":"D3/12"},{"fret":7,"file":"G3/07"},{"fret":3,"file":"B3/03"}],"D#4":[{"fret":13,"file":"D3/13"},{"fret":8,"file":"G3/08"},{"fret":4,"file":"B3/04"}],"E4":[{"fret":14,"file":"D3/14"},{"fret":9,"file":"G3/09"},{"fret":5,"file":"B3/05"},{"fret":0,"file":"E4/00"}],"F4":[{"fret":15,"file":"D3/15"},{"fret":10,"file":"G3/10"},{"fret":6,"file":"B3/06"},{"fret":1,"file":"E4/01"}],"F#4":[{"fret":16,"file":"D3/16"},{"fret":11,"file":"G3/11"},{"fret":7,"file":"B3/07"},{"fret":2,"file":"E4/02"}],"G4":[{"fret":17,"file":"D3/17"},{"fret":12,"file":"G3/12"},{"fret":8,"file":"B3/08"},{"fret":3,"file":"E4/03"}],"G#4":[{"fret":13,"file":"G3/13"},{"fret":9,"file":"B3/09"},{"fret":4,"file":"E4/04"}],"A4":[{"fret":14,"file":"G3/14"},{"fret":10,"file":"B3/10"},{"fret":5,"file":"E4/05"}],"A#4":[{"fret":15,"file":"G3/15"},{"fret":11,"file":"B3/11"},{"fret":6,"file":"E4/06"}],"B4":[{"fret":16,"file":"G3/16"},{"fret":12,"file":"B3/12"},{"fret":7,"file":"E4/07"}],"C5":[{"fret":17,"file":"G3/17"},{"fret":13,"file":"B3/13"},{"fret":8,"file":"E4/08"}],"C#5":[{"fret":14,"file":"B3/14"},{"fret":9,"file":"E4/09"}],"D5":[{"fret":15,"file":"B3/15"},{"fret":10,"file":"E4/10"}],"D#5":[{"fret":16,"file":"B3/16"},{"fret":11,"file":"E4/11"}],"E5":[{"fret":17,"file":"B3/17"},{"fret":12,"file":"E4/12"}],"F5":[{"fret":13,"file":"E4/13"}],"F#5":[{"fret":14,"file":"E4/14"}],"G5":[{"fret":15,"file":"E4/15"}],"G#5":[{"fret":16,"file":"E4/16"}],"A5":[{"fret":17,"file":"E4/17"}]};

//state-  string tunings, net pitch alter, selected frets
let ChordPlayer = {
  state: {
    strings: 'E2 A2 D3 G3 B3 E4'.split(/ /).map(s => new Pitch(s)),
    transpose: 0,
    capo: 0,
    frets: [ null, null, null, null, null, null ],
    useFlats: false
  },
  
  init() {
    let $guitar = $('#guitar');
    $guitar.on('click', '.note', ChordPlayer.handleNoteClick);
    ChordPlayer.setUpPick();
    ChordPlayer.setUpOptions();
    
    $('#test').on('click', function() {
      //debugger;
      ChordPlayer.playChord();
    });
    
    ChordPlayer.draw();
  },
  
  setUpPick() {
    let $pick = $('#pick');
    let pickWidth = $pick.width();
    let pickAreaWidth = $('#pick-area').width();
    let originOffset = -pickWidth / 2;
    
    let dragging = false;
    let pageDragStart = 0;
    let pickDragStart = 0;
    $pick.on('mousedown', function(e) {
      if(e.buttons === 1) {
        dragging = true;
        pickDragStart = Number($pick.css('left').replace(/px$/,'')) - originOffset;
        pageDragStart = e.pageX;
        
        //clear text selection, otherwise browser thinks we're trying to drag the selected text too.
        let selection = window.getSelection ? window.getSelection() : document.selection ? document.selection : null;
        if(!!selection) selection.empty ? selection.empty() : selection.removeAllRanges();
      }
    });
    $(window).on('mousemove', function(e) {
      //if we are dragging but somehow the mouse button is not pressed down, stop dragging
      if(dragging && e.buttons !== 1)
        dragging = false;
      if(dragging) {
        let delta = e.pageX - pageDragStart;
        let oldPos = $pick.css('left').replace(/px$/,'') - originOffset;
        let newPos = Math.min(pickAreaWidth, Math.max(0, pickDragStart + delta));
        if(newPos !== oldPos) {
          $pick.css('left', (newPos + originOffset) + 'px');
          
          //check if we hit any strings and, if so, pluck them
          ChordPlayer.state.strings.forEach(function(note, stringId) {
            let pos = (pickAreaWidth/2/ChordPlayer.state.strings.length) * (2*stringId + 1);
            if((oldPos < pos && pos <= newPos) || (newPos < pos && pos <= oldPos))
              ChordPlayer.pluckString(stringId);
          });
        }
      }
    });
    $(window).on('mouseup', function() {
      dragging = false;
    });
  },
  
  setUpOptions() {
    $('#options #useFlats').on('change', function() {
      ChordPlayer.state.useFlats = this.checked;
      ChordPlayer.draw();
    });
    $('#options #leftHanded').on('change', function() {
      ChordPlayer.state.strings.reverse();
      ChordPlayer.state.frets.reverse();
      ChordPlayer.draw();
    });
    $('#options #instrument').on('change', function() {
      //TODO: Handle Custom!
      ChordPlayer.state.strings = $(this).val().split(/ /).map(s => new Pitch(s));
      ChordPlayer.state.frets = ChordPlayer.state.strings.map(() => null);
      if($('#options #leftHanded')[0].checked) {
        ChordPlayer.state.strings.reverse();
        ChordPlayer.state.frets.reverse();
      }
      ChordPlayer.draw();
    });
    $('#options #tuning').on('change', function() {
      ChordPlayer.state.transpose = $(this).val();
      ChordPlayer.draw();
    });
    $('#options #capo').on('change', function() {
      ChordPlayer.state.capo = $(this).val();
      ChordPlayer.state.frets = ChordPlayer.state.frets.map(n => n === null ? null : Math.max(ChordPlayer.state.capo, n));
      ChordPlayer.draw();
    });
    
  },
  
  draw() {
    let $guitar = $('#guitar');
    let numStrings = ChordPlayer.state.strings.length;
    $guitar.find('#headstock, #fretboard .fret').each(function() {
      let $fret = $(this);
      let fretId = $fret.data('fret');
      
      $fret.empty();
      for(let i = 0; i < numStrings; i++) {
        let pitch = ChordPlayer.getFrettedPitch(i, fretId);
        let pitchName = pitch.getName();
        let noteName = pitch.note.getName(ChordPlayer.state.useFlats);
        
        let $note = $('<div/>').addClass('note').css({width: `calc(100% / ${numStrings})`, left: `calc(${i} * (100% / ${numStrings}))`});
        $note.data({note: pitchName, string: i});
        if(ChordPlayer.state.frets[i] === fretId)
          $note.addClass('active');
        $note.append($('<div/>').addClass('note-label').text(noteName));
        
        $fret.append($note);
      }
    });
    
    //set capo
    $('#fretboard .fret.capo').removeClass('capo');
    if(ChordPlayer.state.capo > 0)
      $(`#fretboard .fret.fret-${ChordPlayer.state.capo}`).addClass('capo');
    
    const SVG = '<svg baseProfile="full" viewBox="0 0 20 1000" preserveAspectRatio="none">'
              + '  <path d="M10 0 C 10 500, 10 500, 10 1000" stroke="olive" fill="transparent" />'
              + '</svg>'
    ;
    let $strings = $guitar.find('#strings');
    $strings.empty();
    for(let i = 0; i < numStrings; i++) {
      //two strings- one for the part above the fingered fret (which won't vibrate), one for the part below (which will)
      let staticStringHeight = ChordPlayer.getStaticStringHeight(i);
      
      let $staticString = $('<div/>').addClass(`string static string-${i}`).data('stringId', i);
      $staticString.css({
        width: `calc(100% / ${numStrings})`,
        left: `calc(${i} * (100% / ${numStrings}))`,
        top: 0,
        height: `${staticStringHeight}%`
      });
      $staticString.html(SVG);
      $strings.append($staticString);
      
      let $activeString = $('<div/>').addClass(`string active string-${i}`).data('stringId', i);
      $activeString.css({
        width: `calc(100% / ${numStrings})`,
        left: `calc(${i} * (100% / ${numStrings}))`,
        top: `${staticStringHeight}%`,
        height: `${(100-staticStringHeight)}%`
      });
      $activeString.html(SVG);
      $strings.append($activeString);
    }
    
    ChordPlayer.state.strings.forEach((note,stringId) => ChordPlayer.setAudio(stringId));
    ChordPlayer.displayChords();
  },
  
  handleNoteClick() {
    let $guitar = $('#guitar');
    
    let $note = $(this);
    let fretId = $note.parent().data('fret');
    let stringId = $note.data('string');
    //if we click below the capo, act like we clicked on the capo'd fret
    if(fretId < ChordPlayer.state.capo) {
      fretId = ChordPlayer.state.capo;
      $note = $guitar.find(`#fretboard .fret.fret-${ChordPlayer.state.capo} .note`).filter(function() {return $(this).data('string') === stringId});
    }
    
    let setActive = !$note.hasClass('active');
    $guitar.find('.note.active').filter(function() {return $(this).data('string') === stringId}).removeClass('active');
    if(setActive) {
      $note.addClass('active');
      ChordPlayer.state.frets[stringId] = Math.max($note.parent().data('fret'), ChordPlayer.state.capo);
    }
    else {
      ChordPlayer.state.frets[stringId] = null;
    }
    
    ChordPlayer.displayChords();
    ChordPlayer.setAudio(stringId);
    
    //update the height of the active/inactive portion of this string
    let staticStringHeight = ChordPlayer.getStaticStringHeight(stringId);
    $guitar.find(`#strings .string.static.string-${stringId}`).css({height: `${staticStringHeight}%`});
    $guitar.find(`#strings .string.active.string-${stringId}`).css({top: `${staticStringHeight}%`, height: `${100 - staticStringHeight}%`});
    ChordPlayer.pluckString(stringId);
  },
  
  playChord(delay=20) {
    for(let i = 0; i < ChordPlayer.state.strings.length; i++){
      let stringId = i;
      setTimeout(()=>ChordPlayer.pluckString(stringId), delay * i);
    }
  },
  
  pluckString(stringId) {
    let $activeString = $(`#strings .string.active.string-${stringId}`);
    let audioEl = $(`#audio #audio-${stringId}`)[0];
    if(!audioEl)
      return;
    audioEl.pause();
    if(ChordPlayer.state.frets[stringId] !== null) {
      $activeString.addClass('animated').data('start', Date.now());
      audioEl.currentTime = 0;
      audioEl.play();
    }
    else {
      $activeString.data('start', 0);
    }
    ChordPlayer.animateFrame();
  },
  
  setAudio(stringId) {
    let fretId = ChordPlayer.state.frets[stringId] || 0;
    let best = '';
    let diff = 999; //number of frets to get from plucked fret to recorded fret
    let pitch = ChordPlayer.state.strings[stringId].transpose(fretId);
    let audioClips = AUDIO_MAP[pitch.getName()];
    for(let i = 0; i < audioClips.length; i++) {
      let audioClip = audioClips[i];
      let tstDiff = audioClip.fret - fretId;
      if(Math.abs(tstDiff) < Math.abs(diff) || (Math.abs(tstDiff) === Math.abs(diff) && tstDiff < diff)) {
        diff = tstDiff;
        best = audioClip.file;
      }
    }
    
    let $audio = $(`#audio #audio-${stringId}`);
    if($audio.length === 0) {
      $audio = $(`<audio id="audio-${stringId}" preload />`);
      $('#audio').append($audio);
    }
    $audio[0].pause();
    $audio.attr('src', `audio/${best}.mp3`);
  },
  
  displayChords() {
    let $chordsPlayed = $('#chords-played');
    $chordsPlayed.empty();
    
    let bassPitch = null;
    let notes = [];
    for(let i = 0; i < ChordPlayer.state.strings.length; i++) {
      let pitch = ChordPlayer.getFrettedPitch(i);
      if(pitch === null)
        continue;
      
      if(notes.findIndex(note => note.equals(pitch.note)) >= 0)
        continue;
      
      notes.push(pitch.note);
      if(bassPitch === null || pitch.compareTo(bassPitch) < 0)
        bassPitch = pitch;
    }
    
    if(notes.length <= 0)
      return;
    
    let chords = new Chord(notes).getNames(ChordPlayer.state.useFlats, null, bassPitch.note);
    
    let output = '<table>';
    output += `<tr><th>Name</th><th colspan="${notes.length}">Intervals</th></tr>`;
    for(let i = 0; i < chords.length; i++) {
      let chordInfo = chords[i];
      output += '<tr>';
      output += `<td>${chordInfo.name}</td>`;
      for(let j = 0; j < chordInfo.notes.length; j++)
        output += `<td><div class="note-label">${chordInfo.notes[j].note.getName(ChordPlayer.state.useFlats)}</div>${chordInfo.notes[j].interval}</td>`;
      output += '</tr>';
    }
    output += '</table>';
    $chordsPlayed.html(output);
  },
  
  /**
   * Returns the current fretted pitch on the given string. Returns null if that string is not played.
   * @param fretId if passed, returns the pitch at that fret, whether it is fretted or not.
   */
  getFrettedPitch(stringId, fretId=null) {
    if(fretId === null)
      fretId = ChordPlayer.state.frets[stringId];
    if(fretId === null)
      return null;
    return ChordPlayer.state.strings[stringId].transpose(fretId);
  },
  
  /**
   * Returns the height of the static portion of string ${i} as a percentage of window height, in 0-100 range.
   */
  getStaticStringHeight(stringId) {
    let fretId = ChordPlayer.state.frets[stringId] || 0; //id of fingered fret on this string (0 for headstock)
    let $fret = $('#guitar').find(fretId == 0 ? '#headstock' : `#fretboard .fret.fret-${fretId}`);
    return 100 * ($fret.offset().top + $fret.outerHeight()) / window.innerHeight;
  },
  
  animateFrame() {
    const MAX_AMPLITUDE = 9;
    const MAX_TIME = 2 * 1000;
    const NOW = Date.now();
    const FREQ = 20 * (2 * Math.PI / 1000);
    let $animatedPaths = $('#strings .string.animated');
    $animatedPaths.each(function() {
      let $this = $(this);
      let start = $this.data('start') || 0;
      let t = NOW - start;
      let amplitude = MAX_AMPLITUDE * Math.max(0, 1 - t/MAX_TIME);
      let value = 10 + amplitude * Math.cos(FREQ * t);
      
      $this.find('svg path:first').attr('d', `M10 0 C ${value} 500, ${value} 500, ${value} 1000`);
      if(amplitude <= 0)
        $this.removeClass('animated');
    });
    
    if($animatedPaths.length > 0)
      requestAnimationFrame(ChordPlayer.animateFrame);
  }
}

$(function() {
  ChordPlayer.init();
})