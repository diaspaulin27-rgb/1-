let _ballCtx=null,_ballBuf=null;
function _getCtx(){if(!_ballCtx)_ballCtx=new(window.AudioContext||window.webkitAudioContext)();return _ballCtx;}
fetch('assets/audio/sfx/ball.mp3').then(r=>r.arrayBuffer()).then(b=>_getCtx().decodeAudioData(b)).then(d=>_ballBuf=d);
function playBallInstant(){
 try{const c=_getCtx();if(_ballBuf){const s=c.createBufferSource();s.buffer=_ballBuf;s.connect(c.destination);s.start(0);return;}}catch(e){}
 const a=new Audio('assets/audio/sfx/ball.mp3');a.currentTime=0;a.play().catch(()=>{});
}