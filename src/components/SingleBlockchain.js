import React, { useState, useEffect } from 'react';
import { sha256 }                     from 'js-sha256';

export default function SingleBlockchain(type) {
  const blocks                          = [1, 2, 3, 4, 5];
  let startingNonces                    = [11316, 35230, 12937, 35990, 56265];
  if (type === 'transactions')  { startingNonces = [16484, 148515, 10822, 135644, 529757] }
  if (type === 'coinbase')      { startingNonces = [39883, 10427, 17568, 5470, 23852] }
  const [nonces, setNonces]             = useState(startingNonces);
  const [datas, setDatas]               = useState(Array(5).fill(''));
  const [prevs, setPrevs]               = useState(Array(5).fill(''));
  const [hashes, setHashes]             = useState(Array(5).fill(''));
  const [bgColors, setBgColors]         = useState(Array(5).fill('bg-faintgree'));
  const [showLoaders, setShowLoaders]   = useState(Array(5).fill('d-none'));

  let startingTransactions            = [
    [{ value: '100.00', from: 'Joey', to: 'Harry' }],
    [{ value: '25.00', from: 'Harry', to: 'Hermione' }, { value: '47.00', from: 'Harry', to: 'Ginny' }],
    [{ value: '12.50', from: 'Hermione', to: 'Ronald' }, { value: '10.00', from: 'Hermione', to: 'Dobby' }, { value: '10.00', from: 'Ginny', to: 'Molly' }],
    [{ value: '10.00', from: 'Ronald', to: 'George' }, { value: '5.47', from: 'Molly', to: 'Arthur' }, { value: '2.00', from: 'Molly', to: 'Fred' }],
    [{ value: '4.00', from: 'Arthur', to: 'Angelina' }, { value: '1.00', from: 'Arthur', to: 'Charlie' }, { value: '1.00', from: 'Fred', to: 'Percy' }]
  ];

  if (type === 'coinbase') {
    startingTransactions[0] = [{ value: '100.00', from: 'Coinbase', to: 'Harry' }];
  }

  const [transactions, setTransactions] = useState(startingTransactions);
  let width                             = 'w-em-60';
  if (['transactions', 'coinbase'].includes(type)) { width = 'w-em-80' };

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
      let data;

      if (['transactions', 'coinbase'].includes(type)) {
        data = transactions[i].map((hash) => {
          return `v:${ hash.value };f:${ hash.from };t:${ hash.to }`
        }).join('\n');
      } else {
        data = datas[i];
      }

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
  }, [nonces, datas, transactions]); // eslint-disable-line react-hooks/exhaustive-deps

  const startMining = (index) => {
    var newShowLoaders    = [...showLoaders];
    var newNonces         = [...nonces];
    const block           = blocks[index];
    let data;

    if (['transactions', 'coinbase'].includes(type)) {
      data = transactions[index].map((hash) => {
        return `v:${ hash.value };f:${ hash.from };t:${ hash.to }`
      }).join('\n');

      console.log(data);
    } else {
      data = datas[index];
    }

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
        }, 200);

        break;
      }
    }
  }

  let dataSection = (index) => {
    let dataInput = <textarea name="data" type="area" rows="10" className="form-control py-3 px-4" value={ datas[index] } onChange={(e) => setData(e, index) } />;

    if (['transactions', 'coinbase'].includes(type)) {
      const transactionHashes = transactions[index];

      const calculateHash = (type, index, i, value) => {
        let newTransactions             = [...transactions];
        newTransactions[index][i][type] = value;
        setTransactions(newTransactions);
      }

      dataInput = transactionHashes.map((transactionHash, i) => {
        return (
          <div key={ `${ index }-transaction-${ i }` } className="d-flex align-items-center bg-faintgrey rounded border border-lightgrey">
            <p className="mb-0 px-2">$</p>

            <input name="block" type="number"
              className="form-control border-0 border-start border-end border-lightgrey rounded-0 me-2"
              value={ transactionHash.value } onChange={(e) => calculateHash('value', index, i, e.target.value)} />

            <p className="mb-0 pe-2">From:</p>

            <input name="block" type="text"
              className="form-control border-0 border-start border-end border-lightgrey rounded-0 me-2"
              value={ transactionHash.from } onChange={(e) => calculateHash('from', index, i, e.target.value)} />

            <p className="mb-0 pe-2">To:</p>

            <input name="block" type="text"
              className="form-control border-0 border-start border-lightgrey rounded-0 rounded-end"
              value={ transactionHash.to } onChange={(e) => calculateHash('to', index, i, e.target.value)} />
          </div>
        )
      });


    } else if (type === 'coinbase') {

    }

    return(
      <div className="row my-4">
        <div className="col-2">
          <p className="text-right pt-2">Data:</p>
        </div>

        <div className="col-10">
          { dataInput }
        </div>
      </div>
    )
  }

  const displayedBlockchain = blocks.map((value, index) => {
    return (
      <div key={ value} className={ bgColors[index] + ' m-2 shadow-sm p-1 rounded flex-shrink-0 ' + width }>
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
              <input name="block" type="text" className="form-control" value={ nonces[index] } readOnly={ true } />
            </div>
          </div>

          { dataSection(index) }

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
    <div className="d-flex flex-nowrap overflow-auto pb-2">{ displayedBlockchain }</div>
  );
}