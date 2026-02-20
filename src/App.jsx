import { useState, useEffect } from 'react'
import {
  GlobeSimple,
  LinkSimple,
  Export,
  UserPlus,
  CaretRight,
  CaretLeft,
  CloudArrowUp,
  LockSimple,
  CheckCircle,
  Circle,
} from '@phosphor-icons/react'

/* ─── Orb Display (animated) ─── */

const SATELLITE_ORBS = [
  { size: 75, x: 55, y: 30, hue: 210, startX: -120, startY: 0 },    // left
  { size: 75, x: 235, y: 30, hue: 190, startX: 120, startY: 0 },    // right
  { size: 70, x: 95, y: 110, hue: 30, startX: -80, startY: 80 },    // bottom-left
  { size: 70, x: 185, y: 110, hue: 160, startX: 80, startY: 80 },   // bottom-right
]

function OrbDisplay({ published }) {
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (published) {
      // Small delay so initial positions render first
      const t = requestAnimationFrame(() => setAnimating(true))
      return () => cancelAnimationFrame(t)
    } else {
      setAnimating(false)
    }
  }, [published])

  const mainSize = published ? 120 : (published === false ? 120 : 120)

  return (
    <div style={{
      position: 'relative',
      width: 310,
      height: published ? 190 : 120,
      transition: 'height 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
      display: 'flex',
      justifyContent: 'center',
    }}>
      {/* Main orb — always present */}
      <img
        src="/orb.png"
        alt=""
        style={{
          position: published ? 'absolute' : 'relative',
          width: mainSize,
          height: mainSize,
          borderRadius: '50%',
          objectFit: 'cover',
          ...(published && { left: 140, top: 0, transform: 'translateX(-50%)' }),
          transition: 'all 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      />
      {/* Satellite orbs */}
      {SATELLITE_ORBS.map((orb, i) => (
        <img
          key={i}
          src="/orb.png"
          alt=""
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            objectFit: 'cover',
            filter: `hue-rotate(${orb.hue}deg)`,
            left: animating ? orb.x : 140 + orb.startX * 0.2,
            top: animating ? orb.y : 30 + orb.startY * 0.2,
            transform: 'translateX(-50%)',
            opacity: published ? (animating ? 1 : 0) : 0,
            scale: published ? (animating ? '1' : '0.3') : '0.3',
            transition: `all 0.6s cubic-bezier(0.32, 0.72, 0, 1) ${i * 0.06}s`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  )
}

/* ─── iPhone Frame ─── */

function IPhoneFrame({ children }) {
  return (
    <div style={{
      width: 402,
      height: 872,
      borderRadius: 54,
      border: '8px solid #1a1a1a',
      background: '#000',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 50px 100px rgba(0,0,0,0.4), 0 0 0 2px #333, inset 0 0 0 2px #333',
      flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute',
        top: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 126,
        height: 36,
        borderRadius: 20,
        background: '#000',
        zIndex: 10,
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        borderRadius: 46,
      }}>
        {children}
      </div>
    </div>
  )
}

/* ─── Controls Sidebar ─── */

function SegmentedControl({ label, options, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{
        fontSize: 11,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#888',
      }}>{label}</span>
      <div style={{
        display: 'flex',
        background: '#1a1a1a',
        borderRadius: 10,
        padding: 3,
      }}>
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1,
              padding: '8px 14px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 500,
              fontFamily: 'inherit',
              color: value === opt.value ? '#fff' : '#666',
              background: value === opt.value ? '#333' : 'transparent',
              transition: 'all 0.15s ease',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function Sidebar({ mode, onModeChange, screen, onScreenChange }) {
  return (
    <div style={{
      width: 200,
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      paddingRight: 48,
      flexShrink: 0,
    }}>
      <SegmentedControl
        label="Screen"
        options={[
          { label: 'First publish', value: 'first-publish' },
          { label: 'Updates', value: 'updates' },
        ]}
        value={screen}
        onChange={onScreenChange}
      />
      <SegmentedControl
        label="Layout"
        options={[
          { label: 'Clarity', value: 'clarity' },
          { label: 'Minimal', value: 'minimal' },
        ]}
        value={mode}
        onChange={onModeChange}
      />
    </div>
  )
}

/* ─── Visibility Sheet (Minimal mode) ─── */

function VisibilitySheet({ open, visibility, onSelect, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
          zIndex: 20, opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#fff', borderRadius: '32px 32px 46px 46px', zIndex: 30,
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        padding: '20px 20px 40px', display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <button
            onClick={onClose}
            style={{
              width: 48, height: 48, borderRadius: 24, border: 'none', background: '#fff',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
              flexShrink: 0, zIndex: 1,
            }}
          >
            <CaretLeft size={24} weight="bold" color="#0a0a0a" />
          </button>
          <span style={{
            position: 'absolute', left: 0, right: 0, textAlign: 'center',
            fontSize: 18, fontWeight: 500, color: '#0a0a0a',
          }}>
            Set visibility
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Public */}
          <button
            onClick={() => onSelect('public')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '24px 20px 24px 16px', borderRadius: 24,
              border: visibility === 'public' ? 'none' : '1px solid rgba(0,0,0,0.08)',
              background: visibility === 'public' ? '#f5f5f5' : '#fff',
              cursor: 'pointer', width: '100%', fontFamily: 'inherit', textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ padding: 7, flexShrink: 0 }}>
                <GlobeSimple size={40} color="#0a0a0a" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 18, fontWeight: 500, lineHeight: '22px', color: '#0a0a0a' }}>Public</span>
                <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '16px', color: '#525252' }}>
                  Visible on Explore, anyone can search for and view
                </span>
              </div>
            </div>
            {visibility === 'public'
              ? <CheckCircle size={32} weight="fill" color="#0a0a0a" />
              : <Circle size={32} color="#d4d4d4" />}
          </button>
          {/* Unlisted */}
          <button
            onClick={() => onSelect('unlisted')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '24px 20px 24px 16px', borderRadius: 24,
              border: visibility === 'unlisted' ? 'none' : '1px solid rgba(0,0,0,0.08)',
              background: visibility === 'unlisted' ? '#f5f5f5' : '#fff',
              cursor: 'pointer', width: '100%', fontFamily: 'inherit', textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ padding: 7, flexShrink: 0 }}>
                <LinkSimple size={40} color={visibility === 'unlisted' ? '#0a0a0a' : '#737373'} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 18, fontWeight: 500, lineHeight: '22px', color: visibility === 'unlisted' ? '#0a0a0a' : '#737373' }}>Unlisted</span>
                <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '16px', color: visibility === 'unlisted' ? '#525252' : '#737373' }}>
                  Not visible on Explore or search, anyone with the link can view
                </span>
              </div>
            </div>
            {visibility === 'unlisted'
              ? <CheckCircle size={32} weight="fill" color="#0a0a0a" />
              : <Circle size={32} color="#d4d4d4" />}
          </button>
        </div>
      </div>
    </>
  )
}

