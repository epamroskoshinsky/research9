import React, { memo } from "react";
import {
    Layout,
    useLayout,
    LayoutModes
} from "@app/modules/layout";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";
import { UnitA } from "../Units/UnitA";
import { UnitB } from "../Units/UnitB";
import { UnitC } from "../Units/UnitC";
import { PageNotFound } from "../Pages/PageNotFound";
import { PageAccessDenied } from "../Pages/PageAccessDenied";
import { useProfiler } from "../../utils/useProfiler";
import "./index.scss";

const NavigationSidebar = memo( function NavigationSidebar () {
    useProfiler( "NavigationSidebar" );
    return (
        <div className="navigationSidebar" >
            <ul>
                <li><Link to="/a" >UnitA</Link></li>
                <li><Link to="/b" >UnitB</Link></li>
                <li><Link to="/c" >UnitC</Link></li>
            </ul>
        </div>
    );
} );

const NavigationStructure = memo( function NavigationStructure () {
    const { toggleStructure } = useLayout();
    useProfiler( "NavigationStructure" );
    return <div className="navigationStructure" onClick={ toggleStructure } ></div>;
} );

const NavigationHeader = memo( function NavigationHeader () {
    const { toggleStructure } = useLayout();
    useProfiler( "NavigationHeader" );
    return (
        <div className="navigationHeader" >
            <button onClick={ toggleStructure } >S</button>
            <h1>Header</h1>
            <ul>
                <li><Link to="/a" >UnitA</Link></li>
                <li><Link to="/b" >UnitB</Link></li>
                <li><Link to="/c" >UnitC</Link></li>
            </ul>
        </div>
    );
} );

function NavigationHeader2 () {
    const { toggleStructure } = useLayout();
    useProfiler( "NavigationHeader2" );
    return (
        <div className="navigationHeader" >
            <button onClick={ toggleStructure } >S</button>
            <h1>Header 2</h1>
            <ul>
                <li><Link to="/a" >UnitA</Link></li>
                <li><Link to="/b" >UnitB</Link></li>
                <li><Link to="/c" >UnitC</Link></li>
            </ul>
        </div>
    );
}

export function App () {

    useProfiler( "App" );

    return (
        <Router>
            <div className="content" >
                <Switch>
                    <Route path="/a" exact >
                        <Layout
                            layoutMode={ LayoutModes.SIDEBAR_HEADER_CONTENT }
                            content={ <UnitA /> }
                            navigationHeader={ <NavigationHeader /> }
                            navigationSidebar={ <NavigationSidebar /> }
                            navigationStructure={ <NavigationStructure /> }
                        />
                    </Route>
                    <Route path="/b" exact >
                        <Layout
                            layoutMode={ LayoutModes.SIDEBAR_HEADER_CONTENT }
                            content={ <UnitB /> }
                            navigationHeader={ <NavigationHeader2 /> }
                            navigationSidebar={ <NavigationSidebar /> }
                            navigationStructure={ <NavigationStructure /> }
                        />
                    </Route>
                    <Route path="/c" exact >
                        <Layout
                            layoutMode={ LayoutModes.SIDEBAR_HEADER_CONTENT }
                            content={ <UnitC /> }
                            navigationHeader={ <NavigationHeader /> }
                            navigationSidebar={ <NavigationSidebar /> }
                            navigationStructure={ <NavigationStructure /> }
                        />
                    </Route>
                    <Route path="/403" exact >
                        <Layout
                            layoutMode={ LayoutModes.SIDEBAR_CONTENT }
                            content={ <PageAccessDenied /> }
                            navigationSidebar={ <NavigationSidebar /> }
                        />
                    </Route>
                    <Route path="*" >
                        <Layout
                            layoutMode={ LayoutModes.SIDEBAR_CONTENT }
                            content={ <PageNotFound /> }
                            navigationSidebar={ <NavigationSidebar /> }
                        /> 
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
