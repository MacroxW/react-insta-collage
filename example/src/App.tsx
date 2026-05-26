import React, { useRef, useState } from 'react';
import InstaCollageExample from './InstaCollageExample';
import previewPoster from './assets/preview.png';
import previewVideo from './assets/preview.mp4';

const INSTALL_CODE = `pnpm add react-insta-collage`;

const BASIC_USAGE = `import { InstaCollage, useInstaCollageStories, type UserStoryData } from 'react-insta-collage';

const userStories: UserStoryData[] = [
  {
    username: 'camiquindi',
    profileImage: 'https://example.com/avatar.jpg',
    slides: [
      {
        id: 'story-1',
        createdAt: '2026-05-26T14:20:00Z',
        background: {
          type: 'image',
          url: 'https://example.com/background.jpg',
        },
        elements: [
          {
            type: 'text',
            text: 'Hola Instagram',
            x: 0.5,
            y: 0.3,
            style: { font: 'strong', size: 42, color: '#FFFFFF', align: 'center' },
          },
          { type: 'mention', username: 'usuario', x: 0.3, y: 0.7 },
          { type: 'hashtag', tag: '#travel', x: 0.7, y: 0.7 },
          {
            type: 'custom',
            name: 'voting',
            x: 0.5,
            y: 0.82,
            props: {
              question: '¿Qué hacemos mañana?',
              options: [
                { id: 'beach', label: 'Playa', votes: 124 },
                { id: 'city', label: 'Ciudad', votes: 48 },
              ],
              selectedOptionId: 'beach',
            },
          },
        ],
      },
    ],
  },
];

function App() {
  const stories = useInstaCollageStories(userStories, {
    initialUserIndex: 0,
    maxSlides: 10,
  });

  return (
    <InstaCollage {...stories.collageProps} />
  );
}`;

const STORY_DATA_EXAMPLE = `interface UserStoryData {
  username: string;
  profileImage: string;
  slides: StorySlideData[];
  isLoading?: boolean;
}

interface StorySlideData {
  id: string;
  createdAt: string;
  expiresAt?: string;
  background: {
    type: 'image' | 'video';
    url: string;
  };
  elements?: StoryElement[];
}`;

const PROPS_TABLE = [
  { prop: 'left', type: 'StoryData[]', desc: 'Historias que aparecen a la izquierda del centro.' },
  { prop: 'center', type: 'MainStoryData', desc: 'La slide activa con background, elementos, progreso y metadata.' },
  { prop: 'right', type: 'StoryData[]', desc: 'Historias que aparecen a la derecha del centro.' },
  { prop: 'renderElement', type: '(element) => ReactNode', desc: 'Render opcional para elementos custom como voting.' },
  { prop: 'onPrev', type: '() => void', desc: 'Controla el retroceso o esconde la flecha si no existe.' },
  { prop: 'onNext', type: '() => void', desc: 'Controla avance manual y avance automatico.' },
  { prop: 'onSelectLeft', type: '(index) => void', desc: 'Permite saltar a una historia lateral izquierda.' },
  { prop: 'onSelectRight', type: '(index) => void', desc: 'Permite saltar a una historia lateral derecha.' },
  { prop: 'className', type: 'string', desc: 'Clase opcional para adaptar el contenedor.' },
];

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = 'tsx' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-neutral-800/80 bg-[#0d1117]">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/60 border-b border-neutral-800/60">
        <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="text-[11px] font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Copied
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-[13px] leading-relaxed overflow-x-auto text-neutral-300 font-mono no-scrollbar">
        <code>{code}</code>
      </pre>
    </div>
  );
};

