const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/crud')
const userschema=new mongoose.Schema({
    name:String,
    dep:String,
    rollno:Number,
    sem:Number,
    year:String
})
const usernote=mongoose.model('notes',userschema) 
router.get('/notes',(req,res)=>{
  const resu= usernote.find({}).then(function(user)
    {
res.send(user)
console.log("Notes retrieved successfully")})
   })
router.use(bodyParser.json());
router.put('/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { name, dep } = req.body;

    try {
        const existingNote = await usernote.findByIdAndUpdate(id);

        if (!existingNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        existingNote.name = "mythili";
        existingNote.dep = "cme";
        const updatedNote = await existingNote.save();

        res.status(200).json({ message: 'Note updated successfully', updatedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNote = await usernote.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully', deletedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/notes', async (req, res) => {
    const { name, dep ,rollno,sem,year} = req.body;

    try {
        const newNote = new usernote({ name:'mythili', dep:'cm',rollno:4,sem:3,year:'3rd' });
        const savedNote = await newNote.save();

        res.status(201).json({ message: 'Note created successfully', savedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;