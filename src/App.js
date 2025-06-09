import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useState } from 'react';

function App() {
  const [gates, setGates] = useState([]);

  const handleGateRemove = (id) => {
    setGates((prev) => prev.filter((gate) => gate.id !== id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        <Sidebar onGateRemove={handleGateRemove} />
        <Canvas gates={gates} setGates={setGates} />
      </div>
    </DndProvider>
  );
}


export default App;
