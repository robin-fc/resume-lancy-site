"use client";

import { useMemo, useState } from "react";

const t = {
  navNote: "Magic Resume inspired - 个人非商业使用",
  badge: "AI 改写 - JD 匹配 - ATS 检查 - 简历预览",
  hero: "把经历改写成面试官想继续读的简历。",
  sub: "根据 Magic Resume 的在线编辑、实时预览和 AI 辅助编写思路，做成面向 Lancy 工具集的简历助手：粘贴简历与 JD，即刻获得关键词覆盖、ATS 清单和更有结果感的 bullet 建议。",
  start: "开始诊断简历",
  license: "查看协议说明",
  material: "输入素材",
  localDemo: "本地规则演示",
  resume: "简历内容",
  job: "目标岗位 JD",
  match: "岗位匹配度",
  covered: "已覆盖",
  keywordAdvice: "个关键词，建议补齐缺失关键词并为核心成果增加数字。",
  rewrite: "AI 改写建议",
  missing: "待补齐关键词",
  noMissing: "关键词覆盖良好",
  advice: "建议把缺失关键词自然放入项目背景、技术栈或结果描述中，避免堆砌。每段经历优先呈现“做了什么、怎么做、带来什么结果”。",
  pass: "通过",
  todo: "待补充",
  licenseTitle: "协议与授权提醒",
  licenseText: "本项目根据 Magic Resume 实现思路改造，已保留其 LICENSE。Magic Resume 基于 Apache License 2.0，并附加商业使用限制：个人非商业使用免费；作为 SaaS、网站工具、商业集成或二次商业化运营前，应联系原作者取得商业授权。",
};

const sampleResume = "张岚 / 前端工程师\n5 年 Web 产品研发经验，熟悉 React、Next.js、TypeScript，负责过 B 端数据看板与增长活动页面。\n\n经历\n- 负责搭建内部运营平台，提升活动配置效率。\n- 优化首屏加载和组件复用，减少重复开发。\n- 与产品、设计协作完成多个业务模块上线。";
const sampleJob = "岗位：高级前端工程师\n要求：React、Next.js、TypeScript、性能优化、组件库、数据可视化、跨团队协作、用户增长。希望候选人有量化结果和复杂项目经验。";
const stopWords = new Set(["岗位", "要求", "希望", "候选人", "负责", "经验", "项目", "业务", "以及", "完成"]);

function extractKeywords(text: string) {
  const tokens = text.replace(/[，。；：、！？（）()【】\[\]{}<>]/g, " ").split(/\s+|,|\.|;|:|\n/).map((token) => token.trim()).filter((token) => token.length >= 2 && !stopWords.has(token));
  return [...new Set(tokens)].slice(0, 12);
}

function buildBullets(resume: string, keywords: string[]) {
  const lines = resume.split("\n").map((line) => line.replace(/^[-•\s]+/, "").trim()).filter((line) => line.length > 8).slice(0, 4);
  const focus = keywords.slice(0, 4).join(" / ") || "目标岗位关键词";
  const source = lines.length > 0 ? lines : ["梳理核心项目，补齐量化结果与影响范围"];
  return source.map((line, index) => {
    const metric = ["30%", "2 周", "5+", "千万级"][index % 4];
    return `围绕 ${focus}，${line}，沉淀可复用方法并带来约 ${metric} 的效率或质量提升。`;
  });
}

