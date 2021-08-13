"use strict";

//audio map generated from spreadsheeet. for any given pitch, lists all potential audio files that play it.
const AUDIO_MAP = {"F0":[{"fret":0,"file":"F0/00"}],"F#0":[{"fret":1,"file":"F0/01"}],"G0":[{"fret":2,"file":"F0/02"}],"G#0":[{"fret":3,"file":"F0/03"}],"A0":[{"fret":4,"file":"F0/04"}],"A#0":[{"fret":5,"file":"F0/05"}],"B0":[{"fret":0,"file":"B0/00"}],"C1":[{"fret":1,"file":"B0/01"}],"C#1":[{"fret":2,"file":"B0/02"}],"D1":[{"fret":3,"file":"B0/03"}],"D#1":[{"fret":4,"file":"B0/04"}],"E1":[{"fret":0,"file":"E1/00"}],"F1":[{"fret":1,"file":"E1/01"}],"F#1":[{"fret":2,"file":"E1/02"}],"G1":[{"fret":3,"file":"E1/03"}],"G#1":[{"fret":4,"file":"E1/04"}],"A1":[{"fret":5,"file":"E1/05"}],"A#1":[{"fret":6,"file":"E1/06"}],"B1":[{"fret":0,"file":"B1/00"}],"C2":[{"fret":1,"file":"B1/01"}],"C#2":[{"fret":2,"file":"B1/02"}],"D2":[{"fret":3,"file":"B1/03"}],"D#2":[{"fret":4,"file":"B1/04"}],"E2":[{"fret":5,"file":"B1/05"},{"fret":0,"file":"E2/00"}],"F2":[{"fret":6,"file":"B1/06"},{"fret":1,"file":"E2/01"}],"F#2":[{"fret":7,"file":"B1/07"},{"fret":2,"file":"E2/02"}],"G2":[{"fret":8,"file":"B1/08"},{"fret":3,"file":"E2/03"}],"G#2":[{"fret":9,"file":"B1/09"},{"fret":4,"file":"E2/04"}],"A2":[{"fret":10,"file":"B1/10"},{"fret":5,"file":"E2/05"},{"fret":0,"file":"A2/00"}],"A#2":[{"fret":11,"file":"B1/11"},{"fret":6,"file":"E2/06"},{"fret":1,"file":"A2/01"}],"B2":[{"fret":12,"file":"B1/12"},{"fret":7,"file":"E2/07"},{"fret":2,"file":"A2/02"}],"C3":[{"fret":13,"file":"B1/13"},{"fret":8,"file":"E2/08"},{"fret":3,"file":"A2/03"}],"C#3":[{"fret":14,"file":"B1/14"},{"fret":9,"file":"E2/09"},{"fret":4,"file":"A2/04"}],"D3":[{"fret":15,"file":"B1/15"},{"fret":10,"file":"E2/10"},{"fret":5,"file":"A2/05"},{"fret":0,"file":"D3/00"}],"D#3":[{"fret":16,"file":"B1/16"},{"fret":11,"file":"E2/11"},{"fret":6,"file":"A2/06"},{"fret":1,"file":"D3/01"}],"E3":[{"fret":17,"file":"B1/17"},{"fret":12,"file":"E2/12"},{"fret":7,"file":"A2/07"},{"fret":2,"file":"D3/02"}],"F3":[{"fret":13,"file":"E2/13"},{"fret":8,"file":"A2/08"},{"fret":3,"file":"D3/03"}],"F#3":[{"fret":14,"file":"E2/14"},{"fret":9,"file":"A2/09"},{"fret":4,"file":"D3/04"}],"G3":[{"fret":15,"file":"E2/15"},{"fret":10,"file":"A2/10"},{"fret":5,"file":"D3/05"},{"fret":0,"file":"G3/00"}],"G#3":[{"fret":16,"file":"E2/16"},{"fret":11,"file":"A2/11"},{"fret":6,"file":"D3/06"},{"fret":1,"file":"G3/01"}],"A3":[{"fret":17,"file":"E2/17"},{"fret":12,"file":"A2/12"},{"fret":7,"file":"D3/07"},{"fret":2,"file":"G3/02"}],"A#3":[{"fret":13,"file":"A2/13"},{"fret":8,"file":"D3/08"},{"fret":3,"file":"G3/03"}],"B3":[{"fret":14,"file":"A2/14"},{"fret":9,"file":"D3/09"},{"fret":4,"file":"G3/04"},{"fret":0,"file":"B3/00"}],"C4":[{"fret":15,"file":"A2/15"},{"fret":10,"file":"D3/10"},{"fret":5,"file":"G3/05"},{"fret":1,"file":"B3/01"}],"C#4":[{"fret":16,"file":"A2/16"},{"fret":11,"file":"D3/11"},{"fret":6,"file":"G3/06"},{"fret":2,"file":"B3/02"}],"D4":[{"fret":17,"file":"A2/17"},{"fret":12,"file":"D3/12"},{"fret":7,"file":"G3/07"},{"fret":3,"file":"B3/03"}],"D#4":[{"fret":13,"file":"D3/13"},{"fret":8,"file":"G3/08"},{"fret":4,"file":"B3/04"}],"E4":[{"fret":14,"file":"D3/14"},{"fret":9,"file":"G3/09"},{"fret":5,"file":"B3/05"},{"fret":0,"file":"E4/00"}],"F4":[{"fret":15,"file":"D3/15"},{"fret":10,"file":"G3/10"},{"fret":6,"file":"B3/06"},{"fret":1,"file":"E4/01"}],"F#4":[{"fret":16,"file":"D3/16"},{"fret":11,"file":"G3/11"},{"fret":7,"file":"B3/07"},{"fret":2,"file":"E4/02"}],"G4":[{"fret":17,"file":"D3/17"},{"fret":12,"file":"G3/12"},{"fret":8,"file":"B3/08"},{"fret":3,"file":"E4/03"}],"G#4":[{"fret":13,"file":"G3/13"},{"fret":9,"file":"B3/09"},{"fret":4,"file":"E4/04"}],"A4":[{"fret":14,"file":"G3/14"},{"fret":10,"file":"B3/10"},{"fret":5,"file":"E4/05"}],"A#4":[{"fret":15,"file":"G3/15"},{"fret":11,"file":"B3/11"},{"fret":6,"file":"E4/06"}],"B4":[{"fret":16,"file":"G3/16"},{"fret":12,"file":"B3/12"},{"fret":7,"file":"E4/07"}],"C5":[{"fret":17,"file":"G3/17"},{"fret":13,"file":"B3/13"},{"fret":8,"file":"E4/08"}],"C#5":[{"fret":14,"file":"B3/14"},{"fret":9,"file":"E4/09"}],"D5":[{"fret":15,"file":"B3/15"},{"fret":10,"file":"E4/10"}],"D#5":[{"fret":16,"file":"B3/16"},{"fret":11,"file":"E4/11"}],"E5":[{"fret":17,"file":"B3/17"},{"fret":12,"file":"E4/12"}],"F5":[{"fret":13,"file":"E4/13"}],"F#5":[{"fret":14,"file":"E4/14"}],"G5":[{"fret":15,"file":"E4/15"}],"G#5":[{"fret":16,"file":"E4/16"}],"A5":[{"fret":17,"file":"E4/17"}],"A#5":[{"fret":6,"file":"E5/06"}],"B5":[{"fret":7,"file":"E5/07"}],"C6":[{"fret":8,"file":"E5/08"}],"C#6":[{"fret":9,"file":"E5/09"}],"D6":[{"fret":10,"file":"E5/10"}],"D#6":[{"fret":11,"file":"E5/11"}],"E6":[{"fret":12,"file":"E5/12"}],"F6":[{"fret":13,"file":"E5/13"}],"F#6":[{"fret":14,"file":"E5/14"}],"G6":[{"fret":15,"file":"E5/15"}],"G#6":[{"fret":16,"file":"E5/16"}],"A6":[{"fret":17,"file":"E5/17"}]};

