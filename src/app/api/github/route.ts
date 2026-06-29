import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// TODO: Replace with your real GitHub username
const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "TODO-your-github-username";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};
if (GITHUB_TOKEN) {
  headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
}

// ISR: revalidate every hour
export const revalidate = 3600;

export async function GET() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers, next: { revalidate: 3600 } }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error("GitHub API request failed");
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    const totalStars = (repos as Array<{ stargazers_count: number; fork: boolean }>)
      .filter((r) => !r.fork)
      .reduce((acc: number, r: { stargazers_count: number }) => acc + r.stargazers_count, 0);

    return NextResponse.json({
      username: user.login,
      avatar: user.avatar_url,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      totalStars,
      profileUrl: user.html_url,
    });
  } catch (error) {
    // Return static fallback data if API fails
    return NextResponse.json({
      username: GITHUB_USERNAME,
      avatar: null,
      bio: "Backend Developer & AI Systems Engineer",
      followers: 0,
      following: 0,
      publicRepos: 0,
      totalStars: 0,
      profileUrl: `https://github.com/${GITHUB_USERNAME}`,
    });
  }
}
