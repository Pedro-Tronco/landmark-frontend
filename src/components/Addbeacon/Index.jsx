import React, { useState } from 'react';
import { Map } from '../../pages/Map';

const Addbeacon = () => {
  const [enableAddPoint, setEnableAddPoint] = useState(false);

  // Função chamada quando o ponto é adicionado no mapa
  const handlePointAdded = () => {
    setEnableAddPoint(false);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Map
        enableAddPoint={enableAddPoint}
        onPointAdded={handlePointAdded}
      />
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 2000 }}>
        <button
          style={{
            padding: '12px 24px',
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
          onClick={() => setEnableAddPoint(true)}
        >
          Adicionar Ponto
        </button>
      </div>
    </div>
  );
};

export default Addbeacon;