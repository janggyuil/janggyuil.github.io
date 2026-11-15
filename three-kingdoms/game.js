'use strict';

const COMMANDS_PER_MONTH = 5;
const TRANSFER_TURNS = 2;

const factions = {
  cao: {name:'조조', seal:'曹', color:'#375a76'},
  liu: {name:'유비', seal:'劉', color:'#3e654b'},
  sun: {name:'손견', seal:'孫', color:'#984838'},
  dong:{name:'동탁', seal:'董', color:'#73556f'},
  yuan:{name:'원소', seal:'袁', color:'#8b652f'},
  lu:  {name:'여포', seal:'呂', color:'#74415c'},
  shu: {name:'원술', seal:'術', color:'#85552d'},
  biao:{name:'유표', seal:'表', color:'#45656a'},
  ce:  {name:'손책', seal:'孫', color:'#984838'},
  ma:  {name:'마등', seal:'馬', color:'#62553d'},
  zhang:{name:'유장', seal:'璋', color:'#68683f'},
  quan:{name:'손권', seal:'孫', color:'#984838'},
  zlu: {name:'장로', seal:'張', color:'#6d526c'}
};
const playable = ['cao','liu','sun','dong','yuan'];
const expandedTowns = {
  ji:   {name:'계', x:67, y:11, owner:null, troops:1050, land:4, wall:13},
  shou: {name:'수춘', x:74, y:57, owner:null, troops:1100, land:5, wall:12},
  jiang:{name:'강릉', x:23, y:77, owner:null, troops:950, land:5, wall:11},
  wu:   {name:'오', x:88, y:76, owner:null, troops:1250, land:5, wall:14},
  han:  {name:'한중', x:13, y:62, owner:null, troops:1300, land:4, wall:17},
  cheng:{name:'성도', x:10, y:86, owner:null, troops:1500, land:6, wall:18},
  xia:  {name:'하비', x:90, y:59, owner:null, troops:1100, land:5, wall:12},
  kuai: {name:'회계', x:76, y:90, owner:null, troops:1150, land:5, wall:13},
  jin:  {name:'진양', x:36, y:20, owner:null, troops:1000, land:4, wall:14},
  bei:  {name:'북평', x:82, y:12, owner:null, troops:950, land:3, wall:12},
  beihai:{name:'북해', x:92, y:28, owner:null, troops:900, land:4, wall:10},
  tian: {name:'천수', x:7, y:28, owner:null, troops:950, land:3, wall:13},
  wan:  {name:'완', x:44, y:47, owner:null, troops:1050, land:5, wall:12},
  pei:  {name:'소패', x:71, y:41, owner:null, troops:850, land:4, wall:9},
  ru:   {name:'여남', x:61, y:64, owner:null, troops:950, land:5, wall:10},
  jxia: {name:'강하', x:46, y:71, owner:null, troops:1000, land:4, wall:12},
  jianye:{name:'건업', x:74, y:74, owner:null, troops:1100, land:5, wall:13},
  wuling:{name:'무릉', x:36, y:90, owner:null, troops:850, land:3, wall:10},
  shang:{name:'상용', x:25, y:52, owner:null, troops:800, land:3, wall:14},
  xuchang:{name:'허창', x:50, y:58, owner:null, troops:1200, land:5, wall:15},
  nanpi:{name:'남피', x:65, y:24, owner:null, troops:1000, land:4, wall:12},
  henei:{name:'하내', x:43, y:32, owner:null, troops:1000, land:4, wall:13},
  hongnong:{name:'홍농', x:22, y:38, owner:null, troops:850, land:3, wall:13},
  wuwei:{name:'무위', x:5, y:14, owner:null, troops:900, land:3, wall:12},
  lingling:{name:'영릉', x:45, y:94, owner:null, troops:800, land:3, wall:9},
  guiyang:{name:'계양', x:63, y:94, owner:null, troops:800, land:3, wall:9},
  lujiang:{name:'여강', x:64, y:75, owner:null, troops:950, land:4, wall:11},
  anding:{name:'안정', x:16, y:21, owner:null, troops:850, land:3, wall:12},
  xihe: {name:'서하', x:25, y:11, owner:null, troops:800, land:3, wall:11},
  shangdang:{name:'상당', x:42, y:9, owner:null, troops:900, land:3, wall:14},
  zhongshan:{name:'중산', x:54, y:12, owner:null, troops:950, land:4, wall:12},
  puyang:{name:'복양', x:62, y:34, owner:null, troops:1000, land:4, wall:13},
  hedong:{name:'하동', x:28, y:25, owner:null, troops:900, land:4, wall:13},
  wudu: {name:'무도', x:4, y:52, owner:null, troops:750, land:3, wall:14},
  yiling:{name:'이릉', x:31, y:69, owner:null, troops:850, land:3, wall:14},
  yongan:{name:'영안', x:13, y:74, owner:null, troops:850, land:3, wall:15},
  jianning:{name:'건녕', x:22, y:93, owner:null, troops:800, land:3, wall:10},
  chaisang:{name:'시상', x:55, y:76, owner:null, troops:950, land:4, wall:12},
  yuzhang:{name:'예장', x:68, y:84, owner:null, troops:900, land:4, wall:11},
  gongan:{name:'공안', x:36, y:79, owner:null, troops:850, land:4, wall:11},
  baqiu:{name:'파구', x:46, y:82, owner:null, troops:850, land:4, wall:11},
  qiao: {name:'초', x:64, y:51, owner:null, troops:950, land:4, wall:11},
  guangling:{name:'광릉', x:82, y:66, owner:null, troops:950, land:4, wall:11},
  jianan:{name:'건안', x:90, y:90, owner:null, troops:750, land:3, wall:10}
};
const towns = {
  luo:  {name:'낙양', x:32, y:37, owner:'dong', troops:3000, land:5, wall:20},
  an:   {name:'장안', x:13, y:43, owner:'dong', troops:1600, land:4, wall:16},
  ye:   {name:'업', x:52, y:24, owner:'yuan', troops:2200, land:5, wall:14},
  ping: {name:'평원', x:77, y:27, owner:'liu', troops:1550, land:3, wall:10},
  chen: {name:'진류', x:55, y:46, owner:'cao', troops:2000, land:4, wall:12},
  xu:   {name:'서주', x:88, y:43, owner:'yuan', troops:1400, land:4, wall:11},
  xiang:{name:'양양', x:38, y:60, owner:null, troops:750, land:4, wall:12},
  chang:{name:'장사', x:54, y:85, owner:'sun', troops:2150, land:4, wall:11},
  ...expandedTowns
};
const CITY_COUNT = Object.keys(towns).length;
// 도시별 최대치. 농지가 넓을수록 병력·금·군량을 더 쌓을 수 있습니다.
const MAX_LAND = 10, MAX_WALL = 40;
// 시장(market)이 금 수입과 금 최대치를, 농지(land)가 군량·병력 최대치를 정합니다.
const MAX_MARKET = 10;
const marketOf = c => c.market??c.land;
const cityCaps = c => ({troops:4000+c.land*1000, gold:1000+marketOf(c)*300, food:2000+c.land*800, wall:MAX_WALL, land:MAX_LAND, market:MAX_MARKET});
// 생산·모집으로 늘어나는 양은 최대치에서 멈춥니다. 이동·점령으로 이미 넘친 양은 깎지 않습니다.
// 월 금 수입: 시장 수준과 도시 최고 정치
const goldIncome = (c,politics) => 42+marketOf(c)*14+Math.floor(politics/6);
function gain(c,key,amount) {
  const before=c[key];
  const cap=cityCaps(c)[key];
  if (amount>0) c[key]=Math.max(before,Math.min(cap,before+amount));
  else c[key]=Math.max(0,before+amount);
  return c[key]-before;
}
const roads = [
  ['an','hongnong'],['hongnong','luo'],['an','shang'],['shang','xiang'],['luo','henei'],['henei','ye'],['luo','chen'],['luo','xiang'],
  ['ye','nanpi'],['nanpi','ping'],['ye','chen'],['ping','xu'],['chen','pei'],['pei','xu'],['chen','xiang'],
  ['chen','xuchang'],['xiang','jxia'],['jxia','chang'],
  ['xuchang','wan'],['xuchang','ru'],['nanpi','ji'],['henei','jin'],['henei','chen'],['hongnong','shang'],
  ['wuwei','tian'],['lingling','wuling'],['lingling','chang'],['lingling','guiyang'],['guiyang','chang'],['guiyang','kuai'],
  ['lujiang','ru'],['lujiang','jianye'],
  ['anding','tian'],['anding','hongnong'],['anding','xihe'],['xihe','jin'],['shangdang','jin'],['shangdang','zhongshan'],
  ['zhongshan','ji'],['zhongshan','ye'],['puyang','nanpi'],['puyang','pei'],['puyang','chen'],
  ['hedong','hongnong'],['hedong','luo'],['hedong','jin'],['hedong','anding'],['wudu','an'],['wudu','han'],
  ['yongan','jiang'],['jianning','cheng'],['jianning','wuling'],['yuzhang','lujiang'],['yuzhang','jianye'],
  ['gongan','wuling'],['gongan','jxia'],['gongan','yiling'],['baqiu','lingling'],['qiao','pei'],['qiao','ru'],
  ['guangling','shou'],['guangling','wu'],['jianan','wu'],['jianan','kuai'],['lujiang','chaisang'],['chaisang','jxia'],['chaisang','chang'],
  ['ji','ye'],['ji','ping'],['chen','qiao'],['qiao','shou'],['shou','xu'],['shou','jianye'],['jianye','wu'],
  ['jin','ye'],['jin','luo'],['bei','ji'],['bei','ping'],
  ['beihai','ping'],['beihai','xu'],['tian','an'],
  ['wan','luo'],['wan','xiang'],['wan','chen'],
  ['pei','xia'],['pei','shou'],['ru','chen'],['ru','shou'],['ru','jxia'],
  ['jxia','jiang'],['xia','guangling'],['guangling','jianye'],['wuling','jiang'],['wuling','chang'],
  ['shang','han'],
  ['jiang','yiling'],['yiling','xiang'],['jiang','gongan'],['gongan','baqiu'],['baqiu','chang'],['yuzhang','wu'],
  ['han','an'],['han','xiang'],['han','yongan'],['yongan','cheng'],['cheng','jiang'],
  ['xia','xu'],['xia','shou'],['xia','wu'],['kuai','wu'],['kuai','yuzhang'],['yuzhang','chang']
];
const roster = [
  ['조조',87,92,'chen'],['하후돈',90,62,'chen'],['조인',84,63,'chen'],
  ['유비',78,82,'ping'],['관우',97,67,'ping'],['장비',96,43,'ping'],
  ['손견',92,73,'chang'],['황개',85,61,'chang'],['정봉',79,62,'chang'],
  ['동탁',81,67,'luo'],['여포',100,37,'luo'],['이유',53,89,'luo'],['이각',78,42,'an'],
  ['원소',79,76,'ye'],['안량',91,48,'ye'],['문추',90,44,'xu'],
  ['순욱',57,98,null],['곽가',64,97,null],['조운',96,70,null],['주유',93,94,null]
];
const newOfficers = [
  ['원술',68,62],['유표',62,83],['손책',96,78],['마등',85,68],
  ['유장',55,76],['손권',81,89],['장로',65,79],['장료',96,73],['황충',94,65],
  ['정포',86,68],['장소',52,95],['기령',82,47],['고순',89,57],['진궁',68,93],
  ['문빙',84,62],['마초',97,48],['방덕',91,55],['엄안',84,71],['장임',87,71],
  ['저수',63,91],['전풍',58,93],['장합',91,65],['서황',90,61],['허저',96,39],
  ['제갈량',70,100],['노숙',73,94],['여몽',89,83],['감녕',94,55],['육손',91,96],
  ['하후연',91,63],['법정',67,95],['위연',89,58],['사마의',80,98],['염포',60,83]
];
// Existing officer IDs remain stable across saved games.
const officerCatalog=[...roster,...newOfficers];
// 통솔·지력·매력은 기존 명단 순서와 장수 ID를 바꾸지 않도록 이름으로 따로 둡니다. [통솔, 지력, 매력]
const officerStats = {
  조조:[96,91,90],하후돈:[89,58,72],조인:[88,62,70],유비:[80,75,99],관우:[95,76,92],장비:[86,32,45],
  손견:[91,72,88],황개:[82,68,70],정봉:[78,60,60],동탁:[85,60,40],여포:[88,27,35],이유:[45,92,40],이각:[72,30,30],
  원소:[86,70,88],안량:[82,38,50],문추:[80,30,48],순욱:[50,95,88],곽가:[58,98,75],조운:[91,76,85],주유:[97,96,90],
  원술:[70,62,60],유표:[68,72,80],손책:[93,70,92],마등:[84,48,80],유장:[50,52,60],손권:[88,80,92],장로:[62,70,75],
  장료:[93,78,80],황충:[85,60,75],정포:[84,72,78],장소:[35,88,76],기령:[76,42,45],고순:[85,52,55],진궁:[72,94,65],
  문빙:[83,68,68],마초:[89,38,80],방덕:[82,62,65],엄안:[80,68,68],장임:[86,80,70],저수:[72,94,70],전풍:[60,95,55],
  장합:[90,72,70],서황:[88,68,72],허저:[66,30,60],제갈량:[92,100,95],노숙:[80,92,88],여몽:[90,86,80],감녕:[86,62,60],
  육손:[95,95,88],하후연:[87,52,70],법정:[74,96,55],위연:[84,62,55],사마의:[96,98,80],염포:[45,88,70]
};
const statsOf = name => {
  const [lead,intel,charm]=officerStats[name]??[60,60,60];
  return {lead,intel,charm};
};

