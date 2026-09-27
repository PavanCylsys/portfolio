import { useState } from 'react'
import './App.css'

const apologyData = {
  friendName: 'Friend',
  memories: [
    {
      title: 'The good moments',
      text: 'Some moments were small when they happened, but they somehow stayed with me longer than I expected.'
    },
    {
      title: 'The stupid moments 😂',
      text: 'I know I can be careless, impulsive, and a little messy when I should have been gentler.'
    },
    {
      title: 'The random conversations',
      text: 'The weird little chats and the things we talked about still feel like a part of me.'
    },
    {
      title: 'The moments I still remember',
      text: 'Even now, the ones that mattered most are the ones that made me feel close to you.'
    }
  ],
  finalMessage: `
    I can't undo what happened.

    But I can promise you this: I understand why it hurt, and I am deeply sorry.

    I care about you more than I handled poorly, and I wish I had shown that with more honesty, patience, and care.

    You deserve kindness, and I want to do better.
  `
}

function ProgressBar({ label, value, total }) {
  const percentage = Math.min((value / total) * 100, 100)

  return (
    <div className="progress-wrap">
      <div className="progress-header">
        <span className="quest-badge">❤️ Apology Quest</span>
        <span className="progress-label">{label}</span>
      </div>
      <div className="progress-bar" aria-label="Apology journey progress">
        <span style={{ width: `${percentage}%` }} />
      </div>
      <div className="progress-percent">{Math.round(percentage)}%</div>
    </div>
  )
}

function ParticleBackground() {
  const particles = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    left: `${(index * 17) % 100}%`,
    top: `${(index * 23) % 100}%`,
    delay: `${(index % 6) * 0.7}s`,
    duration: `${6 + (index % 7)}s`,
    size: `${4 + (index % 5)}px`,
    opacity: 0.2 + (index % 5) * 0.12,
    kind: index % 2 === 0 ? 'heart' : 'star'
  }))

  return (
    <div className="particle-bg" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={`particle ${particle.kind}`}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            opacity: particle.opacity
          }}
        />
      ))}
    </div>
  )
}

function MusicToggle({ isMuted, onToggle }) {
  return (
    <button
      type="button"
      className={`music-toggle ${isMuted ? '' : 'active'}`}
      onClick={onToggle}
      aria-label={isMuted ? 'Turn sound on' : 'Turn sound off'}
    >
      {isMuted ? '🔇' : '🔊'} {isMuted ? 'Sound off' : 'Sound on'}
    </button>
  )
}

function WelcomeScreen({ onStart, isMuted, onToggleMusic }) {
  return (
    <div className="screen-shell welcome-shell">
      <ParticleBackground />
      <div className="floating-orb orb-one" />
      <div className="floating-orb orb-two" />
      <MusicToggle isMuted={isMuted} onToggle={onToggleMusic} />

      <div className="welcome-card glass-card">
        <p className="eyebrow">For {apologyData.friendName}</p>
        <h1>Hey... I made something for you ❤️</h1>
        <p className="lead">
          I know I messed up.
          <br />
          So instead of sending you another boring “I’m sorry” message...
          <br />
          I made this little journey for you.
        </p>
        <button type="button" className="primary-btn" onClick={onStart}>
          Start the Journey →
        </button>
      </div>
    </div>
  )
}

function Chapter({ title, subtitle, children, footer }) {
  return (
    <div className="chapter-shell">
      <div className="chapter-card glass-card">
        <p className="chapter-kicker">{title}</p>
        <h2>{subtitle}</h2>
        {children}
        {footer ? <div className="chapter-footer">{footer}</div> : null}
      </div>
    </div>
  )
}

