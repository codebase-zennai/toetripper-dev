export default function Navbar() {
  return (
    <div
      data-animation="default"
      className="navbar w-nav"
      data-easing2="ease"
      data-easing="ease"
      data-collapse="medium"
      data-w-id="06ab6c64-468c-b44e-1b8c-856deb96ba7f"
      role="banner"
      data-no-scroll="1"
      data-duration="400"
      data-doc-height="1"
    >
      <a
        href="/"
        aria-current="page"
        className="logo-link-wrapper w-nav-brand w--current"
      >
        <img
          width="Auto"
          height="Auto"
          alt="Logo"
          src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f2538bc11df4e06933f3a5_WLTH%20Thin.png"
          loading="eager"
          srcSet="
            https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f2538bc11df4e06933f3a5_WLTH%20Thin-p-500.png  500w,
            https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f2538bc11df4e06933f3a5_WLTH%20Thin-p-800.png  800w,
            https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f2538bc11df4e06933f3a5_WLTH%20Thin.png       1011w
          "
          sizes="(max-width: 991px) 124.4296875px, 9vw"
          className="logo"
        />
      </a>
      <div className="nav-container w-container">
        <nav role="navigation" className="nav-menu w-nav-menu">
          <div className="nav-link-wrapper">
            <a
              href="/"
              aria-current="page"
              className="nav-link w-nav-link w--current"
            >
              Home
            </a>
            <a
              href="/"
              aria-current="page"
              className="nav-link move-down hide-on-tab w-nav-link w--current"
            >
              Home
            </a>
          </div>
          <div className="nav-link-wrapper">
            <a href="/about" className="nav-link w-nav-link">
              About
            </a>
            <a
              href="/about"
              className="nav-link move-down hide-on-tab w-nav-link"
            >
              About
            </a>
          </div>
          <div className="nav-link-wrapper">
            <a href="/services" className="nav-link w-nav-link">
              services
            </a>
            <a
              href="/services"
              className="nav-link move-down hide-on-tab w-nav-link"
            >
              services
            </a>
          </div>
          <div className="nav-link-wrapper">
            <a href="/blog" className="nav-link w-nav-link">
              Blog
            </a>
            <a
              href="/blog"
              className="nav-link move-down hide-on-tab w-nav-link"
            >
              Blog
            </a>
          </div>
          <div className="nav-link-wrapper">
            <a href="/contact" className="nav-link w-nav-link">
              Contact
            </a>
            <a
              href="/contact"
              className="nav-link move-down hide-on-tab w-nav-link"
            >
              Contact
            </a>
          </div>
        </nav>
        <div className="menu-button w-nav-button">
          <div className="burger-icon w-icon-nav-menu"></div>
        </div>
      </div>
    </div>
  );
}
