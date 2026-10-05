import { ASSET_MAP } from "./asset-map.js";
import { validatePortfolioContent } from "../lib/content-guards.js";

export { validatePortfolioContent };

export const SITE_PROFILE = Object.freeze({
  name: "王泽毅",
  initials: "WZY",
  city: "宁波",
  roles: ["摄影师", "剪辑师", "视觉设计师"],
  targetRoles: ["摄影 / 摄像", "视频剪辑", "视觉设计", "AI 内容生产"],
  positioning: "视觉创作 × AI 内容生产",
  statement: "以影像创作为基础，用 AI 构建可落地的内容系统。",
  summary:
    "视觉传达设计背景，具备摄影、剪辑、品牌视觉与内容运营经验。把 AI 放进真实生产流程，让创意从策略、生成、编辑走到最终交付。",
  portrait: ASSET_MAP.portrait,
});

export const PAGE_SECTIONS = Object.freeze([
  "home",
  "ai-practice",
  "projects",
  "archive",
  "about",
  "experience",
  "contact",
]);

export const AI_METRICS = Object.freeze([
  { id: "cost", value: "50%", label: "创作成本降低", detail: "AI 进入脚本、素材与后期链路" },
  { id: "weekly-output", value: "1 → 8", label: "周内容产量", detail: "标准化流程提升稳定交付能力" },
  { id: "reuse", value: "+300%", label: "素材复用率", detail: "同一素材适配多平台与多版式" },
]);

export const AI_DELIVERABLES = Object.freeze([
  {
    id: "wechat-content",
    title: "公众号内容",
    shortLabel: "公众号",
    stage: "策略",
    description: "从选题、结构、文案到长图排版，形成可持续更新的内容模板。",
    outcome: "适配品牌科普、节点传播与活动内容。",
    image: ASSET_MAP.wechatContent,
    alt: "公众号内容策划与长图排版示例",
  },
  {
    id: "ai-video",
    title: "AI 视频",
    shortLabel: "视频",
    stage: "生成",
    description: "结合生成式画面、实拍素材与剪辑节奏，完成可直接发布的视频内容。",
    outcome: "覆盖概念片、产品短片与社交平台内容。",
    image: ASSET_MAP.aiVideoPoster,
    video: ASSET_MAP.aiVideo,
    alt: "BIOCARE AI 品牌视频画面",
  },
  {
    id: "product-detail",
    title: "产品详情页",
    shortLabel: "详情页",
    stage: "编辑",
    description: "把卖点、视觉资产与信息层级整合为完整的电商内容叙事。",
    outcome: "从主视觉到模块化详情内容均可继续迭代。",
    image: ASSET_MAP.productDetail,
    alt: "护肤产品内容视觉示例",
  },
  {
    id: "brand-poster",
    title: "品牌海报",
    shortLabel: "海报",
    stage: "编辑",
    description: "建立统一风格后快速延展节点海报、活动物料与社交封面。",
    outcome: "保留品牌辨识度，同时提升版本产出效率。",
    image: ASSET_MAP.posterSeries,
    alt: "品牌活动海报与信息排版示例",
  },
  {
    id: "automation-workflow",
    title: "自动化工作流",
    shortLabel: "工作流",
    stage: "交付",
    description: "把脚本、素材生成、审核、后期和多平台适配串成可复用流程。",
    outcome: "减少重复劳动，让团队把时间留给判断与创意。",
    image: ASSET_MAP.workflow,
    alt: "内容生产与素材整理工作流示例",
  },
]);

export const PROJECTS = Object.freeze([
  {
    id: "biocare-ai-film",
    discipline: "AI VIDEO / EDITING",
    title: "BIOCARE AI 品牌视频",
    role: "创意策划、AI 画面、剪辑与后期",
    summary: "将品牌视觉、自然意象和产品信息整合为可直接发布的短片。",
    outcome: "建立脚本—素材—后期的标准化制作链路。",
    image: ASSET_MAP.aiVideoPoster,
    video: ASSET_MAP.aiVideo,
    alt: "BIOCARE 森林主题品牌视频",
  },
  {
    id: "brand-space-film",
    discipline: "PHOTOGRAPHY / FILM",
    title: "品牌空间与活动影像",
    role: "现场拍摄、镜头设计与剪辑",
    summary: "在商业空间和品牌活动中完成从现场观察到成片交付的完整影像表达。",
    outcome: "兼顾空间质感、人物状态与品牌信息。",
    image: ASSET_MAP.eventFilmPoster,
    video: ASSET_MAP.eventFilm,
    alt: "品牌活动现场影像",
  },
  {
    id: "biocare-content-system",
    discipline: "VISUAL DESIGN / CONTENT",
    title: "护肤品牌内容矩阵",
    role: "产品摄影、视觉设计与内容适配",
    summary: "围绕产品、知识科普与节点传播，持续产出视频、推文和视觉物料。",
    outcome: "周内容产量由 1 提升至 8，素材复用率提升 300%。",
    image: ASSET_MAP.biocareProduct,
    alt: "BIOCARE 护肤产品内容视觉",
  },
  {
    id: "content-workflow",
    discipline: "AI WORKFLOW",
    title: "多形态内容生产工作流",
    role: "流程设计、AI 协作与质量把控",
    summary: "把公众号、视频、详情页和海报纳入同一套资产与交付流程。",
    outcome: "在不牺牲视觉判断的前提下降低 50% 创作成本。",
    image: ASSET_MAP.workflow,
    alt: "多形态内容生产工作流",
  },
]);

