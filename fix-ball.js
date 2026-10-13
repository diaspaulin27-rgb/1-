let _ballCtx=null,_ballBuf=null,_ready=false;
function _getCtx(){if(!_ballCtx)_ballCtx=new(window.AudioContext||window.webkitAudioContext)();return _ballCtx;}
function _unlock(){try{const c=_getCtx();if(c.state==='suspended')c.resume();}catch(e){}}
['touchstart','mousedown','keydown','click','touchend'].forEach(e=>window.addEventListener(e,_unlock,{once:true,passive:true}));

// Pop sintetico ultra rapido - 0 latencia, sem MP3
function playBallInstant(){
  _unlock();
  try{
    const ctx=_getCtx();
    // Tenta tocar o buffer pre-carregado primeiro (se ja baixou)
    if(_ballBuf){
      const s=ctx.createBufferSource(); s.buffer=_ballBuf; s.connect(ctx.destination); s.start(0);
      return;
    }
    // Sintese instantanea - sem delay de MP3
    const o=ctx.createOscillator();
    const g=ctx.createGain();
    o.type='sine';
    o.frequency.setValueAtTime(900, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(200, ctx.currentTime+0.06);
    g.gain.setValueAtTime(0.8, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.08);
    o.connect(g); g.connect(ctx.destination);
    o.start(ctx.currentTime); o.stop(ctx.currentTime+0.08);
  }catch(e){
    try{const a=new Audio('assets/audio/sfx/ball.mp3');a.currentTime=0;a.volume=0.4;a.play().catch(()=>{});}catch(e2){}
  }
}

// Pre-carrega WAV sem padding MP3 (opcional)
try{
  fetch('assets/audio/sfx/ball.mp3').then(r=>r.arrayBuffer()).then(b=>_getCtx().decodeAudioData(b)).then(d=>{
    // Corta 25ms de padding do MP3
    const trim = Math.floor(0.025 * d.sampleRate);
    if(d.length > trim){
      const newBuf=_getCtx().createBuffer(d.numberOfChannels, d.length-trim, d.sampleRate);
      for(let ch=0; ch<d.numberOfChannels; ch++){
        newBuf.getChannelData(ch).set(d.getChannelData(ch).subarray(trim));
      }
      _ballBuf=newBuf;
    } else {_ballBuf=d;}
    _ready=true;
  }).catch(()=>{});
}catch(e){}

setInterval(()=>{try{if(window.ballSound)window.ballSound.play=playBallInstant; if(window.sounds){if(sounds.ball)sounds.ball.play=playBallInstant;}}catch(e){}},300);