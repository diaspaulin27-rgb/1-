(() => {
  'use strict';
  window.addEventListener('error',event=>{
    console.error('[1%] Runtime error:',event.error||event.message);
  });
  window.addEventListener('unhandledrejection',event=>{
    console.error('[1%] Unhandled promise rejection:',event.reason);
  });

  const canvas = document.querySelector('#game');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled=true;
  ctx.imageSmoothingQuality='high';
  const STORAGE_PREFIX = 'zanon1_';
  const domCache = Object.create(null);
  const $ = s => {
    if (domCache[s] && domCache[s].isConnected) return domCache[s];
    const el = document.querySelector(s);
    if (el) domCache[s] = el;
    return el;
  };
  const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
  const rand = (a,b) => a + Math.random()*(b-a);
  const storage = {
    get(k,f){
      try {
        const v=localStorage.getItem(STORAGE_PREFIX+k);
        return v===null?f:JSON.parse(v);
      } catch {
        return f;
      }
    },
    set(k,v){
      try { localStorage.setItem(STORAGE_PREFIX+k,JSON.stringify(v)); } catch {}
    }
  };

  // ===== IDIOMAS =====
  // O idioma é escolhido somente no primeiro acesso e fica salvo no aparelho.
  let language=storage.get('language',null);

  const translations={
    'Idioma':'Language','Inglês':'English','Português':'Portuguese',
    'JOGAR DO ZERO':'PLAY FROM ZERO','LOJA':'SHOP',
    'Cada rebatida deixa tudo 1% mais difícil. Quanto você aguenta?':'Each bounce makes everything 1% harder. How long can you last?',
    'SCORE':'SCORE','RECORDE':'RECORD','Moedas: 0':'Coins: 0','Pausar':'Pause',
    'PULAR +25':'SKIP +25','ASSISTIR VÍDEO':'WATCH VIDEO','Pular 25 fases':'Skip 25 levels',
    'GAME OVER':'GAME OVER','Foi quase.':'So close.','PONTOS':'POINTS',
    'FALTARAM':'YOU NEEDED','FALTOU':'YOU NEEDED','NOVO RECORDE':'NEW RECORD',
    'SEU PRIMEIRO RECORDE':'YOUR FIRST RECORD',
    'SEU RECORDE JÁ É 150. TENTE IGUALAR!':'YOUR RECORD IS 150. TRY TO MATCH IT!',
    'VOCÊ IGUALOU SEU RECORDE MÁXIMO!':'YOU MATCHED YOUR MAXIMUM RECORD!',
    'Você chegou ao ':'You reached ',
    'REBATIDAS':'BOUNCES','CAIXAS':'BOXES','TROLLS':'TROLLS','ALÍVIOS':'RELIEFS','MOEDAS':'COINS',
    'SEGREDOS':'SECRETS','VINGANÇA · JOGAR DE NOVO':'REVENGE · PLAY AGAIN',
    'INÍCIO':'HOME',
    'PAUSADO':'PAUSED','Respire.':'Breathe.','CONTINUAR':'RESUME','SOM: ON':'SOUND: ON',
    'SAIR':'QUIT','SOM: OFF':'SOUND: OFF',
    'ATALHO +25':'SHORTCUT +25','Pule 25 fases':'Skip 25 levels',
    'Assista a um vídeo e comece direto no 25.':'Watch a video and start directly at 25.',
    'Assistir vídeo':'Watch video','Toque no play para assistir.':'Tap play to watch.',
    'AINDA NÃO ACABOU':'NOT OVER YET','Continuar?':'Continue?',
    'Você tem sete segundos para decidir.':'You have seven seconds to decide.',
    'ASSISTIR E CONTINUAR':'WATCH & CONTINUE','JOGAR DO ZERO':'PLAY FROM ZERO',
    'ANÚNCIO RECOMPENSADO':'REWARDED AD','Preparando resgate':'Preparing rescue',
    'Simulação do anúncio para este protótipo.':'Ad simulation for this prototype.',
    'RESGATE ATIVADO':'RESCUE ACTIVATED','Prepare-se':'Get ready',
    '5 segundos de proteção. Todos os efeitos anteriores foram encerrados.':'5 seconds of protection. All previous effects have ended.',
    'Categoria da loja':'Shop category','Prévia da skin em movimento':'Moving skin preview',
    'BOLAS':'BALLS','BASTÕES':'PADDLES','Toque numa bola para experimentar o visual.':'Tap a ball to preview it.',
    'Toque num bastão para experimentar o visual.':'Tap a paddle to preview it.',
    'Visual da bola durante a partida.':'Ball appearance during gameplay.',
    'Visual do bastão durante a partida.':'Paddle appearance during gameplay.',
    'OUVIR SOM DA BOLA 8':'LISTEN TO 8-BALL SOUND','ATIVAR SOM E OUVIR':'ENABLE SOUND & LISTEN',
    'Bloqueada · alcance 50 pontos para desbloquear':'Locked · reach 50 points to unlock',
    'Bloqueada · 50 pontos':'Locked · 50 points','Selecionada · em uso':'Selected · in use',
    'Selecionada':'Selected','Adquirida · pronta para usar':'Owned · ready to use',
    'Adquirida':'Owned','disponível para comprar':'available to buy','faltam':'you need',
    'moedas':'coins','DESBLOQUEIE COM 50 PONTOS':'UNLOCK AT 50 POINTS',
    'SELECIONADA':'SELECTED','USAR ESTA SKIN':'USE THIS SKIN','COMPRAR E USAR':'BUY & USE',
    'Prévia da batida inicial. O som fica mais grave conforme a partida avança.':'Preview of the first hit. The sound gets deeper as the game progresses.',
    'Não foi possível iniciar o áudio neste navegador.':'Could not start audio in this browser.',
    'NÃO APRENDE NUNCA':'NEVER LEARNS','Sobreviveu a dois castigos de duas bolas':'Survived two double-ball punishments',
    'Atravessou o blackout sem ser salvo':'Made it through blackout without a rescue',
    'Azul Bebê':'Baby Blue','Azul Royal':'Royal Blue','Índigo':'Indigo','Roxo Meia-Noite':'Midnight Purple',
    'Violeta':'Violet','Magenta':'Magenta','Vermelho Carmesim':'Crimson Red','Laranja Solar':'Solar Orange',
    'Amarelo Dourado':'Golden Yellow','Verde Esmeralda':'Emerald Green','Verde Oliva':'Olive Green',
    'Marrom Terra':'Earth Brown','Cinza Chumbo':'Gunmetal Gray','Grafite':'Graphite',
    'Modo Blackout':'Blackout Mode','Preto Absoluto':'Absolute Black','Azul Abissal':'Abyss Blue',
    'Ciano Profundo':'Deep Cyan','Turquesa Elétrica':'Electric Turquoise','Verde Radioativo':'Radioactive Green',
    'Verde Ácido':'Acid Green','Dourado Solar':'Solar Gold','Laranja Incandescente':'Incandescent Orange',
    'Vermelho Neon':'Neon Red','Ultravioleta':'Ultraviolet','Luz Impossível':'Impossible Light',
    '150 · Vitória Absoluta':'150 · Absolute Victory',
    'Fogo':'Fire','Donut':'Donut','Terra':'Earth','Bola 8':'8-Ball','Lua':'Moon','Neve':'Snow',
    'Galáxia':'Galaxy','Lava':'Lava','Plasma':'Plasma','Poção':'Potion','Unicórnio':'Unicorn',
    'Clássico':'Classic','Taco de Sinuca':'Pool Cue','Bastão de Diamante':'Diamond Rod',
    'Cajado Mágico':'Magic Staff','Canudo Doce':'Candy Straw','Espátula Doce':'Candy Spatula',
    'Espada Rúnica':'Rune Sword','Espada de Fogo':'Fire Sword','Katana':'Katana',
    'Lâmina de Gelo':'Ice Blade','Sabre Duplo':'Double Saber','Chão de gelo':'Ice Floor',
    'Terremoto':'Earthquake','Barra fantasma':'Ghost paddle','Barra menor':'Smaller paddle',
    'Bola acelerada':'Fast ball','Bola falsa':'Fake ball','Bola lenta':'Slow ball',
    'Câmera lenta':'Slow camera','Controles invertidos':'Inverted controls','Segunda chance':'Second chance',
    'Moeda magnética':'Magnetic coin','Mega barra':'Mega paddle','Efeito':'Effect',
    'BLACKOUT · SIGA O RASTRO':'BLACKOUT · FOLLOW THE TRAIL','100% · PRETO ABSOLUTO':'100% · ABSOLUTE BLACK',
    '150 · VOCÊ ZEROU O IMPOSSÍVEL':'150 · YOU BEAT THE IMPOSSIBLE',
    'DOURADA · ALÍVIO GARANTIDO':'GOLDEN · GUARANTEED RELIEF','MEDO DAS CAIXAS, É?':'AFRAID OF BOXES, HUH?',
    'DUAS BOLAS · UM BASTÃO':'TWO BALLS · ONE PADDLE','Rebata cada bola 5 vezes':'Bounce each ball 5 times',
    'DESAFIO SUPERADO':'CHALLENGE COMPLETE','ESCUDO SALVOU!':'SHIELD SAVED YOU!',
    'ESCUDO · SALVA 1 QUEDA':'SHIELD · SAVES 1 FALL','ZONA FALSA':'FAKE ZONE',
    'ACERTE A CESTA':'MAKE THE BASKET','17 segundos · ganhe 3 rebatidas de descanso':'17 seconds · earn 3 relief bounces',
    'CESTA · TEMPO ESGOTADO':'BASKET · TIME UP','Sem prêmio desta vez':'No reward this time',
    'CESTA! RESPIRO':'BASKET! BREATHER','Fase inicial por 3 rebatidas · pontos preservados':'Starting difficulty for 3 bounces · score preserved',
    'DE VOLTA AO DESAFIO':'BACK TO THE CHALLENGE','CAIXA CARREGANDO...':'BOX RECHARGING...',
    'BÔNUS RARO: SEGUNDA CHANCE':'RARE BONUS: SECOND CHANCE','BÔNUS RARO':'RARE BONUS',
    'BÔNUS: MOEDA MAGNÉTICA · 10 SEGUNDOS':'BONUS: MAGNETIC COIN · 10 SECONDS',
    'BÔNUS: +':'BONUS: +','ALÍVIO: MEGA BARRA · 10 SEGUNDOS':'RELIEF: MEGA PADDLE · 10 SECONDS',
    'ALÍVIO: BOLA 20% MAIS LENTA':'RELIEF: BALL 20% SLOWER','ALÍVIO: CÂMERA LENTA':'RELIEF: SLOW CAMERA',
    'TROLL: BARRA 20% MENOR':'TROLL: PADDLE 20% SMALLER','TROLL: BARRA FANTASMA · 3 SEGUNDOS':'TROLL: GHOST PADDLE · 3 SECONDS',
    'TROLL: BOLA 20% MAIS RÁPIDA':'TROLL: BALL 20% FASTER','TROLL: BOLA FALSA · 9 SEGUNDOS':'TROLL: FAKE BALL · 9 SECONDS',
    'TROLL: CHÃO DE GELO · 8 SEGUNDOS':'TROLL: ICE FLOOR · 8 SECONDS','TROLL: CONTROLES INVERTIDOS':'TROLL: INVERTED CONTROLS',
    'TROLL: TELETRANSPORTE':'TROLL: TELEPORT','TROLL: TERREMOTO':'TROLL: EARTHQUAKE',
    'PROTEÇÃO · ':'PROTECTION · ','RESPIRO · ':'BREATHER · ','CESTA · ':'BASKET · ',
    'SEGREDO! ':'SECRET! ','ATÉ A PRÓXIMA':'UNTIL THE NEXT ONE','Até aparecer a próxima caixa':'Until the next box',
    'Até pegar outra caixa':'Until another box','Tempo esgotado.':'Time is up.','PEGUE':'GET IT','VAI!':'GO!',
    'AINDA NÃO ACABOU':'NOT OVER YET','NO ESCURO EU RESOLVO':'I HANDLE THE DARK',
    'FRIO SOB PRESSÃO':'COOL UNDER PRESSURE','ALÉM DO ABISMO':'BEYOND THE ABYSS',
    'Você tem sete segundos para decidir.':'You have seven seconds to decide.',
  };
  Object.freeze(translations);

  window.ZANON_MISSING = window.ZANON_MISSING || [];
  const FALLBACK_LOCALE = 'en';
  const SUPPORTED_LANGUAGES = ['pt','en','es','fr','de','it','hi','ja','ko','zh-CN','zh-TW'];
  function tr(value){
    if(value===undefined||value===null)return value;
    const s=String(value);
    const locale = language || 'pt';
    const external = window.ZANON_LANGUAGES && window.ZANON_LANGUAGES[locale];
    if (locale !== 'pt' && external && Object.prototype.hasOwnProperty.call(external, s)) return external[s];
    // Fallback corrigido (auditoria): SÓ inglês usa o dicionário interno.
    // Antes: 'if (locale !== \'pt\' && translations[s])' fazia DE/FR/ES caírem em INGLÊS quando faltava a chave externa.
    // Agora: DE/FR/ES/etc usam SÓ o externo. Se faltar, cai em PT e registra em ZANON_MISSING, não em inglês.
    if (locale === 'en' && translations[s]) return translations[s];
    if (locale === 'pt') return s;
    // Padrões dinâmicos — funcionam em TODAS as línguas, não só em EN.
    // Antes: 'if (locale !== \'en\') return s;' bloqueava tudo abaixo para DE/ES/FR/etc.
    // Agora cada padrão monta a tradução com fragmentos de ZANON_LANGUAGES (singular/plural correto).
    const cnt=(n,sing,plur)=>n+' '+tr(n===1?sing:plur);
    let m;
    m=s.match(/^FALTOU (\d+) PONTO PARA SUPERAR SEU RECORDE$/);
    if(m)return tr('FALTOU')+' '+m[1]+' '+tr('PONTO')+' '+tr('PARA SUPERAR SEU RECORDE');
    m=s.match(/^FALTARAM (\d+) PONTOS PARA SUPERAR SEU RECORDE$/);
    if(m)return tr('FALTARAM')+' '+m[1]+' '+tr('PONTOS')+' '+tr('PARA SUPERAR SEU RECORDE');
    m=s.match(/^NOVO RECORDE · \+(\d+) PONTOS$/);
    if(m)return tr('NOVO RECORDE')+' · +'+m[1]+' '+tr(m[1]==='1'?'PONTO':'PONTOS');
    m=s.match(/^NOVO RECORDE · (.+)$/);
    if(m)return tr('NOVO RECORDE')+' · '+tr(m[1]);
    m=s.match(/^\+(\d+) PONTOS · CAIXA$/);
    if(m)return '+'+m[1]+' '+tr(m[1]==='1'?'PONTO':'PONTOS')+' · '+tr('CAIXA');
    m=s.match(/^\+(\d+) MOEDAS$/);
    if(m)return '+'+m[1]+' '+tr(m[1]==='1'?'MOEDA':'MOEDAS');
    m=s.match(/^BÔNUS: \+(\d+) PONTOS$/);
    if(m)return tr('BÔNUS: +')+m[1]+' '+tr(m[1]==='1'?'PONTO':'PONTOS');
    m=s.match(/^(\d+) REBATIDAS · (\d+) CAIXAS$/);
    if(m)return cnt(Number(m[1]),'REBATIDA','REBATIDAS')+' · '+cnt(Number(m[2]),'CAIXA','CAIXAS');
    m=s.match(/^(\d+) TROLLS · (\d+) ALÍVIOS · (\d+) MOEDAS$/);
    if(m)return cnt(Number(m[1]),'TROLL','TROLLS')+' · '+cnt(Number(m[2]),'ALÍVIO','ALÍVIOS')+' · '+cnt(Number(m[3]),'MOEDA','MOEDAS');
    m=s.match(/^([\d ·]+) PONTOS$/);
    if(m)return m[1]+' '+tr('PONTOS');
    m=s.match(/^(\d+) PONTOS$/);
    if(m)return m[1]+' '+tr(m[1]==='1'?'PONTO':'PONTOS');
    m=s.match(/^(\d+) MOEDAS$/);
    if(m)return m[1]+' '+tr(m[1]==='1'?'MOEDA':'MOEDAS');
    m=s.match(/^(\d+) segundos$/);
    if(m)return m[1]+' '+tr('segundos');
    m=s.match(/^Você chegou ao (.+)$/); if(m)return tr('Você chegou ao ')+tr(m[1]);
    m=s.match(/^Dificuldade do ponto (.+)$/); if(m)return tr('Dificuldade do ponto ')+m[1];
    m=s.match(/^PROTEÇÃO · (.+)$/); if(m)return tr('PROTEÇÃO · ')+m[1];
    m=s.match(/^RESPIRO · (\d+) REBATIDA(S?)$/); if(m)return tr('RESPIRO · ')+m[1]+' '+tr(m[1]==='1'?'REBATIDA':'REBATIDAS');
    m=s.match(/^CESTA · (.+)$/); if(m)return tr('CESTA · ')+m[1];
    m=s.match(/^COMPRAR E USAR · (\d+) MOEDAS$/); if(m)return tr('COMPRAR E USAR')+' · '+m[1]+' '+tr(m[1]==='1'?'MOEDA':'MOEDAS');
    m=s.match(/^(.+) moedas · disponível para comprar$/); if(m)return tr(m[1])+' '+tr('moedas')+' · '+tr('disponível para comprar');
    m=s.match(/^(.+) moedas · faltam (.+) moedas$/); if(m)return tr(m[1])+' '+tr('moedas')+' · '+tr('faltam')+' '+m[2]+' '+tr('moedas');
    // Fallback hierárquico (auditoria final): atual -> EN externo -> PT + log.
    // Antes (auditoria anterior): DE/FR caíam direto em PT.
    // Agora: DE/FR caem em EN externo (231 chaves, completo), NÃO no dicionário interno velho (192 chaves).
    // Ainda registra em ZANON_MISSING, para não mascarar a falta — o jogador vê EN, o dev vê o log.
    // Padrões já foram tentados acima, então aqui só chegam frases sem padrão.
    const enExternal = window.ZANON_LANGUAGES && window.ZANON_LANGUAGES[FALLBACK_LOCALE];
    if(locale!=='pt' && locale!==FALLBACK_LOCALE && enExternal && Object.prototype.hasOwnProperty.call(enExternal, s)){
      if(!window.ZANON_MISSING.includes(s)){ window.ZANON_MISSING.push(s); if(typeof console!=='undefined'&&console.warn) console.warn('[i18n] sem tradução para', JSON.stringify(s), 'em', locale, '— usando EN'); }
      return enExternal[s];
    }
    // Fallback final para PT + log.
    if(locale!=='pt' && !window.ZANON_MISSING.includes(s)){ window.ZANON_MISSING.push(s); if(typeof console!=='undefined'&&console.warn) console.warn('[i18n] sem tradução para', JSON.stringify(s), 'em', locale); }
    return s;
  }

  function applyLanguage(){
    document.documentElement.lang=({
      pt:'pt-BR',en:'en',es:'es',fr:'fr',de:'de',ja:'ja',ko:'ko',
      'zh-CN':'zh-CN','zh-TW':'zh-TW',hi:'hi',it:'it'
    })[language] || 'pt-BR';
    const root=document.body;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];
    let node;
    while(node=walker.nextNode()){
      const p=node.parentElement;
      if(!p||p.closest('script,style'))continue;
      if(node.nodeValue.trim())nodes.push(node);
    }
    // Re-tradução idempotente (auditoria): guarda o PT original na 1ª vez.
    // Antes: na 2ª troca (DE -> FR), tentava traduzir o texto já em DE como se fosse PT, e ficava em DE.
    // Agora: sempre traduz a partir do PT original guardado.
    nodes.forEach(n=>{
      if(n._ptOriginal===undefined) n._ptOriginal=n.nodeValue;
      const orig=n._ptOriginal;
      const trim=orig.trim();
      if(!trim) return;
      const translated=tr(trim);
      if(translated===trim && orig!==n.nodeValue){
        // Já está em PT, restaura original (caso tenha sido traduzido antes e voltou para PT)
        n.nodeValue=orig;
        return;
      }
      if(translated!==trim){
        const lead=orig.match(/^\s*/)[0]||'', trail=orig.match(/\s*$/)[0]||'';
        n.nodeValue=lead+translated+trail;
      }
    });
    // aria-label / title também guardam o PT original em dataset, para re-traduzir certo.
    document.querySelectorAll('[aria-label]').forEach(el=>{
      if(!el.dataset.ptAria) el.dataset.ptAria=el.getAttribute('aria-label')||'';
      if(el.dataset.ptAria) el.setAttribute('aria-label',tr(el.dataset.ptAria));
    });
    document.querySelectorAll('[title]').forEach(el=>{
      if(!el.dataset.ptTitle) el.dataset.ptTitle=el.getAttribute('title')||'';
      if(el.dataset.ptTitle) el.setAttribute('title',tr(el.dataset.ptTitle));
    });
    if($('#languageTitle')) {
      const titles={pt:'Idioma',en:'Language',es:'Idioma',fr:'Langue',de:'Sprache',ja:'言語',ko:'언어','zh-CN':'语言','zh-TW':'語言',hi:'भाषा',it:'Lingua'};
      $('#languageTitle').textContent=titles[language]||'Idioma';
    }
  }
  // Centraliza re-render após troca de idioma (auditoria): HUD, pause, loja, canvas.
  function refreshCurrentLanguageUI(){
    applyLanguage();
    try{ if(typeof updateHUD==='function') updateHUD(); }catch(e){}
    try{ if(typeof updatePauseToggles==='function') updatePauseToggles(); }catch(e){}
    try{ if(typeof updateSoundButton==='function') updateSoundButton(); }catch(e){}
    try{ if(typeof resize==='function') resize(); }catch(e){}
    try{ if(typeof render==='function') render(); }catch(e){}
  }

  function chooseLanguage(value){
    if(!SUPPORTED_LANGUAGES.includes(value)) value='pt';
    language=value;storage.set('language',language);
    refreshCurrentLanguageUI();
    $('#languageScreen').classList.add('hidden');
    $('#start').classList.remove('hidden');
  }
  // Troca de idioma depois da primeira escolha (auditoria): a tela de idioma só aparecia 1x.
  // Para usar: adicione <button id="changeLanguage"> no #paused do index.html e chame reopenLanguageScreen().
  // Sem o botão, nada muda no jogo atual — a função só fica disponível.
  function reopenLanguageScreen(){
    const ls=$('#languageScreen'); if(!ls) return;
    ls.classList.remove('hidden');
    const st=$('#start'); if(st) st.classList.add('hidden');
  }
  window.ZANON_reopenLanguageScreen = reopenLanguageScreen;
  // Liga o botão IDIOMA do pause (se existir no index.html) — sem ele, nada quebra.
  try{ const cl=$('#changeLanguage'); if(cl) cl.onclick=()=>reopenLanguageScreen(); }catch(e){}

  let W=0,H=0,dpr=1,last=0,raf=0;
  let mode='menu', pausedFrom='playing', soundOn=storage.get('sound',true), musicOn=storage.get('music',true), vibrationOn=storage.get('vibration',true);
  function updateSoundButton(){
    const button=$('#sound');
    if(!button)return;
    const labels={
      pt:['Som: ligado','Som: desligado'], en:['Sound: on','Sound: off'],
      es:['Sonido: activado','Sonido: desactivado'], fr:['Son : activé','Son : désactivé'],
      de:['Ton: an','Ton: aus'], ja:['音: オン','音: オフ'], ko:['소리: 켜짐','소리: 꺼짐'],
      'zh-CN':['声音：开','声音：关'],'zh-TW':['聲音：開','聲音：關'],
      hi:['ध्वनि: चालू','ध्वनि: बंद'], it:['Audio: attivo','Audio: disattivato']
    };
    const pair=labels[language]||labels.pt;
    const label=pair[soundOn?0:1];
    button.setAttribute('aria-label',label);
    button.setAttribute('title',label);
    button.setAttribute('aria-pressed',String(soundOn));
  }
  function updatePauseToggles(){
    const musicButton=$('#musicToggle'),vibrationButton=$('#vibrationToggle');
    if(musicButton){
      const labels={
        pt:['Música: ligada','Música: desligada'],en:['Music: on','Music: off'],
        es:['Música: activada','Música: desactivada'],fr:['Musique : activée','Musique : désactivée'],
        de:['Musik: an','Musik: aus'],ja:['音楽: オン','音楽: オフ'],ko:['음악: 켜짐','음악: 꺼짐'],
        'zh-CN':['音乐：开','音乐：关'],'zh-TW':['音樂：開','音樂：關'],
        hi:['संगीत: चालू','संगीत: बंद'],it:['Musica: attiva','Musica: disattivata']
      };
      const pair=labels[language]||labels.pt; const label=pair[musicOn?0:1];
      musicButton.setAttribute('aria-label',label);musicButton.setAttribute('title',label);
      musicButton.setAttribute('aria-pressed',String(musicOn));
    }
    if(vibrationButton){
      const label=tr(vibrationOn?'Vibração: ligada':'Vibração: desligada');
      vibrationButton.setAttribute('aria-label',label);vibrationButton.setAttribute('title',label);
      vibrationButton.setAttribute('aria-pressed',String(vibrationOn));
    }
  }
  let score=0;
  const storedBest=Number(storage.get('best',0));
  const storedCoins=Number(storage.get('coins',0));
  let best=Number.isFinite(storedBest)?Math.max(0,Math.floor(storedBest)):0;
  let coins=Number.isFinite(storedCoins)?Math.max(0,Math.floor(storedCoins)):0;
  let skip25Unlocked=storage.get('skip25Unlocked',false)||best>=70;
  if(skip25Unlocked)storage.set('skip25Unlocked',true);
  let skip25EligibleThisRun=false,skip25ModalOpen=false;
  let targetX=0, pointerX=0, dragging=false, shake=0, flash=0;
  let startHintRemaining=0;
  // Arte da bola 1% será adicionada depois. A conquista já é persistida
  // em zanon1_secretUnlocks.onePercentBall; não equipar uma skin sem arte.
  const savedSecretUnlocks=storage.get('secretUnlocks',{});
  const secretUnlocks=savedSecretUnlocks&&typeof savedSecretUnlocks==='object'&&!Array.isArray(savedSecretUnlocks)?savedSecretUnlocks:{};
  const secretMissions=[
    {id:'dual',name:'NÃO APRENDE NUNCA',coins:25,detail:'Sobreviveu a dois castigos de duas bolas'},
    {id:'blackout',name:'NO ESCURO EU RESOLVO',coins:25,detail:'Atravessou o blackout sem ser salvo'},
    {id:'fast',name:'FRIO SOB PRESSÃO',coins:20,detail:'12 rebatidas com a bola acelerada'},
    {id:'basket',name:'CESTA NO INFERNO',coins:30,detail:'Cesta no 120+ e três rebatidas de descanso'}
  ];
  let secretRun=null,secretQueue=[],secretNotice=null,secretNoticeUntil=0,secretNextNotice=0;
  const secretPanel=document.createElement('div');secretPanel.id='secretNotice';secretPanel.setAttribute('role','status');
  $('#scorePill').appendChild(secretPanel);
  const secretGlow=document.createElement('div');secretGlow.id='secretGlow';secretGlow.setAttribute('aria-hidden','true');document.body.appendChild(secretGlow);
  function resetSecrets(){
    const previous=storage.get('lastSecretMission',null);
    const pool=secretMissions.filter(m=>m.id!==previous);
    const mission=pool[Math.floor(Math.random()*pool.length)];
    storage.set('lastSecretMission',mission.id);
    secretRun={mission:mission.id,won:false,dualWins:0,fastHits:0,blackout:false,blackoutFailed:false,basketPending:false,rewards:[]};
    secretQueue=[];secretNotice=null;secretNoticeUntil=0;secretNextNotice=0;
    secretPanel.className='';secretGlow.className='';
  }
  function awardSecret(id){
    if(!secretRun||secretRun.won||secretRun.mission!==id)return;
    const mission=secretMissions.find(m=>m.id===id);
    secretRun.won=true;coins+=mission.coins;runStats.coins+=mission.coins;
    storage.set('coins',coins);updateHUD();
    const reward={name:mission.name,detail:mission.detail,prize:'+'+mission.coins+' MOEDAS',coins:mission.coins};
    secretRun.rewards.push(reward);secretQueue.push(reward);
  }
  function secretScoreChanged(before){
    if(!secretRun)return;
    if(before<96&&score===96){secretRun.blackout=true;secretRun.blackoutFailed=restHits>0;}
    if(secretRun.blackout&&score>=96&&score<=100&&restHits>0)secretRun.blackoutFailed=true;
    // Bônus de pontos não substituem as rebatidas do percurso completo.
    if(secretRun.blackout&&score-before>1&&before<=100)secretRun.blackoutFailed=true;
    if(secretRun.blackout&&before<=100&&score>100){
      if(!secretRun.blackoutFailed)awardSecret('blackout');
      secretRun.blackout=false;
    }
    if(score>=130&&runStartScore===0&&runStats.adRescues===0&&!secretUnlocks.onePercentBall){
      secretUnlocks.onePercentBall=true;storage.set('secretUnlocks',secretUnlocks);
      const reward={name:'ALÉM DO ABISMO',detail:'130 do zero, sem continuação por vídeo',prize:'BOLA 1% DESBLOQUEADA',coins:0};
      secretRun.rewards.push(reward);secretQueue.push(reward);
    }
  }
  function secretRebound(){
    if(!secretRun)return;
    if(modifiers.some(m=>m.type==='fast'&&m.end>elapsed)){
      secretRun.fastHits++;if(secretRun.fastHits>=12)awardSecret('fast');
    }else secretRun.fastHits=0;
  }
  function invalidateSecretSurvival(){
    if(!secretRun)return;
    if(secretRun.blackout)secretRun.blackoutFailed=true;
    secretRun.fastHits=0;secretRun.basketPending=false;
  }
  function updateSecretNotice(){
    if(secretNotice&&elapsed>=secretNoticeUntil){secretNotice=null;secretPanel.className='';secretGlow.className='';secretNextNotice=elapsed+.4;}
    if(!secretNotice&&secretQueue.length&&elapsed>=secretNextNotice){
      secretNotice=secretQueue.shift();secretNoticeUntil=elapsed+2;
      secretPanel.replaceChildren();
      const title=document.createElement('strong'),detail=document.createElement('small');
      title.textContent=tr('SEGREDO! ')+tr(secretNotice.prize);detail.textContent=tr(secretNotice.detail);
      secretPanel.append(title,detail);secretPanel.className='show';
      secretGlow.className='';void secretGlow.offsetWidth;secretGlow.className='show';
      tone(880,.12,'sine',.035);tone(1175,.18,'sine',.03,.1);
      if(secretNotice.coins){
        const from=$('#scorePill').getBoundingClientRect(),to=$('#coinsPill').getBoundingClientRect();
        for(let i=0;i<5;i++)coinFlights.push({x:from.left+from.width/2+i*4,y:from.top+from.height/2,toX:to.left+to.width/2,toY:to.top+to.height/2,age:-i*.06});
      }
    }
  }
  const MAX_SCORE=150;
  let nextCoin=6, nextBox=15, elapsed=0, controlsSign=1, adTimer=0, reviveTimer=0;
  let firstBox=true, paddleImpact=0, barrierPulse=0;
  let paddleFlashes=[];
  let teleportPulses=[];
  let defeatAnimation=null;
  let nextGoldenMark=25,goldenQueue=[];
  let coinFlights=[];
  const runStats={rebounds:0,coins:0,boxes:0,trolls:0,reliefs:0,adRescues:0,extraLivesUsed:0};
  let runStartScore=0,runPreviousBest=0,recordAnnounced=false,achievementUntil=0;
  let windX=0, windTarget=0, windClock=0, curvePhase=0;
  const dangerZone={x:0,y:0,w:0,h:0,ttl:0,hitCooldown:0};
  let revivesLeft=3,smallTrollRetired=false;
  let rescueUntil=0,rescueDuration=3;
  function rescueProtected(){return elapsed<rescueUntil;}
  let modifiers=[], objects=[], particles=[];
  let restHits=0, freeBoxQueued=false;
  function gameplayScore(){return restHits>0?0:score;}
  const mysteryCurse={ignored:0,armed:false,dual:null};
  const eventState={
    activeEffect:null,
    activeChallenge:null,
    lastEvent:null,
    lastCategory:null,
    cooldownUntil:0,
    hiddenLives:0,
    barrierCharges:0,
    megaPaddleUntil:0,
    fakeBallUntil:0
  };

  const skins = [
    {id:'soccer', name:'Principal', icon:'⚽️', price:0, color:'#ffffff'},
    {id:'fire', name:'Fogo', icon:'🔥', price:30, color:'#ff5c35'},
    {id:'donut', name:'Donut', icon:'🍩', price:165, color:'#ff7eb6'},
    {id:'earth', name:'Terra', icon:'🌎', price:120, color:'#4fc3f7'},
    {id:'eight', name:'Bola 8', icon:'🎱', price:60, color:'#111111'},
    {id:'moon', name:'Lua', icon:'🌖', price:180, color:'#f2e7c7'},
    {id:'snow', name:'Neve', icon:'❄️', price:150, color:'#8fdcff'},
    {id:'galaxy', name:'Galáxia', icon:'✨', price:200, color:'#c898ff', image:'assets/balls/galaxy_orb_final.PNG', trailPalette:['#6b48d8','#dc7bea','#fff1b8']},
    {id:'lava', name:'Lava', icon:'🌋', price:220, color:'#ff6d3c', image:'assets/balls/lava_ball_emoji.PNG', trailPalette:['#d93814','#ff7a1e','#ffe08b']},
    {id:'plasma', name:'Plasma', icon:'🔮', price:240, color:'#8d7dff', image:'assets/balls/plasma_ball_emoji_correct.PNG', trailPalette:['#5132e8','#bc55ff','#b9edff']},
    {id:'potion', name:'Poção', icon:'🧪', price:260, color:'#ff9a38', image:'assets/balls/potion_ball_emoji.PNG', trailPalette:['#d96a1f','#ffad42','#fff0a8']},
    {id:'unicorn', name:'Unicórnio', icon:'🦄', price:280, color:'#ff9edc', image:'assets/balls/unicorn_ball_redesign.PNG', trailPalette:['#ff75bd','#8fdcff','#fff0a8']}
  ];
  const paddleSkins = [
    {id:'classic',name:'Clássico',icon:'▬',price:0,color:'#f6f8ff'},
    {id:'poolCue',name:'Taco de Sinuca',icon:'🎱',price:45,color:'#b87936',image:'assets/paddles/pool_cue_emoji.PNG'},
    {id:'lightsaber',name:'Sabre Duplo',icon:'⚡',price:80,color:'#52c8ff',image:'assets/paddles/double_saber_black_bg_final.PNG'},
    {id:'magicStaff',name:'Cajado Mágico',icon:'✦',price:95,color:'#f08cff',image:'assets/paddles/pink_jeweled_staff.PNG'},
    {id:'laserPanel',name:'Bastão de Diamante',icon:'💎',price:110,color:'#e7d5ff',image:'assets/paddles/bastao_diamante_duplo.PNG'},
    {id:'katana',name:'Katana',icon:'⚔',price:130,color:'#d8e7ff',image:'assets/paddles/katana_clean_chroma.PNG'},
    {id:'runeSword',name:'Espada Rúnica',icon:'✧',price:145,color:'#68a8ff',image:'assets/paddles/blue_runic_no_green.PNG'},
    {id:'rgbRail',name:'Espada de Fogo',icon:'🔥',price:160,color:'#ff7b42',image:'assets/paddles/taco_fogo_bastao_final.PNG'},
    {id:'candySpatula',name:'Espátula Doce',icon:'🍭',price:175,color:'#ff9fd7',image:'assets/paddles/candy_spatula_final.PNG'},
    {id:'iceBlade',name:'Lâmina de Gelo',icon:'❄',price:190,color:'#aeeaff',image:'assets/paddles/ice_sword_polished.PNG'},
    {id:'straw',name:'Canudo Doce',icon:'🌈',price:210,color:'#ff8fc8',image:'assets/paddles/candy_straw_ultra_final.PNG'}
  ];
  const skinImages={};

  // Cesta de basquete: imagem visual separada da colisão.
  const basketballHoopImage=new Image();
  let basketballHoopReady=false;
  basketballHoopImage.onload=()=>{basketballHoopReady=true;if(mode==='playing')render();};
  basketballHoopImage.onerror=()=>{basketballHoopReady=false;};
  basketballHoopImage.src='assets/images/basketball_hoop_final.png';
  const assetCropCache={};
  function getAssetCrop(skin){
    if(!skin||!skin.image)return null;
    const img=skinImages[skin.id];
    if(!img||!img.complete||!img.naturalWidth||!img.naturalHeight)return null;
    const key=skin.id+':'+img.naturalWidth+'x'+img.naturalHeight;
    if(assetCropCache[key])return assetCropCache[key];
    try{
      const scan=document.createElement('canvas');
      scan.width=img.naturalWidth;scan.height=img.naturalHeight;
      const s=scan.getContext('2d',{willReadFrequently:true});
      s.clearRect(0,0,scan.width,scan.height);s.drawImage(img,0,0);
      const data=s.getImageData(0,0,scan.width,scan.height).data;
      let minX=scan.width,maxX=-1,minY=scan.height,maxY=-1;
      for(let y=0;y<scan.height;y++)for(let x=0;x<scan.width;x++){
        if(data[(y*scan.width+x)*4+3]>2){
          if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;
        }
      }
      if(maxX<minX)return null;
      return assetCropCache[key]={sx:minX,sy:minY,sw:maxX-minX+1,sh:maxY-minY+1};
    }catch(_){return null;}
  }
  function assetDrawSize(skin,maxW,maxH){
    const img=skinImages[skin.id],crop=getAssetCrop(skin);
    if(!img)return {w:maxW,h:maxH};
    const sw=crop?crop.sw:img.naturalWidth,sh=crop?crop.sh:img.naturalHeight;
    const scale=Math.min(maxW/Math.max(1,sw),maxH/Math.max(1,sh));
    return {w:sw*scale,h:sh*scale};
  }
  function drawAsset(c,skin,x,y,maxW,maxH){
    const img=skinImages[skin.id];if(!img)return null;
    const crop=getAssetCrop(skin),size=assetDrawSize(skin,maxW,maxH);
    c.save();c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
    if(crop)c.drawImage(img,crop.sx,crop.sy,crop.sw,crop.sh,x-size.w/2,y-size.h/2,size.w,size.h);
    else c.drawImage(img,x-size.w/2,y-size.h/2,size.w,size.h);
    c.restore();return size;
  }
  const paddleVisualMetricsCache={};
  const emojiVisualMetricsCache={};
  function getPaddleVisualMetrics(skin){
    const fallback={centerX:.5,topY:0};
    if(!skin||!skin.image)return fallback;
    const img=skinImages[skin.id];
    if(!img||!img.complete||!img.naturalWidth||!img.naturalHeight)return fallback;
    const key=skin.id+':'+img.naturalWidth+'x'+img.naturalHeight;
    if(paddleVisualMetricsCache[key])return paddleVisualMetricsCache[key];
    try{
      const scan=document.createElement('canvas');
      scan.width=img.naturalWidth;scan.height=img.naturalHeight;
      const s=scan.getContext('2d',{willReadFrequently:true});
      s.clearRect(0,0,scan.width,scan.height);s.drawImage(img,0,0);
      const data=s.getImageData(0,0,scan.width,scan.height).data;
      let minX=scan.width,maxX=-1,minY=scan.height,maxY=-1;
      for(let y=0;y<scan.height;y++)for(let x=0;x<scan.width;x++){
        if(data[(y*scan.width+x)*4+3]>12){
          if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;
        }
      }
      if(maxX<minX)return fallback;
      const metrics={
        centerX:((minX+maxX+1)/2)/scan.width,
        topY:minY/scan.height
      };
      paddleVisualMetricsCache[key]=metrics;return metrics;
    }catch(_){return fallback;}
  }
  function getEmojiVisualMetrics(icon,fontSize=48){
    const key=icon+':'+fontSize;
    if(emojiVisualMetricsCache[key])return emojiVisualMetricsCache[key];
    const fallback={centerOffsetX:0,bottomFromLogicalY:fontSize*.46};
    try{
      const pad=Math.ceil(fontSize*1.6),scan=document.createElement('canvas');
      scan.width=pad*2;scan.height=pad*2;
      const s=scan.getContext('2d',{willReadFrequently:true});
      const logicalX=pad,logicalY=pad;
      s.clearRect(0,0,scan.width,scan.height);
      s.font=`normal ${fontSize}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
      s.textAlign='center';s.textBaseline='middle';s.fillText(icon,logicalX,logicalY+1);
      const data=s.getImageData(0,0,scan.width,scan.height).data;
      let minX=scan.width,maxX=-1,minY=scan.height,maxY=-1;
      for(let y=0;y<scan.height;y++)for(let x=0;x<scan.width;x++){
        if(data[(y*scan.width+x)*4+3]>12){
          if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;
        }
      }
      if(maxX<minX)return fallback;
      const metrics={
        centerOffsetX:((minX+maxX+1)/2)-logicalX,
        bottomFromLogicalY:(maxY+1)-logicalY
      };
      emojiVisualMetricsCache[key]=metrics;return metrics;
    }catch(_){return fallback;}
  }
  const soccerPreviewGlyphCache={};
  function getSoccerPreviewGlyph(fontSize=48){
    const key=String(fontSize);
    if(soccerPreviewGlyphCache[key])return soccerPreviewGlyphCache[key];
    try{
      const pad=Math.ceil(fontSize*1.7),scan=document.createElement('canvas');
      scan.width=pad*2;scan.height=pad*2;
      const s=scan.getContext('2d',{willReadFrequently:true});
      s.clearRect(0,0,scan.width,scan.height);
      s.font=`normal ${fontSize}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
      s.textAlign='center';s.textBaseline='middle';
      s.fillText('⚽️',pad,pad);
      const data=s.getImageData(0,0,scan.width,scan.height).data;
      let minX=scan.width,maxX=-1,minY=scan.height,maxY=-1;
      for(let yy=0;yy<scan.height;yy++)for(let xx=0;xx<scan.width;xx++){
        if(data[(yy*scan.width+xx)*4+3]>2){
          if(xx<minX)minX=xx;if(xx>maxX)maxX=xx;if(yy<minY)minY=yy;if(yy>maxY)maxY=yy;
        }
      }
      if(maxX<minX||maxY<minY)throw new Error('emoji sem pixels');
      const w=maxX-minX+1,h=maxY-minY+1,crop=document.createElement('canvas');
      crop.width=w;crop.height=h;
      crop.getContext('2d').drawImage(scan,minX,minY,w,h,0,0,w,h);
      return soccerPreviewGlyphCache[key]={canvas:crop,w,h};
    }catch(_){
      return soccerPreviewGlyphCache[key]={canvas:null,w:fontSize,h:fontSize};
    }
  }
  function drawSoccerPreviewGlyph(c,x,centerY,fontSize=48){
    const glyph=getSoccerPreviewGlyph(fontSize);
    if(glyph.canvas){
      c.save();c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
      c.drawImage(glyph.canvas,x-glyph.w/2,centerY-glyph.h/2,glyph.w,glyph.h);
      c.restore();
      return glyph;
    }
    c.save();
    c.font=`normal ${fontSize}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
    c.textAlign='center';c.textBaseline='middle';c.fillText('⚽️',x,centerY);
    c.restore();
    return glyph;
  }

  const snowPreviewGlyphCache={};
  function getSnowPreviewGlyph(fontSize=48){
    const key=String(fontSize);
    if(snowPreviewGlyphCache[key])return snowPreviewGlyphCache[key];
    try{
      const pad=Math.ceil(fontSize*1.7),scan=document.createElement('canvas');
      scan.width=pad*2;scan.height=pad*2;
      const s=scan.getContext('2d',{willReadFrequently:true});
      s.clearRect(0,0,scan.width,scan.height);
      s.font=`normal ${fontSize}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
      s.textAlign='center';s.textBaseline='middle';
      s.fillText('❄️',pad,pad);
      const data=s.getImageData(0,0,scan.width,scan.height).data;
      let minX=scan.width,maxX=-1,minY=scan.height,maxY=-1;
      for(let yy=0;yy<scan.height;yy++)for(let xx=0;xx<scan.width;xx++){
        if(data[(yy*scan.width+xx)*4+3]>2){
          if(xx<minX)minX=xx;if(xx>maxX)maxX=xx;if(yy<minY)minY=yy;if(yy>maxY)maxY=yy;
        }
      }
      if(maxX<minX||maxY<minY)throw new Error('emoji sem pixels');
      const w=maxX-minX+1,h=maxY-minY+1,crop=document.createElement('canvas');
      crop.width=w;crop.height=h;
      crop.getContext('2d').drawImage(scan,minX,minY,w,h,0,0,w,h);
      return snowPreviewGlyphCache[key]={canvas:crop,w,h};
    }catch(_){
      return snowPreviewGlyphCache[key]={canvas:null,w:fontSize,h:fontSize};
    }
  }
  function drawSnowPreviewGlyph(c,x,centerY,fontSize=48){
    const glyph=getSnowPreviewGlyph(fontSize);
    if(glyph.canvas){
      c.save();c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
      c.drawImage(glyph.canvas,x-glyph.w/2,centerY-glyph.h/2,glyph.w,glyph.h);
      c.restore();
      return glyph;
    }
    c.save();
    c.font=`normal ${fontSize}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
    c.textAlign='center';c.textBaseline='middle';c.fillText('❄️',x,centerY);
    c.restore();
    return glyph;
  }
  function preloadSkinAssets(){
    [...skins,...paddleSkins].forEach(item=>{if(!item.image)return;const img=new Image();img.onload=()=>{skinImages[item.id]=img;if(shopOpen)renderShop();};img.src=item.image;});
  }
  const validBallSkinIds=new Set(skins.map(s=>s.id));
  const savedOwned=storage.get('owned',['soccer']);
  let owned=(Array.isArray(savedOwned)?savedOwned:[]).filter(id=>validBallSkinIds.has(id));
  if(!owned.includes('soccer'))owned.unshift('soccer');
  let selected=storage.get('skin','soccer');
  if(!validBallSkinIds.has(selected))selected='soccer';
  storage.set('owned',owned);storage.set('skin',selected);
  const validPaddleSkinIds=new Set(paddleSkins.map(s=>s.id));
  const savedOwnedPaddles=storage.get('ownedPaddles',['classic']);
  let ownedPaddles=(Array.isArray(savedOwnedPaddles)?savedOwnedPaddles:[]).filter(id=>validPaddleSkinIds.has(id));
  if(!ownedPaddles.includes('classic'))ownedPaddles.unshift('classic');
  let selectedPaddle=storage.get('paddleSkin','classic');
  if(!validPaddleSkinIds.has(selectedPaddle))selectedPaddle='classic';
  storage.set('ownedPaddles',ownedPaddles);storage.set('paddleSkin',selectedPaddle);
  preloadSkinAssets();
  let activeSkin=()=>skins.find(s=>s.id===selected)||skins[0];

  const paddle={x:0,y:0,w:145,h:24,baseW:145,vx:0};
  // Padronização visual: a skin não pode parecer vantagem/desvantagem.
  // Mantemos a colisão original e unificamos apenas o desenho.
  const PADDLE_VISUAL_THICKNESS=16;
  const ball={x:0,y:0,r:15,vx:0,vy:0,trail:[]};
  const fakeBall={active:false,x:0,y:0,r:15,vx:0,vy:0,trail:[]};
  let ballBaseRadius=15;
  const BALL_MIN_SCALE=.70;
  const BALL_SHRINK_END_SCORE=90;
  function ballScaleForScore(points=score){
    const progress=clamp(points/BALL_SHRINK_END_SCORE,0,1);
    return 1-(1-BALL_MIN_SCALE)*progress;
  }
  function syncBallSize(){
    ball.r=ballBaseRadius*ballScaleForScore(score);
    fakeBall.r=ball.r;
  }

  // ===== RASTROS DAS 6 BOLAS =====
  // Regra visual: todas usam exatamente o mesmo alcance da bola de fogo atual.
  // O corpo dos emojis também usa o mesmo font-size (2*r) da 🔥.
  const TRAIL_PROFILES={
    soccer:{limit:12,fade:4},
    donut:{limit:12,fade:4},
    earth:{limit:12,fade:4},
    eight:{limit:12,fade:4},
    moon:{limit:12,fade:4},
    snow:{limit:12,fade:4},
    galaxy:{limit:12,fade:4},
    lava:{limit:12,fade:4},
    plasma:{limit:12,fade:4},
    potion:{limit:12,fade:4},
    unicorn:{limit:12,fade:4}
  };

  function clearSkinTrailParticles(){
    ball._trailClock=0;fakeBall._trailClock=0;
  }
  function updateSkinTrailParticles(){ /* rastros usam somente o histórico curto da bola */ }
  function drawSkinTrailParticles(){ /* mantido como no-op para preservar o loop atual */ }

  function drawTrailStar(c,x,y,r,color,alpha,rot=0){
    c.save();c.translate(x,y);c.rotate(rot);c.globalAlpha=alpha;c.fillStyle=color;
    c.beginPath();
    for(let i=0;i<8;i++){
      const a=i*Math.PI/4-Math.PI/2,rr=i%2===0?r:r*.34;
      const px=Math.cos(a)*rr,py=Math.sin(a)*rr;
      if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
    }
    c.closePath();c.fill();c.restore();
  }
  function drawTrailSparkle(c,x,y,r,color,alpha,rot=0){
    c.save();c.translate(x,y);c.rotate(rot);c.globalAlpha=alpha;c.strokeStyle=color;c.lineCap='round';
    c.lineWidth=Math.max(1,r*.24);
    c.beginPath();c.moveTo(0,-r);c.lineTo(0,r);c.moveTo(-r,0);c.lineTo(r,0);c.stroke();
    c.lineWidth=Math.max(.8,r*.16);
    c.beginPath();c.moveTo(-r*.55,-r*.55);c.lineTo(r*.55,r*.55);c.moveTo(r*.55,-r*.55);c.lineTo(-r*.55,r*.55);c.stroke();
    c.restore();
  }
  function drawContinuousTrailBody(c,trail,r,colorA,colorB,alpha=.42,width=.48){
    const points=trail.slice(-12);if(points.length<2)return;
    c.save();c.lineCap='round';c.lineJoin='round';
    for(let i=0;i<points.length-1;i++){
      const p=points[i],next=points[i+1],strength=(i+1)/points.length;
      const life=clamp(p.life??1,0,1);
      c.globalAlpha=life*strength*alpha;
      c.strokeStyle=i%2?colorA:colorB;
      c.lineWidth=Math.max(1,r*(.12+strength*width));
      c.beginPath();c.moveTo(p.x,p.y);c.lineTo(next.x,next.y);c.stroke();
    }
    c.restore();c.globalAlpha=1;
  }

  function drawSoccerTrail(c,trail,r,time){
    // Mesmo desenho/alcance do 🔥; muda apenas a paleta e a textura para grama.
    const points=trail.slice(-12);
    const greens=['#1f8d35','#35b54a','#63cb59','#9be27c'];
    for(let i=0;i<points.length-1;i++){
      const p=points[i],next=points[i+1],strength=(i+1)/points.length;
      const size=r*(.18+strength*.52),flicker=Math.sin(time*19+i*2.4)*size*.32;
      const life=clamp(p.life??1,0,1);
      c.save();c.translate(p.x,p.y);c.rotate(Math.atan2(next.y-p.y,next.x-p.x)-Math.PI/2);
      c.globalAlpha=life*strength*.65;
      c.fillStyle=i%2?'#42b84e':'#247f34';c.shadowColor='#55c95d';c.shadowBlur=7;
      c.beginPath();c.moveTo(-size,0);c.quadraticCurveTo(-size,-size,flicker,-size*2.7);
      c.quadraticCurveTo(size,-size,size,0);c.quadraticCurveTo(0,size,-size,0);c.fill();
      // Textura de grama dentro da mesma silhueta do fogo.
      c.shadowBlur=0;c.lineCap='round';
      for(let j=0;j<4;j++){
        const bx=(-.52+j*.35)*size;
        const h=size*(.62+.16*((i+j)%3));
        c.globalAlpha=life*strength*(.34+.07*j);
        c.strokeStyle=greens[(i+j)%greens.length];
        c.lineWidth=Math.max(.7,size*.10);
        c.beginPath();c.moveTo(bx,size*.12);c.quadraticCurveTo(bx+size*.08,-h*.35,bx+size*.16,-h);c.stroke();
      }
      c.globalAlpha=life*strength*.75;c.fillStyle='#b8ee8d';
      c.beginPath();c.arc(0,0,size*.34,0,Math.PI*2);c.fill();
      c.restore();
    }
  }

  function drawDonutTrail(c,trail,r,time,preview=false){
    // Mesmo desenho/alcance do 🔥; rosa predominante com textura de granulados coloridos.
    const points=trail.slice(-12);
    const sprinkles=['#ff72b5','#ff94c8','#8fd4ff','#ffd95a','#8ee46d'];
    for(let i=0;i<points.length-1;i++){
      const p=points[i],next=points[i+1],strength=(i+1)/points.length;
      const size=r*(.18+strength*.52),flicker=Math.sin(time*19+i*2.4)*size*.32;
      const life=clamp(p.life??1,0,1);
      c.save();c.translate(p.x,p.y);c.rotate(Math.atan2(next.y-p.y,next.x-p.x)-Math.PI/2);
      c.globalAlpha=life*strength*.65;
      c.fillStyle=i%2?'#ff78b9':'#ff4f9f';c.shadowColor='#ff79bb';c.shadowBlur=7;
      c.beginPath();c.moveTo(-size,0);c.quadraticCurveTo(-size,-size,flicker,-size*2.7);
      c.quadraticCurveTo(size,-size,size,0);c.quadraticCurveTo(0,size,-size,0);c.fill();
      // Granulados pequenos sobre a mesma cauda.
      c.shadowBlur=0;c.lineCap='round';
      for(let j=0;j<5;j++){
        const phase=i*1.7+j*1.37;
        const sx=Math.sin(phase)*size*.48;
        const sy=-size*(.18+.34*(j/4));
        const len=Math.max(1,size*.23);
        c.save();c.translate(sx,sy);c.rotate(phase+time*.55);
        c.globalAlpha=life*strength*.82;c.strokeStyle=sprinkles[(i+j)%sprinkles.length];
        c.lineWidth=Math.max(1,size*.10);
        c.beginPath();c.moveTo(-len*.5,0);c.lineTo(len*.5,0);c.stroke();c.restore();
      }
      c.globalAlpha=life*strength*.78;c.fillStyle='#ffd1e8';
      c.beginPath();c.arc(0,0,size*.34,0,Math.PI*2);c.fill();
      c.restore();
    }
  }

  function drawBlueFireTrail(c,trail,r,time){
    // Mesma geometria, tamanho e duração do rastro 🔥; apenas a paleta muda para azul.
    const points=trail.slice(-12);
    for(let i=0;i<points.length-1;i++){
      const p=points[i],next=points[i+1],strength=(i+1)/points.length;
      const size=r*(.18+strength*.52),flicker=Math.sin(time*19+i*2.4)*size*.32;
      c.save();c.translate(p.x,p.y);c.rotate(Math.atan2(next.y-p.y,next.x-p.x)-Math.PI/2);
      c.globalAlpha=clamp(p.life??1,0,1)*strength*.65;
      c.fillStyle=i%2?'#31a8ff':'#146dff';c.shadowColor='#269dff';c.shadowBlur=7;
      c.beginPath();c.moveTo(-size,0);c.quadraticCurveTo(-size,-size,flicker,-size*2.7);
      c.quadraticCurveTo(size,-size,size,0);c.quadraticCurveTo(0,size,-size,0);c.fill();
      c.shadowBlur=0;c.fillStyle='#bfeaff';c.beginPath();c.arc(0,0,size*.42,0,Math.PI*2);c.fill();c.restore();
    }
  }

  function drawSnowTrail(c,trail,r,time){
    // Mesmo formato e alcance dos rastros atuais, em azul bebê com brilho gelado.
    const points=trail.slice(-12);
    for(let i=0;i<points.length-1;i++){
      const p=points[i],next=points[i+1],strength=(i+1)/points.length;
      const size=r*(.18+strength*.52),flicker=Math.sin(time*19+i*2.4)*size*.32;
      const life=clamp(p.life??1,0,1);
      c.save();c.translate(p.x,p.y);c.rotate(Math.atan2(next.y-p.y,next.x-p.x)-Math.PI/2);
      c.globalAlpha=life*strength*.64;
      c.fillStyle=i%2?'#8fdcff':'#bdeeff';c.shadowColor='#9fe5ff';c.shadowBlur=8;
      c.beginPath();c.moveTo(-size,0);c.quadraticCurveTo(-size,-size,flicker,-size*2.7);
      c.quadraticCurveTo(size,-size,size,0);c.quadraticCurveTo(0,size,-size,0);c.fill();
      c.shadowBlur=0;c.globalAlpha=life*strength*.84;c.fillStyle='#f4fdff';
      c.beginPath();c.arc(0,0,size*.37,0,Math.PI*2);c.fill();
      c.restore();
    }
  }

  function drawChalkTrail(c,trail,r,time,preview=false){
    // Mesmo desenho/alcance do 🔥; branco e azul com textura suave de fumaça/giz.
    const points=trail.slice(-12);
    for(let i=0;i<points.length-1;i++){
      const p=points[i],next=points[i+1],strength=(i+1)/points.length;
      const size=r*(.18+strength*.52),flicker=Math.sin(time*19+i*2.4)*size*.32;
      const life=clamp(p.life??1,0,1);
      c.save();c.translate(p.x,p.y);c.rotate(Math.atan2(next.y-p.y,next.x-p.x)-Math.PI/2);
      c.globalAlpha=life*strength*.58;
      c.fillStyle=i%2?'#dff3ff':'#84bfe8';c.shadowColor='#bfe6ff';c.shadowBlur=6;
      c.beginPath();c.moveTo(-size,0);c.quadraticCurveTo(-size,-size,flicker,-size*2.7);
      c.quadraticCurveTo(size,-size,size,0);c.quadraticCurveTo(0,size,-size,0);c.fill();
      // Textura de giz: poucas manchas simples, sem gradients pesados.
      c.shadowBlur=0;
      for(let j=0;j<3;j++){
        const phase=i*1.91+j*2.09;
        const x=Math.sin(phase)*size*.34;
        const y=-size*(.22+.27*j);
        c.globalAlpha=life*strength*(.20+.07*j);
        c.fillStyle=j%2?'#ffffff':'#a9d5f3';
        c.beginPath();c.ellipse(x,y,size*(.18+.03*j),size*(.10+.02*j),phase*.2,0,Math.PI*2);c.fill();
      }
      c.globalAlpha=life*strength*.70;c.fillStyle='#f7fcff';
      c.beginPath();c.arc(0,0,size*.34,0,Math.PI*2);c.fill();
      c.restore();
    }
  }

  function drawMoonTrail(c,trail,r,time,preview=false){
    // Mesmo desenho/alcance do 🔥; branco amarelado e brilhante.
    const points=trail.slice(-12);
    for(let i=0;i<points.length-1;i++){
      const p=points[i],next=points[i+1],strength=(i+1)/points.length;
      const size=r*(.18+strength*.52),flicker=Math.sin(time*19+i*2.4)*size*.32;
      const life=clamp(p.life??1,0,1);
      c.save();c.translate(p.x,p.y);c.rotate(Math.atan2(next.y-p.y,next.x-p.x)-Math.PI/2);
      c.globalAlpha=life*strength*.66;
      c.fillStyle=i%2?'#fff6c9':'#ffe89a';c.shadowColor='#fff0aa';c.shadowBlur=9;
      c.beginPath();c.moveTo(-size,0);c.quadraticCurveTo(-size,-size,flicker,-size*2.7);
      c.quadraticCurveTo(size,-size,size,0);c.quadraticCurveTo(0,size,-size,0);c.fill();
      c.shadowBlur=0;
      // Brilhos discretos preservando a mesma silhueta principal.
      if(i%2===0){
        const s=Math.max(1,size*.18);
        c.globalAlpha=life*strength*.72;c.strokeStyle='#ffffff';c.lineWidth=Math.max(.8,size*.07);c.lineCap='round';
        c.beginPath();c.moveTo(0,-size*.72-s);c.lineTo(0,-size*.72+s);c.moveTo(-s,-size*.72);c.lineTo(s,-size*.72);c.stroke();
      }
      c.globalAlpha=life*strength*.86;c.fillStyle='#fffdf0';
      c.beginPath();c.arc(0,0,size*.36,0,Math.PI*2);c.fill();
      c.restore();
    }
  }
  function offsetSafe(i,time,r){return Math.sin(i*1.73+time*1.9)*r*.20;}

  function drawPaletteTrail(c,trail,r,time,palette){
    const points=trail.slice(-12),outerA=palette[0],outerB=palette[1]||palette[0],core=palette[2]||'#ffffff';
    for(let i=0;i<points.length-1;i++){
      const p=points[i],next=points[i+1],strength=(i+1)/points.length;
      const size=r*(.18+strength*.52),flicker=Math.sin(time*19+i*2.4)*size*.32;
      const life=clamp(p.life??1,0,1);
      c.save();c.translate(p.x,p.y);c.rotate(Math.atan2(next.y-p.y,next.x-p.x)-Math.PI/2);
      c.globalAlpha=life*strength*.64;c.fillStyle=i%2?outerB:outerA;c.shadowColor=outerB;c.shadowBlur=8;
      c.beginPath();c.moveTo(-size,0);c.quadraticCurveTo(-size,-size,flicker,-size*2.7);
      c.quadraticCurveTo(size,-size,size,0);c.quadraticCurveTo(0,size,-size,0);c.fill();
      c.shadowBlur=0;c.globalAlpha=life*strength*.84;c.fillStyle=core;c.beginPath();c.arc(0,0,size*.37,0,Math.PI*2);c.fill();
      c.restore();
    }
  }

  function drawEmojiSkinTrail(c,skin,trail,r,time,preview=false){
    if(skin.trailPalette)return drawPaletteTrail(c,trail,r,time,skin.trailPalette);
    if(skin.id==='soccer')return drawSoccerTrail(c,trail,r,time);
    if(skin.id==='donut')return drawDonutTrail(c,trail,r,time,preview);
    if(skin.id==='earth')return drawBlueFireTrail(c,trail,r,time);
    if(skin.id==='eight')return drawChalkTrail(c,trail,r,time,preview);
    if(skin.id==='moon')return drawMoonTrail(c,trail,r,time,preview);
    if(skin.id==='snow')return drawSnowTrail(c,trail,r,time);
  }

  const colorStops=[
    {score:0,top:'#58c6ff',bottom:'#0a70ff',name:'Azul Bebê'},
    {score:10,top:'#1c7dff',bottom:'#0639b2',name:'Azul Royal'},
    {score:20,top:'#4147c8',bottom:'#17175e',name:'Índigo'},
    {score:25,top:'#463076',bottom:'#170b2f',name:'Roxo Meia-Noite'},
    {score:30,top:'#944dff',bottom:'#360075',name:'Violeta'},
    {score:40,top:'#ed3cbd',bottom:'#6f0758',name:'Magenta'},
    {score:50,top:'#ff4054',bottom:'#7a0619',name:'Vermelho Carmesim'},
    {score:60,top:'#ff8a28',bottom:'#8a3200',name:'Laranja Solar'},
    {score:70,top:'#ffe45b',bottom:'#8d7000',name:'Amarelo Dourado'},
    {score:80,top:'#4dde78',bottom:'#08713a',name:'Verde Esmeralda'},
    {score:85,top:'#92933b',bottom:'#3f4214',name:'Verde Oliva'},
    {score:90,top:'#8a5b3d',bottom:'#342016',name:'Marrom Terra'},
    {score:93,top:'#666c75',bottom:'#252a30',name:'Cinza Chumbo'},
    {score:95,top:'#343941',bottom:'#111418',name:'Grafite'},
    {score:96,top:'#000000',bottom:'#000000',name:'Modo Blackout'},
    {score:100,top:'#020308',bottom:'#000000',name:'Preto Absoluto'},
    {score:105,top:'#071a3d',bottom:'#020711',name:'Azul Abissal'},
    {score:110,top:'#075c78',bottom:'#012536',name:'Ciano Profundo'},
    {score:115,top:'#078c83',bottom:'#023f3b',name:'Turquesa Elétrica'},
    {score:120,top:'#35c85c',bottom:'#075525',name:'Verde Radioativo'},
    {score:125,top:'#a9dd32',bottom:'#405f08',name:'Verde Ácido'},
    {score:130,top:'#ffd33f',bottom:'#8b5b00',name:'Dourado Solar'},
    {score:135,top:'#ff851f',bottom:'#8e2d00',name:'Laranja Incandescente'},
    {score:140,top:'#ff304f',bottom:'#790018',name:'Vermelho Neon'},
    {score:145,top:'#d52cff',bottom:'#4a006b',name:'Ultravioleta'},
    {score:149,top:'#776cff',bottom:'#171345',name:'Luz Impossível'},
    {score:150,top:'#ffffff',bottom:'#bfd8ff',name:'150 · Vitória Absoluta'}
  ];
  function mixColor(a,b,t){
    const parse=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
    const x=parse(a),y=parse(b),m=x.map((v,i)=>Math.round(v+(y[i]-v)*t));
    return '#'+m.map(v=>v.toString(16).padStart(2,'0')).join('');
  }
  function visualState(value=gameplayScore()){
    value=Math.max(0,value);
    let from=colorStops[0],to=colorStops[colorStops.length-1];
    for(let i=0;i<colorStops.length-1;i++){
      if(value>=colorStops[i].score&&value<colorStops[i+1].score){from=colorStops[i];to=colorStops[i+1];break;}
      if(value>=colorStops[colorStops.length-1].score){from=to=colorStops[colorStops.length-1];}
    }
    const span=Math.max(1,to.score-from.score),t=clamp((value-from.score)/span,0,1);
    return {top:mixColor(from.top,to.top,t),bottom:mixColor(from.bottom,to.bottom,t),name:from.name,blackout:value>=96&&value<101};
  }

  function resize(){
    dpr=Math.min(devicePixelRatio||1,2);
    W=innerWidth; H=innerHeight;
    canvas.width=W*dpr; canvas.height=H*dpr;
    canvas.style.width=W+'px'; canvas.style.height=H+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.imageSmoothingEnabled=true;
    ctx.imageSmoothingQuality='high';
    paddle.y=H-Math.max(88,envSafeBottom()+62);
    paddle.x=clamp(paddle.x||W/2-paddle.w/2,8,W-paddle.w-8);
    if(mode==='menu'){ ball.x=W/2; ball.y=H*.38; }
  }
  function envSafeBottom(){ return 0; }

  let audioCtx=null,masterGain=null,sfxGain=null,noiseBuffer=null,musicGainNodes=[];
  let musicActive=false,musicStage=-1,musicFadeTimer=0,activeMusicPlayer=0;
  const MUSIC_VOLUME=.04;
  const MUSIC_CROSSFADE_MS=3000;
  const MUSIC_START_FADE_MS=4000;
  const audioStages=[
    {min:0,max:95,music:'gameplay.mp3'},
    {min:96,max:100,music:'phase96-100.mp3'},
    {min:101,max:150,music:'after100.mp3'}
  ];
  const sfxBuffers={coin:null,box:null,ball:null};
  const sfxLoading={coin:null,box:null,ball:null};
  const sfxSources={coin:'assets/audio/sfx/coin.mp3',box:'assets/audio/sfx/box.mp3',ball:'assets/audio/sfx/ball.mp3'};

  // A batida da bola usa HTMLAudio diretamente, independente do AudioContext.
  // Isso evita que uma falha no Web Audio deixe todas as colisões silenciosas.
  const ballAudioPlayers=Array.from({length:4},()=>{
    const audio=new Audio(new URL(sfxSources.ball,document.baseURI).href);
    audio.preload='auto';
    audio.playsInline=true;
    audio.volume=.42;
    audio.addEventListener('error',()=>{
      console.error('[1%] Erro no HTMLAudio da bola:',audio.error||'arquivo indisponível');
    });
    return audio;
  });
  let nextBallAudioPlayer=0;

  function playBallHtmlAudio(volume=.42,kind='paddle'){
    if(!soundOn)return false;
    // Tenta retomar o Web Audio sem torná-lo uma dependência do MP3.
    // A chamada inicial de ensureAudio() também acontece em startGame,
    // durante o gesto do usuário que inicia a partida.
    ensureAudio();
    const audio=ballAudioPlayers[nextBallAudioPlayer];
    nextBallAudioPlayer=(nextBallAudioPlayer+1)%ballAudioPlayers.length;
    try{
      audio.volume=clamp(volume,0,1);
      try{audio.currentTime=0;}catch{}
      const result=audio.play();
      if(result&&typeof result.catch==='function'){
        result.catch(error=>{
          console.warn('[1%] HTMLAudio da bola não conseguiu tocar:',error);
          ballFallbackSound(kind);
        });
      }
      return true;
    }catch(error){
      console.error('[1%] Falha ao iniciar HTMLAudio da bola:',error);
      return false;
    }
  }

  async function loadSfxBuffer(name){
    if(!sfxSources[name]||!ensureAudio())return null;
    if(sfxBuffers[name])return sfxBuffers[name];
    if(sfxLoading[name])return sfxLoading[name];

    const sourceUrl=new URL(sfxSources[name],document.baseURI).href;
    sfxLoading[name]=fetch(sourceUrl,{cache:'no-store'})
      .then(response=>{
        if(!response.ok)throw new Error('HTTP '+response.status+' ao buscar '+sourceUrl);
        return response.arrayBuffer();
      })
      .then(data=>{
        if(!data||data.byteLength<128)throw new Error('arquivo vazio ou pequeno demais');
        if(!audioCtx)throw new Error('AudioContext não foi inicializado');
        return audioCtx.decodeAudioData(data.slice(0));
      })
      .then(buffer=>{
        if(!buffer||!buffer.length||!buffer.duration)throw new Error('buffer de áudio inválido');
        sfxBuffers[name]=buffer;
        console.info('[1%] SFX carregado:',name,Math.round(buffer.duration*1000)+'ms');
        return buffer;
      })
      .catch(error=>{
        console.error('[1%] Falha ao carregar/decodificar SFX "'+name+'":',error);
        return null;
      })
      .finally(()=>{sfxLoading[name]=null;});

    return sfxLoading[name];
  }

  function preloadSfx(){
    if(!soundOn)return;
    ['coin','box','ball'].forEach(name=>{loadSfxBuffer(name);});
  }

  async function resumeAudioForPlayback(){
    if(!soundOn||!ensureAudio())return false;
    try{
      if(audioCtx.state!=='running')await audioCtx.resume();
      return !!audioCtx&&audioCtx.state==='running';
    }catch(error){
      console.warn('[1%] Não foi possível reativar o AudioContext:',error);
      return false;
    }
  }

  async function playDecodedSfx(buffer,volume=1,label='SFX'){
    if(!buffer||!soundOn)return false;
    if(!await resumeAudioForPlayback())return false;
    try{
      const source=audioCtx.createBufferSource();
      const gain=audioCtx.createGain();
      source.buffer=buffer;
      gain.gain.value=clamp(volume,0,1);
      source.connect(gain).connect(sfxGain);
      source.onended=()=>{try{source.disconnect();gain.disconnect();}catch{}};
      source.start(0);
      return true;
    }catch(error){
      console.error('[1%] Falha ao reproduzir '+label+':',error);
      return false;
    }
  }

  function playSfx(name,volume=1){
    if(!soundOn||!sfxSources[name])return;
    if(sfxBuffers[name]){
      playDecodedSfx(sfxBuffers[name],volume,name);
      return;
    }
    loadSfxBuffer(name).then(buffer=>{
      if(buffer)playDecodedSfx(buffer,volume,name);
    });
  }

  function stopSfx(){
    // Os SFX agora são BufferSources curtos e independentes.
    // Não há elementos <audio> persistentes para pausar.
  }
  const musicPlayers=[new Audio(),new Audio()];
  musicPlayers.forEach(a=>{a.preload='auto';a.loop=true;a.volume=0;a.playsInline=true;});

  function audioStageFor(points=score){
    return audioStages.findIndex(s=>points>=s.min&&points<=s.max);
  }
  function ensureAudio(){
    try{
      if(!audioCtx){
        audioCtx=new (window.AudioContext||window.webkitAudioContext)();
        masterGain=audioCtx.createGain();sfxGain=audioCtx.createGain();
        // O ganho principal controla apenas os efeitos sonoros.
        masterGain.gain.value=soundOn?1:0;sfxGain.gain.value=.72;
        sfxGain.connect(masterGain);
        // A música usa um canal independente: desligar os efeitos não a silencia.
        // O GainNode permite controlar o volume mesmo no iPhone/Safari.
        musicGainNodes=musicPlayers.map(()=>{
          const gain=audioCtx.createGain();
          gain.gain.value=0;
          gain.connect(audioCtx.destination);
          return gain;
        });
        musicPlayers.forEach((player,i)=>{
          player.volume=1;
          const source=audioCtx.createMediaElementSource(player);
          source.connect(musicGainNodes[i]);
        });
        masterGain.connect(audioCtx.destination);
        noiseBuffer=audioCtx.createBuffer(1,Math.floor(audioCtx.sampleRate*.7),audioCtx.sampleRate);
        const data=noiseBuffer.getChannelData(0);
        for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;
      }
      if(audioCtx.state!=='running'){
        audioCtx.resume().catch(error=>{
          console.warn('[1%] AudioContext continua suspenso:',error);
        });
      }
      masterGain.gain.setTargetAtTime(soundOn?1:0,audioCtx.currentTime,.03);
      return true;
    }catch(error){
      console.error('[1%] Não foi possível inicializar o áudio:',error);
      return false;
    }
  }
  function tone(freq=440,dur=.05,type='sine',vol=.035,delay=0){
    if(!ensureAudio())return;
    try{
      const now=audioCtx.currentTime+delay,o=audioCtx.createOscillator(),g=audioCtx.createGain();
      o.type=type;o.frequency.setValueAtTime(Math.max(28,freq),now);g.gain.setValueAtTime(Math.max(.0001,vol),now);
      g.gain.exponentialRampToValueAtTime(.0001,now+dur);o.connect(g).connect(sfxGain);o.start(now);o.stop(now+dur+.02);
    }catch{}
  }
  function noiseHit(dur=.12,vol=.015,cutoff=500,delay=0){
    if(!ensureAudio()||!noiseBuffer)return;
    const now=audioCtx.currentTime+delay,src=audioCtx.createBufferSource(),filter=audioCtx.createBiquadFilter(),gain=audioCtx.createGain();
    src.buffer=noiseBuffer;filter.type='lowpass';filter.frequency.value=cutoff;gain.gain.setValueAtTime(vol,now);gain.gain.exponentialRampToValueAtTime(.0001,now+dur);
    src.connect(filter).connect(gain).connect(sfxGain);src.start(now);src.stop(now+dur+.02);
  }
  function stopMusicPlayers(){
    clearInterval(musicFadeTimer);musicFadeTimer=0;
    musicPlayers.forEach((a,i)=>{
      a.pause();a.volume=1;
      if(musicGainNodes[i])musicGainNodes[i].gain.setValueAtTime(0,audioCtx?audioCtx.currentTime:0);
    });
  }
  function updateMusicStage(){
    const nextStage=audioStageFor();
    if(nextStage<0||nextStage===musicStage)return;
    if(!musicActive||!musicOn||!ensureAudio())return;
    // Só registra a fase depois de confirmar que o sistema de áudio está pronto.
    // Assim, uma falha temporária não bloqueia uma tentativa posterior.
    musicStage=nextStage;

    // Troca imediata de faixa ao cruzar 96 ou 101, sem crossfade.
    // O timer de fade inicial fica independente e continua seus 4 segundos.
    const wanted='assets/audio/music/'+audioStages[nextStage].music;
    const now=audioCtx.currentTime;

    musicPlayers.forEach((player,i)=>{
      const gain=musicGainNodes[i];
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(0,now);
      player.pause();
      player.volume=1;
    });

    const player=musicPlayers[activeMusicPlayer];
    const playerGain=musicGainNodes[activeMusicPlayer];
    if(player.dataset.src!==wanted){
      player.src=wanted;
      player.dataset.src=wanted;
      player.currentTime=0;
    }
    player.loop=true;
    player.volume=1;
    // Se o fade inicial já terminou, usa o volume normal; caso contrário,
    // o timer original continua elevando este mesmo GainNode gradualmente.
    if(!musicFadeTimer)playerGain.gain.setValueAtTime(MUSIC_VOLUME,audioCtx.currentTime);

    const requestedStage=nextStage;
    let playPromise;
    try{
      playPromise=player.play();
    }catch(error){
      console.warn('[1%] Não foi possível iniciar a música da fase:',audioStages[requestedStage].music,error);
      if(musicStage===requestedStage)musicStage=-1;
      return;
    }
    if(playPromise&&playPromise.catch){
      playPromise.catch(error=>{
        console.warn('[1%] Não foi possível iniciar a música da fase:',audioStages[requestedStage].music,error);
        if(musicStage===requestedStage)musicStage=-1;
      });
    }
  }
  function setMusicActive(active,fadeIn=false){
    musicActive=active;
    if(!active||!musicOn){stopMusicPlayers();return;}
    if(!ensureAudio())return;
    const nextStage=audioStageFor();
    if(nextStage<0)return;
    const stage=audioStages[nextStage],player=musicPlayers[activeMusicPlayer];
    const playerGain=musicGainNodes[activeMusicPlayer];
    const wanted='assets/audio/music/'+stage.music;
    musicStage=nextStage;
    clearInterval(musicFadeTimer);musicFadeTimer=0;
    musicPlayers.forEach((a,i)=>{
      if(i!==activeMusicPlayer){
        a.pause();a.volume=1;
        musicGainNodes[i].gain.setValueAtTime(0,audioCtx.currentTime);
      }
    });
    if(player.dataset.src!==wanted){
      player.src=wanted;player.dataset.src=wanted;player.currentTime=0;
    }
    player.loop=true;player.volume=1;
    playerGain.gain.cancelScheduledValues(audioCtx.currentTime);
    playerGain.gain.setValueAtTime(fadeIn?0:MUSIC_VOLUME,audioCtx.currentTime);
    const beginStartFade=()=>{
      if(!fadeIn||!musicActive||!musicOn||musicStage!==nextStage||player!==musicPlayers[activeMusicPlayer])return;
      const started=performance.now();
      clearInterval(musicFadeTimer);musicFadeTimer=0;
      musicFadeTimer=setInterval(()=>{
        const t=clamp((performance.now()-started)/MUSIC_START_FADE_MS,0,1);
        const currentGain=musicGainNodes[activeMusicPlayer];
        if(currentGain)currentGain.gain.setValueAtTime(MUSIC_VOLUME*t,audioCtx.currentTime);
        if(t>=1){
          clearInterval(musicFadeTimer);musicFadeTimer=0;
          if(musicActive&&musicOn&&musicGainNodes[activeMusicPlayer])musicGainNodes[activeMusicPlayer].gain.setValueAtTime(MUSIC_VOLUME,audioCtx.currentTime);
        }
      },50);
    };
    let playPromise;
    try{
      playPromise=player.play();
    }catch(error){
      console.warn('[1%] Não foi possível iniciar a música:',stage.music,error);
      if(musicStage===nextStage)musicStage=-1;
      return;
    }
    if(playPromise&&playPromise.then){
      playPromise.then(beginStartFade).catch(error=>{
        console.warn('[1%] Não foi possível iniciar a música:',stage.music,error);
        if(musicStage===nextStage)musicStage=-1;
      });
    }else beginStartFade();
  }
  function updateAdaptiveMusic(){
    if(musicActive&&musicOn)updateMusicStage();
  }
  function eightBallSound(progress=0){
    tone(1420*(1-progress*.5),.018,'triangle',.045);
    tone(420*(1-progress*.65),.085+progress*.06,'sine',.06);
    tone(220*(1-progress*.6),.065,'triangle',.015,.008);
  }
  function ballFallbackSound(kind='paddle'){
    // Fallback curto para que uma falha no MP3 não deixe a colisão muda.
    if(!soundOn||!ensureAudio())return;
    const settings=kind==='paddle'
      ?{freq:210,duration:.045,volume:.025,noise:.035}
      :kind==='ceiling'
        ?{freq:280,duration:.035,volume:.016,noise:.020}
        :{freq:245,duration:.04,volume:.020,noise:.025};
    tone(settings.freq,settings.duration,'triangle',settings.volume);
    noiseHit(.035,settings.noise,950);
  }

  function ballHitSound(kind='paddle'){
    if(!soundOn)return;
    if(!ensureAudio())return;

    const volume=kind==='paddle'?.42:kind==='ceiling'?.285:.33;

    const playBuffer=buffer=>{
      if(!buffer||!soundOn||!audioCtx)return false;
      try{
        const source=audioCtx.createBufferSource();
        const gain=audioCtx.createGain();
        source.buffer=buffer;
        gain.gain.value=clamp(volume,0,1);
        source.connect(gain).connect(sfxGain);
        source.start(0);
        return true;
      }catch(e){
        console.error('Ball sound error:',e);
        return false;
      }
    };

    if(sfxBuffers.ball){
      if(!playBuffer(sfxBuffers.ball))ballHitFallback(kind);
      return;
    }

    // Reproduz um impacto leve imediatamente enquanto o arquivo carrega.
    ballHitFallback(kind);

    try{
      loadSfxBuffer('ball').catch(()=>null);
    }catch(e){
      console.error('Ball sound loading error:',e);
    }
  }

  function impactSound(kind='paddle'){
    if(!soundOn)return;
    if(kind==='barrier'){
      tone(980,.14,'sine',.055);tone(490,.20,'triangle',.022);return;
    }
    ballHitSound(kind);
  }
  function victorySound(){
    setMusicActive(false);[261.6,329.6,392,523.2].forEach((f,i)=>tone(f,.42,'sine',.04,i*.11));
  }
  function haptic(ms=15){ if(vibrationOn&&navigator.vibrate) navigator.vibrate(ms); }

  function reset(startScore=0){
    startHintRemaining=0;dragging=false;
    clearInterval(reviveTimer);
    clearTimeout(eventBannerTimer);$('#eventBanner').className='';noticeUntil=0;noticeSource='';
    runStartScore=startScore;runPreviousBest=best;recordAnnounced=false;achievementUntil=0;$('#achievement').className='';
    resetSecrets();
    score=startScore; elapsed=0; nextCoin=rand(5,8); nextBox=5;firstBox=true;
    nextGoldenMark=(Math.floor(startScore/25)+1)*25;goldenQueue=[];
    paddleImpact=0;barrierPulse=0;coinFlights=[];paddleFlashes=[];teleportPulses=[];defeatAnimation=null;
    Object.keys(runStats).forEach(k=>runStats[k]=0);
    revivesLeft=3;rescueUntil=0;smallTrollRetired=false;
    objects=[];particles=[];modifiers=[];controlsSign=1;shake=0;flash=0;clearSkinTrailParticles();
    restHits=0;freeBoxQueued=false;
    mysteryCurse.ignored=0;mysteryCurse.armed=false;mysteryCurse.dual=null;
    eventState.activeEffect=null;eventState.activeChallenge=null;eventState.lastEvent=null;eventState.lastCategory=null;
    eventState.cooldownUntil=0;eventState.hiddenLives=0;eventState.barrierCharges=0;eventState.megaPaddleUntil=0;eventState.fakeBallUntil=0;
    windX=0;windTarget=0;windClock=0;curvePhase=rand(0,Math.PI*2);
    dangerZone.x=0;dangerZone.y=0;dangerZone.w=0;dangerZone.h=0;dangerZone.ttl=0;dangerZone.hitCooldown=0;
    ballBaseRadius=clamp(W*.035,12,17);
    syncBallSize();
    paddle.baseW=clamp(W*.31,112,158); paddle.w=paddle.baseW*currentPaddleFactor(); paddle.h=clamp(H*.025,19,25); paddle.vx=0;
    paddle.x=W/2-paddle.w/2; paddle.y=H-Math.max(86,H*.09);
    targetX=paddle.x; pointerX=W/2;
    ball.x=W/2; ball.y=H*.42;
    const speed=clamp(H*.48,380,520);
    ball.vx=speed*(Math.random()<.5?-0.42:.42); ball.vy=speed*.9; ball.trail=[];
    fakeBall.active=false;fakeBall.x=0;fakeBall.y=0;fakeBall.r=ball.r;fakeBall.vx=0;fakeBall.vy=0;fakeBall.trail=[];
    updateHUD();
  }
  function startGame(startScore=0){
    clearInterval(adTimer);clearInterval(reviveTimer);ensureAudio();preloadSfx();
    ballAudioPlayers.forEach(audio=>{try{audio.load();}catch{}});
    reset(startScore);startHintRemaining=3;mode='playing';hideAll();setMusicActive(true,true);
    skip25ModalOpen=false;
    skip25EligibleThisRun=startScore===0&&skip25Unlocked&&Math.random()<.80;
    const skipOffer=$('#skip25Offer');
    skipOffer.classList.toggle('show',skip25EligibleThisRun);
    last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);
  }
  function hideAll(){ ['#start','#gameOver','#paused','#adScreen','#reviveScreen'].forEach(s=>$(s).classList.add('hidden')); }
  function show(sel){ hideAll(); if(sel!=='#adScreen')$('#skip25Offer').classList.remove('show'); $(sel).classList.remove('hidden'); }

  function updateHUD(){
    $('#score').textContent=String(score).padStart(3,'0');
    $('#hudBest').textContent=Math.max(best,score);
    $('#coinCount').textContent=coins;
    $('#coinsPill').setAttribute('aria-label',tr('Moedas: ')+coins);
    $('#coinCount').title=String(coins);
  }

  function celebrateProgress(before){
    const milestones=[25,50,75,100,125].filter(mark=>before<mark&&score>=mark);
    const newRecord=!recordAnnounced&&runPreviousBest>0&&score>runPreviousBest;
    if(newRecord)recordAnnounced=true;
    if(!milestones.length&&!newRecord)return;
    const parts=[];
    if(newRecord)parts.push(tr('NOVO RECORDE'));
    if(milestones.length)parts.push(milestones.join(' · ')+' '+tr('PONTOS'));
    $('#achievement').textContent=parts.join(' · ');$('#achievement').className='show';achievementUntil=elapsed+2.6;
    tone(newRecord?980:780,.12,'sine',.025);haptic(18);
  }
  function recordSummary(){
    if(score>runPreviousBest)return runPreviousBest>0?'NOVO RECORDE · +'+(score-runPreviousBest)+' PONTOS':'SEU PRIMEIRO RECORDE';
    if(runPreviousBest>=MAX_SCORE)return score>=MAX_SCORE?'VOCÊ IGUALOU SEU RECORDE MÁXIMO!':'SEU RECORDE JÁ É 150. TENTE IGUALAR!';
    const gap=runPreviousBest-score+1;
    return (gap===1?'FALTOU':'FALTARAM')+' '+gap+' PONTO'+(gap===1?'':'S')+' PARA SUPERAR SEU RECORDE';
  }
  function saveRunResult(){
    const result={score,record:Math.max(best,score),previousRecord:runPreviousBest,startScore:runStartScore,
      adRescues:runStats.adRescues,extraLivesUsed:runStats.extraLivesUsed};
    storage.set('lastRun',result);
    if(score>best){best=score;storage.set('best',best);storage.set('bestRun',result);}
    return result;
  }
  function addScore(n=1,suppressFlash=false){
    const before=score;
    score=Math.min(MAX_SCORE,score+n);
    if(!skip25Unlocked&&before<70&&score>=70){
      skip25Unlocked=true;storage.set('skip25Unlocked',true);
    }
    syncBallSize();
    if(before<=100&&score>100){ball.trail=[];fakeBall.trail=[];}
    while(nextGoldenMark<=125&&score>=nextGoldenMark){
      goldenQueue.push(nextGoldenMark);nextGoldenMark+=25;
    }
    // Verifica a trilha após cada mudança de pontuação: as trocas devem ocorrer exatamente em 96 e 101.
    updateMusicStage();
    updateHUD(); if(!suppressFlash)flash=.12;celebrateProgress(before);secretScoreChanged(before);
    if(n>1)toast('+'+n+' PONTOS · CAIXA');
    if(before<96&&score>=96){toast('BLACKOUT · SIGA O RASTRO');if(vibrationOn&&navigator.vibrate)navigator.vibrate([70,40,90]);}
    if(before<100&&score>=100){flash=.65;toast('100% · PRETO ABSOLUTO');if(vibrationOn&&navigator.vibrate)navigator.vibrate([80,50,140]);}
    const newSpectrum=[
      [105,'AZUL ABISSAL'],[110,'CIANO PROFUNDO'],[115,'TURQUESA ELÉTRICA'],
      [120,'VERDE RADIOATIVO'],[125,'VERDE ÁCIDO'],[130,'DOURADO SOLAR'],
      [135,'LARANJA INCANDESCENTE'],[140,'VERMELHO NEON'],[145,'ULTRAVIOLETA']
    ].filter(([mark])=>before<mark&&score>=mark).pop();
    if(newSpectrum){flash=.3;toast(newSpectrum[1]);}
    if(before<MAX_SCORE&&score>=MAX_SCORE){
      flash=.95; shake=12; mode='over'; toast('150 · VOCÊ ZEROU O IMPOSSÍVEL');
      if(vibrationOn&&navigator.vibrate)navigator.vibrate([90,40,90,40,180]);
      victorySound();
      setTimeout(()=>finishGame('150 · IMPOSSÍVEL'),180);
    }
  }

  let badLuckClimbs=0;

  function upperBounceChaosDegrees(points=gameplayScore()){
    const curve=[[0,3],[10,3],[20,6],[30,10],[40,15],[50,20],[60,25],[70,30]];
    if(points>=100)return clamp(30+(points-100)*.5,30,50);
    if(points<=0)return 3;
    if(points>=70)return 30;
    for(let i=1;i<curve.length;i++){
      const [p1,d1]=curve[i];
      if(points<=p1){
        const [p0,d0]=curve[i-1],k=(points-p0)/(p1-p0||1);
        return d0+(d1-d0)*k;
      }
    }
    return 30;
  }

  function applyUpperBounceChaos(b,surface){
    if(!b)return;
    const points=gameplayScore();
    const chaosLimit=points>=100?H*.85:H*.5;
    if(b.y>chaosLimit)return;
    const chance=clamp(.30+(points/70)*.70,.30,1);
    if(Math.random()>chance)return;

    const wasDescending=b.vy>0;
    const heightPower=.40+.60*clamp((chaosLimit-b.y)/chaosLimit,0,1);
    const delta=rand(-1,1)*upperBounceChaosDegrees(points)*Math.PI/180*heightPower;
    const speed=Math.hypot(b.vx,b.vy)||1,cos=Math.cos(delta),sin=Math.sin(delta);
    let vx=b.vx*cos-b.vy*sin,vy=b.vx*sin+b.vy*cos;

    if(surface==='left')vx=Math.abs(vx);
    else if(surface==='right')vx=-Math.abs(vx);
    else if(surface==='ceiling')vy=Math.abs(vy);

    const minVertical=speed*Math.sin(Math.PI*10/180);
    if(Math.abs(vy)<minVertical){
      const vs=surface==='ceiling'?1:(Math.sign(vy)||Math.sign(b.vy)||1);
      vy=vs*minVertical;
      const hx=Math.sqrt(Math.max(0,speed*speed-vy*vy));
      const hs=surface==='left'?1:surface==='right'?-1:(Math.sign(vx)||1);
      vx=hs*hx;
    }

    if(wasDescending&&vy<0){
      badLuckClimbs=Math.min(badLuckClimbs+1,4);
      const boost=1+.10*badLuckClimbs;
      vx*=boost;vy*=boost;
    }
    b.vx=vx;b.vy=vy;
  }

  function currentSpeedFactor(){
    // Mais ritmo no início; o reforço desaparece suavemente até o ponto 60.
    const earlyBoost=.30*(1-clamp(gameplayScore()/60,0,1));
    let f=1+gameplayScore()*.01+earlyBoost;
    if(gameplayScore()>60) f+=(gameplayScore()-60)*.004;
    if(gameplayScore()>90) f+=(gameplayScore()-90)*.007;
    if(gameplayScore()>120) f+=(gameplayScore()-120)*.012;
    for(const m of modifiers){
      if(m.type==='slow')f*=.8;
      else if(m.type==='cameraSlow')f*=.5;
      else if(m.type==='fast')f*=1.2;
    }
    const rescueSpeed=rescueUntil>0?.7+.3*clamp(elapsed-rescueUntil,0,1):1;
    return clamp(f,.7,3.35)*rescueSpeed;
  }
  function basePaddleFactor(points){
    let f=1-points*.005;
    if(points>60)f-=(points-60)*.0025;
    if(points>90)f-=(points-90)*.003;
    if(points>120)f-=(points-120)*.004;
    return f;
  }
  function currentPaddleFactor(){
    const minimum=ballBaseRadius*2/paddle.baseW;
    if(basePaddleFactor(score)<=minimum)smallTrollRetired=true;
    let f=Math.max(minimum,basePaddleFactor(gameplayScore()));
    for(const m of modifiers) if(m.type==='small')f*=.8;
    if(f<=minimum)smallTrollRetired=true;
    f=Math.max(minimum,f);
    if(eventState.megaPaddleUntil>elapsed)f*=2;
    return clamp(f,minimum,2.1);
  }

  function paddleResponse(){
    return 24;
  }
  function windStrength(){ return rescueProtected()||gameplayScore()<91?0:clamp((gameplayScore()-90)*7,0,420); }
  function curveStrength(){ return rescueProtected()||gameplayScore()<126?0:clamp((gameplayScore()-125)*5.5,0,145); }
  function refreshDangerZone(){
    if(score<111)return;
    dangerZone.w=clamp(W*.23,92,178); dangerZone.h=24;
    dangerZone.x=rand(12,Math.max(13,W-dangerZone.w-12));
    dangerZone.y=rand(H*.16,Math.max(H*.17,paddle.y-H*.2));
    dangerZone.ttl=rand(1.5,2.8); dangerZone.hitCooldown=0;
  }

  function spawn(type){
    if(type==='box'&&(objects.some(o=>o.type==='box')||goldenQueue.length))return;
    if(type==='box')onBoxAppeared();
    const size=type==='box'?50:39;
    objects.push({type,x:rand(18,W-size-18),y:-size,size,vy:clamp(H*.13,105,145),spin:0});
  }
  function spawnFirstBox(){
    if(objects.some(o=>o.type==='box')||goldenQueue.length)return;
    onBoxAppeared();
    const size=50;
    objects.push({type:'box',x:clamp(paddle.x+paddle.w/2-size/2+rand(-W*.10,W*.10),18,W-size-18),
      y:-size,size,vy:clamp(H*.36,230,340),spin:0});
  }
  function updateBoxSpawns(){
    if(rescueProtected()||restHits>0||mysteryCurse.armed||mysteryCurse.dual||eventState.activeChallenge||objects.some(o=>o.type==='box'))return;
    if(goldenQueue.length){
      // O marco fica reservado até terminar o efeito/desafio e a caixa anterior sair.
      // Efeito persistente não bloqueia a caixa que pode encerrá-lo.
      onBoxAppeared();
      const size=56,mark=goldenQueue.shift();
      objects.push({type:'box',golden:true,mark,x:rand(18,W-size-18),y:-size,
        size,vy:clamp(H*.15,115,165),spin:0});
      firstBox=false;nextBox=elapsed+15;
      toast('DOURADA · ALÍVIO GARANTIDO');tone(990,.2,'triangle',.05);return;
    }
    if(elapsed<nextBox||elapsed<eventState.cooldownUntil)return;
    if(firstBox){spawnFirstBox();firstBox=false;}else spawn('box');
    nextBox=elapsed+15;
  }
  function openGoldenBox(){
    clearTrollsOnPickup();
    const pool=eventCatalog.good.filter(e=>['megaPaddle','cameraSlow','barrier'].includes(e.id)&&(!e.available||e.available()));
    const reward=pool[Math.floor(Math.random()*pool.length)];
    if(reward.temporary){
      modifiers=[];controlsSign=1;paddle.vx=0;
      eventState.megaPaddleUntil=0;eventState.fakeBallUntil=0;eventState.activeEffect=null;
      fakeBall.active=false;fakeBall.trail=[];
    }
    runStats.boxes++;runStats.reliefs++;
    eventState.lastCategory='good';eventState.lastEvent=reward.id;
    eventState.cooldownUntil=elapsed+8;nextBox=elapsed+15;
    reward.run();flash=Math.max(flash,.3);playSfx('box',.9);tone(1040,.22,'triangle',.055);haptic(40);
  }
  function ignoreMysteryBox(){
    if(mysteryCurse.armed||mysteryCurse.dual)return;
    mysteryCurse.ignored++;
    if(mysteryCurse.ignored<3)return;
    mysteryCurse.ignored=0;mysteryCurse.armed=true;
    eventState.activeChallenge=null;restHits=0;freeBoxQueued=false;
    modifiers=[];controlsSign=1;eventState.activeEffect=null;
    eventState.megaPaddleUntil=0;eventState.fakeBallUntil=0;fakeBall.active=false;fakeBall.trail=[];
    objects=objects.filter(o=>o.type!=='box');nextBox=elapsed+15;
    toast('MEDO DAS CAIXAS, É?');tone(130,.24,'sawtooth',.045);haptic(45);
  }
  function startDualChallenge(speed){
    mysteryCurse.armed=false;
    eventState.activeChallenge=null;restHits=0;freeBoxQueued=false;
    // Temporários ficam suspensos; o desafio usa a barra original e duas bolas reais.
    modifiers=[];controlsSign=1;eventState.activeEffect=null;
    eventState.megaPaddleUntil=0;eventState.fakeBallUntil=0;fakeBall.active=false;fakeBall.trail=[];
    objects=[];nextCoin=elapsed+rand(6,10);nextBox=elapsed+15;
    const r=ball.r,center=clamp(paddle.x+paddle.w/2,r+8,W-r-8);
    const delay=clamp(2*(paddle.y-r)/speed*.32,.38,1.1);
    mysteryCurse.dual={time:0,balls:[-1,1].map((direction,i)=>({
      x:clamp(center+direction*r*1.3,r,W-r),y:paddle.y-r-2,r,
      vx:direction*speed*(i?.46:.28),vy:-speed*Math.sqrt(1-Math.pow(i?.46:.28,2)),
      hits:0,done:false,releaseAt:i?delay:0,trail:[]
    }))};
    ball.trail=[];flash=Math.max(flash,.35);toast('DUAS BOLAS · UM BASTÃO',{detail:'Rebata cada bola 5 vezes',duration:2600});
    tone(270,.16,'triangle',.035);tone(405,.16,'triangle',.03,.06);haptic(35);
  }
  function finishDualChallenge(){
    if(secretRun){secretRun.dualWins++;if(secretRun.dualWins>=2)awardSecret('dual');}
    mysteryCurse.dual=null;mysteryCurse.ignored=0;
    const speed=clamp(H*.49,390,525)*currentSpeedFactor();
    paddle.w=paddle.baseW*currentPaddleFactor();paddle.x=clamp(paddle.x,7,W-paddle.w-7);targetX=paddle.x;
    ball.x=clamp(paddle.x+paddle.w/2,ball.r+8,W-ball.r-8);ball.y=H*.35;
    ball.vx=speed*(Math.random()<.5?-.28:.28);ball.vy=-Math.sqrt(speed*speed-ball.vx*ball.vx);ball.trail=[];
    toast('DESAFIO SUPERADO');tone(680,.14,'sine',.04);haptic(25);
  }
  function updateDualChallenge(dt,speed){
    const challenge=mysteryCurse.dual;if(!challenge)return;
    challenge.time+=dt;
    const steps=Math.max(1,Math.ceil(speed*dt/(ball.r*.65))),step=dt/steps;
    for(let tick=0;tick<steps;tick++){
      for(let i=0;i<2;i++){
        const b=challenge.balls[i];if(b.done)continue;
        if(challenge.time<b.releaseAt){
          b.x=clamp(paddle.x+paddle.w/2+(i?1:-1)*b.r*1.3,b.r,W-b.r);
          b.y=paddle.y-b.r-2;continue;
        }
        const oldBY=b.y;
        b.x+=b.vx*step;b.y+=b.vy*step;
        if(b.x<b.r){b.x=b.r;b.vx=Math.abs(b.vx);}
        if(b.x>W-b.r){b.x=W-b.r;b.vx=-Math.abs(b.vx);}
        if(b.y<b.r){b.y=b.r;b.vy=Math.abs(b.vy);impactSound('ceiling');}
        const crossedPaddleTop=oldBY+b.r<=paddle.y&&b.y+b.r>=paddle.y;
        const overlapsPaddle=b.x+b.r>=paddle.x&&b.x-b.r<=paddle.x+paddle.w;
        if(b.vy>0&&crossedPaddleTop&&overlapsPaddle){
          b.y=paddle.y-b.r;b.hits++;
          runStats.rebounds++;paddleHitFeedback(b.x);
          burst(b.x,paddle.y,ballImpactColor(),7);impactSound('paddle');haptic(9);
          if(b.hits>=5){b.done=true;continue;}
          const hit=clamp((b.x-paddle.x-paddle.w/2)/(paddle.w/2),-1,1);
          const angle=clamp(hit*.36+(i===0?.28:-.28),-.65,.65);
          b.vx=Math.sin(angle)*speed;b.vy=-Math.cos(angle)*speed;
        }
        const barrierY=Math.min(H-24,paddle.y+paddle.h+22);
        if(!b.done&&b.vy>0&&eventState.barrierCharges>0&&b.y+b.r>=barrierY){
          b.y=barrierY-b.r;b.vy=-Math.abs(b.vy);
          breakShield(b.x,barrierY);
        }
        if(beginDefeat(b))return;
        if(b.y-b.r>H){
          mysteryCurse.dual=null;mysteryCurse.ignored=0;endGame();return;
        }
      }
      if(challenge.balls.every(b=>b.done)){finishDualChallenge();return;}
    }
    for(const b of challenge.balls){
      if(b.done)continue;
      b.trail.push({x:b.x,y:b.y});if(b.trail.length>10)b.trail.shift();
    }
  }
  function spawnMagnetCoins(count=3){
    for(let i=0;i<count;i++){
      const size=39;
      objects.push({type:'coin',x:rand(18,W-size-18),y:rand(H*.14,H*.58),size,vy:0,spin:rand(0,Math.PI*2)});
    }
  }
  const ballImpactColors={
    soccer:'#55c96b',fire:'#ff5c35',donut:'#ff7eb6',earth:'#4fc3f7',
    eight:'#b9e6ff',moon:'#ffe39a',snow:'#8fdcff',galaxy:'#c898ff',
    lava:'#ff6d3c',plasma:'#8d7dff',potion:'#ff9a38',unicorn:'#ff9edc'
  };
  function ballImpactColor(){return ballImpactColors[selected]||'#ffffff';}
  function burst(x,y,color,count=12){
    for(let i=0;i<count;i++) particles.push({x,y,vx:rand(-130,130),vy:rand(-160,50),life:rand(.3,.7),max:1,color,r:rand(2,5)});
  }
  function breakShield(hitX,y){
    if(secretRun&&secretRun.blackout)secretRun.blackoutFailed=true;
    eventState.barrierCharges--;barrierPulse=0;
    const first=particles.length;
    for(let x=18;x<W-12;x+=30)burst(x,y,'#ffd45a',2);
    burst(hitX,y,'#fff3bb',12);
    for(let i=first;i<particles.length;i++)particles[i].shield=true;
    toast('ESCUDO SALVOU!');impactSound('barrier');haptic(35);
  }
  let eventBannerTimer=0,noticeUntil=0,noticePriority=0,noticeSource='';
  function toast(text,{kind,detail='',duration=1900,priority=1,top=null}={}){
    if(priority<noticePriority&&performance.now()<noticeUntil)return;
    if(!kind){
      if(/^(TROLL:|MEDO DAS CAIXAS|DUAS BOLAS|ZONA FALSA)/.test(text))kind='troll';
      else if(/PERDID|EXPIRAD|ESGOTAD|SUMIU|ENCERRAD/.test(text))kind='neutral';
      else if(/^(ALÍVIO|BÔNUS|ESCUDO|DOURADA|CESTA!|GOL!|FIELD GOAL!|GOLFE!|DESAFIO SUPERADO|SKIN)/.test(text))kind='good';
      else kind='neutral';
    }
    const banner=$('#eventBanner'),icons={troll:`<svg class="event-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,good:`<svg class="event-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.937A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063A2 2 0 0 0 14.063 15.5l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v5"/><path d="M5 21H2"/></svg>`,sport:'◎',neutral:'•'};
    $('#noticeTitle').innerHTML=icons[kind]+' '+tr(noticeSource||text);
    $('#noticeDetail').textContent=tr(noticeSource?text:detail);
    banner.style.top=top===null?'':top+'px';banner.className='show '+kind;
    noticePriority=priority;noticeUntil=performance.now()+duration;clearTimeout(eventBannerTimer);
    eventBannerTimer=setTimeout(()=>{banner.className='';noticeUntil=0;noticePriority=0;},duration);
  }
  const trollTypes=['fast','invert','small','ghostPaddle','ice','earthquake'];
  function syncActiveEffect(){
    eventState.activeEffect=eventState.megaPaddleUntil>elapsed?'megaPaddle':
      eventState.fakeBallUntil>elapsed?'fakeBall':modifiers.length?modifiers[modifiers.length-1].type:null;
  }
  function onBoxAppeared(){
    modifiers=modifiers.filter(m=>m.expiresOn!=='spawn');syncActiveEffect();
  }
  function clearTrollsOnPickup(){
    if(secretRun)secretRun.fastHits=0;
    modifiers=modifiers.filter(m=>!trollTypes.includes(m.type));controlsSign=1;paddle.vx=0;
    eventState.fakeBallUntil=0;fakeBall.active=false;fakeBall.trail=[];
    mysteryCurse.ignored=0;syncActiveEffect();
  }
  function modifier(type,duration,label){
    const untilPickup=['fast','small','earthquake'].includes(type);
    const untilSpawn=['slow','cameraSlow'].includes(type)&&score>70;
    modifiers.push({type,duration,end:untilPickup||untilSpawn?Infinity:elapsed+duration,
      expiresOn:untilPickup?'pickup':untilSpawn?'spawn':null});
    eventState.activeEffect=type;
    if(type==='earthquake')shake=Math.max(shake,7.5);
    toast(label,{detail:untilPickup?tr('Até pegar outra caixa'):untilSpawn?tr('Até aparecer a próxima caixa'):duration+' '+tr('segundos')});
  }
  const effectNames={slow:'Bola lenta',cameraSlow:'Câmera lenta',magnet:'Moeda magnética',
    fast:'Bola acelerada',invert:'Controles invertidos',small:'Barra menor',ghostPaddle:'Barra fantasma',ice:'Chão de gelo',earthquake:'Terremoto'};

  const sportNames={basket:'CESTA'};
  function startSportChallenge(id='basket'){
    if(id!=='basket'||restHits>0||eventState.activeChallenge||mysteryCurse.armed||mysteryCurse.dual)return;
    objects=objects.filter(o=>o.type!=='box');nextBox=elapsed+15;
    const w=clamp(W*.18,52,76),y=H*.32,x=rand(w/2+9,W-w/2-9);
    eventState.activeChallenge={id:'basket',pending:false,x,y,w,endAt:elapsed+17};
    toast('ACERTE A CESTA',{kind:'sport',detail:'17 segundos · ganhe 3 rebatidas de descanso',duration:2700});
    tone(690,.13,'triangle',.042);haptic(20);
  }
  function finishSportChallenge(hit){
    if(!eventState.activeChallenge)return;
    eventState.activeChallenge=null;
    if(!hit){toast('CESTA · TEMPO ESGOTADO',{kind:'neutral',detail:'Sem prêmio desta vez'});return;}
    if(secretRun){secretRun.basketPending=score>=120;if(secretRun.blackout)secretRun.blackoutFailed=true;}
    restHits=3;runStats.reliefs++;
    modifiers=[];controlsSign=1;paddle.vx=0;shake=0;
    eventState.activeEffect=null;eventState.megaPaddleUntil=0;eventState.fakeBallUntil=0;fakeBall.active=false;
    windX=0;windTarget=0;dangerZone.ttl=0;dangerZone.w=0;
    const center=paddle.x+paddle.w/2;paddle.w=paddle.baseW;
    paddle.x=clamp(center-paddle.w/2,7,W-paddle.w-7);targetX=paddle.x;
    const speed=clamp(H*.49,390,525)*currentSpeedFactor(),len=Math.hypot(ball.vx,ball.vy)||1;
    ball.vx=ball.vx/len*speed;ball.vy=ball.vy/len*speed;ball.trail=[];
    updateMusicStage();
    flash=Math.max(flash,.2);burst(ball.x,ball.y,'#ffef9c',18);tone(940,.22,'sine',.055);haptic(30);
    toast('CESTA! RESPIRO',{kind:'good',detail:'Fase inicial por 3 rebatidas · pontos preservados'});
  }
  function countRestRebound(){
    if(restHits<=0)return;
    restHits--;
    if(restHits===0){
      if(secretRun&&secretRun.basketPending){secretRun.basketPending=false;awardSecret('basket');}
      ball.trail=[];updateMusicStage();
      toast('DE VOLTA AO DESAFIO',{kind:'neutral',detail:tr('Dificuldade do ponto ')+score});
      nextBox=Math.max(nextBox,elapsed+2);
    }
  }
  function checkSportCrossing(oldY){
    const c=eventState.activeChallenge;if(!c)return;
    if(elapsed>=c.endAt){finishSportChallenge(false);return;}

    // Física somente nas duas bordas do aro. A rede continua 100% visual.
    const visualW=95;
    const rimHalf=visualW*.40;
    const postR=Math.max(2.5,ballBaseRadius*.20);
    const leftX=c.x-rimHalf,rightX=c.x+rimHalf;

    function collideRimPoint(px){
      const dx=ball.x-px,dy=ball.y-c.y;
      const minD=ball.r+postR;
      const d2=dx*dx+dy*dy;
      if(d2>=minD*minD)return false;
      const d=Math.sqrt(d2)||.001,nx=dx/d,ny=dy/d;
      // Só rebate se a bola estiver entrando no ponto de colisão.
      const toward=ball.vx*nx+ball.vy*ny;
      if(toward>=0)return false;
      const push=minD-d+.25;
      ball.x+=nx*push;ball.y+=ny*push;
      const restitution=.88;
      ball.vx-=(1+restitution)*toward*nx;
      ball.vy-=(1+restitution)*toward*ny;
      ball.trail=[];
      impactSound('wall');
      return true;
    }

    collideRimPoint(leftX);
    collideRimPoint(rightX);

    // Prêmio somente quando a bola atravessa o aro de CIMA para BAIXO.
    const crossedDown=oldY<c.y&&ball.y>=c.y&&ball.vy>0;
    const insideRim=ball.x-ball.r>leftX&&ball.x+ball.r<rightX;
    if(crossedDown&&insideRim)finishSportChallenge(true);
  }

  function eventProbabilities(){
    const points=clamp(score,0,MAX_SCORE);
    let troll,sport=.10;
    if(points<=25)troll=.30+.10*(points/25);
    else if(points<=50)troll=.40+.15*((points-25)/25);
    else if(points<71){
      const progress=(points-50)/21;
      troll=.55+.05*progress;sport=.10+.10*progress;
    }else{troll=.60;sport=.20;}
    return {good:1-sport-troll,sport,troll};
  }

  const eventCatalog={
    good:[
      {id:'slow',temporary:true,run:()=>modifier('slow',10,'ALÍVIO: BOLA 20% MAIS LENTA')},
      {id:'points',temporary:false,run:()=>{const points=Math.random()<.75?5:10;addScore(points);toast('BÔNUS: +'+points+' PONTOS');}},
      {id:'megaPaddle',temporary:true,available:()=>eventState.megaPaddleUntil<=elapsed,run:()=>{eventState.megaPaddleUntil=elapsed+10;eventState.activeEffect='megaPaddle';toast('ALÍVIO: MEGA BARRA · 10 SEGUNDOS');}},
      {id:'cameraSlow',temporary:true,run:()=>modifier('cameraSlow',10,'ALÍVIO: CÂMERA LENTA')},
      {id:'barrier',temporary:false,available:()=>eventState.barrierCharges<=0,run:()=>{
        eventState.barrierCharges=1;barrierPulse=.85;
        burst(W/2,Math.min(H-24,paddle.y+paddle.h+22),'#ffe18c',30);
        toast('ESCUDO · SALVA 1 QUEDA');tone(880,.25,'triangle',.06);haptic(40);
      }},
      {id:'magnet',temporary:true,run:()=>{spawnMagnetCoins(3);modifier('magnet',10,'BÔNUS: MOEDA MAGNÉTICA · 10 SEGUNDOS');}}
    ],
    troll:[
      {id:'fast',temporary:true,run:()=>modifier('fast',4,'TROLL: BOLA 20% MAIS RÁPIDA')},
      {id:'teleport',temporary:false,run:()=>{teleportBall();toast('TROLL: TELETRANSPORTE');}},
      {id:'invert',temporary:true,run:()=>{controlsSign=-1;modifier('invert',7,'TROLL: CONTROLES INVERTIDOS');}},
      {id:'small',temporary:true,available:()=>!smallTrollRetired&&basePaddleFactor(score)*paddle.baseW>ballBaseRadius*2,run:()=>modifier('small',5,'TROLL: BARRA 20% MENOR')},
      {id:'ghostPaddle',temporary:true,run:()=>modifier('ghostPaddle',3,'TROLL: BARRA FANTASMA · 3 SEGUNDOS')},
      {id:'fakeBall',temporary:true,available:()=>eventState.fakeBallUntil<=elapsed,run:()=>{
        eventState.fakeBallUntil=elapsed+9;eventState.activeEffect='fakeBall';fakeBall.active=true;fakeBall.r=ball.r;
        fakeBall.x=W-ball.x;fakeBall.y=clamp(ball.y+ball.r*3,H*.14,H*.68);fakeBall.vx=-ball.vx*.94;fakeBall.vy=ball.vy*.96;fakeBall.trail=[];
        toast('TROLL: BOLA FALSA · 9 SEGUNDOS');
      }},
      {id:'ice',temporary:true,run:()=>modifier('ice',8,'TROLL: CHÃO DE GELO · 8 SEGUNDOS')},
      {id:'earthquake',temporary:true,run:()=>modifier('earthquake',0,'TROLL: TERREMOTO')}
    ],
    sport:[
      {id:'basket',temporary:true,run:()=>startSportChallenge('basket')}
    ]
  };

  function chooseEventCategory(){
    const p=eventProbabilities(),roll=Math.random();
    if(roll<p.troll)return 'troll';
    if(roll<p.troll+p.sport)return 'sport';
    return 'good';
  }

  function validEventPool(category){
    let pool=eventCatalog[category]||[];
    if(!pool.length)pool=eventCatalog.good;
    const available=e=>!e.available||e.available();
    const noStack=e=>!eventState.activeEffect||!e.temporary;
    let valid=pool.filter(e=>available(e)&&noStack(e)&&e.id!==eventState.lastEvent);
    if(!valid.length)valid=pool.filter(e=>available(e)&&noStack(e));
    return valid;
  }

  function openBox({free=false,excludeSport=false}={}){
    if(restHits>0||eventState.activeChallenge)return;
    clearTrollsOnPickup();
    if(!free&&elapsed<eventState.cooldownUntil){toast('CAIXA CARREGANDO...');return;}
    runStats.boxes++;
    if(!free&&score>=50&&eventState.hiddenLives<=0&&Math.random()<.02){
      eventState.hiddenLives=1;eventState.lastEvent='secretLife';eventState.lastCategory='rare';eventState.cooldownUntil=elapsed+8;
      flash=.55;toast('BÔNUS RARO: SEGUNDA CHANCE');tone(1040,.28,'sine',.065);haptic(55);return;
    }
    let category=chooseEventCategory();
    if(category==='sport'&&(excludeSport||eventState.lastCategory==='sport'||eventState.activeEffect||mysteryCurse.armed||mysteryCurse.dual)){
      const p=eventProbabilities();category=Math.random()<p.troll/(p.good+p.troll)?'troll':'good';
    }
    const pool=validEventPool(category),event=pool[Math.floor(Math.random()*pool.length)];
    if(!event)return;
    eventState.lastEvent=event.id;eventState.lastCategory=category;eventState.cooldownUntil=Math.max(eventState.cooldownUntil,elapsed+8);
    if(category==='troll')runStats.trolls++;
    if(category==='good')runStats.reliefs++;
    noticeSource=free?'GOL! CAIXA GRÁTIS':'';
    try{event.run();}finally{noticeSource='';}
    const good=category!=='troll';playSfx('box',.4);tone(good?720:155,.16,good?'sine':'sawtooth',.05);haptic(good?25:55);
  }

  function update(dt){
    if(startHintRemaining>0){
      startHintRemaining=Math.max(0,startHintRemaining-dt);
      if(startHintRemaining<=0)$('#skip25Offer').classList.remove('show');
      // O gesto demonstrado não move a barra; relógios e bola aguardam a largada.
      return;
    }
    elapsed+=dt;updateSecretNotice(); shake=Math.max(0,shake-dt*30); flash=Math.max(0,flash-dt);
    paddleImpact=Math.max(0,paddleImpact-dt*4.8);barrierPulse=Math.max(0,barrierPulse-dt);
    for(const hit of paddleFlashes)hit.age+=dt;
    paddleFlashes=paddleFlashes.filter(hit=>hit.age<.18);
    for(let i=coinFlights.length-1;i>=0;i--){coinFlights[i].age+=dt;if(coinFlights[i].age>=.48)coinFlights.splice(i,1);}
    updateAdaptiveMusic(dt);updateSkinTrailParticles(dt);
    if(freeBoxQueued&&!eventState.activeChallenge&&!mysteryCurse.dual){freeBoxQueued=false;openBox({free:true,excludeSport:true});}
    const hadInvert=modifiers.some(m=>m.type==='invert');
    const hadIce=modifiers.some(m=>m.type==='ice');
    modifiers=modifiers.filter(m=>m.end>elapsed);
    if(hadInvert&&!modifiers.some(m=>m.type==='invert')) controlsSign=1;
    if(hadIce&&!modifiers.some(m=>m.type==='ice'))paddle.vx=0;
    if(eventState.megaPaddleUntil>0&&eventState.megaPaddleUntil<=elapsed){
      eventState.megaPaddleUntil=0;
    }
    if(eventState.fakeBallUntil>0&&eventState.fakeBallUntil<=elapsed){
      eventState.fakeBallUntil=0;fakeBall.active=false;fakeBall.trail=[];
    }
    syncActiveEffect();
    if(modifiers.some(m=>m.type==='earthquake'))shake=Math.max(shake,1.6);

    const desiredWidth=Math.max(ballBaseRadius*2,paddle.baseW*currentPaddleFactor());
    paddle.w+=(desiredWidth-paddle.w)*Math.min(1,dt*9);
    if(Math.abs(desiredWidth-paddle.w)<.1)paddle.w=desiredWidth;
    paddle.w=Math.max(ballBaseRadius*2,paddle.w);
    const desired=controlsSign===1?targetX:(W-paddle.w-targetX);
    const boundedDesired=clamp(desired,7,W-paddle.w-7),oldPaddleX=paddle.x;
    if(modifiers.some(m=>m.type==='ice')){
      paddle.vx+=(boundedDesired-paddle.x)*dt*18;
      paddle.vx*=Math.pow(.16,dt);paddle.vx=clamp(paddle.vx,-920,920);paddle.x+=paddle.vx*dt;
      if(paddle.x<7){paddle.x=7;paddle.vx=Math.abs(paddle.vx)*.35;}
      if(paddle.x>W-paddle.w-7){paddle.x=W-paddle.w-7;paddle.vx=-Math.abs(paddle.vx)*.35;}
    }else{
      paddle.x+=(boundedDesired-paddle.x)*Math.min(1,dt*paddleResponse());
      paddle.vx=dt>0?(paddle.x-oldPaddleX)/dt:0;
    }

    if(mysteryCurse.dual){
      updateDualChallenge(dt,clamp(H*.49,390,525)*currentSpeedFactor());
      for(let i=particles.length-1;i>=0;i--){
        const p=particles[i];
        if(p.shield){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=260*dt;}
        p.life-=dt;if(p.life<=0)particles.splice(i,1);
      }
      return;
    }

    windClock-=dt; dangerZone.ttl-=dt; dangerZone.hitCooldown=Math.max(0,dangerZone.hitCooldown-dt);
    if(rescueProtected()){windX=0;windTarget=0;}
    else if(gameplayScore()>=91){
      if(windClock<=0){windClock=rand(.55,1.1);windTarget=rand(-windStrength(),windStrength());}
      windX+=(windTarget-windX)*Math.min(1,dt*1.6);
    }else windX*=Math.max(0,1-dt*4);
    if(!rescueProtected()&&gameplayScore()>=111&&(dangerZone.ttl<=0||dangerZone.w===0)) refreshDangerZone();

    if(elapsed>=nextCoin){ spawn('coin'); nextCoin=elapsed+rand(6,10); }
    updateBoxSpawns();

    const factor=currentSpeedFactor();
    const base=clamp(H*.49,390,525); const targetV=base*factor;
    const len=Math.hypot(ball.vx,ball.vy)||1;
    ball.vx=ball.vx/len*targetV; ball.vy=ball.vy/len*targetV;
    if(eventState.activeChallenge&&!eventState.activeChallenge.pending&&elapsed>=eventState.activeChallenge.endAt)finishSportChallenge(false);
    const steps=Math.max(1,Math.ceil(targetV*dt/(ball.r*.7))), step=dt/steps;
    for(let s=0;s<steps;s++){
      const oldY=ball.y;
      const curve=curveStrength()*Math.sin(elapsed*3.1+curvePhase+ball.y*.008);
      ball.vx+=(windX*.34+curve)*step;
      ball.x+=ball.vx*step; ball.y+=ball.vy*step;
      if(ball.x-ball.r<0){
        ball.x=ball.r;ball.vx=Math.abs(ball.vx);
        applyUpperBounceChaos(ball,'left');
        impactSound('wall');
      }
      if(ball.x+ball.r>W){
        ball.x=W-ball.r;ball.vx=-Math.abs(ball.vx);
        applyUpperBounceChaos(ball,'right');
        impactSound('wall');
      }
      if(ball.y-ball.r<0){
        ball.y=ball.r;ball.vy=Math.abs(ball.vy);
        applyUpperBounceChaos(ball,'ceiling');
        impactSound('ceiling');
      }
      checkSportCrossing(oldY);
      // Rebatida precisa: a bola só conta se cruzar a FACE SUPERIOR da barra vindo de cima.
      // O contato lateral só vale nesse exato cruzamento: se qualquer parte da bola tocar a barra, rebate.
      const crossedPaddleTop=oldY+ball.r<=paddle.y && ball.y+ball.r>=paddle.y;
      const overlapsPaddle=ball.x+ball.r>=paddle.x && ball.x-ball.r<=paddle.x+paddle.w;
      if(ball.vy>0 && crossedPaddleTop && overlapsPaddle){
        if(mysteryCurse.armed){startDualChallenge(targetV);return;}
        ball.y=paddle.y-ball.r;
        const hit=clamp((ball.x-(paddle.x+paddle.w/2))/(paddle.w/2),-1,1);
        const nextScore=score+1;
        const difficultyScore=gameplayScore()+1;
        const chaos=clamp(difficultyScore/150 + Math.max(0,difficultyScore-90)*.004,0,.98);
        const baseAngle=hit*(Math.PI/3);
        const randomAngle=rand(-1,1)*(Math.PI/6)*chaos;
        const movementAngle=clamp(paddle.vx/900,-1,1)*(Math.PI/18);
        let angle=clamp(baseAngle+randomAngle+movementAngle,-Math.PI*70/180,Math.PI*70/180);
        const minimumAngle=Math.PI*10/180;
        if(Math.abs(angle)<minimumAngle){
          const direction=Math.sign(hit)||Math.sign(paddle.vx)||Math.sign(ball.vx)||(Math.random()<.5?-1:1);
          angle=minimumAngle*direction;
        }
        ball.vx=Math.sin(angle)*targetV; ball.vy=-Math.cos(angle)*targetV;
        badLuckClimbs=0;
        runStats.rebounds++;secretRebound();paddleHitFeedback(ball.x);
        if(nextScore%10===0)shake=Math.max(shake,2.4);
        addScore(1,true);
        countRestRebound();
        burst(ball.x,paddle.y,ballImpactColor(),9);impactSound('paddle');haptic(11);
      }
      const barrierY=Math.min(H-24,paddle.y+paddle.h+22);
      if((rescueProtected()||eventState.barrierCharges>0)&&ball.vy>0&&ball.y+ball.r>=barrierY&&ball.y-ball.r<=barrierY+8){
        ball.y=barrierY-ball.r;ball.vy=-Math.abs(ball.vy);
        shake=Math.max(shake,4);flash=Math.max(flash,.25);
        if(rescueProtected()){if(secretRun&&secretRun.blackout)secretRun.blackoutFailed=true;burst(ball.x,barrierY,'#a7efff',8);tone(700,.08,'sine',.025);}
        else breakShield(ball.x,barrierY);
      }
      if(beginDefeat(ball))return;
      if(!rescueProtected()&&gameplayScore()>=111&&dangerZone.ttl>0&&dangerZone.hitCooldown<=0&&ball.x+ball.r>dangerZone.x&&ball.x-ball.r<dangerZone.x+dangerZone.w&&ball.y+ball.r>dangerZone.y&&ball.y-ball.r<dangerZone.y+dangerZone.h){
        dangerZone.hitCooldown=.38; ball.vx*=-.72; ball.vy*=.96; shake=Math.max(shake,3.5); toast('ZONA FALSA'); tone(170,.08,'square',.035);
      }
    }
    if(fakeBall.active&&eventState.fakeBallUntil>elapsed){
      const fakeLen=Math.hypot(fakeBall.vx,fakeBall.vy)||1,fakeSpeed=targetV*.97;
      fakeBall.vx=fakeBall.vx/fakeLen*fakeSpeed;fakeBall.vy=fakeBall.vy/fakeLen*fakeSpeed;
      fakeBall.x+=fakeBall.vx*dt;fakeBall.y+=fakeBall.vy*dt;
      if(fakeBall.x-fakeBall.r<0){fakeBall.x=fakeBall.r;fakeBall.vx=Math.abs(fakeBall.vx);}
      if(fakeBall.x+fakeBall.r>W){fakeBall.x=W-fakeBall.r;fakeBall.vx=-Math.abs(fakeBall.vx);}
      if(fakeBall.y-fakeBall.r<0){fakeBall.y=fakeBall.r;fakeBall.vy=Math.abs(fakeBall.vy);}
      if(fakeBall.vy>0&&fakeBall.y+fakeBall.r>=paddle.y){fakeBall.y=paddle.y-fakeBall.r;fakeBall.vy=-Math.abs(fakeBall.vy);}
      const fakeTrailStyle=movementTrailStyle();
      fakeBall.trail.push({x:fakeBall.x,y:fakeBall.y,life:1});if(fakeBall.trail.length>fakeTrailStyle.limit)fakeBall.trail.shift();
      fakeBall.trail.forEach(t=>t.life-=dt*fakeTrailStyle.fade);
    }
    const trailStyle=movementTrailStyle();
    ball.trail.push({x:ball.x,y:ball.y,life:1});
    if(ball.trail.length>trailStyle.limit)ball.trail.splice(0,ball.trail.length-trailStyle.limit);
    ball.trail.forEach(t=>t.life-=dt*trailStyle.fade);

    const magnetActive=modifiers.some(m=>m.type==='magnet');
    for(let i=objects.length-1;i>=0;i--){
      const o=objects[i];
      if(o.type==='coin'&&magnetActive){
        const dx=(paddle.x+paddle.w/2)-(o.x+o.size/2),dy=(paddle.y+paddle.h/2)-(o.y+o.size/2),dist=Math.hypot(dx,dy)||1;
        const pull=clamp(460+dist*2.1,460,1180);o.x+=dx/dist*pull*dt;o.y+=dy/dist*pull*dt;o.spin+=dt*8;
      }else{o.y+=o.vy*dt;o.spin+=dt*2;}
      if(o.y+o.size>=paddle.y && o.y<=paddle.y+paddle.h && o.x+o.size>=paddle.x && o.x<=paddle.x+paddle.w){
        objects.splice(i,1); burst(o.x+o.size/2,o.y+o.size/2,o.type==='coin'||o.golden?'#ffd84a':'#50dd79',18);
        if(o.type==='coin'){
          const rect=$('#coinsPill').getBoundingClientRect();
          coinFlights.push({x:o.x+o.size/2,y:o.y+o.size/2,toX:rect.left+rect.width/2,toY:rect.top+rect.height/2,age:0});
          coins++;runStats.coins++;storage.set('coins',coins);updateHUD();
          const pill=$('#coinsPill');pill.classList.remove('pop');void pill.offsetWidth;pill.classList.add('pop');
          playSfx('coin',.585);haptic(18);
        }
        else if(o.golden){openGoldenBox();}
        else{mysteryCurse.ignored=0;openBox();}
      } else if(o.type==='box'&&o.y>paddle.y+paddle.h){
        objects.splice(i,1);
        if(o.golden){nextBox=elapsed+15;}else ignoreMysteryBox();
      }
      else if(o.y>H+o.size) objects.splice(i,1);
    }
    for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=260*dt;p.life-=dt;if(p.life<=0)particles.splice(i,1);}
    if(ball.y-ball.r>H&&mode==='playing') endGame();
  }

  function beginDefeat(falling){
    // Só inicia depois de a bola inteira passar pela barra e não haver escudo.
    if(mode!=='playing'||rescueProtected()||score>=80||falling.done||falling.vy<=0||eventState.barrierCharges>0||falling.y-falling.r<=paddle.y+paddle.h)return false;
    const endY=H+falling.r+2,distance=Math.max(0,endY-falling.y);
    defeatAnimation={ball:falling,age:0,duration:.42,x:falling.x,y:falling.y,endY,
      dx:falling.vx*distance/falling.vy};
    mode='dying';dragging=false;setMusicActive(false);
    clearTimeout(eventBannerTimer);$('#eventBanner').className='';noticeUntil=0;
    tone(68,.14,'sine',.05);tone(51,.18,'sine',.032,.12);
    return true;
  }
  function updateDefeat(dt){
    const a=defeatAnimation;if(!a||mode!=='dying')return;
    a.age=Math.min(a.duration,a.age+dt);
    const t=a.age/a.duration,ease=1-Math.pow(1-t,2),b=a.ball;
    const width=Math.max(1,W-2*b.r),raw=((a.x+a.dx*ease-b.r)%(width*2)+width*2)%(width*2);
    b.x=b.r+(raw>width?width*2-raw:raw);b.y=a.y+(a.endY-a.y)*ease;
    b.trail.push({x:b.x,y:b.y,life:1});if(b.trail.length>12)b.trail.shift();
    b.trail.forEach(p=>p.life=Math.max(0,(p.life??1)-dt*5));
    shake=Math.max(0,shake-dt*30);flash=Math.max(0,flash-dt);
    if(a.age>=a.duration){defeatAnimation=null;endGame();}
  }
  function endGame(){
    invalidateSecretSurvival();
    defeatAnimation=null;
    if(score>=MAX_SCORE){finishGame('150 · IMPOSSÍVEL');return;}
    mysteryCurse.ignored=0;mysteryCurse.armed=false;mysteryCurse.dual=null;
    eventState.activeChallenge=null;restHits=0;freeBoxQueued=false;
    cancelAnimationFrame(raf);setMusicActive(false);shake=8;haptic(120);tone(105,.28,'sawtooth',.06);
    if(eventState.hiddenLives>0){useHiddenLife();return;}
    if(score>=135){finishGame('Morreu, acabou.');return;}
    if(revivesLeft<=0){finishGame('Foi quase.');return;}
    offerRevive();
  }

  function finishGame(title='Foi quase.'){
    mode='over';setMusicActive(false);clearInterval(reviveTimer);clearInterval(adTimer);
    saveRunResult();
    secretPanel.className='';secretGlow.className='';
    updateHUD();
    $('#finalScore').textContent=score; $('#bestScore').textContent=best;
    $('#gameOverTitle').textContent=tr(title);
    $('#recordResult').textContent=tr(recordSummary());
    $('#rank').textContent=tr('Você chegou ao ')+tr(visualState().name);
    $('#runPrimary').textContent=runStats.rebounds+' '+tr(runStats.rebounds===1?'REBATIDA':'REBATIDAS')+' · '+runStats.boxes+' '+tr(runStats.boxes===1?'CAIXA':'CAIXAS');
    $('#runSecondary').textContent=runStats.trolls+' '+tr(runStats.trolls===1?'TROLL':'TROLLS')+' · '+runStats.reliefs+' '+tr(runStats.reliefs===1?'ALÍVIO':'ALÍVIOS')+' · '+runStats.coins+' '+tr(runStats.coins===1?'MOEDA':'MOEDAS');
    if(secretRun&&secretRun.rewards.length)$('#runSecondary').textContent+=' · '+tr('SEGREDOS')+': '+secretRun.rewards.map(r=>tr(r.name)+' — '+tr(r.prize)).join(' / ');
    setTimeout(()=>show('#gameOver'),220);
  }

  function setupRescue(duration=3){
    invalidateSecretSurvival();
    eventState.activeChallenge=null;restHits=0;freeBoxQueued=false;
    mysteryCurse.ignored=0;mysteryCurse.armed=false;mysteryCurse.dual=null;
    modifiers=[];controlsSign=1;objects=[];dragging=false;
    fakeBall.active=false;fakeBall.trail=[];eventState.fakeBallUntil=0;
    syncActiveEffect();windX=0;windTarget=0;windClock=0;dangerZone.ttl=0;dangerZone.w=0;
    shake=0;flash=0;defeatAnimation=null;
    clearTimeout(eventBannerTimer);$('#eventBanner').className='';noticeUntil=0;
    rescueDuration=duration;rescueUntil=elapsed+duration;nextCoin=elapsed+duration+3;nextBox=elapsed+15;
    paddle.w=paddle.baseW*currentPaddleFactor();paddle.x=W/2-paddle.w/2;paddle.vx=0;targetX=paddle.x;pointerX=W/2;
    const speed=clamp(H*.49,390,525)*currentSpeedFactor();
    ball.x=W/2;ball.y=H*.36;ball.vx=speed*.28;ball.vy=-speed*Math.sqrt(1-.28*.28);ball.trail=[];
    updateHUD();
  }
  function useHiddenLife(){
    runStats.extraLivesUsed++;
    eventState.hiddenLives--;eventState.megaPaddleUntil=0;eventState.barrierCharges=0;
    setupRescue();
    clearInterval(reviveTimer);clearInterval(adTimer);mode='countdown';
    $('#reviveBrand').textContent=tr('BÔNUS RARO');$('#reviveTitle').textContent=tr('Segunda chance');
    $('#reviveStatus').textContent=tr('Sua chance extra: 3 segundos de proteção ao voltar.');$('#watchReviveAd').style.display='none';$('#giveUp').style.display='none';
    let remaining=3;$('#reviveCountdown').textContent=remaining;show('#reviveScreen');render();
    reviveTimer=setInterval(()=>{
      remaining--;$('#reviveCountdown').textContent=remaining>0?remaining:tr('VAI!');
      if(remaining<=0){clearInterval(reviveTimer);mode='playing';hideAll();setMusicActive(true);last=performance.now();raf=requestAnimationFrame(loop);}
    },1000);
  }

  function offerRevive(){
    mode='revive'; clearInterval(reviveTimer); clearInterval(adTimer);
    let remaining=7;
    $('#reviveBrand').textContent=tr('AINDA NÃO ACABOU');
    $('#reviveTitle').textContent=tr('Continuar?');
    $('#reviveCountdown').textContent=remaining;
    $('#reviveStatus').textContent=tr('Você tem sete segundos para decidir.');
    $('#watchReviveAd').style.display='block'; $('#watchReviveAd').disabled=false;
    $('#giveUp').style.display='block';
    show('#reviveScreen');
    reviveTimer=setInterval(()=>{
      remaining--;
      $('#reviveCountdown').textContent=remaining;
      if(remaining<=0){clearInterval(reviveTimer);finishGame('Tempo esgotado.');}
    },1000);
  }

  function requestReviveAd(){
    if(mode!=='revive')return;
    clearInterval(reviveTimer); clearInterval(adTimer);
    $('#watchReviveAd').disabled=true; $('#watchReviveAd').style.display='none'; $('#giveUp').style.display='none';
    $('#reviveBrand').textContent=tr('ANÚNCIO RECOMPENSADO');
    $('#reviveTitle').textContent=tr('Preparando resgate');
    $('#reviveStatus').textContent=tr('Simulação do anúncio para este protótipo.');
    let remaining=3; $('#reviveCountdown').textContent=remaining;
    adTimer=setInterval(()=>{
      remaining--;
      $('#reviveCountdown').textContent=remaining>0?remaining:'✓';
      if(remaining<=0){clearInterval(adTimer);revivesLeft--;runStats.adRescues++;prepareRevive();}
    },1000);
  }

  function prepareRevive(){
    // O resgate por vídeo encerra todos os bônus e trolls da tentativa anterior.
    eventState.megaPaddleUntil=0;eventState.fakeBallUntil=0;
    eventState.barrierCharges=0;eventState.hiddenLives=0;
    eventState.activeEffect=null;eventState.cooldownUntil=0;barrierPulse=0;
    setupRescue(5);render();
    mode='countdown';$('#reviveBrand').textContent=tr('RESGATE ATIVADO');$('#reviveTitle').textContent=tr('Prepare-se');
    $('#reviveStatus').textContent=tr('5 segundos de proteção. Todos os efeitos anteriores foram encerrados.');$('#watchReviveAd').style.display='none';
    let remaining=3;$('#reviveCountdown').textContent=remaining;
    reviveTimer=setInterval(()=>{
      remaining--;$('#reviveCountdown').textContent=remaining>0?remaining:tr('VAI!');
      if(remaining<=0){clearInterval(reviveTimer);mode='playing';hideAll();setMusicActive(true);last=performance.now();raf=requestAnimationFrame(loop);}
    },1000);
  }

  function roundRect(c,x,y,w,h,r){c.beginPath();c.roundRect(x,y,w,h,r);}
  // Teste visual: use 'circles' para restaurar os círculos originais.
  const BACKGROUND_STYLE='soft';
  let softBackgroundLayer=null;
  function drawBackgroundTexture(visual){
    if(visual.blackout)return;
    ctx.save();
    if(BACKGROUND_STYLE==='circles'){
      ctx.globalAlpha=.055;
      for(let i=0;i<3;i++){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(W*(.15+i*.42),H*(.28+i*.24),W*(.48-i*.07),0,Math.PI*2);ctx.fill();}
    }else{
      // Luz estática nas bordas; camada reaproveitada até mudar o tamanho da tela.
      if(!softBackgroundLayer||softBackgroundLayer.width!==W||softBackgroundLayer.height!==H){
        softBackgroundLayer=document.createElement('canvas');softBackgroundLayer.width=W;softBackgroundLayer.height=H;
        const c=softBackgroundLayer.getContext('2d');
        for(const light of [{x:-.12,y:.12,r:.9,a:.065},{x:1.12,y:.82,r:.78,a:.045}]){
          const x=W*light.x,y=H*light.y,r=W*light.r;
          const glow=c.createRadialGradient(x,y,0,x,y,r);
          glow.addColorStop(0,'rgba(255,255,255,'+light.a+')');
          glow.addColorStop(.4,'rgba(255,255,255,'+(light.a*.35)+')');
          glow.addColorStop(1,'rgba(255,255,255,0)');
          c.fillStyle=glow;c.fillRect(0,0,W,H);
        }
      }
      ctx.drawImage(softBackgroundLayer,0,0);
    }
    ctx.restore();
  }
  function drawBackground(){
    const visual=visualState(),g=ctx.createLinearGradient(0,0,W,H);
    g.addColorStop(0,visual.top);g.addColorStop(1,visual.bottom);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    drawBackgroundTexture(visual);
    if(!mysteryCurse.dual&&!rescueProtected()&&gameplayScore()>=111&&dangerZone.ttl>0){
      const pulse=.28+Math.sin(elapsed*8)*.08;
      ctx.save();ctx.globalAlpha=pulse;ctx.fillStyle='#ff3b6b';ctx.fillRect(dangerZone.x,dangerZone.y,dangerZone.w,dangerZone.h);
      ctx.globalAlpha=.78;ctx.strokeStyle='#ffd0dc';ctx.lineWidth=2;ctx.setLineDash([7,5]);ctx.strokeRect(dangerZone.x,dangerZone.y,dangerZone.w,dangerZone.h);ctx.setLineDash([]);
      ctx.globalAlpha=.9;ctx.fillStyle='#fff';ctx.font='900 13px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('?',dangerZone.x+dangerZone.w/2,dangerZone.y+dangerZone.h/2);ctx.restore();ctx.globalAlpha=1;
    }
    if(flash>0){ctx.fillStyle=`rgba(255,255,255,${flash*.4})`;ctx.fillRect(0,0,W,H);}
  }
  function neonTrailStyle(){
    if(restHits>0||score<96||score>100)return {limit:12,fade:4,alpha:0,blur:0,width:0};
    const progress=1;
    return {limit:Math.round(8+20*Math.pow(progress,1.3)),fade:4-2.2*progress,
      alpha:.32+.68*progress,blur:6+17*progress,width:3+5*progress};
  }
  function movementTrailStyle(skin=activeSkin()){
    if(restHits===0&&score>=96&&score<=100)return neonTrailStyle();
    const profile=TRAIL_PROFILES[skin.id];
    return profile?{limit:12,fade:4,alpha:1,blur:0,width:0}:{limit:12,fade:4,alpha:0,blur:0,width:0};
  }
  function teleportBall(){
    teleportPulses=[{x:ball.x,y:ball.y,start:elapsed}];
    ball.x=rand(ball.r+8,W-ball.r-8);ball.y=clamp(ball.y,H*.18,H*.52);ball.vy=Math.abs(ball.vy);
    ball.trail=[];teleportPulses.push({x:ball.x,y:ball.y,start:elapsed});
  }
  function drawTeleportPulses(){
    teleportPulses=teleportPulses.filter(p=>elapsed-p.start<.35);
    for(const p of teleportPulses){
      const t=clamp((elapsed-p.start)/.35,0,1);
      ctx.save();ctx.globalAlpha=(1-t)*.8;ctx.strokeStyle='#bfe9ff';ctx.lineWidth=2;ctx.shadowColor='#bfe9ff';ctx.shadowBlur=7;
      ctx.beginPath();ctx.arc(p.x,p.y,ball.r*(.8+t*1.5),0,Math.PI*2);ctx.stroke();ctx.restore();
    }
  }
  function drawBall(){
    if(mysteryCurse.dual){
      for(let i=0;i<2;i++){
        const b=mysteryCurse.dual.balls[i];if(b.done)continue;const color=i?'#9adfff':'#ffffff';
        ctx.save();ctx.strokeStyle=color;ctx.shadowColor=color;ctx.shadowBlur=14;
        ctx.lineWidth=3;ctx.lineCap='round';ctx.globalAlpha=.6;
        for(let n=1;n<b.trail.length;n++){
          ctx.beginPath();ctx.moveTo(b.trail[n-1].x,b.trail[n-1].y);
          ctx.lineTo(b.trail[n].x,b.trail[n].y);ctx.stroke();
        }
        ctx.globalAlpha=1;ctx.fillStyle=color;ctx.beginPath();
        ctx.arc(b.done?clamp(paddle.x+paddle.w/2+(i?1:-1)*b.r*1.3,b.r,W-b.r):b.x,
          b.done?paddle.y-b.r-3:b.y,b.r,0,Math.PI*2);ctx.fill();
        ctx.shadowBlur=0;ctx.fillStyle='#0a1730';ctx.font='900 '+Math.round(b.r*1.1)+'px sans-serif';
        ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String(Math.max(0,5-b.hits)),b.x,b.y+1);ctx.restore();
      }
      return;
    }
    if(mysteryCurse.armed){
      ctx.save();ctx.shadowColor='#9ef9bd';ctx.shadowBlur=22;ctx.fillStyle='#2bbd72';
      roundRect(ctx,ball.x-ball.r,ball.y-ball.r,ball.r*2,ball.r*2,ball.r*.3);ctx.fill();
      ctx.fillStyle='#ffffff';ctx.font=`900 ${ball.r*1.7}px sans-serif`;
      ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('?',ball.x,ball.y+1);ctx.restore();return;
    }
    drawMovingBall(ball);
  }
  function drawMovingBall(movingBall){
    const skin=activeSkin(),blackout=restHits===0&&score>=96&&score<=100;
    const neon=blackout;
    if(neon){
      const style=neonTrailStyle();
      ctx.save();ctx.lineCap='round';ctx.shadowColor='#ffffff';ctx.shadowBlur=style.blur;
      for(let i=1;i<movingBall.trail.length;i++){
        const from=movingBall.trail[i-1],to=movingBall.trail[i],strength=i/(movingBall.trail.length-1);
        ctx.globalAlpha=clamp(to.life,0,1)*(.25+strength*.75)*style.alpha;
        ctx.strokeStyle='#ffffff';ctx.lineWidth=1+strength*(style.width-1);
        ctx.beginPath();ctx.moveTo(from.x,from.y);ctx.lineTo(to.x,to.y);ctx.stroke();
      }
      if(blackout){
        // Ponta curta e clara: continua sendo rastro, sem revelar o corpo da bola.
        const length=Math.hypot(movingBall.vx,movingBall.vy)||1;
        ctx.globalAlpha=1;ctx.strokeStyle='#fff';ctx.lineWidth=style.width*.75;ctx.shadowBlur=10;
        ctx.beginPath();ctx.moveTo(movingBall.x-movingBall.vx/length*7,movingBall.y-movingBall.vy/length*7);ctx.lineTo(movingBall.x,movingBall.y);ctx.stroke();
      }
      ctx.restore();ctx.globalAlpha=1;
      if(blackout)return;
    }
    if(!neon&&skin.id==='fire')drawFireTrail(ctx,movingBall.trail,movingBall.r,elapsed);
    else if(!neon&&TRAIL_PROFILES[skin.id])drawEmojiSkinTrail(ctx,skin,movingBall.trail,movingBall.r,elapsed);
    ctx.globalAlpha=1;
    if(skin.image)drawSkin(ctx,skin,movingBall.x,movingBall.y,movingBall.r);
    // Emojis continuam no overlay DOM estável; PNGs são desenhados no canvas.
  }
  function drawFireTrail(c,trail,r,time){
    const points=trail.slice(-12);
    for(let i=0;i<points.length-1;i++){
      const p=points[i],next=points[i+1],strength=(i+1)/points.length;
      const size=r*(.18+strength*.52),flicker=Math.sin(time*19+i*2.4)*size*.32;
      c.save();c.translate(p.x,p.y);c.rotate(Math.atan2(next.y-p.y,next.x-p.x)-Math.PI/2);
      c.globalAlpha=clamp(p.life??1,0,1)*strength*.65;
      c.fillStyle=i%2?'#ff792b':'#ff421c';c.shadowColor='#ff6a1b';c.shadowBlur=7;
      c.beginPath();c.moveTo(-size,0);c.quadraticCurveTo(-size,-size,flicker,-size*2.7);
      c.quadraticCurveTo(size,-size,size,0);c.quadraticCurveTo(0,size,-size,0);c.fill();
      c.shadowBlur=0;c.fillStyle='#ffe291';c.beginPath();c.arc(0,0,size*.42,0,Math.PI*2);c.fill();c.restore();
    }
  }
  function drawSkin(c,skin,x,y,r){
    if(skin.image&&skinImages[skin.id]){
      drawAsset(c,skin,x,y,r*2,r*2);return;
    }
    c.save();c.shadowBlur=0;c.globalAlpha=1;
    c.font=`normal ${r*2}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
    c.textAlign='center';c.textBaseline='middle';c.fillText(skin.icon,x,y+1);c.restore();
  }

  function drawFakeBall(){
    if(!fakeBall.active||eventState.fakeBallUntil<=elapsed)return;
    ctx.save();
    drawMovingBall(fakeBall);
    const pulse=Math.pow(Math.max(0,Math.sin(elapsed*3.5)),10)*.55;
    ctx.globalAlpha=pulse;ctx.strokeStyle='#bdeaff';ctx.lineWidth=2;ctx.shadowBlur=8;
    ctx.beginPath();ctx.arc(fakeBall.x,fakeBall.y,fakeBall.r+3,0,Math.PI*2);ctx.stroke();ctx.restore();
  }

  function paddleHitFeedback(x){
    paddleImpact=1;
  }
  function drawPaddleFlashes(){
    if(modifiers.some(m=>m.type==='ghostPaddle'))return;
    for(const hit of paddleFlashes){
      const t=hit.age/.18,radius=9+16*t,alpha=(1-t)*(1-t);
      ctx.save();ctx.globalAlpha=alpha;
      const g=ctx.createRadialGradient(hit.x,hit.y,0,hit.x,hit.y,radius);
      g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.3,'rgba(186,231,255,.65)');g.addColorStop(1,'rgba(186,231,255,0)');
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(hit.x,hit.y,radius,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='#ffffff';ctx.lineWidth=2*(1-t)+.5;
      ctx.beginPath();ctx.arc(hit.x,hit.y,4+18*t,Math.PI,Math.PI*2);ctx.stroke();ctx.restore();
    }
  }
  function drawPaddleSkin(c,skin,x,y,w,h){
    const img=skinImages[skin.id];if(!img)return false;
    const crop=getAssetCrop(skin);
    const sw=crop?crop.sw:img.naturalWidth,sh=crop?crop.sh:img.naturalHeight;
    if(!sw||!sh)return false;

    // Todas as skins ocupam exatamente a mesma caixa visual.
    // O recorte transparente é removido antes, então comprimento e espessura
    // percebidos ficam iguais independentemente do PNG original.
    const dw=w,dh=Math.max(h,12);
    const cx=x+w/2,cy=y+h/2;
    c.save();c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
    c.shadowColor='rgba(0,0,0,.22)';c.shadowBlur=6;c.shadowOffsetY=3;
    if(crop)c.drawImage(img,crop.sx,crop.sy,crop.sw,crop.sh,cx-dw/2,cy-dh/2,dw,dh);
    else c.drawImage(img,cx-dw/2,cy-dh/2,dw,dh);
    c.restore();return true;
  }
  function drawPaddle(){
    if(modifiers.some(m=>m.type==='ghostPaddle'))return;
    ctx.shadowColor='rgba(0,0,0,.25)';ctx.shadowBlur=16;ctx.shadowOffsetY=8;
    const stretch=paddle.w<=ball.r*2+.1?0:paddleImpact*Math.min(15,paddle.w*.24),height=paddle.h*(1-paddleImpact*.22);
    const currentPaddle=paddleSkins.find(s=>s.id===selectedPaddle)||paddleSkins[0];
    const visualX=paddle.x-stretch/2,visualW=paddle.w+stretch;

    // Usa a mesma linguagem visual do preview da loja:
    // todas as skins cabem na mesma espessura perceptiva.
    const visualThickness=PADDLE_VISUAL_THICKNESS;
    const visualY=paddle.y+(height-visualThickness)/2;

    const rendered=drawPaddleSkin(ctx,currentPaddle,visualX,visualY,visualW,visualThickness);
    if(!rendered){
      const g=ctx.createLinearGradient(0,visualY,0,visualY+visualThickness);g.addColorStop(0,'#fff');g.addColorStop(1,'#dce5f4');ctx.fillStyle=g;
      roundRect(ctx,visualX,visualY,visualW,visualThickness,visualThickness/2);ctx.fill();
    }
    ctx.shadowBlur=0;ctx.shadowOffsetY=0;
    const megaGlow=eventState.megaPaddleUntil>elapsed?clamp((eventState.megaPaddleUntil-elapsed-9.3)/.7,0,1):0;
    if(megaGlow>0){
      ctx.save();ctx.globalAlpha=megaGlow;ctx.strokeStyle='#ffe19a';ctx.shadowColor='#ffd45a';ctx.shadowBlur=18;ctx.lineWidth=3;
      roundRect(ctx,paddle.x-2,paddle.y-2,paddle.w+4,paddle.h+4,(paddle.h+4)/2);ctx.stroke();ctx.restore();
    }
  }
  function activeEffectIndicators(){
    const entries=modifiers.filter(m=>m.end>elapsed).map(m=>({
      label:effectNames[m.type]||'Efeito',troll:trollTypes.includes(m.type),
      rule:m.expiresOn,remaining:m.end-elapsed,duration:m.duration||1.2
    }));
    if(eventState.megaPaddleUntil>elapsed)entries.push({label:'Mega barra',remaining:eventState.megaPaddleUntil-elapsed,duration:10});
    if(eventState.fakeBallUntil>elapsed)entries.push({label:'Bola falsa',remaining:eventState.fakeBallUntil-elapsed,duration:9,troll:true});
    return entries;
  }
  function drawEffectIndicators(){
    const ghost=modifiers.some(m=>m.type==='ghostPaddle');
    const entries=activeEffectIndicators();
    const center=ghost?W/2:paddle.x+paddle.w/2;
    ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='800 10px sans-serif';
    entries.forEach((effect,i)=>{
      const suffix=effect.rule==='pickup'?'PEGUE':effect.rule==='spawn'?'ATÉ A PRÓXIMA':Math.ceil(effect.remaining)+'s';
      const label=effect.label.toUpperCase()+' · '+suffix;
      const width=Math.min(W-20,Math.max(132,ctx.measureText(label).width+24+(effect.rule?18:0)));
      const x=clamp(center-width/2,10,W-width-10),y=paddle.y-31-i*29;
      ctx.fillStyle='rgba(5,14,29,.9)';roundRect(ctx,x,y,width,24,8);ctx.fill();
      ctx.fillStyle=effect.troll?'#ffb2ac':'#ffe5a2';
      ctx.fillText(label,x+width/2+(effect.rule?8:0),y+10);
      if(effect.rule){
        ctx.strokeStyle=ctx.fillStyle;ctx.lineWidth=1.5;ctx.strokeRect(x+7,y+5,12,12);ctx.fillText('?',x+13,y+11);
      }else{
        ctx.globalAlpha=.2;ctx.fillRect(x+8,y+20,width-16,2);ctx.globalAlpha=1;
        ctx.fillRect(x+8,y+20,(width-16)*clamp(effect.remaining/effect.duration,0,1),2);
      }
    });
    if(!ghost&&modifiers.some(m=>m.type==='invert')){
      ctx.strokeStyle='#ffb2ac';ctx.lineWidth=2;ctx.lineCap='round';
      const y=paddle.y+paddle.h/2;
      for(const direction of [-1,1]){
        const x=direction<0?paddle.x-5:paddle.x+paddle.w+5;
        ctx.beginPath();ctx.moveTo(x-direction*2,y);ctx.lineTo(x+direction*10,y);
        ctx.moveTo(x+direction*5,y-4);ctx.lineTo(x+direction*10,y);ctx.lineTo(x+direction*5,y+4);ctx.stroke();
      }
    }
    ctx.restore();
  }
  function drawBarrier(){
    if(rescueProtected()){
      const secondsLeft=rescueUntil-elapsed;
      const y=Math.min(H-24,paddle.y+paddle.h+22),remaining=clamp(secondsLeft/rescueDuration,0,1);
      const pulse=secondsLeft<=2?.5+.5*Math.cos((2-secondsLeft)*Math.PI*2):1;
      ctx.save();ctx.globalAlpha=.65+.35*pulse;ctx.strokeStyle='#b8f4ff';ctx.shadowColor='#69dfff';ctx.shadowBlur=10+6*pulse;ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(8,y);ctx.lineTo(W-8,y);ctx.stroke();
      ctx.shadowBlur=0;ctx.fillStyle='#b8f4ff';ctx.fillRect(8,y+6,(W-16)*remaining,2);
      ctx.globalAlpha=1;ctx.font='800 10px sans-serif';ctx.textAlign='center';ctx.fillText(tr('PROTEÇÃO · ')+Math.ceil(secondsLeft)+'s',W/2,y+22);ctx.restore();return;
    }
    if(eventState.barrierCharges<=0)return;
    const y=Math.min(H-24,paddle.y+paddle.h+22),x=12,w=W-24,h=8;
    ctx.save();ctx.shadowColor='#ffc83d';ctx.shadowBlur=8+barrierPulse*18;
    ctx.globalAlpha=.68+barrierPulse*.3;ctx.strokeStyle='#ffdc73';ctx.lineWidth=2;
    // Segmentos vazados: proteção fixa, sem o volume da barra controlável.
    const count=Math.max(6,Math.floor(w/30)),gap=7,segment=(w-gap*(count-1))/count;
    for(let i=0;i<count;i++){
      const left=x+i*(segment+gap);
      ctx.beginPath();ctx.moveTo(left,y);ctx.lineTo(left+segment,y);
      ctx.lineTo(left+segment-3,y+h);ctx.lineTo(left+3,y+h);ctx.closePath();ctx.stroke();
    }
    ctx.globalAlpha=.95;ctx.shadowBlur=0;ctx.fillStyle='#ffe398';
    ctx.font='800 10px sans-serif';ctx.textAlign='center';ctx.textBaseline='top';
    ctx.fillText(tr('ESCUDO · 1 QUEDA'),W/2,y+h+5);ctx.restore();
  }
  function drawSportChallenge(){
    if(restHits>0){
      ctx.save();ctx.textAlign='center';ctx.fillStyle='#fff';ctx.shadowColor='#123';ctx.shadowBlur=6;
      ctx.font='800 16px sans-serif';ctx.fillText(tr('RESPIRO · ')+restHits+' '+tr(restHits===1?'REBATIDA':'REBATIDAS'),W/2,H*.22);ctx.restore();
    }
    const c=eventState.activeChallenge;if(!c)return;
    const x=c.x,y=c.y,w=c.w,remaining=Math.max(0,c.endAt-elapsed);
    ctx.save();ctx.textAlign='center';ctx.textBaseline='bottom';

    if(basketballHoopReady&&basketballHoopImage.naturalWidth&&basketballHoopImage.naturalHeight){
      const drawW=95;
      const drawH=drawW*(basketballHoopImage.naturalHeight/basketballHoopImage.naturalWidth);
      const rimRatio=.48;
      ctx.imageSmoothingEnabled=true;
      ctx.imageSmoothingQuality='high';
      ctx.drawImage(basketballHoopImage,x-drawW/2,y-drawH*rimRatio,drawW,drawH);
    }else{
      ctx.lineCap='round';ctx.lineJoin='round';
      ctx.shadowColor='#ffffff';ctx.shadowBlur=12;ctx.lineWidth=4;
      ctx.strokeStyle='#ffb443';ctx.beginPath();ctx.ellipse(x,y,w*.42,8,0,0,Math.PI*2);ctx.stroke();
      ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=2;ctx.beginPath();
      ctx.moveTo(x-w*.38,y+8);ctx.lineTo(x-w*.24,y+26);ctx.lineTo(x+w*.24,y+26);ctx.lineTo(x+w*.38,y+8);ctx.stroke();
    }

    ctx.shadowBlur=0;ctx.fillStyle='#ffffff';ctx.font='800 12px sans-serif';
    const hudY=y-w*.98;
    ctx.fillText(tr('CESTA · ')+Math.ceil(remaining)+'s',x,hudY);
    ctx.fillStyle='rgba(255,255,255,.3)';ctx.fillRect(x-w/2,hudY+8,w,3);
    ctx.fillStyle='#fff';ctx.fillRect(x-w/2,hudY+8,w*clamp(remaining/17,0,1),3);
    ctx.restore();
  }
  function drawObjects(){
    for(const o of objects){const cx=o.x+o.size/2,cy=o.y+o.size/2;
      ctx.save();ctx.translate(cx,cy);ctx.rotate(o.type==='coin'?o.spin:Math.sin(o.spin)*.08);ctx.translate(-cx,-cy);
      ctx.shadowColor='rgba(0,0,0,.22)';ctx.shadowBlur=14;ctx.shadowOffsetY=7;
      if(o.type==='coin'){
        const g=ctx.createRadialGradient(cx-o.size*.2,cy-o.size*.25,2,cx,cy,o.size*.55);g.addColorStop(0,'#fff59b');g.addColorStop(.36,'#ffd83d');g.addColorStop(1,'#ed9d08');ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,o.size*.48,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.45)';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#fff3a7';ctx.font=`900 ${o.size*.52}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('$',cx,cy+1);
      }else{
        const pulse=2+Math.sin(elapsed*7)*2;
        ctx.shadowColor=o.golden?'#ffcc36':'#000000';ctx.shadowBlur=o.golden?26:20;
        const g=ctx.createLinearGradient(o.x,o.y,o.x+o.size,o.y+o.size);
        g.addColorStop(0,o.golden?'#fff1a2':'#62e678');g.addColorStop(1,o.golden?'#df9309':'#159447');ctx.fillStyle=g;
        roundRect(ctx,o.x,o.y,o.size,o.size,11);ctx.fill();ctx.shadowBlur=0;
        ctx.strokeStyle='#ffffff';ctx.lineWidth=4;roundRect(ctx,o.x-pulse,o.y-pulse,o.size+pulse*2,o.size+pulse*2,13);ctx.stroke();
        ctx.fillStyle=o.golden?'#573304':'#fff';ctx.font=`900 ${o.size*.66}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('?',cx,cy+2);
        if(o.golden){
          ctx.shadowColor='#000';ctx.shadowBlur=5;ctx.fillStyle='#fff3af';ctx.font='900 11px sans-serif';
          ctx.textBaseline='bottom';ctx.fillText(tr('★ DOURADA'),cx,o.y-10);
        }
      }ctx.restore();
    }
  }
  function drawCoinFlights(){
    for(const coin of coinFlights){
      const t=clamp(coin.age/.48,0,1),e=1-Math.pow(1-t,3);
      const x=coin.x+(coin.toX-coin.x)*e,y=coin.y+(coin.toY-coin.y)*e;
      ctx.save();ctx.globalAlpha=1-t*.25;ctx.fillStyle='#ffd548';ctx.strokeStyle='#fff4ad';ctx.lineWidth=2;
      ctx.shadowColor='#ffe782';ctx.shadowBlur=14;ctx.beginPath();ctx.arc(x,y,12*(1-.25*t),0,Math.PI*2);ctx.fill();ctx.stroke();ctx.restore();
    }
  }
  function drawStartHint(){
    if(startHintRemaining<=0||mode!=='playing')return;
    const age=2-startHintRemaining,span=Math.min(60,W*.16),center=W/2;
    const x=center+Math.sin(age*Math.PI*2)*span,y=paddle.y-42;
    ctx.save();ctx.globalAlpha=Math.min(1,startHintRemaining*4);ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=2;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(center-span,y);ctx.lineTo(center+span,y);
    ctx.moveTo(center-span+6,y-4);ctx.lineTo(center-span,y);ctx.lineTo(center-span+6,y+4);
    ctx.moveTo(center+span-6,y-4);ctx.lineTo(center+span,y);ctx.lineTo(center+span-6,y+4);ctx.stroke();
    ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=8;ctx.font='36px sans-serif';ctx.textAlign='center';ctx.textBaseline='top';
    ctx.fillStyle='#fff';ctx.fillText('👆',x,y-8);ctx.restore();
  }
  function updateFireEmojiOverlay(){
    const main=document.querySelector('#fireEmojiOverlay'),fake=document.querySelector('#fakeFireEmojiOverlay');
    const skin=activeSkin();
    const canShow=mode==='playing'&&!mysteryCurse.dual&&!mysteryCurse.armed;
    const blackout=restHits===0&&score>=96&&score<=100;
    function place(node,b,visible){
      if(!visible){node.style.display='none';return;}
      if(node.textContent!==skin.icon)node.textContent=skin.icon;
      node.style.display='block';node.style.left=b.x+'px';node.style.top=b.y+'px';node.style.fontSize=(b.r*2)+'px';
    }
    const useEmojiOverlay=!skin.image;
    place(main,ball,canShow&&!blackout&&useEmojiOverlay);
    place(fake,fakeBall,canShow&&!blackout&&useEmojiOverlay&&fakeBall.active&&eventState.fakeBallUntil>elapsed);
  }
  function render(){
    secretPanel.style.visibility=mode==='playing'?'visible':'hidden';secretGlow.style.visibility=mode==='playing'?'visible':'hidden';
    if(elapsed>=achievementUntil||!['playing','paused'].includes(mode))$('#achievement').className='';
    ctx.save(); if(shake>0)ctx.translate(rand(-shake,shake),rand(-shake,shake));
    drawBackground();drawSportChallenge();drawObjects();
    for(const p of particles){ctx.globalAlpha=clamp(p.life/.55,0,1);ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
    drawSkinTrailParticles();drawTeleportPulses();drawFakeBall();drawBall();drawPaddle();drawBarrier();drawCoinFlights();drawEffectIndicators();drawStartHint();ctx.restore();updateFireEmojiOverlay();
  }
  function loop(now){
    if(mode!=='playing'&&mode!=='dying')return;
    const dt=Math.min(.033,(now-last)/1000||0);last=now;
    if(mode==='dying')updateDefeat(dt);else update(dt);
    render();
    if(mode==='playing'||mode==='dying')raf=requestAnimationFrame(loop);
  }

  function openSkip25Modal(){
    if(mode!=='playing'||startHintRemaining<=0||!skip25EligibleThisRun)return;
    $('#skip25Offer').classList.remove('show');
    skip25ModalOpen=true;setMusicActive(false);mode='ad';show('#adScreen');
    $('#adCountdown').hidden=true;$('#skip25Watch').hidden=false;$('#skip25Close').hidden=false;
    $('#skip25AdNote').textContent=tr('Toque no play para assistir.');
  }
  function closeSkip25Modal(){
    if(!skip25ModalOpen)return;
    clearInterval(adTimer);skip25ModalOpen=false;mode='playing';$('#adScreen').classList.add('hidden');
    setMusicActive(true);last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);
  }
  function requestRewardedStart(){
    if(!skip25ModalOpen)return;
    ensureAudio();clearInterval(adTimer);$('#skip25Watch').hidden=true;$('#skip25Close').hidden=true;
    $('#adCountdown').hidden=false;let remaining=3;$('#adCountdown').textContent=remaining;
    $('#skip25AdNote').textContent=tr('Simulação do anúncio para este protótipo.');
    adTimer=setInterval(()=>{
      remaining--;$('#adCountdown').textContent=remaining>0?remaining:'✓';
      if(remaining<=0){clearInterval(adTimer);skip25ModalOpen=false;tone(760,.16,'sine',.05);setTimeout(()=>startGame(25),350);}
    },1000);
  }

  function setTarget(clientX){
    if(mode!=='playing')return;
    if(!dragging){pointerX=clientX;dragging=true;return;}
    const delta=(clientX-pointerX)*1.2; pointerX=clientX; targetX=clamp(targetX+delta,7,W-paddle.w-7);
    if(startHintRemaining>0&&Math.abs(delta)>0){
      startHintRemaining=0;
      $('#skip25Offer').classList.remove('show');
      paddle.x=targetX;
    }
  }
  canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture?.(e.pointerId);dragging=false;setTarget(e.clientX);});
  canvas.addEventListener('pointermove',e=>{if(e.buttons||e.pointerType==='touch')setTarget(e.clientX);});
  canvas.addEventListener('pointerup',()=>dragging=false);
  canvas.addEventListener('pointercancel',()=>dragging=false);

  $('#play').onclick=()=>startGame(0); $('#again').onclick=()=>startGame(0);
  $('#skip25Offer').onclick=openSkip25Modal;
  $('#skip25Watch').onclick=requestRewardedStart;
  $('#skip25Close').onclick=closeSkip25Modal;
  $('#watchReviveAd').onclick=requestReviveAd;
  $('#giveUp').onclick=()=>{
    if(mode!=='revive')return;
    saveRunResult();
    startGame(0);
  };
  $('#home').onclick=()=>{setMusicActive(false);reset(0);mode='menu';show('#start');render();};
  $('#pause').onclick=()=>{if(mode==='playing'||mode==='dying'){pausedFrom=mode;mode='paused';setMusicActive(false);cancelAnimationFrame(raf);show('#paused');}};
  $('#resume').onclick=()=>{mode=pausedFrom;hideAll();setMusicActive(mode==='playing');last=performance.now();raf=requestAnimationFrame(loop);};
  $('#quit').onclick=()=>{setMusicActive(false);reset(0);mode='menu';show('#start');render();};
  $('#sound').onclick=()=>{
    soundOn=!soundOn;storage.set('sound',soundOn);updateSoundButton();updatePauseToggles();
    if(soundOn){ensureAudio();if(audioCtx&&masterGain)masterGain.gain.setTargetAtTime(1,audioCtx.currentTime,.03);}
    else{stopSfx();if(audioCtx&&masterGain)masterGain.gain.setTargetAtTime(0,audioCtx.currentTime,.03);}
  };
  $('#musicToggle').onclick=()=>{
    musicOn=!musicOn;storage.set('music',musicOn);updatePauseToggles();
    if(musicOn){ensureAudio();if(mode==='playing')setMusicActive(true,true);}
    else setMusicActive(false);
  };
  $('#vibrationToggle').onclick=()=>{
    vibrationOn=!vibrationOn;storage.set('vibration',vibrationOn);updatePauseToggles();
    if(!vibrationOn&&navigator.vibrate)navigator.vibrate(0);
  };
  updateSoundButton();updatePauseToggles();

  let shopPreviewId=selected,shopPreviewPaddleId=selectedPaddle,shopCategory='balls',shopOpen=false,shopRaf=0,shopTime=0,shopLast=0,lastShopListen=-Infinity,shopPreviewTrail=[],shopPreviewTrailSkin=selected;
  function shopBallPosition(time){
    const u=(time%1.5)/1.5;
    return {x:280+Math.sin(time*.8)*165,y:153-105*4*u*(1-u),life:1};
  }
  function resetShopPreviewTrail(){
    shopPreviewTrail=[];shopPreviewTrailSkin=shopPreviewId;
    for(let i=11;i>=0;i--){
      const p=shopBallPosition(Math.max(0,shopTime-i/60));
      shopPreviewTrail.push({x:p.x,y:p.y,life:1});
    }
  }
  function updateShopPreviewTrail(){
    if(shopPreviewTrailSkin!==shopPreviewId)resetShopPreviewTrail();
    const p=shopBallPosition(shopTime);
    shopPreviewTrail.push({x:p.x,y:p.y,life:1});
    if(shopPreviewTrail.length>12)shopPreviewTrail.shift();
  }
  function drawShopPreview(){
    const c=$('#shopPreview').getContext('2d'),skin=skins.find(s=>s.id===shopPreviewId)||skins[0],paddleSkin=paddleSkins.find(s=>s.id===shopPreviewPaddleId)||paddleSkins[0];
    if(shopPreviewTrailSkin!==shopPreviewId||shopPreviewTrail.length<2)resetShopPreviewTrail();
    c.setTransform(2,0,0,2,0,0);
    c.imageSmoothingEnabled=true;
    c.imageSmoothingQuality='high';
    const bg=c.createLinearGradient(0,0,560,210);bg.addColorStop(0,'#4399ee');bg.addColorStop(1,'#17416f');
    c.fillStyle=bg;c.fillRect(0,0,560,210);
    const {x,y}=shopBallPosition(shopTime);
    const paddleY=184;

    // Safari pode deslocar visualmente alguns emojis em relação ao anchor do canvas.
    // ⚽️ e ❄️ usam o glifo real recortado para que a borda inferior toque o centro do bastão.
    let previewCenterYOffset=0;
    if(skin.id==='soccer'){
      const glyph=getSoccerPreviewGlyph(48);
      previewCenterYOffset=paddleY-153-glyph.h/2;
    }else if(skin.id==='snow'){
      const glyph=getSnowPreviewGlyph(48);
      previewCenterYOffset=paddleY-153-glyph.h/2;
    }else if(skin.image&&skinImages[skin.id]){
      const size=assetDrawSize(skin,48,48);
      previewCenterYOffset=paddleY-153-size.h/2;
    }

    c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(x,188,23+(153-y)*.10,4,0,0,Math.PI*2);c.fill();
    drawShopPaddle(c,paddleSkin,x,paddleY);
    const trail=shopPreviewTrail.map((p,i,arr)=>({
      x:p.x,
      y:p.y+previewCenterYOffset,
      life:.25+.75*(i/Math.max(1,arr.length-1))
    }));
    if(skin.id==='fire'){
      drawFireTrail(c,trail,24,shopTime);
    }else if(TRAIL_PROFILES[skin.id]){
      drawEmojiSkinTrail(c,skin,trail,24,shopTime,true);
    }
    if(skin.id==='soccer'){
      drawSoccerPreviewGlyph(c,x,y+previewCenterYOffset,48);
    }else if(skin.id==='snow'){
      drawSnowPreviewGlyph(c,x,y+previewCenterYOffset,48);
    }else{
      drawSkin(c,skin,x,y,24);
    }
  }
  function drawShopPaddle(c,skin,x,y){
    const w=104,h=12;
    if(drawPaddleSkin(c,skin,x-w/2,y,w,h))return;
    c.save();c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=10;c.shadowOffsetY=5;
    const g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,skin.color);g.addColorStop(1,'#253752');c.fillStyle=g;
    roundRect(c,x-w/2,y,w,h,h/2);c.fill();c.shadowBlur=0;
    if(skin.id!=='classic'){c.globalAlpha=.8;c.strokeStyle='#fff';c.lineWidth=1.5;roundRect(c,x-w/2+2,y+2,w-4,h-4,(h-4)/2);c.stroke();}
    c.restore();
  }
  function animateShop(now){
    shopRaf=0;if(!shopOpen||document.hidden)return;
    if(shopLast)shopTime+=Math.min(.05,(now-shopLast)/1000);
    shopLast=now;updateShopPreviewTrail();drawShopPreview();shopRaf=requestAnimationFrame(animateShop);
  }
  function startShopPreview(){
    cancelAnimationFrame(shopRaf);shopLast=0;resetShopPreviewTrail();drawShopPreview();
    if(!document.hidden)shopRaf=requestAnimationFrame(animateShop);
  }
  const shopEmojiGlyphCache={};
  function getShopEmojiGlyph(icon,fontSize=64){
    const key=icon+':'+fontSize;
    if(shopEmojiGlyphCache[key])return shopEmojiGlyphCache[key];
    try{
      const pad=Math.ceil(fontSize*1.8),scan=document.createElement('canvas');
      scan.width=pad*2;scan.height=pad*2;
      const s=scan.getContext('2d',{willReadFrequently:true});
      s.clearRect(0,0,scan.width,scan.height);
      s.font=`normal ${fontSize}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
      s.textAlign='center';s.textBaseline='middle';s.fillText(icon,pad,pad);
      const data=s.getImageData(0,0,scan.width,scan.height).data;
      let minX=scan.width,maxX=-1,minY=scan.height,maxY=-1;
      for(let y=0;y<scan.height;y++)for(let x=0;x<scan.width;x++){
        if(data[(y*scan.width+x)*4+3]>2){
          if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;
        }
      }
      if(maxX<minX||maxY<minY)throw new Error('emoji vazio');
      const w=maxX-minX+1,h=maxY-minY+1,crop=document.createElement('canvas');
      crop.width=w;crop.height=h;
      crop.getContext('2d').drawImage(scan,minX,minY,w,h,0,0,w,h);
      return shopEmojiGlyphCache[key]={canvas:crop,w,h};
    }catch(_){
      return shopEmojiGlyphCache[key]={canvas:null,w:fontSize,h:fontSize};
    }
  }
  function drawShopCardPreview(canvas,skin,isBalls){
    if(!canvas||!skin)return;
    const dpr=Math.min(devicePixelRatio||1,2),cssW=120,cssH=58;
    canvas.width=Math.round(cssW*dpr);canvas.height=Math.round(cssH*dpr);
    const c=canvas.getContext('2d');
    c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,cssW,cssH);
    c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
    const cx=cssW/2,cy=cssH/2;
    if(isBalls){
      const target=46;
      if(skin.image&&skinImages[skin.id]){
        const img=skinImages[skin.id],crop=getAssetCrop(skin);
        const sx=crop?crop.sx:0,sy=crop?crop.sy:0,sw=crop?crop.sw:img.naturalWidth,sh=crop?crop.sh:img.naturalHeight;
        const scale=target/Math.max(sw,sh),dw=sw*scale,dh=sh*scale;
        c.drawImage(img,sx,sy,sw,sh,cx-dw/2,cy-dh/2,dw,dh);
      }else{
        const glyph=getShopEmojiGlyph(skin.icon,64);
        if(glyph.canvas){
          const scale=target/Math.max(glyph.w,glyph.h),dw=glyph.w*scale,dh=glyph.h*scale;
          c.drawImage(glyph.canvas,cx-dw/2,cy-dh/2,dw,dh);
        }else{
          c.font='46px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
          c.textAlign='center';c.textBaseline='middle';c.fillText(skin.icon,cx,cy);
        }
      }
      return;
    }
    const targetW=108,targetH=30;
    if(skin.image&&skinImages[skin.id]){
      const img=skinImages[skin.id],crop=getAssetCrop(skin);
      const sx=crop?crop.sx:0,sy=crop?crop.sy:0,sw=crop?crop.sw:img.naturalWidth,sh=crop?crop.sh:img.naturalHeight;
      const scale=Math.min(targetW/sw,targetH/sh),dw=sw*scale,dh=sh*scale;
      c.drawImage(img,sx,sy,sw,sh,cx-dw/2,cy-dh/2,dw,dh);
    }else{
      c.save();c.fillStyle=skin.color||'#fff';
      const h=10;c.fillRect(cx-targetW/2,cy-h/2,targetW,h);c.restore();
    }
  }

  function renderShop(){
    $('#shopBalanceCount').textContent=coins;$('#shopBalance').setAttribute('aria-label',tr('Moedas: ')+coins);const grid=$('#shopGrid');grid.innerHTML='';
    const isBalls=shopCategory==='balls';
    const current=isBalls?(skins.find(s=>s.id===shopPreviewId)||skins[0]):(paddleSkins.find(s=>s.id===shopPreviewPaddleId)||paddleSkins[0]);
    const ownedList=isBalls?owned:ownedPaddles;
    const selectedId=isBalls?selected:selectedPaddle;
    const hasSkin=ownedList.includes(current.id),locked=false;
    const using=selectedId===current.id,affordable=coins>=current.price;
    $('#shopBallsTab').classList.toggle('active',isBalls);$('#shopPaddlesTab').classList.toggle('active',!isBalls);
    $('#shopBallsTab').setAttribute('aria-selected',String(isBalls));$('#shopPaddlesTab').setAttribute('aria-selected',String(!isBalls));
    $('#shopHint').textContent=tr(isBalls?'Toque numa bola para experimentar o visual.':'Toque num bastão para experimentar o visual.');
    $('#shopSkinName').textContent=tr(current.name);
    $('#shopFeature').textContent=tr(isBalls?'Visual da bola durante a partida.':'Visual do bastão durante a partida.');
    $('#shopListen').hidden=!isBalls||current.id!=='eight';
    $('#shopListen').textContent=tr(soundOn?'OUVIR SOM DA BOLA 8':'ATIVAR SOM E OUVIR');
    $('#shopPreview').setAttribute('aria-label',tr('Prévia da bola e do bastão: ')+' '+tr(current.name));
    $('#shopSkinStatus').textContent=locked?tr('Bloqueada · alcance 50 pontos para desbloquear')
      :using?tr('Selecionada · em uso'):hasSkin?tr('Adquirida · pronta para usar'):current.price+' '+tr('moedas')+' · '+(affordable?tr('disponível para comprar'):tr('faltam')+' '+(current.price-coins)+' '+tr('moedas'));
    const action=$('#shopAction');action.disabled=locked||using||(!hasSkin&&!affordable);
    action.textContent=locked?tr('DESBLOQUEIE COM 50 PONTOS'):using?tr('SELECIONADA'):hasSkin?tr('USAR ESTA SKIN'):tr('COMPRAR E USAR · '+current.price+' MOEDAS');
    for(const s of (isBalls?skins:paddleSkins)){
      const isOwned=ownedList.includes(s.id), itemLocked=false;
      const b=document.createElement('button');b.className='item'+((isBalls?shopPreviewId:shopPreviewPaddleId)===s.id?' selected':'');
      b.setAttribute('aria-pressed',String((isBalls?shopPreviewId:shopPreviewPaddleId)===s.id));
      const status=itemLocked?tr('Bloqueada · 50 pontos'):selectedId===s.id?tr('Selecionada'):isOwned?tr('Adquirida'):s.price+' '+tr('moedas');
      const previewClass=isBalls?'ballAsset':'paddleAsset';
      const previewHtml=`<span class="preview ${previewClass}"><canvas class="shopCardPreview" aria-label="${tr(s.name)}"></canvas></span>`;
      b.innerHTML=`${previewHtml}<strong>${tr(s.name)}</strong><small>${status}</small>`;
      drawShopCardPreview(b.querySelector('.shopCardPreview'),s,isBalls);
      b.onclick=()=>{
        if(isBalls)shopPreviewId=s.id;else shopPreviewPaddleId=s.id;renderShop();
        $('#shopPreview').scrollIntoView({behavior:'smooth',block:'nearest'});
      };grid.appendChild(b);
    }
    drawShopPreview();
  }
  $('#shopBallsTab').onclick=()=>{shopCategory='balls';renderShop();};
  $('#shopPaddlesTab').onclick=()=>{shopCategory='paddles';renderShop();};
  $('#shopListen').onclick=()=>{
    if(!shopOpen||shopPreviewId!=='eight'||performance.now()-lastShopListen<250)return;
    lastShopListen=performance.now();
    if(!soundOn){soundOn=true;storage.set('sound',true);updateSoundButton();}
    $('#shopListen').textContent=tr('OUVIR SOM DA BOLA 8');
    if(!ensureAudio()){$('#shopFeature').textContent=tr('Não foi possível iniciar o áudio neste navegador.');return;}
    eightBallSound(0);
    $('#shopFeature').textContent=tr('Prévia da batida inicial. O som fica mais grave conforme a partida avança.');
  };
  $('#shopAction').onclick=()=>{
    const isBalls=shopCategory==='balls';
    const list=isBalls?skins:paddleSkins,ownedList=isBalls?owned:ownedPaddles;
    const id=isBalls?shopPreviewId:shopPreviewPaddleId,skin=list.find(s=>s.id===id);if(!skin)return;
    if(!ownedList.includes(skin.id)){
      if(coins<skin.price)return;
      coins-=skin.price;ownedList.push(skin.id);storage.set('coins',coins);storage.set(isBalls?'owned':'ownedPaddles',ownedList);updateHUD();
    }
    if(isBalls){selected=skin.id;storage.set('skin',selected);clearSkinTrailParticles();ball.trail=[];fakeBall.trail=[];}else{selectedPaddle=skin.id;storage.set('paddleSkin',selectedPaddle);}
    renderShop();render();tone(660,.08);
  };
  document.querySelectorAll('.openShop').forEach(b=>b.onclick=()=>{
    shopOpen=true;shopPreviewId=selected;shopPreviewPaddleId=selectedPaddle;shopCategory='balls';shopTime=0;
    $('#shopPanel').classList.remove('hidden');renderShop();startShopPreview();
  });
  $('#closeShop').onclick=()=>{shopOpen=false;cancelAnimationFrame(shopRaf);shopRaf=0;$('#shopPanel').classList.add('hidden');};
  addEventListener('visibilitychange',()=>{
    if(!shopOpen)return;
    if(document.hidden){cancelAnimationFrame(shopRaf);shopRaf=0;}else startShopPreview();
  });

  const languageButtons = document.querySelectorAll('[data-language]');
  languageButtons.forEach(button => {
    button.addEventListener('click', () => chooseLanguage(button.dataset.language));
  });
  // Compatibility with the original two-button selector.
  if (!languageButtons.length) {
    if ($('#languageEnglish')) $('#languageEnglish').onclick=()=>chooseLanguage('en');
    if ($('#languagePortuguese')) $('#languagePortuguese').onclick=()=>chooseLanguage('pt');
  }
  const supportedLanguages=SUPPORTED_LANGUAGES;
  if(supportedLanguages.includes(language)){
    applyLanguage();
    $('#languageScreen').classList.add('hidden');
    $('#start').classList.remove('hidden');
  }else{
    $('#languageScreen').classList.remove('hidden');
    $('#start').classList.add('hidden');
  }
  addEventListener('resize',()=>{resize();render();},{passive:true});
  addEventListener('visibilitychange',()=>{if(document.hidden&&(mode==='playing'||mode==='dying'))$('#pause').click();});
  resize();reset();render();

  // ===== VERIFICADOR DENTRO DO CÓDIGO (não aparece para o jogador) =====
  // Como usar: no console do navegador digite  ZANON_audit()
  // Ou abra o jogo com ?debug=1 no fim da URL e toque no botão "AUDIT" que aparece no canto.
  // O que ele faz: confere 231 chaves nos 10 idiomas + lista window.ZANON_MISSING (textos que caíram em PT durante a partida).
  window.ZANON_audit = function(){
    const L = window.ZANON_LANGUAGES || {};
    const locales = ['en','es','fr','de','ja','ko','zh-CN','zh-TW','hi','it'];
    const all = new Set();
    locales.forEach(loc=>Object.keys(L[loc]||{}).forEach(k=>all.add(k)));
    console.log('[i18n audit] chaves únicas: ' + all.size);
    let ok = true;
    locales.forEach(loc=>{
      const d = L[loc]||{};
      const missing = [...all].filter(k=>!(k in d));
      const empty = [...all].filter(k=>d[k]===''||d[k]==null);
      if(missing.length||empty.length){ console.log('[i18n audit] FAIL ' + loc + ' ausentes:' + missing.length + ' vazias:' + empty.length, missing.slice(0,10)); ok=false; }
      else console.log('[i18n audit] PASS ' + loc + ' ' + Object.keys(d).length + ' chaves');
    });
    const miss = window.ZANON_MISSING || [];
    console.log('[i18n audit] ZANON_MISSING (caíram em PT nesta partida): ' + miss.length);
    if(miss.length) console.log(miss);
    else console.log('[i18n audit] Nenhum fallback em PT até agora. Jogue uma partida inteira e rode de novo.');
    // Caso da captura
    try{
      console.log('[i18n audit] DE VINGANÇA: ' + (L['de']||{})['VINGANÇA · JOGAR DE NOVO']);
      console.log('[i18n audit] DE rank: ' + tr('Você chegou ao ') + tr('Azul Bebê'));
    }catch(e){ console.log('[i18n audit] erro no caso da captura', e); }
    console.log('[i18n audit] resultado chaves: ' + (ok ? 'OK' : 'FALHOU'));
    return {chavesOK: ok, totalChaves: all.size, missing: miss};
  };
  // Botão flutuante só com ?debug=1 — jogador normal nunca vê.
  try{
    if(location.search.includes('debug=1')){
      const b=document.createElement('button');
      b.textContent='AUDIT'; b.style.cssText='position:fixed;right:10px;bottom:10px;z-index:9999;padding:8px 12px;border-radius:999px;border:0;background:#ff0;font-weight:800;';
      b.onclick=()=>window.ZANON_audit();
      document.body.appendChild(b);
    }
  }catch(e){}
  // ===== FIM VERIFICADOR =====

})();
