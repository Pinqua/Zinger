import { toast } from "react-toastify";

const NormalToast = (msg, error) => {
    toast(
        <div className="font-medium">
            <span className={`${error ? "text-red-500" : ""}`}>{msg}</span>
        </div>,
        {
            position: "top-right",
            autoClose: 4000,
            style: {
                background: "white",
                color: "#1f2937",
                fontFamily: "Poppins, sans-serif",
                height: "auto",
            },
            hideProgressBar: true,
            pauseOnHover: false,
            draggable: true,
            draggablePercent: 25,
        }
    );
};

export default NormalToast;
