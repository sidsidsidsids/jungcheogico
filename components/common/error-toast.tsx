interface ErrorToastProps {
  message: string;
}
export default function ErrorToast({ message }: ErrorToastProps) {
  return (
    <div className="fixed right-4 top-3 h-9 p-2 rounded-md bg-red-400 text-center font-noto_sans_kr text-white text-bold">
      {message}
    </div>
  );
}
