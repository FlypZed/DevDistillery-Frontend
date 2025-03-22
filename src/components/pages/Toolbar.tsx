import React from 'react';

interface ToolbarProps {
    onToolChange: (tool: string) => void;
    onColorChange: (color: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onToolChange, onColorChange }) => {
    return (
        <div style={{ marginBottom: '10px' }}>
            <button onClick={() => onToolChange('pencil')}>Lápiz</button>
            <button onClick={() => onToolChange('rectangle')}>Rectángulo</button>
            <button onClick={() => onToolChange('circle')}>Círculo</button>
            <input
                type="color"
                onChange={(e) => onColorChange(e.target.value)}
            />
        </div>
    );
};

export default Toolbar;