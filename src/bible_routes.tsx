import * as React from "react";
import { config } from "modules/helpers/JsConfig"
import { Route } from "react-router";

import Base from "modules/base/Base";
import BibleMain from './modules/bible/Main'
import BibleReport from './modules/bible/Report'

const routes = (
  <Route>
    <Route path="/rise/static" component={Base} onChange={() => {
      {/*if(window.ENV.osName !== 'ios'){*/}
        // ios不需要每个页面都刷
        config(['chooseWXPay']);
      {/*}*/}
    }}>
      <Route path="note/list" component={BibleMain}/>
      <Route path="note/report" component={BibleReport}/>
      <Route path="guest/note/report" component={BibleReport}/>
    </Route>
  </Route>
)

export default routes
