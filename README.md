# NeuroScan — Brain MRI Tumor Classification

NeuroScan is a deep learning–powered web application designed to assist in the early identification of brain tumors from MRI scans. It uses a Convolutional Neural Network (CNN) model trained on open-source MRI datasets to classify four brain tumor categories:

- Normal
- Glioma
- Meningioma
- Pituitary Tumor

The goal is to provide quick preliminary screening and help guide further medical diagnosis — especially in areas with limited access to specialists.

---

## 🚀 Features

- Upload MRI images directly from the browser  
- Real-time tumor prediction within seconds  
- Classification into 4 medical categories  
- Short symptom and treatment information for the predicted condition  
- Clean and intuitive interface for non-technical users  

---

## 🧠 Model Overview

- Model Type: Convolutional Neural Network (CNN)  
- Framework: TensorFlow / Keras  
- Trained using MRI brain tumor dataset (publicly available)  
- Evaluated using accuracy, confusion matrix, and learning curves  

The model extracts tumor-specific patterns using convolutional + pooling layers followed by dense classification layers.

---

## 🛠️ Tech Stack

| Component | Technology |
|----------|------------|
| Frontend | React.js |
| Backend | Node.js + Express.js |
| Deep Learning Model | Python, TensorFlow |






