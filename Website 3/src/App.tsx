import { useState, useEffect, useRef, useCallback } from 'react';
import { Zap, Sun, Battery, Wifi, Shield, ArrowRight, ChevronDown } from 'lucide-react';

const LIGHT_IMG = '/images/hero-light.png';
const DARK_IMG = '/images/hero-dark.png';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className || ''}`}>{children}</div>;
}

function App() {
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const bgFrontRef = useRef<HTMLDivElement>(null);
  const bgBackRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDark]);

  useEffect(() => {
    if (bgFrontRef.current) {
      bgFrontRef.current.style.backgroundImage = `url(${DARK_IMG})`;
    }
    if (bgBackRef.current) {
      bgBackRef.current.style.backgroundImage = `url(${DARK_IMG})`;
    }
  }, []);

  const toggleTheme = useCallback((toDark: boolean) => {
    if (toDark === isDark || animatingRef.current) return;
    animatingRef.current = true;

    const targetImg = toDark ? DARK_IMG : LIGHT_IMG;

    if (bgBackRef.current) {
      bgBackRef.current.style.backgroundImage = `url(${targetImg})`;
    }

    if (bgFrontRef.current) {
      bgFrontRef.current.classList.add('pull-down');
    }

    setTimeout(() => {
      setIsDark(toDark);
      if (bgFrontRef.current) {
        bgFrontRef.current.style.backgroundImage = `url(${targetImg})`;
      }
      setTimeout(() => {
        if (bgFrontRef.current) {
          bgFrontRef.current.classList.remove('pull-down');
        }
        animatingRef.current = false;
      }, 30);
    }, 300);
  }, [isDark]);

  return (
    <div className="page-wrapper">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="blur-overlay blur-overlay-top"></div>
        <div className="blur-overlay blur-overlay-bottom"></div>
        <div className="hero-bg-wrapper">
          <div ref={bgBackRef} className="hero-bg bg-back"></div>
          <div ref={bgFrontRef} className="hero-bg bg-front"></div>
        </div>

        <nav className="navbar">
          <div className="logo-container">
            <Zap className="logo" size={32} strokeWidth={2} />
            <span className="brand-name">reposit</span>
          </div>
          <div className={`nav-links${menuOpen ? ' active' : ''}`}>
            <a href="#how-it-works">How It Works</a>
            <a href="#cases">Our Cases</a>
            <a href="#about">About Us</a>
            <a href="#stats">Careers</a>
            <a href="#contact">Resources</a>
            <a href="#contact">Customers</a>
            <button className="cta-button drawer-cta">Get an Instant Quote</button>
          </div>
          <button className="cta-button nav-cta">Get an Instant Quote</button>
          <div
            className={`hamburger${menuOpen ? ' active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>

        <div className="hero-content">
          <h1 className="hero-title">
            $0 Electricity Bills
            <br />
            <span className="title-accent">for the next</span> 7 years
          </h1>
          <div className="theme-toggle">
            <div
              className="toggle-indicator"
              style={{
                transform: isDark
                  ? 'translateX(calc(100% + 4px))'
                  : 'translateX(0)',
              }}
            ></div>
            <button
              className={`toggle-btn${!isDark ? ' active' : ''}`}
              onClick={() => toggleTheme(false)}
            >
              <span className="label">Morning</span>
              <span className="subtext">$0 for Electricity</span>
            </button>
            <button
              className={`toggle-btn${isDark ? ' active' : ''}`}
              onClick={() => toggleTheme(true)}
            >
              <span className="label">Night</span>
              <span className="subtext">$0 for Electricity</span>
            </button>
          </div>
          <p className="hero-footer">
            Forget the energy market, weather conditions and seasons; our Smart Controller guarantees you get no electricity bill for seven years.
          </p>
        </div>

        <a href="#stats" className="scroll-hint">
          <ChevronDown size={24} />
        </a>
      </section>

      {/* ── STATS ── */}
      <section className="section section-stats" id="stats">
        <RevealSection className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Homes Powered</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">7yr</span>
            <span className="stat-label">$0 Bill Guarantee</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">98%</span>
            <span className="stat-label">Customer Satisfaction</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Smart Monitoring</span>
          </div>
        </RevealSection>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section section-how" id="how-it-works">
        <RevealSection>
          <span className="section-tag">How It Works</span>
          <h2 className="section-title">Three steps to zero bills</h2>
          <p className="section-subtitle">Our Smart Controller manages your energy so you never pay another electricity bill.</p>
        </RevealSection>

        <div className="steps-grid">
          <RevealSection className="step-card">
            <div className="step-icon">
              <Sun size={28} strokeWidth={1.5} />
            </div>
            <span className="step-number">01</span>
            <h3 className="step-title">Generate</h3>
            <p className="step-desc">Solar panels on your roof capture energy throughout the day, converting sunlight into clean electricity for your home.</p>
          </RevealSection>

          <RevealSection className="step-card">
            <div className="step-icon">
              <Battery size={28} strokeWidth={1.5} />
            </div>
            <span className="step-number">02</span>
            <h3 className="step-title">Store</h3>
            <p className="step-desc">Excess energy is stored in your battery system, ready to power your home when the sun goes down or during peak hours.</p>
          </RevealSection>

          <RevealSection className="step-card">
            <div className="step-icon">
              <Wifi size={28} strokeWidth={1.5} />
            </div>
            <span className="step-number">03</span>
            <h3 className="step-title">Optimise</h3>
            <p className="step-desc">Our Smart Controller learns your usage patterns and automatically trades energy at the best rates, maximising your savings.</p>
          </RevealSection>
        </div>
      </section>

      {/* ── CASES ── */}
      <section className="section section-cases" id="cases">
        <RevealSection>
          <span className="section-tag">Our Cases</span>
          <h2 className="section-title">Real homes, real savings</h2>
        </RevealSection>

        <div className="cases-grid">
          <RevealSection className="case-card case-card-large">
            <div className="case-image" style={{ backgroundImage: `url(${LIGHT_IMG})` }}></div>
            <div className="case-overlay">
              <span className="case-tag">Residential</span>
              <h3 className="case-name">The Morrison Residence</h3>
              <p className="case-detail">12.5kW system · $0 bills since 2022</p>
            </div>
          </RevealSection>

          <RevealSection className="case-card">
            <div className="case-image" style={{ backgroundImage: `url(${DARK_IMG})` }}></div>
            <div className="case-overlay">
              <span className="case-tag">Commercial</span>
              <h3 className="case-name">Greenfield Office Park</h3>
              <p className="case-detail">45kW system · 100% offset</p>
            </div>
          </RevealSection>

          <RevealSection className="case-card">
            <div className="case-image" style={{ backgroundImage: `url(${LIGHT_IMG})` }}></div>
            <div className="case-overlay">
              <span className="case-tag">Residential</span>
              <h3 className="case-name">Coastal Living Project</h3>
              <p className="case-detail">8.8kW system · Battery backup</p>
            </div>
          </RevealSection>
        </div>

        <RevealSection className="cases-cta-row">
          <a href="#" className="link-cta">
            View all case studies <ArrowRight size={16} />
          </a>
        </RevealSection>
      </section>

      {/* ── ABOUT / QUOTE ── */}
      <section className="section section-quote" id="about">
        <RevealSection className="quote-block">
          <Shield size={40} strokeWidth={1.2} className="quote-icon" />
          <blockquote className="big-quote">
            We don't just install solar — we guarantee the outcome. Zero electricity bills for seven years, or we cover the difference.
          </blockquote>
          <div className="quote-attribution">
            <span className="quote-name">Smart Controller Promise</span>
            <span className="quote-role">Backed by reposit technology</span>
          </div>
        </RevealSection>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section section-final-cta" id="contact">
        <RevealSection className="final-cta-inner">
          <h2 className="final-cta-title">Ready to never pay an electricity bill again?</h2>
          <p className="final-cta-sub">Get a free assessment of your home and see how much you could save with reposit.</p>
          <button className="cta-button cta-large">Get an Instant Quote</button>
        </RevealSection>
      </section>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo-container">
              <Zap className="footer-logo" size={24} strokeWidth={2} />
              <span className="footer-brand-name">reposit</span>
            </div>
            <p className="footer-tagline">Zero electricity bills. Guaranteed.</p>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Product</h4>
            <a href="#">How It Works</a>
            <a href="#">Smart Controller</a>
            <a href="#">Pricing</a>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Resources</h4>
            <a href="#">Case Studies</a>
            <a href="#">Blog</a>
            <a href="#">FAQ</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 reposit. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
