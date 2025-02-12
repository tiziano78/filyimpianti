'use client'

export default function Debug({ state }: { state: any }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 10,
      left: 10,
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: 10,
      borderRadius: 5,
      fontSize: 12,
      zIndex: 9999
    }}>
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  );
} 