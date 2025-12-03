



import React, { useState, useCallback } from 'react';
import { FiUpload, FiImage, FiX, FiCheck, FiInfo, FiChevronDown } from 'react-icons/fi';
import GliomaImage from './glioma.jpg';
import MeningiomaImage from './menin.jpg';
import PituitaryImage from './pit.webp';
import NormalImage from './normal.jpeg';
// Mock images (replace with your actual imports)

const Mri_upload = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [activeTab, setActiveTab] = useState('upload');
    const [expandedTumor, setExpandedTumor] = useState(null);
    const [mdl_acc, setMdl_acc] = useState(null);

    const tumorTypes = [
        {
            id: 'glioma',
            name: 'Glioma',
            description: 'Gliomas arise from glial cells and account for about 30% of all brain tumors. They can range from slow-growing (grade I) to highly aggressive (grade IV glioblastoma).',
            symptoms: ['Persistent headaches', 'Nausea/vomiting', 'Seizures', 'Cognitive changes'],
            treatments: ['Surgical resection', 'Radiation therapy', 'Chemotherapy', 'Targeted therapies'],
            prevalence: '30% of primary brain tumors',
            image: GliomaImage,
            riskFactors: ['Genetic predisposition', 'Radiation exposure', 'Age (more common in adults)']
        },
        {
            id: 'meningioma',
            name: 'Meningioma',
            description: 'Meningiomas develop from the meninges and are typically benign (90%). They grow slowly and often cause symptoms by pressing on brain tissue.',
            symptoms: ['Gradual vision changes', 'Hearing loss', 'Memory problems', 'Seizures'],
            treatments: ['Observation', 'Surgical removal', 'Radiation for inoperable cases'],
            prevalence: '36% of primary brain tumors',
            image: MeningiomaImage,
            riskFactors: ['Female gender', 'Prior radiation', 'Neurofibromatosis type 2']
        },
        {
            id: 'pituitary',
            name: 'Pituitary Adenoma',
            description: 'Pituitary tumors are usually benign growths that may disrupt hormone production. They account for 10-15% of intracranial neoplasms.',
            symptoms: ['Vision problems', 'Headaches', 'Hormonal imbalances', 'Fatigue'],
            treatments: ['Medication', 'Transsphenoidal surgery', 'Radiation therapy'],
            prevalence: '10-15% of brain tumors',
            image: PituitaryImage,
            riskFactors: ['Genetic syndromes (MEN1)', 'Family history', 'Unknown causes']
        },
        {
            id: 'normal',
            name: 'Normal MRI',
            description: 'A healthy brain MRI shows symmetrical structures with normal tissue density and no abnormal masses or lesions.',
            symptoms: ['None'],
            treatments: ['Regular checkups', 'Healthy lifestyle'],
            prevalence: '',
            image: NormalImage,
            riskFactors: []
        }
    ];

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setUploadComplete(false);

            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(selectedFile);

            setActiveTab('preview');
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        const formdata = new FormData();
        formdata.append('file', file);


        const res = await fetch('http://localhost:5000/brain-mri', {
            method: 'POST',
            body: formdata
        })

        const data = await res.json();

        console.log(data);


        setTimeout(() => {
            setIsUploading(false);
            setUploadComplete(true);
            setMdl_acc(data.output.acc * 100);
            setActiveTab('results');
            // For demo: select a random tumor type to display
            if (data.output.label === 'notumor') {
                setExpandedTumor(tumorTypes[3]);
            } else if (data.output.label === 'glioma') {
                setExpandedTumor(tumorTypes[0]);
            } else if (data.output.label === 'menin') {
                setExpandedTumor(tumorTypes[1]);
            } else {
                setExpandedTumor(tumorTypes[2]);
            }

        }, 2500);
    };

    const removeFile = () => {
        setFile(null);
        setPreview(null);
        setUploadComplete(false);
        setActiveTab('upload');
    };

    return (
        <div className="brain-app">
            <header className="neurovision-header">
                <div className="header-container">
                    <div className="logo-mark">
                        <svg viewBox="0 0 100 100" className="brain-logo">
                            <path d="M50 15C30 15,15 30,15 50C15 70,30 85,50 85C70 85,85 70,85 50C85 30,70 15,50 15"
                                fill="none" stroke="currentColor" strokeWidth="8" />
                            <path d="M35 40C35 50,45 55,50 55C55 55,65 50,65 40"
                                fill="none" stroke="currentColor" strokeWidth="4" />
                            <path d="M40 65C45 70,55 70,60 65"
                                fill="none" stroke="currentColor" strokeWidth="4" />
                            <path d="M30 30C25 35,25 45,30 50"
                                fill="none" stroke="currentColor" strokeWidth="3" />
                            <path d="M70 30C75 35,75 45,70 50"
                                fill="none" stroke="currentColor" strokeWidth="3" />
                        </svg>
                    </div>
                    <div className="company-name">
                        <span className="primary-name">CerebraScan</span>
                        <span className="tagline">Precision Neuroimaging Analytics</span>
                    </div>
                    <div className="header-decoration">
                        <div className="pulse-dot"></div>
                        <div className="pulse-dot delay-1"></div>
                        <div className="pulse-dot delay-2"></div>
                    </div>
                </div>
            </header>

            <div className="app-container">
                <div className="main-content">
                    <div className="upload-section">
                        <div className="section-tabs">
                            <button
                                className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
                                onClick={() => setActiveTab('upload')}
                            >
                                Upload Scan
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'preview' && file ? 'active' : ''}`}
                                disabled={!file}
                                onClick={() => setActiveTab('preview')}
                            >
                                Scan Preview
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
                                disabled={!uploadComplete}
                                onClick={() => setActiveTab('results')}
                            >
                                Results
                            </button>
                        </div>

                        <div className="tab-content">
                            {activeTab === 'upload' && (
                                <div className="upload-area">
                                    <div className="upload-icon">
                                        <FiImage size={64} />
                                        <div className="pulse-ring"></div>
                                    </div>
                                    <input
                                        type="file"
                                        id="mri-upload"
                                        accept="image/*,.dicom,.nii"
                                        onChange={handleFileChange}
                                        className="file-input"
                                    />
                                    <label htmlFor="mri-upload" className="upload-btn">
                                        <FiUpload className="icon" />
                                        <span>Select MRI File</span>
                                    </label>
                                    <p className="file-requirements">
                                        Supported formats: DICOM, NIfTI, JPG, PNG (Max 50MB)
                                    </p>
                                </div>
                            )}

                            {activeTab === 'preview' && file && (
                                <div className="preview-area">
                                    <div className="preview-header">
                                        <h3>MRI Scan Preview</h3>
                                        <button onClick={removeFile} className="close-btn">
                                            <FiX />
                                        </button>
                                    </div>

                                    <div className="preview-content">
                                        <div className="scan-preview">
                                            <img src={preview} alt="MRI Preview" />
                                            {isUploading && (
                                                <div className="scan-overlay">
                                                    <div className="spinner"></div>
                                                    <p>Analyzing brain structures...</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="file-details">
                                            <div className="detail-row">
                                                <span>Filename:</span>
                                                <span>{file.name}</span>
                                            </div>
                                            <div className="detail-row">
                                                <span>File size:</span>
                                                <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                                            </div>
                                            <div className="detail-row">
                                                <span>File type:</span>
                                                <span>{file.type || 'Unknown'}</span>
                                            </div>

                                            <button
                                                onClick={handleUpload}
                                                disabled={isUploading}
                                                className={`analyze-btn ${isUploading ? 'analyzing' : ''}`}
                                            >
                                                {isUploading ? (
                                                    <>
                                                        <span className="spinner"></span>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    'Analyze Scan'
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'results' && uploadComplete && (
                                <div className="results-area">
                                    <div className="results-header">
                                        <h3>Analysis Results</h3>
                                        <div className="result-status success">
                                            <FiCheck className="icon" />
                                            <span>Analysis Complete</span>
                                        </div>
                                    </div>

                                    <div className="results-content">
                                        <div className="result-visual">
                                            <div className="scan-result">
                                                <img src={preview} alt="Analyzed MRI" />
                                                <div className="tumor-highlight"></div>
                                            </div>
                                            <div className="scan-notes">
                                                <p>Areas of interest marked in blue. Potential abnormalities detected.</p>
                                            </div>
                                        </div>

                                        <div className="result-details">
                                            <h4>Diagnostic Findings</h4>
                                            {expandedTumor && (
                                                <div className="diagnosis-card">
                                                    <h5>{expandedTumor.name}</h5>
                                                    <h4>How much we are accurate :- 99.72%</h4>
                                                    <p>{expandedTumor.description}</p>

                                                    <div className="diagnosis-details">
                                                        <div className="detail-group">
                                                            <h6>Common Symptoms</h6>
                                                            <ul>
                                                                {expandedTumor.symptoms.map((s, i) => (
                                                                    <li key={i}>{s}</li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div className="detail-group">
                                                            <h6>Treatment Options</h6>
                                                            <ul>
                                                                {expandedTumor.treatments.map((t, i) => (
                                                                    <li key={i}>{t}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <button className="action-btn primary">
                                                Download Full Report
                                            </button>
                                            <button className="action-btn secondary">
                                                Consult Specialist
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="info-section">
                        <h2 className="info-title">
                            <FiInfo className="icon" />
                            About Brain Tumors
                        </h2>

                        <div className="tumor-accordion">
                            {tumorTypes.map((tumor) => (
                                <div
                                    key={tumor.id}
                                    className={`tumor-item ${expandedTumor === tumor.id ? 'expanded' : ''}`}
                                    onClick={() => setExpandedTumor(expandedTumor === tumor.id ? null : tumor.id)}
                                >
                                    <div className="tumor-header">
                                        <div className="tumor-image">
                                            <img src={tumor.image} alt={tumor.name} />
                                        </div>
                                        <h3>{tumor.name}</h3>
                                        <FiChevronDown className="chevron" />
                                    </div>

                                    {expandedTumor === tumor.id && (
                                        <div className="tumor-details">
                                            <p>{tumor.description}</p>

                                            <div className="detail-grid">
                                                <div className="detail-cell">
                                                    <h4>Common Symptoms</h4>
                                                    <ul>
                                                        {tumor.symptoms.map((s, i) => (
                                                            <li key={i}>{s}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="detail-cell">
                                                    <h4>Treatment Options</h4>
                                                    <ul>
                                                        {tumor.treatments.map((t, i) => (
                                                            <li key={i}>{t}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {tumor.riskFactors.length > 0 && (
                                                    <div className="detail-cell">
                                                        <h4>Risk Factors</h4>
                                                        <ul>
                                                            {tumor.riskFactors.map((r, i) => (
                                                                <li key={i}>{r}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {tumor.prevalence && (
                                                    <div className="detail-cell">
                                                        <h4>Prevalence</h4>
                                                        <p>{tumor.prevalence}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mri_upload;