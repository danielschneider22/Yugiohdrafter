import boosterStyles from '../BoosterPicker/BoosterPicker.module.css';
import styles from './LandingPage.module.css'
import Footer from '../Footer/Footer';
import withScroll from '../withScroll/withScroll';
import battlePack from '../../assets/BattlePack.png';
import Image from 'next/image';

type ParentProps = {
  scrollCardsRef: React.MutableRefObject<HTMLDivElement>
}

function LandingPage(props: ParentProps) {
  return (
    <div className="maxWH">
      <div className={`${boosterStyles.BoosterPickerWrapper} d-flex justify-content-center row h-100`} ref={props.scrollCardsRef}>
        <div>
          <h1>
            Create custom Yugioh Draft environments and play against your friends
          </h1>
        </div>
        <div className={styles.battlePackGrid}>
          <div>
            <Image className={styles.battlePackImage} src={battlePack} alt={"Battle Pack: Epic Dawn"} />
            <button className="btn btn-primary">Draft</button>
            <button className="btn btn-primary">Sealed</button>
          </div>
          <div>
            <Image src={battlePack} alt={"Battle Pack: Epic Dawn"} />
          </div>
          <div>
            <Image src={battlePack} alt={"Battle Pack: Epic Dawn"} />
          </div>
        </div>
        
        
        <Footer />
      </div>
    </div>
    
    
  );
}

export default withScroll(LandingPage);

