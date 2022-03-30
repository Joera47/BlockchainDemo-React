import SingleBlockchain               from 'components/SingleBlockchain';

export default function Distributed() {
  return (
    <div>
      <h2>Distributed Blockchain</h2>

      <h4>Peer A</h4>
      <div className="overflow-auto text-nowrap pb-2">{ SingleBlockchain() }</div>

      <h4>Peer B</h4>
      <div className="overflow-auto text-nowrap pb-2">{ SingleBlockchain() }</div>

      <h4>Peer C</h4>
      <div className="overflow-auto text-nowrap pb-2">{ SingleBlockchain() }</div>
    </div>
  );
}