// import SrOnly from '@components/SrOnly';
// import content from '@content/Content.yaml';
// import useContentBundle from '@hooks/useContentBundle';
// import * as Layout from '@styles/Layout.scss';
// import Arrays from '@utils/Arrays';
// import Logger from '@utils/Logger';
//
// import React, { useEffect, useRef, useState } from 'react';
//
// import * as Styles from './TimerDisplay.scss';
//
// export default function TimerDisplay({
//   className,
//   remainingMillis,
//   updateRemainingMillis,
// }) {
//   const _logger = new Logger('TimerDisplay');
//   const b = useContentBundle(content);
//   const ref = useRef(null);
//
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);
//
//   const [hoursBuffer, setHoursBuffer] = useState('');
//   const [minutesBuffer, setMinutesBuffer] = useState('');
//   const [secondsBuffer, setSecondsBuffer] = useState('');
//
//   useEffect(() => {
//     const _remainingMillis = Math.abs(remainingMillis);
//
//     const remainingSeconds =
//       remainingMillis > 0
//         ? Math.ceil(_remainingMillis / 1000)
//         : Math.floor(_remainingMillis / 1000);
//
//     const remainingMinutes = remainingSeconds / 60;
//     const remainingHours = remainingMinutes / 60;
//
//     setSeconds(Math.floor(remainingSeconds) % 60);
//     setMinutes(Math.floor(remainingMinutes) % 60);
//     setHours(Math.floor(remainingHours));
//   }, [remainingMillis]);
//
//   const onFocus = (domEvent) => {
//     const { target } = domEvent;
//
//     setHoursBuffer(hours);
//     setMinutesBuffer(minutes);
//     setSecondsBuffer(seconds);
//
//     setTimeout(() => {
//       target.selectionStart = target.selectionEnd = target.value.length;
//     }, 0);
//   };
//
//   const onChange = (domEvent) => {
//     const { target } = domEvent;
//     const { value } = target;
//     const el = target.closest('[class]');
//
//     if (el.classList.contains(Styles.Hours)) {
//       setHoursBuffer(value);
//     } else if (el.classList.contains(Styles.Minutes)) {
//       setMinutesBuffer(value);
//     } else if (el.classList.contains(Styles.Seconds)) {
//       setSecondsBuffer(value);
//     }
//   };
//
//   const onSubmit = (domEvent) => {
//     domEvent.target.blur();
//     onChange(domEvent);
//
//     updateRemainingMillis(
//       Number(hoursBuffer || 0) * 3_600_000 +
//         Number(minutesBuffer || 0) * 60_000 +
//         Number(secondsBuffer || 0) * 1_000,
//     );
//   };
//
//   return (
//     <div
//       ref={ref}
//       className={Arrays.pack(
//         className,
//         Styles.TimerDisplay,
//         Layout.FlexRow,
//         Layout.JustifyStart,
//         Layout.AlignBaseline,
//       ).join(' ')}
//     >
//       {!!hours && (
//         <>
//           <div className={Styles.Hours}>
//             {hours}
//             <label>
//               <input
//                 type="text"
//                 inputMode="numeric"
//                 maxLength={String(hours).length}
//                 pattern="[0-9]*"
//                 value={hoursBuffer}
//                 onChange={onChange}
//                 onFocus={onFocus}
//                 onBlur={onSubmit}
//                 onSubmit={onSubmit}
//               />
//               <SrOnly>
//                 <b.Hours />
//               </SrOnly>
//             </label>
//           </div>
//
//           <abbr title={b.Hours()}>
//             <b.HoursAbbr />
//           </abbr>
//         </>
//       )}
//
//       <div className={Styles.Minutes}>
//         {hours
//           ? String(minutes || 0).padStart(2, '0')
//           : String(minutes || 0).padStart(2, '0')}
//
//         <label>
//           <input
//             type="text"
//             inputMode="numeric"
//             maxLength="2"
//             pattern="[0-9]*"
//             value={minutesBuffer}
//             onChange={onChange}
//             onFocus={onFocus}
//             onBlur={onSubmit}
//             onSubmit={onSubmit}
//           />
//
//           <SrOnly>
//             <b.Minutes />
//           </SrOnly>
//         </label>
//       </div>
//
//       <abbr title={b.Minutes()}>
//         <b.MinutesAbbr />
//       </abbr>
//
//       <div className={Styles.Seconds}>
//         {String(seconds || 0).padStart(2, '0')}
//
//         <label>
//           <input
//             type="text"
//             inputMode="numeric"
//             maxLength="2"
//             pattern="[0-9]*"
//             value={secondsBuffer}
//             onChange={onChange}
//             onFocus={onFocus}
//             onBlur={onSubmit}
//             onSubmit={onSubmit}
//           />
//
//           <SrOnly>
//             <b.Seconds />
//           </SrOnly>
//         </label>
//       </div>
//
//       <abbr title={b.Seconds()}>
//         <b.SecondsAbbr />
//       </abbr>
//     </div>
//   );
// }
