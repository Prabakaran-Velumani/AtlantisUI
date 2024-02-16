export const urls = {
  /*******************admin******************* */
  adminLogin: '/admin/login',
  /********************dashboard************************* */
  noofCompany: '/dashboard/noofcompany',
  /*********companies***************** */
  createCopmany: '/companies/create',
  getCompany: '/companies/getCompany/',
  editCompany: '/companies/updateCompany/',
  getCompanies: '/companies/getAllCompany',
  removeCompany: '/companies/removeCompany/',
  getCompanyList: '/companies/getCompanyList',
  companystatus: '/companies/updateStatus/',
/*******************country*********************** */
  getCountries: '/country/getAllCountries',
/*********************creator************************** */
  updateCreator: '/creator/updatecreator/',
  addCreator: '/creator/addcreator',
  getAllCreator: '/creator/getCreator',
  getCreator: '/creator/getCreator/',
  deletecreator: '/creator/deletecreator/',
  getSelectCreator: '/creator/selectcreator',
  updatePassword: '/creator/updatepassword/',
  emailchecker: '/creator/emailvalidator',
  createstatus: '/creator/updatestatus/',
  changePassword: '/creator/changepassword/', 
/*****************plan************************* */
  updateplan: '/plan/updateplan/',
  createplan: '/plan/createplan',
  getPlanById: '/plan/getPlanById/',
  deleteplanName: '/plan/deleteplan/',
  // getplan: '/plan/getplan',
  getPlanName: '/plan/getPlanName', 
 /*******************subscription************************* */
  getplan: '/subscription/getSubscriptionPlan',
  deleteplan: '/subscription/deletePlanValidity/',
  createSubscription: '/subscription/createplansubscription',
  updateSubscription: '/subscription/updateplansubscription/',
  getSubscriptionPlanById: '/subscription/getSubscriptionPlanById/',
  getSubscriptionPlanById1: '/subscription/getSubscriptionPlanById1/',
  // getSubscriptionPlan:'/subscription/getSubscriptionPlan',
  getPlanType: '/subscription/getPlanType/',
/*********************learner************************************** */

  addLearner: '/learner/addlearner',
  getLearner: '/learner/getlearner',
  getLearnerById: '/learner/getlearnerById/',
  updateLearner: '/learner/updatelearner/',
  deleteLearner: '/learner/deletelearner/',
  learnerStatus: '/learner/learnerstatus/',

  /*********************cohorts***************************** */
  addcohorts: '/cohorts/addcohorts',
  getcohorts: '/cohorts/getcohorts',
  updatecohorts: '/cohorts/update/',
  checkCohorts: '/cohorts/check/',
  reomvecohorts: '/cohorts/reomve/',
  getAllCohorts: '/cohorts/getAllCohorts',
/*******************mail**************************** */
  learnerMail: '/mail/learnerAdded/',
  /**************gameassign******************** */
  createAssign: '/gameassign/create',
  getselectedgame: '/gameassign/getselectgameassign/',
  createAssign: '/gameassign/create',
  getselectedgame: '/gameassign/getselectgameassign/',
/************************category******************************** */
  createCategory: '/category/create',
  getallcategory: '/category/getAllCategory',
  updateCategory: '/category/updateCategory/',
  removeCategory: '/category/removeCategory/',
  getCategory: '/category/getCategory/',
  getCategoryList: '/category/getCategoryList',

  /*****************animation********************************** */
  getImages: '/animation/getBackground/',
  getPlayer: '/animation/getPlayer',
  getNonPlayer: '/animation/getNonplayer',
  /*******************industry****************************** */
  addIndustry: '/industry/addIndustry',
  updateIndustry: '/industry/updateIndustry/',
  deleteIndustry: '/industry/deleteIndustry/',
  getIndustry: '/industry/getIndustry',
  getIndustryById: '/industry/getIndustryById/',
  getIndustryName: '/industry/getIndustryName',
  industrystatus: '/industry/updateStatus/',
  /*****************planvalidity*************************** */
  
  creatPlanValidity: '/planvalidity/creatPlanValidity',
  getEndDateById: '/planvalidity/getEndDateById/',
  getPlanValidity: '/planvalidity/getPlanValidity',
  getValidityPeriod: '/planvalidity/getValidityPeriod',
  getEndDate: '/planvalidity/getEndDate/',
  updatePlanValidity: '/planvalidity/updatePlanValidity/',
  getPlanTypeInCreator: '/planvalidity/getPlanTypeInCreator/',
  /*************************getLocation************************* */
  geoLocation: '/getLocation/geoLocation',
  /*************************completion********************************** */
  bulkComplete: '/completion/bulkCreate',
  /*****************game******************************* */
  getGameById: '/game/getGameById/',
  creategameAssign:'/gameassign/create',
  updateGame: '/game/updateGame/',
  gameList: '/game/getAllgame/',
  addgame: '/game/addgame',
  countByStage:'/game/countByStage',
  gameduplicate:'/game/gameduplicate/',
  gamelaunch:'/game/gamelaunch/',
  gameassign:'/game/gameassign/',
  gamepublic:'/game/gamepublic/',
  gamedelete:'/game/gameDelete/',
  gameassignlist:'/game/gameassignlist/',
   getSkills:'/skills/getSkills',
  createSkill:'/skills/create/', 
  createCategories:'/skills/addcategory/',
  defaultcat:'/game/defaultcat/',
  defaultskill:'/game/defaultskill/', 
  createReflection:'/question/createreflection',
  getReflection:'/question/getReflection/',
  storyInsterting :'/game/stroy/', 
  getStory:'/game/getstroy/',
  gameBlocks:'/game/getBlocks/',
  listStory:'/game/liststroy/',
  gettemplategames:'/game/gettemplategame/',
  gameviewhistory:"/game/viewhistory/",
  opentemplate:'/game/opentemplate/', 
  sentFeedMails:'/game/feedback',
  deletequest:'/game/deletequest/',
  completionscreen:'/game/completionscreen/',
  getTotalMinofWords:'/game/getTotalMinofWords/',
  Compliupdate:'/game/Compliupdate/',
  /****************************Scorm ********************************/
  generateScorm:'/scorm/generateScorm/',
  createScormConfig:'/scorm/createScormConfig/',
  updateScormConfig:'/scorm/updateScormConfig/',
  getScormConfig:'/scorm/getScormConfig/',
  /****************************upload Badge ********************************/
  uploadBadge:'/game/uploadbadge/',
  uploadAudio:'/game/uploadaudio/',
  getBadge:'/game/getbadge/',
  getpreview:'/game/preview/',
  getAudio:'/game/getaudio/',
  entireQuestion:'/game/duplicate/question/',
  creatorBlocks:'/game/creator/blocks/',
  getStoryValidtion:'/game/getStoryValidtion/',

  languages:'/languages/getlanguages',
   getCreatedLanguages:'/languages/getcreatedlanguages',
   updatelanguages:'/languages/updatelanguages',
      /****************************Reviews ********************************/
      addReviews:'/gamereview/addreviewers',
      getAllReviews:'/gamereview/getblockreviewlist/',
   
     /******** Game Demo with review ******/
     getGameDemoData : '/game/tryout/',
     addGameReview : "/gamereview/addblockreview",
     testAudios: '/game/audioTest',

};

