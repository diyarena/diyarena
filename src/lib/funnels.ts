// Product-specific sales-funnel content. Each product has its own narrative, section headings,
// modules, steps and FAQ. Moves into D1 (editable in admin) in the next database phase.
// Copy describes PLANNED contents only: nothing here promises results or claims files that do not exist yet.

export type Funnel = {
  layout: "journey" | "toolkit" | "planner"; // decides section order and presentation
  headline: string; // H1
  lead: string; // hero supporting copy and SEO description
  problemTitle: string;
  problem: string;
  solutionTitle: string;
  solution: string;
  modules: { title: string; text: string }[];
  steps: string[];
  faq2: [string, string];
};

export const funnels: Record<string, Funnel> = {
  "faceless-youtube-channel-launch-system": {
    layout: "journey",
    headline: "Take a faceless YouTube channel from first idea to first upload.",
    lead: "A step-by-step system for choosing a niche, shaping your channel identity and building a repeatable publishing routine, without appearing on camera.",
    problemTitle: "Why new channels stall",
    problem: "Starting a channel without a plan usually means weeks of scattered ideas, half-finished scripts and no clear schedule.",
    solutionTitle: "One workflow from niche to upload",
    solution: "The system puts the whole process in order: pick a direction, set up your channel identity, plan and script each video, then publish and track it the same way every time.",
    modules: [
      { title: "Choose your channel", text: "Use the selection workbook and niche research framework to compare directions before you commit." },
      { title: "Build and plan", text: "Set your branding checklist, then plan videos, scripts and a content calendar with templates." },
      { title: "Produce and publish", text: "Follow the AI-assisted workflow, thumbnail guide and publishing checklist, then track results in the spreadsheet." },
    ],
    steps: ["Start with the selection workbook and narrow to one niche.", "Fill in the branding checklist and set up your content calendar.", "Plan, script and publish your first video, then log the results in the tracker."],
    faq2: ["How long does it take to set up a channel with this?", "That depends on your pace. The system is organised as steps, so you always know what to do next."],
  },
  "fully-funded-scholarship-toolkit": {
    layout: "toolkit",
    headline: "Keep every scholarship search and application organised in one place.",
    lead: "Frameworks, trackers and templates for researching funding opportunities and preparing applications with clear deadlines and requirements.",
    problemTitle: "Why scholarship searches get messy",
    problem: "Scholarship hunting often means dozens of open tabs, unclear requirements and missed deadlines.",
    solutionTitle: "One system for every application",
    solution: "The toolkit gives you a research framework, a tracker for each opportunity and a checklist for each application, so nothing depends on memory.",
    modules: [
      { title: "Research opportunities", text: "Use the research framework and university spreadsheet to compare programmes and funding side by side." },
      { title: "Prepare your documents", text: "Plan your personal statement and use the CV and recommendation-request templates." },
      { title: "Apply and prepare to interview", text: "Work through the application checklist and the interview preparation resources." },
    ],
    steps: ["Build your shortlist with the research framework.", "Open an application plan for each opportunity and list its requirements.", "Prepare documents, tick the checklist and practise for interviews."],
    faq2: ["Can I use it for any country or level of study?", "The frameworks are general, so you can adapt them to the programmes you are researching. Always follow each provider's official requirements."],
  },
  "remote-job-search-toolkit": {
    layout: "toolkit",
    headline: "Run your remote job search like a project, not a guessing game.",
    lead: "Workbooks, templates and a tracker to prepare strong applications and stay on top of every opportunity.",
    problemTitle: "Why remote job searches get chaotic",
    problem: "Remote job searching gets messy fast: different CV versions, forgotten follow-ups and no view of where each application stands.",
    solutionTitle: "A single place for your whole search",
    solution: "A workbook sets your direction, templates speed up CVs and cover letters, and the tracker shows every application at a glance.",
    modules: [
      { title: "Prepare your materials", text: "Draft your CV, cover letters and professional profile from templates." },
      { title: "Track every application", text: "Log roles, dates and follow-ups in the application tracker." },
      { title: "Get interview-ready", text: "Use the interview guide and portfolio checklist before each conversation." },
    ],
    steps: ["Complete the job search workbook to define the roles you want.", "Tailor the CV and cover letter templates for each application.", "Log it in the tracker and prepare with the interview guide."],
    faq2: ["Will this work for any industry?", "The templates are general and can be adapted to most fields. The portfolio guidance is most useful for roles where you show your work."],
  },
  "ai-productivity-toolkit": {
    layout: "toolkit",
    headline: "Put AI to work on the tasks that fill your week.",
    lead: "A prompt library and ready-made workflows for planning, research and writing, with a guide for choosing the right tool.",
    problemTitle: "Why AI results feel uneven",
    problem: "Many people try an AI tool once, get uneven results and go back to doing everything by hand.",
    solutionTitle: "Structure instead of a blank box",
    solution: "The toolkit gives you structured prompts and step-by-step workflows, so you spend less time starting from nothing.",
    modules: [
      { title: "Prompts ready to adapt", text: "Start from the prompt library for common planning, research and writing tasks." },
      { title: "Workflows you can repeat", text: "Follow productivity and writing workflows from request to finished work." },
      { title: "Choose and automate", text: "Use the tool selection guide and task automation examples to decide what to use and what to automate." },
    ],
    steps: ["Pick one recurring task from your week.", "Start from the matching prompt or workflow and adapt it.", "Review the output yourself, then save the version that works."],
    faq2: ["Do I need paid AI subscriptions?", "The tool guide will explain what each workflow needs before release, so you can choose what suits your budget."],
  },
  "digital-product-creation-blueprint": {
    layout: "journey",
    headline: "Turn a product idea into a launch plan you can follow.",
    lead: "Frameworks for researching, creating, pricing and launching your own digital product.",
    problemTitle: "Why first products stall",
    problem: "Many first products stall between the idea and the launch because the steps are unclear.",
    solutionTitle: "Four stages, one blueprint",
    solution: "The blueprint breaks the work into research, build, offer and launch, each with a worksheet or checklist.",
    modules: [
      { title: "Research the idea", text: "Use the product research framework to test who it is for and what they need." },
      { title: "Build and shape the offer", text: "Develop the product in the workbook, then use the offer guide and pricing worksheet." },
      { title: "Launch it", text: "Draft your landing page, follow the launch checklist and plan your marketing content." },
    ],
    steps: ["Run your idea through the research framework.", "Develop the product and set your offer and price.", "Prepare your landing page and work through the launch checklist."],
    faq2: ["Is it only for ebooks?", "No. The framework applies to many kinds of digital product, such as templates, guides and toolkits."],
  },
  "budget-international-travel-planner": {
    layout: "planner",
    headline: "Know what your trip will cost before you book it.",
    lead: "Spreadsheets and checklists for planning an international trip, comparing options and tracking spending.",
    problemTitle: "Where trip budgets slip",
    problem: "Trip costs creep up when budgets, bookings and notes live in different places.",
    solutionTitle: "Budget, bookings and notes together",
    solution: "One planner brings your budget, destination research, accommodation comparison and expense tracking together.",
    modules: [
      { title: "Plan the budget", text: "Set trip costs in the budgeting spreadsheet and map the trip in the planning workbook." },
      { title: "Compare and decide", text: "Research destinations and compare places to stay side by side." },
      { title: "Prepare and track", text: "Use the preparation checklist and packing list, then log spending in the expense tracker." },
    ],
    steps: ["Set your budget in the spreadsheet.", "Research your destination and compare accommodation.", "Work through the checklists and track spending on the trip."],
    faq2: ["Can I use it for more than one trip?", "Yes. You can copy the sheets for each new trip."],
  },
  "canva-brand-identity-starter-kit": {
    layout: "planner",
    headline: "Build a brand that looks consistent everywhere you show up.",
    lead: "Workbooks and Canva templates for defining your brand and applying it to your posts and materials.",
    problemTitle: "Why brands look inconsistent",
    problem: "Without brand basics, colours, fonts and tone change from one post to the next.",
    solutionTitle: "Strategy first, then style",
    solution: "You define the strategy first, then lock in palette, typography and templates so every piece looks like it belongs together.",
    modules: [
      { title: "Define the brand", text: "Answer the strategy workbook to clarify who you serve and how you sound." },
      { title: "Choose the look", text: "Pick colours and fonts with the palette templates and typography guide." },
      { title: "Apply it", text: "Use the brand board and social templates, then check your work against the consistency checklist." },
    ],
    steps: ["Complete the brand strategy workbook.", "Set your palette and fonts on the brand board.", "Create posts from the templates and review them with the checklist."],
    faq2: ["Will I need design experience?", "No. The kit is built for beginners and uses templates as starting points."],
  },
  "ai-video-content-creation-toolkit": {
    layout: "journey",
    headline: "Plan, script and publish AI-assisted videos with a repeatable routine.",
    lead: "Templates and workflows that take a video from concept to published, with a tracker to learn from every upload.",
    problemTitle: "Why AI video still needs a plan",
    problem: "AI tools make video faster to produce, but they do not tell you what to make or in what order.",
    solutionTitle: "The structure around the tools",
    solution: "The toolkit adds the structure: a concept framework, script templates, a production workflow and a publishing calendar.",
    modules: [
      { title: "Shape the concept", text: "Use the concept framework and script templates to decide what each video should say." },
      { title: "Produce with a workflow", text: "Follow the AI production workflow, voiceover guide and editing checklist." },
      { title: "Publish and learn", text: "Schedule on the publishing calendar and review results in the performance tracker." },
    ],
    steps: ["Write your concept and script from the templates.", "Produce the video using the workflow and editing checklist.", "Publish on schedule and record what happened in the tracker."],
    faq2: ["How is this different from the faceless YouTube system?", "That system is about launching a channel. This toolkit focuses on producing each video with AI tools."],
  },
  "small-business-digital-marketing-toolkit": {
    layout: "toolkit",
    headline: "Plan your marketing around your customer, then measure what works.",
    lead: "Worksheets and templates for defining your customer, planning campaigns and tracking results.",
    problemTitle: "Why marketing feels like guesswork",
    problem: "Small businesses often post regularly but without a plan, so it is hard to tell what is working.",
    solutionTitle: "Customer first, then campaigns",
    solution: "Start with a customer profile and strategy, then turn them into a content calendar and campaign plans you can measure.",
    modules: [
      { title: "Know your customer", text: "Build a customer profile and write your brand messaging." },
      { title: "Plan your activity", text: "Set strategy in the workbook, then schedule the content calendar and campaign worksheets." },
      { title: "Measure results", text: "Record outcomes in the performance tracker and adjust." },
    ],
    steps: ["Complete the customer profile and messaging templates.", "Plan one campaign and fill in the content calendar.", "Review results regularly in the tracker."],
    faq2: ["Do I need paid advertising?", "No. The planning templates work for organic and paid activity alike."],
  },
  "personal-productivity-focus-system": {
    layout: "planner",
    headline: "Plan your week, protect your focus and keep your goals moving.",
    lead: "Planners and trackers for weekly planning, goals, habits and focused work sessions.",
    problemTitle: "Why good intentions fade",
    problem: "Good intentions fade when goals, tasks and habits are scattered across notes and apps.",
    solutionTitle: "Goals, weeks and focus in one flow",
    solution: "One simple system connects your goals to weekly plans, focus sessions and a short reflection.",
    modules: [
      { title: "Set direction", text: "Write your goals in the goal-setting template." },
      { title: "Plan and focus", text: "Use the weekly workbook and focus session planner to protect time for what matters." },
      { title: "Track and reflect", text: "Log habits and projects, then close each week with a reflection worksheet." },
    ],
    steps: ["Write down your top goals.", "Plan the week and schedule focus sessions.", "Review habits and reflect at the end of the week."],
    faq2: ["How much time does it take each week?", "Planning and reflection are designed to be short. How long you spend is up to you."],
  },
  "study-abroad-preparation-planner": {
    layout: "planner",
    headline: "Prepare your study-abroad plan one clear step at a time.",
    lead: "Worksheets, trackers and checklists for comparing destinations, organising documents and planning your budget.",
    problemTitle: "Why preparation feels overwhelming",
    problem: "Preparing to study abroad means juggling destinations, deadlines, documents and costs at once.",
    solutionTitle: "One worksheet for each worry",
    solution: "The planner gives each part its own worksheet, so you can compare, schedule and budget in one place.",
    modules: [
      { title: "Compare your options", text: "Weigh destinations and universities with the comparison worksheet and research tracker." },
      { title: "Organise documents and dates", text: "Use the document checklist and application timeline." },
      { title: "Plan the money", text: "Work out costs in the budget spreadsheet and the preparation workbook." },
    ],
    steps: ["Compare destinations and shortlist universities.", "Build your timeline and document checklist.", "Set a budget and review the workbook before you apply."],
    faq2: ["Does it cover specific countries?", "It is a general planner. Add details for the countries you are considering and confirm requirements with official sources."],
  },
  "ai-business-automation-starter-kit": {
    layout: "journey",
    headline: "Find the tasks worth automating, then build your first workflows.",
    lead: "Planning workbooks, workflow diagrams and example automations for routine business processes.",
    problemTitle: "Why automations fall apart",
    problem: "Automating without a plan often produces fragile workflows that nobody maintains.",
    solutionTitle: "Map first, then build",
    solution: "You map the process first, then use workflow examples and implementation notes to build and test each automation.",
    modules: [
      { title: "Map your processes", text: "Use the planning workbook and process templates to find repeatable tasks." },
      { title: "Start from examples", text: "Adapt the n8n examples, including lead management and customer follow-up." },
      { title: "Build and check", text: "Follow the implementation instructions and use the diagrams to document what you built." },
    ],
    steps: ["List your repeatable tasks in the planning workbook.", "Choose one process and adapt the closest example workflow.", "Implement it step by step, test it, then document it."],
    faq2: ["Do I need to code?", "The examples are designed for visual workflow tools, though some steps may involve configuration. Requirements will be listed per workflow."],
  },
};
