'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, ChevronRight, X } from 'lucide-react';

function TestimonialText({ text, author, fullRec }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const maxLength = 200;
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!text) return null;
  
  const shouldTruncate = text.length > maxLength;
  const displayText = shouldTruncate ? text.slice(0, maxLength) + '...' : text;

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const modalContent = (
    <AnimatePresence>
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999999, // Ensure it's above everything
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(4px)'
            }}
            onClick={() => setIsModalOpen(false)}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'relative',
              backgroundColor: '#121212',
              border: '1px solid #333',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              zIndex: 1000000
            }}
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '1.5rem' }}>
              {[...Array(fullRec.rating || 5)].map((_, i) => (
                <Star key={i} size={20} fill="#F4A300" color="#F4A300" />
              ))}
            </div>

            <p style={{ 
              color: '#e2e8f0', 
              fontSize: '1.1rem', 
              lineHeight: '1.8', 
              fontStyle: 'italic',
              marginBottom: '2rem',
              whiteSpace: 'pre-wrap'
            }}>
              "{text}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid #333', paddingTop: '1.5rem' }}>
              {fullRec.image_url ? (
                <img 
                  src={fullRec.image_url} 
                  alt={fullRec.name} 
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#2a2a2a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F4A300',
                  fontSize: '1.2rem',
                  fontWeight: 'bold'
                }}>
                  {fullRec.name.charAt(0)}
                </div>
              )}
              <div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '600', margin: '0 0 4px 0' }}>{fullRec.name}</h4>
                <span style={{ color: '#a0aec0', fontSize: '0.9rem' }}>{fullRec.destination || 'Client'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <p className="review-message" style={{ 
        color: '#e2e8f0', 
        fontSize: '0.95rem', 
        lineHeight: '1.6', 
        fontStyle: 'italic',
        marginBottom: '1rem',
        whiteSpace: 'pre-wrap'
      }}>
        "{displayText}"
      </p>
      {shouldTruncate && (
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            color: '#F4A300',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: 0,
            fontSize: '0.85rem',
            fontWeight: '500',
            alignSelf: 'flex-start',
            marginBottom: '1rem',
            transition: 'color 0.2s ease',
            outline: 'none'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#ffb833'}
          onMouseOut={(e) => e.currentTarget.style.color = '#F4A300'}
        >
          Read More <ChevronRight size={16} />
        </button>
      )}

      {/* Render Modal via Portal so it breaks out of the card's transform context */}
      {mounted && createPortal(modalContent, document.body)}
    </div>
  );
}

export default function TestimonialCard({ rec, index }) {
  return (
    <motion.div 
      className="direct-review-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      whileHover={{ y: -5 }}
      style={{
        backgroundColor: '#121212',
        padding: '2rem',
        borderRadius: '20px',
        border: '1px solid #2a2a2a',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        height: '100%'
      }}
    >
      <div className="card-top" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
        <div className="stars-row" style={{ display: 'flex', gap: '4px' }}>
          {[...Array(rec.rating || 5)].map((_, i) => (
            <Star key={i} size={16} fill="#F4A300" color="#F4A300" />
          ))}
        </div>
        <ShieldCheck size={20} color="#48bb78" strokeWidth={1.5} />
      </div>
      
      <TestimonialText text={rec.message || rec.text} author={rec.name} fullRec={rec} />
      
      <div className="review-meta" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem',
        borderTop: '1px solid #2a2a2a',
        paddingTop: '1.2rem',
        marginTop: 'auto'
      }}>
        {rec.image_url ? (
          <img 
            src={rec.image_url} 
            alt={rec.name} 
            style={{ 
              width: '45px', 
              height: '45px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '2px solid #333'
            }}
          />
        ) : (
          <div style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            backgroundColor: '#2a2a2a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F4A300',
            fontSize: '1rem',
            fontWeight: 'bold',
            border: '2px solid #333'
          }}>
            {rec.name.charAt(0)}
          </div>
        )}
        <div>
          <h4 className="client-name" style={{ color: '#fff', fontSize: '1rem', fontWeight: '600', margin: '0 0 2px 0' }}>
            {rec.name}
          </h4>
          <span className="client-destination" style={{ color: '#888', fontSize: '0.8rem', display: 'block' }}>
            {rec.destination || 'Client'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
