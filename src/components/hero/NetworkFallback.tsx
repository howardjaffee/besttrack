import { useReducedMotion } from '@/hooks/useReducedMotion';

const nodes = [
  { id: 'ny', label: 'New York', x: 30, y: 50 },
  { id: 'tor', label: 'Toronto', x: 55, y: 35 },
  { id: 'chi', label: 'Chicago', x: 42, y: 62 },
  { id: 'det', label: 'Detroit', x: 48, y: 48 },
  { id: 'la', label: 'LA', x: 12, y: 70 },
];

const connections: [number, number][] = [
  [0, 1],
  [2, 1],
  [3, 4],
  [0, 2],
  [4, 0],
];

export function NetworkFallback() {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,242,254,0.08)" />
          <stop offset="100%" stopColor="rgba(0,242,254,0)" />
        </radialGradient>
        <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#00F2FE" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0066FF" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="50" r="38" fill="url(#globe-glow)" />
      <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
      <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.3" />

      {[40, 50, 60].map((y) => (
        <line
          key={y}
          x1="15"
          y1={y}
          x2="85"
          y2={y}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.2"
        />
      ))}

      {connections.map(([a, b], i) => {
        const na = nodes[a];
        const nb = nodes[b];
        const mx = (na.x + nb.x) / 2;
        const my = (na.y + nb.y) / 2 - 8;
        const pathD = `M ${na.x} ${na.y} Q ${mx} ${my} ${nb.x} ${nb.y}`;
        const dur = 3 + i * 0.5;
        return (
          <g key={i}>
            <path
              d={pathD}
              fill="none"
              stroke="url(#arc-grad)"
              strokeWidth="0.4"
              opacity="0.5"
            />
            {!reduced && (
              <circle r="0.8" fill="#00F2FE">
                <animateMotion
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  path={pathD}
                  begin={`${i * 0.4}s`}
                />
              </circle>
            )}
          </g>
        );
      })}

      {nodes.map((node) => (
        <g key={node.id}>
          <circle cx={node.x} cy={node.y} r="2" fill="rgba(0,242,254,0.15)" />
          <circle cx={node.x} cy={node.y} r="1" fill="#00F2FE" />
          {!reduced && (
            <circle
              cx={node.x}
              cy={node.y}
              r="1"
              fill="none"
              stroke="#00F2FE"
              strokeWidth="0.2"
            >
              <animate
                attributeName="r"
                values="1;4"
                dur="2.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;0"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
}
