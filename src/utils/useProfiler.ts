import { useEffect } from "react";

interface ProfileInterface {
    render:number;
    mount:number;
    unmount:number;
}

const profiles = new Map<string, ProfileInterface>();

export function useProfiler ( name:string ):void {
    
    let profile:ProfileInterface;

    if ( profiles.has( name ) ) {
        profile = profiles.get( name ) as ProfileInterface;
        profile.render++;
    } else {
        profile = {
            render: 0,
            mount: 0,
            unmount: 0,
        }
        profiles.set( name, profile );
    }
    
    useEffect( () => {
        profile.mount++;
        console.log( "profiler", name, "mount", profile.mount );
        return () => {
            profile.unmount++;
            console.log( "profiler", name, "unmount", profile.unmount );
        };
    }, [] );
    profile.render++;
    console.log( "profiler", name, "render", profile.render );
}