/**
 * 梅花易数占卜核心逻辑引擎 - 水墨扁平版
 */

// 八卦基础数据 (融合《梅花易数·万物类象》经典意象)
const TRIGRAMS = {
    1: { 
        id: 1, name: '乾', symbol: '☰', element: '金', direction: '西北', nature: '天', lines: [1, 1, 1], 
        meaning: '健也，代表天、君主、父亲、刚健不息、圆形、马匹、人体之骨骼与头部、金玉珠宝。',
        character: '刚健中正，自强不息，威严崇高，决断力强，光明磊落，高亢干燥。',
        family: '父亲，祖父，长辈，君王，领袖，核心决策者，名人，尊贵之人。',
        body: '头部，骨骼，大脑，肺部，大肠，右心室，人体元气。',
        animal: '马（良马、老马），龙，天鹅，狮子，大象。',
        symbolism: '代表圆形物品、钟表、金银珠宝、镜子、高档衣物、帽子、冰雪寒冷之物。在环境上代表高亢干燥之所、官署、高楼、西北方。在占失物时，失物多在高处或金属容器中，极易寻回。'
    },
    2: { 
        id: 2, name: '兑', symbol: '☱', element: '金', direction: '西', nature: '泽', lines: [1, 1, 0], 
        meaning: '说也，喜悦，代表水泽、少女、口舌言语、喜悦沟通、残缺缺口、羊群、西方。',
        character: '喜悦，和悦，善言辩驳，外柔内刚，多才多艺，亦主口舌是非、残缺不全。',
        family: '少女，小女儿，歌伎，演员，播音主持，教师，律师，翻译，奴仆。',
        body: '口，舌，牙齿，喉咙，气管，肺部，右心房。',
        animal: '羊，泽中之鱼，鹭鸶，水鸟。',
        symbolism: '代表残缺或带孔之物、废旧金属、乐器、废弃器皿、带刀之物。在环境上代表泽地、水畔、低洼潮湿处、娱乐场所、西方。在占失物时，多遗落在垃圾堆旁、残损器皿或西方，寻找有难度。'
    },
    3: { 
        id: 3, name: '离', symbol: '☲', element: '火', direction: '南', nature: '火', lines: [1, 0, 1], 
        meaning: '丽也，附着，代表火、中女、光明照耀、文饰华美、雉鸟、目睛、南方。',
        character: '光明磊落，文彩华丽，聪明好学，热情外向，亦主虚荣焦躁、附着无常。',
        family: '中女，二女儿，文人，学者，军人，美容师，艺术家，中年妇女。',
        body: '眼（目），心脏，血液，小肠，血管。',
        animal: '雉（野鸡），孔雀，蟹，龟，贝壳，萤火虫。',
        symbolism: '代表红色物品、中空之物、书画、合同契约、证件凭证、炉灶、灯光、带电设备。在环境上代表向阳处、南方、炉冶之地、明亮大厅。在占失物时，物在明亮显眼、带电或南方暖气旁，极易寻回。'
    },
    4: { 
        id: 4, name: '震', symbol: '☳', element: '木', direction: '东', nature: '雷', lines: [1, 0, 0], 
        meaning: '动也，代表雷霆、长男、震动起动、雷厉风行、怒气、龙、足部、东方。',
        character: '雷厉风行，声势浩大，刚毅果敢，积极进取，亦主虚惊惊恐、急躁易怒。',
        family: '长男，大儿子，有声望之人，乘车之人，军警，运动员。',
        body: '足（脚），肝脏，头发，神经系统，左心房。',
        animal: '龙，蛇，善鸣之马，百虫。',
        symbolism: '代表木制乐器、电话钟表、车辆、绿色植物、有声响之物、竹木物件。在环境上代表喧闹嘈杂之所、森林、过道、东方、机场车站。在占失物时，多在东方、过道或有车动的地方，可能被移动。'
    },
    5: { 
        id: 5, name: '巽', symbol: '☴', element: '木', direction: '东南', nature: '风', lines: [0, 1, 1], 
        meaning: '入也，顺也，代表风、长女、柔顺渗透、无孔不入、细长、鸡、大腿、东南。',
        character: '柔顺听从，风行渗透，起伏不定，多疑多变，利市三倍，随遇而安。',
        family: '长女，大女儿，手艺人，商贾，僧尼，教师，文职人员。',
        body: '股（大腿），胆囊，呼吸系统，气管，血管，左心室。',
        animal: '鸡，风中之鸟，昆虫，猫（敏捷）。',
        symbolism: '代表长条形木器、绳索、管道、高度悬空之物、香气物品、工艺品。在环境上代表花园林木、通风窗口、通道、东南方。在占失物时，多在东南方窗口、衣架或草丛夹缝中，需仔细翻寻。'
    },
    6: { 
        id: 6, name: '坎', symbol: '☵', element: '水', direction: '北', nature: '水', lines: [0, 1, 0], 
        meaning: '陷也，代表水、中男、险陷重重、隐伏暗昧、通达润下、猪、耳、北方。',
        character: '险陷忧虑，机智善谋，隐忍克制，川流不息，亦主算计暗昧、漂泊不定。',
        family: '中男，二儿子，江湖之人，盗贼，水手，酒鬼，技术人员。',
        body: '耳，肾脏，膀胱，血液循环系统，分泌物，生殖系统。',
        animal: '猪，狐狸，水族动物（鱼虾），夜行动物。',
        symbolism: '代表带盖容器、酒水饮料、黑色物品、绳索、冷冻物件、带水器具。在环境上代表洗手间、下水道、潮湿阴暗处、地下室、北方。在占失物时，物在阴暗潮湿处、水边，可能已被污损。'
    },
    7: { 
        id: 7, name: '艮', symbol: '☶', element: '土', direction: '东北', nature: '山', lines: [0, 0, 1], 
        meaning: '止也，代表山、少男、停止守静、安稳阻碍、坚硬、狗、手、东北。',
        character: '安稳守静，坚毅保守，沉着冷静，知止不移，亦主顽固阻碍、停滞不前。',
        family: '少男，小儿子，守门人，闲人，保镖，隐士，僧道。',
        body: '手，鼻，背部，手指，脾胃系统，关节。',
        animal: '狗，鼠，虎，猫，有角之兽。',
        symbolism: '代表石头、泥土、门扇、石台上、坚硬黄色之物、书柜、柜子脚。在环境上代表墙角拐弯处、高地山坡、顶楼、东北方。在占失物时，物在东北方柜脚、抽屉深处或桌脚缝隙，原封未动。'
    },
    8: { 
        id: 8, name: '坤', symbol: '☷', element: '土', direction: '西南', nature: '地', lines: [0, 0, 0], 
        meaning: '顺也，代表大地、母亲、顺从包容、厚德载物、方形、牛、腹部、西南。',
        character: '至柔至顺，宽容大度，厚德载物，诚信可靠，亦主迟钝消极、优柔寡断。',
        family: '母亲，祖母，老妇，众人，助手，农夫，大众。',
        body: '腹部，脾脏，胃部，皮肤，肌肉。',
        animal: '牛，母马，百禽。',
        symbolism: '代表方形物品、土制器皿、五谷杂粮、布帛针线、低矮平整之物。在环境上代表田野、泥地、低矮房间、仓库、西南方。在占失物时，物在西南方低矮处、泥地草坪中，极易寻回。'
    }
};

// 12地支名称
const BRANCH_NAMES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 地支与序数对应表
const EARTHLY_BRANCHES = {
    '子': 1, '丑': 2, '寅': 3, '卯': 4, '辰': 5, '巳': 6,
    '午': 7, '未': 8, '申': 9, '酉': 10, '戌': 11, '亥': 12
};

// 获取卦象的六爻（自底向上 1 到 6，前三位为下卦，后三位为上卦）
function getHexagramLines(upperId, lowerId) {
    return [...TRIGRAMS[lowerId].lines, ...TRIGRAMS[upperId].lines];
}

// 根据六爻数组寻找对应的三爻卦ID
function getTrigramIdByLines(lines) {
    for (const id in TRIGRAMS) {
        const tLines = TRIGRAMS[id].lines;
        if (tLines[0] === lines[0] && tLines[1] === lines[1] && tLines[2] === lines[2]) {
            return parseInt(id);
        }
    }
    return null;
}

// 五行相生相克
const ELEMENTS_INTERACTION = {
    generate: { '金': '水', '水': '木', '木': '火', '火': '土', '土': '金' },
    control: { '金': '木', '木': '土', '土': '水', '水': '火', '火': '金' }
};

