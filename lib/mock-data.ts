import {
  BarChart3,
  Brain,
  Camera,
  ClipboardCheck,
  FileText,
  MessageSquareText,
  Mic,
  Sparkles,
  Target,
  Video,
} from "lucide-react";

export const featureCards = [
  {
    title: "AI-led mock interviews",
    description: "Practice in a realistic conversation with adaptive follow-ups.",
    icon: Brain,
  },
  {
    title: "Video recording",
    description: "Review body language and delivery after each session.",
    icon: Video,
  },
  {
    title: "Transcript capture",
    description: "See your answers in writing with structured feedback.",
    icon: FileText,
  },
  {
    title: "Instant feedback",
    description: "Get clear next steps while the interview is still fresh.",
    icon: Sparkles,
  },
  {
    title: "Role-specific questions",
    description: "Target technical, HR, behavioral, managerial, or mixed rounds.",
    icon: Target,
  },
  {
    title: "Score breakdown",
    description: "Track technical depth, clarity, confidence, and structure.",
    icon: BarChart3,
  },
];

export const dashboardMetrics = [
  { label: "Interviews Completed", value: "12", change: "+3 this month" },
  { label: "Average Score", value: "78", change: "+8 pts" },
  { label: "Technical Score", value: "74", change: "Needs examples" },
  { label: "Communication Score", value: "82", change: "Strong pace" },
  { label: "Confidence Score", value: "76", change: "+5 pts" },
  { label: "Remaining Free Minutes", value: "15", change: "1 free session" },
];

export const recentInterviews = [
  {
    role: "DevOps Engineer",
    type: "Technical",
    date: "Today",
    duration: "28 min",
    score: "78",
    status: "Ready",
  },
  {
    role: "Frontend Developer",
    type: "Mixed",
    date: "Jun 8",
    duration: "30 min",
    score: "82",
    status: "Reviewed",
  },
  {
    role: "Product Manager",
    type: "Behavioral",
    date: "Jun 2",
    duration: "15 min",
    score: "71",
    status: "Reviewed",
  },
];

export const trendData = [
  { label: "W1", score: 64 },
  { label: "W2", score: 68 },
  { label: "W3", score: 73 },
  { label: "W4", score: 78 },
];

export const transcript = [
  {
    speaker: "Ananya",
    text: "Tell me about a production issue you solved and how you approached it.",
  },
  {
    speaker: "Candidate",
    text: "In my last project, ECS tasks were restarting during a deployment. I checked service events, container logs, and CPU metrics before rolling back the image.",
  },
  {
    speaker: "Ananya",
    text: "What tradeoff did you make when deciding to roll back instead of patching forward?",
  },
  {
    speaker: "Candidate",
    text: "Customer impact was increasing, so restoring stability came first. We patched forward after isolating the config mismatch.",
  },
];

export const scoreCards = [
  { label: "Technical Depth", score: 74, tone: "blue" },
  { label: "Communication", score: 84, tone: "green" },
  { label: "Confidence", score: 76, tone: "cyan" },
  { label: "Problem Solving", score: 79, tone: "blue" },
  { label: "Clarity", score: 81, tone: "green" },
  { label: "Structure", score: 72, tone: "amber" },
];

export const resultSections = [
  {
    title: "Summary",
    body: "You explained ECS and EKS clearly, but your answer lacked real production examples. Add one incident, one decision, and one measurable outcome to make your response stronger.",
  },
  {
    title: "Strengths",
    body: "Clear vocabulary, steady pace, and good awareness of rollback strategy. Your answers were easy to follow and stayed relevant.",
  },
  {
    title: "Improvement Areas",
    body: "Use more concrete metrics, name the business impact, and close answers with what changed after your intervention.",
  },
  {
    title: "Recommended Next Practice",
    body: "Run a 30-minute technical round focused on incident response, observability, and cloud deployment decisions.",
  },
];

export const setupOptions = {
  types: ["Technical", "HR", "Behavioral", "Managerial", "Mixed"],
  durations: ["15 min free", "30 min", "60 min"],
  levels: ["Entry level", "Mid level", "Senior", "Lead"],
  difficulties: ["Balanced", "Challenging", "Expert"],
};

export const readinessItems = [
  "Camera ready",
  "Microphone ready",
  "Stable connection",
  "Recording enabled",
  "AI interviewer ready",
];

export const waitingTips = [
  "Stay in a quiet place",
  "Keep your camera on",
  "Use headphones for best audio quality",
  "Speak naturally",
];

export const previewItems = [
  "Introduction round",
  "Role-specific technical questions",
  "Scenario-based questions",
  "Communication assessment",
  "Final feedback report",
];

export const processingSteps = [
  "Recording saved",
  "Uploading recording",
  "Analyzing transcript",
  "Generating feedback",
  "Preparing report",
];

export const heroPreviewItems = [
  { label: "Camera", icon: Camera },
  { label: "Mic", icon: Mic },
  { label: "Transcript", icon: MessageSquareText },
  { label: "Report", icon: ClipboardCheck },
];
