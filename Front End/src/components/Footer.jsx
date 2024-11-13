import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year} | Jose Dino Abaya</p>
    </footer>
  );
}

export default Footer;
