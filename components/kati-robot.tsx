"use client"

export function KatiRobot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 飘动的气泡 */}
      <circle cx="100" cy="22" r="7" fill="#edce7a" className="animate-bubble" style={{ animationDelay: "0ms" }} />
      <circle cx="90" cy="35" r="5.5" fill="#edce7a" className="animate-bubble" style={{ animationDelay: "200ms" }} />
      <circle cx="108" cy="38" r="4" fill="#edce7a" className="animate-bubble" style={{ animationDelay: "400ms" }} />
      
      {/* 天线底座 */}
      <ellipse cx="100" cy="58" rx="10" ry="6" fill="#3d9485" />
      <rect x="96" y="48" width="8" height="12" fill="#4fb19d" rx="2" />
      
      {/* 头部外框 - 带圆角的方形 */}
      <rect x="38" y="65" width="124" height="95" rx="28" fill="#7eb8d6" />
      
      {/* 头部内框 - 面板 */}
      <rect x="48" y="75" width="104" height="75" rx="20" fill="#9ac5e5" />
      
      {/* 耳朵/侧边装饰 */}
      <rect x="25" y="95" width="18" height="40" rx="9" fill="#4fb19d" />
      <rect x="157" y="95" width="18" height="40" rx="9" fill="#4fb19d" />
      
      {/* 左眼 */}
      <g className="animate-blink" style={{ transformOrigin: "72px 112px" }}>
        <circle cx="72" cy="112" r="18" fill="#0a0a0c" />
        <circle cx="72" cy="112" r="14" fill="#4fb19d" />
        <circle cx="72" cy="112" r="8" fill="#0a0a0c" />
        <circle cx="68" cy="108" r="3" fill="#ffffff" opacity="0.6" />
      </g>
      
      {/* 右眼 */}
      <g className="animate-blink" style={{ transformOrigin: "128px 112px", animationDelay: "0.1s" }}>
        <circle cx="128" cy="112" r="18" fill="#0a0a0c" />
        <circle cx="128" cy="112" r="14" fill="#4fb19d" />
        <circle cx="128" cy="112" r="8" fill="#0a0a0c" />
        <circle cx="124" cy="108" r="3" fill="#ffffff" opacity="0.6" />
      </g>
      
      {/* 嘴巴 - 微笑 */}
      <path
        d="M 88 135 Q 100 145 112 135"
        stroke="#0a0a0c"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* 面部高光 */}
      <ellipse cx="60" cy="90" rx="12" ry="6" fill="#e5c6c3" opacity="0.4" />
      <ellipse cx="140" cy="90" rx="12" ry="6" fill="#e5c6c3" opacity="0.4" />
    </svg>
  )
}
