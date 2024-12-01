const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_OWNER = process.env.REACT_APP_GITHUB_OWNER;
const GITHUB_REPO = process.env.REACT_APP_GITHUB_REPO;

export async function fetchGithubContent(path: string) {

    console.log('Environment variables check:');
    console.log('PAT exists:', !!process.env.REACT_APP_GITHUB_PAT);
    console.log('PAT length:', process.env.REACT_APP_GITHUB_PAT?.length);
    console.log('First 4 chars of PAT:', process.env.REACT_APP_GITHUB_PAT?.substring(0, 4));
    console.log('OWNER:', GITHUB_OWNER);
    console.log('REPO:', GITHUB_REPO);
  
  if (!path) {
    throw new Error('Path is required');
  }

  if (!process.env.REACT_APP_GITHUB_PAT) {
    throw new Error('GitHub Personal Access Token is not configured');
  }

  if (!GITHUB_OWNER || !GITHUB_REPO) {
    throw new Error('GitHub repository details are not configured');
  }

  try {
    console.log('Fetching from path:', path);
    
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_PAT}`,
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`GitHub API error (${response.status}): ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch from GitHub';
    console.error('GitHub API Error:', errorMessage);
    throw new Error(errorMessage);
  }
} 