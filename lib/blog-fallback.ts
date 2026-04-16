type FallbackPost = {
  id: number;
  slug: string;
  date: string;
  modified?: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded: {
    "wp:featuredmedia": {
      source_url: string;
      media_details: {
        sizes: {
          medium_large: {
            source_url: string;
          };
          full: {
            source_url: string;
          };
        };
      };
    }[];
  };
};

type PostLike = {
  slug: string;
  date: string;
};

const BLOG_IMAGE = "/assets/images/blog.webp";
const NEWSROOM_IMAGE = "/assets/images/newsroom.webp";
const FABORCHESTRATOR_IMAGE ="/assets/images/PR.png";
function createFeaturedMedia(sourceUrl: string) {
  return {
    "wp:featuredmedia": [
      {
        source_url: sourceUrl,
        media_details: {
          sizes: {
            medium_large: { source_url: sourceUrl },
            full: { source_url: sourceUrl },
          },
        },
      },
    ],
  };
}

function createPost({
  id,
  slug,
  date,
  title,
  excerpt,
  content,
  image,
}: {
  id: number;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
}): FallbackPost {
  return {
    id,
    slug,
    date,
    title: { rendered: title },
    excerpt: { rendered: excerpt },
    content: { rendered: content },
    _embedded: createFeaturedMedia(image),
  };
}
const NEWSROOM_IMAGE_MAP: Record<string, string> = {
  "athena-and-tech-mahindra-announce-partnership":
    "/assets/images/Tech-Mahindra-pr.jpeg",

  "authorised-reseller-partnership-with-twinzo":
    "/assets/images/twnzo-pr.png",
};

