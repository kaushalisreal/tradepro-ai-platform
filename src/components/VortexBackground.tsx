import React from 'react';

export const VortexBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main vortex pattern */}
      <div className="absolute inset-0">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1024 768" 
          className="absolute inset-0 w-full h-full opacity-20"
          style={{ transform: 'scale(1.2)' }}
        >
          {/* Rotating outer rings */}
          <g className="animate-spin" style={{ transformOrigin: '512px 384px', animationDuration: '120s' }}>
            <circle 
              cx="512" 
              cy="384" 
              r="480" 
              stroke="url(#gradient1)" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="4 8"
              opacity="0.3"
            />
            <circle 
              cx="512" 
              cy="384" 
              r="420" 
              stroke="url(#gradient2)" 
              strokeWidth="1" 
              fill="none" 
              strokeDasharray="2 6"
              opacity="0.4"
            />
          </g>

          {/* Counter-rotating middle rings */}
          <g className="animate-spin" style={{ transformOrigin: '512px 384px', animationDuration: '80s', animationDirection: 'reverse' }}>
            <circle 
              cx="512" 
              cy="384" 
              r="320" 
              stroke="url(#gradient3)" 
              strokeWidth="20" 
              fill="none" 
              strokeDasharray="2 20"
              opacity="0.2"
            />
            <circle 
              cx="512" 
              cy="384" 
              r="240" 
              stroke="url(#gradient4)" 
              strokeWidth="3" 
              fill="none" 
              strokeDasharray="3 9"
              opacity="0.5"
            />
          </g>

          {/* Fast rotating inner rings */}
          <g className="animate-spin" style={{ transformOrigin: '512px 384px', animationDuration: '40s' }}>
            <circle 
              cx="512" 
              cy="384" 
              r="160" 
              stroke="url(#gradient5)" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="2 4"
              opacity="0.6"
            />
            <circle 
              cx="512" 
              cy="384" 
              r="100" 
              stroke="url(#gradient6)" 
              strokeWidth="8" 
              fill="none" 
              strokeDasharray="1 8"
              opacity="0.3"
            />
            <circle 
              cx="512" 
              cy="384" 
              r="60" 
              stroke="url(#gradient7)" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="1 3"
              opacity="0.7"
            />
          </g>

          {/* Very fast center */}
          <g className="animate-spin" style={{ transformOrigin: '512px 384px', animationDuration: '20s', animationDirection: 'reverse' }}>
            <circle 
              cx="512" 
              cy="384" 
              r="20" 
              stroke="url(#gradient8)" 
              strokeWidth="3" 
              fill="none" 
              strokeDasharray="1 2"
              opacity="0.8"
            />
          </g>

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0891B2" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradient7" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="gradient8" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
            </linearGradient>

            {/* Radial gradients for depth */}
            <radialGradient id="radial1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1E293B" stopOpacity="0" />
              <stop offset="70%" stopColor="#334155" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.3" />
            </radialGradient>
          </defs>

          {/* Background radial overlay for depth */}
          <circle cx="512" cy="384" r="500" fill="url(#radial1)" opacity="0.6" />
        </svg>
      </div>

      {/* Additional animated elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-emerald-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-cyan-400/35 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Corner gradient overlays for depth */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-emerald-900/20 via-transparent to-transparent"></div>
      </div>
    </div>
  );
};
