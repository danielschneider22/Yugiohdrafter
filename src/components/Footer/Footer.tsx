import './Footer.css';

function Footer() {
  return (
    <footer id="footer" className="footer">
    <div className="container footerContainer">
      <div className="copyright">
        © Copyright <strong><span>YugiohDrafter</span></strong>. All Rights Reserved
      </div>
      <div className="credits">
        <p>
        The literal and graphical information presented on this site about Yu-Gi-Oh!, including card images, the attribute, level/rank and type symbols, and card text, is copyright 4K Media Inc, a subsidiary of Konami Digital Entertainment, Inc. This website is not produced by, endorsed by, supported by, or affiliated with 4k Media or Konami Digital Entertainment.
        </p>
      </div>
    </div>
  </footer>
  )
}

export default Footer