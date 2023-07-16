import React from 'react';

const Panel = (data: any) => {
  return (
    <div className="panel">
      <h2 className="panel-title">{data.data.title}</h2>
      <div className="panel-content">{data.data.content}</div>
      <div className="panel-filepath">{data.data.filepath}</div>
      <div className="panel-connectioninfo">{data.data.connection_info}</div>
      <form action="">
        <p>flag</p>
        <input type="text" />
        <button>submit</button>
      </form>
    </div>
  );
};

export default Panel;
