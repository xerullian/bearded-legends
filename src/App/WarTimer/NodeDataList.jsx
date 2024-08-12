// import Logger from '@utils/Logger';
// import React, { useEffect, useState } from 'react';
//
// export default function NodeDataList(_props) {
//   const _logger = new Logger('NodeDataList');
//   const [data, setData] = useState(null);
//
//   useEffect(() => {
//     fetch('/bearded-legends/database/gw-2024-am.json')
//       .then((res) => res.json())
//       .then((data) => setData(data.nodeList))
//       .catch((cause) => _logger.error(cause));
//   }, []);
//
//   return (
//     <datalist id="nodeDataList">
//       {data && data.map((node) => <option key={node} value={node} />)}
//     </datalist>
//   );
// }
