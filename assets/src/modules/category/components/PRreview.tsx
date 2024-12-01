import React from 'react';

export const PRreview: React.FC = () => {
  return (
    <div className="docs-container">
      <div className="docs-header">
        <h1>Tools to build and scale generative AI applications</h1>
        <p>
          Innovate faster with new capabilities, a choice of industry-leading FMs, and 
          infrastructure that pushes the envelope to deliver the highest performance while lowering costs.
        </p>
        <a href="#" className="docs-link">Explore more generative AI tools</a>
      </div>

      <div className="docs-content">
        <div className="service-item">
          <span className="service-label">Service</span>
          <h2>Amazon Q</h2>
          <p>Customize this generative AI-powered assistant for the needs of your business</p>
          <span className="arrow">→</span>
        </div>

        <div className="service-item">
          <span className="service-label">Service</span>
          <h2>Amazon Bedrock</h2>
          <p>Easily build and scale applications with LLMs, FMs, and generative AI tools</p>
          <span className="arrow">→</span>
        </div>

        <div className="service-item">
          <span className="service-label">Service</span>
          <h2>Amazon Test</h2>
          <p>Build, train, and deploy your own FM models at scale</p>
          <span className="arrow">→</span>
        </div>

        <div className="service-item">
          <span className="service-label">Service</span>
          <h2>AWS App Studio</h2>
          <p>The fastest and easiest way to build enterprise-grade applications</p>
          <span className="arrow">→</span>
        </div>

        <div className="service-item">
          <span className="service-label">Infrastructure</span>
          <h2>AI Infrastructure</h2>
          <p>Train and run inference at scale with infrastructure purpose-built with AI</p>
          <span className="arrow">→</span>
        </div>

        <div className="service-item">
          <span className="service-label">Data</span>
          <h2>Data foundation</h2>
          <p>Build a data foundation on AWS for AI success</p>
          <span className="arrow">→</span>
        </div>
      </div>
    </div>
  );
};