/* ─── Tabs ─── */

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div style={{
      margin: '20px 27px 0', background: 'rgba(246,246,246,0.5)', borderRadius: 155,
      display: 'flex', padding: 4, position: 'relative', flexShrink: 0,
    }}>
      {['share', 'invite'].map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 6, padding: '16px 0', borderRadius: 155, border: 'none', cursor: 'pointer',
            fontSize: 17.7, fontWeight: 500, color: '#191919',
            background: activeTab === tab ? '#fff' : 'transparent',
            boxShadow: activeTab === tab ? '0 4px 12px rgba(0,0,0,0.12)' : 'none',
            opacity: activeTab === tab ? 1 : 0.5,
            transition: 'all 0.2s ease',
            position: 'relative', zIndex: 1, fontFamily: 'inherit',
          }}
        >
          {tab === 'share'
            ? <Export size={22} weight="bold" color="#191919" />
            : <UserPlus size={22} weight="bold" color="#191919" />}
          {tab === 'share' ? 'Share' : 'Invite'}
        </button>
      ))}
      <div style={{
        boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.07)',
        borderRadius: 'inherit', position: 'absolute', inset: 0, pointerEvents: 'none',
      }} />
    </div>
  )
}

/* ─── Share Screen ─── */

function ShareScreen({ mode }) {
  const [activeTab, setActiveTab] = useState('share')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [visibility, setVisibility] = useState('public')
  const [published, setPublished] = useState(false)
  const clarity = mode === 'clarity'

  const visibilityLabel = visibility === 'public' ? 'Public' : 'Unlisted'

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my mini-app',
          text: 'I just published a mini-app!',
          url: window.location.href,
        })
      } catch (e) {
        // user cancelled
      }
    }
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000' }}>
      <div style={{
        position: 'absolute', inset: 0, top: 51, background: '#fff',
        borderRadius: '38px 38px 46px 46px', display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Center content */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: clarity ? '0 30px' : '0 40px',
          textAlign: 'center', gap: clarity ? 16 : 25,
        }}>
          <OrbDisplay published={published} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
            <h1 style={{ fontSize: 24, fontWeight: published ? 700 : 500, lineHeight: '28px', color: '#0a0a0a' }}>
              {published
                ? 'Your mini-app is published!'
                : 'Your mini-app isn\u2019t published yet. Publish to share it'}
            </h1>
            <p style={{ fontSize: 16, fontWeight: 400, lineHeight: '18px', color: '#737373', maxWidth: 306 }}>
              {published
                ? 'If you want to use it with your friends only, use the Invite tab.'
                : 'None of your app data is shared upon publishing. Other users will see an empty version of your app.'}
            </p>
          </div>
        </div>

        {/* Bottom section */}
        {clarity ? (
          /* ─── Clarity: inline options ─── */
          <div style={{ flexShrink: 0, margin: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#f5f5f5', borderRadius: 28, padding: 12, display: 'flex', flexDirection: 'column' }}>
              {/* Public */}
              <button
                onClick={() => setVisibility('public')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '14px 14px 14px 10px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  width: '100%', fontFamily: 'inherit', textAlign: 'left',
                }}
              >
                <GlobeSimple size={28} color="#0a0a0a" />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, lineHeight: '18px', color: '#0a0a0a' }}>Public</span>
                  <span style={{ fontSize: 13, fontWeight: 400, lineHeight: '16px', color: '#737373' }}>
                    Visible on Explore, anyone can search for and view
                  </span>
                </div>
                {visibility === 'public'
                  ? <CheckCircle size={28} weight="fill" color="#0a0a0a" />
                  : <Circle size={28} color="#d4d4d4" />}
              </button>

              <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 14px' }} />

              {/* Unlisted */}
              <button
                onClick={() => setVisibility('unlisted')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '14px 14px 14px 10px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  width: '100%', fontFamily: 'inherit', textAlign: 'left',
                }}
              >
                <LinkSimple size={28} color={visibility === 'unlisted' ? '#0a0a0a' : '#737373'} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{
                    fontSize: 15, fontWeight: 500, lineHeight: '18px',
                    color: visibility === 'unlisted' ? '#0a0a0a' : '#737373',
                  }}>Unlisted</span>
                  <span style={{
                    fontSize: 13, fontWeight: 400, lineHeight: '16px',
                    color: visibility === 'unlisted' ? '#525252' : '#a3a3a3',
                  }}>
                    Not visible on Explore or search, but anyone with the link can view
                  </span>
                </div>
                {visibility === 'unlisted'
                  ? <CheckCircle size={28} weight="fill" color="#0a0a0a" />
                  : <Circle size={28} color="#d4d4d4" />}
              </button>
            </div>

            <button
              onClick={() => { published ? handleShare() : setPublished(true) }}
              style={{
                width: '100%', background: '#171717', color: '#fafafa',
                border: 'none', borderRadius: 999, padding: '18px 30px',
                fontSize: 15, fontWeight: 500, lineHeight: '20px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7.5,
                boxShadow: '0 1.87px 3.73px rgba(0,0,0,0.16)', fontFamily: 'inherit',
              }}
            >
              {published
                ? <><Export size={22} color="#fafafa" /> Share mini-app</>
                : <><CloudArrowUp size={22} color="#fafafa" /> Publish</>}
            </button>
          </div>
        ) : (
          /* ─── Minimal: collapsed visibility row ─── */
          <div style={{
            flexShrink: 0, margin: '0 20px 0', background: '#f5f5f5', borderRadius: 32,
            padding: 20, display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <button
              onClick={() => setSheetOpen(true)}
              style={{
                background: '#fff', borderRadius: 24, padding: '20px 20px 20px 12px',
                display: 'flex', alignItems: 'center', gap: 12,
                cursor: 'pointer', border: 'none', width: '100%', fontFamily: 'inherit',
              }}
            >
              <div style={{ flexShrink: 0, padding: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {visibility === 'public'
                  ? <GlobeSimple size={32} color="#0a0a0a" />
                  : <LinkSimple size={32} color="#0a0a0a" />}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left' }}>
                <span style={{ fontSize: 12, lineHeight: '14px', color: '#737373', fontWeight: 400 }}>Visibility</span>
                <span style={{ fontSize: 16, lineHeight: '18px', color: '#0a0a0a', fontWeight: 500 }}>{visibilityLabel}</span>
              </div>
              <CaretRight size={24} weight="bold" color="#0a0a0a" />
            </button>

            <button
              onClick={() => { published ? handleShare() : setPublished(true) }}
              style={{
                width: '100%', background: '#171717', color: '#fafafa',
                border: 'none', borderRadius: 999, padding: '18px 30px',
                fontSize: 15, fontWeight: 500, lineHeight: '20px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7.5,
                boxShadow: '0 1.87px 3.73px rgba(0,0,0,0.16)', fontFamily: 'inherit',
              }}
            >
              {published
                ? <><Export size={22} color="#fafafa" /> Share mini-app</>
                : <><CloudArrowUp size={22} color="#fafafa" /> Publish</>}
            </button>
          </div>
        )}

        {/* Unpublish link */}
        {published && (
          <button
            onClick={() => setPublished(false)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 8, padding: '20px 0 34px', fontFamily: 'inherit',
              fontSize: 15, fontWeight: 500, color: '#ef4444',
            }}
          >
            <LockSimple size={20} color="#ef4444" />
            Unpublish your app
          </button>
        )}

        {!published && <div style={{ height: 34, flexShrink: 0 }} />}
      </div>

      {!clarity && (
        <VisibilitySheet
          open={sheetOpen}
          visibility={visibility}
          onSelect={(v) => { setVisibility(v); setSheetOpen(false) }}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </div>
  )
}

/* ─── App ─── */

export default function App() {
  const [mode, setMode] = useState('clarity')
  const [screen, setScreen] = useState('first-publish')

  return (
    <div style={{
      width: '100vw', height: '100dvh', background: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '"Selecta", -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
      color: '#fff',
    }}>
      <Sidebar mode={mode} onModeChange={setMode} screen={screen} onScreenChange={setScreen} />
      <IPhoneFrame>
        <ShareScreen mode={mode} screen={screen} />
      </IPhoneFrame>
    </div>
  )
}
