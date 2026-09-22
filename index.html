    /* =========================================================
       RAINY SKYLINE V13 (20 fases + Zen suave + vidro real dos carros + parallax)
    ========================================================= */

    // As 20 fases ficam disponíveis no menu, campanha e modo Zen.
    /*
    ========================================================================
    MAPA DO CÓDIGO — RAINY SKYLINE
    ========================================================================
    Este bloco é SOMENTE documentação. Nenhuma lógica foi alterada.

    01. CONFIGURAÇÃO GERAL / LIMITES
    02. ASSETS EMBUTIDOS (20 fundos + Zen)  ← maior parte do tamanho do arquivo
    03. ESTADO GLOBAL
    04. IDIOMAS / LOCALIZAÇÃO
    05. CONFIGURAÇÃO DAS 20 FASES + ZEN
    06. CARRO: máscaras, retrovisor e área limpável
    07. SAVE / LOAD
    08. CANVASES / RESIZE / BACKGROUNDS
    09. CHUVA / NEVE / PARTÍCULAS
    10. GOTAS NO VIDRO
    11. NÉVOA / LIMPEZA / MODO ZEN
    12. INPUT / ÁUDIO
    13. FLUXO DE FASE / UI / LOJA
    14. GAME LOOP
    15. EVENT LISTENERS / BOOTSTRAP

    IMPORTANTE:
    - As imagens estão incorporadas como data:image/...;base64.
    - Isso responde pela maior parte dos ~950 KB deste TXT.
    - Mantive tudo dentro de um único arquivo para NÃO alterar o funcionamento.
    - Os marcadores "#region" servem para dobrar/recolher blocos em editores
      compatíveis e facilitar a navegação.
    ========================================================================
    */

    // #region 01 — CONFIGURAÇÃO GERAL / LIMITES
    const ACTIVE_PHASE_COUNT = 20;
    const COMPLETION_TARGET = .98;
    const PERFECT_CLEAN_TARGET = .995;
    const PERFECT_CLEAN_BONUS = 100;
    const ROAD_STAR_PHASES = Object.freeze([10, 12, 16, 18]); // 11, 13, 17 e 19
    const ROAD_STAR_TARGET = .99; // 99% conclui o desafio Road Star e evita travar por pixels invisíveis
    const ROAD_STAR_BONUS = 100;
    const GLASS_DRIP_FREQUENCY = .006;
    // Fundos incorporados: as 20 fases funcionam sem baixar ZIPs em tempo de jogo.
    // WebP vertical otimizado preserva a arte aprovada e reduz uso de rede/bateria.

    // #endregion
    // #region 02 — ASSETS EXTERNOS — CAMINHOS RELATIVOS
    // 20 wallpapers + fundo Zen em arquivos separados.
    const EMBEDDED_PHASE_BACKGROUNDS = Object.freeze([
      "assets/images/phases/01_First_Rain.webp",
      "assets/images/phases/02_Distant_Lights.webp",
      "assets/images/phases/03_After_Midnight.webp",
      "assets/images/phases/04_Neon_Splash.webp",
      "assets/images/phases/05_The_Window.webp",
      "assets/images/phases/06_Storm.webp",
      "assets/images/phases/07_Horizon.webp",
      "assets/images/phases/08_Memories.webp",
      "assets/images/phases/09_Silence.webp",
      "assets/images/phases/10_Clearing_Sky.webp",
      "assets/images/phases/11_Moving_Car.webp",
      "assets/images/phases/12_Snowfall.webp",
      "assets/images/phases/13_Highway_Rain.webp",
      "assets/images/phases/14_Morning_Frost.webp",
      "assets/images/phases/15_Summer_Sun_Shower.webp",
      "assets/images/phases/16_Midnight_Blizzard.webp",
      "assets/images/phases/17_City_Tunnel.webp",
      "assets/images/phases/18_Golden_Hour_Drops.webp",
      "assets/images/phases/19_Snowy_Drive.webp",
      "assets/images/phases/20_The_Last_Wipe.webp"
    ]);
    const EMBEDDED_ZEN_BACKGROUND = "assets/images/zen/Zen.webp";


    // #endregion
    // #region 03 — ESTADO GLOBAL DO JOGO
const state = {
      lang: 'en',
      started: false,
      paused: false,
      isZen: false,
      currentPhase: 0,
      campaignPhase: 0,
      highestPhase: 0,
      points: 0,
      hasInteracted: false,
      rainIntensity: 0.7,
      ambVolume: 0.5,
      rainVolume: 1,
      gameSound: true,
      musicSound: true,
      vibration: true,
      lastTime: performance.now(),
      fogProgress: 0,
      brush1: "soft",
      brush2: "soft",
      activePointers: new Map(),
      pointerBrushes: new Map(),
      carOffset: 0,
      elapsed: 0,
      cleanStreak: 0,
      lastWipe: 0,
      zenScore: 0,
      stars: 0,
      phaseStartedAt: 0,
      zenAutoFog: true,
      lightningEnabled: true,
      selectedBrushSlot: 1,
      completedPhases: [],
      perfectPhases: [],
      roadStarPhases: [],
      windshieldUnlocked: false,
      windshieldRevealSeen: false,
      completedSinceAd: 0,
      lastAdAt: 0,
      resumePhase: null
    };


    // #endregion
    // #region 04 — IDIOMAS / LOCALIZAÇÃO
    const i18n = {
      en: {
        menu_subtitle: "Atmospheric Relaxation",
        zen_auto_fog: "Auto-regenerate fog",
        zen_auto_fog_desc: "Fog slowly returns in Zen Mode.",
        ad_loading: "Preparing a short break…",
        loading_phase: "Preparing the weather…",
        background_missing: "The artwork for this phase could not be loaded.",
        phase_hud: "PHASE",
        wipe_instruction: "SWIPE TO WIPE THE FOG",
        defog_window: "Defog the window",
        btn_continue: "CONTINUE PHASE",
        btn_zen: "ZEN MODE (INFINITE)",
        btn_phases: "PHASES & MEMORIES",
        btn_store: "WIPE STYLES",
        btn_settings: "SETTINGS",
        phases_title: "Phases & Memories",
        phases_desc: "Every weather holds a feeling.",
        btn_back: "BACK",
        store_title: "Wipe Styles",
        store_desc: "Choose how each touch clears the glass.",
        store_coins: "coins",
        store_finger1: "Touch 1",
        store_finger2: "Touch 2",
        store_info: "Select a touch slot, then choose its wiping style. Both can be used at the same time.",
        settings_title: "Settings",
        set_lang: "Language",
        set_rain: "Rain Intensity",
        set_vol: "Ambient Volume",
        set_rain_sound: "Rain Sound",
        set_snd1: "SFX",
        set_snd1_desc: "Noise and drops",
        set_snd2: "Music / Atmosphere",
        set_snd2_desc: "Background layers",
        set_snd3: "Vibration",
        set_snd3_desc: "Haptic feedback on thunder",
        set_flashes: "Thunder",
        set_flashes_desc: "Thunder sound and lightning flash",
        btn_save: "SAVE & BACK",
        pause_title: "Paused",
        pause_desc: "The weather is waiting for you.",
        btn_resume: "RETURN & RELAX",
        btn_mainmenu: "MAIN MENU",
        reward_title: "Phase Complete",
        reward_desc: "You finished this memory. The next feeling awaits.",
        reward_base: "Phase reward",
        reward_first_bonus: "New memory bonus",
        reward_total: "Total",
        btn_next: "NEXT PHASE",
        zen_progress_label: "Infinite Peace",
        phase_locked: "🔒 Locked",
        phase_req: "Complete previous",
        equip: "EQUIP",
        bonus_clean: "CLEAN BONUS",
        zen_score: "ZEN · ",
        star: "STAR",
        perfect: "PERFECT WIPE",
        road_star_message: "CLEAN GLASS. CLEAR VIEW.",
        audio_ready: "Tap to enable atmosphere",
        owned: "OWNED",
        equipped: "EQUIPPED",
        buy: "BUY",
        purchased: "Style unlocked",
        not_enough: "Not enough raindrops"
      },
      es: {
        menu_subtitle: "Relajación Atmosférica",
        zen_auto_fog: "Regenerar niebla automáticamente",
        zen_auto_fog_desc: "La niebla vuelve lentamente en el Modo Zen.",
        ad_loading: "Preparando una breve pausa…",
        loading_phase: "Preparando el clima…",
        background_missing: "No se pudo cargar el arte de esta fase.",
        phase_hud: "FASE",
        wipe_instruction: "DESLIZA PARA LIMPIAR LA NIEBLA",
        defog_window: "Desempaña la ventana",
        btn_continue: "CONTINUAR FASE",
        btn_zen: "MODO ZEN (INFINITO)",
        btn_phases: "FASES Y MEMORIAS",
        btn_store: "ESTILOS DE LIMPIEZA",
        btn_settings: "AJUSTES",
        phases_title: "Fases y Memorias",
        phases_desc: "Cada clima guarda un sentimiento.",
        btn_back: "VOLVER",
        store_title: "Estilos de Limpieza",
        store_desc: "Elige cómo cada toque limpia el cristal.",
        store_coins: "monedas",
        store_finger1: "Toque 1",
        store_finger2: "Toque 2",
        store_info: "Selecciona un toque y elige su estilo. Puedes usar ambos al mismo tiempo.",
        settings_title: "Ajustes",
        set_lang: "Idioma",
        set_rain: "Intensidad de la lluvia",
        set_vol: "Volumen del ambiente",
        set_rain_sound: "Sonido de la lluvia",
        set_snd1: "Efectos de sonido",
        set_snd1_desc: "Ruido y gotas",
        set_snd2: "Música / Atmósfera",
        set_snd2_desc: "Capas de fondo",
        set_snd3: "Vibración",
        set_snd3_desc: "Respuesta háptica con truenos",
        set_flashes: "Truenos",
        set_flashes_desc: "Sonido de trueno y destello",
        btn_save: "GUARDAR Y VOLVER",
        pause_title: "Pausa",
        pause_desc: "El clima te está esperando.",
        btn_resume: "VOLVER Y RELAJARSE",
        btn_mainmenu: "MENÚ PRINCIPAL",
        reward_title: "Fase completada",
        reward_desc: "Terminaste este recuerdo. El próximo clima te espera.",
        reward_base: "Recompensa de fase",
        reward_first_bonus: "Bono por nuevo recuerdo",
        reward_total: "Total",
        btn_next: "SIGUIENTE FASE",
        zen_progress_label: "Paz infinita",
        phase_locked: "🔒 Bloqueada",
        phase_req: "Completa la anterior",
        equip: "EQUIPAR",
        bonus_clean: "BONUS DE LIMPIEZA",
        zen_score: "ZEN · ",
        star: "ESTRELLA",
        perfect: "LIMPIEZA PERFECTA",
        road_star_message: "CRISTAL LIMPIO. VISTA DESPEJADA.",
        audio_ready: "Toca para activar la atmósfera",
        owned: "ADQUIRIDO",
        equipped: "EQUIPADO",
        buy: "COMPRAR",
        purchased: "Estilo desbloqueado",
        not_enough: "No tienes suficientes gotas"
      },
      pt: {
        menu_subtitle: "Relaxamento Atmosférico",
        zen_auto_fog: "Regenerar névoa automaticamente",
        zen_auto_fog_desc: "A névoa retorna lentamente no Modo Zen.",
        ad_loading: "Preparando uma breve pausa…",
        loading_phase: "Preparando o clima…",
        background_missing: "Não foi possível carregar a arte desta fase.",
        phase_hud: "FASE",
        wipe_instruction: "PASSE O DEDO PARA LIMPAR",
        defog_window: "Desembace a janela",
        btn_continue: "CONTINUAR FASE",
        btn_zen: "MODO ZEN (INFINITO)",
        btn_phases: "FASES & MEMÓRIAS",
        btn_store: "ESTILOS DE LIMPEZA",
        btn_settings: "AJUSTES",
        phases_title: "Fases & Memórias",
        phases_desc: "Cada clima guarda um sentimento.",
        btn_back: "VOLTAR",
        store_title: "Estilos de Limpeza",
        store_desc: "Escolha como cada toque limpa o vidro.",
        store_coins: "moedas",
        store_finger1: "Toque 1",
        store_finger2: "Toque 2",
        store_info: "Selecione um toque e escolha o estilo dele. Os dois podem ser usados ao mesmo tempo.",
        settings_title: "Ajustes",
        set_lang: "Idioma",
        set_rain: "Força da Chuva",
        set_vol: "Volume do Ambiente",
        set_rain_sound: "Som da chuva",
        set_snd1: "Efeitos Sonoros",
        set_snd1_desc: "Ruído e gotas",
        set_snd2: "Música / Atmosfera",
        set_snd2_desc: "Camadas de fundo",
        set_snd3: "Vibração",
        set_snd3_desc: "Feedback em trovões",
        set_flashes: "Trovões",
        set_flashes_desc: "Som de relâmpago e clarão",
        btn_save: "SALVAR E VOLTAR",
        pause_title: "Pausa",
        pause_desc: "O clima continua esperando por você.",
        btn_resume: "RETORNAR E RELAXAR",
        btn_mainmenu: "MENU PRINCIPAL",
        reward_title: "Fase Concluída",
        reward_desc: "Você terminou esta memória. O próximo clima te espera.",
        reward_base: "Recompensa da fase",
        reward_first_bonus: "Bônus de nova memória",
        reward_total: "Total",
        btn_next: "PRÓXIMA FASE",
        zen_progress_label: "Paz Infinita",
        phase_locked: "🔒 Bloqueada",
        phase_req: "Complete a anterior",
        equip: "EQUIPAR",
        bonus_clean: "BÔNUS DE LIMPEZA",
        zen_score: "ZEN · ",
        star: "ESTRELA",
        perfect: "LIMPEZA PERFEITA",
        road_star_message: "VIDRO LIMPO. PAISAGEM LIVRE.",
        audio_ready: "Toque para ativar a atmosfera",
        owned: "ADQUIRIDO",
        equipped: "EQUIPADO",
        buy: "COMPRAR",
        purchased: "Estilo desbloqueado",
        not_enough: "Gotas insuficientes"
      }
    };

    function t(key) {
      return i18n[state.lang]?.[key] ?? i18n.en[key] ?? key;
    }

    function localize(value) {
      if (value == null) return "";
      if (typeof value === "string") return value;
      return value[state.lang] ?? value.en ?? value.pt ?? value.es ?? "";
    }

    function validateLocalization() {
      const baseKeys=Object.keys(i18n.en);
      const uiKeys=[...document.querySelectorAll('[data-i18n]')].map(element=>element.getAttribute('data-i18n'));
      const unknown=[...new Set(uiKeys.filter(key=>!(key in i18n.en)))];
      if(unknown.length) console.warn("Chaves de interface sem tradução:",unknown);
      for(const lang of ["pt","es"]){
        const missing=baseKeys.filter(key => !(key in i18n[lang]));
        if(missing.length) console.warn(`Traduções ausentes em ${lang}:`,missing);
      }
      phases.forEach((phase,index)=>{
        for(const field of ["name","feeling"]){
          for(const lang of ["en","pt","es"]){
            if(!phase[field]?.[lang]) console.warn(`Fase ${index+1}: ${field}.${lang} ausente`);
          }
        }
      });
      Object.entries(brushes).forEach(([key,brush])=>{
        for(const field of ["name","desc"]){
          for(const lang of ["en","pt","es"]){
            if(!brush[field]?.[lang]) console.warn(`Estilo ${key}: ${field}.${lang} ausente`);
          }
        }
      });
    }

    function updateTranslations() {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.getAttribute('data-i18n'));
      });
      document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
      });
      document.documentElement.lang = state.lang === 'pt' ? 'pt-BR' : state.lang;
      document.getElementById('langToggleBtn').textContent = state.lang === 'en' ? 'English' : state.lang === 'es' ? 'Español' : 'Português';
      if(state.isZen) document.getElementById('progressLabelText').textContent = t('zen_progress_label');
      document.getElementById("zenFogSettingTitle").textContent = t("zen_auto_fog");
      document.getElementById("zenFogSettingDesc").textContent = t("zen_auto_fog_desc");
      updatePhaseUI();
      renderPhases();
      renderStore();
    }

    /* 20 FASES (Incluindo Carro e Neve/Sol) */
    // Configuração exclusiva das gotas do vidro por fase.
// Mais chuva = mais gotas e, em algumas fases, gotas maiores.

    // #endregion
    // #region 05 — CONFIGURAÇÃO DE FASES / ZEN / GOTAS
const GLASS_DROP_PHASES = [
  { count: 70,  min: 1.8, max: 4.0 }, // 1
  { count: 82,  min: 1.8, max: 4.5 }, // 2
  { count: 95,  min: 1.8, max: 5.0 }, // 3
  { count: 110, min: 1.8, max: 5.8 }, // 4
  { count: 75,  min: 1.8, max: 4.2 }, // 5
  { count: 125, min: 1.8, max: 6.2 }, // 6
  { count: 65,  min: 1.8, max: 4.0 }, // 7
  { count: 90,  min: 1.8, max: 5.0 }, // 8
  { count: 58,  min: 1.5, max: 3.6 }, // 9 — garoa leve
  { count: 46,  min: 1.5, max: 3.4 }, // 10 — céu abrindo
  { count: 72,  min: 1.8, max: 4.0 }, // 11
  { count: 85,  min: 1.8, max: 4.5 }, // 12
  { count: 105, min: 1.8, max: 5.4 }, // 13
  { count: 120, min: 1.8, max: 6.0 }, // 14
  { count: 68,  min: 1.8, max: 4.0 }, // 15
  { count: 100, min: 1.8, max: 5.2 }, // 16
  { count: 135, min: 2.0, max: 6.8 }, // 17
  { count: 112, min: 1.8, max: 5.8 }, // 18
  { count: 78,  min: 1.8, max: 4.3 }, // 19
  { count: 145, min: 2.0, max: 7.0 }  // 20
];