// 五行属性颜色配色（古风水墨扁平风格）
const ELEMENT_COLORS = {
    '木': { color: '绿', hex: '#3a755b', desc: '翠绿（木主东方，生发之意）' },
    '火': { color: '红', hex: '#b84040', desc: '朱红（火主南方，炎上之意）' },
    '土': { color: '黄', hex: '#b89345', desc: '黄褐（土主中央，载物之意）' },
    '金': { color: '白', hex: '#7a7a7a', desc: '水墨灰白（金主西方，肃杀之意）' },
    '水': { color: '黑', hex: '#1a1a1a', desc: '黛黑（水主北方，润下之意）' }
};

/**
 * 判断两个五行元素的关系 (elA 对 elB 的作用)
 */
function getElementRelation(elA, elB) {
    if (elA === elB) return '比和';
    if (ELEMENTS_INTERACTION.generate[elA] === elB) return '生';   // A生B
    if (ELEMENTS_INTERACTION.generate[elB] === elA) return '被生'; // B生A (A泄于B)
    if (ELEMENTS_INTERACTION.control[elA] === elB) return '克';    // A克B
    if (ELEMENTS_INTERACTION.control[elB] === elA) return '被克';  // B克A
    return '无直接生克';
}

// 64卦数据库
const HEXAGRAMS_DB = {
    11: { name: '乾为天', symbol: '䷀', judgement: '元，亨，利，贞。', desc: '纯阳刚健，自强不息。名利双收之象。', lost: '在高处或金属柜、西北方，容易找到。', fortune: '大吉。事业鼎盛，宜守正防盈满。' },
    12: { name: '天泽履', symbol: '䷉', judgement: '履虎尾，不咥人，亨。', desc: '行险而顺，如同踩在老虎尾巴上但不咬人。', lost: '在西方或西北，被水或容器遮挡。寻找困难。', fortune: '小吉。前行虽惊险，若谦逊守礼可化险为夷。' },
    13: { name: '天火同人', symbol: '䷌', judgement: '同人于野，亨。', desc: '同心协力，合作共赢。利于结盟与出门求谋。', lost: '在南方或西北，明亮显眼处，易寻回。', fortune: '吉。人际融洽，团队合作顺利，贵人相助。' },
    14: { name: '天雷无妄', symbol: '䷘', judgement: '元亨，利贞。其匪正有眚，不利有攸往。', desc: '顺天应人，防突发意外与无妄之灾。宜守静。', lost: '在东方或西北，多动荡杂乱处，不易找回。', fortune: '平。顺其自然，不可有非分之想。防意外波折。' },
    15: { name: '天风姤', symbol: '䷫', judgement: '姤，女壮，勿用取女。', desc: '邂逅相遇，阴气渐盛。防诱惑或小人暗算。', lost: '在东南或西北，高处、草木或隐秘的夹缝中。', fortune: '平偏凶。防范意外纠纷或内部小人，宜审慎。' },
    16: { name: '天水讼', symbol: '䷅', judgement: '有孚窒惕，中吉，终凶。', desc: '纷争诉讼，各执一词。和为贵，斗则凶。', lost: '在北方或西北，水边、潮湿隐蔽处。多已损毁。', fortune: '凶。运势阻滞，防口舌是非，凡事以和为贵。' },
    17: { name: '天山遁', symbol: '䷠', judgement: '遁，亨，小利贞。', desc: '退隐避险，保存实力。小人势盛，主动退守。', lost: '在东北或西北，隐蔽柜子或角落中，难寻。', fortune: '小凶。运势转衰，不宜激进，建议退守蓄力。' },
    18: { name: '天地否', symbol: '䷋', judgement: '否之匪人，不利君子贞。', desc: '闭塞不通，上下不交。阴阳错位，诸事多阻。', lost: '在西南或西北，垃圾堆或泥地中，多已遗失。', fortune: '大凶。诸事受阻，沟通不畅。宜静守待机。' },
    
    21: { name: '泽天夬', symbol: '䷪', judgement: '扬于王庭，孚号有厉。', desc: '决断清除，破釜沉舟。防过刚，宜行道。', lost: '在西方或西北，悬挂在高处，易寻得。', fortune: '小吉。面临决断，只要大公无私，终可清除阻碍。' },
    22: { name: '兑为泽', symbol: '䷹', judgement: '亨，利贞。', desc: '喜悦相处，言谈得益。人情融洽，提防多言失言。', lost: '在正西方，水边或残缺容器旁。容易寻回。', fortune: '吉。社交活跃，合作顺利。注意口舌是非。' },
    23: { name: '泽火革', symbol: '䷰', judgement: '己日乃孚，元亨利贞，悔亡。', desc: '变革改新，顺应潮流。推旧换新，大势所趋。', lost: '在南方或西方，厨房、炉灶旁。可以找回。', fortune: '吉。面临转折，主动求新求变方有出路。' },
    24: { name: '泽雷随', symbol: '䷐', judgement: '元亨利贞，无咎。', desc: '随遇而安，顺势而为。不宜逆势独行。', lost: '在正东或西方，人多嘈杂处，可能被他人收纳。', fortune: '吉。善于听取他人建议，跟从强者，谋事易成。' },
    25: { name: '泽风大过', symbol: '䷛', judgement: '大过，栋挠，利有攸往，亨。', desc: '负担沉重，阳刚过盛。面临大危机或极限挑战。', lost: '在东南或西方，废墟、水洼或草木中，难寻。', fortune: '凶。压力过载，做事切忌过头，须寻求分担。' },
    26: { name: '泽水困', symbol: '䷮', judgement: '困，亨，贞，大人吉。', desc: '穷困守静，坚守正道。龙游浅水，坚守正行。', lost: '在北方或西方，潮湿污秽地带，损坏难寻。', fortune: '大凶。困顿难行，多言不信。唯有坚忍克己。' },
    27: { name: '泽山咸', symbol: '䷞', judgement: '咸，亨，利贞，取女吉。', desc: '相互感应，默契交通。缘分契合，心诚则灵。', lost: '在东北或西方，石缝、角落或低处。可寻回。', fortune: '吉. 情感顺畅，沟通得利，谋求合伙等事顺遂。' },
    28: { name: '泽地萃', symbol: '䷬', judgement: '萃，亨。利见大人。', desc: '群英荟萃，人才聚集。团队合力，适宜大合作。', lost: '在西南或西方，人群聚集处。容易找到。', fortune: '吉。贵人相助，适宜开展大项目或大型聚会。' },
    
    31: { name: '火天大有', symbol: '䷍', judgement: '大有，元亨。', desc: '富有四海，收获丰厚。顺天应人，大有所获。', lost: '在西北或南方，明亮高处，无需担忧，能寻。', fortune: '大吉。财运、事业极旺。注意戒傲，多行善事。' },
    32: { name: '火泽睽', symbol: '䷥', judgement: '睽，小事吉。', desc: '乖异不合，人心涣散。求同存异，大事不宜。', lost: '在正南或正西，破损炉具旁。寻找希望渺茫。', fortune: '平偏凶。内部分裂，意见相左。宜求同存异。' },
    33: { name: '离为火', symbol: '䷝', judgement: '利贞，亨。', desc: '光明美丽，附着依托。名声远扬，行事宜守中。', lost: '在正南方，温暖、书籍或带电器旁。易找回。', fortune: '吉。光明磊落。求名胜于求利。忌急躁暴怒。' },
    34: { name: '火雷噬嗑', symbol: '䷔', judgement: '噬嗑，亨. 利用狱。', desc: '咬碎障碍，强制消除。刚柔并济，依法清除障碍。', lost: '在东或正南，五金店或厨房。历经阻碍可寻。', fortune: '平偏吉。虽然有阻梗，只要果断坚决，终能解决。' },
    35: { name: '火风鼎', symbol: '䷱', judgement: '鼎，元吉，亨。', desc: '三足鼎立，革故鼎新。贤人受重用，事业上升。', lost: '在东南或南方，炉灶、烟道或高架上。易找。', fortune: '大吉。有升迁重用、获得分红或名望提升之喜。' },
    36: { name: '火水未济', symbol: '䷿', judgement: '未济，亨。', desc: '事情未完，未来可期。虽然未成功，但蕴含生机。', lost: '在北或正南，干湿交界处，寻找艰难。', fortune: '平。万事开头难，处于摸索期。要极其小心。' },
    37: { name: '火山旅', symbol: '䷷', judgement: '旅，小亨。', desc: '在外奔波，客居他乡。羁旅飘零，宜谦逊守分。', lost: '在正南或东北，路边、行囊中或外地。难找。', fortune: '小凶。四处漂泊，根基未稳。宜多修德行，不宜大动。' },
    38: { name: '火地晋', symbol: '䷢', judgement: '晋，康侯用锡马蕃庶。', desc: '如日中天，高升晋爵。事业仕途一片光明。', lost: '在南方或西南，亮堂平地上。极易找回。', fortune: '大吉。前途顺畅，容易得到上司器重，步步高升。' },
    
    41: { name: '雷天大壮', symbol: '䷡', judgement: '大壮，利贞。', desc: '力量强盛，声势浩大。刚强过甚，宜守礼防撞。', lost: '在正东或西北，重物压阻处。寻回有难度。', fortune: '吉。气势如虹。但切忌盲目冲动，硬碰硬必败。' },
    42: { name: '雷泽归妹', symbol: '䷵', judgement: '归妹，征凶，无攸利。', desc: '行事颠倒，违反规则。名不正言不顺，妄动招凶。', lost: '在东方或西方，水泽或人多喧嚣地。已被他人占有。', fortune: '凶。违背伦常与规律，容易蒙受损失。切忌盲动。' },
    43: { name: '雷火丰', symbol: '䷶', judgement: '丰，亨。王假之。', desc: '盛大丰盈，财源广进。但需提防骄奢，防物极必反。', lost: '在正东或南方，繁华明亮商场、客厅中。易得。', fortune: '吉。运势处于顶峰，要多施恩惠，防范盛极而衰。' },
    44: { name: '震为雷', symbol: '䷲', judgement: '震，亨。震来虩虩。', desc: '惊天动地，震惊百里。惊后回神，恐惧修省。', lost: '在正东方，树木茂密或车辆喧闹处。劳力可寻。', fortune: '平。有突发变故，令人震惊。只要镇定自若则无咎。' },
    45: { name: '雷风恒', symbol: '䷟', judgement: '恒，亨，无咎，利贞，利有攸往。', desc: '恒久不变，守正不阿。长久坚持，方显本色。', lost: '在东南或东方，高处或长条形物件旁。容易寻回。', fortune: '吉。持之以恒，终有所成。不宜轻易改变初衷。' },
    46: { name: '雷水解', symbol: '䷧', judgement: '解，利西南。无所往，其来复吉。有攸往，夙吉。', desc: '解除困难，化险为夷。雨过天晴，万物生机盎然。', lost: '在正东或北方，低洼处或带有水的角落。能寻回。', fortune: '吉。困境得以解脱，利于出行 and 积极行动。' },
    47: { name: '雷山小过', symbol: '䷽', judgement: '小过，亨，利贞。可小事，不可大事。', desc: '小有过越，不宜大事。行事宜谦虚克制。', lost: '在东北或东方，靠近山石或坚硬物品堆中。难找。', fortune: '平偏凶。只宜做小事，切忌贪大妄动，防犯小错。' },
    48: { name: '雷地豫', symbol: '䷏', judgement: '豫，利建侯行师。', desc: '顺时依势，愉悦安乐。人心所向，适宜大展鸿图。', lost: '在西南或东方，开阔地或柜子后。容易寻回。', fortune: '吉。喜悦安乐，利于合作与推行计划。' },

    51: { name: '风天小畜', symbol: '䷈', judgement: '小畜，亨。密云不雨。', desc: '蓄积力量，待机而动。局限重重，密云而不下雨。', lost: '在东南或西北，树木高处或书柜夹层。难寻。', fortune: '平。力量尚小，不宜独挑大梁，需做好忍耐蓄力。' },
    52: { name: '风泽中孚', symbol: '䷼', judgement: '中孚，豚鱼吉，利涉大川。', desc: '诚信感物，深入人心。精诚所至，大吉大利。', lost: '在东南或正西，精美容器、包中。极易寻回。', fortune: '吉。以诚信得人心，求名、求合伙、姻缘大吉。' },
    53: { name: '风火家人', symbol: '䷤', judgement: '家人，利女贞。', desc: '治家有道，齐心协力。和睦相处，宜整顿内部。', lost: '在东南或南方，家中姐妹房间、书房。易找回。', fortune: '吉。家和万事兴，巩固后方，利于内部调和。' },
    54: { name: '风雷益', symbol: '䷩', judgement: '益，利有攸往，利涉大川。', desc: '损上益下，财富增长。大有收获，宜积极作为。', lost: '在正东或东南，绿化带或交通工具中。能迅速找回。', fortune: '大吉。运势亨通，多得外界惠助，宜趁热打铁。' },
    55: { name: '巽为风', symbol: '䷸', judgement: '巽，小亨，利有攸往。', desc: '谦逊柔顺，借力打力。谦退自守，随风逐势。', lost: '在东南方向，高空、挂架或发霉角落。难寻。', fortune: '平。运势起伏多变。忌自作主张，应配合强者行动。' },
    56: { name: '风水涣', symbol: '䷺', judgement: '涣，亨。', desc: '人心涣散，面临破裂。宜以德聚人，解除涣散。', lost: '在北方或东南，随水流漂走或吹散。难以找回。', fortune: '平偏凶。面临团队或感情离散危机，须有大凝聚力。' },
    57: { name: '风山渐', symbol: '䷴', judgement: '渐，女归吉，利贞。', desc: '循序渐进，步步高升。如同树木登山，大器晚成。', lost: '在东南或东北，平缓斜坡。多花时间寻找可回。', fortune: '大吉。发展平稳，积跬步至千里。婚姻求官极佳。' },
    58: { name: '风地观', symbol: '䷓', judgement: '观，盥而不荐。', desc: '静观其变，观察思考。宜反观自身，不宜鲁莽出手。', lost: '在东南或西南，高地上、泥土旁。可以找到。', fortune: '平。宜守不宜攻，多做调研和观察，冷静规划。' },
    
    61: { name: '水天需', symbol: '䷄', judgement: '需，有孚，光亨，贞吉。', desc: '蓄势待发，等待时机。前方险阻，应饮食宴乐。', lost: '在西北或正北，泥泞暗沟或酒肆中。难找。', fortune: '平偏吉。时机未成熟，应耐心等待，保持乐观。' },
    62: { name: '水泽节', symbol: '䷻', judgement: '节，亨。苦节不可贞。', desc: '适度节制，规矩分明。节制是美德，但不可过严。', lost: '在正北或正西，带盖子或池塘水漏中。能找回。', fortune: '平。制定规矩、节约开支时期，注意防范手下埋怨。' },
    63: { name: '水火既济', symbol: '䷾', judgement: '既济，亨小，利贞。初吉终乱。', desc: '功成名就，大局已定。初吉终乱，防走下坡路。', lost: '在正南或正北，冷热交融水管旁。极难寻回。', fortune: '吉偏凶。已至高位，防盛极而衰。需提高警惕预防隐患。' },
    64: { name: '水雷屯', symbol: '䷂', judgement: '屯，元亨利贞，勿用有攸往。', desc: '破土艰难，万事开头难。草木萌芽，宜静不宜动。', lost: '在正东或正北，泥泞沼泽、乱石树林中。难寻。', fortune: '凶偏吉。当前处境多阻碍，宜立稳根基，求贤辅佐。' },
    65: { name: '水风井', symbol: '䷯', judgement: '井，改邑不改井，无丧无得。', desc: '井水不息，守常不移。细水长流，利于长远。', lost: '在东南或正北，水井、管道、高树底。可以找回。', fortune: '吉。稳扎稳打，做长线经营，自然有源源不断的收获。' },
    66: { name: '坎为水', symbol: '䷜', judgement: '习坎，有孚，维心亨，行有尚。', desc: '重重险阻，陷阱重重。困难极盛，宜坚忍突围。', lost: '在正北深坑、极度潮湿黑暗处。彻底遗失或毁坏。', fortune: '大凶。面临前所未有的危机险阻，不可踏错一步。' },
    67: { name: '水山蹇', symbol: '䷦', judgement: '蹇，利西南，不利东北。', desc: '艰难险阻，寸步难行。道路泥泞，应当反省求贤。', lost: '在正北或东北，高峻石山底。很难寻得。', fortune: '凶。运势阻碍不通。万不可冒险，应主动退守寻求指引。' },
    68: { name: '水地比', symbol: '䷇', judgement: '比，吉。原筮元永贞。', desc: '依附相亲，团结致胜。利于交友、合作、获得扶持。', lost: '在西南或正北，人多的平坦泥地上。容易寻回。', fortune: '吉。人际交往大吉。适宜拓展同盟，共谋大业。' },
    
    71: { name: '山天大畜', symbol: '䷙', judgement: '大畜，利贞。不家食吉。', desc: '大有所积，积蓄雄厚。适宜做大项目，积蓄德行。', lost: '在正北或西北，高大石墙、保险箱旁。容易找到。', fortune: '大吉。实力厚实，宜大展拳脚，可做大宗投资、考试求官。' },
    72: { name: '山泽损', symbol: '䷨', judgement: '损，有孚，元吉，无咎。', desc: '减损自私，吃亏是福。损己利人，终得大吉。', lost: '在正西或东北，破裂乱石、废井中。能找到但物多损。', fortune: '吉。目前虽有小损失或需要付出，但为长远布局打下良基。' },
    73: { name: '山火贲', symbol: '䷕', judgement: '贲，亨。小利有攸往。', desc: '文饰装点，讲究包装。美化外表，但防华而不实。', lost: '在正南或东北，漂亮的抽屉、灯下。容易找到。', fortune: '吉。利于宣传推广、相亲面试等外部展示。应注重内涵。' },
    74: { name: '山雷颐', symbol: '䷚', judgement: '颐，贞吉。观颐。', desc: '休养生息，颐养身心。注意祸从口出、病从口入。', lost: '在正东或东北，大树底下、墙脚旁。能找回。', fortune: '平偏吉。适合修养调理，谨言慎行，照顾好身体。' },
    75: { name: '山风蛊', symbol: '䷑', judgement: '蛊，元亨，利涉大川。', desc: '积弊已深，亟需整顿。事情内部败坏，必须大刀阔斧改革。', lost: '在东南或东北，杂物乱木堆、阴暗角落。几乎难寻。', fortune: '凶偏吉. 弊端爆发期。如果下大决心刮骨疗毒，可迎来转机。' },
    76: { name: '山水蒙', symbol: '䷃', judgement: '蒙，亨。匪我求童蒙。', desc: '启蒙教育，懵懂无知。缺乏经验，应虚心向导师学习。', lost: '在正北或东北，垃圾桶、污水边或阴影里。难找回。', fortune: '平偏凶。局势不明，自身判断易错。不宜投资，宜求学请教。' },
    77: { name: '艮为山', symbol: '䷳', judgement: '艮其背，不获其身。', desc: '行止有度，止其所当止。动静合宜，坚守分寸。', lost: '在东北石台、重物架下，原封未动。容易寻回。', fortune: '平。运势处于停滞磨合期，不宜做任何推进，宜沉淀总结。' },
    78: { name: '山地剥', symbol: '䷖', judgement: '剥，不利有攸往。', desc: '根基剥蚀，山崩地裂。小人猖獗，极端不利，宜隐藏。', lost: '在西南或东北，掉入泥里被彻底踩坏。找不回。', fortune: '大凶。形势极其严峻，防小人中伤或严重失利。退避三舍。' },
    
    81: { name: '地天泰', symbol: '䷊', judgement: '泰，小往大来，吉，亨。', desc: '天地交泰，通泰繁荣。上下交心，诸事亨通之吉卦。', lost: '在西北或西南，泥土里、平地上，可寻回。', fortune: '大吉。泰来运转，万事顺遂。但防极盛转衰，宜安分守纪。' },
    82: { name: '地泽临', symbol: '䷒', judgement: '临，元亨利贞。至于八月有凶。', desc: '居高临下，运势大好。好运临门，注意居安思危防转变。', lost: '在正西或西南，湿地、衣柜中。容易寻回。', fortune: '吉。鸿运当头，受人爱戴。八月后运势易衰，需提早规划。' },
    83: { name: '地火明夷', symbol: '䷣', judgement: '明夷，利艰贞。', desc: '黑暗降临，光明受损。隐忍韬光，忍辱负重以避祸。', lost: '在西南或正南，废弃灶台、抽屉底下。极难找回。', fortune: '大凶。前途暗淡，环境恶劣。切勿显露才华招嫉，隐藏退守。' },
    84: { name: '地雷复', symbol: '䷗', judgement: '复，亨。出入无疾。', desc: '一阳复始，万物回春。生机渐现，运势慢慢复苏。', lost: '在正东或西南，泥地草坪上。可以找回。', fortune: '吉。触底反弹，情况开始好转。宜按步就班，不可太急。' },
    85: { name: '地风升', symbol: '䷭', judgement: '升，元亨。南征吉。', desc: '逐步升迁，积小成大。得到贵人提携，步步攀升。', lost: '在东南或西南，大柜深处，不易发现但能找回。', fortune: '吉。事业平稳上升，贵人重用。顺势而为，名利双收。' },
    86: { name: '地水师', symbol: '䷆', judgement: '师，贞，丈人吉。', desc: '统大众，严明纪律。处于争端，需以正义克敌。', lost: '在西南或正北，深色水沟、阴凉处。难寻。', fortune: '平偏凶。面临挑战或诉讼纠纷，严密纪律和公正领导是取胜关键。' },
    87: { name: '地山谦', symbol: '䷎', judgement: '谦，亨，君子有终。', desc: '虚怀若谷，高风亮节。谦受益满招损，大吉大利之行。', lost: '在西南或东北，埋在泥沙石堆中。能找回。', fortune: '大吉。多得尊长喜爱或贵人相助，万事不争，反而获得最大利益。' },
    88: { name: '坤为地', symbol: '䷁', judgement: '元亨。利牝马之贞。君子有攸往，先迷后得主，利。西南得朋，东北丧朋。安贞吉。', desc: '顺从厚德，载物无疆。宜守不宜攻，顺从天时，包容万物，以静制动。', lost: '在西南方，泥土之中，或矮柜里，无损坏。极易找回。', fortune: '吉。运势平稳。最宜顺从配合，辅佐他人。忌主动强求、出头主事。' }
};

