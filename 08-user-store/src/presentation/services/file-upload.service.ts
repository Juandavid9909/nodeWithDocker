export class FileUploadService {

    constructor() {}

    private checkFolder(folderPath: string) {
        throw new Error("Method not implemented.");
    }

    uploadSingle(
        file: File,
        folder: string = "uploads",
        validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
    ) {

    }

    uploadMultiple(
        files: File[],
        folder: string = "uploads",
        validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
    ) {

    }
}