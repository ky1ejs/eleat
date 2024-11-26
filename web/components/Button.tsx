import LoadingSpinner from "@/components/LoadingSpinner";

const Button = ({ text, isLoading, className, onClick }: { text: string, isLoading?: boolean, className?: string, onClick: () => void }) => (
  <div>
    <button className={`${className ?? ""} bg-green-800 hover:bg-green-700 active:bg-green-600 rounded px-4 py-1 text-white`} onClick={onClick} >
      {(isLoading) ? <LoadingSpinner /> : text}
    </button>
  </div>
);

export default Button;
