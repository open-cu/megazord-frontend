import { MantineProvider } from "@mantine/core";
import { RouterProvider, RouterProviderProps } from "react-router-dom";
import {Notifications} from "@mantine/notifications";
import {theme} from "@/app/theme";

export const Providers = ({ router }: RouterProviderProps ) => {
    return (
        <MantineProvider defaultColorScheme={"auto"}
                         theme={theme}
        >
            <Notifications />
            <RouterProvider router={router} />
        </MantineProvider>
    );
}