// 추가 장수: [이름, 통솔, 무력, 지력, 정치, 매력, 등장 연도, 퇴장 연도, 출신 도시, 연도별 소속]
// 소속은 '연도:세력'을 쉼표로 잇고, '-'는 재야, 'wu'는 그 시나리오의 손씨 세력(손견·손책·손권)입니다.
// 목록 끝에만 덧붙이세요. 장수 ID가 배열 순서에서 나오므로 중간에 넣거나 빼면 기존 저장이 깨집니다.
const extraOfficers = [
  ['조홍',78,80,52,48,66,190,232,'chen','190:cao'],['조순',82,78,60,58,70,190,210,'chen','190:cao'],
  ['조휴',80,76,62,60,70,200,228,'xuchang','200:cao'],['조진',86,82,70,62,74,208,231,'xuchang','208:cao'],
  ['조창',80,90,40,35,62,208,223,'ye','208:cao'],['조비',74,72,80,82,78,200,226,'ye','200:cao'],
  ['악진',80,86,48,42,58,190,218,'chen','190:cao'],['이전',78,78,70,62,70,190,209,'chen','190:cao'],
  ['우금',86,80,66,56,62,190,221,'chen','190:cao'],['전위',60,95,30,22,58,194,197,'chen','194:cao'],
  ['정욱',70,48,90,82,58,192,220,'chen','194:cao'],['순유',65,40,94,85,70,196,214,'xuchang','196:cao'],
  ['가후',70,45,97,82,58,190,223,'an','190:dong,194:-,200:cao'],['유엽',50,40,90,82,60,200,234,'shou','200:cao'],
  ['만총',78,62,80,80,70,194,242,'chen','194:cao'],['진군',40,30,82,92,72,194,236,'xu','194:liu,200:cao'],
  ['종요',55,35,82,90,76,200,230,'an','200:cao'],['화흠',35,25,80,86,68,200,231,'wu','200:cao'],
  ['왕랑',42,30,80,84,66,194,228,'kuai','194:-,200:cao'],['장패',76,82,52,46,64,194,228,'xu','194:lu,200:cao'],
  ['서서',70,68,90,80,82,200,234,'xiang','200:-,208:cao'],['장수',76,82,62,52,64,194,207,'wan','194:-,200:cao'],
  ['허유',40,30,85,60,48,190,204,'ye','190:yuan'],['곽회',84,76,80,72,72,208,255,'an','208:cao'],
  ['최염',40,30,72,84,86,200,216,'ye','200:yuan,208:cao'],['하후상',72,66,68,62,66,219,225,'xuchang','219:cao'],
  ['이통',74,80,52,46,70,200,209,'ru','200:cao'],['한호',70,66,62,70,64,200,220,'henei','200:cao'],
  ['하후패',82,84,60,42,62,219,259,'an','219:cao'],['동소',40,30,82,84,66,200,236,'xuchang','200:cao'],
  ['모개',45,40,78,85,72,194,216,'chen','194:cao'],
  ['미축',40,32,62,80,86,194,221,'xu','194:liu'],['손건',40,32,74,78,86,194,214,'xu','194:liu'],
  ['간옹',35,30,72,70,82,190,214,'ping','190:liu'],['미방',55,58,40,42,40,194,222,'xu','194:liu'],
  ['관평',72,80,58,52,72,208,219,'jiang','208:liu'],['주창',62,82,30,25,60,200,219,'ru','200:liu'],
  ['요화',70,74,58,52,62,208,264,'xiang','208:liu'],['마량',55,30,86,82,84,208,222,'xiang','208:-,219:liu'],
  ['마속',62,60,84,68,62,208,228,'xiang','208:-,219:liu'],['이엄',82,80,78,80,62,200,234,'xiang','200:biao,208:zhang,219:liu'],
  ['황권',76,66,82,78,74,200,240,'cheng','200:zhang,219:liu'],['오의',74,72,62,62,66,200,237,'cheng','200:zhang,219:liu'],
  ['비의',45,30,82,86,82,219,253,'cheng','219:liu'],['동윤',42,25,74,88,76,219,246,'cheng','219:liu'],
  ['장완',58,40,84,88,80,219,246,'jiang','219:liu'],['마대',74,80,52,46,62,200,235,'tian','200:ma,219:liu'],
  ['진도',72,74,54,50,62,200,237,'xu','200:liu'],['왕평',80,74,72,50,60,219,248,'han','219:liu'],
  ['유봉',70,78,46,40,52,208,220,'xiang','208:liu'],['방통',74,50,97,84,70,208,214,'jxia','208:-'],
  ['장익',72,72,56,50,58,208,264,'cheng','208:zhang,219:liu'],['맹달',72,74,70,58,50,200,228,'cheng','200:zhang,219:liu'],
  ['오반',70,74,48,40,56,219,240,'cheng','219:liu'],['이적',30,25,78,80,74,194,220,'xiang','194:biao,208:liu'],
  ['사마휘',30,20,92,80,88,190,208,'xiang','190:-'],
  ['한당',76,78,52,48,60,190,227,'chang','190:wu,194:shu,200:wu'],['주태',78,88,46,38,62,194,225,'shou','194:shu,200:wu'],
  ['장흠',76,80,52,48,62,194,219,'shou','194:shu,200:wu'],['진무',70,80,40,36,60,194,215,'shou','194:shu,200:wu'],
  ['태사자',84,93,62,50,76,194,206,'beihai','194:-,200:wu'],['능통',72,86,48,40,66,208,237,'wu','208:wu'],
  ['반장',74,80,48,42,46,208,234,'wu','208:wu'],['서성',82,80,74,58,70,208,225,'jianye','208:wu'],
  ['주환',84,82,72,60,62,208,238,'wu','208:wu'],['제갈근',56,40,82,86,86,200,241,'wu','200:wu'],
  ['장굉',30,20,84,86,72,194,212,'jianye','194:shu,200:wu'],['고옹',40,30,80,90,80,200,243,'wu','200:wu'],
  ['우번',45,40,86,74,40,200,233,'kuai','200:wu'],['보즐',60,45,82,84,72,208,247,'jianye','208:wu'],
  ['감택',40,30,85,80,66,208,243,'kuai','208:wu'],['주연',76,74,70,58,62,219,249,'wu','219:wu'],
  ['전종',74,72,66,62,70,219,249,'wu','219:wu'],['여범',50,40,78,82,66,194,228,'shou','194:shu,200:wu'],
  ['손익',62,78,32,30,40,200,204,'wu','200:wu'],['손소',72,72,60,52,62,219,241,'jianye','219:wu'],
  ['동습',66,80,40,32,58,200,216,'kuai','200:wu'],['손유',60,58,60,62,72,208,215,'wu','208:wu'],
  ['원담',70,70,52,50,58,194,205,'ping','194:yuan'],['원상',72,72,56,52,76,194,207,'ye','194:yuan'],
  ['원희',64,62,58,58,64,194,207,'ji','194:yuan'],['고람',76,80,52,40,54,190,206,'ye','190:yuan,208:cao'],
  ['국의',84,86,60,32,52,190,199,'ye','190:yuan'],['심배',78,64,82,70,68,190,204,'ye','190:yuan'],
  ['봉기',52,40,84,68,48,190,202,'ye','190:yuan'],['곽도',48,40,80,64,48,190,205,'ye','190:yuan'],
  ['순심',40,30,78,70,58,190,204,'ye','190:yuan'],['신비',45,30,80,74,60,194,235,'ye','194:yuan,208:cao'],
  ['고간',74,74,58,52,62,200,206,'jin','200:yuan'],['순우경',66,72,40,32,40,190,200,'ye','190:yuan'],
  ['장연',72,74,52,40,66,190,220,'jin','190:-,208:cao'],
  ['서영',76,78,62,40,48,190,192,'luo','190:dong'],['화웅',72,88,34,26,46,190,191,'luo','190:dong'],
  ['곽사',66,74,30,24,30,190,197,'an','190:dong,194:-'],['장제',70,74,46,40,52,190,196,'an','190:dong,194:-'],
  ['우보',60,68,30,22,30,190,192,'an','190:dong'],['이숙',50,50,64,52,40,190,192,'luo','190:dong'],
  ['번조',60,72,32,26,36,190,195,'an','190:dong'],
  ['위속',60,70,40,32,40,194,198,'xia','194:lu'],['송헌',62,72,36,30,42,194,198,'xia','194:lu'],
  ['후성',60,70,40,34,44,194,198,'xia','194:lu'],['학맹',58,68,38,30,30,194,196,'xia','194:lu'],
  ['진등',72,62,82,80,74,194,209,'xia','194:liu,200:cao'],['진규',40,30,80,82,70,194,200,'xia','194:liu'],
  ['장훈',70,66,62,52,50,194,199,'shou','194:shu'],['교유',58,64,40,36,40,194,197,'shou','194:shu'],
  ['양홍',42,30,76,62,46,194,199,'shou','194:shu'],['염상',40,30,74,74,60,194,199,'shou','194:shu'],
  ['뇌박',56,64,36,30,30,194,199,'lujiang','194:shu'],['진란',58,64,36,30,34,194,199,'lujiang','194:shu'],
  ['채모',80,70,70,58,52,190,208,'xiang','190:-,194:biao,208:cao'],['괴월',50,40,88,82,62,190,214,'xiang','190:-,194:biao,208:cao'],
  ['괴량',42,30,86,84,66,190,207,'xiang','190:-,194:biao'],['장윤',66,62,50,44,42,194,208,'xiang','194:biao,208:cao'],
  ['황조',70,68,46,40,44,190,207,'jxia','190:-,194:biao'],['유기',50,40,62,60,74,194,209,'jxia','194:biao,208:liu'],
  ['유종',36,30,50,52,58,200,208,'xiang','200:biao,208:cao'],['왕찬',30,25,82,74,70,194,217,'xiang','194:biao,208:cao'],
  ['한숭',40,30,70,72,66,194,215,'xiang','194:biao,208:cao'],
  ['한수',80,76,70,62,62,190,215,'wuwei','190:-,200:ma,208:-'],['마휴',66,72,42,38,56,200,212,'tian','200:ma,208:-'],
  ['마철',62,70,40,36,54,200,212,'tian','200:ma,208:-'],['양부',64,52,78,72,68,208,240,'tian','208:-,219:cao'],
  ['염행',66,80,40,30,40,200,225,'wuwei','200:ma,208:-,219:cao'],
  ['장송',30,25,84,84,40,200,212,'cheng','200:zhang'],['유파',30,25,82,86,62,208,222,'cheng','208:zhang,219:liu'],
  ['냉포',70,76,46,38,40,208,213,'cheng','208:zhang'],['등현',66,70,44,40,42,208,214,'cheng','208:zhang'],
  ['오란',62,72,40,34,46,208,220,'cheng','208:zhang,219:liu'],['뇌동',64,74,40,32,44,208,217,'cheng','208:zhang,219:liu'],
  ['고패',60,66,40,36,40,208,212,'cheng','208:zhang'],['양회',60,66,42,36,40,208,212,'cheng','208:zhang'],
  ['비관',56,52,62,66,56,208,230,'cheng','208:zhang,219:liu'],
  ['장위',68,70,44,38,44,208,215,'han','208:zlu'],['양앙',62,70,40,34,40,208,215,'han','208:zlu'],
  ['양임',70,72,50,40,46,208,215,'han','208:zlu'],['양송',20,20,60,50,30,208,215,'han','208:zlu'],
  ['공융',40,30,78,80,86,190,208,'beihai','190:-,200:cao'],['공손찬',84,82,58,52,72,190,199,'bei','190:-'],
  ['유요',50,40,60,64,62,194,197,'wu','194:-'],['도겸',50,40,60,66,66,190,193,'xu','190:-'],
  ['장막',60,52,60,62,70,190,195,'chen','190:-,194:lu'],['왕윤',40,30,82,84,72,190,192,'an','190:dong'],
  ['엄백호',56,62,32,30,38,194,197,'kuai','194:-'],['노식',80,60,80,72,84,190,192,'ji','190:-'],
  ['황보숭',86,72,74,66,72,190,195,'an','190:-'],['주준',76,70,66,60,68,190,195,'luo','190:-']
];
for (const [name,lead,war,intel,politics,charm] of extraOfficers) officerStats[name]=[lead,intel,charm];
const extraByName=new Map(extraOfficers.map(row=>[row[0],{debut:row[6],until:row[7],home:row[8],
  timeline:row[9].split(',').map(part=>{const [year,faction]=part.split(':');return [Number(year),faction==='-'?null:faction];})}]));
officerCatalog.push(...extraOfficers.map(([name,lead,war,intel,politics])=>[name,war,politics]));
const DEFAULT_SCENARIO='warlords';

function defineScenario(year,month,title,note,holdings,free=[]) {
  const seats={};
  const owners={};
  const positions=new Map(free.map(name=>[name,null]));
  for (const [ruler,cities] of Object.entries(holdings)) {
    seats[ruler]=Object.keys(cities)[0];
    for (const [city,generals] of Object.entries(cities)) {
      owners[city]=ruler;
      for (const name of generals) positions.set(name,city);
    }
  }
  // 추가 장수: 시작 연도에 활동 중이면 그때 소속 세력의 도시(장수가 적은 곳부터)나 출신 도시 재야로 둡니다.
  const freeHome=new Map();
  const crowd=new Map([...positions.values()].filter(Boolean).map(city=>[city,0]));
  for (const city of positions.values()) if (city) crowd.set(city,crowd.get(city)+1);
  for (const [name,info] of extraByName) {
    if (positions.has(name) || year<info.debut || year>info.until) continue;
    let faction=info.timeline.filter(([from])=>from<=year).at(-1)?.[1]??null;
    if (faction==='wu') faction=['sun','ce','quan'].find(id=>holdings[id])??null;
    const cities=faction && holdings[faction]?Object.keys(holdings[faction]):null;
    if (cities?.length) {
      const city=cities.reduce((best,id)=>(crowd.get(id)??0)<(crowd.get(best)??0)?id:best);
      positions.set(name,city);
      crowd.set(city,(crowd.get(city)??0)+1);
    } else {
      positions.set(name,null);
      freeHome.set(name,info.home);
    }
  }
  const officers=officerCatalog.flatMap(([name,war,politics],id)=>positions.has(name)?
    [{id,name,...statsOf(name),war,politics,city:positions.get(name),...(freeHome.has(name)?{freeCity:freeHome.get(name)}:{})}]:[]);
  return {title,note,start:(year-190)*12+month-1,rulers:Object.keys(seats),seats,owners,officers};
}

const originalHoldings=Object.fromEntries(playable.map(ruler=>[ruler,Object.fromEntries(
  Object.entries(towns).filter(([,town])=>town.owner===ruler)
    .map(([city])=>[city,roster.filter(row=>row[3]===city).map(([name])=>name)])
)]));
const scenarios = {
  warlords:defineScenario(190,1,'군웅할거','반동탁 연합',originalHoldings,
    roster.filter(row=>row[3]===null).map(([name])=>name)),
  yan:defineScenario(194,7,'연주 쟁탈전','조조와 여포가 맞붙는 연주', {
    cao:{chen:['조조','하후돈','순욱','곽가']},
    lu:{luo:['여포','진궁','고순','장료'],puyang:[]},
    liu:{xu:['유비','관우','장비'],guangling:[]},
    yuan:{ye:['원소','전풍','저수','안량'],ping:['문추'],ji:['장합'],jin:[],nanpi:[],zhongshan:[],shangdang:[]},
    shu:{shou:['원술','기령','손책','황개'],ru:[],lujiang:[]},
    biao:{xiang:['유표','황충'],jiang:['문빙'],jxia:[],wuling:[],lingling:[],guiyang:[],yiling:[],gongan:[],baqiu:[]}
  },['조운','주유']),
  guandu:defineScenario(200,1,'관도대전','조조와 원소가 북방의 패권을 두고 대치', {
    cao:{chen:['조조','순욱','곽가','허저'],luo:['하후돈','서황'],xia:['조인','장료'],wan:[],pei:[],ru:[],xuchang:[],henei:[],hongnong:[],
      puyang:[],qiao:[],hedong:[],guangling:[]},
    yuan:{ye:['원소','저수','안량'],ping:['문추'],ji:['전풍','장합'],jin:[],bei:[],beihai:[],nanpi:[],zhongshan:[],shangdang:[]},
    liu:{xu:['유비','관우','장비']},
    ce:{wu:['손책','주유','장소'],kuai:['정포','황개'],jianye:[],lujiang:[],yuzhang:[],chaisang:[],jianan:[]},
    biao:{xiang:['유표','황충'],jiang:['문빙'],chang:['감녕'],jxia:[],wuling:[],lingling:[],guiyang:[],yiling:[],gongan:[],baqiu:[]},
    ma:{an:['마등','마초','방덕'],tian:[],wuwei:[],anding:[]},
    zhang:{cheng:['유장','장임','엄안'],yongan:[],jianning:[]}
  },['조운','제갈량','노숙']),
  redcliffs:defineScenario(208,10,'적벽대전','조조가 남하하고 유비와 손권이 장강에 집결', {
    cao:{ye:['조조','순욱','허저'],luo:['하후돈'],an:['하후연'],ping:['서황'],ji:['장합'],
      chen:['사마의'],xu:['장료'],xia:['조인'],xiang:['문빙'],
      jin:[],bei:[],beihai:[],tian:[],wan:[],pei:[],ru:[],shang:[],xuchang:[],nanpi:[],henei:[],hongnong:[],wuwei:[],lujiang:[],
      zhongshan:[],shangdang:[],puyang:[],qiao:[],hedong:[],guangling:[],anding:[],xihe:[],baqiu:[]},
    liu:{jiang:['유비','제갈량','관우','장비','조운'],jxia:[],gongan:[]},
    quan:{wu:['손권','장소','육손'],shou:['여몽','감녕'],kuai:['주유','노숙','정포','황개'],jianye:[],yuzhang:[],chaisang:[],jianan:[]},
    zhang:{cheng:['유장','장임','엄안','법정'],yongan:[],jianning:[]},
    zlu:{han:['장로','염포'],wudu:[]}
  },['위연']),
  hanzhong:defineScenario(219,1,'한중 쟁탈전','유비와 조조가 한중에서 맞붙고 손권이 강동을 지킴', {
    cao:{ye:['조조','허저'],luo:['하후돈','사마의'],an:['서황'],ping:['장합'],
      ji:['장료'],chen:['조인'],xu:['문빙'],xia:['방덕'],han:['하후연'],
      jin:[],bei:[],beihai:[],tian:[],wan:[],pei:[],ru:[],xuchang:[],nanpi:[],henei:[],hongnong:[],wuwei:[],
      zhongshan:[],shangdang:[],puyang:[],qiao:[],hedong:[],guangling:[],anding:[],xihe:[],wudu:[]},
    liu:{cheng:['유비','제갈량','법정','마초'],jiang:['관우','조운'],xiang:['장비','황충'],chang:['위연'],shang:[],wuling:[],lingling:[],
      yongan:[],jianning:[],yiling:[],gongan:[]},
    quan:{wu:['손권','장소','육손'],shou:['여몽','감녕'],kuai:['정포','황개'],jxia:[],jianye:[],guiyang:[],lujiang:[],
      yuzhang:[],chaisang:[],jianan:[],baqiu:[]}
  })
};
const scenarioFor=s=>scenarios[s.scenario];
const seatOf=(s,ruler)=>scenarioFor(s).seats[ruler];
const freeHomes={'순욱':'chen','곽가':'chen','조운':'ping','주유':'wu','제갈량':'xiang','노숙':'shou','위연':'chang'};
const freeCityOf=(s,officer)=>officer.freeCity??scenarioFor(s).officers.find(o=>o.id===officer.id)?.city??freeHomes[officer.name];

const seasons = [
  {name:'겨울', events:[
    {name:'폭설', changes:{food:-240,troops:-90}},
    {name:'온화한 겨울', changes:{food:140}}
  ]},
  {name:'봄', events:[
    {name:'봄비', changes:{food:220}},
    {name:'늦서리', changes:{food:-190}}
  ]},
  {name:'여름', events:[
    {name:'홍수', changes:{food:-300,wall:-4}},
    {name:'가뭄', changes:{food:-260}},
    {name:'고른 강수', changes:{food:170}}
  ]},
  {name:'가을', events:[
    {name:'풍년', changes:{food:440,gold:80}},
    {name:'메뚜기 떼', changes:{food:-320}}
  ]}
];
const seasonFor = month => seasons[Math.floor(((month+1)%12)/3)];
const resourceNames = {food:'군량',gold:'금',troops:'병력',wall:'성벽'};
const EVENT_CHANCE = .45;
const owned = (s, faction=s.player) => Object.keys(towns).filter(id=>s.cities[id].owner===faction);
const neighbors = id => roads.filter(pair=>pair.includes(id)).map(pair=>pair.find(other=>other!==id));
function friendlyRoutes(s,from) {
  const faction=s.cities[from]?.owner;
  const routes=new Map();
  if (!faction) return routes;
  const visited=new Set([from]);
  const queue=[[from]];
  for (const path of queue) {
    for (const id of neighbors(path.at(-1))) {
      if (visited.has(id) || s.cities[id].owner!==faction) continue;
      visited.add(id);
      const route=[...path,id];
      routes.set(id,route);
      queue.push(route);
    }
  }
  return routes;
}
const officersAt = (s,id) => s.officers.filter(o=>o.city===id);
const isFree = o => o.city===null && !o.captive && !o.executed && !o.inTransit;
const captives = s => s.officers.filter(o=>o.captive);
const factionOfficers = (s,id) => s.officers.filter(o=>id===null ? isFree(o) : (o.inTransit || s.cities[o.city]?.owner)===id);
const stronghold = (s,id,except) => owned(s,id).filter(city=>city!==except)
  .sort((a,b)=>s.cities[b].troops-s.cities[a].troops)[0];
const initialCity = ({owner,troops,land,market=land,wall}) => ({owner,troops,land,market,wall,gold:420,food:950});
const date = month => `${190+Math.floor(month/12)}년 ${month%12+1}월`;
const fmt = n => n.toLocaleString('ko-KR');
const factionName = id => factions[id]?.name ?? '중립';
const color = id => factions[id]?.color ?? '#6f6552';
const clamp = (n,min,max) => Math.max(min,Math.min(max,n));
const foodCost = n => Math.ceil(n/10);
const defeatMessage = id => `${factionName(id)} 세력이 멸망했습니다.`;
const record = (s,message,eliminated) => {
  const entry={month:s.month,message};
  if (eliminated) entry.eliminated=eliminated;
  s.log.unshift(entry);
  s.log.length = Math.min(s.log.length,36);
};

const teamNames = generals => generals.map(o=>o.name).join('·');
const transferOfficers = (s,t) => [t.officerId,t.deputyId].filter(id=>id!==undefined)
  .map(id=>s.officers.find(o=>o.id===id)).filter(Boolean);
function teamSummary(team) {
  const who=team.officers.length?teamNames(team.officers):'장수 없음';
  const bonus=team.bonuses.map(b=>b.name).join('·');
  return `${who}(통솔 ${team.lead}·무력 ${team.war}·지력 ${team.intel}${bonus?` · ${bonus}`:''})`;
}

