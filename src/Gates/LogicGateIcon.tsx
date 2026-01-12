export default function LogicGateIcon({ label = "AND", inputCount = 2 }: { label?: string; inputCount?: number }) {
    if (label === "START") {
        return (
            <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="10" width="80" height="40" fill="none" stroke="black" strokeWidth="2" />
                <line x1="100" y1="30" x2="120" y2="30" stroke="black" strokeWidth="2" />

                <text
                    x="60"
                    y="35"
                    fontSize="12"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                >
                    {label}
                </text>
            </svg>
        );
    }

    if (label === "END") {
        return (
            <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="10" width="80" height="40" fill="none" stroke="black" strokeWidth="2" />
                <line x1="0" y1="30" x2="20" y2="30" stroke="black" strokeWidth="2" />

                <text
                    x="60"
                    y="35"
                    fontSize="12"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                >
                    {label}
                </text>
            </svg>
        );
    }

    if (label === "NOT") {
        return (
            <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
                {/* Input line */}
                <line x1="0" y1="30" x2="25" y2="30" stroke="black" strokeWidth="2" />

                {/* Triangle (NOT gate body) */}
                <polygon
                    points="25,15 25,45 90,30"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                />

                {/* Inverter circle */}
                <circle cx="95" cy="30" r="5" fill="none" stroke="black" strokeWidth="2" />

                {/* Output line */}
                <line x1="100" y1="30" x2="120" y2="30" stroke="black" strokeWidth="2" />

                <text
                    x="50"
                    y="58"
                    fontSize="12"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                >
                    {label}
                </text>
            </svg>
        );
    }

    // Multi-input gates (AND, OR, XOR, NAND, NOR, XNOR)
    // Calculate height based on input count with better spacing
    const gateHeight = Math.max(60, inputCount * 18 + 20);
    const rectHeight = gateHeight - 20;
    const spacing = rectHeight / (inputCount + 1);

    return (
        <svg width="120" height={gateHeight} xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="10" width="80" height={rectHeight} fill="none" stroke="black" strokeWidth="2" />
            <line x1="100" y1={10 + rectHeight / 2} x2="120" y2={10 + rectHeight / 2} stroke="black" strokeWidth="2" />

            {/* Input lines */}
            {Array.from({ length: inputCount }, (_, i) => {
                const yPos = 10 + spacing * (i + 1);
                return (
                    <line
                        key={i}
                        x1="0"
                        y1={yPos}
                        x2="20"
                        y2={yPos}
                        stroke="black"
                        strokeWidth="2"
                    />
                );
            })}

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



