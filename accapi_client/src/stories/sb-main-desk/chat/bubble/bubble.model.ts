export interface BubbleModel {
  msgId: number;
  participant:  "Agent" | "Customer" | "Summary" | "Bot" | "Other";
  checkMark:  "Timer" | "SingleCheck" | "DoubleCheck" | "FilledDoubleCheck" | "NA";
  message:  string;
  date: Date;
}
