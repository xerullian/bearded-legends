// import * as ButtonStyles from '@components/Button.scss';
// import Link from '@components/Link';
// import content from '@content/Content.yaml';
// import useContentBundle from '@hooks/useContentBundle';
// import useServiceWorker from '@hooks/useServiceWorker';
// import * as Layout from '@styles/Layout.scss';
// import Arrays from '@utils/Arrays';
// import React from 'react';
// import * as Styles from './App.scss';
// import Logo from './WarTimer/Header/Logo';
// import * as LogoStyles from './WarTimer/Header/Logo.scss';
//
// export default function App({ className }) {
//   const b = useContentBundle(content);
//
//   useServiceWorker();
//
//   return (
//     <div
//       className={Arrays.pack(
//         className,
//         Styles.App,
//         Layout.FlexColumn,
//         Layout.JustifySpaceEvenly,
//         Layout.AlignCenter,
//       ).join(' ')}
//     >
//       <Logo
//         className={Arrays.pack(Styles.Logo, LogoStyles.Largest).join(' ')}
//       />
//       <b.GuildNameDecorative />
//       <div>
//         <Link className={ButtonStyles.Button} href="/bearded-legends/war-timer">
//           <b.WarTimerAppName />
//         </Link>
//
//         <Link className={ButtonStyles.Button} href={b.DISCORD_URL()}>
//           <b.ChatAppName />
//         </Link>
//       </div>
//     </div>
//   );
// }