//state-  string tunings, net pitch alter, selected frets
let ChordPlayer = {
  
  state: {
    strings: 'E2 A2 D3 G3 B3 E4'.split(/ /).map(s => new Pitch(s)),
    transpose: 0,
    capo: 0,
    frets: [ null, null, null, null, null, null ],
    animating: false,
    options: {
      leftHanded: false,
      useFlats: false,
      unicodeAccidentals: true,
      majorSymbol: 'maj',
      omitMajor: true,
      minorSymbol: 'm',
      omitMinor: false,
      augSymbol: 'aug',
      dimSymbol: 'dim',
      unicodeHalfDiminished: false,
      useHtml: true,
    }
  },
  
  
  init() {
    let $guitar = $('#guitar');
    $guitar.on('click', '.note', ChordPlayer.handleNoteClick);
    ChordPlayer.loadState();
    ChordPlayer.setUpPick();
    ChordPlayer.setUpOptions();
    
    ChordPlayer.draw();
    
    //warn mobile users...
    if(navigator.userAgent.match(/android|blackberry|iphone|ipad|ipod|opera mini|iemobile/i))
      setTimeout(() => alert("Hey there!\nJust so you know, this app doesn't work well on mobile devices!\nYou're free to try anyway, but don't say I didn't warn you!"), 100);
  },
  
  setUpPick() {
    let $pick = $('#pick');
    let pickWidth = $pick.width();
    let pickAreaWidth = $('#pick-area').width();
    let originOffset = -pickWidth / 2;
    
    let dragging = false;
    let isTouch = false;
    let pageDragStart = 0;
    let pickDragStart = 0;
    
    let clearSelection = function() {
      let selection = window.getSelection ? window.getSelection() : document.selection ? document.selection : null;
      if(!!selection) selection.empty ? selection.empty() : selection.removeAllRanges();
    }
    
    $pick.on('mousedown touchstart', function(e) {
      if((e.type === 'mousedown' && e.buttons === 1) || (e.type === 'touchstart' && e.changedTouches.length === 1)) {
        dragging = true;
        isTouch = (e.type === 'touchstart');
        
        pickDragStart = Number($pick.css('left').replace(/px$/,'')) - originOffset;
        pageDragStart = (isTouch ? e.changedTouches[0].pageX : e.pageX);
        
        //clear text selection, otherwise browser thinks we're trying to drag the selected text too.
        clearSelection();
      }
    });
    $(window).on('mousemove touchmove', function(e) {
      if(!dragging)
        return;
      
      //for some reason i'm getting both mousemove and touchmove events even for touch browser? ignore if we get wrong type of event...
      if((isTouch && e.type !== 'touchmove') || (!isTouch && e.type !== 'mousemove'))
        return;
      
      //if we are dragging but somehow the mouse button is not pressed down, stop dragging. (Or if touch-based and user has added another finger)
      if(dragging && ((isTouch && e.changedTouches.length !== 1) || (!isTouch && e.buttons !== 1))) {
        dragging = false;
        return;
      }
      
      //prevents the drag from selecting text. (touchmove event does not allow preventDefault.)
      if(!isTouch) {
        e.preventDefault();
        clearSelection();
      }
      
      let pageX = (isTouch ? e.changedTouches[0].pageX : e.pageX);
      let delta = pageX - pageDragStart;
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
    });
    $(window).on('mouseup touchend touchcancel', function(e) {
      dragging = false;
    });
  },
  
  setUpOptions() {
    $('#options #showOptions').on('click', function(e) {
      e.preventDefault();
      $('#optionsOverlay').show();
    });
    $('#optionsModal').on('click', function(e) {
      e.stopPropagation();
    })
    $('#optionsOverlay, #optionsModal #optionsDismiss').on('click', function(e) {
      $('#optionsOverlay').hide();
    });
    $('#optionsModal .option input, #optionsModal .option select').on('change', function(e) {
      ChordPlayer.state.options.leftHanded = $('#leftHanded')[0].checked;
      ChordPlayer.state.options.useFlats = $('#useFlats')[0].checked;
      ChordPlayer.state.options.unicodeAccidentals = $('#unicodeAccidentals')[0].checked;
      ChordPlayer.state.options.majorSymbol = $('#majorSymbol').val();
      ChordPlayer.state.options.omitMajor = $('#omitMajor')[0].checked;
      ChordPlayer.state.options.minorSymbol = $('#minorSymbol').val();
      ChordPlayer.state.options.omitMinor = $('#omitMinor')[0].checked;
      ChordPlayer.state.options.augSymbol = $('#augSymbol').val();
      ChordPlayer.state.options.dimSymbol = $('#dimSymbol').val();
      ChordPlayer.state.options.unicodeHalfDiminished = ($('#unicodeHalfDiminished').val() === 'true');
      ChordPlayer.saveState();
      ChordPlayer.draw();
    });
    $('#leftHanded').on('change', function() {
      ChordPlayer.state.strings.reverse();
      ChordPlayer.state.frets.reverse();
      ChordPlayer.saveState();
      ChordPlayer.draw();
    });
    $('#options #instrument').on('change', function() {
      let pitchesList = $(this).val();
      if(pitchesList === 'CUSTOM') {
        pitchesList = prompt('Enter a space delimited list of the pitches for the strings. For example, "E2 A#2 Db3 G3 B3 E4"\n\nFor reference, standard guitar tuning is E2 A2 D3 G3 B3 E4');
        if(!pitchesList.match(/^(([abcdefg]|[abdeg]b|[acdfg]#)\d( |$)){2,7}$/i)) {
          alert("Sorry! Invalid pitches!");
          return;
        }
      }
      ChordPlayer.state.strings = pitchesList.split(/ /).map(s => new Pitch(s));
      ChordPlayer.state.frets = ChordPlayer.state.strings.map(() => null);
      if($('#leftHanded')[0].checked) {
        ChordPlayer.state.strings.reverse();
        ChordPlayer.state.frets.reverse();
      }
      ChordPlayer.saveState();
      ChordPlayer.draw();
    });
    $('#options #tuning').on('change', function() {
      ChordPlayer.state.transpose = Number($(this).val());
      ChordPlayer.saveState();
      ChordPlayer.draw();
    });
    $('#options #capo').on('change', function() {
      const newCapo = Number($(this).val())
      const diff = newCapo - ChordPlayer.state.capo;
      ChordPlayer.state.capo = newCapo;
      ChordPlayer.state.frets = ChordPlayer.state.frets.map(n => n === null ? null : Math.max(ChordPlayer.state.capo, Math.min(12, n + diff)));
      ChordPlayer.saveState();
      ChordPlayer.draw();
    });
  },
  
  loadState() {
    let _state = null;
    try { _state = JSON.parse(localStorage.getItem('state')) }
    catch (e) { console.error(e) }
    
    if(_state === null)
      return;
    
    Object.keys(ChordPlayer.state).forEach(function(key) {
      if(key === 'strings')
        ChordPlayer.state.strings = _state.strings.split(/ /).map(s => new Pitch(s));
      else if (key === 'options')
        ChordPlayer.state.options = Chord.standardizeOptions({...ChordPlayer.state.options, ..._state.options});
      else if (key === 'frets')
        ChordPlayer.state.frets = _state.frets.slice();
      else if (key !== 'animating')
        ChordPlayer.state[key] = _state[key];
    });
    
    //update UI components
    $('#options #tuning').val(ChordPlayer.state.transpose);
    $('#options #capo').val(ChordPlayer.state.capo);
    $('#leftHanded')[0].checked = ChordPlayer.state.options.leftHanded;
    $('#useFlats')[0].checked = ChordPlayer.state.options.useFlats;
    $('#unicodeAccidentals')[0].checked = ChordPlayer.state.options.unicodeAccidentals;
    $('#majorSymbol').val(ChordPlayer.state.options.majorSymbol);
    $('#omitMajor')[0].checked = ChordPlayer.state.options.omitMajor;
    $('#minorSymbol').val(ChordPlayer.state.options.minorSymbol);
    $('#omitMinor')[0].checked = ChordPlayer.state.options.omitMinor;
    $('#augSymbol').val(ChordPlayer.state.options.augSymbol);
    $('#dimSymbol').val(ChordPlayer.state.options.dimSymbol);
    $('#unicodeHalfDiminished').val(ChordPlayer.state.options.unicodeHalfDiminished.toString());
    
    //for setting instrument val, try to set it to the selected pitch list. if it's not found (i.e. val is null), set it to custom
    const stringsCopy = [...ChordPlayer.state.strings]
    if(ChordPlayer.state.options.leftHanded)
      stringsCopy.reverse();
    $('#options #instrument').val(stringsCopy.map(p => p.toString()).join(' '));
    if($('#options #instrument').val() === null)
      $('#options #instrument').val('CUSTOM');
  },
  
  saveState() {
    let stateCopy = {};
    Object.keys(ChordPlayer.state).forEach(function(key) {
      if(key === 'strings')
        stateCopy.strings = ChordPlayer.state.strings.map(p => p.toString()).join(' ');
      else if (key === 'options')
        stateCopy.options = Object.assign({}, ChordPlayer.state.options);
      else if (key === 'frets')
        stateCopy.frets = ChordPlayer.state.frets.slice();
      else if (key !== 'animating')
        stateCopy[key] = ChordPlayer.state[key];
    });
    
    try { localStorage.setItem('state', JSON.stringify(stateCopy)); }
    catch (e) { console.error(e) };
  },
  
  draw() {
    let $guitar = $('#guitar');
    let numStrings = ChordPlayer.state.strings.length;
    
    $guitar.find('#headstock, #fretboard .fret').each(function() {
      let $fret = $(this);
      let fretId = Number($fret.data('fret'));
      
      $fret.empty();
      for(let i = 0; i < numStrings; i++) {
        let pitch = ChordPlayer.getFrettedPitch(i, fretId);
        let pitchName = pitch.getName();
        let noteName = pitch.note.getName(ChordPlayer.state.options);
        
        let $note = $('<div/>').addClass('note').css({width: `calc(100% / ${numStrings})`, left: `calc(${i} * (100% / ${numStrings}))`});
        $note.data({pitch: pitchName, string: i});
        if(ChordPlayer.state.frets[i] === fretId)
          $note.addClass('active');
        $note.append($('<div/>').addClass('note-label').text(noteName));
        
        $fret.append($note);
      }
      
      if(ChordPlayer.state.capo === fretId)
        $fret.append($('<div id="capo"/>'));
    });
    
    const SVG = $('#stringSvg').html();
    
    //strings with pitch greater than this will be steel, otherwise they will be bronze
    const MAX_BRONZE_STRING = new Pitch('G#3');
    
    let $strings = $guitar.find('#strings');
    $strings.empty();
    for(let i = 0; i < numStrings; i++) {
      //two strings- one for the part above the fingered fret (which won't vibrate), one for the part below (which will)
      let staticStringHeight = ChordPlayer.getStaticStringHeight(i);
      let stringWidth = ChordPlayer.getStringWidth(i);
      let stringMaterial = (ChordPlayer.state.strings[i].compareTo(MAX_BRONZE_STRING) <= 0 ? 'bronze' : 'steel');
      
      let $staticString = $('<div/>').addClass(`string static string-${i}`).data('stringId', i);
      $staticString.css({
        width: `calc(100% / ${numStrings})`,
        left: `calc(${i} * (100% / ${numStrings}))`,
        height: `${staticStringHeight}%`
      });
      $staticString.html(SVG);
      $staticString.addClass(stringMaterial).find('path.wire').css('stroke-width', stringWidth + 'px');
      $strings.append($staticString);
      
      let $activeString = $('<div/>').addClass(`string active string-${i}`).data('stringId', i);
      $activeString.css({
        width: `calc(100% / ${numStrings})`,
        left: `calc(${i} * (100% / ${numStrings}))`,
        top: `${staticStringHeight}%`,
        height: `${(100-staticStringHeight)}%`
      });
      $activeString.html(SVG);
      $activeString.addClass(stringMaterial).find('path.wire').css('stroke-width', stringWidth + 'px');
      $strings.append($activeString);
    }
    
    ChordPlayer.state.strings.forEach((note,stringId) => ChordPlayer.setAudio(stringId));
    ChordPlayer.displayChords();
  },
  
  /**
   * Calculates the width (thickness) of a particular string.
   */
  getStringWidth(stringId) {
    let pitch = ChordPlayer.state.strings[stringId];
    const MIN_PITCH = new Pitch('B0');
    const MAX_PITCH = new Pitch('E5');
    const MIN_WIDTH = 0.5;
    const MAX_WIDTH = 4;
    
    if(pitch.compareTo(MIN_PITCH) < 0)
      return MAX_WIDTH;
    if(pitch.compareTo(MAX_PITCH) > 0)
      return MIN_WIDTH;
    
    return (MIN_WIDTH - MAX_WIDTH) * MIN_PITCH.interval(pitch) / MIN_PITCH.interval(MAX_PITCH) + MAX_WIDTH;
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
    
    let pitchName = $note.data('pitch');
    if(!AUDIO_MAP[pitchName]) {
      console.log(`Error: no audio for pitch: ${pitchName}`);
      return;
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
    
    ChordPlayer.saveState();
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
    
    if(!ChordPlayer.state.animating)
      requestAnimationFrame(ChordPlayer.animateFrame);
  },
  
  setAudio(stringId) {
    let fretId = ChordPlayer.state.frets[stringId] || 0;
    let best = '';
    let diff = 999; //number of frets to get from plucked fret to recorded fret
    let pitch = ChordPlayer.state.strings[stringId].transpose(fretId + ChordPlayer.state.transpose);
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
    
    $('#instructions').toggle(notes.length <= 0);
    if(notes.length <= 0)
      return;
    
    let chords = new Chord(notes).getNames(ChordPlayer.state.options, null, bassPitch.note);
    
    let output = '<table>';
    output += `<tr><th>Name</th><th colspan="${notes.length}">Intervals</th></tr>`;
    for(let i = 0; i < chords.length; i++) {
      let chordInfo = chords[i];
      output += '<tr>';
      output += `<td>${chordInfo.name}</td>`;
      for(let j = 0; j < chordInfo.notes.length; j++)
        output += `<td><div class="note-label">${chordInfo.notes[j].note.getName(ChordPlayer.state.options)}</div>${chordInfo.notes[j].interval}</td>`;
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
    return ChordPlayer.state.strings[stringId].transpose(fretId + ChordPlayer.state.transpose);
  },
  
  /**
   * Returns the height of the static portion of string ${i} as a percentage of window height, in 0-100 range.
   */
  getStaticStringHeight(stringId) {
    let fretId = ChordPlayer.state.frets[stringId] || 0; //id of fingered fret on this string (0 for headstock)
    let $fret = $('#guitar').find(fretId == 0 ? '#headstock' : `#fretboard .fret.fret-${fretId}`);
    return 100 * ($fret.offset().top + $fret.outerHeight()) / window.innerHeight;
  },
  
  /**
   * Callback to render one frame of animation.
   */
  animateFrame() {
    const MAX_AMPLITUDE = 9;
    const MAX_TIME = 2 * 1000;
    const NOW = Date.now();
    
    //all strings vibrate at 19 Hz... true frequency was way too much. Using 19 because it is prime, and
    //not a factor of 50 or 60 (common monitor refresh rates), so less chance of it appearing not to move
    //(i.e. the helicopter blade on film effect)
    const FREQ = 19 * (2 * Math.PI / 1000);
    const FRETBOARD_HEIGHT = $('#fretboard').height();
    const PICKAREA_HEIGHT = $('#pick-area').height();
    
    ChordPlayer.state.animating = true;
    let $animatedPaths = $('#strings .string.animated');
    $animatedPaths.each(function() {
      let $this = $(this);
      let start = $this.data('start') || 0;
      let t = NOW - start;
      
      //double the amplitude, because the quadratic curve only makes it halfway to the control point
      let amplitude = MAX_AMPLITUDE * Math.max(0, 1 - t/MAX_TIME) * 2;
      let value = 10 + amplitude * Math.cos(FREQ * t);
      
      let thisHeight = $this.height();
      
      //true length of string is twice fretboard height (since fretboard goes to 12 frets). The part above
      //the nut does not count as part of the string. some of that is not visible (extends beyond bottom of screen).
      //length of un-vibrating part of string (nut to fretted string): fretboard_height + pickarea_height - this_height
      //length of vibrating part of string: 2*fretboard_height - unvibrating_string_len = fretboard_height - pickarea_height + this_height
      //convert to string coordinates: 1000 * vibrating_string_len / this_height = 1000 * (fretboard_height - pickarea_height + this_height) / this_height
      let stringLen = 1000 * (FRETBOARD_HEIGHT - PICKAREA_HEIGHT + thisHeight)/thisHeight;
      
      $this.find('svg path.wire').attr('d', `M10 0 Q ${value} ${stringLen/2}, 10 ${stringLen}`);
      if(amplitude <= 0)
        $this.removeClass('animated');
    });
    
    if($animatedPaths.length > 0)
      requestAnimationFrame(ChordPlayer.animateFrame);
    else
      ChordPlayer.state.animating = false;
  }
}

$(function() {
  ChordPlayer.init();
})