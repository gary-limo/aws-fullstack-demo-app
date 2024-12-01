import React, { useState, useRef } from 'react';
import Select from 'react-select';
import ReactDiffViewer from 'react-diff-viewer';
import { fetchGithubContent } from '../../../services/githubService';
import html2pdf from 'html2pdf.js';

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
    <div className="qa-validation-container p-6">
      <h1 className="text-2xl font-bold mb-6">Table Definition Comparison</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="w-1/4">
          <Select<TableOption>
            isMulti={false}
            options={tableOptions}
            value={selectedFile}
            onChange={handleTableSelect}
            className="mb-6"
            placeholder="Select tables to compare..."
            isLoading={isLoading}
            isSearchable={true}
            maxMenuHeight={300}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: '50px',
                borderRadius: '8px',
                boxShadow: 'none',
                borderColor: '#e2e8f0',
                '&:hover': {
                  borderColor: '#cbd5e1'
                }
              }),
              menu: (base) => ({
                ...base,
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected 
                  ? '#3b82f6' 
                  : state.isFocused 
                    ? '#e2e8f0' 
                    : 'white',
                '&:active': {
                  backgroundColor: '#bfdbfe'
                }
              })
            }}
          />
        </div>
        
        {selectedFile && (
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            Download PDF Report
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div ref={pdfRef}>
        {selectedFile && (
          <div className="mb-6 p-4 bg-gray-50 rounded">
            <h2 className="text-xl font-semibold mb-2">QA Validation Report</h2>
            <p className="mb-2">Date: {new Date().toLocaleDateString()}</p>
            <p className="mb-2">Table: {selectedFile.label}</p>
            <p className="mb-4">
              {isDifferent ? (
                <span className="text-red-600 font-semibold">
                  ⚠️ Differences found between source and target DDL definitions. Please review the highlighted changes below.
                </span>
              ) : (
                <span className="text-green-600 font-semibold">
                  ✓ The DDL definitions are identical between source and target.
                </span>
              )}
            </p>
          </div>
        )}

        {selectedFile && fileContents.source && fileContents.target && (
          <div className="diff-viewer-container">
            <ReactDiffViewer
              oldValue={fileContents.source}
              newValue={fileContents.target}
              splitView={true}
              leftTitle={`Source: ${selectedFile.label}`}
              rightTitle={`Target: ${selectedFile.label}`}
              styles={{
                contentText: {
                  fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                  fontSize: '10px',
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}; 