// ── 황제 옹위 ─────────────────────────────────────────
// 195년까지는 낙양, 196년부터는 허창을 차지한 세력이 황제를 옹위합니다.
const EMPEROR_MOVE = (196-190)*12;
const EMPEROR_GOLD = 100, EMPEROR_RECRUIT = 10;
const emperorSeat = s => s.month<EMPEROR_MOVE?'luo':'xuchang';
const emperorHolder = s => s.cities[emperorSeat(s)]?.owner??null;
// 등용·회유 성공률 보너스(%): 황제를 옹위한 세력만 받습니다.
const emperorBonus = (s,faction) => faction && emperorHolder(s)===faction ? EMPEROR_RECRUIT : 0;
function updateEmperor(s,quiet=false) {
  const seat=emperorSeat(s), holder=emperorHolder(s);
  if (!quiet && s.emperorSeat && s.emperorSeat!==seat) record(s,`[황제] 황제가 ${towns[s.emperorSeat].name}에서 ${towns[seat].name}(으)로 거처를 옮겼습니다.`);
  if (!quiet && (s.emperor??null)!==holder) {
    if (holder) record(s,`[황제] ${factionName(holder)} 세력이 ${towns[seat].name}에서 황제를 옹위했습니다.`);
    else if (s.emperor) record(s,`[황제] ${factionName(s.emperor)} 세력이 황제를 잃었습니다. ${towns[seat].name}은(는) 주인이 없습니다.`);
  }
  s.emperor=holder;
  s.emperorSeat=seat;
}

function newGame(player,scenarioId=DEFAULT_SCENARIO) {
  const scenario=scenarios[scenarioId];
  const s = {
    player, scenario:scenarioId, month:scenario.start, ap:COMMANDS_PER_MONTH,
    commandLimit:COMMANDS_PER_MONTH, end:null, seasonEvent:null, transfers:[],
    cities:Object.fromEntries(Object.entries(towns).map(([id,t])=>[id,
      initialCity({...t,owner:scenario.owners[id]??null})])),
    officers:scenario.officers.map(o=>({...o})), log:[]
  };
  if (player) record(s,`${factionName(player)} 세력이 ${towns[seatOf(s,player)].name}에서 시작했습니다.`);
  else record(s,scenario.note);
  updateEmperor(s,true);
  if (player && s.emperor) record(s,`[황제] ${factionName(s.emperor)} 세력이 ${towns[s.emperorSeat].name}에서 황제를 옹위하고 있습니다.`);
  return s;
}

// 시나리오에 장수가 늘어난 뒤 옛 저장을 불러오면 빠진 장수를 재야로 붙입니다.
// 저장에 시나리오에 없는 장수 ID가 있으면 손상된 저장으로 보고 false를 돌려줍니다.
function migrateOfficers(raw,scenario) {
  if (!Array.isArray(raw.officers)) return false;
  const known=new Map(scenario.officers.map(o=>[o.id,o]));
  if (!raw.officers.every(o=>known.has(o.id))) return false;
  const have=new Set(raw.officers.map(o=>o.id));
  for (const o of scenario.officers) {
    if (have.has(o.id)) continue;
    const {city,freeCity,...rest}=o;
    raw.officers.push({...rest,city:null,freeCity:city??freeCity??extraByName.get(o.name)?.home??null});
  }
  raw.officers.sort((a,b)=>a.id-b.id);
  return true;
}

function checkEnd(s) {
  const count = owned(s).length;
  s.end = count===0 ? 'lost' : count===CITY_COUNT ? 'won' : null;
}

function persuasionTargets(s,id) {
  const nearby=new Set(neighbors(id));
  return s.officers.filter(officer=>{
    const owner=s.cities[officer.city]?.owner;
    return nearby.has(officer.city) && owner && owner!==s.player && officer.name!==factions[owner].name;
  });
}

const persuasionChance = (strategist,target,bonus=0) =>
  clamp(Math.round(45+(strategist.intel-target.intel)*.9)+bonus,10,95);

// 병력 모집량: 통솔이 지휘, 매력이 사람을 모읍니다.
const levyAmount = o => 420+o.lead*3+o.charm*2;
// 내정별로 담당 장수를 고르는 점수
const domesticSkill = (key,o) => key==='levy'?o.lead*3+o.charm*2:key==='persuade'?o.intel:key==='hire'?o.charm:o.politics;
const domestic = {
  levy:{label:'병력 모집',cost:120,run(s,c,o) {
    const amount=gain(c,'troops',levyAmount(o));
    return `병력 ${fmt(amount)}명을 모집했습니다.${c.troops>=cityCaps(c).troops?' 병력이 최대치에 도달했습니다.':''}`;
  }},
  market:{label:'시장 개발',cost:100,run(s,c,o) {
    c.market=marketOf(c)+1;
    const amount=gain(c,'gold',Math.floor(o.politics/2));
    return `시장 수준이 ${c.market}로 올라 매달 금 수입이 늘었습니다.${amount?` 상인들이 금 ${fmt(amount)}을 바쳤습니다.`:''}`;
  }},
  develop:{label:'농지 개발',cost:100,run(s,c,o) {
    c.land++;
    const amount=gain(c,'food',90+o.politics*3);
    return `농지 수준이 ${c.land}로 오르고 군량 ${fmt(amount)}을 확보했습니다.`;
  }},
  fortify:{label:'성벽 보수',cost:90,run(s,c,o) {
    gain(c,'wall',7+Math.floor(o.politics/25));
    return `성벽이 ${c.wall}로 강화되었습니다.`;
  }},
  hire:{label:'장수 등용',cost:30,targets:s=>s.officers.filter(isFree),empty:'등용 가능한 장수가 없습니다.',
    chance:(officer,target,bonus=0)=>clamp(Math.round(75+(officer.charm-target.charm)*.5)+bonus,35,99),
    run(s,c,o,target,random) {
    if (random()*100>=this.chance(o,target,emperorBonus(s,c.owner))) return `${target.name} 등용에 실패했습니다.`;
    target.city=o.city;
    delete target.freeCity;
    return `${target.name}이(가) 합류했습니다.`;
  }},
  persuade:{label:'적장 회유',cost:160,targets:persuasionTargets,empty:'인접 적 도시에 회유할 장수가 없습니다.',chance:persuasionChance,run(s,c,o,target,random) {
    const origin=towns[target.city].name;
    if (random()*100>=this.chance(o,target,emperorBonus(s,c.owner))) return `[${origin} · ${target.name}] 회유에 실패했습니다.`;
    target.city=o.city;
    return `[${origin} · ${target.name}] 회유에 성공했습니다. ${towns[o.city].name}에 합류했습니다.`;
  }}
};

function unavailable(s,id,key,ignoreCommands=false) {
  const city=s.cities[id];
  if (!ignoreCommands && (!s.ap || s.end)) return '이번 달 명령을 마쳤습니다.';
  if (city.gold<domestic[key].cost) return '금이 부족합니다.';
  if (!officersAt(s,id).length) return '이 도시에 장수가 필요합니다.';
  const caps=cityCaps(city);
  if (key==='fortify' && city.wall>=caps.wall) return '성벽이 최고 수준입니다.';
  if (key==='levy' && city.troops>=caps.troops) return '병력이 최대치입니다.';
  if (key==='develop' && city.land>=caps.land) return '농지가 최고 수준입니다.';
  if (key==='market' && marketOf(city)>=caps.market) return '시장이 최고 수준입니다.';
  const action=domestic[key];
  if (action.targets && !action.targets(s,id).length) return action.empty;
  return '';
}

// ── 위임 ──────────────────────────────────────────────
// 군주가 없는 아군 도시를 성주에게 맡기면 매달(세력 명령과 별도로) 명령 1회를 알아서 씁니다.
// 성주의 가장 높은 능력치가 성향을 정합니다.
const DELEGATE_STYLES = {
  무장:{attackRatio:1.25,prefer:['levy','fortify','market','develop'],note:'승산이 보이면 출진하고 병력과 성벽을 챙깁니다.'},
  지략:{attackRatio:1.5,prefer:['fortify','develop','market','levy'],note:'확실히 이길 때만 출진하고 수비와 농지를 챙깁니다.'},
  내정:{attackRatio:1.9,prefer:['market','develop','fortify','levy'],note:'출진을 삼가고 시장과 농지를 키웁니다.'},
  인망:{attackRatio:1.6,prefer:['hire','levy','market','develop'],note:'재야 인재를 모으고 병력을 늘립니다.'}
};
function delegateStyle(o) {
  const traits=[['무장',Math.max(o.war,o.lead)],['지략',o.intel],['내정',o.politics],['인망',o.charm]];
  return traits.reduce((best,t)=>t[1]>best[1]?t:best)[0];
}
const governorOf = (s,id) => s.officers.find(o=>o.id===s.cities[id]?.governor && o.city===id);
function delegationUnavailable(s,id) {
  const city=s.cities[id];
  if (!s.player || city?.owner!==s.player) return '아군 도시가 아닙니다.';
  if (rulerOf(s,s.player)?.city===id) return '군주가 있는 도시는 직접 다스립니다.';
  if (!officersAt(s,id).length) return '성주로 맡길 장수가 없습니다.';
  return '';
}
// 성주를 지정해 위임합니다. officerId가 null이면 위임을 해제합니다. 명령은 쓰지 않습니다.
function setDelegation(s,id,officerId) {
  const city=s.cities[id];
  if (officerId===null || officerId===undefined) {
    if (!city?.delegated) return false;
    if (city.corps!==undefined) leaveCorps(s,id);
    delete city.delegated;
    delete city.governor;
    record(s,`[위임 해제] ${towns[id].name}을(를) 직접 다스립니다.`);
    return true;
  }
  if (delegationUnavailable(s,id)) return false;
  const officer=s.officers.find(o=>o.id===officerId && o.city===id);
  if (!officer) return false;
  city.delegated=true;
  city.governor=officer.id;
  record(s,`[위임] ${towns[id].name} 성주 ${officer.name} · ${delegateStyle(officer)}형 · 매달 명령 1회를 알아서 씁니다.`);
  return true;
}

// ── 군단 ──────────────────────────────────────────────
// 직할 도시가 많아지면 여러 도시를 묶어 도독(장군 이상)에게 맡깁니다. 군단 도시는 위임처럼 매달 명령 1회를
// 알아서 쓰되 도독의 성향을 따르고, 군단 도시에서 나가는 공격은 +5%를 받습니다.
const CORPS_PROMPT_CITIES = 5;
const CORPS_MIN_RANK = 2; // RANKS[2] = 장군
const CORPS_BONUS = .05;
const corpsById = (s,id) => (s.corps??[]).find(c=>c.id===id);
const corpsName = (s,id) => `제${(s.corps??[]).findIndex(c=>c.id===id)+1}군단`;
const localLeader = (s,id) => officersAt(s,id).sort((a,b)=>(b.lead+b.war+b.intel+b.politics+b.charm)-(a.lead+a.war+a.intel+a.politics+a.charm))[0];
function corpsCommander(s,corps) {
  const o=s.officers.find(x=>x.id===corps.commander);
  return o && corps.cities.includes(o.city) && s.cities[o.city].owner===s.player ? o : null;
}
// 도독 후보: 아군 도시에 있는 장군 이상 장수(군주·다른 군단 도독 제외)
function corpsCandidates(s) {
  const busy=new Set((s.corps??[]).map(c=>c.commander));
  const ruler=rulerOf(s,s.player);
  return s.officers.filter(o=>o.city && s.cities[o.city].owner===s.player && o!==ruler && !busy.has(o.id) &&
    RANKS.indexOf(rankOf(o))>=CORPS_MIN_RANK);
}
// 군단에 넣을 수 있는 도시: 군주 없는 직할 도시 중 다른 군단에 속하지 않은 곳
const corpsFreeCities = s => owned(s).filter(id=>s.cities[id].corps===undefined && rulerOf(s,s.player)?.city!==id);
function corpsPromptDue(s) {
  if (!s.player || s.end) return false;
  const free=corpsFreeCities(s).length;
  return free>CORPS_PROMPT_CITIES && (s.corpsPromptAt===undefined || free>=s.corpsPromptAt+3) && corpsCandidates(s).length>0;
}
function formCorps(s,commanderId,cityIds) {
  const commander=corpsCandidates(s).find(o=>o.id===commanderId);
  if (!commander) return null;
  const free=new Set(corpsFreeCities(s));
  const cities=[...new Set([commander.city,...cityIds])];
  if (cities.length<2 || !cities.every(id=>free.has(id))) return null;
  s.corps??=[];
  const corps={id:Math.max(0,...s.corps.map(c=>c.id))+1,commander:commander.id,cities};
  s.corps.push(corps);
  for (const id of cities) {
    const c=s.cities[id];
    c.corps=corps.id;
    c.delegated=true;
    c.governor=localLeader(s,id)?.id;
  }
  record(s,`[군단] ${corpsName(s,corps.id)} 결성 · 도독 ${commander.name}(${rankOf(commander).name} · ${delegateStyle(commander)}형) · ${cities.map(id=>towns[id].name).join('·')}`);
  return corps;
}
function leaveCorps(s,id) {
  const city=s.cities[id], corps=corpsById(s,city.corps);
  delete city.corps;
  if (corps) corps.cities=corps.cities.filter(c=>c!==id);
}
function disbandCorps(s,corpsId,reason='') {
  const corps=corpsById(s,corpsId);
  if (!corps) return false;
  const name=corpsName(s,corpsId);
  for (const id of corps.cities) {
    const c=s.cities[id];
    if (c.corps!==corpsId) continue;
    delete c.corps;
    delete c.delegated;
    delete c.governor;
  }
  s.corps=s.corps.filter(c=>c.id!==corpsId);
  record(s,`[군단] ${name} 해산${reason?` · ${reason}`:''}`);
  return true;
}

// ── 후방 수송 ─────────────────────────────────────────
// 적·중립 도시와 맞닿지 않은 아군 도시는 후방, 맞닿은 도시는 전선입니다.
const isFrontline = (s,id) => neighbors(id).some(n=>s.cities[n].owner!==s.cities[id].owner);
// 후방 도시가 남겨 둘 병력·금·군량
function rearReserve(s,id) {
  const c=s.cities[id];
  const troops=Math.max(1000,Math.round(cityCaps(c).troops*.2));
  return {troops,gold:300,food:Math.max(600,Math.ceil(troops/18)*6)};
}
// 이 후방 도시에서 보낼 수송: 가장 급한 전선 도시와 보낼 양. 보낼 게 적으면 null
function convoyPlan(s,id) {
  const c=s.cities[id];
  if (!c.owner || isFrontline(s,id)) return null;
  const routes=friendlyRoutes(s,id);
  // 이미 가고 있는 병력도 셈에 넣어 한 전선에 몰리지 않게 합니다.
  const incoming=to=>s.transfers.filter(t=>t.faction===c.owner && t.route.at(-1)===to).reduce((sum,t)=>sum+t.units,0);
  const fronts=[...routes.keys()].filter(to=>isFrontline(s,to)).map(to=>{
    const target=s.cities[to];
    const troops=target.troops+incoming(to);
    const enemies=neighbors(to).filter(n=>s.cities[n].owner && s.cities[n].owner!==c.owner);
    const threat=Math.max(0,...enemies.map(n=>s.cities[n].troops));
    // 적과 맞닿은 전선을 중립 쪽 전선보다 먼저, 적 병력에 비해 약한 곳을 먼저
    const need=(enemies.length?2:1)*(threat+1000)/(troops+500);
    return {to,need,space:Math.max(0,cityCaps(target).troops-troops)};
  }).filter(f=>f.space>0).sort((a,b)=>b.need-a.need);
  const front=fronts[0];
  if (!front) return null;
  const keep=rearReserve(s,id);
  const units=Math.max(0,Math.min(c.troops-keep.troops,front.space));
  const foodAfter=c.food-foodCost(units);
  const gold=Math.max(0,c.gold-keep.gold);
  const food=Math.max(0,Math.min(foodAfter-keep.food,cargoLimit(s,id,units).food));
  // 보낼 만한 양이 있을 때만 수송합니다.
  if (units<800 && gold<500 && food<1000) return null;
  return {type:'convoy',from:id,to:front.to,units:units>=200?units:0,gold:gold>=200?gold:0,food:food>=300?food:0};
}
// 장수 없이 병력·물자만 옮기는 수송대. 아군 도시를 거쳐 TRANSFER_TURNS 뒤 도착합니다.
function sendConvoy(s,from,to,units,cargo={}) {
  const a=s.cities[from];
  const route=friendlyRoutes(s,from).get(to);
  const gold=cargo.gold??0, food=cargo.food??0;
  if (!a?.owner || !route || ![units,gold,food].every(n=>Number.isInteger(n) && n>=0) || units+gold+food===0) return false;
  if (units && (units<200 || units>a.troops-150)) return false;
  const limit=cargoLimit(s,from,units);
  if (a.food<foodCost(units) || gold>limit.gold || food>limit.food) return false;
  const arrival=s.month+TRANSFER_TURNS;
  const transfer={route,units,faction:a.owner,arrival,convoy:true};
  if (gold) transfer.gold=gold;
  if (food) transfer.food=food;
  a.troops-=units;
  a.food-=foodCost(units)+food;
  a.gold-=gold;
  s.transfers.push(transfer);
  record(s,`[수송] ${towns[from].name} → ${towns[to].name}${units?` · 병력 ${fmt(units)}명`:''}${cargoText(transfer)} · ${date(arrival)} 도착 예정`);
  return true;
}

