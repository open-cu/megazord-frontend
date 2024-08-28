import { MantineProvider } from "@mantine/core";
import { RouterProvider, RouterProviderProps } from "react-router-dom";
import {Notifications} from "@mantine/notifications";

export const Providers = ({ router }: RouterProviderProps ) => {
    return (
        <MantineProvider>
            <Notifications />
            <RouterProvider router={router} />
        </MantineProvider>
    );
}