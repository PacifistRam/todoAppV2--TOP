
export const savetoLocalStorage = (mainArray) => {
    const jsonArray = JSON.stringify(mainArray);
    localStorage.setItem('todoArray',jsonArray)
}

export const getFromLocalStorage = () => {
    const str = localStorage.getItem("todoArray");
    return str? JSON.parse(str) : [];
}