/**
 * 根据卦数生成卦的配置
 */
function getTrigramById(id) {
    return TRIGRAMS[id];
}

/**
 * 根据上下卦画出六爻 (从底到顶，0为阴 1为阳)
 */
function getHexagramLines(upperId, lowerId) {
    const upperGua = TRIGRAMS[upperId];
    const lowerGua = TRIGRAMS[lowerId];
    return [
        lowerGua.lines[0],
        lowerGua.lines[1],
        lowerGua.lines[2],
        upperGua.lines[0],
        upperGua.lines[1],
        upperGua.lines[2]
    ];
}

/**
 * 根据六爻数组推算八卦的ID
 */
function getTrigramIdByLines(lines) {
    for (let id in TRIGRAMS) {
        const trigram = TRIGRAMS[id];
        if (trigram.lines[0] === lines[0] &&
            trigram.lines[1] === lines[1] &&
            trigram.lines[2] === lines[2]) {
            return parseInt(id);
        }
    }
    return 1; // 默认乾
}

/**
 * 卦象详细分析方法（大幅充实解释文本）
 */

/**
 * 智能问题分析器
 */
class QuestionAnalyzer {
    static parse(question, purpose) {
        const q = (question || "").trim();
        let domain = 'general'; // general | weather | lost_item | career | romance | health
        let targetNoun = (purpose === 'lost') ? '失物' : '';

        if (!q) {
            return { domain, targetNoun, originalQuestion: "" };
        }

        // 1. 判断是否是天气问题 (排除 '天'、'阴'、'雨'、'阳' 等单字以避免误判，使用具体的天气相关词汇)
        const weatherKeywords = [
            '下雨', '雨天', '降雨', '阴雨', '暴雨', '大雨', '小雨', 
            '晴天', '大晴天', '下雪', '雪天', '降雪', '大雪', '小雪', 
            '天气', '气候', '气温', '刮风', '大风', '雷雨', '雷电', 
            '打雷', '沙尘暴', '有雨', '有雪'
        ];
        const hasWeather = weatherKeywords.some(kw => q.includes(kw));
        
        // 2. 匹配失物具体名词
        if (purpose === 'lost') {
            domain = 'lost_item';
            const lostItemKeywords = ['钱包', '包包', '手机', '钥匙', '猫', '狗', '宠物', '身份证', '证件', '卡', '戒指', '首饰', '项链', '书', '笔', '伞', '衣服', '手表', '耳机', '眼镜', '钱', '合同', '文件'];
            for (let keyword of lostItemKeywords) {
                if (q.includes(keyword)) {
                    targetNoun = keyword;
                    break;
                }
            }
            // 正则提取 “我的[xxx]丢了” 里的名词
            if (targetNoun === '失物') {
                const matchMy = q.match(/我的([^丢哪里寻在何处了吗]+)/);
                if (matchMy && matchMy[1] && matchMy[1].trim()) {
                    targetNoun = matchMy[1].trim();
                } else {
                    const matchWhere = q.match(/([^丢哪里寻在何处了吗]+)在哪里/);
                    if (matchWhere && matchWhere[1] && matchWhere[1].trim().length <= 5) {
                        targetNoun = matchWhere[1].trim();
                    }
                }
            }
        } else {
            // 吉凶占细分领域
            if (hasWeather) {
                domain = 'weather';
            } else if (['考试', '面试', '工作', '事业', '求职', '职位', '升职', '升迁', '前途', '成绩', '录用', '录取', '跳槽', '求官', '考学', '项目', '生意', '投资', '财运', '求财'].some(kw => q.includes(kw))) {
                domain = 'career';
            } else if (['感情', '恋爱', '婚姻', '分手', '喜欢', '桃花', '表白', '约会', '复合', '结婚', '情侣', '姻缘', '对象', '另一半', '求婚', '恋人', '情意'].some(kw => q.includes(kw))) {
                domain = 'romance';
            } else if (['身体', '健康', '疾病', '手术', '病症', '病痛', '康复', '长寿', '医院', '生病', '疾患', '疗养', '元气'].some(kw => q.includes(kw))) {
                domain = 'health';
            }
        }

        return {
            domain,
            targetNoun,
            originalQuestion: q
        };
    }
}

