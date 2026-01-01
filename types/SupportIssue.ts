export interface SupportIssue {
  issue_id: number;
  user_id: number;
  issue_title: string;
  issue_description: string;
  admin_reply: string | null;
  created_at: string;
}
