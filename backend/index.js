import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import BlogModel from './models/blog.model.js';
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())                                      // all access
// app.use(cors({origin: "http://localhost:5173/"})) // limited access

// ----- PORT -----
const port = 3000

// ----- CONNECT DB FUNCTION -----
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/blogify')
        console.log("MongoDB connected. 🥳")
    } catch (error) {
        console.log("MongoDB not connected");
    }
}
connectDB()


// ----- HOME ROUTE -----
app.get('/', (req, res) => {
    res.send('Welcome to blogify')
})


// ----- ADD BLOG -----
app.post('/addblog', async (req, res) => {
    try {
        let { title, shortDescription, longDescription, image, date, author, category, tags } = req.body

        let newBlog = await BlogModel.create({ title, shortDescription, longDescription, image, date, author, category, tags })

        if (!newBlog) {
            res.status(500).json({ success: false, message: "Blog Not Added" })
        }

        res.status(200).json({ success: true, message: "Blog Added Successfully", newBlog })


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Add Blog API Error", error })
    }
})


// ----- ALL BLOG -----
app.get('/allblog', async (req, res) => {
    try {
        let allBlogs = await BlogModel.find()
        let blogCount = await BlogModel.find().countDocuments()

        res.status(200).json({ success: true, message: "Blog Fetched Successfully", blogCount, allBlogs })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "All Blog API Error", error })
    }
})


// ----- Ftech Blog via Id -----
app.get('/getblogbyid/:id', async (req, res) => {
    try {
        const { id } = req.params
        let blogDetails = await BlogModel.findOne({ _id: id })

        res.status(200).json({ success: true, message: "Blog Fetched Successfully", blogDetails })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Single Blog Fetch API Error", error })
    }
})


// ----- ADD BLOG -----
app.patch('/editblog/:id', async (req, res) => {
    try {
        let { title, shortDescription, longDescription, image, date, author, category, tags } = req.body

        const { id } = req.params

        let updatedBlog = await BlogModel.findOneAndUpdate({ _id: id }, { title, shortDescription, longDescription, image, date, author, category, tags }, { new: true })

        if (!updatedBlog) {
            res.status(500).json({ success: false, message: "Blog Not Updated" })
        }

        res.status(200).json({ success: true, message: "Blog Updated Successfully", updatedBlog })


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Update Blog API Error", error })
    }
})












// ----- SERVER -----
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})