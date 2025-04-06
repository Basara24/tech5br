import multer from "multer";
import path from "path";

// Configuração do armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo único
    }
});

// Filtro para aceitar apenas imagens
const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Arquivo não é uma imagem!"), false);
    }
};

export const upload = multer({ storage, fileFilter });
