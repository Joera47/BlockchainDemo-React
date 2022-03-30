import SingleBlockchain from 'components/SingleBlockchain';

export default function Distributed() {
  return (
    <div>
      <h2>Distributed Blockchain</h2>

      <h4>Peer A</h4>
      { SingleBlockchain() }

      <h4>Peer B</h4>
      { SingleBlockchain() }

      <h4>Peer C</h4>
      { SingleBlockchain() }
    </div>
  );
}