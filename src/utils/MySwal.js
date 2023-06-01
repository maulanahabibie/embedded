import sw from "sweetalert2";

const didOpenMessage = (e) => {
  if (typeof e?.addEventListener === "function") {
    e.addEventListener('mouseenter',sw.stopTimer)
    e.addEventListener('mouseleave',sw.resumeTimer)
  }
  return "";
}

class MySwal {
  constructor() {}
  loading() {
    return sw.fire({
      title: 'Loading...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => sw.showLoading(),
      scrollbarPadding: false,
    });
  }

  success(params = {}) {
    const config = {
      title: "Success!",
      text: "",
      icon: "success",
      type: "success",
      timer: 2000,
      timerProgressBar: true,
      didOpen: didOpenMessage,
    }
    if (typeof params === "string") {
      config.text = params;
      params = {}
    }
    return sw.fire({...config,...params})
  }
  error(params = {}) {
    const config = {
      title: "Error!",
      text: "",
      icon: "error",
      type: "error",
      // timer: 10000,
      // timerProgressBar: true,
      didOpen: didOpenMessage,
    }
    if (typeof params === "string") {
      config.text = params;
      params = {}
    }
    return sw.fire({...config,...params})
  }

  warning(params = {}) {
    const config = {
      title: "Warning!",
      text: "",
      icon: "warning",
      type: "warning",
      // timer: 5000,
      // timerProgressBar: true,
      didOpen: didOpenMessage,
    }
    if (typeof params === "string") {
      config.text = params;
      params = {}
    }
    return sw.fire({...config,...params})
  }

  info(params = {}) {
    const config = {
      title: "Info!",
      text: "",
      icon: "info",
      type: "info",
      // timer: 3000,
      // timerProgressBar: true,
      didOpen: didOpenMessage,
    }
    if (typeof params === "string") {
      config.text = params;
      params = {}
    }
    return sw.fire({...config,...params})
  }

  confirm(params = {}) {
    const config = {
      title: "Confirmation!",
      text: "",
      icon: "question",
      type: "question",
      didOpen: () => "",
      allowEnterKey: true,
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    };
    if (typeof params === "string") {
      config.text = params;
      params = {}
    }
    return sw.fire({ ...config, ...params });
  }

  confirmProf(params = {}) {
    const config = {
      title: "Confirmation!",
      text: "",
      icon: "question",
      type: "question",
      didOpen: () => "",
      allowEnterKey: true,
      showCancelButton: true,
      showDenyButton: true,
      cancelButtonText: "Close",
      denyButtonText: "Print",
      confirmButtonText: "APPROVED",
    };
    if (typeof params === "string") {
      config.text = params;
      params = {}
    }
    return sw.fire({ ...config, ...params });
  }

  fire(a,b,c,d){
    return sw.fire(a,b,c,d);
  }

  close() {
    sw.close();
  }
}

export const Swal = sw;
export default MySwal;