class InterpretationEngine {
    /**
     * 详解失物占
     */
    static lostItems(ti, yong, changedYong, relation, changedRelation, qInfo) {
        let findable = '';
        let explanation = '';
        const noun = qInfo.targetNoun || '失物';
        
        if (relation === '生' || relation === '比和') {
            findable = '极易找到';
            explanation = `卦象呈现【体用相生（用生体）】或【体用比和】。表示所失【${noun}】的能量依然在你的控制、使用圈内，物品物未离人，并没有走远。多半就丢落在你起卦时所在的这个屋子、办公室或最近活动的狭窄范围内。建议立刻在当前环境的低矮处、柜子夹缝中、或者你随手放置物品的桌椅周围进行仔细寻找，有极高概率在短时间内完璧归赵！`;

} else if (relation === '被克') { // 体克用
            findable = '可以找到（多经波折）';
            explanation = `卦象呈现【体卦克用卦】。表示你的力量强于所失【${noun}】的力量。这说明在寻找过程中虽然困难重重，你会经历反复寻找未果、感到泄气或走错方向的挫折。但是，凭借你的坚韧不拔 and 仔细排查，最终能够克服阻碍。物多藏在隐蔽的地方，例如被重物压住、掉进夹缝中，或者你需要费一番口舌去询问他人才能得到线索。不要放弃，多翻找一些不易注意的角落，必能成功找到！`;
        } else if (relation === '被生') { // 体生用
            findable = '极难找到';
            explanation = `卦象呈现【体卦生用卦（泄气）】。这意味着你的精力和运势正在为这件【${noun}】大量流失，属于人去找物，物却在退缩。物品极有可能是因为你一时疏忽、大意，在公共场所或交通工具上遗落，甚至是你在迷糊中随手赠予、借给了他人而忘记。变卦亦未显现生体之象，极有可能物品已经不在原区域，寻找过程极度劳心伤神，建议随缘，不要强求，以免过度消耗自身精气神。`;
        } else { // 用克体
            findable = '几乎无法找到';
            explanation = `卦象呈现【用卦克体卦（凶）】。物品的力量对你形成了克制，表示【${noun}】丢失的局势已经脱离了你的掌控。失物多半已经被他人捡走并故意藏匿，或者遗失在流动性极大、无法返回的公共区域。更甚者，物品在丢失时就已经损坏、解体或被污泥掩埋。建议放宽心态，接受遗失的事实，防止因执着寻找而招致口舌、意外受伤等二次负面影响。`;
        }

        // 以变卦（代表最终状态和结局）中，体卦之外的那个卦断方位与环境
        const endGua = changedYong || yong;
        const direction = endGua.direction + '方向';
        
        let environment = '';
        switch (endGua.name) {
            case '乾': environment = `【乾金高燥】：多在屋内的西北方。具体环境为高处、通风干燥的架子上、金属保险柜/抽屉中、金属器皿内部、或者是长辈/领导的书房，周围有圆形或贵重、坚硬的金属物品。`; break;
            case '兑': environment = `【兑金水畔】：多在正西方。具体环境为靠近水源但地势低洼处、有破损或缺口的容器旁、娱乐场所的座位底下、化妆品包内，或者是带有金属构件的柜子缝隙中。`; break;
            case '离': environment = `【离火明堂】：多在正南方。具体环境为温暖向阳处、炉灶或暖气旁、电视电脑等家电背后、灯光充足的客厅、书架或红色的包装盒/抽屉中。`; break;
            case '震': environment = `【震木动处】：多在正东方。具体环境为木制家具堆中、绿色植物旁、走廊楼梯等经常有人走动的过道、车辆中、或者喧闹嘈杂的菜市场、马路边。`; break;
            case '巽': environment = `【巽风悬空】：多在东南方。具体环境为通风良好的窗口、高悬的衣架或钩子上、长条形的抽屉或箱子底部、草木茂盛的花园草丛中。`; break;
            case '坎': environment = `【坎水险陷】：多在正北方。具体环境为阴暗、潮湿、极度隐蔽的低洼处，如洗手间、下水道水槽下方、漏水管旁、地下室、或水杯/水盆后方，物品可能已被水浸湿。`; break;
            case '艮': environment = `【艮土山阻】：多在东北方。具体环境为坚硬的石台/水泥台旁、山坡高地上、墙角拐弯处、桌椅脚的缝隙中、或者顶层储藏室、多石子和泥土的荒地。`; break;
            case '坤': environment = `【坤土顺载】：多在西南方。具体环境为平整的地面上、松软的泥土中、低矮的杂物柜里、农舍田野间，或者母亲、女性长辈居住的房间。`; break;
        }

        let timeFrame = '';
        switch (endGua.element) {
            case '金': timeFrame = '申日、酉日（如庚申、辛酉日），或时辰为申时（15-17点）、酉时（17-19点）最易寻回；在秋季（农历七、八月）应验度最高。'; break;
            case '木': timeFrame = '寅日、卯日（如甲寅、乙卯日），或时辰为寅时（03-05点）、卯时（05-07点）最易寻回；在春季（农历正、二月）应验度最高。'; break;
            case '水': timeFrame = '亥日、子日（如癸亥、壬子日），或时辰为亥时（21-23点）、子时（23-01点）最易寻回；在冬季（农历十、十一月）应验度最高。'; break;
            case '火': timeFrame = '巳日、午日（如丁巳、丙午日），或时辰为巳时（09-11点）、午时（11-13点）最易寻回；在夏季（农历四、五月）应验度最高。'; break;
            case '土': timeFrame = '辰、戌、丑、未日，或时辰为辰时（7-9点）、未时（13-15点）、戌时（19-21点）、丑时（1-3点）最易寻回；在每季度的最后一个月（农历三、六..）最验。'; break;
        }

        return {
            findable,
            explanation,
            direction,
            environment,
            timeFrame
        };
    }

