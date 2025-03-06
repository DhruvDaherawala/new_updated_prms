import React from 'react';

// Document display component for displaying document links in view mode
export function DocumentDisplay({ documents, apiUrl }) {
  const cardStyle = 'p-2 border rounded-lg bg-gray-100';

  return (
    <div className="grid grid-cols-2 gap-4 mt-2">
      <DocumentItem title="Aadhaar Card" document={documents.aadhaarCard} apiUrl={apiUrl} cardStyle={cardStyle} />
      <DocumentItem title="PAN Card" document={documents.panCard} apiUrl={apiUrl} cardStyle={cardStyle} />
      <DocumentItem title="Passport Photo" document={documents.passportPhoto} apiUrl={apiUrl} cardStyle={cardStyle} />
      <DocumentItem title="Other Document" document={documents.otherDocument} apiUrl={apiUrl} cardStyle={cardStyle} />
    </div>
  );
}

// Individual document item
function DocumentItem({ title, document, apiUrl, cardStyle }) {
  return (
    <div>
      <p className="text-sm font-medium">{title}:</p>
      <p className={cardStyle}>
        {document ? (
          <a href={`${apiUrl}uploads/${document}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            View Document
          </a>
        ) : (
          'No document'
        )}
      </p>
    </div>
  );
}

// Document upload component for the edit mode
export function DocumentUpload({ currentDoc, docName, handleFileChange, apiUrl, formInputStyle }) {
  return (
    <div>
      <p className="text-sm font-medium">{docName}:</p>
      <div className="space-y-2">
        {currentDoc && (
          <a
            href={`${apiUrl}uploads/${currentDoc}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 underline mb-2"
          >
            Current Document
          </a>
        )}
        <input type="file" name={docName.toLowerCase().replace(' ', '')} onChange={handleFileChange} className={formInputStyle} />
      </div>
    </div>
  );
}
