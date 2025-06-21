export const BouncingChessPieces = () => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        gap: '1rem'
    }}>
        <div style={{ display: 'flex', gap: '0.5rem', color: '#FFFFFF' }}>
            {['♙', '♘', '♗', '♖', '♕', '♔'].map((piece, i) => (
                <div
                    key={i}
                    style={{
                        fontSize: '2rem',
                        animation: `bounce 1.5s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`
                    }}
                >
                    {piece}
                </div>
            ))}
        </div>
        <p style={{ margin: 0, color: '#666' }}>Preparing the board...</p>
        <style jsx>{`
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-20px); }
        60% { transform: translateY(-10px); }
      }
    `}</style>
    </div>
);