// 성주가 이번 달 할 일을 고릅니다. 출진이면 {type:'march'}, 내정이면 {type:'domestic'}을 돌려줍니다.
// styleOfficer를 주면(군단의 도독) 그 장수의 성향을 따릅니다. 성주가 없으면 수송만 합니다.
function delegatePlan(s,id,styleOfficer) {
  const city=s.cities[id], governor=governorOf(s,id);
  if (!governor) return styleOfficer?convoyPlan(s,id):null;
  const style=DELEGATE_STYLES[delegateStyle(styleOfficer??governor)];
  const present=officersAt(s,id);
  // 출진: 성주가 지휘하고, 장수가 셋 이상이면 부장을 붙입니다. 최소 한 명은 도시에 남깁니다.
  if (present.length>=2) {
    const others=present.filter(o=>o!==governor);
    const team=[governor];
    if (present.length>=3) {
      const strength=deputy=>teamStrength(battleTeam([governor,deputy]));
      team.push(others.sort((a,b)=>strength(b)-strength(a))[0]);
    }
    const units=Math.min(attackCapacity(s,id,team),Math.floor(city.troops*.75));
    if (units>=350) {
      const options=neighbors(id).filter(to=>s.cities[to].owner!==s.player).map(to=>{
        const p=power(s,id,to,units,team);
        return {to,ratio:p.atk/p.def};
      }).sort((a,b)=>b.ratio-a.ratio);
      if (options[0]?.ratio>=style.attackRatio) return {type:'march',from:id,to:options[0].to,units,officers:team.map(o=>o.id)};
    }
  }
  // 후방이면 남는 병력·물자를 전선으로 보냅니다.
  const convoy=convoyPlan(s,id);
  if (convoy) return convoy;
  // 내정: 급한 일부터, 그다음 성향 순서
  const net=65+city.land*44-Math.ceil(city.troops/18);
  const threatened=neighbors(id).some(from=>{
    const owner=s.cities[from].owner;
    if (!owner || owner===s.player) return false;
    const team=bestTeam(officersAt(s,from)).officers;
    const units=Math.min(Math.floor(s.cities[from].troops*.72),s.cities[from].food*10,s.cities[from].troops-150);
    return team.length && units>=350 && power(s,from,id,units,team).atk/power(s,from,id,units,team).def>1.1;
  });
  const urgent=[...(threatened?['levy','fortify']:[]),...(net<0?['develop']:[])];
  for (const key of [...urgent,...style.prefer,'market','develop','fortify','levy']) {
    if (unavailable(s,id,key,true)) continue;
    const target=key==='hire'?domestic.hire.targets(s,id).sort((a,b)=>(b.war+b.intel+b.politics)-(a.war+a.intel+a.politics))[0]:null;
    return {type:'domestic',city:id,key,officerId:governor.id,targetId:target?.id};
  }
  return null;
}

// 위임 도시 하나의 이번 달 명령 1회를 실행합니다. 세력 명령(s.ap)은 쓰지 않습니다.
function delegateTurn(s,id,random=Math.random) {
  const city=s.cities[id];
  if (!city?.delegated) return null;
  if (city.owner!==s.player || rulerOf(s,s.player)?.city===id) {
    if (city.corps!==undefined) leaveCorps(s,id);
    delete city.delegated;
    delete city.governor;
    return null;
  }
  // 군단 도시: 도독의 성향을 따르고, 일은 도시에서 가장 뛰어난 장수가 맡습니다.
  let commander=null;
  if (city.corps!==undefined) {
    const corps=corpsById(s,city.corps);
    commander=corps && corpsCommander(s,corps);
    if (!commander) {
      if (corps) disbandCorps(s,corps.id,'도독이 군단을 떠나');
      return null;
    }
    city.governor=localLeader(s,id)?.id;
  }
  const governor=governorOf(s,id);
  if (commander && !governor) {
    const convoy=delegatePlan(s,id,commander);
    if (!convoy || !sendConvoy(s,convoy.from,convoy.to,convoy.units,{gold:convoy.gold,food:convoy.food})) return {type:'rest'};
    s.log[0].message=`[${corpsName(s,city.corps)} · ${towns[id].name}] 도독 ${commander.name}: ${s.log[0].message}`;
    return convoy;
  }
  if (!governor) {
    delete city.delegated;
    delete city.governor;
    record(s,`[위임 해제] ${towns[id].name}에 성주가 없어 위임이 풀렸습니다.`);
    return null;
  }
  const plan=delegatePlan(s,id,commander);
  if (!plan) {
    record(s,`[위임 · ${towns[id].name}] 성주 ${governor.name}이(가) 이번 달은 쉬었습니다.`);
    return {type:'rest'};
  }
  if (plan.type==='convoy') {
    if (!sendConvoy(s,plan.from,plan.to,plan.units,{gold:plan.gold,food:plan.food})) return null;
    s.log[0].message=`[위임 · ${towns[id].name}] 성주 ${governor.name}: ${s.log[0].message}`;
    return plan;
  }
  if (plan.type==='march') {
    if (!march(s,plan.from,plan.to,plan.units,plan.officers,random)) return null;
    s.log[0].message=`[위임 · ${towns[id].name}] ${s.log[0].message}`;
    // 성주가 출진해 도시를 떠났으면 남은 장수 가운데 같은 방식으로 다시 고르지 않고 위임을 풉니다.
    if (!governorOf(s,id)) {
      delete city.delegated;
      delete city.governor;
      record(s,`[위임 해제] 성주 ${governor.name}이(가) ${towns[id].name}을(를) 떠나 위임이 풀렸습니다.`);
    }
    return plan;
  }
  const action=domestic[plan.key];
  const target=plan.targetId!==undefined?s.officers.find(o=>o.id===plan.targetId):undefined;
  city.gold-=action.cost;
  record(s,`[위임 · ${towns[id].name}] 성주 ${governor.name}: ${action.run(s,city,governor,target,random)}`);
  addMerit(s,governor,5);
  return plan;
}

function persuasionOrigins(s,targetCity) {
  return neighbors(targetCity).filter(id=>s.cities[id].owner===s.player &&
    !unavailable(s,id,'persuade') && persuasionTargets(s,id).some(o=>o.city===targetCity));
}

function applyDomestic(s,id,key,officerId,targetId,random=Math.random) {
  if (!s.player || s.cities[id]?.owner!==s.player || !domestic[key] || unavailable(s,id,key)) return false;
  const officer=s.officers.find(o=>o.id===officerId && o.city===id);
  const action=domestic[key];
  const target=action.targets?.(s,id).find(o=>o.id===targetId);
  if (!officer || (action.targets && !target)) return false;
  const c=s.cities[id];
  c.gold-=action.cost;
  s.ap--;
  record(s,`[${towns[id].name}] ${officer.name}의 명령으로 ${action.run(s,c,officer,target,random)}`);
  addMerit(s,officer,5);
  return true;
}

function resolveCaptive(s,id,decision) {
  const officer=captives(s).find(o=>o.id===id);
  if (!s.player || !officer) return false;
  const {faction,city}=officer.captive;
  let result;
  switch (decision) {
    case 'recruit': {
      const destination=s.cities[city].owner===s.player?city:stronghold(s,s.player);
      if (!destination) return false;
      officer.city=destination;
      result=`등용 · ${towns[destination].name}에 배치했습니다.`;
      break;
    }
    case 'execute':
      officer.executed=true;
      result='참수';
      break;
    case 'release':
      officer.city=stronghold(s,faction)??null;
      if (!officer.city) officer.freeCity=city;
      result=officer.city?`석방 · 복귀 도시 ${towns[officer.city].name}`:`석방 · ${towns[city].name}의 재야 장수가 됐습니다.`;
      break;
    default:
      return false;
  }
  delete officer.captive;
  record(s,`[포로] ${officer.name} · ${result}`);
  return true;
}

// 전투 조합: 주장의 통솔이 지휘, 참전 장수 중 최고 무력이 돌파, 최고 지력이 책략을 맡습니다.
const MAX_GENERALS = 2;

// ── 장수 등급 ─────────────────────────────────────────
// 공적(merit)이 쌓이면 등급이 오르고, 등급이 출진 1회에 이끌 수 있는 병력을 정합니다.
const RANKS = [
  {name:'교위',merit:0,troops:3000},
  {name:'중랑장',merit:100,troops:5000},
  {name:'장군',merit:250,troops:7500},
  {name:'대장군',merit:500,troops:10000}
];
const RULER_RANK = {name:'군주',merit:Infinity,troops:15000};
const isRulerOfficer = o => Object.values(factions).some(f=>f.name===o.name);
// 공적이 없던 장수는 통솔·무력·지력 평균으로 처음 공적을 정합니다.
const initialMerit = o => Math.max(0,Math.round(((o.lead+o.war+o.intel)/3-50)*10));
const meritOf = o => o.merit??initialMerit(o);
const rankOf = o => isRulerOfficer(o)?RULER_RANK:RANKS.filter(r=>meritOf(o)>=r.merit).at(-1);
// 부대 지휘 한도: 주장 등급 한도 + 부장 등급 한도의 절반
function commandCap(generals) {
  const [lead,deputy]=generals.filter(Boolean);
  if (!lead) return 0;
  return rankOf(lead).troops+(deputy?Math.floor(rankOf(deputy).troops/2):0);
}
const officerFaction = (s,o) => o.inTransit??s.cities[o.city]?.owner??null;
function addMerit(s,o,amount) {
  if (!o || !amount) return;
  const before=rankOf(o);
  o.merit=meritOf(o)+amount;
  const after=rankOf(o);
  if (after!==before && s.player && officerFaction(s,o)===s.player)
    record(s,`[승진] ${o.name} · ${after.name} · 지휘 한도 ${fmt(after.troops)}명`);
}
function battleTeam(officers) {
  const team=officers.filter(Boolean).slice(0,MAX_GENERALS);
  if (!team.length) return {officers:[],lead:45,war:45,intel:45,rating:45,bonuses:[],multiplier:1};
  const [commander]=team;
  const war=Math.max(...team.map(o=>o.war));
  const intel=Math.max(...team.map(o=>o.intel));
  const bonuses=[];
  if (team.length>1) {
    bonuses.push({name:'협공',value:.03});
    const [a,b]=team;
    if ((a.war>=85 && b.intel>=85) || (b.war>=85 && a.intel>=85)) bonuses.push({name:'문무 조화',value:.06});
  }
  const rating=commander.lead*.45+war*.3+intel*.25;
  const multiplier=1+bonuses.reduce((sum,bonus)=>sum+bonus.value,0);
  return {officers:team,lead:commander.lead,war,intel,rating,bonuses,multiplier};
}
const teamStrength = team => team.rating*team.multiplier;
function bestTeam(candidates) {
  const sorted=[...candidates].sort((a,b)=>b.lead-a.lead || b.war-a.war);
  const commander=sorted[0];
  if (!commander) return battleTeam([]);
  let best=battleTeam([commander]);
  for (const deputy of sorted.slice(1)) {
    const team=battleTeam([commander,deputy]);
    if (teamStrength(team)>teamStrength(best)) best=team;
  }
  return best;
}
const defendingTeam = (s,to) => bestTeam(officersAt(s,to));

// 작전 회의: 군주가 있는 도시에서 명령 1회로 엽니다. 참모(군주 외 주둔 장수)의 지력이 의견의 질을 정합니다.
const COUNCIL_GRADES = [
  {name:'상책',min:88,bonus:.10,advice:3},
  {name:'중책',min:72,bonus:.05,advice:2},
  {name:'하책',min:-Infinity,bonus:0,advice:1}
];
const rulerOf = (s,faction) => s.officers.find(o=>o.name===factions[faction]?.name && !o.captive && !o.executed);
const councilAdvisors = (s,id) => officersAt(s,id).filter(o=>o.name!==factionName(s.cities[id].owner))
  .sort((a,b)=>b.intel-a.intel);
function councilQuality(s,id) {
  const advisors=councilAdvisors(s,id);
  const ruler=rulerOf(s,s.cities[id].owner);
  if (!advisors.length) return Math.max(30,(ruler?.intel??50)-15);
  const sharp=advisors.filter(o=>o.intel>=80).length;
  return advisors[0].intel+(sharp>=2?5:0);
}
function councilUnavailable(s,id) {
  if (!s.player || s.cities[id]?.owner!==s.player) return '아군 도시가 아닙니다.';
  if (!s.ap || s.end) return '이번 달 명령을 마쳤습니다.';
  if (rulerOf(s,s.player)?.city!==id) return '군주가 있는 도시에서만 열 수 있습니다.';
  if (s.council?.month===s.month) return '이번 달 작전 회의를 이미 열었습니다.';
  return '';
}
const activeCouncil = (s,faction) => s.council?.month===s.month && s.council.faction===faction ? s.council : null;

// 이 도시에서 지금 낼 수 있는 최대 출진 병력
const marchCapacity = (s,id) => Math.min(s.cities[id].troops-150,s.cities[id].food*10);
// 공격에 낼 수 있는 병력: 도시 사정과 장수 등급의 지휘 한도 중 작은 값
const attackCapacity = (s,id,generals) => Math.min(marchCapacity(s,id),commandCap(generals));
// 도시에서 해당 내정을 맡을 가장 알맞은 장수
const bestFor = (s,id,key) => officersAt(s,id).sort((a,b)=>domesticSkill(key,b)-domesticSkill(key,a))[0];
function domesticAction(s,id,keys) {
  for (const key of keys) {
    const officer=bestFor(s,id,key);
    if (officer && !unavailable(s,id,key)) return {type:'domestic',city:id,key,officerId:officer.id};
  }
  return null;
}
const actionLabel = (s,action) => {
  if (!action) return '';
  if (action.type==='march') {
    const names=action.officers.map(id=>s.officers.find(o=>o.id===id)?.name).join('·');
    return `${towns[action.from].name} → ${towns[action.to].name} 출진 · ${names}`;
  }
  return `${towns[action.city].name} ${domestic[action.key].label} · ${domestic[action.key].cost}금`;
};

// 의견마다 실제로 실행할 명령(action)을 붙입니다. 실행할 수 없으면 action이 null입니다.
function councilAdvice(s,count,accuracy) {
  const ours=owned(s);
  const advice=[];
  // 공격 추천: 아군 도시에서 인접 적·중립 도시로 출진했을 때 가장 유리한 곳
  const attacks=[];
  for (const id of ours) {
    const team=bestTeam(officersAt(s,id)).officers;
    const units=attackCapacity(s,id,team);
    if (!team.length || units<200) continue;
    for (const to of neighbors(id)) {
      if (s.cities[to].owner===s.player) continue;
      const p=power(s,id,to,units,team);
      attacks.push({id,to,team,ratio:p.atk/p.def});
    }
  }
  attacks.sort((a,b)=>b.ratio-a.ratio);
  const pick=attacks[accuracy?0:Math.min(attacks.length-1,1)];
  if (pick) {
    const chance=clamp(Math.round((1.1-1/pick.ratio)/.2*100),0,100);
    advice.push({kind:'공격',text:`${towns[pick.id].name}에서 ${teamNames(pick.team)}을(를) 보내 ${towns[pick.to].name}을(를) 치십시오.${accuracy?` 예상 승률 약 ${chance}%입니다.`:''}`,
      action:{type:'march',from:pick.id,to:pick.to,officers:pick.team.map(o=>o.id)}});
  } else advice.push({kind:'공격',text:'지금은 출진할 만한 병력과 장수가 부족합니다. 힘을 기르십시오.',action:null});
  // 위협 경고: 적 도시가 아군 도시를 쳤을 때 가장 위험한 곳 → 병력 모집 또는 성벽 보수
  if (count>=2) {
    const threats=[];
    for (const id of ours) for (const from of neighbors(id)) {
      const owner=s.cities[from].owner;
      if (!owner || owner===s.player) continue;
      const c=s.cities[from], team=bestTeam(officersAt(s,from)).officers;
      const units=Math.min(Math.floor(c.troops*.72),c.food*10,c.troops-150);
      if (!team.length || units<350) continue;
      const p=power(s,from,id,units,team);
      threats.push({id,from,ratio:p.atk/p.def});
    }
    threats.sort((a,b)=>b.ratio-a.ratio);
    const t=threats[0];
    if (t) {
      const action=domesticAction(s,t.id,['levy','fortify']);
      advice.push({kind:'방비',text:`${factionName(s.cities[t.from].owner)}의 ${towns[t.from].name}이(가) ${towns[t.id].name}을(를) 노립니다.${t.ratio>1.25?' 곧 공격해 올 수 있으니':' 아직은 버틸 만하나'} ${action?`${domestic[action.key].label}로 대비하십시오.`:'장수와 금을 보내 대비하십시오.'}`,action});
    } else advice.push({kind:'방비',text:'당장 위협이 되는 적은 보이지 않습니다.',action:null});
  }
  // 내정 조언: 군량이 줄어드는 도시, 금이 최대치인 도시, 농지가 좁은 도시
  if (count>=3) {
    const hungry=ours.map(id=>({id,net:65+s.cities[id].land*44-Math.ceil(s.cities[id].troops/18)}))
      .sort((a,b)=>a.net-b.net)[0];
    const capped=ours.find(id=>s.cities[id].gold>=cityCaps(s.cities[id]).gold);
    const narrow=ours.filter(id=>s.cities[id].land<MAX_LAND && officersAt(s,id).length)
      .sort((a,b)=>s.cities[a].land-s.cities[b].land)[0];
    if (hungry && hungry.net<0) advice.push({kind:'내정',text:`${towns[hungry.id].name}은(는) 매달 군량이 약 ${fmt(-hungry.net)}씩 줄어듭니다. 농지를 개발하십시오.`,
      action:domesticAction(s,hungry.id,['develop'])});
    else if (capped) advice.push({kind:'내정',text:`${towns[capped].name}의 금이 최대치입니다. 병력을 모아 금을 쓰십시오.`,
      action:domesticAction(s,capped,['levy','fortify'])});
    else if (narrow) advice.push({kind:'내정',text:`${towns[narrow].name}의 농지를 넓혀 최대치를 늘리십시오.`,
      action:domesticAction(s,narrow,['develop'])});
    else advice.push({kind:'내정',text:'곳간이 안정적입니다. 지금처럼 다스리십시오.',action:null});
  }
  for (const item of advice) if (item.action) item.label=actionLabel(s,item.action);
  return advice;
}

function holdCouncil(s,id,random=Math.random) {
  if (councilUnavailable(s,id)) return null;
  const advisors=councilAdvisors(s,id);
  const quality=councilQuality(s,id);
  const roll=quality+Math.round((random()-.5)*24);
  const grade=COUNCIL_GRADES.find(g=>roll>=g.min);
  const speaker=advisors[0]??rulerOf(s,s.player);
  const advice=councilAdvice(s,grade.advice,grade.bonus>0);
  s.ap--;
  s.council={month:s.month,faction:s.player,city:id,grade:grade.name,bonus:grade.bonus,speaker:speaker.name,advice};
  record(s,`[작전 회의] ${towns[id].name} · ${speaker.name}의 ${grade.name}${grade.bonus?` · 이번 달 공격 +${Math.round(grade.bonus*100)}%`:''}`);
  return {grade:grade.name,bonus:grade.bonus,speaker:speaker.name,advisors:advisors.map(o=>o.name),quality,advice};
}

