import {ERROR, SUCCESS} from "../store/types";
import {toast} from "react-toastify";

const defaultConfig = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    pauseOnHover: true
};

const ShowToast = (type, message) => {
    switch (type) {
        case ERROR:
            return toast.error(message, defaultConfig);
        case SUCCESS:
            return toast.success(message, defaultConfig);
    }
};

export default ShowToast;