import { useState, useRef, useEffect } from 'react'
import {
  GlobeSimple,
  LinkSimple,
  Export,
  UserPlus,
  CaretRight,

  CloudArrowUp,
  LockSimple,
  CheckCircle,
  Circle,
  MagnifyingGlass,
  Plus,
  Broadcast,
  Copy,
  SpinnerGap,
} from '@phosphor-icons/react'

const APP_ORBS = [
  { src: '/orb1.png' },
  { src: '/orb2.png' },
  { src: '/mainorb.png', isMain: true },
  { src: '/orb3.png' },
  { src: '/orb4.png' },
]

const MOCK_USERS = [
  { name: 'TomTaylr', handle: 'BookWorm2023', hue: 30 },
  { name: 'SarahJ', handle: 'SarahJ_Design', hue: 120 },
  { name: 'MikeR', handle: 'MikeRunsALot', hue: 220 },
  { name: 'AlexPatel', handle: 'AlexP_2024', hue: 320 },
]

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
        letterSpacing: '0.06em',
        color: 'rgba(255,255,255,0.35)',
      }}>{label}</span>
      <div style={{
        display: 'flex',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 12,
        padding: 3,
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 500,
              fontFamily: 'inherit',
              color: value === opt.value ? '#fff' : 'rgba(255,255,255,0.3)',
              background: value === opt.value ? 'rgba(255,255,255,0.1)' : 'transparent',
              boxShadow: value === opt.value ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

const DEFAULT_ANIM = {
  duration: 0.8,
  stagger: 0.06,
  copyFadeDuration: 0.4,
  copyFadeDelay: 0.35,
  orbGap: 10,
  mainOrbSize: 78,
  sideOrbSize: 78,
}

function Slider({ label, value, min, max, step, onChange, unit = '' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.45)' }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.3)', fontVariantNumeric: 'tabular-nums' }}>{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          width: '100%', height: 4, appearance: 'none', WebkitAppearance: 'none',
          background: 'rgba(255,255,255,0.12)', borderRadius: 2, outline: 'none',
          cursor: 'pointer',
        }}
      />
    </div>
  )
}

function AnimationControls({ anim, onAnimChange }) {
  const [open, setOpen] = useState(false)
  const update = (key, val) => onAnimChange({ ...anim, [key]: val })

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: 0, fontFamily: 'inherit',
        }}
      >
        <span style={{
          fontSize: 11, fontWeight: 500, textTransform: 'uppercase',
          letterSpacing: '0.06em', color: 'rgba(255,255,255,0.35)',
        }}>Animation</span>
        <CaretRight
          size={10} weight="bold" color="rgba(255,255,255,0.25)"
          style={{
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </button>
      <div style={{
        maxHeight: open ? 400 : 0,
        opacity: open ? 1 : 0,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 12 }}>
          <Slider label="Duration" value={anim.duration} min={0.2} max={2.0} step={0.05} onChange={(v) => update('duration', v)} unit="s" />
          <Slider label="Stagger delay" value={anim.stagger} min={0} max={0.2} step={0.01} onChange={(v) => update('stagger', v)} unit="s" />
          <Slider label="Orb gap" value={anim.orbGap} min={0} max={30} step={1} onChange={(v) => update('orbGap', v)} unit="px" />
          <Slider label="Main orb size" value={anim.mainOrbSize} min={50} max={120} step={1} onChange={(v) => update('mainOrbSize', v)} unit="px" />
          <Slider label="Side orb size" value={anim.sideOrbSize} min={40} max={100} step={1} onChange={(v) => update('sideOrbSize', v)} unit="px" />
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
          <Slider label="Copy fade duration" value={anim.copyFadeDuration} min={0.1} max={1.0} step={0.05} onChange={(v) => update('copyFadeDuration', v)} unit="s" />
          <Slider label="Copy fade delay" value={anim.copyFadeDelay} min={0} max={0.8} step={0.05} onChange={(v) => update('copyFadeDelay', v)} unit="s" />
          <button
            onClick={() => onAnimChange({ ...DEFAULT_ANIM })}
            style={{
              background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 8,
              padding: '8px', fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.3)',
              cursor: 'pointer', fontFamily: 'inherit', marginTop: 2,
            }}
          >
            Reset to defaults
          </button>
        </div>
      </div>
    </div>
  )
}

