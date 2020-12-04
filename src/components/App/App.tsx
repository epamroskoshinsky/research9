import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { UnitA } from "@app/modules/layout/mock/UnitA";
import { UnitB } from "@app/modules/layout/mock/UnitB";
import { UnitC } from "@app/modules/layout/mock/UnitC";
import { PageNotFound } from "@app/modules/layout/mock/PageNotFound";
import { PageAccessDenied } from "@app/modules/layout/mock/PageAccessDenied";
import { LayoutSidebarContent } from "@app/modules/layout/layout-sidebar-content";
import { LayoutSidebarStructureHeaderContent } from "@app/modules/layout/layout-sidebar-structure-header-content";
import { LayoutSidebarHeaderContent } from "@app/modules/layout/layout-sidebar-header-content";
import { LayoutSidebarHeaderHighestContent } from "@app/modules/layout/layout-sidebar-header-highest-content";
import { useProfiler } from "@utils/useProfiler";
import "./index.scss";
import { LandingA } from "@app/modules/layout/mock/LandingA";
import { LandingB } from "@app/modules/layout/mock/LandingB";
import { LandingC } from "@app/modules/layout/mock/LandingC";

export function App () {

    useProfiler( "App" );

    return (
        <Router>
            <div className="content" >
                <Switch>
                    <Route path="/unit-a" exact >
                        <LayoutSidebarStructureHeaderContent>
                            <UnitA />
                        </LayoutSidebarStructureHeaderContent>
                    </Route>
                    <Route path="/unit-b" exact >
                        <LayoutSidebarStructureHeaderContent>
                            <UnitB />
                        </LayoutSidebarStructureHeaderContent>
                    </Route>
                    <Route path="/unit-c" exact >
                        <LayoutSidebarStructureHeaderContent>
                            <UnitC />
                        </LayoutSidebarStructureHeaderContent>
                    </Route>
                    <Route path="/landing-a" exact >
                        <LayoutSidebarHeaderContent>
                            <LandingA />
                        </LayoutSidebarHeaderContent>
                    </Route>
                    <Route path="/landing-b" exact >
                        <LayoutSidebarHeaderContent>
                            <LandingB />
                        </LayoutSidebarHeaderContent>
                    </Route>
                    <Route path="/landing-heighest-c" exact >
                        <LayoutSidebarHeaderHighestContent>
                            <LandingC />
                        </LayoutSidebarHeaderHighestContent>
                    </Route>
                    <Route path="/403" exact >
                        <LayoutSidebarContent>
                            <PageAccessDenied />
                        </LayoutSidebarContent>
                    </Route>
                    <Route path="*" >
                        <LayoutSidebarContent>
                            <PageNotFound />
                        </LayoutSidebarContent>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
