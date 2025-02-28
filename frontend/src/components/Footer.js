import React from 'react';
import '../styles/main.css';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__content">
        <div className="footer__section">
          <h4 className="footer__heading">AI-Powered CMS</h4>
          <p className="footer__text">Transform your content strategy</p>
        </div>
        
        <div className="footer__section">
          <h4 className="footer__heading">Resources</h4>
          <a href="/docs" className="footer__link">Documentation</a>
          <a href="/support" className="footer__link">Support</a>
        </div>
      </div>
      
      <div className="footer__copyright">
        <p>&copy; {new Date().getFullYear()} AI-Powered CMS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;