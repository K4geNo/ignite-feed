import { ImgHTMLAttributes } from "react"
import styles from "./Avatar.module.css"

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean
}

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
    return (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img
            className={hasBorder ? styles.avatarWithBorder : styles.avatar}
            {...props}
        />
    )
}