// 회의 의견을 실행할 수 없는 이유. 실행할 수 있으면 빈 문자열입니다.
function adviceUnavailable(s,index) {
  const council=activeCouncil(s,s.player);
  const item=council?.advice?.[index];
  if (!item?.action) return '실행할 명령이 없는 의견입니다.';
  if (item.used) return '이미 따른 의견입니다.';
  if (!s.ap || s.end) return '이번 달 명령을 마쳤습니다.';
  const action=item.action;
  if (action.type==='domestic') {
    if (s.cities[action.city].owner!==s.player) return '이미 잃은 도시입니다.';
    if (!s.officers.some(o=>o.id===action.officerId && o.city===action.city)) return '담당 장수가 도시에 없습니다.';
    return unavailable(s,action.city,action.key);
  }
  if (s.cities[action.from].owner!==s.player) return '출발 도시를 잃었습니다.';
  if (s.cities[action.to].owner===s.player) return '이미 점령한 도시입니다.';
  if (!action.officers.every(id=>s.officers.some(o=>o.id===id && o.city===action.from))) return '추천 장수가 출발 도시에 없습니다.';
  if (marchCapacity(s,action.from)<200) return '출진할 병력이나 군량이 부족합니다.';
  return '';
}

// 회의 의견을 따릅니다. 명령 1회를 쓰고 결과 정보를 돌려줍니다. 출진 병력은 실행 시점의 최대치입니다.
function followAdvice(s,index,random=Math.random) {
  if (adviceUnavailable(s,index)) return null;
  const item=s.council.advice[index], action=item.action;
  let done;
  if (action.type==='domestic') done=applyDomestic(s,action.city,action.key,action.officerId,undefined,random);
  else {
    const units=attackCapacity(s,action.from,action.officers.map(id=>s.officers.find(o=>o.id===id)));
    done=march(s,action.from,action.to,units,action.officers,random);
    if (done) {
      s.ap--;
      action.units=units;
    }
  }
  if (!done) return null;
  item.used=true;
  return action;
}

function power(s,from,to,units,officers) {
  const defender=s.cities[to];
  const attack=battleTeam([].concat(officers));
  const council=activeCouncil(s,s.cities[from]?.owner);
  if (council?.bonus) {
    attack.bonuses.push({name:'작전 회의',value:council.bonus});
    attack.multiplier+=council.bonus;
  }
  if (s.cities[from]?.corps!==undefined && corpsById(s,s.cities[from].corps)) {
    attack.bonuses.push({name:'군단',value:CORPS_BONUS});
    attack.multiplier+=CORPS_BONUS;
  }
  const defense=defendingTeam(s,to);
  return {
    atk:Math.round(units*(.65+attack.rating/100)*attack.multiplier),
    def:Math.round(defender.troops*(.55+defense.rating/110)*defense.multiplier*(1+defender.wall/65)+60),
    attack,defense
  };
}

function settleTransfers(s) {
  const pending=[];
  for (const transfer of s.transfers) {
    if (transfer.arrival>s.month) {
      pending.push(transfer);
      continue;
    }
    const {route,units,faction}=transfer;
    const generals=transferOfficers(s,transfer);
    const target=route.at(-1);
    const routeOpen=route.every(id=>s.cities[id].owner===faction);
    const destination=routeOpen?target:route.find(id=>s.cities[id].owner===faction)??stronghold(s,faction);
    for (const officer of generals) {
      officer.city=destination??null;
      if (!destination) officer.freeCity=route[0];
      delete officer.inTransit;
    }
    if (destination) {
      const city=s.cities[destination];
      city.troops+=units;
      city.gold+=transfer.gold??0;
      city.food+=transfer.food??0;
      record(s,`[${transfer.convoy?'수송':'병력 이동'}] ${generals.length?teamNames(generals):'수송대'} · ${towns[destination].name}에${units?` ${fmt(units)}명`:''}${cargoText(transfer)} ${routeOpen?'도착':'복귀 · 이동 경로 차단'}`);
    }
  }
  s.transfers=pending;
}

const cargoText = ({gold=0,food=0}) => [gold&&`금 ${fmt(gold)}`,food&&`군량 ${fmt(food)}`]
  .filter(Boolean).map(text=>` · ${text}`).join('');
// 병력 이동 때 함께 옮길 수 있는 최대 금·군량입니다. 군량은 이동 병력의 소모분을 먼저 뺍니다.
const cargoLimit = (s,from,units) => {
  const c=s.cities[from];
  return {gold:c.gold,food:Math.max(0,c.food-foodCost(units))};
};

// officerIds는 장수 ID 하나 또는 [주장, 부장] 배열입니다.
// cargo는 병력 이동에서만 쓰는 {gold, food} 수송량입니다.
function march(s,from,to,units,officerIds,random=Math.random,cargo={}) {
  const a=s.cities[from], b=s.cities[to];
  const ids=[...new Set([].concat(officerIds))];
  const generals=ids.map(id=>s.officers.find(o=>o.id===id && o.city===from));
  const officer=generals[0];
  if (!a?.owner || !b || !officer || ids.length>MAX_GENERALS || generals.some(o=>!o) ||
      !Number.isInteger(units) || units<200 || units>a.troops-150 || a.food<foodCost(units)) return false;
  const friendly=a.owner===b.owner;
  const route=friendly?friendlyRoutes(s,from).get(to):null;
  if (friendly?!route:!neighbors(from).includes(to)) return false;
  // 공격은 장수 등급의 지휘 한도를 넘을 수 없습니다. 아군 도시 사이 이동은 제한하지 않습니다.
  if (!route && units>commandCap(generals)) return false;
  const gold=cargo.gold??0, food=cargo.food??0;
  const limit=cargoLimit(s,from,units);
  if (![gold,food].every(n=>Number.isInteger(n) && n>=0) || gold>limit.gold || food>limit.food ||
      (!route && (gold || food))) return false;
  a.troops-=units;
  a.food-=foodCost(units);
  const names=teamNames(generals);
  if (route) {
    const arrival=s.month+TRANSFER_TURNS;
    for (const general of generals) {
      general.city=null;
      general.inTransit=a.owner;
    }
    const transfer={route,units,officerId:officer.id,faction:a.owner,arrival};
    if (generals[1]) transfer.deputyId=generals[1].id;
    if (gold) transfer.gold=gold;
    if (food) transfer.food=food;
    a.gold-=gold;
    a.food-=food;
    s.transfers.push(transfer);
    record(s,`[병력 이동] ${names} · ${towns[from].name} → ${towns[to].name} · ${fmt(units)}명${cargoText(transfer)} · ${date(arrival)} 도착 예정`);
    return true;
  }
  const {atk,def,attack,defense}=power(s,from,to,units,generals);
  const matchup=`[조합] 공격 ${teamSummary(attack)} / 방어 ${teamSummary(defense)}`;
  const rolled=atk*(.9+random()*.2);
  const oldOwner=b.owner;
  const oldName=factionName(oldOwner);
  if (rolled>=def) {
    const survivors=Math.max(100,units-Math.round(units*clamp(def/rolled*.55,.08,.55)));
    const defenders=officersAt(s,to);
    const capture=Boolean(s.player && a.owner===s.player && b.owner);
    const retreat=capture || !b.owner?null:stronghold(s,b.owner,to);
    for (const defender of defenders) {
      defender.city=retreat??null;
      if (capture) defender.captive={faction:b.owner,city:to};
      else if (!retreat) defender.freeCity=to;
    }
    b.owner=a.owner;
    b.troops=survivors;
    b.wall=Math.max(4,b.wall-5);
    for (const general of generals) general.city=to;
    record(s,`${factionName(a.owner)}군의 ${names}이(가) ${oldName}의 ${towns[to].name}을(를) 점령했습니다. 생존 병력 ${fmt(survivors)}명.${capture&&defenders.length?` 포로 ${defenders.length}명.`:''} ${matchup}`);
    addMerit(s,generals[0],60);
    addMerit(s,generals[1],20);
    if (oldOwner && !owned(s,oldOwner).length) record(s,defeatMessage(oldOwner),oldOwner);
  } else {
    const returned=Math.floor(units*.48);
    a.troops+=returned;
    b.troops=Math.max(0,b.troops-Math.round(b.troops*clamp(rolled/def*.55,.04,.55)));
    record(s,`${names}이(가) ${towns[to].name} 공격에서 패퇴했습니다. ${fmt(returned)}명이 귀환했습니다. ${matchup}`);
    addMerit(s,generals[0],8);
    addMerit(s,generals[1],4);
    for (const defender of defense.officers) addMerit(s,defender,15);
  }
  updateEmperor(s);
  checkEnd(s);
  if (s.end==='lost') {
    for (const prisoner of captives(s)) resolveCaptive(s,prisoner.id,'release');
    for (const transfer of s.transfers.filter(t=>t.faction===s.player)) {
      for (const general of transferOfficers(s,transfer)) {
        general.freeCity=transfer.route[0];
        delete general.inTransit;
      }
    }
    s.transfers=s.transfers.filter(t=>t.faction!==s.player);
  }
  return true;
}

function applySeasonEvent(s,random) {
  s.seasonEvent=null;
  if (random()>=EVENT_CHANCE) return;
  const season=seasonFor(s.month);
  const event=season.events[Math.floor(random()*season.events.length)];
  const rivals=Object.keys(towns).filter(id=>s.cities[id].owner && s.cities[id].owner!==s.player);
  const candidates=rivals.length && random()<.4?rivals:owned(s);
  const id=candidates[Math.floor(random()*candidates.length)];
  const city=s.cities[id];
  const effects=[];
  for (const [key,delta] of Object.entries(event.changes)) {
    const actual=gain(city,key,delta);
    if (actual) effects.push(`${resourceNames[key]} ${actual>0?'+':'−'}${fmt(Math.abs(actual))}`);
  }
  const detail=`${towns[id].name} · ${factionName(city.owner)} · ${effects.join(', ')||'피해 없음'}`;
  s.seasonEvent={name:event.name,detail,loss:Object.values(event.changes).some(delta=>delta<0)};
  record(s,`[${season.name}] ${event.name} · ${detail}`);
}

function advance(s,random=Math.random) {
  if (!s.player || s.end) return;
  s.month++;
  s.ap=COMMANDS_PER_MONTH;
  updateEmperor(s);
  settleTransfers(s);
  const shortages=[];
  for (const [id,c] of Object.entries(s.cities)) {
    if (!c.owner) continue;
    const politics=Math.max(50,...officersAt(s,id).map(o=>o.politics));
    gain(c,'gold',goldIncome(c,politics)+(id===emperorSeat(s) && c.owner===s.emperor?EMPEROR_GOLD:0));
    const net=65+c.land*44+Math.floor(politics/4)-Math.ceil(c.troops/18);
    const food=c.food+net;
    gain(c,'food',net);
    if (food<0) {
      const lost=Math.min(c.troops,-food*3);
      c.troops-=lost;
      if (c.owner===s.player) shortages.push(`${towns[id].name} 병력 ${fmt(lost)}명 감소`);
    }
  }
  record(s,`새로운 달이 시작되었습니다. 금과 군량을 정산했습니다.${s.emperor===s.player?` 황제 조공 금 +${EMPEROR_GOLD}.`:''}${shortages.length?' 군량 부족으로 '+shortages.join(', ')+'.':''}`);
  applySeasonEvent(s,random);
  // 잃은 도시는 군단에서 빼고, 도시가 하나도 남지 않은 군단은 해산합니다.
  for (const corps of [...(s.corps??[])]) {
    for (const id of corps.cities.filter(id=>s.cities[id].owner!==s.player)) {
      const c=s.cities[id];
      delete c.corps; delete c.delegated; delete c.governor;
    }
    corps.cities=corps.cities.filter(id=>s.cities[id].owner===s.player);
    if (!corps.cities.length) disbandCorps(s,corps.id,'모든 도시를 잃어');
  }
  // 위임 도시는 세력 명령과 별도로 각자 명령 1회를 씁니다.
  for (const id of owned(s).filter(id=>s.cities[id].delegated)) {
    if (s.end) break;
    delegateTurn(s,id,random);
    checkEnd(s);
  }
  const scenario=scenarioFor(s);
  for (const faction of scenario.rulers) {
    if (faction===s.player || s.end) continue;
    const cities=owned(s,faction);
    if (!cities.length) continue;
    const options=[];
    for (const id of cities) {
      const city=s.cities[id];
      const present=officersAt(s,id);
      if (!present.length) continue;
      // 장수가 셋 이상이면 최적 조합 둘을 보내고, 적으면 수비를 위해 주장만 보냅니다.
      const team=present.length>=3?bestTeam(present).officers:[bestTeam(present).officers[0]];
      const units=Math.min(Math.floor(city.troops*.72),city.food*10,city.troops-150,commandCap(team));
      if (units<350) continue;
      for (const to of neighbors(id)) {
        if (s.cities[to].owner===faction || (s.month-scenario.start<3 && s.cities[to].owner===s.player)) continue;
        const strength=power(s,id,to,units,team);
        const ratio=strength.atk/strength.def;
        if (ratio>1.25) options.push({id,to,units,team,ratio});
      }
    }
    options.sort((a,b)=>b.ratio-a.ratio);
    const move=options[0];
    if (move && random()<.65) {
      march(s,move.id,move.to,move.units,move.team.map(o=>o.id),random);
    } else {
      const id=cities.filter(id=>s.cities[id].gold>=85 && officersAt(s,id).length &&
          s.cities[id].troops<Math.min(4200,cityCaps(s.cities[id]).troops))
        .sort((a,b)=>s.cities[a].troops-s.cities[b].troops)[0];
      if (id) {
        gain(s.cities[id],'troops',220);
        s.cities[id].gold-=85;
      }
    }
  }
}

if (typeof module!=='undefined') module.exports={factions,playable,scenarios,freeCityOf,seasonFor,applySeasonEvent,towns,roads,roster,owned,neighbors,friendlyRoutes,officersAt,factionOfficers,captives,resolveCaptive,newGame,unavailable,persuasionTargets,persuasionChance,applyDomestic,march,advance,power,levyAmount,formCorps,disbandCorps,corpsCandidates,corpsFreeCities,corpsPromptDue,corpsById,corpsName,CORPS_PROMPT_CITIES,RANKS,rankOf,meritOf,commandCap,addMerit,attackCapacity,migrateOfficers,extraOfficers,isFrontline,rearReserve,convoyPlan,sendConvoy,emperorSeat,emperorHolder,emperorBonus,updateEmperor,EMPEROR_MOVE,EMPEROR_GOLD,delegateStyle,delegationUnavailable,setDelegation,delegatePlan,delegateTurn,governorOf,DELEGATE_STYLES,goldIncome,holdCouncil,followAdvice,adviceUnavailable,marchCapacity,councilUnavailable,councilAdvisors,councilQuality,activeCouncil,rulerOf,COUNCIL_GRADES,cargoLimit,cityCaps,gain,battleTeam,bestTeam,defendingTeam,statsOf,MAX_GENERALS};

