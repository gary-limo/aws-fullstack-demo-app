import React, { useState, useRef } from 'react';
import Select from 'react-select';
import ReactDiffViewer from 'react-diff-viewer';
import { fetchGithubContent } from '../../../services/githubService';
import html2pdf from 'html2pdf.js';
import './QAValidation.css';

interface TableOption {
  value: string;
  label: string;
  targetPath: string;
  sourcePath: string;
}

export const QAValidation: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<TableOption | null>(null);
  const [fileContents, setFileContents] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDifferent, setIsDifferent] = useState<boolean>(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const tableOptions: TableOption[] = [
    { 
      value: 'application', 
      label: 'Application Table', 
      targetPath: 'target_schema/application.sql',
      sourcePath: 'load_schema/application.sql'
    },
    { 
      value: 'claim', 
      label: 'Claim Table', 
      targetPath: 'target_schema/claim.sql',
      sourcePath: 'load_schema/claim.sql'
    },
    { 
      value: 'claim_settlement', 
      label: 'Claim Settlement Table', 
      targetPath: 'target_schema/claim_settlement.sql',
      sourcePath: 'load_schema/claim_settlement.sql'
    },
  ];

  const fetchFileContent = async (path: string) => {
    try {
      const data = await fetchGithubContent(path);
      
      if (Array.isArray(data)) {
        throw new Error('Path points to a directory, not a file');
      }

      const content = decodeURIComponent(escape(atob(data.content)));
      setError(null);
      return content;
    } catch (error) {
      const errorMessage = `Error fetching table definition for ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(errorMessage);
      setError(errorMessage);
      return null;
    }
  };

  const checkDifferences = (source: string, target: string) => {
    return source.trim() !== target.trim();
  };

  const handleTableSelect = async (selected: TableOption | null) => {
    setIsLoading(true);
    setError(null);
    setSelectedFile(selected);

    try {
      if (selected) {
        const [targetContent, sourceContent] = await Promise.all([
          fetchFileContent(selected.targetPath),
          fetchFileContent(selected.sourcePath)
        ]);
        
        if (targetContent && sourceContent) {
          const hasDifferences = checkDifferences(sourceContent, targetContent);
          setIsDifferent(hasDifferences);
          setFileContents({
            target: targetContent,
            source: sourceContent
          });
        } else {
          throw new Error('Failed to fetch one or both file contents');
        }
      } else {
        setFileContents({});
      }
    } catch (error) {
      console.error('Error fetching table definitions:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch table definitions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const element = pdfRef.current;
    
    if (!element) return;

    const opt = {
      margin: 1,
      filename: `qa-validation-${selectedFile?.label}-${currentDate}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Failed to generate PDF');
    }
  };

  return (
    <div className="qa-container">
      <div className="qa-content">
        <div className="qa-header">
          <h1 className="qa-title">Schema Comparison</h1>
          <p className="qa-subtitle">Compare and validate table definitions across environments</p>
        </div>

        <div className="control-panel">
          <div className="select-container">
            <label className="select-label">Select Table Schema</label>
            <Select<TableOption>
              isMulti={false}
              options={tableOptions}
              value={selectedFile}
              onChange={handleTableSelect}
              placeholder="Choose a table to compare..."
              isLoading={isLoading}
              isSearchable={true}
              maxMenuHeight={300}
            />
          </div>
          
          {selectedFile && (
            <button className="export-button" onClick={handleDownloadPDF} disabled={isLoading}>
              Export Report
            </button>
          )}
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div ref={pdfRef}>
          {selectedFile && (
            <div className="validation-report">
              <div className="report-header">
                <h2 className="report-title">Validation Report</h2>
                <span className="report-date">{new Date().toLocaleDateString()}</span>
              </div>
              
              <div className="table-name">
                {selectedFile.label}
              </div>

              <div className={`status-message ${isDifferent ? 'different' : 'identical'}`}>
                {isDifferent ? (
                  <span>Differences detected in DDL definitions</span>
                ) : (
                  <span>DDL definitions match exactly</span>
                )}
              </div>
            </div>
          )}

          {selectedFile && fileContents.source && fileContents.target && (
            <div className="diff-container">
              <ReactDiffViewer
                oldValue={fileContents.source}
                newValue={fileContents.target}
                splitView={true}
                leftTitle={`Source: ${selectedFile.label}`}
                rightTitle={`Target: ${selectedFile.label}`}
                styles={{
                  variables: {
                    light: {
                      diffViewerBackground: '#ffffff',
                      diffViewerColor: '#334155',
                      addedBackground: '#f0fdf4',
                      addedColor: '#166534',
                      removedBackground: '#fef2f2',
                      removedColor: '#991b1b',
                      wordAddedBackground: '#dcfce7',
                      wordRemovedBackground: '#fee2e2',
                    }
                  },
                  contentText: {
                    fontFamily: 'Monaco, Consolas, monospace',
                    fontSize: '13px',
                    lineHeight: '1.6',
                  },
                  line: {
                    padding: '6px 12px',
                  },
                  titleBlock: {
                    backgroundColor: '#f8fafc',
                    padding: '12px 16px',
                    borderBottom: '1px solid #e2e8f0',
                    fontWeight: '500',
                    color: '#0f172a'
                  }
                }}
                compareMethod="diffWords"
                renderContent={str => str.trim()}
                useDarkTheme={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 