export const ARCHIVE_PROJECTS = Object.freeze([
  {
    id: "archive-wanderer",
    title: "《独行者》",
    category: "摄影",
    year: "2022",
    image: ASSET_MAP.wanderer,
    alt: "黑白建筑摄影作品《独行者》",
  },
  {
    id: "archive-empty-realm",
    title: "《空之境》",
    category: "摄影",
    year: "2022",
    image: ASSET_MAP.emptyRealm,
    alt: "黑白建筑摄影作品《空之境》",
  },
  {
    id: "archive-yimusanfen",
    title: "一亩三分 VI",
    category: "品牌视觉",
    year: "2021",
    image: ASSET_MAP.yimusanfenVi,
    alt: "一亩三分烘焙品牌视觉识别应用",
  },
  {
    id: "archive-food-app",
    title: "美食 App UI",
    category: "界面设计",
    year: "2022",
    image: ASSET_MAP.foodAppUi,
    alt: "美食应用界面设计样机",
  },
  {
    id: "archive-posters",
    title: "海报与字体实验",
    category: "海报设计",
    year: "2021",
    image: ASSET_MAP.earlyPosterSeries,
    alt: "观山海与中秋主题海报设计",
  },
  {
    id: "archive-packaging",
    title: "一叶子包装概念",
    category: "包装 / C4D",
    year: "2022",
    image: ASSET_MAP.packagingC4d,
    alt: "一叶子护肤品包装与三维视觉",
  },
]);

export const CAPABILITIES = Object.freeze([
  {
    id: "cap-ai",
    index: "01",
    title: "AI 内容生产与工作流搭建",
    description: "脚本策划、生成式素材、提示词设计、自动化编排与多平台适配。",
    tools: ["ChatGPT", "Gemini", "Midjourney", "即梦"],
  },
  {
    id: "cap-photo",
    index: "02",
    title: "摄影与影像制作",
    description: "人像、产品、活动与商业空间拍摄，兼顾布光、构图和现场节奏。",
    tools: ["摄影", "摄像", "布光", "现场执行"],
  },
  {
    id: "cap-editing",
    index: "03",
    title: "视频剪辑与后期",
    description: "短视频、品牌片与活动内容的结构剪辑、调色、字幕和声音处理。",
    tools: ["Premiere Pro", "After Effects", "调色"],
  },
  {
    id: "cap-visual",
    index: "04",
    title: "视觉设计与品牌表达",
    description: "品牌 VI、海报、活动物料、详情页和社交媒体视觉的系统化延展。",
    tools: ["Photoshop", "Illustrator", "C4D"],
  },
  {
    id: "cap-strategy",
    index: "05",
    title: "内容策略与运营协作",
    description: "从选题、对标和内容结构出发，连接创意、生产、复盘与持续优化。",
    tools: ["公众号", "视频号", "抖音", "小红书"],
  },
]);

export const EXPERIENCE = Object.freeze([
  {
    id: "exp-bioforest",
    period: "2024.05 — 至今",
    company: "浙江贝优生物科技有限公司",
    role: "摄影师 · 剪辑师",
    summary: "负责护肤品牌影像、短视频与内容物料，并将 AI 引入脚本、素材和后期流程。",
    highlights: ["周内容产量从 1 提升至 8", "素材复用率提升 300%", "创作成本降低 50%"],
  },
  {
    id: "exp-decode",
    period: "2024.02 — 2024.05",
    company: "宁波德克德家商业管理发展有限公司",
    role: "新媒体",
    summary: "统筹品牌矩阵内容，完成商业空间拍摄、视频剪辑、内容策划与视觉统一。",
    highlights: ["单人支持多个账号内容生产", "连接拍摄、剪辑与平台运营"],
  },
  {
    id: "exp-disai",
    period: "2023.02 — 2024.02",
    company: "宁波市迪赛控股集团有限公司",
    role: "设计师助理",
    summary: "参与地产、教育与城市更新项目的视觉物料、空间效果和影像内容制作。",
    highlights: ["品牌视觉执行", "C4D 空间表现", "活动影像与后期"],
  },
  {
    id: "exp-education",
    period: "2019 — 2023",
    company: "湖州师范学院",
    role: "视觉传达设计 · 本科",
    summary: "专业排名前 5%，获得省政府奖学金、校级一等奖学金及省级数字艺术设计奖项。",
    highlights: ["优秀毕业生", "省级一等奖 ×2", "视觉设计基础"],
  },
]);

export const CONTACT = Object.freeze({
  heading: "期待新的工作机会",
  statement: "如果你正在寻找兼具影像审美、内容执行力与 AI 工作流能力的创作者，欢迎联系我。",
  email: "2364344055@qq.com",
  emailHref: "mailto:2364344055@qq.com",
  phone: "17816786664",
  phoneHref: "tel:17816786664",
  city: "宁波",
  wechatLabel: "扫码添加微信",
  qrPath: ASSET_MAP.wechatQr,
  resumePath: "/resume-wang-zeyi.pdf",
});
