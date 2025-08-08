import type {CloudinaryError, CloudinaryResult, CloudinaryWidget} from "../../model/cloudinary.ts";


declare const cloudinary: CloudinaryWidget;

export function useCloudinary() {
    function openWidget(): Promise<{ img: string, tmb: string }> {
        return new Promise((resolve, reject) => {
            const uploadWidget = cloudinary.openUploadWidget(
                {
                    cloudName: 'dd2shhonr',
                    uploadPreset: 'ml_default',
                    sources: ['local', 'camera', 'url']
                },
                function(error: CloudinaryError | null, result: CloudinaryResult) {
                    if (error) {
                        reject(error);
                        return;
                    }

                    if (result && result.event === 'success') {
                        const img = result.info.secure_url;
                        const tmb = result.info.thumbnail_url;
                        resolve({ img, tmb });
                    }
                }
            );

            uploadWidget.open();
        });
    }

    return {
        openWidget
    };
}