const phases = [
      { name:{en:"First Rain",pt:"Primeira Chuva",es:"Primera Lluvia"}, feeling:{en:"Serenity",pt:"Serenidade",es:"Serenidad"}, hue:215, sky:["#030712","#0f2740"], lights:["#38bdf8","#7dd3fc","#fef3c7"], rain:.42, thunder:0, type:"rain", rainStyle:"light", fog:.40, target:.76 },
      { name:{en:"Distant Lights",pt:"Luzes Distantes",es:"Luces Distantes"}, feeling:{en:"Nostalgia",pt:"Nostalgia",es:"Nostalgia"}, hue:235, sky:["#080817","#202044"], lights:["#fbbf24","#f472b6","#818cf8"], rain:.58, thunder:0, type:"rain", rainStyle:"steady", fog:.44, target:.78 },
      { name:{en:"After Midnight",pt:"Depois da Meia-Noite",es:"Después de Medianoche"}, feeling:{en:"Solitude",pt:"Solidão",es:"Soledad"}, hue:225, sky:["#020617","#111827"], lights:["#22d3ee","#60a5fa","#a5b4fc"], rain:.78, thunder:.12, type:"rain", rainStyle:"heavy", fog:.50, target:.78 },
      { name:{en:"Neon Splash",pt:"Neon",es:"Neón"}, feeling:{en:"Contemplation",pt:"Contemplação",es:"Contemplación"}, hue:285, sky:["#10051c","#321344"], lights:["#f43f5e","#a855f7","#06b6d4"], rain:.88, thunder:.18, type:"rain", rainStyle:"neon", fog:.46, target:.80 },
      { name:{en:"The Window",pt:"A Janela",es:"La Ventana"}, feeling:{en:"Intimacy",pt:"Intimidade",es:"Intimidad"}, hue:195, sky:["#03151b","#12323c"], lights:["#67e8f9","#fde68a","#f0f9ff"], rain:.36, thunder:0, type:"rain", rainStyle:"soft", fog:.36, target:.75 },
      { name:{en:"Storm",pt:"Tempestade",es:"Tormenta"}, feeling:{en:"Tension",pt:"Tensão",es:"Tensión"}, hue:210, sky:["#02040a","#16202d"], lights:["#e0f2fe","#93c5fd","#f8fafc"], rain:1, thunder:1, type:"rain", rainStyle:"storm", fog:.55, target:.80 },
      { name:{en:"Horizon",pt:"Horizonte",es:"Horizonte"}, feeling:{en:"Hope",pt:"Esperança",es:"Esperanza"}, hue:205, sky:["#07111c","#24485d"], lights:["#fde68a","#fbbf24","#bae6fd"], rain:.30, thunder:0, type:"rain", rainStyle:"breeze", fog:.34, target:.74 },
      { name:{en:"Memories",pt:"Memórias",es:"Recuerdos"}, feeling:{en:"Longing",pt:"Saudade",es:"Añoranza"}, hue:260, sky:["#090613","#2b183b"], lights:["#c4b5fd","#f9a8d4","#fef3c7"], rain:.54, thunder:.05, type:"rain", rainStyle:"memory", fog:.43, target:.78 },
      { name:{en:"Silence",pt:"Silêncio",es:"Silencio"}, feeling:{en:"Peace",pt:"Paz",es:"Paz"}, hue:175, sky:["#020d0d","#123638"], lights:["#5eead4","#99f6e4","#fef9c3"], rain:.20, thunder:0, type:"rain", rainStyle:"drizzle", fog:.30, target:.73 },
      { name:{en:"Clearing Sky",pt:"O Céu Clareia",es:"El Cielo se Abre"}, feeling:{en:"Renewal",pt:"Renovação",es:"Renovación"}, hue:35, sky:["#17100a","#513b20"], lights:["#fde68a","#fb923c","#fef3c7"], rain:.16, thunder:0, type:"rain", rainStyle:"clearing", fog:.28, target:.72 },
      { name:{en:"Moving Car",pt:"Carro em Movimento",es:"Coche en Marcha"}, feeling:{en:"Journey",pt:"Jornada",es:"Viaje"}, hue:200, sky:["#0a0a0a","#1a1a1a"], lights:["#ef4444","#f59e0b"], rain:.66, thunder:.06, type:"rain", rainStyle:"carRain", fog:.42, target:.78 },
      { name:{en:"Snowfall",pt:"Queda de Neve",es:"Nevada"}, feeling:{en:"Stillness",pt:"Quietude",es:"Quietud"}, hue:200, sky:["#2d3748","#4a5568"], lights:["#e2e8f0","#cbd5e0"], rain:.34, thunder:0, type:"snow", rainStyle:"snowSoft", fog:.38, target:.75 },
      { name:{en:"Highway Rain",pt:"Chuva na Rodovia",es:"Lluvia en la Autopista"}, feeling:{en:"Speed",pt:"Velocidade",es:"Velocidad"}, hue:220, sky:["#050510","#151530"], lights:["#ffffff","#ef4444","#22d3ee"], rain:.92, thunder:.30, type:"rain", rainStyle:"highwayRain", fog:.51, target:.80 },
      { name:{en:"Morning Frost",pt:"Geada Matinal",es:"Escarcha Matinal"}, feeling:{en:"Clarity",pt:"Claridade",es:"Claridad"}, hue:190, sky:["#4a5568","#a0aec0"], lights:["#ffffff","#e2e8f0"], rain:.24, thunder:0, type:"snow", rainStyle:"snowLight", fog:.47, target:.78 },
      { name:{en:"Summer Sun Shower",pt:"Chuva de Verão",es:"Lluvia de Verano"}, feeling:{en:"Warmth",pt:"Calor",es:"Calidez"}, hue:50, sky:["#ecc94b","#f6e05e"], lights:["#ffffff"], rain:.46, thunder:.10, type:"rain", rainStyle:"sunShower", fog:.30, target:.74 },
      { name:{en:"Midnight Blizzard",pt:"Nevasca à Meia-Noite",es:"Ventisca de Medianoche"}, feeling:{en:"Isolation",pt:"Isolamento",es:"Aislamiento"}, hue:230, sky:["#000000","#111827"], lights:["#718096","#a0aec0"], rain:.86, thunder:.18, type:"snow", rainStyle:"blizzard", fog:.58, target:.81 },
      { name:{en:"City Tunnel",pt:"Túnel da Cidade",es:"Túnel de la Ciudad"}, feeling:{en:"Echo",pt:"Eco",es:"Eco"}, hue:30, sky:["#1a1005","#3a2010"], lights:["#f6ad55","#ed8936"], rain:.48, thunder:0, type:"rain", rainStyle:"tunnelRain", fog:.40, target:.77 },
      { name:{en:"Golden Hour Drops",pt:"Gotas Douradas",es:"Gotas Doradas"}, feeling:{en:"Beauty",pt:"Beleza",es:"Belleza"}, hue:20, sky:["#c53030","#ed8936"], lights:["#fefcbf","#fbd38d"], rain:.38, thunder:0, type:"rain", rainStyle:"goldenRain", fog:.31, target:.74 },
      { name:{en:"Snowy Drive",pt:"Passeio na Neve",es:"Viaje Nevado"}, feeling:{en:"Comfort",pt:"Aconchego",es:"Abrigo"}, hue:210, sky:["#1a202c","#2d3748"], lights:["#e2e8f0","#ef4444"], rain:.52, thunder:0, type:"snow", rainStyle:"snowDrive", fog:.45, target:.78 },
      { name:{en:"The Last Wipe",pt:"A Última Limpeza",es:"La Última Limpieza"}, feeling:{en:"Closure",pt:"Despedida",es:"Despedida"}, hue:200, sky:["#2b6cb0","#4299e1"], lights:["#ffffff","#bee3f8"], rain:.12, thunder:0, type:"rain", rainStyle:"finalRain", fog:.25, target:.70 }
    ];

    // Modo Zen é uma experiência própria: arte, clima e comportamento não dependem
    // de uma fase aleatória da campanha. O slider controla somente a força da chuva.
    const ZEN_PHASE = Object.freeze({
      name:{en:"Zen",pt:"Zen",es:"Zen"},
      feeling:{en:"Stillness",pt:"Quietude",es:"Quietud"},
      hue:208,
      sky:["#07111d","#183247"],
      lights:["#9bdaf5","#fde6b8","#c7d8e8"],
      rain:.70,
      thunder:0,
      type:"rain",
      rainStyle:"steady",
      fog:.40,
      target:1
    });
    const ZEN_GLASS_DROP_CONFIG = Object.freeze({ count: 105, min: 1.8, max: 5.4 });

    function getActivePhase() {
      return state.isZen ? ZEN_PHASE : (phases[state.currentPhase] || phases[0]);
    }

    function getGlassDropConfig() {
      return state.isZen ? ZEN_GLASS_DROP_CONFIG : (GLASS_DROP_PHASES[state.currentPhase] || GLASS_DROP_PHASES[0]);
    }

    // ---------------------------------------------------------
    // FASES DE CARRO — vidro real, retrovisor e área limpável
    // ---------------------------------------------------------
    // Coordenadas normalizadas na arte original (941 × 1672).
    // A máscara acompanha o "cover" usado para desenhar o wallpaper, então
    // continua alinhada mesmo em iPhones/Androids com proporções diferentes.

    // #endregion
    // #region 06 — CARRO: VIDRO REAL / RETROVISOR / ÁREA LIMPÁVEL
    const CAR_GLASS_PROFILES = Object.freeze({
      10: { // 11 — Moving Car (janela lateral)
        polygon:[[.18,.00],[1,.00],[1,.690],[.58,.682],[.22,.666],[.10,.620],[.050,.535],[.046,.405],[.085,.285]],
        mirror:{cx:.245,cy:.600,rx:.145,ry:.055,rotation:.055}
      },
      12: { // 13 — Highway Rain (janela lateral)
        polygon:[[.18,.00],[1,.00],[1,.700],[.60,.695],[.22,.680],[.095,.630],[.045,.545],[.043,.405],[.085,.285]],
        mirror:{cx:.205,cy:.625,rx:.135,ry:.052,rotation:.055}
      },
      16: { // 17 — City Tunnel (para-brisa)
        polygon:[[.025,.025],[.975,.025],[.995,.965],[.005,.965]]
      },
      18: { // 19 — Snowy Drive (janela lateral)
        polygon:[[.18,.00],[1,.00],[1,.700],[.60,.692],[.23,.676],[.105,.632],[.050,.545],[.047,.405],[.088,.285]],
        mirror:{cx:.245,cy:.625,rx:.150,ry:.055,rotation:.055}
      }
    });

    // FASE 11 — máscara exclusiva da janela, traçada a partir dos modelos
    // enviados pelo usuário (verde = permitido; vermelho = proibido).
    // Esta máscara NÃO reativa parallax nem qualquer outro efeito especial de carro.
    const PHASE11_WINDOW_PROFILE = Object.freeze({
      polygon:[
        [.637549,.000000],
        [.636245,.003666],
        [.563233,.038856],
        [.466754,.091642],
        [.345502,.167889],
        [.203390,.269795],
        [.139505,.320381],
        [.069100,.381965],
        [.058670,.398827],
        [.056063,.425953],
        [.075619,.535191],
        [.099087,.714076],
        [.104302,.717742],
        [.739244,.780792],
        [1.000000,.810850],
        [1.000000,.000000]
      ]
    });

    const PHASE13_WINDOW_PROFILE = Object.freeze({
      polygon:[
        [.401042,.000000],
        [.298177,.066716],
        [.174479,.170088],
        [.075521,.273460],
        [.016927,.355572],
        [.178385,.788123],
        [.947917,.999267],
        [1.000000,.999267],
        [1.000000,.000000]
      ]
    });

    const PHASE19_WINDOW_PROFILE = Object.freeze({
      polygon:[
        [.552083,.000000],
        [.334635,.104839],
        [.218750,.176686],
        [.130208,.250000],
        [.061198,.325513],
        [.006510,.396628],
        [.000000,.398093],
        [.000000,.456745],
        [.009115,.465543],
        [.063802,.602639],
        [.097656,.714076],
        [.114583,.728739],
        [1.000000,.814516],
        [1.000000,.000000]
      ]
    });

    function isCarPhase(phase = getActivePhase()) {
      return !state.isZen && (phase?.type === "car" || phase?.type === "car_snow");
    }

    function isRoadStarPhaseIndex(index) {
      return ROAD_STAR_PHASES.includes(index);
    }

    function isRoadStarPhase(index = state.currentPhase) {
      return !state.isZen && isRoadStarPhaseIndex(index);
    }

    function getCarGlassProfile() {
      return isCarPhase() ? (CAR_GLASS_PROFILES[state.currentPhase] || null) : null;
    }

    function getPhase11WindowProfile() {
      return (!state.isZen && state.currentPhase === 10) ? PHASE11_WINDOW_PROFILE : null;
    }

    function getPhase13WindowProfile() {
      return (!state.isZen && state.currentPhase === 12) ? PHASE13_WINDOW_PROFILE : null;
    }

    function getPhase19WindowProfile() {
      return (!state.isZen && state.currentPhase === 18) ? PHASE19_WINDOW_PROFILE : null;
    }

    function getPlayableGlassProfile() {
      return getPhase11WindowProfile() || getPhase13WindowProfile() || getPhase19WindowProfile() || getCarGlassProfile();
    }

    function getArtworkTransform(image = currentBackgroundImage) {
      if (image?.naturalWidth && image?.naturalHeight) {
        const scale = Math.max(W / image.naturalWidth, H / image.naturalHeight);
        const dw = image.naturalWidth * scale;
        const dh = image.naturalHeight * scale;
        return { scale, dw, dh, dx:(W-dw)/2, dy:(H-dh)/2 };
      }
      return { scale:1, dw:W, dh:H, dx:0, dy:0 };
    }

    function artworkPoint(nx, ny, transform = getArtworkTransform()) {
      return { x:transform.dx + nx * transform.dw, y:transform.dy + ny * transform.dh };
    }

    function screenToArtwork(x, y, transform = getArtworkTransform()) {
      return {
        x:(x - transform.dx) / Math.max(1, transform.dw),
        y:(y - transform.dy) / Math.max(1, transform.dh)
      };
    }

    function pointInPolygon(x, y, points) {
      let inside = false;
      for (let i=0, j=points.length-1; i<points.length; j=i++) {
        const xi=points[i][0], yi=points[i][1];
        const xj=points[j][0], yj=points[j][1];
        const intersects=((yi>y)!==(yj>y)) &&
          (x < (xj-xi)*(y-yi)/((yj-yi)||1e-9)+xi);
        if(intersects) inside=!inside;
      }
      return inside;
    }

    function pointInRotatedEllipse(x, y, ellipse) {
      if(!ellipse) return false;
      const cos=Math.cos(-ellipse.rotation), sin=Math.sin(-ellipse.rotation);
      const dx=x-ellipse.cx, dy=y-ellipse.cy;
      const rx=dx*cos-dy*sin, ry=dx*sin+dy*cos;
      return (rx*rx)/(ellipse.rx*ellipse.rx)+(ry*ry)/(ellipse.ry*ellipse.ry) <= 1;
    }

    function isPointInPlayableGlass(x, y) {
      const profile=getPlayableGlassProfile();
      if(!profile) return true;
      const p=screenToArtwork(x,y);
      if(!pointInPolygon(p.x,p.y,profile.polygon)) return false;
      return true;
    }

    function traceCarGlassPolygon(ctx, profile = getCarGlassProfile(), transform = getArtworkTransform()) {
      if(!profile?.polygon?.length) return false;
      ctx.beginPath();
      profile.polygon.forEach(([nx,ny],index)=>{
        const p=artworkPoint(nx,ny,transform);
        if(index===0) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y);
      });
      ctx.closePath();
      return true;
    }

    function getMirrorScreenGeometry(profile = getCarGlassProfile(), transform = getArtworkTransform()) {
      if(!profile?.mirror) return null;
      const m=profile.mirror;
      const center=artworkPoint(m.cx,m.cy,transform);
      return {
        cx:center.x, cy:center.y,
        rx:m.rx*transform.dw, ry:m.ry*transform.dh,
        rotation:m.rotation || 0
      };
    }

    function eraseMirrorFromContext(ctx) {
      const mirror=getMirrorScreenGeometry();
      if(!mirror) return;
      ctx.save();
      ctx.globalCompositeOperation="destination-out";
      ctx.beginPath();
      ctx.ellipse(mirror.cx,mirror.cy,mirror.rx,mirror.ry,mirror.rotation,0,Math.PI*2);
      ctx.fillStyle="#000";
      ctx.fill();
      ctx.restore();
    }

    function clipToCarGlass(ctx) {
      const profile=getCarGlassProfile();
      if(!profile) return false;
      ctx.save();
      traceCarGlassPolygon(ctx,profile);
      ctx.clip();
      return true;
    }

    function clipToPlayableGlass(ctx) {
      const profile=getPlayableGlassProfile();
      if(!profile) return false;
      ctx.save();
      traceCarGlassPolygon(ctx,profile);
      ctx.clip();
      return true;
    }

    function drawPermanentMirrorFog(ctx) {
      const mirror=getMirrorScreenGeometry();
      if(!mirror) return;
      ctx.save();
      ctx.translate(mirror.cx,mirror.cy);
      ctx.rotate(mirror.rotation);
      // Névoa propositalmente discreta: o retrovisor fica do lado de fora
      // e nunca participa da limpeza do vidro da cabine.
      const gradient=ctx.createRadialGradient(
        -mirror.rx*.18,-mirror.ry*.18,mirror.ry*.08,
        0,0,mirror.rx
      );
      gradient.addColorStop(0,"rgba(220,232,238,.16)");
      gradient.addColorStop(.62,"rgba(194,210,220,.115)");
      gradient.addColorStop(1,"rgba(170,190,205,.055)");
      ctx.fillStyle=gradient;
      ctx.beginPath();
      ctx.ellipse(0,0,mirror.rx*.86,mirror.ry*.74,0,0,Math.PI*2);
      ctx.fill();
      ctx.globalAlpha=.24;
      ctx.filter="blur(2.2px)";
      ctx.fillStyle="rgba(232,240,244,.16)";
      ctx.beginPath();
      ctx.ellipse(-mirror.rx*.08,-mirror.ry*.03,mirror.rx*.70,mirror.ry*.50,0,0,Math.PI*2);
      ctx.fill();
      ctx.restore();
    }

    function getCompletionTarget() {
      // Fase 17 — City Tunnel: conclui normalmente em 98%.
      // Se o jogador continuar limpando até 99% antes de soltar o dedo,
      // conquista a Road Star especial.
      if (!state.isZen && state.currentPhase === 16) return COMPLETION_TARGET;

      // Fases 11, 13 e 19: 99% conclui a fase e conquista a Road Star.
      if (isRoadStarPhase()) return ROAD_STAR_TARGET;

      // Mantém o comportamento anterior das demais fases.
      return isCarPhase() ? 1 : COMPLETION_TARGET;
    }

    // Cada estilo agora possui parâmetros visuais/mecânicos próprios.
    // radius: alcance | hardness: dureza da borda | scatter: dispersão em px
    // opacityPerStroke: quanto uma passada remove | texture: perfil do carimbo
    // shape: geometria principal da limpeza.
    const brushes = {
      soft: { name:{en:"Soft",pt:"Suave",es:"Suave"}, cost:0, radius:34, hardness:.35, scatter:0, opacityPerStroke:1.0, texture:"smooth", shape:"soft", desc:{en:"A gentle round pad with a soft feathered edge.",pt:"Uma almofada circular suave, com borda macia.",es:"Una almohadilla circular suave, con borde difuminado."} },
      precise: { name:{en:"Precise",pt:"Preciso",es:"Preciso"}, cost:100, radius:23, hardness:.75, scatter:0, opacityPerStroke:1.0, texture:"clean", shape:"precise", desc:{en:"A compact circular wipe for controlled details.",pt:"Uma limpeza circular compacta para detalhes controlados.",es:"Una limpieza circular compacta para detalles controlados."} },
      broad: { name:{en:"Sweep",pt:"Rodo",es:"Barrido"}, cost:200, radius:56, hardness:.70, scatter:0, opacityPerStroke:1.0, texture:"smooth", shape:"squeegee", desc:{en:"A compact squared squeegee wipe.",pt:"Uma limpeza compacta e quadrada, como um rodo.",es:"Una limpieza compacta y cuadrada, como una escobilla."} },
      sharp: { name:{en:"Sharp",pt:"Nítido",es:"Nítido"}, cost:300, radius:19, hardness:.89, scatter:0, opacityPerStroke:1.0, texture:"clean", shape:"sharp", desc:{en:"A narrow, crisp stripe with clean edges.",pt:"Uma faixa estreita e nítida, com bordas limpas.",es:"Una franja estrecha y nítida, con bordes limpios."} },
      dream: { name:{en:"Dream",pt:"Sonho",es:"Sueño"}, cost:500, radius:66, hardness:.09, scatter:18, opacityPerStroke:1.0, texture:"cloud", shape:"dream", desc:{en:"A drifting cloud of soft, overlapping wipes.",pt:"Uma nuvem flutuante de limpezas suaves e sobrepostas.",es:"Una nube flotante de limpiezas suaves y superpuestas."} },
      feather: { name:{en:"Feather",pt:"Pluma",es:"Pluma"}, cost:650, radius:46, hardness:.17, scatter:18, opacityPerStroke:1.0, texture:"feather", shape:"feather", desc:{en:"Soft filaments that fan along your movement.",pt:"Filamentos suaves que se abrem com o movimento.",es:"Filamentos suaves que se abren con el movimiento."} },
      needle: { name:{en:"Needle",pt:"Agulha",es:"Aguja"}, cost:800, radius:13, hardness:.98, scatter:0, opacityPerStroke:1.0, texture:"clean", shape:"needle", desc:{en:"An ultra-thin precision line.",pt:"Uma linha ultrafina e precisa.",es:"Una línea ultrafina y precisa."} },
      velvet: { name:{en:"Velvet",pt:"Veludo",es:"Terciopelo"}, cost:950, radius:50, hardness:.54, scatter:0, opacityPerStroke:.6, texture:"velvet", shape:"velvet", desc:{en:"A soft polishing pass with a velvety finish.",pt:"Uma passada macia de polimento com acabamento aveludado.",es:"Una pasada suave de pulido con acabado aterciopelado."} },
      mist: { name:{en:"Mist",pt:"Névoa",es:"Niebla"}, cost:1100, radius:62, hardness:.08, scatter:0, opacityPerStroke:.3, texture:"mist", shape:"mist", desc:{en:"A wide veil that clears gradually.",pt:"Um véu amplo que limpa aos poucos.",es:"Un velo amplio que limpia poco a poco."} },
      crystal: { name:{en:"Crystal",pt:"Cristal",es:"Cristal"}, cost:1300, radius:24, hardness:.95, scatter:0, opacityPerStroke:1.0, texture:"crystal", shape:"diamond", desc:{en:"Sharp, faceted crystal trail.",pt:"Rastro cristalino, facetado e definido.",es:"Trazo cristalino, facetado y definido."} },
      giant: { name:{en:"Giant",pt:"Gigante",es:"Gigante"}, cost:1600, radius:78, hardness:.37, scatter:0, opacityPerStroke:1.0, texture:"smooth", shape:"giant", desc:{en:"A huge oval sponge for broad passes.",pt:"Uma esponja oval enorme para passadas amplas.",es:"Una esponja oval enorme para pasadas amplias."} },
      focus: { name:{en:"Focus",pt:"Foco",es:"Enfoque"}, cost:1900, radius:36, hardness:.82, scatter:0, opacityPerStroke:1.0, texture:"clean", shape:"focus", desc:{en:"Sharp center with a soft outer halo.",pt:"Centro nítido com um halo suave ao redor.",es:"Centro nítido con un halo suave alrededor."} },
      windshield: { name:{en:"Windshield",pt:"Parabrisa",es:"Parabrisas"}, cost:0, radius:42, hardness:.58, scatter:0, opacityPerStroke:1.0, texture:"rubber", shape:"arc", desc:{en:"A secret style earned for a clear view.",pt:"Um estilo secreto conquistado pela vista limpa.",es:"Un estilo secreto conquistado por la vista despejada."} }
    };

    const WINDSHIELD_BRUSH_KEY = "windshield";
    let unlockedBrushes = { soft: true };


    // #endregion
    // #region 07 — SAVE / LOAD
    function saveGame() {
      const payload = {
        version: 13,
        points: state.points, stars: state.stars, highestPhase: state.highestPhase,
        currentPhase: state.resumePhase ?? (state.isZen ? state.campaignPhase : state.currentPhase),
        brush1: state.brush1, brush2: state.brush2, unlockedBrushes,
        rainIntensity: state.rainIntensity, ambVolume: state.ambVolume, rainVolume: state.rainVolume,
        gameSound: state.gameSound, musicSound: state.musicSound, vibration: state.vibration,
        lang: state.lang, lightningEnabled: state.lightningEnabled, zenAutoFog: state.zenAutoFog,
        completedPhases: state.completedPhases, perfectPhases: state.perfectPhases, roadStarPhases: state.roadStarPhases,
        windshieldUnlocked: state.windshieldUnlocked, windshieldRevealSeen: state.windshieldRevealSeen,
        completedSinceAd: state.completedSinceAd, lastAdAt: state.lastAdAt
      };
      try { localStorage.setItem("rainySkylineSave", JSON.stringify(payload)); }
      catch (error) { console.warn("Não foi possível salvar o progresso.", error); }
    }

    function loadGame() {
      try {
        const data = JSON.parse(localStorage.getItem("rainySkylineSave"));
        if (!data) return;
        state.points = Math.max(0, Number(data.points) || 0); state.stars = Math.max(0, Number(data.stars) || 0);
        state.highestPhase = Math.max(0, Math.min(ACTIVE_PHASE_COUNT - 1, Number(data.highestPhase) || 0));
        state.currentPhase = Math.max(0, Math.min(ACTIVE_PHASE_COUNT - 1, state.highestPhase, Number(data.currentPhase) || 0));
        state.campaignPhase = state.currentPhase;
        // Valida os dedos salvos para evitar quebrar o jogo se uma versão anterior
        // tiver deixado um identificador de brush que não existe mais.
        state.brush1 = (data.brush1 && brushes[data.brush1]) ? data.brush1 : "soft";
        state.brush2 = (data.brush2 && brushes[data.brush2]) ? data.brush2 : "soft";
        unlockedBrushes = Object.fromEntries(
          Object.entries(data.unlockedBrushes || {}).filter(([key, value]) => brushes[key] && value === true)
        );
        unlockedBrushes.soft = true;

        // Compatibilidade com saves antigos: se um estilo normal estava equipado,
        // ele já pertencia ao jogador. Mantemos essa posse mesmo que uma versão
        // antiga não tenha gravado corretamente unlockedBrushes.
        if(state.brush1 !== WINDSHIELD_BRUSH_KEY) unlockedBrushes[state.brush1] = true;
        if(state.brush2 !== WINDSHIELD_BRUSH_KEY) unlockedBrushes[state.brush2] = true;

        if(typeof data.rainIntensity === "number") state.rainIntensity = Math.max(.1, Math.min(1, data.rainIntensity));
        if(typeof data.ambVolume === "number") state.ambVolume = Math.max(0, Math.min(1, data.ambVolume));
        if(typeof data.rainVolume === "number") state.rainVolume = Math.max(0, Math.min(1, data.rainVolume));
        state.gameSound = data.gameSound !== false;
        state.musicSound = data.musicSound !== false;
        state.vibration = data.vibration !== false;
        state.zenAutoFog = data.zenAutoFog !== false;
        if(["en","es","pt"].includes(data.lang)) state.lang = data.lang;
        state.lightningEnabled = data.lightningEnabled !== false;
        state.completedPhases = Array.isArray(data.completedPhases)
          ? [...new Set(data.completedPhases.map(Number).filter(i => Number.isInteger(i) && i >= 0 && i < phases.length))]
          : Array.from({length: state.highestPhase}, (_, i) => i);
        state.perfectPhases = Array.isArray(data.perfectPhases)
          ? [...new Set(data.perfectPhases.map(Number).filter(i => Number.isInteger(i) && i >= 0 && i < ACTIVE_PHASE_COUNT))]
          : [];
        state.roadStarPhases = Array.isArray(data.roadStarPhases)
          ? [...new Set(data.roadStarPhases.map(Number).filter(i => isRoadStarPhaseIndex(i)))]
          : [];
        state.windshieldUnlocked = data.windshieldUnlocked === true;
        state.windshieldRevealSeen = data.windshieldRevealSeen === true;
        // Migração segura: saves antigos que já conquistaram as 4 Road Stars
        // também recebem o Parabrisa secreto sem precisar repetir as fases.
        if(ROAD_STAR_PHASES.every(index => state.roadStarPhases.includes(index))) {
          state.windshieldUnlocked = true;
        }
        if(state.windshieldUnlocked) {
          unlockedBrushes[WINDSHIELD_BRUSH_KEY] = true;
        } else {
          delete unlockedBrushes[WINDSHIELD_BRUSH_KEY];
          if(state.brush1 === WINDSHIELD_BRUSH_KEY) state.brush1 = "soft";
          if(state.brush2 === WINDSHIELD_BRUSH_KEY) state.brush2 = "soft";
        }
        state.completedSinceAd = Math.max(0, Number(data.completedSinceAd) || 0);
        state.lastAdAt = Math.max(0, Number(data.lastAdAt) || 0);
      } catch (error) { console.warn("Save inválido."); }
    }


    // #endregion
    // #region 08 — CANVASES / RESIZE / BACKGROUNDS / PARALLAX
    const bgCanvas = document.getElementById("bgCanvas");
    const rainCanvas = document.getElementById("rainCanvas");
    const glassCanvas = document.getElementById("glassCanvas");
    const fogCanvas = document.getElementById("fogCanvas");
    const bgCtx = bgCanvas.getContext("2d");
    const rainCtx = rainCanvas.getContext("2d");
    const glassCtx = glassCanvas.getContext("2d");
    const fogCtx = fogCanvas.getContext("2d");
    const fogBaseCanvas = document.createElement("canvas");
    const fogBaseCtx = fogBaseCanvas.getContext("2d");
    // A névoa visível agora é composta por uma base fixa + uma máscara de alpha.
    // Limpar apaga a máscara; no Zen ela volta suavemente sem criar quadrados.
    const fogMaskCanvas = document.createElement("canvas");
    const fogMaskCtx = fogMaskCanvas.getContext("2d");

    // Zen: snapshot imutável da névoa ORIGINAL.
    // A regeneração nunca cria "mais branco": ela só recupera a visibilidade
    // desta imagem original através da máscara.
    const zenFogOriginalCanvas = document.createElement("canvas");
    const zenFogOriginalCtx = zenFogOriginalCanvas.getContext("2d");
    let zenFogOriginalReady = false;
    let zenFogRegenAccumulator = 0;
    const ZEN_AC_LOGIC_STEP = 1 / 60;

    // Estado auxiliar exclusivo da regeneração automática Zen.
    let zenMaskCleanupTimer = 0.0;
    let zenFinalSnapTimer = 0.0;

    // Zen anti-marca:
    // pequeno canvas auxiliar para redistribuir o alpha da máscara.
    // Não usa ctx.filter/blur (Safari iOS safe) e NÃO adiciona opacidade;
    // apenas suaviza o contorno dos gestos durante a regeneração.
    const zenFogDiffuseCanvas = document.createElement("canvas");
    const zenFogDiffuseCtx = zenFogDiffuseCanvas.getContext("2d");
    let zenFogDiffuseTick = 0;

    let fogVisualDirty = true;

    let W = window.innerWidth; let H = window.innerHeight;
    const lowPowerDevice = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      (navigator.deviceMemory && navigator.deviceMemory <= 4);
    // Mantém boa nitidez sem multiplicar demais o custo dos quatro canvases.
    let DPR = Math.min(window.devicePixelRatio || 1, lowPowerDevice ? 1 : 1.5);
    let backgroundDirty = true;
    let lastRenderedFrame = 0;
    let lastBackgroundFrame = 0;
    let currentBackgroundImage = null;
    let currentBackgroundIndex = -1;
    const backgroundCache = new Map();
    const backgroundFailures = new Set();

    function uniqueSources(sources) {
      return [...new Set(sources.filter(Boolean))];
    }

    function backgroundCandidates(index, zen = false) {
      if (zen) {
        const custom = window.RAINY_SKYLINE_ZEN_BACKGROUND;
        return uniqueSources([
          ...(Array.isArray(custom) ? custom : custom ? [custom] : []),
          EMBEDDED_ZEN_BACKGROUND,
          "assets/backgrounds/zen.webp",
          "assets/backgrounds/zen.png",
          "zen.webp",
          "zen.png"
        ]);
      }

      const custom = window.RAINY_SKYLINE_BACKGROUNDS?.[index];
      const number = String(index + 1).padStart(2, "0");
      return uniqueSources([
        ...(Array.isArray(custom) ? custom : custom ? [custom] : []),
        EMBEDDED_PHASE_BACKGROUNDS[index],
        `assets/backgrounds/phase-${number}.webp`,
        `assets/backgrounds/phase-${number}.png`,
        `assets/backgrounds/phase-${number}.jpg`,
        `phase-${number}.webp`,
        `phase-${number}.png`,
        `phase-${number}.jpg`
      ]);
    }

    function loadImage(src) {
      if (!src) return Promise.reject(new Error("background unavailable"));
      if (backgroundCache.has(src)) return Promise.resolve(backgroundCache.get(src));
      if (backgroundFailures.has(src)) return Promise.reject(new Error("background unavailable"));
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.decoding = "async";
        const timeout = setTimeout(() => {
          image.src = "";
          backgroundFailures.add(src);
          reject(new Error("background timeout"));
        }, 5000);
        image.onload = () => {
          clearTimeout(timeout);
          backgroundCache.set(src, image);
          resolve(image);
        };
        image.onerror = () => {
          clearTimeout(timeout);
          backgroundFailures.add(src);
          reject(new Error("background unavailable"));
        };
        image.src = src;
      });
    }

    function trimBackgroundCache(index, zen = false) {
      const keep = new Set(backgroundCandidates(index, zen));
      if (!zen && index + 1 < ACTIVE_PHASE_COUNT) {
        for (const src of backgroundCandidates(index + 1, false)) keep.add(src);
      }
      for (const key of backgroundCache.keys()) {
        if (!keep.has(key)) backgroundCache.delete(key);
      }
    }

    async function ensurePhaseBackground(index, zen = state.isZen) {
      const key = zen ? "zen" : index;
      for (const src of backgroundCandidates(index, zen)) {
        try {
          const image = await loadImage(src);
          currentBackgroundImage = image;
          currentBackgroundIndex = key;
          backgroundDirty = true;
          trimBackgroundCache(index, zen);
          return image;
        } catch (_) { /* tenta a próxima fonte */ }
      }
      currentBackgroundImage = null;
      currentBackgroundIndex = key;
      backgroundDirty = true;
      return null;
    }

    async function preloadBackground(index, zen = false) {
      if (zen) {
        for (const src of backgroundCandidates(state.campaignPhase, true)) {
          try { await loadImage(src); return; } catch (_) { /* próxima */ }
        }
        return;
      }
      if (index < 0 || index >= ACTIVE_PHASE_COUNT) return;
      for (const src of backgroundCandidates(index, false)) {
        try { await loadImage(src); return; } catch (_) { /* próxima */ }
      }
    }

    function setupCanvas(canvas, ctx) {
      canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function resize() {
      const preserveFog = state.started && fogMaskCanvas.width > 0 && fogMaskCanvas.height > 0;
      let maskSnapshot=null, previousGrid=null, previousGridX=0, previousGridY=0;
      if(preserveFog){
        maskSnapshot=document.createElement("canvas");
        maskSnapshot.width=fogMaskCanvas.width;
        maskSnapshot.height=fogMaskCanvas.height;
        maskSnapshot.getContext("2d").drawImage(fogMaskCanvas,0,0);
        previousGrid=fogGrid.slice();
        previousGridX=GRID_X;
        previousGridY=GRID_Y;
        state.activePointers.clear();
        state.pointerBrushes.clear();
      }
      W = Math.max(320, document.documentElement.clientWidth || window.innerWidth);
      H = Math.max(480, document.documentElement.clientHeight || window.innerHeight);
      if(typeof brushStampCache !== "undefined") brushStampCache.clear();
      if(typeof dreamStampCache !== "undefined") dreamStampCache.clear();
      if(typeof giantStampCache !== "undefined") giantStampCache.clear();
      if(typeof squeegeeStampCache !== "undefined") squeegeeStampCache.clear();
      setupCanvas(bgCanvas, bgCtx); setupCanvas(rainCanvas, rainCtx);
      setupCanvas(glassCanvas, glassCtx); setupCanvas(fogCanvas, fogCtx);
      setupFogMaskCanvas();
      if (typeof glassDropsSystem !== "undefined") glassDropsSystem.resize();
      generateCity(); drawCityBackground();

      if(preserveFog && maskSnapshot && previousGrid?.length){
        buildFogBase();
        fogMaskCtx.clearRect(0,0,W,H);
        fogMaskCtx.drawImage(maskSnapshot,0,0,maskSnapshot.width,maskSnapshot.height,0,0,W,H);
        applyPlayableGlassMaskToFogMask();
        createFogGrid();
        fogClearedCells=0;
        for(let y=0;y<GRID_Y;y++){
          for(let x=0;x<GRID_X;x++){
            const index=y*GRID_X+x;
            if(fogGrid[index]===-1) continue;
            const oldX=Math.min(previousGridX-1,Math.floor((x+.5)/GRID_X*previousGridX));
            const oldY=Math.min(previousGridY-1,Math.floor((y+.5)/GRID_Y*previousGridY));
            const oldValue=previousGrid[oldY*previousGridX+oldX];
            if(oldValue>=0){
              const preserved=Math.max(0,Math.min(1,Number(oldValue)||0));
              fogGrid[index]=preserved;
              fogClearedCells+=preserved;
            }
          }
        }
        if(state.isZen) captureZenFogOriginal();
        fogVisualDirty=true;
        renderFogFromMask();
        updateProgress(true);
      } else initFog();
    }
    let resizeTimer=null;
    window.addEventListener("resize",()=>{ clearTimeout(resizeTimer); resizeTimer=setTimeout(resize,120); });

    let buildings = []; let bokeh = [];
    let streetLights = []; let traffic = [];

    function generateCity() {
      buildings = []; bokeh = []; streetLights = []; traffic = [];
      backgroundDirty = true;
      const phase = getActivePhase();
      let x = -40;
      while (x < W + 100) {
        buildings.push({ x, width: 45 + Math.random() * 80, height: 100 + Math.random() * H * .5, depth: .25 + Math.random() * .75 });
        x += buildings[buildings.length-1].width + 4;
      }
      for (let i = 0; i < (state.isZen ? 18 : 42); i++) {
        bokeh.push({ x: Math.random() * W, y: H * .25 + Math.random() * H * .55, r: 8 + Math.random() * 35, color: phase.lights[Math.floor(Math.random() * phase.lights.length)], alpha: .04 + Math.random() * .12 });
      }
      for(let i=0;i<10;i++) streetLights.push({x:Math.random()*W,y:H*(.60+Math.random()*.18),h:45+Math.random()*90,glow:phase.lights[i%phase.lights.length]});
      for(let i=0;i<7;i++) traffic.push({x:Math.random()*W,y:H*(.72+Math.random()*.14),speed:35+Math.random()*100,scale:.5+Math.random()*.8,tail:phase.lights[(i+1)%phase.lights.length]});
    }


    function drawImageCover(ctx, image, transform, shiftX=0, shiftY=0, scaleBoost=1) {
      const cx=W/2, cy=H/2;
      const dw=transform.dw*scaleBoost;
      const dh=transform.dh*scaleBoost;
      const dx=cx-dw/2+shiftX;
      const dy=cy-dh/2+shiftY;
      ctx.drawImage(image,dx,dy,dw,dh);
    }

    function drawSideCarParallax(image, transform) {
      const profile=getCarGlassProfile();
      if(!profile) return;

      // A arte é um único wallpaper. Para criar profundidade sem deslocar
      // porta/pilar/retrovisor, somente a região do vidro recebe camadas móveis.
      const travel=state.carOffset;
      const bands=[
        {from:.00,to:.48,amp:W*.010,speed:.0017,phase:.3},
        {from:.43,to:.61,amp:W*.020,speed:.0024,phase:1.1},
        {from:.56,to:.72,amp:W*.034,speed:.0032,phase:2.0}
      ];

      for(const band of bands){
        bgCtx.save();
        traceCarGlassPolygon(bgCtx,profile,transform);
        bgCtx.clip();
        const y0=transform.dy+band.from*transform.dh;
        const y1=transform.dy+band.to*transform.dh;
        bgCtx.beginPath();
        bgCtx.rect(0,y0-8,W,(y1-y0)+16);
        bgCtx.clip();
        const shift=-Math.abs(Math.sin(travel*band.speed+band.phase))*band.amp;
        const bob=Math.sin(state.elapsed*1.15+band.phase)*(band===bands[2]?1.4:.7);
        drawImageCover(bgCtx,image,transform,shift,bob,1.045);
        bgCtx.restore();
      }

      // Linhas de reflexo rápidas no plano mais próximo reforçam a direção
      // do movimento sem alterar a ilustração original.
      bgCtx.save();
      traceCarGlassPolygon(bgCtx,profile,transform);
      bgCtx.clip();
      const roadTop=transform.dy+transform.dh*.565;
      const roadBottom=transform.dy+transform.dh*.715;
      for(let i=0;i<7;i++){
        const speed=75+i*13;
        const span=W+220;
        let x=(i*173-travel*speed/100)%span;
        if(x<-180) x+=span;
        const y=roadTop+(roadBottom-roadTop)*(i/6);
        const len=34+i*13;
        bgCtx.strokeStyle=`rgba(205,225,238,${.028+i*.006})`;
        bgCtx.lineWidth=.7+i*.14;
        bgCtx.beginPath();
        bgCtx.moveTo(x,y);
        bgCtx.lineTo(x+len,y+.7);
        bgCtx.stroke();
      }
      bgCtx.restore();

      // O retrovisor pertence ao carro, não à paisagem: redesenha a região dele
      // sobre o parallax para permanecer perfeitamente fixa.
      const mirror=getMirrorScreenGeometry(profile,transform);
      if(mirror){
        bgCtx.save();
        bgCtx.beginPath();
        bgCtx.ellipse(
          mirror.cx,mirror.cy,
          mirror.rx*1.16,mirror.ry*1.28,
          mirror.rotation,0,Math.PI*2
        );
        bgCtx.clip();
        drawImageCover(bgCtx,image,transform,0,0,1);
        bgCtx.restore();
      }
    }

    function drawTunnelParallax(image, transform) {
      const profile=getCarGlassProfile();
      if(!profile) return;
      const zoom=1.018+Math.sin(state.elapsed*1.05)*.006;
      bgCtx.save();
      traceCarGlassPolygon(bgCtx,profile,transform);
      bgCtx.clip();
      drawImageCover(
        bgCtx,image,transform,
        Math.sin(state.elapsed*.72)*W*.0025,
        Math.sin(state.elapsed*1.30)*H*.0018,
        zoom
      );

      // Movimento de perspectiva: luzes/umidade saem do ponto de fuga.
      const vpX=W*.50, vpY=H*.43;
      const phase=(state.carOffset*.00135)%1;
      for(let i=0;i<10;i++){
        const p=(i/10+phase)%1;
        const eased=p*p;
        const y=vpY+(H-vpY)*eased;
        const spread=W*.42*eased;
        const alpha=.025+.085*p;
        bgCtx.strokeStyle=`rgba(246,181,91,${alpha})`;
        bgCtx.lineWidth=.8+2.3*p;
        bgCtx.beginPath();
        bgCtx.moveTo(vpX-spread*.18,y);
        bgCtx.lineTo(vpX-spread*.34,y+7+22*p);
        bgCtx.stroke();
        bgCtx.beginPath();
        bgCtx.moveTo(vpX+spread*.18,y);
        bgCtx.lineTo(vpX+spread*.34,y+7+22*p);
        bgCtx.stroke();
      }
      bgCtx.restore();
    }

    function drawCityBackground() {
      const phase = getActivePhase();
      bgCtx.clearRect(0, 0, W, H);

      const expectedBackgroundKey = state.isZen ? "zen" : state.currentPhase;
      if (currentBackgroundImage && currentBackgroundIndex === expectedBackgroundKey) {
        const image = currentBackgroundImage;
        const transform=getArtworkTransform(image);

        // Interior do carro permanece absolutamente fixo. Só a paisagem visível
        // através do vidro recebe o deslocamento de profundidade.
        drawImageCover(bgCtx,image,transform,0,0,1);
        if(isCarPhase()){
          if(state.currentPhase===16) drawTunnelParallax(image,transform);
          else drawSideCarParallax(image,transform);
        }

        // Gradação vertical discreta: conserva a arte, mas a coloca dentro do mesmo
        // clima do vidro, da chuva e do HUD.
        const grade = bgCtx.createLinearGradient(0, 0, 0, H);
        grade.addColorStop(0, `hsla(${phase.hue},24%,8%,${phase.type === "snow" ? .025 : .045})`);
        grade.addColorStop(.55, "rgba(3,7,18,.018)");
        grade.addColorStop(1, "rgba(2,6,14,.105)");
        bgCtx.fillStyle = grade;
        bgCtx.fillRect(0, 0, W, H);
        backgroundDirty = false;
        return;
      }

      const sky = bgCtx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, phase.sky[0]); sky.addColorStop(.55, phase.sky[1]); sky.addColorStop(1, "#020308");
      bgCtx.fillStyle = sky; bgCtx.fillRect(0, 0, W, H);

      // Bokeh Draw (animado se for carro)
      bokeh.forEach(light => {
        let lx = light.x;
        if(phase.type === 'car' || phase.type === 'car_snow') {
            lx = (light.x - state.carOffset * (light.r/10)) % W;
            if (lx < 0) lx += W;
        }
        const gradient = bgCtx.createRadialGradient(lx, light.y, 0, lx, light.y, light.r);
        gradient.addColorStop(0, light.color); gradient.addColorStop(1, "transparent");
        bgCtx.fillStyle = gradient; bgCtx.globalAlpha = light.alpha;
        bgCtx.beginPath(); bgCtx.arc(lx, light.y, light.r, 0, Math.PI * 2); bgCtx.fill();
      });
      bgCtx.globalAlpha = 1;

      if (phase.type !== 'car' && phase.type !== 'car_snow') {
        buildings.forEach((building, index) => {
          const y = H - building.height;
          bgCtx.fillStyle = `hsl(${phase.hue}, 25%, ${Math.max(2, 9 * building.depth)}%)`;
          bgCtx.fillRect(building.x, y, building.width, building.height);
          const rows = Math.floor(building.height / 17); const columns = Math.max(1, Math.floor(building.width / 18));
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
              if ((index * 97 + row * 31 + col * 17) % 11 > 5) continue;
              bgCtx.fillStyle = phase.lights[(index + row + col) % phase.lights.length];
              bgCtx.globalAlpha = .08 + (((index*97+row*31+col*17)%11) / 11) * .35;
              bgCtx.fillRect(building.x + 7 + col * 18, y + 9 + row * 17, 6, 5);
            }
          }
          bgCtx.globalAlpha = 1;
        });
      }

      // Wet road + reflections
      const roadY = H * .72;
      bgCtx.fillStyle = "rgba(2,5,10,.68)"; bgCtx.fillRect(0,roadY,W,H-roadY);
      bgCtx.strokeStyle = "rgba(255,255,255,.035)"; bgCtx.lineWidth=1;
      for(let y=roadY+18;y<H;y+=22){
        const ripple = Math.sin(state.elapsed * 0.72 + y * 0.018) * 0.9;
        bgCtx.beginPath(); bgCtx.moveTo(0,y+ripple); bgCtx.lineTo(W,y+ripple); bgCtx.stroke();
      }
      streetLights.forEach(l=>{
        bgCtx.strokeStyle="rgba(170,200,220,.18)"; bgCtx.lineWidth=2; bgCtx.beginPath(); bgCtx.moveTo(l.x,l.y); bgCtx.lineTo(l.x,l.y-l.h); bgCtx.stroke();
        const g=bgCtx.createRadialGradient(l.x,l.y-l.h,0,l.x,l.y-l.h,24); g.addColorStop(0,l.glow); g.addColorStop(1,"transparent"); bgCtx.fillStyle=g; bgCtx.globalAlpha=.22; bgCtx.beginPath(); bgCtx.arc(l.x,l.y-l.h,24,0,Math.PI*2); bgCtx.fill(); bgCtx.globalAlpha=1;
      });
      traffic.forEach(c=>{
        let x=(c.x-state.carOffset*c.speed/100)% (W+180); if(x< -120)x+=W+180;
        const y=c.y, sc=c.scale;
        bgCtx.fillStyle="rgba(8,12,18,.9)"; bgCtx.fillRect(x,y,42*sc,10*sc);
        const rg=bgCtx.createRadialGradient(x+5*sc,y+5*sc,0,x+5*sc,y+5*sc,18*sc); rg.addColorStop(0,c.tail); rg.addColorStop(1,"transparent"); bgCtx.fillStyle=rg; bgCtx.globalAlpha=.35; bgCtx.beginPath(); bgCtx.arc(x+5*sc,y+5*sc,18*sc,0,Math.PI*2); bgCtx.fill(); bgCtx.globalAlpha=1;
      });

      const ground = bgCtx.createLinearGradient(0, H * .76, 0, H);
      ground.addColorStop(0, "rgba(0,0,0,0)"); ground.addColorStop(1, "rgba(0,0,0,.55)");
      bgCtx.fillStyle = ground; bgCtx.fillRect(0, H * .7, W, H * .3);
      backgroundDirty = false;
    }

    function isPhase17DryTunnel() {
      return !state.isZen && state.currentPhase === 16;
    }

    const PHASE17_DISTANT_RAIN_PROFILE = Object.freeze({
      opening:{
        left:.266,
        right:.474,
        top:.512,
        shoulder:.575,
        base:.613,
        topInset:.012
      },
      carCutout:{
        left:.290,
        right:.405,
        roofTop:.571,
        roofBottom:.594,
        bodyTop:.590,
        bodyBottom:.614
      }
    });

    function tracePhase17TunnelExitPath(ctx) {
      const p = PHASE17_DISTANT_RAIN_PROFILE.opening;
      const left = p.left * W;
      const right = p.right * W;
      const top = p.top * H;
      const shoulder = p.shoulder * H;
      const base = p.base * H;
      const mid = (left + right) * .5;
      const inset = (right - left) * p.topInset;

      ctx.beginPath();
      ctx.moveTo(left, base);
      ctx.lineTo(left, shoulder);
      ctx.bezierCurveTo(
        left + inset, shoulder - (base - top) * .72,
        mid - (right - left) * .18, top,
        mid, top
      );
      ctx.bezierCurveTo(
        mid + (right - left) * .18, top,
        right - inset, shoulder - (base - top) * .72,
        right, shoulder
      );
      ctx.lineTo(right, base);
      ctx.closePath();
      return true;
    }

    function erasePhase17TunnelCarRain(ctx) {
      const c = PHASE17_DISTANT_RAIN_PROFILE.carCutout;
      const left = c.left * W;
      const right = c.right * W;
      const roofTop = c.roofTop * H;
      const roofBottom = c.roofBottom * H;
      const bodyTop = c.bodyTop * H;
      const bodyBottom = c.bodyBottom * H;
      const mid = (left + right) * .5;
      const width = right - left;

      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "#000";

      ctx.beginPath();
      ctx.moveTo(left, bodyBottom);
      ctx.lineTo(left, bodyTop);
      ctx.lineTo(left + width * .10, bodyTop);
      ctx.bezierCurveTo(
        left + width * .18, roofBottom,
        left + width * .24, roofTop,
        mid, roofTop
      );
      ctx.bezierCurveTo(
        right - width * .24, roofTop,
        right - width * .18, roofBottom,
        right - width * .10, bodyTop
      );
      ctx.lineTo(right, bodyTop);
      ctx.lineTo(right, bodyBottom);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(left + width * .08, bodyBottom - H * .006, width * .05, H * .007, 0, 0, Math.PI * 2);
      ctx.ellipse(right - width * .08, bodyBottom - H * .006, width * .05, H * .007, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawPhase17DistantRain() {
      if (!isPhase17DryTunnel()) return;

      const opening = PHASE17_DISTANT_RAIN_PROFILE.opening;
      const regionWidth = (opening.right - opening.left) * W;
      const top = opening.top * H;
      const base = opening.base * H;
      const streakCount = lowPowerDevice ? 20 : 28;

      rainCtx.save();
      tracePhase17TunnelExitPath(rainCtx);
      rainCtx.clip();
      rainCtx.globalAlpha = .66;

      for (let i = 0; i < streakCount; i++) {
        const seedA = Math.sin(i * 12.9898 + 1.7) * 43758.5453;
        const seedB = Math.sin(i * 78.233 + 0.4) * 19642.3491;
        const seedC = Math.sin(i * 39.425 + 2.1) * 9621.3457;
        const seedD = Math.sin(i * 25.173 + 3.6) * 18431.1159;
        const randA = seedA - Math.floor(seedA);
        const randB = seedB - Math.floor(seedB);
        const randC = seedC - Math.floor(seedC);
        const randD = seedD - Math.floor(seedD);

        const x = opening.left * W + randA * regionWidth;
        const fallSpeed = 180 + randB * 126;
        const pathHeight = (base - top) + 42;
        const y = top - 34 + ((state.elapsed * fallSpeed + randC * pathHeight) % pathHeight);
        const length = 5 + randD * 5;
        const slant = .8 + randB * 1.8;
        const alpha = .07 + randA * .05;
        const width = .34 + randD * .20;

        rainCtx.beginPath();
        rainCtx.strokeStyle = `rgba(204,218,232,${alpha})`;
        rainCtx.lineWidth = width;
        rainCtx.lineCap = "round";
        rainCtx.moveTo(x - slant, y - length);
        rainCtx.lineTo(x, y);
        rainCtx.stroke();
      }

      rainCtx.restore();
      erasePhase17TunnelCarRain(rainCtx);
    }

    function getEffectiveRainIntensity() {
      const phase = getActivePhase();
      if (isPhase17DryTunnel()) return 0;
      return state.isZen ? Math.max(.1, Math.min(1, state.rainIntensity)) : phase.rain;
    }

    const phaseAccentCache = new Map();
    function getPhaseAccentRgb() {
      const index = state.isZen ? "zen" : state.currentPhase;
      if (phaseAccentCache.has(index)) return phaseAccentCache.get(index);
      const hex = (getActivePhase()?.lights?.[0] || "#b9d9ee").replace("#","");
      const full = hex.length === 3 ? hex.split("").map(char=>char+char).join("") : hex;
      const rgb = {
        r: parseInt(full.slice(0,2),16) || 185,
        g: parseInt(full.slice(2,4),16) || 217,
        b: parseInt(full.slice(4,6),16) || 238
      };
      phaseAccentCache.set(index,rgb);
      return rgb;
    }

    function applyPhaseAtmosphere(phase) {
      const layer = document.getElementById("glassAtmosphere");
      if (!layer) return;
      const hue = Number.isFinite(phase?.hue) ? phase.hue : 210;
      layer.style.background =
        `radial-gradient(ellipse at 48% 37%, hsla(${hue},48%,78%,.045), transparent 58%),` +
        `linear-gradient(180deg, rgba(195,220,230,.022), hsla(${hue},28%,10%,.082))`;
    }


    // #endregion
    // #region 09 — CHUVA / NEVE / PARTÍCULAS
    // =========================================================
    // CHUVA ESCALÁVEL
    // Base visual: código de chuva pesada fornecido pelo usuário.
    // A fase controla a mesma chuva através de phase.rain (0.0 -> 1.0).
    // =========================================================

    const MAX_RAIN_DROPS = lowPowerDevice ? 220 : 350;

    function getRainVisualIntensity() {
      return Math.max(0, Math.min(1, getEffectiveRainIntensity()));
    }

    // Cada mapa mantém a mesma identidade visual de chuva, mas com uma
    // "personalidade" própria: quantidade, velocidade, comprimento, presença e vento.
    const RAIN_STYLE_PROFILE = Object.freeze({
      light:       { density:.62, speed:.78, length:.78, opacity:.82, thickness:.82, wind:.75 },
      steady:      { density:.78, speed:.88, length:.92, opacity:.90, thickness:.90, wind:.90 },
      heavy:       { density:.88, speed:1.05, length:1.08, opacity:1.00, thickness:.98, wind:.95 },
      neon:        { density:.84, speed:1.10, length:.95, opacity:1.08, thickness:.90, wind:1.00 },
      soft:        { density:.52, speed:.68, length:.72, opacity:.75, thickness:.76, wind:.55 },
      storm:       { density:1.00, speed:1.20, length:1.15, opacity:1.00, thickness:1.05, wind:1.35 },
      breeze:      { density:.44, speed:.74, length:.76, opacity:.76, thickness:.78, wind:1.15 },
      memory:      { density:.64, speed:.82, length:.90, opacity:.86, thickness:.86, wind:.70 },
      drizzle:     { density:.34, speed:.58, length:.55, opacity:.62, thickness:.68, wind:.45 },
      clearing:    { density:.24, speed:.52, length:.58, opacity:.58, thickness:.65, wind:.40 },
      carRain:     { density:.72, speed:1.05, length:1.00, opacity:.95, thickness:.92, wind:1.00 },
      highwayRain: { density:.95, speed:1.22, length:1.12, opacity:1.00, thickness:.98, wind:1.35 },
      sunShower:   { density:.57, speed:1.00, length:.78, opacity:.88, thickness:.78, wind:.95 },
      tunnelRain:  { density:.66, speed:1.12, length:1.00, opacity:.90, thickness:.90, wind:1.10 },
      goldenRain:  { density:.48, speed:.78, length:.72, opacity:.78, thickness:.74, wind:.60 },
      finalRain:   { density:.20, speed:.50, length:.52, opacity:.58, thickness:.62, wind:.35 }
    });

    function getRainStyleProfile(phase = getActivePhase()) {
      return RAIN_STYLE_PROFILE[phase?.rainStyle] || RAIN_STYLE_PROFILE.steady;
    }

    // PASSO 2 — rajadas amplas e suaves nas fases da campanha.
    // O valor representa quanto a força lateral pode respirar ao longo do tempo.
    // Tempestades recebem mais variação; garoas e chuvas finais, quase nenhuma.
    const RAIN_GUST_STRENGTH = Object.freeze({
      light:.12,
      steady:.15,
      heavy:.19,
      neon:.18,
      soft:.09,
      storm:.32,
      breeze:.22,
      memory:.12,
      drizzle:.07,
      clearing:.06,
      carRain:.15,
      highwayRain:.24,
      sunShower:.17,
      tunnelRain:.18,
      goldenRain:.10,
      finalRain:.05
    });

    function getCampaignRainGustMultiplier(phase = getActivePhase(), depth = .5) {
      // O Zen fica exatamente fora deste passo. O vento aleatório dele será
      // implementado separadamente depois da neve, como combinado.
      if (state.isZen) return 1;

      const strength = RAIN_GUST_STRENGTH[phase?.rainStyle] ?? .14;
      const phaseOffset = state.currentPhase * .73;

      // Duas ondas longas, com períodos diferentes, evitam uma oscilação mecânica.
      // A direção base da fase não é invertida: apenas ganha e perde força suavemente.
      const slowWave = Math.sin(state.elapsed * .18 + phaseOffset);
      const longWave = Math.sin(state.elapsed * .071 + 1.9 + phaseOffset * .51);
      const gust = slowWave * .62 + longWave * .38;

      // Gotas próximas sentem mais a rajada; gotas distantes permanecem discretas.
      const clampedDepth = Math.max(0, Math.min(1, depth));
      const depthInfluence = .55 + clampedDepth * .70;

      return Math.max(.55, 1 + gust * strength * depthInfluence);
    }

    // PASSO 1 — movimento lateral da chuva nas fases da campanha.
    // Valores em "pixels por frame a 60 FPS" antes dos multiplicadores de
    // intensidade/profundidade. Sinal negativo = esquerda; positivo = direita.
    // As fases de neve ficam em 0 porque usam o sistema dedicado de neve.
    // O Zen mantém por enquanto o comportamento anterior; a direção aleatória
    // será adicionada separadamente depois que este movimento estiver aprovado.
    const PHASE_RAIN_WIND = Object.freeze([
      -1.10,  // 01 First Rain
       .95,   // 02 Distant Lights
      -1.35,  // 03 After Midnight
       1.50,  // 04 Neon Splash
       -.75,  // 05 The Window
      -2.20,  // 06 Storm
       1.25,  // 07 Horizon
      -1.00,  // 08 Memories
        .55,  // 09 Silence
        .70,  // 10 Clearing Sky
      -1.80,  // 11 Moving Car
       0,     // 12 Snowfall
      -2.50,  // 13 Highway Rain
       0,     // 14 Morning Frost
       1.15,  // 15 Summer Sun Shower
       0,     // 16 Midnight Blizzard
       -.90,  // 17 City Tunnel (chuva distante continua separada)
        .85,  // 18 Golden Hour Drops
       0,     // 19 Snowy Drive
       -.55   // 20 The Last Wipe
    ]);

    function getPhaseRainWindFrame() {
      // No Zen o vento agora é global e muda de direção suavemente (Passo 4).
      if (state.isZen) return 0;
      return PHASE_RAIN_WIND[state.currentPhase] ?? -0.9;
    }

    // PASSO 4 — vento aleatório do Modo Zen.
    // O jogo escolhe entre esquerda, direita ou quase vertical e mantém essa
    // direção por alguns segundos. A troca nunca acontece de forma instantânea:
    // o vento atual desliza lentamente até o novo alvo.
    const zenWindState = {
      current:0,
      target:0,
      changeIn:0,
      snow:false
    };

    function chooseZenWindTarget(isSnow = false) {
      const intensity = Math.max(.1, Math.min(1, getEffectiveRainIntensity()));

      // Chuva pode inclinar mais; neve recebe um vento mais macio.
      const maxWind = isSnow
        ? 18 + intensity * 36
        : 26 + intensity * 76;

      const roll = Math.random();

      // ~20% quase vertical, ~40% esquerda e ~40% direita.
      let direction = 0;
      if (roll >= .20) direction = roll < .60 ? -1 : 1;

      if (direction === 0) {
        // Mesmo quando cai quase reta, existe uma deriva mínima para não parecer
        // completamente congelada no eixo vertical.
        const tinyDirection = Math.random() < .5 ? -1 : 1;
        return tinyDirection * maxWind * (.02 + Math.random() * .08);
      }

      const magnitude = maxWind * (.38 + Math.random() * .62);
      return direction * magnitude;
    }

    function resetZenWind(isSnow = false) {
      zenWindState.current = 0;
      zenWindState.target = chooseZenWindTarget(isSnow);
      zenWindState.changeIn = 8 + Math.random() * 8;
      zenWindState.snow = isSnow;
    }

    function updateZenWind(dt, isSnow = false) {
      if (!state.isZen) return;

      // Ao trocar chuva <-> neve no slider, escolhe um alvo adequado ao novo clima.
      if (zenWindState.snow !== isSnow) {
        zenWindState.snow = isSnow;
        zenWindState.target = chooseZenWindTarget(isSnow);
        zenWindState.changeIn = 8 + Math.random() * 8;
      }

      zenWindState.changeIn -= Math.max(0, dt);

      if (zenWindState.changeIn <= 0) {
        zenWindState.target = chooseZenWindTarget(isSnow);

        // Neve segura uma direção um pouco mais; chuva pode variar antes.
        zenWindState.changeIn = isSnow
          ? 11 + Math.random() * 10
          : 9 + Math.random() * 9;
      }

      // Interpolação exponencial: atravessa o centro naturalmente quando o novo
      // alvo está no lado oposto, sem "estalo" visual.
      const response = isSnow ? .25 : .36;
      const blend = 1 - Math.exp(-Math.max(0, dt) * response);
      zenWindState.current += (zenWindState.target - zenWindState.current) * blend;
    }

    class Particle {
      constructor() { this.reset(true); }

      reset(initial = false) {
        const phase = getActivePhase();
        this.isSnow = phase.type === 'snow' || phase.type === 'car_snow';

        // Mantém a neve original separada. A alteração abaixo vale para chuva.
        if (this.isSnow) {
          const depthRoll=Math.random();
          if(depthRoll<.55){ this.layer=0; this.z=.08+Math.random()*.34; }
          else if(depthRoll<.90){ this.layer=1; this.z=.43+Math.random()*.36; }
          else { this.layer=2; this.z=.80+Math.random()*.20; }

          const snowLayer=[
            {vy:[24,62],size:[.45,1.05],alpha:[.035,.10],blur:0},
            {vy:[48,105],size:[.9,1.9],alpha:[.09,.22],blur:0},
            {vy:[72,150],size:[1.8,3.8],alpha:[.16,.34],blur:.65}
          ][this.layer];

          this.x = Math.random() * (W + 220) - 110;
          this.y = initial ? Math.random() * H : -20-Math.random() * H;
          this.vy=snowLayer.vy[0]+Math.random()*(snowLayer.vy[1]-snowLayer.vy[0]);
          this.len=this.width=snowLayer.size[0]+Math.random()*(snowLayer.size[1]-snowLayer.size[0]);
          this.alpha=snowLayer.alpha[0]+Math.random()*(snowLayer.alpha[1]-snowLayer.alpha[0]);
          this.blur=snowLayer.blur;
          this.wind=(Math.random()-.5)*(18+this.layer*25);
          this.gustAmp=7+this.layer*10+Math.random()*8;
          this.phase=Math.random()*Math.PI*2;
          this.age=Math.random()*10;
          this.pulse=.72+Math.random()*.56;
          this.currentVx=this.wind;
          this.currentVy=this.vy;
          this.isBead=false;
          return;
        }

        // -----------------------------------------------------
        // CHUVA — BASE PESADA RECEBIDA
        // PROFUNDIDADE: 65% fundo / 28% médio / 7% primeiro plano
        // -----------------------------------------------------
        const depthRoll = Math.random();
        let depth;

        if (depthRoll < .65) {
          this.layer = 0;                    // FUNDO — 65%
          depth = .08 + Math.random() * .30;
        } else if (depthRoll < .93) {
          this.layer = 1;                    // PLANO MÉDIO — 28%
          depth = .42 + Math.random() * .30;
        } else {
          this.layer = 2;                    // PRIMEIRO PLANO — 7%
          depth = .82 + Math.random() * .18;
        }

        const intensity = getRainVisualIntensity();
        const profile = getRainStyleProfile(phase);
        const zenClimate = state.isZen ? getZenClimate() : null;

        this.z = depth;
        this.x = Math.random() * W;
        this.y = initial ? Math.random() * H : -Math.random() * 150;

        // A profundidade altera a leitura física da mesma chuva.
        // Fundo: menor, mais fino, mais discreto e mais lento.
        // Primeiro plano: raro, comprido, rápido e mais presente.
        const baseLength = 8 + depth * 22 + Math.random() * 8;
        const baseSpeedFrame = 7 + depth * 15 + Math.random() * 5;
        const baseOpacity = 0.15 + depth * 0.4;
        const baseThickness = 0.5 + depth * 1.2;

        // Cada fase agora possui uma direção própria de vento. Pequenas variações
        // por gota + profundidade evitam linhas perfeitamente paralelas sem fazer
        // a chuva "dançar" como neve.
        const phaseWindFrame = getPhaseRainWindFrame();
        const windVariation = .78 + Math.random() * .44;
        const depthWind = .70 + depth * .55;
        const baseWindFrame = phaseWindFrame * windVariation * depthWind;

        // Intensidade geral do mapa + personalidade individual da fase.
        const lengthScale = zenClimate
          ? zenClimate.length * profile.length
          : (.46 + intensity * .54) * profile.length;
        const speedScale = zenClimate
          ? zenClimate.speed * profile.speed
          : (.52 + intensity * .48) * profile.speed;
        const opacityScale = (.34 + intensity * .66) * profile.opacity;
        const thicknessScale = zenClimate
          ? zenClimate.width * profile.thickness
          : (.58 + intensity * .42) * profile.thickness;
        const windScale = (.58 + intensity * .42) * profile.wind;

        this.len = baseLength * lengthScale;
        this.vy = baseSpeedFrame * 60 * speedScale;       // px/s, independente do FPS
        this.alpha = Math.min(.58, baseOpacity * opacityScale);
        this.width = baseThickness * thicknessScale;
        this.wind = baseWindFrame * 60 * windScale;       // px/s, independente do FPS

        this.blur = 0;
        this.gustAmp = 0;
        this.phase = Math.random() * Math.PI * 2;
        this.age = 0;
        this.pulse = 1;
        this.currentVx = this.wind;
        this.currentVy = this.vy;
        this.zenWindFactor = .82 + Math.random() * .36;
        this.isBead = false;
      }

      update(dt) {
        const phase = getActivePhase();
        this.age += dt;

        if (this.isSnow) {
          const intensity = 0.46 + getEffectiveRainIntensity() * 0.78;
          const broadGust=Math.sin(state.elapsed*.61)*.62+Math.sin(state.elapsed*.19+1.8)*.38;
          const localGust=Math.sin(this.age*(.7+this.pulse)+this.phase);
          this.currentVx=this.wind+broadGust*this.gustAmp+localGust*this.gustAmp*.28;
          this.currentVy=this.vy*intensity;
          if (phase.type === 'car_snow') this.currentVx += 92*(.35+this.z*.95);
        } else {
          if (state.isZen) {
            // O vento é compartilhado por toda a chuva do Zen, mas profundidade
            // e uma pequena variação individual impedem linhas idênticas.
            const depthInfluence = .56 + this.z * .64;
            this.currentVx =
              zenWindState.current *
              depthInfluence *
              this.zenWindFactor;
          } else {
            // A direção base criada no Passo 1 continua igual. O Passo 2 apenas
            // faz a força desse vento respirar lentamente durante a fase.
            const gustMultiplier = getCampaignRainGustMultiplier(phase, this.z);
            this.currentVx = this.wind * gustMultiplier;
          }

          this.currentVy = this.vy;

          // Nas fases de carro, mantém a sensação da paisagem em movimento,
          // mas sem criar outro tipo de chuva.
          if (phase.type === 'car') {
            this.currentVx += 185 * (.35 + this.z * .95);
          }
        }

        this.x += this.currentVx * dt;
        this.y += this.currentVy * dt;

        if (
          this.y > H + Math.max(70, this.len) ||
          this.x < -80 ||
          this.x > W + 180
        ) {
          this.reset(false);
        }
      }

      draw() {
        if (this.isSnow) {
          const a=Math.min(.42,this.alpha*(.70+getEffectiveRainIntensity()*.34));
          rainCtx.save();
          if(this.blur) rainCtx.filter=`blur(${this.blur}px)`;
          rainCtx.fillStyle = `rgba(255,255,255,${a})`;
          rainCtx.beginPath();
          rainCtx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
          rainCtx.fill();
          rainCtx.restore();
          return;
        }

        // Desenho da chuva fornecida: traço simples, arredondado e natural.
        const travelTime = this.len / Math.max(1, this.currentVy);
        const tailX = this.x - this.currentVx * travelTime;
        const tailY = this.y - this.len;

        rainCtx.beginPath();
        rainCtx.strokeStyle = `rgba(210, 220, 230, ${Math.min(.58, this.alpha)})`;
        rainCtx.lineWidth = this.width;
        rainCtx.lineCap = "round";
        rainCtx.moveTo(tailX, tailY);
        rainCtx.lineTo(this.x, this.y);
        rainCtx.stroke();
      }
    }

    const rainParticles = Array.from({ length: MAX_RAIN_DROPS }, () => new Particle());

    // ============================================================
    // NEVE ❄️ — SISTEMA DEDICADO
    // Baseado no código fornecido pelo usuário.
    // Profundidade fixa: 65% fundo / 28% médio / 7% primeiro plano.
    // Cada fase de neve possui quantidade e velocidade próprias.
    // ============================================================

    const MAX_SNOW_FLAKES = lowPowerDevice ? 195 : 300;

    const SNOW_STYLE_PROFILE = Object.freeze({
      // 12 — Snowfall: neve calma/moderada
      snowSoft: {
        count: 170,
        speed: .92,
        size: 1.00,
        opacity: .95,
        sway: 1.00,
        drift: 1.00,
        wind: 0,
        rotation: 1.00,
        carMotion: 0
      },

      // 14 — Morning Frost: poucos flocos, muito delicados e lentos
      snowLight: {
        count: 88,
        speed: .64,
        size: .88,
        opacity: .78,
        sway: .78,
        drift: .72,
        wind: -1,
        rotation: .72,
        carMotion: 0
      },

      // 16 — Midnight Blizzard: maior quantidade, queda rápida e vento forte
      blizzard: {
        count: 300,
        speed: 1.72,
        size: 1.05,
        opacity: 1.08,
        sway: 1.55,
        drift: 1.65,
        wind: -68,
        rotation: 1.55,
        carMotion: 0
      },

      // 19 — Snowy Drive: neve média/alta, rápida e puxada pelo carro
      snowDrive: {
        count: 220,
        speed: 1.24,
        size: .98,
        opacity: .96,
        sway: 1.18,
        drift: 1.32,
        wind: -14,
        rotation: 1.18,
        carMotion: 118
      }
    });

    // PASSO 3 — movimento natural da neve nas fases da campanha.
    // O Zen fica fora deste passo: em 100% ele preserva exatamente o comportamento
    // anterior até receber o sistema de direção aleatória próprio no próximo passo.
    const SNOW_NATURAL_MOTION_PROFILE = Object.freeze({
      snowSoft:  { gust:12, sway:1.00, flutter:1.00, fallPulse:.045 },
      snowLight: { gust: 6, sway:.82, flutter:.72, fallPulse:.030 },
      blizzard:  { gust:36, sway:1.26, flutter:1.38, fallPulse:.070 },
      snowDrive: { gust:20, sway:1.10, flutter:1.12, fallPulse:.055 }
    });

    function getSnowNaturalMotionProfile(phase = getActivePhase()) {
      return SNOW_NATURAL_MOTION_PROFILE[phase?.rainStyle] || SNOW_NATURAL_MOTION_PROFILE.snowSoft;
    }

    function getSnowStyleProfile(phase = getActivePhase()) {
      return SNOW_STYLE_PROFILE[phase?.rainStyle] || SNOW_STYLE_PROFILE.snowSoft;
    }

    function getSnowActiveCount(phase = getActivePhase()) {
      const profile = getSnowStyleProfile(phase);
      const deviceScale = lowPowerDevice ? .65 : 1;
      return Math.max(18, Math.min(
        MAX_SNOW_FLAKES,
        Math.round(profile.count * deviceScale)
      ));
    }

    function chooseSnowLayer() {
      const random = Math.random();

      // 65% FUNDO
      if (random < .65) return 0;

      // 28% PLANO MÉDIO
      if (random < .93) return 1;

      // 7% PRIMEIRO PLANO
      return 2;
    }

    class SnowFlake {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.layer = chooseSnowLayer();

        let size;
        let speedFrame;
        let opacity;
        let swayAmount;
        let swaySpeedFrame;
        let driftFrame;
        let blur;

        // =================================================
        // FUNDO — 65%
        // =================================================
        if (this.layer === 0) {
          size = 1 + Math.random() * 1.6;
          speedFrame = .25 + Math.random() * .45;
          opacity = .15 + Math.random() * .20;
          swayAmount = .15 + Math.random() * .35;
          swaySpeedFrame = .004 + Math.random() * .005;
          driftFrame = (Math.random() - .5) * .12;
          blur = 0;
          this.depth = .08 + Math.random() * .30;
        }

        // =================================================
        // PLANO MÉDIO — 28%
        // =================================================
        else if (this.layer === 1) {
          size = 3 + Math.random() * 2.5;
          speedFrame = .7 + Math.random() * .9;
          opacity = .40 + Math.random() * .30;
          swayAmount = .8 + Math.random() * 1.5;
          swaySpeedFrame = .008 + Math.random() * .008;
          driftFrame = (Math.random() - .5) * .25;
          blur = 0;
          this.depth = .42 + Math.random() * .30;
        }

        // =================================================
        // PRIMEIRO PLANO — 7%
        // =================================================
        else {
          size = 6 + Math.random() * 5;
          speedFrame = 1.3 + Math.random() * 1.3;
          opacity = .50 + Math.random() * .30;
          swayAmount = 1.5 + Math.random() * 2.5;
          swaySpeedFrame = .007 + Math.random() * .008;
          driftFrame = (Math.random() - .5) * .45;
          blur = .8 + Math.random() * 1.2;
          this.depth = .82 + Math.random() * .18;
        }

        this.x = Math.random() * W;
        this.y = initial ? Math.random() * H : -Math.random() * 100;

        this.baseSize = size;

        // O código fornecido era frame-based. Convertemos para px/s / rad/s
        // para manter a mesma sensação independentemente de 30/60/120 Hz.
        this.baseSpeed = speedFrame * 60;
        this.baseOpacity = opacity;
        this.baseSwayAmount = swayAmount;
        this.baseSwaySpeed = swaySpeedFrame * 60;
        this.baseDrift = driftFrame * 60;
        this.baseBlur = blur;

        this.swayAngle = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - .5) * .012 * 60;
        this.flutterPhase = Math.random() * Math.PI * 2;
        this.fallPhase = Math.random() * Math.PI * 2;

        this.drawX = this.x;
        this.currentSize = this.baseSize;
        this.currentOpacity = this.baseOpacity;
        this.currentBlur = this.baseBlur;
      }

      update(dt, phase = getActivePhase()) {
        const profile = getSnowStyleProfile(phase);

        this.swayAngle += this.baseSwaySpeed * profile.sway * dt;
        this.rotation += this.rotationSpeed * profile.rotation * dt;

        // O Zen continua byte-a-byte equivalente ao movimento anterior.
        // Este passo altera somente as fases de neve da campanha.
        if (state.isZen) {
          const swayX =
            Math.sin(this.swayAngle) *
            this.baseSwayAmount *
            profile.sway;

          this.drawX = this.x + swayX;

          const speed = this.baseSpeed * profile.speed;

          let horizontalSpeed =
            this.baseDrift * profile.drift +
            profile.wind;

          // No Zen 100%, a neve usa a mesma direção aleatória global,
          // sentindo menos vento no fundo e mais no primeiro plano.
          const zenDepthInfluence = [ .24, .62, 1.00 ][this.layer] ?? 1;
          horizontalSpeed += zenWindState.current * zenDepthInfluence;

          if (phase.type === "car_snow") {
            horizontalSpeed +=
              profile.carMotion *
              (.35 + this.depth * .95);
          }

          this.y += speed * dt;
          this.x += horizontalSpeed * dt;
        } else {
          const natural = getSnowNaturalMotionProfile(phase);

          // Profundidade do movimento:
          // 65% fundo quase reto / 28% médio perceptível / 7% frente mais solto.
          const swayDepth = [ .32, 1.00, 1.34 ][this.layer] ?? 1;
          const gustDepth = [ .16, .62, 1.00 ][this.layer] ?? 1;
          const flutterDepth = [ .10, .58, 1.00 ][this.layer] ?? 1;

          // Duas ondas lentas formam uma rajada ampla sem parecer um pêndulo.
          const phaseOffset = state.currentPhase * .67;
          const broadGust =
            Math.sin(state.elapsed * .23 + phaseOffset) * .64 +
            Math.sin(state.elapsed * .087 + 1.8 + phaseOffset * .41) * .36;

          // Cada floco tem uma pequena flutuação própria. No fundo ela é quase
          // imperceptível; no primeiro plano fica mais evidente e orgânica.
          const organicSway =
            Math.sin(this.swayAngle) +
            Math.sin(this.swayAngle * .47 + this.flutterPhase) * .34 * natural.flutter;

          const swayX =
            organicSway *
            this.baseSwayAmount *
            profile.sway *
            natural.sway *
            swayDepth;

          this.drawX = this.x + swayX;

          // A queda também respira alguns poucos por cento para os flocos não
          // manterem velocidade perfeitamente constante.
          const fallPulse =
            1 +
            Math.sin(this.swayAngle * .31 + this.fallPhase) *
            natural.fallPulse *
            (.35 + this.depth * .65);

          const speed =
            this.baseSpeed *
            profile.speed *
            fallPulse;

          const localFlutter =
            Math.sin(this.swayAngle * .73 + this.flutterPhase) *
            natural.gust *
            .20 *
            flutterDepth;

          let horizontalSpeed =
            this.baseDrift * profile.drift +
            profile.wind +
            broadGust * natural.gust * gustDepth +
            localFlutter;

          // Snowy Drive continua recebendo claramente o deslocamento do carro.
          if (phase.type === "car_snow") {
            horizontalSpeed +=
              profile.carMotion *
              (.35 + this.depth * .95);
          }

          this.y += speed * dt;
          this.x += horizontalSpeed * dt;
        }

        this.currentSize = this.baseSize * profile.size;
        this.currentOpacity = Math.min(.88, this.baseOpacity * profile.opacity);
        this.currentBlur = this.baseBlur;

        if (
          this.y > H + 40 ||
          this.x < -80 ||
          this.x > W + 120
        ) {
          this.reset(false);
        }
      }

      draw() {
        const x = this.drawX;
        const y = this.y;
        const size = this.currentSize;
        const opacity = this.currentOpacity;
        const blur = this.currentBlur;

        rainCtx.save();
        rainCtx.translate(x, y);
        rainCtx.rotate(this.rotation);

        // Apenas os raros flocos de primeiro plano recebem leve desfoque.
        rainCtx.filter = blur > 0 ? `blur(${blur}px)` : "none";

        rainCtx.strokeStyle =
          `rgba(245, 248, 255, ${opacity})`;

        rainCtx.lineWidth =
          Math.max(.35, size * .10);

        rainCtx.lineCap = "round";

        // 6 braços do floco, iguais à referência fornecida.
        for (let i = 0; i < 6; i++) {
          rainCtx.save();
          rainCtx.rotate(i * Math.PI / 3);
          rainCtx.beginPath();

          // braço central
          rainCtx.moveTo(0, 0);
          rainCtx.lineTo(0, -size);

          // primeira ramificação
          rainCtx.moveTo(0, -size * .50);
          rainCtx.lineTo(-size * .23, -size * .68);

          rainCtx.moveTo(0, -size * .50);
          rainCtx.lineTo(size * .23, -size * .68);

          // segunda ramificação
          rainCtx.moveTo(0, -size * .72);
          rainCtx.lineTo(-size * .17, -size * .85);

          rainCtx.moveTo(0, -size * .72);
          rainCtx.lineTo(size * .17, -size * .85);

          rainCtx.stroke();
          rainCtx.restore();
        }

        // centro
        rainCtx.beginPath();
        rainCtx.arc(
          0,
          0,
          Math.max(.4, size * .08),
          0,
          Math.PI * 2
        );
        rainCtx.fillStyle =
          `rgba(250, 252, 255, ${opacity})`;
        rainCtx.fill();

        rainCtx.filter = "none";
        rainCtx.restore();
      }
    }

    const snowFlakes = Array.from(
      { length: MAX_SNOW_FLAKES },
      () => new SnowFlake()
    );

    // ============================================================
    // GOTAS NO VIDRO — V8 DETALHE SUTIL
    // O toque apenas remove. Poucas gotas escorrem naturalmente e só elas
    // incorporam gotas abaixo, ficando maiores e um pouco mais rápidas.
    // ============================================================


    // #endregion
    // #region 10 — GOTAS NO VIDRO
    class GlassDrop {
      constructor() { this.reset(true); }

      reset(initial=false) {
        this.x=Math.random()*W;
        this.y=Math.random()*H;
        const roll=Math.random();
        if(roll<.70) this.r=1.8+Math.random()*2.2;
        else if(roll<.95) this.r=3.8+Math.random()*3.0;
        else this.r=7+Math.random()*5;

        this.scaleX=.92+Math.random()*.12;
        this.scaleY=.94+Math.random()*.14;
        this.rotation=(Math.random()-.5)*.32;
        this.alpha=.34+Math.random()*.30;
        this.edge=.58+Math.random()*.62;
        this.highlight=.06+Math.random()*.09;
        this.vx=0;
        this.vy=0;
        this.dripping=this.r>3.2 && Math.random()<GLASS_DRIP_FREQUENCY;
        if(this.dripping){
          this.vx=(Math.random()-.5)*2.4;
          this.vy=7+Math.random()*13;
        }
        this.alive=true;
        this.respawnAt=0;
        this.spawnProgress=initial?1:0;
      }

      scheduleRespawn(delay=3000) {
        this.alive=false;
        this.dripping=false;
        this.vx=0;
        this.vy=0;
        this.respawnAt=performance.now()+delay;
      }

      update(dt) {
        if(!this.alive) return;
        this.spawnProgress=Math.min(1,this.spawnProgress+dt*3.35);
        if(!this.dripping && Math.abs(this.vx)<.2 && Math.abs(this.vy)<.2) return;

        this.vy=Math.min(145,this.vy+(18+this.r*1.45)*dt);
        this.x+=this.vx*dt;
        this.y+=this.vy*dt;
        this.vx*=Math.exp(-dt*.72);
        if(this.r>4.8 || this.vy>15) this.dripping=true;

        if(
          this.y>H+35 || this.x<-35 || this.x>W+35 ||
          (isCarPhase() && !isPointInPlayableGlass(this.x,this.y))
        ) this.scheduleRespawn(3000);
      }

      draw(ctx) {
        if(!this.alive || this.spawnProgress<=0) return;
        const stretch=this.dripping?Math.min(.46,Math.max(0,this.vy-8)/240):0;
        ctx.save();
        ctx.globalAlpha=this.spawnProgress;
        ctx.translate(this.x,this.y);
        ctx.rotate(this.rotation*(1-stretch));
        ctx.scale(this.scaleX*(1-stretch*.20),this.scaleY*(1+stretch));

        const r=this.r;
        const points=r<2.5?20:24;
        ctx.beginPath();
        for(let i=0;i<=points;i++){
          const angle=Math.PI*2*(i/points);
          const tiny=1+Math.sin(angle*3+this.x*.01)*.012+Math.cos(angle*5+this.y*.01)*.008;
          const px=Math.cos(angle)*r*tiny;
          const py=Math.sin(angle)*r*tiny;
          if(i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
        }
        ctx.closePath();

        const accent=getPhaseAccentRgb();
        const fill=ctx.createRadialGradient(-r*.22,-r*.25,0,0,0,r);
        fill.addColorStop(0,`rgba(255,255,255,${this.highlight*.20})`);
        fill.addColorStop(.55,`rgba(${accent.r},${accent.g},${accent.b},${this.alpha*.045})`);
        fill.addColorStop(1,"rgba(255,255,255,0)");
        ctx.fillStyle=fill;
        ctx.fill();
        ctx.strokeStyle=`rgba(22,32,40,${this.alpha*.48})`;
        ctx.lineWidth=Math.max(.32,this.edge*.72);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-r*.22,-r*.20,Math.max(.25,r*.55),Math.PI*1.06,Math.PI*1.58);
        ctx.strokeStyle=`rgba(255,255,255,${this.highlight*.62})`;
        ctx.lineWidth=Math.max(.22,this.edge*.48);
        ctx.stroke();

        if(this.dripping && r>4){
          ctx.beginPath();
          ctx.moveTo(0,-r*.62);
          ctx.lineTo(-this.vx*.025,-r*(1.45+stretch*3.2));
          ctx.strokeStyle=`rgba(220,235,240,${this.alpha*.10})`;
          ctx.lineWidth=Math.max(.32,r*.07);
          ctx.lineCap="round";
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    class GlassDrops {
      constructor(canvas) {
        this.canvas=canvas;
        const cfg=getGlassDropConfig();
        this.count=cfg.count;
        this.drops=[];
        this.mergeAccumulator=0;
        this.dripAccumulator=0;
        this.resize();
        this.create();
      }

      resize() {
        const oldW=this.W || window.innerWidth;
        const oldH=this.H || window.innerHeight;
        this.W=W;
        this.H=H;
        if(this.drops?.length && oldW>0 && oldH>0){
          for(const drop of this.drops){
            drop.x=Math.max(drop.r,Math.min(this.W-drop.r,drop.x*this.W/oldW));
            drop.y=Math.max(drop.r,Math.min(this.H-drop.r,drop.y*this.H/oldH));
          }
        }
      }

      findOpenPosition(radius,ignoreDrop=null) {
        let best=null;
        let bestClearance=-Infinity;
        for(let attempt=0;attempt<110;attempt++){
          const candidate={
            x:radius+4+Math.random()*Math.max(1,this.W-radius*2-8),
            y:58+Math.random()*Math.max(1,this.H-128)
          };
          if(!isPointInPlayableGlass(candidate.x,candidate.y)) continue;
          let minimum=Infinity;
          for(const other of this.drops){
            if(other===ignoreDrop || !other.alive) continue;
            const required=(radius+other.r)*1.35+2;
            minimum=Math.min(minimum,Math.hypot(candidate.x-other.x,candidate.y-other.y)-required);
          }
          if(minimum>=0) return candidate;
          if(minimum>bestClearance){ bestClearance=minimum; best=candidate; }
        }
        if(best) return best;

        // Fallback seguro: procura qualquer ponto do vidro real.
        for(let attempt=0;attempt<160;attempt++){
          const candidate={x:Math.random()*this.W,y:Math.random()*this.H};
          if(isPointInPlayableGlass(candidate.x,candidate.y)) return candidate;
        }
        return {x:this.W*.5,y:this.H*.42};
      }

      configureDrop(drop,initial=true) {
        const cfg=getGlassDropConfig();
        drop.reset(initial);
        const roll=Math.random();
        drop.r=roll<.70
          ? cfg.min+Math.random()*(cfg.max-cfg.min)*.55
          : cfg.min+Math.random()*(cfg.max-cfg.min);
        const position=this.findOpenPosition(drop.r,drop);
        drop.x=position.x;
        drop.y=position.y;
        drop.vx=0;
        drop.vy=0;
        drop.dripping=drop.r>3.2 && Math.random()<GLASS_DRIP_FREQUENCY;
        if(drop.dripping) drop.vy=7+Math.random()*13;
        return drop;
      }

      create() {
        this.drops=[];
        for(let i=0;i<this.count;i++) this.drops.push(this.configureDrop(new GlassDrop(),true));
      }

      resetForPhase() {
        const cfg=getGlassDropConfig();
        this.count=cfg.count;
        this.create();
      }

      update(dt) {
        for(const drop of this.drops){
          if(!drop.alive) continue;
          drop.update(dt);
        }

        // Frequência aprovada: 0,6% por tick lógico de 60 Hz para iniciar
        // UMA gota escorrendo. O acumulador mantém o comportamento igual em 30/60/120 FPS.
        this.dripAccumulator += dt;
        const logicalStep = 1 / 60;
        while(this.dripAccumulator >= logicalStep){
          this.dripAccumulator -= logicalStep;
          const intensityFactor = .72 + getEffectiveRainIntensity() * .56;
          if(Math.random() < GLASS_DRIP_FREQUENCY * intensityFactor){
            const candidates=this.drops.filter(drop => drop.alive && !drop.dripping && drop.spawnProgress>=1 && drop.r>3.2);
            if(candidates.length){
              const drop=candidates[Math.floor(Math.random()*candidates.length)];
              drop.dripping=true;
              drop.vx=(Math.random()-.5)*2.2;
              drop.vy=6+Math.random()*10;
            }
          }
        }

        // A fusão roda oito vezes por segundo para manter o custo baixo.
        this.mergeAccumulator+=dt;
        if(this.mergeAccumulator<.125) return;
        this.mergeAccumulator=0;

        for(let i=0;i<this.drops.length;i++){
          const a=this.drops[i];
          if(!a.alive || !a.dripping) continue;
          for(let j=0;j<this.drops.length;j++){
            if(j===i) continue;
            const b=this.drops[j];
            if(!b.alive) continue;
            const dx=b.x-a.x;
            const dy=b.y-a.y;
            const limit=Math.max(2.4,(a.r+b.r)*.76);
            // Só absorve uma gota realmente abaixo do caminho de queda.
            if(dy<-.5 || dy>limit || Math.abs(dx)>limit*.72 || dx*dx+dy*dy>=limit*limit) continue;

            const areaA=a.r*a.r;
            const areaB=b.r*b.r;
            const area=areaA+areaB;
            a.x=(a.x*areaA+b.x*areaB)/area;
            a.y=Math.max(a.y,(a.y*areaA+b.y*areaB)/area);
            a.vx=(a.vx*areaA+b.vx*areaB)/area;
            a.r=Math.min(13,Math.sqrt(area));
            a.vy=Math.min(145,Math.max(a.vy,b.vy,8)+4+a.r*1.45);
            a.dripping=true;
            a.spawnProgress=Math.max(a.spawnProgress,b.spawnProgress);
            b.scheduleRespawn(3000);
            break;
          }
        }
      }

      draw(ctx) {
        for(const drop of this.drops) drop.draw(ctx);
      }

      wipe(x,y,radius) {
        for(const drop of this.drops){
          if(!drop.alive) continue;
          const dx=drop.x-x;
          const dy=drop.y-y;
          const hit=radius+Math.max(1,drop.r*.72);
          if(dx*dx+dy*dy>=hit*hit) continue;
          drop.scheduleRespawn(3000);
        }
      }

      replenish() {
        const now=performance.now();
        for(const drop of this.drops){
          if(!drop.alive && now>=drop.respawnAt) this.configureDrop(drop,false);
        }
      }
    }

const glassDropsSystem = new GlassDrops(glassCanvas);
    let GRID_X = 18;
    let GRID_Y = 32;
    let fogGrid = [];
    let fogClearedCells = 0;
    let fogPlayableCells = 1;
    const brushStampCache = new Map();

    function setupFogMaskCanvas() {
      fogMaskCanvas.width=Math.max(1,Math.round(W*DPR));
      fogMaskCanvas.height=Math.max(1,Math.round(H*DPR));
      fogMaskCtx.setTransform(DPR,0,0,DPR,0,0);
      fogMaskCtx.globalCompositeOperation="source-over";
      fogMaskCtx.globalAlpha=1;
      fogMaskCtx.clearRect(0,0,W,H);
    }


    // #endregion
    // #region 11 — NÉVOA / LIMPEZA / REGENERAÇÃO ZEN
    function createFogGrid() {
      GRID_X = Math.max(14, Math.ceil(W / 26));
      GRID_Y = Math.max(22, Math.ceil(H / 26));
      fogGrid = Array.from({ length: GRID_X * GRID_Y }, () => -1);
      fogClearedCells = 0;
      fogPlayableCells = 0;

      for(let gy=0;gy<GRID_Y;gy++){
        for(let gx=0;gx<GRID_X;gx++){
          const px=(gx+.5)/GRID_X*W;
          const py=(gy+.5)/GRID_Y*H;
          const index=gy*GRID_X+gx;
          if(isPointInPlayableGlass(px,py)){
            fogGrid[index]=0;
            fogPlayableCells++;
          }
        }
      }
      fogPlayableCells=Math.max(1,fogPlayableCells);
    }

    function buildFogBase() {
      fogBaseCanvas.width = Math.max(1, Math.round(W * DPR));
      fogBaseCanvas.height = Math.max(1, Math.round(H * DPR));
      fogBaseCtx.setTransform(DPR, 0, 0, DPR, 0, 0);
      fogBaseCtx.clearRect(0, 0, W, H);

      // A base visual é gerada uma única vez. No Zen só a máscara muda,
      // então a névoa não acumula branco nem forma blocos.
      fogBaseCtx.save();
      fogBaseCtx.filter = "blur(10px) saturate(.82)";
      fogBaseCtx.globalAlpha = .76;
      fogBaseCtx.drawImage(bgCanvas, 0, 0, bgCanvas.width, bgCanvas.height, -12, -12, W + 24, H + 24);
      fogBaseCtx.restore();

      const phase = getActivePhase();
      const fogOpacity = Math.max(.18, Math.min(.48, (phase.fog ?? .40) * .86));
      fogBaseCtx.fillStyle = `rgba(190,205,213,${fogOpacity})`;
      fogBaseCtx.fillRect(0, 0, W, H);

      fogBaseCtx.globalAlpha = .035;
      for(let i=0;i<34;i++){
        const x = Math.random()*W;
        const y = Math.random()*H;
        const rw = 90 + Math.random()*190;
        const rh = 50 + Math.random()*130;
        fogBaseCtx.fillStyle = "rgba(255,255,255,.18)";
        fogBaseCtx.beginPath();
        fogBaseCtx.ellipse(x,y,rw,rh,Math.random()*Math.PI,0,Math.PI*2);
        fogBaseCtx.fill();
      }
      fogBaseCtx.globalAlpha = 1;
    }

    function applyPlayableGlassMaskToFogMask() {
      const profile=getPlayableGlassProfile();
      if(!profile) return;
      fogMaskCtx.save();
      fogMaskCtx.globalCompositeOperation="destination-in";
      traceCarGlassPolygon(fogMaskCtx,profile);
      fogMaskCtx.fillStyle="#fff";
      fogMaskCtx.fill();
      fogMaskCtx.restore();

      // Retrovisor é deliberadamente removido da máscara de limpeza.
      // A névoa leve dele é desenhada separadamente e nunca pode ser apagada.
      const mirror=getMirrorScreenGeometry(profile);
      if(mirror){
        fogMaskCtx.save();
        fogMaskCtx.globalCompositeOperation="destination-out";
        fogMaskCtx.beginPath();
        fogMaskCtx.ellipse(mirror.cx,mirror.cy,mirror.rx,mirror.ry,mirror.rotation,0,Math.PI*2);
        fogMaskCtx.fillStyle="#000";
        fogMaskCtx.fill();
        fogMaskCtx.restore();
      }
    }

    function resetFogMask() {
      setupFogMaskCanvas();
      fogMaskCtx.globalCompositeOperation="source-over";
      fogMaskCtx.fillStyle="#fff";
      const profile=getPlayableGlassProfile();
      if(profile){
        traceCarGlassPolygon(fogMaskCtx,profile);
        fogMaskCtx.fill();
        const mirror=getMirrorScreenGeometry(profile);
        if(mirror){
          fogMaskCtx.save();
          fogMaskCtx.globalCompositeOperation="destination-out";
          fogMaskCtx.beginPath();
          fogMaskCtx.ellipse(mirror.cx,mirror.cy,mirror.rx,mirror.ry,mirror.rotation,0,Math.PI*2);
          fogMaskCtx.fillStyle="#000";
          fogMaskCtx.fill();
          fogMaskCtx.restore();
        }
      } else {
        fogMaskCtx.fillRect(0,0,W,H);
      }
      fogVisualDirty=true;
    }

    function captureZenFogOriginal() {
      if(!state.isZen) {
        zenFogOriginalReady = false;
        return;
      }
      zenFogOriginalCanvas.width = fogBaseCanvas.width;
      zenFogOriginalCanvas.height = fogBaseCanvas.height;
      zenFogOriginalCtx.setTransform(1,0,0,1,0,0);
      zenFogOriginalCtx.clearRect(0,0,zenFogOriginalCanvas.width,zenFogOriginalCanvas.height);
      zenFogOriginalCtx.drawImage(fogBaseCanvas,0,0);
      zenFogOriginalReady = true;
    }

    // =========================================================
    // ZEN — REGENERAÇÃO AUTOMÁTICA (CÓDIGO SOLICITADO)
    // =========================================================

    // Configurações do tempo (em segundos)
    const TOUCH_DELAY_SECONDS = 2.0; // Espere 2s antes de começar a regenerar
    const RAMP_UP_DURATION = 1.5;   // Tempo para atingir a regeneração máxima após o delay
    const BASE_REGEN_RATE = 0.36;    // Taxa base de regeneração por segundo (~2.7s para 100%)

    let touchStartTime = null;
    let isFingerDown = false;

    // Eventos de toque
    function onTouchStart() {
        isFingerDown = true;
        touchStartTime = performance.now() / 1000; // Tempo em segundos
    }

    function onTouchEnd() {
        isFingerDown = false;
        touchStartTime = null;
    }

    function ensureZenMaskCleanupCanvas() {
        if (zenFogDiffuseCanvas.width !== fogMaskCanvas.width ||
            zenFogDiffuseCanvas.height !== fogMaskCanvas.height) {
            zenFogDiffuseCanvas.width = fogMaskCanvas.width;
            zenFogDiffuseCanvas.height = fogMaskCanvas.height;
        }
    }

    // Função de atualização chamada a cada frame (Game Loop / requestAnimationFrame)
    function updateFog(deltaTime, rainIntensity) {
        // 1. Calcula a taxa de regeneração por segundo com base na chuva
        // Ex: rainIntensity (0.0 a 1.0)
        let maxRegenRate = BASE_REGEN_RATE + (rainIntensity * 0.24);
        let currentRegenRate = 0;

        if (isFingerDown && touchStartTime !== null) {
            let currentTime = performance.now() / 1000;
            let timePassed = currentTime - touchStartTime;

            if (timePassed < TOUCH_DELAY_SECONDS) {
                // Trava total nos primeiros 2 segundos
                currentRegenRate = 0;
            } else {
                // Após 2s, evolui suavemente de 0 até a velocidade máxima
                let progress = (timePassed - TOUCH_DELAY_SECONDS) / RAMP_UP_DURATION;
                let easeInFactor = Math.min(Math.max(progress, 0), 1); // Clamp entre 0 e 1

                currentRegenRate = maxRegenRate * (easeInFactor * easeInFactor); // Curva Ease-In
            }
        } else {
            // Sem o dedo na tela: regeneração normal contínua
            currentRegenRate = maxRegenRate;
        }

        // 2. Aplica o incremento multiplicando por deltaTime (garante independência de FPS)
        let opacityToAdd = currentRegenRate * deltaTime;

        // Nesta build a névoa é uma máscara por pixel, então o fogOpacity do exemplo
        // é aplicado à máscara inteira sem alterar as outras mecânicas.
        if(opacityToAdd > 0) {
          fogMaskCtx.save();
          fogMaskCtx.setTransform(1,0,0,1,0,0);
          fogMaskCtx.globalCompositeOperation = "source-over";
          fogMaskCtx.fillStyle = `rgba(255,255,255,${Math.min(opacityToAdd, 1.0)})`;
          fogMaskCtx.fillRect(0,0,fogMaskCanvas.width,fogMaskCanvas.height);
          fogMaskCtx.restore();
          fogMaskCtx.setTransform(DPR,0,0,DPR,0,0);
          fogVisualDirty = true;
        }

        // 4. Threshold equivalente na máscara desta build.
        // Durante o toque, resíduos de alfa abaixo de 0.05 são removidos.
        if(isFingerDown) {
          zenMaskCleanupTimer += Math.max(0, Math.min(.10, deltaTime));
          if(zenMaskCleanupTimer >= .10) {
            zenMaskCleanupTimer = 0;

            ensureZenMaskCleanupCanvas();
            zenFogDiffuseCtx.save();
            zenFogDiffuseCtx.setTransform(1,0,0,1,0,0);
            zenFogDiffuseCtx.globalCompositeOperation = "copy";
            zenFogDiffuseCtx.globalAlpha = 1;
            zenFogDiffuseCtx.clearRect(0,0,zenFogDiffuseCanvas.width,zenFogDiffuseCanvas.height);
            zenFogDiffuseCtx.drawImage(fogMaskCanvas,0,0);
            zenFogDiffuseCtx.restore();

            const image = zenFogDiffuseCtx.getImageData(
              0,0,zenFogDiffuseCanvas.width,zenFogDiffuseCanvas.height
            );
            const data = image.data;
            const threshold = Math.round(0.05 * 255);

            for(let i=3;i<data.length;i+=4) {
              if(data[i] < threshold) data[i] = 0;
            }

            zenFogDiffuseCtx.putImageData(image,0,0);

            fogMaskCtx.save();
            fogMaskCtx.setTransform(1,0,0,1,0,0);
            fogMaskCtx.globalCompositeOperation = "copy";
            fogMaskCtx.globalAlpha = 1;
            fogMaskCtx.drawImage(zenFogDiffuseCanvas,0,0);
            fogMaskCtx.restore();
            fogMaskCtx.setTransform(DPR,0,0,DPR,0,0);
            fogVisualDirty = true;
          }
        }
    }

    // Finalização 98% -> 100%:
    // source-over se aproxima de alfa 1 matematicamente, mas pode nunca chegar
    // exatamente a 255. Este passe só atua no final da regeneração e transforma
    // pixels já praticamente restaurados em névoa 100% opaca.
    function snapZenFogToFullOpacity(dt) {
      if(isFingerDown) {
        zenFinalSnapTimer = 0.0;
        return;
      }

      zenFinalSnapTimer += Math.max(0, Math.min(.10, dt));
      if(zenFinalSnapTimer < .18) return;
      zenFinalSnapTimer = 0.0;

      ensureZenMaskCleanupCanvas();

      zenFogDiffuseCtx.save();
      zenFogDiffuseCtx.setTransform(1,0,0,1,0,0);
      zenFogDiffuseCtx.globalCompositeOperation = "copy";
      zenFogDiffuseCtx.globalAlpha = 1;
      zenFogDiffuseCtx.clearRect(0,0,zenFogDiffuseCanvas.width,zenFogDiffuseCanvas.height);
      zenFogDiffuseCtx.drawImage(fogMaskCanvas,0,0);
      zenFogDiffuseCtx.restore();

      const image = zenFogDiffuseCtx.getImageData(
        0,0,zenFogDiffuseCanvas.width,zenFogDiffuseCanvas.height
      );
      const data = image.data;

      // Só fecha o último ~2% visual. Não interfere no início/meio da regeneração.
      const fullThreshold = Math.round(0.98 * 255);
      let changed = false;

      for(let i=3;i<data.length;i+=4) {
        if(data[i] >= fullThreshold && data[i] < 255) {
          data[i] = 255;
          changed = true;
        }
      }

      if(!changed) return;

      zenFogDiffuseCtx.putImageData(image,0,0);

      fogMaskCtx.save();
      fogMaskCtx.setTransform(1,0,0,1,0,0);
      fogMaskCtx.globalCompositeOperation = "copy";
      fogMaskCtx.globalAlpha = 1;
      fogMaskCtx.drawImage(zenFogDiffuseCanvas,0,0);
      fogMaskCtx.restore();
      fogMaskCtx.setTransform(DPR,0,0,DPR,0,0);
      fogVisualDirty = true;
    }

    function regenerateZenFog(dt) {
      if(!state.isZen || !state.zenAutoFog || !state.started || state.paused || !zenFogOriginalReady) return;

      updateFog(dt, state.rainIntensity);
      snapZenFogToFullOpacity(dt);

      // Mantém o progresso lógico sincronizado com a regeneração visual.
      if(!isFingerDown) {
        const maxRegenRate = BASE_REGEN_RATE + (state.rainIntensity * .24);
        const chanceScale = Math.max(0, Math.min(1, maxRegenRate * dt * 2.5));

        if(Math.random() < chanceScale) {
          for(let i=0;i<fogGrid.length;i++) {
            if(fogGrid[i] > 0 && Math.random() < .018) {
              const previous=fogGrid[i];
              fogGrid[i]=Math.max(0,previous-.12);
              fogClearedCells=Math.max(0,fogClearedCells-(previous-fogGrid[i]));
            }
          }
        }
      }

      updateProgress();
    }

    function renderFogFromMask() {
      if(!fogVisualDirty) return;
      fogCtx.save();
      fogCtx.globalCompositeOperation="source-over";
      fogCtx.globalAlpha=1;
      fogCtx.clearRect(0,0,W,H);

      // Campanha continua usando fogBaseCanvas.
      // Zen usa um snapshot IMUTÁVEL da névoa inicial.
      const sourceFog = state.isZen && zenFogOriginalReady
        ? zenFogOriginalCanvas
        : fogBaseCanvas;

      fogCtx.drawImage(sourceFog,0,0,sourceFog.width,sourceFog.height,0,0,W,H);
      fogCtx.globalCompositeOperation="destination-in";
      fogCtx.drawImage(fogMaskCanvas,0,0,fogMaskCanvas.width,fogMaskCanvas.height,0,0,W,H);
      fogCtx.restore();
      fogVisualDirty=false;
    }

    function initFog() {
      createFogGrid();
      buildFogBase();
      resetFogMask();

      // Captura a névoa cheia ANTES de qualquer limpeza/regeneração.
      captureZenFogOriginal();
      zenFogRegenAccumulator = 0;
      zenFogDiffuseTick = 0;
      touchStartTime = null;
      isFingerDown = false;
      zenMaskCleanupTimer = 0.0;
      zenFinalSnapTimer = 0.0;

      renderFogFromMask();
      state.fogProgress = 0;
      updateProgress(true);
    }

    const BRUSH_TEXTURE_PROFILE = Object.freeze({
      smooth:  { core:1.00, mid:.34, edge:.05 },
      clean:   { core:1.00, mid:.22, edge:.025 },
      cloud:   { core:.92,  mid:.48, edge:.12 },
      feather: { core:.90,  mid:.40, edge:.07 },
      velvet:  { core:.96,  mid:.36, edge:.05 },
      mist:    { core:.82,  mid:.52, edge:.16 },
      crystal: { core:1.00, mid:.16, edge:.015 },
      rubber:  { core:1.00, mid:.22, edge:.02 }
    });

    function getBrushTextureProfile(brush) {
      return BRUSH_TEXTURE_PROFILE[brush?.texture] || BRUSH_TEXTURE_PROFILE.smooth;
    }

    function getBrushScatterOffset(brush) {
      const scatter=Math.max(0,Number(brush?.scatter)||0);
      if(!scatter) return {x:0,y:0};
      const angle=Math.random()*Math.PI*2;
      const distance=Math.sqrt(Math.random())*scatter;
      return {x:Math.cos(angle)*distance,y:Math.sin(angle)*distance};
    }

    function pointInRotatedRect(px, py, cx, cy, halfWidth, halfHeight, angle) {
      const cos=Math.cos(-angle), sin=Math.sin(-angle);
      const dx=px-cx, dy=py-cy;
      const localX=dx*cos-dy*sin;
      const localY=dx*sin+dy*cos;
      return Math.abs(localX)<=halfWidth && Math.abs(localY)<=halfHeight;
    }

    function traceRoundedRect(ctx, x, y, width, height, radius) {
      const r=Math.max(0,Math.min(radius,Math.min(width,height)*.5));
      ctx.beginPath();
      ctx.moveTo(x+r,y);
      ctx.lineTo(x+width-r,y);
      ctx.quadraticCurveTo(x+width,y,x+width,y+r);
      ctx.lineTo(x+width,y+height-r);
      ctx.quadraticCurveTo(x+width,y+height,x+width-r,y+height);
      ctx.lineTo(x+r,y+height);
      ctx.quadraticCurveTo(x,y+height,x,y+height-r);
      ctx.lineTo(x,y+r);
      ctx.quadraticCurveTo(x,y,x+r,y);
      ctx.closePath();
    }

    function markFogRotatedRectGrid(x, y, halfWidth, halfHeight, angle, opacity=1) {
      let marked=0;
      const amount=Math.max(.01,Math.min(1,Number(opacity)||1));
      const reach=Math.hypot(halfWidth,halfHeight);
      const gx=Math.floor((x/W)*GRID_X), gy=Math.floor((y/H)*GRID_Y);
      const rx=Math.ceil((reach/W)*GRID_X)+1, ry=Math.ceil((reach/H)*GRID_Y)+1;

      for(let yy=gy-ry;yy<=gy+ry;yy++){
        for(let xx=gx-rx;xx<=gx+rx;xx++){
          if(xx<0||yy<0||xx>=GRID_X||yy>=GRID_Y) continue;
          const px=(xx+.5)/GRID_X*W;
          const py=(yy+.5)/GRID_Y*H;
          const index=yy*GRID_X+xx;
          if(fogGrid[index]<0 || fogGrid[index]>=1 || !isPointInPlayableGlass(px,py)) continue;
          if(!pointInRotatedRect(px,py,x,y,halfWidth,halfHeight,angle)) continue;
          const previous=fogGrid[index];
          const next=Math.min(1,previous+amount);
          fogGrid[index]=next;
          fogClearedCells+=next-previous;
          marked+=next-previous;
        }
      }
      return marked;
    }

    function wipeGlassDropsInRotatedRect(x, y, halfWidth, halfHeight, angle) {
      for(const drop of glassDropsSystem.drops){
        if(!drop.alive) continue;
        const padding=Math.max(1,drop.r*.72);
        if(pointInRotatedRect(drop.x,drop.y,x,y,halfWidth+padding,halfHeight+padding,angle)) {
          drop.scheduleRespawn(3000);
        }
      }
    }

    const squeegeeStampCache = new Map();

    function getSqueegeeStamp(brush, radius) {
      const safeRadius=Math.max(4,Number(radius)||4);
      const hardness=Math.max(.02,Math.min(.98,Number(brush?.hardness)||.5));
      const opacity=Math.max(.01,Math.min(1,Number(brush?.opacityPerStroke)||1));
      const halfWidth=safeRadius*.58;
      const halfHeight=safeRadius*.32;
      const feather=2+(1-hardness)*7;
      const corner=Math.max(2,safeRadius*.10);
      const key=`${safeRadius.toFixed(2)}:${hardness.toFixed(3)}:${opacity.toFixed(3)}:${DPR}`;
      if(squeegeeStampCache.has(key)) return squeegeeStampCache.get(key);

      const padding=3;
      const cssWidth=Math.ceil((halfWidth+feather)*2+padding*2);
      const cssHeight=Math.ceil((halfHeight+feather)*2+padding*2);
      const canvas=document.createElement("canvas");
      canvas.width=Math.ceil(cssWidth*DPR);
      canvas.height=Math.ceil(cssHeight*DPR);
      const context=canvas.getContext("2d");
      context.setTransform(DPR,0,0,DPR,0,0);
      const cx=cssWidth/2, cy=cssHeight/2;
      context.fillStyle="#000";

      context.globalAlpha=.16*opacity;
      traceRoundedRect(
        context,
        cx-halfWidth-feather,
        cy-halfHeight-feather,
        (halfWidth+feather)*2,
        (halfHeight+feather)*2,
        corner+feather
      );
      context.fill();

      context.globalAlpha=opacity;
      traceRoundedRect(
        context,
        cx-halfWidth,
        cy-halfHeight,
        halfWidth*2,
        halfHeight*2,
        corner
      );
      context.fill();

      const stamp={canvas,cssWidth,cssHeight,halfWidth,halfHeight};
      squeegeeStampCache.set(key,stamp);
      return stamp;
    }

    function clearFogSqueegeeStamp(x, y, brush, radius, angle) {
      if(!isPointInPlayableGlass(x,y)) return false;

      const opacity=Math.max(.01,Math.min(1,Number(brush?.opacityPerStroke)||1));
      const stamp=getSqueegeeStamp(brush,radius);

      fogMaskCtx.save();
      fogMaskCtx.translate(x,y);
      fogMaskCtx.rotate(angle);
      fogMaskCtx.globalCompositeOperation="destination-out";
      fogMaskCtx.globalAlpha=1;
      fogMaskCtx.drawImage(
        stamp.canvas,
        -stamp.cssWidth/2,
        -stamp.cssHeight/2,
        stamp.cssWidth,
        stamp.cssHeight
      );
      fogMaskCtx.restore();

      fogVisualDirty=true;
      wipeGlassDropsInRotatedRect(x,y,stamp.halfWidth,stamp.halfHeight,angle);
      markFogRotatedRectGrid(x,y,stamp.halfWidth*.94,stamp.halfHeight*.94,angle,opacity);
      return true;
    }

    function traceDiamondPath(ctx, cx, cy, radius) {
      ctx.beginPath();
      ctx.moveTo(cx, cy-radius);
      ctx.lineTo(cx+radius, cy);
      ctx.lineTo(cx, cy+radius);
      ctx.lineTo(cx-radius, cy);
      ctx.closePath();
    }

    function pointInDiamond(px, py, cx, cy, radius) {
      const r=Math.max(1,radius);
      return Math.abs(px-cx)/r + Math.abs(py-cy)/r <= 1;
    }

    function markFogDiamondGrid(x, y, radius, opacity=1) {
      let marked=0;
      const amount=Math.max(.01,Math.min(1,Number(opacity)||1));
      const gx=Math.floor((x/W)*GRID_X), gy=Math.floor((y/H)*GRID_Y);
      const rx=Math.ceil((radius/W)*GRID_X)+1, ry=Math.ceil((radius/H)*GRID_Y)+1;
      for(let yy=gy-ry;yy<=gy+ry;yy++){
        for(let xx=gx-rx;xx<=gx+rx;xx++){
          if(xx<0||yy<0||xx>=GRID_X||yy>=GRID_Y) continue;
          const px=(xx+.5)/GRID_X*W, py=(yy+.5)/GRID_Y*H;
          const index=yy*GRID_X+xx;
          if(fogGrid[index]<0 || fogGrid[index]>=1 || !isPointInPlayableGlass(px,py)) continue;
          if(!pointInDiamond(px,py,x,y,radius)) continue;
          const previous=fogGrid[index];
          const next=Math.min(1,previous+amount);
          fogGrid[index]=next;
          fogClearedCells+=next-previous;
          marked+=next-previous;
        }
      }
      return marked;
    }

    function wipeGlassDropsInDiamond(x, y, radius) {
      for(const drop of glassDropsSystem.drops){
        if(!drop.alive) continue;
        const padding=Math.max(1,drop.r*.72);
        if(pointInDiamond(drop.x,drop.y,x,y,radius+padding)) drop.scheduleRespawn(3000);
      }
    }

    function clearFogDiamondStamp(x, y, brush, radius) {
      if(!isPointInPlayableGlass(x,y)) return false;
      const stamp=getBrushStamp(brush,radius);
      const opacity=Math.max(.01,Math.min(1,Number(brush?.opacityPerStroke)||1));
      fogMaskCtx.save();
      fogMaskCtx.globalCompositeOperation="destination-out";
      fogMaskCtx.globalAlpha=opacity;
      fogMaskCtx.drawImage(stamp.canvas,x-stamp.cssSize/2,y-stamp.cssSize/2,stamp.cssSize,stamp.cssSize);
      fogMaskCtx.restore();
      fogVisualDirty=true;
      wipeGlassDropsInDiamond(x,y,radius*.88);
      markFogDiamondGrid(x,y,radius*.72,opacity);
      return true;
    }

    function markFogFocusGrid(x, y, radius) {
      let marked=0;
      const coreRadius=radius*.44;
      const coreSq=coreRadius*coreRadius;
      const haloSq=radius*radius;
      const haloOpacity=.28;
      const gx=Math.floor((x/W)*GRID_X), gy=Math.floor((y/H)*GRID_Y);
      const rx=Math.ceil((radius/W)*GRID_X)+1, ry=Math.ceil((radius/H)*GRID_Y)+1;

      for(let yy=gy-ry;yy<=gy+ry;yy++) {
        for(let xx=gx-rx;xx<=gx+rx;xx++) {
          if(xx<0||yy<0||xx>=GRID_X||yy>=GRID_Y) continue;
          const px=(xx+.5)/GRID_X*W;
          const py=(yy+.5)/GRID_Y*H;
          const index=yy*GRID_X+xx;
          if(fogGrid[index]<0 || fogGrid[index]>=1 || !isPointInPlayableGlass(px,py)) continue;

          const dx=px-x, dy=py-y;
          const distSq=dx*dx+dy*dy;
          if(distSq>haloSq) continue;

          const previous=fogGrid[index];
          // O centro limpa completamente; o halo usa a mesma matemática de alpha
          // do canvas, evitando a barra avançar mais do que o visual realmente limpou.
          const next=distSq<=coreSq
            ? 1
            : 1-(1-previous)*(1-haloOpacity);
          fogGrid[index]=next;
          fogClearedCells+=next-previous;
          marked+=next-previous;
        }
      }
      return marked;
    }

    function wipeGlassDropsInFocus(x, y, radius) {
      // Só o núcleo realmente nítido remove gotas; o halo apenas suaviza a névoa.
      const coreRadius=radius*.50;
      for(const drop of glassDropsSystem.drops) {
        if(!drop.alive) continue;
        const hit=coreRadius+Math.max(1,drop.r*.72);
        const dx=drop.x-x, dy=drop.y-y;
        if(dx*dx+dy*dy<=hit*hit) drop.scheduleRespawn(3000);
      }
    }

    function clearFogFocusStamp(x, y, brush, radius) {
      if(!isPointInPlayableGlass(x,y)) return false;
      const stamp=getBrushStamp(brush,radius);

      fogMaskCtx.save();
      fogMaskCtx.globalCompositeOperation="destination-out";
      fogMaskCtx.globalAlpha=1;
      fogMaskCtx.drawImage(
        stamp.canvas,
        x-stamp.cssSize/2,
        y-stamp.cssSize/2,
        stamp.cssSize,
        stamp.cssSize
      );
      fogMaskCtx.restore();

      fogVisualDirty=true;
      wipeGlassDropsInFocus(x,y,radius);
      markFogFocusGrid(x,y,radius*.92);
      return true;
    }

    function markFogMistGrid(x, y, radius, opacity=.3) {
      let marked=0;
      const baseOpacity=Math.max(.01,Math.min(1,Number(opacity)||.3));
      const gx=Math.floor((x/W)*GRID_X), gy=Math.floor((y/H)*GRID_Y);
      const rx=Math.ceil((radius/W)*GRID_X)+1, ry=Math.ceil((radius/H)*GRID_Y)+1;
      const radiusSq=radius*radius;

      for(let yy=gy-ry;yy<=gy+ry;yy++) {
        for(let xx=gx-rx;xx<=gx+rx;xx++) {
          if(xx<0||yy<0||xx>=GRID_X||yy>=GRID_Y) continue;
          const px=(xx+.5)/GRID_X*W;
          const py=(yy+.5)/GRID_Y*H;
          const index=yy*GRID_X+xx;
          if(fogGrid[index]<0 || fogGrid[index]>=1 || !isPointInPlayableGlass(px,py)) continue;

          const dx=px-x, dy=py-y;
          const distSq=dx*dx+dy*dy;
          if(distSq>radiusSq) continue;

          const distance=Math.sqrt(distSq)/Math.max(1,radius);
          // Sem núcleo duro: a força cai suavemente do centro até desaparecer na borda.
          const falloff=Math.pow(Math.max(0,1-distance),.72);
          const localOpacity=baseOpacity*(.34+.66*falloff);

          const previous=fogGrid[index];
          // destination-out é multiplicativo; usa a mesma matemática no progresso.
          const next=1-(1-previous)*(1-localOpacity);
          fogGrid[index]=next;
          fogClearedCells+=next-previous;
          marked+=next-previous;
        }
      }
      return marked;
    }

    function clearFogMistStamp(x, y, brush, radius) {
      if(!isPointInPlayableGlass(x,y)) return false;
      const stamp=getBrushStamp(brush,radius);
      const opacity=Math.max(.01,Math.min(1,Number(brush?.opacityPerStroke)||.3));

      fogMaskCtx.save();
      fogMaskCtx.globalCompositeOperation="destination-out";
      fogMaskCtx.globalAlpha=opacity;
      fogMaskCtx.drawImage(
        stamp.canvas,
        x-stamp.cssSize/2,
        y-stamp.cssSize/2,
        stamp.cssSize,
        stamp.cssSize
      );
      fogMaskCtx.restore();

      fogVisualDirty=true;

      // A Névoa é propositalmente suave: remove gotas só na parte central da passada.
      glassDropsSystem.wipe(x,y,radius*.46);
      markFogMistGrid(x,y,radius*.88,opacity);
      return true;
    }

    function markFogVelvetGrid(x, y, radius, opacity=.6) {
      let marked=0;
      const amount=Math.max(.01,Math.min(1,Number(opacity)||.6));
      const gx=Math.floor((x/W)*GRID_X), gy=Math.floor((y/H)*GRID_Y);
      const rx=Math.ceil((radius/W)*GRID_X)+1, ry=Math.ceil((radius/H)*GRID_Y)+1;
      const radiusSq=radius*radius;

      for(let yy=gy-ry;yy<=gy+ry;yy++) {
        for(let xx=gx-rx;xx<=gx+rx;xx++) {
          if(xx<0||yy<0||xx>=GRID_X||yy>=GRID_Y) continue;
          const px=(xx+.5)/GRID_X*W, py=(yy+.5)/GRID_Y*H;
          const index=yy*GRID_X+xx;
          if(fogGrid[index]<0 || fogGrid[index]>=1 || !isPointInPlayableGlass(px,py)) continue;

          const dx=px-x, dy=py-y;
          const distSq=dx*dx+dy*dy;
          if(distSq>radiusSq) continue;

          const distance=Math.sqrt(distSq)/Math.max(1,radius);
          // Centro consistente, borda macia: sensação de pano de polimento.
          const falloff=Math.pow(Math.max(0,1-distance),.42);
          const localOpacity=amount*(.48+.52*falloff);
          const previous=fogGrid[index];
          const next=1-(1-previous)*(1-localOpacity);
          fogGrid[index]=next;
          fogClearedCells+=next-previous;
          marked+=next-previous;
        }
      }
      return marked;
    }

    function clearFogVelvetStamp(x, y, brush, radius) {
      if(!isPointInPlayableGlass(x,y)) return false;
      const stamp=getBrushStamp(brush,radius);
      const opacity=Math.max(.01,Math.min(1,Number(brush?.opacityPerStroke)||.6));

      fogMaskCtx.save();
      fogMaskCtx.globalCompositeOperation="destination-out";
      fogMaskCtx.globalAlpha=opacity;
      fogMaskCtx.drawImage(
        stamp.canvas,
        x-stamp.cssSize/2,
        y-stamp.cssSize/2,
        stamp.cssSize,
        stamp.cssSize
      );
      fogMaskCtx.restore();

      fogVisualDirty=true;
      glassDropsSystem.wipe(x,y,radius*.62);
      markFogVelvetGrid(x,y,radius*.90,opacity);
      return true;
    }

    const giantStampCache = new Map();

    function getGiantStamp(radius) {
      const safeRadius=Math.max(4,Number(radius)||4);
      const rx=Math.max(4,safeRadius*1.16);
      const ry=Math.max(4,safeRadius*.63);
      const key=`${safeRadius.toFixed(2)}:${DPR}`;
      if(giantStampCache.has(key)) return giantStampCache.get(key);

      const padding=4;
      const cssWidth=Math.ceil(rx*2+padding*2);
      const cssHeight=Math.ceil(ry*2+padding*2);
      const canvas=document.createElement("canvas");
      canvas.width=Math.ceil(cssWidth*DPR);
      canvas.height=Math.ceil(cssHeight*DPR);
      const context=canvas.getContext("2d");
      context.setTransform(DPR,0,0,DPR,0,0);
      const cx=cssWidth/2;
      const cy=cssHeight/2;

      context.fillStyle="#000";

      context.globalAlpha=.30;
      context.beginPath();
      context.ellipse(cx,cy,rx,ry,0,0,Math.PI*2);
      context.fill();

      context.globalAlpha=.52;
      context.beginPath();
      context.ellipse(cx,cy,rx*.88,ry*.84,0,0,Math.PI*2);
      context.fill();

      context.globalAlpha=1;
      context.beginPath();
      context.ellipse(cx,cy,rx*.68,ry*.68,0,0,Math.PI*2);
      context.fill();

      const stamp={canvas,cssWidth,cssHeight};
      giantStampCache.set(key,stamp);
      return stamp;
    }

    function markFogGiantGrid(x, y, radius) {
      let marked=0;
      const rx=Math.max(4,radius*1.16);
      const ry=Math.max(4,radius*.63);
      const gx=Math.floor((x/W)*GRID_X), gy=Math.floor((y/H)*GRID_Y);
      const gridRX=Math.ceil((rx/W)*GRID_X)+1;
      const gridRY=Math.ceil((ry/H)*GRID_Y)+1;

      for(let yy=gy-gridRY;yy<=gy+gridRY;yy++) {
        for(let xx=gx-gridRX;xx<=gx+gridRX;xx++) {
          if(xx<0||yy<0||xx>=GRID_X||yy>=GRID_Y) continue;
          const px=(xx+.5)/GRID_X*W, py=(yy+.5)/GRID_Y*H;
          const index=yy*GRID_X+xx;
          if(fogGrid[index]<0 || fogGrid[index]>=1 || !isPointInPlayableGlass(px,py)) continue;

          const nx=(px-x)/rx, ny=(py-y)/ry;
          const d=Math.sqrt(nx*nx+ny*ny);
          if(d>1) continue;

          // Núcleo totalmente limpo, borda macia para lembrar uma esponja grande.
          const localOpacity=d<=.68 ? 1 : Math.max(.08,1-(d-.68)/.32);
          const previous=fogGrid[index];
          const next=1-(1-previous)*(1-localOpacity);
          fogGrid[index]=next;
          fogClearedCells+=next-previous;
          marked+=next-previous;
        }
      }
      return marked;
    }

    function wipeGlassDropsInGiant(x, y, radius) {
      const rx=Math.max(4,radius*1.08);
      const ry=Math.max(4,radius*.56);
      for(const drop of glassDropsSystem.drops) {
        if(!drop.alive) continue;
        const pad=Math.max(1,drop.r*.72);
        const nx=(drop.x-x)/(rx+pad);
        const ny=(drop.y-y)/(ry+pad);
        if(nx*nx+ny*ny<=1) drop.scheduleRespawn(3000);
      }
    }

    function clearFogGiantStamp(x, y, brush, radius) {
      if(!isPointInPlayableGlass(x,y)) return false;
      const stamp=getGiantStamp(radius);

      fogMaskCtx.save();
      fogMaskCtx.globalCompositeOperation="destination-out";
      fogMaskCtx.globalAlpha=1;
      fogMaskCtx.drawImage(
        stamp.canvas,
        x-stamp.cssWidth/2,
        y-stamp.cssHeight/2,
        stamp.cssWidth,
        stamp.cssHeight
      );
      fogMaskCtx.restore();

      fogVisualDirty=true;
      wipeGlassDropsInGiant(x,y,radius);
      markFogGiantGrid(x,y,radius);
      return true;
    }

    const DREAM_LOBES = Object.freeze([
      { x: 0.00, y: 0.00, r: .44, a: .92 },
      { x:-.34, y:-.08, r: .31, a: .74 },
      { x: .31, y:-.14, r: .34, a: .78 },
      { x:-.16, y: .24, r: .29, a: .64 },
      { x: .23, y: .22, r: .28, a: .62 },
      { x: .02, y:-.31, r: .25, a: .58 }
    ]);
    const dreamStampCache = new Map();

    function getDreamStamp(radius) {
      const safeRadius=Math.max(2,Number(radius)||2);
      const key=`${safeRadius.toFixed(2)}:${DPR}`;
      if(dreamStampCache.has(key)) return dreamStampCache.get(key);

      const padding=4;
      const cssSize=Math.ceil(safeRadius*2+padding*2);
      const canvas=document.createElement("canvas");
      canvas.width=Math.ceil(cssSize*DPR);
      canvas.height=Math.ceil(cssSize*DPR);
      const context=canvas.getContext("2d");
      context.setTransform(DPR,0,0,DPR,0,0);
      const center=cssSize/2;

      // Mesma composição visual anterior, só pré-renderizada uma vez.
      for(const lobe of DREAM_LOBES) {
        const cx=center+lobe.x*safeRadius;
        const cy=center+lobe.y*safeRadius;
        const rr=Math.max(2,lobe.r*safeRadius);
        const g=context.createRadialGradient(cx,cy,0,cx,cy,rr);
        g.addColorStop(0,`rgba(0,0,0,${lobe.a})`);
        g.addColorStop(.42,`rgba(0,0,0,${lobe.a*.78})`);
        g.addColorStop(.76,`rgba(0,0,0,${lobe.a*.30})`);
        g.addColorStop(1,"rgba(0,0,0,0)");
        context.fillStyle=g;
        context.beginPath();
        context.arc(cx,cy,rr,0,Math.PI*2);
        context.fill();
      }

      const stamp={canvas,cssSize};
      dreamStampCache.set(key,stamp);
      return stamp;
    }

    function markFogDreamGrid(x, y, radius) {
      let marked=0;
      const reach=radius*.88;
      const gx=Math.floor((x/W)*GRID_X), gy=Math.floor((y/H)*GRID_Y);
      const rx=Math.ceil((reach/W)*GRID_X)+1;
      const ry=Math.ceil((reach/H)*GRID_Y)+1;

      for(let yy=gy-ry;yy<=gy+ry;yy++) {
        for(let xx=gx-rx;xx<=gx+rx;xx++) {
          if(xx<0||yy<0||xx>=GRID_X||yy>=GRID_Y) continue;
          const px=(xx+.5)/GRID_X*W, py=(yy+.5)/GRID_Y*H;
          const index=yy*GRID_X+xx;
          if(fogGrid[index]<0 || fogGrid[index]>=1 || !isPointInPlayableGlass(px,py)) continue;

          let combined=0;
          for(const lobe of DREAM_LOBES) {
            const cx=x+lobe.x*radius;
            const cy=y+lobe.y*radius;
            const rr=Math.max(2,lobe.r*radius);
            const dx=px-cx, dy=py-cy;
            const d=Math.sqrt(dx*dx+dy*dy)/rr;
            if(d>=1) continue;
            // Centro macio + borda bem suave, como uma pequena nuvem.
            const local=lobe.a*Math.pow(1-d,.62);
            combined=1-(1-combined)*(1-local);
          }

          if(combined<=.01) continue;
          const previous=fogGrid[index];
          const next=1-(1-previous)*(1-combined);
          fogGrid[index]=next;
          fogClearedCells+=next-previous;
          marked+=next-previous;
        }
      }
      return marked;
    }

    function wipeGlassDropsInDream(x, y, radius) {
      // Apenas os "puffs" mais densos removem gotas; as bordas continuam etéreas.
      for(const drop of glassDropsSystem.drops) {
        if(!drop.alive) continue;
        let hit=false;
        for(let i=0;i<3;i++) {
          const lobe=DREAM_LOBES[i];
          const cx=x+lobe.x*radius;
          const cy=y+lobe.y*radius;
          const rr=lobe.r*radius*.72+Math.max(1,drop.r*.72);
          const dx=drop.x-cx, dy=drop.y-cy;
          if(dx*dx+dy*dy<=rr*rr) {
            hit=true;
            break;
          }
        }
        if(hit) drop.scheduleRespawn(3000);
      }
    }

    function clearFogDreamStamp(x, y, brush, radius) {
      if(!isPointInPlayableGlass(x,y)) return false;
      const stamp=getDreamStamp(radius);

      fogMaskCtx.save();
      fogMaskCtx.globalCompositeOperation="destination-out";
      fogMaskCtx.globalAlpha=1;
      fogMaskCtx.drawImage(
        stamp.canvas,
        x-stamp.cssSize/2,
        y-stamp.cssSize/2,
        stamp.cssSize,
        stamp.cssSize
      );
      fogMaskCtx.restore();

      fogVisualDirty=true;
      wipeGlassDropsInDream(x,y,radius);
      markFogDreamGrid(x,y,radius);
      return true;
    }

    function getDreamScatterOffset(brush, amount) {
      const scatter=Math.max(0,Number(brush?.scatter)||0);
      if(!scatter) return {x:0,y:0};
      // Movimento contínuo em vez de saltos aleatórios: a nuvem "flutua" pela passada.
      const phase=amount*Math.PI*3.4;
      return {
        x:Math.sin(phase)*scatter*.42,
        y:Math.cos(phase*.83)*scatter*.30
      };
    }

    function markFogPreciseGrid(x, y, radius) {
      let marked=0;
      const outer=Math.max(3,radius);
      const inner=outer*.86;
      const outerSq=outer*outer;
      const innerSq=inner*inner;
      const gx=Math.floor((x/W)*GRID_X), gy=Math.floor((y/H)*GRID_Y);
      const rx=Math.ceil((outer/W)*GRID_X)+1;
      const ry=Math.ceil((outer/H)*GRID_Y)+1;

      for(let yy=gy-ry;yy<=gy+ry;yy++) {
        for(let xx=gx-rx;xx<=gx+rx;xx++) {
          if(xx<0||yy<0||xx>=GRID_X||yy>=GRID_Y) continue;
          const px=(xx+.5)/GRID_X*W, py=(yy+.5)/GRID_Y*H;
          const index=yy*GRID_X+xx;
          if(fogGrid[index]<0 || fogGrid[index]>=1 || !isPointInPlayableGlass(px,py)) continue;

          const dx=px-x, dy=py-y;
          const d2=dx*dx+dy*dy;
          if(d2>outerSq) continue;

          const previous=fogGrid[index];
          let localOpacity=1;
          if(d2>innerSq) {
            const d=Math.sqrt(d2);
            const t=Math.max(0,Math.min(1,(d-inner)/(outer-inner)));
            localOpacity=.30*(1-t);
          }
          const next=1-(1-previous)*(1-localOpacity);
          fogGrid[index]=next;
          fogClearedCells+=next-previous;
          marked+=next-previous;
        }
      }
      return marked;
    }

    function clearFogPreciseStamp(x, y, brush, radius) {
      if(!isPointInPlayableGlass(x,y)) return false;

      const outer=Math.max(3,radius);
      const inner=outer*.86;
      const stamp=getBrushStamp(brush,outer);

      fogMaskCtx.save();
      fogMaskCtx.globalCompositeOperation="destination-out";
      fogMaskCtx.globalAlpha=1;
      fogMaskCtx.drawImage(
        stamp.canvas,
        x-stamp.cssSize/2,
        y-stamp.cssSize/2,
        stamp.cssSize,
        stamp.cssSize
      );
      fogMaskCtx.restore();

      fogVisualDirty=true;
      glassDropsSystem.wipe(x,y,inner*.92);
      markFogPreciseGrid(x,y,outer);
      return true;
    }

    function markFogSoftGrid(x, y, radius) {
      let marked=0;
      const outer=Math.max(4,radius);
      const gx=Math.floor((x/W)*GRID_X), gy=Math.floor((y/H)*GRID_Y);
      const rx=Math.ceil((outer/W)*GRID_X)+1;
      const ry=Math.ceil((outer/H)*GRID_Y)+1;
      const outerSq=outer*outer;

      for(let yy=gy-ry;yy<=gy+ry;yy++) {
        for(let xx=gx-rx;xx<=gx+rx;xx++) {
          if(xx<0||yy<0||xx>=GRID_X||yy>=GRID_Y) continue;
          const px=(xx+.5)/GRID_X*W, py=(yy+.5)/GRID_Y*H;
          const index=yy*GRID_X+xx;
          if(fogGrid[index]<0 || fogGrid[index]>=1 || !isPointInPlayableGlass(px,py)) continue;

          const dx=px-x, dy=py-y;
          const d2=dx*dx+dy*dy;
          if(d2>outerSq) continue;

          const d=Math.sqrt(d2)/outer;
          // Núcleo confortável e cheio, com uma borda progressivamente mais macia.
          let localOpacity;
          if(d<=.58) localOpacity=1;
          else if(d<=.78) {
            const t=(d-.58)/.20;
            localOpacity=1-t*.38;
          } else {
            const t=(d-.78)/.22;
            localOpacity=.62*(1-t);
          }
          localOpacity=Math.max(0,Math.min(1,localOpacity));

          const previous=fogGrid[index];
          const next=1-(1-previous)*(1-localOpacity);
          fogGrid[index]=next;
          fogClearedCells+=next-previous;
          marked+=next-previous;
        }
      }
      return marked;
    }

    function clearFogSoftStamp(x, y, brush, radius) {
      if(!isPointInPlayableGlass(x,y)) return false;
      const stamp=getBrushStamp(brush,radius);

      fogMaskCtx.save();
      fogMaskCtx.globalCompositeOperation="destination-out";
      fogMaskCtx.globalAlpha=1;
      fogMaskCtx.drawImage(
        stamp.canvas,
        x-stamp.cssSize/2,
        y-stamp.cssSize/2,
        stamp.cssSize,
        stamp.cssSize
      );
      fogMaskCtx.restore();

      fogVisualDirty=true;

      // As gotas somem na parte realmente limpa; a franja externa continua só como suavização.
      glassDropsSystem.wipe(x,y,radius*.72);
      markFogSoftGrid(x,y,radius*.95);
      return true;
    }

    function clearFogStamp(x, y, brush, radius) {
      if(!isPointInPlayableGlass(x,y)) return false;
      const stamp=getBrushStamp(brush,radius);
      const opacity=Math.max(.01,Math.min(1,Number(brush?.opacityPerStroke) || 1));
      fogMaskCtx.save();
      fogMaskCtx.globalCompositeOperation = "destination-out";
      fogMaskCtx.globalAlpha = opacity;
      fogMaskCtx.drawImage(stamp.canvas,x-stamp.cssSize/2,y-stamp.cssSize/2,stamp.cssSize,stamp.cssSize);
      fogMaskCtx.restore();
      // A máscara é a única fonte da transparência da névoa.
      // opacityPerStroke permite estilos que exigem mais de uma passada.
      fogVisualDirty=true;

      glassDropsSystem.wipe(x, y, radius * .82);
      markFogGrid(x, y, radius * .72, opacity);
      return true;
    }

    function getBrushStamp(brush, radius) {
      const hardness=Math.max(.02,Math.min(.98,Number(brush?.hardness) || .5));
      const texture=getBrushTextureProfile(brush);
      const textureName=brush?.texture || "smooth";
      const shape=brush?.shape || "circle";
      const key=`${shape}:${radius.toFixed(2)}:${hardness}:${textureName}:${DPR}`;
      if(brushStampCache.has(key)) return brushStampCache.get(key);
      const padding=3;
      const cssSize=Math.ceil(radius*2+padding*2);
      const canvas=document.createElement("canvas");
      canvas.width=Math.ceil(cssSize*DPR);
      canvas.height=Math.ceil(cssSize*DPR);
      const context=canvas.getContext("2d");
      context.setTransform(DPR,0,0,DPR,0,0);
      const center=cssSize/2;

      // hardness alto = borda mais definida; baixo = transição ampla/suave.
      const coreRadius=radius*(.18+hardness*.46);
      const midStop=Math.min(.96,.58+hardness*.30);
      const edgeStop=Math.min(.985,.86+hardness*.11);
      const gradient=context.createRadialGradient(center,center,Math.max(1,coreRadius*.18),center,center,radius);
      gradient.addColorStop(0,`rgba(0,0,0,${texture.core})`);
      gradient.addColorStop(Math.max(.08,coreRadius/radius),`rgba(0,0,0,${Math.min(1,texture.core*.98)})`);
      gradient.addColorStop(midStop,`rgba(0,0,0,${texture.mid})`);
      gradient.addColorStop(edgeStop,`rgba(0,0,0,${texture.edge})`);
      gradient.addColorStop(1,"rgba(0,0,0,0)");

      if(shape === "precise") {
        // Preciso: mesma borda de 30% + núcleo de 86%, pré-renderizados uma única vez.
        context.fillStyle="#000";
        context.globalAlpha=.30;
        context.beginPath();
        context.arc(center,center,radius,0,Math.PI*2);
        context.fill();

        context.globalAlpha=1;
        context.beginPath();
        context.arc(center,center,radius*.86,0,Math.PI*2);
        context.fill();
      } else if(shape === "soft") {
        // Suave: o estilo base do jogo — redondo, confortável e sem borda brusca.
        const softGradient=context.createRadialGradient(center,center,0,center,center,radius);
        softGradient.addColorStop(0,"rgba(0,0,0,1)");
        softGradient.addColorStop(.52,"rgba(0,0,0,1)");
        softGradient.addColorStop(.72,"rgba(0,0,0,.82)");
        softGradient.addColorStop(.88,"rgba(0,0,0,.30)");
        softGradient.addColorStop(1,"rgba(0,0,0,0)");
        context.fillStyle=softGradient;
        context.fillRect(0,0,cssSize,cssSize);
      } else if(shape === "focus") {
        // Foco: pequeno núcleo 100% limpo e halo que perde força gradualmente.
        const focusGradient=context.createRadialGradient(center,center,0,center,center,radius);
        focusGradient.addColorStop(0,"rgba(0,0,0,1)");
        focusGradient.addColorStop(.40,"rgba(0,0,0,1)");
        focusGradient.addColorStop(.43,"rgba(0,0,0,.32)");
        focusGradient.addColorStop(.68,"rgba(0,0,0,.18)");
        focusGradient.addColorStop(.88,"rgba(0,0,0,.055)");
        focusGradient.addColorStop(1,"rgba(0,0,0,0)");
        context.fillStyle=focusGradient;
        context.fillRect(0,0,cssSize,cssSize);
      } else if(shape === "mist") {
        // Névoa: área ampla, sem miolo duro e com desaparecimento muito gradual.
        const mistGradient=context.createRadialGradient(
          center-radius*.10,
          center-radius*.08,
          radius*.05,
          center,
          center,
          radius
        );
        mistGradient.addColorStop(0,"rgba(0,0,0,.82)");
        mistGradient.addColorStop(.28,"rgba(0,0,0,.72)");
        mistGradient.addColorStop(.58,"rgba(0,0,0,.42)");
        mistGradient.addColorStop(.82,"rgba(0,0,0,.14)");
        mistGradient.addColorStop(1,"rgba(0,0,0,0)");
        context.fillStyle=mistGradient;
        context.fillRect(0,0,cssSize,cssSize);
      } else if(shape === "velvet") {
        // Veludo: polimento cheio e uniforme, mas sem uma borda dura.
        const velvetGradient=context.createRadialGradient(
          center-radius*.08,center-radius*.08,radius*.06,
          center,center,radius
        );
        velvetGradient.addColorStop(0,"rgba(0,0,0,.98)");
        velvetGradient.addColorStop(.46,"rgba(0,0,0,.94)");
        velvetGradient.addColorStop(.72,"rgba(0,0,0,.68)");
        velvetGradient.addColorStop(.90,"rgba(0,0,0,.22)");
        velvetGradient.addColorStop(1,"rgba(0,0,0,0)");
        context.fillStyle=velvetGradient;
        context.fillRect(0,0,cssSize,cssSize);

        // Microfibras determinísticas e discretas; não usam Math.random para o cache ser estável.
        context.save();
        context.globalCompositeOperation="source-over";
        context.strokeStyle="rgba(0,0,0,.14)";
        context.lineWidth=Math.max(.7,radius*.018);
        for(let i=0;i<9;i++) {
          const angle=(i/9)*Math.PI*2+.35;
          const inner=radius*(.20+(i%3)*.07);
          const outer=radius*(.54+(i%2)*.10);
          context.beginPath();
          context.moveTo(center+Math.cos(angle)*inner,center+Math.sin(angle)*inner);
          context.lineTo(center+Math.cos(angle+.22)*outer,center+Math.sin(angle+.22)*outer);
          context.stroke();
        }
        context.restore();
      } else {
        context.fillStyle=gradient;
      }

      if(shape === "diamond") {
        traceDiamondPath(context,center,center,radius);
        context.fill();
        context.save();
        context.globalAlpha=.20;
        context.fillStyle="#000";
        traceDiamondPath(context,center,center,radius*.54);
        context.fill();
        context.restore();
      } else if(shape !== "precise" && shape !== "soft" && shape !== "focus" && shape !== "mist" && shape !== "velvet") {
        context.fillRect(0,0,cssSize,cssSize);
      }

      // Texturas são sutis para não transformar a limpeza em um efeito visual pesado.
      if(textureName === "feather" || textureName === "cloud") {
        context.save();
        context.globalCompositeOperation="destination-out";
        context.globalAlpha=textureName === "feather" ? .08 : .055;
        context.translate(center,center);
        const rays=textureName === "feather" ? 7 : 5;
        for(let i=0;i<rays;i++){
          context.rotate(Math.PI*2/rays);
          context.beginPath();
          context.ellipse(radius*.28,0,radius*.20,radius*.055,0,0,Math.PI*2);
          context.fillStyle="#000";
          context.fill();
        }
        context.restore();
      }

      const stamp={canvas,cssSize};
      brushStampCache.set(key,stamp);
      return stamp;
    }

    const FEATHER_OFFSETS = Object.freeze([-1,-.58,-.22,.22,.58,1]);

    function getFeatherStrands(fromX, fromY, toX, toY, radius, scatter=0) {
      const dx=toX-fromX, dy=toY-fromY;
      const distance=Math.hypot(dx,dy);
      const ux=distance>.001 ? dx/distance : 1;
      const uy=distance>.001 ? dy/distance : 0;
      const px=-uy, py=ux;
      const scatterAmount=Math.max(0,Number(scatter)||0);

      // O scatter da Pluma abre o leque de forma contínua, sem saltos aleatórios.
      // Assim o valor 18 da configuração realmente participa do efeito.
      const spread=Math.max(5,radius*.34+scatterAmount*.22);

      return FEATHER_OFFSETS.map((factor,index)=>{
        const startOffset=factor*spread*.56;
        const endOffset=factor*spread;
        const tipShift=(index%2===0 ? -.05 : .05)*radius + factor*scatterAmount*.08;
        return {
          ax:fromX+px*startOffset,
          ay:fromY+py*startOffset,
          bx:toX+px*endOffset+ux*tipShift,
          by:toY+py*endOffset+uy*tipShift
        };
      });
    }

    function markFogFeatherGrid(strands, radius) {
      let marked=0;
      const reach=Math.max(2,radius*.075);
      const reachSq=reach*reach;
      let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
      for(const s of strands) {
        minX=Math.min(minX,s.ax,s.bx); maxX=Math.max(maxX,s.ax,s.bx);
        minY=Math.min(minY,s.ay,s.by); maxY=Math.max(maxY,s.ay,s.by);
      }
      const startGX=Math.max(0,Math.floor(((minX-reach)/W)*GRID_X)-1);
      const endGX=Math.min(GRID_X-1,Math.ceil(((maxX+reach)/W)*GRID_X)+1);
      const startGY=Math.max(0,Math.floor(((minY-reach)/H)*GRID_Y)-1);
      const endGY=Math.min(GRID_Y-1,Math.ceil(((maxY+reach)/H)*GRID_Y)+1);

      for(let gy=startGY;gy<=endGY;gy++) {
        for(let gx=startGX;gx<=endGX;gx++) {
          const index=gy*GRID_X+gx;
          if(fogGrid[index]<0 || fogGrid[index]>=1) continue;
          const x=(gx+.5)/GRID_X*W, y=(gy+.5)/GRID_Y*H;
          if(!isPointInPlayableGlass(x,y)) continue;
          if(!strands.some(s=>pointSegmentDistanceSq(x,y,s.ax,s.ay,s.bx,s.by)<=reachSq)) continue;
          const previous=fogGrid[index];
          fogGrid[index]=1;
          fogClearedCells+=1-previous;
          marked+=1-previous;
        }
      }
      return marked;
    }

    function clearFogFeatherLine(fromX, fromY, toX, toY, brush, radius) {
      const strands=getFeatherStrands(fromX,fromY,toX,toY,radius,brush?.scatter);
      const lineWidth=Math.max(2.2,radius*.115);

      fogMaskCtx.save();
      fogMaskCtx.globalCompositeOperation="destination-out";
      fogMaskCtx.strokeStyle="#000";
      fogMaskCtx.lineCap="round";
      fogMaskCtx.lineJoin="round";
      strands.forEach((s,index)=>{
        fogMaskCtx.globalAlpha=index===0||index===strands.length-1 ? .58 : .82;
        fogMaskCtx.lineWidth=lineWidth*(index%2 ? .82 : 1);
        fogMaskCtx.beginPath();
        fogMaskCtx.moveTo(s.ax,s.ay);
        fogMaskCtx.lineTo(s.bx,s.by);
        fogMaskCtx.stroke();
      });
      fogMaskCtx.restore();

      fogVisualDirty=true;
      markFogFeatherGrid(strands,radius);
      for(const drop of glassDropsSystem.drops) {
        if(!drop.alive) continue;
        const hit=lineWidth*.75+Math.max(1,drop.r*.72);
        const hitSq=hit*hit;
        if(strands.some(s=>pointSegmentDistanceSq(drop.x,drop.y,s.ax,s.ay,s.bx,s.by)<=hitSq)) {
          drop.scheduleRespawn(3000);
        }
      }
      return true;
    }

    function markFogSharpGrid(fromX, fromY, toX, toY, radius) {
      let marked=0;
      const reach=Math.max(3,radius*.34);
      const reachSq=reach*reach;
      const minX=Math.min(fromX,toX)-reach;
      const maxX=Math.max(fromX,toX)+reach;
      const minY=Math.min(fromY,toY)-reach;
      const maxY=Math.max(fromY,toY)+reach;
      const startGX=Math.max(0,Math.floor((minX/W)*GRID_X)-1);
      const endGX=Math.min(GRID_X-1,Math.ceil((maxX/W)*GRID_X)+1);
      const startGY=Math.max(0,Math.floor((minY/H)*GRID_Y)-1);
      const endGY=Math.min(GRID_Y-1,Math.ceil((maxY/H)*GRID_Y)+1);

      for(let gy=startGY;gy<=endGY;gy++) {
        for(let gx=startGX;gx<=endGX;gx++) {
          const index=gy*GRID_X+gx;
          if(fogGrid[index]<0 || fogGrid[index]>=1) continue;
          const px=(gx+.5)/GRID_X*W;
          const py=(gy+.5)/GRID_Y*H;
          if(!isPointInPlayableGlass(px,py)) continue;
          if(pointSegmentDistanceSq(px,py,fromX,fromY,toX,toY)>reachSq) continue;

          const previous=fogGrid[index];
          fogGrid[index]=1;
          fogClearedCells+=1-previous;
          marked+=1-previous;
        }
      }
      return marked;
    }

    function wipeGlassDropsAlongSharp(fromX, fromY, toX, toY, radius) {
      const reach=Math.max(3,radius*.38);
      for(const drop of glassDropsSystem.drops) {
        if(!drop.alive) continue;
        const hit=reach+Math.max(1,drop.r*.72);
        if(pointSegmentDistanceSq(drop.x,drop.y,fromX,fromY,toX,toY)<=hit*hit) {
          drop.scheduleRespawn(3000);
        }
      }
    }

    function clearFogSharpLine(fromX, fromY, toX, toY, brush, radius) {
      const lineWidth=Math.max(6,radius*.68);

      fogMaskCtx.save();
      fogMaskCtx.globalCompositeOperation="destination-out";
      fogMaskCtx.globalAlpha=1;
      fogMaskCtx.strokeStyle="#000";
      fogMaskCtx.fillStyle="#000";
      fogMaskCtx.lineCap="round";
      fogMaskCtx.lineJoin="round";
      fogMaskCtx.lineWidth=lineWidth;

      const distance=Math.hypot(toX-fromX,toY-fromY);
      if(distance<.5) {
        fogMaskCtx.beginPath();
        fogMaskCtx.arc(toX,toY,lineWidth*.5,0,Math.PI*2);
        fogMaskCtx.fill();
      } else {
        fogMaskCtx.beginPath();
        fogMaskCtx.moveTo(fromX,fromY);
        fogMaskCtx.lineTo(toX,toY);
        fogMaskCtx.stroke();
      }
      fogMaskCtx.restore();

      fogVisualDirty=true;
      wipeGlassDropsAlongSharp(fromX,fromY,toX,toY,radius);
      markFogSharpGrid(fromX,fromY,toX,toY,radius);
      return true;
    }

    function pointSegmentDistanceSq(px, py, ax, ay, bx, by) {
      const vx=bx-ax, vy=by-ay;
      const lenSq=vx*vx+vy*vy;
      if(lenSq<=1e-8) {
        const dx=px-ax, dy=py-ay;
        return dx*dx+dy*dy;
      }
      const t=Math.max(0,Math.min(1,((px-ax)*vx+(py-ay)*vy)/lenSq));
      const qx=ax+vx*t, qy=ay+vy*t;
      const dx=px-qx, dy=py-qy;
      return dx*dx+dy*dy;
    }

    function markFogNeedleGrid(fromX, fromY, toX, toY, radius, opacity=1) {
      let marked=0;
      const amount=Math.max(.01,Math.min(1,Number(opacity)||1));
      const reach=Math.max(2,radius);
      const minX=Math.min(fromX,toX)-reach;
      const maxX=Math.max(fromX,toX)+reach;
      const minY=Math.min(fromY,toY)-reach;
      const maxY=Math.max(fromY,toY)+reach;
      const startGX=Math.max(0,Math.floor((minX/W)*GRID_X)-1);
      const endGX=Math.min(GRID_X-1,Math.ceil((maxX/W)*GRID_X)+1);
      const startGY=Math.max(0,Math.floor((minY/H)*GRID_Y)-1);
      const endGY=Math.min(GRID_Y-1,Math.ceil((maxY/H)*GRID_Y)+1);
      const radiusSq=reach*reach;

      for(let gy=startGY;gy<=endGY;gy++) {
        for(let gx=startGX;gx<=endGX;gx++) {
          const index=gy*GRID_X+gx;
          if(fogGrid[index]<0 || fogGrid[index]>=1) continue;
          const px=(gx+.5)/GRID_X*W;
          const py=(gy+.5)/GRID_Y*H;
          if(!isPointInPlayableGlass(px,py)) continue;
          if(pointSegmentDistanceSq(px,py,fromX,fromY,toX,toY)>radiusSq) continue;

          const previous=fogGrid[index];
          const next=Math.min(1,previous+amount);
          fogGrid[index]=next;
          fogClearedCells+=next-previous;
          marked+=next-previous;
        }
      }
      return marked;
    }

    function wipeGlassDropsAlongNeedle(fromX, fromY, toX, toY, radius) {
      const radiusSq=radius*radius;
      for(const drop of glassDropsSystem.drops) {
        if(!drop.alive) continue;
        const hit=radius+Math.max(1,drop.r*.72);
        if(pointSegmentDistanceSq(drop.x,drop.y,fromX,fromY,toX,toY)<=hit*hit) {
          drop.scheduleRespawn(3000);
        }
      }
    }

    function clearFogNeedleLine(fromX, fromY, toX, toY, brush, radius) {
      const opacity=Math.max(.01,Math.min(1,Number(brush?.opacityPerStroke)||1));
      const lineWidth=Math.max(3.2,radius*.42);
      const logicalRadius=Math.max(lineWidth*.95,radius*.46);

      fogMaskCtx.save();
      fogMaskCtx.globalCompositeOperation="destination-out";
      fogMaskCtx.globalAlpha=opacity;
      fogMaskCtx.strokeStyle="#000";
      fogMaskCtx.fillStyle="#000";
      fogMaskCtx.lineCap="round";
      fogMaskCtx.lineJoin="round";
      fogMaskCtx.lineWidth=lineWidth;

      const distance=Math.hypot(toX-fromX,toY-fromY);
      if(distance<.5) {
        fogMaskCtx.beginPath();
        fogMaskCtx.arc(toX,toY,lineWidth*.5,0,Math.PI*2);
        fogMaskCtx.fill();
      } else {
        fogMaskCtx.beginPath();
        fogMaskCtx.moveTo(fromX,fromY);
        fogMaskCtx.lineTo(toX,toY);
        fogMaskCtx.stroke();
      }
      fogMaskCtx.restore();

      fogVisualDirty=true;
      wipeGlassDropsAlongNeedle(fromX,fromY,toX,toY,logicalRadius);
      markFogNeedleGrid(fromX,fromY,toX,toY,logicalRadius,opacity);
      return true;
    }

    function clearFogLine(fromX, fromY, toX, toY, brush) {
      if (!state.hasInteracted) {
        state.hasInteracted = true;
        document.getElementById("instruction").classList.add("hidden-text");
      }
      const scale = Math.max(.82, Math.min(1.18, Math.min(W, H) / 390));
      // Núcleo visual 16% menor: a limpeza parece feita pelo dedo, sem abrir
      // grandes recortes verticais sobre a ilustração.
      const radius = brush.radius * scale * .84;
      const distance = Math.hypot(toX - fromX, toY - fromY);
      const opacity=Math.max(.01,Math.min(1,Number(brush?.opacityPerStroke) || 1));
      const isSqueegee=brush?.shape === "squeegee";
      const isDiamond=brush?.shape === "diamond";
      const isNeedle=brush?.shape === "needle";
      const isSharp=brush?.shape === "sharp";
      const isPrecise=brush?.shape === "precise";
      const isSoft=brush?.shape === "soft";
      const isFocus=brush?.shape === "focus";
      const isMist=brush?.shape === "mist";
      const isFeather=brush?.shape === "feather";
      const isVelvet=brush?.shape === "velvet";
      const isGiant=brush?.shape === "giant";
      const isDream=brush?.shape === "dream";

      // Agulha, Nítido e Pluma usam geometrias contínuas, não sequências de círculos.
      if(isNeedle || isSharp || isFeather) {
        if(isNeedle) clearFogNeedleLine(fromX,fromY,toX,toY,brush,radius);
        else if(isSharp) clearFogSharpLine(fromX,fromY,toX,toY,brush,radius);
        else clearFogFeatherLine(fromX,fromY,toX,toY,brush,radius);
        const now=performance.now();
        state.cleanStreak=now-state.lastWipe<350 ? state.cleanStreak+1 : 1;
        state.lastWipe=now;
        updateProgress();
        return;
      }

      const spacing = Math.max(
        4,
        radius * (
          isSqueegee ? .18 :
          isDiamond ? .78 :
          isFocus ? .30 :
          isMist ? .34 :
          isVelvet ? .28 :
          isGiant ? .24 :
          isDream ? .31 :
          isPrecise ? .22 :
          isSoft ? .24 :
          (opacity < 1 ? .46 : .22)
        )
      );
      const steps = Math.max(1, Math.ceil(distance / spacing));

      // O Rodo mantém uma orientação estável. Isso evita que várias lâminas
      // rotacionadas se empilhem nas curvas e formem aqueles rastros gigantes em S/C.
      const squeegeeAngle=0;

      for (let i = 1; i <= steps; i++) {
        const amount = i / steps;
        const scatter=isDream
          ? getDreamScatterOffset(brush,amount)
          : getBrushScatterOffset(brush);
        const x=fromX + (toX - fromX) * amount + scatter.x;
        const y=fromY + (toY - fromY) * amount + scatter.y;
        if(isSqueegee) clearFogSqueegeeStamp(x,y,brush,radius,squeegeeAngle);
        else if(isDiamond) clearFogDiamondStamp(x,y,brush,radius);
        else if(isFocus) clearFogFocusStamp(x,y,brush,radius);
        else if(isMist) clearFogMistStamp(x,y,brush,radius);
        else if(isVelvet) clearFogVelvetStamp(x,y,brush,radius);
        else if(isGiant) clearFogGiantStamp(x,y,brush,radius);
        else if(isDream) clearFogDreamStamp(x,y,brush,radius);
        else if(isPrecise) clearFogPreciseStamp(x,y,brush,radius);
        else if(isSoft) clearFogSoftStamp(x,y,brush,radius);
        else clearFogStamp(x,y,brush,radius);
      }
      const now = performance.now();
      state.cleanStreak = now - state.lastWipe < 350 ? state.cleanStreak + 1 : 1;
      state.lastWipe = now;

      updateProgress();
    }

    // =========================================================
    // PARABRISA SECRETO — VARREDURA AUTOMÁTICA ENQUANTO SEGURA
    // Dois arcos elípticos varrem juntos pelo mesmo lado:
    // -90° (esquerda) -> +90° (direita) -> -90° ... até o dedo ser solto.
    // =========================================================
    const WINDSHIELD_SWEEP_LIMIT = Math.PI / 2;
    const WINDSHIELD_SWEEP_SPEED = Math.PI * .84; // ~151°/s
    const windshieldWiperState = {
      active:false,
      angle:0,
      direction:1
    };

    function hasActiveWindshieldPointer() {
      for (const pointer of state.activePointers.values()) {
        if(pointer?.key === WINDSHIELD_BRUSH_KEY) return true;
      }
      return false;
    }

    function getActiveWindshieldPointer() {
      for (const pointer of state.activePointers.values()) {
        if(pointer?.key === WINDSHIELD_BRUSH_KEY) return pointer;
      }
      return null;
    }

    function getWindshieldArcs(angle) {
      const pointer = getActiveWindshieldPointer();
      const centerX = pointer?.x ?? W * .50;
      const centerY = pointer?.y ?? H * .82;
      const pivotOffset = W * .105;
      const radius = Math.hypot(W, H) * .085;
      const span = Math.PI / 18; // pequeno trecho de arco (~10°)

      return [-pivotOffset, pivotOffset].map(offsetX => ({
        cx:centerX + offsetX,
        cy:centerY,
        rx:radius,
        ry:radius * .70,
        rotation:0,
        start:angle - span * .5,
        end:angle + span * .5
      }));
    }

    function sampleWindshieldArcPoints(arc, samples=7) {
      const points=[];
      const cosR=Math.cos(arc.rotation || 0);
      const sinR=Math.sin(arc.rotation || 0);
      for(let i=0;i<samples;i++) {
        const t=samples<=1 ? .5 : i/(samples-1);
        const a=arc.start+(arc.end-arc.start)*t;
        const ex=Math.cos(a)*arc.rx;
        const ey=Math.sin(a)*arc.ry;
        points.push({
          x:arc.cx+ex*cosR-ey*sinR,
          y:arc.cy+ex*sinR+ey*cosR
        });
      }
      return points;
    }

    function eraseWindshieldFogAtAngle(angle) {
      const brush = brushes[WINDSHIELD_BRUSH_KEY];
      const scale = Math.max(.82, Math.min(1.18, Math.min(W, H) / 390));
      const bladeWidth = Math.max(18, Math.min(30, brush.radius * scale * .60));
      const arcs = getWindshieldArcs(angle);

      // shape:'arc': o Parabrisa agora apaga a névoa com ctx.ellipse em arco.
      // A varredura automática aprovada continua igual; muda apenas a geometria.
      fogMaskCtx.save();
      fogMaskCtx.globalCompositeOperation = "destination-out";
      fogMaskCtx.lineCap = "round";
      fogMaskCtx.strokeStyle = "#000";
      for(const arc of arcs) {
        fogMaskCtx.globalAlpha = .18;
        fogMaskCtx.lineWidth = bladeWidth * 1.75;
        fogMaskCtx.beginPath();
        fogMaskCtx.ellipse(arc.cx,arc.cy,arc.rx,arc.ry,arc.rotation,arc.start,arc.end);
        fogMaskCtx.stroke();

        fogMaskCtx.globalAlpha = brush.opacityPerStroke;
        fogMaskCtx.lineWidth = bladeWidth;
        fogMaskCtx.beginPath();
        fogMaskCtx.ellipse(arc.cx,arc.cy,arc.rx,arc.ry,arc.rotation,arc.start,arc.end);
        fogMaskCtx.stroke();
      }
      fogMaskCtx.restore();
      fogVisualDirty = true;

      const arcPoints=arcs.flatMap(arc=>sampleWindshieldArcPoints(arc,8));
      const gridRadius = bladeWidth * .78;
      const gridRadiusSq = gridRadius * gridRadius;

      // Mantém o progresso lógico alinhado com a área realmente varrida.
      for(let gy=0; gy<GRID_Y; gy++) {
        for(let gx=0; gx<GRID_X; gx++) {
          const index = gy * GRID_X + gx;
          if(fogGrid[index] < 0 || fogGrid[index] >= 1) continue;
          const px = (gx + .5) / GRID_X * W;
          const py = (gy + .5) / GRID_Y * H;
          if(!isPointInPlayableGlass(px, py)) continue;
          if(arcPoints.some(point => {
            const dx=px-point.x, dy=py-point.y;
            return dx*dx+dy*dy <= gridRadiusSq;
          })) {
            const previous=fogGrid[index];
            fogGrid[index]=1;
            fogClearedCells+=1-previous;
          }
        }
      }

      // As gotas do vidro também saem quando o arco passa por cima.
      const dropRadiusSq = (bladeWidth * .90) ** 2;
      for(const drop of glassDropsSystem.drops) {
        if(!drop.alive) continue;
        if(arcPoints.some(point => {
          const dx=drop.x-point.x, dy=drop.y-point.y;
          return dx*dx+dy*dy <= dropRadiusSq;
        })) {
          drop.scheduleRespawn(3000);
        }
      }
    }

    function startWindshieldWiper() {
      windshieldWiperState.active = true;
      windshieldWiperState.angle = -WINDSHIELD_SWEEP_LIMIT;
      windshieldWiperState.direction = 1;
      if(!state.hasInteracted) {
        state.hasInteracted = true;
        document.getElementById("instruction").classList.add("hidden-text");
      }
      eraseWindshieldFogAtAngle(windshieldWiperState.angle);
      updateProgress();
    }

    function updateWindshieldWiper(dt) {
      const shouldRun = hasActiveWindshieldPointer();
      if(!shouldRun) {
        windshieldWiperState.active = false;
        return;
      }
      if(!windshieldWiperState.active) startWindshieldWiper();

      let remaining = WINDSHIELD_SWEEP_SPEED * Math.max(0, Math.min(.10, dt));
      while(remaining > 1e-6) {
        const boundary = windshieldWiperState.direction > 0
          ? WINDSHIELD_SWEEP_LIMIT
          : -WINDSHIELD_SWEEP_LIMIT;
        const distanceToBoundary = Math.abs(boundary - windshieldWiperState.angle);
        const travel = Math.min(remaining, distanceToBoundary);
        const target = windshieldWiperState.angle + windshieldWiperState.direction * travel;

        // Subdivide a rotação para não deixar faixas sem limpar na ponta da lâmina,
        // inclusive em aparelhos rodando a 30 FPS.
        const angularDistance = Math.abs(target - windshieldWiperState.angle);
        const steps = Math.max(1, Math.ceil(angularDistance / (Math.PI / 90))); // <= 2°
        const from = windshieldWiperState.angle;
        for(let i=1; i<=steps; i++) {
          eraseWindshieldFogAtAngle(from + (target - from) * (i / steps));
        }

        windshieldWiperState.angle = target;
        remaining -= travel;

        if(distanceToBoundary <= travel + 1e-6) {
          windshieldWiperState.direction *= -1;
        } else {
          break;
        }
      }

      updateProgress();
    }

    function markFogGrid(x, y, radius, opacity=1) {
      let marked=0;
      const amount=Math.max(.01,Math.min(1,Number(opacity)||1));
      const gx = Math.floor((x / W) * GRID_X); const gy = Math.floor((y / H) * GRID_Y);
      const rx = Math.ceil((radius / W) * GRID_X) + 1; const ry = Math.ceil((radius / H) * GRID_Y) + 1;
      for (let yy = gy - ry; yy <= gy + ry; yy++) {
        for (let xx = gx - rx; xx <= gx + rx; xx++) {
          if (xx < 0 || yy < 0 || xx >= GRID_X || yy >= GRID_Y) continue;
          const px = (xx + .5) / GRID_X * W; const py = (yy + .5) / GRID_Y * H;
          const index = yy * GRID_X + xx;
          if (fogGrid[index] >= 0 && fogGrid[index] < 1 && Math.hypot(px - x, py - y) <= radius) {
            const previous=fogGrid[index];
            const next=Math.min(1,previous+amount);
            fogGrid[index]=next;
            fogClearedCells+=next-previous;
            marked+=next-previous;
          }
        }
      }
      return marked;
    }

    function updateProgress() {
      state.fogProgress = fogClearedCells / Math.max(1, fogPlayableCells);
      // Campanha normal: 98%. Fases de carro: 100% do vidro REAL,
      // já que a máscara exclui porta, moldura e retrovisor.
      const target = getCompletionTarget();
      document.getElementById("progressFill").style.width = `${Math.min(1, state.fogProgress / target) * 100}%`;
      const canFinish = state.fogProgress + 1e-9 >= target && state.started && !state.paused && !state.isZen;
      if (canFinish && state.activePointers.size === 0) completePhase();
    }

    function getPointerBrushKey(pointerId) {
      if (state.pointerBrushes.has(pointerId)) return state.pointerBrushes.get(pointerId);
      const index = state.activePointers.size;
      let key;
      if (index === 0) key = state.brush1;
      else if (index === 1) key = state.brush2;
      else {
        const extras = Object.keys(brushes).filter(k =>
          k !== state.brush1 &&
          k !== state.brush2 &&
          (k !== WINDSHIELD_BRUSH_KEY || state.windshieldUnlocked)
        );
        key = extras[(index - 2) % extras.length] || "soft";
      }
      state.pointerBrushes.set(pointerId, key);
      return key;
    }

    // #endregion
    // #region 12 — INPUT / PONTEIROS / ÁUDIO
    function handlePointerDown(e) {
      if(!state.started || state.paused) return;

      const key = getPointerBrushKey(e.pointerId);
      const windshieldTouch = key === WINDSHIELD_BRUSH_KEY;

      // O Parabrisa é um gatilho de "toque e segure", então pode ser ativado
      // em qualquer ponto da tela. Os outros estilos preservam a máscara real.
      if(!windshieldTouch && !isPointInPlayableGlass(e.clientX,e.clientY)) {
        state.pointerBrushes.delete(e.pointerId);
        return;
      }

      e.preventDefault();
      initAudio();
      fogCanvas.setPointerCapture?.(e.pointerId);

      // Primeiro toque no Zen: trava a regeneração e inicia o delay de 2s.
      if(state.isZen && state.zenAutoFog && state.activePointers.size === 0) {
        onTouchStart();
        zenFogRegenAccumulator = 0.0;
      }

      const windshieldWasActive = hasActiveWindshieldPointer();
      state.activePointers.set(e.pointerId, {x:e.clientX, y:e.clientY, key});

      if(windshieldTouch) {
        if(!windshieldWasActive) startWindshieldWiper();
      } else {
        clearFogLine(e.clientX, e.clientY, e.clientX, e.clientY, brushes[key]);
      }
    }
    function handlePointerMove(e) {
      if(!state.started || state.paused || !state.activePointers.has(e.pointerId)) return;
      e.preventDefault();
      const pointer = state.activePointers.get(e.pointerId);

      // Com o Parabrisa, a posição do dedo não controla a limpeza: manter o
      // toque pressionado é o que sustenta a varredura automática.
      if(pointer.key === WINDSHIELD_BRUSH_KEY) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        return;
      }

      const brush = brushes[pointer.key] || brushes.soft;
      const coalesced = e.getCoalescedEvents ? e.getCoalescedEvents() : null;
      const events = coalesced?.length ? coalesced : [e];
      let fromX = pointer.x;
      let fromY = pointer.y;
      for (const sample of events) {
        clearFogLine(fromX, fromY, sample.clientX, sample.clientY, brush);
        fromX = sample.clientX;
        fromY = sample.clientY;
      }
      pointer.x = fromX;
      pointer.y = fromY;
    }
    function handlePointerUp(e) {
      if (state.activePointers.has(e.pointerId)) e.preventDefault();
      state.activePointers.delete(e.pointerId);
      state.pointerBrushes.delete(e.pointerId);
      if(!hasActiveWindshieldPointer()) windshieldWiperState.active = false;

      // Quando o último dedo sai, a taxa volta suavemente ao fluxo normal.
      if(state.isZen && state.zenAutoFog && state.activePointers.size === 0) {
        onTouchEnd();
      }

      if(state.started && !state.paused && !state.isZen && state.fogProgress >= getCompletionTarget()) updateProgress();
    }
    fogCanvas.addEventListener("pointerdown", handlePointerDown); fogCanvas.addEventListener("pointermove", handlePointerMove); fogCanvas.addEventListener("pointerup", handlePointerUp); fogCanvas.addEventListener("pointercancel", handlePointerUp);

    const PHASE_RAIN_AUDIO = Object.freeze([
      "assets/audio/rain/01_First_Rain.m4a", // 01 — 01_First_Rain
      "assets/audio/rain/02_Distant_Lights.m4a", // 02 — 02_Distant_Lights
      "assets/audio/rain/03_After_Midnight.m4a", // 03 — 03_After_Midnight
      "assets/audio/rain/04_Neon_Splash.m4a", // 04 — 04_Neon_Splash
      "assets/audio/rain/05_The_Window.m4a", // 05 — 05_The_Window
      "assets/audio/rain/06_Storm.m4a", // 06 — 06_Storm
      "assets/audio/rain/07_Horizon.m4a", // 07 — 07_Horizon
      "assets/audio/rain/08_Memories.m4a", // 08 — 08_Memories
      "assets/audio/rain/09_Silence.m4a", // 09 — 09_Silence
      "assets/audio/rain/10_Clearing_Sky.m4a", // 10 — 10_Clearing_Sky
      "assets/audio/rain/11_Moving_Car.m4a", // 11 — 11_Moving_Car
      "assets/audio/rain/12_Snowfall.m4a", // 12 — 12_Snowfall
      "assets/audio/rain/13_Highway_Rain.m4a", // 13 — 13_Highway_Rain
      "assets/audio/rain/14_Morning_Frost.m4a", // 14 — 14_Morning_Frost
      "assets/audio/rain/15_Summer_Sun_Shower.m4a", // 15 — 15_Summer_Sun_Shower
      "assets/audio/rain/16_Midnight_Blizzard.m4a", // 16 — 16_Midnight_Blizzard
      "assets/audio/rain/17_City_Tunnel.m4a", // 17 — 17_City_Tunnel
      "assets/audio/rain/18_Golden_Hour_Drops.m4a", // 18 — 18_Golden_Hour_Drops
      "assets/audio/rain/19_Snowy_Drive.m4a", // 19 — 19_Snowy_Drive
      "assets/audio/rain/20_The_Last_Wipe.m4a" // 20 — 20_The_Last_Wipe
    ]);

    const PHASE_MUSIC_AUDIO = Object.freeze([
      "assets/audio/music/Fase 01 - First Rain.mp3",
      "assets/audio/music/Fase 02 - Distant Lights.mp3",
      "assets/audio/music/Fase 03 - After Midnight.mp3",
      "assets/audio/music/Fase 04 - Neon Splash.mp3",
      "assets/audio/music/Fase 05 - The Window.mp3",
      "assets/audio/music/Fase 06 - Storm.mp3",
      "assets/audio/music/Fase 07 - Horizon.mp3",
      "assets/audio/music/Fase 08 - Memories.mp3",
      "assets/audio/music/Fase 09 - Silence.mp3",
      "assets/audio/music/Fase 10 - Clearing Sky.mp3",
      "assets/audio/music/Fase 11 - Moving Car.mp3",
      "assets/audio/music/Fase 12 - Snowfall.mp3",
      "assets/audio/music/Fase 13 - Highway Rain.mp3",
      "assets/audio/music/Fase 14 - Morning Frost.mp3",
      "assets/audio/music/Fase 15 - Summer Sun Shower.mp3",
      "assets/audio/music/Fase 16 - Midnight Blizzard.mp3",
      "assets/audio/music/Fase 17 - City Tunnel.mp3",
      "assets/audio/music/Fase 18 - Golden Hour Drops.mp3",
      "assets/audio/music/Fase 19 - Snowy Drive.mp3",
      "assets/audio/music/Fase 20 - The Last Wipe.mp3"
    ]);
    const ZEN_MUSIC_AUDIO = "assets/audio/music/Modo Zen - Soul of Rain.mp3";


    // 4 trovões reais do Rainy Skyline — arquivos externos locais.
    const THUNDER_AUDIO = Object.freeze([
      "assets/audio/thunder/Thunder_01_Distant_Soft.wav", // 1 — Thunder_01_Distant_Soft.wav
      "assets/audio/thunder/Thunder_02_Medium_Rolling.wav", // 2 — Thunder_02_Medium_Rolling.wav
      "assets/audio/thunder/Thunder_03_Close_Natural_Crack_v4.wav", // 3 — Thunder_03_Close_Natural_Crack_v4.wav
      "assets/audio/thunder/Thunder_04_Heavy_Storm.wav" // 4 — Thunder_04_Heavy_Storm.wav
    ]);
    const THUNDER_VARIANT_GAINS = Object.freeze([1, 1, 1, .75]);

    let audioCtx = null, masterGain = null, rainGain = null, phaseRainGain = null, musicGain = null, thunderGain = null, droneGain = null;
    let rainFilter = null, droneOsc = null, thunderTimer = null, thunderStrikeTimer = null;
    let phaseRainSource = null, phaseRainActiveIndex = -1, phaseRainRequestedIndex = -1, phaseRainRequestToken = 0;
    let musicSource = null, musicActiveKey = null, musicRequestedKey = null, musicRequestToken = 0;
    let lastThunderIndex = -1;
    const phaseRainBufferCache = new Map();
    const musicBufferCache = new Map();
    const thunderBufferCache = new Map();
    const thunderDecodePromiseCache = new Map();

    function stopEmbeddedPhaseRain() {
      phaseRainRequestToken++;
      phaseRainRequestedIndex = -1;
      phaseRainActiveIndex = -1;
      if(phaseRainSource) {
        try { phaseRainSource.stop(); } catch(e) {}
        try { phaseRainSource.disconnect(); } catch(e) {}
        phaseRainSource = null;
      }
      if(phaseRainGain && audioCtx) phaseRainGain.gain.setTargetAtTime(0,audioCtx.currentTime,.08);
    }

    async function decodeEmbeddedPhaseRain(index) {
      if(phaseRainBufferCache.has(index)) return phaseRainBufferCache.get(index);
      const uri=PHASE_RAIN_AUDIO[index];
      if(!uri || !audioCtx) return null;
      let audioBytes;
      if(uri.startsWith("data:")) {
        const comma=uri.indexOf(',');
        if(comma<0) return null;
        const binary=atob(uri.slice(comma+1));
        const bytes=new Uint8Array(binary.length);
        for(let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
        audioBytes=bytes.buffer;
      } else {
        const response=await fetch(uri);
        if(!response.ok) throw new Error(`HTTP ${response.status} ao carregar ${uri}`);
        audioBytes=await response.arrayBuffer();
      }
      const buffer=await audioCtx.decodeAudioData(audioBytes);
      phaseRainBufferCache.set(index,buffer);
      return buffer;
    }

    function getActiveRainAudioIndex() {
      return state.isZen ? getZenClimate().rainAudio : state.currentPhase;
    }

    async function playEmbeddedPhaseRain(index) {
      if(!audioCtx || index<0 || index>=PHASE_RAIN_AUDIO.length) {
        stopEmbeddedPhaseRain();
        return;
      }
      if(phaseRainActiveIndex===index || phaseRainRequestedIndex===index) return;

      const token=++phaseRainRequestToken;
      phaseRainRequestedIndex=index;
      if(phaseRainSource) {
        try { phaseRainSource.stop(); } catch(e) {}
        try { phaseRainSource.disconnect(); } catch(e) {}
        phaseRainSource=null;
      }
      phaseRainActiveIndex=-1;
      if(phaseRainGain) phaseRainGain.gain.setTargetAtTime(0,audioCtx.currentTime,.05);

      try {
        const buffer=await decodeEmbeddedPhaseRain(index);
        if(!buffer || token!==phaseRainRequestToken || getActiveRainAudioIndex()!==index) return;
        const source=audioCtx.createBufferSource();
        source.buffer=buffer;
        source.loop=true;
        source.connect(phaseRainGain);
        source.start(0);
        phaseRainSource=source;
        phaseRainActiveIndex=index;
        phaseRainRequestedIndex=-1;
        updateAudio();
      } catch(error) {
        if(token===phaseRainRequestToken) phaseRainRequestedIndex=-1;
        console.warn(`Não foi possível carregar o som climático ${index+1}.`,error);
        updateAudio();
      }
    }

    function syncEmbeddedPhaseRain() {
      if(!audioCtx || !state.started) return;
      const desiredIndex=getActiveRainAudioIndex();
      if(phaseRainActiveIndex!==desiredIndex && phaseRainRequestedIndex!==desiredIndex) {
        playEmbeddedPhaseRain(desiredIndex);
      }
    }

    function getActiveMusicKey() {
      return state.isZen ? "zen" : state.currentPhase;
    }

    function getMusicUri(key) {
      return key === "zen" ? ZEN_MUSIC_AUDIO : PHASE_MUSIC_AUDIO[key];
    }

    function stopEmbeddedMusic() {
      musicRequestToken++;
      musicRequestedKey = null;
      musicActiveKey = null;
      if(musicSource) {
        try { musicSource.stop(); } catch(e) {}
        try { musicSource.disconnect(); } catch(e) {}
        musicSource = null;
      }
      if(musicGain && audioCtx) musicGain.gain.setTargetAtTime(0,audioCtx.currentTime,.12);
    }

    async function decodeEmbeddedMusic(key) {
      if(musicBufferCache.has(key)) return musicBufferCache.get(key);
      const uri=getMusicUri(key);
      if(!uri || !audioCtx) return null;
      const response=await fetch(uri);
      if(!response.ok) throw new Error(`HTTP ${response.status} ao carregar ${uri}`);
      const audioBytes=await response.arrayBuffer();
      const buffer=await audioCtx.decodeAudioData(audioBytes);
      musicBufferCache.clear();
      musicBufferCache.set(key,buffer);
      return buffer;
    }

    async function playEmbeddedMusic(key=getActiveMusicKey()) {
      if(!audioCtx || !state.started) return;
      if(musicActiveKey===key || musicRequestedKey===key) return;

      const token=++musicRequestToken;
      musicRequestedKey=key;
      if(musicSource) {
        try { musicSource.stop(); } catch(e) {}
        try { musicSource.disconnect(); } catch(e) {}
        musicSource=null;
      }
      musicActiveKey=null;
      if(musicGain) musicGain.gain.setTargetAtTime(0,audioCtx.currentTime,.08);

      try {
        const buffer=await decodeEmbeddedMusic(key);
        if(!buffer || token!==musicRequestToken || !state.started || getActiveMusicKey()!==key) return;
        const source=audioCtx.createBufferSource();
        source.buffer=buffer;
        source.loop=true;
        source.loopStart=0;
        source.loopEnd=buffer.duration;
        source.connect(musicGain);
        source.start(0);
        musicSource=source;
        musicActiveKey=key;
        musicRequestedKey=null;
        updateAudio();
      } catch(error) {
        if(token===musicRequestToken) musicRequestedKey=null;
        console.warn(`Não foi possível carregar a música ${key === "zen" ? "do Modo Zen" : `da fase ${Number(key)+1}`}.`,error);
        updateAudio();
      }
    }

    function syncEmbeddedMusic() {
      if(!audioCtx) return;
      if(!state.started) {
        if(musicSource || musicRequestedKey!==null) stopEmbeddedMusic();
        return;
      }

      const key=getActiveMusicKey();
      if(
        (musicActiveKey!==null && musicActiveKey!==key) ||
        (musicRequestedKey!==null && musicRequestedKey!==key)
      ) {
        stopEmbeddedMusic();
      }

      if(!state.musicSound) return;
      if(musicActiveKey!==key && musicRequestedKey!==key) playEmbeddedMusic(key);
    }

    async function decodeEmbeddedThunder(index) {
      if(thunderBufferCache.has(index)) return thunderBufferCache.get(index);
      if(thunderDecodePromiseCache.has(index)) return thunderDecodePromiseCache.get(index);
      const uri=THUNDER_AUDIO[index];
      if(!uri || !audioCtx) return null;

      const promise=(async()=>{
        let audioBytes;
        if(uri.startsWith("data:")) {
          const comma=uri.indexOf(',');
          if(comma<0) return null;
          const binary=atob(uri.slice(comma+1));
          const bytes=new Uint8Array(binary.length);
          for(let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
          audioBytes=bytes.buffer;
        } else {
          const response=await fetch(uri);
          if(!response.ok) throw new Error(`HTTP ${response.status} ao carregar ${uri}`);
          audioBytes=await response.arrayBuffer();
        }
        const buffer=await audioCtx.decodeAudioData(audioBytes);
        thunderBufferCache.set(index,buffer);
        return buffer;
      })();

      thunderDecodePromiseCache.set(index,promise);
      try { return await promise; }
      finally { thunderDecodePromiseCache.delete(index); }
    }

    function preloadEmbeddedThunders() {
      for(let i=0;i<THUNDER_AUDIO.length;i++) decodeEmbeddedThunder(i).catch(()=>{});
    }

    const PHASE_THUNDER_PROFILES = Object.freeze({
      2:{weights:[.42,.43,.15,0], first:[4500,8500], next:[8000,15000]},  // 3 — After Midnight
      3:{weights:[.30,.46,.24,0], first:[4000,8000], next:[7500,14000]},  // 4 — Neon Splash
      5:{weights:[.08,.34,.35,.23], first:[3000,6000], next:[6000,12000]}, // 6 — Storm
      7:{weights:[.68,.28,.04,0], first:[5000,10000],next:[9000,17000]},  // 8 — Memories
      10:{weights:[.58,.34,.08,0],first:[5000,9000], next:[8000,16000]},  // 11 — Moving Car
      12:{weights:[.20,.48,.32,0],first:[4000,8000], next:[7000,14000]},  // 13 — Highway Rain
      14:{weights:[.60,.34,.06,0],first:[5000,10000],next:[9000,17000]},  // 15 — Summer Sun Shower
      15:{weights:[.42,.42,.16,0],first:[4500,8500], next:[8000,15000]}   // 16 — Midnight Blizzard
    });

    function getThunderWeights(intensity, phaseIndex=state.currentPhase) {
      if(state.isZen) return getZenClimate().thunderWeights;
      const phaseProfile=PHASE_THUNDER_PROFILES[phaseIndex];
      if(phaseProfile) return phaseProfile.weights;
      if(intensity>=.80) return [.10,.38,.32,.20];
      if(intensity>=.25) return [.28,.50,.22,0];
      if(intensity>=.12) return [.56,.36,.08,0];
      return [.80,.20,0,0];
    }

    function chooseThunderIndex(intensity, phaseIndex=state.currentPhase) {
      const weights=getThunderWeights(intensity,phaseIndex).slice();
      if(lastThunderIndex>=0 && weights[lastThunderIndex]>0) weights[lastThunderIndex]*=.18;
      const total=weights.reduce((sum,w)=>sum+w,0);
      let roll=Math.random()*total;
      let fallback=0;
      for(let i=0;i<weights.length;i++) {
        if(weights[i]>0) fallback=i;
        roll-=weights[i];
        if(roll<=0) return i;
      }
      return fallback;
    }

    async function playEmbeddedThunder(index) {
      if(!audioCtx || !state.gameSound || !state.lightningEnabled) return false;
      try {
        const buffer=await decodeEmbeddedThunder(index);
        if(!buffer || !audioCtx || !state.gameSound || !state.lightningEnabled || state.paused || document.hidden) return false;
        const source=audioCtx.createBufferSource();
        const variantGain=audioCtx.createGain();
        source.buffer=buffer;
        variantGain.gain.value=THUNDER_VARIANT_GAINS[index] ?? 1;
        source.connect(variantGain);
        variantGain.connect(thunderGain);
        source.onended=()=>{
          try { source.disconnect(); } catch(e) {}
          try { variantGain.disconnect(); } catch(e) {}
        };
        source.start(0);
        lastThunderIndex=index;
        return true;
      } catch(error) {
        console.warn(`Não foi possível tocar o trovão ${index+1}.`,error);
        return false;
      }
    }

    function getThunderDelay(index) {
      const ranges=[
        [700,1200], // 1 — distante
        [350,700],  // 2 — médio
        [80,180],   // 3 — próximo
        [150,350]   // 4 — tempestade pesada
      ];
      const [min,max]=ranges[index] || ranges[1];
      return min+Math.random()*(max-min);
    }

    function initAudio(){
      if(audioCtx){ if(audioCtx.state==='suspended') audioCtx.resume().catch(()=>{}); return; }
      try{
        audioCtx=new (window.AudioContext||window.webkitAudioContext)();
        masterGain=audioCtx.createGain(); masterGain.gain.value=.82; masterGain.connect(audioCtx.destination);
        rainGain=audioCtx.createGain(); rainGain.gain.value=0; rainGain.connect(masterGain);
        phaseRainGain=audioCtx.createGain(); phaseRainGain.gain.value=0; phaseRainGain.connect(masterGain);
        musicGain=audioCtx.createGain(); musicGain.gain.value=0; musicGain.connect(masterGain);
        thunderGain=audioCtx.createGain(); thunderGain.gain.value=0; thunderGain.connect(masterGain);
        const buffer=audioCtx.createBuffer(1,audioCtx.sampleRate*4,audioCtx.sampleRate), data=buffer.getChannelData(0);
        let brown=0;
        for(let i=0;i<data.length;i++){
          const white=Math.random()*2-1;
          brown=(brown+white*.028)/1.025;
          data[i]=(white*.20+brown*.55)*.48;
        }
        const src=audioCtx.createBufferSource(); src.buffer=buffer; src.loop=true;
        rainFilter=audioCtx.createBiquadFilter(); rainFilter.type='lowpass'; rainFilter.frequency.value=2500; rainFilter.Q.value=.35;
        src.connect(rainFilter); rainFilter.connect(rainGain); src.start();
        updateAudio();
        preloadEmbeddedThunders();
      }catch(e){ audioCtx=null; }
    }
    function updateAudio(){
      if(!masterGain || !audioCtx) return;
      const phase=getActivePhase();
      const intensity=getEffectiveRainIntensity();
      const zenClimate=state.isZen ? getZenClimate() : null;
      const isSnow=phase.type==='snow' || phase.type==='car_snow' || Boolean(zenClimate?.snow);
      masterGain.gain.setTargetAtTime(state.paused ? .28 : .82,audioCtx.currentTime,.18);
      const profile=({
        light:{gain:.78,tone:.82},steady:{gain:1,tone:1},heavy:{gain:1.10,tone:1.08},neon:{gain:.96,tone:1.16},
        soft:{gain:.68,tone:.72},storm:{gain:1.18,tone:1.28},breeze:{gain:.58,tone:.78},memory:{gain:.80,tone:.90},
        drizzle:{gain:.50,tone:.62},clearing:{gain:.44,tone:.70},carRain:{gain:.92,tone:1.22},snowSoft:{gain:.42,tone:.58},
        highwayRain:{gain:1.14,tone:1.34},snowLight:{gain:.36,tone:.52},sunShower:{gain:.68,tone:1.08},blizzard:{gain:.72,tone:.74},
        tunnelRain:{gain:.82,tone:.92},goldenRain:{gain:.62,tone:.92},snowDrive:{gain:.50,tone:.68},finalRain:{gain:.38,tone:.64}
      })[phase.rainStyle] || {gain:1,tone:1};

      syncEmbeddedPhaseRain();
      syncEmbeddedMusic();
      const activeRainAudioIndex=getActiveRainAudioIndex();
      const embeddedRainReady=phaseRainActiveIndex===activeRainAudioIndex;
      const syntheticRainTarget=embeddedRainReady ? 0 :
        (state.gameSound ? 1 : 0)*(isSnow ? .035+.055*intensity : .075+.115*intensity)*profile.gain*state.rainVolume;
      const rainAudioGain=state.isZen ? zenClimate.rainGain : .72;
      const embeddedRainTarget=embeddedRainReady && state.gameSound ? rainAudioGain*state.rainVolume : 0;
      const thunderLevelGain=state.isZen ? zenClimate.thunderGain : 1;
      rainGain.gain.setTargetAtTime(syntheticRainTarget,audioCtx.currentTime,.16);
      phaseRainGain.gain.setTargetAtTime(embeddedRainTarget,audioCtx.currentTime,.16);
      musicGain.gain.setTargetAtTime(state.musicSound && state.started ? state.ambVolume : 0,audioCtx.currentTime,.25);
      thunderGain.gain.setTargetAtTime(state.gameSound && state.lightningEnabled ? state.ambVolume*thunderLevelGain : 0,audioCtx.currentTime,.10);
      rainFilter.frequency.setTargetAtTime((isSnow ? 1050 : 1750+intensity*1850)*profile.tone,audioCtx.currentTime,.25);
    }
    function blip(freq,dur,vol){ if(!audioCtx||!state.gameSound)return; const o=audioCtx.createOscillator(),g=audioCtx.createGain(); o.frequency.value=freq; o.type='sine'; g.gain.setValueAtTime(0,audioCtx.currentTime);g.gain.linearRampToValueAtTime(vol,audioCtx.currentTime+.01);g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+dur);o.connect(g);g.connect(masterGain);o.start();o.stop(audioCtx.currentTime+dur+.02);}
    function playThunder(v){
      if(!state.lightningEnabled) return;

      initAudio();
      const index=chooseThunderIndex(v,state.currentPhase);
      const delay=getThunderDelay(index);

      lightning();

      if(state.gameSound&&audioCtx) decodeEmbeddedThunder(index).catch(()=>{});
      if(thunderStrikeTimer) clearTimeout(thunderStrikeTimer);
      thunderStrikeTimer=setTimeout(async()=>{
        thunderStrikeTimer=null;
        if(!state.lightningEnabled || !state.started || state.paused || document.hidden) return;

        if(state.gameSound&&audioCtx) await playEmbeddedThunder(index);
        if(state.lightningEnabled && state.vibration){
          if(typeof window.RainySkylineHaptics?.thunder==='function') window.RainySkylineHaptics.thunder(v);
          else if(navigator.vibrate) navigator.vibrate([22,40,38]);
        }
      },delay);
    }
    function startThunderSchedule(firstStrike=true){
      if(thunderTimer) {
        clearTimeout(thunderTimer);
        thunderTimer=null;
      }

      if(!state.lightningEnabled) return;

      const zenClimate=state.isZen ? getZenClimate() : null;
      const intensity=state.isZen ? zenClimate.thunder : (getActivePhase()?.thunder || 0);
      if(!intensity) return;
      const phaseIndex=state.currentPhase;
      const zenLevel=state.isZen ? getZenLevel() : null;
      const profile=state.isZen
        ? { first:zenClimate.thunderFirst, next:zenClimate.thunderNext }
        : PHASE_THUNDER_PROFILES[phaseIndex];
      const fallbackRange=firstStrike ? [5000,10000] : [9000,17000];
      const [minDelay,maxDelay]=(profile ? (firstStrike ? profile.first : profile.next) : fallbackRange);
      thunderTimer=setTimeout(()=>{
        const sameWeather=state.isZen ? getZenLevel()===zenLevel : state.currentPhase===phaseIndex;
        if(state.lightningEnabled && state.started&&!state.paused&&!document.hidden&&sameWeather) playThunder(intensity);
        startThunderSchedule(false);
      },minDelay+Math.random()*(maxDelay-minDelay));
    }
    function lightning(){
      if(!state.lightningEnabled || window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;
      const f=document.getElementById('lightningFlash');
      f.style.opacity=.10+Math.random()*.22;
      setTimeout(()=>f.style.opacity=0,65);
      if(Math.random()<.28)setTimeout(()=>{f.style.opacity=.055;setTimeout(()=>f.style.opacity=0,42)},105);
    }
    function showToast(text){const el=document.getElementById('toast');el.textContent=text;el.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>el.classList.remove('show'),900);}

    function showAd(callback) {
      const bridge = window.RainySkylineAds;
      if (!bridge || typeof bridge.showInterstitial !== "function") {
        callback?.(false);
        return;
      }
      const ad = document.getElementById("adScreen");
      ad.classList.remove("hidden");
      let finished=false;
      const finish=(shown=true)=>{
        if(finished) return;
        finished=true;
        clearTimeout(timeout);
        ad.classList.add("hidden");
        callback?.(shown);
      };
      const timeout=setTimeout(()=>finish(false),2200);
      try {
        const result=bridge.showInterstitial(finish);
        if(result && typeof result.then === "function") result.then(()=>finish(true)).catch(()=>finish(false));
      } catch (_) { finish(false); }
    }

    function maybeShowCompletionAd(callback) {
      const oldEnough = Date.now() - state.lastAdAt > 180000;
      const eligible = state.currentPhase >= 3 && state.completedSinceAd >= 3 && oldEnough;
      if (!eligible) { callback?.(); return; }
      showAd((shown) => {
        if(shown){
          state.completedSinceAd = 0;
          state.lastAdAt = Date.now();
          saveGame();
        }
        callback?.();
      });
    }

    function completePhase() {
      if(!state.started || state.isZen) return;
      const completedIndex = state.currentPhase;
      const roadStarPhase = isRoadStarPhaseIndex(completedIndex);
      const perfectClean = !roadStarPhase && state.fogProgress >= PERFECT_CLEAN_TARGET;
      const roadStarClean = roadStarPhase && state.fogProgress + 1e-9 >= ROAD_STAR_TARGET;
      state.started = false;
      state.paused = false;
      state.activePointers.clear();
      state.pointerBrushes.clear();
      if(masterGain&&audioCtx) masterGain.gain.setTargetAtTime(.24,audioCtx.currentTime,.4);
      if(thunderTimer) clearTimeout(thunderTimer);
      if(thunderStrikeTimer) { clearTimeout(thunderStrikeTimer); thunderStrikeTimer=null; }
      stopEmbeddedMusic();

      const firstClear = !state.completedPhases.includes(completedIndex);
      const firstRoadStar = roadStarClean && !state.roadStarPhases.includes(completedIndex);
      const base = 100;
      const newMemoryBonus = firstClear ? 50 : 0;
      const perfectBonus = perfectClean ? PERFECT_CLEAN_BONUS : 0;
      const roadStarBonus = firstRoadStar ? ROAD_STAR_BONUS : 0;
      const total = base + newMemoryBonus + perfectBonus + roadStarBonus;

      state.points += total;
      if(firstClear){
        state.completedPhases.push(completedIndex);
        state.stars += 1;
      }
      if(perfectClean && !state.perfectPhases.includes(completedIndex)) {
        state.perfectPhases.push(completedIndex);
      }
      if(firstRoadStar) {
        state.roadStarPhases.push(completedIndex);
      }
      if(!state.windshieldUnlocked && ROAD_STAR_PHASES.every(index => state.roadStarPhases.includes(index))) {
        state.windshieldUnlocked = true;
        unlockedBrushes[WINDSHIELD_BRUSH_KEY] = true;
      }
      state.completedSinceAd += 1;
      if (state.currentPhase < ACTIVE_PHASE_COUNT - 1) {
        state.highestPhase = Math.max(state.highestPhase, state.currentPhase + 1);
      }
      state.resumePhase = Math.min(completedIndex + 1, ACTIVE_PHASE_COUNT - 1);
      saveGame();

      document.getElementById("rewardPhaseName").textContent = `${localize(phases[completedIndex].name)} · ${localize(phases[completedIndex].feeling)}`;
      document.getElementById("rewardBase").textContent = `+${base}`;
      document.getElementById("rewardBonus").textContent = `+${newMemoryBonus}`;
      document.getElementById("rewardBonusLine").style.display = newMemoryBonus ? "flex" : "none";
      const displayedCleanBonus = perfectBonus + roadStarBonus;
      document.getElementById("rewardPerfectBonus").textContent = `+${displayedCleanBonus}`;
      document.getElementById("rewardPerfectLine").style.display = displayedCleanBonus ? "flex" : "none";
      const rewardPerfectBadge = document.getElementById("rewardPerfectBadge");
      rewardPerfectBadge.textContent = roadStarClean ? t("road_star_message") : t("perfect");
      rewardPerfectBadge.style.display = (perfectClean || roadStarClean) ? "block" : "none";
      document.getElementById("rewardCoins").textContent = `+${total} 🌧️`;
      document.getElementById("rewardTotal").textContent = `+${total} 🌧️`;
      document.getElementById("hud").classList.add("hidden");
      document.getElementById("rewardScreen").classList.remove("hidden");

      const nextButton = document.getElementById("nextPhaseBtn");
      const menuButton = document.getElementById("rewardMenuBtn");
      const isLastPhase = completedIndex >= ACTIVE_PHASE_COUNT - 1;
      nextButton.textContent = isLastPhase ? t("btn_mainmenu") : t("btn_next");
      menuButton.style.display = isLastPhase ? "none" : "";
      updateCoins();
      renderPhases();
      blip(perfectClean ? 760 : 620, perfectClean ? .46 : .34, perfectClean ? .05 : .035);
      preloadBackground(completedIndex + 1);
    }

    let startRequestId=0;
    async function startPhase(idx, zen = false) {
      if (!Number.isInteger(idx) || idx < 0 || idx >= ACTIVE_PHASE_COUNT) return;
      if (idx > state.highestPhase && !zen) return;
      const sceneTransition=document.getElementById("sceneTransition");
      sceneTransition?.classList.add("active");
      const requestId=++startRequestId;
      if(!zen) state.campaignPhase=idx;
      state.currentPhase = idx; state.resumePhase=null; state.started = false; state.paused = true; state.isZen = zen;
      if(audioCtx){
        if(zen) stopEmbeddedPhaseRain();
        else playEmbeddedPhaseRain(idx);
        stopEmbeddedMusic();
      }
      document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
      document.getElementById("hud").classList.add("hidden");
      document.getElementById("loadingScreen").classList.remove("hidden");
      const loadedBackground=await ensurePhaseBackground(idx, zen);
      if(requestId!==startRequestId) return;
      state.started = true; state.paused = false; saveGame();
      state.hasInteracted = false; state.activePointers.clear(); state.pointerBrushes.clear();
      state.elapsed=0; state.carOffset=0; state.cleanStreak=0; state.zenScore=0;
      state.lastTime=performance.now(); state.phaseStartedAt=performance.now();
      generateCity(); drawCityBackground();
      const activePhase = getActivePhase();
      applyPhaseAtmosphere(activePhase);
      if(zen) resetZenWind(Boolean(getZenClimate()?.snow));
      rainParticles.forEach(p=>p.reset(true));
      glassDropsSystem.resetForPhase();
      initFog(); updatePhaseUI();
      document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
      document.getElementById("hud").classList.remove("hidden");
      document.getElementById("instruction").classList.remove("hidden-text");
      requestAnimationFrame(()=>requestAnimationFrame(()=>sceneTransition?.classList.remove("active")));
      if(!loadedBackground) showToast(t("background_missing"));
      document.getElementById('progressLabelText').textContent = zen ? t('zen_progress_label') : t('defog_window');
      const glow=document.getElementById('weatherGlow');
      glow.style.background=`radial-gradient(circle at 50% 25%, hsla(${activePhase.hue},80%,65%,.16), transparent 58%)`;
      glow.style.opacity=zen? .30 : .20;
      initAudio(); updateAudio(); startThunderSchedule();
      if(!zen) preloadBackground(idx+1);
    }


    // #endregion
    // #region 13 — FLUXO DE FASE / UI / LOJA / MENU
    function updatePhaseUI() {
      const p = phases[state.currentPhase];
      document.getElementById("phaseDisplay").textContent = state.currentPhase + 1;
      document.getElementById("phaseTotalDisplay").textContent = ACTIVE_PHASE_COUNT;
      document.getElementById("menuPhaseName").textContent = localize(p.name);
      document.getElementById("menuPhaseFeeling").textContent = localize(p.feeling);
      updateCoins();
      const zen = state.isZen;
      document.getElementById("phaseDisplay").parentElement.style.display = zen ? "none" : "";
      document.getElementById("currencyHud").style.display = zen ? "none" : "";
      document.getElementById("zenMistBtn").style.display = zen && !state.zenAutoFog ? "flex" : "none";
      document.getElementById("zenFogSetting").style.display = zen ? "block" : "none";

      // No Zen fica apenas o texto "Paz Infinita"; a barra continua normal
      // nas 20 fases da campanha.
      const progressBar=document.querySelector(".progress-bar");
      if(progressBar) progressBar.style.display = zen ? "none" : "";

      syncToggle("zenFogToggle",state.zenAutoFog);
    }
    function updateCoins() { document.getElementById("pointsDisplay").textContent = state.points; document.getElementById("storeCoins").textContent = state.points; }
    function syncToggle(id,on){ const element=document.getElementById(id); element.classList.toggle("on",!!on); element.setAttribute("aria-checked",String(!!on)); }

    function renderPhases() {
      const list = document.getElementById("phaseList"); list.innerHTML = "";
      phases.slice(0,ACTIVE_PHASE_COUNT).forEach((p, i) => {
        const unlocked = i <= state.highestPhase;
        const div = document.createElement("div");
        div.className = "phase-item " + (i === state.currentPhase ? "active " : "") + (!unlocked ? "locked" : "");
        const roadStarPhase = isRoadStarPhaseIndex(i);
        const perfectMark = unlocked && !roadStarPhase && state.perfectPhases.includes(i) ? " ✦" : "";
        const roadStarMark = unlocked && state.roadStarPhases.includes(i) ? " 🚘✦" : "";
        div.innerHTML = `<div class="phase-number">${t('phase_hud')} ${i + 1}</div><div class="phase-name">${unlocked ? localize(p.name) + perfectMark + roadStarMark : t('phase_locked')}</div><div class="phase-mini-feeling">${unlocked ? localize(p.feeling) : t('phase_req')}</div>`;
        if (unlocked) div.onclick = () => { initAudio(); startPhase(i); };
        list.appendChild(div);
      });
    }

    let storePreviewObserver = null;

    function ensureStorePreviewCanvasStyle() {
      if(document.getElementById("storePreviewCanvasStyle")) return;
      const style=document.createElement("style");
      style.id="storePreviewCanvasStyle";
      style.textContent=`
        .store-preview.animated-style-preview {
          position:relative;
          overflow:hidden;
          display:block;
          background:#071b33;
        }
        .store-preview.animated-style-preview::before,
        .store-preview.animated-style-preview::after {
          display:none !important;
          content:none !important;
        }
        .store-style-preview-canvas {
          width:100%;
          height:100%;
          display:block;
          pointer-events:none;
          user-select:none;
        }
      `;
      document.head.appendChild(style);
    }

    function previewNoise(seed) {
      const value=Math.sin(seed*12.9898+78.233)*43758.5453;
      return value-Math.floor(value);
    }

    function drawStoreBrushPreview(canvas, brush, key, progress) {
      const rect=canvas.getBoundingClientRect();
      const width=Math.max(96,Math.round(rect.width||116));
      const height=Math.max(56,Math.round(rect.height||72));
      const previewDpr=Math.min(window.devicePixelRatio||1,1.5);
      const pixelWidth=Math.round(width*previewDpr);
      const pixelHeight=Math.round(height*previewDpr);
      if(canvas.width!==pixelWidth || canvas.height!==pixelHeight){
        canvas.width=pixelWidth;
        canvas.height=pixelHeight;
      }
      const ctx=canvas.getContext("2d");
      ctx.setTransform(previewDpr,0,0,previewDpr,0,0);
      ctx.clearRect(0,0,width,height);

      const background=ctx.createLinearGradient(0,0,width,height);
      background.addColorStop(0,"#071426");
      background.addColorStop(1,"#102d45");
      ctx.fillStyle=background;
      ctx.fillRect(0,0,width,height);

      // Pequenos pontos de luz só para tornar a limpeza visível no preview.
      ctx.globalAlpha=.55;
      for(let i=0;i<5;i++){
        const x=width*(.16+i*.18);
        const y=height*(.32+(i%2)*.22);
        ctx.fillStyle=i%2 ? "#8ecae6" : "#f4d8a5";
        ctx.beginPath();
        ctx.arc(x,y,1.4+(i%3)*.45,0,Math.PI*2);
        ctx.fill();
      }
      ctx.globalAlpha=1;

      // Névoa da miniatura.
      ctx.fillStyle="rgba(205,218,224,.62)";
      ctx.fillRect(0,0,width,height);

      ctx.save();
      ctx.globalCompositeOperation="destination-out";
      const opacity=Math.max(.01,Math.min(1,brush.opacityPerStroke||1));
      ctx.globalAlpha=opacity;

      if(brush.shape === "arc") {
        const cx=width*.50;
        const cy=height*.72;
        const rx=width*.32;
        const ry=height*.48;
        const start=-Math.PI*.90;
        const end=start+Math.PI*1.30*Math.max(0,Math.min(1,progress));
        ctx.lineCap="round";
        ctx.lineWidth=Math.max(5,Math.min(12,brush.radius*.18));
        ctx.strokeStyle="#000";
        ctx.beginPath();
        ctx.ellipse(cx,cy,rx,ry,0,start,end);
        ctx.stroke();
      } else if(brush.shape === "soft") {
        const startX=width*.15;
        const endX=width*.85;
        const y=height*.52;
        const length=Math.max(0,Math.min(1,progress));
        const steps=Math.max(1,Math.floor(9*length));
        const r=Math.max(6,Math.min(height*.22,brush.radius*.20));

        for(let i=0;i<=steps;i++) {
          const t=steps ? i/steps : 0;
          const x=startX+(endX-startX)*t;
          const g=ctx.createRadialGradient(x,y,0,x,y,r);
          g.addColorStop(0,"rgba(0,0,0,1)");
          g.addColorStop(.52,"rgba(0,0,0,1)");
          g.addColorStop(.74,"rgba(0,0,0,.78)");
          g.addColorStop(.90,"rgba(0,0,0,.26)");
          g.addColorStop(1,"rgba(0,0,0,0)");
          ctx.globalAlpha=1;
          ctx.fillStyle=g;
          ctx.beginPath();
          ctx.arc(x,y,r,0,Math.PI*2);
          ctx.fill();
        }
      } else if(brush.shape === "precise") {
        const startX=width*.18;
        const endX=width*.82;
        const y=height*.52;
        const length=Math.max(0,Math.min(1,progress));
        const steps=Math.max(1,Math.floor(9*length));
        const r=Math.max(4,Math.min(height*.16,brush.radius*.19));

        for(let i=0;i<=steps;i++) {
          const t=steps ? i/steps : 0;
          const x=startX+(endX-startX)*t;

          ctx.globalAlpha=.28;
          ctx.fillStyle="#000";
          ctx.beginPath();
          ctx.arc(x,y,r,0,Math.PI*2);
          ctx.fill();

          ctx.globalAlpha=1;
          ctx.beginPath();
          ctx.arc(x,y,r*.84,0,Math.PI*2);
          ctx.fill();
        }
      } else if(brush.shape === "sharp") {
        const startX=width*.16;
        const endX=width*.84;
        const y=height*.52;
        const currentX=startX+(endX-startX)*Math.max(0,Math.min(1,progress));

        ctx.globalAlpha=1;
        ctx.strokeStyle="#000";
        ctx.lineCap="round";
        ctx.lineJoin="round";
        ctx.lineWidth=Math.max(4,Math.min(8,brush.radius*.34));
        ctx.beginPath();
        ctx.moveTo(startX,y);
        ctx.lineTo(currentX,y);
        ctx.stroke();
      } else if(brush.shape === "dream") {
        const startX=width*.13, endX=width*.87, yBase=height*.52;
        const length=Math.max(0,Math.min(1,progress));
        const steps=Math.max(1,Math.floor(7*length));
        const cloudRadius=Math.max(8,Math.min(height*.32,brush.radius*.18));
        const lobes=[
          [0,0,.46,.92],[-.34,-.08,.32,.72],[.31,-.14,.34,.76],
          [-.16,.24,.29,.60],[.23,.22,.28,.58],[.02,-.31,.25,.54]
        ];

        for(let i=0;i<=steps;i++) {
          const t=steps ? i/steps : 0;
          const x=startX+(endX-startX)*t;
          const y=yBase+Math.sin(t*Math.PI*3.2)*height*.035;

          for(const lobe of lobes) {
            const cx=x+lobe[0]*cloudRadius;
            const cy=y+lobe[1]*cloudRadius;
            const rr=cloudRadius*lobe[2];
            const g=ctx.createRadialGradient(cx,cy,0,cx,cy,rr);
            g.addColorStop(0,`rgba(0,0,0,${lobe[3]})`);
            g.addColorStop(.48,`rgba(0,0,0,${lobe[3]*.70})`);
            g.addColorStop(1,"rgba(0,0,0,0)");
            ctx.globalAlpha=opacity;
            ctx.fillStyle=g;
            ctx.beginPath();
            ctx.arc(cx,cy,rr,0,Math.PI*2);
            ctx.fill();
          }
        }
      } else if(brush.shape === "giant") {
        const startX=width*.12, endX=width*.88, y=height*.52;
        const length=Math.max(0,Math.min(1,progress));
        const steps=Math.max(1,Math.floor(6*length));
        const rx=Math.max(10,Math.min(width*.18,brush.radius*.24));
        const ry=rx*.54;

        for(let i=0;i<=steps;i++) {
          const t=steps ? i/steps : 0;
          const x=startX+(endX-startX)*t;
          ctx.globalAlpha=.30;
          ctx.fillStyle="#000";
          ctx.beginPath();
          ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);
          ctx.fill();

          ctx.globalAlpha=.58;
          ctx.beginPath();
          ctx.ellipse(x,y,rx*.84,ry*.80,0,0,Math.PI*2);
          ctx.fill();

          ctx.globalAlpha=1;
          ctx.beginPath();
          ctx.ellipse(x,y,rx*.62,ry*.62,0,0,Math.PI*2);
          ctx.fill();
        }
      } else if(brush.shape === "velvet") {
        const startX=width*.14, endX=width*.86, yBase=height*.52;
        const length=Math.max(0,Math.min(1,progress));
        const steps=Math.max(1,Math.floor(9*length));
        const previewRadius=Math.max(7,Math.min(height*.29,brush.radius*.20));

        for(let i=0;i<=steps;i++) {
          const t=steps ? i/steps : 0;
          const x=startX+(endX-startX)*t;
          const y=yBase+Math.sin(t*Math.PI*2)*height*.018;
          const g=ctx.createRadialGradient(x-previewRadius*.06,y-previewRadius*.06,0,x,y,previewRadius);
          g.addColorStop(0,"rgba(0,0,0,.98)");
          g.addColorStop(.48,"rgba(0,0,0,.92)");
          g.addColorStop(.76,"rgba(0,0,0,.58)");
          g.addColorStop(1,"rgba(0,0,0,0)");
          ctx.globalAlpha=opacity;
          ctx.fillStyle=g;
          ctx.beginPath();
          ctx.arc(x,y,previewRadius,0,Math.PI*2);
          ctx.fill();
        }

        // Pequenos fios deixam claro que é um acabamento de tecido/polimento.
        ctx.globalAlpha=.16*opacity;
        ctx.strokeStyle="#000";
        ctx.lineWidth=1;
        for(let i=0;i<5;i++) {
          const yy=yBase-previewRadius*.45+i*(previewRadius*.22);
          ctx.beginPath();
          ctx.moveTo(startX,yy);
          ctx.lineTo(startX+(endX-startX)*length,yy+previewRadius*.12);
          ctx.stroke();
        }
      } else if(brush.shape === "feather") {
        const startX=width*.15, endX=width*.85, y=height*.52;
        const currentX=startX+(endX-startX)*Math.max(0,Math.min(1,progress));
        const scatterAmount=Math.max(0,Number(brush.scatter)||0);
        const spread=Math.max(4,height*.16+scatterAmount*.08);
        ctx.strokeStyle="#000";
        ctx.lineCap="round";
        FEATHER_OFFSETS.forEach((factor,index)=>{
          ctx.globalAlpha=index===0||index===FEATHER_OFFSETS.length-1 ? .46 : .72;
          ctx.lineWidth=index%2 ? 1.5 : 2;
          ctx.beginPath();
          ctx.moveTo(startX,y+factor*spread*.45);
          ctx.lineTo(currentX,y+factor*spread);
          ctx.stroke();
        });
      } else if(brush.shape === "mist") {
        const startX=width*.12;
        const endX=width*.88;
        const yBase=height*.52;
        const length=Math.max(0,Math.min(1,progress));
        const steps=Math.max(1,Math.floor(8*length));
        const previewRadius=Math.max(9,Math.min(height*.38,brush.radius*.22));

        for(let i=0;i<=steps;i++) {
          const t=steps ? i/steps : 0;
          const x=startX+(endX-startX)*t;
          const y=yBase+Math.sin(t*Math.PI*1.6)*height*.035;
          const g=ctx.createRadialGradient(
            x-previewRadius*.08,y-previewRadius*.06,0,
            x,y,previewRadius
          );
          g.addColorStop(0,"rgba(0,0,0,.82)");
          g.addColorStop(.35,"rgba(0,0,0,.64)");
          g.addColorStop(.68,"rgba(0,0,0,.26)");
          g.addColorStop(1,"rgba(0,0,0,0)");
          ctx.globalAlpha=opacity;
          ctx.fillStyle=g;
          ctx.beginPath();
          ctx.arc(x,y,previewRadius,0,Math.PI*2);
          ctx.fill();
        }
      } else if(brush.shape === "focus") {
        const startX=width*.15;
        const endX=width*.85;
        const yBase=height*.52;
        const length=Math.max(0,Math.min(1,progress));
        const steps=Math.max(1,Math.floor(10*length));
        const previewRadius=Math.max(7,Math.min(height*.30,brush.radius*.22));

        for(let i=0;i<=steps;i++) {
          const t=steps ? i/steps : 0;
          const x=startX+(endX-startX)*t;
          const y=yBase+Math.sin(t*Math.PI*2)*height*.025;
          const g=ctx.createRadialGradient(x,y,0,x,y,previewRadius);
          g.addColorStop(0,"rgba(0,0,0,1)");
          g.addColorStop(.40,"rgba(0,0,0,1)");
          g.addColorStop(.43,"rgba(0,0,0,.32)");
          g.addColorStop(.72,"rgba(0,0,0,.14)");
          g.addColorStop(1,"rgba(0,0,0,0)");
          ctx.globalAlpha=opacity;
          ctx.fillStyle=g;
          ctx.beginPath();
          ctx.arc(x,y,previewRadius,0,Math.PI*2);
          ctx.fill();
        }
      } else if(brush.shape === "needle") {
        const startX=width*.16;
        const endX=width*.84;
        const y=height*.52;
        const currentX=startX+(endX-startX)*Math.max(0,Math.min(1,progress));

        ctx.globalAlpha=opacity;
        ctx.strokeStyle="#000";
        ctx.lineCap="round";
        ctx.lineWidth=Math.max(2,Math.min(4,brush.radius*.22));
        ctx.beginPath();
        ctx.moveTo(startX,y);
        ctx.lineTo(currentX,y);
        ctx.stroke();
      } else if(brush.shape === "diamond") {
        const startX=width*.15;
        const endX=width*.85;
        const yBase=height*.52;
        const length=Math.max(0,Math.min(1,progress));
        const steps=Math.max(1,Math.floor(7*length));
        const size=Math.max(5,Math.min(height*.21,brush.radius*.22));
        for(let i=0;i<=steps;i++){
          const t=steps ? i/steps : 0;
          const x=startX+(endX-startX)*t;
          const y=yBase+Math.sin(t*Math.PI*2)*height*.035;
          ctx.globalAlpha=opacity;
          traceDiamondPath(ctx,x,y,size);
          ctx.fillStyle="#000";
          ctx.fill();
          ctx.globalAlpha=opacity*.24;
          traceDiamondPath(ctx,x,y,size*.52);
          ctx.fill();
        }
        ctx.globalAlpha=opacity;
      } else if(brush.shape === "squeegee") {
        const startX=width*.16;
        const endX=width*.84;
        const y=height*.52;
        const currentX=startX+(endX-startX)*Math.max(0,Math.min(1,progress));
        const bladeWidth=Math.max(5,height*.13);
        const bladeHeight=Math.max(18,height*.58);
        const left=startX-bladeWidth*.5;
        const trailWidth=Math.max(bladeWidth,currentX-startX+bladeWidth);

        // A faixa já percorrida fica quadrada e larga, deixando óbvio no preview
        // que este estilo não é mais um pincel circular.
        traceRoundedRect(ctx,left,y-bladeHeight*.5,trailWidth,bladeHeight,Math.max(2,bladeWidth*.22));
        ctx.fillStyle="#000";
        ctx.fill();

        // Mostra a posição atual da lâmina do rodo com um núcleo um pouco mais forte.
        ctx.globalAlpha=Math.min(1,opacity+.12);
        traceRoundedRect(ctx,currentX-bladeWidth*.5,y-bladeHeight*.5,bladeWidth,bladeHeight,Math.max(2,bladeWidth*.22));
        ctx.fill();
      } else {
        const startX=width*.14;
        const endX=width*.86;
        const yBase=height*.52;
        const length=Math.max(0,Math.min(1,progress));
        const steps=Math.max(1,Math.floor(18*length));
        const previewRadius=Math.max(4,Math.min(height*.34,brush.radius*.20));
        const texture=getBrushTextureProfile(brush);
        for(let i=0;i<=steps;i++){
          const t=steps ? i/steps : 0;
          const x=startX+(endX-startX)*t;
          const wave=Math.sin(t*Math.PI*2)*height*.055;
          const scatter=brush.scatter||0;
          const sx=(previewNoise(i+key.length*3.1)-.5)*scatter*.34;
          const sy=(previewNoise(i*2.7+key.length*5.2)-.5)*scatter*.34;
          const hard=Math.max(.02,Math.min(.98,brush.hardness||.5));
          const gradient=ctx.createRadialGradient(x+sx,yBase+wave+sy,0,x+sx,yBase+wave+sy,previewRadius);
          gradient.addColorStop(0,`rgba(0,0,0,${texture.core})`);
          gradient.addColorStop(Math.min(.93,.42+hard*.42),`rgba(0,0,0,${texture.mid})`);
          gradient.addColorStop(1,"rgba(0,0,0,0)");
          ctx.fillStyle=gradient;
          ctx.beginPath();
          ctx.arc(x+sx,yBase+wave+sy,previewRadius,0,Math.PI*2);
          ctx.fill();
        }
      }
      ctx.restore();
    }

    function stopStorePreviewCanvas(canvas) {
      if(canvas?._previewFrame) {
        cancelAnimationFrame(canvas._previewFrame);
        canvas._previewFrame=null;
      }
    }

    function animateStorePreviewCanvas(canvas) {
      if(!canvas) return;
      stopStorePreviewCanvas(canvas);

      const key=canvas.dataset.brush;
      const brush=brushes[key];
      if(!brush) return;

      const duration=2000;
      const started=performance.now();

      // Sempre começa do zero quando o cartão entra novamente na tela.
      drawStoreBrushPreview(canvas,brush,key,0);

      const frame=(now)=>{
        if(!canvas.isConnected) {
          canvas._previewFrame=null;
          return;
        }

        const progress=Math.min(1,(now-started)/duration);
        drawStoreBrushPreview(canvas,brush,key,progress);

        if(progress<1) canvas._previewFrame=requestAnimationFrame(frame);
        else canvas._previewFrame=null;
      };

      canvas._previewFrame=requestAnimationFrame(frame);
    }

    function setupStorePreviewAnimations() {
      if(storePreviewObserver) {
        storePreviewObserver.disconnect();
        storePreviewObserver=null;
      }

      const canvases=[...document.querySelectorAll(".store-style-preview-canvas")];
      if(!canvases.length) return;

      // Estado inicial correto mesmo antes do primeiro frame do observer.
      for(const canvas of canvases) {
        const key=canvas.dataset.brush;
        const brush=brushes[key];
        if(brush) drawStoreBrushPreview(canvas,brush,key,0);
      }

      // Cada preview ganha seus próprios 2 segundos somente quando aparece
      // na área visível da loja. Ao sair e voltar, a animação reinicia.
      if("IntersectionObserver" in window) {
        storePreviewObserver=new IntersectionObserver(entries=>{
          for(const entry of entries) {
            const canvas=entry.target;
            if(entry.isIntersecting && entry.intersectionRatio>=.35) {
              if(!canvas._previewVisible) {
                canvas._previewVisible=true;
                animateStorePreviewCanvas(canvas);
              }
            } else {
              canvas._previewVisible=false;
              stopStorePreviewCanvas(canvas);
            }
          }
        },{
          root:document.getElementById("storeScreen"),
          threshold:[0,.35,.75,1]
        });

        for(const canvas of canvases) storePreviewObserver.observe(canvas);
      } else {
        // Fallback para navegadores antigos: preserva a animação de 2 segundos.
        for(const canvas of canvases) animateStorePreviewCanvas(canvas);
      }
    }

    function renderStore() {
      ensureStorePreviewCanvasStyle();
      const grid = document.getElementById("storeGrid"); grid.innerHTML = "";
      Object.keys(brushes)
        .filter(k => k !== WINDSHIELD_BRUSH_KEY || state.windshieldUnlocked)
        .forEach(k => {
        const b = brushes[k];
        const secretWindshield = k === WINDSHIELD_BRUSH_KEY;
        const unlocked = secretWindshield ? state.windshieldUnlocked : unlockedBrushes[k];
        const div = document.createElement("div");
        const equipped = state.brush1 === k || state.brush2 === k;
        div.className = "store-item " + (equipped ? "active" : "");
        div.setAttribute("role","button");
        div.tabIndex=0;
        const action=secretWindshield
          ? (equipped ? t('equipped') : t('owned'))
          : (unlocked ? (equipped ? t('equipped') : t('equip')) : `${t('buy')} · ${b.cost} 🌧️`);

        const previewHtml=`<div class="store-preview animated-style-preview"><canvas class="store-style-preview-canvas" data-brush="${k}" aria-hidden="true"></canvas></div>`;

        div.innerHTML = `${previewHtml}<div class="store-item-title">${localize(b.name)}</div><div class="store-item-desc">${localize(b.desc)}</div><div class="store-item-cost">${action}</div>`;

        div.onclick = () => {
          if (!unlocked) {
            if(state.points < b.cost){ showToast(t('not_enough')); return; }
            state.points -= b.cost;
            unlockedBrushes[k] = true;
            showToast(t('purchased'));
          }
          if(state.selectedBrushSlot===1) state.brush1=k;
          else state.brush2=k;
          saveGame(); updateCoins(); renderStore();
        };
        div.onkeydown = event => { if(event.key==='Enter'||event.key===' '){ event.preventDefault(); div.click(); } };
        grid.appendChild(div);
      });
      updateFingerSlots();
      requestAnimationFrame(setupStorePreviewAnimations);
    }

    function updateFingerSlots() {
      if (!brushes[state.brush1]) state.brush1 = "soft";
      if (!brushes[state.brush2]) state.brush2 = "soft";
      document.getElementById("slot1Name").textContent = localize(brushes[state.brush1].name);
      document.getElementById("slot2Name").textContent = localize(brushes[state.brush2].name);
      document.getElementById("fingerSlot1").classList.toggle("selected",state.selectedBrushSlot===1);
      document.getElementById("fingerSlot2").classList.toggle("selected",state.selectedBrushSlot===2);
    }

    /* ZEN — 10 níveis climáticos reais.
       10% a 90% usam exatamente 10%, 20% ... 90% do pool de chuva.
       Em 100% a chuva vira neve. O áudio e os trovões acompanham a evolução
       usando somente os sons que já existem no Rainy Skyline. */
    const ZEN_CLIMATE = Object.freeze({
      10:{density:.10,speed:.48,length:.58,width:.66,rainAudio:19,rainGain:.42,snow:false,thunder:0,   thunderGain:0,   thunderWeights:[1,0,0,0],             thunderFirst:[24000,32000],thunderNext:[28000,38000]},
      20:{density:.20,speed:.54,length:.64,width:.70,rainAudio:8, rainGain:.46,snow:false,thunder:0,   thunderGain:0,   thunderWeights:[1,0,0,0],             thunderFirst:[22000,30000],thunderNext:[26000,36000]},
      30:{density:.30,speed:.60,length:.70,width:.74,rainAudio:6, rainGain:.50,snow:false,thunder:0,   thunderGain:0,   thunderWeights:[1,0,0,0],             thunderFirst:[20000,28000],thunderNext:[24000,34000]},
      40:{density:.40,speed:.68,length:.76,width:.78,rainAudio:0, rainGain:.54,snow:false,thunder:.04, thunderGain:.42, thunderWeights:[1,0,0,0],             thunderFirst:[18000,26000],thunderNext:[22000,32000]},
      50:{density:.50,speed:.76,length:.82,width:.84,rainAudio:4, rainGain:.58,snow:false,thunder:.07, thunderGain:.52, thunderWeights:[.90,.10,0,0],         thunderFirst:[15000,23000],thunderNext:[18000,29000]},
      60:{density:.60,speed:.84,length:.88,width:.90,rainAudio:1, rainGain:.62,snow:false,thunder:.11, thunderGain:.62, thunderWeights:[.74,.23,.03,0],       thunderFirst:[12000,20000],thunderNext:[15000,25000]},
      70:{density:.70,speed:.94,length:.96,width:.96,rainAudio:3, rainGain:.68,snow:false,thunder:.18, thunderGain:.72, thunderWeights:[.54,.36,.10,0],       thunderFirst:[9000,16000], thunderNext:[12000,20000]},
      80:{density:.80,speed:1.04,length:1.04,width:1.02,rainAudio:2,rainGain:.74,snow:false,thunder:.30, thunderGain:.84, thunderWeights:[.30,.46,.24,0],       thunderFirst:[7000,12000], thunderNext:[9000,16000]},
      90:{density:.90,speed:1.16,length:1.12,width:1.10,rainAudio:5,rainGain:.82,snow:false,thunder:.65, thunderGain:.94, thunderWeights:[.12,.34,.36,.18],     thunderFirst:[4500,8000],  thunderNext:[6000,12000]},
      100:{density:0,speed:1,length:1,width:1,rainAudio:15,rainGain:.82,snow:true,thunder:.85,thunderGain:1,thunderWeights:[.08,.27,.38,.27],thunderFirst:[3500,7000],thunderNext:[5000,10000]}
    });
    function getZenLevel(){
      return Math.max(10,Math.min(100,Math.round(state.rainIntensity*10)*10));
    }
    function getZenClimate(){
      return ZEN_CLIMATE[getZenLevel()] || ZEN_CLIMATE[70];
    }

    function returnToMainMenu(advanceToNext = false) {
      if(thunderTimer) clearTimeout(thunderTimer);
      if(thunderStrikeTimer) { clearTimeout(thunderStrikeTimer); thunderStrikeTimer=null; }
      stopEmbeddedMusic();
      const wasZen=state.isZen;
      if(wasZen) stopEmbeddedPhaseRain();
      state.started=false;
      state.paused=false;
      state.isZen=false;
      if(masterGain&&audioCtx) masterGain.gain.setTargetAtTime(.20,audioCtx.currentTime,.35);
      state.activePointers.clear();
      state.pointerBrushes.clear();
      if(wasZen){
        state.currentPhase=Math.max(0,Math.min(ACTIVE_PHASE_COUNT-1,state.highestPhase,state.campaignPhase));
      } else if(advanceToNext && state.currentPhase < ACTIVE_PHASE_COUNT-1){
        state.currentPhase=Math.min(state.resumePhase ?? state.currentPhase+1,state.highestPhase);
      }
      state.campaignPhase=state.currentPhase;
      state.resumePhase=null;
      updatePhaseUI();
      saveGame();
      document.querySelectorAll('.screen').forEach(screen=>screen.classList.add('hidden'));
      document.getElementById("hud").classList.add("hidden");
      document.getElementById("mainMenu").classList.remove("hidden");
      preloadBackground(state.currentPhase);
    }

    function queueNextFrame() {
      const delay=document.hidden ? 500 : (state.started && !state.paused ? 0 : 180);
      if(delay) setTimeout(()=>requestAnimationFrame(loop),delay);
      else requestAnimationFrame(loop);
    }


    // #endregion
    // #region 14 — GAME LOOP / RENDERIZAÇÃO POR FRAME
    function loop(time) {
      if(lowPowerDevice && time-lastRenderedFrame<32){ queueNextFrame(); return; }
      lastRenderedFrame=time;
      const dt = Math.min((time - state.lastTime) / 1000, 0.1); state.lastTime = time;
      if (state.started && !state.paused) {
        state.elapsed += dt; updateAudio();
        const phase = getActivePhase();
        const movingPhase = phase.type === 'car' || phase.type === 'car_snow';
        if(movingPhase) {
          state.carOffset += dt * 300;
        }
        // Fases estáticas só redesenham quando necessário. Fases de carro,
        // inclusive com arte incorporada, redesenham para o parallax funcionar.
        const carFrameInterval=lowPowerDevice ? 46 : 30;
        if(backgroundDirty || (movingPhase && time-lastBackgroundFrame>carFrameInterval)) {
          drawCityBackground();
          lastBackgroundFrame=time;
        }
        rainCtx.clearRect(0, 0, W, H); glassCtx.clearRect(0, 0, W, H);
        const zenIntensity = getEffectiveRainIntensity();
        const climate = state.isZen ? getZenClimate() : null;

        const isSnowPhase =
          phase.type === "snow" ||
          phase.type === "car_snow" ||
          Boolean(state.isZen && climate?.snow);

        if(state.isZen) updateZenWind(dt, isSnowPhase);

        // =====================================================
        // NEVE — pool dedicado. Não altera a chuva aprovada.
        // =====================================================
        if (isSnowPhase) {
          const activeSnowCount = getSnowActiveCount(phase);

          const snowClipped = clipToPlayableGlass(rainCtx);

          // Fundo -> médio -> primeiro plano.
          for (let depthLayer = 0; depthLayer < 3; depthLayer++) {
            for (let i = 0; i < activeSnowCount; i++) {
              const f = snowFlakes[i];
              if (f.layer !== depthLayer) continue;

              f.update(dt, phase);
              f.draw();
            }
          }

          if (snowClipped) rainCtx.restore();
          if (isCarPhase()) eraseMirrorFromContext(rainCtx);

          // Mantém os flocos fora da área ativa prontos para entrar depois.
          for (let i = activeSnowCount; i < snowFlakes.length; i++) {
            const f = snowFlakes[i];
            if (
              f.y > H + 80 ||
              f.x < -100 ||
              f.x > W + 140
            ) {
              f.reset(false);
            }
          }
        }

        // =====================================================
        // CHUVA — BLOCO APROVADO, preservado.
        // =====================================================
        else if (!isPhase17DryTunnel()) {
          // Cada chuva agora tem quantidade própria. A intensidade (phase.rain)
          // continua importando, mas rainStyle passa a definir a personalidade do mapa.
          const rainProfile = getRainStyleProfile(phase);
          const intensityDensity =
            .32 +
            Math.max(0, Math.min(1, zenIntensity)) * .68;

          const combinedDensity = state.isZen && climate
            ? climate.density
            : Math.max(
                .04,
                Math.min(
                  1,
                  rainProfile.density * intensityDensity
                )
              );

          const rainDensityCurve =
            Math.pow(combinedDensity, 1.08);

          const minimumDrops =
            combinedDensity < .18 ? 14 : 20;

          const activeRainCount = state.isZen && climate
            ? Math.max(1,Math.min(rainParticles.length,Math.round(rainParticles.length*climate.density)))
            : Math.max(
                minimumDrops,
                Math.min(
                  rainParticles.length,
                  Math.round(
                    minimumDrops +
                    rainDensityCurve *
                    (rainParticles.length - minimumDrops)
                  )
                )
              );

          const rainClipped = clipToPlayableGlass(rainCtx);

          // Desenha de trás para frente para a profundidade continuar legível.
          for (let depthLayer = 0; depthLayer < 3; depthLayer++) {
            for (let i = 0; i < activeRainCount; i++) {
              const p = rainParticles[i];
              if (p.layer !== depthLayer) continue;

              p.update(dt);
              p.draw();
            }
          }

          if (rainClipped) rainCtx.restore();
          if (isCarPhase()) eraseMirrorFromContext(rainCtx);

          for (let i = activeRainCount; i < rainParticles.length; i++) {
            if (rainParticles[i].y > H + 80) {
              rainParticles[i].reset();
            }
          }
        }

        if (isPhase17DryTunnel()) {
          drawPhase17DistantRain();
        }

        updateWindshieldWiper(dt);

        if (!isPhase17DryTunnel()) {
          glassDropsSystem.update(dt);
          const glassClipped=clipToPlayableGlass(glassCtx);
          glassDropsSystem.draw(glassCtx);
          if(glassClipped) glassCtx.restore();
          if(isCarPhase()){
            eraseMirrorFromContext(glassCtx);
            drawPermanentMirrorFog(glassCtx);
          }
          if(!state.isZen){
            glassDropsSystem.replenish();
          } else if(Math.random() < 0.015){
            glassDropsSystem.replenish();
          }
        }

        if(state.isZen){
          // Ritmo de regeneração do ACcompleted; visual limitado à névoa original.
          if(state.zenAutoFog) regenerateZenFog(dt);
          updateProgress();
        }
        if(fogVisualDirty) renderFogFromMask();
      }
      queueNextFrame();
    }


    // #endregion
    // #region 15 — EVENT LISTENERS / BOOTSTRAP
    // Event Listeners

    // =========================================================
    // PARABRISA SECRETO — ABRIR / FECHAR TELA
    // Desbloqueia e revela uma única vez após conquistar as 4 Road Stars.
    // =========================================================
    let windshieldSecretContinuation = null;

    function hasPendingWindshieldReveal() {
      return state.windshieldUnlocked && !state.windshieldRevealSeen;
    }

    function showWindshieldSecretScreen(continuation = null) {
      windshieldSecretContinuation = typeof continuation === "function" ? continuation : null;
      document.querySelectorAll(".screen").forEach(screen => screen.classList.add("hidden"));
      document.getElementById("hud").classList.add("hidden");

      const secretScreen = document.getElementById("windshieldSecretScreen");
      if (!secretScreen) {
        const fallback = windshieldSecretContinuation;
        windshieldSecretContinuation = null;
        fallback?.();
        return;
      }

      secretScreen.classList.remove("hidden");
      secretScreen.setAttribute("aria-hidden", "false");
    }

    function maybeShowWindshieldSecretScreen(continuation) {
      if(hasPendingWindshieldReveal()) {
        showWindshieldSecretScreen(continuation);
        return true;
      }
      continuation?.();
      return false;
    }

    function closeWindshieldSecretScreen() {
      const secretScreen = document.getElementById("windshieldSecretScreen");
      if (secretScreen) {
        secretScreen.classList.add("hidden");
        secretScreen.setAttribute("aria-hidden", "true");
      }

      if(hasPendingWindshieldReveal()) {
        state.windshieldRevealSeen = true;
        saveGame();
      }

      const continuation = windshieldSecretContinuation;
      windshieldSecretContinuation = null;
      if(continuation) continuation();
      else returnToMainMenu(false);
    }

    const windshieldSecretContinueBtn = document.getElementById("windshieldSecretContinueBtn");
    if (windshieldSecretContinueBtn) {
      windshieldSecretContinueBtn.onclick = closeWindshieldSecretScreen;
    }

    document.getElementById("continueBtn").onclick = () => { initAudio(); startPhase(state.currentPhase); };
    document.getElementById("zenBtn").onclick = () => { initAudio(); startPhase(state.campaignPhase, true); };
    document.getElementById("phasesBtn").onclick = () => { renderPhases(); document.getElementById("phasesScreen").classList.remove("hidden"); };
    document.getElementById("closePhasesBtn").onclick = () => document.getElementById("phasesScreen").classList.add("hidden");
    document.getElementById("storeBtn").onclick = () => { renderStore(); document.getElementById("storeScreen").classList.remove("hidden"); };
    document.getElementById("closeStoreBtn").onclick = () => {
      document.getElementById("storeScreen").classList.add("hidden");
      if(storePreviewObserver) storePreviewObserver.disconnect();
      document.querySelectorAll(".store-style-preview-canvas").forEach(stopStorePreviewCanvas);
    };
    document.getElementById("fingerSlot1").onclick = () => { state.selectedBrushSlot=1; updateFingerSlots(); };
    document.getElementById("fingerSlot2").onclick = () => { state.selectedBrushSlot=2; updateFingerSlots(); };
    document.getElementById("pauseBtn").onclick = () => {
      state.paused = true;
      if(masterGain&&audioCtx) masterGain.gain.setTargetAtTime(.28,audioCtx.currentTime,.18);
      document.getElementById("zenFogSetting").style.display = state.isZen ? "block" : "none";
      syncToggle("zenFogToggle",state.zenAutoFog);
      document.getElementById("pauseScreen").classList.remove("hidden");
    };
    document.getElementById("resumeBtn").onclick = () => { state.paused = false; if(masterGain&&audioCtx) masterGain.gain.setTargetAtTime(.82,audioCtx.currentTime,.18); document.getElementById("pauseScreen").classList.add("hidden"); };

    let settingsContext = "main";
    function openSettings(context){
      settingsContext = context;
      const fromMain = context === "main";
      const fromZen = context === "zen";
      document.getElementById("languageSettingRow").style.display = fromMain ? "flex" : "none";
      document.getElementById("rainIntensitySetting").style.display = fromZen ? "block" : "none";
      document.getElementById("rainSlider").value = Math.round(state.rainIntensity * 100 / 10) * 10;
      document.getElementById("rainVal").textContent = Math.round(state.rainIntensity * 100 / 10) * 10 + "%";
      document.getElementById("ambSlider").value = Math.round(state.ambVolume * 100);
      document.getElementById("ambVal").textContent = Math.round(state.ambVolume * 100) + "%";
      document.getElementById("rainSoundSlider").value = Math.round(state.rainVolume * 100);
      document.getElementById("rainSoundVal").textContent = Math.round(state.rainVolume * 100) + "%";
      syncToggle("vibrationToggle",state.vibration);
      syncToggle("flashesToggle",state.lightningEnabled);
      syncToggle("gameSoundToggle",state.gameSound);
      syncToggle("musicSoundToggle",state.musicSound);
      if(!fromMain) document.getElementById("pauseScreen").classList.add("hidden");
      document.getElementById("settingsScreen").classList.remove("hidden");
    }
    document.getElementById("settingsBtn").onclick = () => openSettings("main");
    document.getElementById("pauseSettingsBtn").onclick = () => openSettings(state.isZen ? "zen" : "phase");
    document.getElementById("closeSettingsBtn").onclick = () => {
      saveGame();
      document.getElementById("settingsScreen").classList.add("hidden");
      if(settingsContext !== "main") document.getElementById("pauseScreen").classList.remove("hidden");
    };
    document.getElementById("exitMenuBtn").onclick = () => returnToMainMenu(false);
    document.getElementById("nextPhaseBtn").onclick = () => {
      maybeShowWindshieldSecretScreen(() => {
        if(state.currentPhase < ACTIVE_PHASE_COUNT - 1) startPhase(state.resumePhase ?? state.currentPhase + 1);
        else maybeShowCompletionAd(() => returnToMainMenu(false));
      });
    };
    document.getElementById("rewardMenuBtn").onclick = () => {
      maybeShowWindshieldSecretScreen(() => maybeShowCompletionAd(() => returnToMainMenu(true)));
    };

    document.getElementById("langToggleBtn").onclick = () => {
      state.lang = state.lang === 'en' ? 'es' : state.lang === 'es' ? 'pt' : 'en';
      updateTranslations(); saveGame();
    };


    // Atmospheric settings
    document.getElementById('rainSlider').addEventListener('input',e=>{
      const previousZenLevel=getZenLevel();
      state.rainIntensity=Number(e.target.value)/100;
      const nextZenLevel=getZenLevel();
      document.getElementById('rainVal').textContent=nextZenLevel+'%';

      if(state.isZen && previousZenLevel!==nextZenLevel){
        rainParticles.forEach(p=>p.reset(true));
        snowFlakes.forEach(f=>f.reset(true));
        stopEmbeddedPhaseRain();
        if(audioCtx) syncEmbeddedPhaseRain();

        if(thunderTimer){ clearTimeout(thunderTimer); thunderTimer=null; }
        if(thunderStrikeTimer){ clearTimeout(thunderStrikeTimer); thunderStrikeTimer=null; }
        const flash=document.getElementById('lightningFlash');
        if(flash) flash.style.opacity=0;
        if(state.started && !state.paused) startThunderSchedule(true);
      }

      updateAudio();
      saveGame();
    });
    document.getElementById('ambSlider').addEventListener('input',e=>{state.ambVolume=Number(e.target.value)/100;document.getElementById('ambVal').textContent=Math.round(state.ambVolume*100)+'%';updateAudio();saveGame();});
    document.getElementById('rainSoundSlider').addEventListener('input',e=>{state.rainVolume=Number(e.target.value)/100;document.getElementById('rainSoundVal').textContent=Math.round(state.rainVolume*100)+'%';updateAudio();saveGame();});
    document.getElementById('vibrationToggle').onclick=()=>{state.vibration=!state.vibration;syncToggle("vibrationToggle",state.vibration);saveGame();};
    document.getElementById('flashesToggle').onclick=()=>{
      state.lightningEnabled=!state.lightningEnabled;

      if(!state.lightningEnabled){
        if(thunderTimer){
          clearTimeout(thunderTimer);
          thunderTimer=null;
        }

        if(thunderStrikeTimer){
          clearTimeout(thunderStrikeTimer);
          thunderStrikeTimer=null;
        }

        const flash=document.getElementById('lightningFlash');
        if(flash) flash.style.opacity=0;

        if(thunderGain&&audioCtx){
          thunderGain.gain.setTargetAtTime(0,audioCtx.currentTime,.03);
        }
      } else {
        updateAudio();

        if(state.started){
          startThunderSchedule(true);
        }
      }

      syncToggle("flashesToggle",state.lightningEnabled);
      saveGame();
    };
    document.getElementById('gameSoundToggle').onclick=()=>{state.gameSound=!state.gameSound;syncToggle("gameSoundToggle",state.gameSound);updateAudio();saveGame();};
    document.getElementById('musicSoundToggle').onclick=()=>{state.musicSound=!state.musicSound;syncToggle("musicSoundToggle",state.musicSound);updateAudio();saveGame();};
    document.getElementById('zenFogToggle').onclick=()=>{
      if(!state.isZen) return;
      state.zenAutoFog=!state.zenAutoFog;
      zenFogRegenAccumulator=0;
      zenFogDiffuseTick=0;
      touchStartTime=null;
      isFingerDown=false;
      zenMaskCleanupTimer=0.0;
      zenFinalSnapTimer=0.0;
      syncToggle("zenFogToggle",state.zenAutoFog);
      updatePhaseUI();
      saveGame();
    };
    document.getElementById('zenMistBtn').onclick=()=>{
      if(!state.isZen || state.zenAutoFog) return;
      initFog();
      state.zenScore=0;
      updateProgress();
    };

    document.addEventListener("visibilitychange",()=>{
      state.lastTime=performance.now();
      if(document.hidden){
        saveGame();
        if(audioCtx?.state==='running') audioCtx.suspend().catch(()=>{});
      } else if(state.started && !state.paused && audioCtx?.state==='suspended') {
        audioCtx.resume().catch(()=>{});
      }
    });
    window.addEventListener("pagehide",saveGame);

    // Init + Splash Zanon
    window.addEventListener("load", () => {
      loadGame(); validateLocalization(); updateTranslations();
      document.getElementById("rainSlider").value=Math.round(state.rainIntensity*100/10)*10; document.getElementById("rainVal").textContent=Math.round(state.rainIntensity*100/10)*10+"%";
      document.getElementById("ambSlider").value=Math.round(state.ambVolume*100); document.getElementById("ambVal").textContent=Math.round(state.ambVolume*100)+"%";
      document.getElementById("rainSoundSlider").value=Math.round(state.rainVolume*100); document.getElementById("rainSoundVal").textContent=Math.round(state.rainVolume*100)+"%";
      syncToggle("vibrationToggle",state.vibration);
      syncToggle("flashesToggle",state.lightningEnabled);
      syncToggle("gameSoundToggle",state.gameSound);
      syncToggle("musicSoundToggle",state.musicSound);
      resize();
      document.getElementById('mainMenu').classList.remove('hidden');
      preloadBackground(state.currentPhase);
      requestAnimationFrame(loop);

      // ZANON: permanece totalmente visível por 1 segundo e então faz
      // um fade curto. O jogo já inicializa atrás dela, sem atrasar o boot.
      const zanonSplash = document.getElementById("zanonSplash");
      if(zanonSplash){
        setTimeout(() => {
          zanonSplash.classList.add("fade-out");
          setTimeout(() => zanonSplash.remove(), 380);
        }, 1000);
      }

      // Se o save já tinha as 4 Road Stars antes desta recompensa existir,
      // revela o segredo uma única vez após a splash.
      if(hasPendingWindshieldReveal()) {
        setTimeout(() => {
          if(hasPendingWindshieldReveal() && !state.started) showWindshieldSecretScreen();
        }, 1450);
      }

    // Fim da inicialização. O código funcional acima permanece byte-a-byte
    // igual ao original, exceto pelos comentários de organização inseridos.
      window.__RAINY_SKYLINE_READY__ = true;
    }, { once:true });

    // #endregion — FIM DO JAVASCRIPT PRINCIPAL