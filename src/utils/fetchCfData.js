import fetch from 'node-fetch';

export async function fetchCfUserData(handle) {
    // Fetch user info
    const userRes = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    const userData = await userRes.json();
    if (userData.status !== "OK") return null;
    const info = userData.result[0];

    // Fetch solved problems
    const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
    const statusData = await statusRes.json();
    let solvedSet = new Set();
    if (statusData.status === "OK") {
        for (const sub of statusData.result) {
            if (sub.verdict === "OK" && sub.problem) {
                solvedSet.add(`${sub.problem.contestId}-${sub.problem.name}`);
            }
        }
    }
    const solvedCount = solvedSet.size;

    return { info, solvedCount };
}