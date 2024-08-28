export interface ChatBubbleModel {
  msgId: number;
  participant:  "Agent" | "Customer" | "Bot" | "Other";
  checkMark:  "Timer" | "SingleCheck" | "DoubleCheck" | "FilledDoubleCheck" | "NA";
  message:  string;
  date: string;
}
