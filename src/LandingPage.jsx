import React, { useState, useEffect } from 'react';
import {
  Zap, TrendingUp, ArrowRight, Play, CheckCircle, AlertTriangle,
  BarChart3, Target, RefreshCcw, Sparkles, ArrowDown, Mail,
  Building2, Package, Users, DollarSign, ChevronRight, Star
} from 'lucide-react';

// ============================================
// SENSAI - DEMAND ORCHESTRATION PLATFORM
// Landing Page for Lead Generation
// ============================================

// Using Netlify Forms - submissions appear in your Netlify dashboard
// Go to: Netlify Dashboard > Your Site > Forms > sensai-waitlist

export default function LandingPage({ onEnterApp }) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [activeNarrativeStep, setActiveNarrativeStep] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance narrative steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNarrativeStep(prev => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Submit to Netlify Forms
      const formData = new FormData();
      formData.append('form-name', 'sensai-waitlist');
      formData.append('email', email);
      formData.append('company', company || 'Not provided');

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (err) {
      console.error('Waitlist signup error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const narrativeSteps = [
    {
      title: "The Problem",
      icon: AlertTriangle,
      color: "#ef4444",
      content: "€25,600 worth of RTD Chocolate Shake expiring in 28 days. At current velocity, it'll expire before you sell through.",
      highlight: "€12,800 write-off"
    },
    {
      title: "The Old Way",
      icon: DollarSign,
      color: "#f59e0b",
      content: "Connect with retailers, offer 50% discount, hope they take it. You lose margin AND damage your brand with constant discounting.",
      highlight: "Brand damage + Lost margin"
    },
    {
      title: "The SensAI Way",
      icon: Target,
      color: "#10b981",
      content: "Platform detects risk 28 days out. Recommends 5 fitness micro-influencers. Budget: €280. Clear inventory at 50% margin.",
      highlight: "3x ROI"
    },
    {
      title: "Amplification",
      icon: TrendingUp,
      color: "#3b82f6",
      content: "Protein Ice Cream trend surging +27%. You have Casein Powder. Launch recipe challenge. Ride the trend at full price.",
      highlight: "2.2x ROI on trend"
    },
    {
      title: "Closed Loop",
      icon: RefreshCcw,
      color: "#8b5cf6",
      content: "Every campaign feeds back. Track what works. Next time we see this pattern, we already know. The platform gets smarter.",
      highlight: "Continuous learning"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0f 0%, #0f1419 50%, #0a0a0f 100%)',
      color: '#fff',
      overflow: 'hidden'
    }}>
      {/* Floating background elements */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: `translateY(${scrollY * 0.1}px)`
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          transform: `translateY(${-scrollY * 0.05}px)`
        }} />
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '30%',
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
          transform: `translateY(${scrollY * 0.08}px)`
        }} />
      </div>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrollY > 50 ? 'rgba(10, 10, 15, 0.95)' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
        borderBottom: scrollY > 50 ? '1px solid rgba(255,255,255,0.1)' : 'none',
        transition: 'all 0.3s ease',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Zap size={22} color="#fff" />
          </div>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px' }}>
            Sens<span style={{ color: '#10b981' }}>AI</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          <a href="#how-it-works" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>How It Works</a>
          <a href="#demo" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>See Demo</a>
          <a href="#waitlist" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Join Waitlist</a>
          {onEnterApp && (
            <button
              onClick={onEnterApp}
              style={{
                padding: '10px 20px',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(16, 185, 129, 0.5)',
                borderRadius: 8,
                color: '#10b981',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(16, 185, 129, 0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(16, 185, 129, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Enter Platform
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '120px 40px 80px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 100,
          marginBottom: 32,
          animation: 'fadeIn 1s ease'
        }}>
          <Sparkles size={14} color="#10b981" />
          <span style={{ fontSize: 13, color: '#10b981', fontWeight: 500 }}>
            Introducing Demand Orchestration
          </span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 800,
          lineHeight: 1.1,
          maxWidth: 900,
          marginBottom: 24,
          letterSpacing: '-2px',
          animation: 'slideUp 1s ease'
        }}>
          Turn <span style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Inventory</span> Into{' '}
          <span style={{
            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Profitable Sales</span>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: 'clamp(18px, 2vw, 22px)',
          color: '#94a3b8',
          maxWidth: 700,
          lineHeight: 1.6,
          marginBottom: 40,
          animation: 'slideUp 1s ease 0.2s both'
        }}>
          The service that connects <strong style={{ color: '#fff' }}>supply chain data</strong> with{' '}
          <strong style={{ color: '#fff' }}>influencer marketing</strong> to guide demand in real-time.
          No more write-offs. No more brand-damaging discounts.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 60,
          animation: 'slideUp 1s ease 0.4s both'
        }}>
          <a href="#waitlist" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: 12,
            color: '#fff',
            fontSize: 16,
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)'
          }}>
            Join the Waitlist
            <ArrowRight size={18} />
          </a>
          <a href="#demo" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '16px 32px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 12,
            color: '#fff',
            fontSize: 16,
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}>
            <Play size={18} />
            Watch Demo
          </a>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'flex',
          gap: 60,
          flexWrap: 'wrap',
          justifyContent: 'center',
          animation: 'slideUp 1s ease 0.6s both'
        }}>
          {[
            { value: '63x', label: 'Average ROI' },
            { value: '€17,640', label: 'Saved per campaign' },
            { value: '28 days', label: 'Early detection' }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 36,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: '#64748b',
          animation: 'pulse 2s ease infinite'
        }}>
          <span style={{ fontSize: 12 }}>Scroll to explore</span>
          <ArrowDown size={20} />
        </div>
      </section>

      {/* Problem Statement */}
      <section id="how-it-works" style={{
        padding: '100px 40px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 100,
              marginBottom: 24
            }}>
              <AlertTriangle size={14} color="#ef4444" />
              <span style={{ fontSize: 13, color: '#ef4444', fontWeight: 500 }}>The Industry Problem</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-1px',
              marginBottom: 20
            }}>
              CPG Companies Lose Billions to<br />
              <span style={{ color: '#ef4444' }}>Inventory Write-offs</span>
            </h2>
            <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
              Short shelf life products expire. The "solution"? Deep discounts that destroy margins and brand value.
            </p>
          </div>

          {/* Problem cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24
          }}>
            {[
              {
                icon: Package,
                title: 'Expiring Inventory',
                desc: 'Products with 28-60 day shelf life need faster velocity than forecasts predicted',
                stat: '€25,600',
                statLabel: 'at risk per SKU'
              },
              {
                icon: DollarSign,
                title: 'Margin Destruction',
                desc: 'Panic discounts to retailers at 50% off destroy your margins and set bad precedents',
                stat: '50%',
                statLabel: 'margin lost'
              },
              {
                icon: Building2,
                title: 'Brand Damage',
                desc: 'Constant discounting trains retailers and consumers to wait for deals',
                stat: 'Long-term',
                statLabel: 'value erosion'
              }
            ].map((card, i) => (
              <div key={i} style={{
                padding: 32,
                background: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 16,
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'rgba(239, 68, 68, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20
                }}>
                  <card.icon size={24} color="#ef4444" />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{card.title}</h3>
                <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.6, marginBottom: 20 }}>{card.desc}</p>
                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 8
                }}>
                  <span style={{ fontSize: 24, fontWeight: 800, color: '#ef4444' }}>{card.stat}</span>
                  <span style={{ fontSize: 13, color: '#94a3b8' }}>{card.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution - Interactive Narrative */}
      <section id="demo" style={{
        padding: '100px 40px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 100,
              marginBottom: 24
            }}>
              <Zap size={14} color="#10b981" />
              <span style={{ fontSize: 13, color: '#10b981', fontWeight: 500 }}>The Solution</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-1px',
              marginBottom: 20
            }}>
              Demand Orchestration:<br />
              <span style={{
                background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>The SensAI Approach</span>
            </h2>
            <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 700, margin: '0 auto' }}>
              Instead of pushing products with discounts, we <strong style={{ color: '#fff' }}>pull demand</strong> through
              influencer marketing—perfectly timed to your inventory needs.
            </p>
          </div>

          {/* Interactive narrative timeline */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: 40,
            alignItems: 'start'
          }}>
            {/* Step selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {narrativeSteps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setActiveNarrativeStep(i)}
                  style={{
                    padding: '16px 20px',
                    background: activeNarrativeStep === i
                      ? `rgba(${step.color === '#ef4444' ? '239,68,68' : step.color === '#f59e0b' ? '245,158,11' : step.color === '#10b981' ? '16,185,129' : step.color === '#3b82f6' ? '59,130,246' : '139,92,246'}, 0.15)`
                      : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${activeNarrativeStep === i ? step.color : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 12,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: activeNarrativeStep === i ? step.color : 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                    <step.icon size={18} color={activeNarrativeStep === i ? '#fff' : '#64748b'} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: activeNarrativeStep === i ? '#fff' : '#94a3b8'
                    }}>
                      {step.title}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: activeNarrativeStep === i ? step.color : '#64748b'
                    }}>
                      {step.highlight}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Content display */}
            <div style={{
              padding: 40,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20,
              minHeight: 400
            }}>
              {(() => {
                const step = narrativeSteps[activeNarrativeStep];
                return (
                  <div style={{ animation: 'fadeIn 0.5s ease' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      marginBottom: 24
                    }}>
                      <div style={{
                        width: 56,
                        height: 56,
                        borderRadius: 14,
                        background: step.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <step.icon size={28} color="#fff" />
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
                          Act {activeNarrativeStep + 1}
                        </div>
                        <h3 style={{ fontSize: 28, fontWeight: 800 }}>{step.title}</h3>
                      </div>
                    </div>

                    <p style={{
                      fontSize: 20,
                      color: '#e2e8f0',
                      lineHeight: 1.7,
                      marginBottom: 32
                    }}>
                      {step.content}
                    </p>

                    <div style={{
                      padding: '20px 24px',
                      background: `rgba(${step.color === '#ef4444' ? '239,68,68' : step.color === '#f59e0b' ? '245,158,11' : step.color === '#10b981' ? '16,185,129' : step.color === '#3b82f6' ? '59,130,246' : '139,92,246'}, 0.1)`,
                      border: `1px solid ${step.color}`,
                      borderRadius: 12
                    }}>
                      <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 4 }}>Key Outcome</div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: step.color }}>
                        {step.highlight}
                      </div>
                    </div>

                    {/* Visual representation based on step */}
                    {activeNarrativeStep === 2 && (
                      <div style={{ marginTop: 32 }}>
                        <div style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}>Campaign ROI Breakdown</div>
                        <div style={{ display: 'flex', gap: 16 }}>
                          <div style={{
                            flex: 1,
                            padding: 16,
                            background: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: 8,
                            textAlign: 'center'
                          }}>
                            <div style={{ fontSize: 12, color: '#94a3b8' }}>Old Way Loss</div>
                            <div style={{ fontSize: 20, fontWeight: 700, color: '#ef4444' }}>-€12,800</div>
                          </div>
                          <div style={{
                            flex: 1,
                            padding: 16,
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: 8,
                            textAlign: 'center'
                          }}>
                            <div style={{ fontSize: 12, color: '#94a3b8' }}>Campaign Cost</div>
                            <div style={{ fontSize: 20, fontWeight: 700, color: '#f59e0b' }}>€280</div>
                          </div>
                          <div style={{
                            flex: 1,
                            padding: 16,
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: 8,
                            textAlign: 'center'
                          }}>
                            <div style={{ fontSize: 12, color: '#94a3b8' }}>Total Saved</div>
                            <div style={{ fontSize: 20, fontWeight: 700, color: '#10b981' }}>+€17,640</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - The Closed Loop */}
      <section style={{
        padding: '100px 40px',
        position: 'relative',
        zIndex: 1,
        background: 'rgba(16, 185, 129, 0.02)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-1px',
              marginBottom: 20
            }}>
              The Closed-Loop System
            </h2>
            <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
              Every decision makes the platform smarter. That's the power of continuous learning.
            </p>
          </div>

          {/* Loop visualization */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 0,
            position: 'relative'
          }}>
            {[
              { icon: Target, label: 'DETECT', desc: 'Social signals & trends', color: '#3b82f6' },
              { icon: BarChart3, label: 'EVALUATE', desc: 'Inventory positions', color: '#8b5cf6' },
              { icon: Zap, label: 'ORCHESTRATE', desc: 'Launch campaigns', color: '#10b981' },
              { icon: TrendingUp, label: 'MEASURE', desc: 'Track outcomes', color: '#f59e0b' },
              { icon: RefreshCcw, label: 'LEARN', desc: 'Improve models', color: '#ec4899' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  padding: 24,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 16,
                  textAlign: 'center',
                  width: 160,
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: `rgba(${item.color === '#3b82f6' ? '59,130,246' : item.color === '#8b5cf6' ? '139,92,246' : item.color === '#10b981' ? '16,185,129' : item.color === '#f59e0b' ? '245,158,11' : '236,72,153'}, 0.15)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <item.icon size={26} color={item.color} />
                  </div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: item.color,
                    marginBottom: 4,
                    letterSpacing: '1px'
                  }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{item.desc}</div>
                </div>
                {i < 4 && (
                  <ChevronRight size={24} color="#333" style={{ margin: '0 8px' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{
        padding: '100px 40px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 3vw, 36px)',
            fontWeight: 800,
            marginBottom: 40
          }}>
            Built for Modern CPG Brands
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 24,
            marginBottom: 60
          }}>
            {[
              { icon: Package, title: 'Short Shelf Life', desc: 'RTD beverages, fresh snacks, supplements' },
              { icon: TrendingUp, title: 'Trend-Sensitive', desc: 'Fitness, wellness, seasonal products' },
              { icon: Users, title: 'Influencer-Ready', desc: 'Products that photograph well' }
            ].map((item, i) => (
              <div key={i} style={{
                padding: 32,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16
              }}>
                <item.icon size={32} color="#10b981" style={{ marginBottom: 16 }} />
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#94a3b8' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Testimonial placeholder */}
          <div style={{
            padding: 40,
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 20
          }}>
            <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 16 }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p style={{
              fontSize: 22,
              fontStyle: 'italic',
              color: '#e2e8f0',
              marginBottom: 20,
              lineHeight: 1.6
            }}>
              "This is the bridge between supply chain and marketing that the industry has been missing.
              Finally, we can turn inventory problems into growth opportunities."
            </p>
            <div style={{ fontSize: 14, color: '#94a3b8' }}>
              — Early Access Partner, European CPG Brand
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" style={{
        padding: '100px 40px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)'
          }}>
            <Zap size={40} color="#fff" />
          </div>

          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-1px',
            marginBottom: 20
          }}>
            Join the Waitlist
          </h2>
          <p style={{
            fontSize: 18,
            color: '#94a3b8',
            marginBottom: 40
          }}>
            Be among the first to transform your inventory challenges into growth opportunities.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '4px 4px 4px 20px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 12
              }}>
                <Mail size={20} color="#64748b" />
                <input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    padding: '16px 0',
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '4px 4px 4px 20px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 12
              }}>
                <Building2 size={20} color="#64748b" />
                <input
                  type="text"
                  placeholder="Company name (optional)"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '16px 0',
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '18px 32px',
                  background: isSubmitting
                    ? 'rgba(16, 185, 129, 0.5)'
                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  borderRadius: 12,
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 700,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isSubmitting ? 'none' : '0 4px 20px rgba(16, 185, 129, 0.4)'
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Request Early Access'}
              </button>

              {error && (
                <p style={{ fontSize: 14, color: '#ef4444', marginTop: 12 }}>
                  {error}
                </p>
              )}

              <p style={{ fontSize: 13, color: '#64748b', marginTop: 8 }}>
                No spam. We'll notify you when we're ready to onboard.
              </p>
            </form>
          ) : (
            <div style={{
              padding: 40,
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 16,
              animation: 'slideUp 0.5s ease'
            }}>
              <CheckCircle size={48} color="#10b981" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>You're on the list!</h3>
              <p style={{ color: '#94a3b8' }}>
                We'll be in touch soon with early access details.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Zap size={18} color="#fff" />
          </div>
          <span style={{ fontSize: 16, fontWeight: 700 }}>Sens<span style={{ color: '#10b981' }}>AI</span></span>
        </div>
        <p style={{ fontSize: 13, color: '#64748b' }}>
          Demand Orchestration for Modern CPG Brands
        </p>
        <p style={{ fontSize: 12, color: '#4b5563', marginTop: 8 }}>
          © 2025 SensAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