if (typeof document!=='undefined') {
  const $=id=>document.getElementById(id);
  const saveKey='three-kingdoms-190-v1';
  const manualSaveKey='three-kingdoms-190-manual';
  const dialog=$('dialog');
  const map=$('map');
  let saveAvailable=true, timer;
  let state=load()??newGame(null);
  let preview=state.player??scenarioFor(state).rulers[0];
  let selected=owned(state,preview)[0]??seatOf(state,preview);
  const teamText=team=>{
    const who=team.officers.length?team.officers.map(o=>o.name).join('·'):'장수 없음';
    const bonus=team.bonuses.map(b=>`${b.name} +${Math.round(b.value*100)}%`).join(', ');
    return `${who} — 통솔 ${team.lead} · 무력 ${team.war} · 지력 ${team.intel}${bonus?` · ${bonus}`:''}`;
  };
  const statLine=o=>`${rankOf(o).name} · 통솔 ${o.lead} · 무력 ${o.war} · 지력 ${o.intel} · 정치 ${o.politics} · 매력 ${o.charm}`;
  const escapeText=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);

  function load(key=saveKey) {
    try {
      const raw=JSON.parse(localStorage.getItem(key));
      const scenarioId=raw?.scenario??DEFAULT_SCENARIO;
      const scenario=Object.hasOwn(scenarios,scenarioId)?scenarios[scenarioId]:null;
      if (!scenario?.rulers.includes(raw?.player) || !Object.keys(towns).every(id=>raw.cities?.[id] || Object.hasOwn(expandedTowns,id)) ||
          !migrateOfficers(raw,scenario) || !Array.isArray(raw.log)) return null;
      raw.scenario=scenarioId;
      // Keep the number of commands already used this month when the limit changes.
      const savedLimit=raw.commandLimit??2;
      if (!raw.end) raw.ap=clamp(raw.ap+COMMANDS_PER_MONTH-savedLimit,0,COMMANDS_PER_MONTH);
      raw.commandLimit=COMMANDS_PER_MONTH;
      raw.transfers??=[];
      // 통솔·지력이 없던 저장은 장수 이름 기준으로 능력치를 채웁니다.
      for (const officer of raw.officers) {
        if ([officer.lead,officer.intel,officer.charm].includes(undefined)) Object.assign(officer,statsOf(officer.name));
      }
      const missingTowns=Object.keys(expandedTowns).filter(id=>!raw.cities[id]);
      for (const id of missingTowns) raw.cities[id]=initialCity(towns[id]);
      // 시장이 없던 저장은 농지 수준으로 시장을 채웁니다.
      for (const city of Object.values(raw.cities)) city.market??=city.land;
      // 황제 옹위 정보가 없던 저장은 현재 도시 소유로 채웁니다.
      if (raw.emperorSeat===undefined) updateEmperor(raw,true);
      if (missingTowns.length && raw.end==='won') {
        checkEnd(raw);
        record(raw,'새로운 도시가 천하 지도에 추가되었습니다. 기존 영지에서 다시 출진할 수 있습니다.');
      }
      return raw;
    } catch {
      return null;
    }
  }

  function persist() {
    try {
      if (state.player) localStorage.setItem(saveKey,JSON.stringify(state));
      else localStorage.removeItem(saveKey);
    } catch {
      saveAvailable=false;
    }
  }

  function notify(message) {
    clearTimeout(timer);
    $('notice').textContent=message;
    $('notice').hidden=false;
    timer=setTimeout(()=>$('notice').hidden=true,3000);
  }

  let attackRoute=null;
  // 대화상자가 완전히 닫힌 뒤 한 번 실행할 일 (전투·포로 처리 뒤 위임 묻기)
  let afterClose=null;
  dialog.addEventListener('close',()=>{
    const fn=afterClose;
    afterClose=null;
    if (fn) setTimeout(fn,0);
  });

  function drawMap() {
    const canvas=$('routes');
    const {clientWidth:w,clientHeight:h}=map;
    const scale=Math.min(2,devicePixelRatio);
    canvas.width=Math.round(w*scale);
    canvas.height=Math.round(h*scale);
    const ctx=canvas.getContext('2d');
    ctx.scale(scale,scale);
    const pos=id=>[towns[id].x*w/100,towns[id].y*h/100-11];
    for (const [a,b] of roads) {
      const active=a===selected || b===selected;
      ctx.beginPath();
      ctx.moveTo(...pos(a));
      ctx.lineTo(...pos(b));
      ctx.strokeStyle=active?'#fff5d4df':'#f2ead3bd';
      ctx.lineWidth=active?4:2.5;
      ctx.setLineDash([]);
      ctx.stroke();
      ctx.strokeStyle=active?'#6c4928':'#66533a9f';
      ctx.lineWidth=active?2:1.25;
      ctx.setLineDash([5,4]);
      ctx.stroke();
    }
    if (attackRoute) {
      ctx.beginPath();
      ctx.moveTo(...pos(attackRoute[0]));
      ctx.lineTo(...pos(attackRoute[1]));
      ctx.setLineDash([]);
      ctx.lineCap='round';
      ctx.strokeStyle='#5d3727';
      ctx.lineWidth=6;
      ctx.stroke();
      ctx.strokeStyle='#f7cf78';
      ctx.lineWidth=3;
      ctx.stroke();
    }
  }

  function renderMap() {
    const freeCounts={};
    for (const officer of state.officers.filter(isFree)) {
      const city=freeCityOf(state,officer);
      freeCounts[city]=(freeCounts[city]??0)+1;
    }
    $('cities').innerHTML=Object.entries(towns).map(([id,t])=>{
      const c=state.cities[id];
      const f=factions[c.owner];
      const freeCount=freeCounts[id]??0;
      return `<button class="city${selected===id?' active':''}" data-city="${id}" aria-pressed="${selected===id}" aria-label="${t.name}${id===emperorSeat(state)?', 황제 거처':''}, ${factionName(c.owner)}, 병력 ${fmt(c.troops)}명${freeCount?`, 재야 장수 ${freeCount}명`:''}" style="--x:${t.x}%;--y:${t.y}%;--f:${color(c.owner)}"><span class="flag${f?'':' neutralFlag'}" aria-hidden="true">${f?.seal??'城'}</span>${freeCount?`<span class="freeBadge" title="재야 장수 ${freeCount}명" aria-hidden="true">${freeCount}</span>`:''}${id===emperorSeat(state)?`<span class="emperorBadge" title="황제 · ${c.owner?`${factionName(c.owner)} 옹위`:'옹위 세력 없음'}" aria-hidden="true">帝</span>`:''}<span class="cityName">${t.name}</span><span class="cityTroops">${fmt(c.troops)}</span></button>`;
    }).join('');
    $('legend').innerHTML=[...scenarioFor(state).rulers,null].map(id=>{
      const cities=owned(state,id).length;
      return `<span><i class="dot${id===null?' neutralDot':''}" style="--f:${color(id)}"></i>${factionName(id)} ${cities}</span>`;
    }).join('')+`<span><i class="freeBadge legendFree" aria-hidden="true">#</i>재야 장수</span>`+
      `<span><i class="emperorBadge legendEmperor" aria-hidden="true">帝</i>황제 · ${towns[emperorSeat(state)].name} · ${state.cities[emperorSeat(state)].owner?`${factionName(state.cities[emperorSeat(state)].owner)} 옹위`:'옹위 세력 없음'}</span>`;
    drawMap();
  }

  function renderSide() {
    if (!state.player) {
      const scenario=scenarioFor(state);
      $('side').innerHTML=`<div class="panelHead"><h2>시나리오 선택</h2></div><div class="sideInner">
        <label class="scenarioPicker">시나리오<select id="scenarioSelect">${Object.entries(scenarios).map(([id,preset])=>
          `<option value="${id}" ${id===state.scenario?'selected':''}>${date(preset.start)} · ${preset.title}</option>`).join('')}</select></label>
        <h3 class="rulerHeading">군주 선택</h3>
        <div class="cards">${scenario.rulers.map(id=>{
          const f=factions[id];
          return `<button class="factionCard" data-pick="${id}" aria-pressed="${id===preview}" style="--f:${f.color}"><span class="flag" aria-hidden="true">${f.seal}</span><span><strong>${f.name}</strong><small>${owned(state,id).map(city=>towns[city].name).join('·')} · 장수 ${factionOfficers(state,id).length}명</small></span></button>`;
        }).join('')}</div>
        <button class="primary full" data-start>시작 · ${factionName(preview)}</button>
        <p class="hint choiceFoot">한 달에 명령 ${COMMANDS_PER_MONTH}회 · 싱글플레이</p>
      </div><div class="turnBox"><button class="secondary full" data-saves>저장 / 불러오기</button></div>`;
      return;
    }
    const c=state.cities[selected], ours=c.owner===state.player;
    const generals=officersAt(state,selected);
    const connected=neighbors(selected);
    const attackTargets=connected.filter(id=>state.cities[id].owner!==state.player);
    const transferTargets=ours?friendlyRoutes(state,selected):null;
    const prisonerCount=captives(state).length;
    const hasMarch=ours && state.ap && !state.end && generals.length && c.troops>=350 && c.food>=20;
    const origins=connected.filter(id=>state.cities[id].owner===state.player && officersAt(state,id).length &&
      state.cities[id].troops>=350 && state.cities[id].food>=20);
    const isRival=Boolean(c.owner && !ours);
    const canPersuade=isRival && persuasionOrigins(state,selected).length>0;
    const persuasionReason=()=>{
      if (!state.ap || state.end) return '이번 달에 사용할 명령이 없습니다.';
      if (!generals.some(o=>o.name!==factionName(c.owner))) return '이 도시에 회유할 장수가 없습니다.';
      return '인접 아군 도시에 책사로 보낼 장수와 금 160이 필요합니다.';
    };
    $('side').innerHTML=`<div class="panelHead"><h2>도시 현황</h2><span>${ours?'직할 도시':'인접 세력 정찰'}</span></div>
      <div class="sideInner"><div class="cityHeader"><h3>${towns[selected].name}</h3><span class="badge" style="--f:${color(c.owner)}">${factionName(c.owner)}</span></div>
      <div class="metrics">${(()=>{const caps=cityCaps(c);return [['병력','troops'],['군량','food'],['금','gold'],['성벽','wall'],['농지','land'],['시장','market']]
        .map(([label,key])=>`<div class="${c[key]>caps[key]?'overCap':c[key]>=caps[key]?'atCap':''}"><span>${label}</span><b>${fmt(c[key])}<small> / ${fmt(caps[key])}</small></b></div>`).join('');})()}</div>
      <div class="subhead">주둔 장수 · ${generals.length}명</div>
      <div class="officers">${generals.map(o=>`<span title="${statLine(o)}">${escapeText(o.name)}</span>`).join('')||'<span>없음</span>'}</div>
      ${ours?`<div class="actions">${Object.entries(domestic).map(([key,a])=>{
        const reason=unavailable(state,selected,key);
        return `<button class="secondary" data-domestic="${key}" ${reason?'disabled':''} title="${reason||a.label}">${a.label} · ${a.cost}금</button>`;
      }).join('')}</div><div class="actions">
        ${(()=>{
          if (c.corps!==undefined && corpsById(state,c.corps)) {
            const corps=corpsById(state,c.corps);
            const cmd=state.officers.find(o=>o.id===corps.commander);
            const gov=governorOf(state,selected);
            return `<p class="delegation">${corpsName(state,c.corps)} · 도독 ${escapeText(cmd?.name??'없음')}${cmd?`(${rankOf(cmd).name} · ${delegateStyle(cmd)}형)`:''} · ${gov?`성주 ${escapeText(gov.name)}`:'성주 없음 · 수송만'} · 매달 명령 1회 자동</p>
              <button class="secondary delegateButton" data-corps>군단 관리</button>`;
          }
          if (c.delegated) {
            const gov=governorOf(state,selected);
            return `<p class="delegation">${gov?`위임 중 · 성주 ${escapeText(gov.name)} · ${delegateStyle(gov)}형 · 매달 명령 1회 자동`:'위임 중 · 성주가 없어 다음 달에 위임이 풀립니다'}</p>
              <button class="secondary delegateButton" data-delegate>성주 변경 · 위임 해제</button>`;
          }
          return delegationUnavailable(state,selected)?'':'<button class="secondary delegateButton" data-delegate title="성주에게 맡기면 매달 명령 1회를 알아서 씁니다">위임하기 · 명령 소모 없음</button>';
        })()}
        ${(()=>{const reason=councilUnavailable(state,selected);const ruler=rulerOf(state,state.player);
          const held=activeCouncil(state,state.player);
          return ruler?.city===selected||held?.city===selected?`<button class="secondary councilButton" data-council ${reason&&!held?'disabled':''} title="${held?'회의 의견 다시 보기':reason||'군주와 참모가 작전을 논의합니다 · 명령 1회'}">${held?`작전 회의 · ${held.grade}${held.bonus?` 공격 +${Math.round(held.bonus*100)}%`:''} · 의견 보기`:'작전 회의 · 명령 1회'}</button>`:'';})()}
        <button class="secondary" data-march ${hasMarch&&attackTargets.length?'':'disabled'}>출진</button>
        <button class="secondary" data-transfer ${hasMarch&&transferTargets.size?'':'disabled'}>병력 이동</button></div>${!generals.length?'<p class="hint choiceFoot">인접 도시에서 장수와 병력을 보내세요.</p>':''}`
      :`<div class="actions${isRival?'':' singleAction'}"><button class="secondary full" data-invade ${origins.length&&state.ap&&!state.end?'':'disabled'}>이 도시 공격</button>
        ${isRival?`<button class="secondary full" data-persuade-city ${canPersuade?'':'disabled'}>적장 회유 · 160금</button>`:''}</div>
        ${isRival&&!canPersuade?`<p class="hint">회유 조건 · ${persuasionReason()}</p>`:''}
        <p class="hint">연결 도시 · ${connected.map(id=>towns[id].name).join(', ')}</p>`}
      </div><div class="turnBox">${prisonerCount?`<button class="secondary full prisonerButton" data-captives>포로 ${prisonerCount}명</button>`:''}<button class="primary full" data-advance ${state.end?'disabled':''}>${state.end==='won'?'천하 통일':state.end==='lost'?'세력 멸망':'다음 달 →'}</button>
      <p class="hint">${state.end?'새 게임으로 다른 군주를 선택할 수 있습니다.':`남은 명령 ${state.ap} / ${COMMANDS_PER_MONTH} · ${saveAvailable?'자동 저장':'자동 저장 불가'}`}</p>
      <button class="secondary full saveButton" data-saves>저장 / 불러오기</button>
      ${state.player && (owned(state).length>CORPS_PROMPT_CITIES || state.corps?.length)?`<button class="secondary full corpsButton" data-corps>군단 · ${state.corps?.length??0}개</button>`:''}</div>
      ${renderTransfers()}`;
  }

  function renderTransfers() {
    const active=state.transfers.filter(t=>t.faction===state.player);
    if (!active.length) return '';
    return `<section class="transferList" aria-label="이동 중인 부대"><h3>이동 중인 부대</h3><ul>${active.map(t=>{
      const names=[t.officerId,t.deputyId].filter(id=>id!==undefined)
        .map(id=>state.officers.find(o=>o.id===id)?.name).filter(Boolean).join('·')||'수송대';
      const route=t.route.map(id=>towns[id].name).join(' → ');
      return `<li><strong>${route}</strong><span>${escapeText(names)} · ${fmt(t.units)}명${cargoText(t)} · ${t.arrival-state.month}턴 남음</span></li>`;
    }).join('')}</ul></section>`;
  }

  function render() {
    const resources=$('resources');
    resources.hidden=!state.player;
    $('restart').hidden=!state.player;
    const scenario=scenarioFor(state);
    $('scenarioTitle').textContent=scenario.title;
    $('scenarioNote').textContent=scenario.note;
    $('status').textContent=state.player?`${factionName(state.player)} 세력`:'시나리오 선택';
    const season=seasonFor(state.month).name;
    $('turn').firstElementChild.textContent=`${state.player?`${state.month-scenario.start+1}턴`:'시나리오 시작'} · ${season}`;
    const event=state.seasonEvent;
    const eventPanel=$('seasonEvent');
    eventPanel.hidden=!event;
    if (event) {
      eventPanel.classList.toggle('eventLoss',event.loss);
      eventPanel.firstElementChild.textContent=`${season} · ${event.name}`;
      eventPanel.lastElementChild.textContent=event.detail;
    }
    const defeats=$('factionDefeats');
    const eliminated=state.log.filter(entry=>entry.month===state.month && entry.eliminated);
    defeats.hidden=!eliminated.length;
    defeats.textContent=eliminated.map(entry=>entry.message).join(' ');
    $('turn').lastElementChild.textContent=date(state.month);
    $('mapCount').textContent=state.player?`점령 ${owned(state).length} / ${CITY_COUNT}`:`${CITY_COUNT}개 도시`;
    $('logLabel').textContent=date(state.month);
    if (state.player) {
      const totals=owned(state).reduce((sum,id)=>{
        const c=state.cities[id];
        return [sum[0]+c.gold,sum[1]+c.food,sum[2]+c.troops];
      },[0,0,0]);
      for (const t of state.transfers.filter(t=>t.faction===state.player)) {
        totals[0]+=t.gold??0;
        totals[1]+=t.food??0;
        totals[2]+=t.units;
      }
      resources.innerHTML=['보유 금','보유 군량','총 병력','남은 명령'].map((label,i)=>`<div class="resource"><span>${label}</span><b>${i===3?`${state.ap} / ${COMMANDS_PER_MONTH}`:fmt(totals[i])}</b></div>`).join('');
    }
    $('log').innerHTML=state.log.map(entry=>`<li><time>${date(entry.month)}</time><span>${escapeText(entry.message)}</span></li>`).join('');
    renderMap();
    renderSide();
  }

  function show(title,body,confirmLabel,onConfirm,closeLabel=onConfirm?'취소':'닫기') {
    $('dialogBody').innerHTML=`<form><h2 id="dialogTitle">${title}</h2>${body}<div class="dialogActions"><button type="button" class="secondary" data-close>${closeLabel}</button>${onConfirm?`<button class="primary" type="submit">${confirmLabel}</button>`:''}</div></form>`;
    dialog.setAttribute('aria-labelledby','dialogTitle');
    const form=$('dialogBody').firstElementChild;
    form.querySelector('[data-close]').onclick=()=>dialog.close();
    form.onsubmit=event=>{
      event.preventDefault();
      if (onConfirm?.(form)!==false) dialog.close();
    };
    if (!dialog.open) dialog.showModal();
  }

  function endDialog() {
    const won=state.end==='won';
    show(won?'천하 통일':'세력 멸망',`<p>${date(state.month)}, ${factionName(state.player)} 세력이 ${won?`${CITY_COUNT}개 도시를 모두 점령했습니다.`:'마지막 도시를 잃었습니다.'}</p>`);
  }

  function commit(showEnd=true) {
    persist();
    render();
    if (showEnd && state.end) queueMicrotask(endDialog);
  }

  function openSaves(message='') {
    const saved=load(manualSaveKey);
    const summary=saved?`${scenarioFor(saved).title} · ${factionName(saved.player)} · ${date(saved.month)} · 도시 ${owned(saved).length}개`:'저장된 게임이 없습니다.';
    show('저장 / 불러오기',`
      <div class="saveSlot"><strong>수동 저장</strong><p>${summary}</p></div>
      <p class="hint">현재 진행을 저장하면 이 슬롯을 덮어씁니다. 불러오면 저장한 시점부터 이어서 플레이합니다.</p>
      <div class="actions">
        <button type="button" class="secondary" data-save-game ${state.player?'':'disabled'}>현재 진행 저장</button>
        <button type="button" class="secondary" data-load-game ${saved?'':'disabled'}>저장 불러오기</button>
      </div>
      <p class="saveFeedback" role="status">${message}</p>`);
    const form=$('dialogBody').firstElementChild;
    form.querySelector('[data-save-game]').onclick=()=>{
      try {
        localStorage.setItem(manualSaveKey,JSON.stringify(state));
        openSaves('현재 진행을 저장했습니다.');
        $('dialogBody').querySelector('[data-save-game]').focus();
      } catch {
        form.querySelector('.saveFeedback').textContent='브라우저에 저장할 수 없습니다.';
      }
    };
    form.querySelector('[data-load-game]').onclick=()=>{
      state=saved;
      preview=state.player;
      selected=owned(state)[0]??seatOf(state,state.player);
      dialog.close();
      commit(false);
      $('side').querySelector('[data-saves]').focus();
      notify('수동 저장에서 진행을 불러왔습니다.');
    };
  }

  function openCaptives() {
    const prisoners=captives(state);
    if (!prisoners.length) return;
    const rows=prisoners.map(o=>`<li>
      <div><strong>${escapeText(o.name)}</strong><span>${factionName(o.captive.faction)} · ${towns[o.captive.city].name}에서 포획</span><span>${statLine(o)}</span></div>
      <div class="prisonerActions">
        <button type="button" class="secondary" data-id="${o.id}" data-treatment="recruit" aria-label="${escapeText(o.name)} 등용">등용</button>
        <button type="button" class="secondary" data-id="${o.id}" data-treatment="execute" aria-label="${escapeText(o.name)} 참수">참수</button>
        <button type="button" class="secondary" data-id="${o.id}" data-treatment="release" aria-label="${escapeText(o.name)} 석방">석방</button>
      </div></li>`).join('');
    show('포로 장수',`<p>등용하면 아군에 합류합니다. 석방하면 원래 세력으로 돌아가고, 그 세력이 멸망했다면 재야로 돌아갑니다.</p>
      <ul class="prisonerList">${rows}</ul>`,undefined,undefined,'나중에');
    const form=$('dialogBody').firstElementChild;
    form.onclick=event=>{
      const button=event.target.closest('[data-treatment]');
      if (!button || !resolveCaptive(state,Number(button.dataset.id),button.dataset.treatment)) return;
      commit(false);
      notify(state.log[0].message);
      if (captives(state).length) openCaptives();
      else {
        dialog.close();
        if (state.end==='won') endDialog();
      }
    };
    form.querySelector('[data-treatment]').focus();
  }

  function options(generals) {
    return generals.map(o=>`<option value="${o.id}">${escapeText(o.name)} · ${statLine(o)}</option>`).join('');
  }

  function openCorps(prompt=false) {
    const list=(state.corps??[]).map(corps=>{
      const cmd=state.officers.find(o=>o.id===corps.commander);
      return `<li><div><strong>${corpsName(state,corps.id)}</strong> · 도독 ${escapeText(cmd?.name??'없음')}${cmd?` (${rankOf(cmd).name} · ${delegateStyle(cmd)}형)`:''}
        <small>${corps.cities.map(id=>towns[id].name).join(' · ')}</small></div>
        <button type="button" class="secondary" data-disband="${corps.id}">해산</button></li>`;
    }).join('');
    const candidates=corpsCandidates(state).sort((a,b)=>meritOf(b)-meritOf(a));
    const free=corpsFreeCities(state);
    const canForm=candidates.length && free.length>=2;
    show(prompt?'군단 구성':'군단',`
      ${prompt?`<p>직할 도시가 ${free.length}곳입니다. 여러 도시를 묶어 도독에게 맡기면 매달 도시마다 명령 1회를 알아서 쓰고, 군단 도시에서 나가는 공격은 +${Math.round(CORPS_BONUS*100)}%를 받습니다.</p>`:''}
      ${list?`<ul class="corpsList">${list}</ul>`:''}
      ${canForm?`<div class="subhead">새 군단</div>
        <label>도독 (장군 이상)<select name="commander">${candidates.map(o=>`<option value="${o.id}">${escapeText(o.name)} · ${rankOf(o).name} · ${delegateStyle(o)}형 · ${towns[o.city].name}</option>`).join('')}</select></label>
        <p class="hint corpsNote"></p>
        <fieldset class="corpsCities"><legend class="marchLabel">맡길 도시</legend>${free.map(id=>`<label><input type="checkbox" name="city" value="${id}">${towns[id].name}<small>${officersAt(state,id).length?`장수 ${officersAt(state,id).length}`:'장수 없음'}</small></label>`).join('')}</fieldset>`:
        `<p class="hint">${!candidates.length?'군단을 맡길 장군 이상 장수가 없습니다. 공적을 쌓아 승진시키세요.':'군단으로 묶을 직할 도시가 부족합니다.'}</p>`}`,
      canForm?'군단 결성':undefined,canForm?form=>{
        const data=new FormData(form);
        const corps=formCorps(state,Number(data.get('commander')),data.getAll('city'));
        if (!corps) {
          form.querySelector('.corpsNote').textContent='도독이 있는 도시를 포함해 두 곳 이상을 고르세요.';
          return false;
        }
        commit();
        notify(state.log[0].message);
      }:undefined,prompt?'나중에':'닫기');
    const form=$('dialogBody').firstElementChild;
    for (const b of form.querySelectorAll('[data-disband]')) b.onclick=()=>{
      disbandCorps(state,Number(b.dataset.disband),'군주의 명');
      commit();
      openCorps();
    };
    if (!canForm) return;
    const select=form.elements.commander;
    const note=form.querySelector('.corpsNote');
    // 도독이 있는 도시와, 그 도시에서 아군 땅을 거쳐 두 칸 안의 도시를 미리 고릅니다.
    const preselect=()=>{
      const cmd=candidates.find(o=>o.id===Number(select.value));
      const near=new Set([cmd.city]);
      for (const id of neighbors(cmd.city)) if (free.includes(id)) { near.add(id); for (const n of neighbors(id)) if (free.includes(n)) near.add(n); }
      for (const box of form.querySelectorAll('[name=city]')) box.checked=near.has(box.value);
      note.textContent=`${delegateStyle(cmd)}형 · ${DELEGATE_STYLES[delegateStyle(cmd)].note} 도독이 있는 ${towns[cmd.city].name}은(는) 반드시 포함됩니다.`;
    };
    select.onchange=preselect;
    preselect();
  }

  function openDelegate(id,afterConquest=false) {
    const city=state.cities[id];
    const generals=officersAt(state,id).sort((a,b)=>(b.lead+b.war+b.intel+b.politics+b.charm)-(a.lead+a.war+a.intel+a.politics+a.charm));
    const current=governorOf(state,id);
    const option=o=>`<option value="${o.id}" ${o===current?'selected':''}>${escapeText(o.name)} · ${delegateStyle(o)}형 · ${statLine(o)}</option>`;
    show(city.delegated?`성주 변경 · ${towns[id].name}`:`${towns[id].name} 위임`,`
      <p>${afterConquest?`${towns[id].name}을(를) 점령했습니다. 이곳에는 군주가 없습니다. `:''}성주에게 맡기면 매달 세력 명령과 별도로 명령 1회를 알아서 씁니다. 출진할지, 어떤 내정을 할지는 성주의 능력치가 정합니다.</p>
      <label>성주<select name="governor">${generals.map(option).join('')}</select></label>
      <p class="hint delegateNote" aria-live="polite"></p>
      ${city.delegated?'<button type="button" class="secondary full" data-undelegate>위임 해제 · 직접 다스리기</button>':''}`,
      city.delegated?'성주 변경':'위임하기',form=>{
        if (!setDelegation(state,id,Number(new FormData(form).get('governor')))) return false;
        commit();
        notify(state.log[0].message);
      },afterConquest?'직접 다스리기':'취소');
    const form=$('dialogBody').firstElementChild;
    const note=form.querySelector('.delegateNote');
    const describe=()=>{
      const o=generals.find(g=>g.id===Number(form.elements.governor.value));
      const style=delegateStyle(o);
      note.textContent=`${style}형 · ${DELEGATE_STYLES[style].note}`;
    };
    form.elements.governor.onchange=describe;
    describe();
    const release=form.querySelector('[data-undelegate]');
    if (release) release.onclick=()=>{
      setDelegation(state,id,null);
      dialog.close();
      commit();
      notify(state.log[0].message);
    };
  }

  function openCouncil(id) {
    const advisors=councilAdvisors(state,id);
    const quality=councilQuality(state,id);
    // 의견의 질 = 품질 ±12 균등 분포. 등급별 가능성을 미리 보여 줍니다.
    const atLeast=min=>clamp(Math.round((quality+12-min)/24*100),0,100);
    const top=atLeast(COUNCIL_GRADES[0].min), mid=atLeast(COUNCIL_GRADES[1].min)-top;
    const rows=advisors.length?advisors.map(o=>`<li><strong>${escapeText(o.name)}</strong><span>지력 ${o.intel}</span></li>`).join(''):
      '<li><span>참모가 없습니다. 군주 혼자 논의합니다.</span></li>';
    show('작전 회의',`<p>${towns[id].name} · 명령 1회 · 군주 ${escapeText(rulerOf(state,state.player).name)}</p>
      <div class="subhead">참석 참모</div><ul class="councilList">${rows}</ul>
      <div class="marchForecast">
        <div class="marchForecastLead"><span>예상 의견</span><strong>상책 ${top}% · 중책 ${mid}% · 하책 ${100-top-mid}%</strong></div>
        <p class="hint">참모의 지력이 높을수록 좋은 의견이 나옵니다. 지력 80 이상 참모가 둘이면 가산점이 붙습니다.
          상책은 이번 달 공격 +10%, 중책은 +5% 보너스를 줍니다.</p>
      </div>`,'회의 열기',()=>{
        if (!holdCouncil(state,id)) return false;
        commit();
        queueMicrotask(openAdvice);
      });
  }

  // 회의에서 나온 의견을 선택지로 보여 줍니다. 의견을 고르면 명령 1회를 더 써서 실행합니다.
  function openAdvice() {
    const council=activeCouncil(state,state.player);
    if (!council) return;
    const items=(council.advice??[]).map((item,index)=>{
      const reason=item.action?adviceUnavailable(state,index):'';
      const button=item.action?`<button type="button" class="${reason?'secondary':'primary'} adviceButton" data-advice="${index}" ${reason?'disabled':''}>
          ${item.used?'완료 · ':''}${escapeText(item.label)}${reason||item.used?'':' · 명령 1회'}</button>
          ${reason&&!item.used?`<small class="hint">${escapeText(reason)}</small>`:''}`:'<small class="hint">따를 명령이 없는 의견입니다.</small>';
      return `<li><b>${item.kind}</b><p>${escapeText(item.text)}</p>${button}</li>`;
    }).join('');
    show(`작전 회의 · ${council.grade}`,`<p><strong>${escapeText(council.speaker)}</strong>의 진언입니다.
      ${council.bonus?`이번 달 모든 공격에 <b>작전 회의 +${Math.round(council.bonus*100)}%</b>가 적용됩니다.`:'뚜렷한 계책은 나오지 않았습니다.'}</p>
      <ul class="councilAdvice">${items}</ul>
      <p class="hint">남은 명령 ${state.ap} / ${COMMANDS_PER_MONTH} · 의견을 고르면 명령 1회를 써서 바로 실행합니다.</p>`);
    const form=$('dialogBody').firstElementChild;
    for (const button of form.querySelectorAll('[data-advice]')) button.onclick=()=>{
      const index=Number(button.dataset.advice);
      const action=council.advice[index].action;
      if (adviceUnavailable(state,index)) return openAdvice();
      if (action.type==='march') {
        const units=attackCapacity(state,action.from,action.officers.map(id=>state.officers.find(o=>o.id===id)));
        launchAttack(action.from,action.to,units,action.officers,()=>followAdvice(state,index),false);
        return;
      }
      if (!followAdvice(state,index)) return openAdvice();
      selected=action.city;
      dialog.close();
      commit();
      notify(state.log[0].message);
    };
  }

  function openDomestic(key,origins=[selected],targetCity=null) {
    if (!origins.length) return;
    let id=origins[0];
    const action=domestic[key];
    const getGenerals=()=>officersAt(state,id).sort((a,b)=>domesticSkill(key,b)-domesticSkill(key,a));
    const getTargets=()=>action.targets?.(state,id).filter(o=>!targetCity || o.city===targetCity);
    let generals=getGenerals(), targets=getTargets();
    const persuasion=key==='persuade';
    const targetOptions=()=>persuasion?targets.map(o=>
      `<option value="${o.id}">${escapeText(o.name)} · ${towns[o.city].name} · 지력 ${o.intel}</option>`
    ).join(''):options(targets??[]);
    show(action.label,`<p>${origins.length===1?`${towns[id].name} · `:''}금 ${action.cost} · 명령 1회</p>
      ${origins.length>1?`<label>출발 도시<select name="origin">${origins.map(city=>
        `<option value="${city}">${towns[city].name}</option>`).join('')}</select></label>`:''}
      <label>${persuasion?'책사':'담당 장수'}<select name="officer">${options(generals)}</select></label>
      ${targets?`<label>${persuasion?'회유할 적장':'등용할 장수'}<select name="target">${targetOptions()}</select></label>`:''}
      ${action.chance?`<div class="marchForecast">
        <div class="marchForecastLead"><span>예상 성공률</span><strong class="marchOutcome" role="status"></strong></div>
        <progress max="100" value="0" aria-label="예상 성공률"></progress>
        <p class="hint">${persuasion?'책사의 지력':'담당 장수의 매력'}이 상대보다 높을수록 성공률이 오릅니다.${emperorBonus(state,state.player)?` 황제를 옹위해 +${emperorBonus(state,state.player)}%가 더해집니다.`:''}</p>
      </div>`:''}`,
    persuasion?'회유 시도':key==='hire'?'등용 시도':'명령 실행',form=>{
      const data=new FormData(form);
      if (!applyDomestic(state,id,key,Number(data.get('officer')),Number(data.get('target')))) return false;
      commit();
      notify(state.log[0].message);
    });
    if (action.chance) {
      const form=$('dialogBody').firstElementChild;
      const {officer,target,origin}=form.elements;
      const outcome=form.querySelector('.marchOutcome');
      const progress=form.querySelector('progress');
      const update=()=>{
        const strategist=generals.find(o=>o.id===Number(officer.value));
        const rival=targets.find(o=>o.id===Number(target.value));
        const chance=action.chance(strategist,rival,emperorBonus(state,state.player));
        outcome.textContent=`${chance}%`;
        progress.value=chance;
      };
      if (origin) origin.onchange=()=>{
        id=origin.value;
        generals=getGenerals();
        targets=getTargets();
        officer.innerHTML=options(generals);
        target.innerHTML=targetOptions();
        update();
      };
      officer.onchange=target.onchange=update;
      update();
    }
  }

  async function animateAttack(from,report) {
    const {to,attacker}=report;
    const position=id=>({left:`${towns[id].x}%`,top:`${towns[id].y}%`});
    const unit=document.createElement('div');
    unit.className='mapArmy';
    unit.setAttribute('aria-hidden','true');
    unit.style.setProperty('--f',color(attacker));
    unit.innerHTML=`<span class="flag">${factions[attacker].seal}</span><span class="mapRanks"><i></i><i></i><i></i><i></i><i></i><i></i></span>`;
    Object.assign(unit.style,position(from));

    const panel=$('attackMarch');
    const status=$('attackMarchStatus');
    const button=$('viewBattle');
    const controls=[document.querySelector('header'),$('side'),$('cities')];
    const route=`${towns[from].name} → ${towns[to].name}`;
    persist();
    dialog.close();
    $('notice').hidden=true;
    for (const control of controls) control.inert=true;
    attackRoute=[from,to];
    drawMap();
    map.append(unit);
    panel.hidden=false;
    button.disabled=true;
    status.textContent=`${route} · ${fmt(report.units)}명 진격 중`;
    panel.scrollIntoView({block:'nearest',behavior:'instant'});

    const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion && unit.animate) {
      // Give the map a frame with the modal closed before the unit starts moving.
      // 탭이 가려져 프레임이 멈춰도 연출이 진행되도록 시간 제한을 둡니다.
      const within=(promise,ms)=>Promise.race([promise,new Promise(resolve=>setTimeout(resolve,ms))]);
      await within(new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))),120);
      await within(unit.animate([position(from),position(to)],{
        duration:1050,easing:'cubic-bezier(.33,.05,.59,.92)'
      }).finished.catch(()=>{}),1400);
    }
    Object.assign(unit.style,position(to));
    const impact=document.createElement('div');
    impact.className='mapImpact';
    impact.setAttribute('aria-hidden','true');
    Object.assign(impact.style,position(to));
    map.append(impact);
    if (!reducedMotion && impact.animate) {
      impact.animate([{opacity:.9,scale:.65},{opacity:0,scale:1.65}],{duration:400,easing:'ease-out'});
    }
    status.textContent=`${route} · ${fmt(report.units)}명 도착 · 곧 전투가 시작됩니다`;
    let opened=false;
    const start=()=>{
      if (opened) return;
      opened=true;
      clearTimeout(autoOpen);
      panel.hidden=true;
      for (const control of controls) control.inert=false;
      attackRoute=null;
      unit.remove();
      impact.remove();
      render();
      openBattle(report);
    };
    // 도착 후 잠시 뒤 전투 창을 자동으로 엽니다. 버튼을 누르면 바로 엽니다.
    const autoOpen=setTimeout(start,reducedMotion?0:900);
    button.onclick=start;
    button.disabled=false;
    button.focus({preventScroll:true});
  }

  function openBattle(report) {
    $('notice').hidden=true;
    const {attacker,defender,to,leader,units,defense,won,survivors,remaining,captured,eliminated,attackTeam,defenseTeam,delegateCity}=report;
    // 군주 없는 도시를 점령했으면 전투·포로 처리 창이 닫힌 뒤 위임 여부를 묻습니다.
    afterClose=delegateCity?()=>{
      if (!dialog.open && !state.end && !delegationUnavailable(state,delegateCity) && !state.cities[delegateCity].delegated)
        openDelegate(delegateCity,true);
    }:null;
    const teamLine=team=>team?`<small class="battleTeam">${escapeText(team)}</small>`:'';
    const army=(id,side)=>`<div class="battleArmy ${side}" style="--f:${color(id)}">
      <span class="flag${id===null?' neutralFlag':''}">${factions[id]?.seal??'城'}</span>
      <div class="battleRanks">${'<i></i>'.repeat(10)}</div>
    </div>`;
    show(`전투 · ${towns[to].name}`,`
      <div class="battleSides">
        <div><span>공격 · ${factionName(attacker)}</span><strong>${escapeText(leader)} · ${fmt(units)}명</strong>${teamLine(attackTeam)}</div>
        <div><span>수비 · ${factionName(defender)}</span><strong>${fmt(defense)}명</strong>${teamLine(defenseTeam)}</div>
      </div>
      <div class="battleStage" aria-hidden="true">
        ${army(attacker,'battleAttacker')}${army(defender,'battleDefender')}
        <span class="battleClash"></span>
      </div>
      <div class="battleResult" role="status"><strong>교전 중</strong></div>`,undefined,undefined,'결과 보기');
    const form=$('dialogBody').firstElementChild;
    const stage=form.querySelector('.battleStage');
    const result=form.querySelector('.battleResult');
    const button=form.querySelector('[data-close]');
    let revealed=false;
    let timer;
    function reveal() {
      clearTimeout(timer);
      revealed=true;
      stage.dataset.outcome=won?'win':'loss';
      result.innerHTML=`<strong>${won?'승리 · 도시 점령':'패배 · 퇴각'}</strong>
        <span>아군 손실 ${fmt(units-survivors)}명 · ${won?'생존':'귀환'} ${fmt(survivors)}명</span>
        ${won?(captured?`<span>포로 장수 ${captured}명</span>`:''):`<span>수비군 잔여 병력 ${fmt(remaining)}명</span>`}
        ${eliminated?`<b class="battleDefeatMessage">${defeatMessage(eliminated)}</b>`:''}`;
      button.textContent=captured?'포로 확인':'계속';
    }
    function next() {
      if (!revealed) {
        reveal();
        return;
      }
      dialog.removeEventListener('cancel',cancelBattle);
      if (captured) openCaptives();
      else if (state.end) {
        endDialog();
        $('dialogBody').querySelector('[data-close]').focus();
      } else {
        dialog.close();
        $('cities').querySelector(`[data-city="${selected}"]`).focus({preventScroll:true});
      }
    }
    function cancelBattle(event) {
      event.preventDefault();
      next();
    }
    button.onclick=next;
    dialog.addEventListener('cancel',cancelBattle);
    button.focus();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) reveal();
    else timer=setTimeout(reveal,1450);
  }

  // 출진을 실행하고 진격 연출·전투 창으로 이어 갑니다. execute()가 실제 march를 수행하며 성공 여부를 돌려줍니다.
  // execute가 명령 차감까지 맡으면 consumes를 false로 둡니다.
  function launchAttack(from,to,deployed,ids,execute,consumes=true) {
    const source=state.cities[from], target=state.cities[to];
    const sourceTroops=source.troops;
    const defense=target.troops;
    const defender=target.owner;
    const generals=ids.map(id=>state.officers.find(o=>o.id===id)).filter(Boolean);
    if (!generals.length) return false;
    const forecast=power(state,from,to,deployed,generals);
    const before=captives(state).length;
    if (!execute()) return false;
    if (consumes) state.ap--;
    const won=target.owner===state.player;
    selected=won?to:from;
    void animateAttack(from,{
      attacker:state.player,defender,to,leader:generals.map(o=>o.name).join('·'),units:deployed,defense,won,
      attackTeam:teamText(forecast.attack),defenseTeam:teamText(forecast.defense),
      survivors:won?target.troops:source.troops-sourceTroops+deployed,
      remaining:target.troops,captured:captives(state).length-before,
      eliminated:won && defender && !owned(state,defender).length?defender:null,
      delegateCity:won && !delegationUnavailable(state,to)?to:null
    });
    return true;
  }

  function openMarch(origins,destinations,moving=false) {
    const initialRoutes=moving?friendlyRoutes(state,origins[0]):null;
    function cityField(name,label,ids,details) {
      const id=ids[0];
      if (ids.length===1) return `<div class="marchPlace">
        <span class="marchLabel">${label}</span>
        <strong>${towns[id].name}</strong><small>${details(id)}</small>
        <input type="hidden" name="${name}" value="${id}">
      </div>`;
      return `<label class="marchPlace"><span class="marchLabel">${label}</span>
        <select name="${name}">${ids.map(id=>`<option value="${id}">${towns[id].name} · ${details(id)}</option>`).join('')}</select>
      </label>`;
    }
    const cityFaction=id=>factionName(state.cities[id].owner);
    const arrival=date(state.month+TRANSFER_TURNS);
    const title=moving?'병력 이동':'출진 계획';
    show(title,`<div class="marchPlanner">
      <div class="marchRoute">
        ${cityField('from','출발 도시',origins,cityFaction)}
        <span class="marchArrow" aria-hidden="true">→</span>
        ${cityField('to','목표 도시',destinations,moving?id=>`${initialRoutes.get(id).length-1}칸`:cityFaction)}
      </div>
      <p class="marchPath" hidden></p>
      <div class="marchGenerals">
        <label class="marchCommander"><span class="marchLabel">주장 · 통솔</span><select name="officer"></select></label>
        <label class="marchCommander"><span class="marchLabel">부장 (선택)</span><select name="deputy"></select></label>
      </div>
      ${moving?'':'<p class="marchMatchup" aria-live="polite"></p>'}
      <div class="marchTroops">
        <div class="marchTroopHead">
          <label class="marchLabel" for="march-units">${moving?'이동 병력':'출진 병력'}</label>
          <div class="marchAmount"><input id="march-units" name="units" type="number" min="200" step="1" required><span>명</span></div>
        </div>
        <div class="marchRange"><span>200</span><input type="range" name="troopSlider" min="200" step="1" aria-label="병력 조절"><span class="marchMax"></span></div>
        ${moving?'':'<p class="marchCap hint"></p>'}
        <div class="marchPresets" aria-label="병력 빠른 선택">
          <button type="button" class="secondary" data-portion=".5" aria-pressed="false">50%</button>
          <button type="button" class="secondary" data-portion=".75" aria-pressed="false">75%</button>
          <button type="button" class="secondary" data-portion="1" aria-pressed="false">최대</button>
        </div>
      </div>
      ${moving?`<fieldset class="marchCargo">
        <legend class="marchLabel">함께 옮길 물자</legend>
        <label><span>금</span><input name="gold" type="number" min="0" step="1" value="0" inputmode="numeric">
          <small>최대 <b data-cargo-max="gold"></b> · <button type="button" class="linkButton" data-cargo-all="gold">전부</button></small></label>
        <label><span>군량</span><input name="food" type="number" min="0" step="1" value="0" inputmode="numeric">
          <small>최대 <b data-cargo-max="food"></b> · <button type="button" class="linkButton" data-cargo-all="food">전부</button></small></label>
      </fieldset>`:''}
      <div class="marchForecast">
        <div class="marchForecastLead">
          <span>${moving?'도착 예정':'예상 승률'}</span><strong class="marchOutcome"></strong>
        </div>
        ${moving?'':'<progress max="100" value="0" aria-label="예상 승률"></progress>'}
        <dl>
          <div><dt>소모 군량</dt><dd data-stat="food"></dd></div>
          <div><dt>남길 수비병</dt><dd data-stat="garrison"></dd></div>
          <div><dt>소모 명령</dt><dd>1회</dd></div>
        </dl>
      </div>
      <p class="marchError" role="status" hidden></p>
    </div>`,moving?'이동 명령':'출진',form=>{
        const {from,to,units,officer,deputy,gold,food}=Object.fromEntries(new FormData(form));
        const cargo=moving?{gold:Number(gold||0),food:Number(food||0)}:{};
        const ids=[Number(officer),...(deputy?[Number(deputy)]:[])];
        const source=state.cities[from], target=state.cities[to];
        const deployed=Number(units);
        const valid=source?.owner===state.player && (target?.owner===state.player)===moving && state.ap && !state.end;
        if (valid && !moving && launchAttack(from,to,deployed,ids,()=>march(state,from,to,deployed,ids))) return false;
        if (!valid || !moving || !march(state,from,to,deployed,ids,Math.random,cargo)) {
          const error=form.querySelector('.marchError');
          error.textContent='출발 도시와 병력 수를 다시 확인하세요.';
          error.hidden=false;
          return false;
        }
        state.ap--;
        selected=from;
        commit(false);
        notify(state.log[0].message);
        queueMicrotask(()=>$('cities').querySelector(`[data-city="${selected}"]`).focus({preventScroll:true}));
      });
    const form=$('dialogBody').firstElementChild;
    const {from,to,officer,deputy,units,troopSlider}=form.elements;
    const matchupDisplay=form.querySelector('.marchMatchup');
    const capDisplay=form.querySelector('.marchCap');
    const cargoInputs=moving?{gold:form.elements.gold,food:form.elements.food}:null;
    const submit=form.querySelector('[type=submit]');
    const error=form.querySelector('.marchError');
    const routeDisplay=form.querySelector('.marchPath');
    const outcome=form.querySelector('.marchOutcome');
    const progress=form.querySelector('progress');
    const food=form.querySelector('[data-stat=food]');
    const garrison=form.querySelector('[data-stat=garrison]');
    const presets=[...form.querySelectorAll('[data-portion]')];
    const presetAmount=button=>Math.max(200,Math.round(Number(units.max)*Number(button.dataset.portion)));

    function updateCargo(n) {
      if (!cargoInputs) return true;
      const limit=cargoLimit(state,from.value,units.validity.valid?n:200);
      for (const [key,input] of Object.entries(cargoInputs)) {
        input.max=limit[key];
        form.querySelector(`[data-cargo-max="${key}"]`).textContent=fmt(limit[key]);
        input.setAttribute('aria-invalid',String(!input.validity.valid));
      }
      return Object.values(cargoInputs).every(input=>input.validity.valid);
    }
    function estimate() {
      const n=Number(units.value);
      const troopsValid=units.validity.valid;
      const cargoValid=updateCargo(n);
      const valid=troopsValid && cargoValid;
      submit.disabled=!valid;
      error.hidden=valid;
      error.textContent=!troopsValid?`병력을 200~${fmt(Number(units.max))}명 사이로 입력하세요.`:
        !cargoValid?'옮길 금과 군량은 0부터 최대치까지 입력하세요.':'';
      units.setAttribute('aria-invalid',String(!valid));
      const matching=valid?presets.findLast(button=>presetAmount(button)===n):null;
      for (const button of presets) button.setAttribute('aria-pressed',String(button===matching));
      if (troopsValid) troopSlider.value=units.value;
      food.textContent=troopsValid?fmt(foodCost(n)):'—';
      garrison.textContent=troopsValid?`${fmt(state.cities[from.value].troops-n)}명`:'—';
      if (moving) {
        const route=initialRoutes.get(to.value);
        routeDisplay.hidden=false;
        routeDisplay.textContent=route.map(id=>towns[id].name).join(' → ');
        outcome.textContent=`${arrival} · ${TRANSFER_TURNS}턴 뒤`;
      } else {
        const p=valid?power(state,from.value,to.value,n,selectedGenerals()):null;
        matchupDisplay.innerHTML=p?`<span>공격 ${escapeText(teamText(p.attack))}</span><span>방어 ${escapeText(teamText(p.defense))}</span>`:'';
        const chance=p?clamp(Math.round((1.1-p.def/p.atk)/.2*100),0,100):0;
        outcome.textContent=valid?`${chance}%`:'—';
        progress.value=chance;
      }
    }
    function configure() {
      const id=from.value, c=state.cities[id];
      const generals=officersAt(state,id);
      // 기본값은 이 도시에서 가장 강한 두 장수 조합입니다.
      const [lead,second]=bestTeam(generals).officers;
      const label=o=>`${escapeText(o.name)} · ${rankOf(o).name} · 통${o.lead} 무${o.war} 지${o.intel}`;
      officer.innerHTML=[lead,...generals.filter(o=>o!==lead)].map(o=>`<option value="${o.id}">${label(o)}</option>`).join('');
      fillDeputy(second?.id);
      updateLimit(true);
    }
    // 공격이면 장수 등급의 지휘 한도까지만 보낼 수 있습니다. 병력 이동은 도시 사정만 따릅니다.
    function updateLimit(fill=false) {
      const c=state.cities[from.value];
      const generals=selectedGenerals();
      const cap=moving?Infinity:commandCap(generals);
      const max=Math.max(200,Math.min(c.troops-150,c.food*10,cap));
      const wasMax=Number(units.value)===Number(units.max);
      units.max=max;
      troopSlider.max=max;
      troopSlider.disabled=max===200;
      if (fill || wasMax || Number(units.value)>max) units.value=max;
      form.querySelector('.marchMax').textContent=fmt(max);
      if (capDisplay) capDisplay.textContent=generals.length?`지휘 한도 ${fmt(cap)}명 · 주장 ${generals[0].name}(${rankOf(generals[0]).name} ${fmt(rankOf(generals[0]).troops)})${generals[1]?` + 부장 ${generals[1].name}(${rankOf(generals[1]).name} 절반 ${fmt(Math.floor(rankOf(generals[1]).troops/2))})`:''}`:'';
      estimate();
    }
    function selectedGenerals() {
      return [officer.value,deputy.value].filter(Boolean)
        .map(id=>state.officers.find(o=>o.id===Number(id))).filter(Boolean);
    }
    function fillDeputy(preferred) {
      const others=officersAt(state,from.value).filter(o=>o.id!==Number(officer.value));
      deputy.innerHTML=`<option value="">없음</option>`+others.map(o=>
        `<option value="${o.id}">${escapeText(o.name)} · ${rankOf(o).name} · 통${o.lead} 무${o.war} 지${o.intel}</option>`).join('');
      deputy.value=others.some(o=>o.id===preferred)?String(preferred):'';
      deputy.disabled=!others.length;
    }
    if (cargoInputs) {
      for (const input of Object.values(cargoInputs)) input.oninput=estimate;
      for (const button of form.querySelectorAll('[data-cargo-all]')) button.onclick=()=>{
        const input=cargoInputs[button.dataset.cargoAll];
        input.value=input.max;
        estimate();
      };
    }
    from.onchange=configure;
    officer.onchange=()=>{fillDeputy(deputy.value?Number(deputy.value):undefined);updateLimit();};
    deputy.onchange=()=>updateLimit();
    to.onchange=units.oninput=estimate;
    troopSlider.oninput=()=>{units.value=troopSlider.value;estimate();};
    for (const button of presets) button.onclick=()=>{units.value=presetAmount(button);estimate();};
    configure();
    const heading=form.querySelector('h2');
    heading.tabIndex=-1;
    heading.focus();
  }

  $('cities').onclick=event=>{
    const button=event.target.closest('[data-city]');
    if (!button) return;
    selected=button.dataset.city;
    renderMap();
    renderSide();
    $('cities').querySelector(`[data-city="${selected}"]`).focus({preventScroll:true});
    if (state.player && matchMedia('(max-width:650px)').matches)
      $('side').scrollIntoView({block:'nearest'});
  };
  $('side').onchange=event=>{
    if (event.target.id!=='scenarioSelect') return;
    state=newGame(null,event.target.value);
    preview=scenarioFor(state).rulers[0];
    selected=seatOf(state,preview);
    render();
    $('scenarioSelect').focus();
  };
  $('side').onclick=event=>{
    const button=event.target.closest('button');
    if (!button || button.disabled) return;
    if (button.dataset.pick) {
      preview=button.dataset.pick;
      selected=seatOf(state,preview);
      render();
      $('side').querySelector(`[data-pick="${preview}"]`).focus();
    } else if (button.hasAttribute('data-start')) {
      state=newGame(preview,state.scenario);
      selected=seatOf(state,preview);
      commit();
      notify('거병했습니다. 지도에서 도시를 선택하세요.');
    } else if (button.dataset.domestic) {
      openDomestic(button.dataset.domestic);
    } else if (button.hasAttribute('data-corps')) {
      openCorps();
    } else if (button.hasAttribute('data-delegate')) {
      openDelegate(selected);
    } else if (button.hasAttribute('data-council')) {
      if (activeCouncil(state,state.player)) openAdvice();
      else openCouncil(selected);
    } else if (button.hasAttribute('data-march')) {
      openMarch([selected],neighbors(selected).filter(id=>state.cities[id].owner!==state.player));
    } else if (button.hasAttribute('data-transfer')) {
      openMarch([selected],[...friendlyRoutes(state,selected).keys()],true);
    } else if (button.hasAttribute('data-invade')) {
      const origins=neighbors(selected).filter(id=>state.cities[id].owner===state.player &&
        officersAt(state,id).length && state.cities[id].troops>=350 && state.cities[id].food>=20);
      openMarch(origins,[selected]);
    } else if (button.hasAttribute('data-persuade-city')) {
      openDomestic('persuade',persuasionOrigins(state,selected),selected);
    } else if (button.hasAttribute('data-saves')) {
      openSaves();
    } else if (button.hasAttribute('data-captives')) {
      openCaptives();
    } else if (button.hasAttribute('data-advance')) {
      const next=()=>{
        advance(state);
        // 새 달이 시작되면 군주가 있는 도시를 자동으로 선택합니다. 이동 중이면 선택을 그대로 둡니다.
        const home=rulerOf(state,state.player)?.city;
        if (home && state.cities[home].owner===state.player) selected=home;
        commit();
        if(!state.end)$('side').querySelector('[data-advance]').focus();
        // 직할 도시가 많아지면 군단 구성을 권합니다.
        if (corpsPromptDue(state)) {
          state.corpsPromptAt=corpsFreeCities(state).length;
          persist();
          setTimeout(()=>{ if (!dialog.open) openCorps(true); },0);
        }
      };
      if (state.ap) show('다음 달로 이동',`<p>이번 달에 명령이 ${state.ap}회 남았습니다. 다음 달에 수입을 정산하고 다른 세력도 움직입니다.</p>`,'다음 달',next);
      else next();
    }
  };
  $('roster').onclick=()=>{
    const groups=[...scenarioFor(state).rulers,null].map(id=>{
      const generals=factionOfficers(state,id);
      const rows=generals.map(o=>`<li><strong>${escapeText(o.name)}</strong><span>${o.inTransit?'이동 중':towns[o.city??freeCityOf(state,o)]?.name??'재야'}</span><small>${statLine(o)}</small></li>`).join('');
      return `<section class="rosterGroup" style="--f:${color(id)}">
        <h3><i class="dot" aria-hidden="true"></i>${id===null?'재야 장수':factionName(id)} <span>${generals.length}명</span></h3>
        ${rows?`<ul>${rows}</ul>`:'<p>소속 장수 없음</p>'}
      </section>`;
    }).join('');
    show('장수 명단',`<div class="rosterGrid">${groups}</div>`);
  };
  $('help').onclick=()=>show('게임 방법',`<ul>
    <li>시나리오와 군주를 골라 도시 ${CITY_COUNT}개를 모두 점령하세요.</li>
    <li>도시를 선택하면 병력과 장수를 볼 수 있습니다. 세력 전체에서 한 달에 명령을 ${COMMANDS_PER_MONTH}회 내릴 수 있습니다.</li>
    <li>금으로 병력을 모집하고, 농지를 개발하고, 성벽을 보수하거나 재야 장수를 등용하세요. 무력은 모집과 전투, 정치는 내정과 월 수입에 영향을 줍니다.</li>
    <li>아군 도시나 인접 적 도시에서 적장 회유를 선택해 상대 장수를 영입할 수 있습니다. 군주는 회유 대상에서 제외됩니다.</li>
    <li>점선으로 연결된 도시에 출진할 수 있습니다. 병력과 지휘 장수의 무력, 상대 성벽으로 승률을 계산합니다. 병력 이동은 아군 도시를 잇는 경로를 따라 가능하며, 지휘 장수와 병력은 두 턴 뒤 도착합니다.</li>
    <li>도시를 점령하면 수비 장수를 포로로 잡습니다. 포로는 명령을 소모하지 않고 등용·참수·석방할 수 있습니다.</li>
    <li>달이 바뀔 때 계절에 따라 풍년, 홍수, 폭설 등이 무작위로 발생하며 해당 도시의 자원이나 병력이 바뀝니다.</li>
    <li>다음 달에는 금과 군량을 정산하고 다른 군주들이 행동합니다. 군량이 부족하면 병력을 잃습니다. 진행 상황은 이 브라우저에 자동 저장됩니다. 저장 / 불러오기에서 원하는 시점을 따로 저장할 수 있습니다.</li>
    </ul>`);
  $('restart').onclick=()=>show('새 게임', '<p>현재 진행을 지우고 군주 선택으로 돌아갑니다.</p>', '새 게임',()=>{
    state=newGame(null,state.scenario);
    selected=seatOf(state,preview);
    commit(false);
  });
  new ResizeObserver(drawMap).observe(map);
  render();

  // 게임 파일이 새로 바뀌었으면 새로고침을 안내합니다. 열어 둔 화면이 옛 코드로 계속 도는 일을 막습니다.
  const loadedVersion=document.querySelector('script[src*="game.js"]')?.src.match(/v=(\d+)/)?.[1];
  async function checkUpdate() {
    if (document.hidden || !loadedVersion || !$('updateNotice')) return;
    try {
      const html=await fetch('index.html',{cache:'no-store'}).then(r=>r.text());
      const latest=html.match(/game\.js\?v=(\d+)/)?.[1];
      if (latest && latest!==loadedVersion) $('updateNotice').hidden=false;
    } catch {}
  }
  setInterval(checkUpdate,30000);
  document.addEventListener('visibilitychange',checkUpdate);
  $('updateNotice')?.querySelector('button')?.addEventListener('click',()=>location.reload());
}
