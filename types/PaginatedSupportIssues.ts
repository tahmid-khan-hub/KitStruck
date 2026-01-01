import { SupportIssue } from "./SupportIssue";

export interface PaginatedSupportIssues {
  data: SupportIssue[];
  page: number;
  totalPages: number;
  totalItems: number;
}
