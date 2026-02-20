import { useState } from 'react'
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

/* ─── App Card Carousel (publish animation) ─── */

const CAROUSEL_APPS = [
  { name: 'Collection', hue: 180 },
  { name: 'Bucket list', hue: 35 },
  { name: 'Daily Mindfulness', hue: 0, isMain: true },
  { name: 'Run Club', hue: 280 },
]

function AppCarousel({ phase }) {
  const isCard = phase === 'card'
  const isRow = phase === 'row' || phase === 'done'
  const showCards = isCard || isRow

  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      padding: '8px 0',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: isRow ? 12 : (isCard ? 8 : 0),
        transition: 'gap 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
      }}>
        {CAROUSEL_APPS.map((app) => {
          const isMain = app.isMain

          let width, padding, bg, shadow, iconSize, labelOpacity, scale, opacity, zIndex

          if (!showCards) {
            if (isMain) {
              width = 120; padding = '0'; bg = 'transparent'; shadow = 'none'
              iconSize = 120; labelOpacity = 0; scale = 1; opacity = 1; zIndex = 1
            } else {
              width = 0; padding = '0'; bg = 'transparent'; shadow = 'none'
              iconSize = 0; labelOpacity = 0; scale = 0; opacity = 0; zIndex = 1
            }
          } else if (isCard) {
            if (isMain) {
              width = 155; padding = '20px 16px'; bg = '#fff'
              shadow = '0 4px 24px rgba(0,0,0,0.10)'; iconSize = 100
              labelOpacity = 1; scale = 1.06; opacity = 1; zIndex = 10
            } else {
              width = 110; padding = '16px 12px'; bg = '#fff'
              shadow = '0 2px 12px rgba(0,0,0,0.06)'; iconSize = 70
              labelOpacity = 1; scale = 0.92; opacity = 0.9; zIndex = 5
            }
          } else {
            width = 110; padding = '14px 10px'; bg = '#fff'
            shadow = '0 2px 8px rgba(0,0,0,0.06)'; iconSize = 80
            labelOpacity = 1; scale = 1; opacity = 1; zIndex = 1
          }

          return (
            <div
              key={app.name}
              style={{
                width,
                flexShrink: 0,
                padding,
                background: bg,
                borderRadius: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: showCards ? 8 : 0,
                boxShadow: shadow,
                transform: `scale(${scale})`,
                opacity,
                zIndex,
                overflow: 'hidden',
                transition: 'all 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
              }}
            >
              <img
                src="/orb.png"
                alt=""
                style={{
                  width: iconSize,
                  height: iconSize,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  filter: app.hue !== 0 ? `hue-rotate(${app.hue}deg)` : 'none',
                  flexShrink: 0,
                  transition: 'all 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
                }}
              />
              <span style={{
                fontSize: isCard && isMain ? 13 : 11,
                fontWeight: 500,
                color: '#0a0a0a',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                opacity: labelOpacity,
                maxHeight: showCards ? 20 : 0,
                transition: 'all 0.4s ease',
                overflow: 'hidden',
              }}>
                {app.name}
              </span>
            </div>
          )
        })}
      </div>
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
  const [phase, setPhase] = useState(null) // null | 'fading' | 'card' | 'row' | 'done'
  const clarity = mode === 'clarity'

  const visibilityLabel = visibility === 'public' ? 'Public' : 'Unlisted'
  const showPublished = phase === 'done'
  const contentVisible = phase === null || phase === 'done'

  const handlePublish = () => {
    setPhase('fading')
    setTimeout(() => {
      setPublished(true)
      setPhase('card')
    }, 400)
    setTimeout(() => setPhase('row'), 1100)
    setTimeout(() => setPhase('done'), 1700)
  }

  const handleUnpublish = () => {
    setPublished(false)
    setPhase(null)
  }

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
          <AppCarousel phase={phase} />
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center',
            opacity: contentVisible ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}>
            <h1 style={{ fontSize: 24, fontWeight: showPublished ? 700 : 500, lineHeight: '28px', color: '#0a0a0a' }}>
              {showPublished
                ? 'Your mini-app is published!'
                : 'Publish your app to share it'}
            </h1>
            <p style={{ fontSize: 16, fontWeight: 400, lineHeight: '18px', color: '#737373', maxWidth: 306 }}>
              {showPublished
                ? 'If you want to use it with your friends only, use the Invite tab.'
                : 'None of your app data is shared upon publishing. Other users will see an empty version of your app.'}
            </p>
          </div>
        </div>

        {/* Bottom section — fades during publish transition */}
        <div style={{
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 0.35s ease',
          pointerEvents: contentVisible ? 'auto' : 'none',
        }}>
          {clarity ? (
            /* ─── Clarity: options + button inside gray area ─── */
            <div style={{
              flexShrink: 0, margin: '0 20px 0', background: '#f5f5f5', borderRadius: 32,
              padding: 20, display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              {published ? (
                /* Collapsed: single visibility row that opens sheet */
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
              ) : (
                /* Expanded: both options in a white card */
                <div style={{ background: '#fff', borderRadius: 24, padding: '8px 8px', display: 'flex', flexDirection: 'column' }}>
                  <button
                    onClick={() => setVisibility('public')}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '14px 14px 14px 10px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      width: '100%', fontFamily: 'inherit', textAlign: 'left',
                    }}
                  >
                    <GlobeSimple size={28} color={visibility === 'public' ? '#0a0a0a' : '#b0b0b0'} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <span style={{ fontSize: 15, fontWeight: 600, lineHeight: '18px', color: visibility === 'public' ? '#0a0a0a' : '#b0b0b0' }}>Public</span>
                      <span style={{ fontSize: 13, fontWeight: 400, lineHeight: '16px', color: visibility === 'public' ? '#737373' : '#c5c5c5' }}>
                        Visible on Explore, anyone can search for and view
                      </span>
                    </div>
                    {visibility === 'public'
                      ? <CheckCircle size={28} weight="fill" color="#0a0a0a" />
                      : <Circle size={28} color="#d4d4d4" />}
                  </button>

                  <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 14px' }} />

                  <button
                    onClick={() => setVisibility('unlisted')}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '14px 14px 14px 10px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      width: '100%', fontFamily: 'inherit', textAlign: 'left',
                    }}
                  >
                    <LinkSimple size={28} color={visibility === 'unlisted' ? '#0a0a0a' : '#b0b0b0'} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <span style={{
                        fontSize: 15, fontWeight: 500, lineHeight: '18px',
                        color: visibility === 'unlisted' ? '#0a0a0a' : '#b0b0b0',
                      }}>Unlisted</span>
                      <span style={{
                        fontSize: 13, fontWeight: 400, lineHeight: '16px',
                        color: visibility === 'unlisted' ? '#525252' : '#c5c5c5',
                      }}>
                        Not visible on Explore or search, but anyone with the link can view
                      </span>
                    </div>
                    {visibility === 'unlisted'
                      ? <CheckCircle size={28} weight="fill" color="#0a0a0a" />
                      : <Circle size={28} color="#d4d4d4" />}
                  </button>
                </div>
              )}

              <button
                onClick={() => { published ? handleShare() : handlePublish() }}
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
                onClick={() => { published ? handleShare() : handlePublish() }}
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
              onClick={handleUnpublish}
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
      </div>

      {(!clarity || published) && (
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
