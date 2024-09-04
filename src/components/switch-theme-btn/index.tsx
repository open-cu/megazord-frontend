import React, {FC} from "react";
import {ActionIcon, useMantineColorScheme} from "@mantine/core";
import {IconMoon, IconSun} from "@tabler/icons-react";

export const SwitchThemeBtn: FC = (
    { size = "md", style }:
        { size?: "xs" | "sm" | "md" | "lg" | "xl" | string | number, style?: React.CSSProperties}
) => {
    const { setColorScheme, colorScheme } = useMantineColorScheme();
    return (
        <>

            <ActionIcon
                radius={"xl"}
                size={size}
                style={style}
                onClick={() => { setColorScheme(colorScheme== "light" ? "dark" : "light" ) }}
            >
                { colorScheme == "light" ?
                    <IconSun size={20} stroke={2} /> :
                    <IconMoon size={20} stroke={2} />
                }
            </ActionIcon>
        </>
    )
}