function Sidebar({ mode, onModeChange, screen, onScreenChange, anim, onAnimChange }) {
  return (
    <div style={{
      width: 260,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      padding: '24px 20px',
      marginRight: 48,
      flexShrink: 0,
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(40px)',
      WebkitBackdropFilter: 'blur(40px)',
      borderRadius: 28,
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
    }}>
      <SegmentedControl
        label="Layout"
        options={[
          { label: 'v1: Clarity', value: 'clarity' },
          { label: 'v2: Minimal', value: 'minimal' },
          { label: 'v3: Link', value: 'link' },
        ]}
        value={mode}
        onChange={onModeChange}
      />
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 -4px' }} />
      <SegmentedControl
        label="State of app"
        options={[
          { label: 'First publish', value: 'first-publish' },
          { label: 'App has updates', value: 'updates' },
        ]}
        value={screen}
        onChange={onScreenChange}
      />
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 -4px' }} />
      <AnimationControls anim={anim} onAnimChange={onAnimChange} />
    </div>
  )
}

/* ─── Visibility Sheet (Minimal mode) ─── */

function VisibilitySheet({ open, visibility, onSelect, onClose, published }) {
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
        padding: '12px 20px 40px', display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 36, height: 5, borderRadius: 3,
            background: 'rgba(0,0,0,0.15)',
          }} />
          <span style={{
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
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '24px 20px 24px 16px', borderRadius: 24,
              border: visibility === 'public' ? 'none' : '1px solid rgba(0,0,0,0.08)',
              background: visibility === 'public' ? '#f5f5f5' : '#fff',
              cursor: 'pointer', width: '100%', fontFamily: 'inherit', textAlign: 'left',
            }}
          >
            <div style={{ padding: 7, flexShrink: 0 }}>
              <GlobeSimple size={40} color="#0a0a0a" />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 18, fontWeight: 500, lineHeight: '22px', color: '#0a0a0a' }}>Public</span>
              <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '16px', color: '#525252' }}>
                Discoverable by everyone on Explore and via share link
              </span>
            </div>
            <div style={{ flexShrink: 0 }}>
              {visibility === 'public'
                ? <CheckCircle size={32} weight="fill" color="#0a0a0a" />
                : <Circle size={32} color="#d4d4d4" />}
            </div>
          </button>
          {/* Private Link */}
          <button
            onClick={() => onSelect('unlisted')}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '24px 20px 24px 16px', borderRadius: 24,
              border: visibility === 'unlisted' ? 'none' : '1px solid rgba(0,0,0,0.08)',
              background: visibility === 'unlisted' ? '#f5f5f5' : '#fff',
              cursor: 'pointer', width: '100%', fontFamily: 'inherit', textAlign: 'left',
            }}
          >
            <div style={{ padding: 7, flexShrink: 0 }}>
              <LinkSimple size={40} color={visibility === 'unlisted' ? '#0a0a0a' : '#737373'} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 18, fontWeight: 500, lineHeight: '22px', color: visibility === 'unlisted' ? '#0a0a0a' : '#737373' }}>Private Link</span>
              <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '16px', color: visibility === 'unlisted' ? '#525252' : '#737373' }}>
                Only people with your link can open it
              </span>
            </div>
            <div style={{ flexShrink: 0 }}>
              {visibility === 'unlisted'
                ? <CheckCircle size={32} weight="fill" color="#0a0a0a" />
                : <Circle size={32} color="#d4d4d4" />}
            </div>
          </button>
          {/* Private — only shown after publishing */}
          {published && (
            <button
              onClick={() => onSelect('private')}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '24px 20px 24px 16px', borderRadius: 24,
                border: '1px solid rgba(0,0,0,0.08)',
                background: '#fff',
                cursor: 'pointer', width: '100%', fontFamily: 'inherit', textAlign: 'left',
              }}
            >
              <div style={{ padding: 7, flexShrink: 0 }}>
                <LockSimple size={40} color="#737373" />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 18, fontWeight: 500, lineHeight: '22px', color: '#737373' }}>Private</span>
                <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '16px', color: '#737373' }}>
                  Only visible to you. Disables the share link.
                </span>
              </div>
              <div style={{ flexShrink: 0 }}>
                <Circle size={32} color="#d4d4d4" />
              </div>
            </button>
          )}
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

