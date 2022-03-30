import SingleBlockchain from 'components/SingleBlockchain';

export default function Tokens() {
  return (
    <div>
      <h2>Tokens</h2>

      <h4>Peer A</h4>
      <div className="overflow-auto text-nowrap pb-2">{ SingleBlockchain('transactions') }</div>

      <h4>Peer B</h4>
      <div className="overflow-auto text-nowrap pb-2">{ SingleBlockchain() }</div>

      <h4>Peer C</h4>
      <div className="overflow-auto text-nowrap pb-2">{ SingleBlockchain() }</div>
    </div>
  );
}