    /**
     * 详解吉凶占 (包含针对天气的断法、针对各类求问的断法)
     */
    static fortune(orig, mut, ch, shengKeText, finalResultText, level, qInfo, ti, yong, changedYong) {
        let weatherText = "";
        let specificAdvice = "";

        // 1. 如果是天气问题，进行天气专属占断
        if (qInfo.domain === 'weather') {
            // 解析天气卦象
            const hasKan = [ti.id, yong.id, changedYong.id].includes(6); // 坎为水
            const hasLi = [ti.id, yong.id, changedYong.id].includes(3);  // 离为火
            const hasXun = [ti.id, yong.id, changedYong.id].includes(5); // 巽为风
            const hasZhen = [ti.id, yong.id, changedYong.id].includes(4); // 震为雷
            const hasKunGen = [ti.id, yong.id, changedYong.id].some(id => id === 8 || id === 7); // 坤艮土
            
            if (hasKan) {
                weatherText = "【天机昭示：会下雨】。重重坎水现于排盘，水汽泛滥成灾，变卦亦呈润下之象。断定天将【降雨】。可能伴有连绵阴雨或突发大雨，出门切记携带雨具，避免涉水出行。";
            } else if (hasZhen && hasXun) {
                weatherText = "【天机昭示：狂风雷雨】。震雷与巽风在卦中相激，风雷激荡。断定天将有【狂风骤雨、电闪雷鸣】，气温会骤降，不宜在户外或大树下避雨。";
            } else if (hasXun) {
                weatherText = "【天机昭示：风起云涌】。巽风大作，云层流动。断定天气为【多云有风】，可能伴有零星毛毛雨或局地短暂阵雨，狂风主导。";
            } else if (hasLi) {
                weatherText = "【天机昭示：晴空丽日】。离火高悬照耀，毫无雨相。断定天将【大晴】。阳光充沛，视野极佳，适合晾晒与户外活动。";
            } else if (hasKunGen) {
                weatherText = "【天机昭示：浓云密布】。坤土与艮土重重，空气尘雾笼罩。断定天气为【阴天多云】，天色暗淡阴沉，但近期无雨。";
            } else {
                weatherText = "【天机昭示：晴朗】。乾天高悬，纯阳无雨，天气【晴好】，气压偏高，空气干燥。";
            }
        }

        // 2. 根据求问的领域提供极具针对性的分析
        let domainInterpretation = "";
        const q = qInfo.originalQuestion;

        if (qInfo.domain === 'career') {
            domainInterpretation = `关于您问询的【求职/考试/事业】事宜：\n本卦为《${orig.name}》，体卦属${ti.element}而用卦属${yong.element}，两者构成了【${shengKeText.substring(0, 4)}】的关系。这表示您在起步阶段的个人实力与面临的工作考题/竞争岗位之间的博弈。若体卦得生或比和，说明您的基础扎实，能得到面试官或决策者的青睐；若用卦克体，代表当前职位竞争极度激烈，或者考试难度超纲，压力排山倒海，需加倍谨慎。结局变卦为《${ch.name}》，【${finalResultText}】。表明这件事情的最终结果为【${level}】。`;
            specificAdvice = "建议：求学考试宜注重基础细节，不可粗心大意；求职创业若逢“克体”，宜退而结网，提升个人核心技能，不可盲目跳槽或急于求成。";
        } else if (qInfo.domain === 'romance') {
            domainInterpretation = `关于您问询的【感情/姻缘/关系】事宜：\n梅花易数以体卦代表您自身，用卦代表对方及恋爱环境。当前体用关系为【${shengKeText.substring(0, 4)}】，这暗示了双方目前的相处模式与感情深度。若体用比和或用生体，代表双方情投意合，感情发展顺畅，对方对你十分关怀体贴；若体生用，说明你在这段关系中付出极多、感到疲惫（泄气之象）；若用克体，代表对方态度冷淡、控制欲强，或者这段感情面临外界家庭、物质层面的巨大阻力。终局变卦为《${ch.name}》，【${finalResultText}】。预示感情长远发展的结局为【${level}】。`;
            specificAdvice = "建议：感情相处贵在坦诚沟通。若逢生克冲突，宜给彼此留出空间，多反思自身行为，切忌因占有欲过强或无端猜疑而破坏关系。";
        } else if (qInfo.domain === 'health') {
            domainInterpretation = `关于您问询的【身体/健康/疾病】事宜：\n体卦代表您的身体本元，用卦代表疾病或医疗环境。当前五行体用关系为【${shengKeText.substring(0, 4)}】。若体卦克用卦，代表身体素质强健，能压制并战胜病邪；若用卦生体，说明医治对路，能遇到良医或合适的治疗方案，早日康复；最忌用卦克体，代表病来如山倒，病邪势强，必须积极配合就医，不可拖延。变卦结局为《${ch.name}》，【${finalResultText}】。这预示着健康后续的康复走向为【${level}】。`;
            specificAdvice = "建议：调整作息，保持心情愉悦以养心。若身体不适请务必及时求医，并遵照医嘱调理，不可盲目大意或自我硬撑。";
        } else if (qInfo.domain === 'weather') {
            domainInterpretation = `关于您问询的【天气/出行】事宜，卦象详细天机分析如下：\n本卦为《${orig.name}》，互卦为《${mut.name}》，终局变卦为《${ch.name}》。${weatherText}`;
            specificAdvice = "建议：根据卦象昭示的天气变化合理规划行程，备好相应物件，以防风雨突袭影响心情和安全。";
        } else {
            domainInterpretation = `关于您求问的具体问题：“${q}”：\n根据太极排盘，此卦象昭示：\n本卦《${orig.name}》预示了事情的开始：${orig.desc}（体用关系：${shengKeText}）。代表当前局势的基调与双方角力的态势。中期的发展将经历互卦《${mut.name}》的演变：${mut.desc}，这是量变积累的必经过程。最终，变卦《${ch.name}》主导了事物的终结走向：${ch.desc}（${finalResultText}）。`;
            specificAdvice = `根据综合评定【${level}】，建议您：${PlumDivination.getAdviceByLevel(level)}`;
        }
        return {
            summary: `本次占卜综合断定为：【${level}】。` + (q ? ` 您求问的：“${q}”，天机昭示结果已现。` : ""),
            stage1: `【起因阶段 - 本卦《${orig.name}》】：${orig.desc} ${shengKeText}`,
            stage2: `【发展阶段 - 互卦《${mut.name}》】：${mut.desc}。互卦由本卦内爻重组而成，昭示事情在中期发展过程中，容易出现的隐蔽状况、暗中阻碍或潜在的贵人帮扶。`,
            stage3: `【结局阶段 - 变卦《${ch.name}》】：${ch.desc} ${finalResultText} ${domainInterpretation}`,
            advice: specificAdvice || PlumDivination.getAdviceByLevel(level)
        };
    }

