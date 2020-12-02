import React, { memo } from "react";
import { useLayout } from "@app/modules/layout";
import { useProfiler } from "@utils/useProfiler";
import { Link } from "react-router-dom";

export const NavigationHeader = memo( function NavigationHeader () {
    const { toggleStructure } = useLayout();
    useProfiler( "NavigationHeader" );
    return (
        <div className="navigationHeader" >
            <button onClick={ toggleStructure } >S</button>
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

