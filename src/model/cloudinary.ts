export interface CloudinaryConfig {
    cloudName: string;
    uploadPreset: string;
    sources: string[];
    multiple?: boolean;
    maxFiles?: number;
    resourceType?: string;
}

export interface CloudinaryError {
    message: string;
    name: string;
    http_code?: number;
}

export interface CloudinaryResult {
    event: string;
    info: {
        url: string;
        secure_url: string;
        thumbnail_url: string;
        public_id: string;
        format: string;
        width: number;
        height: number;
    };
}

export interface CloudinaryUploadWidget {
    open: () => void;
    close: () => void;
}

export interface CloudinaryWidget {
    openUploadWidget: (
        config: CloudinaryConfig,
        callback?: (error: CloudinaryError | null, result: CloudinaryResult) => void
    ) => CloudinaryUploadWidget;
}