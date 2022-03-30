import React, { useState } from 'react';
import { sha256 }          from 'js-sha256';

export default function Hash() {
  const initialHash     = sha256('');
  const [data, setData] = useState('');
  const [hash, setHash] = useState(initialHash);

  const setSha256 = (event) => {
    const value   = event.target.value;
    const hashed  = sha256(value);
    setData(value);
    setHash(hashed);
  }

  return (
    <div>
      <h2>SHA256 Hash</h2>

      <div className="bg-faintgrey shadow-sm p-4 rounded">
        <div className="container">
          <div className="row my-4">
            <div className="col-1">
              <p className="text-right pt-2">Data:</p>
            </div>

            <div className="col-11">
              <textarea name="data" type="area" rows="10"
                className="form-control py-3 px-4"
                value={ data }
                onChange={(e) => setSha256(e) }
              />
            </div>
          </div>

          <div className="row my-4">
            <div className="col-1">
              <p className="text-right pt-2">Hash:</p>
            </div>

            <div className="col-11">
              <input name="hash" type="text" className="form-control" disabled={ true } value={ hash } />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}