import React from 'react';
import { render } from 'react-dom';
import gradient from '../src/index';
const App = () => {
  const [input, setInput] = React.useState('Give this a spin');
  const clr = gradient(input + 'salt');
  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '0px auto',
      }}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Give this a spin"
      />
      <br />
      <div
        style={{
          background: clr,
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '10rem',
          letterSpacing: '2px',
          borderRadius: '0.25rem',
          fontSize: '1rem',
          fontWeight: 400,
          color: 'white',
          textTransform: 'uppercase',
        }}
      >
        {input}
      </div>
    </div>
  );
};

export default render(<App />, document.querySelector('.root'));
