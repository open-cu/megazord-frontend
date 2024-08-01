import { MantineProvider } from "@mantine/core";
import { RouterProvider, RouterProviderProps } from "react-router-dom";

export const Providers = ({ router }: RouterProviderProps ) => {
    return (
        <MantineProvider>
            <RouterProvider router={router} />
        </MantineProvider>
    );
}