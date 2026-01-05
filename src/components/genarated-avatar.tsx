import {createAvatar} from "@dicebear/core";
import {bottteNeutra, botttsNeutral, initials} from "@dicebear/collection";
import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar" 
import { create } from "node:domain";
import { toUpperCase } from "zod";


interface generatedAvatarPages {
    seed: string;
    className?: string;
    variant: "botttsNeutral" | "initials";
}
export const GeneratedAvatar = ({
    seed,
    className,
    variant
}: generatedAvatarPages)  => {
    let avatar;
    if (variant === "botttsNeutral") {
        avatar = createAvatar(botttsNeutral, {seed})
    }else {
        avatar = createAvatar(initials, {
            seed, 
            fontWeight: 500,
            fontSize:42,
        })

    }
    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar.toDataUri()} alt="Avatar" />
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    );
};