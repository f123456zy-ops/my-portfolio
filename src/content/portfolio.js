import { ASSET_MAP } from "./asset-map.js";
import { validatePortfolioContent } from "../lib/content-guards.js";

export { validatePortfolioContent };

export const SITE_PROFILE = Object.freeze({
  name: "王泽毅",
  initials: "WZY",
  city: "宁波",
  title: "新媒体内容运营（AI 内容方向）",
  capabilityLine: "内容策划 · AI 内容生产 · 拍摄 · 剪辑 · 视觉设计",
  roles: ["新媒体内容运营", "AI 内容生产", "拍摄与剪辑", "视觉设计"],
  targetRoles: ["新媒体内容运营", "AI 内容生产", "品牌内容", "视觉内容"],
  positioning: "新媒体内容运营 × AI 内容生产",
  statement: "能把选题、内容、视觉和 AI 工具连接成可落地的新媒体生产流程。",
  summary:
    "视觉传达设计背景，具备内容运营、摄影、剪辑与品牌视觉经验。把 AI 放进真实生产流程，让内容从策略、生成、编辑走到最终交付。",
  jobSeekingStatement: "正在寻找新媒体内容运营、AI 内容生产及相关视觉内容岗位。",
  portrait: ASSET_MAP.portrait,
});

export const PAGE_SECTIONS = Object.freeze([
  "home",
  "ai",
  "work",
  "career",
  "about",
]);

export const AI_WORKFLOW_STAGES = Object.freeze([
  {
    id: "strategy",
    index: "01",
    title: "选题与策略",
    description: "研究对标内容，明确受众、平台目标、脚本结构和视觉方向。",
    tools: ["内容规划", "脚本", "视觉方向"],
  },
  {
    id: "generation",
    index: "02",
    title: "AI 生成",
    description: "使用生成式工具完成文案、图像、视频和可供筛选的素材变体。",
    tools: ["ChatGPT", "Gemini", "Midjourney", "即梦"],
  },
  {
    id: "production",
    index: "03",
    title: "拍摄与编辑",
    description: "结合实拍、素材筛选、剪辑、调色、排版与人工校正完成内容。",
    tools: ["摄影", "Premiere Pro", "After Effects"],
  },
  {
    id: "adaptation",
    index: "04",
    title: "多平台适配",
    description: "把同一内容系统延展到公众号、视频、详情页、海报与社交封面。",
    tools: ["公众号", "视频号", "抖音", "小红书"],
  },
  {
    id: "review",
    index: "05",
    title: "发布与复盘",
    description: "沉淀素材、管理版本并复用有效流程，为下一轮内容提供依据。",
    tools: ["素材归档", "版本管理", "流程复用"],
  },
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

export const FEATURED_CASES = Object.freeze([
  {
    id: "biocare-ai-film",
    discipline: "AI VIDEO / BRAND CONTENT",
    title: "BIOCARE AI 品牌视频",
    period: "2024 — 至今",
    role: "创意策划、AI 画面、剪辑与后期",
    context: "围绕护肤品牌的自然理念，把产品信息与生成式视觉整合为可直接发布的短片。",
    responsibilities: ["梳理内容主题与脚本", "生成并筛选视觉素材", "完成剪辑、调色与声音后期"],
    process: ["确定品牌语气与画面方向", "生成素材并人工校正", "与实拍及产品信息合成成片"],
    outcome: "建立脚本—素材—后期的标准化制作链路，让 AI 画面真正进入品牌内容交付。",
    image: ASSET_MAP.aiVideoPoster,
    video: ASSET_MAP.aiVideo,
    alt: "BIOCARE 森林主题 AI 品牌视频画面",
  },
  {
    id: "biocare-content-system",
    discipline: "CONTENT OPERATIONS / VISUAL",
    title: "护肤品牌内容矩阵",
    period: "2024 — 至今",
    role: "内容策划、产品摄影、视觉设计与多平台适配",
    context: "围绕产品、知识科普与传播节点，持续组织公众号、详情页、海报和短视频内容。",
    responsibilities: ["规划选题与内容结构", "完成产品拍摄和视觉设计", "根据平台调整版式与表达"],
    process: ["拆解产品卖点和受众问题", "建立可复用的素材与版式", "多平台发布并持续沉淀资产"],
    outcome: "周内容产量从 1 提升至 8，素材复用率提升 300%，同时保持品牌视觉一致。",
    image: ASSET_MAP.biocareProduct,
    alt: "BIOCARE 护肤品牌多平台内容视觉",
  },
  {
    id: "brand-space-film",
    discipline: "PHOTOGRAPHY / EDITING",
    title: "品牌空间与活动影像",
    period: "2024",
    role: "现场拍摄、镜头设计与剪辑",
    context: "在商业空间和品牌活动现场，把环境、人物状态与品牌信息组织成完整影像。",
    responsibilities: ["制定现场拍摄重点", "完成摄影摄像与素材筛选", "负责结构剪辑和后期交付"],
    process: ["现场观察并规划镜头", "捕捉空间与人物关系", "按传播节奏完成成片"],
    outcome: "独立连接现场执行与后期表达，兼顾空间质感、人物状态和品牌信息。",
    image: ASSET_MAP.eventFilmPoster,
    video: ASSET_MAP.eventFilm,
    alt: "品牌空间与活动现场影像",
  },
]);

export const VISUAL_ARCHIVE = Object.freeze([
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

export const ROLE_SKILLS = Object.freeze([
  {
    id: "skill-ai",
    index: "01",
    title: "AI 内容生产与工作流",
    description: "把生成式工具接入选题、脚本、素材、审核、后期和多平台交付。",
    tools: ["ChatGPT", "Gemini", "Midjourney", "即梦"],
  },
  {
    id: "skill-operations",
    index: "02",
    title: "新媒体内容策划与运营",
    description: "从受众和平台目标出发，完成选题、内容结构、发布适配与复盘。",
    tools: ["公众号", "视频号", "抖音", "小红书"],
  },
  {
    id: "skill-photo",
    index: "03",
    title: "摄影与摄像",
    description: "完成人像、产品、活动与商业空间拍摄，兼顾布光、构图和现场节奏。",
    tools: ["摄影", "摄像", "布光", "现场执行"],
  },
  {
    id: "skill-editing",
    index: "04",
    title: "视频剪辑与后期",
    description: "负责短视频、品牌片与活动内容的结构剪辑、调色、字幕和声音处理。",
    tools: ["Premiere Pro", "After Effects", "调色"],
  },
  {
    id: "skill-visual",
    index: "05",
    title: "视觉设计与品牌表达",
    description: "系统延展品牌 VI、海报、活动物料、详情页和社交媒体视觉。",
    tools: ["Photoshop", "Illustrator", "C4D"],
  },
]);

export const CAREER = Object.freeze([
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
