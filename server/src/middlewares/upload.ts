import multer, { FileFilterCallback } from "multer"
import moment from "moment"
import { Request } from "express"

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/uploads/')
  },
  filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS')
    callback(null, `${date}-${file.originalname}`)
  }
})

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/webp") {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

const limits = {
  fileSize: 1024 * 1024 * 5
}

export const multerMiddleware = multer({
  storage,
  fileFilter,
  limits
})