export default function Home() {
  const [resume, setResume] = useState(sampleResume);
  const [job, setJob] = useState(sampleJob);

  const analysis = useMemo(() => {
    const keywords = extractKeywords(job);
    const normalizedResume = resume.toLowerCase();
    const matched = keywords.filter((word) => normalizedResume.includes(word.toLowerCase()));
    const score = keywords.length === 0 ? 68 : Math.round((matched.length / keywords.length) * 100);
    const checks = [
      { label: "联系方式", ok: /@|邮箱|电话|手机|1\d{10}/.test(resume) },
      { label: "量化结果", ok: /\d+|%|倍|万|亿/.test(resume) },
      { label: "岗位关键词", ok: matched.length >= Math.max(2, Math.ceil(keywords.length / 3)) },
      { label: "经历 bullet", ok: /-|•|负责|主导|优化|搭建/.test(resume) },
    ];
    return { keywords, matched, missing: keywords.filter((word) => !matched.includes(word)).slice(0, 6), score, checks, bullets: buildBullets(resume, keywords) };
  }, [resume, job]);

  return (
    <main className="overflow-hidden">
      <section className="px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-[#211a14]/15 pb-6">
          <div className="text-xl font-black tracking-[-0.04em]" aria-label="AI Resume Home">Lancy Resume</div>
          <div className="hidden text-sm text-[#6d5a4b] sm:block">{t.navNote}</div>
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-[#211a14]/15 bg-[#fffaf0]/70 px-4 py-2 text-sm font-semibold text-[#65745f]">{t.badge}</div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.07em] text-[#211a14] sm:text-7xl lg:text-8xl">{t.hero}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#6d5a4b] sm:text-xl">{t.sub}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row"><a href="#workspace" className="rounded-full bg-[#211a14] px-7 py-4 text-center text-sm font-bold text-[#fffaf0] shadow-xl shadow-[#211a14]/20">{t.start}</a><a href="#license" className="rounded-full border border-[#211a14]/20 bg-[#fffaf0]/70 px-7 py-4 text-center text-sm font-bold text-[#211a14]">{t.license}</a></div>
          </div>
          <div className="rounded-[2rem] border border-[#211a14]/15 bg-[#fffaf0] p-5 shadow-2xl shadow-[#211a14]/15"><div className="rounded-[1.4rem] bg-[#24384a] p-6 text-[#fffaf0]"><div className="flex items-center justify-between border-b border-white/15 pb-4"><div><p className="text-xs uppercase tracking-[0.3em] text-[#d9a441]">Resume Score</p><p className="mt-2 text-5xl font-black">{analysis.score}</p></div><div className="rounded-full bg-[#fffaf0] px-4 py-2 text-sm font-bold text-[#24384a]">ATS Ready</div></div><div className="mt-6 grid gap-3">{analysis.checks.map((check) => <div key={check.label} className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3"><span>{check.label}</span><span className={check.ok ? "text-[#d9a441]" : "text-[#f0b8a5]"}>{check.ok ? t.pass : t.todo}</span></div>)}</div></div><div className="mt-5 rounded-[1.4rem] border border-[#211a14]/10 bg-white p-6"><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#b86f4b]">AI Rewrite</p><p className="mt-4 text-lg font-bold leading-8 text-[#211a14]">{analysis.bullets[0]}</p></div></div>
        </div>
      </section>
      <section id="workspace" className="px-6 pb-16 sm:px-10 lg:px-16"><div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]"><div className="rounded-[2rem] border border-[#211a14]/15 bg-[#fffaf0]/80 p-5 shadow-xl shadow-[#211a14]/5"><div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-black tracking-[-0.04em]">{t.material}</h2><span className="rounded-full bg-[#65745f]/12 px-3 py-1 text-xs font-bold text-[#65745f]">{t.localDemo}</span></div><label className="text-sm font-bold text-[#6d5a4b]" htmlFor="resume">{t.resume}</label><textarea id="resume" value={resume} onChange={(event) => setResume(event.target.value)} className="mt-2 h-64 w-full resize-none rounded-3xl border border-[#211a14]/10 bg-white/80 p-4 leading-7 outline-none transition focus:border-[#b86f4b]" /><label className="mt-5 block text-sm font-bold text-[#6d5a4b]" htmlFor="job">{t.job}</label><textarea id="job" value={job} onChange={(event) => setJob(event.target.value)} className="mt-2 h-44 w-full resize-none rounded-3xl border border-[#211a14]/10 bg-white/80 p-4 leading-7 outline-none transition focus:border-[#b86f4b]" /></div><div className="grid gap-6"><div className="rounded-[2rem] border border-[#211a14]/15 bg-[#211a14] p-6 text-[#fffaf0] shadow-xl shadow-[#211a14]/10"><p className="text-sm font-bold text-[#d9a441]">{t.match}</p><p className="mt-2 text-6xl font-black tracking-[-0.08em]">{analysis.score}%</p><p className="mt-3 text-sm leading-6 text-[#efe0c9]">{t.covered} {analysis.matched.length} {t.keywordAdvice}</p><div className="mt-6 flex flex-wrap gap-2">{analysis.keywords.map((word) => <span key={word} className={`rounded-full px-3 py-1 text-sm ${analysis.matched.includes(word) ? "bg-[#d9a441] text-[#211a14]" : "bg-white/10 text-[#efe0c9]"}`}>{word}</span>)}</div></div><div className="grid gap-6 xl:grid-cols-2"><div className="rounded-[2rem] border border-[#211a14]/15 bg-[#fffaf0]/85 p-6"><h3 className="text-xl font-black tracking-[-0.04em]">{t.rewrite}</h3><div className="mt-4 space-y-3">{analysis.bullets.map((bullet) => <p key={bullet} className="rounded-2xl bg-white/80 p-4 text-sm leading-7 text-[#44362c]">{bullet}</p>)}</div></div><div className="rounded-[2rem] border border-[#211a14]/15 bg-[#fffaf0]/85 p-6"><h3 className="text-xl font-black tracking-[-0.04em]">{t.missing}</h3><div className="mt-4 flex flex-wrap gap-2">{(analysis.missing.length ? analysis.missing : [t.noMissing]).map((word) => <span key={word} className="rounded-full border border-[#b86f4b]/25 bg-[#b86f4b]/10 px-3 py-2 text-sm font-bold text-[#8d4f35]">{word}</span>)}</div><p className="mt-6 rounded-2xl bg-white/70 p-4 text-sm leading-7 text-[#6d5a4b]">{t.advice}</p></div></div></div></div></section>
      <section className="px-6 pb-16 sm:px-10 lg:px-16"><div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">{[["01", "结构化编辑", "按基本信息、技能、经历、项目拆分内容，减少空白页焦虑。"], ["02", "实时预览", "参考 Magic Resume 的所见即所得体验，后续支持多模板切换。"], ["03", "导出闭环", "预留 PDF / Markdown 导出路线，方便投递不同渠道。"]].map(([step, title, desc]) => <article key={step} className="rounded-[2rem] border border-[#211a14]/15 bg-[#fffaf0]/70 p-6"><p className="text-sm font-black text-[#b86f4b]">{step}</p><h3 className="mt-4 text-2xl font-black tracking-[-0.04em]">{title}</h3><p className="mt-3 leading-7 text-[#6d5a4b]">{desc}</p></article>)}</div></section>
      <section id="license" className="px-6 pb-12 sm:px-10 lg:px-16"><div className="mx-auto max-w-7xl rounded-[2rem] border border-[#211a14]/15 bg-[#24384a] p-6 text-[#fffaf0] sm:p-8"><h2 className="text-2xl font-black tracking-[-0.04em]">{t.licenseTitle}</h2><p className="mt-4 max-w-4xl leading-8 text-[#efe0c9]">{t.licenseText}</p></div></section>
    </main>
  );
}
