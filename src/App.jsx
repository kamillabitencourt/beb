import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("start");
  const [progress, setProgress] = useState(0);
  const [showBalloons, setShowBalloons] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicBlocked, setMusicBlocked] = useState(false);

  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const loadingTimeoutRef = useRef(null);

  const photos = [
    { src: `${import.meta.env.BASE_URL}fotos/foto1.jpg`, caption: "essa aqui explica muita coisa." },
    { src: `${import.meta.env.BASE_URL}fotos/foto2.jpg`, caption: "essa eu vou guardar com carinho." },
    { src: `${import.meta.env.BASE_URL}fotos/foto3.jpg`, caption: "bons tempos que viraram memória." },
    { src: `${import.meta.env.BASE_URL}fotos/foto4.png`, caption: "essa aqui não poderia faltar" },
    { src: `${import.meta.env.BASE_URL}fotos/foto5.jpg`, caption: "essa aqui provando que voce sempre é belissimo" },
    { src: `${import.meta.env.BASE_URL}fotos/foto6.jpg`, caption: "e que venham muitas outras. pq tudo do seu lado é bom demais" },
  ];

  const startSystem = () => {
    setScreen("loading");
    setProgress(0);
    setShowBalloons(false);

    let value = 0;
    clearInterval(intervalRef.current);
    clearTimeout(loadingTimeoutRef.current);

    intervalRef.current = setInterval(() => {
      value += 5;
      setProgress(value);

      if (value >= 100) {
        clearInterval(intervalRef.current);
        loadingTimeoutRef.current = setTimeout(() => {
          setScreen("memories");
        }, 700);
      }
    }, 150);
  };

  const nextScreen = () => setScreen("diagnostic");

  const playMusic = () => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.15;

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setMusicBlocked(false);
      })
      .catch(() => {
        setIsPlaying(false);
        setMusicBlocked(true);
      });
  };

  const runDiagnostic = () => {
    clearInterval(intervalRef.current);
    clearTimeout(loadingTimeoutRef.current);

    setScreen("final");
    setShowBalloons(true);
    setMusicBlocked(false);
    setIsPlaying(false);

    setTimeout(() => playMusic(), 300);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      playMusic();
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const restart = () => {
    clearInterval(intervalRef.current);
    clearTimeout(loadingTimeoutRef.current);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setScreen("start");
    setProgress(0);
    setShowBalloons(false);
    setIsPlaying(false);
    setMusicBlocked(false);
  };

  return (
    <main className="app">
      <div className="background-shape shape-one" />
      <div className="background-shape shape-two" />

      {showBalloons && (
        <div className="balloons" aria-hidden="true">
          <span className="balloon balloon-one">🎈</span>
          <span className="balloon balloon-two">🎈</span>
          <span className="balloon balloon-three">🎈</span>
          <span className="balloon balloon-four">🎈</span>
          <span className="balloon balloon-five">🎈</span>
          <span className="balloon balloon-six">🎈</span>
        </div>
      )}

      <div className="window">
        <header className="window-header">
          <div className="window-dots">
            <span />
            <span />
            <span />
          </div>
          <span className="window-title">amizade.exe</span>
          <span className="version">v1.0</span>
        </header>

        <div className="content">

          {screen === "start" && (
            <section className="screen start-screen">
              <div className="icon-circle"><span>✦</span></div>

              <span className="eyebrow">FRIENDSHIP SYSTEM // 09.09</span>

              <h1>
                Um grande amigo
                <br />
                foi detectado.
              </h1>

              <p className="description">
                Eu poderia simplesmente mandar
                <br />
                “feliz aniversário”, mas achei pouco.
              </p>

              <div className="soft-alert">
                <span>♡</span>
                <p>
                  Então fiz isso aqui.
                  <br />
                  porque você merece MUITO mais.
                </p>
              </div>

              <button className="primary-button" onClick={startSystem}>
                Iniciar <span>→</span>
              </button>
            </section>
          )}

          {screen === "loading" && (
            <section className="screen loading-screen">
              <div className="loader"><span>{progress}%</span></div>

              <span className="eyebrow">ANALISANDO A AMIZADE DOS BEBS...</span>

              <h2>só um minutinho.</h2>

              <p className="terminal-text">
                {progress < 15 && "> iniciando protocolo..."}
                {progress >= 15 && progress < 30 && "> carregando memórias..."}
                {progress >= 30 && progress < 45 && "> procurando fotos vergonhosas..."}
                {progress >= 45 && progress < 60 && "> encontradas memórias demais..."}
                {progress >= 60 && progress < 75 && "> calculando nível de perturbação..."}
                {progress >= 75 && progress < 90 && "> verificando se você ainda me aguenta..."}
                {progress >= 90 && progress < 100 && "> resultado: aparentemente sim..."}
                {progress >= 100 && "> adicionando carinho..."}
              </p>

              <div className="progress-bar">
                <div style={{ width: `${progress}%` }} />
              </div>

              <span className="loading-note">
                por favor, aguarde enquanto o sistema
                <br />
                tenta resumir muitas bobices.
              </span>
            </section>
          )}

          {screen === "memories" && (
            <section className="screen memories-screen">
              <span className="eyebrow">MEMORY DATABASE</span>

              <h2>
                algumas memórias
                <br />
                que eu gosto de guardar.
              </h2>

              <p className="description memories-intro">
                Não caberia aqui tudo que a gente já viveu,
                <br />
                então tive que escolher algumas.
              </p>

              <div className="photo-grid">
                {photos.map((photo, index) => (
                  <figure className={`memory-photo photo-${index + 1}`} key={photo.src}>
                    <img src={photo.src} alt={`Memória ${index + 1}`} />
                    <figcaption>{photo.caption}</figcaption>
                  </figure>
                ))}
              </div>

              <button className="primary-button" onClick={nextScreen}>
                Continuar <span>→</span>
              </button>
            </section>
          )}

          {screen === "diagnostic" && (
            <section className="screen diagnostic-screen">
              <span className="eyebrow">FRIENDSHIP REPORT</span>

              <h2>
                diagnóstico final:
                <br />
                você é um ótimo amigo.
              </h2>

              <div className="diagnostic-box">
                <div className="diagnostic-row">
                  <span>Nível de perturbação</span>
                  <strong>ALTO</strong>
                </div>

                <div className="diagnostic-row">
                  <span>Capacidade de ser bobos</span>
                  <strong>100%</strong>
                </div>

                <div className="diagnostic-row">
                  <span>Memórias acumuladas</span>
                  <strong className="yellow">INCONTÁVEIS</strong>
                </div>

                <div className="diagnostic-row">
                  <span>Chance de continuar te perturbando</span>
                  <strong className="danger">100%</strong>
                </div>
              </div>

              <p className="description diagnostic-text">
                Brincadeiras à parte,
                <br />
                é muito bom ter você por perto.
                <br />
                E espero que você saiba o quanto é querido.
              </p>

              <button className="primary-button" onClick={runDiagnostic}>
                Abrir mensagem <span>→</span>
              </button>
            </section>
          )}

          {screen === "final" && (
            <section className="screen final-screen">
              <audio
                ref={audioRef}
                src={`${import.meta.env.BASE_URL}music/viva.mp3`}
                loop
                preload="auto"
              />

              <div className="success-icon">✓</div>

              <span className="eyebrow">UPDATE COMPLETE</span>

              <h1>Feliz aniversário 🤍</h1>

              <div className="music-player-wrapper">
                <p className="music-hint">
                  {musicBlocked
                    ? "🔊 toca aqui pra ouvir..."
                    : "🔊 aumenta o som só um pouquinho..."}
                </p>

                <button
                  className={`music-player ${isPlaying ? "playing" : ""}`}
                  onClick={toggleMusic}
                  aria-label={isPlaying ? "Pausar música" : "Tocar música"}
                >
                  <span className="music-play">{isPlaying ? "Ⅱ" : "▶"}</span>

                  <span className="music-details">
                    <span className="music-title">Viva</span>
                    <span className="music-artist">Zimbra · só pra acompanhar</span>
                  </span>

                  <span className="music-bars">
                    <i /><i /><i /><i />
                  </span>
                </button>
              </div>

              <div className="final-card">
                <p>Oi beb!!</p>

                <p>
                  Só queria te desejar um  feliz aniversário,
                  cheio de coisas boas, risadas e momentos que valham a pena.
                </p>

                <p>
                  Obrigada por todas as conversas,
                  pelas bobeirinhas e por todos os momentos que acabaram
                  virando memória.
                </p>

                <p>
                  No meio de tanta gente que passa pela vida,
                  <br />
                  é muito bom ter alguém que fica. Você foi uma das melhores coisas que me aconteceu nos último tempos 
                </p>

                <div className="divider" />

                <p>
                  feliz aniversário,beb!
                  Amo muito você!!! 🫶🏻
                </p>

                <span className="small-final">
                  que esse novo ciclo seja tão lindo quanto você.
                </span>
              </div>

              <p className="signature">
                sistema desenvolvido sem necessidade alguma,
                <br />
                mas com bastante consideração.
              </p>

              <p className="final-system-message">
                desenvolvido por uma bobona que ama muito você!
                <br />
                              </p>

              <button className="restart-button" onClick={restart}>
                executar novamente
              </button>
            </section>
          )}

        </div>

        <footer className="window-footer">
          <span>● ONLINE</span>
          <span>09.09.2026</span>
        </footer>
      </div>
    </main>
  );
}

export default App;
