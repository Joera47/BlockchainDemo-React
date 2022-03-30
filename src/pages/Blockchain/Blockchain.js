import SingleBlockchain               from 'components/SingleBlockchain';

export default function Blockchain() {
  return (
    <div>
      <h2>Blockchain</h2>
      <div className="overflow-auto text-nowrap pb-2">{ SingleBlockchain() }</div>
    </div>
  );
}