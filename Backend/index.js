import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

import { json } from 'stream/consumers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(cors());

const storage = multer.diskStorage({
    destination : (req,file,cb)=>cb(null,'uploads/'),
    filename:(req,file,cb)=> cb(null,Date.now()+'-'+file.originalname)
})

const upload = multer({storage});

app.use('/brain-mri',upload.single('file'),(req,res)=>{
   if (!req.file){
    return res.status(404).json({error : 'No MRI uploaded!!!!'});
   }

   const mri_path = path.join(__dirname,'uploads',req.file.filename);
   console.log(mri_path);
   const python_result = spawn('python',['Mri.py',mri_path]);

   let result = "";

   let err = "";
   python_result.stdout.on('data',(data)=>{
    console.log('python stdout chunk :- ',data.toString());
    result += data.toString();
   })

   python_result.stderr.on('data',(data)=>{
    console.log('python stderr chunk :- ',data.toString());
    err += data.toString();
   })

   python_result.on('close',(code)=>{
    console.log(result);
    console.log(err);
    
    let final_res;
    
    let lines = result.trim().split('\n');
    let req_res = lines.reverse().find(line=>line.startsWith('{') && line.endsWith('}'));

    try {
        final_res = JSON.parse(req_res);
    
    } catch (error) {
        return res.json({
            message:'No valid output from OUR AI',
            parseError : error.message
        })
    }

    console.log(final_res);
    return res.json({
        message:err ? 'An error occurred during detection.':'Hey, we are done with the Detection! We are relished to help you.',
        output:final_res,
        error:err || null
    })
   })
})

app.listen(5000,()=>{
    console.log("Hey Man how are u??")
})
