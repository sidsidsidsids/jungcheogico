interface SuccessToastProps {
    message: string;
  }
  export default function SuccessToast({ message }: SuccessToastProps) {
    return (
      <div className="fixed right-4 top-3 h-9 p-2 rounded-md bg-green-400 text-center font-noto_sans_kr text-white text-bold">
        {message}
      </div>
    );
  }
  