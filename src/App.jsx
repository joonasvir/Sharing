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
  MagnifyingGlass,
  Plus,
} from '@phosphor-icons/react'

/* ─── App Card Carousel (publish animation) ─── */

const CAROUSEL_APPS = [
  { title: 'Meditation', subtitle: 'moments', hue: 0 },
  { title: 'Meditation', subtitle: 'moments', hue: 0, isMain: true },
  { title: 'Meditation', subtitle: 'moments', hue: 0 },
]

const MOCK_USERS = [
  { name: 'TomTaylr', handle: 'BookWorm2023', hue: 30 },
  { name: 'SarahJ', handle: 'SarahJ_Design', hue: 120 },
  { name: 'MikeR', handle: 'MikeRunsALot', hue: 220 },
  { name: 'AlexPatel', handle: 'AlexP_2024', hue: 320 },
]

function AppCarousel({ published, isInvite }) {
  const isShare = !isInvite
  const mainIndex = CAROUSEL_APPS.findIndex(a => a.isMain)

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isShare && published ? 12 : 0,
        transition: 'gap 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
      }}>
        {CAROUSEL_APPS.map((app, i) => {
          const isMain = app.isMain
          const delay = isShare && published ? 0.08 + Math.abs(i - mainIndex) * 0.06 : 0

          let cardWidth, orbSize, cardPadding, cardBg, cardBorder, showCard, opacity, scale

          if (isInvite) {
            if (isMain) {
              cardWidth = 90; orbSize = 90; cardPadding = '0'
              cardBg = 'transparent'; cardBorder = '1px solid transparent'
              showCard = false; opacity = 1; scale = 1
            } else {
              cardWidth = 0; orbSize = 0; cardPadding = '0'
              cardBg = 'transparent'; cardBorder = '1px solid transparent'
              showCard = false; opacity = 0; scale = 0.5
            }
          } else if (!published) {
            if (isMain) {
              cardWidth = 175; orbSize = 115; cardPadding = '20px'
              cardBg = 'rgba(245,245,245,0.6)'; cardBorder = '1px solid rgba(0,0,0,0.05)'
              showCard = true; opacity = 1; scale = 1
            } else {
              cardWidth = 0; orbSize = 0; cardPadding = '0'
              cardBg = 'transparent'; cardBorder = '1px solid transparent'
              showCard = false; opacity = 0; scale = 0.8
            }
          } else {
            cardWidth = 135; orbSize = 85; cardPadding = '16px 12px'
            cardBg = 'rgba(245,245,245,0.6)'; cardBorder = '1px solid rgba(0,0,0,0.05)'
            showCard = true; opacity = 1; scale = 1
          }

          return (
            <div
              key={i}
              style={{
                width: cardWidth,
                flexShrink: 0,
                background: cardBg,
                borderRadius: 24,
                border: cardBorder,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: cardPadding,
                gap: showCard ? 8 : 0,
                position: 'relative',
                opacity,
                transform: `scale(${scale})`,
                overflow: isMain && isInvite ? 'visible' : 'hidden',
                transition: `all 0.6s cubic-bezier(0.32, 0.72, 0, 1) ${delay}s`,
              }}
            >
              {/* Status icon */}
              <div style={{
                position: 'absolute',
                top: 12, right: 12,
                opacity: showCard ? 0.4 : 0,
                transition: `opacity 0.4s ease ${delay}s`,
              }}>
                {isMain && published
                  ? <GlobeSimple size={18} color="#0a0a0a" />
                  : <LockSimple size={18} color="#0a0a0a" />}
              </div>

              {/* Orb — shared element for main card */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img
                  src="/orb.png"
                  alt=""
                  style={{
                    width: orbSize,
                    height: orbSize,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    filter: app.hue !== 0 ? `hue-rotate(${app.hue}deg)` : 'none',
                    flexShrink: 0,
                    transition: `all 0.6s cubic-bezier(0.32, 0.72, 0, 1) ${delay}s`,
                  }}
                />
                {/* Invite user badges — only on main card */}
                {isMain && (
                  <div style={{
                    position: 'absolute',
                    bottom: -6, left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    opacity: isInvite ? 1 : 0,
                    transition: `opacity 0.3s ease ${isInvite ? '0.15s' : '0s'}`,
                    pointerEvents: 'none',
                  }}>
                    {[200, 100, 320].map((hue, j) => (
                      <img
                        key={j}
                        src="/orb.png"
                        alt=""
                        style={{
                          width: 24, height: 24, borderRadius: '50%',
                          objectFit: 'cover', border: '2px solid #fff',
                          marginLeft: j > 0 ? -6 : 0,
                          filter: `hue-rotate(${hue}deg) brightness(0.8)`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* App name */}
              <div style={{
                textAlign: 'center',
                maxHeight: showCard ? 40 : 0,
                opacity: showCard ? 1 : 0,
                overflow: 'hidden',
                transition: `all 0.4s ease ${delay}s`,
              }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: '#C47020' }}>
                  {app.title}
                </span>
                <br />
                <span style={{ fontSize: 15, fontWeight: 500, color: '#0a0a0a' }}>
                  {app.subtitle}
                </span>
              </div>
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
  const isShare = activeTab === 'share'
  return (
    <div style={{
      margin: '20px 27px 0', background: 'rgba(246,246,246,0.5)', borderRadius: 155,
      display: 'flex', padding: 4, position: 'relative', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute',
        top: 4, bottom: 4, left: 4,
        width: 'calc(50% - 4px)',
        borderRadius: 155,
        background: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        transform: isShare ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        zIndex: 0,
      }} />
      {['share', 'invite'].map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 6, padding: '16px 0', borderRadius: 155, border: 'none', cursor: 'pointer',
            fontSize: 17.7, fontWeight: 500, color: '#191919',
            background: 'transparent',
            opacity: activeTab === tab ? 1 : 0.5,
            transition: 'opacity 0.3s ease',
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
        zIndex: 2,
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

  const isShare = activeTab === 'share'
  const isInvite = activeTab === 'invite'
  const visibilityLabel = visibility === 'public' ? 'Public' : 'Unlisted'

  const handlePublish = () => {
    setPublished(true)
  }

  const handleUnpublish = () => {
    setPublished(false)
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

        {/* Hero area — flex-grows on share tab (centers content), compact on invite */}
        <div style={{
          flexGrow: isShare ? 1 : 0,
          flexShrink: isShare ? 1 : 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: isInvite ? 20 : 0,
          gap: 12,
          textAlign: 'center',
          minHeight: 0,
          transition: 'flex-grow 0.45s cubic-bezier(0.32, 0.72, 0, 1), padding 0.45s cubic-bezier(0.32, 0.72, 0, 1)',
        }}>
          {/* Card carousel — shared element transition for main orb */}
          <AppCarousel published={published} isInvite={isInvite} />

          {/* Copy — share and invite crossfade in same space */}
          <div style={{
            position: 'relative', padding: '0 30px',
            display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center',
          }}>
            {/* Share copy — takes layout space */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center',
              opacity: isShare ? 1 : 0,
              transition: 'opacity 0.35s ease',
            }}>
              <h1 style={{ fontSize: 24, fontWeight: 500, lineHeight: '28px', color: '#0a0a0a' }}>
                {published ? 'Your mini-app is published!' : 'Your mini-app is private. Publish it to share'}
              </h1>
              <p style={{ fontSize: 16, fontWeight: 400, lineHeight: '18px', color: '#737373', maxWidth: 306 }}>
                {published
                  ? 'If you want to use it with your friends only, use the Invite tab.'
                  : 'None of your data is shared upon publish'}
              </p>
            </div>
            {/* Invite copy — overlaps share copy */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center',
              justifyContent: 'center', padding: '0 30px',
              opacity: isInvite ? 1 : 0,
              transition: 'opacity 0.35s ease',
              pointerEvents: 'none',
            }}>
              <h1 style={{ fontSize: 24, fontWeight: 500, lineHeight: '28px', color: '#0a0a0a' }}>
                Use this app together
              </h1>
              <p style={{ fontSize: 16, fontWeight: 400, lineHeight: '18px', color: '#737373', maxWidth: 306 }}>
                This is a short two line explainer that's specific to the app type
              </p>
            </div>
          </div>
        </div>

        {/* Invite middle: search + user list */}
        <div style={{
          flexGrow: isInvite ? 1 : 0,
          flexShrink: isInvite ? 1 : 0,
          maxHeight: isInvite ? 9999 : 0,
          opacity: isInvite ? 1 : 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'flex-grow 0.4s cubic-bezier(0.32, 0.72, 0, 1), max-height 0.4s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.35s ease',
          pointerEvents: isInvite ? 'auto' : 'none',
        }}>
          {/* Search */}
          <div style={{ padding: '8px 20px 4px', flexShrink: 0 }}>
            <div style={{
              background: 'rgba(23,23,23,0.03)', borderRadius: 999, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.15)',
            }}>
              <MagnifyingGlass size={20} color="#a3a3a3" />
              <span style={{ color: '#a3a3a3', fontSize: 18, fontFamily: 'inherit' }}>Search by username</span>
            </div>
          </div>

          {/* User list */}
          <div style={{ flex: 1, overflow: 'auto', padding: '8px 20px' }}>
            {MOCK_USERS.map((user, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', padding: '10px 0', gap: 12,
              }}>
                <img
                  src="/orb.png"
                  alt=""
                  style={{
                    width: 42, height: 42, borderRadius: '50%',
                    objectFit: 'cover', flexShrink: 0,
                    filter: `hue-rotate(${user.hue}deg)`,
                  }}
                />
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 18, fontWeight: 400, color: '#0a0a0a', lineHeight: '22px', opacity: 0.7 }}>{user.name}</div>
                  <div style={{ fontSize: 16, fontWeight: 400, color: '#737373', lineHeight: '18px', opacity: 0.7 }}>{user.handle}</div>
                </div>
                <button style={{
                  background: '#f5f5f5', border: 'none', borderRadius: 999,
                  padding: '8px 16px', fontSize: 12, fontWeight: 500, color: '#0a0a0a',
                  cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', gap: 8,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.16)',
                }}>
                  <Plus size={16} weight="regular" /> Invite
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Invite bottom button */}
        <div style={{
          flexShrink: 0,
          maxHeight: isInvite ? 100 : 0,
          opacity: isInvite ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.35s ease',
          pointerEvents: isInvite ? 'auto' : 'none',
          padding: isInvite ? '0 20px 28px' : '0 20px 0',
        }}>
          <button style={{
            width: '100%', background: '#171717', color: '#fafafa',
            border: 'none', borderRadius: 999, padding: '18px 30px',
            fontSize: 15, fontWeight: 500, lineHeight: '20px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7.5,
            boxShadow: '0 1.87px 3.73px rgba(0,0,0,0.16)', fontFamily: 'inherit',
          }}>
            <Plus size={20} color="#fafafa" /> Invite via link
          </button>
        </div>

        {/* Share bottom controls */}
        <div style={{
          flexShrink: 0,
          maxHeight: isShare ? 400 : 0,
          opacity: isShare ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.35s ease',
          pointerEvents: isShare ? 'auto' : 'none',
        }}>
          {clarity ? (
            /* ─── Clarity: options + button inside gray area ─── */
            <div style={{
              margin: '0 20px 0', background: '#f5f5f5', borderRadius: 32,
              padding: 20, display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              {published ? (
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
                      <span style={{ fontSize: 15, fontWeight: 500, lineHeight: '18px', color: visibility === 'unlisted' ? '#0a0a0a' : '#b0b0b0' }}>Unlisted</span>
                      <span style={{ fontSize: 13, fontWeight: 400, lineHeight: '16px', color: visibility === 'unlisted' ? '#525252' : '#c5c5c5' }}>
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
            /* ─── Minimal ─── */
            <div style={{
              margin: '0 20px 0', background: '#f5f5f5', borderRadius: 32,
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
                width: '100%',
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, padding: '16px 0 28px', fontFamily: 'inherit',
                fontSize: 15, fontWeight: 500, color: '#ef4444',
                flexShrink: 0,
              }}
            >
              <LockSimple size={20} color="#ef4444" />
              Unpublish your app
            </button>
          )}

          {!published && <div style={{ height: 28, flexShrink: 0 }} />}
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
