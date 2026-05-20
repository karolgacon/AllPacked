type IconProps = {
  className?: string
}

export function MailIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m5 7 7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LockIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 10V8a4 4 0 1 1 8 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function EyeIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2.5 12C4.5 7.5 8 5 12 5s7.5 2.5 9.5 7c-2 4.5-5.5 7-9.5 7s-7.5-2.5-9.5-7Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function EyeOffIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 3l18 18M10.5 10.7A2.5 2.5 0 0 0 12 16.5a2.5 2.5 0 0 0 2.3-1.5M6.7 6.8C4.8 8.2 3.4 10 2.5 12c2 4.5 5.5 7 9.5 7 1.6 0 3.1-.4 4.4-1.2M14 5.2c-.6-.1-1.3-.2-2-.2-4 0-7.5 2.5-9.5 7 .6 1.4 1.5 2.6 2.6 3.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function GoogleIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
      />
    </svg>
  )
}

export function AppleIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.365 1.43c0 1.14-.42 2.09-1.24 2.84-.9.83-1.96 1.24-3.1 1.17-.14-1.09.38-2.22 1.15-2.97.88-.86 2.33-1.41 3.19-1.04ZM20.8 17.13c-.57 1.31-.85 1.9-1.58 3.06-1.02 1.58-2.46 3.55-4.24 3.57-1.59.02-2-.98-4.16-.96-2.16.02-2.62 1-4.21.98-1.78-.03-3.14-1.72-4.16-3.3C1.01 18.28.03 14.66 2.2 11.9c1.08-1.36 2.78-2.16 4.38-2.16 2.05-.03 3.34 1.01 4.16 1.01.8 0 2.3-1.25 4.38-1.07 1.49.06 2.78.72 3.73 1.84-3.28 1.98-2.75 7.14.95 8.61Z" />
    </svg>
  )
}

export function SuitcaseWatermark({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 240"
      fill="none"
      aria-hidden
    >
      <rect x="30" y="70" width="140" height="130" rx="16" fill="white" fillOpacity="0.35" />
      <rect
        x="30"
        y="70"
        width="140"
        height="130"
        rx="16"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="2"
      />
      <path
        d="M70 70V55a30 30 0 0 1 60 0v15"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect x="88" y="120" width="24" height="36" rx="4" fill="white" fillOpacity="0.25" />
      <line x1="50" y1="110" x2="150" y2="110" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
      <circle cx="55" cy="185" r="8" fill="white" fillOpacity="0.2" />
      <circle cx="145" cy="185" r="8" fill="white" fillOpacity="0.2" />
    </svg>
  )
}
