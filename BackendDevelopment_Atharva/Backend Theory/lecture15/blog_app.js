
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/blog_app")
    .then(() => {
        console.log("Connected to MongoDB");
        return testValidation();
    })
    .catch(error => console.log("Connection error:", error));

// Post Schema with Validation
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Post title is required"],
        trim: true,
        minlength: [3, "Title must be at least 3 characters long"]
    },
    content: {
        type: String,
        required: [true, "Post content is required"]
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true
    },
    category: {
        type: String,
        enum: {
            values: ["Technology", "Education", "Lifestyle"],
            message: "Invalid category"
        },
        default: "Technology"
    }
}, { timestamps: true });

// Comment Schema with Validation
const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Comment text is required"],
        trim: true,
        minlength: [1, "Comment cannot be empty"]
    },
    author: {
        type: String,
        required: [true, "Comment author is required"],
        trim: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "Comment must belong to a post"]
    }
}, { timestamps: true });

// Create Models
const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

// Validation Test
async function testValidation() {
    try {
        const testPost = new Post({
            title: "AB",
            content: "Testing validation",
            author: "Aarav",
            category: "InvalidCategory"
        });

        // Validate without saving to MongoDB
        await testPost.validate();

        console.log("Validation passed.");
    } catch (error) {
        if (error.name === "ValidationError") {
            console.log("Validation is working correctly!");

            for (const field in error.errors) {
                console.log(`${field}: ${error.errors[field].message}`);
            }
        } else {
            console.log("Error:", error.message);
        }
    } finally {
        await mongoose.disconnect();
        console.log("MongoDB connection closed.");
    }
}
