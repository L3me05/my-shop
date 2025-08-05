interface ServerErrorProps {
    message?: string;
}

export function ServerError({ message = "A server error occurs!" }: ServerErrorProps) {
    return (
        <div className="bg-red-800 text-white rounded-xl p-3 my-6">
            {message}
        </div>
    );
}