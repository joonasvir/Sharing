import { useState } from 'react'

/* ─── Icons ─── */

function GlobeIcon({ size = 32, color = '#0a0a0a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="13" stroke={color} strokeWidth="1.8" />
      <ellipse cx="16" cy="16" rx="6.5" ry="13" stroke={color} strokeWidth="1.8" />
      <line x1="3" y1="16" x2="29" y2="16" stroke={color} strokeWidth="1.8" />
    </svg>
  )
}

function LinkIcon({ size = 40, color = '#0a0a0a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M17.5 22.5L22.5 17.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M14.5 25.5L11.46 28.54C10.09 29.91 7.91 29.91 6.54 28.54C5.17 27.17 5.17 24.99 6.54 23.62L11.5 18.5C12.87 17.13 15.05 17.13 16.42 18.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M25.5 14.5L28.54 11.46C29.91 10.09 29.91 7.91 28.54 6.54C27.17 5.17 24.99 5.17 23.62 6.54L18.5 11.5C17.13 12.87 17.13 15.05 18.5 16.42" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ShareIcon({ size = 22, color = '#191919' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L12 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M8 7L12 3L16 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 13V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V13" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function InviteIcon({ size = 22, color = '#191919' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="10" cy="8" r="4" stroke={color} strokeWidth="2" />
      <path d="M2 20C2 16.6863 5.58172 14 10 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M18 14V20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M15 17H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ChevronRight({ size = 24, color = '#0a0a0a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 6L15 12L9 18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronLeft({ size = 24, color = '#0a0a0a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M15 6L9 12L15 18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloudUploadIcon({ size = 24, color = '#fafafa' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 16V8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M9 11L12 8L15 11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#0a0a0a" />
      <path d="M10 16.5L14 20.5L22 12.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EmptyCircle({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" stroke="#d4d4d4" strokeWidth="1.5" />
    </svg>
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
      {/* Dynamic Island */}
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
      {/* Screen content */}
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

function Sidebar({ mode, onModeChange }) {
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
        label="Layout"
        options={[
          { label: 'Normal', value: 'normal' },
          { label: 'Minimal', value: 'minimal' },
        ]}
        value={mode}
        onChange={onModeChange}
      />
    </div>
  )
}

/* ─── Visibility Sheet ─── */

function VisibilitySheet({ open, visibility, onSelect, onClose }) {
  return (
    <>
      {/* Scrim */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 20,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />
      {/* Sheet */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderRadius: '32px 32px 46px 46px',
        zIndex: 30,
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        padding: '20px 20px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}>
          <button
            onClick={onClose}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              border: 'none',
              background: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
              flexShrink: 0,
              zIndex: 1,
            }}
          >
            <ChevronLeft />
          </button>
          <span style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 500,
            color: '#0a0a0a',
          }}>
            Set visibility
          </span>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Public */}
          <button
            onClick={() => onSelect('public')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 20px 24px 16px',
              borderRadius: 24,
              border: visibility === 'public' ? 'none' : '1px solid rgba(0,0,0,0.08)',
              background: visibility === 'public' ? '#f5f5f5' : '#fff',
              cursor: 'pointer',
              width: '100%',
              fontFamily: 'inherit',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ padding: 7, flexShrink: 0 }}>
                <GlobeIcon size={40} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 18, fontWeight: 500, lineHeight: '22px', color: '#0a0a0a' }}>
                  Public
                </span>
                <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '16px', color: '#525252' }}>
                  Visible on Explore, anyone can search for and view
                </span>
              </div>
            </div>
            {visibility === 'public' ? <CheckIcon /> : <EmptyCircle />}
          </button>

          {/* Unlisted */}
          <button
            onClick={() => onSelect('unlisted')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 20px 24px 16px',
              borderRadius: 24,
              border: visibility === 'unlisted' ? 'none' : '1px solid rgba(0,0,0,0.08)',
              background: visibility === 'unlisted' ? '#f5f5f5' : '#fff',
              cursor: 'pointer',
              width: '100%',
              fontFamily: 'inherit',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ padding: 7, flexShrink: 0 }}>
                <LinkIcon size={40} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{
                  fontSize: 18, fontWeight: 500, lineHeight: '22px',
                  color: visibility === 'unlisted' ? '#0a0a0a' : '#737373',
                }}>
                  Unlisted
                </span>
                <span style={{
                  fontSize: 14, fontWeight: 400, lineHeight: '16px',
                  color: visibility === 'unlisted' ? '#525252' : '#737373',
                }}>
                  Not visible on Explore or search, anyone with the link can view
                </span>
              </div>
            </div>
            {visibility === 'unlisted' ? <CheckIcon /> : <EmptyCircle />}
          </button>
        </div>
      </div>
    </>
  )
}

/* ─── Share Screen ─── */

