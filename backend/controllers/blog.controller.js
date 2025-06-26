import fs from "fs";
import imagekit from "../configs/imageKit";
import Blog from "../models/Blog.model.js"

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path)
    //upload a image
    const response = await imagekit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: "/blogs"
    });

    //optimization through imagekit URL transformation
    const optimizedImageUrl = imagekit.url({
        path: response.filePath,
        transformation: [
            {quality: 'auto'}, // Auto compression
            {format: 'webp'}, // Convert to modern format
            {width: '1280'} // Width resizing
        ]
    });

    const image = optimizedImageUrl;

    await Blog.create({title, subTitle, description, category, image, isPublished})
    res.json({success: true, message: "Blog added successfully"})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
};
