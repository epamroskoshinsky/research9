import React, { memo } from "react";
import { useLayout } from "@app/modules/layout";
import { useProfiler } from "@utils/useProfiler";
import { Link } from "react-router-dom";

export const NavigationHeader2 = memo ( function NavigationHeader2 () {
    const { toggleStructure } = useLayout();
    useProfiler( "NavigationHeader2" );
    return (
        <div className="navigationHeader" >
            <button onClick={ toggleStructure } >S</button>
            <h1>Header 2</h1>
            <ul>
                <li><Link to="/unit-a" >UnitA</Link></li>
                <li><Link to="/unit-b" >UnitB</Link></li>
                <li><Link to="/unit-c" >UnitC</Link></li>
                <li><Link to="/landing-a" >LanA</Link></li>
                <li><Link to="/landing-b" >LanB</Link></li>
                <li><Link to="/landing-heighest-c" >LanHC</Link></li>
            </ul>
        </div>
    );
} );
