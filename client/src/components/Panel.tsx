import React from 'react';

const Panel = (data: any) => {
  return (
    <div className="panel">
      <h2 className="panel-title">{data.data.title}</h2>
      <div className="panel-content">{data.data.content}</div>
      <form action="">
        <p>flag</p>
        <input type="text" />
        <button>submit</button>
      </form>
    </div>
  );
};

export default Panel;
