import Head from 'next/head';
import styles from './layout.module.css';
import NavBar from '../NavBar/NavBar';
import ToastManager from '../ToastManager/ToastManager';

export const siteTitle = 'Yugioh Drafter';

interface MyProps{
  children: React.ReactNode;
}

export default function Layout(props: MyProps) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Draft yugioh cards with friends and create your own boosters for drafting"
        />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet" />

        <meta name="og:title" content={siteTitle} />
      </Head>
      <ToastManager
        position="bottom-left"
        autoDelete={true}
        dismissTime={7000}
      />
      <header>
        <NavBar />
      </header>
      <main>{props.children}</main>
    </div>
  );
}