function ShareScreen({ mode }) {
  const [activeTab, setActiveTab] = useState('share')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [visibility, setVisibility] = useState('public')
  const minimal = mode === 'minimal'

  const visibilityLabel = visibility === 'public' ? 'Public' : 'Unlisted'

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      background: '#000',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        top: 51,
        background: '#fff',
        borderRadius: '38px 38px 46px 46px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Tabs */}
        {!minimal && (
          <div style={{
            margin: '20px 27px 0',
            background: 'rgba(246,246,246,0.5)',
            borderRadius: 155,
            display: 'flex',
            padding: 4,
            position: 'relative',
            flexShrink: 0,
          }}>
            <button
              onClick={() => setActiveTab('share')}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '16px 0',
                borderRadius: 155,
                border: 'none',
                cursor: 'pointer',
                fontSize: 17.7,
                fontWeight: 500,
                color: '#191919',
                background: activeTab === 'share' ? '#fff' : 'transparent',
                boxShadow: activeTab === 'share' ? '0 4px 12px rgba(0,0,0,0.12)' : 'none',
                opacity: activeTab === 'share' ? 1 : 0.5,
                transition: 'all 0.2s ease',
                position: 'relative',
                zIndex: 1,
                fontFamily: 'inherit',
              }}
            >
              <ShareIcon size={22} />
              Share
            </button>
            <button
              onClick={() => setActiveTab('invite')}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '16px 0',
                borderRadius: 155,
                border: 'none',
                cursor: 'pointer',
                fontSize: 17.7,
                fontWeight: 500,
                color: '#191919',
                background: activeTab === 'invite' ? '#fff' : 'transparent',
                boxShadow: activeTab === 'invite' ? '0 4px 12px rgba(0,0,0,0.12)' : 'none',
                opacity: activeTab === 'invite' ? 1 : 0.5,
                transition: 'all 0.2s ease',
                position: 'relative',
                zIndex: 1,
                fontFamily: 'inherit',
              }}
            >
              <InviteIcon size={22} />
              Invite
            </button>
            <div style={{
              boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.07)',
              borderRadius: 'inherit',
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
            }} />
          </div>
        )}

        {/* Center content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 40px',
          textAlign: 'center',
          gap: 25,
        }}>
          <img src="/orb.png" alt="" style={{
            width: minimal ? 80 : 120,
            height: minimal ? 80 : 120,
            borderRadius: '50%',
            objectFit: 'cover',
            transition: 'all 0.3s ease',
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
            <h1 style={{
              fontSize: minimal ? 20 : 24,
              fontWeight: 500,
              lineHeight: minimal ? '24px' : '28px',
              color: '#0a0a0a',
              transition: 'all 0.3s ease',
            }}>
              {minimal
                ? 'Publish to share it.'
                : 'Your mini-app isn\u2019t published yet. Publish to share it.'}
            </h1>
            {!minimal && (
              <p style={{
                fontSize: 16,
                fontWeight: 400,
                lineHeight: '18px',
                color: '#737373',
                maxWidth: 306,
              }}>
                None of your app data is shared upon publishing. Other users will see an empty version of your app.
              </p>
            )}
          </div>
        </div>

        {/* Bottom section */}
        <div style={{
          flexShrink: 0,
          margin: '0 20px 34px',
          background: minimal ? 'transparent' : '#f5f5f5',
          borderRadius: 32,
          padding: minimal ? '0' : 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          transition: 'all 0.3s ease',
        }}>
          {!minimal && (
            <button
              onClick={() => setSheetOpen(true)}
              style={{
                background: '#fff',
                borderRadius: 24,
                padding: '20px 20px 20px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                border: 'none',
                width: '100%',
                fontFamily: 'inherit',
              }}
            >
              <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                {visibility === 'public' ? <GlobeIcon size={32} /> : <LinkIcon size={32} />}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left' }}>
                <span style={{ fontSize: 12, lineHeight: '14px', color: '#737373', fontWeight: 400 }}>Visibility</span>
                <span style={{ fontSize: 16, lineHeight: '18px', color: '#0a0a0a', fontWeight: 500 }}>{visibilityLabel}</span>
              </div>
              <div style={{ width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight />
              </div>
            </button>
          )}

          <button style={{
            width: '100%',
            background: '#171717',
            color: '#fafafa',
            border: 'none',
            borderRadius: 999,
            padding: '18px 30px',
            fontSize: 15,
            fontWeight: 500,
            lineHeight: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7.5,
            boxShadow: '0 1.87px 3.73px rgba(0,0,0,0.16)',
            fontFamily: 'inherit',
          }}>
            <CloudUploadIcon />
            Publish
          </button>
        </div>
      </div>

      {/* Visibility bottom sheet */}
      <VisibilitySheet
        open={sheetOpen}
        visibility={visibility}
        onSelect={(v) => {
          setVisibility(v)
          setSheetOpen(false)
        }}
        onClose={() => setSheetOpen(false)}
      />
    </div>
  )
}

/* ─── App ─── */

export default function App() {
  const [mode, setMode] = useState('normal')

  return (
    <div style={{
      width: '100vw',
      height: '100dvh',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
      color: '#fff',
    }}>
      <Sidebar mode={mode} onModeChange={setMode} />
      <IPhoneFrame>
        <ShareScreen mode={mode} />
      </IPhoneFrame>
    </div>
  )
}
