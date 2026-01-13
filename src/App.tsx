import Sidebar from "./components/Sidebar/Sidebar.tsx";
import Canvas from "./components/Canvas/Canvas.tsx";
import {useState} from 'react';
import type {Gate} from "./interfaces/Gate.ts";
import type {Connection} from "./interfaces/Connection.ts";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import './App.css';

function App() {
    const [gates, setGates] = useState<Gate[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);

    const handleGateRemove = (id: string | number) => {
        setConnections((prev) => prev.filter((conn) => conn.fromGateId !== id && conn.toGateId !== id));
        setGates((prev) => prev.filter((gate) => gate.id !== id));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden' }}>
                <Sidebar onGateRemove={handleGateRemove} />
                <Canvas gates={gates} setGates={setGates} connections={connections} setConnections={setConnections} />
            </div>
        </DndProvider>
    );
}

export default App;
