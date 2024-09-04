import {notifications} from "@mantine/notifications";

type toastTypes = "default" | "success" | "error";

type toastProps = {
    type?: toastTypes;
    title?: string;
    message: string;
    loading?: boolean;
    id?: string;
};

export const toast = ({ type = "default", title, message, loading = false, id }: toastProps) => {
    const colors: Record<toastTypes, string> = {
        "default": "var(--mantine-primary-color-filled)",
        "success": "green",
        "error": "red",
    };
    if(id) return notifications.update({
        id: id,
        message: message,
        title: title || "",
        loading: loading,
        withBorder: true,
        color: colors[type],
        autoClose: !loading,
        withCloseButton: !loading
    })
    return notifications.show({
        message: message,
        title: title || "",
        loading: loading,
        withBorder: true,
        color: colors[type],
        autoClose: !loading,
        withCloseButton: !loading
    });
};
