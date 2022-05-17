const express = require('express');
const app = express(); 
const fs = require('fs');

const multer = require('multer');
const memoryStorage =  multer.memoryStorage()
const upload = multer({storage: memoryStorage})

const sharp = require('sharp')

const port = process.env.PORT ||5000


// middleware
app.use(express.json())

//routes

app.get("/", (req, res) => res.send("Hola desde heroku"))

app.post("/img", upload.single('imagen'), async (req, res) => {
    const imagen = req.file
    const processedImage = sharp(imagen.buffer)
    const resizeImage = processedImage.resize(800,800, {
        fit: "contain",
        background: "#fff"
    })
    const resizedImageBuffer = await resizeImage.toBuffer()

    fs.writeFileSync('nuevaruta/prueba.png',resizedImageBuffer)

    console.log(resizedImageBuffer)
    res.send({resizedImage:resizedImageBuffer})
})

app.listen(port, ()=> console.log(`http://localhost:${port}`))