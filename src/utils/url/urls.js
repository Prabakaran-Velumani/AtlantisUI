export const urls = {
  /*******************admin******************* */
  adminLogin: '/admin/login',
  /********************dashboard************************* */
  noofCompany: '/dashboard/noofcompany',
  noOfGames: '/dashboard/noOfGames',
  noOfLeaners: '/dashboard/noOfLeaners',
  noOfCreators:'/dashboard/noOfCreators',
  addgameassetbackground: '/gameassets/background/add',
  updategameassetbackground: '/gameassets/background/update',
  getgamebackgroundasset: '/gameassets/background/getAll',
  getgameassetimage: '/gameassets/getassets',
  deletegameassetbackground: '/gameassets/background/delete',

  addgameassetwelcome: '/gameassets/welcome/add',
  getgameWelcomeasset: '/gameassets/welcome/getAll',
  updategameassetwelcome: '/gameassets/welcome/update',
  deletegameassetwelcome: '/gameassets/welcome/delete',


  addgameassetthankyou: '/gameassets/thankyou/add',
  getgamethankyouasset: '/gameassets/thankyou/getAll',
  updategameassetthankyou: '/gameassets/thankyou/update',
  deletegameassetthankyou: '/gameassets/thankyou/delete',


  addgameassetbadge: '/gameassets/badge/add',
  getgamebadgeasset: '/gameassets/badge/getAll',
  updategameassetbadge: '/gameassets/badge/update',
  deletegameassetbadge: '/gameassets/badge/delete',

  addgameassetreflection: '/gameassets/reflection/add',
  getgamereflectionasset: '/gameassets/reflection/getAll',
  updategameassetreflection: '/gameassets/reflection/update',
  deletegameassetreflection: '/gameassets/reflection/delete',

  addgameassetcompletion: '/gameassets/completion/add',
  getgamecompletionasset: '/gameassets/completion/getAll',
  updategameassetcompletion: '/gameassets/completion/update',
  deletegameassetcompletion: '/gameassets/completion/delete',

  addgameassetleaderboard: '/gameassets/leaderboard/add',
  getgameleaderboardasset: '/gameassets/leaderboard/getAll',
  updategameassetleaderboard: '/gameassets/leaderboard/update',
  deletegameassetleaderboard: '/gameassets/leaderboard/delete',


  addgameassettakeaway: '/gameassets/takeaway/add',
  getgametakeawayasset: '/gameassets/takeaway/getAll',
  updategameassettakeaway: '/gameassets/takeaway/update',
  deletegameassettakeaway: '/gameassets/takeaway/delete',
  


  addgameassetaudio:'/gameassets/audios/add',
  getaddgameaudio :'/gameassets/audios/getAll',
  deleteaddgameassetaudio :'/gameassets/audios/delete',
  updategameassetaudio:'/gameassets/audios/update',
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
// vb 03.01.2024
  categorystatus: '/category/updateStatus/',
// vb 03.01.2024
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
  storyInsterting :'/game/stroy/',
  getStory:'/game/getstroy/',
  listStory:'/game/liststroy/',
    /****************************upload Badge ********************************/
  uploadBadge:'/game/uploadbadge/',
  uploadAudio:'/game/uploadaudio/',
  getBadge:'/game/getbadge/',
  getAudio:'/game/getaudio/',
  entireQuestion:'/game/duplicate/question/',
  creatorBlocks:'/game/creator/blocks/',
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

export const putFormDataMethod = (data) => {
  let method = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      Authorization: user?.token,
      // 'Content-Type': 'application/json',
    },
    body: data,
  };
  return method;
};
