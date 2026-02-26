import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export async function getServerSideProps() {
  const fs = require('fs');
  const path = require('path');

  let alerts = [];
  try {
    const alertsPath = path.join(process.cwd(), 'reddit-alerts.json');
    alerts = JSON.parse(fs.readFileSync(alertsPath, 'utf8'));
  } catch (error) {
    console.error('Error loading alerts:', error);
  }

  // Sort by urgency score
  alerts.sort((a, b) => (b.urgencyScore || 0) - (a.urgencyScore || 0));

  return {
    props: {
      alerts: alerts.slice(0, 20), // Top 20 leads
    },
  };
}

export default function LeadsPage({ alerts }) {
  const [selectedLead, setSelectedLead] = useState(null);

  const generateResponse = (lead) => {
    const baseResponse = `Hey! I saw your post about ${lead.title.toLowerCase()}. I'm Joe Sanches, a local real estate agent in Leander/Austin who specializes in helping people in exactly your situation.

I'd love to offer some free advice that might help you out - no strings attached. Would you be open to a quick chat?

Feel free to call/text me at 512-663-8867 or check out joefsanches.com

Happy to help!`;

    return baseResponse;
  };

  const copyResponse = (lead) => {
    const response = generateResponse(lead);
    navigator.clipboard.writeText(response);
    alert('Response copied! Now go to Reddit and send it.');
  };

  const getUrgencyColor = (score) => {
    if (score >= 100) return '#ff4444';
    if (score >= 60) return '#ff9944';
    return '#ffdd44';
  };

  return (
    <>
      <Head>
        <title>Lead Dashboard - Joe Sanches</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="container">
        <header className="topbar">
          <div className="brand">
            <Link href="/">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src="/logo.png" alt="Joe Sanches Logo" className="logo" />
                <div>
                  <h1>Lead Dashboard</h1>
                  <p className="sub">High-Intent Reddit Leads</p>
                </div>
              </div>
            </Link>
          </div>
        </header>

        <div style={{ marginTop: '32px' }}>
          <div className="hero" style={{ marginBottom: '24px' }}>
            <h2 className="heroTitle" style={{ fontSize: '28px', marginBottom: '12px' }}>
              {alerts.length} Active Leads
            </h2>
            <p className="heroLead">
              These are real people asking for help on Reddit RIGHT NOW. Click any lead to see a pre-written response you can send immediately.
            </p>
          </div>

          <div className="list">
            {alerts.length === 0 ? (
              <div className="card">
                <p style={{ color: 'var(--muted)', margin: 0 }}>
                  No active leads yet. Run the Reddit intelligence script to start collecting leads.
                </p>
              </div>
            ) : (
              alerts.map((lead, idx) => (
                <div
                  key={idx}
                  className="card"
                  style={{
                    cursor: 'pointer',
                    borderColor: selectedLead === idx ? 'var(--accent)' : 'var(--border)'
                  }}
                  onClick={() => setSelectedLead(selectedLead === idx ? null : idx)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '12px' }}>
                    <div
                      style={{
                        background: getUrgencyColor(lead.urgencyScore),
                        color: '#000',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        minWidth: '60px',
                        textAlign: 'center'
                      }}
                    >
                      {lead.urgencyScore}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 className="cardTitle" style={{ marginBottom: '8px' }}>
                        {lead.title}
                      </h3>
                      <p className="cardMeta" style={{ marginBottom: '8px' }}>
                        r/{lead.subreddit} • u/{lead.author} • {new Date(lead.timestamp).toLocaleDateString()}
                      </p>
                      <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.5' }}>
                        {lead.preview}...
                      </p>
                    </div>
                  </div>

                  {selectedLead === idx && (
                    <div style={{
                      marginTop: '16px',
                      padding: '16px',
                      background: 'rgba(107,120,84,0.1)',
                      borderRadius: '8px',
                      border: '1px solid var(--accent)'
                    }}>
                      <h4 style={{
                        fontSize: '14px',
                        color: 'var(--accent-light)',
                        marginBottom: '12px',
                        fontWeight: 600
                      }}>
                        Pre-Written Response:
                      </h4>
                      <div style={{
                        background: 'rgba(0,0,0,0.3)',
                        padding: '12px',
                        borderRadius: '6px',
                        marginBottom: '12px',
                        fontSize: '13px',
                        lineHeight: '1.6',
                        whiteSpace: 'pre-wrap',
                        color: 'rgba(255,255,255,0.9)'
                      }}>
                        {generateResponse(lead)}
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                          onClick={() => copyResponse(lead)}
                          className="btn accent"
                          style={{
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '13px'
                          }}
                        >
                          Copy Response
                        </button>
                        <a
                          href={lead.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn"
                          style={{ fontSize: '13px' }}
                        >
                          Open Reddit Post
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <footer className="footer">
          <p>Lead Dashboard - For Joe Sanches Use Only</p>
        </footer>

        <style jsx>{`
          .container {
            padding-bottom: 60px;
          }
        `}</style>
      </div>
    </>
  );
}
