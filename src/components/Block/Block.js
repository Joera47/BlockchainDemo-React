import React, { useState, useEffect } from 'react';
import { sha256 }          from 'js-sha256';

export default function Block() {
  const [block, setBlock]           = useState(1);
  const [nonce, setNonce]           = useState(72608);
  const initialHash                 = sha256(`${ block }${ nonce }`);
  const [data, setData]             = useState('');
  const [hash, setHash]             = useState(initialHash);
  const [bgColor, setBgColor]       = useState('bg-faintgrey');
  const [showLoader, setShowLoader] = useState('d-none');

  const setSha256 = (event) => {
    const value   = event.target.value;
    const hashed  = sha256(value);
    setData(value);
    setHash(hashed);
  }

  useEffect(() => {
    const newHash = sha256(`${ block }${ nonce }${ data }`);
    const check   = newHash.substring(0, 4);
    setHash(newHash);

    if (check === '0000') {
      setBgColor('bg-faintgrey');
    } else {
      setBgColor('bg-faintred');
    }
  }, [block, nonce, data]);

  const startMining = () => {
    setShowLoader('');

    for (let i = 1; i < 1000000; i++) {
      const computeHash = sha256(`${ block }${ i }${ data }`);
      const check       = computeHash.substring(0, 4);

      if (check === '0000') {
        setTimeout(() => {
          setNonce(i);
          setShowLoader('d-none');
        }, 1000);

        break;
      }
    }
  }

  return (
    <div>
      <h2>Block</h2>

      <div className={ bgColor + ' shadow-sm p-4 rounded' }>
        <div className="container">
          <div className="row my-4">
            <div className="col-1">
              <p className="text-right pt-2">Block:</p>
            </div>

            <div className="col-11">
              <input name="block" type="number" className="form-control" value={ block } onChange={(e) => setBlock(e.target.value) } />
            </div>
          </div>

          <div className="row my-4">
            <div className="col-1">
              <p className="text-right pt-2">Nonce:</p>
            </div>

            <div className="col-11">
              <input name="block" type="number" className="form-control" value={ nonce } onChange={(e) => setNonce(e.target.value) } />
            </div>
          </div>

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

              <div className="btn btn-primary d-flex justify-content-center align-items-center text-white mt-3 w-em-15" onClick={() => startMining() }>
                <span className="d-inline-block">Mine</span>
                <div className={ 'loader ms-3 ' + showLoader }></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}