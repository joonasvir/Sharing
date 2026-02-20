import { useState } from 'react'

const styles = {
  wrapper: {
    width: '100%',
    maxWidth: 402,
    height: '100dvh',
    maxHeight: 872,
    position: 'relative',
    background: '#000',
    overflow: 'hidden',
  },
  sheet: {
    position: 'absolute',
    inset: 0,
    top: 51,
    background: '#fff',
    borderRadius: '38px 38px 46px 46px',
    boxShadow: '0 15px 75px rgba(0,0,0,0.18)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  tabs: {
    margin: '20px 27px 0',
    background: 'rgba(246,246,246,0.5)',
    borderRadius: 155,
    display: 'flex',
    padding: 4,
    position: 'relative',
    flexShrink: 0,
  },
  tabInner: {
    boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.07)',
    borderRadius: 'inherit',
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  tab: (active) => ({
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
    background: active ? '#fff' : 'transparent',
    boxShadow: active ? '0 4px 12px rgba(0,0,0,0.12)' : 'none',
    opacity: active ? 1 : 0.5,
    transition: 'all 0.2s ease',
    position: 'relative',
    zIndex: 1,
    fontFamily: 'inherit',
  }),
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 40px',
    textAlign: 'center',
    gap: 25,
  },
  orb: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  textBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: '28px',
    color: '#0a0a0a',
  },
  body: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '18px',
    color: '#737373',
    maxWidth: 306,
  },
  bottomSection: {
    flexShrink: 0,
    margin: '0 20px 34px',
    background: '#f5f5f5',
    borderRadius: 32,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  visibilityRow: {
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
  },
  visibilityIcon: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  visibilityText: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    textAlign: 'left',
  },
  visibilityLabel: {
    fontSize: 12,
    lineHeight: '14px',
    color: '#737373',
    fontWeight: 400,
  },
  visibilityValue: {
    fontSize: 16,
    lineHeight: '18px',
    color: '#0a0a0a',
    fontWeight: 500,
  },
  chevron: {
    width: 24,
    height: 24,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0a0a0a',
  },
  publishBtn: {
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
  },
}

function GlobeIcon({ size = 32, color = '#0a0a0a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="13" stroke={color} strokeWidth="1.8" />
      <ellipse cx="16" cy="16" rx="6.5" ry="13" stroke={color} strokeWidth="1.8" />
      <line x1="3" y1="16" x2="29" y2="16" stroke={color} strokeWidth="1.8" />
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

function CloudUploadIcon({ size = 24, color = '#fafafa' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 16V8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M9 11L12 8L15 11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('share')

  return (
    <div style={styles.wrapper}>
      <div style={styles.sheet}>
        {/* Tabs */}
        <div style={styles.tabs}>
          <button style={styles.tab(activeTab === 'share')} onClick={() => setActiveTab('share')}>
            <ShareIcon size={22} />
            Share
          </button>
          <button style={styles.tab(activeTab === 'invite')} onClick={() => setActiveTab('invite')}>
            <InviteIcon size={22} />
            Invite
          </button>
          <div style={styles.tabInner} />
        </div>

        {/* Center content */}
        <div style={styles.content}>
          <img src="/orb.png" alt="" style={styles.orb} />
          <div style={styles.textBlock}>
            <h1 style={styles.heading}>
              Your mini-app isn&rsquo;t published yet. Publish to share it.
            </h1>
            <p style={styles.body}>
              None of your app data is shared upon publishing. Other users will see an empty version of your app.
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div style={styles.bottomSection}>
          <button style={styles.visibilityRow}>
            <div style={styles.visibilityIcon}>
              <GlobeIcon size={32} />
            </div>
            <div style={styles.visibilityText}>
              <span style={styles.visibilityLabel}>Visibility</span>
              <span style={styles.visibilityValue}>Public</span>
            </div>
            <div style={styles.chevron}>
              <ChevronRight />
            </div>
          </button>

          <button style={styles.publishBtn}>
            <CloudUploadIcon />
            Publish
          </button>
        </div>
      </div>
    </div>
  )
}