    /**
     * 生成智能直断断语 (🎯 天机直断)
     */
    static getDirectAnswer(originalHex, changedHex, ti, yong, changedYong, relation, changedRelation, score, resultLevel, qInfo) {
        const noun = qInfo.targetNoun || '所失之物';
        const q = qInfo.originalQuestion;
        let answer = '';
        let detail = '';

        if (qInfo.domain === 'weather') {
            const hasKan = [ti.id, yong.id, changedYong.id].includes(6); // 坎为水
            const hasZhen = [ti.id, yong.id, changedYong.id].includes(4); // 震为雷
            const hasXun = [ti.id, yong.id, changedYong.id].includes(5); // 巽为风
            const hasLi = [ti.id, yong.id, changedYong.id].includes(3); // 离为火
            const hasKunGen = [ti.id, yong.id, changedYong.id].some(id => id === 8 || id === 7); // 坤艮土

            if (hasKan) {
                answer = "今日/明日有雨。";
                detail = "排盘中出现坎水卦象，重重水汽聚集。变卦终局亦呈润下之意，代表近期将有明显降水。出行务必携带雨具，防范道路湿滑。";
            } else if (hasZhen && hasXun) {
                answer = "雷雨交加，大风将至。";
                detail = "风雷激荡，震木与巽风交织激荡。断定天将有暴风雨，伴有强风与雷电，气温会有所下降，请尽量避免在此期间进行户外运动。";
            } else if (hasXun) {
                answer = "风起云涌，多云有风。";
                detail = "巽卦主风，风力较强。云层受风力驱使快速流动，天气多云转阴，风势较大，可能会有局部毛毛细雨。";
            } else if (hasLi) {
                answer = "晴空万里，无雨。";
                detail = "离火高悬，烈日照耀，纯阳无水。断定为晴好天气，阳光充足，极为适合晾晒衣物、户外活动或旅行。";
            } else if (hasKunGen) {
                answer = "浓云密布，阴天无雨。";
                detail = "坤艮属土，土能掩光。空气湿度大但未达降雨临界点，云层厚重阴沉，天气以阴天为主，近期内无下雨可能。";
            } else {
                answer = "天朗气清，晴好。";
                detail = "卦中金气旺盛或乾天高悬，天气清爽干燥，气压舒适，无下雨之象。";
            }
        } else if (qInfo.domain === 'lost_item') {
            const endGua = changedYong || yong;
            const dir = endGua.direction;
            let areaHint = "";
            
            if (q.includes("卧室") || q.includes("房间") || q.includes("房里")) {
                if (dir === "西北" || dir === "西" || dir === "北") {
                    areaHint = `您问是否在卧室，卦象显示失物处于【${dir}方】。若您的卧室正位于住宅的${dir}方，则【确实在卧室】；否则，物品更可能在${dir}方的其他房间（如书房或盥洗室）。`;
                } else {
                    areaHint = `卦象显示物在【${dir}方位】，而卧室通常非此方位，因此【极可能不在卧室】，建议您往住宅的【${dir}方】翻找。`;
                }
            } else if (q.includes("客厅") || q.includes("大厅")) {
                if (dir === "南" || dir === "东" || dir === "东南") {
                    areaHint = `您问是否在客厅，卦象显示失物处于【${dir}方】。若您的客厅正位于住宅的${dir}方，则【确实在客厅】；否则，请移步至住宅${dir}方的房间寻找。`;
                } else {
                    areaHint = `卦象显示物在【${dir}方位】，【在客厅的可能性较低】，请往住宅的【${dir}方】寻找。`;
                }
            } else if (q.includes("车上") || q.includes("车里")) {
                if (endGua.name === "震" || endGua.name === "巽") {
                    areaHint = `您问是否在车上，震为动、为车，巽为木、为长直。卦逢震巽，【极有可能就掉在车内或交通工具上】。`;
                } else {
                    areaHint = `卦象并未显现车船（震木）之象，物品【在车上的可能性较小】，更可能遗忘在【${dir}方】的固定建筑物内。`;
                }
            }

            if (relation === '生' || relation === '比和') {
                answer = `【${noun}】极易找回，未曾离远！`;
                detail = `体用相生或比和，说明${noun}的磁场仍在您的掌控范围内。物品大概率在室内，目前位于【${dir}方向】，多在【${endGua.nature === '天' ? '高处金属柜、书架' : endGua.nature === '地' ? '平整的地面或矮柜、泥土盆栽旁' : endGua.nature === '水' ? '水槽、洗手间潮湿处' : '桌椅夹缝、通风干燥处'}】。${areaHint || "请尽快在上述方位仔细翻找。"}`;
            } else if (relation === '被克') {
                answer = `【${noun}】能够寻回，但须多费周折。`;
                detail = `体克用之象，代表您有能力战胜阻碍找到它。但过程会比较繁琐，可能需要翻箱倒柜、移动重物，甚至需要询问家人/同事。物品在【${dir}方向】的隐秘夹缝或重物下方，只要坚持耐心寻找，定能找到。`;
            } else if (relation === '被生') {
                answer = `【${noun}】极难找回，恐已流失境外。`;
                detail = `体生用为“泄气”不吉，说明您的气场在向外流失。物品大概率在您外出、乘坐交通工具或逛街时遗落，或者被您无意中随手送人/借出。寻回需要付出极大的代价，且希望微茫，建议顺其自然。`;
            } else {
                answer = `【${noun}】几乎无法寻回，已被他人占有或损坏。`;
                detail = `用克体为大凶之兆，代表失物的局势彻底脱密。物品多半在公共场所被路人捡走并藏匿，或者已经掉入下水道、垃圾桶并损坏。执意寻找不仅无果，还容易导致您心情烦躁、甚至与人发生口舌纠纷，建议放弃执念。`;
            }
        } else if (qInfo.domain === 'career') {
            if (score >= 60) {
                answer = `所求之【事业/求职/考试】能如愿达成，吉顺！`;
                detail = `当前卦气相合，体卦健旺，表明您的准备充足，能够得到考官或贵人的赏识。考试通过的概率极大，求职亦能获得满意的聘书。只要保持自信，定能得偿所愿。`;
            } else {
                answer = `所求之【事业/求职/考试】面临阻碍，恐难如愿。`;
                detail = `卦象呈现相克或泄气，变卦结局亦未见有力支持。代表本次竞争极度激烈，或者有小人暗中作梗、考试题目超纲。建议做好未能通过的心理准备，退而结网，积累实力，等待下一次转机。`;
            }
        } else if (qInfo.domain === 'romance') {
            if (score >= 60) {
                answer = "情感关系相处融洽，所问能成！";
                detail = `体用生合，情感磁场相互吸引。无论是求表白、求复合还是问长远发展，结果都非常乐观。对方对您抱有好感与诚意，宜主动迈出一步，真诚沟通，终成眷属。`;
            } else {
                answer = "感情存在阻力或误会，发展受阻，切勿强求。";
                detail = `体用相克，磁场排斥。说明双方沟通不畅，或存在现实层面的大阻力（如长辈反对、物质限制）。强行拉近距离只会增加彼此负担，建议保持冷静，顺其自然，切忌卑微或极端执着。`;
            }
        } else if (qInfo.domain === 'health') {
            if (score >= 60) {
                answer = "身体元气尚旺，疾患能够痊愈，无大碍。";
                detail = `体克用（我克病邪）或用生体，代表自身免疫力与生命力强盛。若有微恙，能得到良医妙药调治，很快即可康复。平日注意作息，放松心态即可。`;
            } else {
                answer = "病邪势强，身体本元受克，须立刻积极就医！";
                detail = `用克体或泄气过甚，代表病势来得较急或身体消耗严重。绝不能抱有侥幸心理自我硬撑，必须尽快去正规医院做详细体检，遵医嘱治疗，并彻底调整作息与饮食，静心调养。`;
            }
        } else {
            const hasKeywordCan = ["能", "可以", "会", "是不是", "行不行", "成不成", "是否"].some(kw => q.includes(kw));
            if (hasKeywordCan) {
                if (score >= 60) {
                    answer = "此事【可以达成/会如您所愿】。";
                    detail = `卦逢吉兆，体用生合。代表事情的发展正契合您的心意，外部助力强劲，遇到的困难能迎刃而解，大可放心去实行，结果必有收获。`;
                } else {
                    answer = "此事【难以成功/不会如您所愿】。";
                    detail = `卦逢凶兆，体用受克或泄气。表明前方险阻重重，可能遭遇突发变故、利益冲突或他人毁约。此时强行推进极易招致失败与损失，建议及时踩下刹车，避开风头。`;
                }
            } else {
                answer = `本次占问综合评定为【${resultLevel}】。`;
                detail = `卦象显示，本卦《${originalHex.name}》代表起步，变卦《${changedHex.name}》主导最终结局。整体运势得分为 ${score}%。请根据此趋势谨慎谋划。`;
            }
        }

        return { answer, detail };
    }
}

