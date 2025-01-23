export default function JasaLogo() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-12 h-12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      {/* Circle */}
      <circle
        cx="50"
        cy="50"
        r="40"
        className="stroke-green-800"
        strokeWidth="2"
      />
      
      {/* Leaves */}
      <path
        d="M20 50 Q 30 30, 50 30 Q 70 30, 80 50"
        className="stroke-green-800"
        fill="none"
      />
      
      {/* Text */}
      <text
        x="50"
        y="55"
        textAnchor="middle"
        className="fill-green-800 stroke-none text-2xl font-serif"
        style={{ fontSize: '20px' }}
      >
        JASA
      </text>
    </svg>
  );
} 