function App() {
  const demoRef = useRef<HTMLElement>(null);

  return (
    <div className="bg-[#060608] text-white min-h-screen font-sans selection:bg-pink-500/30">
      <nav className="sticky top-0 z-40 bg-[#060608]/80 backdrop-blur-xl border-b border-neutral-800/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="white"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
            </div>
            <span className="font-bold text-lg tracking-tight">react-insta-collage</span>
            <span className="text-[10px] font-semibold bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400 border border-pink-500/20 px-2 py-0.5 rounded-full tracking-wider uppercase">v1.0</span>
          </div>

          <div className="flex items-center gap-1">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-neutral-400 hover:text-white transition-colors p-2"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
          </div>
        </div>
      </nav>

      <div className="animate-[fadeIn_0.3s_ease-out]">
        <section className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_50%_0%,rgba(236,72,153,0.22),transparent_34%),linear-gradient(180deg,rgba(147,51,234,0.12),transparent_70%)] pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-16">
            <div className="hero-stage relative overflow-hidden rounded-[28px] border border-white/10 bg-neutral-950 shadow-2xl shadow-black/50">
              <video
                className="min-h-[560px] w-full object-cover opacity-70 sm:min-h-[620px]"
                src={previewVideo}
                poster={previewPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,8,0.15),rgba(6,6,8,0.48)_42%,rgba(6,6,8,0.94)),radial-gradient(circle_at_50%_22%,transparent,rgba(6,6,8,0.72)_72%)]" />

              <div className="absolute inset-x-0 bottom-0 px-5 pb-6 sm:px-8 sm:pb-9 lg:px-12 lg:pb-12">
                <div className="mx-auto max-w-4xl text-center">
                  <div className="hero-kicker mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-1.5 backdrop-blur-xl">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-medium text-neutral-200">Open Source - MIT Licensed</span>
                  </div>

                  <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.02] mb-6">
                    <span className="bg-gradient-to-r from-white via-white to-neutral-300 bg-clip-text text-transparent">Instagram Stories</span>
                    <br />
                    <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-fuchsia-300 bg-clip-text text-transparent">for React</span>
                  </h1>

                  <p className="hero-copy text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                    Componente de collage de historias estilo Instagram con transiciones fluidas,
                    navegacion por teclado y View Transitions API.
                  </p>

                  <div className="hero-actions flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => demoRef.current?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-white text-neutral-950 hover:bg-neutral-100 font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-white/10 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                      Ver Demo en Vivo
                    </button>
                    <div className="flex items-center justify-center bg-black/45 border border-white/12 rounded-xl px-5 py-3 font-mono text-sm text-neutral-200 gap-3 backdrop-blur-xl">
                      <span className="text-pink-300">$</span>
                      <span>pnpm install react-insta-collage</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(INSTALL_CODE)}
                        className="text-neutral-400 hover:text-white transition-colors cursor-pointer ml-1"
                        title="Copiar comando"
                      >
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="below-section reveal">
          <div className="below-section-header">
            <div>
              <p>Pensado para stories reales</p>
              <h2>Todo lo dificil ya viene resuelto</h2>
            </div>
            <p>
              Un visor elegante, responsive y controlable desde tu estado de React, listo para imagenes, videos y transiciones fluidas.
            </p>
          </div>
          <div className="feature-panel-grid">
            {[
              { icon: '01', title: 'Movimiento nativo', desc: 'Usa View Transitions para que el cambio entre historias se sienta continuo y moderno.' },
              { icon: '02', title: 'Video e imagen', desc: 'Detecta media mixto y mantiene la experiencia consistente entre formatos.' },
              { icon: '03', title: 'Control total', desc: 'Vos decidis como avanzar, retroceder, saltar usuarios o cerrar el visor.' },
              { icon: '04', title: 'Responsive', desc: 'Collage amplio en desktop y visor concentrado en pantallas chicas.' },
            ].map((feature) => (
              <div key={feature.icon} className="feature-panel reveal-item">
                <span>{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="below-section docs-section">
          <div className="below-section-header reveal">
            <div>
              <p>Developer experience</p>
              <h2>Instala, conecta y controla.</h2>
            </div>
            <p>
              La API trabaja con slides reales: background, fecha de creacion y elementos posicionables como texto, menciones, links, encuestas y musica.
            </p>
          </div>

          <div className="docs-layout">
            <div className="doc-panel reveal">
              <h2 className="text-xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold">1</span>
                Instalacion
              </h2>
              <p className="text-neutral-400 text-sm mb-4 ml-11">Instala el paquete y sumalo a tu app en segundos.</p>
              <div className="ml-11">
                <CodeBlock code={INSTALL_CODE} language="bash" />
              </div>
            </div>

            <div className="doc-panel reveal">
              <h2 className="text-xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-bold">2</span>
                Uso basico
              </h2>
              <p className="text-neutral-400 text-sm mb-4 ml-11">Trae tus stories desde una API, conectalas al hook y pasa las props al collage.</p>
              <div className="ml-11">
                <CodeBlock code={BASIC_USAGE} />
              </div>
            </div>

            <div className="doc-panel doc-panel-wide reveal">
              <h2 className="text-xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-300 text-sm font-bold">3</span>
                Modelo de datos
              </h2>
              <p className="text-neutral-400 text-sm mb-4 ml-11">Cada slide representa una composicion completa con media de fondo y elementos renderizados encima.</p>
              <div className="ml-11">
                <CodeBlock code={STORY_DATA_EXAMPLE} />
              </div>
            </div>

            <div className="doc-panel doc-panel-wide reveal">
              <h2 className="text-xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-sm font-bold">4</span>
                API esencial
              </h2>
              <p className="text-neutral-400 text-sm mb-4 ml-11">Las props clave de <code className="text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded text-xs font-mono">{`<InstaCollage />`}</code>, organizadas para leer rapido.</p>
              <div className="api-card-grid">
                {PROPS_TABLE.map((row) => (
                  <div key={row.prop} className="api-card">
                    <div>
                      <code>{row.prop}</code>
                      <span>{row.type}</span>
                    </div>
                    <p>{row.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <InstaCollageExample ref={demoRef} />
      </div>
    </div>
  );
}

export default App;
