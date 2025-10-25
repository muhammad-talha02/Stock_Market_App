import { getNews } from "../actions/finnhub.actions";
import { getAllUsersForNewsEmail } from "../actions/users.actions";
import { getWatchlistSymbolsByEmail } from "../actions/watchlist.actions";
import { sendNewsSummaryEmail, sendWelcomeEmail } from "../nodemailer";
import { formatDateToday } from "../utils";
import { inngest } from "./client";
import {
  NEWS_SUMMARY_EMAIL_PROMPT,
  PERSONALIZED_WELCOME_EMAIL_PROMPT,
} from "./prompts";

export const sendSignUpEmail = inngest.createFunction(
  { id: "sign-up-email" },
  { event: "app/user.created" },
  async ({ event, step }) => {
    const userProfile = `
  - Country: ${event.data.country}
  - Investment goals: ${event.data.investmentGoals}
  - Risk Tolerance: ${event.data.riskTolerance}
  - Prefered Industry: ${event.data.preferedIndustry}
`;

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{userProfile}}",
      userProfile
    );
    const response = await step.ai.infer("generate-welcome-intro", {
      model: step.ai.models.gemini({ model: "gemini-2.5-flash" }),
      body: {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
    });
    await step.run("send-welcome-email", async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const introText =
        (part && "text" in part ? part.text : null) ||
        "Thanks for joing us, Hurray!";

      const {
        data: { email, name },
      } = event;
      await sendWelcomeEmail({ email, name, intro: introText });
      return;
    });
    return {
      success: true,
      message: "Welcome email sent successfully",
    };
  }
);

// | Field        | Value | Meaning                             |
// | ------------ | ----- | ----------------------------------- |
// | Minute       | `0`   | Run at minute 0 → start of the hour |
// | Hour         | `12`  | Run at 12 PM (noon)                 |
// | Day of Month | `*`   | Every day of the month              |
// | Month        | `*`   | Every month                         |
// | Day of Week  | `*`   | Every day of the week               |

export const sendDailyNewsSummary = inngest.createFunction(
  { id: "daily-news-summary" },
  [{ event: "app/send.daily.news" }, { cron: "TZ=Asia/Dubai 0 12 * * *" }],

  async ({ step }) => {
    // Step 1:  Get all users for news daily

    const users = await step.run("get-all-users", getAllUsersForNewsEmail);
    if (!users || users.length === 0)
      return { success: "false", message: "no user found for news email" };
    // Step 2:  Fetch personalized news for each user
    const results = await step.run("fetch-user-news", async () => {
      const perUser: Array<{ user: User; articles: MarketNewsArticle[] }> = [];
      for (const user of users as User[]) {
        try {
          const symbols = await getWatchlistSymbolsByEmail(user.email);
          let articles = await getNews(symbols);
          // Enforce max 6 articles per user
          articles = (articles || []).slice(0, 6);
          // If still empty, fallback to general
          if (!articles || articles.length === 0) {
            articles = await getNews();
            articles = (articles || []).slice(0, 6);
          }
          perUser.push({ user, articles });
        } catch (e) {
          console.error("daily-news: error preparing user news", e);
          perUser.push({ user, articles: [] });
        }
      }
      return perUser;
    });
    // Step 3:  Summarize these news via AI for each user

    const userNewsSummaries: { user: User; newsContent: string | null }[] = [];
    for (const { user, articles } of results) {
      try {
        const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace(
          "{{newsData}}",
          JSON.stringify(articles, null, 2)
        );
        const response = await step.ai.infer(`summarize-news-${user.email}`, {
          model: step.ai.models.gemini({ model: "gemini-2.5-flash" }),
          body: { contents: [{ role: "user", parts: [{ text: prompt }] }] },
        });

        const part = response.candidates?.[0]?.content?.parts?.[0];
        const newsContent =
          (part && "text" in part ? part.text : null) || "No market news";
        userNewsSummaries.push({ user, newsContent });
      } catch {
        console.log("Failed to summarize news for", user.id);
        userNewsSummaries.push({ user, newsContent: null });
      }
    }

    // Step 4:  Send Emails
    await step.run("send-news-email", async () => {
      await Promise.all(
        userNewsSummaries?.map(async ({ user, newsContent }) => {
          if (!newsContent) return false;
          const date = formatDateToday();
          return await sendNewsSummaryEmail({
            email: user.email,
            date,
            newsContent,
          });
        })
      );
    });
    return { success: true, message: "Daily news email sent successfully" };
  }
);
