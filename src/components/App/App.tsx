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
import { LayoutError } from "@app/modules/layout/layout-error/layout-error.component"
import { LayoutUnit } from "@app/modules/layout/layout-unit/layout-unit.component"
import { LayoutLanding } from "@app/modules/layout/layout-landing/layout-landing.component"
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
                        <LayoutUnit>
                            <UnitA />
                        </LayoutUnit>
                    </Route>
                    <Route path="/unit-b" exact >
                        <LayoutUnit>
                            <UnitB />
                        </LayoutUnit>
                    </Route>
                    <Route path="/unit-c" exact >
                        <LayoutUnit>
                            <UnitC />
                        </LayoutUnit>
                    </Route>
                    <Route path="/landing-a" exact >
                        <LayoutLanding>
                            <LandingA />
                        </LayoutLanding>
                    </Route>
                    <Route path="/landing-b" exact >
                        <LayoutLanding>
                            <LandingB />
                        </LayoutLanding>
                    </Route>
                    <Route path="/landing-c" exact >
                        <LayoutLanding>
                            <LandingC />
                        </LayoutLanding>
                    </Route>
                    <Route path="/403" exact >
                        <LayoutError>
                            <PageAccessDenied />
                        </LayoutError>
                    </Route>
                    <Route path="*" >
                        <LayoutError>
                            <PageNotFound />
                        </LayoutError>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
