/* Branding for the Payload admin (login screen and navigation icon). */
const Mark = ({ size }: { size: number }) => (
  <svg viewBox="0 0 44 44" width={size} height={size} aria-hidden="true">
    <circle cx="22" cy="22" r="21" fill="#103D30" />
    <path d="M22 9c6 5 8 11 4 18-2 3-4 5-4 8 0-3-2-5-4-8-4-7-2-13 4-18Z" fill="#00BA89" />
    <circle cx="22" cy="22" r="17" fill="none" stroke="#D5AE62" strokeWidth=".8" />
  </svg>
)

export function AdminLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <Mark size={52} />
      <div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '0.12em' }}>ACIEA</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Administration du site</div>
      </div>
    </div>
  )
}

export function AdminIcon() {
  return <Mark size={28} />
}
