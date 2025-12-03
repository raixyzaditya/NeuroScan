import numpy as np
import cv2
from tensorflow.keras.models import load_model
import sys
import json

model = load_model('New_mdl_more_acc.h5')

class_indices = {'glioma':0,'menin':1,'notumor':2,'pitutiary':3}

index = {v:k for k,v in class_indices.items()}

def preprocess_img(image_path,mdl,target_size=(128,128)):
    if image_path is None:
        raise FileNotFoundError(f'MRI not found {image_path}')
    
    img = cv2.imread(image_path,cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img,target_size)
    clah = cv2.createCLAHE(clipLimit=2.0,tileGridSize=(8,8))
    img = clah.apply(img)

    img = img.astype(np.float32)/255.0

    img = np.expand_dims(img,axis = -1)
    img = np.expand_dims(img,axis = 0)

    result = mdl.predict(img)
    pred_index = int(np.argmax(result,axis=1)[0])
    pred_prob = index.get(pred_index,'Unknown')

    return pred_index,pred_prob,result

if __name__ == '__main__':
   if (len(sys.argv) < 2):
       print(json.dumps("No MRI provided!!!"))
       sys.exit(1)

   img_path= sys.argv[1]
   try:
      label,probability,acc = preprocess_img(img_path,model)
      mdl_acc = np.max(acc,axis=1)
      print(json.dumps({
       'label':probability,
       'prob':label,
       'acc':mdl_acc
      }))
   except Exception as e:
       print(json.dumps({'error':str(e)}))
      
   