export default function Navbar() {
  return (
    <div
      data-animation="default"
      className="navbar w-nav p-10"
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
          alt="Logo"
          src=".\Brand Kit for Toe Tripper\Toe Tripper Logo.png"
          loading="eager"
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
