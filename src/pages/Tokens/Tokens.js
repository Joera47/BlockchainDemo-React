import SingleBlockchain from 'components/SingleBlockchain';

export default function Tokens() {
  return (
    <div>
      <h2>Tokens</h2>

      <h4>Peer A</h4>
      { SingleBlockchain('transactions') }
      <hr/>
      <h4>Peer B</h4>
      { SingleBlockchain('transactions') }
      <hr/>
      <h4>Peer C</h4>
      { SingleBlockchain('transactions') }
    </div>
  );
}