function ShareScreen({ mode, screen, anim = DEFAULT_ANIM }) {
  const [activeTab, setActiveTab] = useState('share')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [visibility, setVisibility] = useState('public')
  const [published, setPublished] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [unpublishing, setUnpublishing] = useState(false)
  const [updatesPublished, setUpdatesPublished] = useState(false)
  const [exploreEnabled, setExploreEnabled] = useState(false)
  const clarity = mode === 'clarity'
  const isLink = mode === 'link'
  const [linkState, setLinkState] = useState('idle')
  const linkTimerRef = useRef(null)
  const isUpdates = screen === 'updates'
  const hasUnpublishedUpdates = isUpdates && !updatesPublished

  useEffect(() => {
    setPublished(screen === 'updates')
    setPublishing(false)
    setUnpublishing(false)
    setUpdatesPublished(false)
    setLinkState('idle')
    if (linkTimerRef.current) clearTimeout(linkTimerRef.current)
  }, [screen])

  useEffect(() => {
    setLinkState('idle')
    if (linkTimerRef.current) clearTimeout(linkTimerRef.current)
  }, [mode])

  const isShare = activeTab === 'share'
  const isInvite = activeTab === 'invite'
  const visibilityLabel = visibility === 'public' ? 'Public' : 'Private Link'

  const handlePublish = () => {
    setPublishing(true)
    setTimeout(() => {
      setPublishing(false)
      setPublished(true)
      if (isUpdates) setUpdatesPublished(true)
    }, 2000)
  }

  const handleUnpublish = () => {
    setUnpublishing(true)
    setTimeout(() => {
      setUnpublishing(false)
      setPublished(false)
    }, 1800)
  }

  const handleGetLink = () => {
    setLinkState('generating')
    linkTimerRef.current = setTimeout(() => {
      setLinkState('generated')
    }, 2000)
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

  /* ── Swipe gesture ── */
  const touchStartRef = useRef(null)
  const touchDirRef = useRef(null)

  const handleTouchStart = (e) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    touchDirRef.current = null
  }

  const handleTouchMove = (e) => {
    if (!touchStartRef.current) return
    const dx = e.touches[0].clientX - touchStartRef.current.x
    const dy = e.touches[0].clientY - touchStartRef.current.y
    if (touchDirRef.current === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      touchDirRef.current = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical'
    }
  }

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current || touchDirRef.current !== 'horizontal') {
      touchStartRef.current = null
      touchDirRef.current = null
      return
    }
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x
    if (dx < -50 && isShare) setActiveTab('invite')
    else if (dx > 50 && isInvite) setActiveTab('share')
    touchStartRef.current = null
    touchDirRef.current = null
  }

  const ease = `${anim.duration}s cubic-bezier(0.32, 0.72, 0, 1)`

  const renderOrbRow = ({ forPage }) => {
    const showSide = forPage === 'share' && published && visibility === 'public'
    return (
      <div style={{
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: showSide ? anim.orbGap : 0,
        marginTop: showSide ? 25 : 0,
        transition: `all ${ease}`,
      }}>
        {APP_ORBS.map((orb, i) => {
          const isMain = orb.isMain
          const mainIdx = 2
          const dist = Math.abs(i - mainIdx)
          const offsetDir = i < mainIdx ? -1 : 1
          const delay = showSide ? 0.1 + dist * anim.stagger : 0
          const mainSize = forPage === 'invite' ? 90 : (published && visibility === 'public' ? anim.mainOrbSize : 120)
          const size = isMain ? mainSize : (showSide ? anim.sideOrbSize : 0)

          if (isMain) {
            return (
              <div key={i} style={{
                position: 'relative', flexShrink: 0,
                transition: `all ${ease}`,
              }}>
                <img src={orb.src} alt="" style={{
                  width: size, height: size,
                  borderRadius: '50%', objectFit: 'cover',
                  display: 'block', transition: `all ${ease}`,
                }} />
                {/* Status badge */}
                <div style={{
                  position: 'absolute', top: -2, right: -6,
                  width: forPage === 'share' && published && visibility === 'public' ? 28 : 36,
                  height: forPage === 'share' && published && visibility === 'public' ? 28 : 36,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: forPage === 'invite' ? 0 : 1,
                  transition: `all ${ease}`,
                }}>
                  {published && visibility === 'public'
                    ? <GlobeSimple size={forPage === 'share' && published && visibility === 'public' ? 14 : 18} color="#0a0a0a" />
                    : published && visibility === 'unlisted'
                      ? <LinkSimple size={18} color="#0a0a0a" />
                      : <LockSimple size={18} color="#0a0a0a" />}
                </div>
                {/* Invite user facepile */}
                <div style={{
                  position: 'absolute', bottom: -8, left: '50%',
                  transform: 'translateX(-50%)', display: 'flex',
                  alignItems: 'center',
                  borderRadius: 177,
                  boxShadow: '0 4.5px 14px rgba(0,0,0,0.12)',
                  paddingRight: 12,
                  opacity: forPage === 'invite' ? 1 : 0,
                  transition: `opacity ${ease} ${forPage === 'invite' ? '0.1s' : '0s'}`,
                  pointerEvents: 'none',
                }}>
                  {[
                    { type: 'img', src: '/mainorb.png', hue: 30 },
                    { type: 'placeholder' },
                    { type: 'placeholder' },
                  ].map((item, j) => (
                    item.type === 'img' ? (
                      <img key={j} src={item.src} alt="" style={{
                        width: 32, height: 32, borderRadius: '50%',
                        objectFit: 'cover',
                        marginLeft: j > 0 ? -12 : 0,
                        position: 'relative',
                        zIndex: 3 - j,
                        filter: `hue-rotate(${item.hue}deg) saturate(0.5)`,
                      }} />
                    ) : (
                      <div key={j} style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: '#e0e0e0',
                        border: '2px solid #fff',
                        marginLeft: j > 0 ? -12 : 0,
                        position: 'relative',
                        zIndex: 3 - j,
                      }} />
                    )
                  ))}
                </div>
              </div>
            )
          }

          return (
            <img key={i} src={orb.src} alt="" style={{
              width: size, height: size,
              borderRadius: '50%', objectFit: 'cover', flexShrink: 0,
              opacity: showSide ? 1 : 0,
              transform: `translateX(${showSide ? 0 : offsetDir * 20}px) scale(${showSide ? 1 : 0.6})`,
              transition: `all ${anim.duration}s cubic-bezier(0.32, 0.72, 0, 1) ${delay}s`,
            }} />
          )
        })}
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'absolute', inset: 0, top: 51, background: '#fff',
          borderRadius: '38px 38px 46px 46px', display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}
      >
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content area — horizontal page slider */}
        <div style={{
          flex: 1, overflow: 'hidden', minHeight: 0,
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            display: 'flex',
            width: '200%',
            flex: 1,
            minHeight: 0,
            transform: `translateX(${isShare ? '0' : '-50%'})`,
            transition: `transform ${ease}`,
          }}>
            {/* ── Share page ── */}
            <div style={{
              width: '50%', height: '100%',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
            }}>
              {/* Share centered zone — orb + copy centered as a group */}
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', gap: published ? 30 : 20,
                transition: `gap ${ease}`,
                position: 'relative', minHeight: 0,
              }}>
                <div style={{
                  position: 'relative', width: '100%', overflow: 'hidden', flexShrink: 0,
                }}>
                  {renderOrbRow({ forPage: 'share' })}
                  {/* Left gradient fade */}
                  <div style={{
                    position: 'absolute', top: 0, bottom: 0, left: 0, width: 40,
                    background: 'linear-gradient(to right, #fff, rgba(255,255,255,0))',
                    pointerEvents: 'none', zIndex: 1,
                    opacity: published && visibility === 'public' ? 1 : 0,
                    transition: `opacity ${ease}`,
                  }} />
                  {/* Right gradient fade */}
                  <div style={{
                    position: 'absolute', top: 0, bottom: 0, right: 0, width: 40,
                    background: 'linear-gradient(to left, #fff, rgba(255,255,255,0))',
                    pointerEvents: 'none', zIndex: 1,
                    opacity: published && visibility === 'public' ? 1 : 0,
                    transition: `opacity ${ease}`,
                  }} />
                </div>
                {/* Copy wrapper */}
                <div style={{ position: 'relative', width: '100%', padding: '0 30px' }}>
                  {/* Unpublished copy — fades out first, fades in after delay */}
                  <div style={{
                    display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center',
                    opacity: !published ? 1 : 0,
                    transition: `opacity ${anim.copyFadeDuration}s cubic-bezier(0.32, 0.72, 0, 1) ${!published ? anim.copyFadeDelay + 's' : '0s'}`,
                  }}>
                    <h1 style={{ fontSize: 24, fontWeight: 500, lineHeight: '28px', color: '#0a0a0a' }}>
                      {isLink ? 'Your mini-app is private. Publish it to share it with the world' : 'Your mini-app is private. Publish it to share'}
                    </h1>
                    <p style={{ fontSize: 16, fontWeight: 400, lineHeight: '18px', color: '#737373', maxWidth: 306 }}>
                      {isLink ? 'None of your app data is shared upon publishing. Users will see an empty version of your app.' : 'Only your app is shared, never your personal data'}
                    </p>
                  </div>
                  {/* Published copy — fades out first, fades in after delay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center',
                    justifyContent: 'center', padding: '0 30px',
                    opacity: published ? 1 : 0,
                    transition: `opacity ${anim.copyFadeDuration}s cubic-bezier(0.32, 0.72, 0, 1) ${published ? anim.copyFadeDelay + 's' : '0s'}`,
                    pointerEvents: published ? 'auto' : 'none',
                  }}>
                    <h1 style={{ fontSize: 24, fontWeight: 500, lineHeight: '28px', color: '#0a0a0a' }}>
                      {hasUnpublishedUpdates ? 'Your app has unpublished updates' : 'Your mini-app is published!'}
                    </h1>
                    <p style={{ fontSize: 16, fontWeight: 400, lineHeight: '18px', color: '#737373', maxWidth: 306 }}>
                      {hasUnpublishedUpdates ? 'Republish your app if you want to share with latest updates included.' : 'Your app is live and ready to share'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Share bottom controls */}
              <div style={{ flexShrink: 0, padding: '0 20px' }}>
                <div style={{
                  background: isLink ? 'none' : '#f5f5f5', borderRadius: 32,
                  padding: isLink ? 0 : 20, display: 'flex', flexDirection: 'column', gap: 0,
                  transition: `all ${ease}`,
                }}>
                  {/* Unpublished: expanded visibility options (clarity only) */}
                  {clarity && (
                    <div style={{
                      maxHeight: !published ? 200 : 0,
                      opacity: !published ? 1 : 0,
                      overflow: 'hidden',
                      transition: `all ${ease}`,
                      marginBottom: !published ? 16 : 0,
                    }}>
                      <div style={{ background: '#fff', borderRadius: 24, padding: '8px 8px', display: 'flex', flexDirection: 'column' }}>
                        <button
                          onClick={() => setVisibility('public')}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 10, padding: '14px 14px 14px 10px',
                            background: 'none', border: 'none', cursor: 'pointer',
                            width: '100%', fontFamily: 'inherit', textAlign: 'left',
                          }}
                        >
                          <GlobeSimple size={28} color={visibility === 'public' ? '#0a0a0a' : '#949494'} />
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <span style={{ fontSize: 15, fontWeight: 500, lineHeight: '18px', color: visibility === 'public' ? '#0a0a0a' : '#949494' }}>Public</span>
                            <span style={{ fontSize: 13, fontWeight: 400, lineHeight: '16px', color: visibility === 'public' ? '#737373' : '#aaaaaa' }}>
                              Discoverable by everyone on Explore and via share link
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
                          <LinkSimple size={28} color={visibility === 'unlisted' ? '#0a0a0a' : '#949494'} />
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <span style={{ fontSize: 15, fontWeight: 500, lineHeight: '18px', color: visibility === 'unlisted' ? '#0a0a0a' : '#949494' }}>Private Link</span>
                            <span style={{ fontSize: 13, fontWeight: 400, lineHeight: '16px', color: visibility === 'unlisted' ? '#525252' : '#aaaaaa' }}>
                              Only people with your link can open it
                            </span>
                          </div>
                          {visibility === 'unlisted'
                            ? <CheckCircle size={28} weight="fill" color="#0a0a0a" />
                            : <Circle size={28} color="#d4d4d4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Collapsed visibility row — smoothly sizes between unpublished and published */}
                  <div style={{
                    maxHeight: ((published || !clarity) && !(isLink && !published)) ? 100 : 0,
                    opacity: ((published || !clarity) && !(isLink && !published)) ? 1 : 0,
                    overflow: 'hidden',
                    transition: `all ${ease}`,
                    marginBottom: ((published || !clarity) && !(isLink && !published)) ? (published ? 12 : 16) : 0,
                  }}>
                    <button
                      onClick={() => setSheetOpen(true)}
                      style={{
                        background: '#fff',
                        borderRadius: published ? 20 : 24,
                        padding: published ? '14px 16px 14px 10px' : '20px 20px 20px 12px',
                        display: 'flex', alignItems: 'center',
                        gap: published ? 10 : 12,
                        cursor: 'pointer', border: 'none', width: '100%', fontFamily: 'inherit',
                        transition: `all ${ease}`,
                      }}
                    >
                      <div style={{
                        flexShrink: 0,
                        padding: published ? 3 : 5,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: `all ${ease}`,
                      }}>
                        {visibility === 'public'
                          ? <GlobeSimple size={published ? 24 : 32} color="#0a0a0a" />
                          : <LinkSimple size={published ? 24 : 32} color="#0a0a0a" />}
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: published ? 1 : 2, textAlign: 'left', transition: `all ${ease}` }}>
                        <span style={{
                          fontSize: published ? 11 : 12, lineHeight: published ? '13px' : '14px',
                          color: '#737373', fontWeight: 400, transition: `all ${ease}`,
                        }}>Visibility</span>
                        <span style={{
                          fontSize: published ? 14 : 16, lineHeight: published ? '16px' : '18px',
                          color: '#0a0a0a', fontWeight: 500, transition: `all ${ease}`,
                        }}>{visibilityLabel}</span>
                      </div>
                      <CaretRight size={published ? 16 : 18} weight="bold" color="#0a0a0a" style={{ opacity: 0.7 }} />
                    </button>
                  </div>

                  {/* Link mode: disclaimer + private share link card */}
                  {isLink && !published && (
                    <>
                      <p style={{
                        fontSize: 12, fontWeight: 400, lineHeight: '16px',
                        color: '#a3a3a3', textAlign: 'center', padding: '0 8px',
                        marginBottom: 16,
                      }}>
                        None of your data is shared upon publish or share
                      </p>
                      <div style={{
                        maxHeight: linkState !== 'idle' ? 300 : 0,
                        opacity: linkState !== 'idle' ? 1 : 0,
                        overflow: 'hidden',
                        transition: `all ${ease}`,
                        marginBottom: linkState !== 'idle' ? 12 : 0,
                      }}>
                        <div style={{
                          background: '#fff', borderRadius: 20, padding: 16,
                          display: 'flex', flexDirection: 'column', gap: 10,
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <LinkSimple size={18} color="#0a0a0a" />
                            <span style={{ fontSize: 15, fontWeight: 600, color: '#0a0a0a' }}>Private share link</span>
                          </div>
                          <p style={{ fontSize: 13, fontWeight: 400, lineHeight: '17px', color: '#737373', margin: 0 }}>
                            Private mini-apps are only visible to you and whoever you share the link to.
                          </p>
                          <div style={{
                            background: '#f5f5f5', borderRadius: 12, padding: '12px 14px',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          }}>
                            {linkState === 'generating' ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <SpinnerGap size={16} color="#a3a3a3" style={{ animation: 'spin 1s linear infinite' }} />
                                <span style={{ fontSize: 14, fontWeight: 400, color: '#a3a3a3' }}>Generating share link</span>
                              </div>
                            ) : (
                              <>
                                <span style={{ fontSize: 14, fontWeight: 500, color: '#0a0a0a' }}>wabi.ai/121212</span>
                                <Copy size={18} color="#737373" style={{ cursor: 'pointer' }} />
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Action button */}
                  <button
                    onClick={() => { !publishing && !unpublishing && (published && !hasUnpublishedUpdates ? handleShare() : handlePublish()) }}
                    style={{
                      width: '100%', background: '#171717', color: '#fafafa',
                      border: 'none', borderRadius: 999, padding: '18px 30px',
                      fontSize: 15, fontWeight: 500, lineHeight: '20px',
                      cursor: publishing || unpublishing ? 'default' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7.5,
                      boxShadow: '0 1.87px 3.73px rgba(0,0,0,0.16)', fontFamily: 'inherit',
                    }}
                  >
                    {publishing
                      ? <><CloudArrowUp size={22} color="#fafafa" /> Publishing...</>
                      : hasUnpublishedUpdates
                        ? <><CloudArrowUp size={22} color="#fafafa" /> Publish updates</>
                        : published
                          ? <><Export size={22} color="#fafafa" /> Share mini-app</>
                          : isLink
                            ? <><CloudArrowUp size={22} color="#fafafa" /> Publish mini-app</>
                            : <><CloudArrowUp size={22} color="#fafafa" /> Publish</>}
                  </button>

                  {/* Get private share link — link mode, unpublished, idle */}
                  <div style={{
                    maxHeight: (isLink && !published && linkState === 'idle') ? 60 : 0,
                    opacity: (isLink && !published && linkState === 'idle') ? 1 : 0,
                    overflow: 'hidden',
                    transition: `all ${ease}`,
                    marginTop: (isLink && !published && linkState === 'idle') ? 8 : 0,
                  }}>
                    <button
                      onClick={handleGetLink}
                      style={{
                        width: '100%', background: 'none', color: '#737373',
                        border: 'none', padding: '14px 0',
                        fontSize: 15, fontWeight: 500, lineHeight: '20px', cursor: 'pointer',
                        fontFamily: 'inherit', textAlign: 'center',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      }}
                    >
                      <LinkSimple size={18} weight="bold" color="#737373" /> Get private share link
                    </button>
                  </div>

                  {/* Share old version button — updates state only */}
                  <div style={{
                    maxHeight: hasUnpublishedUpdates ? 60 : 0,
                    opacity: hasUnpublishedUpdates ? 1 : 0,
                    overflow: 'hidden',
                    transition: `all ${ease}`,
                    marginTop: hasUnpublishedUpdates ? 8 : 0,
                  }}>
                    <button
                      onClick={() => handleShare()}
                      style={{
                        width: '100%', background: '#fff', color: '#0a0a0a',
                        border: 'none', borderRadius: 999, padding: '18px 30px',
                        fontSize: 15, fontWeight: 500, lineHeight: '20px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7.5,
                        boxShadow: '0 1.87px 3.73px rgba(0,0,0,0.08)', fontFamily: 'inherit',
                      }}
                    >
                      <Export size={22} color="#0a0a0a" /> Share old version
                    </button>
                  </div>
                </div>

              </div>
              <div style={{ height: 28, flexShrink: 0 }} />
            </div>

            {/* ── Invite page ── */}
            <div style={{
              width: '50%', height: '100%',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* Invite orb */}
              <div style={{ flexShrink: 0, padding: '16px 0 12px', display: 'flex', justifyContent: 'center' }}>
                {renderOrbRow({ forPage: 'invite' })}
              </div>
              {/* Invite copy */}
              <div style={{
                flexShrink: 0, textAlign: 'center', padding: '0 30px',
                display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center',
              }}>
                <h1 style={{ fontSize: 24, fontWeight: 500, lineHeight: '28px', color: '#0a0a0a' }}>
                  Use this app together
                </h1>
                <p style={{ fontSize: 16, fontWeight: 400, lineHeight: '18px', color: '#737373', maxWidth: 306 }}>
                  Invite friends to use this app with you
                </p>
              </div>

              {/* Users & Explore card */}
              <div style={{ padding: '12px 20px 0', flexShrink: 0 }}>
                <div style={{
                  background: '#f5f5f5', borderRadius: 24, overflow: 'hidden',
                }}>
                  {/* 3 users row */}
                  <button style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '18px 20px', width: '100%',
                    background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left' }}>
                      <span style={{ fontSize: 16, fontWeight: 500, lineHeight: '20px', color: '#0a0a0a' }}>3 users</span>
                      <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '17px', color: '#a3a3a3' }}>You and 2 more</span>
                    </div>
                    <CaretRight size={18} weight="bold" color="#0a0a0a" style={{ opacity: 0.5 }} />
                  </button>
                  {/* Divider */}
                  <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 20px' }} />
                  {/* Add to explore row */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '18px 20px',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ fontSize: 16, fontWeight: 500, lineHeight: '20px', color: '#0a0a0a' }}>Add to explore</span>
                      <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '17px', color: '#a3a3a3' }}>so anyone on wabi can join</span>
                    </div>
                    {/* Toggle */}
                    <div
                      onClick={() => setExploreEnabled(!exploreEnabled)}
                      style={{
                        width: 44, height: 26, borderRadius: 13, flexShrink: 0,
                        background: exploreEnabled ? '#0a0a0a' : 'rgba(0,0,0,0.15)',
                        position: 'relative', cursor: 'pointer',
                        transition: 'background 0.2s ease',
                      }}
                    >
                      <div style={{
                        width: 22, height: 22, borderRadius: 11,
                        background: '#fff',
                        position: 'absolute', top: 2,
                        left: exploreEnabled ? 20 : 2,
                        transition: 'left 0.2s ease',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                      }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div style={{ padding: '12px 20px 4px', flexShrink: 0 }}>
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
              <div style={{ flex: 1, overflow: 'auto', padding: '8px 20px', minHeight: 0 }}>
                {MOCK_USERS.map((user, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', padding: '10px 0', gap: 12,
                  }}>
                    <img
                      src="/mainorb.png"
                      alt=""
                      style={{
                        width: 42, height: 42, borderRadius: '50%',
                        objectFit: 'cover', flexShrink: 0,
                        filter: `hue-rotate(${user.hue}deg) saturate(0.6)`,
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

              {/* Invite bottom button */}
              <div style={{ padding: '0 20px 28px', flexShrink: 0 }}>
                <button style={{
                  width: '100%', background: '#171717', color: '#fafafa',
                  border: 'none', borderRadius: 999, padding: '18px 30px',
                  fontSize: 15, fontWeight: 500, lineHeight: '20px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7.5,
                  boxShadow: '0 1.87px 3.73px rgba(0,0,0,0.16)', fontFamily: 'inherit',
                }}>
                  <Broadcast size={20} color="#fafafa" /> Invite via link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(published || (!clarity && !isLink)) && (
        <VisibilitySheet
          open={sheetOpen}
          visibility={visibility}
          published={published}
          onSelect={(v) => { if (v === 'private') { handleUnpublish(); } else { setVisibility(v); } setSheetOpen(false) }}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </div>
  )
}

/* ─── Mobile Controls ─── */

function MobileControls({ mode, onModeChange, screen, onScreenChange, anim, onAnimChange }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating trigger pill */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', bottom: 24, left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 999,
          padding: '12px 20px',
          fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.7)',
          cursor: 'pointer', fontFamily: 'inherit',
          display: open ? 'none' : 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        Controls
        <CaretRight size={12} weight="bold" color="rgba(255,255,255,0.4)" />
      </button>

      {/* Full-screen overlay */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 50,
          background: 'rgba(0,0,0,0.85)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%', maxWidth: 320,
            padding: '24px 20px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 28,
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column', gap: 20,
            transform: open ? 'scale(1)' : 'scale(0.95)',
            transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
            fontFamily: '"Selecta", -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
            color: '#fff',
          }}
        >
          <SegmentedControl
            label="Layout"
            options={[
              { label: 'v1: Clarity', value: 'clarity' },
              { label: 'v2: Minimal', value: 'minimal' },
              { label: 'v3: Link', value: 'link' },
            ]}
            value={mode}
            onChange={onModeChange}
          />
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <SegmentedControl
            label="State of app"
            options={[
              { label: 'First publish', value: 'first-publish' },
              { label: 'App has updates', value: 'updates' },
            ]}
            value={screen}
            onChange={onScreenChange}
          />
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <AnimationControls anim={anim} onAnimChange={onAnimChange} />
          <button
            onClick={() => setOpen(false)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none', borderRadius: 12,
              padding: '14px', width: '100%',
              fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer', fontFamily: 'inherit',
              marginTop: 4,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}

/* ─── App ─── */

export default function App() {
  const [mode, setMode] = useState('minimal')
  const [screen, setScreen] = useState('first-publish')
  const [anim, setAnim] = useState({ ...DEFAULT_ANIM })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 500)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) {
    return (
      <div style={{
        width: '100vw', height: '100dvh', position: 'relative',
        fontFamily: '"Selecta", -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
        color: '#fff', overflow: 'hidden',
      }}>
        <ShareScreen mode={mode} screen={screen} anim={anim} />
        <MobileControls mode={mode} onModeChange={setMode} screen={screen} onScreenChange={setScreen} anim={anim} onAnimChange={setAnim} />
      </div>
    )
  }

  return (
    <div style={{
      width: '100vw', height: '100dvh', background: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '"Selecta", -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
      color: '#fff',
    }}>
      <Sidebar mode={mode} onModeChange={setMode} screen={screen} onScreenChange={setScreen} anim={anim} onAnimChange={setAnim} />
      <IPhoneFrame>
        <ShareScreen mode={mode} screen={screen} anim={anim} />
      </IPhoneFrame>
    </div>
  )
}
