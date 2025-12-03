NeuroScan — Brain MRI Tumor Classification

NeuroScan is a deep learning–powered web application designed to assist in the early identification of brain tumors from MRI scans. It uses a Convolutional Neural Network (CNN) model trained on well-structured MRI datasets to classify four categories of brain conditions:
->Normal
->Glioma
->Meningioma
->Pituitary Tumor

The aim of this project is not to replace medical professionals, but to make preliminary analysis faster and more accessible — especially in regions where diagnostic infrastructure is limited.

Features:-
->Upload MRI images directly from browser
->Real-time tumor prediction within seconds
->Classification into 4 medical categories
->Short description of symptoms and general treatment approaches for each condition
->Clean UI and easy-to-use interface suitable for non-technical users

Model Overview:-
->Model Type: Convolutional Neural Network (CNN)
->Framework: TensorFlow / Keras
->Training performed using open-source MRI brain tumor dataset
->Performance evaluated through accuracy, confusion matrix, and loss curves
->The model focuses on extracting tumor-related features from MRI scans using multiple convolutional and pooling layers, followed by dense layers for classification.
