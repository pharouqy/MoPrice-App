

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footer">
        <p className="footer-text">Copyright {currentYear} Moprice</p>
      </div>
    </footer>
  );
};

export default Footer;
