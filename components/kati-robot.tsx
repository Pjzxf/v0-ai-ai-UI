"use client"

export function KatiRobot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 飘动的气泡 */}
      <circle cx="100" cy="22" r="7" fill="#f5c0bf" className="animate-bubble" style={{ animationDelay: "0ms" }} />
      <circle cx="90" cy="35" r="5.5" fill="#f5c0bf" className="animate-bubble" style={{ animationDelay: "200ms" }} />
      <circle cx="108" cy="38" r="4" fill="#f5c0bf" className="animate-bubble" style={{ animationDelay: "400ms" }} />
      
      {/* 天线底座 */}
      <ellipse cx="100" cy="58" rx="10" ry="6" fill="#b0a3c4" />
      <rect x="96" y="48" width="8" height="12" fill="#c6b4d8" rx="2" />
      
      {/* 头部外框 - 带圆角的方形 */}
      <rect x="38" y="65" width="124" height="95" rx="28" fill="#cee0e6" />
      
      {/* 头部内框 - 脸部面板 */}
      <rect x="48" y="75" width="104" height="75" rx="20" fill="#c6b4d8" />
      
      {/* 耳朵/侧边装饰 */}
      <rect x="25" y="95" width="18" height="40" rx="9" fill="#f5c0bf" />
      <rect x="157" y="95" width="18" height="40" rx="9" fill="#f5c0bf" />
      
      {/* 左眼 - 眼眶 */}
      <circle cx="72" cy="112" r="18" fill="#0a0a0c" />
      {/* 左眼 - 眼球（带眨眼动画） */}
      <ellipse cx="72" cy="112" rx="14" ry="14" fill="#ead4d4">
        <animate 
          attributeName="ry" 
          values="14;14;2;14;14" 
          keyTimes="0;0.45;0.5;0.55;1"
          dur="4s" 
          repeatCount="indefinite" 
        />
      </ellipse>
      <ellipse cx="72" cy="112" rx="8" ry="8" fill="#0a0a0c">
        <animate 
          attributeName="ry" 
          values="8;8;1;8;8" 
          keyTimes="0;0.45;0.5;0.55;1"
          dur="4s" 
          repeatCount="indefinite" 
        />
      </ellipse>
      <ellipse cx="68" cy="108" rx="3" ry="3" fill="#ffffff" opacity="0.6">
        <animate 
          attributeName="ry" 
          values="3;3;0.5;3;3" 
          keyTimes="0;0.45;0.5;0.55;1"
          dur="4s" 
          repeatCount="indefinite" 
        />
      </ellipse>
      
      {/* 右眼 - 眼眶 */}
      <circle cx="128" cy="112" r="18" fill="#0a0a0c" />
      {/* 右眼 - 眼球（带眨眼动画，略有延迟） */}
      <ellipse cx="128" cy="112" rx="14" ry="14" fill="#ead4d4">
        <animate 
          attributeName="ry" 
          values="14;14;2;14;14" 
          keyTimes="0;0.46;0.51;0.56;1"
          dur="4s" 
          repeatCount="indefinite" 
        />
      </ellipse>
      <ellipse cx="128" cy="112" rx="8" ry="8" fill="#0a0a0c">
        <animate 
          attributeName="ry" 
          values="8;8;1;8;8" 
          keyTimes="0;0.46;0.51;0.56;1"
          dur="4s" 
          repeatCount="indefinite" 
        />
      </ellipse>
      <ellipse cx="124" cy="108" rx="3" ry="3" fill="#ffffff" opacity="0.6">
        <animate 
          attributeName="ry" 
          values="3;3;0.5;3;3" 
          keyTimes="0;0.46;0.51;0.56;1"
          dur="4s" 
          repeatCount="indefinite" 
        />
      </ellipse>
      
      {/* 嘴巴 - 微笑 */}
      <path
        d="M 88 135 Q 100 145 112 135"
        stroke="#0a0a0c"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* 面部高光 */}
      <ellipse cx="60" cy="90" rx="12" ry="6" fill="#cee0e6" opacity="0.4" />
      <ellipse cx="140" cy="90" rx="12" ry="6" fill="#cee0e6" opacity="0.4" />
    </svg>
  )
}
