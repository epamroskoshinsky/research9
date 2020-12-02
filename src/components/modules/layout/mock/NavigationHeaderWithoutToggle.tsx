import React, { memo } from "react";
import { useProfiler } from "@utils/useProfiler";
import { Link } from "react-router-dom";

export const NavigationHeaderWithoutToggle = memo( function NavigationHeaderWithoutToggle () {
    useProfiler( "NavigationHeaderWithoutToggle" );
    return (
        <div className="navigationHeader" >
            <h1>Header</h1>
            <ul>
                <li><Link to="/unit-a" >UnitA</Link></li>
                <li><Link to="/unit-b" >UnitB</Link></li>
                <li><Link to="/unit-c" >UnitC</Link></li>
                <li><Link to="/landing-a" >LanA</Link></li>
                <li><Link to="/landing-b" >LanB</Link></li>
                <li><Link to="/landing-c" >LanC</Link></li>
            </ul>
        </div>
    );
} );

