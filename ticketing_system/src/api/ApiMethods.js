import { AppConstants } from "../../helpers/AppConstants";

export const UploadFile = (selectedFile) => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    const requestOptions = {
        method: 'POST',
        body: formData
    };

    fetch(`${AppConstants.baseURL + AppConstants.uploadImage}${1}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log("uploadImage data", data);
        });
}