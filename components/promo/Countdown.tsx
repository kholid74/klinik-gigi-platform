'use client'

import { useEffect, useState } from 'react'

function getTimeLeft(endDate: string) {
  const diff = new Date(endDate).getTime() - Date.now()
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  }
}

export function Countdown({ endDate }: { endDate: string }) {
  const [time, setTime] = useState(getTimeLeft(endDate))

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(endDate)), 1000)
    return () => clearInterval(id)
  }, [endDate])

  return (
    <div className="flex items-center gap-2">
      {[{ v: time.d, l: 'Hari' }, { v: time.h, l: 'Jam' }, { v: time.m, l: 'Mnt' }, { v: time.s, l: 'Det' }].map(({ v, l }) => (
        <div key={l} className="bg-white/20 rounded-lg px-3 py-2 text-center min-w-[52px]">
          <div className="font-bold text-xl leading-none">{String(v).padStart(2, '0')}</div>
          <div className="text-[10px] text-white/70 mt-0.5">{l}</div>
        </div>
      ))}
    </div>
  )
}
