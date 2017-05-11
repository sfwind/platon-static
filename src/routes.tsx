import * as React from "react";
import { Route } from "react-router";
import Base from "modules/base/Base";
import { Welcome } from "modules/problem/Welcome";
import { ProblemPriority } from "modules/problem/ProblemPriority";
import { PlanMain } from "modules/plan/PlanMain";
import { Intro as WarmUpIntro } from "modules/practice/knowledge/Intro";
import { Main as WarmUp } from "modules/practice/warmup/Main";
import { Analysis as WarmUpAnalysis } from "modules/practice/warmup/Analysis";
import { Result as WarmUpResult } from "modules/practice/warmup/Result";
import { Ready as WarmUpReady } from "modules/practice/warmup/Ready";
import { Main as Application } from "modules/practice/application/Main";
import { Main as Challenge } from "modules/practice/challenge/Main";
import { Main as Subject } from "modules/practice/subject/Main"
import { Submit as ApplicationPracticeSubmit } from "modules/practice/application/Submit";
import { Submit as ChallengePracticeSubmit } from "modules/practice/challenge/Submit";
import { ReplyDiscussMessage } from "modules/message/ReplyDiscussMessage";
import { ReplySubjectMessage  } from "modules/message/ReplySubjectMessage"
import { MessageCenter } from "modules/message/MessageCenter";
import { ReplyKnowledgeDiscussMessage } from "modules/message/ReplyKnowledgeDiscussMessage"
import { AnalysisNew } from "modules/practice/warmup/AnalysisNew";
import { Comment as ApplicationComment } from "modules/practice/application/Comment";
import { Comment as SubjectComment } from "modules/practice/subject/Comment"
import {RiseMemberExplain } from "modules/plan/RiseMemberExplain"
import { Intro as KnowledgeIntro } from "modules/practice/knowledge/Intro"
import { RoadMap } from "modules/practice/knowledge/RoadMap"
import { KnowledgeReview } from "modules/practice/knowledge/KnowledgeReview"
import { HomePage } from "modules/plan/HomePage"


const routes = (
  <Route path="/rise/static" component={Base}>
    <Route path="home" component={HomePage}/>
    <Route path="problem/list" component={Welcome}/>
    <Route path="problem/priority" component={ProblemPriority}/>
    <Route path="plan/main" component={PlanMain}/>
    <Route path="practice/warmup/intro" component={WarmUpIntro}/>
    <Route path="practice/warmup" component={WarmUp}/>
    <Route path="practice/warmup/analysis" component={WarmUpAnalysis}/>
    <Route path="practice/warmup/new/analysis" component={AnalysisNew}/>
    <Route path="practice/warmup/result" component={WarmUpResult}/>
    <Route path="practice/warmup/ready" component={WarmUpReady}/>
    <Route path="practice/application" component={Application}/>
    <Route path="practice/challenge" component={Challenge}/>
    <Route path="practice/application/submit" component={ApplicationPracticeSubmit}/>
    <Route path="practice/challenge/submit" component={ChallengePracticeSubmit}/>
    <Route path="message/warmup/reply" component={ReplyDiscussMessage}/>
    <Route path="message/subject/reply" component={ReplySubjectMessage}/>
    <Route path="message/center" component={MessageCenter}/>
    <Route path="message/knowledge/reply" component={ReplyKnowledgeDiscussMessage} />
    <Route path="practice/application/comment" component={ApplicationComment}/>
    <Route path="practice/subject" component={Subject}/>
    <Route path="practice/subject/comment" component={SubjectComment}/>
    <Route path="member/explain" component={RiseMemberExplain}/>
    <Route path="practice/knowledge" component={KnowledgeIntro}/>
    <Route path="practice/roadmap" component={RoadMap}/>
    <Route path="practice/knowledge/review" component={KnowledgeReview}/>
  </Route>
)

export default routes
