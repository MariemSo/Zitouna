const throwError = (message: string, code: string = "ERR500") => {
    const error: any = new Error(message);
    error.code = code;
    throw error;
};

export {throwError}