/**
 * 核心起卦引擎
 */
class PlumDivination {
    /**
     * 数字起卦法
     */
    static byNumbers(num1, num2, hourOrder, question = "", purpose = "fortune") {
        let upperId = num1 % 8;
        if (upperId === 0) upperId = 8;
        
        let lowerId = num2 % 8;
        if (lowerId === 0) lowerId = 8;
        
        let movingL = (num1 + num2 + hourOrder) % 6;
        if (movingL === 0) movingL = 6;
        
        return this.generateDivination(upperId, lowerId, movingL, `数字起卦 (数一:${num1}, 数二:${num2}, 时辰:${BRANCH_NAMES[hourOrder-1]}时)`, question, purpose);
    }

    /**
     * 字数起卦法
     */
    static byText(text, question = "", purpose = "fortune") {
        const cleanedText = text.trim();
        const len = cleanedText.length;
        if (len === 0) {
            throw new Error("占卜词不能为空");
        }
        
        let upperCount, lowerCount;
        if (len % 2 === 0) {
            upperCount = len / 2;
            lowerCount = len / 2;
        } else {
            // 奇数：前半比后半多一字
            upperCount = Math.floor(len / 2) + 1;
            lowerCount = Math.floor(len / 2);
        }
        
        let upperId = upperCount % 8;
        if (upperId === 0) upperId = 8;
        
        let lowerId = lowerCount % 8;
        if (lowerId === 0) lowerId = 8;
        
        let movingL = len % 6;
        if (movingL === 0) movingL = 6;
        
        return this.generateDivination(upperId, lowerId, movingL, `字数起卦 (字数:${len}, 词句:"${cleanedText}")`, question || cleanedText, purpose);
    }

    /**
     * 时间起卦法
     */
    static byTime(yearBranchOrder, lunarMonth, lunarDay, hourOrder, question = "", purpose = "fortune") {
        const upperId = (yearBranchOrder + lunarMonth + lunarDay) % 8 === 0 ? 8 : (yearBranchOrder + lunarMonth + lunarDay) % 8;
        const sum = yearBranchOrder + lunarMonth + lunarDay + hourOrder;
        const lowerId = sum % 8 === 0 ? 8 : sum % 8;
        const movingL = sum % 6 === 0 ? 6 : sum % 6;
        
        const info = `时间起卦 (年支:${BRANCH_NAMES[yearBranchOrder-1]}(${yearBranchOrder}), 农历:${lunarMonth}月${lunarDay}日, 时辰:${BRANCH_NAMES[hourOrder-1]}时(${hourOrder}))`;
        return this.generateDivination(upperId, lowerId, movingL, info, question, purpose);
    }

