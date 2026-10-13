
import re, pathlib

# Patch js/game.js
js_path = pathlib.Path("js/game.js")
if js_path.exists():
    t = js_path.read_text(encoding="utf-8", errors="ignore")
    # Add instant ball code at top if not present
    instant_code = """
let _ballCtx=null,_ballBuf=null,_ready=false;
function _getCtx(){if(!_ballCtx)_ballCtx=new(window.AudioContext||window.webkitAudioContext)();return _ballCtx;}
function _unlock(){try{const c=_getCtx();if(c.state==='suspended')c.resume();}catch(e){} if(_ready)return;_ready=true;fetch('assets/audio/sfx/ball.mp3').then(r=>r.arrayBuffer()).then(b=>_getCtx().decodeAudioData(b)).then(d=>_ballBuf=d).catch(()=>{});}
['touchstart','mousedown','keydown','click'].forEach(e=>window.addEventListener(e,_unlock,{once:true}));
function playBallInstant(){_unlock();try{const c=_getCtx();if(_ballBuf){const s=c.createBufferSource();s.buffer=_ballBuf;s.connect(c.destination);s.start(0);return;}}catch(e){}const a=new Audio('assets/audio/sfx/ball.mp3');a.currentTime=0;a.play().catch(()=>{});}
"""
    if "_ballCtx" not in t:
        t = instant_code + "\n" + t

    # Lower music volume: any .volume = 0.x where x>0.15 -> 0.05
    def vol_repl(m):
        try:
            v = float(m.group(2))
            if v > 0.15:
                return m.group(1) + "0.05"
            else:
                return m.group(0)
        except:
            return m.group(1) + "0.05"
    t = re.sub(r"(\.volume\s*=\s*)(0\.\d+|1\.\d+|\d+)", vol_repl, t)
    t = re.sub(r"(volume\s*:\s*)(0\.\d+|1\.\d+)", lambda m: m.group(1)+"0.05", t)

    # Replace ball Audio play with instant
    t = re.sub(r"new Audio\(['"]assets/audio/sfx/ball\.mp3['"]\)\.play\(\)", "playBallInstant()", t)
    t = re.sub(r"(\w*ball\w*)\.play\(\)", lambda m: "playBallInstant()" if "ball" in m.group(0).lower() else m.group(0), t, flags=re.IGNORECASE)

    js_path.write_text(t, encoding="utf-8")
    print("js/game.js patched")
else:
    print("js/game.js not found")

# Patch fix-ball.js to v3 with even more aggressive override
fix_js = pathlib.Path("fix-ball.js")
fix_js.write_text("""let _ballCtx=null,_ballBuf=null,_ready=false;
function _getCtx(){if(!_ballCtx)_ballCtx=new(window.AudioContext||window.webkitAudioContext)();return _ballCtx;}
function _unlock(){try{const c=_getCtx();if(c.state==='suspended')c.resume();}catch(e){} if(_ready)return;_ready=true;fetch('assets/audio/sfx/ball.mp3').then(r=>r.arrayBuffer()).then(b=>_getCtx().decodeAudioData(b)).then(d=>_ballBuf=d).catch(()=>{});}
['touchstart','mousedown','keydown','click','touchend'].forEach(e=>window.addEventListener(e,_unlock,{once:true, passive:true}));
function playBallInstant(){_unlock();try{const c=_getCtx();if(_ballBuf){const s=c.createBufferSource();s.buffer=_ballBuf;s.connect(c.destination);s.start(0);return;}}catch(e){}const a=new Audio('assets/audio/sfx/ball.mp3');a.currentTime=0;a.volume=0.4;a.play().catch(()=>{});}
setInterval(()=>{try{if(window.ballSound)window.ballSound.play=playBallInstant; if(window.sounds){if(sounds.ball)sounds.ball.play=playBallInstant; Object.values(sounds).forEach(s=>{if(s&&s.src&&s.src.includes('ball')) s.play=playBallInstant});}}catch(e){}},300);
""", encoding="utf-8")
print("fix-ball.js v3 written")

# Ensure index.html includes fix-ball.js
idx = pathlib.Path("index.html")
if idx.exists():
    txt = idx.read_text(encoding="utf-8", errors="ignore")
    if "fix-ball.js" not in txt:
        txt = txt.replace("</body>", '<script src="fix-ball.js"></script></body>')
        idx.write_text(txt, encoding="utf-8")
        print("index.html linked")
    else:
        print("index.html already has fix-ball.js")