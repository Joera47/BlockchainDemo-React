import React, { useState, useEffect } from 'react';
import { sha256 }                     from 'js-sha256';
import Blockchain                     from 'pages/Blockchain/Blockchain';

export default function Distributed() {
  return (
    <div>
      <h2>Distributed Blockchain</h2>

      <h4>Peer A</h4>
      <div className="overflow-auto text-nowrap pb-2">{ Blockchain() }</div>

      <h4>Peer B</h4>
      <div className="overflow-auto text-nowrap pb-2">{ Blockchain() }</div>

      <h4>Peer C</h4>
      <div className="overflow-auto text-nowrap pb-2">{ Blockchain() }</div>
    </div>
  );
}