export const FALLBACK_BLOG_POSTS: FallbackPost[] = [
  createPost({
    id: 20260415,
    slug: "athena-launches-faborchestrator-agentic-ai-for-manufacturing",
    date: "2026-04-15T00:00:00.000Z",
    title: "Athena Launches FabOrchestrator: Agentic AI for Manufacturing",
    excerpt:
      "Athena introduces FabOrchestrator, an agentic AI experience designed to help manufacturers connect information faster, coordinate work more effectively, and turn operational signals into action.",
    image: "/assets/images/fog.png",
 content: `
  <h1>Athena Launches FabOrchestrator™ — Agentic AI for Manufacturing</h1>

  <p><strong>FREMONT, CA – April 15, 2026</strong> — Athena Technology Solutions, a premier provider of advanced MES solutions, today announced FabOrchestrator™, the manufacturing industry's first Agentic AI Foundry designed to transform factory operations.</p>

  <h2>The Challenge</h2>

  <p>Manufacturing teams face relentless pressure to do more with less—spending countless hours on manual reporting, chasing data across disconnected systems, handling repetitive support tickets, and navigating complex configurations. These inefficiencies slow production, increase costs, and drain engineering resources.</p>

  <!-- ✅ IMAGE INSERT -->
  <p>
    <img 
      src="${FABORCHESTRATOR_IMAGE}" 
      alt="FabOrchestrator AI Manufacturing"
      style="width:100%; height:auto; border-radius:12px; margin:20px 0;"
    />
  </p>

  <p><strong>FabOrchestrator™ puts AI agents to work—so your team can focus on what matters most.</strong></p>

  <h2>What is FabOrchestrator™?</h2>

  <p>FabOrchestrator™ serves as the Agentic AI Nucleus of your factory—a central intelligence platform with four powerful capabilities:</p>

  <ul>
    <li><strong>FabInsight™</strong> — Ask questions in plain English and get instant reports and insights from your factory data</li>
    <li><strong>AI Support Engineer</strong> — Automatically handles routine support tickets and escalates complex issues when needed</li>
    <li><strong>Modeling Agent</strong> — Answers MES modeling questions and guides teams through system upgrades</li>
    <li><strong>Back-end Agent</strong> — Generates code snippets to accelerate MES implementations</li>
  </ul>

  <h2>Partnership</h2>

  <p>FabOrchestrator™ is built in partnership with LLM at Scale.AI, an enterprise agentic AI platform specializing in factory automation, multi-agent orchestration, and large language models.</p>

  <h2>Executive Quotes</h2>

  <p><strong>"This is a major advancement for the MES ecosystem,"</strong> said Senthil Ranganathan, Athena Founder and CEO. "FabOrchestrator™ streamlines everyday tasks like reporting and support, delivering real value to our customers and their supply chain partners."</p>

  <p><strong>"We're partnering with Athena to bring agentic AI directly to the factory floor,"</strong> said Jothi, Chief Agentic AI Architect at LLM at Scale.AI. "FabOrchestrator™ proves intelligent agents can transform complex manufacturing operations—helping teams work faster with far less effort."</p>

  <h2>About Athena</h2>

  <p>Athena Technology Solutions is an Industry 4.0 solutions provider specializing in MES, PLM, and ERP implementations. Since 2011, Athena has served semiconductor, electronics, medical devices, and clean energy industries. As a trusted partner of Siemens and Critical Manufacturing, Athena drives digital transformation for manufacturers worldwide. Learn more at athenatec.com.</p>

  <h2>About LLM at Scale.AI</h2>

  <p>LLM at Scale.AI is an enterprise-grade Agentic AI platform purpose-built for multi-agent orchestration, LLM integration, and autonomous enterprise automation. Trusted by industry leaders including JTC, CBRE, JLL, Cushman & Wakefield, Johnson Controls, and the State of California — delivering measurable business transformation at scale. Learn more at llmatscale.ai</p>

  <h2>Media Contact</h2>
    <p>
    Senthil Ranganathan<br/>
    

      <a 
    href="mailto:rsenthil@athenatec.com" 
    target="_blank" 
    rel="noopener noreferrer"
    style="color:#1c4584; text-decoration:underline;"
  >
    rsenthil@athenatec.com
  </a>
  </p>

<p>
  <strong>Connect:</strong><br/>

  <a 
    href="https://www.linkedin.com/company/athena-technology-solutions" 
    target="_blank" 
    rel="noopener noreferrer"
    style="color:#1c4584; text-decoration:underline;"
  >
    LinkedIn: Athena Technology Solutions
  </a>
  <br/>

  <a 
    href="https://x.com/athena_tec" 
    target="_blank" 
    rel="noopener noreferrer"
    style="color:#1c4584; text-decoration:underline;"
  >
    X: @athena_tec
  </a>
</p>



  <p><strong>Tags:</strong> Agentic AI | Manufacturing AI | Digital Transformation | Industry 4.0 | MES Solutions</p>

  
`
  }),
  createPost({
    id: 20260313,
    slug: "beyond-the-software-why-your-mes-selection-needs-a-blueprint-not-just-a-demo",
    date: "2026-03-13T00:00:00.000Z",
    title:
      "Beyond the Software: Why Your MES Selection Needs a Blueprint, Not Just a Demo",
    excerpt:
      "MES selection works best when manufacturers align vision, process design, architecture, and change readiness before falling in love with a demo.",
    image: BLOG_IMAGE,
    content: `
      <p>Selecting an MES is rarely a software-only decision. The platform matters, but the outcome depends just as much on process clarity, integration strategy, governance, and adoption across the business. A polished demo can create excitement, yet it can also hide the harder questions that determine whether an MES program will actually deliver value on the shop floor.</p>
      <h2>Start with the operating model</h2>
      <p>Before comparing features, manufacturers should document the decisions the MES must support, the workflows that need to be standardized, and the exceptions that still require flexibility. A clear blueprint turns vendor conversations into practical design reviews instead of generic product pitches.</p>
      <p>That blueprint should cover production execution, quality checkpoints, material movement, genealogy, operator experience, and the handoffs to ERP, PLM, and analytics systems. When those flows are mapped first, teams can evaluate whether a platform fits the business instead of forcing the business into a demo script.</p>
      <h2>Look beyond the happy path</h2>
      <p>The real test of an MES is not how well it handles an ideal production run. The real test is how it behaves when a line goes down, a part revision changes midstream, a quality hold is triggered, or a plant needs to support a different operating model than the template site. Those scenarios reveal the true cost of configuration, customization, and long-term support.</p>
      <p>Manufacturers should also weigh implementation effort, data readiness, upgrade posture, and the strength of the partner ecosystem. A system that looks strong in a demo but requires heavy custom work to match day-to-day operations can slow down deployment and raise lifecycle costs.</p>
      <h2>Use selection to accelerate transformation</h2>
      <p>At Athena, we see MES selection as an opportunity to clarify strategy, simplify complexity, and build alignment across operations, IT, engineering, and leadership. When the blueprint comes first, the software decision becomes more confident, the rollout becomes more predictable, and the business is better positioned to scale improvements after go-live.</p>
    `,
  }),
  createPost({
    id: 20251211,
    slug: "the-ai-powered-mes-from-system-of-record-to-system-of-intelligence",
    date: "2025-12-11T00:00:00.000Z",
    title:
      "The AI-Powered MES: From System of Record to System of Intelligence",
    excerpt:
      "AI is helping MES move from passive reporting toward guided decisions, faster responses, and more resilient manufacturing operations.",
    image: BLOG_IMAGE,
    content: `
      <p>For years, MES platforms have been trusted systems of record. They capture transactions, enforce workflows, and provide the traceability manufacturers need to run compliant, repeatable operations. The next shift is already underway: AI is turning MES into a system of intelligence that can interpret signals, recommend actions, and help teams respond faster to change.</p>
      <h2>Turning data into direction</h2>
      <p>Manufacturing systems already generate enormous amounts of data, but many teams still spend too much time turning that information into decisions. AI helps close that gap by connecting context across production, quality, materials, and equipment events. Instead of asking teams to search dashboards for the cause of a problem, an AI-enabled MES can surface the likely drivers and present the next-best action.</p>
      <p>This changes the role of MES from historical documentation to operational guidance. Supervisors can prioritize the issues that matter most. Engineers can identify emerging constraints earlier. Operators can receive recommendations that are grounded in real-time process conditions rather than static rules alone.</p>
      <h2>Smarter execution on the shop floor</h2>
      <p>AI also strengthens core execution flows. Scheduling can respond more intelligently to breakdowns and rush orders. Quality processes can highlight patterns before defects spread. Work instructions can become more adaptive, helping people make better decisions without adding unnecessary complexity to the operator experience.</p>
      <p>That intelligence is most valuable when it is embedded directly into the workflows teams already use. Manufacturers do not need another isolated analytics tool. They need intelligence that lives inside the system where work is planned, executed, reviewed, and improved.</p>
      <h2>Building a practical path forward</h2>
      <p>The future MES will still need strong transactional discipline, robust integrations, and reliable traceability. AI does not replace those foundations; it amplifies them. At Athena, we believe the best results come from combining proven MES architecture with targeted AI accelerators that solve high-value operational problems first, then expand as trust and business impact grow.</p>
    `,
  }),
  createPost({
    id: 20251006,
    slug: "minimize-idle-time-streamline-ordering-with-a-digital-twin",
    date: "2025-10-06T00:00:00.000Z",
    title: "Minimize idle time, streamline ordering with a Digital Twin",
    excerpt:
      "Digital twin experiences can help manufacturers see bottlenecks sooner, coordinate decisions faster, and reduce the delays that quietly erode throughput.",
    image: BLOG_IMAGE,
    content: `
      <p>Idle time often hides in the spaces between systems. A production planner sees one view of the operation, the warehouse team sees another, and leadership receives updates only after delays have already affected output. Digital twin technology helps bridge that gap by providing a shared visual model of the factory and its current operating conditions.</p>
      <h2>Visibility that supports action</h2>
      <p>When teams can explore production status, material movement, and constraints in a more intuitive way, they can make decisions faster and with greater confidence. Ordering priorities become clearer. Bottlenecks stand out earlier. Cross-functional conversations become shorter because everyone is working from the same operational picture.</p>
      <p>That matters especially in environments where even small disruptions can cascade into schedule slips, excess inventory, or idle equipment. A digital twin does more than make the operation look modern; it shortens the distance between what is happening and what teams do next.</p>
      <h2>Connecting digital twin value to execution</h2>
      <p>The strongest results come when visualization is linked to execution data, planning assumptions, and plant-specific workflows. That allows manufacturers to use the digital twin not only as a monitoring layer, but as a tool for simulation, coordination, and improvement.</p>
      <p>Athena sees this as part of a broader operational maturity journey. By connecting digital twin capabilities with MES, ERP, and planning processes, manufacturers can reduce idle time, improve responsiveness, and create a more connected operating model from order intake to production delivery.</p>
    `,
  }),
  createPost({
    id: 20250918,
    slug: "the-ai-driven-evolution-of-mes-athenas-viewpoint",
    date: "2025-09-18T00:00:00.000Z",
    title: "The AI-Driven Evolution of MES: Athena’s Viewpoint",
    excerpt:
      "AI gives MES the ability to predict, guide, and adapt, helping manufacturers move from reactive execution to more intelligent operations.",
    image: BLOG_IMAGE,
    content: `
      <p>Manufacturing Execution Systems have always been essential for connecting the shop floor with the business. They capture production activity, maintain traceability, and support compliance. In a fast-changing manufacturing environment, however, visibility alone is no longer enough. Teams also need systems that help them interpret signals quickly and act with confidence.</p>
      <h2>From record keeping to real-time guidance</h2>
      <p>AI changes the role of MES by moving it from passive reporting toward active decision support. Rather than leaving engineers and supervisors to work through endless dashboards, AI can identify patterns, anticipate outcomes, and recommend next steps in real time. That means teams can resolve issues sooner and reduce the cost of reacting late.</p>
      <h2>Scheduling and quality with more foresight</h2>
      <p>Schedules are constantly affected by change, whether the source is equipment downtime, supply disruption, or urgent customer demand. AI-enabled MES helps rebalance plans as conditions shift so that production can stay aligned with cost, efficiency, and delivery priorities. The same idea applies to quality: instead of waiting for failures to appear, teams can use machine and process signals to detect quality risks earlier and respond upstream.</p>
      <p>This creates a more resilient operating model. Waste is reduced, rework can be avoided, and customer commitments become easier to protect when issues are addressed before they spread.</p>
      <h2>Augmenting people, not replacing them</h2>
      <p>At Athena, we view AI as a practical accelerator for the workforce. Intelligent recommendations, guided workflows, and contextual insights help operators, planners, and engineers spend less time searching for answers and more time improving performance. The goal is not to remove human judgment, but to strengthen it with timely, actionable intelligence embedded directly into execution processes.</p>
      <p>That is why we see AI not as an optional add-on to MES, but as the next stage in MES evolution. The manufacturers who adopt it thoughtfully will be better prepared to make faster decisions, absorb disruption, and scale improvement across their operations.</p>
    `,
  }),
  createPost({
    id: 20250901,
    slug: "athena-and-tech-mahindra-announce-partnership",
    date: "2025-09-01T00:00:00.000Z",
    title: "Athena and Tech Mahindra Announce Partnership",
    excerpt:
      "Athena and Tech Mahindra are partnering to help manufacturers accelerate digital transformation with stronger execution, integration, and AI-enabled operations.",
   image:
    NEWSROOM_IMAGE_MAP[
      "athena-and-tech-mahindra-announce-partnership"
    ],
    content: `

      <p>Athena and Tech Mahindra have announced a strategic partnership focused on accelerating digital transformation in manufacturing. The collaboration brings together Athena’s execution-focused manufacturing expertise and Tech Mahindra’s global delivery scale to help customers modernize operations with greater speed and consistency.</p>
      <h2>Focused on smarter manufacturing programs</h2>
      <p>The partnership is designed to support manufacturers that need stronger alignment across MES, enterprise systems, plant operations, and emerging AI initiatives. By combining consulting, domain knowledge, implementation capability, and scalable delivery support, the two organizations aim to help customers move from strategy to execution with less friction.</p>
      <p>That is particularly important for manufacturers navigating complex programs that span multiple plants, integration touchpoints, and business priorities. Success depends not only on the technology selection, but on execution discipline, change readiness, and the ability to operationalize value across the enterprise.</p>
      <h2>Expanding what customers can deliver</h2>
      <p>Together, Athena and Tech Mahindra are positioned to support programs that improve visibility, standardize execution, and unlock more intelligent decision-making on the shop floor. The partnership reflects a shared commitment to practical transformation, one that connects operational needs with scalable delivery and long-term business impact.</p>
    `,
  }),
  createPost({
    id: 20250814,
    slug: "authorised-reseller-partnership-with-twinzo",
    date: "2025-08-14T00:00:00.000Z",
    title: "Authorised Reseller Partnership with Twinzo",
    excerpt:
      "Athena’s authorised reseller partnership with twinzo expands access to immersive digital twin experiences for manufacturers looking to improve visibility and decision-making.",
    image:
    NEWSROOM_IMAGE_MAP[
      "authorised-reseller-partnership-with-twinzo"
    ],
    content: `
     <p>
    
  </p>
      <p>Athena has entered into an authorised reseller partnership with twinzo, expanding the ability to bring immersive digital twin capabilities to manufacturers that want a clearer, more connected view of their operations. The collaboration is aimed at helping customers improve visibility, planning, and communication across the factory.</p>
      <h2>Making complex operations easier to understand</h2>
      <p>Digital twins can turn fragmented operational data into a shared visual environment that teams can explore together. That makes it easier to spot bottlenecks, understand equipment relationships, and coordinate decisions across production, maintenance, planning, and leadership. For manufacturers, that means faster conversations and better-informed action.</p>
      <p>By combining Athena’s manufacturing transformation expertise with twinzo’s visualization approach, customers gain a practical way to connect digital twin experiences with real operational use cases rather than treating them as standalone showcases.</p>
      <h2>From visibility to execution</h2>
      <p>The partnership supports a broader goal: helping manufacturers move from disconnected data toward connected execution. When visualization, factory context, and execution systems work together, teams can reduce response time, improve understanding, and create a stronger foundation for continuous improvement.</p>
    `,
  }),
  createPost({
    id: 20250811,
    slug: "solving-the-integration-puzzle-in-smt-manufacturing",
    date: "2025-08-11T00:00:00.000Z",
    title: "Solving the Integration Puzzle in SMT Manufacturing",
    excerpt:
      "SMT manufacturers need tighter integration across machines, planning, quality, and business systems if they want faster decisions and more stable execution.",
    image: BLOG_IMAGE,
    content: `
      <p>Surface Mount Technology manufacturing depends on precision, speed, and coordination across a tightly connected set of processes. When equipment data, quality events, planning signals, and enterprise transactions are scattered across disconnected systems, even small delays can create significant operational drag.</p>
      <h2>Why integration is the real differentiator</h2>
      <p>In SMT environments, integration is not a technical afterthought. It is the mechanism that turns machine performance, material traceability, and production decisions into a single operational picture. Without that alignment, teams spend too much time reconciling data, chasing root causes, and manually stitching together information that should already be connected.</p>
      <p>Manufacturers need integration that spans MES, ERP, quality systems, machine interfaces, planning inputs, and analytics platforms. The goal is not simply to move data between systems, but to make sure the right people can trust it and act on it quickly.</p>
      <h2>Building a more resilient SMT operation</h2>
      <p>When the integration puzzle is solved well, manufacturers gain faster issue resolution, stronger traceability, improved material control, and a smoother path for scaling improvement initiatives. Athena works with customers to design architectures that respect plant realities while reducing the friction that slows execution.</p>
      <p>That approach helps SMT organizations move from reactive coordination to connected, data-driven execution across the full manufacturing lifecycle.</p>
    `,
  }),
  createPost({
    id: 20250804,
    slug: "chips-making-chips-how-virtualization-digital-twins-and-machine-learning-are-accelerating-the-spiral-of-innovation",
    date: "2025-08-04T00:00:00.000Z",
    title:
      "Chips Making Chips: How Virtualization, Digital Twins and Machine Learning are Accelerating the Spiral of Innovation",
    excerpt:
      "Semiconductor leaders are combining virtualization, digital twins, and machine learning to increase speed, reduce risk, and improve decision quality across innovation cycles.",
    image: BLOG_IMAGE,
    content: `
      <p>The semiconductor industry has always operated at the edge of complexity. Each technology cycle increases the pressure to innovate faster while controlling yield risk, cost, and time to market. That is why the next wave of innovation is being powered not just by better hardware, but by better digital capabilities behind the hardware.</p>
      <h2>Accelerating decisions with digital models</h2>
      <p>Virtualization and digital twins allow manufacturers to model systems, processes, and constraints before expensive real-world changes are made. That improves collaboration across design, engineering, and operations while reducing the cost of experimentation. Teams can test assumptions earlier, identify likely issues sooner, and move with greater confidence.</p>
      <p>Machine learning adds another layer by helping teams uncover patterns that are difficult to see through conventional reporting. Whether the challenge is process drift, yield risk, maintenance behavior, or production optimization, learning systems can shorten the time between signal detection and informed action.</p>
      <h2>A compounding advantage</h2>
      <p>The most important effect is cumulative. Better models create better data. Better data improves decisions. Better decisions accelerate the next round of innovation. That spiral of improvement is becoming a strategic advantage for semiconductor organizations that want to scale complexity without losing control.</p>
      <p>Athena views these capabilities as core enablers for modern semiconductor execution, especially when they are connected to the operational systems that run the factory every day.</p>
    `,
  }),
  createPost({
    id: 20250728,
    slug: "transforming-manufacturing-key-focus-areas-trends-and-challenges-in-digital-transformation",
    date: "2025-07-28T00:00:00.000Z",
    title:
      "Transforming Manufacturing: Key Focus Areas, Trends, and Challenges in Digital Transformation",
    excerpt:
      "Manufacturers are investing in digital transformation to improve agility, traceability, and performance, but success still depends on execution, integration, and change management.",
    image: BLOG_IMAGE,
    content: `
      <p>Digital transformation in manufacturing is no longer an optional future-state discussion. It is a present operational priority driven by cost pressure, customer expectations, supply chain volatility, and the need for more resilient execution. The challenge is that transformation is rarely about one system. It is about creating a connected operating model that supports better decisions across the business.</p>
      <h2>Where manufacturers are focusing first</h2>
      <p>Many organizations begin with visibility, traceability, and workflow standardization. Those priorities make sense because they create the operational discipline required for stronger planning, better quality control, and more scalable improvement. From there, manufacturers often expand into analytics, intelligent automation, and more adaptive execution processes.</p>
      <h2>The trends shaping the next phase</h2>
      <p>Cloud-ready architectures, AI-assisted decision-making, low-code extensibility, and stronger integration between enterprise and plant systems are shaping the direction of modern transformation programs. Companies want platforms that can evolve over time, not isolated solutions that create new silos.</p>
      <p>At the same time, the hardest challenges remain familiar: fragmented data, inconsistent processes, unclear ownership, and change fatigue. Technology alone does not solve those issues. Success depends on alignment across operations, IT, engineering, and leadership, supported by a roadmap that turns vision into sequenced execution.</p>
      <h2>Transformation that sticks</h2>
      <p>Athena approaches digital transformation as a practical business journey. The goal is to deliver measurable value, establish strong foundations, and create the flexibility needed for future capability expansion. That is how manufacturers move beyond isolated projects and build durable digital momentum.</p>
    `,
  }),
  createPost({
    id: 20240718,
    slug: "empowering-manufacturers-for-digital-transformation-leveraging-opcenter-for-enhanced-efficiency-and-productivity",
    date: "2024-07-18T00:00:00.000Z",
    title:
      "Empowering manufacturers for digital transformation: Leveraging Opcenter for enhanced efficiency and productivity",
    excerpt:
      "Athenatec highlights how Opcenter supports more sustainable, scalable, and connected manufacturing by reducing cost, improving visibility, and enabling modern deployment models.",
    image: BLOG_IMAGE,
    content: `
      <p>Digital transformation in manufacturing requires more than incremental software upgrades. It requires an operating platform that can connect design, planning, execution, and continuous improvement while still supporting real-world production constraints. That is the value proposition behind the Opcenter portfolio and the reason it continues to be central to many modernization programs.</p>
      <h2>Connecting impact to operations</h2>
      <p>One of the strongest messages from the Opcenter story is that digital transformation should lead to measurable outcomes. Manufacturers want better productivity, stronger quality, reduced environmental impact, and more manageable operating costs. When execution systems are well integrated, those results become easier to scale because decisions are informed by better data and more consistent processes.</p>
      <p>Opcenter also supports a broader digital thread that connects upstream and downstream activities, helping organizations move beyond isolated point solutions. That matters for companies that want to improve not only what happens on the line, but how engineering, supply chain, and operations work together.</p>
      <h2>Prepared for the next phase of manufacturing</h2>
      <p>Modern manufacturers are also looking for deployment flexibility, stronger observability, and a path to cloud-aligned operating models. Solutions like Opcenter X point toward a future where manufacturers can access advanced execution capability with less infrastructure burden and greater scalability.</p>
      <p>At Athena, we see this evolution as an opportunity to help customers turn transformation ambitions into practical outcomes. The right MES strategy, supported by the right partner and implementation roadmap, can create a more efficient, sustainable, and digitally connected manufacturing organization.</p>
    `,
  }),
];

export const FALLBACK_NEWSROOM_SLUGS = new Set([
  "athena-launches-faborchestrator-agentic-ai-for-manufacturing",
  "athena-and-tech-mahindra-announce-partnership",
  "authorised-reseller-partnership-with-twinzo",
]);

export function getFallbackBlogPosts() {
  return FALLBACK_BLOG_POSTS;
}

export function mergePostsWithFallback<T extends PostLike>(
  posts: T[] | null | undefined,
  fallbackPosts: T[],
) {
  const mergedPosts = new Map<string, T>();

  for (const post of fallbackPosts) {
    mergedPosts.set(post.slug, post);
  }

  for (const post of posts ?? []) {
    mergedPosts.set(post.slug, post);
  }

  return Array.from(mergedPosts.values()).sort(
    (left, right) =>
      new Date(right.date).getTime() - new Date(left.date).getTime(),
  );
}

export function getFallbackPost(slug: string) {
  return FALLBACK_BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}

export function getFallbackNewsroomPosts() {
  return FALLBACK_BLOG_POSTS.filter((post) =>
    FALLBACK_NEWSROOM_SLUGS.has(post.slug),
  );
}