const person = localStorage.getItem('user');
const user = JSON.parse(person);
export const getMethod = {
  method: 'GET',
  mode: 'cors',
  headers: {
    Authorization: user?.token,
    'Content-Type': 'application/json',
  },
};
export const postMethodfile = (data) => {
  let method = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: user?.token,
    },
    body: data,
  };
  return method;
};
export const postMethod = (data) => {
  let method = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: user?.token,
      'Content-Type': 'application/json',
    },
    body: data,
  };
  return method;
};

export const putMethod = (data) => {
  let method = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      Authorization: user?.token,
      'Content-Type': 'application/json',
    },
    body: data,
  };
  return method;
};

export const postMethodVoice = (data) => {
  console.log("data", data)
  let method = {
    method: 'POST',
    // mode: 'cors',
   
    headers: {
      // XI_API_KEY:'28f7b776bb262ab1140ce635a90bd8f9',
      'xi-api-key':'e8b9d84992ae3b4e70a232136717f5ab',
      'Content-Type': 'application/json',
    },
    body: data,
  };
  return method;
};

export const postMethodGameReview = (data) => {
  let method = {
    method: 'POST',
    mode: 'cors',
    headers: {
      // Authorization: user?.token,
      'Content-Type': 'application/json',
    },
    body: data,
  };
  return method;
};
