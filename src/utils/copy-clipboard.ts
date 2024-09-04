import {toast} from "@/utils/toasts";

export const copyClipboard = (str: string) => {
    navigator.clipboard.writeText(str).then(() => {
        toast({
            type: "success",
            message: "Успешно скопировано!"
        })
    }).catch((error) => {
        console.error("Ошибка при копировании", error);
        toast({
            type: "error",
            message: "Ошибка при копировании"
        })
    });
}