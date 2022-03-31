import SingleBlockchain from 'components/SingleBlockchain';

export default function Coinbase() {
  return (
    <div>
      <h2>Coinbase Transactions</h2>

      <h4>Peer A</h4>
      { SingleBlockchain('coinbase') }
      <hr/>
      <h4>Peer B</h4>
      { SingleBlockchain('coinbase') }
      <hr/>
      <h4>Peer C</h4>
      { SingleBlockchain('coinbase') }
    </div>
  );
}