    /**
     * 生成卦象详析数据结构
     */
    static generateDivination(upperId, lowerId, movingLine, methodInfo, question = "", purpose = "fortune") {
        // 1. 本卦
        const originalHex = HEXAGRAMS_DB[upperId * 10 + lowerId];
        const upperGua = TRIGRAMS[upperId];
        const lowerGua = TRIGRAMS[lowerId];
        
        // 2. 体用分析
        const isLowerMoving = movingLine <= 3;
        const tiId = isLowerMoving ? upperId : lowerId;
        const yongId = isLowerMoving ? lowerId : upperId;
        const tiGua = TRIGRAMS[tiId];
        const yongGua = TRIGRAMS[yongId];
        
        // 3. 互卦
        const origLines = getHexagramLines(upperId, lowerId);
        const mutualLowerLines = [origLines[1], origLines[2], origLines[3]]; // 2,3,4爻
        const mutualUpperLines = [origLines[2], origLines[3], origLines[4]]; // 3,4,5爻
        
        const mutualLowerId = getTrigramIdByLines(mutualLowerLines);
        const mutualUpperId = getTrigramIdByLines(mutualUpperLines);
        const mutualHex = HEXAGRAMS_DB[mutualUpperId * 10 + mutualLowerId];
        
        // 4. 变卦
        const changedLines = [...origLines];
        changedLines[movingLine - 1] = changedLines[movingLine - 1] === 1 ? 0 : 1;
        
        const changedLowerLines = [changedLines[0], changedLines[1], changedLines[2]];
        const changedUpperLines = [changedLines[3], changedLines[4], changedLines[5]];
        
        const changedLowerId = getTrigramIdByLines(changedLowerLines);
        const changedUpperId = getTrigramIdByLines(changedUpperLines);
        const changedHex = HEXAGRAMS_DB[changedUpperId * 10 + changedLowerId];
        
        const changedYongId = isLowerMoving ? changedLowerId : changedUpperId;
        const changedYongGua = TRIGRAMS[changedYongId];

        // 5. 体用五行生克分析
        const relation = getElementRelation(yongGua.element, tiGua.element); // 用 对 体
        const changedRelation = getElementRelation(changedYongGua.element, tiGua.element); // 变用 对 体
        
        // 体用生克综合解析文字
        let shengKeAnalysis = '';
        let resultLevel = '';
        let score = 50; // 综合打分 0-100
        
        switch (relation) {
            case '比和':
                shengKeAnalysis = `体用比和（体卦属${tiGua.element}，用卦属${yongGua.element}）。代表自身力量与外界能量和谐统一、并重共生，合作能谋求共赢，局势大体安稳吉顺。`;
                resultLevel = '吉';
                score = 80;
                break;
            case '生': // 用生体
                shengKeAnalysis = `用生体（用卦属${yongGua.element}生体卦属${tiGua.element}）。大吉之兆！外界的能量正源源不断向你输送，代表贵人相帮，求谋极易达成，凡事有极强的外部推力协助。`;
                resultLevel = '大吉';
                score = 95;
                break;
            case '克': // 用克体
                shengKeAnalysis = `用克体（用卦属${yongGua.element}克体卦属${tiGua.element}）。大凶之兆！说明当前局势对你极度不利，外部阻力排山倒海般袭来，易犯口舌是非、遭人暗算或利益受损，宜隐忍规避。`;
                resultLevel = '大凶';
                score = 15;
                break;
            case '被生': // 体生用
                shengKeAnalysis = `体生用（体卦属${tiGua.element}生用卦属${yongGua.element}）。属于“泄气”不吉。表示自己正在过度消耗精力和物力去推进某事，属于劳碌奔波，回报却很小，提防财物损失。`;
                resultLevel = '小凶';
                score = 35;
                break;
            case '被克': // 体克用
                shengKeAnalysis = `体克用（体卦属${tiGua.element}克用卦属${yongGua.element}）。小吉。代表虽然过程有摩擦、阻梗或强烈的竞争，但依靠你自身的智慧和能力，终能压制并征服困难，取得胜利。`;
                resultLevel = '小吉';
                score = 65;
                break;
        }

        // 变卦代表最终结局，进行微调
        let finalResultText = '';
        if (changedRelation === '生' || changedRelation === '比和') {
            finalResultText = `变卦最终走向【${changedRelation === '生' ? '用生体' : '体用比和'}】。这意味着事情后期能出现有力转机，贵人显现或阻力解除，终局圆满吉利。`;
            score += 12;
        } else if (changedRelation === '克') {
            finalResultText = `变卦结局呈现【用克体】。警惕后期运势大幅度滑坡，虎头蛇尾，最终可能面临较大的挫折或失败，需留好退路。`;
            score -= 15;
        } else if (changedRelation === '被生') {
            finalResultText = `变卦结局呈现【体生用】。预示后期会因为你的心浮气躁或过度投入，面临精力的耗费或财物小失。`;
            score -= 5;
        } else {
            finalResultText = `最终局势趋于平和稳定。`;
        }
        
        score = Math.max(5, Math.min(98, score));
        
        if (score >= 90) resultLevel = '大吉';
        else if (score >= 75) resultLevel = '吉';
        else if (score >= 60) resultLevel = '小吉';
        else if (score >= 45) resultLevel = '平';
        else if (score >= 25) resultLevel = '小凶';
        else resultLevel = '大凶';

        // 智能分析问题
        const qInfo = QuestionAnalyzer.parse(question, purpose);
        if (originalHex.lost && qInfo.targetNoun && qInfo.targetNoun !== '失物') {
            originalHex.lost = originalHex.lost.replace(/失物/g, qInfo.targetNoun).replace(/物品/g, qInfo.targetNoun);
        }

        // 生成详细占卜分析
        const lostItemsAnalysis = InterpretationEngine.lostItems(tiGua, yongGua, changedYongGua, relation, changedRelation, qInfo);
        const fortuneAnalysis = InterpretationEngine.fortune(originalHex, mutualHex, changedHex, shengKeAnalysis, finalResultText, resultLevel, qInfo, tiGua, yongGua, changedYongGua);
        const directAnswer = InterpretationEngine.getDirectAnswer(originalHex, changedHex, tiGua, yongGua, changedYongGua, relation, changedRelation, score, resultLevel, qInfo);

        return {
            methodInfo,
            movingLine,
            original: {
                upper: upperGua,
                lower: lowerGua,
                name: originalHex.name,
                symbol: originalHex.symbol,
                judgement: originalHex.judgement,
                desc: originalHex.desc,
                lines: origLines
            },
            mutual: {
                upper: TRIGRAMS[mutualUpperId],
                lower: TRIGRAMS[mutualLowerId],
                name: mutualHex.name,
                symbol: mutualHex.symbol,
                judgement: mutualHex.judgement,
                desc: mutualHex.desc,
                lines: mutualLowerLines.concat(mutualUpperLines)
            },
            changed: {
                upper: TRIGRAMS[changedUpperId],
                lower: TRIGRAMS[changedLowerId],
                name: changedHex.name,
                symbol: changedHex.symbol,
                judgement: changedHex.judgement,
                desc: changedHex.desc,
                lines: changedLines
            },
            tiGua,
            yongGua,
            changedYongGua,
            isLowerMoving,
            score,
            resultLevel,
            shengKeAnalysis,
            lostItemsAnalysis,
            fortuneAnalysis,
            directAnswer
        };
    }

    static getAdviceByLevel(level) {
        switch (level) {
            case '大吉': return '万事亨通，借势而行。此时求官、谋职、开业、投资皆能大顺，但要明哲保身，不可得意忘形，多修德行。';
            case '吉': return '运势平稳上升，有多方力量暗中推动。适宜在人际、职场多合作沟通，必能获得理想收获。';
            case '小吉': return '前途虽有顽石阻碍，但完全在你压制之中。拿出耐心和毅力，排除竞争，必定成功。';
            case '平': return '局势陷入平盘，吉凶处于微妙平衡。最忌盲目更张，保持守势，静静观察等待转机。';
            case '小凶': return '提防财物损失与精力消耗。切不可轻易听信他人的投资诱惑，做好防范，收紧预算。';
            case '大凶': return '危机四伏，小人猖獗。应当立刻停止一切冒险举动、投资、合作，多修身养性，以待时局改善。';
        }
        return '宜静观其变，守正防邪。';
    }
}
