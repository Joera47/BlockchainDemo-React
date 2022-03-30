import React, { useState, useEffect } from 'react';
import { sha256 }          from 'js-sha256';

export default function Blockchain() {
  const blocks                        = [1, 2, 3, 4, 5];
  const [nonces, setNonces]           = useState([11316, 35230, 12937, 35990, 56265]);
  const [datas, setDatas]             = useState(Array(5).fill(''));
  const [prevs, setPrevs]             = useState(Array(5).fill(''));
  const [hashes, setHashes]           = useState(Array(5).fill(''));
  const [bgColors, setBgColors]       = useState(Array(5).fill('bg-faintgree'));
  const [showLoaders, setShowLoaders] = useState(Array(5).fill('d-none'));

  const setNonce = (event, index) => {
    let newNonces     = [...nonces];
    newNonces[index]  = event.target.value;
    setNonces(newNonces);
  }

  const setData = (event, index) => {
    let newDatas    = [...datas];
    newDatas[index] = event.target.value;
    setDatas(newDatas);
  }

  useEffect(() => {
    let newPrevs    = [];
    var currentPrev = Array(64).fill('0').join('');
    let newHashes   = [];
    let newBgColors = [];

    for (let i = 0; i < blocks.length; i++) {
      const block   = blocks[i];
      const nonce   = nonces[i];
      const data    = datas[i];
      const newHash = sha256(`${ block }${ nonce }${ data }${ currentPrev }`);
      newPrevs.push(currentPrev);
      currentPrev   = newHash;
      const check   = newHash.substring(0, 4);
      newHashes.push(newHash);

      if (check === '0000') {
        newBgColors.push('bg-faintgreen');
      } else {
        newBgColors.push('bg-faintred');
      }
    }

    setPrevs(newPrevs);
    setHashes(newHashes);
    setBgColors(newBgColors);
  }, [nonces, datas]); // eslint-disable-line react-hooks/exhaustive-deps

  const startMining = (index) => {
    var newShowLoaders    = [...showLoaders];
    var newNonces         = [...nonces];
    const block           = blocks[index];
    const data            = datas[index];
    const prev            = prevs[index];
    newShowLoaders[index] = '';
    setShowLoaders(newShowLoaders);

    for (let i = 1; i < 10000000; i++) {
      const computeHash = sha256(`${ block }${ i }${ data }${ prev }`);
      const check       = computeHash.substring(0, 4);

      if (check === '0000') {
        setTimeout(() => {
          newNonces[index]      = i;
          newShowLoaders[index] = 'd-none';
          setNonces(newNonces);
          setShowLoaders(newShowLoaders);
        }, 1000);

        break;
      }
    }
  }

  const displayedBlockchain = blocks.map((value, index) => {
    return (
      <div key={ value} className={ bgColors[index] + ' d-inline-block m-2 shadow-sm p-1 rounded w-em-60' }>
        <div className="container">
          <div className="row my-4">
            <div className="col-2">
              <p className="text-right pt-2">Block:</p>
            </div>

            <div className="col-10">
              <input name="block" type="number" className="form-control" value={ value } readOnly={ true } />
            </div>
          </div>

          <div className="row my-4">
            <div className="col-2">
              <p className="text-right pt-2">Nonce:</p>
            </div>

            <div className="col-10">
              <input name="block" type="text" className="form-control" value={ nonces[index] } onChange={(e) => setNonce(e, index) } />
            </div>
          </div>

          <div className="row my-4">
            <div className="col-2">
              <p className="text-right pt-2">Data:</p>
            </div>

            <div className="col-10">
              <textarea name="data" type="area" rows="10" className="form-control py-3 px-4" value={ datas[index] } onChange={(e) => setData(e, index) } />
            </div>
          </div>

          <div className="row my-4">
            <div className="col-2">
              <p className="text-right pt-2">Prev:</p>
            </div>

            <div className="col-10">
              <input name="hash" type="text" className="form-control" disabled={ true } value={ prevs[index] } />
            </div>
          </div>

          <div className="row my-4">
            <div className="col-2">
              <p className="text-right pt-2">Hash:</p>
            </div>

            <div className="col-10">
              <input name="hash" type="text" className="form-control" disabled={ true } value={ hashes[index] } />

              <div className="btn btn-primary d-flex justify-content-center align-items-center text-white mt-3 w-em-15" onClick={() => startMining(index) }>
                <span className="d-inline-block">Mine</span>
                <div className={ 'loader ms-3 ' + showLoaders[index] }></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  });

  return (
    <div>
      <h2>Block</h2>
      <div className="overflow-auto text-nowrap pb-2">{ displayedBlockchain }</div>
    </div>
  );
}