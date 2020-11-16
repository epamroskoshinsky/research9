import "./index.scss";
import React, { useMemo } from "react";
import {
    Layout,
    useLayout,
    LayoutModes,
    LayoutModeSet
} from "../Layout";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
  } from "react-router-dom";
import { UnitA } from "../Units/UnitA";
import { UnitB } from "../Units/UnitB";
import { UnitC } from "../Units/UnitC";
import { PageNotFound } from "../Pages/PageNotFound";
import { PageAccessDenied } from "../Pages/PageAccessDenied";
import { useProfiler } from "../../utils/useProfiler";

function NavigationSidebar () {
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
}

function NavigationStructure () {
    useProfiler( "NavigationStructure" );
    return <div className="navigationStructure" ></div>;
}

function NavigationHeader () {
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
}

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

function RoutersUnit () {
    useProfiler( "RoutersUnit" );
    return (
        <div className="content" >            
            <Switch>
                <Route path="/a" exact >
                    <LayoutModeSet layoutMode={ LayoutModes.SIDEBAR_HEADER_CONTENT } layoutCompatibility >
                        <UnitA />
                    </LayoutModeSet>
                </Route>
                <Route path="/b" exact >
                    <LayoutModeSet layoutMode={ LayoutModes.SIDEBAR_HEADER_CONTENT } layoutCompatibility >
                        <UnitB />
                    </LayoutModeSet>
                </Route>
                <Route path="/c" exact >
                    <LayoutModeSet layoutMode={ LayoutModes.SIDEBAR_HEADER_CONTENT } layoutCompatibility >
                        <UnitC />
                    </LayoutModeSet>
                </Route>
                <Route path="/403" exact >
                    <LayoutModeSet layoutMode={ LayoutModes.SIDEBAR_CONTENT } >
                        <PageAccessDenied />
                    </LayoutModeSet>
                </Route>
                <Route path="*" >
                    <LayoutModeSet layoutMode={ LayoutModes.SIDEBAR_CONTENT } >
                        <PageNotFound />
                    </LayoutModeSet>
                </Route>
            </Switch>
        </div>
    );
}

export function App () {
    useProfiler( "App" );
    return (
        <Router>
            <Layout
                content={ <RoutersUnit /> }
                navigationHeader={ <NavigationHeader /> }
                navigationHeader2={ <NavigationHeader2 /> }
                navigationSidebar={ <NavigationSidebar /> }
                navigationStructure={ <NavigationStructure /> }
            />
        </Router>
    );
}
