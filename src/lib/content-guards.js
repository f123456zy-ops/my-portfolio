const FORBIDDEN_COPY = [
  { pattern: /冯泽毅/g, label: "旧姓名" },
  { pattern: /\bFZY\b/g, label: "旧缩写" },
  { pattern: /商业合作/g, label: "商业合作文案" },
  { pattern: /导演|工作室|客户咨询|合作伙伴/g, label: "定位禁用词" },
];

const ASSET_KEY = /(asset|image|video|poster|thumbnail|qrPath)$/i;
const REQUIRED_SECTIONS = ["home", "ai", "work", "career", "about"];
const REQUIRED_CASE_FIELDS = [
  "id",
  "discipline",
  "title",
  "period",
  "role",
  "context",
  "responsibilities",
  "process",
  "outcome",
  "image",
  "alt",
];

export function flattenText(value) {
  if (value === null || value === undefined || typeof value === "boolean") {
    return "";
  }

  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim();
  }

  if (Array.isArray(value)) {
    return value.map(flattenText).filter(Boolean).join(" ");
  }

  if (typeof value === "object") {
    return Object.values(value).map(flattenText).filter(Boolean).join(" ");
  }

  return "";
}

export function validatePortfolioContent(content) {
  const errors = [];
  const ids = new Set();
  const text = flattenText(content);

  const sections = Array.isArray(content?.PAGE_SECTIONS) ? content.PAGE_SECTIONS : [];
  for (const section of REQUIRED_SECTIONS) {
    if (!sections.includes(section)) {
      errors.push(`缺少章节: ${section}`);
    }
  }

  const cases = Array.isArray(content?.FEATURED_CASES) ? content.FEATURED_CASES : [];
  cases.forEach((item, index) => {
    const missing = REQUIRED_CASE_FIELDS.filter((field) => {
      const value = item?.[field];
      return Array.isArray(value) ? value.length === 0 : !String(value ?? "").trim();
    });
    if (missing.length) {
      errors.push(`案例字段不完整: FEATURED_CASES[${index}] (${missing.join(", ")})`);
    }
  });

  const contact = content?.CONTACT;
  if (!contact || !String(contact.email ?? "").trim() || !String(contact.phone ?? "").trim()) {
    errors.push("联系方式为空: email / phone");
  }

  for (const { pattern, label } of FORBIDDEN_COPY) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) {
      errors.push(`发现${label}`);
    }
  }

  function visit(value, path = "content") {
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, `${path}[${index}]`));
      return;
    }

    if (!value || typeof value !== "object") {
      return;
    }

    if (typeof value.id === "string") {
      if (ids.has(value.id)) {
        errors.push(`重复 ID: ${value.id}`);
      }
      ids.add(value.id);
    }

    if (Object.hasOwn(value, "title") && !String(value.title ?? "").trim()) {
      errors.push(`空项目标题: ${path}`);
    }

    for (const [key, child] of Object.entries(value)) {
      const childPath = `${path}.${key}`;

      if (ASSET_KEY.test(key)) {
        if (typeof child !== "string" || !child.startsWith("/")) {
          errors.push(`缺少资源: ${childPath}`);
        }
      }

      if (
        (key === "href" || key === "url") &&
        typeof child === "string" &&
        /^https?:\/\//i.test(child)
      ) {
        errors.push(`不支持的外部链接: ${child}`);
      }

      visit(child, childPath);
    }
  }

  visit(content);
  return errors;
}
