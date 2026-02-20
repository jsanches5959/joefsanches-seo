import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ fontFamily: 'Arial, sans-serif' }}>
      
      {/* HERO SECTION */}
      <section style={{
        textAlign: 'center',
        padding: '80px 20px',
        background: '#f5f5f5'
      }}>
        <h1 style={{ fontSize: '40px', marginBottom: '20px' }}>
          Joe Sanches Realtor – Leander, Texas
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '30px' }}>
          Helping Leander homeowners buy and sell with confidence.
        </p>

        <a href="tel:5126638867" style={{
          padding: '15px 25px',
          background: '#000',
          color: '#fff',
          textDecoration: 'none',
          marginRight: '10px',
          borderRadius: '6px'
        }}>
          Call / Text 512-663-8867
        </a>

        <a href="mailto:hello@joefsanches.com" style={{
          padding: '15px 25px',
          background: '#1e90ff',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '6px'
        }}>
          Email Me
        </a>
      </section>

      {/* WHY ME */}
      <section style={{ padding: '60px 20px', maxWidth: 900, margin: '0 auto' }}>
        <h2>Why Work With Joe?</h2>
        <ul>
          <li>Local Leander market expert</li>
          <li>Strategic pricing & negotiation</li>
          <li>Clear communication and fast response</li>
          <li>Military discipline + modern marketing</li>
        </ul>
      </section>

      {/* BLOG PREVIEW */}
      <section style={{ padding: '60px 20px', maxWidth: 900, margin: '0 auto' }}>
        <h2>Leander Real Estate Updates</h2>
        <p>
          Read local housing insights and market updates below.
        </p>
        <Link href="/posts">
          View All Articles
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{
        textAlign: 'center',
        padding: '40px 20px',
        background: '#000',
        color: '#fff'
      }}>
        <p>Joe Sanches Realtor</p>
        <p>Leander, Texas</p>
        <p>Phone: 512-663-8867</p>
        <p>Email: hello@joefsanches.com</p>
      </footer>

    </main>
  );
}