function Journey({ onRestart, isMuted, onToggleMusic }) {
  const [chapter, setChapter] = useState(0)
  const [memoryOpen, setMemoryOpen] = useState(null)
  const [finalChoice, setFinalChoice] = useState(null)
  const [angryPosition, setAngryPosition] = useState({ x: 0, y: 0 })

  const chapterCount = 5
  const progressValue = chapter >= chapterCount ? chapterCount : chapter + 1
  const progressLabel =
    chapter === chapterCount ? 'FINAL LEVEL ❤️' : `Chapter ${Math.min(chapter + 1, chapterCount)} / ${chapterCount}`

  const goNext = () => setChapter((current) => current + 1)

  const handleAngryHover = () => {
    setAngryPosition({
      x: Math.floor(Math.random() * 28) - 14,
      y: Math.floor(Math.random() * 18) - 9
    })
  }

  const renderFinalResponse = () => {
    if (finalChoice === 'talk') {
      return (
        <div className="final-response show">
          <p>That means more than you know ❤️</p>
        </div>
      )
    }

    if (finalChoice === 'time') {
      return (
        <div className="final-response show">
          <p>
            I understand.
            <br />
            Take all the time you need.
            <br />
            I’ll respect that.
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <div className="screen-shell journey-shell">
      <ParticleBackground />
      <MusicToggle isMuted={isMuted} onToggle={onToggleMusic} />
      <div className="journey-wrapper">
        <ProgressBar label={progressLabel} value={progressValue} total={chapterCount} />

        {chapter === 0 && (
          <Chapter
            title="Chapter 1 / 5"
            subtitle="Okay... I know I messed up."
            footer={
              <button type="button" className="primary-btn" onClick={goNext}>
                I admit it 😔
              </button>
            }
          >
            <p className="chapter-copy">Let’s start with the obvious...</p>
            <div className="reveal-box">Yes. I messed up.</div>
          </Chapter>
        )}

        {chapter === 1 && (
          <Chapter
            title="Chapter 2 / 5"
            subtitle="No excuses."
            footer={
              <div className="choice-grid">
                {['It was my fault', 'I should have handled it better', 'Okay... I really messed up'].map((answer) => (
                  <button key={answer} type="button" className="choice-btn" onClick={goNext}>
                    {answer}
                  </button>
                ))}
              </div>
            }
          >
            <p className="chapter-copy">I’m not here to make excuses.</p>
            <div className="mini-success">Correct answer. You have successfully completed Level 2 😅</div>
          </Chapter>
        )}

        {chapter === 2 && (
          <Chapter
            title="Chapter 3 / 5"
            subtitle="A few memories, if I’m honest."
            footer={
              <button type="button" className="primary-btn" onClick={goNext}>
                One more thing →
              </button>
            }
          >
            <div className="memory-grid">
              {apologyData.memories.map((memory) => (
                <button
                  key={memory.title}
                  type="button"
                  className={`memory-card ${memoryOpen === memory.title ? 'selected' : ''}`}
                  onClick={() => setMemoryOpen(memory.title)}
                >
                  <span>{memory.title}</span>
                  {memoryOpen === memory.title && <p>{memory.text}</p>}
                </button>
              ))}
            </div>
          </Chapter>
        )}

        {chapter === 3 && (
          <Chapter
            title="Chapter 4 / 5"
            subtitle="The actual apology."
            footer={
              <button type="button" className="primary-btn" onClick={goNext}>
                I mean this ❤️
              </button>
            }
          >
            <div className="apology-scene">
              <div className="typewriter">I could write a hundred explanations...</div>
              <div className="apology-lines">
                <p>But honestly,</p>
                <p>I don’t want to explain it away.</p>
                <p>I hurt you.</p>
                <p>And I’m genuinely sorry.</p>
                <p className="strong-line">You didn’t deserve that.</p>
              </div>
              <div className="heart-glow" aria-hidden="true">
                ❤
              </div>
            </div>
          </Chapter>
        )}

        {chapter === 4 && (
          <Chapter
            title="Chapter 5 / 5"
            subtitle="Okay... serious question."
            footer={
              <div className="game-actions">
                <button type="button" className="primary-btn secondary" onClick={() => setChapter(5)}>
                  Maybe...
                </button>
                <button
                  type="button"
                  className="choice-btn danger"
                  onMouseEnter={handleAngryHover}
                  onClick={() => {
                    setAngryPosition({ x: 0, y: 0 })
                    setChapter(5)
                  }}
                  style={{ transform: `translate(${angryPosition.x}px, ${angryPosition.y}px)` }}
                >
                  I&apos;m still mad 😤
                </button>
              </div>
            }
          >
            <p className="chapter-copy">Do I get at least one tiny chance to make things right?</p>
            <div className="mini-success">Fair enough 😭 I probably deserve that.</div>
            <button type="button" className="inline-btn" onClick={() => setChapter(5)}>
              Okay, one last thing...
            </button>
          </Chapter>
        )}

        {chapter === 5 && (
          <div className="final-stage">
            <div className="final-card glass-card">
              <p className="final-badge">FINAL LEVEL ❤️</p>
              <h2>I can&apos;t undo what happened.</h2>
              <p>But I can promise that I understand why it hurt.</p>
              <p>And I&apos;m sorry.</p>

              <div className="final-letter">
                <p>{apologyData.finalMessage}</p>
              </div>

              <div className="choice-section">
                <p className="what-next">What happens next?</p>
                {!finalChoice ? (
                  <div className="choice-grid final-grid">
                    <button type="button" className="choice-btn" onClick={() => setFinalChoice('talk')}>
                      ❤️ Let&apos;s talk
                    </button>
                    <button type="button" className="choice-btn" onClick={() => setFinalChoice('time')}>
                      🌸 I need some time
                    </button>
                  </div>
                ) : (
                  renderFinalResponse()
                )}
              </div>

              <button type="button" className="primary-btn replay-btn" onClick={onRestart}>
                Replay the Journey ↻
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  const [started, setStarted] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const handleRestart = () => {
    setStarted(false)
  }

  return (
    <main className="app-shell">
      {!started ? (
        <WelcomeScreen
          onStart={() => setStarted(true)}
          isMuted={isMuted}
          onToggleMusic={() => setIsMuted((current) => !current)}
        />
      ) : (
        <Journey
          onRestart={handleRestart}
          isMuted={isMuted}
          onToggleMusic={() => setIsMuted((current) => !current)}
        />
      )}
    </main>
  )
}

export default App
