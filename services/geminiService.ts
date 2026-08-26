/**
 * Workflow preview — client side.
 *
 * This used to call Gemini directly from the browser, with the API key
 * substituted into the bundle by vite.config.ts. That published the key: the
 * bundle is a public file, so anyone could read it and spend the quota.
 *
 * The call now goes to our own server, which holds the key and never sends it
 * to the browser. See server/index.js.
 */

export interface WorkflowPreviewResult {
  ok: boolean;
  text: string;
}

export const generateWorkflowPreview = async (scenario: string): Promise<string> => {
  const result = await requestWorkflowPreview(scenario);
  return result.text;
};

export const requestWorkflowPreview = async (
  scenario: string
): Promise<WorkflowPreviewResult> => {
  const trimmed = (scenario || '').trim();
  if (!trimmed) {
    return { ok: false, text: 'Describe the scenario first and we\'ll map it out.' };
  }

  try {
    const res = await fetch('/api/ai/workflow-preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario: trimmed.slice(0, 1000) }),
    });

    // Distinguish the cases that mean different things to a visitor, rather
    // than collapsing everything into one unhelpful "error" string.
    if (res.status === 503) {
      return { ok: false, text: 'The live preview isn\'t switched on at the moment.' };
    }
    if (res.status === 429) {
      return { ok: false, text: 'You\'ve run a few of these already — give it a minute and try again.' };
    }
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      return { ok: false, text: (body && body.error) || 'Couldn\'t generate that preview just now.' };
    }

    const body = await res.json();
    return { ok: true, text: body.text || 'No preview came back — try rewording the scenario.' };
  } catch {
    // Network-level failure: offline, DNS, server unreachable.
    return { ok: false, text: 'Couldn\'t reach the preview service. Check your connection and try again.' };
  }
};
