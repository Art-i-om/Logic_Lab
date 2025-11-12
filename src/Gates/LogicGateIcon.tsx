export default function LogicGateIcon({ label = "AND" }) {
    return (
        <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="10" width="80" height="40" fill="none" stroke="black" strokeWidth="2" />
            <line x1="100" y1="30" x2="120" y2="30" stroke="black" strokeWidth="2" />
            <line x1="0" y1="20" x2="20" y2="20" stroke="black" strokeWidth="2" />
            <line x1="0" y1="40" x2="20" y2="40" stroke="black" strokeWidth="2" />

            <text
                x="95"
                y="22"
                fontSize="12"
                textAnchor="end"
                fontFamily="sans-serif"
            >
                {label}
            </text>
        </svg>
    );
}