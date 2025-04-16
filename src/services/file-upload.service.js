import http from '@services/user.service';

class FileUploadService {
  upload(file, onUploadProgress) {
    let formData = new FormData();
    const location = window.location;

    formData.append("file", file);

    // http.init(`/${"comingFrom/FielUpload"}`)
    http.init(location.pathname)

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new FileUploadService();