export function ToothIcon({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2C9.2 2 7 4.5 7 7.5C7 9.3 7.5 10.7 8 12.2C8.5 13.7 8.5 15.2 8 17.2C7.5 19.2 7 21 8.5 22C9.5 22.7 10.5 22 11.5 20C12 19 12 18.2 12 18.2C12 18.2 12 19 12.5 20C13.5 22 14.5 22.7 15.5 22C17 21 16.5 19.2 16 17.2C15.5 15.2 15.5 13.7 16 12.2C16.5 10.7 17 9.3 17 7.5C17 4.5 14.8 2 12 2Z"
        fill="currentColor"
      />
      <path
        d="M10 6C10 6 9.2 7.2 9.2 8.5"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  )
}
