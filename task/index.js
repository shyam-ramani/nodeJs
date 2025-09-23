import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));


app.get("/", (req, res) => {
    fs.readdir("./files", (err, files) => {
        if (err) return res.status(500).send("Error reading files");
        res.render("index", { files });
    });
});


app.post("/create", (req, res) => {
    const { filename, content } = req.body;
    fs.writeFileSync(`./files/${filename}.txt`, content);
    res.redirect("/");
});


app.get("/files/:filename", (req, res) => {
    const filename = req.params.filename;
    fs.readFile(`./files/${filename}`, "utf-8", (err, fileData) => {
        if (err) return res.status(404).send("File not found");
        res.render("show", { filename, fileData });
    });
});
app.get("/rename/:filename", (req, res) => {
    res.render("rename", { filename: req.params.filename });
})
app.post("/rename", (req, res) => {
    const oldName = req.body.oldName;
    const newName = req.body.newName;

    const oldFile = oldName.endsWith(".txt") ? oldName : `${oldName}.txt`;
    const newFile = newName.endsWith(".txt") ? newName : `${newName}.txt`;

    fs.rename(`./files/${oldFile}`, `./files/${newFile}`, (err) => {
        if (err) {
            console.error("Rename failed:", err);
            return res.status(500).send("Error renaming file");
        }
        res.redirect("/");
    });
});
app.listen(3000, () => console.log("✅ Listening on http://localhost:3000"));
