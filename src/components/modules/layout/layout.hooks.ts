import { useEffect, useState } from 'react';
import { AnimationInterface } from '@app/modules/layout/layout.types';

export function useAnimation ({
    duration=2000,
    onEnd,
}:AnimationInterface):[string, React.Dispatch<React.SetStateAction<string>>] {
    const [animation, setAnimation] = useState("");
    useEffect( () => {
        if (animation) {
            setTimeout( ()=>{
                setAnimation("");
                if (onEnd) {
                    onEnd();
                }
            }, duration)
        }
    }, [ animation ] );
    return [animation, setAnimation];
}
