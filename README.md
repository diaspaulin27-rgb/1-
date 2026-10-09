# 1% — projeto organizado

Esta versão separa o arquivo monolítico em arquivos menores, mantendo o código do jogo e a correção de áudio baseada em Web Audio.

## Estrutura

```text
1-percent-organizado/
├── index.html                 # estrutura da interface
├── css/
│   └── style.css              # estilos
├── js/
│   └── game.js                # lógica completa do jogo
├── assets/                    # preserve os assets que já estão no GitHub
├── backup/
│   └── index_original_audio_corrigido.html  # cópia de segurança original
└── README.md
```

## Importante antes de publicar

1. Faça upload dos arquivos extraídos para a raiz do repositório, mantendo os caminhos `index.html`, `css/style.css` e `js/game.js`.
2. **Não apague a pasta `assets/` já existente no repositório.** O ZIP inclui apenas um aviso nessa pasta, não os arquivos binários originais de imagens e sons.
3. O `index.html` agora carrega o CSS por `css/style.css` e o JavaScript por `js/game.js`. Portanto, os três arquivos precisam ficar exatamente nesses caminhos relativos.
4. `backup/index_original_audio_corrigido.html` é uma cópia de segurança; o site não a utiliza.
5. Teste o site publicado em iPhone e Android antes de considerar a mudança pronta. A verificação feita neste pacote é estática/sintática; não substitui o teste real no navegador.

## Organização por enquanto

Para reduzir risco, esta primeira etapa separa CSS e JavaScript sem reescrever a lógica interna do jogo. Depois de confirmar que a versão publicada funciona, podemos dividir `js/game.js` em módulos menores (áudio, interface, loja, gameplay etc.) um por vez.
